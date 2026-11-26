import type { Metadata } from 'next'

import { getPathname } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'

import { imageOf } from './media'
import type { Media } from '@/payload-types'

type Seo = {
  metaTitle?: string | null
  metaDescription?: string | null
  ogImage?: number | Media | null
  noIndex?: boolean | null
}

/** Canonical + hreflang alternates for a path that exists in every locale. */
export function alternates(path: string, locale: Locale): Metadata['alternates'] {
  const languages = Object.fromEntries(routing.locales.map((l) => [l, getPathname({ href: path, locale: l })]))
  return {
    canonical: getPathname({ href: path, locale }),
    languages: { ...languages, 'x-default': getPathname({ href: path, locale: routing.defaultLocale }) },
  }
}

export function buildMetadata({
  seo,
  title,
  description,
  path,
  locale,
  image,
}: {
  seo?: Seo | null
  title?: string | null
  description?: string | null
  path: string
  locale: Locale
  image?: number | Media | null
}): Metadata {
  const metaTitle = seo?.metaTitle || title || undefined
  const metaDescription = seo?.metaDescription || description || undefined
  const og = imageOf(seo?.ogImage ?? image ?? null, 'wide')
  return {
    title: metaTitle,
    description: metaDescription,
    alternates: alternates(path, locale),
    robots: seo?.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      locale: locale === 'bn' ? 'bn_BD' : 'en_US',
      type: 'website',
      ...(og ? { images: [{ url: og.src, width: og.width, height: og.height, alt: og.alt }] } : {}),
    },
  }
}
