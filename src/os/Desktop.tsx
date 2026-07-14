import { useEffect, useRef, useState } from 'react';
import { renderAppContent } from '../apps/registry';
import { ACCENT } from './accents';
import { APPS, APP_ORDER } from './appRegistry';
import {
  CELL,
  GRID_ORIGIN,
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

function initialCells(): Record<AppId, CellPos> {
  return Object.fromEntries(APP_ORDER.map((id, i) => [id, defaultCell(i)])) as Record<AppId, CellPos>;
}

export function Desktop() {
  const { windows, openWindow, clampWindowsToBounds } = useWindowManager();
  const [cells, setCells] = useState<Record<AppId, CellPos>>(initialCells);
  const [maxBounds, setMaxBounds] = useState({ maxCol: 3, maxRow: 5 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      const maxCol = Math.max(0, Math.floor((width - GRID_ORIGIN.x) / CELL.w) - 1);
      const maxRow = Math.max(0, Math.floor((height - GRID_ORIGIN.y) / CELL.h) - 1);
      setMaxBounds({ maxCol, maxRow });
      // The desktop clips overflow, so a shrink can otherwise strand icons
      // in now out-of-bounds cells where they're invisible and unclickable.
      setCells((prev) => {
        const next = reflowCells(prev, APP_ORDER, maxCol, maxRow);
        const changed = APP_ORDER.some(
          (id) => prev[id].col !== next[id].col || prev[id].row !== next[id].row,
        );
        return changed ? next : prev;
      });
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
    setCells((prev) => {
      const desired = pixelToNearestCell(rawPos, maxBounds.maxCol, maxBounds.maxRow);
      const occupied = new Set(
        APP_ORDER.filter((other) => other !== id).map((other) => `${prev[other].col},${prev[other].row}`),
      );
      const finalCell = findFreeCell(desired, occupied, maxBounds.maxCol, maxBounds.maxRow);
      return { ...prev, [id]: finalCell };
    });
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
