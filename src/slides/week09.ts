// ---------------------------------------------------------------------------
// Week 9 — everything you say on screen lives in this file. Edit freely.
// See ./types.ts for the list of slide kinds and the text markup.
//
// Built on the HS2026 sheet 9 and its graded solution.
// Lecture: §5.3 partial (Nov 4), then per the Moodle roadmap §5.3–5.4
// (Nov 9) and rings (Nov 11). Those last two are still listed under "Plan".
// The deck assumes §5.3.4–5.4.2 and §5.5.1–5.5.3 were seen, and nothing
// from §5.5.4 on (zerodivisors, polynomial rings, fields).
//
// Each exercise is a twin of one on the sheet — same shape, other content:
//   Exercise 1 ↔ 9.1.1   Exercise 2 ↔ 9.2.1–9.2.2   Exercise 3 ↔ 9.3
//   Exercise 4 ↔ 9.4     Exercise 5 ↔ 9.6
// 9.5 is the graded interview exercise and is not touched anywhere: no
// zerodivisors (Def. 5.23 stays off screen), no product rings, no matrix
// rings, no deriving commutativity of + from the other ring axioms, no
// proofs that something is a unit, and of Lemma 5.17 only (i) is shown.
// For the same reason the exam block skips HS20 3a.2 (zerodivisors of ℤ₉₁),
// HS20 3c ((−a)b = a(−b) from the axioms), FS21 3a.3, HS21 3a.2 and FS21 3e.
// 9.1.2 and 9.2.3 (ℤ*ₙₘ ≅ ℤ*ₙ × ℤ*ₘ) are left out. 9.3's broadcast attack
// needs CRT, which this course's decks avoid, so Exercise 3 is the
// same-modulus attack instead (HS2025 9.3.2, not on this year's sheets),
// with e = 3 and e = 5 so that 2 · 3 − 5 = 1 is visible without Bézout.
// 9.7 is the sheet's own exam block and is not used. 9.7.1 was Exercise 2
// of week 8 anyway.
// Nothing on screen names a sheet exercise.
// The exam block is from the local official exams (file names = semester):
// HS20 3a.1, FS23 3a.1, FS22 3a.1, FS22 3a.2, HS21 3a.5, HS22 3a.3,
// FS21 3c, HS22 3b, FS22 2b, HS22 2b, and HS21 3e as the bonus.
// HS23 and FS24 are skipped (latest). None of these are on HS2026 sheet 9,
// and none were used in week 8.
// Every number and claim was brute-forced in Python.
// ---------------------------------------------------------------------------

import type { Deck } from './types';

export const week09: Deck = {
  week: 9,
  topic: 'Cyclic Groups, RSA & Rings',
  date: 'Mon 16 Nov 2026',
  sheet: 'Exercise sheet 9',

  slides: [
    {
      kind: 'title',
      title: 'Exercise Session 9',
      subtitle: 'Cyclic groups, RSA and rings',
      footnote: 'Discrete Mathematics · HS 2026 · Group Q · CHN D 46',
    },

    {
      kind: 'agenda',
      title: 'Today',
      items: [
        'Recap: order, cyclic groups, Lagrange, ℤ*ₘ',
        'Diffie–Hellman in ⟨ℤₙ; ⊕⟩',
        'The group ℤ*ₘ',
        'Recap: RSA',
        'Same message, same modulus',
        'Recap: rings',
        'Divisibility in a commutative ring',
        'A relation on a group',
        'Old exam questions',
      ],
      note:
        'Timing: 3 intro · 8 recap · 7 Diffie–Hellman · 8 ℤ*ₘ · 3 RSA recap · 6 RSA attack (break here, about 35 min) · 4 ring recap · 6 divisibility · 6 relation · 15 old exams. That is about 65 min.',
    },

    // -- recap: order, cyclic groups, Lagrange, Z_m* -------------------------------------

    {
      kind: 'points',
      title: 'Order and cyclic groups (script §5.3.4–5.3.6)',
      points: [
        'From §5.3.4 on, groups are written multiplicatively: $a^n$, $a^{-1}$, and $a^m \\cdot a^n = a^{m+n}$, $(a^m)^n = a^{mn}$ for all m, n ∈ ℤ.',
        'Def. 5.12: ord(a) is the least m ≥ 1 with $a^m = e$, and ∞ if there is none. Lemma 5.6: in a finite group, every element has finite order.',
        'Def. 5.14, 5.15: ⟨a⟩ = {aⁿ | n ∈ ℤ}. G is cyclic if G = ⟨g⟩ for some g, and g is then a generator.',
        'Example 5.27: the generators of ⟨ℤₙ; ⊕⟩ are the g with gcd(g, n) = 1. Theorem 5.7: a cyclic group of order n is isomorphic to ⟨ℤₙ; ⊕⟩.',
        '§5.3.6: Diffie–Hellman works in any cyclic group ⟨g⟩ in which computing x from gˣ is infeasible.',
      ],
      note:
        '4 minutes. Board examples: in ℤ₂₀, ord(6) = 10 and ord(10) = 2 (Example 5.23). In ⟨ℤ; +⟩ every a ≠ 0 has infinite order (Example 5.25), and the generators are 1 and −1 (Example 5.28).',
    },

    {
      kind: 'points',
      title: 'Lagrange and ℤ*ₘ (script §5.3.7–5.3.8)',
      points: [
        'Theorem 5.8 (Lagrange): if H is a subgroup of a finite group G, then |H| divides |G|.',
        'Cor. 5.9: ord(a) divides |G|. Cor. 5.10: $a^{|G|} = e$. Cor. 5.11: a group of prime order is cyclic, and every a ≠ e is a generator.',
        'Def. 5.16, 5.17: ℤ*ₘ = {a ∈ ℤₘ | gcd(a, m) = 1} and $\\varphi(m) = |\\mathbb{Z}_m^*|$.',
        'Lemma 5.12: for the prime factorization $m = \\prod_{i=1}^{r} p_i^{e_i}$ we have $\\varphi(m) = \\prod_{i=1}^{r} (p_i - 1)\\, p_i^{e_i - 1}$.',
        'Theorem 5.13: ⟨ℤ*ₘ; ⊙, ⁻¹, 1⟩ is a group. Cor. 5.14: $a^{\\varphi(m)} \\equiv_m 1$ if gcd(a, m) = 1.',
        'Theorem 5.15: ℤ*ₘ is cyclic if and only if m = 2, 4, pᵉ or 2pᵉ, for an odd prime p and e ≥ 1.',
      ],
      note:
        '4 minutes. Board examples: ℤ*₁₈ = {1, 5, 7, 11, 13, 17}, so φ(18) = 6 (Example 5.29). ℤ*₁₉ is cyclic with generator 2 (Example 5.32).',
    },

    // -- Diffie-Hellman -------------------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 1',
      title: 'Diffie–Hellman in ⟨ℤₙ; ⊕⟩',
      prompt: [
        'Alice and Bob run Diffie–Hellman in the group ⟨ℤ₂₆; ⊕⟩ with g = 7. Written additively, "gˣ" is 7 ⊕ 7 ⊕ ⋯ ⊕ 7 (x times) = R₂₆(x · 7).',
        'Alice picks $x_A$ and sends $y_A = R_{26}(x_A \\cdot 7)$. Bob picks $x_B$ and sends $y_B = R_{26}(x_B \\cdot 7)$.',
      ],
      parts: [
        'Check that 7 is a generator of ⟨ℤ₂₆; ⊕⟩.',
        'What is the shared key $k_{AB}$ in this group?',
        'Eve sees $y_A = 10$ and $y_B = 11$. Compute $k_{AB}$.',
      ],
      note: '7 minutes.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 1',
      title: 'Solutions',
      steps: [
        '1. gcd(7, 26) = 1, so 7 is a generator (Example 5.27).',
        '2. Alice computes "$y_B^{x_A}$" $= R_{26}(x_A \\cdot y_B) = R_{26}(x_A \\cdot x_B \\cdot 7)$. Bob gets the same from $R_{26}(x_B \\cdot y_A)$.',
        '3. Eve needs $x_A$, so she solves $7 \\cdot x_A \\equiv_{26} 10$. Since 7 · 15 = 105 = 4 · 26 + 1, the inverse of 7 modulo 26 is 15 (Lemma 4.18).',
        '$x_A = R_{26}(15 \\cdot 10) = R_{26}(150) = 20$. Check: R₂₆(7 · 20) = R₂₆(140) = 10.',
        '$k_{AB} = R_{26}(x_A \\cdot y_B) = R_{26}(20 \\cdot 11) = R_{26}(220) = 12$.',
        'In ⟨ℤₙ; ⊕⟩ the discrete logarithm is a division modulo n: one run of the extended Euclidean algorithm.',
      ],
      note:
        'Finding 15: 26 = 3 · 7 + 5, 7 = 5 + 2, 5 = 2 · 2 + 1, so 1 = 3 · 26 − 11 · 7 and 7⁻¹ = R₂₆(−11) = 15. Bob as a check: x_B = R₂₆(15 · 11) = 9 and R₂₆(9 · 10) = 12.',
    },

    // -- the group Z_m* -------------------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 2',
      title: 'The group ℤ*ₘ',
      prompt: [],
      parts: [
        'Determine the order and the elements of ⟨ℤ*₂₀; ⊙⟩.',
        'Determine all generators of ⟨ℤ*₁₃; ⊙⟩.',
        'Is ⟨ℤ*₂₀; ⊙⟩ cyclic?',
      ],
      note: '8 minutes.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 2',
      title: 'Solutions',
      steps: [
        '1. 20 = 2² · 5, so φ(20) = (2 − 1) · 2 · (5 − 1) · 1 = 8 by Lemma 5.12.',
        'ℤ*₂₀ = {1, 3, 7, 9, 11, 13, 17, 19}.',
        '2. |ℤ*₁₃| = 12, so ord(a) ∈ {1, 2, 3, 4, 6, 12} by Cor. 5.9.',
        'Each of 1, 2, 3, 4, 6 divides 4 or 6. So a is a generator if and only if a⁴ ≠ 1 and a⁶ ≠ 1.',
        'The table on the next slide gives the generators 2, 6, 7 and 11.',
        '3. No. Every a ∈ ℤ*₂₀ has a² ∈ {1, 9}, and 9² = 81 ≡₂₀ 1. So a⁴ = 1 for all a.',
        'Then ord(a) ≤ 4 < 8 for every a, so no element generates ℤ*₂₀. This matches Theorem 5.15.',
      ],
    },

    {
      kind: 'table',
      solution: 'Exercise 2',
      title: 'Exercise 2: powers in ℤ*₁₃',
      lead: 'a is a generator if and only if neither a⁴ nor a⁶ is 1.',
      headers: ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      rows: [
        ['a⁴', '3', '3', '9', '1', '9', '9', '1', '9', '3', '3', '1'],
        ['a⁶', '12', '1', '1', '12', '12', '12', '12', '1', '1', '12', '1'],
        ['ord(a)', '12', '3', '6', '4', '12', '12', '4', '3', '6', '12', '2'],
      ],
      note:
        'Shortcut: the powers of 2 are 2, 4, 8, 3, 6, 12, 11, 9, 5, 10, 7, 1, so 2 is a generator. By Theorem 5.7, i ↦ 2ⁱ is an isomorphism ℤ₁₂ → ℤ*₁₃, so the generators are 2ᵏ with gcd(k, 12) = 1: 2¹, 2⁵, 2⁷, 2¹¹ = 2, 6, 11, 7.',
    },

    // -- recap: RSA ------------------------------------------------------------------------

    {
      kind: 'points',
      title: 'RSA (script §5.4)',
      points: [
        'Theorem 5.16: let G be a finite group and gcd(e, |G|) = 1. Then x ↦ xᵉ is a bijection, and the e-th root of y is $y^d$, where $ed \\equiv_{|G|} 1$.',
        'Figure 5.1: Alice picks primes p and q, sets n = pq and f = (p − 1)(q − 1) = φ(n), picks e, and computes d with $ed \\equiv_f 1$.',
        'Public key (n, e), secret key d. Encryption: c = Rₙ(mᵉ). Decryption: m = Rₙ(cᵈ).',
        'Computing d needs f = φ(n), which is easy only if p and q are known.',
      ],
      note:
        '3 minutes. Board example: p = 3, q = 11, n = 33, f = 20, e = 3, d = 7 (3 · 7 = 21 ≡₂₀ 1). m = 5 gives c = R₃₃(125) = 26, and R₃₃(26⁷) = 5.',
    },

    // -- RSA attack ------------------------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 3',
      title: 'Same message, same modulus',
      prompt: [
        'Alice has two RSA public keys with the same modulus n: (n, 3) and (n, 5). Bob encrypts the same message m ∈ ℤ*ₙ for both keys and sends $c_1 = R_n(m^3)$ and $c_2 = R_n(m^5)$.',
      ],
      parts: [
        'Show how Eve, who knows n, c₁ and c₂, can compute m efficiently, without factoring n.',
        'Try it: n = 51, c₁ = 23, c₂ = 14.',
      ],
      note:
        '6 minutes. If the room is stuck after 2 minutes, say: 2 · 3 − 5 = 1. Do not put it on screen first.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 3',
      title: 'Solutions',
      steps: [
        '1. We compute in the group ℤ*ₙ. Since m ∈ ℤ*ₙ, also c₂ ∈ ℤ*ₙ (Theorem 5.13), so c₂ has an inverse.',
        '$m = m^{2 \\cdot 3 - 5} = (m^3)^2 \\cdot (m^5)^{-1} = c_1^2 \\cdot c_2^{-1}$, by the power rules of §5.3.4.',
        'Eve finds $c_2^{-1}$ with the extended Euclidean algorithm (Lemma 4.18). Then two multiplications modulo n give m.',
        '2. $c_1^2 = 529 = 10 \\cdot 51 + 19$, so $c_1^2 \\equiv_{51} 19$.',
        '14 · 11 = 154 = 3 · 51 + 1, so $c_2^{-1} = 11$.',
        'm = R₅₁(19 · 11) = R₅₁(209) = 5.',
        'Check: 5³ = 125 = 2 · 51 + 23 and 5⁵ = 3125 = 61 · 51 + 14.',
      ],
      note:
        'Finding 11: 51 = 3 · 14 + 9, 14 = 9 + 5, 9 = 5 + 4, 5 = 4 + 1, so 1 = 11 · 14 − 3 · 51. In general gcd(e₁, e₂) = 1 gives 1 = u·e₁ + v·e₂ (Cor. 4.5) and m = c₁ᵘ · c₂ᵛ. Both keys are valid: n = 3 · 17, f = 32, gcd(3, 32) = gcd(5, 32) = 1.',
    },

    // -- recap: rings ----------------------------------------------------------------------

    {
      kind: 'points',
      title: 'Rings (script §5.5.1–5.5.3)',
      points: [
        'Def. 5.18: a ring ⟨R; +, −, 0, ·, 1⟩ satisfies (i) ⟨R; +, −, 0⟩ is a commutative group, (ii) ⟨R; ·, 1⟩ is a monoid, (iii) a(b + c) = ab + ac and (b + c)a = ba + ca. It is commutative if ab = ba for all a, b.',
        'Lemma 5.17 (i): 0a = a0 = 0.',
        'Def. 5.20: u is a unit if uv = vu = 1 for some v. Lemma 5.18: the units form a group R*. For example ℤ* = {−1, 1}, and the units of ℤₘ are ℤ*ₘ.',
        'Def. 5.21 (R commutative): a | b if b = ac for some c ∈ R. Lemma 5.19 (i): if a | b and b | c, then a | c.',
      ],
      note:
        '4 minutes. Examples 5.33, 5.34: ℤ, ℚ, ℝ, ℂ and ⟨ℤₘ; ⊕, ⊖, 0, ⊙, 1⟩ are commutative rings. The units of ℝ are all non-zero reals (Example 5.37).',
    },

    // -- divisibility ----------------------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 4',
      title: 'Divisibility in a commutative ring',
      prompt: [
        'Let ⟨R; +, −, 0, ·, 1⟩ be a commutative ring and a, b, c ∈ R. Use only Def. 5.21 and the ring axioms, no lemmas. Name the rule in every step.',
      ],
      parts: [
        'If a | b, then ac | bc.',
        'If a | b and b | c, then a | (b + c).',
        'In ⟨ℤ₈; ⊕, ⊖, 0, ⊙, 1⟩: does 3 divide 2? Does 2 divide 3?',
      ],
      note: '6 minutes.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 4',
      title: 'Solutions',
      steps: [
        '1. a | b, so b = ad for some d ∈ R (Def. 5.21).',
        '$bc = (ad)c \\overset{\\text{assoc.}}{=} a(dc) \\overset{\\text{comm.}}{=} a(cd) \\overset{\\text{assoc.}}{=} (ac)d$, so ac | bc.',
        '2. b = ad and c = be for some d, e ∈ R (Def. 5.21). So b + c = ad + (ad)e.',
        '$ad + (ad)e \\overset{\\text{assoc.}}{=} ad + a(de) \\overset{\\text{distr.}}{=} a(d + de)$, so a | (b + c).',
        '3. Yes: 3 ⊙ 6 = R₈(18) = 2, so 3 | 2.',
        'No: 2 ⊙ c = R₈(2c) is even for every c, because 2c and 8 are even. So 2 ⊙ c ≠ 3.',
      ],
      note:
        'In ℤ, 3 does not divide 2. Divisibility depends on the ring: in ℤ₈ we have 3 ⊙ 3 = 1, so 3 divides every b, since b = 3 ⊙ (3 ⊙ b).',
    },

    // -- a relation on a group -------------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 5',
      title: 'A relation on a group',
      prompt: ['Let ⟨G; ∗, ˆ, e⟩ be a group. Define the relation ρ on G by a ρ b ⟺ a ∗ b = b ∗ a.'],
      parts: [
        'Prove that ρ is reflexive and symmetric.',
        'Prove: ρ is transitive if and only if G is commutative.',
        'Give a, b, c in S₃ with a ρ b and b ρ c, but not a ρ c.',
      ],
      hint: ['For ⟹ in 2, choose b cleverly.'],
      note: '6 minutes.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 5',
      title: 'Solutions',
      steps: [
        '1. Reflexive (Def. 3.13): a ∗ a = a ∗ a, so a ρ a.',
        'Symmetric (Def. 3.15): a ρ b ⟺ a ∗ b = b ∗ a ⟺ b ∗ a = a ∗ b ⟺ b ρ a.',
        '2. ⟸: if G is commutative, then a ρ b for all a, b. So ρ = G × G, which is transitive.',
        '⟹: let a, c ∈ G. By G2, a ∗ e = a = e ∗ a, so a ρ e. In the same way e ρ c.',
        'Transitivity (Def. 3.17) gives a ρ c, that is a ∗ c = c ∗ a. So G is commutative.',
        '3. In S₃ (Example 5.12), take a: (1, 2, 3) → (2, 1, 3), b = id and c: (1, 2, 3) → (1, 3, 2).',
        'a ρ id and id ρ c as in 2. But a ∘ c: (1, 2, 3) → (2, 3, 1) and c ∘ a: (1, 2, 3) → (3, 1, 2), so not a ρ c.',
      ],
      note:
        'Same move as last week: plug in e to get information out of a statement that holds for all elements. So ρ is an equivalence relation exactly when G is commutative.',
    },

    // -- old exam ------------------------------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exam 1',
      title: 'Old exams: short questions',
      prompt: ['No justification needed.'],
      parts: [
        '(HS 20) True or false: every group of order 17 has 16 generators.',
        '(FS 23) List all generators of the group ⟨ℤ₁₂; ⊕⟩.',
        '(FS 22) Find a generator of ℤ*₁₄.',
        '(FS 22) Let x ∈ G with ord(x) = 27, and y = x⁹. Find the inverse of y as an expression in y.',
        '(HS 21) True or false: if G = ⟨g⟩ is an infinite cyclic group, then gⁱ ≠ gʲ for all i, j ∈ ℤ with i ≠ j.',
        '(HS 22) Find a non-cyclic group G such that all proper subgroups H ≠ G are cyclic.',
      ],
      note: '6 minutes. 1 point each, the last one 2 points.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exam 1',
      title: 'Solutions',
      steps: [
        '1. True. 17 is prime, so by Cor. 5.11 every element except e is a generator.',
        '2. 1, 5, 7 and 11: the g with gcd(g, 12) = 1 (Example 5.27).',
        '3. For example 3: its powers are 3, 9, 13, 11, 5, 1, so ⟨3⟩ = ℤ*₁₄. (5 works too.)',
        '4. y² = x¹⁸ and y · y² = x²⁷ = e, so y⁻¹ = y².',
        '5. True. If gⁱ = gʲ with i < j, then $g^{j-i} = e$, so ord(g) is finite. Then $g^m = g^{R_{\\mathrm{ord}(g)}(m)}$ for all m (§5.3.5), so ⟨g⟩ has at most ord(g) elements. But G = ⟨g⟩ is infinite.',
        '6. ℤ₂ × ℤ₂. Its proper subgroups are {(0, 0)} and the three {(0, 0), a} = ⟨a⟩ from last week. It is not cyclic: a ⊕ a = (0, 0) for every a, so ord(a) ≤ 2 < 4.',
      ],
    },

    {
      kind: 'exercise',
      ref: 'Exam 2',
      title: 'Old exams: cyclic groups',
      prompt: [],
      parts: [
        '(FS 21) Prove or disprove: (i) every commutative group is cyclic, (ii) every cyclic group is commutative. (5 points)',
        '(HS 22) Prove that the groups ⟨ℤ*₁₂; ⊙⟩ and ⟨ℤ₄; ⊕⟩ are not isomorphic. (3 points)',
      ],
      note: '5 minutes.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exam 2',
      title: 'Solutions',
      steps: [
        '1. (i) False. ℤ₂ × ℤ₂ is commutative but not cyclic (Exam 1, question 6).',
        '(ii) True. Let G = ⟨g⟩ and a, b ∈ G. Then a = gⁱ and b = gʲ for some i, j ∈ ℤ.',
        'a · b = gⁱ · gʲ = gⁱ⁺ʲ = gʲ⁺ⁱ = gʲ · gⁱ = b · a.',
        '2. ℤ*₁₂ = {1, 5, 7, 11}, and every element squares to 1: 25 = 2 · 12 + 1, 49 = 4 · 12 + 1, 121 = 10 · 12 + 1.',
        'Suppose ψ : ℤ₄ → ℤ*₁₂ is an isomorphism. Then ψ(2) = ψ(1 ⊕ 1) = ψ(1) ⊙ ψ(1) = 1 = ψ(0), by Def. 5.10, the squares above and Lemma 5.5 (i).',
        'But 2 ≠ 0, so ψ is not injective. Contradiction.',
      ],
      note:
        'Why one direction is enough: the inverse of an isomorphism is an isomorphism (week 8, Exam 3).',
    },

    {
      kind: 'exercise',
      ref: 'Exam 3',
      title: 'Old exams: RSA',
      prompt: [],
      parts: [
        '(FS 22) The ciphertext c = 7 was obtained by encrypting a message m with RSA under the public key (n, e) = (55, 27). Recover the secret key d and the message m. (3 points)',
        '(HS 22) Alice proposes an RSA variant with n = pq for distinct primes p, q, where e is chosen with gcd(e, φ(n)) > 1. The ciphertext of m ∈ ℤ*ₙ is c = Rₙ(mᵉ). What is the problem? No proof needed. (2 points)',
      ],
      note: '5 minutes.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exam 3',
      title: 'Solutions',
      steps: [
        '1. n = 55 = 5 · 11, so φ(55) = 4 · 10 = 40.',
        'd is the inverse of 27 modulo 40: 27 · 3 = 81 = 2 · 40 + 1, so d = 3.',
        'm = R₅₅(7³) = R₅₅(343) = 343 − 6 · 55 = 13.',
        '2. Theorem 5.16 needs gcd(e, |ℤ*ₙ|) = 1. Without it there is no d with $ed \\equiv_{\\varphi(n)} 1$, and x ↦ xᵉ is not injective on ℤ*ₙ.',
        'So different messages can have the same ciphertext, and even Alice cannot decrypt. Example: n = 15, e = 2, where 1² ≡₁₅ 4² ≡₁₅ 1.',
      ],
      note:
        'Finding d: 40 = 27 + 13, 27 = 2 · 13 + 1, so 1 = 3 · 27 − 2 · 40. As a check, R₅₅(13²⁷) = 7.',
    },

    // -- wrap ----------------------------------------------------------------------------------

    {
      kind: 'end',
      title: 'See you next week',
      points: [
        'Do the rest of sheet 9 and compare with the official solution.',
        'hserobyan@ethz.ch',
        'https://h-717.github.io/DM_HS26/',
      ],
    },

    // -- bonus easter egg: you found the slides after the end slide ----------------------------

    {
      kind: 'exercise',
      ref: 'Bonus',
      title: 'Old exams: order and injective homomorphisms',
      prompt: [
        '(HS 21) Let ⟨G; ⋆, ˆ, $e_G$⟩ and ⟨H; ⊙, ⁻¹, $e_H$⟩ be finite groups and ψ : G → H an injective group homomorphism.',
      ],
      parts: [
        'Prove that ord(x) = ord(ψ(x)) for all x ∈ G. You may use $\\psi(x^i) = \\psi(x)^i$ for all i ∈ ℤ. (4 points)',
        'Prove or disprove: there is an injective homomorphism from ℤ*₁₄ to ℤ₁₄. You may use 1. (4 points)',
      ],
      note: '6 minutes.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Bonus',
      title: 'Solutions',
      steps: [
        '1. For every i ≥ 1: $\\psi(x)^i = e_H \\iff \\psi(x^i) = \\psi(e_G) \\iff x^i = e_G$.',
        'The first step uses the hint and ψ($e_G$) = $e_H$ (Lemma 5.5 (i)). The second uses that ψ is injective, and ⟸ is applying ψ.',
        'So the same i ≥ 1 give the neutral element on both sides, and the least one is the same: ord(x) = ord(ψ(x)). Both are finite by Lemma 5.6.',
        '2. Disprove. In ℤ*₁₄ the powers of 3 are 3, 9, 13, 11, 5, 1, so ord(3) = 6.',
        'An injective homomorphism ψ would give ord(ψ(3)) = 6 by 1. But every order in ℤ₁₄ divides 14 (Cor. 5.9), and 6 does not divide 14.',
      ],
    },
  ],
};
