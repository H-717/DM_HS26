// ---------------------------------------------------------------------------
// Register each week's deck here. That is the only edit this file ever needs:
//
//   import { week02 } from './week02';
//   export const decks: Deck[] = [week01, week02];
//
// A deck is reachable at  #/slides/<week>  — point content.ts's slidesUrl at
// that, and the Slides window will link to it.
// ---------------------------------------------------------------------------

import type { Deck } from './types';
import { week01 } from './week01';

export const decks: Deck[] = [week01];

export function findDeck(week: number): Deck | undefined {
  return decks.find((d) => d.week === week);
}

/** Parses '#/slides/3' -> 3. Returns null for anything else. */
export function deckWeekFromHash(hash: string): number | null {
  const m = /^#\/slides\/(\d+)$/.exec(hash);
  return m ? Number(m[1]) : null;
}
