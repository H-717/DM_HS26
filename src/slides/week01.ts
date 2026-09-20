// ---------------------------------------------------------------------------
// Week 1 — everything you say on screen lives in this file. Edit freely.
// See ./types.ts for the list of slide kinds and the text markup.
//
// Checked against: Exercise_01.pdf, Solution_01.pdf, the Moodle course page
// and the HS2026 TA meeting slides. The exercises below are our own adapted
// warm-ups: nothing on screen quotes or points at a numbered sheet exercise.
// ---------------------------------------------------------------------------

import type { Deck } from './types';

export const week01: Deck = {
  week: 1,
  topic: 'Statements, Proofs & Propositional Logic',
  date: 'Mon 21 Sep 2026',
  sheet: 'Exercise sheet 1',

  slides: [
    {
      kind: 'title',
      title: 'Exercise Session 1',
      subtitle: 'Statements, proofs, and propositional logic',
      footnote: 'Discrete Mathematics · HS 2026 · Group Q · CHN D 46',
    },

    {
      kind: 'points',
      title: 'Hi — I am your TA',
      points: [
        'Hayk Serobyan · hserobyan@ethz.ch',
        'Group **Q** · Mondays 16:15–18:00 · CHN D 46 · English.',
        'Ask me anything, during the session or by email. No question is too basic.',
        'Slides and worked solutions go on my site — https://h-717.github.io/DM_HS26',
      ],
      note:
        'Keep this to ~2 minutes. Write your email and the site URL on the board and leave it there all session.',
    },

    {
      kind: 'callout',
      title: 'How these sessions work',
      tone: 'info',
      body: [
        '**Short recap** of the week’s lecture ideas — 15 min, not a second lecture.',
        '**We solve problems together.** You try first, I ask, we discuss, then I write it up.',
        'From week 3 on I will also go through **last week’s bonus problem** and the common mistakes.',
        'Interrupt me. A session where nobody interrupts is a session I ran badly.',
      ],
      note:
        'Say out loud, every week, whether what I write on the board is a proof sketch or a full write-up of the standard expected from them.',
    },

    // -- how the course actually works ---------------------------------------

    {
      kind: 'callout',
      title: 'Exercise sheets — there is nothing to hand in',
      tone: 'info',
      body: [
        'A new sheet appears on Moodle **every Thursday**, for the following week.',
        'Nothing is collected and nothing is graded in writing. The only graded work is the **oral interview** (next slide).',
        'Want feedback on something you wrote anyway? Bring it to me or email it. I am happy to read it.',
        'Sheet 1 has **no bonus exercise**, no old-exam question, and a couple of exercises that need material from this week’s lectures.',
      ],
      note:
        'This is the first thing first-years get wrong: they hunt for a submission deadline that does not exist. Say it plainly.',
    },

    {
      kind: 'callout',
      title: 'Bonus points and the oral interviews',
      tone: 'warn',
      body: [
        'From **sheet 3** (out 24 Sep) onwards, every sheet carries one bonus problem, worth up to **6 bonus points**.',
        'Twice in the semester you have a **15-minute 1-to-1 session with me** and present your solution to that week’s bonus problem. You may bring your notes.',
        'Your two weeks are added to a grade out of 12. Final grade = exam grade P **+ 0.25 · (B/12)**, rounded to the nearest quarter.',
        'Bring your Legi. I am going to ask a few questions to check how much you let AI work.',
        'AI is fine for learning but useless for the exam. Try not to use it for the bonus. If you do, at least understand your solution.',
      ],
    //   note:
    //     'The full rules, including how to swap your slot, are on the Moodle front page. Do not paraphrase the grading formula from memory — it is on screen.',
    // },

    // {
    //   kind: 'points',
    //   title: 'Three dates, then we start',
    //   points: [
    //     '**Wed 23 Sep, 23:59** — last chance to register/change your tutorial and oral group on Moodle.',
    //     '**Wed 23 Sep, in the lecture** — the head TAs run a **mock interview** so you can see what an oral looks like. Sheet 0 is the script for it: you do not have to solve it and you are not interviewed on it.',
    //     '**Thu 24 Sep** — sheet 3 goes up, with the first bonus problem on it.',
    //     'Personal issues → dm26-team@lists.inf.ethz.ch. Anything other people might also wonder → the Student Forum.',
    //   ],
      note:
        'Check the oral schedule PDF before the session and tell them which oral group weeks are theirs if they already know their group.',
    },

    {
      kind: 'agenda',
      items: [
        'Recap: what is a mathematical statement?',
        'Recap: the five connectives and function tables',
        'Recap: the standard proof patterns',
        'A punctured chessboard',
        'A proof you cannot fault',
        'Formulas ↔ natural language',
        'Equivalence via function tables',
        'Two new operators',
        'Simplifying a formula',
        'Kahoot',
      ],
      title: 'Today',
      note:
        'These are our own problems, not the sheet — never put an exercise number on screen, just teach the move. Rough timing: 10 min admin, 15 min recap, 55 min exercises, 10 min Kahoot, 15 min buffer. If the clock beats you, cut part 2 of the two-operator problem — never the simplification, which is the one they will be marked on hardest.',
    },

    // -- recap ---------------------------------------------------------------

    {
      kind: 'points',
      title: 'A mathematical statement',
      lead: 'Lecture notes, Chapter 1',
      points: [
        'A **statement** is a sentence that is either **true** or **false** — no third option, no "it depends".',
        '"7 is prime" ✓  ·  "Every even number > 2 is a sum of two primes" ✓ (we just don’t know which)',
        '"x > 3" ✗ — not a statement until you say what x is. It is a **predicate**.',
        '"This sentence is false" ✗ — not a statement at all.',
        'Statements combine with ¬, ∧, ∨, →, ↔ into new statements.',
      ],
      note:
        'Push on the Goldbach example: the truth value exists even though nobody knows it. Truth ≠ provability-by-us.',
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
        'Spend the time on row 3: A → B is false ONLY here. And on rows 1-2: a false premise makes the implication true. This is the single most common source of confusion all semester. Also point out the row order 00, 01, 10, 11 — keep it, it is the convention the solutions use.',
    },

    {
      kind: 'callout',
      title: 'Be careful',
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
      points: [
        '**Direct**: assume A, chain implications, arrive at B.',
        '**Contraposition**: prove ¬B → ¬A instead of A → B. Same statement, often easier.',
        '**Contradiction**: assume A ∧ ¬B, derive something false.',
        '**Case distinction**: split into finitely many cases, cover all of them.',
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
        'A simplification proof is written in **exactly this currency** — one named rule per step, and the rules may be applied to whole formulas, not just to propositional symbols (§2.3.5).',
      ],
      note:
        'Have the lemma open on your laptop so you can quote the rule numbers the way the official solution does.',
    },

    // -- punctured board -----------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Warm-up',
      title: 'A board we can actually draw',
      prompt: [
        'A k × k board with one square punctured. P(k) = 1 whenever this holds:',
        '"No matter which square is punctured, the remaining k² − 1 squares can be covered completely with non-overlapping L-shaped pieces of three squares."',
        'Take **k = 4**.',
        '**Is P(4) = 1? And how many different cases does the proof consider?**',
      ],
      note:
        'Three minutes on this. Every idea the general problem needs is here, at a size that fits on the board. Ask "how many squares are there — and how many really different ones?" Do not hand them the symmetry argument.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Warm-up',
      title: 'Three cases, and a trick that scales',
      steps: [
        'Count first: 4² − 1 = 15, and 3 | 15. The piece count works out.',
        'The same 8 symmetries fold all 16 squares into the wedge r ≤ c ≤ 2.',
        'That leaves (1,1), (1,2), (2,2) — **3 cases** instead of 16.',
        'Now each case is easy. Cut the board into four 2 × 2 quadrants.',
        'Put one L-piece in the middle, taking one square from each quadrant that does **not** hold the hole.',
        'Every quadrant now has exactly 3 squares left — and 3 squares of a 2 × 2 block **is** an L-piece. ∎',
      ],
      note:
        'Say that this quadrant trick works for every 2ⁿ × 2ⁿ board. It is the kind of fact that makes the idea stick, and it costs one sentence.',
    },

    {
      kind: 'grid',
      title: 'Warm-up · Hole in a corner, five pieces',
      lead: 'E is the middle piece — it takes one square from each of the other three quadrants.',
      cells: [
        '.ABB',
        'AAEB',
        'CEED',
        'CCDD',
      ],
      legend:
        'A finishes the hole’s own quadrant. B, C and D each finish theirs, because E left exactly 3 squares behind in each.',
      note:
        'Draw the quadrant lines on the board before showing this — the picture only lands once they see the four 2 × 2 blocks.',
    },


    // -- a proof from a false assumption --------------------------------------

    {
      kind: 'exercise',
      ref: 'Warm-up',
      title: 'A proof you cannot fault',
      prompt: [
        '**Claim:** 0 is the largest natural number.',
        '**"Proof":**  n is the largest natural number ⇒ 2n ≤ n ⇒ n ≤ 0 ⇒ n = 0.',
        'Every implication really is correct. So what is wrong?',
      ],
      note:
        '2n rather than n² on purpose: nobody gets stuck on the algebra, so they reach the actual point faster.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Warm-up',
      title: 'Nothing is wrong with the proof. Something is wrong with the claim.',
      steps: [
        '2n is a natural number and n is the largest one, so 2n ≤ n. ✓',
        'Subtract n from both sides: n ≤ 0. And n ∈ ℕ, so n = 0. ✓',
        'So the chain proves: **if** a largest natural number exists, **then** it equals 0.',
        'Now make the same move on n + 1: it is a natural number too, so n + 1 ≤ n, that is **1 ≤ 0**.',
        'That is false outright, and every step getting there was correct. So the assumption is what breaks: ℕ has no largest element.',
        '**Moral:** a chain of correct implications out of a false assumption proves nothing at all.',
      ],
      note:
        'The punchline writes itself: two correct chains out of the same assumption, one of them landing on 1 ≤ 0.',
    },


    // -- formalising natural language ------------------------------------------

    {
      kind: 'exercise',
      ref: 'Warm-up',
      title: 'Formulas into words, words into formulas',
      prompt: [
        'A = "Ana revised for the exam."   B = "Ana passed the exam."',
      ],
      parts: [
        'Interpret G₁ = ¬B → ¬A and G₂ = (A ∧ B) ∨ (¬A ∧ ¬B) in words.',
        'Formalise G₃: "Ana neither revised nor passed." and G₄: "Ana either revised or passed, but not both."',
        'Negate G₄ — as a formula, and as a sentence.',
      ],
      note:
        'One negation, not two. Anyone who prepared finishes in 60 seconds; anyone who did not gets their first win of the semester.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Warm-up',
      title: 'Worked through',
      steps: [
        'G₁ = ¬B → ¬A: "If Ana did not pass, then she did not revise."',
        'That is the **contraposition** of A → B, so G₁ ≡ A → B.',
        'G₂: "Either she revised and passed, or she did neither." — i.e. G₂ ≡ A ↔ B.',
        'G₃ = ¬A ∧ ¬B.   ("neither … nor")',
        'G₄ = (¬A ∧ B) ∨ (A ∧ ¬B).   ("… but not both" — exclusive or)',
        '¬G₄ ≡ (A ∧ B) ∨ (¬A ∧ ¬B) ≡ G₂:  "Ana passed if and only if she revised."',
        'The negation of XOR is ↔ — **not** "neither". That is the trap, and it is worth marks every year.',
      ],
    },


    // -- function tables ---------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Warm-up',
      title: 'Two variables, four rows',
      prompt: [
        'G = (A → B) → ( (A ∧ ¬B) ∧ ¬A )',
      ],
      parts: [
        'Compute the function table of G — all four rows.',
        'Give an equivalent formula in which each symbol appears at most once.',
      ],
      hint: [
        'Look hard at the right-hand side of the outer → before you write anything down.',
      ],
      note:
        'The shape to teach: a self-contradictory consequent collapses the implication to the negation of its antecedent. Two variables, so it fits on the board.',
    },

    {
      kind: 'table',
      title: 'Warm-up · The table',
      lead: 'G is 1 on exactly one row.',
      headers: ['A', 'B', 'A → B', 'A ∧ ¬B', '¬A', 'RHS', 'G'],
      rows: [
        ['0', '0', '1', '0', '1', '0', '0'],
        ['0', '1', '1', '0', '1', '0', '0'],
        ['1', '0', '0', '1', '0', '0', '1'],
        ['1', '1', '1', '0', '0', '0', '0'],
      ],
      markRows: [2],
      note:
        'The RHS column is all zeros — that is the whole exercise.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Warm-up',
      title: 'Why the right-hand side is never true',
      steps: [
        'A ∧ ¬B forces **A = 1**.  ¬A forces **A = 0**.',
        'Their conjunction therefore contains A ∧ ¬A ≡ ⊥ — the consequent is unsatisfiable.',
        'So G ≡ (A → B) → ⊥ ≡ ¬(A → B) ≡ ¬(¬A ∨ B) ≡ **A ∧ ¬B**.',
        'Each of A and B appears once, so that answers part 2.',
        'Check it against the table: the only 1 sits at A = 1, B = 0. ✓',
        'Any consequent that cannot be satisfied collapses the same way, however many variables hide it.',
      ],
    },


    // -- two new operators --------------------------------------------------------

    {
      kind: 'table',
      title: 'Warm-up · Two new operators',
      lead: 'Two operators you have not met, defined by nothing but their columns.',
      headers: ['A', 'B', 'A ★ B', 'A ◆ B'],
      rows: [
        ['0', '0', '0', '1'],
        ['0', '1', '1', '1'],
        ['1', '0', '0', '1'],
        ['1', '1', '0', '0'],
      ],
      note:
        '★ is ¬A ∧ B and ◆ is NAND — do not say so yet, it is a nice thing for them to notice at the end.',
    },

    {
      kind: 'exercise',
      ref: 'Warm-up',
      title: 'Commutative? And one equivalence to settle',
      prompt: ['With ★ and ◆ defined by the table on the previous slide:'],
      parts: [
        'Is ★ commutative? Is ◆? Argue by comparing function tables.',
        'Prove or disprove:  (A ★ B) ◆ (B ★ A) ≡ A ◆ B.',
      ],
      note:
        'Part 2 is a four-row table and the answer falls out of a single row — the whole lesson, a third of the writing.',
    },

    {
      kind: 'table',
      title: 'Warm-up · Everything you need, in one table',
      lead: 'Build the last two columns live, left to right.',
      headers: ['A', 'B', 'A ★ B', 'B ★ A', '(A★B) ◆ (B★A)', 'A ◆ B'],
      rows: [
        ['0', '0', '0', '0', '1', '1'],
        ['0', '1', '1', '0', '1', '1'],
        ['1', '0', '0', '1', '1', '1'],
        ['1', '1', '0', '0', '1', '0'],
      ],
      markRows: [3],
      note:
        'The marked row is the entire answer to part 2. Everything above it agrees, which is exactly why one row is enough.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Warm-up',
      title: 'The verdicts',
      steps: [
        'A ★ B and B ★ A differ on rows 01 and 10, so **★ is not commutative**.',
        'A ◆ B and B ◆ A agree on every row, so **◆ is commutative**.',
        'Part 2: A ★ B and B ★ A can never both be 1 — the first needs A = 0, the second needs A = 1.',
        'So (A ★ B) ◆ (B ★ A) is 1 on every row: the left-hand side is a **tautology**.',
        'But A ◆ B is 0 at A = B = 1. One differing row ⇒ **not equivalent**. ∎',
        'One row kills an equivalence. Establishing one costs you every row.',
      ],
      note:
        'If someone spots that ★ is ¬A ∧ B and ◆ is NAND, let them say it — then point out that the tables settled it without needing the names at all.',
    },


    // -- simplification in named rules ----------------------------------------------

    {
      kind: 'exercise',
      ref: 'Warm-up',
      title: 'Five steps, each one with a name',
      prompt: [
        'H = ( (A ∨ B) ∧ A ) ∧ ( ¬A ∨ C )',
        'Find G ≡ H in which A, B and C each appear at most once, and prove H ≡ G naming **one rule per step**.',
      ],
      note:
        'The answer is visible by eye: A has to be true, and then C has to be. Say that out loud — the exercise is the write-up, not the answer.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Warm-up',
      title: 'Written the way it has to be written',
      steps: [
        'H ≡ A ∧ ( ¬A ∨ C )    — **absorption**: (X ∨ Y) ∧ X ≡ X, with X = A',
        '≡ ( A ∧ ¬A ) ∨ ( A ∧ C )    — **distributivity**',
        '≡ ⊥ ∨ ( A ∧ C )    — **F ∧ ¬F ≡ ⊥**',
        '≡ ( A ∧ C ) ∨ ⊥    — **commutativity of ∨**',
        '≡ A ∧ C    — **F ∨ ⊥ ≡ F**',
        'G = A ∧ C. B has vanished; A and C appear once each. ∎',
      ],
      note:
        'Step 4 is the one to linger on: the allowed rule is written F ∨ ⊥ ≡ F, so you must commute first. Pedantic — and exactly the pedantry these proofs are marked on.',
    },

    {
      kind: 'callout',
      title: 'Always sanity-check a simplification',
      tone: 'good',
      body: [
        'G = A ∧ C is 1 only when A = 1 **and** C = 1.',
        'Spot-check H on A = 1, B = 0, C = 0: first bracket (1 ∨ 0) ∧ 1 = 1, second bracket ¬1 ∨ 0 = 0 ⇒ H = 0 = G ✓',
        'Pick a row where you expect 0 and a row where you expect 1. Two minutes of this catches almost every algebra slip.',
      ],
      note:
        'Make them do the check, not you. It is the single habit that saves the most marks in the written exam.',
    },


    // -- wrap ----------------------------------------------------------------

    {
      kind: 'callout',
      title: 'Now go and practise',
      tone: 'warn',
      body: [
        'Six moves came up today: **symmetry then cases · a false assumption · formalising sentences · function tables · a new operator read off its table · simplification in named rules**.',
        'That is the whole of this week. Nothing else is hiding.',
        'The sheet on Moodle asks for those same moves, bigger. Nothing is collected — do it anyway, that is what the exam is.',
        'Official solutions go up on Moodle. Check yours against them, and bring me anything that did not match.',
      ],
      note:
        'Do not skip this slide, it is the bridge between the session and their own work. Name the six moves off the screen; do not walk them through the sheet exercise by exercise.',
    },

    {
      kind: 'points',
      title: 'What to take away',
      points: [
        'A statement has a truth value. A predicate does not, until you fix its variables.',
        'A → B is false in exactly one row. Learn that row.',
        'A correct chain of implications from a false assumption proves nothing.',
        'To disprove an equivalence, one row is enough. To prove one, you need every row.',
        'Simplification proofs are written in **named rules**, one per step.',
        'Symmetry turned 16 cases into 3. Look for it before you start drawing.',
      ],
    },

    {
      kind: 'title',
      title: 'Kahoot',
      subtitle: 'Join at kahoot.it',
      footnote: 'Everything on it came up in the last hour.',
      note:
        'Open the Kahoot in a second window BEFORE the session starts, and have the game PIN up before you switch. If you are using Emil’s quiz, read every question first: his is written for his own group and may lean on something you did not cover. kahoot/week01.csv in this repo is your own 8-question set as a fallback — it maps 1:1 onto this deck.',
    },

    {
      kind: 'end',
      title: 'See you next week',
      points: [
        'Nothing to hand in for sheet 1 — but do it anyway, that is what the exam is.',
        'Register your tutorial and oral group by Wed 23 Sep, 23:59.',
        'Mock interview in Wednesday’s lecture. Sheet 3, with the first bonus problem, lands Thursday.',
        'hserobyan@ethz.ch — genuinely, just email me.',
        'Next week: logical consequence, satisfiability, and the first quantifiers.',
      ],
    },
  ],
};
