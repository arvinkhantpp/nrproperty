import { cn } from '@/lib/cn'

import { isDarkTone, type Tone } from './SectionHeader'

type Props = { value: string; label: string; tone?: Tone; className?: string }

export function StatBlock({ value, label, tone = 'light', className }: Props) {
  const dark = isDarkTone(tone)
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span
        className={cn(
          'font-display text-[2.75rem] leading-none font-medium lg:text-[3.5rem]',
          dark ? 'text-cream' : 'text-ink',
        )}
      >
        {value}
      </span>
      <span
        className={cn('text-small font-medium lg:text-body', dark ? 'text-cream/70' : 'text-muted')}
      >
        {label}
      </span>
    </div>
  )
}
