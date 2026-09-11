import { content } from '../content';

export function OfficeHoursApp() {
  const { session, email } = content;
  return (
    <div className="app-office-hours">
      <dl className="ics-fields">
        <dt>Session</dt>
        <dd>
          {session.day}, {session.time}
        </dd>
        <dt>Room</dt>
        <dd>{session.room}</dd>
        <dt>Contact</dt>
        <dd>
          <a href={`mailto:${email}`}>{email}</a>
        </dd>
      </dl>
      {session.notes ? <p>{session.notes}</p> : null}
      {/* <p className="ics-footer">— {name}</p> */}
    </div>
  );
}
