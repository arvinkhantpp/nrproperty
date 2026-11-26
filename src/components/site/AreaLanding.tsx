import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { LeadForm } from '@/components/forms/LeadForm'
import { Breadcrumbs, Button, Eyebrow, ProjectCard } from '@/components/ui'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { areaPath } from '@/lib/areas'
import { getAreas, getProjects } from '@/lib/cms'
import { lexicalText } from '@/lib/lexical-text'
import { imageOf } from '@/lib/media'
import { toCardProps } from '@/lib/project-card'
import { withAccent } from '@/lib/text'
import type { Area } from '@/payload-types'

import { RichText } from './RichText'

/** Ad and SEO landing page for one neighbourhood: /apartments-in-<area>. */
export async function AreaLanding({ area, locale }: { area: Area; locale: Locale }) {
  const t = await getTranslations('area')
  const tc = await getTranslations('common')
  const tp = await getTranslations('projects')
  const name = area.name ?? ''
  const [res, areas] = await Promise.all([getProjects(locale, { area: area.slug ?? '', limit: 12 }), getAreas(locale)])
  const hero = imageOf(area.heroImage, 'wide')
  const hasIntro = Boolean(lexicalText(area.intro))
  const others = areas.filter((a) => a.id !== area.id && a.slug)

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-cream">
        {hero ? (
          <>
            <Image src={hero.src} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/30" />
          </>
        ) : null}
        <div className="container-site flex flex-col gap-5 pt-10 pb-14 lg:pt-16 lg:pb-24">
          <Breadcrumbs items={[{ label: tc('home'), href: '/' }, { label: tp('title'), href: '/projects' }, { label: name }]} tone="dark" />
          <Eyebrow tone="dark">{t('eyebrow', { area: name })}</Eyebrow>
          <h1 className="max-w-[44rem] text-display-l text-balance">{withAccent(t('heading', { area: name }), 'dark')}</h1>
          <p className="max-w-[36rem] text-body-l text-cream/80">{t('projectsCount', { count: res.totalDocs })}</p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button href="#enquire" iconRight="arrowRight">
              {t('enquireTitle', { area: name })}
            </Button>
            {res.totalDocs ? (
              <Button href={`/projects?area=${area.slug}`} variant="onDark">
                {t('seeAll', { area: name })}
              </Button>
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-cream py-14 lg:py-24">
        <div className="container-site">
          <h2 className="mb-8 font-display text-display-m text-ink">{t('projectsTitle', { area: name })}</h2>
          {res.docs.length ? (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {res.docs.map((p, i) => (
                <li key={p.id}>
                  <ProjectCard {...toCardProps(p, { beds: tc('beds'), city: tc('city') })} priority={i < 3} className="h-full" />
                </li>
              ))}
            </ul>
          ) : (
            <p className="max-w-xl rounded-lg bg-white p-8 text-body-l text-muted">{t('emptyBody', { area: name })}</p>
          )}
        </div>
      </section>

      <section className="bg-sand py-14 lg:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-20">
          <div className="flex min-w-0 flex-col gap-6">
            {hasIntro ? (
              <>
                <h2 className="font-display text-display-m text-ink">{t('about', { area: name })}</h2>
                <RichText data={area.intro} />
              </>
            ) : null}
            {others.length ? (
              <nav aria-labelledby="other-areas" className={hasIntro ? 'mt-6' : ''}>
                <h2 id="other-areas" className="mb-4 text-eyebrow text-[0.6875rem] text-gold-text">
                  {t('otherAreas')}
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {others.map((a) => (
                    <li key={a.id}>
                      <Link
                        href={areaPath(a.slug!)}
                        className="inline-flex h-10 items-center rounded-full border border-line bg-white px-4 text-sm font-semibold text-ink hover:border-ink"
                      >
                        {a.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </div>
          <div id="enquire" className="scroll-mt-28 rounded-lg bg-white p-6 shadow-card lg:p-8">
            <h2 className="font-display text-[1.75rem] leading-tight text-ink">{t('enquireTitle', { area: name })}</h2>
            <p className="mt-1 mb-5 text-small text-muted">{t('enquireBody')}</p>
            <LeadForm type="enquiry" projectId={res.docs[0] ? String(res.docs[0].id) : undefined} showPromise />
          </div>
        </div>
      </section>
    </>
  )
}
