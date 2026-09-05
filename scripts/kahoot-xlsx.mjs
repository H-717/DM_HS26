// ---------------------------------------------------------------------------
// Turns kahoot/weekNN.csv into kahoot/weekNN.xlsx in the layout Kahoot's
// "import questions from spreadsheet" expects: seven rows of template
// preamble, the header row on row 8, questions from row 9 down.
//
//   node scripts/kahoot-xlsx.mjs            # all weeks
//   node scripts/kahoot-xlsx.mjs 03 04      # just these
//
// Edit the CSVs — they stay the source of truth — then re-run this.
// Zero dependencies: an .xlsx is a ZIP of XML, and both are written by hand
// below rather than pulling in a spreadsheet library for seven columns.
// ---------------------------------------------------------------------------

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(ROOT, 'kahoot');

const HEADERS = [
  'Question - max 120 characters',
  'Answer 1 - max 75 characters',
  'Answer 2 - max 75 characters',
  'Answer 3 - max 75 characters (optional)',
  'Answer 4 - max 75 characters (optional)',
  'Time limit (sec) – 5, 10, 20, 30, 60, 90, 120, 240',
  'Correct answer(s) - choose at least one',
];

const PREAMBLE = [
  ['Kahoot! quiz — question import'],
  [],
  ['Fill in one question per row, starting on row 9.'],
  ['Answers 3 and 4 are optional; leave them blank for true/false questions.'],
  ['Correct answer(s): the answer number, or several separated by commas.'],
  [],
  [],
];

// --- CSV --------------------------------------------------------------------

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else quoted = false;
      } else field += c;
      continue;
    }
    if (c === '"') quoted = true;
    else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else if (c !== '\r') field += c;
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((v) => v.trim() !== ''));
}

// --- minimal xlsx -----------------------------------------------------------

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function colName(n) {
  let s = '';
  for (n += 1; n > 0; n = Math.floor((n - 1) / 26)) {
    s = String.fromCharCode(65 + ((n - 1) % 26)) + s;
  }
  return s;
}

function sheetXml(rows) {
  const body = rows
    .map((cells, r) => {
      const cs = cells
        .map((v, c) => {
          if (v === '' || v == null) return '';
          const ref = colName(c) + (r + 1);
          // Every cell is written as a string, including the time limit and
          // the correct-answer number. Kahoot's importer reads string cells
          // only: numeric cells come back empty, which shows up as "please
          // mark the correct answer in this question" on upload.
          return `<c r="${ref}" t="inlineStr"><is><t xml:space="preserve">${esc(v)}</t></is></c>`;
        })
        .join('');
      return `<row r="${r + 1}">${cs}</row>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><dimension ref="A1:G${rows.length}"/><sheetData>${body}</sheetData></worksheet>`;
}

const FILES = (rows) => ({
  '[Content_Types].xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>`,
  '_rels/.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`,
  'xl/workbook.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Sheet1" sheetId="1" r:id="rId1"/></sheets></workbook>`,
  'xl/_rels/workbook.xml.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>`,
  'xl/worksheets/sheet1.xml': sheetXml(rows),
});

// --- ZIP (stored, uncompressed) --------------------------------------------

const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function zip(files) {
  const locals = [];
  const central = [];
  let offset = 0;

  for (const [name, content] of Object.entries(files)) {
    const nameBuf = Buffer.from(name, 'utf8');
    const data = Buffer.from(content, 'utf8');
    const crc = crc32(data);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4); // version needed
    local.writeUInt16LE(0, 6); // flags
    local.writeUInt16LE(0, 8); // method: stored
    local.writeUInt32LE(0, 10); // time + date
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    local.writeUInt16LE(0, 28);
    locals.push(local, nameBuf, data);

    const cd = Buffer.alloc(46);
    cd.writeUInt32LE(0x02014b50, 0);
    cd.writeUInt16LE(20, 4); // version made by
    cd.writeUInt16LE(20, 6); // version needed
    cd.writeUInt16LE(0, 8);
    cd.writeUInt16LE(0, 10);
    cd.writeUInt32LE(0, 12);
    cd.writeUInt32LE(crc, 16);
    cd.writeUInt32LE(data.length, 20);
    cd.writeUInt32LE(data.length, 24);
    cd.writeUInt16LE(nameBuf.length, 28);
    cd.writeUInt32LE(0, 30); // extra + comment lengths
    cd.writeUInt16LE(0, 34); // disk number
    cd.writeUInt16LE(0, 36); // internal attrs
    cd.writeUInt32LE(0, 38); // external attrs
    cd.writeUInt32LE(offset, 42);
    central.push(cd, nameBuf);

    offset += local.length + nameBuf.length + data.length;
  }

  const cdBuf = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(Object.keys(files).length, 8);
  end.writeUInt16LE(Object.keys(files).length, 10);
  end.writeUInt32LE(cdBuf.length, 12);
  end.writeUInt32LE(offset, 16);

  return Buffer.concat([...locals, cdBuf, end]);
}

// --- main -------------------------------------------------------------------

const wanted = process.argv.slice(2);
const csvs = readdirSync(DIR)
  .filter((f) => f.endsWith('.csv'))
  .filter((f) => !wanted.length || wanted.some((w) => f.includes(w)));

if (!csvs.length) {
  console.error('no matching CSVs in kahoot/');
  process.exit(1);
}

for (const file of csvs) {
  const rows = parseCsv(readFileSync(join(DIR, file), 'utf8'));
  const questions = rows.slice(1); // drop the CSV's own header
  const out = [...PREAMBLE, HEADERS, ...questions];
  const target = file.replace(/\.csv$/, '.xlsx');
  writeFileSync(join(DIR, target), zip(FILES(out)));
  console.log(`${file} -> ${target}  (${questions.length} questions)`);
}
