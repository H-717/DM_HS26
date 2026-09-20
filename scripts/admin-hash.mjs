// Prints the SHA-256 of a speaker-notes unlock phrase, so the phrase itself
// never has to be committed. Paste the output into PHRASE_HASH in
// src/slides/admin.ts.
//
//   node scripts/admin-hash.mjs 'my new phrase'

import { createHash } from 'node:crypto';

const phrase = process.argv.slice(2).join(' ');
if (!phrase) {
  console.error("usage: node scripts/admin-hash.mjs '<phrase>'");
  process.exit(1);
}

console.log(createHash('sha256').update(phrase, 'utf8').digest('hex'));
