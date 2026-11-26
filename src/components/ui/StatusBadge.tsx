import { useTranslations } from 'next-intl'

import { cn } from '@/lib/cn'

export type ProjectStatus = 'ongoing' | 'upcoming' | 'completed' | 'soldOut'

const tones: Record<ProjectStatus, { bg: string; dot: string }> = {
  ongoing: { bg: 'bg-gold-soft text-ink', dot: 'bg-gold-text' },
  upcoming: { bg: 'bg-[color-mix(in_srgb,var(--nr-info)_14%,white)] text-ink', dot: 'bg-info' },
  completed: {
    bg: 'bg-[color-mix(in_srgb,var(--nr-success)_14%,white)] text-ink',
    dot: 'bg-success',
  },
  soldOut: { bg: 'bg-sand text-muted', dot: 'bg-muted' },
}

type Props = {
  status: ProjectStatus
  /** On top of a photo: solid white pill so it reads on any image. */
  onImage?: boolean
  className?: string
}

export function StatusBadge({ status, onImage, className }: Props) {
  const t = useTranslations('status')
  const tone = tones[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.6875rem] leading-none font-bold tracking-[1.6px] uppercase',
        onImage ? 'bg-white text-ink shadow-[0_2px_8px_rgb(14_27_23/0.12)]' : tone.bg,
        className,
      )}
    >
      <span aria-hidden="true" className={cn('size-1.5 rounded-full', tone.dot)} />
      {t(status)}
    </span>
  )
}
