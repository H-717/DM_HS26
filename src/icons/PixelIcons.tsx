import type { SVGProps } from 'react';
import type { AppId } from '../os/types';

// All icons share a 16x16 pixel grid, flat fills only (no gradients/glow),
// so they read as chunky pixel-art against the flat navy chrome.
const OUTLINE = '#7c8db5';
const PAPER = '#eef1f6';
const FOLD = '#c3cbdc';
const INK = '#2a3859';
const SCREEN = '#0c1326';
const BIN_LIGHT = '#a9b8d6';

// Mirrors src/os/accents.ts, kept as concrete hex here since SVG fill
// attributes need real values (not CSS custom properties) for reliable
// cross-browser rendering. One signature color per app so icons are
// distinguishable at a glance, not just by shape.
const ICON_ACCENT: Record<AppId, string> = {
  'about-me': '#f5a623',
  slides: '#5b9df5',
  resources: '#3ddc84',
  'office-hours': '#f2836b',
  terminal: '#3ddc84',
  trash: '#7c8db5',
};

const ICON_ACCENT_LIGHT: Record<AppId, string> = {
  'about-me': '#ffd699',
  slides: '#a9c8fb',
  resources: '#a9f0cb',
  'office-hours': '#f8b7a8',
  terminal: '#3ddc84',
  trash: '#a9b8d6',
};

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="32"
      height="32"
      shapeRendering="crispEdges"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function AboutMeIcon(props: IconProps) {
  const accent = ICON_ACCENT['about-me'];
  return (
    <Base {...props}>
      <rect x={3} y={1} width={10} height={14} fill={PAPER} stroke={OUTLINE} />
      <polygon points="10,1 13,1 13,4 10,4" fill={FOLD} stroke={OUTLINE} />
      <rect x={6} y={6} width={4} height={4} fill={accent} stroke={OUTLINE} />
      <rect x={5} y={11} width={6} height={1} fill={INK} />
      <rect x={5} y={13} width={4} height={1} fill={INK} />
    </Base>
  );
}

export function SlidesIcon(props: IconProps) {
  const accent = ICON_ACCENT.slides;
  const light = ICON_ACCENT_LIGHT.slides;
  return (
    <Base {...props}>
      <polygon points="2,4 7,4 8,5 14,5 14,13 2,13" fill={accent} stroke={OUTLINE} />
      <rect x={2} y={6} width={12} height={7} fill={light} stroke={OUTLINE} />
      <rect x={4} y={8} width={3} height={3} fill={PAPER} stroke={OUTLINE} />
      <rect x={9} y={8} width={3} height={3} fill={PAPER} stroke={OUTLINE} />
    </Base>
  );
}

export function ResourcesIcon(props: IconProps) {
  const accent = ICON_ACCENT.resources;
  return (
    <Base {...props}>
      <rect x={3} y={2} width={10} height={12} fill={PAPER} stroke={OUTLINE} />
      <rect x={3} y={2} width={2} height={12} fill={accent} stroke={OUTLINE} />
      <rect x={7} y={5} width={4} height={1} fill={INK} />
      <rect x={7} y={7} width={4} height={1} fill={INK} />
      <rect x={7} y={9} width={3} height={1} fill={INK} />
    </Base>
  );
}

export function OfficeHoursIcon(props: IconProps) {
  const accent = ICON_ACCENT['office-hours'];
  return (
    <Base {...props}>
      <rect x={2} y={3} width={12} height={11} fill={PAPER} stroke={OUTLINE} />
      <rect x={2} y={3} width={12} height={3} fill={accent} stroke={OUTLINE} />
      <rect x={4} y={1} width={1} height={3} fill={OUTLINE} />
      <rect x={11} y={1} width={1} height={3} fill={OUTLINE} />
      <rect x={7} y={9} width={2} height={2} fill={accent} stroke={OUTLINE} />
    </Base>
  );
}

export function TerminalIcon(props: IconProps) {
  const accent = ICON_ACCENT.terminal;
  return (
    <Base {...props}>
      <rect x={1} y={2} width={14} height={10} fill={SCREEN} stroke={OUTLINE} />
      <rect x={3} y={5} width={1} height={1} fill={accent} />
      <rect x={5} y={6} width={1} height={1} fill={accent} />
      <rect x={4} y={7} width={4} height={1} fill={accent} />
      <rect x={6} y={13} width={4} height={1} fill={OUTLINE} />
    </Base>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x={5} y={2} width={6} height={1} fill={OUTLINE} />
      <rect x={4} y={4} width={8} height={10} fill={BIN_LIGHT} stroke={OUTLINE} />
      <rect x={6} y={6} width={1} height={6} fill={OUTLINE} />
      <rect x={8} y={6} width={1} height={6} fill={OUTLINE} />
      <rect x={10} y={6} width={1} height={6} fill={OUTLINE} />
    </Base>
  );
}

export const ICON_BY_ID = {
  'about-me': AboutMeIcon,
  slides: SlidesIcon,
  resources: ResourcesIcon,
  'office-hours': OfficeHoursIcon,
  terminal: TerminalIcon,
  trash: TrashIcon,
} as const;
