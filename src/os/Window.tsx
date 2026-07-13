import { useCallback, useEffect, useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import { useWindowManager } from './WindowManagerContext';
import type { AppId, WindowState } from './types';

interface WindowProps {
  win: WindowState;
  title: string;
  accent: string;
  children: ReactNode;
  resizable?: boolean;
}

const MIN_WIDTH = 280;
const MIN_HEIGHT = 180;

export function Window({ win, title, accent, children, resizable = true }: WindowProps) {
  const { closeWindow, minimizeWindow, focusWindow, moveWindow, resizeWindow } = useWindowManager();
  const frameRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null);
  const resizeState = useRef<{ startX: number; startY: number; originW: number; originH: number } | null>(null);
  const rafId = useRef<number | null>(null);
  const pendingPos = useRef<{ x: number; y: number } | null>(null);
  const pendingSize = useRef<{ width: number; height: number } | null>(null);

  const flushPos = useCallback(() => {
    rafId.current = null;
    if (pendingPos.current) {
      moveWindow(win.id, pendingPos.current.x, pendingPos.current.y);
      pendingPos.current = null;
    }
    if (pendingSize.current) {
      resizeWindow(win.id, pendingSize.current.width, pendingSize.current.height);
      pendingSize.current = null;
    }
  }, [moveWindow, resizeWindow, win.id]);

  const schedule = useCallback(() => {
    if (rafId.current == null) {
      rafId.current = requestAnimationFrame(flushPos);
    }
  }, [flushPos]);

  const onTitlePointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest('[data-no-drag]')) return;
      focusWindow(win.id);
      dragState.current = { startX: e.clientX, startY: e.clientY, originX: win.x, originY: win.y };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [focusWindow, win.id, win.x, win.y],
  );

  const onTitlePointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!dragState.current) return;
      const dx = e.clientX - dragState.current.startX;
      const dy = e.clientY - dragState.current.startY;
      const nextX = Math.max(0, dragState.current.originX + dx);
      const nextY = Math.max(0, dragState.current.originY + dy);
      if (frameRef.current) {
        frameRef.current.style.transform = `translate(${nextX}px, ${nextY}px)`;
      }
      pendingPos.current = { x: nextX, y: nextY };
      schedule();
    },
    [schedule],
  );

  const endDrag = useCallback(() => {
    dragState.current = null;
  }, []);

  const onResizePointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      e.stopPropagation();
      focusWindow(win.id);
      resizeState.current = { startX: e.clientX, startY: e.clientY, originW: win.width, originH: win.height };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [focusWindow, win.id, win.width, win.height],
  );

  const onResizePointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!resizeState.current) return;
      const dx = e.clientX - resizeState.current.startX;
      const dy = e.clientY - resizeState.current.startY;
      const nextW = Math.max(MIN_WIDTH, resizeState.current.originW + dx);
      const nextH = Math.max(MIN_HEIGHT, resizeState.current.originH + dy);
      if (frameRef.current) {
        frameRef.current.style.width = `${nextW}px`;
        frameRef.current.style.height = `${nextH}px`;
      }
      pendingSize.current = { width: nextW, height: nextH };
      schedule();
    },
    [schedule],
  );

  const endResize = useCallback(() => {
    resizeState.current = null;
  }, []);

  useEffect(() => {
    return () => {
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Force the DOM back in sync with win.{x,y,width,height} after every
  // render, unconditionally. Dragging/resizing writes directly to
  // frameRef's style for smooth tracking, bypassing React; if a drag/resize
  // ends up back at the same values it started from, the rendered style
  // string is identical to the previous render's and React's bailout skips
  // the DOM write, leaving the stale mid-gesture style in place.
  useEffect(() => {
    if (frameRef.current) {
      frameRef.current.style.transform = `translate(${win.x}px, ${win.y}px)`;
      frameRef.current.style.width = `${win.width}px`;
      frameRef.current.style.height = `${win.height}px`;
    }
  });

  if (win.minimized) return null;

  return (
    <div
      ref={frameRef}
      className="win"
      role="dialog"
      aria-label={title}
      style={{
        transform: `translate(${win.x}px, ${win.y}px)`,
        width: win.width,
        height: win.height,
        zIndex: win.zIndex,
        borderLeftColor: accent,
      }}
      onPointerDown={() => focusWindow(win.id)}
    >
      <div
        className="win-titlebar"
        onPointerDown={onTitlePointerDown}
        onPointerMove={onTitlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <span className="win-title">{title}</span>
        <div className="win-controls" data-no-drag>
          <button
            type="button"
            className="win-btn win-btn-min"
            aria-label={`Minimize ${title}`}
            onClick={() => minimizeWindow(win.id)}
          >
            _
          </button>
          <button
            type="button"
            className="win-btn win-btn-close"
            aria-label={`Close ${title}`}
            onClick={() => closeWindow(win.id)}
          >
            x
          </button>
        </div>
      </div>
      <div className="win-body">{children}</div>
      {resizable && (
        <div
          className="win-resize-handle"
          onPointerDown={onResizePointerDown}
          onPointerMove={onResizePointerMove}
          onPointerUp={endResize}
          onPointerCancel={endResize}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export function isWindowOpen(id: AppId, windows: Partial<Record<AppId, WindowState>>): boolean {
  const w = windows[id];
  return !!w && w.isOpen;
}
