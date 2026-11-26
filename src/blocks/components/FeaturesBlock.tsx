import Image from 'next/image'

import { FeatureItem, SectionHeader, type IconName } from '@/components/ui'
import { cn } from '@/lib/cn'
import { imageOf } from '@/lib/media'
import { withAccent } from '@/lib/text'

import { Section, toneOf } from './Section'
import type { BlockOf } from './types'

export function FeaturesBlock({ data }: { data: BlockOf<'features'> }) {
  const tone = toneOf(data.background)
  const img = imageOf(data.image, 'card')
  const items = data.items ?? []
  return (
    <Section background={data.background} anchorId={data.anchorId}>
      <div className={cn('grid gap-12', img && 'lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20')}>
        {img ? (
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg max-lg:aspect-[4/3]">
            <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        ) : null}
        <div className="flex flex-col gap-10 lg:gap-14">
          <SectionHeader eyebrow={data.eyebrow} title={withAccent(data.title, tone)} description={data.description} tone={tone} />
          <div className={cn('grid gap-x-10 gap-y-10 sm:grid-cols-2', !img && items.length >= 4 && 'lg:grid-cols-4')}>
            {items.map((it, i) => (
              <FeatureItem
                key={it.id ?? i}
                icon={(it.icon ?? 'check') as IconName}
                title={it.title ?? ''}
                description={it.description ?? ''}
                tone={tone}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
