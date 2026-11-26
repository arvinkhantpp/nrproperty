import { getTranslations } from 'next-intl/server'

import { PostCard } from '@/components/site/PostCard'
import { Button, SectionHeader } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { getPosts } from '@/lib/cms'
import { withAccent } from '@/lib/text'

import { Section, toneOf } from './Section'
import type { BlockOf } from './types'

export async function BlogLatestBlock({ data, locale }: { data: BlockOf<'blogLatest'>; locale: Locale }) {
  const res = await getPosts(locale, { limit: data.limit ?? 3 })
  if (!res.docs.length) return null
  const t = await getTranslations('blog')
  const tone = toneOf(data.background)
  return (
    <Section background={data.background} anchorId={data.anchorId}>
      <SectionHeader
        eyebrow={data.eyebrow}
        title={withAccent(data.title, tone)}
        description={data.description}
        tone={tone}
        action={
          data.cta?.href && data.cta.label ? (
            <Button href={data.cta.href} variant={tone === 'light' ? 'outline' : 'onDark'} iconRight="arrowRight" className="max-lg:hidden">
              {data.cta.label}
            </Button>
          ) : null
        }
      />
      <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
        {res.docs.map((p) => (
          <li key={p.id}>
            <PostCard post={p} locale={locale} categoryLabel={p.category ? t(`categories.${p.category}`) : undefined} />
          </li>
        ))}
      </ul>
      {data.cta?.href && data.cta.label ? (
        <div className="mt-8 lg:hidden">
          <Button href={data.cta.href} variant={tone === 'light' ? 'outline' : 'onDark'} iconRight="arrowRight" fullWidth>
            {data.cta.label}
          </Button>
        </div>
      ) : null}
    </Section>
  )
}
