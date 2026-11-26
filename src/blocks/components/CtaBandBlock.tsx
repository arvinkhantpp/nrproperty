import { Button, Eyebrow } from '@/components/ui'
import { cn } from '@/lib/cn'
import { withAccent } from '@/lib/text'

import { Section, toneOf } from './Section'
import type { BlockOf } from './types'

export function CtaBandBlock({ data }: { data: BlockOf<'ctaBand'> }) {
  const tone = toneOf(data.background ?? 'ink')
  const dark = tone !== 'light'
  return (
    <Section background={data.background ?? 'ink'} anchorId={data.anchorId}>
      <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div className="flex max-w-[44rem] flex-col gap-5">
          {data.eyebrow ? <Eyebrow tone={tone}>{data.eyebrow}</Eyebrow> : null}
          <h2 className={cn('text-display-l text-balance', dark ? 'text-cream' : 'text-ink')}>{withAccent(data.title, tone)}</h2>
          {data.description ? <p className={cn('text-body-l', dark ? 'text-cream/75' : 'text-muted')}>{data.description}</p> : null}
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:shrink-0">
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
    </Section>
  )
}
