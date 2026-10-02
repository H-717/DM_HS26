// ---------------------------------------------------------------------------
// Week 3 — everything you say on screen lives in this file. Edit freely.
// See ./types.ts for the list of slide kinds and the text markup.
//
// Checked against: Exercise_03.pdf, Solution_03_with_grading_scheme.pdf and
// the lecture notes (Def. 2.10–2.11, §2.4.5, Def. 2.13–2.17, Lemmas 2.6, 2.8
// and 2.9). The roadmap has all of §2.6 on Sep 30, so indirect proof, case
// distinction and contradiction have been seen. The Oct 5 lecture (§3.1–3.2)
// is not used.
//
// Each exercise is a twin of one on the sheet — same shape, other content:
//   Exercise 1 ↔ 3.1   Exercise 2 ↔ 3.3   Exercise 3 ↔ 3.4
//   Exercise 4 ↔ 3.5   Exercise 5 ↔ 3.6   Exercise 6 ↔ 3.7
//   Exercise 7 ↔ 3.8.1–3.8.2   (no twin of 3.8.3, it is about a free variable)
// Exercise 1 uses child instead of par, so its solutions are not the sheet's
// with renamed variables.
// 3.2 is the graded interview exercise and is not touched anywhere. It asks
// what an interpretation has to define, how P(x) differs from ∀x P(x), to
// translate a nested-quantifier formula into words, and to build an
// interpretation separating two formulas. So none of these are recapped or
// practised on screen. Nothing on screen names a sheet exercise.
// ---------------------------------------------------------------------------

import type { Deck } from './types';

export const week03: Deck = {
  week: 3,
  topic: 'Predicate Logic & Proof Patterns',
  date: 'Mon 5 Oct 2026',
  sheet: 'Exercise sheet 3',

  slides: [
    {
      kind: 'title',
      title: 'Exercise Session 3',
      subtitle: 'Predicate logic, then indirect proof, case distinction and contradiction',
      footnote: 'Discrete Mathematics · HS 2026 · Group Q · CHN D 46',
    },

    {
      kind: 'points',
      title: 'This week',
      points: [
        'The interviews continue this week.',
        'As last week, we do not look at the graded exercise today.',
        'Bring your Legi. Handwritten notes are allowed.',
      ],
      note: '1 minute. Questions on the graded exercise: after the interview.',
    },

    {
      kind: 'points',
      title: 'Where we are',
      points: [
        'Last week’s sheet: logical consequence and quantifiers (§2.3–2.4).',
        'Wednesday’s lecture: the proof patterns of §2.6. Today we practise three of them: indirect proof, case distinction and proof by contradiction.',
        'Also in §2.6: existence proofs (Def. 2.18), the pigeonhole principle (Theorem 2.10), proofs by counterexample (Def. 2.19) and induction (Theorem 2.11). They come back on later sheets.',
        'Today’s lecture started with sets (§3.1–3.2). At the end we look at how they use what we practise today.',
      ],
      note: '2 minutes. Ask who has already seen the pigeonhole principle or induction in school.',
    },

    {
      kind: 'agenda',
      title: 'Today',
      items: [
        'Family relations without equality',
        'Who chooses first: a game',
        'Recap: proof patterns',
        'Indirect proof',
        'Case distinction',
        'Proof by contradiction',
        'Is this proof pattern sound?',
        'Short questions',
        'Today’s lecture: sets',
      ],
      note:
        'Timing: 5 intro · 8 family · 12 game (break here, about 25 min) · 5 recap · 10 indirect · 12 cases · 10 contradiction · 12 soundness · 8 short questions · 4 sets. That is about 86 min. If time runs short, drop the short questions.',
    },

    // -- predicate logic -----------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 1',
      title: 'Family relations',
      prompt: [
        'The universe is the set of all humans, including those who died. The only predicate is child(x, y) = 1 iff x is a child of y.',
        'Write each statement as a formula. You may not use equality.',
      ],
      parts: ['x is a grandchild of y.', 'x is an aunt or an uncle of y.'],
      hint: ['An aunt or uncle of y is a sibling or half-sibling of one of y’s parents, but not that parent.'],
      note:
        '5 minutes. Part 1 is only there to fix the argument order of child. In part 2, ask how they would say "x is not that parent" without =.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 1',
      title: 'Solutions',
      steps: [
        '1. ∃u (child(x, u) ∧ child(u, y)). x is a child of u, and u is a child of y.',
        '2. ∃u ∃v (child(y, v) ∧ child(v, u) ∧ child(x, u) ∧ ¬child(y, x)).',
        'v is a parent of y, u is a parent of v, and x is also a child of u. So x and v share the parent u.',
        'Without the last conjunct, x = v is allowed, and every parent of y would count as an aunt or uncle.',
        'We cannot write x ≠ v. Instead, ¬child(y, x) says that x is not a parent of y. This rules out x = v, since v is a parent of y.',
      ],
      note:
        'The trick in general: if you cannot say "different", say something that would be true if they were the same, and negate it.',
    },

    {
      kind: 'exercise',
      ref: 'Exercise 2',
      title: 'A game',
      prompt: [
        'Alice chooses integers a₁, a₂ and Bob chooses integers b₁, b₂. Alice wins if a₁ + (a₂ − b₁) · b₂ = 0, otherwise Bob wins.',
        'In each case, write "Alice has a winning strategy" as a formula with universe ℤ, and decide whether it is true.',
      ],
      parts: [
        'Both announce all their numbers at the same time.',
        'They announce one number at a time, in the order a₁, b₁, a₂, b₂.',
        'Alice announces a₁ and a₂, then Bob announces b₁ and b₂.',
      ],
      note: '7 minutes. Before anyone computes: who knows what at the moment they choose?',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 2',
      title: 'Parts 1 and 3',
      steps: [
        '1. Alice cannot react to Bob’s numbers: ∃a₁ ∃a₂ ∀b₁ ∀b₂ (a₁ + (a₂ − b₁) · b₂ = 0).',
        'False. For any a₁, a₂, Bob can take b₁ = a₂ − 1 and b₂ = 1 − a₁. Then a₁ + (a₂ − b₁) · b₂ = a₁ + 1 · (1 − a₁) = 1 ≠ 0.',
        '3. Bob now knows a₁ and a₂ before he chooses, but that is no change: Alice still cannot react. The formula is the same as in part 1, so it is false.',
      ],
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 2',
      title: 'Part 2',
      steps: [
        'Now a₂ may depend on a₁ and b₁: ∃a₁ ∀b₁ ∃a₂ ∀b₂ (a₁ + (a₂ − b₁) · b₂ = 0).',
        'True. Alice chooses a₁ = 0, and after seeing b₁ she chooses a₂ = b₁.',
        'Then for every b₂ we get a₁ + (a₂ − b₁) · b₂ = 0 + 0 · b₂ = 0.',
        'The game is the same in all three parts. Only the order of the quantifiers changes.',
      ],
      note: 'Ask: could Alice also win with a₁ = 1? No, with a₂ = b₁ the value is a₁, and with a₂ ≠ b₁ Bob picks b₂.',
    },

    // -- proof patterns ------------------------------------------------------------

    {
      kind: 'points',
      title: 'Proof patterns (script §2.6)',
      points: [
        'Def. 2.14: an indirect proof of S ⟹ T assumes that T is false and proves that S is false. Lemma 2.6: ¬B → ¬A ⊨ A → B.',
        'Def. 2.16: a proof of S by case distinction finds a finite list R₁, …, Rₖ of statements, proves that at least one Rᵢ is true, and proves Rᵢ ⟹ S for i = 1, …, k. Lemma 2.8.',
        'Def. 2.17: a proof of S by contradiction finds a statement T, proves that T is false, and assumes that S is false and proves that T is true. Lemma 2.9: (¬A → B) ∧ ¬B ⊨ A.',
      ],
      note:
        'Indirect proof and contradiction are often mixed up. Indirect: the goal is "S is false". Contradiction: the goal is any false statement T. 5 minutes.',
    },

    {
      kind: 'points',
      title: 'Writing it down',
      points: [
        'Say in the first sentence which pattern you use.',
        'Name the statements: what is S, what is T, what are the cases.',
        'For a case distinction, say why the cases cover everything.',
        'A chain of steps S ⟹ … ⟹ T, one step per line, is easy to check and easy to grade.',
      ],
    },

    {
      kind: 'exercise',
      ref: 'Exercise 3',
      title: 'Indirect proof',
      prompt: ['Prove indirectly:'],
      parts: [
        'For every natural number n: if n³ + 5 is odd, then n is even.',
        'For every natural number n > 1: if 2ⁿ − 1 is prime, then n is prime.',
      ],
      hint: ['For every integer x and every b ≥ 1: $x^b - 1 = (x - 1)(x^{b-1} + x^{b-2} + \\dots + x + 1)$.'],
      note: '7 minutes. For part 2, first write down what "n is not prime" gives you, for n > 1.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 3',
      title: 'Solutions',
      steps: [
        '1. Assume n is not even. Then n = 2k + 1 for some k ∈ ℕ, and n³ + 5 = 8k³ + 12k² + 6k + 6 = 2(4k³ + 6k² + 3k + 3). So n³ + 5 is even, i.e. not odd.',
        '2. Assume n is not prime. Since n > 1, n = ab for natural numbers a, b with 1 < a < n and 1 < b < n.',
        'By the hint with $x = 2^a$: $2^n - 1 = (2^a)^b - 1 = (2^a - 1)\\big((2^a)^{b-1} + \\dots + 2^a + 1\\big)$.',
        'So $d = 2^a - 1$ divides 2ⁿ − 1. Since a ≥ 2, d ≥ 3 > 1, and since a < n, d < 2ⁿ − 1. So 2ⁿ − 1 is not prime.',
      ],
      note:
        'The converse is false: 11 is prime, but 2¹¹ − 1 = 2047 = 23 · 89. Primes of the form 2ⁿ − 1 are Mersenne primes.',
    },

    {
      kind: 'exercise',
      ref: 'Exercise 4',
      title: 'Case distinction',
      prompt: ['Prove by case distinction:'],
      parts: [
        'For every natural number n, n² + 1 is not divisible by 3.',
        'If p and 8p² + 1 are both prime, then 8p² − 1 is also prime.',
      ],
      hint: ['Write n = 3k + c with k ∈ ℕ and c ∈ {0, 1, 2}.'],
      note: '8 minutes. In part 2, ask which cases can actually occur.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 4',
      title: 'Part 1',
      steps: [
        'Every natural number n can be written as n = 3k + c with k ∈ ℕ and c ∈ {0, 1, 2}. These three cases cover all n.',
        'n² + 1 = 9k² + 6kc + c² + 1. Since 9k² + 6kc is divisible by 3, n² + 1 is divisible by 3 if and only if c² + 1 is.',
        'Case c = 0: c² + 1 = 1. Case c = 1: c² + 1 = 2. Case c = 2: c² + 1 = 5.',
        'In no case is c² + 1 divisible by 3, so n² + 1 is not divisible by 3.',
      ],
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 4',
      title: 'Part 2',
      steps: [
        'Write p = 3k + c with k ∈ ℕ and c ∈ {0, 1, 2}. These cases cover every p.',
        'Case c = 0: p = 3k is prime only for p = 3. Then 8p² + 1 = 73 and 8p² − 1 = 71, which are both prime.',
        'Case c = 1: 8p² + 1 = 72k² + 48k + 9 = 3(24k² + 16k + 3). The second factor is at least 3, so 8p² + 1 is not prime and the implication holds.',
        'Case c = 2: 8p² + 1 = 72k² + 96k + 33 = 3(24k² + 32k + 11). The second factor is at least 11, so 8p² + 1 is not prime and the implication holds.',
      ],
      note:
        'Cases 1 and 2 never satisfy the hypothesis. An implication with a false hypothesis is true, and that counts as proving the case.',
    },

    {
      kind: 'exercise',
      ref: 'Exercise 5',
      title: 'Proof by contradiction',
      prompt: ['Prove by contradiction:'],
      parts: [
        'The product of a rational number r ≠ 0 and an irrational number x is irrational.',
        'log₂ 3 is irrational.',
      ],
      hint: [
        'For 1: the quotient of two rational numbers, the second one not 0, is rational.',
        'For 2: no number is both even and odd.',
      ],
      note: '7 minutes. Ask each pair to write down S and T explicitly before the proof.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 5',
      title: 'Solutions',
      steps: [
        '1. S: r · x is irrational. T: x is rational. T is false by assumption.',
        'Assume S is false, so s = r · x is rational. Since r ≠ 0, x = s / r is a quotient of two rational numbers, so x is rational by the hint. T is true, a contradiction.',
        '2. S: log₂ 3 is irrational. T: there are positive integers p, q with $2^p = 3^q$. T is false, since $2^p$ is even and $3^q$ is odd.',
        'Assume S is false, so log₂ 3 = p / q for integers p, q with q > 0. Since 3 > 1, log₂ 3 > 0, so p > 0. Then $2^{p/q} = 3$, so $2^p = 3^q$, and T is true.',
      ],
      note: 'In 2, check that nobody forgot p > 0: for p = 0 we get 2⁰ = 1, which is odd.',
    },

    // -- soundness of proof patterns -----------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 6',
      title: 'Is this proof pattern sound?',
      prompt: [
        'Write each pattern as a statement about logical consequence, then prove or disprove that statement.',
      ],
      parts: [
        'To prove S, find statements T₁ and T₂. Assume that S is false and show that T₁ and T₂ are both true. Then show T₁ ⟹ (T₂ is false).',
        'To prove S ⟹ T, find a statement R. Show S ⟹ R and show T ⟹ R.',
      ],
      note:
        '7 minutes. First agree on the symbols: one propositional symbol per statement, and every step of the pattern becomes one formula on the left of ⊨.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 6',
      title: 'Solutions',
      steps: [
        '1. With A for S, B for T₁ and C for T₂, the pattern is (¬A → (B ∧ C)) ∧ (B → ¬C) ⊨ A.',
        'Sound. Every truth assignment that makes the left side true has A = 1, see the function table.',
        'It is a proof by contradiction with the false statement "T₁ and T₂ are both true".',
        '2. With A for S, B for T and C for R, the pattern is (A → C) ∧ (B → C) ⊨ A → B.',
        'Not sound. For A = 1, B = 0, C = 1, both A → C and B → C are true, but A → B is false.',
      ],
      note: 'Pattern 2 in words: S and T having a common consequence says nothing about S ⟹ T.',
    },

    {
      kind: 'table',
      solution: 'Exercise 6',
      title: 'Exercise 6.1 with a function table',
      headers: ['A', 'B', 'C', '¬A → (B ∧ C)', 'B → ¬C', 'both'],
      rows: [
        ['0', '0', '0', '0', '1', '0'],
        ['0', '0', '1', '0', '1', '0'],
        ['0', '1', '0', '0', '1', '0'],
        ['0', '1', '1', '1', '0', '0'],
        ['1', '0', '0', '1', '1', '1'],
        ['1', '0', '1', '1', '1', '1'],
        ['1', '1', '0', '1', '1', '1'],
        ['1', '1', '1', '1', '0', '0'],
      ],
      markRows: [4, 5, 6],
      note: 'Every row where "both" is 1 has A = 1, so the consequence holds and the pattern is sound.',
    },

    // -- short questions -----------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 7',
      title: 'Short questions',
      prompt: ['Two questions in the style of the exam.'],
      parts: [
        'Find a satisfiable formula F with unary predicates P and Q, without equality, such that every interpretation that makes F true has a universe with at least 3 elements.',
        'Find a formula F with a binary predicate symbol P such that F is true for U = ℚ and P = <, but false for U = ℤ and P = <.',
      ],
      note: '5 minutes. An informal justification is enough here.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 7',
      title: 'Solutions',
      steps: [
        '1. F = ∃x ∃y ∃z (P(x) ∧ Q(x) ∧ P(y) ∧ ¬Q(y) ∧ ¬P(z)).',
        'x and y differ on Q, and z differs from both on P, so x, y, z are three different elements. F is satisfiable: U = {1, 2, 3}, P true for 1 and 2, Q true for 1.',
        '2. F = ∀x ∀y (P(x, y) → ∃z (P(x, z) ∧ P(z, y))): between any two numbers there is a third.',
        'For ℚ, take z = (x + y) / 2. For ℤ, x = 0 and y = 1 have no integer between them.',
      ],
    },

    // -- today's lecture -----------------------------------------------------------

    {
      kind: 'points',
      title: 'Today’s lecture: sets (§3.1–3.2)',
      points: [
        'Def. 3.2: A = B is defined as ∀x (x ∈ A ↔ x ∈ B). Def. 3.3: A ⊆ B is defined as ∀x (x ∈ A → x ∈ B). Statements about sets are formulas of predicate logic.',
        'Lemma 3.1: {a} = {b} ⟹ a = b. The proof is indirect: if a ≠ b, then a ∈ {a} but a ∉ {b}, so {a} ≠ {b}.',
        'Lemma 3.2: A = B ⟺ (A ⊆ B) ∧ (B ⊆ A). The proof is a chain with one definition or rule per step, among them ∀x F ∧ ∀x G ≡ ∀x (F ∧ G) from §2.4.8.',
        'Russell’s paradox: for R = {A | A ∉ A}, both R ∈ R and R ∉ R lead to a contradiction.',
      ],
      note:
        '4 minutes. Only if the lecture really got to §3.2 today, the roadmap is a plan. No ∈ versus ⊆ exercises here: they are likely on next week’s sheet.',
    },

    // -- wrap --------------------------------------------------------------------

    {
      kind: 'end',
      title: 'See you next week',
      points: [
        'Good luck to everyone with an interview this week.',
        'Do the rest of sheet 3 and compare with the official solution.',
        'hserobyan@ethz.ch',
        'https://h-717.github.io/DM_HS26/',
      ],
    },
  ],
};
