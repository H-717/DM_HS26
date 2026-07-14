import { useEffect, useState } from 'react';
import { BootScreen } from './os/BootScreen';
import { Desktop } from './os/Desktop';
import { Taskbar } from './os/Taskbar';
import { WindowManagerProvider } from './os/WindowManagerContext';
import { WebsiteView } from './website/WebsiteView';
import { useIsMobile } from './hooks/useIsMobile';

function App() {
  const [booted, setBooted] = useState(false);
  const isMobile = useIsMobile();
  const [websiteMode, setWebsiteMode] = useState<boolean>(isMobile);

  // The pixel-art desktop relies on mouse drag/resize and isn't usable on
  // touch screens, so bail back to the website view the moment the viewport
  // drops into mobile width (e.g. rotating a phone while in desktop mode).
  useEffect(() => {
    if (isMobile) setWebsiteMode(true);
  }, [isMobile]);

  if (!booted) {
    return <BootScreen onDone={() => setBooted(true)} />;
  }

  if (websiteMode) {
    return <WebsiteView onDesktopMode={() => setWebsiteMode(false)} />;
  }

  return (
    <WindowManagerProvider>
      <div className="os-root">
        <Desktop />
        <Taskbar onWebsiteMode={() => setWebsiteMode(true)} />
      </div>
    </WindowManagerProvider>
  );
}

export default App;
