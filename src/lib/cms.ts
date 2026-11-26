import 'server-only'

import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import { getPayload, type Where } from 'payload'
import { cache } from 'react'

import { tags } from '@/hooks/revalidate'
import type { Locale } from '@/i18n/routing'
import type { Config, Page, Post, Project } from '@/payload-types'

export const payloadClient = cache(() => getPayload({ config }))

type GlobalSlug = keyof Config['globals']

async function isDraft() {
  try {
    return (await draftMode()).isEnabled
  } catch {
    return false
  }
}

/** Reads a global with on-demand revalidation (tag `global:<slug>`). */
export async function getGlobal<S extends GlobalSlug>(slug: S, locale: Locale): Promise<Config['globals'][S]> {
  const run = async () => {
    const payload = await payloadClient()
    return payload.findGlobal({ slug, locale, depth: 1 }) as Promise<Config['globals'][S]>
  }
  return unstable_cache(run, ['global', slug, locale], { tags: [tags.global(slug)] })()
}

export async function getPage(slug: string, locale: Locale): Promise<Page | null> {
  const draft = await isDraft()
  const run = async () => {
    const payload = await payloadClient()
    const res = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      locale,
      depth: 2,
      limit: 1,
      draft,
      overrideAccess: draft,
    })
    return res.docs[0] ?? null
  }
  if (draft) return run()
  return unstable_cache(run, ['page', slug, locale], { tags: [tags.collection('pages'), tags.doc('pages', slug)] })()
}

export type ProjectFilters = {
  status?: string
  type?: string
  area?: string
  size?: string
  beds?: string
  page?: number
  limit?: number
  featured?: boolean
  exclude?: number
}

export const SIZE_BUCKETS: Record<string, [number, number]> = {
  'under-1500': [0, 1499],
  '1500-2000': [1500, 2000],
  '2000-2500': [2000, 2500],
  '2500-plus': [2500, 100000],
}

export async function getProjects(locale: Locale, filters: ProjectFilters = {}) {
  const run = async () => {
    const payload = await payloadClient()
    const and: Where[] = [{ _status: { equals: 'published' } }]
    if (filters.status) and.push({ status: { equals: filters.status } })
    if (filters.type) and.push({ type: { equals: filters.type } })
    if (filters.featured) and.push({ featuredOnHome: { equals: true } })
    if (filters.exclude) and.push({ id: { not_equals: filters.exclude } })
    if (filters.area) {
      const area = await payload.find({ collection: 'areas', where: { slug: { equals: filters.area } }, limit: 1, depth: 0 })
      and.push({ area: { equals: area.docs[0]?.id ?? -1 } })
    }
    const bucket = filters.size ? SIZE_BUCKETS[filters.size] : undefined
    if (bucket) {
      and.push({ 'facts.sizeMaxSft': { greater_than_equal: bucket[0] } })
      and.push({ 'facts.sizeMinSft': { less_than_equal: bucket[1] } })
    }
    if (filters.beds) and.push({ 'facts.bedrooms': { like: filters.beds.replace('+', '') } })
    return payload.find({
      collection: 'projects',
      where: { and },
      locale,
      depth: 1,
      sort: 'order',
      limit: filters.limit ?? 9,
      page: filters.page ?? 1,
    })
  }
  return unstable_cache(run, ['projects', locale, JSON.stringify(filters)], { tags: [tags.collection('projects')] })()
}

export async function getProject(slug: string, locale: Locale): Promise<Project | null> {
  const draft = await isDraft()
  const run = async () => {
    const payload = await payloadClient()
    const res = await payload.find({
      collection: 'projects',
      where: { slug: { equals: slug } },
      locale,
      depth: 2,
      limit: 1,
      draft,
      overrideAccess: draft,
    })
    return res.docs[0] ?? null
  }
  if (draft) return run()
  return unstable_cache(run, ['project', slug, locale], { tags: [tags.collection('projects'), tags.doc('projects', slug)] })()
}

/** Minimal project list for form dropdowns. */
export async function getProjectOptions(locale: Locale) {
  const run = async () => {
    const payload = await payloadClient()
    const res = await payload.find({
      collection: 'projects',
      where: { _status: { equals: 'published' }, status: { not_equals: 'soldOut' } },
      locale,
      depth: 0,
      limit: 100,
      sort: 'order',
      select: { name: true, slug: true },
    })
    return res.docs.map((d) => ({ value: String(d.id), label: d.name ?? '', slug: d.slug ?? '' }))
  }
  return unstable_cache(run, ['project-options', locale], { tags: [tags.collection('projects')] })()
}

export async function getAreas(locale: Locale) {
  const run = async () => {
    const payload = await payloadClient()
    const res = await payload.find({ collection: 'areas', locale, depth: 1, limit: 100, sort: 'order' })
    return res.docs
  }
  return unstable_cache(run, ['areas', locale], { tags: [tags.collection('areas')] })()
}

export async function getTestimonials(locale: Locale, type?: string, limit = 3) {
  const run = async () => {
    const payload = await payloadClient()
    const res = await payload.find({
      collection: 'testimonials',
      where: type && type !== 'all' ? { type: { equals: type } } : {},
      locale,
      depth: 1,
      limit,
      sort: 'order',
    })
    return res.docs
  }
  return unstable_cache(run, ['testimonials', locale, type ?? 'all', String(limit)], { tags: [tags.collection('testimonials')] })()
}

export async function getPosts(locale: Locale, opts: { limit?: number; page?: number; category?: string } = {}) {
  const run = async () => {
    const payload = await payloadClient()
    return payload.find({
      collection: 'posts',
      where: {
        _status: { equals: 'published' },
        ...(opts.category ? { category: { equals: opts.category } } : {}),
      },
      locale,
      depth: 1,
      limit: opts.limit ?? 9,
      page: opts.page ?? 1,
      sort: '-publishedAt',
    })
  }
  return unstable_cache(run, ['posts', locale, JSON.stringify(opts)], { tags: [tags.collection('posts')] })()
}

export async function getPost(slug: string, locale: Locale): Promise<Post | null> {
  const draft = await isDraft()
  const run = async () => {
    const payload = await payloadClient()
    const res = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug } },
      locale,
      depth: 2,
      limit: 1,
      draft,
      overrideAccess: draft,
    })
    return res.docs[0] ?? null
  }
  if (draft) return run()
  return unstable_cache(run, ['post', slug, locale], { tags: [tags.collection('posts'), tags.doc('posts', slug)] })()
}

export async function getArea(slug: string, locale: Locale) {
  const run = async () => {
    const payload = await payloadClient()
    const res = await payload.find({ collection: 'areas', where: { slug: { equals: slug } }, locale, depth: 1, limit: 1 })
    return res.docs[0] ?? null
  }
  return unstable_cache(run, ['area', slug, locale], { tags: [tags.collection('areas')] })()
}

/** Published projects for the construction status page: under construction first, then upcoming, then handed over. */
export async function getProgressProjects(locale: Locale) {
  const run = async () => {
    const payload = await payloadClient()
    const res = await payload.find({
      collection: 'projects',
      where: { _status: { equals: 'published' } },
      locale,
      depth: 1,
      limit: 100,
      sort: 'order',
    })
    const rank = { ongoing: 0, upcoming: 1, completed: 2 } as Record<string, number>
    return [...res.docs].sort((a, b) => (rank[a.status ?? ''] ?? 3) - (rank[b.status ?? ''] ?? 3))
  }
  return unstable_cache(run, ['progress-projects', locale], { tags: [tags.collection('projects')] })()
}

/**
 * Optional admin-editable intro for a fixed route (blog, construction status). If a Page with this
 * slug exists, its first Hero block supplies the heading and its other blocks render below the content.
 */
export async function getRouteContent(slug: string, locale: Locale) {
  const page = await getPage(slug, locale)
  const layout = page?.layout ?? []
  const first = layout[0]
  const hero = first?.blockType === 'hero' ? first : null
  return { page, hero, rest: hero ? layout.slice(1) : layout }
}
