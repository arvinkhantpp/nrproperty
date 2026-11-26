import { Icon, SectionHeader, type IconName } from '@/components/ui'
import { cn } from '@/lib/cn'
import { withAccent } from '@/lib/text'

import { Section, toneOf } from './Section'
import type { BlockOf } from './types'

export function StepsBlock({ data }: { data: BlockOf<'steps'> }) {
  const tone = toneOf(data.background)
  const dark = tone !== 'light'
  const items = data.items ?? []
  const cols = items.length >= 5 ? 'lg:grid-cols-5' : items.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
  return (
    <Section background={data.background} anchorId={data.anchorId}>
      <SectionHeader eyebrow={data.eyebrow} title={withAccent(data.title, tone)} description={data.description} tone={tone} />
      <ol className={cn('mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:gap-6', cols)}>
        {items.map((it, i) => (
          <li
            key={it.id ?? i}
            className={cn('relative flex flex-col gap-4 rounded-lg p-6 lg:p-7', dark ? 'bg-white/[0.06]' : 'bg-white')}
          >
            <div className="flex items-center justify-between">
              <span
                aria-hidden="true"
                className={cn(
                  'inline-flex size-12 items-center justify-center rounded-full',
                  dark ? 'bg-white/10 text-gold-soft' : 'bg-gold-soft text-forest',
                )}
              >
                <Icon name={(it.icon ?? 'check') as IconName} size={22} />
              </span>
              <span className={cn('font-display text-[1.75rem] leading-none', dark ? 'text-gold-light' : 'text-gold-text')}>
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className={cn('text-lg leading-snug font-semibold', dark ? 'text-cream' : 'text-ink')}>{it.title}</h3>
            {it.description ? <p className={cn('text-body', dark ? 'text-cream/70' : 'text-muted')}>{it.description}</p> : null}
          </li>
        ))}
      </ol>
    </Section>
  )
}
