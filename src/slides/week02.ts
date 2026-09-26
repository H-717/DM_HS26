// ---------------------------------------------------------------------------
// Week 2 — everything you say on screen lives in this file. Edit freely.
// See ./types.ts for the list of slide kinds and the text markup.
//
// Checked against: Exercise_02.pdf, Solution_02_with_grading_scheme.pdf and
// the lecture notes (Def. 2.6–2.11, Lemma 2.1–2.3, §2.3.5, §2.4.1–2.4.8).
// The exercises below are our own twins of the sheet's: same moves, different
// formulas. Exercise 2.3 is the graded interview exercise and is deliberately
// not discussed, hinted at, or paraphrased anywhere in this deck.
// ---------------------------------------------------------------------------

import type { Deck } from './types';

export const week02: Deck = {
  week: 2,
  topic: 'Logical Consequence, Satisfiability & Quantifiers',
  date: 'Mon 28 Sep 2026',
  sheet: 'Exercise sheet 2',

  slides: [
    {
      kind: 'title',
      title: 'Exercise Session 2',
      subtitle: 'Logical consequence, satisfiability, and a first look at predicate logic',
      footnote: 'Discrete Mathematics · HS 2026 · Group Q · CHN D 46',
    },

    {
      kind: 'callout',
      title: 'Before we start',
      tone: 'info',
      body: [
        'The **oral interviews start this week.** If yours is in the week of 28 September, the graded exercise is the one marked GRADED on sheet 2.',
        'I will **not** discuss that exercise today — the solution has to be your own work. Everything else on the sheet is fair game.',
        'Bring your **Legi** and, if you like, your own handwritten notes.',
        'Sheet 3 appears on Moodle on Thursday, as every week.',
      ],
      note:
        '2 minutes. If anyone asks about the graded exercise during the session, the answer is always "after your interview". Do not answer "just a small hint" either.',
    },

    {
      kind: 'agenda',
      title: 'Today',
      items: [
        'Last week, written properly: equivalence proofs by the rules',
        'Recap: equivalence, logical consequence, tautology, satisfiability',
        'Logical consequence',
        'Satisfiability and tautologies',
        'An equivalence proof, step by step',
        'Knights and knaves: what does an answer tell you?',
        'Recap and practice: quantifiers and predicates',
        'Short questions, exam style',
        'Kahoot',
      ],
      note:
        'Timing for 90 min: 3 admin · 10 formal rules · 7 recap · 10 consequence · 7 satisfiability · 8 equivalence proof · 10 knights · 17 quantifiers · 5 short questions · 10 Kahoot · 3 wrap. If you are behind at the knights, cut part (c) there; if still behind, the short questions become homework. Never cut the equivalence proof.',
    },

    // -- formal rules ----------------------------------------------------------

    {
      kind: 'callout',
      title: 'Feedback from last week — you were right',
      tone: 'warn',
      body: [
        'Last week I called a simplification "five steps". By the rules this course grades with, it has **six**.',
        'The missing step was a **commutativity**. In this course, commutativity is a rule of Lemma 2.1 like any other, and applying it is a proof step of its own.',
        'So today: first the exact rule set, then last week’s proof written to that standard, then the places where steps usually go missing.',
      ],
      note:
        'Own it plainly and move on — 30 seconds. Students trust a TA who corrects himself more than one who is never wrong.',
    },

    {
      kind: 'table',
      title: 'Lemma 2.1, exactly as the script states it',
      lead: 'The orientation matters: a rule applies only to a formula of exactly this shape.',
      headers: ['', 'Equivalence', 'Name'],
      rows: [
        ['1)', 'A ∧ A ≡ A   and   A ∨ A ≡ A', 'idempotence'],
        ['2)', 'A ∧ B ≡ B ∧ A   and   A ∨ B ≡ B ∨ A', 'commutativity of ∧ and ∨'],
        ['3)', '(A ∧ B) ∧ C ≡ A ∧ (B ∧ C)   and   (A ∨ B) ∨ C ≡ A ∨ (B ∨ C)', 'associativity'],
        ['4)', 'A ∧ (A ∨ B) ≡ A   and   A ∨ (A ∧ B) ≡ A', 'absorption'],
        ['5)', 'A ∧ (B ∨ C) ≡ (A ∧ B) ∨ (A ∧ C)', 'first distributive law'],
        ['6)', 'A ∨ (B ∧ C) ≡ (A ∨ B) ∧ (A ∨ C)', 'second distributive law'],
        ['7)', '¬¬A ≡ A', 'double negation'],
        ['8)', '¬(A ∧ B) ≡ ¬A ∨ ¬B   and   ¬(A ∨ B) ≡ ¬A ∧ ¬B', 'de Morgan’s rules'],
      ],
      markRows: [1, 3, 4, 5],
      note:
        'The marked rows are where the orientation bites: absorption has the lone A on the LEFT, both distributive laws have the factor on the LEFT. (A ∨ B) ∧ A is not literally of the form A ∧ (A ∨ B).',
    },

    {
      kind: 'callout',
      title: 'The rules of the game for an equivalence proof',
      tone: 'good',
      body: [
        '**Allowed rules:** F → G ≡ ¬F ∨ G · the rules of Lemma 2.1 · and F ∧ ¬F ≡ ⊥, F ∧ ⊥ ≡ ⊥, F ∨ ⊥ ≡ F, F ∨ ¬F ≡ ⊤, F ∧ ⊤ ≡ F, F ∨ ⊤ ≡ ⊤.',
        'Each rule may be applied to whole **subformulas**, not just to propositional symbols (§2.3.5, lifting).',
        '**One step = one rule, applied once, and named.** Two double negations in two places are two steps.',
        '**Commutativity costs a step.** So does associativity, applied as in Lemma 2.1 3).',
        'A rule may be used in either direction — an equivalence is symmetric.',
      ],
      note:
        'This is the wording the official sheets use for step-counted proofs. Read the bold parts out loud.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Last week',
      title: 'H = ((A ∨ B) ∧ A) ∧ (¬A ∨ C), written to the standard',
      steps: [
        'H ≡ (A ∧ (A ∨ B)) ∧ (¬A ∨ C)    (commutativity of ∧)',
        '≡ A ∧ (¬A ∨ C)    (absorption)',
        '≡ (A ∧ ¬A) ∨ (A ∧ C)    (first distributive law)',
        '≡ ⊥ ∨ (A ∧ C)    (F ∧ ¬F ≡ ⊥)',
        '≡ (A ∧ C) ∨ ⊥    (commutativity of ∨)',
        '≡ A ∧ C    (F ∨ ⊥ ≡ F)',
        '**Six steps.** Step 1 is the one I skipped last week: absorption needs the A on the left.',
      ],
      note:
        'Step 5 is the same phenomenon at the other end: the rule is F ∨ ⊥ ≡ F, not ⊥ ∨ F ≡ F. Both commutativity steps are required.',
    },

    {
      kind: 'points',
      title: 'Where missing steps hide',
      reveal: true,
      points: [
        'Turning (X ∨ Y) ∧ X into X: absorption needs **X ∧ (X ∨ Y)** first. One commutativity step.',
        'Distributing (B ∨ C) ∧ A: the law is stated for **A ∧ (B ∨ C)**. One commutativity step.',
        'Simplifying ⊥ ∨ F or ⊤ ∧ F to F: the rules are **F ∨ ⊥** and **F ∧ ⊤**. One commutativity step.',
        'From ¬(¬A ∨ B) to A ∧ ¬B: that is de Morgan **and then** double negation. Two steps.',
        'From ¬¬A ∨ ¬¬B to A ∨ B: double negation **twice**. Two steps.',
        'Always check your result on two assignments afterwards — one where you expect 0, one where you expect 1.',
      ],
      note:
        'Ask the room for each line before revealing the bold part. These are exactly the "missing step" deductions of the grading scheme.',
    },

    // -- recap -------------------------------------------------------------------

    {
      kind: 'points',
      title: 'Four definitions, in the script’s words',
      lead: 'Lecture notes, §2.3.3–2.3.6',
      points: [
        '**Def. 2.6.** F and G are **equivalent**, F ≡ G, if the truth values are equal for all truth assignments to the propositional symbols appearing in F or G.',
        '**Def. 2.7.** G is a **logical consequence** of F, F ⊨ G, if for all truth assignments to the symbols in F or G, the truth value of G is 1 if the truth value of F is 1.',
        '**Def. 2.8.** F is a **tautology** (valid), ⊨ F, if it is true for all truth assignments.',
        '**Def. 2.9.** F is **satisfiable** if it is true for at least one truth assignment, and **unsatisfiable** otherwise.',
      ],
      note:
        'Point out that every definition quantifies over ALL truth assignments except satisfiability, which needs ONE. That asymmetry decides how you prove or disprove each of them.',
    },

    {
      kind: 'callout',
      title: '⊨ is a statement about formulas, not a connective',
      tone: 'warn',
      body: [
        'F → G is a **formula**: it has a truth value under each assignment. F ⊨ G is a **statement** about F and G: it is true or false, full stop.',
        '**Lemma 2.3.** F → G is a tautology **if and only if** F ⊨ G.',
        '**Lemma 2.2.** F is a tautology **if and only if** ¬F is unsatisfiable.',
        'F ≡ G holds exactly when F ⊨ G and G ⊨ F. Write that out in words; do **not** write "F ⊨ G ∧ G ⊨ F" — ∧ only joins formulas.',
      ],
      note:
        'The last bullet is footnote 16 of the script. It is exactly the kind of notation slip an examiner notices.',
    },

    // -- logical consequence ------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Warm-up A',
      title: 'Logical consequence',
      prompt: ['Prove or disprove the following statements about formulas.'],
      parts: [
        '¬B ∧ (A → B) ⊨ ¬A',
        'A → B ⊨ B → A',
        '⊨ (A → B) ∨ (A → ¬B)',
        '(A → B) ∧ (A → C) ⊨ A → (B ∧ C)',
      ],
      note:
        '5 minutes, in pairs. Tell them to use a function table for one of them and an argument for another, so they see both proof styles.',
    },

    {
      kind: 'table',
      title: 'Warm-up A.1 · By function table',
      lead: 'The left-hand side is 1 on exactly one row. Check ¬A on that row.',
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
      ref: 'Warm-up A',
      title: 'Parts 1 and 4 hold',
      steps: [
        '**1. True.** By the table, ¬B ∧ (A → B) is true only for the truth assignment A = 0, B = 0. For this assignment ¬A is also true. Hence ¬B ∧ (A → B) ⊨ ¬A.',
        '**4. True.** Consider any truth assignment to A, B, C for which (A → B) ∧ (A → C) is true. We show that A → (B ∧ C) is true.',
        'Case A = 0: then A → (B ∧ C) is true.',
        'Case A = 1: since A → B is true and A is true, B is true; in the same way C is true. So B ∧ C is true, and hence A → (B ∧ C) is true. ∎',
      ],
      note:
        'Part 1 is modus tollens. Part 4 needs no table at all: the case distinction on A covers all 8 assignments.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Warm-up A',
      title: 'Part 2 fails, part 3 is a tautology',
      steps: [
        '**2. False.** For the truth assignment A = 0, B = 1, the formula A → B is true, but B → A is false. So B → A is not a logical consequence of A → B.',
        'B → A is the **converse**. The contrapositive ¬B → ¬A *is* a logical consequence — it swaps **and** negates.',
        '**3. True.** Suppose, for contradiction, that some truth assignment makes (A → B) ∨ (A → ¬B) false. Then both disjuncts are false.',
        'A → B false requires A = 1 and B = 0. A → ¬B false requires A = 1 and ¬B = 0, i.e. B = 1.',
        'B cannot be both 0 and 1 — a contradiction. So the formula is true for all truth assignments. ∎',
      ],
      note:
        'To disprove ⊨ you need one assignment. To prove it you need an argument about every assignment — the contradiction argument is exactly that.',
    },

    // -- satisfiability -----------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Warm-up B',
      title: 'Satisfiable? Tautology?',
      prompt: [
        'For each formula, decide whether it is satisfiable or unsatisfiable, and whether it is a tautology. Prove your answers.',
      ],
      parts: ['(A ∨ ¬B) ∧ B', '(¬B ∧ (A → B)) ∧ A', 'A → (B → A)'],
      hint: ['You already proved something in Warm-up A that settles part 2 in two lines.'],
      note: '4 minutes. Part 2 is the one to discuss: reusing a result is a proof technique, not a shortcut.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Warm-up B',
      title: 'Answers and proofs',
      steps: [
        '**1.** Satisfiable: A = 1, B = 1 gives (1 ∨ 0) ∧ 1 = 1. Not a tautology: B = 0 makes the conjunction 0.',
        '**2.** Let F = (¬B ∧ (A → B)) ∧ A. Then ¬F ≡ ¬(¬B ∧ (A → B)) ∨ ¬A (de Morgan) ≡ (¬B ∧ (A → B)) → ¬A (F → G ≡ ¬F ∨ G).',
        'By Warm-up A.1 and Lemma 2.3, ¬F is a tautology. By Lemma 2.2 applied to ¬F, ¬¬F is unsatisfiable, and ¬¬F ≡ F. So F is **unsatisfiable**, hence not a tautology.',
        '**3.** Tautology (and so satisfiable). Suppose some assignment makes A → (B → A) false. Then A = 1 and B → A = 0; but B → A = 0 requires A = 0. Contradiction. ∎',
      ],
      note:
        'In part 2, Lemma 2.2 is stated for "F tautology ⇔ ¬F unsatisfiable". Applying it to ¬F and then removing the double negation is the formally correct route — say so.',
    },

    // -- equivalence proof ----------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Warm-up C',
      title: 'An equivalence proof, step by step',
      prompt: [
        'F = ¬(A → B) ∨ B',
        'Find a formula G ≡ F in which A and B each appear at most once, and prove F ≡ G using **at most 7** steps under the rules of the game.',
      ],
      hint: [
        'Guess G from a function table first. Then plan the route before writing a single step.',
      ],
      note:
        '6 minutes, individually. Walk around and count their steps out loud — most first attempts silently merge de Morgan with double negation.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Warm-up C',
      title: 'Seven steps, each with one name',
      steps: [
        'F ≡ ¬(¬A ∨ B) ∨ B    (F → G ≡ ¬F ∨ G)',
        '≡ (¬¬A ∧ ¬B) ∨ B    (de Morgan’s rule)',
        '≡ (A ∧ ¬B) ∨ B    (double negation)',
        '≡ B ∨ (A ∧ ¬B)    (commutativity of ∨)',
        '≡ (B ∨ A) ∧ (B ∨ ¬B)    (second distributive law)',
        '≡ (B ∨ A) ∧ ⊤    (F ∨ ¬F ≡ ⊤)',
        '≡ B ∨ A    (F ∧ ⊤ ≡ F)',
        'G = B ∨ A. Rewriting it as A ∨ B would cost an **eighth** step — and nothing asks for that order.',
      ],
      note:
        'Step 4 exists only because the second distributive law has the lone factor on the left. Ask them why before revealing it.',
    },

    {
      kind: 'callout',
      title: 'Sanity check: two rows, one minute',
      tone: 'good',
      body: [
        'G = B ∨ A is 0 only for A = 0, B = 0.',
        'A = 0, B = 0: A → B = 1, so F = ¬1 ∨ 0 = 0 = G ✓',
        'A = 1, B = 0: A → B = 0, so F = ¬0 ∨ 0 = 1 = G ✓',
        'A check like this does not prove the equivalence, but it catches almost every slip before an examiner does.',
      ],
    },

    // -- knights and knaves -------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Warm-up D',
      title: 'Knights and knaves: what does an answer tell you?',
      prompt: [
        'Knights always tell the truth, knaves always lie. B = "the islander is a knight", A = "the left road leads to the village". You ask about the truth value of a formula F, and the answer is "True" or "False".',
      ],
      parts: [
        'Express the answer the islander gives as a formula in B and F.',
        'Find F such that **every** islander answers "True".',
        'Find F such that the answer tells you whether the islander is a knight.',
        'You ask F = ¬B ∧ A. What can you conclude from each possible answer?',
      ],
      note:
        '8 minutes including discussion. These are the building blocks for the sheet’s knights-and-knaves exercise, without solving it. Do not solve the sheet’s version on the board.',
    },

    {
      kind: 'table',
      title: 'Warm-up D.1 · The answer is  B ↔ F',
      lead: 'A knight answers the truth value of F; a knave answers the truth value of ¬F.',
      headers: ['B', 'F', 'islander', 'answer'],
      rows: [
        ['0', '0', 'knave, lies', '1'],
        ['0', '1', 'knave, lies', '0'],
        ['1', '0', 'knight', '0'],
        ['1', '1', 'knight', '1'],
      ],
      note:
        'Answer ≡ (B ∧ F) ∨ (¬B ∧ ¬F), which by Example 2.8 of the script is B ↔ F. Once they have this column, every knights-and-knaves question is an exercise in function tables.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Warm-up D',
      title: 'Parts 2 and 3',
      steps: [
        '**2.** We need B ↔ F to be 1 on every row. Reading off the table: F must equal B. So ask F = B: "Are you a knight?"',
        'A knight truthfully says "True"; a knave, for whom the true answer is "False", lies and also says "True".',
        '**3.** We need B ↔ F ≡ B, i.e. F must be 1 on every row: F ≡ ⊤. Ask e.g. F = A ∨ ¬A.',
        'Then the answer is B ↔ ⊤, which has the truth value of B: "True" means knight, "False" means knave.',
      ],
    },

    {
      kind: 'table',
      title: 'Warm-up D.4 · F = ¬B ∧ A',
      lead: 'Answer ≡ B ↔ F. Only one row answers "True".',
      headers: ['A', 'B', 'F = ¬B ∧ A', 'answer ≡ B ↔ F'],
      rows: [
        ['0', '0', '0', '1'],
        ['0', '1', '0', '0'],
        ['1', '0', '1', '0'],
        ['1', '1', '0', '0'],
      ],
      markRows: [0],
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Warm-up D',
      title: 'Part 4, and the idea for the sheet',
      steps: [
        '"True" happens only for A = 0, B = 0: the islander is a knave and the left road leads to the jungle. Take the **right** road.',
        '"False" is consistent with three rows, two with A = 1 and one with A = 0: we learn **nothing** about A.',
        'So a question can be well-formed and still useless. What we want is a question whose answer has the truth value of A on **every** row.',
        'For the sheet: write down the answer you want on each of the four rows, then use answer ≡ B ↔ F to fill in the function table of F.',
      ],
      note:
        'Stop here. The last bullet is the method, not the answer — they can finish the sheet exercise in five minutes at home.',
    },

    // -- predicate logic -----------------------------------------------------------

    {
      kind: 'points',
      title: 'Predicate logic in the script’s words',
      lead: 'Lecture notes, §2.4.1–2.4.4',
      points: [
        '**Def. 2.10.** A k-ary **predicate** P on a universe U is a function $U^k \\to \\{0,1\\}$.',
        '**Def. 2.11.** ∀x P(x): P(x) is true for all x in U.  ∃x P(x): P(x) is true for some x in U.',
        'A condition on x goes **inside**: "for all x ≥ 5, …" is ∀x ((x ≥ 5) → …); "some x ≥ 5 with …" is ∃x ((x ≥ 5) ∧ …).',
        'Universe ℤ, with only < available: "n is a natural number" becomes −1 < n.',
        'The name of a bound variable is irrelevant: ∃x (x + 5 = 3) ≡ ∃y (y + 5 = 3).',
        'Write every quantifier out: ∃x ∃y ∃z, never ∃xyz.',
      ],
      note:
        'The → under ∀ versus ∧ under ∃ is the single most common formalisation error. Ask what ∀x ((x ≥ 5) ∧ …) would say instead.',
    },

    {
      kind: 'callout',
      title: 'Useful rules (§2.4.8)',
      tone: 'good',
      body: [
        '¬∀x P(x) ≡ ∃x ¬P(x)   and   ¬∃x P(x) ≡ ∀x ¬P(x)',
        '∀x P(x) ∧ ∀x Q(x) ≡ ∀x (P(x) ∧ Q(x))',
        '∃x (P(x) ∧ Q(x)) ⊨ ∃x P(x) ∧ ∃x Q(x)  — but **not** the other way round.',
        '∃y ∀x P(x, y) ⊨ ∀x ∃y P(x, y)  — but **not** the other way round. Quantifier order matters.',
      ],
      note:
        'For the two "not the other way round": ask for a counterexample. ∃x even(x) ∧ ∃x odd(x) is true in ℕ, ∃x (even(x) ∧ odd(x)) is not.',
    },

    {
      kind: 'exercise',
      ref: 'Warm-up E',
      title: 'Quantifiers and predicates — formalise',
      prompt: [
        'Universe ℤ. The only predicates are <, = and prime; you may also use + and ·. Write each statement as a formula. Which are true?',
      ],
      parts: [
        'If the sum of two integers is positive, then at least one of them is positive.',
        'For every natural number there is a strictly greater natural number that is a perfect square.',
        'There are infinitely many primes p such that p + 2 is also prime.',
      ],
      note: '5 minutes. For (c), the question "how do you say infinitely many?" is the whole exercise.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Warm-up E',
      title: 'The formulas',
      steps: [
        '(a) ∀m ∀n (0 < m + n → (0 < m ∨ 0 < n)) — **true**: if m ≤ 0 and n ≤ 0, then m + n ≤ 0.',
        '(b) ∀m (−1 < m → ∃n (m < n ∧ ∃k (n = k · k))) — **true**: n = (m + 1) · (m + 1) > m.',
        'In (b), −1 < n need not be written: it follows from −1 < m and m < n. Writing it is not wrong.',
        '(c) ∀m ∃p (m < p ∧ prime(p) ∧ prime(p + 2)) — "above every bound there is such a p" is how you say infinitely many.',
        '(c) is the **twin prime conjecture**: nobody knows whether it is true. It is still a statement — it has a truth value.',
      ],
      note:
        'Contrast (a) with the product version on the sheet: sum and product behave differently with negative numbers. Do not say which way the sheet’s version goes.',
    },

    {
      kind: 'exercise',
      ref: 'Warm-up E',
      title: 'Quantifiers and predicates — read and decide',
      prompt: [
        'Universe ℤ.  P(x) = 1 iff x > 0.   Q(x, y) = 1 iff x + y = 0.',
        'Describe each statement in words and decide whether it is true.',
      ],
      parts: [
        '∀x ∃y Q(x, y)',
        '∃y ∀x Q(x, y)',
        'Negate the formula in part 2 and push ¬ all the way inward, one rule per step.',
        '∃x ( ∀y ¬Q(x, y) ∨ ∀y P(y) )',
      ],
      note: '5 minutes. Part 4 is the scope trap; leave most of the discussion time for it.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Warm-up E',
      title: 'Order of quantifiers',
      steps: [
        '**1.** "For every integer x there is an integer y with x + y = 0." **True**: take y = −x.',
        '**2.** "There is an integer y such that x + y = 0 for every integer x." **False**: x = 0 would force y = 0, and x = 1 would force y = −1.',
        '**3.** ¬∃y ∀x Q(x, y) ≡ ∀y ¬∀x Q(x, y) ≡ ∀y ∃x ¬Q(x, y): "for every y there is an x with x + y ≠ 0". True, as it must be.',
        'Parts 1 and 2 differ only in the order of the quantifiers, and they have different truth values.',
      ],
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Warm-up E',
      title: 'Part 4 — a scope trap',
      steps: [
        'Each ∀y binds only its own disjunct. The formula says: "there is an integer x such that no integer y satisfies x + y = 0, **or** every integer is positive."',
        'For every x, y = −x gives x + y = 0, so ∀y ¬Q(x, y) is false. And ∀y P(y) is false (take y = 0). So the statement is **false**.',
        'The tempting misreading ∃x ∀y (¬Q(x, y) ∨ P(y)) — "every y with x + y = 0 is positive" — is **true**: take x = −1, whose only partner y = 1 is positive.',
        'Same symbols, different scope, different truth value. When in doubt, pull the independent part out: ( ∃x ∀y ¬Q(x, y) ) ∨ ∀y P(y) means the same here.',
      ],
      note:
        'The last bullet is an informal remark about this formula, since the second disjunct does not mention x. Do not present it as a general rule yet — that is Chapter 6.',
    },

    // -- short questions -----------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Warm-up F',
      title: 'Short questions, exam style',
      prompt: ['F and G are formulas of propositional logic.'],
      parts: [
        'Find F and G such that F ∧ G is unsatisfiable, but F ∨ G is a tautology.',
        'True or false: F ∨ G is satisfiable if and only if F is satisfiable or G is satisfiable.',
        'True or false: F ∨ G is a tautology if and only if F is a tautology or G is a tautology.',
        'True or false: (A ∨ B) → (A ∧ B) is satisfiable, but not a tautology.',
      ],
      note: '3 minutes, then quick-fire. Ask for a show of hands on each true/false before revealing.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Warm-up F',
      title: 'Answers',
      steps: [
        '**1.** F = A, G = ¬A: A ∧ ¬A ≡ ⊥ and A ∨ ¬A ≡ ⊤.',
        '**2. True.** (⇒) An assignment making F ∨ G true makes F true or G true. (⇐) If F is satisfiable, take an assignment making F true, extended arbitrarily to the symbols of G; it makes F ∨ G true. Likewise for G.',
        '**3. False.** F = A, G = ¬A: F ∨ G is a tautology, but neither F nor G is. (Only the direction ⇐ holds.)',
        '**4. True.** A = B = 0 makes it true (0 → 0); A = 1, B = 0 makes it false (1 → 0).',
        'Satisfiability behaves well with ∨; being a tautology does not. What happens with ∧ is on your sheet.',
      ],
      note:
        'Do not answer the ∧ version here — it is the sheet’s own short question. Parts 2 and 3 give them everything they need for it.',
    },

    // -- wrap --------------------------------------------------------------------

    {
      kind: 'points',
      title: 'What to take away',
      points: [
        'In an equivalence proof, **every** rule application is a step — commutativity included — and it is named.',
        'F → G is a formula; F ⊨ G is a statement. Lemma 2.3 connects them.',
        'To disprove ⊨ or a tautology: one assignment. To prove one: an argument that covers every assignment.',
        'Reuse what you proved: Lemma 2.2 and 2.3 turn a consequence into an unsatisfiability proof.',
        'A knight or knave answers B ↔ F. Design questions with a function table.',
        'Quantifier order and scope change the meaning. Read each quantifier’s scope before you read the words.',
      ],
    },

    {
      kind: 'title',
      title: 'Kahoot',
      subtitle: 'Join at kahoot.it',
      footnote: 'Everything on it came up in the last hour.',
      note: 'Have the game PIN up before you switch windows.',
    },

    {
      kind: 'end',
      title: 'See you next week',
      points: [
        'Interview this week? Good luck — bring your Legi.',
        'Do the rest of sheet 2 and compare with the official solution on Moodle.',
        'hserobyan@ethz.ch — genuinely, just email me.',
        'https://h-717.github.io/DM_HS26/',
      ],
    },
  ],
};
