import { useCallback, useEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react';
import { ICON_BY_ID } from '../icons/PixelIcons';
import type { PixelPos } from './desktopLayout';
import type { AppId } from './types';

interface IconProps {
  id: AppId;
  label: string;
  meta: string;
  note: string;
  pos: PixelPos;
  onOpen: (id: AppId) => void;
  onMove: (id: AppId, rawPos: PixelPos) => void;
}

const DRAG_THRESHOLD = 4;
const DOUBLE_TAP_MS = 400;

export function DesktopIcon({ id, label, meta, note, pos, onOpen, onMove }: IconProps) {
  const lastTap = useRef(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null);
  const wasDragging = useRef(false);
  const Glyph = ICON_BY_ID[id];

  // setPointerCapture on the wrapper retargets the native click/dblclick
  // events to originate at the wrapper itself, so the inner button never
  // sees them — open-on-tap has to be decided from the pointer events here.
  const registerTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTap.current < DOUBLE_TAP_MS) {
      onOpen(id);
      lastTap.current = 0;
    } else {
      lastTap.current = now;
    }
  }, [id, onOpen]);

  const onPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      dragState.current = { startX: e.clientX, startY: e.clientY, originX: pos.x, originY: pos.y };
      wasDragging.current = false;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [pos.x, pos.y],
  );

  const onPointerMove = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragState.current) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    if (!wasDragging.current && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    wasDragging.current = true;
    const nextX = Math.max(0, dragState.current.originX + dx);
    const nextY = Math.max(0, dragState.current.originY + dy);
    if (wrapperRef.current) {
      wrapperRef.current.style.transform = `translate(${nextX}px, ${nextY}px)`;
    }
  }, []);

  const onPointerUp = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (dragState.current) {
        if (wasDragging.current) {
          const dx = e.clientX - dragState.current.startX;
          const dy = e.clientY - dragState.current.startY;
          const rawX = Math.max(0, dragState.current.originX + dx);
          const rawY = Math.max(0, dragState.current.originY + dy);
          onMove(id, { x: rawX, y: rawY });
        } else {
          registerTap();
        }
      }
      dragState.current = null;
    },
    [id, onMove, registerTap],
  );

  // Force the DOM transform back in sync with `pos` after every render, with
  // no dependency array. During a drag we write style.transform directly
  // (bypassing React) for smooth tracking; if a drop snaps back to the same
  // cell it started in, the rendered transform string is byte-identical to
  // the previous render's, so React's bailout skips the DOM write and the
  // stale mid-drag transform is left in place. Running this unconditionally
  // closes that gap.
  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    }
  });

  return (
    <div
      ref={wrapperRef}
      className="desktop-icon-wrap"
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        dragState.current = null;
      }}
    >
      <button
        type="button"
        className="desktop-icon"
        title={`${label} — ${meta} — ${note}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpen(id);
          }
        }}
      >
        <Glyph className="desktop-icon-glyph" />
        <span className="desktop-icon-label">{label}</span>
        <span className="desktop-icon-meta">{meta}</span>
      </button>
    </div>
  );
}
