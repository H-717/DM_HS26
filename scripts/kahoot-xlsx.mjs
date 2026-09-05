// ---------------------------------------------------------------------------
// Turns kahoot/weekNN.csv into kahoot/weekNN.xlsx for Kahoot's
// "import questions from spreadsheet".
//
//   node scripts/kahoot-xlsx.mjs            # all weeks
//   node scripts/kahoot-xlsx.mjs 03 04      # just these
//
// Edit the CSVs — they stay the source of truth — then re-run this.
//
// TEMPLATE MODE (preferred, and the only way to be certain the header is
// byte-for-byte Kahoot's own): download their spreadsheet template and save
// it as kahoot/template.xlsx. The script then opens that workbook, writes
// the question rows into it from DATA_ROW down, and leaves every other part
// of the file exactly as Kahoot shipped it.
//
// Without a template it falls back to building a workbook from scratch with
// a reconstructed header — that header is a best guess, not an official copy.
//
// Cell types: A–E are strings; F (time limit) and G (correct answer) are
// written as NUMBERS, which is what Kahoot's importer expects.
//
// Zero dependencies: an .xlsx is a ZIP of XML, and both are handled below.
// ---------------------------------------------------------------------------

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { deflateRawSync, inflateRawSync } from 'node:zlib';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(ROOT, 'kahoot');
const TEMPLATE = join(DIR, 'template.xlsx');

/** First row of question data. Kahoot's template keeps rows 1–8 for its own
 *  instructions and header. */
const DATA_ROW = 9;

/** Kahoot's limits, enforced before anything is written. */
const MAX_QUESTION = 120;
const MAX_ANSWER = 75;
const TIME_LIMITS = new Set([5, 10, 20, 30, 60, 90, 120, 240]);

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
  ['Kahoot! quiz - question import'],
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

/** Rejects anything Kahoot would reject, with the row number in the message. */
function validate(file, questions) {
  const problems = [];
  questions.forEach((q, i) => {
    const at = `${file} question ${i + 1}`;
    if (!q[0] || q[0].length > MAX_QUESTION) {
      problems.push(`${at}: question is ${q[0]?.length ?? 0} chars (max ${MAX_QUESTION})`);
    }
    for (let k = 1; k <= 4; k++) {
      if (q[k] && q[k].length > MAX_ANSWER) {
        problems.push(`${at}: answer ${k} is ${q[k].length} chars (max ${MAX_ANSWER})`);
      }
    }
    if (!q[1] || !q[2]) problems.push(`${at}: answers 1 and 2 are required`);

    const time = Number(String(q[5]).trim());
    if (!TIME_LIMITS.has(time)) {
      problems.push(`${at}: time limit ${q[5]} is not one of ${[...TIME_LIMITS].join(', ')}`);
    }

    const picks = String(q[6]).trim().split(',').map((s) => Number(s.trim()));
    if (!picks.length || picks.some((n) => !Number.isInteger(n) || n < 1 || n > 4)) {
      problems.push(`${at}: correct answer "${q[6]}" must be 1-4`);
    }
    for (const n of picks) {
      if (!q[n]) problems.push(`${at}: correct answer ${n} points at an empty answer`);
    }
  });
  return problems;
}

// --- cells ------------------------------------------------------------------

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function colName(n) {
  let s = '';
  for (n += 1; n > 0; n = Math.floor((n - 1) / 26)) {
    s = String.fromCharCode(65 + ((n - 1) % 26)) + s;
  }
  return s;
}

/** Columns F and G (indices 5 and 6) are numeric; everything else is a string.
 *  A multi-pick correct answer such as "1,3" cannot be a number, so it stays
 *  a string — a single pick, the normal case, is written as a number. */
function cellXml(value, colIdx, rowNum) {
  if (value === '' || value == null) return '';
  const ref = colName(colIdx) + rowNum;
  const raw = String(value).trim();
  const numeric = (colIdx === 5 || colIdx === 6) && /^\d+$/.test(raw);
  return numeric
    ? `<c r="${ref}"><v>${raw}</v></c>`
    : `<c r="${ref}" t="inlineStr"><is><t xml:space="preserve">${esc(value)}</t></is></c>`;
}

function rowXml(cells, rowNum) {
  const inner = cells.map((v, c) => cellXml(v, c, rowNum)).join('');
  return `<row r="${rowNum}">${inner}</row>`;
}

// --- from-scratch workbook --------------------------------------------------

function sheetXml(rows) {
  const body = rows.map((cells, r) => rowXml(cells, r + 1)).join('');
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><dimension ref="A1:G${rows.length}"/><sheetData>${body}</sheetData></worksheet>`;
}

const SCRATCH_FILES = (rows) => ({
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

// --- ZIP --------------------------------------------------------------------

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

/** Reads a ZIP into an ordered list of { name, data } with entries inflated. */
function unzip(buf) {
  // Find the end-of-central-directory record, scanning back over any comment.
  let eocd = -1;
  for (let i = buf.length - 22; i >= 0 && i > buf.length - 65558; i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw new Error('not a zip file (no end-of-central-directory)');

  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  const entries = [];

  for (let i = 0; i < count; i++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) throw new Error('bad central directory');
    const method = buf.readUInt16LE(p + 10);
    const compSize = buf.readUInt32LE(p + 20);
    const nameLen = buf.readUInt16LE(p + 28);
    const extraLen = buf.readUInt16LE(p + 30);
    const commentLen = buf.readUInt16LE(p + 32);
    const localOff = buf.readUInt32LE(p + 42);
    const name = buf.toString('utf8', p + 46, p + 46 + nameLen);

    const lNameLen = buf.readUInt16LE(localOff + 26);
    const lExtraLen = buf.readUInt16LE(localOff + 28);
    const start = localOff + 30 + lNameLen + lExtraLen;
    const raw = buf.subarray(start, start + compSize);

    entries.push({ name, data: method === 8 ? inflateRawSync(raw) : Buffer.from(raw) });
    p += 46 + nameLen + extraLen + commentLen;
  }
  return entries;
}

function zip(entries) {
  const locals = [];
  const central = [];
  let offset = 0;

  for (const { name, data } of entries) {
    const nameBuf = Buffer.from(name, 'utf8');
    const body = Buffer.isBuffer(data) ? data : Buffer.from(data, 'utf8');
    const packed = deflateRawSync(body);
    const crc = crc32(body);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0, 6);
    local.writeUInt16LE(8, 8); // deflate
    local.writeUInt32LE(0, 10);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(packed.length, 18);
    local.writeUInt32LE(body.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    local.writeUInt16LE(0, 28);
    locals.push(local, nameBuf, packed);

    const cd = Buffer.alloc(46);
    cd.writeUInt32LE(0x02014b50, 0);
    cd.writeUInt16LE(20, 4);
    cd.writeUInt16LE(20, 6);
    cd.writeUInt16LE(0, 8);
    cd.writeUInt16LE(8, 10);
    cd.writeUInt32LE(0, 12);
    cd.writeUInt32LE(crc, 16);
    cd.writeUInt32LE(packed.length, 20);
    cd.writeUInt32LE(body.length, 24);
    cd.writeUInt16LE(nameBuf.length, 28);
    cd.writeUInt32LE(0, 30);
    cd.writeUInt16LE(0, 34);
    cd.writeUInt16LE(0, 36);
    cd.writeUInt32LE(0, 38);
    cd.writeUInt32LE(offset, 42);
    central.push(cd, nameBuf);

    offset += local.length + nameBuf.length + packed.length;
  }

  const cdBuf = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(cdBuf.length, 12);
  end.writeUInt32LE(offset, 16);

  return Buffer.concat([...locals, cdBuf, end]);
}

// --- template mode ----------------------------------------------------------

/** Name of the first worksheet part in the workbook. */
function firstSheetPart(entries) {
  const sheets = entries
    .map((e) => e.name)
    .filter((n) => /^xl\/worksheets\/sheet\d+\.xml$/.test(n))
    .sort();
  if (!sheets.length) throw new Error('template has no worksheet');
  return sheets[0];
}

/** Replaces every row from DATA_ROW down with the given questions, keeping
 *  the template's own rows 1..DATA_ROW-1 and all its other parts untouched. */
function injectIntoTemplate(templateBuf, questions) {
  const entries = unzip(templateBuf);
  const part = firstSheetPart(entries);
  const entry = entries.find((e) => e.name === part);
  let xml = entry.data.toString('utf8');

  // Drop any existing question rows (the template ships a couple of examples).
  xml = xml.replace(/<row[^>]*\br="(\d+)"[^>]*>[\s\S]*?<\/row>|<row[^>]*\br="(\d+)"[^>]*\/>/g,
    (match, a, b) => (Number(a ?? b) >= DATA_ROW ? '' : match));

  const added = questions.map((q, i) => rowXml(q, DATA_ROW + i)).join('');

  if (/<sheetData\s*\/>/.test(xml)) {
    xml = xml.replace(/<sheetData\s*\/>/, `<sheetData>${added}</sheetData>`);
  } else if (/<\/sheetData>/.test(xml)) {
    xml = xml.replace('</sheetData>', `${added}</sheetData>`);
  } else {
    throw new Error('template worksheet has no <sheetData>');
  }

  // Keep <dimension> honest if the template declares one.
  xml = xml.replace(
    /<dimension ref="[^"]*"\/>/,
    `<dimension ref="A1:G${DATA_ROW + questions.length - 1}"/>`,
  );

  entry.data = Buffer.from(xml, 'utf8');
  return zip(entries);
}

// --- main -------------------------------------------------------------------

const wanted = process.argv.slice(2);
const csvs = readdirSync(DIR)
  .filter((f) => f.endsWith('.csv'))
  .filter((f) => !wanted.length || wanted.some((w) => f.includes(w)))
  .sort();

if (!csvs.length) {
  console.error('no matching CSVs in kahoot/');
  process.exit(1);
}

const usingTemplate = existsSync(TEMPLATE);
const templateBuf = usingTemplate ? readFileSync(TEMPLATE) : null;
console.log(
  usingTemplate
    ? `using kahoot/template.xlsx — headers come from Kahoot's own file`
    : `no kahoot/template.xlsx found — building a workbook from scratch\n` +
      `  (save Kahoot's downloaded template there for a guaranteed-exact header)`,
);

let failed = false;
for (const file of csvs) {
  const rows = parseCsv(readFileSync(join(DIR, file), 'utf8'));
  const questions = rows.slice(1); // drop the CSV's own header

  const problems = validate(file, questions);
  if (problems.length) {
    problems.forEach((p) => console.error('  ! ' + p));
    failed = true;
    continue;
  }

  const target = file.replace(/\.csv$/, '.xlsx');
  const out = usingTemplate
    ? injectIntoTemplate(templateBuf, questions)
    : zip(
        Object.entries(SCRATCH_FILES([...PREAMBLE, HEADERS, ...questions])).map(
          ([name, data]) => ({ name, data }),
        ),
      );
  writeFileSync(join(DIR, target), out);
  console.log(`${file} -> ${target}  (${questions.length} questions)`);
}

if (failed) process.exit(1);
