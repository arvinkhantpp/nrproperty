import { StatBlock } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { cn } from '@/lib/cn'
import { getSiteData } from '@/lib/site'

import { Section, toneOf } from './Section'
import type { BlockOf } from './types'

export async function StatsBlock({ data, locale }: { data: BlockOf<'stats'>; locale: Locale }) {
  const items =
    data.source === 'custom' ? (data.items ?? []) : ((await getSiteData(locale)).settings.stats ?? [])
  if (!items.length) return null
  const tone = toneOf(data.background)
  return (
    <Section background={data.background} anchorId={data.anchorId} className="!py-12 lg:!py-20">
      <ul className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-0">
        {items.slice(0, 4).map((s, i) => (
          <li
            key={s.id ?? i}
            className={cn(
              'flex lg:justify-center lg:px-6',
              i > 0 && (tone === 'light' ? 'lg:border-l lg:border-line' : 'lg:border-l lg:border-white/15'),
            )}
          >
            <StatBlock value={s.value} label={s.label ?? ''} tone={tone} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
