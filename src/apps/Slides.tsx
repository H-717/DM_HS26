import { content } from '../content';

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
            <td>{w.week}</td>
            <td>
              {w.topic}
              {w.date ? <span className="slides-date"> ({w.date})</span> : null}
            </td>
            <td>
              <a href={w.slidesUrl} target="_blank" rel="noreferrer">
                slides.pdf
              </a>
            </td>
            <td>
              <a href={w.exerciseUrl} target="_blank" rel="noreferrer">
                exercise.pdf
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
