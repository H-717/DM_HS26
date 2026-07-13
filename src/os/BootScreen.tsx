import { useEffect, useRef, useState } from 'react';
import { osName } from '../content';

interface BootScreenProps {
  onDone: () => void;
}

const BOOT_MS = 1100;

export function BootScreen({ onDone }: BootScreenProps) {
  const [dots, setDots] = useState(1);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  };

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      finish();
      return;
    }
    const dotTimer = setInterval(() => setDots((d) => (d % 3) + 1), 220);
    const boot = setTimeout(finish, BOOT_MS);
    return () => {
      clearInterval(dotTimer);
      clearTimeout(boot);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="boot-screen"
      role="button"
      tabIndex={0}
      aria-label="Booting. Press any key to skip."
      onClick={finish}
      onKeyDown={finish}
    >
      <div className="boot-content">
        <pre className="boot-logo" aria-hidden="true">{'[■ ■]'}</pre>
        <div className="boot-name">{osName}</div>
        <div className="boot-status">booting{'.'.repeat(dots)}</div>
        <div className="boot-skip">click or press any key to skip</div>
      </div>
    </div>
  );
}
