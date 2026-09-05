// ---------------------------------------------------------------------------
// Week 12 — everything you say on screen lives in this file. Edit freely.
// See ./types.ts for the list of slide kinds and the text markup.
// ---------------------------------------------------------------------------

import type { Deck } from './types';

export const week12: Deck = {
  week: 12,
  topic: 'Normal Forms & the Semantics of Predicate Logic',
  date: 'Week 12',
  sheet: 'Exercise sheet 12 (HS 2025)',

  slides: [
    {
      kind: 'title',
      title: 'Exercise Session 12',
      subtitle: 'CNF and DNF, free variables, interpretations, models',
      footnote: 'Discrete Mathematics · HS 2026 · practising on sheet 12',
    },

    {
      kind: 'agenda',
      items: [
        '12.1 CNF and DNF, two different ways',
        '12.2 Free variables',
        '12.3 Interpretations and models',
        '12.4 Predicate logic with equality',
        '12.6 A single connective (exam)',
        '12.5 — the presentation exercise',
      ],
    },

    {
      kind: 'callout',
      title: 'Reading normal forms off a function table',
      tone: 'good',
      body: [
        '**DNF from the 1-rows**: one conjunction per row where F = 1, using the literal that makes each variable true in that row.',
        '**CNF from the 0-rows**: one disjunction per row where F = 0, with each literal **negated** relative to that row.',
        'Mnemonic: DNF *describes* when F is true; CNF *forbids* each way F is false.',
        'The other route — pushing negations in and distributing — gives smaller formulas but needs Lemma 6.1 step by step.',
      ],
    },

    // -- 12.1 ----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '12.1',
      title: 'CNF and DNF  (⋆)',
      prompt: [],
      parts: [
        'F = ¬(A → C) ↔ (A → B). Build a CNF and a DNF via the function table.',
        'G = (A ∧ ¬B) ∨ (¬A ∧ (C ∧ D)). Build a CNF using the equivalences, naming each one.',
      ],
    },

    {
      kind: 'table',
      title: '12.1.1 · The table',
      lead: '¬(A → C) simplifies to A ∧ ¬C. That makes the columns quick.',
      headers: ['A', 'B', 'C', 'A ∧ ¬C', 'A → B', 'F'],
      rows: [
        ['0', '0', '0', '0', '1', '0'],
        ['0', '0', '1', '0', '1', '0'],
        ['0', '1', '0', '0', '1', '0'],
        ['0', '1', '1', '0', '1', '0'],
        ['1', '0', '0', '1', '0', '0'],
        ['1', '0', '1', '0', '0', '1'],
        ['1', '1', '0', '1', '1', '1'],
        ['1', '1', '1', '0', '1', '0'],
      ],
      markRows: [5, 6],
      note: 'Only two 1-rows, so the DNF is short and the CNF has six clauses. Point out that CNF and DNF sizes are unrelated.',
    },

    {
      kind: 'solution',
      ref: '12.1',
      title: 'Both normal forms',
      reveal: true,
      steps: [
        '**DNF** (from the two 1-rows 101 and 110): (A ∧ ¬B ∧ C) ∨ (A ∧ B ∧ ¬C).',
        '**CNF** (from the six 0-rows): (A∨B∨C) ∧ (A∨B∨¬C) ∧ (A∨¬B∨C) ∧ (A∨¬B∨¬C) ∧ (¬A∨B∨C) ∧ (¬A∨¬B∨¬C).',
        '**2.** G = (A ∧ ¬B) ∨ (¬A ∧ C ∧ D). Distribute the ∨ over the left conjunction, then over the right one:',
        '(A ∨ ¬A) ∧ (A ∨ C) ∧ (A ∨ D) ∧ (¬B ∨ ¬A) ∧ (¬B ∨ C) ∧ (¬B ∨ D)   [distributivity, twice]',
        'A ∨ ¬A ≡ ⊤ and ⊤ ∧ X ≡ X, so drop it:',
        '**CNF(G) = (A ∨ C) ∧ (A ∨ D) ∧ (¬A ∨ ¬B) ∧ (¬B ∨ C) ∧ (¬B ∨ D)**',
      ],
    },

    // -- 12.2 ----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '12.2',
      title: 'Free Variables  (⋆)',
      prompt: ['Find every **occurrence** of a free variable.'],
      parts: [
        '∀x ∀y ( P(x,y) ∨ P(x,z) )',
        '∀x ( ∃x P(x) ∧ P(x) ) ∨ P(x)',
        '∀x ( ∃y P(y,x) ∨ ∃z Q(x, f(z)) )',
      ],
      hint: ['The question asks about occurrences, not variables. In (ii) the same letter appears both bound and free.'],
    },

    {
      kind: 'solution',
      ref: '12.2',
      title: 'Answers',
      reveal: true,
      steps: [
        '**(i)** Only **z** is free. x and y are bound by the two quantifiers.',
        '**(ii)** The scope of ∀x is only the bracket. So the **final P(x)** is a free occurrence.',
        'Inside the bracket, ∃x P(x) binds its own x — that inner ∃x **shadows** the outer ∀x, and the P(x) next to it is bound by ∀x.',
        '**(iii)** No free occurrences at all: x by ∀x, y by ∃y, z by ∃z.',
        'Method: draw the scope brackets before answering anything. Shadowing is the only real difficulty here.',
      ],
    },

    // -- 12.3 ----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '12.3',
      title: 'Interpretations  (⋆)',
      prompt: [
        'F = ∀x∀y∀z ( P(f(x,y),x) ∧ P(f(x,y),y) ∧ ( ¬P(x,y) → ¬P(x, f(y,z)) ) )',
        'Which of these are models?',
      ],
      parts: [
        'U = ℕ\\{0}, f(x,y) = x·y, P(x,y) ⟺ y | x',
        'U = ℕ\\{0}, f(x,y) = x^y, P(x,y) ⟺ y | x',
        'U = P(ℕ), f(A,B) = A ∩ B, P(A,B) ⟺ A ⊆ B',
      ],
    },

    {
      kind: 'solution',
      ref: '12.3',
      title: '1 · Two models and one failure',
      reveal: true,
      steps: [
        '**(i) Model.** x | xy ✓ and y | xy ✓. Third conjunct: if yz | x then y | x, and the contrapositive of that is exactly what is required ✓.',
        '**(ii) Not a model.** The second conjunct needs y | x^y — take x = 2, y = 3: 3 ∤ 8. One counterexample is enough. ∎',
        '**(iii) Model.** A∩B ⊆ A ✓, A∩B ⊆ B ✓, and A ⊆ B∩C ⇒ A ⊆ B gives the third by contraposition ✓.',
        'Notice (i) and (iii) are the *same* argument: "meet is below both, and being below a meet implies being below each part". Divisibility and inclusion are both lattices.',
        '**2.** i) not suitable: an interpretation that does not define P at all. ii) suitable, not a model: U = {1} with P(1,1) = 1 — the third conjunct fails.',
        'iii) suitable and a model: U = {1,2,3} with P = {(1,2),(2,3),(3,1)} — a 3-cycle. Every element has an out- and an in-neighbour, and no edge is reciprocated. ✓',
      ],
      note:
        'The lattice remark is optional but lands well — it explains why the same formula keeps having models that look unrelated.',
    },

    // -- 12.4 ----------------------------------------------------------------

    {
      kind: 'solution',
      ref: '12.4',
      title: '12.4 · Predicate logic with equality',
      reveal: true,
      steps: [
        '**1.** F = ∀x∀y (x = y) holds exactly when **|U| = 1**. (U is non-empty by definition, and two distinct elements would falsify it.)',
        '**2.** G = ∃x∃y ¬(x = y) holds exactly when **|U| ≥ 2**.',
        '**3.** For |U| ≥ 3: **H = ∃x∃y∃z ( ¬(x=y) ∧ ¬(x=z) ∧ ¬(y=z) )**.',
        'All three inequalities are needed — pairwise distinctness does not follow from two of them.',
        'General pattern: "at least n elements" is n existentials plus all C(n,2) inequalities. "At most n" is n+1 universals plus a disjunction of equalities.',
      ],
    },

    // -- 12.6 ----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '12.6',
      title: 'One Connective to Rule Them All (exam FS 2025)  (⋆)',
      prompt: [
        'Extend propositional logic with ⋄, where A(F ⋄ G) = 1 ⟺ A(F) = 0 or A(G) = 0.',
        'Prove or disprove: every formula F has an equivalent G built only from atoms and ⋄.',
      ],
      hint: ['Write out the truth table of ⋄. You have met this connective before.'],
    },

    {
      kind: 'solution',
      ref: '12.6',
      title: 'True — ⋄ is NAND',
      reveal: true,
      steps: [
        'F ⋄ G is 0 exactly when both are 1. So **⋄ is NAND**: F ⋄ G ≡ ¬(F ∧ G).',
        '¬F ≡ **F ⋄ F**',
        'F ∧ G ≡ ¬(F ⋄ G) ≡ **(F ⋄ G) ⋄ (F ⋄ G)**',
        'F ∨ G ≡ ¬(¬F ∧ ¬G) ≡ **(F ⋄ F) ⋄ (G ⋄ G)**',
        'Since {¬, ∧, ∨} is functionally complete and each is expressible with ⋄ alone, so is every formula. Rewrite F bottom-up. ∎',
        'One connective is enough. NAND and NOR are the only two binary connectives with this property — worth knowing, and true of real hardware.',
      ],
    },

    // -- presentation --------------------------------------------------------

    {
      kind: 'exercise',
      ref: '12.5',
      title: 'Statements about Formulas — for presentation',
      prompt: [
        '1. ∃x(F ∨ G) ≡ (∃xF) ∨ (∃xG)   2. ∃x∃yF ≡ ∃y∃xF   3. ∀x∃yF ≡ ∃y∀xF',
        'No theorems from the notes. **We are not solving this today.**',
      ],
      hint: [
        'Two of the three are true and one is false. You met the false one in week 3, in the guise of a game.',
        'For the true ones: argue semantically. Take an arbitrary suitable interpretation and show each side evaluates to 1 exactly when the other does.',
        'Work with an explicit assignment: A[x → a] denotes A with x reinterpreted as a. Almost all the marks are in using that notation correctly.',
        'For the false one, a two-element universe and one binary predicate suffice.',
      ],
      note:
        'If they ask which is false, point back to Alice and Bob on sheet 3 rather than answering.',
    },

    {
      kind: 'points',
      title: 'What to take away',
      points: [
        'DNF from the 1-rows, CNF from the 0-rows with literals negated.',
        'Free vs bound is about **occurrences**; inner quantifiers shadow outer ones.',
        'To refute a model: one assignment. To confirm one: an argument over the whole universe.',
        '"At least n elements" needs n existentials and all pairwise inequalities.',
        'NAND alone expresses everything.',
      ],
    },

    {
      kind: 'title',
      title: 'Kahoot',
      subtitle: 'Join at kahoot.it',
      footnote: 'Questions in kahoot/week12.csv',
    },

    {
      kind: 'end',
      title: 'See you next week',
      points: [
        'Last session: prenex form, calculi, and resolution.',
        'Your real sheet is on Moodle — bring it if it differs from mine.',
        'hserobyan@student.ethz.ch',
      ],
    },
  ],
};
