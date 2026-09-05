// ---------------------------------------------------------------------------
// Week 10 — everything you say on screen lives in this file. Edit freely.
// See ./types.ts for the list of slide kinds and the text markup.
// ---------------------------------------------------------------------------

import type { Deck } from './types';

export const week10: Deck = {
  week: 10,
  topic: 'Fields, Polynomials & Finite Fields',
  date: 'Week 10',
  sheet: 'Exercise sheet 10 (HS 2025)',

  slides: [
    {
      kind: 'title',
      title: 'Exercise Session 10',
      subtitle: 'Dividing polynomials, finding units, and sharing a secret',
      footnote: 'Discrete Mathematics · HS 2026 · practising on sheet 10',
    },

    {
      kind: 'agenda',
      items: [
        '10.1 Warm-up: fields, roots, irreducibility',
        '10.2 Every finite integral domain is a field',
        '10.4 Polynomial division over ℤ₇',
        '10.5 The ring F[x] mod m(x)',
        '10.6 Secret sharing',
        '10.8 Common roots and gcd (exam)',
        '10.3 — the presentation exercise',
      ],
    },

    {
      kind: 'callout',
      title: 'The one structural fact for this week',
      tone: 'good',
      body: [
        'F[x] modulo m(x) is a **field** exactly when m(x) is **irreducible** over F.',
        'If m(x) factors, the factors become zero divisors — and a ring with zero divisors is never a field.',
        'So the first question about any F[x]_{m(x)} is always: does m(x) have a root / a factorisation?',
        'Over a small field you can test every element. Over GF(3) that is three substitutions.',
      ],
    },

    // -- 10.1 ----------------------------------------------------------------

    {
      kind: 'solution',
      ref: '10.1',
      title: 'Warm-up',
      reveal: true,
      steps: [
        '**1.** A field is a commutative ring with 1 ≠ 0 in which every non-zero element has a multiplicative inverse.',
        '**2.** α is a root of a(x) ∈ R[x] if a(α) = 0. Equivalently — and more usefully — if (x − α) divides a(x).',
        '**3.** b(x) = x² + 2 over GF(3): test all three elements. b(0) = 2, b(1) = 1 + 2 = **0**, b(2) = 4 + 2 = 6 = 0.',
        'So both 1 and 2 are roots and b is **not irreducible**: x² + 2 = x² − 1 = **(x + 1)(x + 2)** over GF(3).',
        'Degree 2 or 3: irreducible ⟺ no root. Degree 4 and up: no roots is not enough — it can split into two quadratics.',
      ],
    },

    // -- 10.2 ----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '10.2',
      title: 'Integral Domains and Fields  (⋆⋆⋆)',
      prompt: ['Recall an integral domain that is not a field. Then prove that every **finite** integral domain is a field.'],
      hint: ['For a ≠ 0 consider f_a(x) = a·x, and count.'],
    },

    {
      kind: 'solution',
      ref: '10.2',
      title: 'Finiteness does all the work',
      reveal: true,
      steps: [
        'ℤ is an integral domain and not a field: 2 has no inverse. (So does F[x] for any field F.)',
        'Now let D be a **finite** integral domain and a ∈ D \\ {0}. Define f_a : D → D by f_a(x) = a·x.',
        'f_a is **injective**: a·x = a·y ⇒ a·(x − y) = 0, and since a ≠ 0 and D has no zero divisors, x = y.',
        'An injective map from a **finite** set to itself is surjective.',
        'So 1 is in the image: there is an x with a·x = 1. That x is a⁻¹. ∎',
        'Where finiteness enters is the single step injective ⇒ surjective. Drop it and the theorem is false — ℤ is the counterexample.',
      ],
      note:
        'Ask them where the proof would break for ℤ before revealing the last line. It fixes the role of finiteness permanently.',
    },

    // -- 10.4 ----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '10.4',
      title: 'Polynomials over a Field  (⋆)',
      prompt: [],
      parts: [
        'Divide x⁵ + 6x² + 5 by 5x² + 2x + 1 over ℤ₇, with remainder.',
        'Determine all irreducible polynomials of degree 4 over GF(2).',
      ],
      hint: ['In ℤ₇ the inverse of 5 is 3, since 5·3 = 15 = 1. You will use it at every step.'],
    },

    {
      kind: 'table',
      title: '10.4.1 · Long division, one row per step',
      lead: 'All arithmetic mod 7. Divide the leading term, multiply back, subtract.',
      headers: ['step', 'quotient term', 'subtract', 'what is left'],
      rows: [
        ['1', '3x³', 'x⁵ + 6x⁴ + 3x³', 'x⁴ + 4x³ + 6x² + 5'],
        ['2', '3x²', 'x⁴ + 6x³ + 3x²', '5x³ + 3x² + 5'],
        ['3', 'x', '5x³ + 2x² + x', 'x² + 6x + 5'],
        ['4', '3', 'x² + 6x + 3', '2'],
      ],
      markRows: [3],
      note:
        'Quotient 3x³ + 3x² + x + 3, remainder 2. Verify by multiplying back — it comes out to x⁵ + 6x² + 5 exactly.',
    },

    {
      kind: 'solution',
      ref: '10.4',
      title: '2 · Degree 4 over GF(2)',
      reveal: true,
      steps: [
        'An irreducible polynomial of degree ≥ 2 over GF(2) must have constant term 1 (else x divides it) and an odd number of terms (else 1 is a root).',
        'That leaves x⁴+x+1, x⁴+x³+1, x⁴+x²+1, x⁴+x³+x²+x+1.',
        'Now rule out factorisations into two quadratics. The only irreducible quadratic over GF(2) is x²+x+1, and (x²+x+1)² = x⁴+x²+1.',
        'So x⁴+x²+1 is reducible, and the answer is **x⁴+x+1, x⁴+x³+1, x⁴+x³+x²+x+1** — exactly three.',
        'Method to remember: no roots kills linear factors; then check the finitely many products of irreducible quadratics separately.',
      ],
    },

    // -- 10.5 ----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '10.5',
      title: 'The Ring F[x]_{m(x)}  (⋆⋆)',
      prompt: [],
      parts: [
        'Find all zero divisors in GF(3)[x]_{x²+2x}.',
        'List the elements of GF(3)[x]_{x²+2} and of its multiplicative group.',
        'Compute the inverse of x in GF(3)[x]*_{x²+2}.',
      ],
    },

    {
      kind: 'solution',
      ref: '10.5',
      title: 'Factor the modulus first — always',
      reveal: true,
      steps: [
        '**1.** x² + 2x = x·(x + 2). A non-zero class is a zero divisor exactly when it shares a factor with the modulus.',
        'Multiples of x: **x, 2x**. Multiples of (x+2): **x+2, 2x+1**. Those four are the zero divisors.',
        '**2.** x² + 2 = (x+1)(x+2), so this ring is not a field either. Its elements are all polynomials of degree < 2: **9 of them**.',
        'Units = classes coprime to both factors. Removing 0 and the multiples of (x+1) and (x+2) leaves **{1, 2, x, 2x}** — four units, matching φ = 2·2 by CRT.',
        '**3.** In this ring x² ≡ −2 ≡ 1. So x·x = 1, i.e. **x⁻¹ = x**.',
        'Nice sanity check: x has order 2 in a group of order 4. Consistent with Lagrange.',
      ],
      note:
        'Both moduli here are reducible on purpose. Make them notice — the sheet is teaching that F[x]_m is only a field when m is irreducible.',
    },

    // -- 10.6 ----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '10.6',
      title: 'Secret Sharing  (⋆⋆)',
      prompt: [
        'The key s ∈ GF(q) is hidden as the constant term of a random a(x) of degree t−1. General Gᵢ holds sᵢ = a(αᵢ) with the αᵢ distinct and non-zero.',
      ],
      parts: [
        'Show that t shares determine the key uniquely.',
        'How many values of s remain possible given only t−1 shares?',
      ],
    },

    {
      kind: 'solution',
      ref: '10.6',
      title: 'Interpolation, and what it cannot do',
      reveal: true,
      steps: [
        '**1.** A polynomial of degree ≤ t−1 is determined by its values at t distinct points — Lagrange interpolation over a field.',
        'So t shares reconstruct a(x) uniquely, and then s = a(0). ∎',
        '**2.** With t−1 shares, pick **any** candidate s ∈ GF(q). Together with the t−1 known points that is t conditions on a degree ≤ t−1 polynomial.',
        'By interpolation again, exactly one polynomial matches — so every candidate s is consistent with exactly one a(x).',
        'Therefore **all q values remain possible**, each with the same number of consistent polynomials. The shares carry *no* information about s. ∎',
        'This is perfect secrecy, not "computationally hard". t−1 shares are literally as good as none.',
      ],
      note:
        'The counting in part 2 is the elegant bit: not "hard to guess", but "every guess is equally consistent".',
    },

    // -- 10.8 ----------------------------------------------------------------

    {
      kind: 'solution',
      ref: '10.8',
      title: '10.8 · Common root and gcd (exam FS 2024)',
      reveal: true,
      steps: [
        'Statement 1: every a(x) with deg ≥ 1 has a root in F (F is algebraically closed).  Statement 2: no common root ⇒ gcd = 1.',
        '**(1 ⇒ 2)** Contrapositive: if gcd(a,b) = d has degree ≥ 1, then by (1) d has a root α. Since d | a and d | b, α is a common root.',
        '**(2 ⇒ 1)** Contrapositive: suppose some a(x) with deg ≥ 1 has no root in F.',
        'Then a and a have no common root, so by (2) gcd(a, a) = 1. But gcd(a, a) = a up to a unit, and deg a ≥ 1. Contradiction. ∎',
        'Both directions are contrapositives. When an equivalence looks hard, negate both sides and look again.',
      ],
    },

    // -- presentation --------------------------------------------------------

    {
      kind: 'exercise',
      ref: '10.3',
      title: 'Characteristic of a Field — for presentation',
      prompt: [
        'Four parts: q × a = 0 for all a; (a+b)^q = a^q + b^q when q is prime; the same for k summands by induction; and a^q = a in ℤ_q.',
        '**We are not solving this today.**',
      ],
      hint: [
        'Part 1: q × a = (q × 1_F) ⋆ a. Use distributivity to see why, then the definition of characteristic.',
        'Part 2: expand with the binomial theorem and ask for which k the prime q divides C(q,k). Look at the numerator and denominator separately — nothing in the denominator can cancel q.',
        'Part 3: induction on k, with part 2 applied to the split (a₁ + … + a_{k−1}) + a_k. Define your statement P(k) explicitly before starting.',
        'Part 4: this is Fermat’s little theorem, reproved. You are not allowed to cite §5.3 — build a^q = a for a ∈ ℤ_q by writing a as a sum of 1s and applying part 3.',
      ],
      note:
        'Part 4 is the payoff: a classical theorem falling out of pure characteristic arithmetic. Say that, without giving the construction.',
    },

    {
      kind: 'points',
      title: 'What to take away',
      points: [
        'F[x]_{m(x)} is a field ⟺ m(x) is irreducible. Factor the modulus first.',
        'Degree 2 or 3: irreducible ⟺ no roots. Degree ≥ 4: also rule out products of quadratics.',
        'Finite + no zero divisors ⇒ field, via injective ⇒ surjective.',
        'Long division over ℤ_p needs the inverse of the leading coefficient.',
        't points determine a degree t−1 polynomial; t−1 points determine nothing.',
      ],
    },

    {
      kind: 'title',
      title: 'Kahoot',
      subtitle: 'Join at kahoot.it',
      footnote: 'Questions in kahoot/week10.csv',
    },

    {
      kind: 'end',
      title: 'See you next week',
      points: [
        'Next: error-correcting codes, and the start of formal logic.',
        'Your real sheet is on Moodle — bring it if it differs from mine.',
        'hserobyan@student.ethz.ch',
      ],
    },
  ],
};
