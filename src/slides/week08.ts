// ---------------------------------------------------------------------------
// Week 8 — everything you say on screen lives in this file. Edit freely.
// See ./types.ts for the list of slide kinds and the text markup.
//
// Built on the HS2026 sheet 8 and its graded solution.
// Lecture: §5.1–5.2 (Nov 2), §5.3 partial (Nov 4). The deck assumes
// §5.3.1–5.3.3 (direct products, homomorphisms, subgroups) were seen, and
// nothing from §5.3.4 on (order, cyclic groups, Lagrange, ℤₘ*).
//
// Each exercise is a twin of one on the sheet — same shape, other content:
//   Exercise 1 ↔ 8.1   Exercise 2 ↔ 8.3.2   Exercise 3 ↔ 8.3.1
//   Exercise 4 ↔ 8.2   Exercise 5 ↔ 8.5
// 8.4 is the graded interview exercise and is not touched anywhere: no
// monoid on P(A), no group on a subset of ℚ × ℚ cut out by an equation,
// no composition of homomorphisms, no conjugates g · g₀ · g⁻¹ or kernels.
// 8.3.3 (ℤ₁₅* ≅ ℤ₁₆*) is left out: heaviest one, and it needs §5.3.4–5.3.8.
// 8.6 and 8.7 are the sheet's own exam block and are not used.
// Nothing on screen names a sheet exercise.
// The exam block is from the local official exams (file names = semester):
// HS20 3b, FS21 3b, FS22 3e, FS21 3a.4, FS22 3b, HS21 3d, FS21 3d, FS23 3b.
// HS22 3c (composition of homomorphisms) is skipped: it is the graded 8.4.3a.
// HS23 and FS24 are skipped (latest). None of these are on HS2026 sheet 8.
// Every number and claim was brute-forced in Python.
// ---------------------------------------------------------------------------

import type { Deck } from './types';

export const week08: Deck = {
  week: 8,
  topic: 'Groups',
  date: 'Mon 9 Nov 2026',
  sheet: 'Exercise sheet 8',

  slides: [
    {
      kind: 'title',
      title: 'Exercise Session 8',
      subtitle: 'Monoids, groups and homomorphisms',
      footnote: 'Discrete Mathematics · HS 2026 · Group Q · CHN D 46',
    },

    {
      kind: 'agenda',
      title: 'Today',
      items: [
        'Recap: monoids and groups',
        'Group facts from the axioms',
        'Inverses and commutativity',
        'Recap: direct products, homomorphisms, subgroups',
        'Subgroups of a direct product',
        'An isomorphism',
        'A new operation from a homomorphism',
        'Old exam questions',
      ],
      note:
        'Timing: 3 intro · 5 recap · 8 group facts · 5 commutativity · 5 recap · 6 subgroups (break here, about 35 min) · 6 isomorphism · 7 new operation · 20 old exams. That is about 65 min.',
    },

    // -- recap: monoids and groups -------------------------------------------------

    {
      kind: 'points',
      title: 'Monoids and groups (script §5.1–5.2)',
      points: [
        'Def. 5.3: e is a neutral element of ⟨S; ∗⟩ if e ∗ a = a ∗ e = a for all a ∈ S. Lemma 5.1: there is at most one.',
        'Def. 5.4, 5.5: ∗ is associative if a ∗ (b ∗ c) = (a ∗ b) ∗ c. A monoid ⟨M; ∗, e⟩ has ∗ associative and e neutral.',
        'Def. 5.6: b is an inverse of a if b ∗ a = a ∗ b = e. Lemma 5.2: in a monoid, a has at most one inverse.',
        'Def. 5.7: a group ⟨G; ∗, ˆ, e⟩ satisfies G1 (∗ associative), G2 (e neutral) and G3 (a ∗ â = â ∗ a = e).',
        'Def. 5.8: commutative (abelian) if a ∗ b = b ∗ a for all a, b.',
      ],
      note:
        '5 minutes. Board examples: ⟨ℤ; −⟩ is not associative, (1 − 1) − 1 = −1 but 1 − (1 − 1) = 1. ⟨Σ*; |, ε⟩ is a monoid but not a group (Example 5.10). ⟨ℤ; +, −, 0⟩ is a group.',
    },

    {
      kind: 'points',
      title: 'Group facts (Lemma 5.3, §5.2.4)',
      points: [
        'Lemma 5.3: in a group, for all a, b, c:',
        '(i) $\\hat{\\hat{a}} = a$   (ii) $\\widehat{a \\ast b} = \\hat{b} \\ast \\hat{a}$',
        '(iii) a ∗ b = a ∗ c ⟹ b = c   (iv) b ∗ a = c ∗ a ⟹ b = c',
        '(v) a ∗ x = b has a unique solution x, and so does x ∗ a = b.',
        '§5.2.4: G2 and G3 may be weakened to G2′ (a ∗ e = a) and G3′ (a ∗ â = e). The other halves then follow.',
      ],
    },

    // -- group facts -------------------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 1',
      title: 'Group facts from the axioms',
      prompt: [
        'Let ⟨G; ∗, ˆ, e⟩ be a group. Use only G1, G2 and G3, no lemmas. Name the axiom in every step.',
      ],
      parts: [
        'Prove $\\hat{\\hat{a}} = a$ for all a ∈ G.',
        'Prove b ∗ a = c ∗ a ⟹ b = c for all a, b, c ∈ G.',
        'Prove: if a ∗ b = e, then b = â.',
      ],
      note: '8 minutes. One axiom per step, like the equivalence proofs in chapter 2.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 1',
      title: 'Solutions',
      steps: [
        '1. $\\hat{\\hat{a}} \\overset{G2}{=} \\hat{\\hat{a}} \\ast e \\overset{G3}{=} \\hat{\\hat{a}} \\ast (\\hat{a} \\ast a) \\overset{G1}{=} (\\hat{\\hat{a}} \\ast \\hat{a}) \\ast a \\overset{G3}{=} e \\ast a \\overset{G2}{=} a$',
        'The fourth step is G3 for the element â: its inverse times â is e.',
        '2. $b \\ast a = c \\ast a \\implies (b \\ast a) \\ast \\hat{a} = (c \\ast a) \\ast \\hat{a} \\overset{G1}{\\implies} b \\ast (a \\ast \\hat{a}) = c \\ast (a \\ast \\hat{a})$',
        '$\\overset{G3}{\\implies} b \\ast e = c \\ast e \\overset{G2}{\\implies} b = c$',
        '3. $b \\overset{G2}{=} e \\ast b \\overset{G3}{=} (\\hat{a} \\ast a) \\ast b \\overset{G1}{=} \\hat{a} \\ast (a \\ast b) = \\hat{a} \\ast e \\overset{G2}{=} \\hat{a}$, using a ∗ b = e in the fourth step.',
      ],
      note:
        'Part 3 says: in a group, a one-sided inverse is already the inverse. That is what students use when they only check a ∗ b = e.',
    },

    // -- inverses and commutativity ----------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 2',
      title: 'Inverses and commutativity',
      prompt: ['Let ⟨G; ∗, ˆ, e⟩ be a group. Lemma 5.3 may be used.'],
      parts: [
        'Assume $\\widehat{a \\ast b} = \\hat{a} \\ast \\hat{b}$ for all a, b ∈ G. Prove that G is commutative.',
        'Conversely, prove that $\\widehat{a \\ast b} = \\hat{a} \\ast \\hat{b}$ holds in every commutative group.',
      ],
      note: '5 minutes.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 2',
      title: 'Solutions',
      steps: [
        '1. Let a, b ∈ G.',
        '$a \\ast b \\overset{(i)}{=} \\hat{\\hat{a}} \\ast \\hat{\\hat{b}} = \\widehat{\\hat{a} \\ast \\hat{b}} \\overset{(ii)}{=} \\widehat{\\widehat{b \\ast a}} \\overset{(i)}{=} b \\ast a$',
        'The second step is the assumption for the elements â and b̂. The third uses (ii) in the form $\\widehat{b \\ast a} = \\hat{a} \\ast \\hat{b}$.',
        '2. $\\widehat{a \\ast b} \\overset{(ii)}{=} \\hat{b} \\ast \\hat{a} = \\hat{a} \\ast \\hat{b}$, the last step by commutativity.',
      ],
      note:
        'The trick in 1 is to apply the assumption to â and b̂ instead of a and b. In S₃ (Example 5.12) the assumption fails, as it must.',
    },

    // -- recap: structure of groups --------------------------------------------------------

    {
      kind: 'points',
      title: 'Direct products, homomorphisms, subgroups (script §5.3.1–5.3.3)',
      points: [
        'Def. 5.9, Lemma 5.4: G₁ × G₂ with (a₁, a₂) ⋆ (b₁, b₂) = (a₁ ∗₁ b₁, a₂ ∗₂ b₂) is a group. Neutral element and inverses are component-wise.',
        'Def. 5.10: ψ : G → H is a homomorphism if ψ(a ∗ b) = ψ(a) ⋆ ψ(b) for all a, b. A bijective homomorphism is an isomorphism, G ≃ H.',
        'Lemma 5.5: ψ(e) = e′ and $\\psi(\\hat{a}) = \\widetilde{\\psi(a)}$.',
        'Def. 5.11: H ⊆ G is a subgroup if (1) a ∗ b ∈ H for all a, b ∈ H, (2) e ∈ H, (3) â ∈ H for all a ∈ H.',
      ],
      note:
        '5 minutes. Board examples: in ℤ₅ × ℤ₇, (2, 6) ⋆ (4, 3) = (1, 2) (Example 5.15). log is a homomorphism from ⟨ℝ>0; ·⟩ to ⟨ℝ; +⟩ (Example 5.17). The subgroups of ℤ₁₂ are {0}, {0, 6}, {0, 4, 8}, {0, 3, 6, 9}, {0, 2, 4, 6, 8, 10} and ℤ₁₂ (Example 5.21).',
    },

    // -- subgroups -------------------------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 3',
      title: 'Subgroups of a direct product',
      prompt: ['List all subgroups. No justification needed.'],
      parts: ['⟨ℤ₂; ⊕⟩ × ⟨ℤ₃; ⊕⟩', '⟨ℤ₂; ⊕⟩ × ⟨ℤ₂; ⊕⟩'],
      note: '6 minutes.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 3',
      title: 'Solutions',
      steps: [
        '1. Four subgroups: {(0, 0)}, {(0, 0), (1, 0)}, {(0, 0), (0, 1), (0, 2)} and ℤ₂ × ℤ₃.',
        'Why no more: adding (1, 1) to itself gives (0, 2), (1, 0), (0, 1), (1, 2), (0, 0). So a subgroup with (1, 1) is everything. The same holds for (1, 2).',
        '2. Five subgroups: {(0, 0)}, {(0, 0), (1, 0)}, {(0, 0), (0, 1)}, {(0, 0), (1, 1)} and ℤ₂ × ℤ₂.',
        'Why no more: any two different non-zero elements add up to the third one. So a subgroup with two of them is everything.',
      ],
      note:
        'Every element of ℤ₂ × ℤ₂ is its own inverse, so (3) of Def. 5.11 is free there. Keep {(0, 0), (1, 1)} in mind for the old exams.',
    },

    // -- isomorphism -----------------------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 4',
      title: 'An isomorphism',
      prompt: ['Consider ⟨ℤ; ⋆⟩ with a ⋆ b = a + b − 1.'],
      parts: [
        'Prove that ⟨ℤ; ⋆⟩ is a group. Give the neutral element and the inverse of a.',
        'Prove that f : ℤ → ℤ with f(x) = x + 1 is an isomorphism from ⟨ℤ; +⟩ to ⟨ℤ; ⋆⟩.',
      ],
      note: '6 minutes.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 4',
      title: 'Solutions',
      steps: [
        '1. G1: (a ⋆ b) ⋆ c = (a + b − 1) + c − 1 = a + b + c − 2 and a ⋆ (b ⋆ c) = a + (b + c − 1) − 1 = a + b + c − 2.',
        'G2: e = 1, since a ⋆ 1 = a + 1 − 1 = a and 1 ⋆ a = 1 + a − 1 = a.',
        'G3: â = 2 − a, since a ⋆ (2 − a) = a + 2 − a − 1 = 1 and (2 − a) ⋆ a = 1. And 2 − a ∈ ℤ.',
        '2. f(x + y) = x + y + 1 = (x + 1) + (y + 1) − 1 = f(x) ⋆ f(y). So f is a homomorphism (Def. 5.10).',
        'f is a bijection with inverse y ↦ y − 1. So f is an isomorphism and ⟨ℤ; +⟩ ≃ ⟨ℤ; ⋆⟩.',
      ],
      note:
        'Where ⋆ comes from: a ⋆ b = f(f⁻¹(a) + f⁻¹(b)). Lemma 5.5 matches: f(0) = 1 is the neutral element, and f(−f⁻¹(a)) = f(1 − a) = 2 − a is the inverse.',
    },

    // -- a new operation -------------------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 5',
      title: 'A new operation from a homomorphism',
      prompt: [
        'Let ⟨G; ∗, ˆ, e⟩ be a group and ψ : G → G a homomorphism. Define x · y = x ∗ ψ(y).',
        'Prove: · is associative if and only if ψ(ψ(z)) = ψ(z) for all z ∈ G.',
      ],
      hint: ['For ⟹, choose x and y cleverly.'],
      note: '7 minutes.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 5',
      title: 'Solution',
      steps: [
        'For all x, y, z: (x · y) · z = (x ∗ ψ(y)) ∗ ψ(z) by the definition of ·, twice.',
        'x · (y · z) = x ∗ ψ(y ∗ ψ(z)) = x ∗ (ψ(y) ∗ ψ(ψ(z))) by the definition of ·, twice, and Def. 5.10.',
        '⟸: if ψ(ψ(z)) = ψ(z), then x · (y · z) = x ∗ (ψ(y) ∗ ψ(z)) = (x ∗ ψ(y)) ∗ ψ(z) = (x · y) · z by G1.',
        '⟹: take x = y = e. By Lemma 5.5 (i), ψ(e) = e.',
        '(e · e) · z = (e ∗ e) ∗ ψ(z) = ψ(z) and e · (e · z) = e ∗ (e ∗ ψ(ψ(z))) = ψ(ψ(z)), both by G2.',
        'Associativity says these are equal, so ψ(ψ(z)) = ψ(z) for all z.',
      ],
      note:
        'Setting variables to e is the standard way to get information out of an identity that holds for all elements. Sanity checks: ψ = id gives x · y = x ∗ y. ψ(x) = e gives x · y = x. Both are associative.',
    },

    // -- old exam ------------------------------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exam 1',
      title: 'Old exams: monoid, group or neither',
      prompt: ['Decide whether the algebra is a monoid, a group or neither. Prove your answer.'],
      parts: [
        '(HS 20) ⟨ℤ; ⋆⟩ with a ⋆ b = a³ + b³.',
        '(FS 21) ⟨ℚ; ⋆⟩ with a ⋆ b = ½ · a · b.',
      ],
      note: '5 minutes. Real exam questions, 3 and 4 points.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exam 1',
      title: 'Solutions',
      steps: [
        '1. Neither. ⋆ is not associative: (1 ⋆ 1) ⋆ 0 = 2 ⋆ 0 = 8, but 1 ⋆ (1 ⋆ 0) = 1 ⋆ 1 = 2.',
        'Monoids and groups need associativity (Def. 5.5, G1).',
        '2. A monoid, but not a group.',
        'Associative: (a ⋆ b) ⋆ c = ½ · (½ab) · c = ¼abc and a ⋆ (b ⋆ c) = ½ · a · (½bc) = ¼abc.',
        'Neutral element 2: 2 ⋆ a = ½ · 2 · a = a and a ⋆ 2 = a.',
        'Not a group: 0 ⋆ b = 0 ≠ 2 for every b, so 0 has no inverse.',
      ],
    },

    {
      kind: 'exercise',
      ref: 'Exam 2',
      title: 'Old exams: monoid or group',
      prompt: ['(FS 22) Consider the algebra A = ⟨ℚ \\ {2}; ⋆⟩ with a ⋆ b = 2 · (a + b − 1) − ab.'],
      parts: ['Prove that A is a monoid. (4 points)', 'Prove or disprove: A is a group. (2 points)'],
      note:
        '5 minutes. If the room is stuck, give the rewrite a ⋆ b = 2 − (2 − a)(2 − b). Do not put it on screen first.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exam 2',
      title: 'Solution',
      steps: [
        'Rewrite: 2 − (2 − a)(2 − b) = 2 − 4 + 2a + 2b − ab = 2(a + b − 1) − ab. So a ⋆ b = 2 − (2 − a)(2 − b).',
        'Closed: for a, b ≠ 2, (2 − a)(2 − b) ≠ 0, so a ⋆ b ≠ 2.',
        'Associative: (a ⋆ b) ⋆ c = 2 − (2 − a)(2 − b)(2 − c) = a ⋆ (b ⋆ c).',
        'Neutral element 1: 1 ⋆ a = 2 − 1 · (2 − a) = a, and a ⋆ 1 = a the same way. So A is a monoid.',
        'A is a group: the inverse of a is 2 − 1/(2 − a). It is ≠ 2, and a ⋆ (2 − 1/(2 − a)) = 2 − (2 − a) · 1/(2 − a) = 1. The formula is symmetric, so the other side too.',
      ],
      note:
        'Same idea as Exercise 4: f(x) = 2 − x is an isomorphism from ⟨ℚ \\ {0}; ·⟩ to A, since f(x) ⋆ f(y) = 2 − xy = f(xy). Example: the inverse of 3 is 3, since 3 ⋆ 3 = 2 · 5 − 9 = 1.',
    },

    {
      kind: 'exercise',
      ref: 'Exam 3',
      title: 'Old exams: short questions',
      prompt: [],
      parts: [
        '(FS 21) True or false: the set ℤ₆ is a subgroup of the group ℤ₁₂.',
        '(FS 22) Consider the direct product ⟨ℤ³; ⋆⟩ of three copies of ⟨ℤ; +⟩. Show that f(x, y, z) = x − y + z is a homomorphism from ℤ³ to ℤ.',
        '(HS 21) Disprove: for any two groups G and H, all subgroups of G × H are of the form G′ × H′, where G′ is a subgroup of G and H′ a subgroup of H.',
      ],
      note: '5 minutes. 1, 2 and 3 points.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exam 3',
      title: 'Solutions',
      steps: [
        '1. False. 5 ⊕₁₂ 5 = 10 ∉ ℤ₆, so (1) of Def. 5.11 fails.',
        '2. f((x, y, z) ⋆ (x′, y′, z′)) = f(x + x′, y + y′, z + z′) = (x + x′) − (y + y′) + (z + z′)',
        '= (x − y + z) + (x′ − y′ + z′) = f(x, y, z) + f(x′, y′, z′).',
        '3. G = H = ℤ₂. {(0, 0), (1, 1)} is a subgroup of ℤ₂ × ℤ₂ (Exercise 3).',
        'The subgroups of ℤ₂ are {0} and ℤ₂, so the products are {(0, 0)}, {0} × ℤ₂, ℤ₂ × {0} and ℤ₂ × ℤ₂. None of them is {(0, 0), (1, 1)}.',
      ],
    },

    {
      kind: 'exercise',
      ref: 'Exam 4',
      title: 'Old exams: homomorphisms',
      prompt: [],
      parts: [
        '(FS 21) Let ⟨G; ⋆, ˆ, e⟩ be a group and f, g : G → G homomorphisms. Prove that H = {x ∈ G | f(x) = g(x)} is a subgroup of G. (5 points)',
        '(FS 23) Let φ : G → H be a bijective homomorphism from ⟨G; +, ˆ, e_G⟩ to ⟨H; ⊙, ˜, e_H⟩. Prove that φ⁻¹ : H → G is a homomorphism. (3 points)',
      ],
      note: '5 minutes.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exam 4',
      title: 'Solutions',
      steps: [
        '1. We check the three conditions of Def. 5.11.',
        '(1) For a, b ∈ H: f(a ⋆ b) = f(a) ⋆ f(b) = g(a) ⋆ g(b) = g(a ⋆ b), by Def. 5.10, a, b ∈ H, and Def. 5.10.',
        '(2) f(e) = e = g(e) by Lemma 5.5 (i). So e ∈ H.',
        '(3) For a ∈ H: $f(\\hat{a}) = \\widehat{f(a)} = \\widehat{g(a)} = g(\\hat{a})$, by Lemma 5.5 (ii), a ∈ H, and Lemma 5.5 (ii).',
        '2. Let x, y ∈ H, and a = φ⁻¹(x), b = φ⁻¹(y). Then φ(a + b) = φ(a) ⊙ φ(b) = x ⊙ y.',
        'Applying φ⁻¹: φ⁻¹(x ⊙ y) = a + b = φ⁻¹(x) + φ⁻¹(y).',
      ],
    },

    // -- wrap ----------------------------------------------------------------------------------

    {
      kind: 'end',
      title: 'See you next week',
      points: [
        'Do the rest of sheet 8 and compare with the official solution.',
        'hserobyan@ethz.ch',
        'https://h-717.github.io/DM_HS26/',
      ],
    },
  ],
};
