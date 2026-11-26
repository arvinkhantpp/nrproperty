import { Eyebrow } from '@/components/ui'
import { RichText } from '@/components/site/RichText'
import { cn } from '@/lib/cn'

import { Section, toneOf } from './Section'
import type { BlockOf } from './types'

export function RichTextBlock({ data }: { data: BlockOf<'richText'> }) {
  const tone = toneOf(data.background)
  return (
    <Section background={data.background} anchorId={data.anchorId}>
      <div className={cn('mx-auto', data.width === 'wide' ? 'max-w-[60rem]' : 'max-w-[44rem]')}>
        {data.eyebrow ? <Eyebrow tone={tone} className="mb-6">{data.eyebrow}</Eyebrow> : null}
        <RichText data={data.content} dark={tone !== 'light'} />
      </div>
    </Section>
  )
}
