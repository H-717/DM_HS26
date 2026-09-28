// ---------------------------------------------------------------------------
// The slide "vocabulary". Every weekly deck is just a list of these objects —
// no layout, no styling, no JSX. Deck.tsx knows how to draw each kind.
//
// Text fields support a little markup:
//   $...$     LaTeX math, e.g. '$\neg(A \wedge B)$'   (KaTeX)
//   **bold**  emphasis
//   `code`    monospace
// Unicode is fine too and usually easier: ¬ ∧ ∨ → ↔ ≡ ⊤ ⊥ ∀ ∃ ℕ ℤ ≤ ⋆
// ---------------------------------------------------------------------------

export type Slide =
  /** Opening slide of the deck. */
  | { kind: 'title'; title: string; subtitle?: string; footnote?: string; note?: string }
  /** Numbered plan for the session. */
  | { kind: 'agenda'; title?: string; items: string[]; note?: string }
  /** The workhorse: a heading plus bullets. `reveal` shows them one by one. */
  | { kind: 'points'; title: string; lead?: string; points: string[]; reveal?: boolean; note?: string }
  /** A boxed definition / warning / takeaway. */
  | { kind: 'callout'; title: string; body: string[]; tone?: 'info' | 'warn' | 'good'; note?: string }
  /** Truth tables and any other tabular data. */
  | { kind: 'table'; title: string; lead?: string; headers: string[]; rows: string[][]; markRows?: number[]; note?: string }
  /** A square grid of single characters — chessboards, tilings, Hasse sketches.
   *  Same letter = same piece, '.' = hole, ' ' = empty. */
  | { kind: 'grid'; title: string; lead?: string; cells: string[]; legend?: string; note?: string }
  /** Statement of an exercise from the sheet. */
  | { kind: 'exercise'; ref: string; title: string; prompt: string[]; parts?: string[]; hint?: string[]; note?: string }
  /** Worked solution. `reveal` walks through the steps one at a time. */
  | { kind: 'solution'; ref: string; title: string; steps: string[]; reveal?: boolean; note?: string }
  /** Multiple choice; the answer stays hidden until you advance. */
  | { kind: 'quiz'; question: string; options: string[]; answer: number; explain?: string; note?: string }
  /** Closing slide. */
  | { kind: 'end'; title: string; points: string[]; note?: string }
  /** Stand-in for solutions the room may not see yet. Never written by hand:
   *  the build and seal.ts put it where the `solution` slides were. */
  | { kind: 'sealed'; refs: string[]; note?: string };

export interface Deck {
  week: number;
  /** Shown in the deck footer and on the title slide. */
  topic: string;
  /** Free text, e.g. 'Mon 21 Sep 2026'. */
  date?: string;
  /** Which exercise sheet this session covers. */
  sheet?: string;
  /** Until this is true, `solution` slides only show on unlocked devices —
   *  students get a placeholder. Flip it and push once the session is over. */
  solutionsReleased?: boolean;
  slides: Slide[];
  /** Build output only: the encrypted notes and hidden solutions (seal.ts). */
  sealed?: string;
}
