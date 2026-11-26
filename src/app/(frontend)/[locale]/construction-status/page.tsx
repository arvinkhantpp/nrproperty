import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { GalleryGrid } from '@/components/site/Lightbox'
import { PageIntro } from '@/components/site/PageIntro'
import { Button, Icon, StatusBadge } from '@/components/ui'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { getProgressProjects, getRouteContent } from '@/lib/cms'
import { whatsappHref } from '@/lib/contact'
import { formatMonthYear } from '@/lib/format'
import { imageOf, type ImageRef } from '@/lib/media'
import { buildMetadata } from '@/lib/metadata'
import { areaName, PLACEHOLDER_IMAGE } from '@/lib/project-card'
import { getSiteData } from '@/lib/site'
import type { Project } from '@/payload-types'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale as Locale
  const t = await getTranslations({ locale, namespace: 'construction' })
  const { page } = await getRouteContent('construction-status', locale)
  return buildMetadata({ seo: page?.seo, title: t('metaTitle'), description: t('metaDescription'), path: '/construction-status', locale })
}

const updatesOf = (p: Project) => [...(p.progress?.updates ?? [])].sort((a, b) => b.date.localeCompare(a.date))
const coverOf = (p: Project): ImageRef => {
  const latest = updatesOf(p)[0]?.photos?.[0]
  return imageOf(latest ?? null, 'card') ?? imageOf(p.gallery?.[0] ?? null, 'card') ?? PLACEHOLDER_IMAGE
}

export default async function ConstructionStatusPage({ params }: Props) {
  const locale = (await params).locale as Locale
  setRequestLocale(locale)
  const t = await getTranslations('construction')
  const tc = await getTranslations('common')
  const [projects, { hero, rest }, { contact }] = await Promise.all([
    getProgressProjects(locale),
    getRouteContent('construction-status', locale),
    getSiteData(locale),
  ])
  const ongoing = projects.filter((p) => p.status === 'ongoing')
  const upcoming = projects.filter((p) => p.status === 'upcoming')
  const completed = projects.filter((p) => p.status === 'completed')
  const counts = [
    { n: ongoing.length, label: t('underConstruction') },
    { n: upcoming.length, label: t('upcoming') },
    { n: completed.length, label: t('handedOver') },
  ].filter((c) => c.n)

  return (
    <>
      <PageIntro
        crumbs={[{ label: tc('home'), href: '/' }, { label: t('title') }]}
        eyebrow={hero?.eyebrow || t('eyebrow')}
        title={hero?.title || t('heading')}
        description={hero?.description || t('intro')}
      >
        {counts.length ? (
          <ul className="mt-2 flex flex-wrap gap-2">
            {counts.map((c) => (
              <li key={c.label} className="rounded-full bg-white/10 px-4 py-2 text-small text-cream">
                <strong className="font-semibold">{c.n}</strong> {c.label}
              </li>
            ))}
          </ul>
        ) : null}
      </PageIntro>

      <section className="bg-cream py-12 lg:py-20">
        <div className="container-site flex flex-col gap-8 lg:gap-10">
          {ongoing.map((p) => {
            const updates = updatesOf(p)
            const latest = updates[0]
            const photos = (latest?.photos ?? []).map((m) => imageOf(m, 'card')).filter((x): x is ImageRef => Boolean(x))
            const cover = coverOf(p)
            const percent = p.progress?.percent ?? 0
            return (
              <article key={p.id} className="overflow-hidden rounded-lg bg-white shadow-card lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <div className="relative aspect-[4/3] bg-sand lg:aspect-auto lg:min-h-[26rem]">
                  <Image src={cover.src} alt={cover.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                  <StatusBadge status="ongoing" onImage className="absolute top-4 left-4" />
                </div>
                <div className="flex flex-col gap-6 p-6 lg:p-10">
                  <div className="flex flex-col gap-1">
                    <h2 className="font-display text-[2rem] leading-tight text-ink">
                      <Link href={`/projects/${p.slug}`} className="hover:underline">
                        {p.name}
                      </Link>
                    </h2>
                    <p className="flex items-center gap-1.5 text-small text-muted">
                      <Icon name="pin" size={16} />
                      {p.address || areaName(p)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-eyebrow text-[0.6875rem] text-gold-text">{t('stage')}</p>
                        <p className="text-body-l font-semibold text-ink">{p.progress?.stage || '—'}</p>
                      </div>
                      <p className="font-display text-[2.5rem] leading-none text-ink">{percent}%</p>
                    </div>
                    <div
                      className="h-2.5 overflow-hidden rounded-full bg-sand"
                      role="progressbar"
                      aria-valuenow={percent}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={t('complete', { n: percent })}
                    >
                      <div className="h-full rounded-full bg-gold" style={{ width: `${percent}%` }} />
                    </div>
                    <p className="text-small text-muted">
                      {latest ? t('lastUpdate', { date: formatMonthYear(latest.date, locale) ?? '' }) : t('noUpdates')}
                      {p.facts?.handoverDate ? ` · ${t('handover', { date: formatMonthYear(p.facts.handoverDate, locale) ?? '' })}` : ''}
                    </p>
                  </div>
                  {updates.length ? (
                    <ol className="flex flex-col gap-3 border-l-2 border-line pl-5">
                      {updates.slice(0, 3).map((u) => (
                        <li key={u.id ?? u.date} className="relative">
                          <span aria-hidden="true" className="absolute top-1.5 -left-[1.6rem] size-2.5 rounded-full bg-gold" />
                          <p className="text-small font-semibold text-ink">{formatMonthYear(u.date, locale)}</p>
                          {u.note ? <p className="text-small text-muted">{u.note}</p> : null}
                        </li>
                      ))}
                    </ol>
                  ) : null}
                  {photos.length > 1 ? (
                    <div>
                      <h3 className="sr-only">{t('photos', { name: p.name ?? '' })}</h3>
                      <GalleryGrid images={photos.slice(0, 4)} className="grid max-w-md grid-cols-4 gap-2" />
                    </div>
                  ) : null}
                  <div className="mt-auto flex flex-wrap gap-3">
                    <Button href={`/projects/${p.slug}#progress`} variant="dark" iconRight="arrowRight">
                      {t('viewProject')}
                    </Button>
                  </div>
                </div>
              </article>
            )
          })}

          {upcoming.length || completed.length ? (
            <div className={upcoming.length + completed.length > 2 ? 'grid gap-5 md:grid-cols-2 lg:grid-cols-3' : 'grid gap-5 md:grid-cols-2'}>
              {[...upcoming, ...completed].map((p) => {
                const cover = coverOf(p)
                const done = p.status === 'completed'
                return (
                  <article key={p.id} className="group relative flex flex-col overflow-hidden rounded-lg bg-white">
                    <div className="relative aspect-[16/10] bg-sand">
                      <Image src={cover.src} alt={cover.alt} fill sizes="(min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw" className="object-cover" />
                      <StatusBadge status={done ? 'completed' : 'upcoming'} onImage className="absolute top-4 left-4" />
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-6">
                      <h2 className="font-display text-[1.5rem] leading-snug text-ink">
                        <Link href={`/projects/${p.slug}`} className="after:absolute after:inset-0 after:content-['']">
                          {p.name}
                        </Link>
                      </h2>
                      <p className="text-small text-muted">{areaName(p)}</p>
                      <p className="mt-auto pt-2 text-small font-semibold text-ink">
                        {done
                          ? `${t('handedOver')}${p.facts?.handoverDate ? ` · ${formatMonthYear(p.facts.handoverDate, locale)}` : ''}`
                          : p.progress?.stage || t('upcoming')}
                      </p>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-forest text-cream">
        <div className="container-site flex flex-col items-start gap-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:py-16">
          <div className="max-w-xl">
            <h2 className="font-display text-display-m">{t('updatesTitle')}</h2>
            <p className="mt-2 text-body-l text-cream/75">{t('updatesBody')}</p>
          </div>
          <Button href={whatsappHref(contact.whatsapp, t('updatesTitle'))} variant="primary" iconLeft="whatsapp" data-track="whatsapp">
            {t('updatesCta')}
          </Button>
        </div>
      </section>
      {rest.length ? <RenderBlocks blocks={rest} locale={locale} /> : null}
    </>
  )
}
