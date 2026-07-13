import type { ReactNode } from 'react';
import type { AppId } from '../os/types';
import { AboutMeApp } from './AboutMe';
import { SlidesApp } from './Slides';
import { ResourcesApp } from './Resources';
import { OfficeHoursApp } from './OfficeHours';
import { TerminalApp } from './Terminal';
import { TrashApp } from './Trash';

export function renderAppContent(id: AppId, openApp: (id: AppId) => void): ReactNode {
  switch (id) {
    case 'about-me':
      return <AboutMeApp />;
    case 'slides':
      return <SlidesApp />;
    case 'resources':
      return <ResourcesApp />;
    case 'office-hours':
      return <OfficeHoursApp />;
    case 'terminal':
      return <TerminalApp onOpenApp={openApp} />;
    case 'trash':
      return <TrashApp />;
    default:
      return null;
  }
}
