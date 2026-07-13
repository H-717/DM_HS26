import { content } from '../content';
import { buildSnippet } from './snippet';

export function AboutMeApp() {
  return (
    <div className="app-about">
      <div className="about-photo" aria-hidden="true">
        {content.initials.toUpperCase()}
      </div>
      <h2 className="app-heading">{content.name}</h2>
      <p className="app-subheading">
        TA for {content.course.name} &middot; {content.course.semester}
      </p>

      {content.bio.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}

      <ul className="app-link-list">
        <li>
          <a href={`mailto:${content.email}`}>{content.email}</a>
        </li>
        {content.links.map((link) => (
          <li key={link.label}>
            <a href={link.url} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <pre className="code-card">
        <code>{buildSnippet()}</code>
      </pre>
    </div>
  );
}
