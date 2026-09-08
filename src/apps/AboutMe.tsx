import { content } from '../content';
import { snippetFilename, tokenizeSnippet, buildSnippet } from './snippet';

const MAIL_ICON = '\u2709';
const EXTERNAL_ICON = '\u2197';

function CodeCard() {
  return (
    <figure className="code-card">
      <figcaption className="code-card-tab">
        <span className="code-card-dot" aria-hidden="true" />
        {snippetFilename()}
      </figcaption>
      <pre className="code-card-body">
        <code>
          {tokenizeSnippet(buildSnippet()).map((token, i) => (
            <span key={i} className={`tok-${token.kind}`}>
              {token.text}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}

export function AboutMeApp() {
  const { session } = content;

  return (
    <div className="app-about">
      <header className="about-head">
        <div className="about-avatar" aria-hidden="true">
          {content.initials.toUpperCase()}
        </div>

        <div className="about-id">
          <h2 className="about-name">{content.name}</h2>
          <p className="about-role">
            Teaching assistant &middot;{' '}
            <span className="about-course">{content.course.name}</span> &middot;{' '}
            {content.course.semester}
          </p>
          <p className="about-when">
            <span className="about-when-dot" aria-hidden="true" />
            {session.day} &middot; {session.time} &middot; {session.room}
          </p>
        </div>
      </header>

      <div className="about-bio">
        {content.bio.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <ul className="about-links">
        <li>
          <a className="about-chip is-primary" href={`mailto:${content.email}`}>
            <span aria-hidden="true">{MAIL_ICON}</span>
            {content.email}
          </a>
        </li>
        {content.links.map((link) => (
          <li key={link.label}>
            <a className="about-chip" href={link.url} target="_blank" rel="noreferrer">
              {link.label}
              <span aria-hidden="true">{EXTERNAL_ICON}</span>
            </a>
          </li>
        ))}
      </ul>

      <CodeCard />
    </div>
  );
}
