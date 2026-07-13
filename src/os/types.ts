export type AppId =
  | 'about-me'
  | 'slides'
  | 'resources'
  | 'office-hours'
  | 'terminal'
  | 'trash';

export interface WindowState {
  id: AppId;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
  isOpen: boolean;
}

export interface AppDef {
  id: AppId;
  title: string;
  icon: AppId;
  fileLabel: string;
  fileMeta: string;
  fileNote: string;
  defaultSize: { width: number; height: number };
}
