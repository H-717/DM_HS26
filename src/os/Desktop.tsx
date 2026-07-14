import { useEffect, useMemo, useRef, useState } from 'react';
import { renderAppContent } from '../apps/registry';
import { ACCENT } from './accents';
import { APPS, APP_ORDER } from './appRegistry';
import {
  CELL,
  GRID_ORIGIN,
  cellKey,
  cellToPixel,
  defaultCell,
  findFreeCell,
  pixelToNearestCell,
  reflowCells,
  type CellPos,
  type PixelPos,
} from './desktopLayout';
import { DesktopIcon } from './Icon';
import { Window } from './Window';
import { useWindowManager } from './WindowManagerContext';
import type { AppId } from './types';

const ICON_POSITIONS_KEY = 'webta:desktop-icon-positions';

function initialCells(): Record<AppId, CellPos> {
  return Object.fromEntries(APP_ORDER.map((id, i) => [id, defaultCell(i)])) as Record<AppId, CellPos>;
}

// Restores a saved layout, falling back to the default position for any
// icon that's missing, new, or has a malformed entry (e.g. an older schema).
function loadPreferredCells(): Record<AppId, CellPos> {
  const cells = initialCells();
  try {
    const raw = localStorage.getItem(ICON_POSITIONS_KEY);
    if (!raw) return cells;
    const saved = JSON.parse(raw) as Partial<Record<AppId, CellPos>>;
    for (const id of APP_ORDER) {
      const cell = saved[id];
      if (cell && Number.isInteger(cell.col) && Number.isInteger(cell.row) && cell.col >= 0 && cell.row >= 0) {
        cells[id] = { col: cell.col, row: cell.row };
      }
    }
  } catch {
    // Corrupt JSON or storage unavailable — just use the defaults.
  }
  return cells;
}

function savePreferredCells(cells: Record<AppId, CellPos>) {
  try {
    localStorage.setItem(ICON_POSITIONS_KEY, JSON.stringify(cells));
  } catch {
    // Storage can be unavailable (private browsing, quota, disabled) — the
    // desktop still works, it just won't remember the layout next time.
  }
}

export function Desktop() {
  const { windows, openWindow, clampWindowsToBounds } = useWindowManager();
  // Where the user actually put each icon — the only thing persisted.
  const [preferredCells, setPreferredCells] = useState<Record<AppId, CellPos>>(loadPreferredCells);
  const [maxBounds, setMaxBounds] = useState({ maxCol: 3, maxRow: 5 });
  const containerRef = useRef<HTMLDivElement>(null);

  // What's actually drawn: the preferred layout pulled back into whatever
  // bounds currently fit, recomputed fresh on every resize. Because this is
  // derived rather than stored, shrinking the window never overwrites a
  // preferred position — growing back out just naturally stops needing to
  // relocate that icon, so it snaps back to where it was left, like
  // PostHog's layouts settle back into place as the viewport grows.
  const cells = useMemo(
    () => reflowCells(preferredCells, APP_ORDER, maxBounds.maxCol, maxBounds.maxRow),
    [preferredCells, maxBounds],
  );

  useEffect(() => {
    savePreferredCells(preferredCells);
  }, [preferredCells]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      const maxCol = Math.max(0, Math.floor((width - GRID_ORIGIN.x) / CELL.w) - 1);
      const maxRow = Math.max(0, Math.floor((height - GRID_ORIGIN.y) / CELL.h) - 1);
      setMaxBounds({ maxCol, maxRow });
      // Same idea for open windows: pull any window back inside bounds so
      // its titlebar (the only way to move/resize it) stays reachable.
      clampWindowsToBounds(width, height);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [clampWindowsToBounds]);

  const moveIcon = (id: AppId, rawPos: PixelPos) => {
    // Collisions are checked against what's currently on screen (`cells`),
    // since that's what the user sees themselves dropping onto — but only
    // the dragged icon's preferred spot is updated; everyone else keeps
    // their own preference untouched.
    const desired = pixelToNearestCell(rawPos, maxBounds.maxCol, maxBounds.maxRow);
    const occupied = new Set(APP_ORDER.filter((other) => other !== id).map((other) => cellKey(cells[other])));
    const finalCell = findFreeCell(desired, occupied, maxBounds.maxCol, maxBounds.maxRow);
    setPreferredCells((prev) => ({ ...prev, [id]: finalCell }));
  };

  return (
    <div className="desktop" ref={containerRef}>
      <div className="desktop-icons" role="group" aria-label="Desktop files">
        {APP_ORDER.map((id) => {
          const def = APPS[id];
          return (
            <DesktopIcon
              key={id}
              id={id}
              label={def.fileLabel}
              meta={def.fileMeta}
              note={def.fileNote}
              pos={cellToPixel(cells[id])}
              onOpen={openWindow}
              onMove={moveIcon}
            />
          );
        })}
      </div>

      {APP_ORDER.map((id) => {
        const win = windows[id];
        if (!win || !win.isOpen) return null;
        const def = APPS[id];
        return (
          <Window key={id} win={win} title={def.title} accent={ACCENT[id]}>
            {renderAppContent(id, openWindow)}
          </Window>
        );
      })}
    </div>
  );
}
