import { getTranslations } from 'next-intl/server'

import { Button, SectionHeader } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { getProjects } from '@/lib/cms'
import { toCardProps } from '@/lib/project-card'
import { withAccent } from '@/lib/text'

import { FeaturedProjectsTabs } from './FeaturedProjectsTabs'
import { Section, toneOf } from './Section'
import type { BlockOf } from './types'

export async function FeaturedProjectsBlock({ data, locale }: { data: BlockOf<'featuredProjects'>; locale: Locale }) {
  const t = await getTranslations('common')
  const ts = await getTranslations('status')
  const limit = data.limit ?? 3
  const res = await getProjects(locale, { limit: 30 })
  const labels = { beds: t('beds'), city: t('city') }
  const all = res.docs.map((p) => ({ ...toCardProps(p, labels), featured: Boolean(p.featuredOnHome) }))
  if (!all.length) return null
  const tone = toneOf(data.background)

  const statuses = (['ongoing', 'upcoming', 'completed'] as const).filter((s) => all.some((p) => p.status === s))
  const groups = data.showTabs
    ? statuses.map((s) => ({ id: s, label: ts(s), cards: all.filter((p) => p.status === s).slice(0, limit) }))
    : [
        {
          id: 'featured',
          label: '',
          cards: [...all].sort((a, b) => Number(b.featured) - Number(a.featured)).slice(0, limit),
        },
      ]

  const cta = data.cta?.href && data.cta.label ? (
    <Button href={data.cta.href} variant={tone === 'light' ? 'outline' : 'onDark'} iconRight="arrowRight">
      {data.cta.label}
    </Button>
  ) : null

  return (
    <Section background={data.background} anchorId={data.anchorId}>
      <SectionHeader
        eyebrow={data.eyebrow}
        title={withAccent(data.title, tone)}
        description={data.description}
        tone={tone}
      />
      <FeaturedProjectsTabs groups={groups} tabsLabel={t('projectStatus')} />
      {cta ? <div className="mt-10 flex justify-center lg:mt-14">{cta}</div> : null}
    </Section>
  )
}
