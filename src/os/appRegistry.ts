import type { AppDef, AppId } from './types';

// Order here is the order icons appear on the desktop grid.
export const APP_ORDER: AppId[] = [
  'about-me',
  'slides',
  'resources',
  'office-hours',
  'terminal',
  'trash',
];

export const APPS: Record<AppId, AppDef> = {
  'about-me': {
    id: 'about-me',
    title: 'about-me.mdx',
    icon: 'about-me',
    fileLabel: 'about-me.mdx',
    fileMeta: '3.1 KB',
    fileNote: 'Modified: moments ago',
    defaultSize: { width: 560, height: 460 },
  },
  slides: {
    id: 'slides',
    title: 'slides/',
    icon: 'slides',
    fileLabel: 'slides/',
    fileMeta: 'folder',
    fileNote: 'Syncs weekly, allegedly',
    defaultSize: { width: 620, height: 440 },
  },
  resources: {
    id: 'resources',
    title: 'resources.md',
    icon: 'resources',
    fileLabel: 'resources.md',
    fileMeta: '1.8 KB',
    fileNote: 'Kind: mostly opinions',
    defaultSize: { width: 520, height: 460 },
  },
  'office-hours': {
    id: 'office-hours',
    title: 'office-hours.ics',
    icon: 'office-hours',
    fileLabel: 'office-hours.ics',
    fileMeta: '0.4 KB',
    fileNote: 'Subject to change',
    defaultSize: { width: 420, height: 340 },
  },
  terminal: {
    id: 'terminal',
    title: 'terminal.app',
    icon: 'terminal',
    fileLabel: 'terminal.app',
    fileMeta: 'executable',
    fileNote: 'Handle with care',
    defaultSize: { width: 560, height: 380 },
  },
  trash: {
    id: 'trash',
    title: 'Trash',
    icon: 'trash',
    fileLabel: 'Trash',
    fileMeta: '2 items',
    fileNote: "Don't look",
    defaultSize: { width: 420, height: 320 },
  },
};
