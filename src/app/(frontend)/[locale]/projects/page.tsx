import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { ProjectFilters } from '@/components/projects/ProjectFilters'
import { Breadcrumbs, Button, Eyebrow, Icon, ProjectCard } from '@/components/ui'
import { PROJECT_STATUSES, PROJECT_TYPES } from '@/fields'
import { getPathname, Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { getAreas, getProjects, SIZE_BUCKETS } from '@/lib/cms'
import { cn } from '@/lib/cn'
import { buildMetadata } from '@/lib/metadata'
import { toCardProps } from '@/lib/project-card'

type Search = { status?: string; type?: string; area?: string; size?: string; beds?: string; page?: string }
type Props = { params: Promise<{ locale: string }>; searchParams: Promise<Search> }

const PER_PAGE = 9
const pick = (v: string | undefined, allowed: string[]) => (v && allowed.includes(v) ? v : undefined)

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const locale = (await params).locale as Locale
  const sp = await searchParams
  const t = await getTranslations({ locale, namespace: 'projects' })
  const filtered = Object.entries(sp).some(([k, v]) => k !== 'page' && v)
  const meta = await buildMetadata({ title: t('metaTitle'), description: t('metaDescription'), path: '/projects', locale })
  // Filtered combinations are not separate pages for search engines.
  return filtered ? { ...meta, robots: { index: false, follow: true } } : meta
}

export default async function ProjectsPage({ params, searchParams }: Props) {
  const locale = (await params).locale as Locale
  setRequestLocale(locale)
  const sp = await searchParams
  const t = await getTranslations('projects')
  const tf = await getTranslations('filters')
  const tc = await getTranslations('common')
  const ts = await getTranslations('status')

  const areas = await getAreas(locale)
  const filters = {
    status: pick(sp.status, PROJECT_STATUSES.map((s) => s.value)),
    type: pick(sp.type, PROJECT_TYPES.map((s) => s.value)),
    area: pick(sp.area, areas.map((a) => a.slug ?? '')),
    size: pick(sp.size, Object.keys(SIZE_BUCKETS)),
    beds: pick(sp.beds, ['2', '3', '4', '5+']),
  }
  const page = Math.max(1, Math.min(50, Number(sp.page) || 1))
  const res = await getProjects(locale, { ...filters, page, limit: PER_PAGE })
  const labels = { beds: tc('beds'), city: tc('city') }
  const action = getPathname({ href: '/projects', locale })
  const hasFilters = Object.values(filters).some(Boolean)

  const qs = (over: Partial<Search>) => {
    const q = new URLSearchParams()
    for (const [k, v] of Object.entries({ ...filters, page: undefined, ...over })) if (v) q.set(k, String(v))
    const s = q.toString()
    return s ? `/projects?${s}` : '/projects'
  }

  const statusTabs = [{ value: undefined, label: tf('all') }, ...(['ongoing', 'upcoming', 'completed'] as const).map((s) => ({ value: s, label: ts(s) }))]

  return (
    <>
      <section className="bg-ink text-cream">
        <div className="container-site flex flex-col gap-5 pt-10 pb-12 lg:pt-14 lg:pb-16">
          <Breadcrumbs items={[{ label: tc('home'), href: '/' }, { label: t('title') }]} tone="dark" />
          <Eyebrow tone="dark">{t('eyebrow')}</Eyebrow>
          <h1 className="max-w-[44rem] text-display-l text-balance">{t('heading')}</h1>
          <p className="max-w-[36rem] text-body-l text-cream/75">{t('intro')}</p>
        </div>
      </section>

      <section className="bg-cream pt-8 pb-16 lg:pt-12 lg:pb-28">
        <div className="container-site">
          <nav aria-label={tf('status')} className="-mx-5 mb-5 overflow-x-auto px-5 [scrollbar-width:none]">
            <ul className="inline-flex gap-1 rounded-full bg-white p-1.5 shadow-[inset_0_0_0_1px_var(--nr-line)]">
              {statusTabs.map((s) => {
                const active = filters.status === s.value
                return (
                  <li key={s.label}>
                    <Link
                      href={qs({ status: s.value })}
                      scroll={false}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'inline-flex h-10 items-center rounded-full px-5 text-sm font-semibold whitespace-nowrap transition-colors',
                        active ? 'bg-ink text-cream' : 'text-muted hover:text-ink',
                      )}
                    >
                      {s.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <ProjectFilters
            key={JSON.stringify(filters)}
            action={action}
            values={filters}
            areas={areas.map((a) => ({ value: a.slug ?? '', label: a.name ?? '' }))}
            types={PROJECT_TYPES.map((x) => ({ value: x.value, label: tf(`types.${x.value}`) }))}
            sizes={[
              { value: 'under-1500', label: tf('sizeUnder1500') },
              { value: '1500-2000', label: '1,500–2,000 sft' },
              { value: '2000-2500', label: '2,000–2,500 sft' },
              { value: '2500-plus', label: tf('size2500plus') },
            ]}
            beds={['2', '3', '4', '5+'].map((b) => ({ value: b, label: tf('bedsOption', { n: b }) }))}
          />

          <div className="mt-8 mb-6 flex items-center justify-between gap-4">
            <p className="text-body text-muted" aria-live="polite">
              {t('count', { count: res.totalDocs })}
            </p>
            {hasFilters ? (
              <Link href="/projects" scroll={false} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink underline-offset-4 hover:underline">
                <Icon name="close" size={16} />
                {tf('clear')}
              </Link>
            ) : null}
          </div>

          {res.docs.length ? (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {res.docs.map((p, i) => (
                <li key={p.id}>
                  <ProjectCard {...toCardProps(p, labels)} priority={i < 3} className="h-full" />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center gap-5 rounded-lg bg-white px-6 py-16 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-gold-soft text-forest">
                <Icon name="search" size={24} />
              </span>
              <h2 className="font-display text-[1.75rem] text-ink">{t('emptyTitle')}</h2>
              <p className="max-w-md text-body text-muted">{t('emptyBody')}</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href="/projects" variant="outline">
                  {tf('clear')}
                </Button>
                <Button href="/contact#enquire" iconRight="arrowRight">
                  {t('emptyCta')}
                </Button>
              </div>
            </div>
          )}

          {res.totalPages > 1 ? (
            <nav aria-label={t('pagination')} className="mt-12 flex items-center justify-center gap-2">
              {res.hasPrevPage ? (
                <Link href={qs({ page: String(page - 1) })} aria-label={t('previous')} className="flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink hover:border-ink">
                  <Icon name="chevronLeft" size={18} />
                </Link>
              ) : null}
              {Array.from({ length: res.totalPages }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  href={qs({ page: n === 1 ? undefined : String(n) })}
                  aria-current={n === page ? 'page' : undefined}
                  className={cn(
                    'flex size-11 items-center justify-center rounded-full text-sm font-semibold',
                    n === page ? 'bg-ink text-cream' : 'border border-line bg-white text-ink hover:border-ink',
                  )}
                >
                  {n}
                </Link>
              ))}
              {res.hasNextPage ? (
                <Link href={qs({ page: String(page + 1) })} aria-label={t('next')} className="flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink hover:border-ink">
                  <Icon name="chevronRight" size={18} />
                </Link>
              ) : null}
            </nav>
          ) : null}
        </div>
      </section>
    </>
  )
}
