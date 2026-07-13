const TRASH_ITEMS = [
  {
    name: 'midterm_stress.exe',
    size: '0 bytes',
    note: 'deleted the moment finals ended',
  },
  {
    name: 'excuses.docx',
    size: '2 KB',
    note: '"my dog ate the git repo" and other greatest hits',
  },
];

export function TrashApp() {
  return (
    <div className="app-trash">
      <p className="trash-intro">nothing important in here. probably.</p>
      <ul className="trash-list">
        {TRASH_ITEMS.map((item) => (
          <li key={item.name}>
            <div className="trash-row">
              <span className="trash-name">{item.name}</span>
              <span className="trash-size">{item.size}</span>
            </div>
            <div className="trash-note">{item.note}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
