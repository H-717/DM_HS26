import { useState } from 'react';
import { BootScreen } from './os/BootScreen';
import { Desktop } from './os/Desktop';
import { Taskbar } from './os/Taskbar';
import { WindowManagerProvider } from './os/WindowManagerContext';
import { WebsiteView } from './website/WebsiteView';

const MOBILE_QUERY = '(max-width: 700px)';

function isMobile(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches;
}

function App() {
  const [booted, setBooted] = useState(false);
  const [websiteMode, setWebsiteMode] = useState<boolean>(isMobile);

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
