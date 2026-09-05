// ---------------------------------------------------------------------------
// Week 11 — everything you say on screen lives in this file. Edit freely.
// See ./types.ts for the list of slide kinds and the text markup.
// ---------------------------------------------------------------------------

import type { Deck } from './types';

export const week11: Deck = {
  week: 11,
  topic: 'Error-Correcting Codes & Proof Systems',
  date: 'Week 11',
  sheet: 'Exercise sheet 11 (HS 2025)',

  slides: [
    {
      kind: 'title',
      title: 'Exercise Session 11',
      subtitle: 'Hamming distance, then soundness and completeness',
      footnote: 'Discrete Mathematics · HS 2026 · practising on sheet 11',
    },

    {
      kind: 'agenda',
      items: [
        '11.1 Minimum weight and error correction',
        'Recap: what a proof system is',
        '11.3 Combining proof systems',
        '11.4 A proof system for Diffie–Hellman',
        '11.5 Exactly-one combination (exam)',
        '11.2 — the presentation exercise',
      ],
    },

    {
      kind: 'callout',
      title: 'Two definitions to keep straight all session',
      tone: 'info',
      body: [
        '**Sound**: every provable statement is true.  φ(s,p) = 1 ⇒ τ(s) = 1. *No false statement has a proof.*',
        '**Complete**: every true statement is provable.  τ(s) = 1 ⇒ ∃p φ(s,p) = 1. *Nothing true is missed.*',
        'They point in opposite directions. A system that proves nothing is sound; one that proves everything is complete.',
        'Getting both is the whole game.',
      ],
      note: 'Write the two implications on the board and leave them there. Every exercise below is one of these two lines.',
    },

    // -- 11.1 ----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '11.1',
      title: 'Error-Correcting Codes  (⋆⋆)',
      prompt: [
        'C ⊆ Fⁿ is linear, and the minimum non-zero Hamming weight is 2t + 1.',
      ],
      parts: [
        'Prove C is t-error correcting.',
        'Could there be a codeword for which up to t+1 arbitrary errors are still correctable?',
      ],
    },

    {
      kind: 'solution',
      ref: '11.1',
      title: '1 · Linearity turns weight into distance',
      reveal: true,
      steps: [
        'For a linear code, d(c₁,c₂) = hw(c₁ − c₂), and c₁ − c₂ is again a codeword.',
        'So the minimum distance between distinct codewords equals the minimum non-zero weight: **d_min = 2t + 1**.',
        'Now suppose c is sent and at most t positions are corrupted, giving r with d(c, r) ≤ t.',
        'For any other codeword c′: 2t + 1 ≤ d(c, c′) ≤ d(c, r) + d(r, c′) ≤ t + d(r, c′), so d(r, c′) ≥ t + 1 > t.',
        'So c is the **unique** codeword within distance t of r, and nearest-neighbour decoding recovers it. ∎',
        'The triangle inequality is doing all the work. That is why part 1 of the presentation exercise asks you to prove it.',
      ],
    },

    {
      kind: 'solution',
      ref: '11.1',
      title: '2 · Yes — the guarantee is a worst case',
      reveal: true,
      steps: [
        'd_min = 2t+1 says *some* pair of codewords is that close. It does not say **every** codeword has a neighbour that close.',
        'If a particular c has distance ≥ 2t+3 from every other codeword, then t+1 errors around c still leave it the unique nearest codeword.',
        'So yes, individual codewords can tolerate more than t errors. ∎',
        'The distinction — a guarantee about the whole code versus a property of one codeword — is exactly what the question is testing.',
      ],
    },

    // -- 11.3 ----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '11.3',
      title: 'Proof Systems  (⋆⋆)',
      prompt: [],
      parts: [
        'For any non-empty S, P and any φ, is there a **unique** τ making Π = (S,P,τ,φ) sound and complete?',
        'With τ₃ = "τ₁ or τ₂" and φ₃ = "φ₁ or φ₂": (i) Π₃ sound ⇒ Π₁ or Π₂ sound?  (ii) Π₁ or Π₂ complete ⇒ Π₃ complete?',
      ],
    },

    {
      kind: 'solution',
      ref: '11.3',
      title: '1 · τ is forced',
      reveal: true,
      steps: [
        'Sound says φ(s,p) = 1 ⇒ τ(s) = 1. Complete says τ(s) = 1 ⇒ ∃p φ(s,p) = 1.',
        'Together: **τ(s) = 1 ⟺ ∃p φ(s,p) = 1**.',
        'That determines τ completely, and this τ does make the system sound and complete. So it exists and is unique. **True.** ∎',
        'Reading: φ already decides which statements are provable. "True" then just means "provable" — which is why this τ is not very interesting.',
      ],
    },

    {
      kind: 'solution',
      ref: '11.3',
      title: '2 · One holds, one fails',
      reveal: true,
      steps: [
        '**(i) True.** Contrapositive: suppose neither Π₁ nor Π₂ is sound.',
        'Then there are (s₁,p₁) with φ₁ = 1 and τ₁(s₁) = 0, and (s₂,p₂) with φ₂ = 1 and τ₂(s₂) = 0.',
        'For the pair ((s₁,s₂),(p₁,p₂)): φ₃ = 1 but τ₃ = 0 ∨ 0 = 0. So Π₃ is unsound. ∎',
        '**(ii) False.** Say Π₁ is complete and τ₁(s₁) = 0 while τ₂(s₂) = 1. Then τ₃(s₁,s₂) = 1, so a proof is required.',
        'But φ₃ = 1 needs φ₁(s₁,p₁) = 1 or φ₂(s₂,p₂) = 1, and nothing forces either — Π₂ was never assumed complete, and Π₁’s completeness says nothing about a *false* s₁.',
        'Take Π₂ with φ₂ ≡ 0 and τ₂ ≡ 1, and Π₁ complete with τ₁(s₁) = 0 and φ₁(s₁,·) ≡ 0. Then Π₃ is not complete. ∎',
      ],
      note:
        'Emphasise the method: to *prove* one of these, use the contrapositive. To *disprove* one, build the smallest system you can — one or two statements is plenty.',
    },

    // -- 11.4 ----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '11.4',
      title: 'Diffie–Hellman Proof System  (⋆⋆)',
      prompt: [
        'G = ⟨ℤ*_p; ⊙_p⟩ cyclic of order n with generator g. S = G³, and τ(y_A, y_B, k) = 1 iff there really are exponents making k the shared DH secret.',
        'With P = ℤ_n, define φ so that Π is sound and complete. Prove it.',
      ],
      hint: ['What is the shortest piece of information that convinces someone the triple is genuine?'],
    },

    {
      kind: 'solution',
      ref: '11.4',
      title: 'The proof is one exponent',
      reveal: true,
      steps: [
        'Define **φ((y_A, y_B, k), p) = 1  ⟺  ( g^p = y_A ∧ y_B^p = k )  ∨  ( g^p = y_B ∧ y_A^p = k )**.',
        '**Sound**: if the first disjunct holds with p, then y_A = g^p and k = y_B^p = g^{x_B·p}, which is exactly the DH secret for exponents x_A = p and x_B. So τ = 1. Second disjunct symmetric. ✓',
        '**Complete**: if τ = 1 there are x_A, x_B with y_A = g^{x_A}, y_B = g^{x_B} and k = g^{x_A x_B}.',
        'Take p = x_A: then g^p = y_A and y_B^p = g^{x_B x_A} = k. So a proof exists. ✓ ∎',
        'Note that the proof is exactly the **secret** — which is why in cryptography you then want zero-knowledge proofs instead.',
      ],
      note:
        'The last line is a good place to stop and mention that this is where crypto courses pick up. Half the room will find it genuinely exciting.',
    },

    // -- 11.5 ----------------------------------------------------------------

    {
      kind: 'solution',
      ref: '11.5',
      title: '11.5 · "Exactly one" (exam FS 2024)',
      reveal: true,
      steps: [
        'Here τ = "at least one of τ₁, τ₂", but φ = "**exactly one** of φ₁, φ₂".',
        '**1. Sound: true.** If φ = 1 then exactly one φᵢ is 1, say φ₁(s₁,p₁) = 1. Soundness of Σ₁ gives τ₁(s₁) = 1, hence τ = 1. ✓',
        '**2. Complete: false.** Take Σ₁ = Σ₂ with one statement s, one proof p, τ(s) = 1 and φ(s,p) = 1 — both sound and complete.',
        'Then τ(s,s) = 1, but φ((s,s),(p,p)) requires exactly one of two 1s, which is 0. There is no other proof to try, so Σ is not complete. ∎',
        'The asymmetry is instructive: "exactly one" is fine for soundness (it still gives you a true witness) and fatal for completeness (two proofs cancel).',
      ],
    },

    // -- presentation --------------------------------------------------------

    {
      kind: 'exercise',
      ref: '11.2',
      title: 'A New Linear Code — for presentation',
      prompt: [
        '1. hw(x + y) ≤ hw(x) + hw(y).   2. d_min(C) = min over non-zero codewords of hw.   3. For D = { (u ‖ u+v) : u ∈ U, v ∈ V }, show d_min(D) = min(2·d_min(U), d_min(V)).',
        '**We are not solving this today.**',
      ],
      hint: [
        'Part 1: argue position by position. If a coordinate of x + y is non-zero, at least one of x, y is non-zero there.',
        'Part 2: two inequalities. Linearity gives d(c₁,c₂) = hw(c₁ − c₂), and c₁ − c₂ is a codeword.',
        'Part 3: split on whether v = 0. If v = 0 the weight is 2·hw(u); if v ≠ 0 use part 1 on u and u + v.',
        'Both inequalities need a witness for "≤" and an argument for "≥". Say clearly which one you are doing.',
      ],
    },

    {
      kind: 'points',
      title: 'What to take away',
      points: [
        'Linear code: distance = weight of the difference, and the difference is a codeword.',
        'Correcting t errors comes straight from the triangle inequality.',
        'd_min is a worst case, not a description of every codeword.',
        'Sound: no false statement is provable. Complete: no true statement is missed.',
        'To prove a combination property use the contrapositive; to break one, build a one-statement system.',
      ],
    },

    {
      kind: 'title',
      title: 'Kahoot',
      subtitle: 'Join at kahoot.it',
      footnote: 'Questions in kahoot/week11.csv',
    },

    {
      kind: 'end',
      title: 'See you next week',
      points: [
        'Next: normal forms and the semantics of predicate logic.',
        'Your real sheet is on Moodle — bring it if it differs from mine.',
        'hserobyan@student.ethz.ch',
      ],
    },
  ],
};
