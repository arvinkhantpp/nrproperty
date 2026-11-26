import { Accordion, SectionHeader } from '@/components/ui'
import { withAccent } from '@/lib/text'

import { Section, toneOf } from './Section'
import type { BlockOf } from './types'

export function FaqBlock({ data }: { data: BlockOf<'faq'> }) {
  const tone = toneOf(data.background)
  const items = (data.items ?? []).map((it, i) => ({
    id: it.id ?? String(i),
    question: it.question ?? '',
    answer: <p className="whitespace-pre-line">{it.answer}</p>,
  }))
  if (!items.length) return null
  return (
    <Section background={data.background} anchorId={data.anchorId}>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeader eyebrow={data.eyebrow} title={withAccent(data.title, tone)} description={data.description} tone={tone} className="lg:self-start" />
        <Accordion items={items} tone={tone} />
      </div>
    </Section>
  )
}
