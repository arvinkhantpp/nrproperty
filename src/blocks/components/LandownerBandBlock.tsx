import { Button, Eyebrow } from '@/components/ui'
import { cn } from '@/lib/cn'
import { withAccent } from '@/lib/text'

import { Section, toneOf } from './Section'
import type { BlockOf } from './types'

export function LandownerBandBlock({ data }: { data: BlockOf<'landownerBand'> }) {
  const tone = toneOf(data.background ?? 'forest')
  const dark = tone !== 'light'
  const steps = data.steps ?? []
  return (
    <Section background={data.background ?? 'forest'} anchorId={data.anchorId} className="relative overflow-hidden">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
        <div className="flex flex-col gap-6">
          {data.eyebrow ? <Eyebrow tone={tone}>{data.eyebrow}</Eyebrow> : null}
          <h2 className={cn('text-display-l text-balance', dark ? 'text-cream' : 'text-ink')}>{withAccent(data.title, tone)}</h2>
          {data.description ? (
            <p className={cn('max-w-[32rem] text-body-l', dark ? 'text-cream/75' : 'text-muted')}>{data.description}</p>
          ) : null}
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            {data.primary?.href && data.primary.label ? (
              <Button href={data.primary.href} size="lg" iconRight="arrowRight">
                {data.primary.label}
              </Button>
            ) : null}
            {data.secondary?.href && data.secondary.label ? (
              <Button href={data.secondary.href} size="lg" variant={dark ? 'onDark' : 'outline'}>
                {data.secondary.label}
              </Button>
            ) : null}
          </div>
        </div>
        {steps.length ? (
          <ol className={cn('flex flex-col rounded-lg', dark ? 'bg-white/[0.06]' : 'bg-white')}>
            {steps.map((s, i) => (
              <li
                key={s.id ?? i}
                className={cn('flex gap-5 p-6 lg:p-7', i > 0 && (dark ? 'border-t border-white/10' : 'border-t border-line'))}
              >
                <span
                  aria-hidden="true"
                  className={cn('font-display text-[2rem] leading-none', dark ? 'text-gold-light' : 'text-gold-text')}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className={cn('text-lg font-semibold', dark ? 'text-cream' : 'text-ink')}>{s.title}</h3>
                  {s.description ? <p className={cn('text-body', dark ? 'text-cream/70' : 'text-muted')}>{s.description}</p> : null}
                </div>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </Section>
  )
}
