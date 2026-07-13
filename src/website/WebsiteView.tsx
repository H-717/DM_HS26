import { useEffect, useState } from 'react';
import { AboutMeApp } from '../apps/AboutMe';
import { OfficeHoursApp } from '../apps/OfficeHours';
import { ResourcesApp } from '../apps/Resources';
import { SlidesApp } from '../apps/Slides';
import { content } from '../content';
import { ACCENT } from '../os/accents';
import type { AppId } from '../os/types';

interface WebsiteViewProps {
  onDesktopMode: () => void;
}

const NAV_ITEMS: { id: AppId; label: string }[] = [
  { id: 'about-me', label: 'About' },
  { id: 'slides', label: 'Slides & exercises' },
  { id: 'resources', label: 'Resources' },
  { id: 'office-hours', label: 'Office hours' },
];

export function WebsiteView({ onDesktopMode }: WebsiteViewProps) {
  const [activeId, setActiveId] = useState<AppId>('about-me');

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const topMost = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (topMost) {
          setActiveId(topMost.target.id as AppId);
        }
      },
      { rootMargin: '-10% 0px -55% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: AppId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="website-shell">
      <aside className="website-sidebar">
        <div className="website-brand">
          <p className="website-brand-name">{content.name}</p>
          <p className="website-brand-course">
            {content.course.name} &middot; {content.course.semester}
          </p>
        </div>

        <nav className="website-nav" aria-label="Sections">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={`website-nav-link${activeId === item.id ? ' is-active' : ''}`}
                  onClick={() => scrollToSection(item.id)}
                  aria-current={activeId === item.id ? 'true' : undefined}
                >
                  <span
                    className="website-nav-dot"
                    style={{ background: ACCENT[item.id] }}
                    aria-hidden="true"
                  />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <button type="button" className="website-toggle" onClick={onDesktopMode}>
          desktop mode
        </button>
      </aside>

      <main className="website-main">
        <section id="about-me" className="website-section" style={{ borderLeftColor: ACCENT['about-me'] }}>
          <AboutMeApp />
        </section>

        <section id="slides" className="website-section" style={{ borderLeftColor: ACCENT.slides }}>
          <h2 style={{ color: ACCENT.slides }}>Slides &amp; exercises</h2>
          <SlidesApp />
        </section>

        <section id="resources" className="website-section" style={{ borderLeftColor: ACCENT.resources }}>
          <h2 style={{ color: ACCENT.resources }}>Resources</h2>
          <ResourcesApp />
        </section>

        <section
          id="office-hours"
          className="website-section"
          style={{ borderLeftColor: ACCENT['office-hours'] }}
        >
          <h2 style={{ color: ACCENT['office-hours'] }}>Office hours</h2>
          <OfficeHoursApp />
        </section>

        <footer className="website-footer">
          <span>
            {content.name} &bull; {content.school} &bull; Built with {content.framework}
          </span>
          <span className="website-footer-version">v1.0.0</span>
        </footer>
      </main>
    </div>
  );
}
