// ---------------------------------------------------------------------------
// Week 7 — everything you say on screen lives in this file. Edit freely.
// See ./types.ts for the list of slide kinds and the text markup.
//
// Built on the HS2026 sheet 7 and its graded solution.
// Lecture: §4.1–4.4 (Oct 26), §4.5–4.6 (Oct 28).
//
// Each exercise is a twin of one on the sheet — same shape, other content:
//   Exercise 1 ↔ 7.1   Exercise 2 ↔ 7.3.1–7.3.2   Exercise 3 ↔ 7.4
//   Exercise 4 ↔ 7.5
// 7.6 (systems of congruences, CRT) is left out: no CRT anywhere on screen.
// 7.2 (simplifying Rₙ with Cor. 4.17, R₁₃(15²⁰²⁶ · 52¹⁰¹³), primes p with
// 2p⁴ + 3 prime) is the graded exercise and is not touched anywhere: no
// "prime p, so p⁴ ≡ 1" arguments, no products that collapse to (−1)ᵏ.
// 7.3.3 (no solutions of n⁵ + 7 = m², try all remainders mod 11) is left
// out: it is the heaviest one and its technique is the one 7.2.3 needs.
// 7.7 is the sheet's own exam block (HS22 2c among them) and is not used.
// Nothing on screen names a sheet exercise.
// The exam block is from the local official exams (file names = semester):
// FS22 2a.1, FS21 2a.1, HS22 2a.3, FS23 2a.2, HS20 2a.4, HS20 2a.5,
// HS22 2a.4, HS21 2a.1–3, FS21 2b, FS23 2b. HS23 and FS24 are
// skipped (latest). None of these are on the HS2026 sheet.
// Every number and claim was brute-forced in Python.
// ---------------------------------------------------------------------------

import type { Deck } from './types';

export const week07: Deck = {
  week: 7,
  topic: 'Number Theory',
  date: 'Mon 2 Nov 2026',
  sheet: 'Exercise sheet 7',

  slides: [
    {
      kind: 'title',
      title: 'Exercise Session 7',
      subtitle: 'gcd, congruences and inverses',
      footnote: 'Discrete Mathematics · HS 2026 · Group Q · CHN D 46',
    },

    {
      kind: 'agenda',
      title: 'Today',
      items: [
        'Recap: divisibility and gcd',
        'Bézout and inverses',
        'Recap: congruences and modular arithmetic',
        'Congruences',
        'Powers modulo m',
        'Recap: inverses',
        'Congruence equations',
        'Old exam questions',
      ],
      note:
        'Timing: 3 intro · 5 recap · 12 Bézout · 5 recap · 10 congruences · 10 powers (break here, about 45 min) · 5 recap · 6 congruence equations · 17 old exams. That is about 75 min.',
    },

    // -- recap: divisibility and gcd ------------------------------------------------

    {
      kind: 'points',
      title: 'Divisibility and gcd (script §4.2)',
      points: [
        'Def. 4.1: a | b if b = ac for some integer c.',
        'Thm. 4.1: for a and d ≠ 0 there are unique q, r with a = dq + r and 0 ≤ r < |d|. We write r = $R_d(a)$.',
        'Def. 4.2, 4.3: gcd(a, b) is the positive common divisor that every common divisor divides. gcd(a, b) = 1 means relatively prime.',
        'Lemma 4.2: gcd(m, n − qm) = gcd(m, n). Repeating this is Euclid’s algorithm.',
        'Cor. 4.5 (Bézout): there are u, v ∈ ℤ with gcd(a, b) = ua + vb.',
      ],
      note:
        '5 minutes. Board example from the script (Example 4.4): gcd(17, 13) = 1 = (−3) · 17 + 4 · 13.',
    },

    // -- Bézout -------------------------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 1',
      title: 'Bézout and inverses',
      prompt: [],
      parts: [
        'Prove that gcd(2n + 1, 3n + 1) = 1 for all n ∈ ℕ.',
        'Use the extended Euclidean algorithm to find u, v ∈ ℤ with 23u + 40v = 1. What is the multiplicative inverse of 23 modulo 40?',
      ],
      hint: ['For 1, find a combination of 2n + 1 and 3n + 1 that equals 1.'],
      note: '6 minutes.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 1',
      title: 'Solutions',
      steps: [
        '1. Let n ∈ ℕ and d = gcd(2n + 1, 3n + 1). Then d | 2n + 1 and d | 3n + 1.',
        'So d also divides 3(2n + 1) − 2(3n + 1) = 6n + 3 − 6n − 2 = 1.',
        'The only positive divisor of 1 is 1, so d = 1.',
        'In general: if ua + vb = 1 for some u, v, then gcd(a, b) = 1. It does not work for other values: 1 · 1 + 1 · 1 = 2, but gcd(1, 1) = 1.',
      ],
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 1',
      title: 'Solutions',
      steps: [
        '2. Forwards: 40 = 1 · 23 + 17,  23 = 1 · 17 + 6,  17 = 2 · 6 + 5,  6 = 1 · 5 + 1.',
        'Backwards: 1 = 6 − 5 = 6 − (17 − 2 · 6) = 3 · 6 − 17',
        '= 3 · (23 − 17) − 17 = 3 · 23 − 4 · 17',
        '= 3 · 23 − 4 · (40 − 23) = 7 · 23 − 4 · 40.',
        'So u = 7 and v = −4. Then 23 · 7 = 1 + 4 · 40 ≡₄₀ 1, so the inverse of 23 modulo 40 is 7 (Def. 4.9).',
        'Check: 23 · 7 = 161 = 4 · 40 + 1.',
      ],
      note:
        'Do the back-substitution on the board. Keep 23 and 40 as numbers you do not multiply out until the end. If u comes out negative, the inverse is R₄₀(u).',
    },

    // -- recap: congruences ------------------------------------------------------------

    {
      kind: 'points',
      title: 'Congruences and modular arithmetic (script §4.5)',
      points: [
        'Def. 4.8: a ≡ₘ b ⟺ m | (a − b).',
        'Lemma 4.13: ≡ₘ is an equivalence relation on ℤ.',
        'Lemma 4.14: if a ≡ₘ b and c ≡ₘ d, then a + c ≡ₘ b + d and ac ≡ₘ bd.',
        'Cor. 4.15: if aᵢ ≡ₘ bᵢ for all i, then f(a₁, …, aₖ) ≡ₘ f(b₁, …, bₖ) for every polynomial f with integer coefficients.',
        'Lemma 4.16: a ≡ₘ Rₘ(a), and a ≡ₘ b ⟺ Rₘ(a) = Rₘ(b).',
      ],
      note:
        '5 minutes. Board example (Example 4.13): 7² = 49 ≡₂₄ 1, so 7¹⁰⁰ = (7²)⁵⁰ ≡₂₄ 1⁵⁰ = 1.',
    },

    // -- congruences ----------------------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 2',
      title: 'Congruences',
      prompt: [],
      parts: [
        'Prove that for all a, b, m ∈ ℤ with m ≥ 1: if a ≡ₘ b, then a² ≡ₘ b². Use only Def. 4.8.',
        'Prove that for all m, n ∈ ℕ: if m ≡₆ n, then $2^m \\equiv_9 11^n$.',
      ],
      note: '5 minutes.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 2',
      title: 'Solutions',
      steps: [
        '1. From a ≡ₘ b we get a − b = mk for some k ∈ ℤ.',
        'Then a² − b² = (a − b)(a + b) = m · k(a + b). So m | a² − b², that is a² ≡ₘ b².',
        '2. 11 ≡₉ 2, so $11^n \\equiv_9 2^n$ by Cor. 4.15 with f(x) = xⁿ. It remains to show $2^m \\equiv_9 2^n$.',
        'Assume m ≤ n (the other case is the same). Since m ≡₆ n, n = m + 6k for some k ∈ ℕ.',
        '2⁶ = 64 = 7 · 9 + 1 ≡₉ 1. So $2^n = 2^m \\cdot (2^6)^k \\equiv_9 2^m \\cdot 1^k = 2^m$ by Cor. 4.15.',
        'By transitivity (Lemma 4.13): $2^m \\equiv_9 2^n \\equiv_9 11^n$.',
      ],
      note:
        'The "assume m ≤ n" is only fine because both sides have base 2 at that point. Before replacing 11 by 2 the two cases are not symmetric.',
    },

    // -- powers ---------------------------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 3',
      title: 'Powers modulo m',
      prompt: [],
      parts: [
        'Prove that 8 | 3ⁿ − 1 for every even n ≥ 0.',
        'Let a, e, m ∈ ℕ \\ {0} with $R_m(a^e) = 1$. Prove that $R_m(a^{ke}) = 1$ for all k ∈ ℕ.',
        'Using R₇(3⁶) = 1, compute R₇(3²⁰²⁶).',
      ],
      note: '6 minutes.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 3',
      title: 'Solutions',
      steps: [
        '1. Let n = 2k. Then 3ⁿ − 1 = 9ᵏ − 1.',
        '9 ≡₈ 1, so by Cor. 4.15 with f(x) = xᵏ − 1: 9ᵏ − 1 ≡₈ 1ᵏ − 1 = 0. So 8 | 3ⁿ − 1.',
        '2. By Lemma 4.16 (i), $a^e \\equiv_m R_m(a^e) = 1$.',
        'By Cor. 4.15 with f(x) = xᵏ: $a^{ke} = (a^e)^k \\equiv_m 1^k = 1$.',
        'Since $R_m(a^e) = 1 < m$, we have m ≥ 2, so Rₘ(1) = 1. By Lemma 4.16 (ii), $R_m(a^{ke}) = R_m(1) = 1$.',
        '3. 2026 = 6 · 337 + 4. So 3²⁰²⁶ = (3⁶)³³⁷ · 3⁴ ≡₇ 1 · 3⁴ = 81 = 11 · 7 + 4. Hence R₇(3²⁰²⁶) = 4.',
      ],
      note: 'The exponent is reduced modulo 6, not modulo 7. Ask the room why.',
    },

    // -- recap: inverses -------------------------------------------------------------------

    {
      kind: 'points',
      title: 'Inverses',
      points: [
        'Lemma 4.18: ax ≡ₘ 1 has a solution x ∈ ℤₘ iff gcd(a, m) = 1. The solution is unique.',
        'Def. 4.9: this x is the multiplicative inverse of a modulo m.',
        // 'Thm. 4.19 (CRT): if m₁, …, mᵣ are pairwise relatively prime and M = m₁ · … · mᵣ, then x ≡ₘ₁ a₁, …, x ≡ₘᵣ aᵣ has exactly one solution 0 ≤ x < M.',
        // 'If the moduli are not relatively prime, there can be no solution or several.',
      ],
      note:
        '5 minutes. Board example: gcd(3, 7) = 1, and 3 · 5 = 15 = 2 · 7 + 1, so the inverse of 3 modulo 7 is 5.',
    },

    // -- congruence equations ----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 4',
      title: 'Congruence equations',
      prompt: [],
      parts: [
        'Find all x ∈ ℤ₁₀ with 6x ≡₁₀ 4.',
        'Find all x ∈ ℤ₁₀ with 6x ≡₁₀ 5.',
        // 'Explain both answers with gcd(6, 10).',
      ],
      note: '4 minutes. Trying all ten values is a valid method here.',
    },

    {
      kind: 'table',
      solution: 'Exercise 4',
      title: 'Exercise 4: all values of 6x modulo 10',
      headers: ['x', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      rows: [['R₁₀(6x)', '0', '6', '2', '8', '4', '0', '6', '2', '8', '4']],
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 4',
      title: 'Solutions',
      steps: [
        '1. x = 4 and x = 9.',
        '2. No solution.',
        // '3. gcd(6, 10) = 2. If 6x ≡₁₀ b, then b = 6x − 10k for some k, which is even. 5 is odd.',
        // '4 is even, and Bézout gives 2 = 2 · 6 − 1 · 10. Times 2: 4 = 4 · 6 − 2 · 10, so x = 4 works.',
        // 'So ax ≡ₘ b has a solution exactly when gcd(a, m) | b.',
      ],
    },

    // -- systems -------------------------------------------------------------------------------

    // {
    //   kind: 'exercise',
    //   ref: 'Exercise 5',
    //   title: 'Systems of congruences',
    //   prompt: [],
    //   parts: [
    //     'Find x ∈ ℤ₁₀₅ with x ≡₃ 2, x ≡₅ 3 and x ≡₇ 2.',
    //     'Find all x ∈ ℤ₂₄ with x ≡₄ 1 and x ≡₆ 2.',
    //     'Find all x ∈ ℤ₂₄ with x ≡₄ 1 and x ≡₆ 3.',
    //   ],
    //   hint: ['Start from the congruence with the largest modulus and list its solutions.'],
    //   note: '5 minutes.',
    // },

    // {
    //   kind: 'solution',
    //   reveal: true,
    //   ref: 'Exercise 5',
    //   title: 'Solutions',
    //   steps: [
    //     '1. 3, 5 and 7 are pairwise relatively prime, so by Thm. 4.19 there is exactly one solution in ℤ₁₀₅.',
    //     'x ≡₇ 2 gives 2, 9, 16, 23, … with remainders 2, 4, 1, 3 modulo 5. So x = 23, and R₃(23) = 2 also holds.',
    //     '2. x ≡₄ 1 implies x ≡₂ 1, so x is odd. x ≡₆ 2 implies x ≡₂ 0, so x is even. No solution.',
    //     '3. x ≡₄ 1 gives 1, 5, 9, 13, 17, 21 in ℤ₂₄. Modulo 6 these are 1, 5, 3, 1, 5, 3. So x = 9 and x = 21.',
    //     '4 and 6 are not relatively prime, so Thm. 4.19 does not apply: we got no solution once and two solutions once.',
    //   ],
    //   note: 'In 3, the two solutions differ by lcm(4, 6) = 12.',
    // },

    // -- old exam --------------------------------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exam 1',
      title: 'Old exams: short questions',
      prompt: ['Short questions from past end-of-semester exams. One point each, no justification needed.'],
      parts: [
        '(FS 22) Compute R₁₁(3⁵⁷).',
        '(FS 21) Compute the last decimal digit of $123456789^{(11^{13})}$.',
        '(HS 22) Compute gcd(455, 182).',
        '(FS 23) Compute gcd(32, 30 + 32¹¹).',
        '(HS 20) Find x ∈ ℤ₁₃ such that 4x ≡₁₃ 1.',
        '(HS 20) True or false: there exists x ∈ ℤ₁₃₇₈₇₅ such that 256x ≡₁₃₇₈₇₅ 1.',
        '(HS 22) Let a, b ∈ ℕ \\ {0} with gcd(a, b) = 1. What are the possible values of gcd(3a, 7b)?',
      ],
      note: '8 minutes. Real exam questions. Show of hands on each, then reveal.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exam 1',
      title: 'Solutions',
      steps: [
        '1. 9. 3⁵ = 243 = 22 · 11 + 1 ≡₁₁ 1 and 57 = 5 · 11 + 2, so 3⁵⁷ ≡₁₁ 3² = 9.',
        '2. 9. 123456789 ≡₁₀ 9 and 9² = 81 ≡₁₀ 1. Since 11¹³ is odd, the power is ≡₁₀ 9.',
        '3. 91. 455 = 2 · 182 + 91 and 182 = 2 · 91.',
        '4. 2. By Lemma 4.2 with q = 32¹⁰: gcd(32, 30 + 32¹¹) = gcd(32, 30) = 2.',
        '5. 10, since 4 · 10 = 40 = 3 · 13 + 1.',
        '6. True. 137875 is odd and 256 = 2⁸, so gcd(256, 137875) = 1. Then Lemma 4.18 gives x.',
        '7. 1, 3, 7 and 21. For example (a, b) = (1, 1), (1, 3), (7, 1), (7, 3).',
      ],
      note:
        'For 7: a prime other than 3 and 7 dividing both would divide a and b. And 9 | 3a and 9 | 7b would give 3 | a and 3 | b. Same for 49.',
    },

    {
      kind: 'exercise',
      ref: 'Exam 2',
      title: 'Old exams: true or false',
      prompt: ['(HS 21) A wrong answer cost a point in the exam.'],
      parts: [
        'For any n ∈ ℕ \\ {0} and any x, y, z ∈ ℤ: x + y ≡ₙ z if and only if x ≡ₙ z and y ≡ₙ z.',
        'For any a, b ∈ ℕ \\ {0} and any x, y ∈ ℤ: $x \\equiv_{ab} y$ if and only if $x \\equiv_a y$ and $x \\equiv_b y$.',
        'For any a, b ∈ ℤ: if there exist u, v, d ∈ ℤ such that ua + vb = d, then gcd(a, b) = d.',
      ],
      note: '3 minutes.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exam 2',
      title: 'Solutions',
      steps: [
        '1. False. n = 2, x = y = 1, z = 0: 1 + 1 ≡₂ 0, but 1 ≢₂ 0.',
        '2. False. a = b = 2, x = 0, y = 2: 0 ≡₂ 2, but 0 ≢₄ 2.',
        '3. False. a = b = u = v = 1 gives d = 2, but gcd(1, 1) = 1. It is true for d = 1.',
      ],
    },

    {
      kind: 'exercise',
      ref: 'Exam 3',
      title: 'Old exams: linear systems',
      prompt: ['Justify your answers.'],
      parts: [
        '(FS 21) Find all solutions x, y ∈ ℤ₆ of 3x + y ≡₆ 3 and 3x + 2y ≡₆ 4.',
        '(FS 23) Find all solutions (x, y) ∈ ℤ₇ × ℤ₇ of 4x + 3y ≡₇ 2 and 5x + 2y ≡₇ 6.',
      ],
      note: '6 minutes.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exam 3',
      title: 'Solutions',
      steps: [
        '1. Subtract the first from the second (Lemma 4.14): y ≡₆ 1. Then 3x ≡₆ 2.',
        'But 3x ≡₆ 0 for even x and 3x ≡₆ 3 for odd x. So there are no solutions.',
        '2. Multiply the first by 3: 12x + 9y ≡₇ 6, that is 5x + 2y ≡₇ 6. This is the second equation, so only 4x + 3y ≡₇ 2 is left.',
        '3 · 5 = 15 ≡₇ 1, so multiply by 5: y ≡₇ 10 − 20x ≡₇ 3 + x.',
        'So there are 7 solutions: (0, 3), (1, 4), (2, 5), (3, 6), (4, 0), (5, 1), (6, 2).',
      ],
    },

    // {
    //   kind: 'exercise',
    //   ref: 'Exam 4',
    //   title: 'Old exams: a short proof',
    //   prompt: [
    //     '(HS 20) Let m, n ∈ ℕ \\ {0, 1} and consider f : ℤₘₙ → ℤₘ × ℤₙ with f(x) = (Rₘ(x), Rₙ(x)).',
    //     'Prove that if f is injective, then gcd(m, n) = 1.',
    //   ],
    //   hint: ['Prove the contrapositive. Which x ≠ 0 has f(x) = (0, 0)?'],
    //   note: '4 minutes.',
    // },

    // {
    //   kind: 'solution',
    //   reveal: true,
    //   ref: 'Exam 4',
    //   title: 'Solution',
    //   steps: [
    //     'Contrapositive: assume d = gcd(m, n) > 1. Let x = mn / d.',
    //     'x = m · (n / d) and x = n · (m / d), so m | x and n | x. Hence f(x) = (0, 0) = f(0).',
    //     'Since d > 1, 0 < x < mn, so x ∈ ℤₘₙ and x ≠ 0. So f is not injective.',
    //   ],
    //   note: 'Together with the CRT this shows: f is a bijection iff gcd(m, n) = 1.',
    // },

    // -- wrap --------------------------------------------------------------------------------------

    {
      kind: 'end',
      title: 'See you next week',
      points: [
        'Do the rest of sheet 7 and compare with the official solution.',
        'hserobyan@ethz.ch',
        'https://h-717.github.io/DM_HS26/',
      ],
    },
  ],
};
