import { APPS, APP_ORDER } from '../os/appRegistry';
import { content } from '../content';
import type { AppId } from '../os/types';

const JOKES = [
  'Why do programmers prefer dark mode? Because light attracts bugs.',
  "There are only 10 types of people: those who understand binary and those who don't.",
  'A student asked for extra time on the deadline. I said sure — take O(1) more days.',
  '99 little bugs in the code, 99 little bugs. Take one down, patch it around... 127 little bugs in the code.',
  'How do you comfort a bug? You console it.',
  'Why did the programmer go broke? He used up all his cache.',
  'What do you call 8 hobbits? A hobbyte.',
];

export interface TerminalApi {
  openApp: (id: AppId) => void;
}

export const CLEAR_SIGNAL = '__CLEAR__';

function matchApp(query: string): AppId | undefined {
  const q = query.trim().toLowerCase().replace(/\/$/, '');
  return APP_ORDER.find((id) => {
    const label = APPS[id].fileLabel.toLowerCase().replace(/\/$/, '');
    return label === q || id === q || label.startsWith(q);
  });
}

export function runCommand(raw: string, api: TerminalApi): string[] {
  const trimmed = raw.trim();
  if (!trimmed) return [];
  const [cmd, ...rest] = trimmed.split(/\s+/);
  const arg = rest.join(' ');

  switch (cmd.toLowerCase()) {
    case 'help':
      return [
        'available commands:',
        '  help            show this list',
        '  whoami          print a short bio',
        '  ls              list desktop files',
        '  open <file>     open a file/app window',
        '  contact         print contact email',
        '  joke            tell a joke',
        '  clear           clear the terminal',
      ];
    case 'whoami':
      return [
        `${content.name} — TA for ${content.course.name}, ${content.course.semester}`,
        ...content.bio,
      ];
    case 'ls':
      return APP_ORDER.map((id) => APPS[id].fileLabel);
    case 'open': {
      if (!arg) return ['usage: open <file>'];
      const match = matchApp(arg);
      if (!match) return [`open: ${arg}: no such file`];
      api.openApp(match);
      return [`opening ${APPS[match].fileLabel}...`];
    }
    case 'contact':
      return [content.email];
    case 'joke':
      return [JOKES[Math.floor(Math.random() * JOKES.length)]];
    case 'clear':
      return [CLEAR_SIGNAL];
    case 'sudo':
      return ["nice try — this isn't that kind of OS."];
    default:
      return [`command not found: ${cmd}. type 'help' for a list of commands.`];
  }
}
