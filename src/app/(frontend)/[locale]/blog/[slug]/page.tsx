import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { LeadForm } from '@/components/forms/LeadForm'
import { PostCard } from '@/components/site/PostCard'
import { RichText } from '@/components/site/RichText'
import { ShareButtons } from '@/components/site/ShareButtons'
import { Breadcrumbs, Eyebrow, ProjectCard } from '@/components/ui'
import { getPathname } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { getPost, getPosts } from '@/lib/cms'
import { formatDate } from '@/lib/format'
import { lexicalText, readingMinutes } from '@/lib/lexical-text'
import { imageOf } from '@/lib/media'
import { buildMetadata } from '@/lib/metadata'
import { toCardProps } from '@/lib/project-card'
import type { Post, Project, Team } from '@/payload-types'

type Props = { params: Promise<{ locale: string; slug: string }> }
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://nrproperty.com').replace(/\/$/, '')

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getPost(slug, locale as Locale)
  if (!post) return {}
  const meta = buildMetadata({ seo: post.seo, title: post.title, description: post.excerpt, path: `/blog/${slug}`, locale: locale as Locale, image: post.cover })
  return { ...meta, openGraph: { ...meta.openGraph, type: 'article', publishedTime: post.publishedAt ?? undefined } }
}

export default async function BlogPostPage({ params }: Props) {
  const { locale: l, slug } = await params
  const locale = l as Locale
  setRequestLocale(locale)
  const post = await getPost(slug, locale)
  if (!post) notFound()
  const t = await getTranslations('blog')
  const tc = await getTranslations('common')

  const cover = imageOf(post.cover, 'wide')
  const author = typeof post.author === 'object' ? (post.author as Team | null) : null
  const minutes = readingMinutes(lexicalText(post.body))
  const related = (post.relatedProjects ?? []).filter((p): p is Project => typeof p === 'object' && p !== null)
  // Same category first, then the latest from any category.
  const [sameCat, latest] = await Promise.all([
    post.category ? getPosts(locale, { limit: 4, category: post.category }) : Promise.resolve({ docs: [] as Post[] }),
    getPosts(locale, { limit: 4 }),
  ])
  const more = [...sameCat.docs, ...latest.docs].filter((p, i, all) => p.id !== post.id && all.findIndex((x) => x.id === p.id) === i).slice(0, 3)
  const url = `${SITE}${getPathname({ href: `/blog/${slug}`, locale })}`
  const category = post.category ? t(`categories.${post.category}`) : null

  return (
    <>
      <article>
        <header className="bg-cream">
          <div className="container-site flex max-w-[56rem] flex-col gap-5 pt-10 pb-8 lg:pt-14 lg:pb-10">
            <Breadcrumbs items={[{ label: tc('home'), href: '/' }, { label: t('title'), href: '/blog' }, { label: post.title ?? '' }]} />
            {category ? <Eyebrow>{category}</Eyebrow> : null}
            <h1 className="text-display-l text-balance text-ink">{post.title}</h1>
            {post.excerpt ? <p className="text-body-l text-muted">{post.excerpt}</p> : null}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-small text-muted">
                {author?.name ? <span className="font-semibold text-ink">{t('by', { name: author.name })}</span> : null}
                <time dateTime={post.publishedAt ?? undefined}>{formatDate(post.publishedAt, locale)}</time>
                <span aria-hidden="true">·</span>
                <span>{t('minRead', { n: minutes })}</span>
              </p>
              <ShareButtons url={url} title={post.title ?? ''} />
            </div>
          </div>
        </header>

        {cover ? (
          <div className="bg-cream">
            <div className="container-site max-w-[72rem]">
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-sand">
                <Image src={cover.src} alt={cover.alt} fill priority sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
              </div>
            </div>
          </div>
        ) : null}

        <div className="bg-cream pt-10 pb-16 lg:pt-16 lg:pb-24">
          <div className="container-site grid max-w-[72rem] gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
            <div className="min-w-0">
              <RichText data={post.body} />
              {related.length ? (
                <section aria-labelledby="related-projects" className="mt-14 border-t border-line pt-10">
                  <h2 id="related-projects" className="mb-6 font-display text-[1.75rem] text-ink">
                    {t('relatedProjects')}
                  </h2>
                  <ul className="grid gap-5 sm:grid-cols-2">
                    {related.slice(0, 2).map((p) => (
                      <li key={p.id}>
                        <ProjectCard {...toCardProps(p, { beds: tc('beds'), city: tc('city') })} className="h-full" />
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div id="enquire" className="scroll-mt-28 rounded-lg bg-white p-6 shadow-card lg:p-7">
                <h2 className="font-display text-[1.75rem] leading-tight text-ink">{t('enquireTitle')}</h2>
                <p className="mt-1 mb-5 text-small text-muted">{t('enquireBody')}</p>
                <LeadForm type="enquiry" projectId={related[0] ? String(related[0].id) : undefined} showPromise />
              </div>
            </aside>
          </div>
        </div>
      </article>

      {more.length ? (
        <section className="bg-sand py-16 lg:py-24">
          <div className="container-site">
            <h2 className="mb-8 font-display text-display-m text-ink">{t('morePosts')}</h2>
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {more.map((p) => (
                <li key={p.id}>
                  <PostCard post={p} locale={locale} categoryLabel={p.category ? t(`categories.${p.category}`) : undefined} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  )
}
