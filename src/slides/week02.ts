// ---------------------------------------------------------------------------
// Week 2 — everything you say on screen lives in this file. Edit freely.
// See ./types.ts for the list of slide kinds and the text markup.
// ---------------------------------------------------------------------------

import type { Deck } from './types';

export const week02: Deck = {
  week: 2,
  topic: 'Logical Consequence, Satisfiability & Quantifiers',
  date: 'Week 2',
  sheet: 'Exercise sheet 2 (HS 2025)',

  slides: [
    {
      kind: 'title',
      title: 'Exercise Session 2',
      subtitle: 'Consequence, satisfiability, and the first quantifiers',
      footnote: 'Discrete Mathematics · HS 2026 · practising on sheet 2',
    },

    {
      kind: 'agenda',
      items: [
        'Recap: ⊨ versus →, and satisfiable versus valid',
        '2.1 Logical consequence',
        '2.2 Satisfiability and tautologies',
        '2.4 Knights and knaves',
        '2.5 Quantifiers and predicates',
        '2.3 — the presentation exercise',
        'Kahoot',
      ],
      note: 'The whole session hangs on the ⊨ / → distinction. If that lands, everything else is easy.',
    },

    {
      kind: 'callout',
      title: 'The distinction the whole week rests on',
      tone: 'warn',
      body: [
        '**F → G** is a *formula*. It has a truth value under each assignment.',
        '**F ⊨ G** is a *statement about* formulas: every assignment satisfying F also satisfies G.',
        'They are linked: F ⊨ G holds exactly when F → G is a tautology.',
        'So ⊨ is not a connective. You cannot write ¬(F ⊨ G) inside a formula.',
      ],
      note: 'Write both on the board side by side. Ask them which one can appear inside a truth table.',
    },

    {
      kind: 'points',
      title: 'The four words',
      reveal: true,
      points: [
        '**Satisfiable**: true under at least one assignment.',
        '**Unsatisfiable**: true under none. (¬F is then a tautology.)',
        '**Tautology / valid**: true under every assignment.',
        '**Falsifiable**: false under at least one assignment.',
        'Satisfiable and tautology are not opposites — every tautology is satisfiable.',
        'To disprove a tautology: **one** counterexample. To prove one: **all** rows.',
      ],
    },

    // -- 2.1 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '2.1',
      title: 'Logical Consequence  (⋆)',
      prompt: ['Prove or disprove each of the following.'],
      parts: [
        'A ∧ (A → B) ⊨ B',
        'A → B ⊨ ¬A → ¬B',
        '⊨ (A → B) ∨ (B → A)',
        '(A → B) ∧ (B → C) ⊨ (A → C)',
      ],
      note: 'Let them try 5 minutes. Most will get 1 and 4 and fall into 2.',
    },

    {
      kind: 'solution',
      ref: '2.1',
      title: 'One and four hold',
      reveal: true,
      steps: [
        '**1. True** (modus ponens). Take any assignment satisfying the left side. Then A = 1, and A → B = 1. A row with A = 1 and A → B = 1 forces B = 1. ∎',
        '**4. True** (transitivity). Assume the left side and A = 1. From A → B we get B = 1; from B → C we get C = 1. So A → C = 1. ∎',
        'Both proofs are three lines. You never needed a full table.',
      ],
    },

    {
      kind: 'solution',
      ref: '2.1',
      title: 'Two fails, three is a tautology',
      reveal: true,
      steps: [
        '**2. False.** Take A = 0, B = 1. Then A → B = 1, but ¬A → ¬B = 1 → 0 = **0**. One row is enough. ∎',
        'The valid direction is A → B ⊨ ¬B → ¬A — contraposition swaps *and* negates. Swapping only is the classic error.',
        '**3. True.** Suppose (A → B) = 0. Then A = 1 and B = 0. But then B → A = 0 → 1 = 1.',
        'So at least one disjunct is always 1, i.e. the disjunction is a tautology. ∎',
        'Note how odd 3 is in words: "either the rain implies the picnic, or the picnic implies the rain" is a logical truth. → really is just a column.',
      ],
      note:
        'Point 3 back at last week: → carries no notion of relevance. This is the cleanest demonstration of that.',
    },

    // -- 2.2 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '2.2',
      title: 'Satisfiability and Tautologies  (⋆)',
      prompt: [
        'For each formula: satisfiable or not? Tautology or not? Prove your answers.',
      ],
      parts: [
        '(A ∨ B) ∧ ¬A',
        '((A → B) ∧ (B → C)) ∧ ¬(A → C)',
      ],
      hint: ['You proved something in 2.1 that kills the second one instantly.'],
    },

    {
      kind: 'solution',
      ref: '2.2',
      title: 'Both answers, and the shortcut',
      reveal: true,
      steps: [
        '**1. Satisfiable**: A = 0, B = 1 gives (0 ∨ 1) ∧ 1 = 1.',
        '**Not a tautology**: A = 1 gives ¬A = 0, so the conjunction is 0.',
        '**2. Unsatisfiable.** By 2.1.4, (A → B) ∧ (B → C) ⊨ A → C.',
        'So any assignment making the first conjunct true makes A → C true, hence ¬(A → C) false — the conjunction can never be 1. ∎',
        '**Not a tautology** — it is never true at all, so certainly not always true.',
        'The 8-row table also works. The point is that you had already done the work.',
      ],
    },

    // -- 2.4 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '2.4',
      title: 'Knights and Knaves  (⋆⋆⋆)',
      prompt: [
        'Knights always tell the truth, knaves always lie, and they look identical. You are at a fork: one road leads to a village, the other to a jungle. One islander will answer exactly one yes/no question.',
        'A = "the left road leads to the village", B = "the islander is a knight". Find a formula F such that asking "is F true?" always reveals A.',
      ],
      note:
        'Give this a full 8 minutes in pairs. It is the exercise they will remember from the whole semester.',
    },

    {
      kind: 'solution',
      ref: '2.4',
      title: 'Ask about  A ↔ B',
      reveal: true,
      steps: [
        'The trick: build a question whose *lie* is as informative as its truth.',
        'Take **F = A ↔ B** — "is it true that the left road leads to the village if and only if you are a knight?"',
        '**Knight** (B = 1): F = A ↔ 1 = A, and he answers truthfully → answer = A.',
        '**Knave** (B = 0): F = A ↔ 0 = ¬A, and he lies → answer = ¬(¬A) = A.',
        'Either way the answer **is** A. "Yes" ⇒ take the left road. ∎',
        'Why it works: the knave lies about a statement that already had A flipped inside it. Two flips cancel.',
      ],
      note:
        'A ⊕ ¬B works too — same formula. If someone proposes the folklore "what would the *other* one say", note it needs two islanders.',
    },

    // -- 2.5 -----------------------------------------------------------------

    {
      kind: 'points',
      title: 'Quantifiers: reading them out loud',
      reveal: true,
      points: [
        '∀x F(x) — "for every x in the universe, F(x)". Universe matters: fix it before you argue.',
        '∃x F(x) — "for at least one x".',
        '¬∀x F(x) ≡ ∃x ¬F(x)  and  ¬∃x F(x) ≡ ∀x ¬F(x). Negation walks inward and flips each quantifier.',
        '**Order is not free**: ∀x ∃y differs from ∃y ∀x. "Everyone has a mother" vs "someone is everyone’s mother".',
        'A bound variable is local. The y in ∃y P(y) has nothing to do with an outer ∀y.',
      ],
    },

    {
      kind: 'exercise',
      ref: '2.5',
      title: 'Quantifiers and Predicates — part 1',
      prompt: [
        'Universe ℤ. Only the predicates <, =, prime, plus + and ·. Formalise, then say which are true.',
      ],
      parts: [
        'If the product of two integers is positive, then at least one of them is positive.',
        'For every natural number there is a strictly greater one divisible by 3.',
        'Every even integer greater than 2 is a sum of two primes.',
      ],
    },

    {
      kind: 'solution',
      ref: '2.5',
      title: 'Part 1 — the formulas',
      reveal: true,
      steps: [
        '(a) ∀x ∀y ( 0 < x·y → (0 < x ∨ 0 < y) ) — **false**. Take x = y = −1: the product is 1 > 0, neither factor is positive.',
        '(b) ∀n ∃m ( n < m ∧ ∃k (m = k + k + k) ) — **true**. Divisibility by 3 with no "|" available: say m is a sum of three equal parts.',
        '(c) ∀n ( (2 < n ∧ ∃k (n = k + k)) → ∃p ∃q ( prime(p) ∧ prime(q) ∧ n = p + q ) )',
        '(c) is **Goldbach’s conjecture** — nobody knows. It is still a statement: it has a truth value, we just do not know it.',
        'Note the shape of (a): a universally quantified implication. "If … then …" almost always sits under a ∀.',
      ],
      note:
        '(a) catches nearly everyone — they read "positive product ⇒ a positive factor" as obviously true and forget two negatives.',
    },

    {
      kind: 'exercise',
      ref: '2.5',
      title: 'Quantifiers and Predicates — part 2',
      prompt: [
        'Universe ℤ. P(x) = 1 iff x > 0.   Q(x, y) = 1 iff x·y = 1.',
        'Describe each statement in words and decide whether it is true.',
      ],
      parts: ['∀x ∃y Q(x, y)', '∃x ( ∀y ¬Q(x, y) ∧ ∃y P(y) )'],
    },

    {
      kind: 'solution',
      ref: '2.5',
      title: 'Part 2 — and a scope trap',
      reveal: true,
      steps: [
        '(a) "Every integer has a multiplicative inverse in ℤ." **False** — take x = 0, or x = 2. Only ±1 work.',
        '(b) "There is an integer with no inverse, and some integer is positive."',
        'The two conjuncts are independent: the inner ∃y P(y) does **not** see the ∀y next to it. Different bound y.',
        'First conjunct: x = 0 works. Second: y = 1 works. So (b) is **true**.',
        'Rewriting it as ( ∃x ∀y ¬Q(x,y) ) ∧ ( ∃y P(y) ) changes nothing — and reads far better.',
      ],
      note:
        'This is the slide to slow down on. Variable scope causes more exam mistakes than any single piece of content.',
    },

    // -- presentation --------------------------------------------------------

    {
      kind: 'exercise',
      ref: '2.3',
      title: 'Simplifying a Formula — for presentation',
      prompt: [
        'F = (B → A) ∧ ¬( (¬A ∧ ¬C) ∧ (¬C ∨ B) )',
        'Find G ≡ F with each of A, B, C appearing at most once, in at most **7** named steps.',
        '**We are not solving this today.**',
      ],
      hint: [
        'Push the outer ¬ inward with De Morgan before anything else — you cannot simplify what you cannot see.',
        'Look for absorption: X ∧ (X ∨ Y) ≡ X, and its dual. Sheet 1’s exercise 1.6 had the same shape.',
        'Rewrite → only when you need to. Every rewrite costs one of your 7 steps.',
        'Sanity-check the result on two or three assignments before you write it up.',
      ],
      note: 'Method only. Do not walk them to the answer.',
    },

    {
      kind: 'points',
      title: 'What to take away',
      points: [
        '⊨ is a claim about all assignments; → is a column in a table.',
        'To disprove: one row. To prove: an argument about every row.',
        'Contraposition swaps **and** negates.',
        'Quantifier order changes the meaning. Bound variables are local.',
        'A statement can be perfectly well-formed and still have an unknown truth value.',
      ],
    },

    {
      kind: 'title',
      title: 'Kahoot',
      subtitle: 'Five questions · join at kahoot.it',
      footnote: 'Questions in kahoot/week02.csv',
    },

    {
      kind: 'end',
      title: 'See you next week',
      points: [
        'Next: predicate logic in earnest, and the standard proof patterns.',
        'Your real sheet is on Moodle — bring it if it differs from mine.',
        'hserobyan@student.ethz.ch',
      ],
    },
  ],
};
