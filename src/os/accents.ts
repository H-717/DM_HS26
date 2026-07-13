import type { AppId } from './types';

// One signature accent per app — carried through its icon, window title bar
// stripe, and content headings, so each window reads as its own place
// instead of six identical navy boxes. Terminal keeps classic terminal
// green; Trash stays neutral on purpose (it's meant to look unimportant).
export const ACCENT: Record<AppId, string> = {
  'about-me': 'var(--accent-amber)',
  slides: 'var(--accent-blue)',
  resources: 'var(--accent-green)',
  'office-hours': 'var(--accent-rose)',
  terminal: 'var(--accent-green)',
  trash: 'var(--accent-neutral)',
};
