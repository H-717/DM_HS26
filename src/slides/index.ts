// ---------------------------------------------------------------------------
// Register each week's deck here. That is the only edit this file ever needs:
//
//   import { week14 } from './week14';
//   export const decks: Deck[] = [..., week14];
//
// A deck is reachable at  #/slides/<week>  — point content.ts's slidesUrl at
// that, and the Slides window will link to it.
// ---------------------------------------------------------------------------

import type { Deck } from './types';
import { week01 } from './week01';
import { week02 } from './week02';
import { week03 } from './week03';
import { week04 } from './week04';
import { week05 } from './week05';
import { week06 } from './week06';
import { week07 } from './week07';
import { week08 } from './week08';
import { week09 } from './week09';
import { week10 } from './week10';
import { week11 } from './week11';
import { week12 } from './week12';
import { week13 } from './week13';

export const decks: Deck[] = [
  week01,
  week02,
  week03,
  week04,
  week05,
  week06,
  week07,
  week08,
  week09,
  week10,
  week11,
  week12,
  week13,
];

export function findDeck(week: number): Deck | undefined {
  return decks.find((d) => d.week === week);
}

/** Parses '#/slides/3' -> 3. Returns null for anything else. */
export function deckWeekFromHash(hash: string): number | null {
  const m = /^#\/slides\/(\d+)$/.exec(hash);
  return m ? Number(m[1]) : null;
}
