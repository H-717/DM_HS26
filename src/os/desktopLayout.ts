export const GRID_ORIGIN = { x: 20, y: 20 };
export const CELL = { w: 92, h: 100 };

export interface CellPos {
  col: number;
  row: number;
}

export interface PixelPos {
  x: number;
  y: number;
}

function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), max);
}

export function cellToPixel(cell: CellPos): PixelPos {
  return { x: GRID_ORIGIN.x + cell.col * CELL.w, y: GRID_ORIGIN.y + cell.row * CELL.h };
}

// Nearest grid cell to a raw drag-drop point, clamped so it can never land
// outside the visible desktop (which clips overflow).
export function pixelToNearestCell(pos: PixelPos, maxCol: number, maxRow: number): CellPos {
  const col = clamp(Math.round((pos.x - GRID_ORIGIN.x) / CELL.w), 0, maxCol);
  const row = clamp(Math.round((pos.y - GRID_ORIGIN.y) / CELL.h), 0, maxRow);
  return { col, row };
}

// Default arrangement: a single tidy column down the left edge.
export function defaultCell(index: number): CellPos {
  return { col: 0, row: index };
}

const cellKey = (c: CellPos) => `${c.col},${c.row}`;

// Nearest free cell to `desired`, searching outward ring by ring so a drag
// can never land exactly on top of another icon.
export function findFreeCell(
  desired: CellPos,
  occupied: Set<string>,
  maxCol: number,
  maxRow: number,
): CellPos {
  const inBounds = (c: CellPos) => c.col >= 0 && c.col <= maxCol && c.row >= 0 && c.row <= maxRow;
  if (inBounds(desired) && !occupied.has(cellKey(desired))) return desired;

  const maxRadius = maxCol + maxRow + 2;
  for (let radius = 1; radius <= maxRadius; radius++) {
    for (let dc = -radius; dc <= radius; dc++) {
      for (let dr = -radius; dr <= radius; dr++) {
        if (Math.max(Math.abs(dc), Math.abs(dr)) !== radius) continue;
        const candidate = { col: desired.col + dc, row: desired.row + dr };
        if (inBounds(candidate) && !occupied.has(cellKey(candidate))) return candidate;
      }
    }
  }
  return desired;
}
