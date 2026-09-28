// ---------------------------------------------------------------------------
// Speaker notes and unreleased solutions are for whoever is running the
// session, not for the room. They only show on a device that has been
// unlocked once with the phrase below.
//
// In the deployed site they are encrypted (see ./seal.ts), so the public
// bundle holds no plaintext to find with DevTools. The unlock stores the
// decryption key next to the flag. Devices unlocked before sealing existed
// have the flag but no key: open the unlock link on them once more.
//
// The unlock lives in localStorage, which is bound to one browser profile on
// one machine and has nothing to do with the network: it survives wifi
// changes, works offline, and does not follow you to another device.
// ---------------------------------------------------------------------------

import { deriveKey, exportKey, importKey, type DeckKey } from './seal';

const STORE_KEY = 'webta.admin';
const KEY_STORE_KEY = 'webta.key';
const PARAM = 'admin';

/** Fires after an unlock/lock so an open deck can react without a reload. */
export const ADMIN_EVENT = 'webta:admin';

// SHA-256 of the unlock phrase — the phrase itself is deliberately not in the
// repo. Rotate it with:  node scripts/admin-hash.mjs '<new phrase>'
// and set the same phrase as the ADMIN_PHRASE secret the build seals with.
const PHRASE_HASH =
  'ee0f1e5c07159f671cb13352ec180b6dde300ef9a3757f88ff9957309b4e0c60';

/** True on a device that has been unlocked. Safe in private mode. */
export function isAdmin(): boolean {
  try {
    return localStorage.getItem(STORE_KEY) === PHRASE_HASH;
  } catch {
    return false;
  }
}

/** The key for sealed decks, or null on a locked or pre-sealing device. */
export async function adminKey(): Promise<DeckKey | null> {
  try {
    const raw = localStorage.getItem(KEY_STORE_KEY);
    return raw && isAdmin() ? await importKey(raw) : null;
  } catch {
    return null;
  }
}

async function sha256(text: string): Promise<string | null> {
  // crypto.subtle needs a secure context — https, or localhost in dev.
  if (!window.crypto?.subtle) return null;
  const bytes = new TextEncoder().encode(text);
  const digest = await window.crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// ?admin=<phrase> reads from either position, so both of these work:
//   https://site/?admin=<phrase>#/slides/1
//   https://site/#/slides/1?admin=<phrase>
function readParam(): { value: string; from: 'search' | 'hash' } | null {
  const fromSearch = new URLSearchParams(window.location.search).get(PARAM);
  if (fromSearch !== null) return { value: fromSearch, from: 'search' };

  const q = window.location.hash.indexOf('?');
  if (q !== -1) {
    const fromHash = new URLSearchParams(window.location.hash.slice(q + 1)).get(PARAM);
    if (fromHash !== null) return { value: fromHash, from: 'hash' };
  }
  return null;
}

// Drop the phrase from the address bar as soon as it is spent, so it is not
// left on screen behind you or captured in a bookmark or screenshot.
function stripParam(from: 'search' | 'hash') {
  const url = new URL(window.location.href);
  if (from === 'search') {
    url.searchParams.delete(PARAM);
  } else {
    const q = url.hash.indexOf('?');
    const rest = new URLSearchParams(url.hash.slice(q + 1));
    rest.delete(PARAM);
    const tail = rest.toString();
    url.hash = url.hash.slice(0, q) + (tail ? '?' + tail : '');
  }
  window.history.replaceState(null, '', url.toString());
}

/**
 * Handles an `?admin=` in the URL: the phrase unlocks this device for good,
 * and `?admin=lock` gives it back. Call once on startup; it is a no-op when
 * the parameter is absent, and never throws.
 */
export async function consumeAdminParam(): Promise<void> {
  const param = readParam();
  if (!param) return;

  try {
    if (param.value === 'lock' || param.value === '') {
      localStorage.removeItem(STORE_KEY);
      localStorage.removeItem(KEY_STORE_KEY);
    } else if ((await sha256(param.value)) === PHRASE_HASH) {
      localStorage.setItem(STORE_KEY, PHRASE_HASH);
      localStorage.setItem(KEY_STORE_KEY, await exportKey(await deriveKey(param.value)));
    }
    // A wrong phrase is silently ignored — no "try again" to poke at.
  } catch {
    // Storage blocked; nothing to unlock, and nothing worth reporting.
  }

  stripParam(param.from);
  window.dispatchEvent(new Event(ADMIN_EVENT));
}
