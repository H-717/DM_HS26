// ---------------------------------------------------------------------------
// Week 3 — everything you say on screen lives in this file. Edit freely.
// See ./types.ts for the list of slide kinds and the text markup.
// ---------------------------------------------------------------------------

import type { Deck } from './types';

export const week03: Deck = {
  week: 3,
  topic: 'Predicate Logic & Proof Patterns',
  date: 'Week 3',
  sheet: 'Exercise sheet 3 (HS 2025)',

  slides: [
    {
      kind: 'title',
      title: 'Exercise Session 3',
      subtitle: 'Modelling in predicate logic, then proving things properly',
      footnote: 'Discrete Mathematics · HS 2026 · practising on sheet 3',
    },

    {
      kind: 'agenda',
      items: [
        '3.1 Family relations in predicate logic',
        '3.3 Winning strategies — why quantifier order is everything',
        '3.4 Indirect proof',
        '3.5 Case distinction',
        '3.6 Proof by contradiction',
        '3.2 and 3.7 — the presentation exercises',
        'Kahoot',
      ],
      note: 'Heavy sheet. If time runs short, drop 3.6.2 — it is the least load-bearing.',
    },

    // -- 3.1 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '3.1',
      title: 'Relations Between Humans  (⋆)',
      prompt: [
        'Universe: all humans, alive or dead. One predicate: par(x, y) = "x is a parent of y".',
        '**No equality allowed.** Express:',
      ],
      parts: ['x is a great-grandparent of y', 'x and y are (first) cousins'],
      note: 'Part 1 warms them up. Part 2 is the real exercise — the equality ban is the whole difficulty.',
    },

    {
      kind: 'solution',
      ref: '3.1',
      title: 'Great-grandparent is a chain',
      reveal: true,
      steps: [
        '∃u ∃v ( par(x, u) ∧ par(u, v) ∧ par(v, y) )',
        'Read it left to right: x parents u, u parents v, v parents y. Three generations.',
        'You do **not** need u ≠ v ≠ y here — the parent relation already rules out loops in any sane universe.',
        'Common slip: writing par(u, x) instead of par(x, u). Fix the argument order once, out loud, and it stops happening.',
      ],
    },

    {
      kind: 'solution',
      ref: '3.1',
      title: 'Cousins, without ever saying "≠"',
      reveal: true,
      steps: [
        'Cousins = a shared grandparent, but **not** siblings.',
        '∃u ∃v ∃w ( par(w, u) ∧ par(w, v) ∧ par(u, x) ∧ par(v, y) ∧ ¬par(u, y) ∧ ¬par(v, x) )',
        'The first four conjuncts: w is a grandparent of both x and y, through parents u and v.',
        'The last two do the work equality would have done: u is not a parent of y, and v is not a parent of x.',
        'That forces u ≠ v, and rules out x and y being siblings — without an equality predicate.',
        '**The technique:** when you cannot say "different", say something the two would share if they were the same.',
      ],
      note:
        'Emphasise the last line. It comes back whenever a modelling exercise restricts the vocabulary.',
    },

    // -- 3.3 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '3.3',
      title: 'Winning Strategy  (⋆⋆)',
      prompt: [
        'Alice picks integers a₁, a₂; Bob picks b₁, b₂. Alice wins iff  a₁ + (a₂ + b₁)^(|b₂|+1) = 1.',
      ],
      parts: [
        'All four numbers are announced simultaneously. Formalise "Alice has a winning strategy". Is it true?',
        'Now they alternate: a₁, then b₁, then a₂, then b₂. Same two questions.',
      ],
      note: 'Ask first: "what changes between the two games?" Nothing but quantifier order.',
    },

    {
      kind: 'solution',
      ref: '3.3',
      title: 'Simultaneous: Alice loses',
      reveal: true,
      steps: [
        '∃a₁ ∃a₂ ∀b₁ ∀b₂ [ a₁ + (a₂ + b₁)^(|b₂|+1) = 1 ]',
        'Alice must commit to both numbers before seeing anything. Bob can then set t = a₂ + b₁ to **any** integer.',
        'Take b₁ with t = 0: the exponent |b₂| + 1 ≥ 1, so 0^(|b₂|+1) = 0, and Alice needs a₁ = 1.',
        'Take b₁ with t = 1: then 1^(anything) = 1, and Alice needs a₁ = 0.',
        'a₁ cannot be both. **The statement is false.**',
      ],
    },

    {
      kind: 'solution',
      ref: '3.3',
      title: 'Alternating: Alice wins',
      reveal: true,
      steps: [
        '∃a₁ ∀b₁ ∃a₂ ∀b₂ [ a₁ + (a₂ + b₁)^(|b₂|+1) = 1 ]',
        'Now a₂ is chosen **after** b₁ is known. Alice plays a₁ = 1, then answers b₁ with a₂ = −b₁.',
        'Then a₂ + b₁ = 0, and since |b₂| + 1 ≥ 1 we get 0^(|b₂|+1) = 0 whatever Bob does.',
        'The expression is 1 + 0 = 1. **True** — Alice has a winning strategy.',
        'Same game, same arithmetic. The only difference is where ∃a₂ sits relative to ∀b₁.',
        '**That is what quantifier order means**: who has to commit first.',
      ],
      note:
        'This is the best intuition for ∀∃ vs ∃∀ in the whole course. Spend time here; it pays off in week 4 and at the exam.',
    },

    // -- 3.4 -----------------------------------------------------------------

    {
      kind: 'callout',
      title: 'Three patterns, one page',
      tone: 'info',
      body: [
        '**Indirect (contraposition)**: to show A → B, show ¬B → ¬A.',
        '**Case distinction**: split the universe into finitely many cases that *cover everything*, prove each.',
        '**Contradiction**: assume the negation, derive something known false.',
        'Say which one you are using in the first line of your proof. It costs one sentence and buys the reader everything.',
      ],
    },

    {
      kind: 'exercise',
      ref: '3.4',
      title: 'Indirect Proof',
      prompt: ['Prove indirectly, for natural numbers n > 0:'],
      parts: ['If n² is odd, then n is odd.  (⋆)', 'If 42ⁿ − 1 is prime, then n is odd.  (⋆⋆)'],
    },

    {
      kind: 'solution',
      ref: '3.4',
      title: 'Both by contraposition',
      reveal: true,
      steps: [
        '**1.** Contrapositive: n even ⇒ n² even. Write n = 2k. Then n² = 4k² = 2·(2k²), which is even. ∎',
        '**2.** Contrapositive: n even ⇒ 42ⁿ − 1 is not prime. Write n = 2m.',
        '42ⁿ − 1 = (42^m)² − 1 = (42^m − 1)(42^m + 1) — a difference of squares.',
        'For m ≥ 1 both factors are ≥ 41, so the number is composite. ∎',
        'Why contraposition is the right choice here: "n is odd" as a hypothesis gives you nothing to factor. "n is even" hands you n = 2m.',
      ],
      note:
        'Ask what goes wrong with a direct proof of 2 before revealing. The answer — no usable handle — is the lesson.',
    },

    // -- 3.5 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '3.5',
      title: 'Case Distinction',
      prompt: ['Prove by case distinction:'],
      parts: [
        'n³ + 2n + 6 is divisible by 3 for every natural n ≥ 0.  (⋆)',
        'If p and p² + 2 are prime, then p³ + 2 is prime.  (⋆⋆)',
      ],
      hint: ['Both become easy the moment you split by the remainder modulo 3.'],
    },

    {
      kind: 'table',
      title: '3.5.1 · Three cases, modulo 3',
      lead: 'Every natural number is ≡ 0, 1 or 2 (mod 3). That covers everything.',
      headers: ['n mod 3', 'n³ mod 3', '2n mod 3', '6 mod 3', 'sum mod 3'],
      rows: [
        ['0', '0', '0', '0', '0'],
        ['1', '1', '2', '0', '0'],
        ['2', '2', '1', '0', '0'],
      ],
      markRows: [0, 1, 2],
      note:
        'Slicker one-liner if they are ahead: n³ ≡ n (mod 3), so the sum ≡ 3n + 6 ≡ 0. Fermat’s little theorem, previewed.',
    },

    {
      kind: 'solution',
      ref: '3.5',
      title: '3.5.2 · Only p = 3 survives',
      reveal: true,
      steps: [
        'Split on p mod 3.',
        '**p ≢ 0 (mod 3):** then p ≡ 1 or 2, so p² ≡ 1, hence p² + 2 ≡ 0 (mod 3).',
        'And p² + 2 > 3, so it is divisible by 3 and larger than 3 — not prime. This case never satisfies the hypothesis.',
        '**p ≡ 0 (mod 3) and p prime:** forces p = 3. Check: p² + 2 = 11 is prime ✓.',
        'So the only p reaching the conclusion is p = 3, and p³ + 2 = 29, which is prime. ∎',
        'Note what happened: the case distinction did not split the *proof*, it eliminated a case entirely.',
      ],
      note:
        'Worth naming: proving "A ⇒ B" by showing A holds in only one situation is completely legitimate and feels like cheating the first time.',
    },

    // -- 3.6 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '3.6',
      title: 'Proof by Contradiction',
      prompt: [],
      parts: [
        'The sum of a rational and an irrational number is irrational.  (⋆⋆)',
        '2^(1/n) is irrational for n > 2, using Fermat’s Last Theorem.  (⋆⋆⋆)',
      ],
      hint: [
        'For 1: the difference of two rationals is rational.',
        'For 2: FLT says no positive integers satisfy aⁿ + bⁿ = cⁿ for n > 2. Make your contradiction look like that.',
      ],
    },

    {
      kind: 'solution',
      ref: '3.6',
      title: 'Rational + irrational',
      reveal: true,
      steps: [
        'Let r be rational, i irrational. Suppose r + i is rational; call it q.',
        'Then i = q − r, a difference of two rationals, hence rational.',
        'That contradicts i being irrational. So r + i is irrational. ∎',
        'Three lines. The whole trick is *which* statement you negate: negate the conclusion, not the hypotheses.',
      ],
    },

    {
      kind: 'solution',
      ref: '3.6',
      title: '2^(1/n) and Fermat',
      reveal: true,
      steps: [
        'Suppose 2^(1/n) is rational: 2^(1/n) = a/b with a, b positive integers.',
        'Raise both sides to the n-th power: 2 = aⁿ / bⁿ, so **aⁿ = 2bⁿ**.',
        'Rewrite the right-hand side as a sum: **bⁿ + bⁿ = aⁿ**.',
        'That is three positive integers b, b, a satisfying xⁿ + yⁿ = zⁿ with n > 2 — impossible by Fermat’s Last Theorem.',
        'So 2^(1/n) is irrational for every n > 2. ∎',
        'The rewrite 2bⁿ = bⁿ + bⁿ is the entire exercise. Everything else is routine.',
      ],
      note:
        'Fun aside if there is time: this proof is valid but absurdly heavy — 350 years of mathematics to prove ∛2 is irrational.',
    },

    // -- presentation --------------------------------------------------------

    {
      kind: 'exercise',
      ref: '3.2 / 3.7',
      title: 'The presentation exercises',
      prompt: [
        '**3.2** — formalise four statements about ℕ \\ {0} using <, |, =, prime, + and ·.',
        '**3.7** — decide whether two unusual proof patterns are sound, by writing each as a statement about logical consequence.',
        '**We are not solving these today.**',
      ],
      hint: [
        '3.2: "there is no largest" is ∀ … ∃ … — the shape of 1.2 from week 1, now written formally.',
        '3.2: "the only divisors of a prime are 1 and itself" needs an implication *inside* a ∀, not a conjunction.',
        '3.7: translate each pattern into the form "premises ⊨ conclusion" first. Once it is a ⊨ statement it is just week 2 again.',
        '3.7: one of the two is sound and one is not. Decide by finding an assignment, not by intuition.',
      ],
      note: 'Method only. Both are short once translated — resist walking them through it.',
    },

    {
      kind: 'points',
      title: 'What to take away',
      points: [
        'When the vocabulary is restricted, encode the missing idea instead of assuming it.',
        'Quantifier order = who commits first. ∀∃ and ∃∀ are different games.',
        'Contraposition when the hypothesis gives you no handle.',
        'Case distinction must **cover** everything — say why it does.',
        'Contradiction: negate the conclusion, keep the hypotheses.',
      ],
    },

    {
      kind: 'title',
      title: 'Kahoot',
      subtitle: 'Five questions · join at kahoot.it',
      footnote: 'Questions in kahoot/week03.csv',
    },

    {
      kind: 'end',
      title: 'See you next week',
      points: [
        'Next: sets, relations, and the first properties worth memorising.',
        'Your real sheet is on Moodle — bring it if it differs from mine.',
        'hserobyan@student.ethz.ch',
      ],
    },
  ],
};
