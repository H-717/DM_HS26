// ---------------------------------------------------------------------------
// What the room may see of a deck, and how the rest is kept out of the
// public bundle.
//
// Two things are private:
//   - speaker notes, always;
//   - `solution` slides, until the deck sets `solutionsReleased: true`.
//
// The production build (vite.config.ts) replaces both with one AES-GCM blob
// per deck, keyed from the admin phrase, so the deployed JS holds no
// plaintext to dig out with DevTools. An unlocked device keeps the key in
// localStorage (see ./admin.ts) and decrypts the deck when it opens.
//
// Everyone else gets studentView(): each run of hidden solutions becomes one
// placeholder slide, so the exercises still read in order.
//
// This file runs both in the browser and in the Vite config under Node, so
// it only uses Web Crypto, and imports carry their extension for Node.
// ---------------------------------------------------------------------------

import type { Deck, Slide } from './types.ts';

const SALT = 'webta.sealed.v1';
const ITERATIONS = 250_000;

/** CryptoKey — spelled this way because Node's typings only declare the value. */
export type DeckKey = Awaited<ReturnType<typeof crypto.subtle.importKey>>;

type Secrets = Record<number, { note?: string; slide?: Slide }>;

const utf8 = new TextEncoder();

function toBase64(bytes: Uint8Array): string {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

function fromBase64(text: string): Uint8Array<ArrayBuffer> {
  const bin = atob(text);
  const bytes = new Uint8Array(bin.length);
  for (let k = 0; k < bin.length; k++) bytes[k] = bin.charCodeAt(k);
  return bytes;
}

/** The deck key for a phrase. Slow on purpose — only run it on unlock. */
export async function deriveKey(phrase: string): Promise<DeckKey> {
  const base = await crypto.subtle.importKey('raw', utf8.encode(phrase), 'PBKDF2', false, [
    'deriveKey',
  ]);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', hash: 'SHA-256', salt: utf8.encode(SALT), iterations: ITERATIONS },
    base,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt'],
  );
}

export async function exportKey(key: DeckKey): Promise<string> {
  return toBase64(new Uint8Array(await crypto.subtle.exportKey('raw', key)));
}

export function importKey(raw: string): Promise<DeckKey> {
  return crypto.subtle.importKey('raw', fromBase64(raw), 'AES-GCM', false, ['decrypt']);
}

function isHidden(deck: Deck, slide: Slide): boolean {
  return slide.kind === 'sealed' || (slide.kind === 'solution' && !deck.solutionsReleased);
}

/** Build step: moves notes and unreleased solutions into `deck.sealed`. */
export async function sealDeck(deck: Deck, key: DeckKey): Promise<Deck> {
  const secrets: Secrets = {};
  const slides = deck.slides.map((s, k): Slide => {
    if (s.kind === 'solution' && !deck.solutionsReleased) {
      secrets[k] = { slide: s };
      return { kind: 'sealed', refs: [s.ref] };
    }
    if (s.note) {
      secrets[k] = { note: s.note };
      return { ...s, note: undefined };
    }
    return s;
  });

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const plain = utf8.encode(JSON.stringify(secrets));
  const cipher = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plain));
  const blob = new Uint8Array(iv.length + cipher.length);
  blob.set(iv);
  blob.set(cipher, iv.length);

  return { ...deck, slides, sealed: toBase64(blob) };
}

/** Puts a sealed deck back together. Throws if the key is wrong. */
export async function unsealDeck(deck: Deck, key: DeckKey): Promise<Deck> {
  if (!deck.sealed) return deck;
  const blob = fromBase64(deck.sealed);
  const plain = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: blob.subarray(0, 12) },
    key,
    blob.subarray(12),
  );
  const secrets: Secrets = JSON.parse(new TextDecoder().decode(plain));
  const slides = deck.slides.map((s, k) => {
    const secret = secrets[k];
    if (secret?.slide) return secret.slide;
    return secret?.note ? { ...s, note: secret.note } : s;
  });
  return { ...deck, slides, sealed: undefined };
}

/** The deck as a student sees it: no notes, one placeholder per run of hidden solutions. */
export function studentView(deck: Deck): Deck {
  const slides: Slide[] = [];
  for (const s of deck.slides) {
    if (!isHidden(deck, s)) {
      slides.push({ ...s, note: undefined });
      continue;
    }
    const refs = s.kind === 'solution' ? [s.ref] : s.kind === 'sealed' ? s.refs : [];
    const last = slides[slides.length - 1];
    if (last?.kind === 'sealed') {
      for (const r of refs) if (!last.refs.includes(r)) last.refs.push(r);
    } else {
      slides.push({ kind: 'sealed', refs: [...refs] });
    }
  }
  return { ...deck, slides, sealed: undefined };
}
