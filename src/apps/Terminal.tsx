import { useEffect, useRef, useState } from 'react';
import { osName } from '../content';
import { CLEAR_SIGNAL, runCommand } from './terminalCommands';
import type { AppId } from '../os/types';

interface Line {
  text: string;
  kind: 'in' | 'out';
}

interface TerminalAppProps {
  onOpenApp: (id: AppId) => void;
}

export function TerminalApp({ onOpenApp }: TerminalAppProps) {
  const [lines, setLines] = useState<Line[]>([
    { text: `${osName} terminal — type 'help' to get started`, kind: 'out' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    historyRef.current?.scrollTo({ top: historyRef.current.scrollHeight });
  }, [lines]);

  const submit = () => {
    const output = runCommand(input, { openApp: onOpenApp });
    if (output[0] === CLEAR_SIGNAL) {
      setLines([]);
    } else {
      setLines((prev) => [
        ...prev,
        { text: input, kind: 'in' },
        ...output.map((text) => ({ text, kind: 'out' as const })),
      ]);
    }
    setInput('');
  };

  return (
    <div className="terminal" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-history" ref={historyRef}>
        {lines.map((line, i) => (
          <div key={i} className={line.kind === 'in' ? 'terminal-line-in' : 'terminal-line-out'}>
            {line.kind === 'in' ? <span className="terminal-prompt">$ </span> : null}
            {line.text}
          </div>
        ))}
      </div>
      <div className="terminal-input-row">
        <span className="terminal-prompt">$</span>
        <input
          ref={inputRef}
          className="terminal-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') submit();
          }}
          autoFocus
          spellCheck={false}
          aria-label="Terminal input"
        />
      </div>
    </div>
  );
}
