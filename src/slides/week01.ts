// ---------------------------------------------------------------------------
// Week 1 — everything you say on screen lives in this file. Edit freely.
// See ./types.ts for the list of slide kinds and the text markup.
// ---------------------------------------------------------------------------

import type { Deck } from './types';

export const week01: Deck = {
  week: 1,
  topic: 'Statements, Proofs & Propositional Logic',
  date: 'Week of 21 Sep 2026',
  sheet: 'Exercise sheet 1',

  slides: [
    {
      kind: 'title',
      title: 'Exercise Session 1',
      subtitle: 'Statements, proofs, and propositional logic',
      footnote: 'Discrete Mathematics · HS 2026 · Exercise sheet 1',
    },

    {
      kind: 'points',
      title: 'Hi — I am your TA',
      points: [
        'Hayk Serobyan · hserobyan@student.ethz.ch',
        'I sat exactly where you are sitting, last year.',
        'Ask me anything, during the session or by email. No question is too basic.',
        'Slides + everything else: on my site, linked from Moodle.',
      ],
      note:
        'Keep this to ~2 minutes. Say one sentence about why you liked the course — it sets the tone.',
    },

    {
      kind: 'callout',
      title: 'How these sessions work',
      tone: 'info',
      body: [
        '**Short recap** of the week’s lecture ideas — 15 min, not a second lecture.',
        '**We solve the sheet together.** You try first, I ask, we discuss, then I write it up.',
        '**The graded exercise is yours alone.** I give method, never the answer.',
        'Interrupt me. A session where nobody interrupts is a session I ran badly.',
      ],
    },

    {
      kind: 'agenda',
      items: [
        'Recap: what is a mathematical statement?',
        'Recap: the five connectives and function tables',
        'Recap: the standard proof patterns',
        '1.1 The punctured chessboard',
        '1.2 A false proof',
        '1.3 Formulas ↔ natural language',
        '1.4 Equivalence via function tables',
        '1.6 Simplifying a formula',
        '1.5 (graded) — method only',
        'Kahoot',
      ],
      note: 'Rough timing: 15 min recap, 65 min exercises, 10 min Kahoot, 10 min buffer.',
    },

    // -- recap ---------------------------------------------------------------

    {
      kind: 'points',
      title: 'A mathematical statement',
      lead: 'Lecture notes §2.1',
      reveal: true,
      points: [
        'A **statement** is a sentence that is either **true** or **false** — no third option, no "it depends".',
        '"7 is prime" ✓  ·  "Every even number > 2 is a sum of two primes" ✓ (we just don’t know which)',
        '"x > 3" ✗ — not a statement until you say what x is. It is a **predicate**.',
        '"This sentence is false" ✗ — not a statement at all.',
        'Statements combine with ¬, ∧, ∨, →, ↔ into new statements.',
      ],
      note:
        'Push on the Goldbach example: truth value exists even though nobody knows it. Truth ≠ provability-by-us.',
    },

    {
      kind: 'table',
      title: 'The five connectives',
      lead: 'Everything this week is bookkeeping on top of this table.',
      headers: ['A', 'B', '¬A', 'A ∧ B', 'A ∨ B', 'A → B', 'A ↔ B'],
      rows: [
        ['0', '0', '1', '0', '0', '1', '1'],
        ['0', '1', '1', '0', '1', '1', '0'],
        ['1', '0', '0', '0', '1', '0', '0'],
        ['1', '1', '0', '1', '1', '1', '1'],
      ],
      markRows: [2],
      note:
        'Spend the time on row 3: A → B is false ONLY here. And on rows 1-2: a false premise makes the implication true. This is the single most common source of confusion all semester.',
    },

    {
      kind: 'callout',
      title: 'The one that trips everyone up',
      tone: 'warn',
      body: [
        'A → B is **true whenever A is false**. "If the moon is cheese, then 1 = 2" is a true statement.',
        '→ is not causation, not relevance, not time. It is just that one column of the table.',
        'Useful reading: A → B says "A is at least as false as B".',
      ],
    },

    {
      kind: 'points',
      title: 'Proof patterns you already own',
      reveal: true,
      points: [
        '**Direct**: assume A, chain implications, arrive at B.',
        '**Contraposition**: prove ¬B → ¬A instead of A → B. Same statement, often easier.',
        '**Contradiction**: assume A ∧ ¬B, derive something false.',
        '**Case distinction**: split into finitely many cases, cover all of them. (→ 1.1)',
        '**Induction**: base case, then step n → n+1.',
        'Choosing the pattern is 80% of the work. Writing it down is the other 20%.',
      ],
    },

    {
      kind: 'callout',
      title: 'The equivalence toolbox (Lemma 2.1)',
      tone: 'good',
      body: [
        'idempotence · commutativity · associativity · absorption · distributivity · double negation · De Morgan',
        'Plus the definition of →:  F → G ≡ ¬F ∨ G',
        'Plus the constants:  F ∧ ¬F ≡ ⊥ · F ∨ ¬F ≡ ⊤ · F ∧ ⊤ ≡ F · F ∨ ⊥ ≡ F · F ∧ ⊥ ≡ ⊥ · F ∨ ⊤ ≡ ⊤',
        'Exercise 1.6 asks for a proof in **exactly this currency** — one named rule per step.',
      ],
    },

    // -- 1.1 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '1.1',
      title: 'The Punctured Chessboard  (⋆)',
      prompt: [
        'P(k) = 1 iff: for **every** choice of punctured square, the remaining k² − 1 squares can be covered by non-overlapping L-shaped pieces of 3 squares.',
        'We want to prove P(7) = 1 by case distinction.',
      ],
      parts: [
        'What is the smallest number of cases you have to consider? (Use the symmetries of the board.)',
        'Carry out the proof for two of the cases.',
      ],
      note: 'Give them 4 minutes on part 1 before revealing. Ask: "how many squares are there? and how many really different ones?"',
    },

    {
      kind: 'points',
      title: '1.1 · First, a sanity check',
      reveal: true,
      points: [
        '7² − 1 = 48, and 3 | 48. Good — otherwise we could stop right here.',
        'Naively: 49 squares ⇒ 49 cases. That is a lot of chessboards to draw.',
        'But the board has symmetries: 4 rotations × 2 (mirror) = **8** symmetries.',
        'If a tiling exists for square s, rotating/reflecting it gives a tiling for every square in the orbit of s.',
        'So we only need **one representative per orbit**.',
      ],
    },

    {
      kind: 'grid',
      title: '1.1 · Ten cases, not forty-nine',
      lead: 'Every square can be moved into the shaded wedge by one of the 8 symmetries.',
      cells: [
        'ABCD###',
        '#EFG###',
        '##HI###',
        '###J###',
        '#######',
        '#######',
        '#######',
      ],
      legend:
        'Representatives: rows r ≤ columns c ≤ 4. That is 1 + 2 + 3 + 4 = **10** cases, and no two of them are equivalent.',
      note:
        'If someone asks for a formal count: Burnside on the 8 symmetries gives (49+1+1+1+7+7+7+7)/8 = 80/8 = 10. Same answer.',
    },

    {
      kind: 'grid',
      title: '1.1 · Case: the centre square',
      lead: 'The elegant one — no search needed.',
      cells: [
        'AAAABBB',
        'AAAABBB',
        'AAAABBB',
        'DDD.BBB',
        'DDDCCCC',
        'DDDCCCC',
        'DDDCCCC',
      ],
      legend:
        'Four 3×4 rectangles pinwheel around the hole. Every 3×4 rectangle splits into two 2×3 blocks, and a 2×3 block is exactly two L-pieces. Done.',
      note:
        'This is the case worth showing on the board. The pinwheel idea generalises and students remember it.',
    },

    {
      kind: 'grid',
      title: '1.1 · Case: a corner square',
      lead: 'Hole at (1,1). One explicit tiling — 16 pieces, each a colour.',
      cells: [
        '.AABBCC',
        'DAEBFFC',
        'DDEEFGG',
        'HHIIJGK',
        'HLIJJKK',
        'MLLNOOP',
        'MMNNOPP',
      ],
      legend:
        'Exhibiting one valid tiling **is** the proof for this case. You do not owe anyone an explanation of how you found it.',
      note:
        'Worth saying out loud: for existence statements, a witness is a complete proof. All ten cases work out; two are all the exercise asks for.',
    },

    // -- 1.2 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '1.2',
      title: 'A False Proof  (⋆⋆)',
      prompt: [
        '**Claim:** 1 is the largest natural number.',
        '**"Proof":**  n is the largest natural number ⇒ n² ≤ n ⇒ n(n−1) = n² − n ≤ 0 ⇒ 0 ≤ n ≤ 1 ⇒ n = 1.',
        'Find the mistake.',
      ],
      note: 'Let them hunt. Most will attack the algebra — every single implication is actually fine. That is the point.',
    },

    {
      kind: 'solution',
      ref: '1.2',
      title: 'Every step is correct. The proof is still wrong.',
      reveal: true,
      steps: [
        'n² ≤ n: correct — n² is a natural number and n is the largest one. ✓',
        'n(n−1) ≤ 0 and hence 0 ≤ n ≤ 1: correct. ✓',
        'n = 1: correct. ✓',
        'So what was proved is: **if** a largest natural number exists, **then** it equals 1.',
        'That is a statement of the form H → C. The claim asserted C on its own.',
        'The unstated assumption H — "a largest natural number exists" — is false. ℕ is unbounded.',
        '**Moral:** proving H → C proves nothing about C until you have proved H.',
      ],
      note:
        'Connect forward: this is exactly why the → column looks the way it does. A true implication out of a false hypothesis carries no information.',
    },

    // -- 1.3 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '1.3',
      title: 'Interpreting Formulas in Natural Language',
      prompt: [
        'A = "Mario forgot to pay his rent."   B = "Mario is getting evicted."',
      ],
      parts: [
        'Interpret F₁ = ¬B → ¬A and F₂ = (A ∧ B) ∨ (¬A ∧ ¬B).',
        'Formalise F₃: "Mario neither forgot to pay his rent nor is he getting evicted." and F₄: "Mario either forgot to pay his rent or he is getting evicted, but not both."',
        'Negate F₃ and F₄, both as formulas and as sentences.',
      ],
    },

    {
      kind: 'solution',
      ref: '1.3',
      title: 'Reading the formulas',
      reveal: true,
      steps: [
        'F₁ = ¬B → ¬A: "If Mario is not getting evicted, then he did not forget to pay his rent."',
        'F₁ ≡ A → B — it is the **contraposition**. Same statement, different sentence.',
        'F₂ = (A ∧ B) ∨ (¬A ∧ ¬B): "Either both happened, or neither did", i.e. F₂ ≡ A ↔ B.',
        'F₃ = ¬A ∧ ¬B  ≡ ¬(A ∨ B).  ("neither … nor" is De Morgan in disguise.)',
        'F₄ = (A ∨ B) ∧ ¬(A ∧ B)  ≡ (A ∧ ¬B) ∨ (¬A ∧ B)  — exclusive or.',
      ],
    },

    {
      kind: 'solution',
      ref: '1.3',
      title: 'Negating them',
      reveal: true,
      steps: [
        '¬F₃ ≡ ¬(¬A ∧ ¬B) ≡ A ∨ B.',
        '"Mario forgot to pay his rent, or he is getting evicted (or both)."',
        '¬F₄ ≡ ¬((A ∧ ¬B) ∨ (¬A ∧ B)) ≡ (A ∧ B) ∨ (¬A ∧ ¬B) ≡ A ↔ B.',
        '"Mario forgot to pay his rent if and only if he is getting evicted."',
        'Note ¬F₄ ≡ F₂: the negation of XOR is exactly ↔.',
      ],
      note:
        'Emphasise: the negation of "either-or-but-not-both" is NOT "neither". Students get this wrong on the exam every year.',
    },

    // -- 1.4 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '1.4',
      title: 'Logical Equivalence via Function Tables',
      prompt: [
        'Compute the function table of  F = (B → C) → ( ¬(A → C) ∧ ¬(A ∨ B) ).',
        'Then find an equivalent formula in which each propositional symbol appears **at most once**.',
      ],
      hint: [
        'Before filling in 8 rows: look hard at the right-hand side of the outer →.',
      ],
    },

    {
      kind: 'solution',
      ref: '1.4',
      title: 'The right-hand side is never true',
      reveal: true,
      steps: [
        '¬(A → C) ≡ ¬(¬A ∨ C) ≡ A ∧ ¬C.  So it forces **A = 1**.',
        '¬(A ∨ B) ≡ ¬A ∧ ¬B.  So it forces **A = 0**.',
        'Their conjunction demands A ∧ ¬A ≡ ⊥. The consequent is unsatisfiable.',
        'So F ≡ (B → C) → ⊥ ≡ ¬(B → C) ≡ ¬(¬B ∨ C) ≡ **B ∧ ¬C**.',
        'A does not occur at all — so B ∧ ¬C already answers part 2.',
      ],
    },

    {
      kind: 'table',
      title: '1.4 · The full table',
      lead: 'F is 1 exactly on the two rows with B = 1, C = 0.',
      headers: ['A', 'B', 'C', 'B → C', '¬(A→C)', '¬(A∨B)', 'RHS', 'F'],
      rows: [
        ['0', '0', '0', '1', '0', '1', '0', '0'],
        ['0', '0', '1', '1', '0', '0', '0', '0'],
        ['0', '1', '0', '0', '0', '0', '0', '1'],
        ['0', '1', '1', '1', '0', '0', '0', '0'],
        ['1', '0', '0', '1', '1', '0', '0', '0'],
        ['1', '0', '1', '1', '0', '0', '0', '0'],
        ['1', '1', '0', '0', '1', '0', '0', '1'],
        ['1', '1', '1', '1', '0', '0', '0', '0'],
      ],
      markRows: [2, 6],
      note:
        'Point at the all-zero RHS column: that is the whole exercise. Doing the table first also works, it is just slower.',
    },

    // -- 1.6 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '1.6',
      title: 'Simplifying a Formula  (⋆)',
      prompt: [
        'F = ( (¬A ∨ ¬B) ∧ ¬A ) ∧ ( (¬B ∧ ¬A) ∨ C )',
        'Find G ≡ F in which A, B, C each appear at most once, and prove F ≡ G with **at most 6 steps**, naming one rule per step.',
      ],
      note: 'Ask what the first bracket looks like. Someone will spot absorption.',
    },

    {
      kind: 'solution',
      ref: '1.6',
      title: 'Six steps, one named rule each',
      reveal: true,
      steps: [
        'F ≡ ¬A ∧ ( (¬B ∧ ¬A) ∨ C )    — **absorption**: (X ∨ Y) ∧ X ≡ X, with X = ¬A',
        '≡ ( ¬A ∧ (¬B ∧ ¬A) ) ∨ ( ¬A ∧ C )    — **distributivity**',
        '≡ ( ¬A ∧ (¬A ∧ ¬B) ) ∨ ( ¬A ∧ C )    — **commutativity**',
        '≡ ( (¬A ∧ ¬A) ∧ ¬B ) ∨ ( ¬A ∧ C )    — **associativity**',
        '≡ ( ¬A ∧ ¬B ) ∨ ( ¬A ∧ C )    — **idempotence**',
        '≡ ¬A ∧ ( ¬B ∨ C )    — **distributivity**',
        'G = ¬A ∧ (¬B ∨ C). Each of A, B, C appears exactly once. ∎',
      ],
      note:
        'Stress the format: naming the rule is not decoration, it is the thing being graded. "obviously" scores zero points.',
    },

    {
      kind: 'callout',
      title: 'Sanity-check your simplifications',
      tone: 'good',
      body: [
        'G = ¬A ∧ (¬B ∨ C) is 1 only when A = 0 and (B = 0 or C = 1).',
        'Spot-check F on A=0, B=1, C=0: first bracket ¬A = 1, second bracket (0 ∧ 1) ∨ 0 = 0 ⇒ F = 0 = G ✓',
        'Two minutes of spot-checking catches almost every algebra slip.',
      ],
    },

    // -- 1.5 graded ----------------------------------------------------------

    {
      kind: 'exercise',
      ref: '1.5',
      title: 'Two New Operators — GRADED (8 points)',
      prompt: [
        'Two binary operators ♡ and ♢ are given by their function tables. You are asked about commutativity, an equivalence of two compound formulas, and to build a given F from ♡ and ♢ alone.',
        '**We will not solve this here.** It is graded, it must be your own work, and AI is not allowed for it.',
      ],
      hint: [
        'Method, not answers: a table over A, B, C has 8 rows — build one column per subformula, innermost first, and never skip a column.',
        'For part 1: two operators are commutative iff swapping the two input columns leaves the output column unchanged. Check it, do not eyeball it.',
        'For part 3: read the target table as "which rows are 0?" and work backwards from there.',
        'Deadline is on Moodle. Stuck at 23:00 the night before? Email me — I answer.',
      ],
      note:
        'Do NOT reveal that ♡ is → and ♢ is ⊕, even if asked directly. Redirect to the method.',
    },

    // -- wrap ----------------------------------------------------------------

    {
      kind: 'points',
      title: 'What to take away',
      points: [
        'A statement has a truth value. A predicate does not, until you fix its variables.',
        'A → B is false in exactly one row. Learn that row.',
        'A correct chain of implications from a false assumption proves nothing.',
        'Simplification proofs are graded on **named rules**, one per step.',
        'Symmetry turns 49 cases into 10. Look for it before you start drawing.',
      ],
    },

    {
      kind: 'title',
      title: 'Kahoot',
      subtitle: 'Five questions · join at kahoot.it',
      footnote: 'Questions are in kahoot/week01.csv in the site repo.',
      note: 'Open the Kahoot in a second window before the session starts.',
    },

    {
      kind: 'end',
      title: 'See you next week',
      points: [
        'Sheet 1 is due on Moodle — check the exact date there.',
        'Slides and past sessions: my site (linked from Moodle).',
        'hserobyan@student.ethz.ch — genuinely, just email me.',
        'Next week: quantifiers and the start of set theory.',
      ],
    },
  ],
};
