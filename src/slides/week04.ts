// ---------------------------------------------------------------------------
// Week 4 — everything you say on screen lives in this file. Edit freely.
// See ./types.ts for the list of slide kinds and the text markup.
// ---------------------------------------------------------------------------

import type { Deck } from './types';

export const week04: Deck = {
  week: 4,
  topic: 'Sets, Power Sets & the Pigeonhole Principle',
  date: 'Week 4',
  sheet: 'Exercise sheet 4 (HS 2025)',

  slides: [
    {
      kind: 'title',
      title: 'Exercise Session 4',
      subtitle: 'Sets: membership, subsets, power sets — and one counting trick',
      footnote: 'Discrete Mathematics · HS 2026 · practising on sheet 4',
    },

    {
      kind: 'agenda',
      items: [
        '4.1 The pigeonhole principle',
        '4.2 ∈ versus ⊆',
        '4.3 Sets that contain their own subsets',
        '4.4 Cardinality drills',
        '4.6 Power sets of unions and intersections',
        '4.7 Families closed under ∪, ∩ and complement',
        '4.8 Exam short questions',
        '4.5 — the presentation exercise',
      ],
      note: 'Long sheet. 4.2 and 4.4 are drills — go fast. 4.6 and 4.7 deserve the time.',
    },

    {
      kind: 'callout',
      title: 'The single most common mistake this week',
      tone: 'warn',
      body: [
        '**∈ is one level. ⊆ is one level down.**',
        'x ∈ A: x is *listed inside* A.   A ⊆ B: every element of A is listed inside B.',
        '∅ ⊆ A for every A — always. ∅ ∈ A only if ∅ is actually listed in A.',
        'And: sets have no duplicates and no order. {0, 0, 1} **is** {1, 0}.',
      ],
      note: 'Write {∅} and ∅ on the board. Ask how many elements each has. Half the room will hesitate — that is the point.',
    },

    // -- 4.1 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '4.1',
      title: 'Pigeon Set  (⋆⋆)',
      prompt: [
        'Let n ≥ 3 and S = {1, 2, …, n − 1}.',
        'Prove that every subset of S of size ⌊n/2⌋ + 1 contains two elements whose sum is n.',
      ],
      hint: ['Try n = 6 and n = 7 by hand first. Then ask: which elements *pair up*?'],
    },

    {
      kind: 'solution',
      ref: '4.1',
      title: 'Build the pigeonholes first',
      reveal: true,
      steps: [
        'Group the elements of S by the pairing k ↔ n − k. Both are in S, since 1 ≤ k ≤ n−1.',
        '**n odd**, n = 2m+1: S = {1,…,2m} splits into exactly m disjoint pairs {k, n−k}. And ⌊n/2⌋ = m.',
        '**n even**, n = 2m: S = {1,…,2m−1} gives m−1 pairs plus the leftover {m} on its own — m classes in total. And ⌊n/2⌋ = m.',
        'Either way: **⌊n/2⌋ boxes**.',
        'A subset of size ⌊n/2⌋ + 1 has more elements than boxes, so by pigeonhole two of them share a box.',
        'A box with two elements is a genuine pair {k, n−k}, and k + (n−k) = n. ∎',
      ],
      note:
        'Stress the shape: pigeonhole proofs are 90% "what are the boxes?". Once the boxes are right the proof is one line.',
    },

    // -- 4.2 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '4.2',
      title: 'Element or Subset?  (⋆)',
      prompt: ['For each pair, decide whether A ∈ B and whether A ⊆ B.'],
      parts: [
        'A = {1, 0, {0}, 1},  B = {{0, 1, 0, {0, 0}}, 1, 10, 0}',
        'A = ∅,  B = {{∅}, {∅, ∅}, ∅}',
        'A = {{0}, 0, {0}, {{0}}},  B = {0, ∅, {{0}}, {0}}',
        'A = {∅},  B = {∅, {∅, ∅, ∅}}',
      ],
      note: 'First instruction: **remove the duplicates**. Every one of these becomes easy once written in normal form.',
    },

    {
      kind: 'table',
      title: '4.2 · Normalise, then read off',
      lead: 'Duplicates removed, then the two questions are mechanical.',
      headers: ['', 'A normalised', 'B normalised', 'A ∈ B', 'A ⊆ B'],
      rows: [
        ['a', '{0, 1, {0}}', '{{0,1,{0}}, 1, 10, 0}', 'yes', 'no'],
        ['b', '∅', '{{∅}, ∅}', 'yes', 'yes'],
        ['c', '{0, {0}, {{0}}}', '{0, ∅, {{0}}, {0}}', 'no', 'yes'],
        ['d', '{∅}', '{∅, {∅}}', 'yes', 'yes'],
      ],
      note:
        '(a): B’s first element {0,1,0,{0,0}} collapses to {0,1,{0}} — which *is* A. So A ∈ B. But {0} ∈ A is not an element of B, so A ⊄ B.',
    },

    {
      kind: 'points',
      title: '4.2 · The two that catch people',
      reveal: true,
      points: [
        '**(a)** {0, 0} = {0}, so B’s first element is exactly A. A ∈ B — but A ⊄ B, because {0} ∈ A is not listed in B.',
        '**(b)** ∅ ∈ B because ∅ is genuinely listed. ∅ ⊆ B because ∅ ⊆ anything. Both, for different reasons.',
        '**(c)** A has three elements, none of which is A itself, so A ∉ B. But all three are listed in B, so A ⊆ B.',
        'Moral: A ∈ B and A ⊆ B are independent. All four combinations occur, and this exercise shows three of them.',
      ],
    },

    // -- 4.3 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '4.3',
      title: 'Operations on Sets  (⋆)',
      prompt: ['Give a set A such that:'],
      parts: [
        'there is an x ∈ A with x ⊆ A',
        'A ⊄ P(A), and there is an x ∈ A with x ⊆ P(A)',
        'A ⊆ P(A), and for every x ∈ A we have x ⊄ P(A)',
      ],
    },

    {
      kind: 'solution',
      ref: '4.3',
      title: 'Three answers, one of them free',
      reveal: true,
      steps: [
        '**(a)** A = {∅}. Take x = ∅: it is an element of A, and ∅ ⊆ A. ✓',
        '**(b)** A = {∅, {1}}. Then P(A) = {∅, {∅}, {{1}}, A}. The element {1} ∈ A is not in P(A), so A ⊄ P(A) ✓. And x = ∅ ⊆ P(A) ✓.',
        '**(c)** A = **∅**. Then A ⊆ P(A) holds (∅ ⊆ anything), and "for every x ∈ A …" is **vacuously true** — there are no x. ✓',
        'If (c) felt like cheating: it is not. A ∀-statement over an empty range is true, always. Get comfortable with that now.',
      ],
      note:
        'Ask for (c) before revealing. Someone will try {∅} and find it fails the second condition. Then the empty set lands well.',
    },

    // -- 4.4 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '4.4',
      title: 'Cardinality  (⋆)',
      prompt: [
        'A = {∅, {∅}, {∅}}   and   B = {A, {∅}, {{∅}}}.',
        'List the elements of each set below and give its cardinality.',
      ],
      parts: ['A ∪ B', 'A ∩ B', '∅ × A', '{0} × {3, 1}', '{{1,2}} × {3}', 'P({∅})'],
      hint: ['A has **two** elements, not three.'],
    },

    {
      kind: 'table',
      title: '4.4 · The answers',
      lead: 'With A = {∅, {∅}} and B = {A, {∅}, {{∅}}}.',
      headers: ['', 'set', 'elements', '|·|'],
      rows: [
        ['1', 'A ∪ B', '∅, {∅}, {∅,{∅}}, {{∅}}', '4'],
        ['2', 'A ∩ B', '{∅}', '1'],
        ['3', '∅ × A', '—', '0'],
        ['4', '{0} × {3,1}', '(0,3), (0,1)', '2'],
        ['5', '{{1,2}} × {3}', '({1,2}, 3)', '1'],
        ['6', 'P({∅})', '∅, {∅}', '2'],
      ],
      note:
        'Row 2 is the trap: ∅ ∈ A but ∅ ∉ B — B’s elements are A itself, {∅} and {{∅}}. Only {∅} is in both.',
    },

    // -- 4.6 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '4.6',
      title: 'Relating Two Power Sets  (⋆⋆)',
      prompt: ['Prove or disprove, for all sets A and B:'],
      parts: [
        'P(A ∩ B) = P(A) ∩ P(B)',
        'P(A ∪ B) = P(A) ∪ P(B)',
        'A ⊆ B ⟺ P(A) ⊆ P(B)',
      ],
    },

    {
      kind: 'solution',
      ref: '4.6',
      title: 'Intersection yes, union no',
      reveal: true,
      steps: [
        '**1. True.** X ∈ P(A∩B) ⟺ X ⊆ A∩B ⟺ (X ⊆ A and X ⊆ B) ⟺ X ∈ P(A) ∩ P(B). One chain of ⟺, done. ∎',
        '**2. False.** A = {1}, B = {2}. Then {1,2} ⊆ A∪B, so {1,2} ∈ P(A∪B) — but {1,2} is a subset of neither A nor B.',
        'Note ⊇ *does* always hold. Only one inclusion fails, which is exactly why the statement is tempting.',
        '**3. True**, both directions.',
        '(⇒) If A ⊆ B and X ⊆ A then X ⊆ B, so P(A) ⊆ P(B).',
        '(⇐) A ∈ P(A) ⊆ P(B), so A ∈ P(B), i.e. A ⊆ B. ∎',
      ],
      note:
        'The trick in (⇐) — feeding A itself into P(A) — is worth naming out loud. It reappears in the countability chapter.',
    },

    // -- 4.7 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '4.7',
      title: 'Special Families of Sets  (⋆⋆)',
      prompt: [
        'X ≠ ∅. Q_X(𝒜) = 1 means: 𝒜 ⊆ P(X), 𝒜 ≠ ∅, and 𝒜 is closed under ∪, under ∩, and under complement in X.',
        'Prove or disprove:',
      ],
      parts: [
        'Q_X(P(X)) = 1',
        'Q_X({X}) = 1',
        'If Q_X(𝒜) = 1 then X ∈ 𝒜',
        'Q_X(𝒜) = Q_X(ℬ) = 1 ⇒ Q_X(𝒜 ∪ ℬ) = 1',
        'Q_X(𝒜) = Q_X(ℬ) = 1 ⇒ Q_X(𝒜 ∩ ℬ) = 1',
      ],
      note: 'This is a Boolean algebra of sets in disguise. Say so — it makes 4 and 5 feel less arbitrary.',
    },

    {
      kind: 'solution',
      ref: '4.7',
      title: 'True, false, true, false, true',
      reveal: true,
      steps: [
        '**1. True.** P(X) contains everything and is closed under all three operations trivially.',
        '**2. False.** {X} is not closed under complement: X \\ X = ∅, and ∅ ≠ X because X ≠ ∅.',
        '**3. True.** 𝒜 ≠ ∅, so pick A ∈ 𝒜. Then X\\A ∈ 𝒜, and A ∪ (X\\A) = X ∈ 𝒜. ∎',
        '**4. False.** X = {1,2,3}, 𝒜 = {∅,{1},{2,3},X}, ℬ = {∅,{2},{1,3},X} — both closed.',
        'But {1} ∪ {2} = {1,2} is in neither, so 𝒜 ∪ ℬ is not closed under ∪.',
        '**5. True.** X is in both (by 3), so the intersection is non-empty; and if A, B lie in both families, so do A∪B, A∩B and X\\A. ∎',
      ],
      note:
        'The 4/5 asymmetry is the lesson: intersections of closed families stay closed, unions almost never do. Same story for subgroups in chapter 5.',
    },

    // -- 4.8 -----------------------------------------------------------------

    {
      kind: 'solution',
      ref: '4.8',
      title: 'Exam short questions (2022)',
      reveal: true,
      steps: [
        '**1.** {0}×{1} = {(0,1)}, so the left set is {{0,1}, {(0,1)}} — two elements. Times {0}: **2 elements**.',
        '**2.** {0}∪{1} = {0,1} = {1,0}, so the right set has one element. Answer: **{(∅, {0,1}), ((0,1), {0,1})}**.',
        '**3.** A = {1,2}, B = {1,2}, C = {1}: A\\B = ∅ ⊂ {2} = A\\C. ✓',
        '**4.** A = {∅}: P(A) = {∅, {∅}}, so A ∩ P(A) = {∅} ≠ ∅. ✓',
      ],
      note: 'Good barometer slide — if these are fast, the room is in decent shape.',
    },

    // -- presentation --------------------------------------------------------

    {
      kind: 'exercise',
      ref: '4.5',
      title: 'Symmetric Difference — for presentation',
      prompt: [
        'A∆B = {x | (x ∈ A ∨ x ∈ B) ∧ ¬(x ∈ A ∧ x ∈ B)}.',
        'Write A∆B with ∩, ∪ and \\ each used at most once; prove A∆B = (A\\B) ∪ (B\\A); then prove A∆B = A∆C ⇒ B = C.',
        '**We are not solving this today.**',
      ],
      hint: [
        'Part 1: read the definition out loud — "in one or the other, but not in both". The expression writes itself.',
        'Parts 2 and 3: set identities are propositional identities in disguise. Translate x ∈ … into formulas, use Lemma 2.1, translate back.',
        'Part 3: apply ∆ to both sides of the hypothesis. What is A∆A? What does ∆ do when applied twice?',
        'You are allowed bigger steps than on sheet 2 — but every step still needs a named justification.',
      ],
      note: 'Do not hand over (A ∪ B) \\ (A ∩ B). The hint is enough.',
    },

    {
      kind: 'points',
      title: 'What to take away',
      points: [
        'Normalise a set before answering anything about it: no duplicates, no order.',
        '∈ and ⊆ are independent questions. Answer them separately.',
        '∅ ⊆ A always; ∅ ∈ A only when listed.',
        'A ∀-statement over an empty range is true.',
        'Pigeonhole: name the boxes, count them, compare.',
        'Closure survives intersection, not union.',
      ],
    },

    {
      kind: 'title',
      title: 'Kahoot',
      subtitle: 'Join at kahoot.it',
      footnote: 'Questions in kahoot/week04.csv',
    },

    {
      kind: 'end',
      title: 'See you next week',
      points: [
        'Next: relations — the objects the rest of the course is built from.',
        'Your real sheet is on Moodle — bring it if it differs from mine.',
        'hserobyan@student.ethz.ch',
      ],
    },
  ],
};
