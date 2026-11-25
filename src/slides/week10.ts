// ---------------------------------------------------------------------------
// Week 10 — everything you say on screen lives in this file. Edit freely.
// See ./types.ts for the list of slide kinds and the text markup.
//
// Built on the HS2026 sheet 10 and its graded solution.
// Lecture (Moodle roadmap): §5.5–5.6 on Nov 16. §5.7–5.8 (Nov 18) is still
// listed under "Plan". The deck assumes §5.5.4–5.8.2 were seen, and nothing
// from §5.9 (codes, planned for Nov 23, the day of the session).
//
// Each exercise is a twin of one on the sheet — same shape, other content:
//   Exercise 1 ↔ 10.2.1   Exercise 2 ↔ 10.3   Exercise 3 ↔ 10.4
//   Exercise 4 ↔ 10.6
// 10.1 is the graded interview exercise and is not touched anywhere:
// Def. 5.28 (irreducible) and Cor. 5.30 stay off screen, nothing is
// factored, no polynomial gcd is computed, no Lemma 5.22, nothing on ℤ[x]
// versus ℚ[x] or on reducing coefficients mod p, no ℤₙ[x] with n composite,
// and x² + x + 1 over ℤ₂ appears nowhere. Theorem 5.37 and Lemma 5.36 are
// quoted in the recap, but irreducible and gcd are never defined or used.
// For the same reason 10.2.2 (irreducible polynomials of degree 4 over
// GF(2)) is left out, and the exam block skips HS20 3a.3, HS20 3a.5,
// FS21 3a.1, FS21 3a.3, FS21 3a.5, FS21 3a.6, HS21 3a.1, HS21 3a.3, HS21 3f,
// FS22 3a.3, FS22 3c, HS22 3a.4, FS23 3a.4 and FS23 3d.
// Both moduli in Exercise 2 (x² + x and x²) split without a root test.
// 10.5 (F* is cyclic, ⋆⋆⋆) is the heaviest and is dropped. 10.7 is the
// optional hand-in and is not used.
// Nothing on screen names a sheet exercise.
// The exam block is from the local official exams (file names = semester):
// HS20 3a.2, HS20 3a.4, FS23 3a.3, HS22 3a.5, HS21 3a.4, FS22 3d, HS20 3d,
// FS21 3e, and FS23 3e as the bonus. HS23 and FS24 are skipped (latest).
// None of these are on HS2026 sheet 10, and none were used in weeks 6–9.
// Every number and claim was brute-forced in Python.
// ---------------------------------------------------------------------------

import type { Deck } from './types';

export const week10: Deck = {
  week: 10,
  topic: 'Fields, Polynomials & Finite Fields',
  date: 'Mon 23 Nov 2026',
  sheet: 'Exercise sheet 10',
  solutionsReleased: true,

  slides: [
    {
      kind: 'title',
      title: 'Exercise Session 10',
      subtitle: 'Fields, polynomials and the ring F[x]ₘ₍ₓ₎',
      footnote: 'Discrete Mathematics · HS 2026 · Group Q · CHN D 46',
    },

    {
      kind: 'agenda',
      title: 'Today',
      items: [
        'Recap: zerodivisors, integral domains, fields',
        'Recap: polynomials and division',
        'Division with remainder over ℤ₅',
        'Recap: the ring F[x]ₘ₍ₓ₎',
        'Computing in F[x]ₘ₍ₓ₎',
        'Recap: roots and interpolation',
        'Sharing a secret',
        'Polynomials and their values',
        'Old exam questions',
      ],
      note:
        'Timing: 3 intro · 4 recap · 5 recap with example · 7 division · 4 recap · 8 F[x]ₘ₍ₓ₎ (break here, about 30 min) · 3 recap · 7 secret sharing · 6 values · 16 old exams. That is about 63 min.',
    },

    // -- recap: zerodivisors, integral domains, fields -----------------------------------

    {
      kind: 'points',
      title: 'Zerodivisors, integral domains, fields (script §5.5.4, §5.5.6)',
      points: [
        'Def. 5.23: an element a ≠ 0 of a commutative ring R is a zerodivisor if ab = 0 for some b ≠ 0 in R.',
        'Def. 5.24: an integral domain is a nontrivial (1 ≠ 0) commutative ring without zerodivisors. Example 5.40: ℤ, ℚ, ℝ and ℂ.',
        'Example 5.41: if m is not prime, every non-zero element of ℤₘ that is not coprime to m is a zerodivisor.',
        'Def. 5.26: a field is a nontrivial commutative ring F in which every non-zero element is a unit, F* = F \\ {0}. Example 5.44: ℚ, ℝ, ℂ are fields, ℤ is not.',
        'Theorem 5.23: ℤₚ is a field if and only if p is prime. We write GF(p).',
        'Theorem 5.24: a field is an integral domain.',
      ],
      note:
        '4 minutes. Board examples: in ℤ₁₂, 3 · 4 = 0, so 3 and 4 are zerodivisors, while 5 · 5 = 25 = 1 makes 5 a unit. Example 5.46 is a field with 4 elements. It is not ℤ₄, where 2 · 2 = 0.',
    },

    // -- recap: polynomials and division -------------------------------------------------

    {
      kind: 'points',
      title: 'Polynomials and division (script §5.5.5, §5.6.2)',
      points: [
        'Def. 5.25: a polynomial over a commutative ring R is $a(x) = a_d x^d + \\dots + a_1 x + a_0$ with $a_i \\in R$. deg a(x) is the largest i with aᵢ ≠ 0, and deg 0 = −∞.',
        'Sums and products as usual, with the coefficients computed in R. Theorem 5.21: R[x] is a commutative ring.',
        'Theorem 5.25: let F be a field and b(x) ≠ 0. There are unique q(x), r(x) with a(x) = b(x) · q(x) + r(x) and deg r(x) < deg b(x). We write $r(x) = R_{b(x)}(a(x))$.',
        'Each step subtracts $a_m b_n^{-1} x^{m-n} \\cdot b(x)$, where $a_m$ and $b_n$ are the leading coefficients. So $b_n$ needs an inverse, which a field guarantees.',
      ],
      note:
        '3 minutes. Example 5.42 in ℤ₇: (2x² + 3x + 1)(5x + 6) = 3x³ + 6x² + 2x + 6. The division step is worked out on the next slide.',
    },

    {
      kind: 'points',
      title: 'One division, step by step (script Example 5.54)',
      lead: 'In GF(7), divide a(x) = x³ + 2x² + 5x + 4 by b(x) = 2x² + x + 1. The leading coefficient of b(x) is 2, and $2^{-1} = 4$ since 2 · 4 = 8 = 1.',
      reveal: true,
      points: [
        'Step 1. The leading term of a(x) is 1 · x³. Multiply b(x) by $1 \\cdot 2^{-1} \\cdot x^{3-2} = 4x$. Then the leading terms match: 4x · 2x² = 8x³ = x³.',
        'Subtract: (x³ + 2x² + 5x + 4) − 4x · b(x) = (x³ + 2x² + 5x + 4) − (x³ + 4x² + 4x) = 5x² + x + 4. The x³ is gone.',
        'Step 2. The leading term is now 5x². Multiply b(x) by $5 \\cdot 2^{-1} \\cdot x^{2-2} = 20 = 6$: 6 · b(x) = 5x² + 6x + 6.',
        'Subtract: (5x² + x + 4) − (5x² + 6x + 6) = 2x + 5. Since deg(2x + 5) = 1 < 2 = deg b(x), we stop.',
        'The multipliers add up to q(x) = 4x + 6, and what is left is r(x) = 2x + 5. So x³ + 2x² + 5x + 4 = (2x² + x + 1)(4x + 6) + (2x + 5).',
        'In ℤ[x], step 1 already fails: we would need some c with c · 2 = 1.',
      ],
      note:
        '2 minutes. Each step kills the current leading term, so the degree drops by at least 1. Exercise 1 is next and uses the same steps over ℤ₅.',
    },

    // -- division over Z_5 ---------------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 1',
      title: 'Division with remainder over ℤ₅',
      prompt: ['Divide a(x) = x⁴ + 3x³ + 2 by b(x) = 2x² + 3x + 1 over ℤ₅, with remainder.'],
      note: '7 minutes. The x² and x terms of a(x) are 0. Write them out as 0x² + 0x before starting, or they get lost.',
    },

    {
      kind: 'table',
      solution: 'Exercise 1',
      title: 'Exercise 1: one row per step',
      lead: 'All coefficients in ℤ₅. The leading coefficient of b(x) is 2, and 2⁻¹ = 3 since 2 · 3 = 6 = 1.',
      headers: ['step', 'quotient term', 'subtract', 'what is left'],
      rows: [
        ['1', '1 · 3 · x² = 3x²', '3x² · b(x) = x⁴ + 4x³ + 3x²', '4x³ + 2x² + 2'],
        ['2', '4 · 3 · x = 2x', '2x · b(x) = 4x³ + x² + 2x', 'x² + 3x + 2'],
        ['3', '1 · 3 = 3', '3 · b(x) = x² + 4x + 3', '4x + 4'],
      ],
      markRows: [2],
      note:
        'Step 1 in detail: 3x² · (2x² + 3x + 1) = 6x⁴ + 9x³ + 3x² = x⁴ + 4x³ + 3x², and x⁴ + 3x³ + 0x² + 0x + 2 − (x⁴ + 4x³ + 3x²) = −x³ − 3x² + 2 = 4x³ + 2x² + 2.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 1',
      title: 'Solution',
      steps: [
        'q(x) = 3x² + 2x + 3 and r(x) = 4x + 4. Since deg r(x) = 1 < 2 = deg b(x), we stop (Theorem 5.25).',
        'Check: (2x² + 3x + 1)(3x² + 2x + 3) = 6x⁴ + 13x³ + 15x² + 11x + 3 = x⁴ + 3x³ + x + 3 in ℤ₅.',
        'Adding r(x) = 4x + 4 gives x⁴ + 3x³ + 5x + 7 = x⁴ + 3x³ + 2 = a(x).',
      ],
    },

    // -- recap: F[x]_m(x) ----------------------------------------------------------------

    {
      kind: 'points',
      title: 'The ring F[x]ₘ₍ₓ₎ (script §5.8.1–5.8.2)',
      points: [
        '$a(x) \\equiv_{m(x)} b(x) \\iff m(x) \\mid a(x) - b(x)$. Lemma 5.33: every class has exactly one representative of degree < deg m(x), namely $R_{m(x)}(a(x))$.',
        'Def. 5.34: $F[x]_{m(x)} = \\{a(x) \\in F[x] \\mid \\deg a(x) < \\deg m(x)\\}$. Lemma 5.34: if |F| = q and deg m(x) = d, it has $q^d$ elements.',
        'Lemma 5.35: it is a ring, with addition and multiplication modulo m(x). A sum never needs reducing, a product usually does.',
        'Lemma 5.36: $F[x]^*_{m(x)} = \\{a(x) \\in F[x]_{m(x)} \\mid \\gcd(a(x), m(x)) = 1\\}$. Theorem 5.37: F[x]ₘ₍ₓ₎ is a field if and only if m(x) is irreducible.',
        'Example 5.62: in $\\mathbb{R}[x]_{x^2+1}$ we have x · x ≡ −1. Computing there is computing in ℂ, with x in the role of i.',
      ],
      note:
        '4 minutes. Board example: in GF(3)[x]ₓ²₊₁, x · x = x² ≡ −1 = 2, and (x + 1)² = x² + 2x + 1 ≡ 2x. If someone asks what irreducible means: it is part of the graded exercise this week, so send them to the script.',
    },

    // -- computing in F[x]_m(x) ----------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 2',
      title: 'Computing in F[x]ₘ₍ₓ₎',
      prompt: [],
      parts: [
        'Find all zerodivisors in $\\mathrm{GF}(3)[x]_{x^2+x}$.',
        'List the elements of $\\mathrm{GF}(3)[x]_{x^2}$ and of its multiplicative group $\\mathrm{GF}(3)[x]^*_{x^2}$.',
        'Compute the inverse of x + 2 in $\\mathrm{GF}(3)[x]^*_{x^2}$.',
      ],
      note: '8 minutes.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 2',
      title: 'Solutions',
      steps: [
        '1. x · (x + 1) = x² + x ≡ 0, so x and x + 1 are zerodivisors (Def. 5.23). So are 2x and 2x + 2, since 2x · (x + 1) ≡ 0 and (2x + 2) · x ≡ 0.',
        'The other non-zero elements are units: 1 · 1 = 1, 2 · 2 = 4 = 1, and (x + 2)² = x² + x + 1 ≡ 1, (2x + 1)² = x² + x + 1 ≡ 1.',
        'A unit is never a zerodivisor (proof of Theorem 5.24). So the zerodivisors are exactly x, 2x, x + 1 and 2x + 2.',
        '2. By Def. 5.34 the elements are the a₀ + a₁x with a₀, a₁ ∈ GF(3): 0, 1, 2, x, x + 1, x + 2, 2x, 2x + 1, 2x + 2. That is 3² = 9 (Lemma 5.34).',
        'If a₀ = 0, then a₁x · x = a₁x² ≡ 0. So a₁x is 0 or a zerodivisor, and not a unit.',
        'If a₀ ≠ 0, then (a₀ + a₁x)(a₀ − a₁x) = a₀² − a₁²x² ≡ a₀² = 1, since 1² = 1 and 2² = 4 = 1.',
        'So $\\mathrm{GF}(3)[x]^*_{x^2}$ = {1, 2, x + 1, x + 2, 2x + 1, 2x + 2}.',
        '3. By 2, the inverse of x + 2 is 2 − x = 2x + 2. Check: (x + 2)(2x + 2) = 2x² + 6x + 4 ≡ 0 + 0 + 1 = 1.',
      ],
      note:
        'x · x ≡ 0 with x ≠ 0, so GF(3)[x]ₓ² is not a field (Theorem 5.24). The trick in 2 works in any F[x]ₓ²: the inverse of a₀ + a₁x is a₀⁻² · (a₀ − a₁x) when a₀ ≠ 0.',
    },

    // -- recap: roots and interpolation --------------------------------------------------

    {
      kind: 'points',
      title: 'Roots and interpolation (script §5.7)',
      points: [
        'Lemma 5.28: evaluation is compatible with the ring operations. If c(x) = a(x) + b(x), then c(α) = a(α) + b(α), and the same for ·.',
        'Def. 5.33: α is a root of a(x) if a(α) = 0. Theorem 5.31: over a field, a non-zero a(x) of degree d has at most d roots.',
        'Lemma 5.32: over a field, an a(x) of degree at most d is uniquely determined by its values $\\beta_i = a(\\alpha_i)$ at d + 1 distinct points $\\alpha_1, \\dots, \\alpha_{d+1}$.',
        'It is $a(x) = \\sum_{i=1}^{d+1} \\beta_i u_i(x)$ with $u_i(x) = \\prod_{j \\neq i} \\frac{x - \\alpha_j}{\\alpha_i - \\alpha_j}$. Here $u_i(\\alpha_i) = 1$ and $u_i(\\alpha_j) = 0$ for j ≠ i.',
      ],
      note:
        '3 minutes. Example 5.58 over GF(5): a(x) = 2x³ + 3x + 1 has a(0) = 1, a(1) = 1, a(2) = 3, a(3) = 4, a(4) = 1.',
    },

    // -- secret sharing ------------------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 3',
      title: 'Sharing a secret',
      prompt: [
        'A secret s ∈ GF(7) is hidden as follows. Choose random a₁, a₂ ∈ GF(7) and set a(x) = a₂x² + a₁x + s. Person i receives the share a(i), for i = 1, …, 5.',
      ],
      parts: [
        'Three people pool their shares: a(1) = 3, a(2) = 5 and a(3) = 4. Compute s.',
        'Eve only knows a(1) = 3 and a(2) = 5. Which values of s are still possible? Justify your answer.',
      ],
      note: '7 minutes. Only s = a(0) is needed, so evaluate each uᵢ at 0 only.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 3',
      title: 'Solutions',
      steps: [
        '1. By Lemma 5.32, a(x) = 3u₁(x) + 5u₂(x) + 4u₃(x) with α = 1, 2, 3. So s = a(0) = 3u₁(0) + 5u₂(0) + 4u₃(0).',
        '$u_1(0) = \\frac{(0-2)(0-3)}{(1-2)(1-3)} = \\frac{6}{2} = 3$,  $u_2(0) = \\frac{(0-1)(0-3)}{(2-1)(2-3)} = \\frac{3}{-1} = 4$,  $u_3(0) = \\frac{(0-1)(0-2)}{(3-1)(3-2)} = \\frac{2}{2} = 1$.',
        's = 3 · 3 + 5 · 4 + 4 · 1 = 33 = 5 in GF(7).',
        'Check: a(x) = 2x² + 3x + 5 gives a(1) = 10 = 3, a(2) = 19 = 5 and a(3) = 32 = 4.',
        '2. All 7 values. Let c ∈ GF(7). The points 0, 1, 2 are distinct, so by Lemma 5.32 there is exactly one a(x) of degree at most 2 with a(0) = c, a(1) = 3 and a(2) = 5.',
        'So every c fits Eve’s two shares, each with exactly one polynomial. For example c = 0 gives 3x², and c = 1 gives 2x + 1.',
      ],
      note:
        'Fractions in GF(7) mean multiplying by the inverse: 6/2 = 6 · 4 = 24 = 3, and 3/(−1) = −3 = 4. In general, t shares determine a polynomial of degree at most t − 1, and t − 1 shares leave every value of s open.',
    },

    // -- polynomials and their values ----------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 4',
      title: 'Polynomials and their values',
      prompt: ['Let F be a field and d ∈ ℕ.'],
      parts: [
        'Let $\\alpha_1, \\dots, \\alpha_{d+1} \\in F$ be distinct, and let a(x), b(x) ∈ F[x] have degree at most d. Prove: a(x) = b(x) if and only if a(αᵢ) = b(αᵢ) for i = 1, …, d + 1.',
        'Let a(x), b(x) ∈ ℝ[x] with a(α) = b(α) for all α ∈ ℝ. Prove that a(x) = b(x).',
      ],
      note: '6 minutes. If the room is stuck, say: look at a(x) − b(x).',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 4',
      title: 'Solutions',
      steps: [
        '1. ⟹: equal polynomials have the same coefficients, so they take the same value at every α.',
        '⟸: let c(x) = a(x) − b(x). Its coefficients are aᵢ − bᵢ, so c(x) = 0 or deg c(x) ≤ d.',
        'By Lemma 5.28, c(αᵢ) = a(αᵢ) − b(αᵢ) = 0 for i = 1, …, d + 1. So c(x) has at least d + 1 roots.',
        'If c(x) ≠ 0, Theorem 5.31 allows at most deg c(x) ≤ d roots. Contradiction, so c(x) = 0 and a(x) = b(x).',
        '2. Let d = max(deg a(x), deg b(x), 0). The reals 0, 1, …, d are d + 1 distinct points at which a and b agree, so a(x) = b(x) by 1.',
      ],
      note:
        'Part 2 uses that ℝ has enough points to choose from. Over a finite field it is false, which is one of the old exam questions below.',
    },

    // -- old exam ------------------------------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exam 1',
      title: 'Old exams: short questions',
      prompt: ['No justification needed.'],
      parts: [
        '(HS 20) How many zerodivisors does ℤ₉₁ have? (91 = 7 · 13)',
        '(HS 20) Compute (2x + 2) · (2x + 1) in $\\mathbb{Z}_3[x]_{x^2+1}$.',
        '(FS 23) Compute (x + 1) · (x + 4) in $\\mathbb{Z}[x]_{x^2+3x+3}$.',
        '(HS 22) Compute $R_{x^2+1}(x^6)$ in ℤ₃[x].',
        '(HS 21) True or false: in the ring ℤ₂[x], the polynomials x² + 1 and x + 1 are equal.',
      ],
      note: '6 minutes. 1 point each, the fourth 2 points.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exam 1',
      title: 'Solutions',
      steps: [
        '1. 18. The non-zero a with gcd(a, 91) > 1 are zerodivisors (Example 5.41), and the others are units, so not zerodivisors. That leaves the 12 multiples of 7 and the 6 multiples of 13 below 91.',
        '2. (2x + 2)(2x + 1) = 4x² + 6x + 2 = x² + 2 in ℤ₃[x], and x² + 2 − (x² + 1) = 1. So the product is 1.',
        '3. (x + 1)(x + 4) = x² + 5x + 4, and x² + 5x + 4 − (x² + 3x + 3) = 2x + 1.',
        '4. x⁶ = (x² + 1)(x⁴ − x² + 1) − 1, so the remainder is −1 = 2 (Theorem 5.25).',
        '5. False. They have different coefficients. As functions on ℤ₂ they agree: both send 0 to 1 and 1 to 0.',
      ],
      note: 'For 1, the same count is 90 − φ(91) = 90 − 6 · 12 = 18.',
    },

    {
      kind: 'exercise',
      ref: 'Exam 2',
      title: 'Old exams: inverses and polynomial functions',
      prompt: [],
      parts: [
        '(FS 22) Compute the inverse of x + 4 in the group $\\mathbb{Z}_5[x]^*_{x^2+1}$. Show your work. (3 points)',
        '(HS 20) Prove or disprove: if for a finite field F two polynomials p(x), q(x) ∈ F[x] correspond to the same function (that is, p(a) = q(a) for all a ∈ F), then they are the same polynomial. (4 points)',
      ],
      note: '6 minutes.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exam 2',
      title: 'Solutions',
      steps: [
        '1. Write the inverse as ax + b. Then (x + 4)(ax + b) = ax² + (4a + b)x + 4b ≡ (4a + b)x + (4b − a), since ax² = a(x² + 1) − a.',
        'We need 4a + b = 0 and 4b − a = 1. The first gives b = −4a = a, and then 3a = 1, so a = 2 (3 · 2 = 6 = 1).',
        'The inverse is 2x + 2. Check: (x + 4)(2x + 2) = 2x² + 10x + 8 = 2x² + 3 in ℤ₅[x], and 2x² + 3 − 2(x² + 1) = 1.',
        '2. Disprove. Take F = GF(2), p(x) = x² and q(x) = x. Then p(0) = 0 = q(0) and p(1) = 1 = q(1), but p(x) ≠ q(x).',
        'This does not contradict Exercise 4: p and q have degree at most 2, so we would need 3 distinct points, and GF(2) has only 2.',
      ],
      note:
        'For every finite field F, the polynomial ∏ (x − α) over all α ∈ F has degree |F| and is 0 at every point, just like the polynomial 0.',
    },

    {
      kind: 'exercise',
      ref: 'Exam 3',
      title: 'Old exams: rings',
      prompt: [
        '(FS 21) Let R be a ring such that for all a ∈ R \\ {0} and all b, c ∈ R we have ab = ca ⟹ b = c. Prove that R is commutative. (6 points)',
      ],
      note: '4 minutes.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exam 3',
      title: 'Solution',
      steps: [
        'Let x, y ∈ R. We show xy = yx.',
        'If x = 0, then xy = 0 = yx by Lemma 5.17 (i).',
        'If x ≠ 0, take a = x, b = yx and c = xy. Then ab = x(yx) = (xy)x = ca, by associativity of · (Def. 5.18 (ii)).',
        'By the assumption, b = c, that is yx = xy.',
      ],
      note: 'The whole trick is choosing b and c so that ab = ca is just associativity.',
    },

    // -- wrap ----------------------------------------------------------------------------------

    {
      kind: 'end',
      title: 'See you next week',
      points: [
        'Do the rest of sheet 10 and compare with the official solution.',
        'hserobyan@ethz.ch',
        'https://h-717.github.io/DM_HS26/',
      ],
    },

    // -- bonus easter egg: you found the slides after the end slide ----------------------------

    {
      kind: 'exercise',
      ref: 'Bonus',
      title: 'Old exams: the characteristic of a finite field',
      prompt: [
        '(FS 23) Let F be a finite field, and let k ≥ 1 be the smallest integer with 1 + 1 + ⋯ + 1 = 0 (k summands). This k is called the characteristic of F. Prove that k is prime. (5 points)',
      ],
      note: '5 minutes.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Bonus',
      title: 'Solution',
      steps: [
        'Write n × 1 for 1 + ⋯ + 1 with n summands. Since 1 ≠ 0 in a field (Def. 5.26), k ≥ 2.',
        'Suppose k = mn with 1 < m, n < k. By distributivity (Def. 5.18 (iii)), (m × 1) · (n × 1) = (mn) × 1 = k × 1 = 0.',
        'Since m, n < k and k is the smallest, m × 1 ≠ 0 and n × 1 ≠ 0. So m × 1 is a zerodivisor.',
        'A field has no zerodivisors (Theorem 5.24). Contradiction, so k is prime.',
      ],
      note:
        'Why k exists: F is finite, so two of 1 × 1, 2 × 1, 3 × 1, … are equal, say i × 1 = j × 1 with i < j. Then (j − i) × 1 = 0. The exam gave this for free.',
    },
  ],
};
