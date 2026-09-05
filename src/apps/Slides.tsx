import { content } from '../content';

// '#' means "not published yet"; '#/slides/N' is an in-site deck rather than
// a PDF, so it gets its own label.
function linkLabel(url: string, pdfLabel: string) {
  if (url === '#') return null;
  return url.startsWith('#/slides/') ? 'present ▸' : pdfLabel;
}

function Cell({ url, pdfLabel }: { url: string; pdfLabel: string }) {
  const label = linkLabel(url, pdfLabel);
  if (!label) return <span className="slides-soon">soon</span>;
  return (
    <a href={url} target="_blank" rel="noreferrer">
      {label}
    </a>
  );
}

export function SlidesApp() {
  if (content.weeks.length === 0) {
    return <p>No sessions yet — check back soon.</p>;
  }

  return (
    <table className="slides-table">
      <thead>
        <tr>
          <th>Week</th>
          <th>Topic</th>
          <th>Slides</th>
          <th>Exercise</th>
        </tr>
      </thead>
      <tbody>
        {content.weeks.map((w) => (
          <tr key={w.week}>
            <td data-label="Week">{w.week}</td>
            <td data-label="Topic">
              {w.topic}
              {w.date ? <span className="slides-date"> ({w.date})</span> : null}
            </td>
            <td data-label="Slides">
              <Cell url={w.slidesUrl} pdfLabel="slides.pdf" />
            </td>
            <td data-label="Exercise">
              <Cell url={w.exerciseUrl} pdfLabel="exercise.pdf" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
