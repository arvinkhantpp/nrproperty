import 'server-only'

import type { Metadata } from 'next'

import { getPathname } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'
import type { Media } from '@/payload-types'

import { getGlobal } from './cms'
import { imageOf } from './media'

type Seo = {
  metaTitle?: string | null
  metaDescription?: string | null
  ogImage?: number | Media | null
  noIndex?: boolean | null
}

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')

/** True on Vercel preview deployments or when SITE_NOINDEX=1: keep staging out of search results. */
export const siteNoIndex = () =>
  process.env.SITE_NOINDEX === '1' || (process.env.VERCEL_ENV !== undefined && process.env.VERCEL_ENV !== 'production')

/** Absolute URL for a site path in a locale (e.g. /projects → https://…/bn/projects). */
export const absoluteUrl = (path: string, locale: Locale) => `${SITE_URL}${getPathname({ href: path, locale })}`

/** Canonical + hreflang alternates for a path that exists in every locale. */
export function alternates(path: string, locale: Locale): Metadata['alternates'] {
  const languages = Object.fromEntries(routing.locales.map((l) => [l, getPathname({ href: path, locale: l })]))
  return {
    canonical: getPathname({ href: path, locale }),
    languages: { ...languages, 'x-default': getPathname({ href: path, locale: routing.defaultLocale }) },
  }
}

/** Share image fallback: SEO global, then Branding global. */
export async function defaultOgImage(locale: Locale) {
  const [seo, branding] = await Promise.all([getGlobal('seo', locale), getGlobal('branding', locale)])
  return imageOf(seo.ogImage ?? branding.ogImage ?? null, 'wide')
}

export async function buildMetadata({
  seo,
  title,
  description,
  path,
  locale,
  image,
  type = 'website',
}: {
  seo?: Seo | null
  title?: string | null
  description?: string | null
  path: string
  locale: Locale
  image?: number | Media | null
  type?: 'website' | 'article'
}): Promise<Metadata> {
  const metaTitle = seo?.metaTitle || title || undefined
  const metaDescription = seo?.metaDescription || description || undefined
  const og = imageOf(seo?.ogImage ?? image ?? null, 'wide') ?? (await defaultOgImage(locale))
  return {
    title: metaTitle,
    description: metaDescription,
    alternates: alternates(path, locale),
    robots: seo?.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: absoluteUrl(path, locale),
      siteName: 'NR Property',
      locale: locale === 'bn' ? 'bn_BD' : 'en_US',
      type,
      ...(og ? { images: [{ url: og.src, width: og.width, height: og.height, alt: og.alt }] } : {}),
    },
    twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, ...(og ? { images: [og.src] } : {}) },
  }
}
