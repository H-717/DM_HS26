// ---------------------------------------------------------------------------
// Week 4 — everything you say on screen lives in this file. Edit freely.
// See ./types.ts for the list of slide kinds and the text markup.
//
// The HS2026 sheet 4 was not on Moodle when this was written, so the deck is
// built on the HS2025 sheet 4 and its graded solution, which should be almost
// the same. Check the mapping once the new sheet is out.
// Lecture: §3.1–3.2 (Oct 5 and 7), plus the pigeonhole principle, Theorem
// 2.10, from §2.6 (Sep 30).
//
// Each exercise is a twin of one on the sheet — same shape, other content:
//   Exercise 1 ↔ 4.2   Exercise 2 ↔ 4.4   Exercise 3 ↔ 4.3
//   Exercise 4 ↔ 4.6   Exercise 5 ↔ 4.1   Exercise 6 ↔ 4.8–4.9
//   (no twin of 4.7, kept out to keep the session light)
// 4.5 (symmetric difference) is the graded exercise and is not touched
// anywhere: no ∆, no set identity proved by an element chain with Lemma 2.1,
// no cancellation law. Nothing on screen names a sheet exercise.
// All set claims were brute-forced with frozensets.
// ---------------------------------------------------------------------------

import type { Deck } from './types';

export const week04: Deck = {
  week: 4,
  topic: 'Sets',
  date: 'Mon 12 Oct 2026',
  sheet: 'Exercise sheet 4',

  slides: [
    {
      kind: 'title',
      title: 'Exercise Session 4',
      subtitle: 'Sets: elements, subsets, power sets, products, and the pigeonhole principle',
      footnote: 'Discrete Mathematics · HS 2026 · Group Q · CHN D 46',
    },

    {
      kind: 'points',
      title: 'This week',
      points: [
        'As every week, we do not look at the graded exercise today.',
        'Bring your Legi to the interview. Handwritten notes are allowed.',
      ],
      note: '1 minute.',
    },

    {
      kind: 'agenda',
      title: 'Today',
      items: [
        'Recap: sets',
        'Element or subset?',
        'Listing sets',
        'Finding sets',
        'Power sets',
        'Pigeonhole principle',
        'Short questions',
        'Kahoot',
      ],
      note:
        'Timing: 3 intro · 7 recap · 8 element or subset · 8 listing · 8 finding sets (break here, about 35 min) · 15 power sets · 8 pigeonhole · 8 short questions · 12 Kahoot. That is about 77 min.',
    },

    // -- recap ---------------------------------------------------------------------

    {
      kind: 'points',
      title: 'Equality and subsets (script §3.2.2–3.2.3)',
      points: [
        'Def. 3.2: A = B is defined as ∀x (x ∈ A ↔ x ∈ B). A set is given by its elements only.',
        'So order and repetitions do not matter: {1, 1, 2} = {2, 1}.',
        'Ordered pairs are different: (a, b) = (c, d) is defined as a = c ∧ b = d.',
        'Def. 3.3: A ⊆ B is defined as ∀x (x ∈ A → x ∈ B).',
        'Lemma 3.2: A = B ⟺ (A ⊆ B) ∧ (B ⊆ A). This is the usual way to prove that two sets are equal.',
      ],
      note: '3 minutes.',
    },

    {
      kind: 'points',
      title: 'Operations on sets (script §3.2.4–3.2.9)',
      points: [
        'Def. 3.4: A ∪ B = {x | x ∈ A ∨ x ∈ B} and A ∩ B = {x | x ∈ A ∧ x ∈ B}. Def. 3.5: B \\ A = {x ∈ B | x ∉ A}.',
        'Def. 3.6, Lemma 3.5, Lemma 3.6: there is exactly one empty set ∅, and ∅ ⊆ A for every set A.',
        'Def. 3.7: P(A) = {S | S ⊆ A}. If |A| = k, then |P(A)| = 2ᵏ.',
        'Def. 3.8: A × B = {(a, b) | a ∈ A ∧ b ∈ B}. For finite sets, |A × B| = |A| · |B|.',
      ],
      note: '2 minutes. Write P({1, 2}) on the board as an example.',
    },

    {
      kind: 'points',
      title: '∈ versus ⊆',
      points: [
        'x ∈ A: x is one of the elements of A.',
        'A ⊆ B: every element of A is also an element of B.',
        '∅ and {∅} are different sets: |∅| = 0 and |{∅}| = 1.',
        '∅ ⊆ A holds for every A. ∅ ∈ A only holds if ∅ is one of the elements of A.',
        'Before answering anything about a set, remove the repetitions.',
      ],
      note: '2 minutes. Ask: how many elements do ∅, {∅} and {∅, {∅}} have?',
    },

    // -- element or subset --------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 1',
      title: 'Element or subset?',
      prompt: ['For each pair, decide whether A ∈ B and whether A ⊆ B.'],
      parts: [
        'A = {2, {1}, 2},   B = {1, {2, {1, 1}}, 2}',
        'A = ∅,   B = {1, {∅}}',
        'A = {∅, {∅}},   B = {∅, {∅}, {∅, {∅, ∅}}}',
        'A = {1, 2},   B = {{1}, {2}, {1, {2}}}',
      ],
      note: '4 minutes. First step for everyone: remove the repetitions.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 1',
      title: 'Solutions',
      steps: [
        '1. A = {2, {1}} and B = {1, {2, {1}}, 2}. A ∈ B, since {2, {1}} is an element of B. A ⊈ B, since {1} ∈ A but {1} ∉ B.',
        '2. A ∉ B, since the elements of B are 1 and {∅}, and neither is ∅. A ⊆ B by Lemma 3.6.',
        '3. B = {∅, {∅}, {∅, {∅}}}. A ∈ B, since A is the third element. A ⊆ B, since ∅ ∈ B and {∅} ∈ B.',
        '4. A ∉ B, since {1, 2} is not one of {1}, {2}, {1, {2}}. A ⊈ B, since 1 ∉ B.',
        'All four combinations occur: A ∈ B and A ⊆ B are two separate questions.',
      ],
    },

    // -- listing sets -------------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 2',
      title: 'Listing sets',
      prompt: [
        'Let A = {1, {1}, 1} and B = {A, 1, {{1}}}.',
        'List the elements of each set and give its cardinality.',
      ],
      parts: ['A ∪ B', 'A ∩ B', 'B \\ A', '{∅} × {1, 2}', 'P(A)', 'P(∅)'],
      note: '4 minutes. Ask first: how many elements does A have?',
    },

    {
      kind: 'table',
      solution: 'Exercise 2',
      title: 'Exercise 2: solutions',
      lead: 'A = {1, {1}} has 2 elements, and B = {{1, {1}}, 1, {{1}}} has 3.',
      headers: ['', 'set', 'elements', 'cardinality'],
      rows: [
        ['1', 'A ∪ B', '1, {1}, {1, {1}}, {{1}}', '4'],
        ['2', 'A ∩ B', '1', '1'],
        ['3', 'B \\ A', '{1, {1}}, {{1}}', '2'],
        ['4', '{∅} × {1, 2}', '(∅, 1), (∅, 2)', '2'],
        ['5', 'P(A)', '∅, {1}, {{1}}, {1, {1}}', '4'],
        ['6', 'P(∅)', '∅', '1'],
      ],
      note:
        'Row 2: {1} ∈ A, but {1} ∉ B. B contains {{1}}, which is a different set. Row 6: P(∅) = {∅} is not empty.',
    },

    // -- finding sets -------------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 3',
      title: 'Finding sets',
      prompt: ['Three short questions about elements that are also subsets.'],
      parts: [
        'Give a set A and a set x ≠ ∅ with x ∈ A and x ⊆ A.',
        'Give a set A with |A| = 3 and A ⊆ P(A).',
        'Prove: A ⊆ P(A) holds if and only if every element of A is a subset of A.',
      ],
      note: '5 minutes. Part 3 explains why part 2 works.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 3',
      title: 'Solutions',
      steps: [
        '1. A = {1, {1}} and x = {1}. Then x ∈ A, and x ⊆ A since 1 ∈ A.',
        '2. A = {∅, {∅}, {∅, {∅}}}. Its elements are ∅, {∅} and {∅, {∅}}, and each of them is a subset of A, so each is in P(A).',
        '3. A ⊆ P(A) ⟺ ∀x (x ∈ A → x ∈ P(A))   (Def. 3.3)',
        '⟺ ∀x (x ∈ A → x ⊆ A)   (Def. 3.7)',
        'The last line says that every element of A is a subset of A.',
      ],
      note: 'The set in part 2 is the set 3 from §3.2.7, the construction of the natural numbers.',
    },

    // -- power sets ---------------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 4',
      title: 'Power sets',
      prompt: ['Prove or disprove, for all sets A and B:'],
      parts: [
        'P(A) ∪ P(B) ⊆ P(A ∪ B)',
        'P(A \\ B) = P(A) \\ P(B)',
        'A ∩ B = ∅ ⟺ P(A) ∩ P(B) = {∅}',
      ],
      note: '8 minutes. For part 2, ask: which set is in every power set?',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 4',
      title: 'Parts 1 and 2',
      steps: [
        '1. True. Let C ∈ P(A) ∪ P(B). By Def. 3.4 and Def. 3.7, C ⊆ A or C ⊆ B.',
        'A ⊆ A ∪ B and B ⊆ A ∪ B by Def. 3.4. So in both cases C ⊆ A ∪ B by Lemma 3.3, that is, C ∈ P(A ∪ B).',
        '2. False. ∅ ∈ P(A \\ B) by Lemma 3.6. But also ∅ ∈ P(B), so ∅ ∉ P(A) \\ P(B).',
        'Concrete counterexample: A = B = ∅. Then P(A \\ B) = {∅}, but P(A) \\ P(B) = ∅.',
      ],
      note: 'Part 2 fails for every A and B, not just for one example.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 4',
      title: 'Part 3',
      steps: [
        '3. True. We prove both directions.',
        '(⟹) Assume A ∩ B = ∅. By Lemma 3.6, ∅ ⊆ A and ∅ ⊆ B, so ∅ ∈ P(A) ∩ P(B).',
        'Let C ∈ P(A) ∩ P(B), so C ⊆ A and C ⊆ B. Every element of C is then in A ∩ B = ∅, so C has no elements and C = ∅ by Lemma 3.5. Hence P(A) ∩ P(B) = {∅}.',
        '(⟸) Indirect proof. Assume A ∩ B ≠ ∅ and take x ∈ A ∩ B. Then {x} ⊆ A and {x} ⊆ B, so {x} ∈ P(A) ∩ P(B).',
        'Since {x} ≠ ∅, we get P(A) ∩ P(B) ≠ {∅}.',
      ],
    },

    // -- pigeonhole --------------------------------------------------------------

    {
      kind: 'points',
      title: 'Pigeonhole principle (script §2.6)',
      points: [
        'Theorem 2.10: if a set of n objects is partitioned into k < n sets, then at least one of these sets contains at least ⌈n/k⌉ objects.',
        'Most of the work is choosing the k sets (the boxes). After that, the proof is short.',
      ],
      note: '1 minute.',
    },

    {
      kind: 'exercise',
      ref: 'Exercise 5',
      title: 'Pigeonhole principle',
      prompt: ['Let n ≥ 1.'],
      parts: [
        'Prove that every subset of {1, 2, …, 2n} with n + 1 elements contains two numbers that differ by 1.',
        'Show that n elements are not enough.',
      ],
      hint: ['Try n = 3 first.'],
      note: '4 minutes.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 5',
      title: 'Solutions',
      steps: [
        '1. Partition {1, 2, …, 2n} into the n sets {1, 2}, {3, 4}, …, {2n − 1, 2n}.',
        'A subset T with n + 1 elements puts n + 1 objects into n sets. By Theorem 2.10, one set {2i − 1, 2i} contains ⌈(n + 1)/n⌉ = 2 elements of T.',
        'These two elements are 2i − 1 and 2i, and they differ by 1.',
        '2. T = {1, 3, 5, …, 2n − 1} has n elements, and any two of them differ by at least 2.',
      ],
    },

    // -- short questions ---------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 6',
      title: 'Short questions',
      prompt: ['In the style of the exam. No justification needed.'],
      parts: [
        'How many elements does {∅, {∅}} × {∅} have?',
        'True or false: ∅ × {1} = {∅} × ∅.',
        'True or false: A × B = B × A for all sets A and B.',
        'True or false: {∅} ∈ P(A) for every set A.',
        'True or false: |P(P(∅))| = 2.',
      ],
      note: '3 minutes, then a show of hands on each one.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 6',
      title: 'Solutions',
      steps: [
        '1. 2. The elements are (∅, ∅) and ({∅}, ∅).',
        '2. True. Both are ∅, since a product with an empty factor has no pairs.',
        '3. False. For A = {1} and B = {2}, (1, 2) ∈ A × B, but (1, 2) ∉ B × A.',
        '4. False. For A = ∅, P(A) = {∅}, and {∅} ≠ ∅.',
        '5. True. P(∅) = {∅}, so P(P(∅)) = {∅, {∅}}.',
      ],
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
        'Do the rest of sheet 4 and compare with the official solution.',
        'hserobyan@ethz.ch',
        'https://h-717.github.io/DM_HS26/',
      ],
    },
  ],
};
