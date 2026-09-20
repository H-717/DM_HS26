import { useEffect, useState } from 'react';
import { BootScreen } from './os/BootScreen';
import { Desktop } from './os/Desktop';
import { Taskbar } from './os/Taskbar';
import { WindowManagerProvider } from './os/WindowManagerContext';
import { WebsiteView } from './website/WebsiteView';
import { useIsMobile } from './hooks/useIsMobile';
import { DeckView } from './slides/Deck';
import { deckWeekFromHash, findDeck } from './slides/index';
import { consumeAdminParam } from './slides/admin';

function App() {
  const [booted, setBooted] = useState(false);
  const isMobile = useIsMobile();
  const [websiteMode, setWebsiteMode] = useState<boolean>(isMobile);
  const [hash, setHash] = useState(() => window.location.hash);

  // An `?admin=<phrase>` in the opening URL unlocks speaker notes on this
  // device for good. Spend it before the first paint so the deck never
  // renders in the wrong state.
  useEffect(() => {
    void consumeAdminParam();
  }, []);

  // '#/slides/1' opens presentation mode directly — no boot screen, no OS
  // chrome — so the projector shows the deck the moment the link is opened.
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // The pixel-art desktop relies on mouse drag/resize and isn't usable on
  // touch screens, so bail back to the website view the moment the viewport
  // drops into mobile width (e.g. rotating a phone while in desktop mode).
  useEffect(() => {
    if (isMobile) setWebsiteMode(true);
  }, [isMobile]);

  const deckWeek = deckWeekFromHash(hash);
  const deck = deckWeek === null ? undefined : findDeck(deckWeek);
  if (deck) {
    return (
      <DeckView
        deck={deck}
        onExit={() => {
          window.location.hash = '';
          setBooted(true);
        }}
      />
    );
  }

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
