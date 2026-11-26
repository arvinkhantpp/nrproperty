import type { ReactNode } from 'react'

import type { Tone } from '@/components/ui'
import type { Background } from '@/fields'
import { cn } from '@/lib/cn'

export const BG_CLASS: Record<Background, string> = {
  cream: 'bg-cream text-text',
  sand: 'bg-sand text-text',
  ink: 'bg-ink text-cream',
  forest: 'bg-forest text-cream',
}

export const toneOf = (bg: Background | null | undefined): Tone =>
  bg === 'ink' ? 'dark' : bg === 'forest' ? 'forest' : 'light'

type Props = {
  background?: Background | null
  anchorId?: string | null
  className?: string
  /** Inner container; pass false for full-bleed sections. */
  container?: boolean
  children: ReactNode
  labelledBy?: string
}

export function Section({ background, anchorId, className, container = true, children, labelledBy }: Props) {
  const bg = background ?? 'cream'
  return (
    <section
      id={anchorId || undefined}
      aria-labelledby={labelledBy}
      className={cn(BG_CLASS[bg], 'section-y scroll-mt-20', className)}
    >
      {container ? <div className="container-site">{children}</div> : children}
    </section>
  )
}
