// ---------------------------------------------------------------------------
// Week 13 — everything you say on screen lives in this file. Edit freely.
// See ./types.ts for the list of slide kinds and the text markup.
// ---------------------------------------------------------------------------

import type { Deck } from './types';

export const week13: Deck = {
  week: 13,
  topic: 'Prenex Form, Calculi & Resolution',
  date: 'Week 13',
  sheet: 'Exercise sheet 13 (HS 2025) — no graded exercise',

  slides: [
    {
      kind: 'title',
      title: 'Exercise Session 13',
      subtitle: 'The last one: derivations, resolution, and exam advice',
      footnote: 'Discrete Mathematics · HS 2026 · practising on sheet 13',
    },

    {
      kind: 'agenda',
      items: [
        '13.1 Warm-up',
        '13.3 Prenex normal form',
        '13.4 Formula or statement about formulas?',
        '13.5 The barber of Zurich',
        '13.6 Calculi: sound rules and a derivation',
        '13.7 Resolution',
        '13.8 A Hilbert-style derivation (exam)',
        'Exam advice',
      ],
      note: 'No graded exercise this week, so there is room. Leave the last 10 minutes for exam questions.',
    },

    // -- 13.1 ----------------------------------------------------------------

    {
      kind: 'solution',
      ref: '13.1',
      title: 'Warm-up',
      reveal: true,
      steps: [
        '**1.** F = P(x) ∧ ¬Q(y) and G = ¬Q(x) ∧ P(y) are **not** equivalent. Take P(1)=1, P(2)=0, Q(1)=Q(2)=0, with x ↦ 1, y ↦ 2.',
        'Then F = 1 ∧ 1 = 1 but G = 1 ∧ 0 = 0. Renaming free variables is not a harmless operation.',
        '**2.** Need H with x and y both free and ∀xH ≡ ∀yH. Take **H = (P(x) ∨ ¬P(x)) ∧ (P(y) ∨ ¬P(y))** — a tautology with both variables free, so both universal closures are ⊤.',
        '**3.** A calculus is **complete** if everything semantically implied can be syntactically derived: M ⊨ F ⇒ M ⊢ F, for all M and F.',
        'Sound is the converse implication. Keep saying both out loud until they stop swapping.',
      ],
    },

    // -- 13.3 ----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '13.3',
      title: 'Prenex Normal Form  (⋆)',
      prompt: ['Find an equivalent formula with all quantifiers in front.'],
      parts: [
        '( ∀x P(x) ) → Q(x)',
        '∀z∃y ( P(x, g(y), z) ∨ ¬∀x Q(x) ) ∧ ¬∀z∃x ¬R(f(x,z), z)',
      ],
      hint: ['Rename bound variables **first**, so that no bound variable clashes with a free one. Then pull quantifiers out.'],
    },

    {
      kind: 'solution',
      ref: '13.3',
      title: 'Rename, then pull out',
      reveal: true,
      steps: [
        '**1.** The x in Q(x) is **free**; the x in ∀x P(x) is bound. Rename the bound one: (∀y P(y)) → Q(x).',
        'A quantifier in the **antecedent** of → flips when pulled out: **∃y ( P(y) → Q(x) )**.',
        'Sanity check: "if everyone is happy then Q" is the same as "there is someone whose happiness implies Q". Odd in English, correct in logic.',
        '**2.** Same recipe. Rename the inner ∀x Q(x) to ∀w Q(w) and the second ∃x to ∃u.',
        'Push the two ¬ inward — ¬∀ becomes ∃, ¬∃ becomes ∀ — then pull every quantifier to the front, keeping the relative order of nested ones.',
        'Rule of thumb: negation flips a quantifier; so does crossing the antecedent of →. Nothing else does.',
      ],
    },

    // -- 13.4 ----------------------------------------------------------------

    {
      kind: 'solution',
      ref: '13.4',
      title: '13.4 · Formula, statement, or nonsense',
      reveal: true,
      steps: [
        '**1.** ∀x∃y ( P(z) ↔ Q(f(f(x,z),y)) ) — syntactically correct, and it is a **formula** (with z free).',
        '**2.** (∀x P(x)) ⊨ P(x) — a **statement about formulas**, and it is **true**: universal instantiation.',
        '**3.** (P(x) ⊨ P(x)) ≡ Q(x) — **not syntactically correct**. ≡ relates formulas, but the left-hand side is a statement, not a formula. Category error.',
        '**4.** {P(x), P(f(a))} ⊨ P(a) — a statement, and **false**. Take a universe where the assignment for x and the element f(a) satisfy P, but a itself does not.',
        'The recurring lesson of the whole chapter: ⊨, ≡ and ⊢ live *outside* the formula language. They can never appear inside a formula.',
      ],
    },

    // -- 13.5 ----------------------------------------------------------------

    {
      kind: 'solution',
      ref: '13.5',
      title: '13.5 · The barber of Zurich',
      reveal: true,
      steps: [
        'Suppose there is a barber b who shaves exactly those who do not shave themselves: ∀y ( shaves(b,y) ↔ ¬shaves(y,y) ).',
        'Instantiate y := b:  shaves(b,b) ↔ ¬shaves(b,b).',
        'That is F ↔ ¬F, which is unsatisfiable. So no such barber exists. ∎',
        'This is Russell’s paradox in a barbershop, and the same shape as Cantor’s diagonal in week 6.',
        'Whenever a definition lets an object be applied to itself, try substituting it into itself. That single move produces most of the classical paradoxes.',
      ],
    },

    // -- 13.6 ----------------------------------------------------------------

    {
      kind: 'exercise',
      ref: '13.6',
      title: 'Calculi',
      prompt: ['Which of R1–R6 are sound? Then derive formally, using only the sound ones.'],
      parts: [
        'R1 {F} ⊢ F∨G · R2 {F∧G} ⊢ F · R3 {¬(F∧G)} ⊢ ¬F∧¬G · R4 {F, F→G} ⊢ G · R5 {F→G} ⊢ ¬F→¬G · R6 {F,G} ⊢ F∧G',
        'Derive ((A∧B)∧C)∧D from { (D∧A)→C, A∧B, B∧A, (B∨C)→D }.',
        'Is K′ = {R2, R4} complete? Give a calculus that is complete but not sound.',
      ],
    },

    {
      kind: 'solution',
      ref: '13.6',
      title: '1 · Two rules are unsound',
      reveal: true,
      steps: [
        '**R3 is unsound**: ¬(F∧G) ≡ ¬F ∨ ¬G, not ¬F ∧ ¬G. Take F = 1, G = 0.',
        '**R5 is unsound**: that is the *converse*, not the contraposition — the same trap as exercise 2.1.2 back in week 2.',
        'R1, R2, R4 (modus ponens) and R6 are sound. ✓',
        'Nice symmetry: the two unsound rules are precisely the two classic errors from the first weeks. The course closes a loop here.',
      ],
    },

    {
      kind: 'solution',
      ref: '13.6',
      title: '2 · The derivation, line by line',
      reveal: true,
      steps: [
        '1. A∧B   [premise]',
        '2. A   [R2 on 1]',
        '3. B∧A   [premise] · 4. B   [R2 on 3]',
        '5. B∨C   [R1 on 4]',
        '6. (B∨C)→D   [premise] · 7. D   [R4 on 5, 6]',
        '8. D∧A   [R6 on 7, 2] · 9. (D∧A)→C   [premise] · 10. C   [R4 on 8, 9]',
        '11. (A∧B)∧C   [R6 on 1, 10] · 12. **((A∧B)∧C)∧D**   [R6 on 11, 7] ∎',
      ],
      note:
        'Point out that B∧A is a separate premise because R2 only extracts the *left* conjunct. That is why the sheet lists both A∧B and B∧A.',
    },

    {
      kind: 'solution',
      ref: '13.6',
      title: '3 and 4',
      reveal: true,
      steps: [
        '**3. K′ = {R2, R4} is not complete.** {A} ⊨ A∨B, but neither rule can ever introduce a ∨ that is not already present in a premise.',
        'Formally: every formula derivable from {A} is a subformula of A, and A∨B is not.',
        '**4. Complete but not sound**: the calculus with the single rule ∅ ⊢ F for **every** formula F.',
        'It derives everything, so it certainly derives everything true — complete. And it derives false things too — unsound. ∎',
        'This is why completeness alone is worthless. Soundness is the property that makes a derivation mean anything.',
      ],
    },

    // -- 13.7 ----------------------------------------------------------------

    {
      kind: 'callout',
      title: 'Resolution in one line',
      tone: 'info',
      body: [
        'From clauses {A, …} and {¬A, …} derive their union with A and ¬A removed.',
        'Derive the **empty clause** □ and the set is unsatisfiable.',
        'To show F is a tautology: refute ¬F. To show M ⊨ F: refute M ∪ {¬F}.',
        'Everything must be in CNF first, written as sets of clauses.',
      ],
    },

    {
      kind: 'solution',
      ref: '13.7',
      title: 'Three refutations',
      reveal: true,
      steps: [
        '**(i)** Clauses: {A,B}, {¬E}, {¬B,D}, {¬D,E}, {¬A,B}.',
        '{A,B} + {¬A,B} → {B}; {B} + {¬B,D} → {D}; {D} + {¬D,E} → {E}; {E} + {¬E} → **□**. Unsatisfiable ✓',
        '**(ii)** G is a tautology ⟺ ¬G unsatisfiable. ¬G in CNF: {B,C,¬D}, {B,D}, {¬C,¬D}, {¬B}.',
        '{¬B}+{B,D} → {D}; {¬B}+{B,C,¬D} → {C,¬D}; +{D} → {C}; +{¬C,¬D} → {¬D}; +{D} → **□** ✓',
        '**(iii)** M ∪ {¬H} with H = A∧C: {¬A,C}, {¬B,A}, {A,B}, and ¬H gives {¬A,¬C}.',
        '{A,B}+{¬B,A} → {A}; {A}+{¬A,C} → {C}; {A}+{¬A,¬C} → {¬C}; {C}+{¬C} → **□** ✓ ∎',
      ],
      note:
        'Have them call out the next resolution step rather than showing it. It is the most mechanical thing in the course and the easiest exam marks.',
    },

    // -- 13.8 ----------------------------------------------------------------

    {
      kind: 'solution',
      ref: '13.8',
      title: '13.8 · Derive A → C from {A→B, B→C} (exam FS 2025)',
      reveal: true,
      steps: [
        '1. B→C   [premise]',
        '2. (B→C) → (A→(B→C))   [R1 with F = B→C, G = A]',
        '3. A→(B→C)   [R3 (modus ponens) on 1, 2]',
        '4. (A→(B→C)) → ((A→B)→(A→C))   [R2 with F = A, G = B, H = C]',
        '5. (A→B)→(A→C)   [R3 on 3, 4]',
        '6. A→B   [premise] · 7. **A→C**   [R3 on 6, 5] ∎',
        'Strategy for Hilbert systems: work backwards from the goal, decide which axiom instance produces it, then build the premises for that instance.',
      ],
    },

    // -- exam ----------------------------------------------------------------

    {
      kind: 'points',
      title: 'For the exam',
      reveal: true,
      points: [
        'Six A4 pages of **handwritten** notes. Write them yourself — making them is most of the revision.',
        'Past exams are on the VIS collection. Do them under time pressure, not with the solutions open.',
        'Say which proof pattern you are using in the first line. Graders look for it.',
        'To disprove: one counterexample, clearly stated. Do not write an essay.',
        'Partial credit is real. A correct setup with a wrong computation beats a blank page.',
        'The four recurring skills: build a table, name the rule, find the witness, check the definition.',
      ],
      note: 'Adjust the details — page count, date, room — to whatever this year’s Moodle actually says before the session.',
    },

    {
      kind: 'title',
      title: 'Kahoot',
      subtitle: 'Last one · join at kahoot.it',
      footnote: 'Questions in kahoot/week13.csv',
    },

    {
      kind: 'end',
      title: 'That’s the semester',
      points: [
        'Thank you — genuinely. Turning up every week is the hard part and you did it.',
        'All 13 sessions stay on my site. Use them in January.',
        'I answer email during the exam period too: hserobyan@student.ethz.ch',
        'Good luck. You know more than you think you do.',
      ],
    },
  ],
};
