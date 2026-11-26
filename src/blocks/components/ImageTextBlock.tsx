import Image from 'next/image'

import { Button, Eyebrow } from '@/components/ui'
import { RichText } from '@/components/site/RichText'
import { cn } from '@/lib/cn'
import { imageOf } from '@/lib/media'
import { withAccent } from '@/lib/text'

import { Section, toneOf } from './Section'
import type { BlockOf } from './types'

export function ImageTextBlock({ data }: { data: BlockOf<'imageText'> }) {
  const tone = toneOf(data.background)
  const dark = tone !== 'light'
  const img = imageOf(data.image, 'card')
  const right = data.imagePosition === 'right'
  return (
    <Section background={data.background} anchorId={data.anchorId}>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        {img ? (
          <div className={cn('relative aspect-[4/3] overflow-hidden rounded-lg lg:aspect-[4/5]', right && 'lg:order-2')}>
            <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        ) : null}
        <div className="flex flex-col gap-6">
          {data.eyebrow ? <Eyebrow tone={tone}>{data.eyebrow}</Eyebrow> : null}
          {data.title ? (
            <h2 className={cn('text-display-m text-balance', dark ? 'text-cream' : 'text-ink')}>{withAccent(data.title, tone)}</h2>
          ) : null}
          {data.description ? <p className={cn('text-body-l', dark ? 'text-cream/75' : 'text-muted')}>{data.description}</p> : null}
          <RichText data={data.body} dark={dark} />
          {data.cta?.href && data.cta.label ? (
            <div className="pt-2">
              <Button href={data.cta.href} variant={dark ? 'onDark' : 'outline'} iconRight="arrowRight">
                {data.cta.label}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  )
}
