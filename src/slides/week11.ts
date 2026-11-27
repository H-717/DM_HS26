// ---------------------------------------------------------------------------
// Week 11 — everything you say on screen lives in this file. Edit freely.
// See ./types.ts for the list of slide kinds and the text markup.
//
// Built on the HS2026 sheet 11 and its graded solution.
// Lecture (Moodle roadmap, checked 2026-11-27): the confirmed part still ends
// at §5.5–5.6 (Nov 16). §5.7–5.8 (Nov 18) and §5.9 (Nov 23, codes) are listed
// under "Plan", and Nov 25 is not listed at all. Sheet 11 and its interview
// (week of Nov 30) are on proof systems, so the deck assumes §5.9 and
// §6.1–6.2 were seen, and nothing from §6.3 on (calculi, propositional logic).
//
// Each exercise is a twin of one on the sheet — same shape, other content:
//   Exercise 1 ↔ 11.1   Exercise 2 ↔ 11.2   Exercise 3 ↔ 11.3
// 11.4 is the graded interview exercise and is not touched anywhere: no RSA,
// no proof systems on encrypted or otherwise transformed statements, no proof
// that contains a decryption exponent, no combining of two verification
// functions on the same S, and no pair of a sound-but-incomplete and a
// complete-but-unsound system for the same τ (so Example 6.3 is shown without
// variants). Def. 6.2 (sound) is quoted in the recap like every other
// definition, because 11.1–11.3 and the exam block cannot be done without it.
// Nothing on screen asks for it.
// 11.5 is the sheet's own exam block (FS 2024) and is not used. 11.6 is the
// optional hand-in and is not used.
// Nothing on screen names a sheet exercise.
// The exam block is from the local official exams (file names = semester):
// HS20 4c, HS21 4d (asked again as FS22 4d), HS22 4c, and HS22 3e as the
// bonus. FS21 4a.7 is skipped: it is 11.2.1. The short questions on
// derivation rules (HS20 4a.2–3, FS21 4a.6, HS21 4a.5–6) need calculi (§6.4)
// and are skipped. None of the exams asks about codes. HS23 and FS24 are
// skipped (latest). None of these were used in weeks 6–10.
// Every number and claim was brute-forced in Python.
// ---------------------------------------------------------------------------

import type { Deck } from './types';

export const week11: Deck = {
  week: 11,
  topic: 'Error-Correcting Codes & Proof Systems',
  date: 'Mon 30 Nov 2026',
  sheet: 'Exercise sheet 11',

  slides: [
    {
      kind: 'title',
      title: 'Exercise Session 11',
      subtitle: 'Error-correcting codes and proof systems',
      footnote: 'Discrete Mathematics · HS 2026 · Group Q · CHN D 46',
    },

    {
      kind: 'agenda',
      title: 'Today',
      items: [
        'Recap: error-correcting codes',
        'One decoding, step by step',
        'A linear code over GF(2)',
        'Recap: proof systems',
        'Uniqueness and combining proof systems',
        'A proof system for a common key',
        'Old exam questions',
      ],
      note:
        'Timing: 3 intro · 4 recap · 2 decoding · 8 linear code · 4 recap · 10 uniqueness and combining (break here, about 31 min) · 8 common key · 5 small proof system · 10 combining. That is about 54 min, plus the bonus after the end slide if there is time.',
    },

    // -- recap: error-correcting codes ---------------------------------------------------

    {
      kind: 'points',
      title: 'Error-correcting codes (script §5.9.1–5.9.2)',
      points: [
        'Def. 5.35: an (n, k)-encoding function for an alphabet A is an injective function E: Aᵏ → Aⁿ with n > k. C = Im(E) is called an error-correcting code, and its elements are the codewords.',
        'Def. 5.37: the Hamming distance d(u, v) of two strings of equal length is the number of positions at which they differ.',
        'Def. 5.38: the minimum distance $d_{\\min}(C)$ is the minimum of the Hamming distance between any two different codewords.',
        'Def. 5.40: a decoding function D: Aⁿ → Aᵏ is t-error correcting if D(r) = (a₀, …, aₖ₋₁) for every r with Hamming distance at most t from E((a₀, …, aₖ₋₁)). C is t-error correcting if there are such E and D with C = Im(E).',
        'Theorem 5.41: a code C with minimum distance d is t-error correcting if and only if d ≥ 2t + 1. The decoding function sends r to a nearest codeword.',
      ],
      note:
        '4 minutes. Theorem 5.42 (codes from polynomial evaluation, minimum distance n − k + 1) is in the script but not needed today. If someone asks: it is Lemma 5.32 from last week, two different polynomials of degree < k agree in fewer than k points.',
    },

    {
      kind: 'points',
      title: 'One decoding, step by step (script Example 5.66)',
      lead: 'C = {00000, 11100, 00111, 11011} has minimum distance 3, so by Theorem 5.41 it corrects 1 error (Example 5.67). We decode to a nearest codeword.',
      reveal: true,
      points: [
        'Received r = 10100. Its distances to 00000, 11100, 00111 and 11011 are 2, 1, 3 and 4.',
        'The only codeword within distance 1 is 11100, so r is decoded to 11100.',
        'Now 00000 is sent and two positions are flipped: r = 11000. Its distances are 2, 1, 5 and 2.',
        'The nearest codeword is 11100, not 00000. Two errors are more than this code can correct: 3 < 2 · 2 + 1.',
      ],
      note: '2 minutes. The second case is the situation of part 3 in the next exercise.',
    },

    // -- a linear code over GF(2) --------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 1',
      title: 'A linear code over GF(2)',
      prompt: [
        'Let E: GF(2)³ → GF(2)⁶ with E(a, b, c) = (a, b, c, a + b, a + c, b + c), and let C = Im(E). The Hamming weight hw(w) of a word w is the number of its non-zero positions.',
      ],
      parts: [
        'Show that c₁ + c₂ ∈ C for all c₁, c₂ ∈ C (added position by position), and that d(c₁, c₂) = hw(c₁ + c₂).',
        'Compute $d_{\\min}(C)$. How many errors can C correct?',
        'Take a decoding function that corrects 1 error. Is there a codeword c for which it also corrects any 2 errors?',
      ],
      note: '8 minutes. Write codewords as strings, so E(1, 0, 0) = 100110.',
    },

    {
      kind: 'table',
      solution: 'Exercise 1',
      title: 'Exercise 1: all eight codewords',
      lead: 'The marked rows have the smallest non-zero weight.',
      headers: ['(a, b, c)', 'E(a, b, c)', 'hw'],
      rows: [
        ['(0, 0, 0)', '000000', '0'],
        ['(0, 0, 1)', '001011', '3'],
        ['(0, 1, 0)', '010101', '3'],
        ['(0, 1, 1)', '011110', '4'],
        ['(1, 0, 0)', '100110', '3'],
        ['(1, 0, 1)', '101101', '4'],
        ['(1, 1, 0)', '110011', '4'],
        ['(1, 1, 1)', '111000', '3'],
      ],
      markRows: [1, 2, 4, 7],
      note: 'Exactly one of a, b, c equal to 1 gives weight 3, two give weight 4, and all three give 111000, weight 3 again.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 1',
      title: 'Solutions',
      steps: [
        "1. E(a, b, c) + E(a′, b′, c′) = (a + a′, b + b′, c + c′, (a + a′) + (b + b′), (a + a′) + (c + c′), (b + b′) + (c + c′)) = E(a + a′, b + b′, c + c′), by commutativity and associativity of + in GF(2). So the sum is in C.",
        'Two words differ at a position exactly when their difference is non-zero there. In GF(2) we have −1 = 1, so c₁ − c₂ = c₁ + c₂ and d(c₁, c₂) = hw(c₁ + c₂).',
        '2. For c₁ ≠ c₂, c₁ + c₂ is a non-zero codeword by 1. Conversely, every codeword c ≠ 000000 has d(c, 000000) = hw(c). So $d_{\\min}(C)$ is the smallest weight of a non-zero codeword.',
        'By the table it is 3, for example hw(100110) = 3. Since 3 ≥ 2 · 1 + 1 and 3 < 2 · 2 + 1, Theorem 5.41 says that C is 1-error correcting but not 2-error correcting.',
        "3. No. Let c ∈ C and c′ = c + 100110, which is in C by 1. Then d(c, c′) = hw(100110) = 3, and c and c′ differ exactly at positions 1, 4 and 5.",
        "Flip positions 1 and 4 of c and call the result r. Then d(c, r) = 2 and d(c′, r) = 1.",
        "The decoding function corrects 1 error, so it decodes r to c′ (Def. 5.40). So it does not decode r to c, and these 2 errors in c are not corrected. Since c was arbitrary, no codeword works.",
      ],
      note:
        'Example for c = 000000: c′ = 100110 and r = 100100. Part 3 works the same way for every code that is closed under +: adding a codeword of smallest weight to c gives a codeword at distance exactly d_min from c.',
    },

    // -- recap: proof systems ------------------------------------------------------------

    {
      kind: 'points',
      title: 'Proof systems (script §6.2.1–6.2.2)',
      points: [
        'Def. 6.1: a proof system is a quadruple Π = (S, P, τ, φ). S is a set of statements, P a set of proofs, τ: S → {0, 1} is the truth function and φ: S × P → {0, 1} is the verification function. φ(s, p) = 1 means that p is a valid proof for s.',
        'Def. 6.2: Π is sound if no false statement has a proof, i.e., if for all s ∈ S for which there exists p ∈ P with φ(s, p) = 1, we have τ(s) = 1.',
        'Def. 6.3: Π is complete if every true statement has a proof, i.e., if for all s ∈ S with τ(s) = 1, there exists p ∈ P with φ(s, p) = 1.',
        'Example 6.3: τ(s) = 1 if and only if n(s) is not prime, and φ(s, p) = 1 if and only if n(s) = 0, or n(s) = 1, or n(p) divides n(s) and 1 < n(p) < n(s). This proof system is sound and complete.',
        'To show sound, take s and p with φ(s, p) = 1 and show τ(s) = 1. To show complete, take s with τ(s) = 1 and find a p. To disprove either one, a single statement s is enough.',
      ],
      note:
        '4 minutes. The script also asks for φ to be efficiently computable, but does not make that formal (§6.2.1). Two extreme cases are worth saying out loud: if φ is always 0, Π is sound, and if τ is always 0, Π is complete. Both come up today.',
    },

    // -- uniqueness and combining proof systems -------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 2',
      title: 'Uniqueness and combining proof systems',
      prompt: [
        'Prove or disprove each statement. In 2 and 3, Π₁ = (S₁, P₁, τ₁, φ₁) and Π₂ = (S₂, P₂, τ₂, φ₂) are proof systems, combined into Π₃ = (S₁ × S₂, P₁ × P₂, τ₃, φ₃) with τ₃(s₁, s₂) = 1 if and only if τ₁(s₁) = 1 and τ₂(s₂) = 1, and φ₃((s₁, s₂), (p₁, p₂)) = 1 if and only if φ₁(s₁, p₁) = 1 and φ₂(s₂, p₂) = 1.',
      ],
      parts: [
        'For any non-empty sets S and P and any function τ: S → {0, 1}, there is a unique function φ: S × P → {0, 1} such that Π = (S, P, τ, φ) is sound and complete.',
        'If Π₁ and Π₂ are sound, then Π₃ is sound.',
        'If Π₃ is complete, then Π₁ is complete.',
      ],
      note: '10 minutes. For 1, first find one φ that always works, then ask whether there could be a second one.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 2',
      title: 'Solutions',
      steps: [
        '1. False. A φ always exists: let φ(s, p) = τ(s) for all p. If φ(s, p) = 1, then τ(s) = 1, so Π is sound (Def. 6.2). If τ(s) = 1, then any p ∈ P is a proof, and P ≠ ∅, so Π is complete (Def. 6.3).',
        'But it need not be unique. Take S = {s}, P = {p, q} and τ(s) = 1. Then φ with φ(s, p) = φ(s, q) = 1 and φ′ with φ′(s, p) = 1, φ′(s, q) = 0 both give a sound and complete proof system.',
        '2. True. Let φ₃((s₁, s₂), (p₁, p₂)) = 1. Then φ₁(s₁, p₁) = 1 and φ₂(s₂, p₂) = 1.',
        'Since Π₁ and Π₂ are sound, τ₁(s₁) = 1 and τ₂(s₂) = 1. So τ₃(s₁, s₂) = 1, and Π₃ is sound.',
        '3. False. Let S₁ = S₂ = P₁ = P₂ = {0}, with τ₁(0) = 1, φ₁(0, 0) = 0, and τ₂(0) = 0, φ₂(0, 0) = 0.',
        'Π₁ is not complete: 0 is true and has no proof. But τ₃(0, 0) = 0, so Π₃ has no true statement at all and is complete.',
      ],
      note:
        'In 1, a true statement can have many proofs, so there is room to choose φ. With |P| = 1, or with τ always 0, φ is unique.',
    },

    // -- a proof system for a common key -------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exercise 3',
      title: 'A proof system for a common key',
      prompt: [
        'Let G = ⟨ℤ*ₚ; ⊙ₚ⟩ with p prime and generator g, and let n = p − 1 be its order. For x ∈ ℤₙ, gˣ is well defined, since gⁿ = 1.',
        'Alice, Bob and Carol choose $x_A, x_B, x_C \\in \\mathbb{Z}_n$ and publish $y_A = g^{x_A}$, $y_B = g^{x_B}$ and $y_C = g^{x_C}$. Their common key is $g^{x_A x_B x_C}$.',
        'Let S = G⁴, where $\\tau(y_A, y_B, y_C, k) = 1$ if and only if there are $x_A, x_B, x_C \\in \\mathbb{Z}_n$ with $y_A = g^{x_A}$, $y_B = g^{x_B}$, $y_C = g^{x_C}$ and $k = g^{x_A x_B x_C}$.',
        'Let P = ℤₙ × ℤₙ. Define φ: S × P → {0, 1} such that Π = (S, P, τ, φ) is sound and complete, and prove it.',
      ],
      note: '8 minutes. If the room is stuck: two of the three exponents are enough as a proof.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exercise 3',
      title: 'Solution',
      steps: [
        'Define $\\varphi((y_A, y_B, y_C, k), (a, b)) = 1$ if and only if $g^a = y_A$, $g^b = y_B$ and $y_C^{ab} = k$.',
        'Complete (Def. 6.3): let $\\tau(y_A, y_B, y_C, k) = 1$, with $x_A, x_B, x_C$ as in the definition of τ. Take $(a, b) = (x_A, x_B)$. Then $g^a = y_A$, $g^b = y_B$ and $y_C^{ab} = (g^{x_C})^{x_A x_B} = g^{x_A x_B x_C} = k$.',
        'Sound (Def. 6.2): let $\\varphi((y_A, y_B, y_C, k), (a, b)) = 1$. Since g is a generator, there is $x_C \\in \\mathbb{Z}_n$ with $g^{x_C} = y_C$.',
        'Then $k = y_C^{ab} = g^{x_C a b} = g^{a b x_C}$. So $x_A = a$, $x_B = b$ and this $x_C$ show that $\\tau(y_A, y_B, y_C, k) = 1$.',
      ],
      note:
        'With a single exponent as the proof, checking k would mean computing g^(x_B x_C) from y_B and y_C alone. That is the Diffie–Hellman problem, believed to be hard, and φ has to be efficiently computable. Small check in ℤ*₁₁ with g = 2: the statement (8, 5, 7, 5) has the proof (3, 4), since 2³ = 8, 2⁴ = 5 and 7¹² = 7² = 5.',
    },

    // -- old exam ------------------------------------------------------------------------------

    {
      kind: 'exercise',
      ref: 'Exam 1',
      title: 'Old exams: a small proof system',
      prompt: [
        '(HS 20) Let S = {2, 3, 5, 7, 9} and P = ℕ \\ {0, 1}. For all s ∈ S and all p ∈ P, let τ(s) = 1 if and only if s is not prime, and φ(s, p) = 1 if and only if p² | s.',
        'Is the proof system (S, P, τ, φ) sound? Is it complete? Justify both of your answers. (4 points)',
      ],
      note: '5 minutes.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exam 1',
      title: 'Solution',
      steps: [
        'Sound. Let φ(s, p) = 1, so p² | s. Then p | s, and 1 < p < p² ≤ s since p ≥ 2. So s has a divisor strictly between 1 and s. Hence s is not prime, and τ(s) = 1.',
        'Complete. 2, 3, 5 and 7 are prime, so 9 is the only true statement in S. It has the proof 3, since 3² = 9 divides 9.',
      ],
      note: 'Completeness depends on the small S. For S = ℕ \\ {0, 1} it fails: 6 is not prime, but no p² with p ≥ 2 divides 6.',
    },

    {
      kind: 'exercise',
      ref: 'Exam 2',
      title: 'Old exams: combining proof systems',
      prompt: [
        'Let Π₁ = (S₁, P₁, τ₁, φ₁) and Π₂ = (S₂, P₂, τ₂, φ₂) be two proof systems. We combine them into a third proof system Π₃ = (S₁ × S₂, P₁ × P₂, τ₃, φ₃).',
      ],
      parts: [
        '(HS 21) τ₃(s₁, s₂) = 1 if and only if τ₁(s₁) = 1 or τ₂(s₂) = 1, and φ₃((s₁, s₂), (p₁, p₂)) = 1 if and only if φ₁(s₁, p₁) = 1 or φ₂(s₂, p₂) = 1. Prove or disprove: if Π₃ is complete, then Π₁ or Π₂ is complete. (4 points)',
        '(HS 22) τ₃(s₁, s₂) = 1 if and only if τ₁(s₁) ≠ τ₂(s₂), and φ₃((s₁, s₂), (p₁, p₂)) = 1 if and only if φ₁(s₁, p₁) ≠ φ₂(s₂, p₂). Prove or disprove: if Π₃ is complete, then Π₁ or Π₂ is complete. (5 points)',
      ],
      note: '10 minutes. The first one was asked twice, in HS 21 and again in FS 22.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Exam 2',
      title: 'Solutions',
      steps: [
        '1. True. We prove the contrapositive, so suppose that neither Π₁ nor Π₂ is complete.',
        'Then there is s₁ ∈ S₁ with τ₁(s₁) = 1 and φ₁(s₁, p₁) = 0 for all p₁ ∈ P₁, and there is s₂ ∈ S₂ with τ₂(s₂) = 1 and φ₂(s₂, p₂) = 0 for all p₂ ∈ P₂.',
        'So τ₃(s₁, s₂) = 1, but φ₃((s₁, s₂), (p₁, p₂)) = 0 for all (p₁, p₂) ∈ P₁ × P₂. Hence Π₃ is not complete.',
        '2. False. Let S₁ = S₂ = P₁ = P₂ = {0}, with τ₁(0) = τ₂(0) = 1 and φ₁(0, 0) = φ₂(0, 0) = 0.',
        'Neither Π₁ nor Π₂ is complete: 0 is true and has no proof. But τ₃(0, 0) = 0, since τ₁(0) = τ₂(0). So Π₃ has no true statement and is complete.',
      ],
      note: 'The second one is the same trick as part 3 of Exercise 2: a proof system without true statements is complete.',
    },

    // -- wrap ----------------------------------------------------------------------------------

    {
      kind: 'end',
      title: 'See you next week',
      points: [
        'Do the rest of sheet 11 and compare with the official solution.',
        'hserobyan@ethz.ch',
        'https://h-717.github.io/DM_HS26/',
      ],
    },

    // -- bonus easter egg: you found the slides after the end slide ----------------------------

    {
      kind: 'exercise',
      ref: 'Bonus',
      title: 'Old exams: an equation in a field with 32 elements',
      prompt: [
        '(HS 22) Let p(x) ∈ ℤ₂[x] be an irreducible polynomial of degree 5. Consider the field $F = \\mathbb{Z}_2[x]_{p(x)}$. How many solutions (a, b) ∈ F × F does the equation a² + b² + ab = 0 have? (6 points)',
      ],
      hint: ['(a − b)(a² + b² + ab) = a³ − b³.'],
      note: '6 minutes. The hint was part of the exam.',
    },

    {
      kind: 'solution',
      reveal: true,
      ref: 'Bonus',
      title: 'Solution',
      steps: [
        'Exactly one, namely (0, 0). F has 2⁵ = 32 elements (Lemma 5.34), so F* = F \\ {0} is a group of order 31 (Def. 5.26, Lemma 5.18).',
        'If a = b, the equation says a² + a² + a² = 0. Since 1 + 1 + 1 = 1 in ℤ₂, this is a² = 0, and a = 0 because a field has no zerodivisors (Theorem 5.24).',
        'If a ≠ b, multiply by a − b ≠ 0. By the hint, a³ − b³ = 0, so a³ = b³. If b = 0, then a³ = 0 and a = 0 = b, a contradiction. So a, b ∈ F*.',
        'Let u = ab⁻¹. Then u³ = 1, so ord(u) ≤ 3 (Def. 5.12). By Cor. 5.9, ord(u) divides 31, so ord(u) = 1. Then u = 1, that is a = b, a contradiction.',
        'So the only solution is a = b = 0, and (0, 0) is indeed a solution.',
      ],
      note: 'The choice of p(x) never matters: only |F*| = 31 and the fact that 3 does not divide 31 are used.',
    },
  ],
};
