import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { PageIntro } from '@/components/site/PageIntro'
import { PostCard } from '@/components/site/PostCard'
import { Button, Icon } from '@/components/ui'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { getPosts, getRouteContent } from '@/lib/cms'
import { cn } from '@/lib/cn'
import { buildMetadata } from '@/lib/metadata'

const CATEGORIES = ['buying', 'landowner', 'nrb', 'news'] as const
type Category = (typeof CATEGORIES)[number]
type Search = { category?: string; page?: string }
type Props = { params: Promise<{ locale: string }>; searchParams: Promise<Search> }
const PER_PAGE = 9

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const locale = (await params).locale as Locale
  const sp = await searchParams
  const t = await getTranslations({ locale, namespace: 'blog' })
  const { page } = await getRouteContent('blog', locale)
  const meta = await buildMetadata({ seo: page?.seo, title: t('metaTitle'), description: t('metaDescription'), path: '/blog', locale })
  return sp.category || sp.page ? { ...meta, robots: { index: false, follow: true } } : meta
}

export default async function BlogPage({ params, searchParams }: Props) {
  const locale = (await params).locale as Locale
  setRequestLocale(locale)
  const sp = await searchParams
  const t = await getTranslations('blog')
  const tc = await getTranslations('common')
  const category = CATEGORIES.includes(sp.category as Category) ? (sp.category as Category) : undefined
  const page = Math.max(1, Math.min(50, Number(sp.page) || 1))
  const [res, { hero, rest }] = await Promise.all([getPosts(locale, { category, page, limit: PER_PAGE }), getRouteContent('blog', locale)])

  const qs = (over: Search) => {
    const q = new URLSearchParams()
    for (const [k, v] of Object.entries({ category, ...over })) if (v) q.set(k, v)
    const s = q.toString()
    return s ? `/blog?${s}` : '/blog'
  }
  const tabs = [{ value: undefined, label: t('all') }, ...CATEGORIES.map((c) => ({ value: c, label: t(`categories.${c}`) }))]

  return (
    <>
      <PageIntro
        crumbs={[{ label: tc('home'), href: '/' }, { label: t('title') }]}
        eyebrow={hero?.eyebrow || t('eyebrow')}
        title={hero?.title || t('heading')}
        description={hero?.description || t('intro')}
      />
      <section className="bg-cream pt-8 pb-16 lg:pt-12 lg:pb-28">
        <div className="container-site">
          <nav aria-label={t('filterLabel')} className="-mx-5 mb-8 overflow-x-auto px-5 [scrollbar-width:none]">
            <ul className="inline-flex gap-1 rounded-full bg-white p-1.5 shadow-[inset_0_0_0_1px_var(--nr-line)]">
              {tabs.map((c) => {
                const active = category === c.value
                return (
                  <li key={c.label}>
                    <Link
                      href={qs({ category: c.value, page: undefined })}
                      scroll={false}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'inline-flex h-10 items-center rounded-full px-5 text-sm font-semibold whitespace-nowrap transition-colors',
                        active ? 'bg-ink text-cream' : 'text-muted hover:text-ink',
                      )}
                    >
                      {c.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {res.docs.length ? (
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {res.docs.map((p, i) => (
                <li key={p.id}>
                  <PostCard post={p} locale={locale} headingLevel={2} priority={i === 0} categoryLabel={p.category ? t(`categories.${p.category}`) : undefined} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center gap-5 rounded-lg bg-white px-6 py-16 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-gold-soft text-forest">
                <Icon name="mail" size={24} />
              </span>
              <h2 className="font-display text-[1.75rem] text-ink">{t('emptyTitle')}</h2>
              <p className="max-w-md text-body text-muted">{t('emptyBody')}</p>
              <Button href="/contact#enquire" iconRight="arrowRight">
                {tc('talkToAdvisor')}
              </Button>
            </div>
          )}

          {res.totalPages > 1 ? (
            <nav aria-label={t('pagination')} className="mt-12 flex items-center justify-center gap-2">
              {res.hasPrevPage ? (
                <Link href={qs({ page: page - 1 > 1 ? String(page - 1) : undefined })} aria-label={t('previous')} className="flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink hover:border-ink">
                  <Icon name="chevronLeft" size={18} />
                </Link>
              ) : null}
              {Array.from({ length: res.totalPages }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  href={qs({ page: n === 1 ? undefined : String(n) })}
                  aria-current={n === page ? 'page' : undefined}
                  className={cn('flex size-11 items-center justify-center rounded-full text-sm font-semibold', n === page ? 'bg-ink text-cream' : 'border border-line bg-white text-ink hover:border-ink')}
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
      {rest.length ? <RenderBlocks blocks={rest} locale={locale} /> : null}
    </>
  )
}
