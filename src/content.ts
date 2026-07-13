// ---------------------------------------------------------------------------
// All personal/course content lives here. Nothing else in the app should
// need editing week to week — this is the one file to keep up to date.
// ---------------------------------------------------------------------------

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
  name: 'Hayk',

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
    name: 'Disk Math',
    semester: 'HS 2026',
    // Used for the `class TeachingAssistant { ... }` snippet on about-me.
    // One of: 'python' | 'java' | 'cpp' | 'javascript' | 'typescript' — or
    // any other string, which falls back to a generic pseudocode style.
    language: 'java',
  },

  // EDIT ME — weekly exercise session. Set to 'TBD' fields until scheduled.
  session: {
    day: 'TBD',
    time: 'TBD',
    room: 'TBD',
    notes: '',
  },

  // EDIT ME — links shown on about-me and in the taskbar/terminal.
  links: [
    { label: 'GitHub', url: '#' },
    { label: 'LinkedIn', url: '#' },
  ] as LinkItem[],

  // EDIT ME — 2-3 sentences, one string per paragraph.
  bio: [
    'Just here to do my best to help.',
    'Hope it helps :)',
  ],

  // EDIT ME EVERY WEEK — add one object per week. See README for an example
  // diff. Leave slidesUrl/exerciseUrl as '#' until you have a real file in
  // public/slides/.
  weeks: [
    {
      week: 1,
      topic: 'Introduction',
      date: '',
      slidesUrl: '/slides/week01-slides.pdf',
      exerciseUrl: '#',
    },
    {
      week: 2,
      topic: 'Topic 2',
      date: '',
      slidesUrl: '#',
      exerciseUrl: '#',
    },
  ] as Week[],

  // EDIT ME — recommended reading, cheatsheets, community links, etc.
  resourceSections: [
    {
      heading: 'Books',
      items: [{ label: 'Add a book here', url: '#' }],
    },
    {
      heading: 'Docs & cheatsheets',
      items: [{ label: 'Add a link here', url: '#' }],
    },
    {
      heading: 'Community',
      items: [{ label: 'Add a link here', url: '#' }],
    },
  ] as ResourceSection[],
};

export const osName = `${content.initials.toUpperCase()}OS`;
