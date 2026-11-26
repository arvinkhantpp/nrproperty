import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { ReactNode } from 'react'

import { EmiCalculator } from '@/components/projects/EmiCalculator'
import { FloorPlans, type Plan } from '@/components/projects/FloorPlans'
import { BrochureButton, ProjectMobileBar, ProjectSidebar } from '@/components/projects/ProjectActions'
import { ProjectGallery } from '@/components/projects/ProjectGallery'
import { VideoEmbed } from '@/components/projects/VideoEmbed'
import { RichText } from '@/components/site/RichText'
import { Accordion, Breadcrumbs, Icon, ProjectCard, StatusBadge, type IconName, type ProjectStatus } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { getProject, getProjects } from '@/lib/cms'
import { formatMonthYear, formatNumber, formatPriceShort, formatSizeRange } from '@/lib/format'
import { fileUrl, imageOf } from '@/lib/media'
import { buildMetadata } from '@/lib/metadata'
import { areaName, PLACEHOLDER_IMAGE, toCardProps } from '@/lib/project-card'
import type { Amenity, Project } from '@/payload-types'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const p = await getProject(slug, locale as Locale)
  if (!p) return {}
  const cover = Array.isArray(p.gallery) ? p.gallery[0] : null
  return buildMetadata({
    seo: p.seo,
    title: p.name,
    description: p.tagline,
    path: `/projects/${slug}`,
    locale: locale as Locale,
    image: typeof cover === 'object' ? cover : null,
  })
}

function SectionTitle({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-28 font-display text-[2rem] leading-tight text-ink lg:text-[2.25rem]">
      {children}
    </h2>
  )
}

async function similarProjects(p: Project, locale: Locale) {
  const areaSlug = p.area && typeof p.area === 'object' ? (p.area.slug ?? undefined) : undefined
  const near = areaSlug ? (await getProjects(locale, { area: areaSlug, exclude: p.id, limit: 3 })).docs : []
  if (near.length >= 3) return near
  const more = (await getProjects(locale, { exclude: p.id, limit: 6 })).docs.filter((d) => !near.some((n) => n.id === d.id))
  return [...near, ...more].slice(0, 3)
}

export default async function ProjectPage({ params }: Props) {
  const { locale: loc, slug } = await params
  const locale = loc as Locale
  setRequestLocale(locale)
  const p = await getProject(slug, locale)
  if (!p) notFound()

  const t = await getTranslations('project')
  const tc = await getTranslations('common')
  const f = p.facts ?? {}
  const id = String(p.id)
  const name = p.name ?? ''

  const gallery = (p.gallery ?? [])
    .map((m) => {
      const card = imageOf(m, 'card')
      const wide = imageOf(m, 'wide')
      return card ? { src: wide?.src ?? card.src, alt: card.alt, full: wide?.src } : null
    })
    .filter((x): x is NonNullable<typeof x> => Boolean(x))
  const images = gallery.length ? gallery : [{ ...PLACEHOLDER_IMAGE, alt: name }]

  type Fact = { icon: IconName; label: string; value: string }
  const facts = ([
    f.landAreaKatha ? { icon: 'land' as const, label: t('landArea'), value: `${formatNumber(f.landAreaKatha)} ${tc('katha')}` } : null,
    f.floors ? { icon: 'floors' as const, label: t('floors'), value: f.floors } : null,
    f.units ? { icon: 'grid' as const, label: t('units'), value: String(f.units) } : null,
    formatSizeRange(f.sizeMinSft, f.sizeMaxSft) ? { icon: 'area' as const, label: t('unitSize'), value: formatSizeRange(f.sizeMinSft, f.sizeMaxSft)! } : null,
    f.bedrooms ? { icon: 'bed' as const, label: t('bedrooms'), value: f.bedrooms } : null,
    f.bathrooms ? { icon: 'layers' as const, label: t('bathrooms'), value: f.bathrooms } : null,
    f.frontRoadFt ? { icon: 'road' as const, label: t('frontRoad'), value: `${f.frontRoadFt} ft` } : null,
    f.parking ? { icon: 'car' as const, label: t('parking'), value: f.parking } : null,
    f.handoverDate ? { icon: 'calendar' as const, label: t('handover'), value: formatMonthYear(f.handoverDate, locale) ?? '' } : null,
  ] as (Fact | null)[]).filter((x): x is Fact => Boolean(x))

  const plans: Plan[] = (p.floorPlans ?? []).map((fp, i) => ({
    id: fp.id ?? String(i),
    name: fp.name ?? `Type ${i + 1}`,
    sizeSft: fp.sizeSft,
    beds: fp.beds,
    baths: fp.baths,
    balconies: fp.balconies,
    facing: fp.facing,
    image: imageOf(fp.image, 'wide'),
    pdf: fileUrl(fp.pdf),
  }))
  const amenities = (p.amenities ?? []).filter((a): a is Amenity => typeof a === 'object')
  const nearby = p.nearby ?? []
  const progress = p.progress
  const updates = [...(progress?.updates ?? [])].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4)
  const faqs = (p.faqs ?? []).map((q, i) => ({ id: q.id ?? String(i), question: q.question ?? '', answer: <p className="whitespace-pre-line">{q.answer}</p> }))
  const price = p.showPrice ? formatPriceShort(p.startingPrice) : null
  const advisorDoc = p.advisor && typeof p.advisor === 'object' ? p.advisor : null
  const advisor = advisorDoc
    ? { name: advisorDoc.name ?? '', role: advisorDoc.role, phone: advisorDoc.phone, whatsapp: advisorDoc.whatsapp, photo: imageOf(advisorDoc.photo, 'thumb')?.src ?? null }
    : null
  const hasBrochure = Boolean(fileUrl(p.brochure))
  const similar = await similarProjects(p, locale)
  const cardLabels = { beds: tc('beds'), city: tc('city') }

  const nav = [
    { id: 'overview', label: t('overview') },
    plans.length ? { id: 'floor-plans', label: t('floorPlans') } : null,
    amenities.length ? { id: 'amenities', label: t('amenities') } : null,
    p.geo?.mapEmbedUrl || nearby.length ? { id: 'location', label: t('location') } : null,
    progress?.percent != null || updates.length ? { id: 'progress', label: t('progress') } : null,
    p.showPrice && p.startingPrice ? { id: 'emi', label: t('emi') } : null,
    faqs.length ? { id: 'faq', label: t('faq') } : null,
  ].filter((x): x is { id: string; label: string } => Boolean(x))

  return (
    <>
      <div className="bg-cream">
        <div className="container-site hidden pt-6 sm:block lg:pt-8">
          <Breadcrumbs items={[{ label: tc('home'), href: '/' }, { label: t('projects'), href: '/projects' }, { label: name }]} />
        </div>

        {/* Phones: edge-to-edge photo with the title on a rounded sheet over it. */}
        <div className="sm:container-site sm:mt-5 lg:mt-6">
          <ProjectGallery images={images} name={name} />
        </div>

        <div className="relative z-10 -mt-6 rounded-t-[24px] bg-cream sm:mt-0 sm:rounded-none">
          <div className="container-site flex flex-col gap-4 pt-7 pb-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:pt-10 lg:pb-12">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={(p.status ?? 'ongoing') as ProjectStatus} />
                {f.rajukNo ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E6F0EA] px-3 py-1 text-small font-semibold text-[#1F5C41]">
                    <Icon name="shield" size={14} />
                    {t('rajukApproved')}
                  </span>
                ) : null}
              </div>
              <h1 className="text-display-l text-ink">{name}</h1>
              {p.tagline ? <p className="max-w-[40rem] text-body-l text-muted">{p.tagline}</p> : null}
              <p className="inline-flex items-start gap-2 text-body text-text">
                <Icon name="pin" size={18} className="mt-0.5 shrink-0 text-gold-text" />
                {p.address || areaName(p)}
              </p>
            </div>
            <div className="flex flex-col lg:items-end">
              <span className="text-[0.6875rem] font-semibold tracking-[1.6px] text-muted uppercase">{price ? tc('startingFrom') : t('price')}</span>
              <span className="font-display text-[2.25rem] leading-tight text-ink">{price ?? tc('priceOnRequest')}</span>
              {p.priceNote ? <span className="text-small text-muted">{p.priceNote}</span> : null}
            </div>
          </div>
        </div>

        {nav.length > 2 ? (
          <nav aria-label={t('sections')} className="sticky top-16 z-30 border-y border-line bg-cream/95 backdrop-blur lg:top-18">
            <ul className="container-site flex gap-6 overflow-x-auto [scrollbar-width:none]">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="inline-flex h-12 items-center text-sm font-semibold whitespace-nowrap text-muted hover:text-ink">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <div className="container-site flex flex-col gap-14 pt-10 pb-20 lg:flex-row lg:gap-16 lg:pt-14 lg:pb-28">
          <div className="flex min-w-0 flex-1 flex-col gap-14 lg:gap-20">
            <section aria-labelledby="overview" className="flex flex-col gap-8">
              <SectionTitle id="overview">{t('overview')}</SectionTitle>
              <RichText data={p.overview} />
              {facts.length ? (
                <div>
                  <h3 className="sr-only">{t('keyFacts')}</h3>
                  <dl className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {facts.map((fact) => (
                      <div key={fact.label} className="flex flex-col gap-3 rounded-md bg-white p-4 lg:p-5">
                        <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-full bg-[#F3ECDF] text-gold-text">
                          <Icon name={fact.icon} size={18} />
                        </span>
                        <div className="flex flex-col">
                          <dt className="text-[0.6875rem] font-semibold tracking-[1.4px] text-muted uppercase">{fact.label}</dt>
                          <dd className="text-body-l font-semibold text-ink">{fact.value}</dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                </div>
              ) : null}
              {f.rajukNo ? (
                <p className="flex items-center gap-3 rounded-md bg-[#E6F0EA] px-5 py-4 text-body font-semibold text-[#1F5C41]">
                  <Icon name="shield" size={20} />
                  {t('rajukLine', { no: f.rajukNo })}
                </p>
              ) : null}
              <div className="lg:hidden">
                {hasBrochure ? <BrochureButton projectId={id} /> : null}
              </div>
            </section>

            {plans.length ? (
              <section aria-labelledby="floor-plans" className="flex flex-col gap-6">
                <SectionTitle id="floor-plans">{t('floorPlans')}</SectionTitle>
                <FloorPlans plans={plans} />
              </section>
            ) : null}

            {amenities.length ? (
              <section aria-labelledby="amenities" className="flex flex-col gap-6">
                <SectionTitle id="amenities">{t('amenities')}</SectionTitle>
                <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
                  {amenities.map((a) => (
                    <li key={a.id} className="flex items-center gap-3 rounded-md bg-[#EFE8DC] px-4 py-3.5 text-body font-medium text-ink">
                      <Icon name={(a.icon ?? 'check') as IconName} size={18} className="shrink-0 text-gold-text" />
                      {a.name}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {(p.videos ?? []).length ? (
              <section aria-label={t('videos')} className="grid gap-4 md:grid-cols-2">
                {(p.videos ?? []).map((v, i) => (
                  <VideoEmbed key={v.id ?? i} url={v.url} title={v.title ?? ''} />
                ))}
              </section>
            ) : null}

            {p.geo?.mapEmbedUrl || nearby.length ? (
              <section aria-labelledby="location" className="flex flex-col gap-6">
                <SectionTitle id="location">{t('location')}</SectionTitle>
                <div className={p.geo?.mapEmbedUrl && nearby.length ? "grid gap-5 md:grid-cols-[1.4fr_1fr]" : "grid gap-5"}>
                  {p.geo?.mapEmbedUrl ? (
                    <iframe
                      src={p.geo.mapEmbedUrl}
                      title={t('mapTitle', { name })}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="aspect-[4/3] w-full rounded-lg border-0 bg-sand md:aspect-auto md:min-h-[320px]"
                    />
                  ) : null}
                  {nearby.length ? (
                    <ul className={p.geo?.mapEmbedUrl ? "flex flex-col rounded-lg bg-white px-5" : "grid rounded-lg bg-white px-5 sm:grid-cols-2 sm:gap-x-8"}>
                      {nearby.map((n, i) => (
                        <li key={n.id ?? i} className="flex items-center justify-between gap-4 border-b border-line py-3.5 last:border-0">
                          <span className="text-body text-ink">{n.place}</span>
                          <span className="shrink-0 text-small font-semibold text-muted">
                            {t(n.mode === 'walk' ? 'minWalk' : 'minDrive', { n: n.minutes })}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ) : null}

            {progress?.percent != null || updates.length ? (
              <section aria-labelledby="progress" className="flex flex-col gap-6">
                <SectionTitle id="progress">{t('progress')}</SectionTitle>
                {progress?.percent != null ? (
                  <div className="rounded-lg bg-white p-6">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[0.6875rem] font-semibold tracking-[1.6px] text-muted uppercase">{t('currentStage')}</p>
                        <p className="text-body-l font-semibold text-ink">{progress.stage}</p>
                      </div>
                      <p className="font-display text-[2.25rem] leading-none text-ink">{progress.percent}%</p>
                    </div>
                    <div
                      className="mt-4 h-2 overflow-hidden rounded-full bg-sand"
                      role="progressbar"
                      aria-valuenow={progress.percent}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={t('progress')}
                    >
                      <div className="h-full rounded-full bg-gold" style={{ width: `${progress.percent}%` }} />
                    </div>
                  </div>
                ) : null}
                {updates.length ? (
                  <ol className="flex flex-col gap-4">
                    {updates.map((u, i) => {
                      const photo = imageOf(Array.isArray(u.photos) ? u.photos[0] : null, 'thumb')
                      return (
                        <li key={u.id ?? i} className="flex gap-4 rounded-md bg-white p-4">
                          {photo ? (
                            <Image src={photo.src} alt={photo.alt} width={120} height={90} className="h-[72px] w-24 shrink-0 rounded-sm object-cover" />
                          ) : null}
                          <div>
                            <p className="text-small font-semibold text-gold-text">{formatMonthYear(u.date, locale)}</p>
                            <p className="text-body text-ink">{u.note}</p>
                          </div>
                        </li>
                      )
                    })}
                  </ol>
                ) : null}
              </section>
            ) : null}

            {p.showPrice && p.startingPrice ? (
              <section aria-labelledby="emi" className="flex flex-col gap-6">
                <SectionTitle id="emi">{t('emi')}</SectionTitle>
                <EmiCalculator price={p.startingPrice} />
              </section>
            ) : null}

            {faqs.length ? (
              <section aria-labelledby="faq" className="flex flex-col gap-6">
                <SectionTitle id="faq">{t('faq')}</SectionTitle>
                <Accordion items={faqs} />
              </section>
            ) : null}
          </div>

          <aside className="lg:w-[400px] lg:shrink-0" aria-label={t('enquireTitle')}>
            <div className="lg:sticky lg:top-36">
              <ProjectSidebar projectId={id} projectName={name} hasBrochure={hasBrochure} advisor={advisor} />
            </div>
          </aside>
        </div>
      </div>

      {similar.length ? (
        <section className="bg-sand section-y" aria-labelledby="similar">
          <div className="container-site">
            <h2 id="similar" className="text-display-m text-ink">
              {t('similar')}
            </h2>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {similar.map((s) => (
                <li key={s.id}>
                  <ProjectCard {...toCardProps(s, cardLabels)} className="h-full" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <ProjectMobileBar projectId={id} projectName={name} />
    </>
  )
}
