// ---------------------------------------------------------------------------
// Week 2 — everything you say on screen lives in this file. Edit freely.
// See ./types.ts for the list of slide kinds and the text markup.
//
// Checked against: Exercise_02.pdf, Solution_02_with_grading_scheme.pdf and
// the lecture notes (Def. 2.7–2.15, Lemma 2.3, §2.3.5, §2.4.1–2.4.8 and
// §2.6.1–2.6.4). By the session the lecture has reached modus ponens in
// §2.6.4; case distinction, contradiction and everything after are not seen.
//
// Each exercise is a twin of one on the sheet — same shape, other formulas:
//   Exercise 1 ↔ 2.1   Exercise 2 ↔ 2.2   Exercise 3 ↔ 2.5
//   Exercise 4 ↔ 2.6   (no knights and knaves twin for 2.4)
// Exercise 5 practises §2.6.1–2.6.4, which the sheet does not cover yet. Its
// examples avoid last year's sheet 3 (parity of n², a^(2k) − 1, soundness of
// proof patterns as a consequence), which will likely come back next week.
// Lemmas 2.5 and 2.7 are only cited by number: their formulas are 2.1.4 and
// 2.1.1 on the sheet.
// 2.3 is the graded interview exercise and is not touched anywhere. Its
// part 1 asks for the definition of ≡ and for Lemma 2.2, so neither is
// recapped on screen. Nothing on screen names a sheet exercise.
// ---------------------------------------------------------------------------

import type { Deck } from './types';

export const week02: Deck = {
  week: 2,
  topic: 'Logical Consequence, Quantifiers & Proof Patterns',
  date: 'Mon 28 Sep 2026',
  sheet: 'Exercise sheet 2',
  solutionsReleased: true,

  slides: [
    {
      kind: 'title',
      title: 'Exercise Session 2',
      subtitle: 'Logical consequence, quantifiers, first proof patterns',
      footnote: 'Discrete Mathematics · HS 2026 · Group Q · CHN D 46',
    },

    {
      kind: 'points',
      title: 'This week',
      points: [
        'The oral interviews start this week.',
        'We will not look at that exercise today, it has to be your own work.',
        'Bring your Legi. Handwritten notes are allowed.',
      ],
      note: '2 minutes. If someone asks about the graded exercise: after your interview.',
    },

    {
      kind: 'points',
      title: 'A word on formality',
      points: [
        'In this course the write-up is graded, not only the idea. This holds for the interviews and for the exam.',
        'If you prove an equivalence step by step, each step uses one rule and says which one. Commutativity is a rule too, so it is a step too.',
        'When you justify a step, use the definitions from the script, not your own paraphrase.',
        'When in doubt, write the justification down. A missing reason costs more often than an extra sentence.',
      ],
      note:
        'Say it relaxed, not as a warning. People who took the course before say this is what they underestimated. 2 minutes.',
    },

    {
      kind: 'agenda',
      title: 'Today',
      items: [
        'Recap: consequence, tautology, satisfiability',
        'Logical consequence',
        'Satisfiable or tautology?',
        'Recap: quantifiers',
        'Formalising statements with quantifiers',
        'Short questions',
        'Kahoot',
      ],
      note:
        'Timing: 5 intro · 6 recap · 11 consequence · 8 satisfiability (break here, about 30 min) · 5 quantifier recap · 19 quantifiers · 6 short questions · 13 Kahoot. That is about 73 min, so there is room to take the exercises slowly.',
    },

    // -- recap -------------------------------------------------------------------

    {
      kind: 'points',
      title: 'Definitions (script §2.3.4 and §2.3.6)',
      points: [
        'Def. 2.7: F ⊨ G if for all truth assignments to the symbols in F or G, the truth value of G is 1 if the truth value of F is 1.',
        // 'Def. 2.8: F is a tautology, written ⊨ F, if F is true for all truth assignments.',
        'Def. 2.9: F is satisfiable if F is true for at least one truth assignment, and unsatisfiable otherwise.',
      ],
      note:
        'Point out: consequence and tautology quantify over all assignments, satisfiable needs only one. That tells you how to prove or disprove each of them.',
    },

    {
      kind: 'points',
      title: 'Consequence and implication',
      points: [
        'Lemma 2.3: F → G is a tautology if and only if F ⊨ G.',
        'F → G is a formula, it has a truth value for each assignment. F ⊨ G is a statement about two formulas, it is simply true or false.',
        'So ⊨ cannot be used inside a formula. If you need both F ⊨ G and G ⊨ F, write "and" in words, not ∧.',
        '§2.3.5: a consequence stays true if the symbols A, B, C, … are replaced by formulas F, G, H, …, so one proof covers many formulas.',
      ],
    },

    // -- logical consequence -------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 1',
      title: 'Logical consequence',
      prompt: ['Prove or disprove the following statements about formulas.'],
      parts: [
        '¬B ∧ (A → B) ⊨ ¬A',
        'A → B ⊨ B → A',
        '⊨ (A → B) ∨ (A → ¬B)',
        '(A → B) ∧ (A → C) ⊨ A → (B ∧ C)',
      ],
      note:
        '5 minutes in pairs. Suggest a function table for one part and an argument for another, so both proof styles come up.',
    },

    {
      kind: 'table',
      title: 'Exercise 1.1 with a function table',
      headers: ['A', 'B', '¬B', 'A → B', '¬B ∧ (A → B)', '¬A'],
      rows: [
        ['0', '0', '1', '1', '1', '1'],
        ['0', '1', '0', '1', '0', '1'],
        ['1', '0', '1', '0', '0', '0'],
        ['1', '1', '0', '1', '0', '0'],
      ],
      markRows: [0],
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 1',
      title: 'Parts 1 and 2',
      steps: [
        '1. True. By the table, ¬B ∧ (A → B) is true only for the truth assignment A = 0, B = 0. For this assignment ¬A is also true. Hence ¬B ∧ (A → B) ⊨ ¬A.',
        '2. False. For the truth assignment A = 0, B = 1, the formula A → B is true, but B → A is false. So B → A is not a logical consequence of A → B.',
        'B → A is the converse of A → B. The contrapositive ¬B → ¬A would be a logical consequence.',
      ],
      note: 'To disprove: one assignment is enough. To prove: the argument has to cover every assignment.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 1',
      title: 'Parts 3 and 4',
      steps: [
        '3. True. Suppose some truth assignment makes (A → B) ∨ (A → ¬B) false. Then both disjuncts are false.',
        'A → B is false only if A = 1 and B = 0. A → ¬B is false only if A = 1 and B = 1.',
        'B cannot be 0 and 1 at the same time, a contradiction. So the formula is true for all truth assignments.',
        '4. True. Consider any truth assignment to A, B, C for which (A → B) ∧ (A → C) is true. We show that A → (B ∧ C) is true.',
        'If A = 0, then A → (B ∧ C) is true.',
        'If A = 1, then B is true since A → B is true, and C is true since A → C is true. So B ∧ C is true, and hence A → (B ∧ C) is true.',
      ],
      note: 'Part 4 needs no 8-row table: the case distinction on A already covers every assignment.',
    },

    // -- satisfiability ------------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 2',
      title: 'Satisfiable or tautology?',
      prompt: [
        'For each formula, decide whether it is satisfiable or unsatisfiable, and whether it is a tautology. Prove your answers.',
      ],
      parts: ['(A ∨ ¬B) ∧ B', '(¬B ∧ (A → B)) ∧ A', 'A → (B → A)'],
      hint: ['For part 2, look at what you proved in Exercise 1.'],
      note: '4 minutes. Part 2 is the one to discuss: reusing a result you proved is a valid proof.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 2',
      title: 'Solutions',
      steps: [
        '1. Satisfiable, since A = 1, B = 1 makes it true. Not a tautology, since B = 0 makes it false.',
        '2. Unsatisfiable. Suppose some truth assignment makes (¬B ∧ (A → B)) ∧ A true. Then ¬B ∧ (A → B) is true and A is true.',
        'By Exercise 1.1, ¬B ∧ (A → B) ⊨ ¬A, so ¬A is also true under this assignment. But A is true, a contradiction. Since the formula is never true, it is not a tautology either.',
        '3. Tautology, and therefore satisfiable. Suppose some assignment makes A → (B → A) false. Then A = 1 and B → A is false, which needs A = 0. Contradiction.',
      ],
      note:
        'In part 2, the point is that a proved consequence can be used directly. Nobody needs the 4-row table again.',
    },

    // -- predicate logic -----------------------------------------------------------

    {
      kind: 'points',
      title: 'Quantifiers (script §2.4)',
      points: [
        'Def. 2.10: a k-ary predicate on a universe U is a function $U^k \\to \\{0,1\\}$.',
        'Def. 2.11: ∀x P(x) means P(x) is true for all x in U. ∃x P(x) means P(x) is true for some x in U.',
        '"For all x ≥ 5, …" is written ∀x ((x ≥ 5) → …). "Some x ≥ 5 with …" is written ∃x ((x ≥ 5) ∧ …).',
        'With universe ℤ and only < available, "n is a natural number" becomes −1 < n.',
        '¬∀x P(x) ≡ ∃x ¬P(x) and ¬∃x P(x) ≡ ∀x ¬P(x).',
        'The order of different quantifiers matters: ∃y ∀x P(x, y) ⊨ ∀x ∃y P(x, y), but not the other way round.',
      ],
      note:
        '→ under ∀ and ∧ under ∃ is the most common formalisation mistake. Ask what ∀x ((x ≥ 5) ∧ …) would mean.',
    },

    {
      kind: 'exercise',
      ref: 'Exercise 3',
      title: 'Formalising statements',
      prompt: [
        'The universe is ℤ. Write each statement as a formula, using only the predicates <, = and prime, and the symbols + and ·. Which statements are true?',
      ],
      parts: [
        'If the sum of two integers is positive, then at least one of them is positive.',
        'For every natural number there is a strictly greater natural number that is a perfect square.',
        'There are infinitely many primes p such that p + 2 is also prime.',
      ],
      note: '5 minutes. For part 3, "how do you say infinitely many?" is the whole question.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 3',
      title: 'Solutions',
      steps: [
        '1. ∀m ∀n (0 < m + n → (0 < m ∨ 0 < n)). True, by contraposition: if m ≤ 0 and n ≤ 0, then m + n ≤ 0.',
        '2. ∀m (−1 < m → ∃n (m < n ∧ ∃k (n = k · k))). True: take n = (m + 1) · (m + 1).',
        'In 2, the condition −1 < n on n can be left out, since it follows from −1 < m and m < n.',
        '3. ∀m ∃p (m < p ∧ prime(p) ∧ prime(p + 2)). "Above every m there is such a p" says there are infinitely many.',
        'Statement 3 is the twin prime conjecture. Nobody knows whether it is true, but it is still a statement.',
      ],
      note: 'Do not say whether the product version on the sheet is true.',
    },

    {
      kind: 'exercise',
      ref: 'Exercise 4',
      title: 'Reading formulas',
      prompt: [
        'The universe is ℤ. Let P(x) = 1 iff x > 0, and Q(x, y) = 1 iff x + y = 0.',
        'Describe each statement in words and decide whether it is true.',
      ],
      parts: ['∀x ∃y Q(x, y)', '∃y ∀x Q(x, y)', '∃x ( ∀y ¬Q(x, y) ∨ ∀y P(y) )'],
      note: '5 minutes. Part 3 is about scope, leave time for it.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 4',
      title: 'Solutions',
      steps: [
        '1. "For every integer x there is an integer y with x + y = 0." True, take y = −x.',
        '2. "There is an integer y with x + y = 0 for every integer x." False: x = 0 forces y = 0, and x = 1 forces y = −1.',
        '3. Each ∀y only covers its own disjunct: "There is an integer x such that no integer y satisfies x + y = 0, or every integer is positive."',
        'For every x, the first disjunct is false, since y = −x gives x + y = 0. The second disjunct is false, since 0 is not positive. So statement 3 is false.',
        'Careful: ∃x ∀y (¬Q(x, y) ∨ P(y)) would be true, with x = −1. The only y with −1 + y = 0 is y = 1, which is positive.',
      ],
      note: 'Parts 1 and 2 only differ in the order of the quantifiers.',
    },

    // -- proof patterns ------------------------------------------------------------

    // {
    //   kind: 'points',
    //   title: 'Proof patterns (script §2.6.1–2.6.4)',
    //   points: [
    //     'Def. 2.12: if S ⟹ T and T ⟹ U are both true, then S ⟹ U is true.',
    //     'Def. 2.13: a direct proof of S ⟹ T assumes S and then proves T under this assumption.',
    //     'Def. 2.14: an indirect proof of S ⟹ T assumes that T is false and proves that S is false.',
    //     'Def. 2.15: modus ponens proves S in three steps: find a suitable statement R, prove R, prove R ⟹ S.',
    //     'Proving T ⟹ S does not prove S ⟹ T.',
    //   ],
    //   note:
    //     'Say at the start of each proof which pattern you use. Do not write out Lemmas 2.5 and 2.7 here, they are exercises on the sheet. 4 minutes.',
    // },

    // {
    //   kind: 'exercise',
    //   ref: 'Exercise 5',
    //   title: 'Proof patterns',
    //   prompt: ['Prove each statement with the pattern given.'],
    //   parts: [
    //     'Direct proof: if a and b are integers of the form 4k + 1 (k ∈ ℤ), then ab is also of this form.',
    //     'Indirect proof: for every integer n, if 3n + 2 is even, then n is even.',
    //     'Modus ponens: 2³² + 1 is not a prime. Use R = "641 divides 2³² + 1", and that 641 · 6 700 417 = 4 294 967 297.',
    //   ],
    //   note: '8 minutes. Part 3 is Euler’s counterexample to Fermat’s guess that all 2^(2^m) + 1 are prime.',
    // },

    // {
    //   kind: 'solution',
    //   reveal: true,
    //   ref: 'Exercise 5',
    //   title: 'Solutions',
    //   steps: [
    //     '1. Assume a = 4k + 1 and b = 4l + 1 for integers k, l. Then ab = 16kl + 4k + 4l + 1 = 4(4kl + k + l) + 1, and 4kl + k + l is an integer.',
    //     '2. Assume n is not even, so n = 2k + 1 for an integer k. Then 3n + 2 = 6k + 5 = 2(3k + 2) + 1, which is odd, so 3n + 2 is not even.',
    //     '3. R is true, since 2³² + 1 = 4 294 967 297 = 641 · 6 700 417.',
    //     'R ⟹ S: if 641 divides 2³² + 1, then 2³² + 1 has a divisor d with 1 < d < 2³² + 1, so it is not prime.',
    //     'By modus ponens, 2³² + 1 is not prime.',
    //   ],
    //   note:
    //     'In 2, the assumption is "T is false" and the goal is "S is false". Check that nobody assumed n even instead.',
    // },

    // -- short questions -----------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 5',
      title: 'Short questions',
      prompt: ['F and G are formulas of propositional logic.'],
      parts: [
        'Find F and G such that F ∧ G is unsatisfiable, but F ∨ G is a tautology.',
        'True or false: F ∨ G is satisfiable if and only if F is satisfiable or G is satisfiable.',
        'True or false: F ∨ G is a tautology if and only if F is a tautology or G is a tautology.',
        'True or false: (A ∨ B) → (A ∧ B) is satisfiable, but not a tautology.',
      ],
      note: '3 minutes, then a show of hands on each true/false.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 5',
      title: 'Solutions',
      steps: [
        '1. F = A and G = ¬A. Then A ∧ ¬A ≡ ⊥ and A ∨ ¬A ≡ ⊤.',
        '2. True. If an assignment makes F ∨ G true, it makes F or G true. Conversely, if an assignment makes F true, extend it arbitrarily to the symbols of G; then F ∨ G is true. The same for G.',
        '3. False. For F = A and G = ¬A, F ∨ G is a tautology, but neither F nor G is.',
        '4. True. A = B = 0 makes it true, and A = 1, B = 0 makes it false.',
      ],
      note: 'Do not answer the ∧ version from the sheet here.',
    },

    // -- wrap --------------------------------------------------------------------

    {
      kind: 'title',
      title: 'Kahoot',
      subtitle: 'Join at kahoot.it',
      note: 'Have the game PIN up before you switch windows.',
    },

    {
      kind: 'end',
      title: 'See you next week',
      points: [
        'Good luck to everyone with an interview this week.',
        'Do the rest of sheet 2 and compare with the official solution.',
        'hserobyan@ethz.ch',
        'https://h-717.github.io/DM_HS26/',
      ],
    },
  ],
};
