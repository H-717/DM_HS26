import { content } from '../content';

export function ResourcesApp() {
  return (
    <div className="app-resources">
      {content.resourceSections.map((section) => (
        <section key={section.heading} className="resource-section">
          <h3>{section.heading}</h3>
          <ul>
            {section.items.map((item) => (
              <li key={item.label}>
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
                {item.note ? <span className="resource-note"> — {item.note}</span> : null}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
