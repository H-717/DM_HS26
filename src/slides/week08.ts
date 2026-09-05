// ---------------------------------------------------------------------------
// Week 8 — everything you say on screen lives in this file. Edit freely.
// See ./types.ts for the list of slide kinds and the text markup.
// ---------------------------------------------------------------------------

import type { Deck } from './types';

export const week08: Deck = {
  week: 8,
  topic: 'Monoids, Groups & Homomorphisms',
  date: 'Week 8',
  sheet: 'Exercise sheet 8 (HS 2025)',

  slides: [
    {
      kind: 'title',
      title: 'Exercise Session 8',
      subtitle: 'Checking axioms, and what structure survives a bijection',
      footnote: 'Discrete Mathematics · HS 2026 · practising on sheet 8',
    },

    {
      kind: 'agenda',
      items: [
        '8.1 Is it a monoid, a group, or neither?',
        '8.2 Group facts from the axioms alone',
        '8.3 Transporting a group along a bijection',
        '8.5 When is x·y = ψ(x)∗ψ(y) associative?',
        '8.6 Isomorphisms map generators to generators',
        '8.7 Kernels (exam)',
        '8.4 — the presentation exercise',
      ],
    },

    {
      kind: 'callout',
      title: 'The checklist, in the order that saves time',
      tone: 'info',
      body: [
        '**Closed?** Often the fastest thing to break.',
        '**Associative?** If this fails, stop — you have neither a monoid nor a group.',
        '**Neutral element?** Guess it, then verify on **both** sides.',
        '**Inverses?** Solve the equation a ∗ x = e for x and check x is in the carrier.',
        '**Commutative?** One counterexample settles it.',
        'Disproving associativity takes one triple. Proving it takes a computation — do that one last.',
      ],
    },

    // -- 8.1 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '8.1',
      title: 'Algebras  (⋆)',
      prompt: ['Monoid, group, or neither? Commutative? Justify.'],
      parts: [
        '⟨ℤ; ⋆⟩ with a ⋆ b = a² + b²',
        '⟨P(X); ∪⟩ for a non-empty finite X',
        '⟨S; ∗⟩ with S = (ℚ\\{0}) × ℚ and (a,b) ∗ (c,d) = (ac, ad + b)',
      ],
    },

    {
      kind: 'solution',
      ref: '8.1',
      title: '1 and 2',
      reveal: true,
      steps: [
        '**1. Neither.** Associativity fails: take a = b = 1, c = 0.',
        '(1 ⋆ 1) ⋆ 0 = 2 ⋆ 0 = 4,  but  1 ⋆ (1 ⋆ 0) = 1 ⋆ 1 = 2.',
        'It is commutative (a² + b² is symmetric) — commutativity without associativity is perfectly possible.',
        '**2. Commutative monoid, not a group.** ∪ is associative and commutative, and ∅ is neutral.',
        'But A ∪ B = ∅ forces A = B = ∅, so nothing except ∅ has an inverse. Since X ≠ ∅, it is not a group.',
      ],
    },

    {
      kind: 'solution',
      ref: '8.1',
      title: '3 · A non-commutative group',
      reveal: true,
      steps: [
        '**Associative**: ((a,b)∗(c,d))∗(e,f) = (ac, ad+b)∗(e,f) = (ace, acf + ad + b).',
        '(a,b)∗((c,d)∗(e,f)) = (a,b)∗(ce, cf+d) = (ace, a(cf+d) + b) = (ace, acf + ad + b). Same ✓',
        '**Neutral**: (1,0). Check both sides: (a,b)∗(1,0) = (a, b) ✓ and (1,0)∗(a,b) = (a, b) ✓',
        '**Inverses**: solve (a,b)∗(c,d) = (1,0): c = 1/a and d = −b/a. Since a ≠ 0, c ≠ 0, so the inverse is in S ✓',
        '**Not commutative**: (2,0)∗(1,1) = (2,2) but (1,1)∗(2,0) = (2,1).',
        'This is the group of maps x ↦ ax + b with a ≠ 0. Composition of affine functions — worth saying, it makes the formula obvious.',
      ],
      note:
        'If they see the affine-map interpretation, everything from associativity to non-commutativity becomes automatic.',
    },

    // -- 8.2 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '8.2',
      title: 'Facts About Groups  (⋆⋆)',
      prompt: [
        'No lemmas from the notes allowed. ⟨G; ∗, ˆ, e⟩ is a group.',
      ],
      parts: [
        'Show G2 follows from G1, G2′ (e is a *right* neutral) and G3.',
        'Prove (a ∗ b)ˆ = bˆ ∗ aˆ.',
        'Prove a ∗ b = a ∗ c ⇒ b = c.',
      ],
      note: 'Part 1 is fiddly and beautiful. Do it slowly — it is the only place all semester where they cannot lean on a lemma.',
    },

    {
      kind: 'solution',
      ref: '8.2',
      title: '1 · Right-neutral is already two-sided',
      reveal: true,
      steps: [
        'We have: associativity, a ∗ e = a for all a, and every a has a right inverse aˆ with a ∗ aˆ = e.',
        'First show aˆ ∗ a = e. Put x = aˆ ∗ a and compute x ∗ x = aˆ ∗ (a ∗ aˆ) ∗ a = aˆ ∗ e ∗ a = aˆ ∗ a = x.',
        'Now multiply x ∗ x = x on the right by xˆ: (x ∗ x) ∗ xˆ = x ∗ xˆ, i.e. x ∗ (x ∗ xˆ) = e, i.e. x ∗ e = e, so **x = e**.',
        'Then e ∗ a = (a ∗ aˆ) ∗ a = a ∗ (aˆ ∗ a) = a ∗ e = a. So e is left neutral too. ∎',
        'The move to remember: an **idempotent** element (x ∗ x = x) in a group must be e.',
      ],
    },

    {
      kind: 'solution',
      ref: '8.2',
      title: '2 and 3',
      reveal: true,
      steps: [
        '**2.** (a ∗ b) ∗ (bˆ ∗ aˆ) = a ∗ (b ∗ bˆ) ∗ aˆ = a ∗ e ∗ aˆ = a ∗ aˆ = e.',
        'Symmetrically (bˆ ∗ aˆ) ∗ (a ∗ b) = e. Inverses are unique, so (a∗b)ˆ = bˆ ∗ aˆ. ∎',
        'The order reverses. Same as socks and shoes — and same as (ρ ∘ σ)⁻¹ from week 5.',
        '**3.** a ∗ b = a ∗ c ⇒ aˆ ∗ (a ∗ b) = aˆ ∗ (a ∗ c) ⇒ (aˆ ∗ a) ∗ b = (aˆ ∗ a) ∗ c ⇒ e ∗ b = e ∗ c ⇒ b = c. ∎',
        'Cancellation is why every row of a group’s operation table is a permutation of the carrier.',
      ],
    },

    // -- 8.3 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '8.3',
      title: 'Structure Induced by a Bijection  (⋆⋆)',
      prompt: [
        'f : G → S a bijection. Define s ⋆ s′ = f( f⁻¹(s) ∗ f⁻¹(s′) ) and the unary operation accordingly.',
        'Show ⟨S, ⋆, …, f(e)⟩ satisfies G1–G3, that f is an isomorphism, and that every non-empty countable set carries a group.',
      ],
    },

    {
      kind: 'solution',
      ref: '8.3',
      title: 'Transport of structure',
      reveal: true,
      steps: [
        'Every check has the same shape: push into G with f⁻¹, use the axiom there, push back with f.',
        'Associativity: (s ⋆ s′) ⋆ s″ = f( (f⁻¹s ∗ f⁻¹s′) ∗ f⁻¹s″ ) and the other bracketing gives the same, because ∗ is associative.',
        'Neutral: f(e), since f( f⁻¹(s) ∗ e ) = f(f⁻¹(s)) = s. Inverse of s: f( (f⁻¹ s)ˆ ).',
        'f is a homomorphism **by definition** of ⋆: f(a ∗ b) = f(a) ⋆ f(b). It is bijective by assumption, hence an isomorphism. ∎',
        '**4.** Any non-empty countable A biject with ℤ_n (if |A| = n) or with ℤ (if infinite), then transport. ∎',
        'The moral: a group structure is not a property of a set, it is extra data. Any set of the right size can carry one.',
      ],
    },

    // -- 8.5 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '8.5',
      title: 'From a Homomorphism to an Operation  (⋆⋆)',
      prompt: [
        'ψ : G → G a group homomorphism; define x · y = ψ(x) ∗ ψ(y).',
        'Prove: · is associative **iff** ψ is idempotent (ψ∘ψ = ψ).',
      ],
    },

    {
      kind: 'solution',
      ref: '8.5',
      title: 'Expand both bracketings',
      reveal: true,
      steps: [
        '(x·y)·z = ψ(ψ(x) ∗ ψ(y)) ∗ ψ(z) = ψψ(x) ∗ ψψ(y) ∗ ψ(z), using that ψ is a homomorphism.',
        'x·(y·z) = ψ(x) ∗ ψ(ψ(y) ∗ ψ(z)) = ψ(x) ∗ ψψ(y) ∗ ψψ(z).',
        '**(⇐)** If ψψ = ψ both sides collapse to ψ(x) ∗ ψ(y) ∗ ψ(z). Associative ✓',
        '**(⇒)** Put y = z = e. A homomorphism sends e to e, so the left side is ψψ(x) and the right side is ψ(x).',
        'Associativity forces ψψ(x) = ψ(x) for every x, i.e. ψ is idempotent. ∎',
        'Specialising the variables to e is the standard way to extract information from an identity that holds for all inputs.',
      ],
    },

    // -- 8.6 / 8.7 -----------------------------------------------------------

    {
      kind: 'solution',
      ref: '8.6',
      title: 'Isomorphisms map generators to generators',
      reveal: true,
      steps: [
        'Let G = ⟨g⟩ and let ψ : G → H be an isomorphism. Take any h ∈ H.',
        'ψ is surjective, so h = ψ(x) for some x ∈ G, and x = g^k for some k since g generates G.',
        'A homomorphism respects powers: ψ(g^k) = ψ(g)^k. So h = ψ(g)^k. ∎',
        'Hence every element of H is a power of ψ(g), i.e. ψ(g) generates H.',
        'Corollary you will use: being cyclic is preserved by isomorphism, so a cyclic and a non-cyclic group are never isomorphic.',
      ],
    },

    {
      kind: 'solution',
      ref: '8.7',
      title: '8.7 · ker(φ) = {e_G} ⟺ φ injective (exam 2024)',
      reveal: true,
      steps: [
        '**(⇐)** If φ is injective: φ(g) = e_H = φ(e_G) forces g = e_G, so the kernel is trivial. ✓',
        '**(⇒)** Suppose ker(φ) = {e_G} and φ(a) = φ(b).',
        'Then φ(a ∗ bˆ) = φ(a) ⊙ φ(b)ˆ = e_H, so a ∗ bˆ ∈ ker(φ) = {e_G}.',
        'Hence a ∗ bˆ = e_G, i.e. a = b. ✓ ∎',
        'The trick — turning "φ(a) = φ(b)" into "something is in the kernel" — is the standard move for every homomorphism proof this term.',
      ],
    },

    // -- presentation --------------------------------------------------------

    {
      kind: 'exercise',
      ref: '8.4',
      title: 'Quotient by a Subgroup — for presentation',
      prompt: [
        'G abelian, H ≤ G, and a ∼ b ⟺ ∃h ∈ H with a·h = b. Show ∼ is an equivalence relation; that ⋆ on G/H is well defined; that ⟨G/H; ⋆⟩ is a group; and whether π is a homomorphism.',
        '**We are not solving this today.**',
      ],
      hint: [
        'Reflexivity needs e ∈ H; symmetry needs inverses in H; transitivity needs closure. Each axiom of a subgroup is used exactly once — say which.',
        'Part 2 is week 5’s consistency check again, in new clothing. Same proof shape.',
        'For the group axioms: the neutral element is [e], and the inverse of [a] is [aˆ]. Prove the inverse operation is well defined before using it.',
        'Where is commutativity of G actually needed? Find the line, and note what breaks without it.',
      ],
      note: 'The last hint is the interesting question — it points at normal subgroups, which this course does not formally cover.',
    },

    {
      kind: 'points',
      title: 'What to take away',
      points: [
        'Check axioms in the cheap-to-refute order; associativity dies to one triple.',
        'Verify a neutral element on both sides.',
        'Inverses reverse order: (a∗b)ˆ = bˆ ∗ aˆ.',
        'In a group, x ∗ x = x forces x = e.',
        'A group structure is data on a set, not a property of it — transport it along any bijection.',
        'Turn "φ(a) = φ(b)" into "a ∗ bˆ ∈ ker φ".',
      ],
    },

    {
      kind: 'title',
      title: 'Kahoot',
      subtitle: 'Join at kahoot.it',
      footnote: 'Questions in kahoot/week08.csv',
    },

    {
      kind: 'end',
      title: 'See you next week',
      points: [
        'Next: cyclic groups, Diffie–Hellman, RSA, and the start of rings.',
        'Your real sheet is on Moodle — bring it if it differs from mine.',
        'hserobyan@student.ethz.ch',
      ],
    },
  ],
};
