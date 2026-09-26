// ---------------------------------------------------------------------------
// All personal/course content lives here. Nothing else in the app should
// need editing week to week — this is the one file to keep up to date.
//
// The slide decks are the one exception, and they follow the same rule:
// one file per week in src/slides/, registered in src/slides/index.ts.
// ---------------------------------------------------------------------------

import { version as pkgVersion } from '../package.json';

export interface Week {
  week: number;
  topic: string;
  date?: string;
  slidesUrl: string;
}

export interface LinkItem {
  label: string;
  url: string;
}

export interface ResourceItem {
  label: string;
  url: string;
  note?: string;
}

export interface ResourceSection {
  heading: string;
  items: ResourceItem[];
}

export const content = {
  // EDIT ME — your name.
  name: 'Hayk Serobyan',

  // EDIT ME — two initials used to build the OS name shown in the boot
  // screen and taskbar, e.g. 'YN' -> 'YNOS'.
  initials: 'HS',

  // EDIT ME — your ETH email.
  email: 'hserobyan@ethz.ch',

  // EDIT ME — shown in the site footer.
  school: 'ETH Zurich',
  framework: 'React + Vite',

  // EDIT ME — the course you TA for.
  course: {
    name: 'Discrete Mathematics',
    semester: 'HS 2026',
    // Used for the `class TeachingAssistant { ... }` snippet on about-me.
    // One of: 'python' | 'java' | 'cpp' | 'javascript' | 'typescript' — or
    // any other string, which falls back to a generic pseudocode style.
    language: 'java',
  },

  // EDIT ME — weekly exercise session. Set to 'TBD' fields until scheduled.
  session: {
    day: 'Monday',
    time: '16:15 – 18:00',
    bonustie: '18:10 - 20:00 (bonus)',
    room: 'CHN D 46',
    notes:
      'Room follows once the groups are assigned on Moodle — sign up there. ',
  },

  // EDIT ME — links shown on about-me and in the taskbar/terminal.
  links: [
    { label: 'GitHub', url: 'https://github.com/H-717' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/hayk-serobyan-877aa9403/' },
  ] as LinkItem[],

  // EDIT ME — 2-3 sentences, one string per paragraph.
  bio: [
    'I took Discrete Mathematics as a first-year student myself, ' +
    'it\'s ok if you don\'t understand everything directly. ' +
      'Interrupt me whenever something does not land.',
    'Email me if you have any questions.',
  ],

  // EDIT ME EVERY WEEK — add one object per week. See README for an example
  // diff. Point slidesUrl at '#/slides/<week>' once the deck is registered
  // in src/slides/index.ts; use '#' until the deck exists.
  weeks: [
    { week: 1, topic: 'Statements, Proofs & Propositional Logic', slidesUrl: '#/slides/1' },
    { week: 2, topic: 'Logical Consequence, Satisfiability & Quantifiers', slidesUrl: '#/slides/2' },
    // { week: 3, topic: 'Predicate Logic & Proof Patterns', slidesUrl: '#/slides/3' },
    // { week: 4, topic: 'Sets, Power Sets & the Pigeonhole Principle', slidesUrl: '#/slides/4' },
    // { week: 5, topic: 'Relations & Equivalence Classes', slidesUrl: '#/slides/5' },
    // { week: 6, topic: 'Orders, Functions & Countability', slidesUrl: '#/slides/6' },
    // { week: 7, topic: 'Number Theory: gcd, Congruences & Modular Arithmetic', slidesUrl: '#/slides/7' },
    // { week: 8, topic: 'Monoids, Groups & Homomorphisms', slidesUrl: '#/slides/8' },
    // { week: 9, topic: 'Cyclic Groups, Diffie–Hellman, RSA & Rings', slidesUrl: '#/slides/9' },
    // { week: 10, topic: 'Fields, Polynomials & Finite Fields', slidesUrl: '#/slides/10' },
    // { week: 11, topic: 'Error-Correcting Codes & Proof Systems', slidesUrl: '#/slides/11' },
    // { week: 12, topic: 'Normal Forms & the Semantics of Predicate Logic', slidesUrl: '#/slides/12' },
    // { week: 13, topic: 'Prenex Form, Calculi & Resolution', slidesUrl: '#/slides/13' },
  ] as Week[],

  // EDIT ME — recommended reading, cheatsheets, community links, etc.
  resourceSections: [
    {
      heading: 'Course',
      items: [
        {
          label: 'Moodle — 252-0025-01L Diskrete Mathematik',
          url: 'https://moodle-app2.let.ethz.ch/',
          note: 'Exercise sheets, solutions, the script, and submissions.',
        },
        {
          label: 'Lecture recordings — ETH video portal',
          url: 'https://video.ethz.ch/lectures.html',
          note: 'In case you missed it, all videos are here.',
        },
        // {
        //   label: 'Information Security & Cryptography group',
        //   url: 'https://crypto.ethz.ch/teaching/',
        //   note: 'Where the course material has historically lived.',
        // },
      ],
    },
    // {
    //   heading: 'Extra reading',
    //   items: [
    //     {
    //       label: 'Maurer — Discrete Mathematics (the script)',
    //       url: 'https://moodle-app2.let.ethz.ch/',
    //       note: 'On Moodle. Ch. 2 logic, 3 sets, 4 number theory, 5 algebra, 6 logic again.',
    //     },
    //     {
    //       label: 'Rosen — Discrete Mathematics and Its Applications',
    //       url: 'https://search.library.ethz.ch/',
    //       note: 'Available through the ETH library. Good for extra drill problems.',
    //     },
    //     {
    //       label: 'A former student’s notes on the whole course',
    //       url: 'https://cs.shivi.io/01-Semesters-(BSc)/Semester-1/Discrete-Maths/',
    //       note: 'Lecture-by-lecture write-ups. Not official — but genuinely good.',
    //     },
    //   ],
    // },
    {
      heading: 'Exam prep',
      items: [
        {
          label: 'VIS exam collection',
          url: 'https://exams.vis.ethz.ch/',
          note: 'Past exams. Start them earlier than you think you should.',
        },
        {
          label: 'VIS — Verein der Informatik Studierenden',
          url: 'https://vis.ethz.ch/',
          note: 'Study rooms, exam prep events, and more.',
        },
      ],
    },
  ] as ResourceSection[],
};

export const osName = `${content.initials.toUpperCase()}OS`;

// Single source of truth for the version shown in the site footer — bump
// package.json's "version" field to change it everywhere it's displayed.
export const version = `v${pkgVersion}`;
