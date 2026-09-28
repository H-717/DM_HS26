import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { defineConfig, transformWithOxc, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { deriveKey, sealDeck, type DeckKey } from './src/slides/seal.ts'
import type { Deck } from './src/slides/types.ts'

// Encrypts speaker notes and unreleased solutions out of every weekly deck,
// so the deployed bundle has nothing to read in them — see
// src/slides/seal.ts. Needs the admin phrase as ADMIN_PHRASE (a repo secret
// in CI). Refuses to build without it rather than ship the plaintext or a
// deck you cannot present from.
function sealDecks(): Plugin {
  let key: DeckKey

  return {
    name: 'webta:seal-decks',
    apply: 'build',
    enforce: 'pre',

    async buildStart() {
      const phrase = process.env.ADMIN_PHRASE
      if (!phrase) {
        this.error(
          'ADMIN_PHRASE is not set. The build seals notes and solutions with it — ' +
            'set it to the admin unlock phrase (see README → Slides).',
        )
      }
      const admin = readFileSync('src/slides/admin.ts', 'utf8')
      const expected = /PHRASE_HASH =\s*'([0-9a-f]{64})'/.exec(admin)?.[1]
      if (createHash('sha256').update(phrase, 'utf8').digest('hex') !== expected) {
        this.error('ADMIN_PHRASE does not match PHRASE_HASH in src/slides/admin.ts.')
      }
      key = await deriveKey(phrase)
    },

    // A week file is plain data, so run it and write its decks back out
    // as sealed JSON.
    async transform(code, id) {
      if (!/\/src\/slides\/week\d+\.ts$/.test(id)) return
      const js = await transformWithOxc(code, id, { lang: 'ts' })
      const mod: Record<string, Deck> = await import(
        'data:text/javascript;base64,' + Buffer.from(js.code).toString('base64')
      )
      const out: string[] = []
      for (const [name, deck] of Object.entries(mod)) {
        out.push(`export const ${name} = ${JSON.stringify(await sealDeck(deck, key))};`)
      }
      return { code: out.join('\n'), map: null }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the built assets resolve correctly whether the site is
  // served from a domain root (Cloudflare Pages) or a GitHub Pages project
  // subpath (username.github.io/repo-name/). See README for details.
  base: './',
  plugins: [sealDecks(), react()],
})
