import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import { APPS } from './appRegistry';
import type { AppId, WindowState } from './types';

type WindowMap = Partial<Record<AppId, WindowState>>;

interface ManagerState {
  windows: WindowMap;
  topZ: number;
}

type Action =
  | { type: 'OPEN'; id: AppId }
  | { type: 'CLOSE'; id: AppId }
  | { type: 'FOCUS'; id: AppId }
  | { type: 'MINIMIZE'; id: AppId }
  | { type: 'RESTORE'; id: AppId }
  | { type: 'MOVE'; id: AppId; x: number; y: number }
  | { type: 'RESIZE'; id: AppId; width: number; height: number };

const STAGGER_STEP = 28;
const STAGGER_MAX = 6;
const BASE_X = 120;
const BASE_Y = 72;

function openCount(windows: WindowMap): number {
  return Object.values(windows).filter((w) => w?.isOpen).length;
}

function reducer(state: ManagerState, action: Action): ManagerState {
  switch (action.type) {
    case 'OPEN': {
      const existing = state.windows[action.id];
      const nextZ = state.topZ + 1;
      if (existing) {
        return {
          topZ: nextZ,
          windows: {
            ...state.windows,
            [action.id]: { ...existing, isOpen: true, minimized: false, zIndex: nextZ },
          },
        };
      }
      const def = APPS[action.id];
      const step = openCount(state.windows) % STAGGER_MAX;
      const win: WindowState = {
        id: action.id,
        x: BASE_X + step * STAGGER_STEP,
        y: BASE_Y + step * STAGGER_STEP,
        width: def.defaultSize.width,
        height: def.defaultSize.height,
        zIndex: nextZ,
        minimized: false,
        isOpen: true,
      };
      return { topZ: nextZ, windows: { ...state.windows, [action.id]: win } };
    }
    case 'CLOSE': {
      const existing = state.windows[action.id];
      if (!existing) return state;
      return {
        ...state,
        windows: { ...state.windows, [action.id]: { ...existing, isOpen: false } },
      };
    }
    case 'FOCUS': {
      const existing = state.windows[action.id];
      if (!existing || !existing.isOpen) return state;
      if (existing.zIndex === state.topZ) return state;
      const nextZ = state.topZ + 1;
      return {
        topZ: nextZ,
        windows: { ...state.windows, [action.id]: { ...existing, zIndex: nextZ, minimized: false } },
      };
    }
    case 'MINIMIZE': {
      const existing = state.windows[action.id];
      if (!existing) return state;
      return {
        ...state,
        windows: { ...state.windows, [action.id]: { ...existing, minimized: true } },
      };
    }
    case 'RESTORE': {
      const existing = state.windows[action.id];
      if (!existing) return state;
      const nextZ = state.topZ + 1;
      return {
        topZ: nextZ,
        windows: { ...state.windows, [action.id]: { ...existing, minimized: false, zIndex: nextZ } },
      };
    }
    case 'MOVE': {
      const existing = state.windows[action.id];
      if (!existing) return state;
      return {
        ...state,
        windows: { ...state.windows, [action.id]: { ...existing, x: action.x, y: action.y } },
      };
    }
    case 'RESIZE': {
      const existing = state.windows[action.id];
      if (!existing) return state;
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: { ...existing, width: action.width, height: action.height },
        },
      };
    }
    default:
      return state;
  }
}

interface ManagerApi {
  windows: WindowMap;
  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  restoreWindow: (id: AppId) => void;
  toggleWindow: (id: AppId) => void;
  moveWindow: (id: AppId, x: number, y: number) => void;
  resizeWindow: (id: AppId, width: number, height: number) => void;
}

const WindowManagerContext = createContext<ManagerApi | null>(null);

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { windows: {}, topZ: 0 });

  const openWindow = useCallback((id: AppId) => dispatch({ type: 'OPEN', id }), []);
  const closeWindow = useCallback((id: AppId) => dispatch({ type: 'CLOSE', id }), []);
  const focusWindow = useCallback((id: AppId) => dispatch({ type: 'FOCUS', id }), []);
  const minimizeWindow = useCallback((id: AppId) => dispatch({ type: 'MINIMIZE', id }), []);
  const restoreWindow = useCallback((id: AppId) => dispatch({ type: 'RESTORE', id }), []);
  const moveWindow = useCallback(
    (id: AppId, x: number, y: number) => dispatch({ type: 'MOVE', id, x, y }),
    [],
  );
  const resizeWindow = useCallback(
    (id: AppId, width: number, height: number) => dispatch({ type: 'RESIZE', id, width, height }),
    [],
  );
  const toggleWindow = useCallback(
    (id: AppId) => {
      const win = state.windows[id];
      if (!win || !win.isOpen) dispatch({ type: 'OPEN', id });
      else if (win.minimized) dispatch({ type: 'RESTORE', id });
      else dispatch({ type: 'FOCUS', id });
    },
    [state.windows],
  );

  const value = useMemo<ManagerApi>(
    () => ({
      windows: state.windows,
      openWindow,
      closeWindow,
      focusWindow,
      minimizeWindow,
      restoreWindow,
      toggleWindow,
      moveWindow,
      resizeWindow,
    }),
    [state.windows, openWindow, closeWindow, focusWindow, minimizeWindow, restoreWindow, toggleWindow, moveWindow, resizeWindow],
  );

  return <WindowManagerContext.Provider value={value}>{children}</WindowManagerContext.Provider>;
}

export function useWindowManager(): ManagerApi {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) throw new Error('useWindowManager must be used within WindowManagerProvider');
  return ctx;
}
