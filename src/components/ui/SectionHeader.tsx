import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

/** light: cream/sand/white. dark: ink. forest: the green sections (gold needs lightening there for contrast). */
export type Tone = 'light' | 'dark' | 'forest'

export const isDarkTone = (tone: Tone) => tone !== 'light'

const eyebrowColor: Record<Tone, string> = {
  light: 'text-gold-text',
  dark: 'text-gold',
  forest: 'text-gold-light',
}

/** The one italic accent phrase per headline: gold-soft on dark, gold-text on light (AA contrast). */
export function Accent({ children, tone = 'light' }: { children: ReactNode; tone?: Tone }) {
  return (
    <em className={cn('italic', isDarkTone(tone) ? 'text-gold-soft' : 'text-gold-text')}>
      {children}
    </em>
  )
}

export function Eyebrow({
  children,
  tone = 'light',
  className,
}: {
  children: ReactNode
  tone?: Tone
  className?: string
}) {
  return <p className={cn('text-eyebrow', eyebrowColor[tone], className)}>{children}</p>
}

type Props = {
  eyebrow?: ReactNode
  title: ReactNode
  description?: ReactNode
  tone?: Tone
  align?: 'left' | 'center'
  size?: 'l' | 'm'
  /** Rendered beside the title on desktop (e.g. tabs or a "View all" link). */
  action?: ReactNode
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  tone = 'light',
  align = 'left',
  size = 'm',
  action,
  as: Heading = 'h2',
  className,
}: Props) {
  const dark = isDarkTone(tone)
  const center = align === 'center'
  return (
    <div
      className={cn(
        'flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12',
        center && 'items-center text-center lg:flex-col lg:items-center',
        className,
      )}
    >
      <div className={cn('flex max-w-[40rem] flex-col gap-4', center && 'items-center')}>
        {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
        <Heading
          className={cn(
            size === 'l' ? 'text-display-l' : 'text-display-m',
            'text-balance',
            dark ? 'text-cream' : 'text-ink',
          )}
        >
          {title}
        </Heading>
        {description ? (
          <p
            className={cn(
              'max-w-[34rem] text-body-l text-pretty',
              dark ? 'text-cream/75' : 'text-muted',
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
