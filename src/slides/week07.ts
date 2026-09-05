// ---------------------------------------------------------------------------
// Week 7 — everything you say on screen lives in this file. Edit freely.
// See ./types.ts for the list of slide kinds and the text markup.
// ---------------------------------------------------------------------------

import type { Deck } from './types';

export const week07: Deck = {
  week: 7,
  topic: 'Number Theory: gcd, Congruences & Modular Arithmetic',
  date: 'Week 7',
  sheet: 'Exercise sheet 7 (HS 2025)',

  slides: [
    {
      kind: 'title',
      title: 'Exercise Session 7',
      subtitle: 'Bézout, congruences, inverses, and the Chinese Remainder Theorem',
      footnote: 'Discrete Mathematics · HS 2026 · practising on sheet 7',
    },

    {
      kind: 'agenda',
      items: [
        '7.1 A converse for coprimality',
        '7.3 Congruences (and one impossibility proof)',
        '7.4 Modular arithmetic and exponent reduction',
        '7.5 Multiplicative inverses via extended Euclid',
        '7.6 When ax ≡ b has a solution',
        '7.7 The Chinese Remainder Theorem',
        '7.8 Exam questions',
        '7.2 — the presentation exercise',
      ],
    },

    {
      kind: 'callout',
      title: 'The one identity the whole sheet runs on',
      tone: 'good',
      body: [
        '**Bézout**: gcd(a,b) = ua + vb for some integers u, v — and gcd(a,b) is the **smallest positive** number of that form.',
        'Consequence used constantly: if d | a and d | b then d | (ua + vb) for **any** u, v.',
        'Extended Euclid gives you u and v, not just the gcd. Run it forwards, then substitute backwards.',
        'Inverses come free: ua + vm = 1 means **u is a⁻¹ mod m**.',
      ],
    },

    // -- 7.1 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '7.1',
      title: 'The Greatest Common Divisor  (⋆)',
      prompt: [
        'Prove: for all a, b, u, v ∈ ℤ\\{0} with ua + vb = 1, we have gcd(a,b) = 1.',
      ],
    },

    {
      kind: 'solution',
      ref: '7.1',
      title: 'Three lines',
      reveal: true,
      steps: [
        'Let d = gcd(a,b). Then d | a and d | b.',
        'So d divides any integer combination of a and b — in particular d | (ua + vb) = 1.',
        'The only positive divisor of 1 is 1, so d = 1. ∎',
        'This is the converse of Bézout: a combination equal to 1 **certifies** coprimality. You never have to factor anything.',
      ],
    },

    // -- 7.3 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '7.3',
      title: 'Congruences',
      prompt: [],
      parts: [
        'If m ≡₄ n then 123^m ≡₁₀ 33^n.  (⋆)',
        'If a ≡ₘ b and c ≡ₘ d then ac ≡ₘ bd.  (⋆)',
        'There are no m, n ∈ ℤ with n⁵ + 7 = m².  (⋆⋆⋆)',
      ],
      hint: ['For 3: try the equation modulo a well-chosen small number. Which modulus makes fifth powers scarce?'],
    },

    {
      kind: 'solution',
      ref: '7.3',
      title: '1 and 2',
      reveal: true,
      steps: [
        '**1.** Both bases reduce: 123 ≡ 3 and 33 ≡ 3 (mod 10). So the claim is 3^m ≡₁₀ 3^n.',
        'Powers of 3 mod 10 cycle 1, 3, 9, 7, 1, 3, … with period 4. So m ≡₄ n gives the same value. ∎',
        '**2.** ac − bd = ac − bc + bc − bd = c(a − b) + b(c − d).',
        'Both terms are divisible by m, hence so is the sum. ∎',
        'Part 2 is the reason you may multiply congruences at all — worth doing explicitly once.',
      ],
    },

    {
      kind: 'solution',
      ref: '7.3',
      title: '3 · Work modulo 11',
      reveal: true,
      steps: [
        'Why 11: for x ≢ 0 we have x¹⁰ ≡ 1, so (x⁵)² ≡ 1, forcing x⁵ ≡ ±1. Fifth powers mod 11 are only **0, 1, 10**.',
        'So n⁵ + 7 ≡ 7, 8 or 6 (mod 11).',
        'Squares mod 11 are {0, 1, 3, 4, 5, 9} — just square 0…5 and use symmetry.',
        'None of 6, 7, 8 is a square mod 11. So n⁵ + 7 = m² is impossible. ∎',
        'The technique: an equation over ℤ must hold modulo **every** m. Find one m where it fails.',
      ],
      note:
        'Ask why they might have tried mod 4 or mod 9 first and got nowhere. Choosing the modulus is the skill; here 11 works because 5 | 10.',
    },

    // -- 7.4 -----------------------------------------------------------------

    {
      kind: 'solution',
      ref: '7.4',
      title: 'Modular arithmetic',
      reveal: true,
      steps: [
        '**1.** 13 ≡ −1 (mod 7). For even n, 13ⁿ ≡ (−1)ⁿ = 1, so 13ⁿ + 6 ≡ 7 ≡ 0 (mod 7). ∎',
        '**2.** Suppose R_m(a^e) = 1. Write n = qe + r with r = R_e(n).',
        'Then a^n = (a^e)^q · a^r ≡ 1^q · a^r = a^r (mod m). So R_m(a^n) = R_m(a^{R_e(n)}). ∎',
        '**3.** With R₁₃(2¹²) = 1: reduce the exponent mod 12. 2023 = 12·168 + 7.',
        'So 2^2023 ≡ 2⁷ = 128 ≡ 128 − 117 = **11** (mod 13).',
        '**Exponents live modulo the order, not modulo m.** This is the single most common slip in the chapter.',
      ],
    },

    // -- 7.5 -----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '7.5',
      title: 'Multiplicative Inverses',
      prompt: [],
      parts: [
        'Given u, v with ua + vm = 1, how do you get a⁻¹ mod m?  (⋆)',
        'Compute the inverse of 142 modulo 553.  (⋆⋆)',
      ],
    },

    {
      kind: 'solution',
      ref: '7.5',
      title: 'Euclid forwards',
      reveal: true,
      steps: [
        '**1.** Reduce ua + vm = 1 modulo m: vm vanishes, so ua ≡ 1 (mod m). Hence **a⁻¹ = R_m(u)**.',
        '**2.** 553 = 3·142 + 127',
        '142 = 1·127 + 15',
        '127 = 8·15 + 7',
        '15 = 2·7 + **1**   → gcd = 1, so the inverse exists.',
      ],
    },

    {
      kind: 'solution',
      ref: '7.5',
      title: 'and backwards',
      reveal: true,
      steps: [
        '1 = 15 − 2·7',
        '= 15 − 2(127 − 8·15) = 17·15 − 2·127',
        '= 17(142 − 127) − 2·127 = 17·142 − 19·127',
        '= 17·142 − 19(553 − 3·142) = **74·142 − 19·553**',
        'So 142⁻¹ ≡ **74** (mod 553).',
        'Check: 74·142 = 10508 = 19·553 + 1 ✓. Always check — the back-substitution is where arithmetic slips happen.',
      ],
      note:
        'Do the back-substitution on the board line by line. Insist they keep 142 and 553 unmultiplied as symbols until the last step.',
    },

    // -- 7.6 -----------------------------------------------------------------

    {
      kind: 'solution',
      ref: '7.6',
      title: 'ax ≡ₘ b is solvable ⟺ gcd(a,m) | b',
      reveal: true,
      steps: [
        'Write d = gcd(a,m).',
        '**(⇒)** If ax ≡ₘ b then b = ax − km for some k. Since d | a and d | m, d | b. ✓',
        '**(⇐)** Suppose d | b, say b = d·b′. Bézout gives u, v with ua + vm = d.',
        'Multiply by b′: (u b′)a + (v b′)m = b, so x = u b′ satisfies ax ≡ₘ b. ✓ ∎',
        'The same statement over ℤ is 7.8.2: ax + by = c is solvable iff gcd(a,b) | c. Identical proof.',
      ],
    },

    // -- 7.7 -----------------------------------------------------------------

    {
      kind: 'solution',
      ref: '7.7',
      title: 'Chinese Remainder Theorem',
      reveal: true,
      steps: [
        '**1.** gcd(n,m) = 1. (⇒) is immediate since n | nm and m | nm.',
        '(⇐) n | (a−b) and m | (a−b) with n, m coprime forces nm | (a−b). Coprimality is essential: 2 and 4 both divide 4, but 8 does not.',
        '**2.** n = ab, m = ac with a, b, c pairwise coprime, so gcd(n,m) = a and lcm(n,m) = abc.',
        'By 7.6-style reasoning the system is solvable **iff y₁ ≡ₐ y₂**.',
        'When solvable, the solutions form one class modulo lcm(n,m) = abc. In the range 0 ≤ x < nm = a²bc that class has exactly nm / abc = **a** members.',
        'So: **0 solutions if y₁ ≢ₐ y₂, otherwise exactly a.**',
      ],
      note:
        'Sanity check with them: a = 1 recovers the classic coprime CRT with a unique solution. Always test a general answer against the case you know.',
    },

    // -- 7.8 -----------------------------------------------------------------

    {
      kind: 'solution',
      ref: '7.8',
      title: 'Exam questions (HS 2023 / FS 2024)',
      reveal: true,
      steps: [
        '**1(a)** R₁₁(9^2024). Powers of 9 mod 11: 9, 4, 3, 5, 1 — period 5. 2024 ≡ 4 (mod 5), so the answer is the 4th entry: **5**.',
        '**1(b)** 9·2⁴ = 2⁴·3², and 3⁶: lcm = 2⁴·3⁶. Then 9³ = 3⁶ and 12² = 2⁴·3²: gcd = 3².',
        'Product = 2⁴·3⁶·3² = **2⁴·3⁸**.',
        '**2.** ax + by = c solvable ⟺ gcd(a,b) | c — same two directions as 7.6.',
        'Do everything in factored form. Never expand 2⁴·3⁸ into 41 · 6561 — the factorisation *is* the answer.',
      ],
    },

    // -- presentation --------------------------------------------------------

    {
      kind: 'exercise',
      ref: '7.2',
      title: 'Properties of GCD and LCM — for presentation',
      prompt: [
        '1. If a and b are coprime then gcd(a·b, c) = gcd(a,c) · gcd(b,c).',
        '2. lcm(a, gcd(b,c)) = gcd(lcm(a,b), lcm(a,c)).',
        '**We are not solving this today.**',
      ],
      hint: [
        'Both become bookkeeping once you write everything in prime-factor exponents: gcd takes the min of exponents, lcm the max.',
        'Then part 2 is the statement max(x, min(y,z)) = min(max(x,y), max(x,z)) — distributivity, one prime at a time.',
        'If you prefer the divisibility definitions: prove ≤ in both directions using "divides every common divisor".',
        'Part 1 needs coprimality somewhere explicit. Find the exact line where it is used and say so.',
      ],
    },

    {
      kind: 'points',
      title: 'What to take away',
      points: [
        'Bézout in both directions: it computes gcds and it certifies coprimality.',
        'Extended Euclid gives inverses. Always verify the final product.',
        'Reduce the base mod m, and the exponent mod the order.',
        'To show an integer equation has no solution, find one modulus where it fails.',
        'CRT needs coprimality; without it, count solutions with gcd and lcm.',
      ],
    },

    {
      kind: 'title',
      title: 'Kahoot',
      subtitle: 'Join at kahoot.it',
      footnote: 'Questions in kahoot/week07.csv',
    },

    {
      kind: 'end',
      title: 'See you next week',
      points: [
        'Next: algebra proper — monoids, groups, homomorphisms.',
        'Your real sheet is on Moodle — bring it if it differs from mine.',
        'hserobyan@student.ethz.ch',
      ],
    },
  ],
};
