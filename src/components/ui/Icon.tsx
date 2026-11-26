import type { SVGProps } from 'react'

/**
 * Line icons drawn on a 24px grid with a 1.7 stroke, matching the design references.
 * Decorative by default (aria-hidden); pass `title` to make an icon meaningful on its own.
 */
const paths = {
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  ),
  whatsapp: (
    <>
      <path d="M3.5 20.5l1.3-4.1A8.5 8.5 0 1 1 8 19.5z" />
      <path d="M9 8.6c0 3.3 2.6 6 5.9 6.4l1-1.3-1.9-1-1 .9a5 5 0 0 1-2.3-2.3l.9-1-1-1.9z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  arrowUpRight: <path d="M7 17L17 7M8 7h9v9" />,
  chevronDown: <path d="M6 9l6 6 6-6" />,
  chevronLeft: <path d="M15 6l-6 6 6 6" />,
  chevronRight: <path d="M9 6l6 6-6 6" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-4.2-4.2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5z" />
      <path d="M3 13l9 5 9-5" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="M11 12l8-8M16 7l2.5 2.5M14 9l2 2" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.3 3.5 5.1 3.5 8.5s-1.1 6.2-3.5 8.5c-2.4-2.3-3.5-5.1-3.5-8.5S9.6 5.8 12 3.5z" />
    </>
  ),
  quote: (
    <path d="M10 7H6.5A1.5 1.5 0 0 0 5 8.5V12h4.5v1.5A3.5 3.5 0 0 1 6 17M19 7h-3.5A1.5 1.5 0 0 0 14 8.5V12h4.5v1.5A3.5 3.5 0 0 1 15 17" />
  ),
  share: (
    <>
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4" />
    </>
  ),
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
  grid: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1" />
      <rect x="13" y="4" width="7" height="7" rx="1" />
      <rect x="4" y="13" width="7" height="7" rx="1" />
      <rect x="13" y="13" width="7" height="7" rx="1" />
    </>
  ),
  download: <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />,
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 10h16M9 3v4M15 3v4" />
    </>
  ),
  land: (
    <>
      <path d="M3 18l5-9 4 6 3-4 6 7z" />
      <path d="M3 21h18" />
    </>
  ),
  floors: (
    <>
      <rect x="6" y="3" width="12" height="18" rx="1" />
      <path d="M6 8h12M6 13h12M6 18h12" />
    </>
  ),
  area: (
    <>
      <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
    </>
  ),
  bed: (
    <>
      <path d="M3 18v-8M21 18v-5a3 3 0 0 0-3-3H9v5M3 15h18" />
      <circle cx="6" cy="12" r="1.6" />
    </>
  ),
  road: <path d="M8 3L5 21M16 3l3 18M12 4v3M12 11v3M12 18v2" />,
  car: (
    <>
      <path d="M5 16V12l2-5h10l2 5v4" />
      <path d="M3 16h18v2H3zM5 12h14" />
      <circle cx="7.5" cy="14" r=".5" />
      <circle cx="16.5" cy="14" r=".5" />
    </>
  ),
  play: <path d="M8 5.5v13l10-6.5z" />,
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
  alert: (
    <>
      <path d="M12 4l9 16H3z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
} as const

export type IconName = keyof typeof paths

type IconProps = Omit<SVGProps<SVGSVGElement>, 'children'> & {
  name: IconName
  size?: number
  strokeWidth?: number
  title?: string
}

export function Icon({ name, size = 20, strokeWidth = 1.7, title, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  )
}
