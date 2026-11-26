import Image from 'next/image'

import { Button, Eyebrow } from '@/components/ui'
import { imageOf } from '@/lib/media'
import { withAccent } from '@/lib/text'

import { Section } from './Section'
import type { BlockOf } from './types'

export function NrbBannerBlock({ data }: { data: BlockOf<'nrbBanner'> }) {
  const img = imageOf(data.image, 'wide')

  return (
    <Section background={data.background} anchorId={data.anchorId}>
      <div className="relative isolate overflow-hidden rounded-xl bg-ink text-cream">
        {img ? (
          <>
            <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1280px) 1200px, 100vw" className="-z-10 object-cover" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(14_27_23/0.92)_0%,rgb(14_27_23/0.7)_55%,rgb(14_27_23/0.25)_100%)]" />
          </>
        ) : null}
        <div className="flex max-w-[38rem] flex-col gap-5 p-8 sm:p-12 lg:p-16">
          {data.eyebrow ? <Eyebrow tone="forest">{data.eyebrow}</Eyebrow> : null}
          <h2 className="text-display-m text-balance">{withAccent(data.title, 'dark')}</h2>
          {data.description ? <p className="text-body-l text-cream/80">{data.description}</p> : null}
          {data.cta?.href && data.cta.label ? (
            <div className="pt-2">
              <Button href={data.cta.href} iconRight="arrowRight">
                {data.cta.label}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  )
}
