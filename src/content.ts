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
  exerciseUrl: string;
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
  email: 'hserobyan@student.ethz.ch',

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
    room: 'TBD',
    notes:
      'Room follows once the groups are assigned on Moodle — sign up there. ' +
      'Groups are capped at 25.',
  },

  // EDIT ME — links shown on about-me and in the taskbar/terminal.
  links: [
    { label: 'GitHub', url: 'https://github.com/H-717' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/hayk-serobyan-877aa9403/' },
  ] as LinkItem[],

  // EDIT ME — 2-3 sentences, one string per paragraph.
  bio: [
    'I took Discrete Mathematics as a first-year student, so I remember which ' +
      'parts actually hurt — and which ones only look scary.',
    'My sessions are short on lecturing and long on solving things together. ' +
      'Interrupt me whenever something does not land.',
    'Stuck the night before a deadline? Email me. I would much rather answer ' +
      'a question at 23:00 than grade a blank page.',
  ],

  // EDIT ME EVERY WEEK — add one object per week. See README for an example
  // diff. Point slidesUrl at '#/slides/<week>' once the deck is registered
  // in src/slides/index.ts; use '#' until the exercise sheet is published.
  weeks: [
    {
      week: 1,
      topic: 'Statements, Proofs & Propositional Logic',
      date: '',
      slidesUrl: '#/slides/1',
      exerciseUrl: '#',
    },
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
          note: 'Worth a rewatch at 1.5× before the exam.',
        },
        {
          label: 'Information Security & Cryptography group',
          url: 'https://crypto.ethz.ch/teaching/',
          note: 'Where the course material has historically lived.',
        },
      ],
    },
    {
      heading: 'Extra reading',
      items: [
        {
          label: 'Maurer — Discrete Mathematics (the script)',
          url: 'https://moodle-app2.let.ethz.ch/',
          note: 'On Moodle. Ch. 2 logic, 3 sets, 4 number theory, 5 algebra, 6 logic again.',
        },
        {
          label: 'Rosen — Discrete Mathematics and Its Applications',
          url: 'https://search.library.ethz.ch/',
          note: 'Available through the ETH library. Good for extra drill problems.',
        },
        {
          label: 'A former student’s notes on the whole course',
          url: 'https://cs.shivi.io/01-Semesters-(BSc)/Semester-1/Discrete-Maths/',
          note: 'Lecture-by-lecture write-ups. Not official — but genuinely good.',
        },
      ],
    },
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
          note: 'Study rooms, exam prep events, and people to work with.',
        },
      ],
    },
  ] as ResourceSection[],
};

export const osName = `${content.initials.toUpperCase()}OS`;

// Single source of truth for the version shown in the site footer — bump
// package.json's "version" field to change it everywhere it's displayed.
export const version = `v${pkgVersion}`;
