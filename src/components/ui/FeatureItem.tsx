import { cn } from '@/lib/cn'

import { Icon, type IconName } from './Icon'
import { isDarkTone, type Tone } from './SectionHeader'

type Props = {
  icon: IconName
  title: string
  description: string
  tone?: Tone
  className?: string
}

export function FeatureItem({ icon, title, description, tone = 'light', className }: Props) {
  const dark = isDarkTone(tone)
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <span
        aria-hidden="true"
        className={cn(
          'mb-1 inline-flex size-[3.25rem] items-center justify-center rounded-full',
          dark ? 'bg-white/10 text-gold-soft' : 'bg-gold-soft text-forest',
        )}
      >
        <Icon name={icon} size={22} />
      </span>
      <h3 className={cn('text-lg leading-snug font-semibold', dark ? 'text-cream' : 'text-ink')}>
        {title}
      </h3>
      <p className={cn('text-body', dark ? 'text-cream/70' : 'text-muted')}>{description}</p>
    </div>
  )
}
