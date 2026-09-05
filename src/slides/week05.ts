// ---------------------------------------------------------------------------
// Week 5 — everything you say on screen lives in this file. Edit freely.
// See ./types.ts for the list of slide kinds and the text markup.
// ---------------------------------------------------------------------------

import type { Deck } from './types';

export const week05: Deck = {
  week: 5,
  topic: 'Relations & Equivalence Classes',
  date: 'Week 5',
  sheet: 'Exercise sheet 5 (HS 2025)',

  slides: [
    {
      kind: 'title',
      title: 'Exercise Session 5',
      subtitle: 'Composition, closures, and what an equivalence class really is',
      footnote: 'Discrete Mathematics · HS 2026 · practising on sheet 5',
    },

    {
      kind: 'agenda',
      items: [
        'Recap: the properties, and how to disprove one',
        '5.1 Powers and the reflexive-transitive closure',
        '5.2 Operations on relations',
        '5.3 An equivalence relation on the punctured plane',
        '5.5 Lifting an operation to equivalence classes',
        '5.6 Antisymmetry under composition (exam)',
        '5.4 — the presentation exercise',
      ],
    },

    {
      kind: 'callout',
      title: 'Before anything: fix your composition convention',
      tone: 'warn',
      body: [
        'Some texts read ρ ∘ σ as "σ first", others as "ρ first". They give **different relations**.',
        'These slides use: **a (ρ ∘ σ) c  ⟺  ∃b ( a ρ b ∧ b σ c )** — left one first.',
        'Check which one your lecture used and stay with it. State it at the top of your solution and no grader can argue.',
      ],
      note: 'Genuinely worth 60 seconds. Half the "wrong" answers on this sheet last year were convention mismatches.',
    },

    {
      kind: 'points',
      title: 'The properties, and how you disprove each',
      reveal: true,
      points: [
        '**Reflexive**: ∀a, (a,a) ∈ ρ. Disprove with **one** a.',
        '**Symmetric**: (a,b) ∈ ρ ⇒ (b,a) ∈ ρ. Disprove with **one pair**.',
        '**Antisymmetric**: (a,b), (b,a) ∈ ρ ⇒ a = b. Disprove with one pair a ≠ b going both ways.',
        '**Transitive**: (a,b), (b,c) ∈ ρ ⇒ (a,c) ∈ ρ. Disprove with **one triple**.',
        'Antisymmetric is not "not symmetric". A relation can be both (e.g. equality) or neither.',
      ],
    },

    // -- 5.1 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '5.1',
      title: 'Computing Representations  (⋆)',
      prompt: [
        'ρ = {(1,4), (2,1), (2,3), (4,2)} on {1,2,3,4}.',
        'Give ρ³ as a set, and ρ* as a matrix.',
      ],
      hint: ['Draw the digraph first: 1→4, 2→1, 2→3, 4→2. Then ρ³ is "walks of length 3".'],
    },

    {
      kind: 'solution',
      ref: '5.1',
      title: 'ρ³ — walk three edges',
      reveal: true,
      steps: [
        'ρ² = {(1,2), (2,4), (4,1), (4,3)}. (From 1: 1→4→2. From 2: 2→1→4. From 4: 4→2→1 and 4→2→3. Node 3 is a dead end.)',
        'ρ³: 1→4→2→1 and 1→4→2→3; 2→1→4→2; 4→2→1→4.',
        '**ρ³ = {(1,1), (1,3), (2,2), (4,4)}**',
        'Node 3 never appears on the left: it has no outgoing edge, so no walk starts there.',
      ],
    },

    {
      kind: 'table',
      title: '5.1 · ρ* as a matrix',
      lead: 'ρ* = reachability in zero or more steps. Rows = from, columns = to.',
      headers: ['', '1', '2', '3', '4'],
      rows: [
        ['1', '1', '1', '1', '1'],
        ['2', '1', '1', '1', '1'],
        ['3', '0', '0', '1', '0'],
        ['4', '1', '1', '1', '1'],
      ],
      markRows: [2],
      note:
        '1, 2 and 4 sit on a cycle (1→4→2→1), so each reaches everything. From 3 you can only stay at 3 — the zero-step case is why the diagonal entry is still 1.',
    },

    // -- 5.2 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '5.2',
      title: 'Operations on Relations  (⋆⋆)',
      prompt: [
        'On ℕ \\ {0}, with the relations <, | and ≡₂. For each, decide reflexive / symmetric / transitive, with justification.',
      ],
      parts: ['< ∘ |', '| ∪ ≡₂', '| ∪ |⁻¹'],
    },

    {
      kind: 'solution',
      ref: '5.2',
      title: '1 · < ∘ | collapses to <',
      reveal: true,
      steps: [
        'a (< ∘ |) c means: ∃b with a < b and b | c.',
        'If a < c, take b = c: then a < c and c | c ✓. So every pair with a < c is in the relation.',
        'If c ≤ a: every divisor b of c satisfies b ≤ c ≤ a, so no b with a < b divides c. Nothing else is in the relation.',
        'Hence **< ∘ | = <**: not reflexive, not symmetric, transitive.',
        'Nice check: the *other* composition convention gives the same answer here. Rare, and worth noticing.',
      ],
    },

    {
      kind: 'solution',
      ref: '5.2',
      title: '2 and 3 · unions',
      reveal: true,
      steps: [
        '**| ∪ ≡₂** — reflexive ✓ (a | a).',
        'Not symmetric: (1,2) is in it since 1 | 2; but 2 ∤ 1 and 2 ≢₂ 1, so (2,1) is not.',
        'Not transitive: (3,1) is in it (3 ≡₂ 1), (1,2) is in it (1 | 2), but (3,2) is in neither part.',
        '**| ∪ |⁻¹** — reflexive ✓, and symmetric ✓ by construction: a union of a relation with its inverse always is.',
        'Not transitive: (2,6) via 2|6, and (6,3) via 3|6, but 2 ∤ 3 and 3 ∤ 2.',
        'Pattern worth keeping: unions preserve reflexivity and symmetry, and destroy transitivity.',
      ],
    },

    // -- 5.3 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '5.3',
      title: 'An Equivalence Relation  (⋆⋆)',
      prompt: [
        'On ℝ² \\ {(0,0)}:  (x₁,y₁) ∼ (x₂,y₂)  ⟺  ∃λ > 0 with (x₁,y₁) = (λx₂, λy₂).',
      ],
      parts: ['Prove ∼ is an equivalence relation.', 'Describe the classes [(x,y)] geometrically.'],
    },

    {
      kind: 'solution',
      ref: '5.3',
      title: 'Each axiom is one choice of λ',
      reveal: true,
      steps: [
        '**Reflexive**: take λ = 1. ✓',
        '**Symmetric**: if (x₁,y₁) = λ(x₂,y₂) with λ > 0, then (x₂,y₂) = (1/λ)(x₁,y₁), and 1/λ > 0. ✓',
        '**Transitive**: λ then μ gives λμ, and λμ > 0. ✓',
        'Everything hinges on {λ > 0} containing 1 and being closed under inverses and products — it is a group.',
        '**Classes**: [(x,y)] = { λ(x,y) : λ > 0 } — the **open ray** from the origin through (x,y), origin excluded.',
        'Why λ > 0 and not λ ≠ 0 matters: with λ ≠ 0 the class would be the whole line, and (x,y) ∼ (−x,−y). Direction would be lost.',
      ],
      note:
        'Draw two opposite rays on the board. The set of classes here is exactly the circle of directions — a first glimpse of quotients as new objects.',
    },

    // -- 5.5 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '5.5',
      title: 'Lifting an Operation to Classes  (⋆⋆)',
      prompt: [
        'A = ℤ × (ℤ\\{0}), with (a,b) ∼ (c,d) ⟺ ad = bc. Then ℚ = A/∼.',
      ],
      parts: [
        'Define sum : A² → A, the addition of fractional representations.',
        'Say formally what it means for f : B² → B to be θ-consistent.',
        'Prove sum is ∼-consistent.',
      ],
      note: 'This exercise is why ℚ is allowed to exist. Say that out loud — it changes how they read it.',
    },

    {
      kind: 'solution',
      ref: '5.5',
      title: 'The definition, and what has to be checked',
      reveal: true,
      steps: [
        '**1.** sum((a,b), (c,d)) = **(ad + bc, bd)**. Note bd ≠ 0, so the result is in A. ✓',
        '**2.** f is θ-consistent iff for all b₁, b₁′, b₂, b₂′ ∈ B:',
        '( b₁ θ b₁′ ∧ b₂ θ b₂′ ) ⟹ f(b₁, b₂) θ f(b₁′, b₂′).',
        'In words: replacing inputs by equivalent inputs gives an equivalent output — so the operation descends to classes.',
        'Without this, "[x] + [y] := [x + y]" would depend on which representatives you happened to pick, and would not be a function at all.',
      ],
    },

    {
      kind: 'solution',
      ref: '5.5',
      title: '3 · The computation',
      reveal: true,
      steps: [
        'Assume (a,b) ∼ (a′,b′), i.e. **ab′ = a′b**, and (c,d) ∼ (c′,d′), i.e. **cd′ = c′d**.',
        'Goal: (ad + bc, bd) ∼ (a′d′ + b′c′, b′d′), i.e. (ad + bc)·b′d′ = (a′d′ + b′c′)·bd.',
        'Left side = ad b′d′ + bc b′d′ = (ab′)(dd′) + (cd′)(bb′).',
        'Right side = a′d′bd + b′c′bd = (a′b)(dd′) + (c′d)(bb′).',
        'Substitute ab′ = a′b and cd′ = c′d — the two sides are literally the same expression. ∎',
        'The whole proof is grouping the factors so the two hypotheses appear. That regrouping *is* the exercise.',
      ],
    },

    // -- 5.6 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '5.6',
      title: 'Antisymmetry (exam 2021)  (⋆)',
      prompt: ['ρ and σ antisymmetric on a non-empty A. Is ρ ∘ σ antisymmetric?'],
    },

    {
      kind: 'solution',
      ref: '5.6',
      title: 'No — and the counterexample is small',
      reveal: true,
      steps: [
        'Take A = {1,2,3}, ρ = {(1,3), (2,3)}, σ = {(3,2), (3,1)}.',
        'Both are antisymmetric: neither contains a pair together with its reverse.',
        'ρ ∘ σ contains (1,3)+(3,2) ⇒ **(1,2)**, and (2,3)+(3,1) ⇒ **(2,1)**.',
        'So both (1,2) and (2,1) are in ρ ∘ σ with 1 ≠ 2 — not antisymmetric. ∎',
        'How to find it: work backwards. Write down what you want in the composition, then choose the middle element that produces it.',
      ],
      note:
        'Teach the backwards search explicitly. Students hunt randomly for counterexamples; this exercise shows how to construct one.',
    },

    // -- presentation --------------------------------------------------------

    {
      kind: 'exercise',
      ref: '5.4',
      title: 'Properties of Relations — for presentation',
      prompt: [
        '1. ρ ∘ ρ⁻¹ is symmetric.   2. σ symmetric, π antisymmetric ⇒ σ ∘ π⁻¹ symmetric.   3. The intersection of two equivalence relations is an equivalence relation.',
        '**We are not solving this today.**',
      ],
      hint: [
        'For 1: write out what (a,c) ∈ ρ ∘ ρ⁻¹ means, then read the same condition backwards. Also remember (ρ ∘ σ)⁻¹ = σ⁻¹ ∘ ρ⁻¹.',
        'For 2: one of the three is false. Try tiny sets — two or three elements is enough.',
        'For 3: check the three axioms one at a time. Each is two lines. Then ask yourself whether the *union* would also work.',
        'State your composition convention in the first line of your write-up.',
      ],
    },

    {
      kind: 'points',
      title: 'What to take away',
      points: [
        'Relations are sets of pairs. When stuck, draw the digraph.',
        'ρⁿ = walks of length n; ρ* = reachability, including zero steps.',
        'To disprove a property you need exactly one witness. Find it, do not argue.',
        'Unions keep reflexivity and symmetry, and break transitivity.',
        'An operation on classes is only well defined once you have checked consistency.',
      ],
    },

    {
      kind: 'title',
      title: 'Kahoot',
      subtitle: 'Join at kahoot.it',
      footnote: 'Questions in kahoot/week05.csv',
    },

    {
      kind: 'end',
      title: 'See you next week',
      points: [
        'Next: partial orders, Hasse diagrams, functions and countability.',
        'Your real sheet is on Moodle — bring it if it differs from mine.',
        'hserobyan@student.ethz.ch',
      ],
    },
  ],
};
