// ---------------------------------------------------------------------------
// Week 5 — everything you say on screen lives in this file. Edit freely.
// See ./types.ts for the list of slide kinds and the text markup.
//
// The HS2026 sheet 5 was not on Moodle when this was written, so the deck is
// built on the HS2025 sheet 5 and its graded solution, which should be almost
// the same. Check the mapping once the new sheet is out.
// Lecture: §3.3 (Oct 12), §3.4 and the start of §3.5 (Oct 14). Only Def. 3.23
// to 3.25 are used from §3.5.
//
// Each exercise is a twin of one on the sheet — same shape, other content:
//   Exercise 1 ↔ 5.1   Exercise 2 ↔ 5.2   Exercise 3 ↔ 5.3
//   Exercise 4 ↔ 5.5   Exercise 5 ↔ 5.6   Exercise 6: short questions
// 5.4 (properties of ρ ∘ ρ̂, σ ∘ π̂, intersection of equivalence relations) is
// the graded exercise and is not touched anywhere: no inverse inside a
// composition, no symmetry of a composition, no intersection of equivalence
// relations (so Lemma 3.10 is not quoted either). Nothing on screen names a
// sheet exercise.
// All relation claims were brute-forced with Python sets.
// ---------------------------------------------------------------------------

import type { Deck } from './types';

export const week05: Deck = {
  week: 5,
  topic: 'Relations',
  date: 'Mon 19 Oct 2026',
  sheet: 'Exercise sheet 5',

  slides: [
    {
      kind: 'title',
      title: 'Exercise Session 5',
      subtitle: 'Relations, equivalence relations, and partial orders',
      footnote: 'Discrete Mathematics · HS 2026 · Group Q · CHN D 46',
    },

    {
      kind: 'points',
      title: 'This week',
      points: [
        'As every week, we do not look at the graded exercise today.',
        'Composition is read left to right in the script: first ρ, then σ.',
      ],
      note: '1 minute.',
    },

    {
      kind: 'agenda',
      title: 'Today',
      items: [
        'Recap: relations',
        'Powers and transitive closure',
        'Properties of relations',
        'Recap: equivalence relations',
        'An equivalence relation in the plane',
        'Operations on equivalence classes',
        'Prove or disprove',
        'Partial orders and short questions',
      ],
      note:
        'Timing: 3 intro · 6 recap · 8 closure · 10 properties · 4 recap (break here, about 35 min) · 7 plane · 10 classes · 6 prove or disprove · 8 short questions. That is about 60 min.',
    },

    // -- recap: relations ----------------------------------------------------------

    {
      kind: 'points',
      title: 'Relations (script §3.3.1–3.3.5)',
      points: [
        'Def. 3.9: a relation ρ from A to B is a subset of A × B. We write a ρ b for (a, b) ∈ ρ.',
        'Def. 3.11: the inverse is ρ̂ = {(b, a) | (a, b) ∈ ρ}. In the matrix: transpose. In the graph: flip every edge.',
        'Def. 3.12: ρ ∘ σ = {(a, c) | ∃b ((a, b) ∈ ρ ∧ (b, c) ∈ σ)}. First a step in ρ, then a step in σ.',
        'ρⁿ is ρ composed with itself n times. In the graph: a ρⁿ b iff there is a walk of length n from a to b.',
        'Def. 3.18: the transitive closure is ρ* = ⋃ ρⁿ over n ∈ ℕ \\ {0}. So walks of length at least 1.',
      ],
      note: '3 minutes. Draw a small graph and compose it with itself on the board.',
    },

    {
      kind: 'points',
      title: 'Properties (script §3.3.6)',
      points: [
        'Def. 3.13: reflexive if a ρ a for all a ∈ A.',
        'Def. 3.15: symmetric if a ρ b ⟺ b ρ a for all a, b ∈ A.',
        'Def. 3.16: antisymmetric if a ρ b ∧ b ρ a ⟹ a = b for all a, b ∈ A.',
        'Def. 3.17: transitive if a ρ b ∧ b ρ c ⟹ a ρ c for all a, b, c ∈ A. Lemma 3.9: this holds iff ρ² ⊆ ρ.',
        'To show a property fails, one counterexample is enough: one a, one pair, or one triple.',
        'Antisymmetric is not the negation of symmetric. The identity relation is both.',
      ],
      note: '3 minutes.',
    },

    // -- powers and closure -------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 1',
      title: 'Powers and transitive closure',
      prompt: ['Let ρ = {(1, 2), (2, 3), (3, 1), (4, 3)} on {1, 2, 3, 4}.'],
      parts: ['Give ρ² and ρ³ as sets.', 'Give ρ* as a matrix.'],
      hint: ['Draw the graph first.'],
      note: '4 minutes.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 1',
      title: 'Solutions',
      steps: [
        'The graph: 1 → 2 → 3 → 1 is a cycle, and 4 → 3.',
        '1. ρ² = {(1, 3), (2, 1), (3, 2), (4, 1)}, the walks of length 2: 1→2→3, 2→3→1, 3→1→2, 4→3→1.',
        'ρ³ = ρ² ∘ ρ = {(1, 1), (2, 2), (3, 3), (4, 2)}.',
        '2. Each of 1, 2, 3 reaches 1, 2, 3. Vertex 4 reaches 3, 1, 2. No edge goes into 4.',
      ],
    },

    {
      kind: 'table',
      solution: 'Exercise 1',
      title: 'Exercise 1: ρ* as a matrix',
      lead: 'Rows: from. Columns: to.',
      headers: ['', '1', '2', '3', '4'],
      rows: [
        ['1', '1', '1', '1', '0'],
        ['2', '1', '1', '1', '0'],
        ['3', '1', '1', '1', '0'],
        ['4', '1', '1', '1', '0'],
      ],
      markRows: [3],
      note:
        'The entry (4, 4) is 0: there is no walk of length at least 1 from 4 back to 4, and Def. 3.18 starts at n = 1.',
    },

    // -- properties --------------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 2',
      title: 'Properties of relations',
      prompt: [
        'On ℕ \\ {0}, decide for each relation whether it is reflexive, symmetric or transitive. Justify.',
      ],
      parts: ['| ∘ >', '≤ ∪ ≡₃', '< ∪ >'],
      hint: ['For part 1, write out what a (| ∘ >) c means with Def. 3.12.'],
      note: '6 minutes.',
    },

    {
      kind: 'table',
      solution: 'Exercise 2',
      title: 'Exercise 2: overview',
      headers: ['', 'relation', 'reflexive', 'symmetric', 'transitive'],
      rows: [
        ['1', '| ∘ >', '✓', '✓', '✓'],
        ['2', '≤ ∪ ≡₃', '✓', '✗', '✗'],
        ['3', '< ∪ >', '✗', '✓', '✗'],
      ],
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 2',
      title: 'Solutions',
      steps: [
        '1. a (| ∘ >) c ⟺ ∃x (a | x ∧ x > c). For any a, c take x = a(c + 1). Then a | x and x ≥ c + 1 > c.',
        'So | ∘ > is the complete relation (ℕ \\ {0}) × (ℕ \\ {0}), and that has all three properties.',
        '2. Reflexive, since a ≤ a. Not symmetric: 1 ≤ 2, but 2 ≰ 1 and 2 ≢₃ 1.',
        'Not transitive: 4 ≡₃ 1 and 1 ≤ 2, but 4 ≰ 2 and 4 ≢₃ 2.',
        '3. a (< ∪ >) b ⟺ a ≠ b. Not reflexive, since 1 ≠ 1 is false. Symmetric, since a ≠ b ⟺ b ≠ a.',
        'Not transitive: 1 ≠ 2 and 2 ≠ 1, but 1 ≠ 1 is false.',
      ],
    },

    // -- recap: equivalence relations ---------------------------------------------

    {
      kind: 'points',
      title: 'Equivalence relations (script §3.4)',
      points: [
        'Def. 3.19: an equivalence relation is reflexive, symmetric and transitive.',
        'Def. 3.20: the equivalence class of a is [a]θ = {b ∈ A | b θ a}.',
        'Def. 3.22: the quotient set is A/θ = {[a]θ | a ∈ A}.',
        'Theorem 3.11: A/θ is a partition of A (Def. 3.21). The classes are disjoint and cover A.',
        '§3.4.3: ℚ is defined as (ℤ × (ℤ \\ {0}))/∼ with (a, b) ∼ (c, d) ⟺ ad = bc.',
      ],
      note:
        '4 minutes. Board example: the partition {{1, 2}, {3}, {4, 5}} of {1, …, 5} gives an equivalence relation with 4 + 1 + 4 = 9 pairs.',
    },

    // -- plane -------------------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 3',
      title: 'An equivalence relation in the plane',
      prompt: ['On ℝ², define (x₁, y₁) ∼ (x₂, y₂) ⟺ x₁² + y₁² = x₂² + y₂².'],
      parts: ['Prove that ∼ is an equivalence relation.', 'Describe the equivalence classes [(x, y)] geometrically.'],
      note: '5 minutes. Compare with Example 3.33 in the script.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 3',
      title: 'Solutions',
      steps: [
        'Reflexive: x² + y² = x² + y², so (x, y) ∼ (x, y).',
        'Symmetric: if x₁² + y₁² = x₂² + y₂², then x₂² + y₂² = x₁² + y₁², so (x₂, y₂) ∼ (x₁, y₁).',
        'Transitive: if x₁² + y₁² = x₂² + y₂² and x₂² + y₂² = x₃² + y₃², then x₁² + y₁² = x₃² + y₃², so (x₁, y₁) ∼ (x₃, y₃).',
        'All three come from the same properties of = on ℝ.',
        '2. [(x, y)] is the circle around the origin with radius √(x² + y²). The class of (0, 0) is {(0, 0)}.',
      ],
    },

    // -- operations on classes ----------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 4',
      title: 'Operations on equivalence classes',
      prompt: [
        'Let A = ℤ × (ℤ \\ {0}) with (a, b) ∼ (c, d) ⟺ ad = bc, as in §3.4.3.',
        'For an equivalence relation θ on B, a function f : B² → B is θ-consistent if for all b₁, b₂, b₁′, b₂′ ∈ B: (b₁ θ b₁′ ∧ b₂ θ b₂′) ⟹ f(b₁, b₂) θ f(b₁′, b₂′).',
      ],
      parts: [
        'Define the product of two fractions as a function mul : A² → A.',
        'Prove that mul is ∼-consistent.',
        'Show that g((a, b), (c, d)) = (a + c, b + d) is not ∼-consistent.',
      ],
      note: '6 minutes. Consistency is what makes [x] · [y] := [mul(x, y)] well defined on ℚ.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 4',
      title: 'Solutions: parts 1 and 2',
      steps: [
        '1. mul((a, b), (c, d)) = (ac, bd). Since b ≠ 0 and d ≠ 0, bd ≠ 0, so the result lies in A.',
        '2. Let (a, b), (a′, b′), (c, d), (c′, d′) ∈ A.',
        '(a, b) ∼ (a′, b′) ∧ (c, d) ∼ (c′, d′) ⟺ ab′ = ba′ ∧ cd′ = dc′   (def. ∼)',
        '⟹ ab′ · cd′ = ba′ · dc′   (multiply the two equations)',
        '⟺ ac · b′d′ = bd · a′c′   (commutativity and associativity of ·)',
        '⟺ (ac, bd) ∼ (a′c′, b′d′)   (def. ∼)',
        '⟺ mul((a, b), (c, d)) ∼ mul((a′, b′), (c′, d′))   (def. mul)',
      ],
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 4',
      title: 'Solutions: part 3',
      steps: [
        'One counterexample is enough. Take (1, 2) ∼ (2, 4), since 1 · 4 = 2 · 2, and (1, 1) ∼ (1, 1).',
        'g((1, 2), (1, 1)) = (2, 3) and g((2, 4), (1, 1)) = (3, 5).',
        '(2, 3) ≁ (3, 5), since 2 · 5 = 10 ≠ 9 = 3 · 3.',
        'So the result depends on which fraction we pick for 1/2, and g does not give an operation on ℚ.',
      ],
    },

    // -- prove or disprove --------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 5',
      title: 'Prove or disprove',
      prompt: ['Let ρ and σ be relations on a non-empty set A.'],
      parts: [
        'If ρ and σ are reflexive, then ρ ∘ σ is reflexive.',
        'If ρ and σ are transitive, then ρ ∘ σ is transitive.',
      ],
      hint: ['Try small examples first. If one fails, you have a counterexample.'],
      note: '4 minutes.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 5',
      title: 'Solutions',
      steps: [
        '1. True. Let a ∈ A. Then a ρ a and a σ a (reflexivity of ρ and σ).',
        'So ∃b (a ρ b ∧ b σ a) with b = a, which is a (ρ ∘ σ) a by Def. 3.12.',
        '2. False. Let A = {1, 2, 3, 4, 5}, ρ = {(1, 2), (3, 4)} and σ = {(2, 3), (4, 5)}.',
        'ρ and σ are transitive: no two pairs fit together, so there is nothing to check.',
        'ρ ∘ σ = {(1, 3), (3, 5)}. Here 1 (ρ ∘ σ) 3 and 3 (ρ ∘ σ) 5, but (1, 5) ∉ ρ ∘ σ.',
      ],
      note: 'How to find it: write down the two pairs you want in ρ ∘ σ, then choose the middle elements.',
    },

    // -- partial orders ------------------------------------------------------------

    {
      kind: 'points',
      title: 'Partial orders (script §3.5.1)',
      points: [
        'Def. 3.23: a partial order is reflexive, antisymmetric and transitive. (A; ⪯) is then a poset.',
        'Examples 3.35–3.37: ≤ on ℤ, | on ℕ \\ {0}, and ⊆ on P(A) are partial orders. < is not, since it is not reflexive.',
        'Def. 3.24: a and b are comparable if a ⪯ b or b ⪯ a.',
        'Def. 3.25: (A; ⪯) is totally ordered if any two elements are comparable.',
      ],
      note: '2 minutes.',
    },

    {
      kind: 'exercise',
      ref: 'Exercise 6',
      title: 'Short questions',
      prompt: ['In the style of the exam. No justification needed.'],
      parts: [
        'How many relations are there on a set with 2 elements?',
        'True or false: the empty relation on {1} is symmetric and transitive.',
        'True or false: a relation can be both symmetric and antisymmetric.',
        'True or false: | is a partial order on ℤ.',
        'True or false: ({1, 2, 3, 4, 6, 12}; |) is totally ordered.',
      ],
      note: '3 minutes, then a show of hands on each one.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 6',
      title: 'Solutions',
      steps: [
        '1. 16. A relation is a subset of A × A, which has 4 elements, so there are 2⁴ of them.',
        '2. True. There are no pairs, so both conditions hold. It is not reflexive, since (1, 1) ∉ ∅.',
        '3. True. The identity relation id is both.',
        '4. False. 1 | −1 and −1 | 1, but 1 ≠ −1, so | is not antisymmetric on ℤ.',
        '5. False. 2 and 3 are incomparable: 2 ∤ 3 and 3 ∤ 2.',
      ],
    },

    // -- wrap --------------------------------------------------------------------

    {
      kind: 'end',
      title: 'See you next week',
      points: [
        'Do the rest of sheet 5 and compare with the official solution.',
        'hserobyan@ethz.ch',
        'https://h-717.github.io/DM_HS26/',
      ],
    },
  ],
};
