// ---------------------------------------------------------------------------
// Week 9 — everything you say on screen lives in this file. Edit freely.
// See ./types.ts for the list of slide kinds and the text markup.
// ---------------------------------------------------------------------------

import type { Deck } from './types';

export const week09: Deck = {
  week: 9,
  topic: 'Cyclic Groups, Diffie–Hellman, RSA & Rings',
  date: 'Week 9',
  sheet: 'Exercise sheet 9 (HS 2025)',

  slides: [
    {
      kind: 'title',
      title: 'Exercise Session 9',
      subtitle: 'Where the algebra starts paying rent',
      footnote: 'Discrete Mathematics · HS 2026 · practising on sheet 9',
    },

    {
      kind: 'agenda',
      items: [
        '9.1 Diffie–Hellman in the wrong group',
        '9.2 The group ℤ*ₘ',
        '9.4 Broadcasting the same message with e = 3',
        '9.5 Divisibility in a commutative ring',
        '9.6 Ideals',
        '9.7 Group homomorphisms (exam)',
        '9.3 — the presentation exercise',
      ],
    },

    // -- 9.1 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '9.1',
      title: 'Diffie–Hellman  (⋆⋆)',
      prompt: [
        'Alice would rather add than multiply, so she proposes running Diffie–Hellman in ⟨ℤₙ; ⊕ₙ⟩ with a generator g.',
      ],
      parts: [
        'Describe the exchanged messages and show that Eve can recover the key.',
        'Bob concludes that since every cyclic group of order n is isomorphic to ⟨ℤₙ; ⊕ₙ⟩, DH is insecure in **every** cyclic group. Is he right?',
      ],
      note: 'Part 2 is the important one. Part 1 takes four minutes; leave time for the discussion.',
    },

    {
      kind: 'solution',
      ref: '9.1',
      title: '1 · In an additive group, "exponentiation" is multiplication',
      reveal: true,
      steps: [
        'Writing the group additively, g^x becomes x·g mod n. Alice sends y_A = x_A·g, Bob sends y_B = x_B·g.',
        'The shared key is x_A·x_B·g.',
        'g generates ℤₙ, which means gcd(g, n) = 1 — so g is **invertible** mod n.',
        'Eve computes g⁻¹ (extended Euclid), recovers x_A = y_A · g⁻¹ mod n, and then the key as x_A · y_B. ∎',
        'The discrete logarithm here is a division. It is not hard, it is one Euclid run.',
      ],
    },

    {
      kind: 'callout',
      title: '2 · No — and this is the point of the whole exercise',
      tone: 'warn',
      body: [
        'Isomorphic groups are the same **abstractly**. They are not the same **computationally**.',
        'The isomorphism ℤₙ → ⟨g⟩ sends x ↦ g^x. Its inverse *is* the discrete logarithm.',
        'So "just use the isomorphism" assumes exactly the problem that is supposed to be hard.',
        'Security lives in the **representation** of the group, not in its abstract structure.',
      ],
      note:
        'This is the single best example in the course of why "isomorphic" is a statement about structure only. Spend time here.',
    },

    // -- 9.2 -----------------------------------------------------------------

    {
      kind: 'solution',
      ref: '9.2',
      title: 'The group ℤ*ₘ',
      reveal: true,
      steps: [
        '**1.** |ℤ*₃₆| = φ(36) = φ(4)·φ(9) = 2·6 = **12**.',
        'The elements are the residues coprime to 36, i.e. divisible by neither 2 nor 3:',
        '{1, 5, 7, 11, 13, 17, 19, 23, 25, 29, 31, 35}.',
        '**2.** ℤ*₁₁ is cyclic of order 10, so it has φ(10) = 4 generators.',
        '2 is one (2⁵ = 10 ≠ 1 and 2² = 4 ≠ 1). The others are 2^k with gcd(k,10) = 1: 2¹, 2³, 2⁷, 2⁹ = **2, 8, 7, 6**.',
        '**3.** ℤ*₍ₙₘ₎ ≅ ℤ*ₙ × ℤ*ₘ for coprime n, m: the CRT map a ↦ (a mod n, a mod m) is a bijection on units and respects multiplication componentwise.',
        'This is also where φ(nm) = φ(n)φ(m) comes from — the same fact, counted instead of mapped.',
      ],
      note:
        'Show the generator shortcut explicitly: find one generator, then take the powers whose exponent is coprime to the order. Nobody should be testing all ten.',
    },

    // -- 9.4 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '9.4',
      title: 'An Attack on RSA  (⋆⋆⋆)',
      prompt: [
        'Alice, Bob and Charlie use moduli n₁, n₂, n₃ — all with public exponent **3**. The same m is sent to all three, giving c₁, c₂, c₃.',
        'How does an adversary recover m?',
      ],
      hint: ['The exponent is tiny and there are three congruences. What do three congruences give you?'],
    },

    {
      kind: 'solution',
      ref: '9.4',
      title: 'CRT, then an ordinary cube root',
      reveal: true,
      steps: [
        'The nᵢ are pairwise coprime — otherwise a gcd already factors one of them, and the attacker wins immediately.',
        'CRT combines c₁, c₂, c₃ into the unique C with C ≡ m³ (mod n₁n₂n₃) and 0 ≤ C < n₁n₂n₃.',
        'Now the size argument: m < nᵢ for each i, so m³ < n₁n₂n₃. The reduction never wrapped around.',
        'Therefore **C = m³ as an integer**, and m is the ordinary integer cube root of C — computable, no modular arithmetic needed.',
        'Fix in practice: pad the message so the same m is never sent twice, and do not use e = 3 bare.',
        'Note what the attack does *not* do: it never factors any nᵢ. RSA can leak without being broken.',
      ],
    },

    // -- 9.5 -----------------------------------------------------------------

    {
      kind: 'solution',
      ref: '9.5',
      title: '9.5 · Divisibility in a commutative ring',
      reveal: true,
      steps: [
        'Recall a | b means: there is an x ∈ R with b = a·x.',
        '**1.** a | b gives b = a·x, so bc = a·(x·c) — hence a | bc. ✓',
        '**2.** a | b and a | c give b = a·x and c = a·y, so b + c = a·(x + y) — hence a | (b+c). ✓ ∎',
        'Both proofs use only the ring axioms — associativity and distributivity. No lemmas, no cancellation, no inverses.',
        'That matters: these hold in *any* commutative ring, including ones with zero divisors.',
      ],
    },

    // -- 9.6 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '9.6',
      title: 'Ideals in Rings  (⋆⋆)',
      prompt: [
        'I ⊆ R is an ideal if I is a subgroup of ⟨R;+,−,0⟩ and x·r ∈ I for all x ∈ I, r ∈ R.',
      ],
      parts: [
        '(x) = {x·z : z ∈ ℤ} is an ideal of ℤ.',
        'Every ideal of ℤ equals (z) for some z.',
        '(x,y) = {x·r + y·s} is an ideal of R.',
        'In ℤ[x], the ideal (2, x) is not of the form (p(x)). Why does the argument in 2 break?',
      ],
    },

    {
      kind: 'solution',
      ref: '9.6',
      title: 'ℤ is principal; ℤ[x] is not',
      reveal: true,
      steps: [
        '**1.** Closed under subtraction (xz₁ − xz₂ = x(z₁−z₂)) and under multiplication by any r ✓.',
        '**2.** If I = {0} take z = 0. Otherwise let z be the **smallest positive** element of I.',
        'For any a ∈ I write a = qz + r with 0 ≤ r < z. Then r = a − qz ∈ I, and minimality of z forces r = 0. So I = (z). ∎',
        '**3.** Same two checks, one line each. ✓',
        '**4.** Suppose (p) = (2, x). Then p | 2, so p is a constant in {±1, ±2}; and p | x, which rules out ±2.',
        'So p = ±1 and (p) = ℤ[x]. But every element of (2,x) has an **even constant term**, so 1 ∉ (2,x). Contradiction. ∎',
        'Why 2 breaks: the proof used division with remainder, which needs the leading coefficient to be invertible. In ℤ[x] it usually is not.',
      ],
      note:
        'Land the general point: "smallest element + division with remainder" is the engine behind ℤ and F[x] being principal. Remove either and it stops.',
    },

    // -- 9.7 -----------------------------------------------------------------

    {
      kind: 'solution',
      ref: '9.7',
      title: '9.7.1 · Commutative ⟺ inversion is a homomorphism',
      reveal: true,
      steps: [
        'In any group (a ⋆ b)ˆ = bˆ ⋆ aˆ — that was 8.2.2.',
        '**(⇒)** If G is commutative then bˆ ⋆ aˆ = aˆ ⋆ bˆ, so g ↦ gˆ is a homomorphism. ✓',
        '**(⇐)** If g ↦ gˆ is a homomorphism then (a⋆b)ˆ = aˆ ⋆ bˆ; combined with the identity above, aˆ ⋆ bˆ = bˆ ⋆ aˆ for all a, b.',
        'Every element is some xˆ (inversion is a bijection), so G is commutative. ✓ ∎',
        'Part 2 is genuinely hard — outline only: show every g can be written xˆ ⋆ f(x), then apply part 1.',
      ],
    },

    // -- presentation --------------------------------------------------------

    {
      kind: 'exercise',
      ref: '9.3',
      title: 'Pitfalls of RSA — for presentation',
      prompt: [
        '1. Public key (n,e) = (133, 25), ciphertext c = 9. Find d and recover m by hand.',
        '2. Two users share a modulus n with coprime exponents e_A, e_B. Show Eve recovers m from c_A and c_B.',
        '**We are not solving this today.**',
      ],
      hint: [
        'Part 1: factor 133 first — it is small on purpose. Then φ(n), then use the given identity 1 = 13·25 − 3·108 to read off d.',
        'Part 1: never compute 9^d directly. Reduce the exponent modulo the order, and use repeated squaring on small numbers.',
        'Part 2: gcd(e_A, e_B) = 1, so Bézout gives u·e_A + v·e_B = 1. What is c_Aᵘ · c_Bᵛ?',
        'Part 2: one of u, v is negative — say why that is fine when the ciphertext is coprime to n, and handle the other case separately (a gcd with n is a gift).',
      ],
      note: 'Do not do the factorisation of 133 for them. It is the first step and the whole point.',
    },

    {
      kind: 'points',
      title: 'What to take away',
      points: [
        'Isomorphic ≠ equally hard. Security lives in the representation.',
        'Find one generator, then take powers with exponent coprime to the order.',
        'CRT plus a size bound turns modular data into an integer identity.',
        'Ring divisibility proofs need only the axioms — no cancellation.',
        'ℤ and F[x] are principal because they have division with remainder. ℤ[x] does not.',
      ],
    },

    {
      kind: 'title',
      title: 'Kahoot',
      subtitle: 'Join at kahoot.it',
      footnote: 'Questions in kahoot/week09.csv',
    },

    {
      kind: 'end',
      title: 'See you next week',
      points: [
        'Next: fields, polynomials, and how finite fields are built.',
        'Your real sheet is on Moodle — bring it if it differs from mine.',
        'hserobyan@student.ethz.ch',
      ],
    },
  ],
};
