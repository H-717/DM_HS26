// ---------------------------------------------------------------------------
// Week 6 — everything you say on screen lives in this file. Edit freely.
// See ./types.ts for the list of slide kinds and the text markup.
// ---------------------------------------------------------------------------

import type { Deck } from './types';

export const week06: Deck = {
  week: 6,
  topic: 'Orders, Functions & Countability',
  date: 'Week 6',
  sheet: 'Exercise sheet 6 (HS 2025)',

  slides: [
    {
      kind: 'title',
      title: 'Exercise Session 6',
      subtitle: 'Posets and Hasse diagrams, then the first uncountable sets',
      footnote: 'Discrete Mathematics · HS 2026 · practising on sheet 6',
    },

    {
      kind: 'agenda',
      items: [
        '6.1 Partial orders and lexicographic order',
        '6.2 Hasse diagrams: least, greatest, minimal, maximal',
        '6.3 Proving ≤lex is a partial order',
        '6.4 Left inverses and injectivity',
        '6.6 Uncountability',
        '6.7 f ∘ g ∘ f (exam)',
        '6.5 — the presentation exercise',
      ],
    },

    {
      kind: 'callout',
      title: 'Four words that are not synonyms',
      tone: 'warn',
      body: [
        '**Minimal**: nothing is strictly below it. There can be many.',
        '**Least**: below *everything*. There is at most one, and it must be comparable to all.',
        'Same for maximal / greatest, upwards.',
        'A finite non-empty poset always has minimal elements. It need not have a least one.',
      ],
      note: 'The divisibility example in 6.2 has one least element and three maximal ones. Perfect illustration — lead with it.',
    },

    // -- 6.1 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '6.1',
      title: 'Partial Order Relations  (⋆)',
      prompt: [],
      parts: [
        'In (ℕ\\{0}; | ), which of (11,12), (4,6), (5,15), (42,42) are comparable?',
        'On A = (ℕ\\{0})² with (a,b) ≤lex (c,d) ⟺ (a≠c ∧ a|c) ∨ (a=c ∧ b|d): find all a ∈ A with a ≤lex (2,5).',
        'Prove or disprove: if (A; ⪯) is a poset, so is (A; ⪰).',
      ],
    },

    {
      kind: 'solution',
      ref: '6.1',
      title: 'Answers',
      reveal: true,
      steps: [
        '**1.** Comparable means one divides the other. (11,12) no · (4,6) no · **(5,15) yes** (5 | 15) · **(42,42) yes** (42 | 42).',
        '**2.** Two cases. If a ≠ 2 and a | 2 then a = 1, and the second coordinate is unconstrained: **(1, y) for every y**.',
        'If a = 2 then we need b | 5, so b ∈ {1, 5}: **(2,1) and (2,5)**.',
        'Answer: { (1,y) : y ∈ ℕ\\{0} } ∪ { (2,1), (2,5) } — an infinite set. Worth noticing.',
        '**3. True.** Reflexivity is unchanged; antisymmetry is symmetric in the two directions; transitivity holds with the chain read backwards. Reversing a partial order always gives a partial order. ∎',
      ],
    },

    {
      kind: 'grid',
      title: '6.2 · Hasse diagram of ({1,2,3,5,6,9}; | )',
      lead: 'Read upward = divides. Edges only for covers — no 1→6 line, since 1|2|6.',
      cells: [
        '  N K   ',
        '        ',
        'B C  E  ',
        '        ',
        '   A    ',
      ],
      legend:
        'A = 1 · B = 2 · C = 3 · E = 5 · K = 6 · N = 9.  Edges: 1–2, 1–3, 1–5, 2–6, 3–6, 3–9.',
      note:
        'Draw this properly on the board; the grid here is just a reminder of the shape. Ask which element is least before revealing the next slide.',
    },

    {
      kind: 'table',
      title: '6.2 · The four questions, both posets',
      headers: ['poset', 'least', 'greatest', 'minimal', 'maximal'],
      rows: [
        ['({1,2,3}; ≤)', '1', '3', '1', '3'],
        ['({1,2,3,5,6,9}; | )', '1', 'none', '1', '5, 6, 9'],
      ],
      markRows: [1],
      note:
        'Second row is the whole lesson: three maximal elements and no greatest one, because 5, 6, 9 are pairwise incomparable.',
    },

    // -- 6.3 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '6.3',
      title: 'The Lexicographic Order  (⋆⋆)',
      prompt: [
        'For posets (A; ⪯) and (B; ⊑), prove that ≤lex on A × B is a partial order, where',
        '(a₁,b₁) ≤lex (a₂,b₂) ⟺ a₁ ≺ a₂ ∨ (a₁ = a₂ ∧ b₁ ⊑ b₂),  and a ≺ a′ means a ⪯ a′ ∧ a ≠ a′.',
      ],
    },

    {
      kind: 'solution',
      ref: '6.3',
      title: 'Three axioms, one case distinction',
      reveal: true,
      steps: [
        '**Reflexive**: a = a and b ⊑ b, so the right disjunct holds. ✓',
        '**Antisymmetric**: suppose both directions hold. If a₁ ≺ a₂ then we cannot also have a₂ ≺ a₁ (that would contradict antisymmetry of ⪯). So a₁ = a₂.',
        'Then both directions reduce to b₁ ⊑ b₂ and b₂ ⊑ b₁, so b₁ = b₂ by antisymmetry of ⊑. Hence the pairs are equal. ✓',
        '**Transitive**: given (a₁,b₁) ≤ (a₂,b₂) ≤ (a₃,b₃), split on whether the first coordinates move.',
        'If a₁ ≺ a₂ or a₂ ≺ a₃, then a₁ ≺ a₃ and the first disjunct holds. Otherwise a₁ = a₂ = a₃ and b₁ ⊑ b₂ ⊑ b₃ gives b₁ ⊑ b₃. ✓ ∎',
        'The only subtle point is that ≺ is transitive and irreflexive — check that separately if you have not.',
      ],
    },

    // -- 6.4 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '6.4',
      title: 'Inverses of Functions  (⋆⋆)',
      prompt: [
        'For f : A → A, prove that there exists g : A → A with g ∘ f = id_A **if and only if** f is injective.',
      ],
    },

    {
      kind: 'solution',
      ref: '6.4',
      title: 'One direction is easy, the other builds g',
      reveal: true,
      steps: [
        '**(⇒)** Suppose g ∘ f = id and f(x₁) = f(x₂). Apply g: x₁ = g(f(x₁)) = g(f(x₂)) = x₂. So f is injective. ✓',
        '**(⇐)** Suppose f is injective. For y in the image of f there is **exactly one** x with f(x) = y — injectivity is what makes this a definition rather than a guess.',
        'Fix any a₀ ∈ A and define g(y) = that unique x when y ∈ im(f), and g(y) = a₀ otherwise.',
        'Then g(f(x)) = x for every x, so g ∘ f = id. ∎',
        'Note where each hypothesis is used: injectivity makes g **well defined**; A ≠ ∅ gives you a₀ to fall back on.',
        'The mirror statement: f has a *right* inverse iff f is surjective — and that one needs a choice for each y.',
      ],
    },

    // -- 6.6 -----------------------------------------------------------------

    {
      kind: 'callout',
      title: 'Two ways to prove uncountability',
      tone: 'info',
      body: [
        '**Diagonalisation**: assume a list of all elements, construct one that differs from the n-th element in position n.',
        '**Injection from a known uncountable set**: exhibit an injective map {0,1}^∞ → S, or ℝ → S. Usually much shorter.',
        'Direction matters: to show S is uncountable, map **into** S from something uncountable.',
      ],
    },

    {
      kind: 'solution',
      ref: '6.6',
      title: 'The four sets',
      reveal: true,
      steps: [
        '**1.** Sequences over {0,…,9}: diagonalise. Given a list a₁, a₂, …, define b(i) = (aᵢ(i) + 1) mod 10. Then b differs from every aᵢ at position i, so b is not in the list. ∎',
        '**2.** The unit circle: t ↦ (cos t, sin t) is a bijection from [0, 2π) onto C, and [0, 2π) is uncountable. ∎',
        '**3.** A_ℓ: the constraint says the partial sums grow no faster than about k/ℓ. Spread the bits out.',
        'Given g ∈ {0,1}^∞ define f(i) = g(i/ℓ) when ℓ | i, and 0 otherwise. The number of ones up to k is at most ⌊k/ℓ⌋ + 1 ≤ k/ℓ + 1 ✓, and g ↦ f is injective. ∎',
        '**4.** S = sequences whose support is closed under taking divisors. For a set T of primes, let f(m) = 1 exactly when every prime factor of m lies in T.',
        'This f is in S, and f(p) = 1 ⟺ p ∈ T, so different T give different f. There are infinitely many primes, so we have injected the uncountable power set of the primes into S. ∎',
      ],
      note:
        'Part 4 is the one to do at the board if time is short — it shows how to convert "infinitely many independent choices" into uncountability.',
    },

    // -- 6.7 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '6.7',
      title: 'f ∘ g ∘ f (exam 2022)  (⋆⋆)',
      prompt: [
        'f : X → Y, g : Y → X, and f ∘ g ∘ f is injective **and** surjective. Prove that f and g are both injective and surjective.',
      ],
      hint: ['Each of the four is two lines. Do f first — the other two need it.'],
    },

    {
      kind: 'solution',
      ref: '6.7',
      title: 'All four, in order',
      reveal: true,
      steps: [
        '**f injective**: f(x₁) = f(x₂) ⇒ fgf(x₁) = fgf(x₂) ⇒ x₁ = x₂, since fgf is injective. ✓',
        '**f surjective**: given y ∈ Y, surjectivity of fgf gives x with f(g(f(x))) = y, so y is a value of f. ✓',
        '**g injective**: suppose g(y₁) = g(y₂). Write yᵢ = f(xᵢ) using surjectivity of f. Then fgf(x₁) = fgf(x₂), so x₁ = x₂ and hence y₁ = y₂. ✓',
        '**g surjective**: given x ∈ X, pick x′ with fgf(x′) = f(x). Since f is injective, g(f(x′)) = x, so x is a value of g. ✓ ∎',
        'The shape to remember: injectivity travels **backwards** along a composition to the first map, surjectivity **forwards** to the last.',
      ],
    },

    // -- presentation --------------------------------------------------------

    {
      kind: 'exercise',
      ref: '6.5',
      title: 'Equinumerous Sets — for presentation',
      prompt: [
        '1. For every set A, A and P(A) are not equinumerous.',
        '2. C = {x ∈ ℚ : 0 ≤ x ≤ 1} and D = {x ∈ ℚ : 0 ≤ x < 1} are equinumerous.',
        '**We are not solving this today.**',
      ],
      hint: [
        'Part 1 is Cantor. Take any f : A → P(A) and consider B = { x ∈ A : x ∉ f(x) }. Ask whether B is f(b) for some b.',
        'Note what part 1 does **not** say — it is about *every* f, so the proof starts "let f be arbitrary".',
        'Part 2: C and D differ by one point. Both are countably infinite; name the theorem from §3.7 that finishes it.',
        'Alternatively build an explicit bijection by shifting an infinite sequence of points — "Hilbert’s hotel" on the rationals.',
      ],
    },

    {
      kind: 'points',
      title: 'What to take away',
      points: [
        'Minimal ≠ least. Count how many there can be.',
        'Hasse diagrams draw covers only, never the derived edges.',
        'Left inverse ⟺ injective; right inverse ⟺ surjective.',
        'Uncountability: diagonalise, or inject a known uncountable set into it.',
        'In a composition, injectivity pulls back to the first map, surjectivity pushes to the last.',
      ],
    },

    {
      kind: 'title',
      title: 'Kahoot',
      subtitle: 'Join at kahoot.it',
      footnote: 'Questions in kahoot/week06.csv',
    },

    {
      kind: 'end',
      title: 'See you next week',
      points: [
        'Next: number theory — gcd, congruences, and modular arithmetic.',
        'Your real sheet is on Moodle — bring it if it differs from mine.',
        'hserobyan@student.ethz.ch',
      ],
    },
  ],
};
