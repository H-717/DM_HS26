import { useEffect, useState } from 'react';
import { APPS } from './appRegistry';
import { ACCENT } from './accents';
import { osName } from '../content';
import { useWindowManager } from './WindowManagerContext';
import type { AppId } from './types';

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 15);
    return () => clearInterval(t);
  }, []);
  return now;
}

function formatTime(d: Date): string {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

interface TaskbarProps {
  onWebsiteMode: () => void;
}

export function Taskbar({ onWebsiteMode }: TaskbarProps) {
  const { windows, toggleWindow } = useWindowManager();
  const now = useClock();

  const openIds = (Object.keys(windows) as AppId[]).filter((id) => windows[id]?.isOpen);

  return (
    <div className="taskbar">
      <div className="taskbar-left">
        <span className="taskbar-logo">{osName}</span>
        <div className="taskbar-open-windows">
          {openIds.map((id) => {
            const win = windows[id];
            const def = APPS[id];
            return (
              <button
                key={id}
                type="button"
                className={`taskbar-win-btn${win?.minimized ? ' is-minimized' : ''}`}
                onClick={() => toggleWindow(id)}
              >
                <span className="taskbar-win-dot" style={{ background: ACCENT[id] }} aria-hidden="true" />
                {def.title}
              </button>
            );
          })}
        </div>
      </div>
      <div className="taskbar-right">
        <button type="button" className="taskbar-website-toggle" onClick={onWebsiteMode}>
          website mode
        </button>
        <span className="taskbar-flavor" title="Wi-Fi: connected">
          {'((•))'}
        </span>
        <span className="taskbar-flavor" title="Battery: 87%">
          [||||.]
        </span>
        <span className="taskbar-clock">{formatTime(now)}</span>
      </div>
    </div>
  );
}
