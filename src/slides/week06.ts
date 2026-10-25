// ---------------------------------------------------------------------------
// Week 6 — everything you say on screen lives in this file. Edit freely.
// See ./types.ts for the list of slide kinds and the text markup.
//
// Built on the HS2026 sheet 6 and its graded solution.
// Lecture: §3.5 and §3.6 (Oct 19), §3.7 (Oct 21).
//
// Each exercise is a twin of one on the sheet — same shape, other content:
//   Exercise 1 ↔ 6.1   Exercise 2 ↔ 6.2   Exercise 3 ↔ 6.3
//   Exercise 4 ↔ 6.4   Exercise 5 ↔ 6.7   Exercise 6: short questions
// 6.5 (equinumerous sets, a countable union of countable sets, monotone
// functions ℕ → ℕ) is the graded exercise and is not touched anywhere: no
// countability, no equinumerosity, no injections from {0,1}^∞. That also
// rules out 6.6, whose technique is exactly what 6.5.3 needs, so §3.7 is
// left out. Nothing on screen names a sheet exercise.
// The exam block is short questions on orders and functions from the local
// official exams (file names = semester): FS22 1a.5, FS23 1a.3, FS22 1a.6,
// HS21 1a.8, HS22 1a.7, FS23 1a.4, then HS20 1a.8, HS22 1a.8, FS22 1c.
// HS23 and FS24 are skipped (latest). None of these were on a sheet.
// All order and function claims were brute-forced with Python sets.
// ---------------------------------------------------------------------------

import type { Deck } from './types';

export const week06: Deck = {
  week: 6,
  topic: 'Partial Orders & Functions',
  date: 'Mon 26 Oct 2026',
  sheet: 'Exercise sheet 6',

  slides: [
    {
      kind: 'title',
      title: 'Exercise Session 6',
      subtitle: 'Partial orders and functions',
      footnote: 'Discrete Mathematics · HS 2026 · Group Q · CHN D 46',
    },

    {
      kind: 'agenda',
      title: 'Today',
      items: [
        'Recap: partial orders',
        'Comparable elements and new orders',
        'Recap: Hasse diagrams and special elements',
        'Hasse diagrams',
        'The direct product of posets',
        'Recap: functions',
        'Right inverses',
        'Compositions',
        'Short questions',
        'Old exam questions',
      ],
      note:
        'Timing: 3 intro · 5 recap · 10 orders · 5 recap · 10 Hasse · 8 product (break here, about 40 min) · 5 recap · 10 right inverses · 10 compositions · 8 short questions · 13 old exams. That is about 90 min.',
    },

    // -- recap: partial orders -----------------------------------------------------

    {
      kind: 'points',
      title: 'Partial orders (script §3.5.1)',
      points: [
        'Def. 3.16: ρ is antisymmetric if a ρ b ∧ b ρ a ⟹ a = b for all a, b ∈ A.',
        'Def. 3.23: a partial order is reflexive, antisymmetric and transitive. (A; ⪯) is then called a poset.',
        'a ≺ b means a ⪯ b ∧ a ≠ b.',
        'Def. 3.24: a and b are comparable if a ⪯ b or b ⪯ a. Otherwise incomparable.',
        'Def. 3.25: (A; ⪯) is totally ordered if any two elements are comparable.',
      ],
      note: '5 minutes. Examples from the script: ≤ on ℤ, | on ℕ \\ {0}, ⊆ on P(A). Only the first one is total.',
    },

    // -- orders ------------------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 1',
      title: 'Comparable elements and new orders',
      prompt: [
        'Part 2 uses the order on (ℕ \\ {0}) × (ℕ \\ {0}) given by (a, b) ≤q (c, d) ⟺ (a ≠ c ∧ a ≤ c) ∨ (a = c ∧ b | d).',
      ],
      parts: [
        'In (P({1, 2, 3}); ⊆), which pairs are comparable? ({1}, {1, 2}), ({1, 2}, {2, 3}), (∅, {3}), ({1, 3}, {1, 3})',
        'Find all elements x with x ≤q (3, 4).',
        'Prove or disprove: if ⪯ and ⊑ are partial orders on A, then ⪯ ∩ ⊑ is a partial order on A.',
        'Prove or disprove: if ⪯ and ⊑ are partial orders on A, then ⪯ ∪ ⊑ is a partial order on A.',
      ],
      note: '6 minutes.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 1',
      title: 'Solutions',
      steps: [
        '1. ({1}, {1, 2}): comparable, {1} ⊆ {1, 2}. ({1, 2}, {2, 3}): incomparable, neither is a subset of the other.',
        '(∅, {3}): comparable, ∅ ⊆ {3}. ({1, 3}, {1, 3}): comparable, since ⊆ is reflexive.',
        '2. Case a ∈ {1, 2}: a ≠ 3 and a ≤ 3, so (a, b) ≤q (3, 4) for every b.',
        'Case a = 3: we need b | 4, so b ∈ {1, 2, 4}. Case a > 3: a ≤ 3 is false, so nothing.',
        'Answer: {(1, n), (2, n) | n ∈ ℕ \\ {0}} ∪ {(3, 1), (3, 2), (3, 4)}. An infinite set.',
      ],
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 1',
      title: 'Solutions',
      steps: [
        '3. True. Reflexive: a ⪯ a and a ⊑ a, so a (⪯ ∩ ⊑) a.',
        'Antisymmetric: from a (⪯ ∩ ⊑) b and b (⪯ ∩ ⊑) a we get a ⪯ b and b ⪯ a, so a = b by the antisymmetry of ⪯.',
        'Transitive: from a (⪯ ∩ ⊑) b and b (⪯ ∩ ⊑) c we get a ⪯ c and a ⊑ c by transitivity of both, so a (⪯ ∩ ⊑) c.',
        '4. False. Take A = {1, 2} with ≤ and ≥. Both are partial orders.',
        '≤ ∪ ≥ contains (1, 2) and (2, 1), but 1 ≠ 2. So it is not antisymmetric.',
      ],
      note: 'For 3, antisymmetry only needs one of the two orders.',
    },

    // -- recap: Hasse diagrams -------------------------------------------------------

    {
      kind: 'points',
      title: 'Hasse diagrams and special elements (script §3.5.2, §3.5.4)',
      points: [
        'Def. 3.26: b covers a if a ≺ b and there is no c with a ≺ c ≺ b.',
        'Def. 3.27: the Hasse diagram has an edge from a to b iff b covers a. Draw b above a and leave out the arrows.',
        'Def. 3.29: a is minimal (maximal) if there is no b with b ≺ a (b ≻ a).',
        'Def. 3.29: a is the least (greatest) element if a ⪯ b (a ⪰ b) for all b ∈ A.',
        'There is at most one least element, but there can be many minimal ones.',
      ],
      note:
        '5 minutes. Board example: ({2, 3, 4, 5, 6, 7, 8, 9}; |) from Example 3.47. No least or greatest element, minimal 2, 3, 5, 7.',
    },

    // -- Hasse ----------------------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 2',
      title: 'Hasse diagrams',
      prompt: [
        'For each poset, draw the Hasse diagram and give all least, greatest, minimal and maximal elements.',
      ],
      parts: ['(P({a, b}); ⊆)', '({2, 4, 5, 10, 12, 20}; |)'],
      note: '6 minutes. Draw both diagrams on the board when going through it.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 2',
      title: 'Solutions',
      steps: [
        '1. Bottom: ∅. Middle: {a} and {b}. Top: {a, b}.',
        'Edges: ∅–{a}, ∅–{b}, {a}–{a, b}, {b}–{a, b}.',
        '2. Bottom: 2 and 5. Middle: 4 and 10. Top: 12 and 20.',
        'Edges: 2–4, 2–10, 5–10, 4–12, 4–20, 10–20.',
        'No edge 2–12: 4 lies in between, since 2 | 4 and 4 | 12. Same for 2–20 and 5–20.',
      ],
    },

    {
      kind: 'table',
      solution: 'Exercise 2',
      title: 'Exercise 2: special elements',
      headers: ['poset', 'least', 'greatest', 'minimal', 'maximal'],
      rows: [
        ['(P({a, b}); ⊆)', '∅', '{a, b}', '∅', '{a, b}'],
        ['({2, 4, 5, 10, 12, 20}; |)', 'none', 'none', '2, 5', '12, 20'],
      ],
      note: 'In the second poset 2 and 5 are incomparable, so neither of them is least.',
    },

    // -- product ------------------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 3',
      title: 'The direct product of posets',
      prompt: [
        'Def. 3.28: for posets (A; ⪯) and (B; ⊑), define on A × B',
        '(a₁, b₁) ≤ (a₂, b₂) ⟺ a₁ ⪯ a₂ ∧ b₁ ⊑ b₂.',
      ],
      parts: [
        'Prove that ≤ is a partial order on A × B (Theorem 3.12).',
        'Replace ∧ by ∨. Show that the result is in general not a partial order.',
      ],
      note: '5 minutes.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 3',
      title: 'Solutions',
      steps: [
        '1. Reflexive: a ⪯ a and b ⊑ b, so (a, b) ≤ (a, b).',
        'Antisymmetric: from (a₁, b₁) ≤ (a₂, b₂) and (a₂, b₂) ≤ (a₁, b₁) we get a₁ ⪯ a₂, a₂ ⪯ a₁, b₁ ⊑ b₂ and b₂ ⊑ b₁.',
        'By the antisymmetry of ⪯ and ⊑, a₁ = a₂ and b₁ = b₂. So (a₁, b₁) = (a₂, b₂).',
        'Transitive: from (a₁, b₁) ≤ (a₂, b₂) ≤ (a₃, b₃) we get a₁ ⪯ a₂ ⪯ a₃ and b₁ ⊑ b₂ ⊑ b₃, so a₁ ⪯ a₃ and b₁ ⊑ b₃. Hence (a₁, b₁) ≤ (a₃, b₃).',
        '2. Take (ℕ; ≤) twice. Then (1, 2) ≤ (2, 1) because 1 ≤ 2, and (2, 1) ≤ (1, 2) because 1 ≤ 2.',
        'But (1, 2) ≠ (2, 1), so the ∨ version is not antisymmetric.',
      ],
      note: 'Every property is checked coordinate by coordinate, no case distinction needed.',
    },

    // -- recap: functions -----------------------------------------------------------

    {
      kind: 'points',
      title: 'Functions (script §3.6)',
      points: [
        'Def. 3.33: a function f : A → B is a relation from A to B that is totally defined (every a has some b) and well-defined (at most one b).',
        'Def. 3.39: f is injective if a ≠ a′ ⟹ f(a) ≠ f(a′). Equivalently f(a) = f(a′) ⟹ a = a′.',
        'Def. 3.39: f is surjective if every b ∈ B is f(a) for some a ∈ A. Bijective means both.',
        'Def. 3.41: (g ∘ f)(a) = g(f(a)). So g ∘ f means first f, then g.',
        'Careful: for relations, ρ ∘ σ means first ρ, then σ (Def. 3.12). The script uses the other order for functions.',
      ],
      note: '5 minutes. To prove injective, start with f(a) = f(a′). To prove surjective, start with an arbitrary b.',
    },

    // -- right inverses -----------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 4',
      title: 'Right inverses',
      prompt: [
        'Let f : A → A. Prove that there is a function g : A → A with f ∘ g = id_A if and only if f is surjective.',
        'Such a g is called a right inverse of f.',
      ],
      note: '6 minutes.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 4',
      title: 'Solutions',
      steps: [
        '(⟹) Let f ∘ g = id_A and let b ∈ A. Then b = id_A(b) = (f ∘ g)(b) = f(g(b)).',
        'So b = f(a) for a = g(b). Hence f is surjective.',
        '(⟸) Let f be surjective. For every b ∈ A there is some a ∈ A with f(a) = b. Choose one and call it g(b).',
        'Then g : A → A is a function, and (f ∘ g)(b) = f(g(b)) = b for all b. So f ∘ g = id_A.',
      ],
      note: 'There can be several a with f(a) = b. Any choice works, so the right inverse is not unique in general.',
    },

    // -- compositions ----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 5',
      title: 'Compositions',
      prompt: ['Let f : X → Y and g : Y → Z be functions.'],
      parts: [
        'If g ∘ f is injective, then f is injective.',
        'If g ∘ f is surjective, then g is surjective.',
        'True or false: if g ∘ f is injective, then g is injective.',
      ],
      hint: ['For 3, try very small sets X, Y and Z.'],
      note: '7 minutes.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 5',
      title: 'Solutions',
      steps: [
        '1. Let f(x₁) = f(x₂). Then g(f(x₁)) = g(f(x₂)), so (g ∘ f)(x₁) = (g ∘ f)(x₂). Since g ∘ f is injective, x₁ = x₂.',
        '2. Let z ∈ Z. Since g ∘ f is surjective, there is x ∈ X with g(f(x)) = z. So z = g(y) for y = f(x) ∈ Y.',
        '3. False. Let X = {1}, Y = {1, 2}, Z = {1}, f(1) = 1 and g(1) = g(2) = 1.',
        'g ∘ f : {1} → {1} is injective, but g(1) = g(2). So g is not injective.',
      ],
      note: 'To remember it: injectivity of g ∘ f tells you about the first map f, surjectivity about the last map g.',
    },

    // -- short questions -----------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 6',
      title: 'Short questions',
      prompt: ['In the style of the exam. No justification needed.'],
      parts: [
        'True or false: (ℤ; <) is a poset.',
        'True or false: in a finite poset, every minimal element is a least element.',
        'True or false: (P({a, b}); ⊆) is totally ordered.',
        'True or false: if f : A → B and g : B → C are bijective, then g ∘ f is bijective.',
        'True or false: a poset has at most one greatest element.',
      ],
      note: '3 minutes, then a show of hands on each one.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 6',
      title: 'Solutions',
      steps: [
        '1. False. < is not reflexive: 1 < 1 is false.',
        '2. False. In ({2, 3}; |) both 2 and 3 are minimal, but 2 ∤ 3 and 3 ∤ 2. So there is no least element.',
        '3. False. {a} and {b} are incomparable.',
        '4. True. The inverse is f⁻¹ ∘ g⁻¹.',
        '5. True. If a and a′ are both greatest, then a′ ⪯ a and a ⪯ a′, so a = a′ by antisymmetry.',
      ],
    },

    // -- old exam --------------------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exam 1',
      title: 'Old exams: partial orders',
      prompt: ['Short questions from past end-of-semester exams. One point each, no justification needed.'],
      parts: [
        '(FS 22) List all maximal elements of the poset ({1, 2, 5, 7, 10, 30, 60}; |).',
        '(FS 23) List all maximal elements of the poset ({1, 3, 4, 9, 11, 13, 26}; |).',
        '(FS 22) List all upper bounds of the set {1, 2, 5} in the lattice ({1, 2, 5, 10, 15, 30, 60}; |).',
        '(HS 21) True or false: 72 is the least upper bound of {4, 6, 9} in the poset ({4, 6, 9, 18, 24, 48, 54, 72, 288}; |).',
        '(HS 22) On ℕ², let (a, b) ⪯ (c, d) ⟺ a ≤ c ∧ b ≤ d. What is the least upper bound of {(3, 8), (1, 4), (2, 9)}?',
        '(FS 23) Let ρ = {(a, a), (a, c), (a, d), (b, b), (b, c), (c, c), (c, d), (d, d)} on {a, b, c, d}. Find (x, y) ∈ ρ such that ρ \\ {(x, y)} is a partial order.',
      ],
      hint: ['Def. 3.29: u is an upper bound of S if s ⪯ u for all s ∈ S. The least upper bound is the least element of the set of upper bounds.'],
      note: '8 minutes. Real exam questions. Show of hands on each, then reveal.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exam 1',
      title: 'Solutions',
      steps: [
        '1. 7 and 60. Every other element divides 60.',
        '2. 4, 9, 11 and 26. The others divide 9 or 26 (1 | 9, 3 | 9, 13 | 26).',
        '3. 10, 30 and 60: the elements divisible by 1, 2 and 5.',
        '4. True. The upper bounds are the multiples of 4, 6 and 9 in the set: 72 and 288. Since 72 | 288, 72 is the least.',
        '5. (3, 9). An upper bound (c, d) needs c ≥ 3 and d ≥ 9.',
        '6. (b, c) or (c, d). ρ is reflexive and antisymmetric, but b ρ c and c ρ d without b ρ d. Removing either pair makes it transitive.',
      ],
    },

    {
      kind: 'exercise',
      ref: 'Exam 2',
      title: 'Old exams: functions',
      prompt: ['From past end-of-semester exams. No justification needed for 1 and 2.'],
      parts: [
        '(HS 20) Find a set A and a function f : A → A such that f is injective but not surjective.',
        '(HS 22) Find a surjective function f : ℕ → ℤ.',
        '(FS 22) Disprove: for any sets X, Y, Z and functions f : X → Y and g : Y → Z, if g ∘ f is bijective, then f or g is bijective.',
      ],
      hint: ['For 3, reuse the small sets from Exercise 5.'],
      note: '5 minutes.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exam 2',
      title: 'Solutions',
      steps: [
        '1. A = ℕ and f(n) = n + 1. It is injective, but 0 is not hit.',
        '2. f(n) = n/2 for even n and f(n) = −(n + 1)/2 for odd n. So 0, 1, 2, 3, 4, … ↦ 0, −1, 1, −2, 2, …',
        '3. Let X = Z = {1}, Y = {1, 2}, f(1) = 1 and g(1) = g(2) = 1.',
        'g ∘ f : {1} → {1} is bijective. But f is not surjective (2 is not hit) and g is not injective (g(1) = g(2)).',
      ],
    },

    // -- wrap --------------------------------------------------------------------

    {
      kind: 'end',
      title: 'See you next week',
      points: [
        'Do the rest of sheet 6 and compare with the official solution.',
        'hserobyan@ethz.ch',
        'https://h-717.github.io/DM_HS26/',
      ],
    },
  ],
};
