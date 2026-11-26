import type { MetadataRoute } from 'next'

import { getPathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { areaPath } from '@/lib/areas'
import { payloadClient } from '@/lib/cms'
import { SITE_URL } from '@/lib/metadata'

// Rebuilt at most hourly; CMS changes also revalidate the pages themselves.
export const revalidate = 3600

/** Pages that exist only to confirm or redirect, never worth indexing. */
const SKIP_PAGES = new Set(['home', 'thank-you'])

type Entry = { path: string; lastModified?: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await payloadClient()
  const published = { _status: { equals: 'published' } } as const
  const [pages, projects, posts, areas] = await Promise.all([
    payload.find({ collection: 'pages', where: published, depth: 0, limit: 500, pagination: false, select: { slug: true, updatedAt: true, seo: true } }),
    payload.find({ collection: 'projects', where: published, depth: 0, limit: 500, pagination: false, select: { slug: true, updatedAt: true, seo: true } }),
    payload.find({ collection: 'posts', where: published, depth: 0, limit: 1000, pagination: false, select: { slug: true, updatedAt: true, seo: true } }),
    payload.find({ collection: 'areas', depth: 0, limit: 200, pagination: false, select: { slug: true, updatedAt: true, seo: true } }),
  ])
  const indexable = (d: { seo?: { noIndex?: boolean | null } | null }) => !d.seo?.noIndex
  const latest = (docs: { updatedAt: string }[]) => docs.map((d) => d.updatedAt).sort().at(-1)

  const entries: Entry[] = [
    { path: '/', priority: 1, changeFrequency: 'weekly', lastModified: latest(pages.docs.filter((d) => d.slug === 'home')) },
    { path: '/projects', priority: 0.9, changeFrequency: 'weekly', lastModified: latest(projects.docs) },
    { path: '/construction-status', priority: 0.6, changeFrequency: 'monthly', lastModified: latest(projects.docs) },
    { path: '/blog', priority: 0.6, changeFrequency: 'weekly', lastModified: latest(posts.docs) },
    ...pages.docs
      .filter((d) => d.slug && !SKIP_PAGES.has(d.slug) && !['blog', 'construction-status'].includes(d.slug) && indexable(d))
      .map((d) => ({ path: `/${d.slug}`, lastModified: d.updatedAt, priority: 0.7, changeFrequency: 'monthly' as const })),
    ...projects.docs.filter((d) => d.slug && indexable(d)).map((d) => ({ path: `/projects/${d.slug}`, lastModified: d.updatedAt, priority: 0.9, changeFrequency: 'weekly' as const })),
    ...areas.docs.filter((d) => d.slug && indexable(d)).map((d) => ({ path: areaPath(d.slug!), lastModified: d.updatedAt, priority: 0.8, changeFrequency: 'weekly' as const })),
    ...posts.docs.filter((d) => d.slug && indexable(d)).map((d) => ({ path: `/blog/${d.slug}`, lastModified: d.updatedAt, priority: 0.5, changeFrequency: 'monthly' as const })),
  ]

  const url = (path: string, locale: (typeof routing.locales)[number]) => `${SITE_URL}${getPathname({ href: path, locale })}`
  return entries.flatMap((e) =>
    routing.locales.map((locale) => ({
      url: url(e.path, locale),
      lastModified: e.lastModified,
      changeFrequency: e.changeFrequency,
      priority: locale === routing.defaultLocale ? e.priority : Math.round(e.priority * 8) / 10,
      alternates: { languages: Object.fromEntries(routing.locales.map((l) => [l, url(e.path, l)])) },
    })),
  )
}
