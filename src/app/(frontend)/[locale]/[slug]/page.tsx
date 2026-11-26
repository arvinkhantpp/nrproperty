import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { AreaLanding } from '@/components/site/AreaLanding'
import type { Locale } from '@/i18n/routing'
import { areaSlugFromPath } from '@/lib/areas'
import { getArea, getPage } from '@/lib/cms'
import { buildMetadata } from '@/lib/metadata'

type Props = { params: Promise<{ locale: string; slug: string }> }

/**
 * Any page built in Admin → Pages (About, Landowner, NRB, Contact, Privacy…) lives at /<slug>.
 * /apartments-in-<area> is the landing page for an area in Admin → Areas.
 */
const areaSlug = areaSlugFromPath

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const aSlug = areaSlug(slug)
  if (aSlug) {
    const area = await getArea(aSlug, locale as Locale)
    if (!area) return {}
    const t = await getTranslations({ locale, namespace: 'area' })
    return buildMetadata({
      seo: area.seo,
      title: t('metaTitle', { area: area.name ?? '' }),
      description: t('metaDescription', { area: area.name ?? '' }),
      path: `/${slug}`,
      locale: locale as Locale,
      image: area.heroImage,
    })
  }
  const page = await getPage(slug, locale as Locale)
  if (!page) return {}
  return buildMetadata({ seo: page.seo, title: page.title, path: `/${slug}`, locale: locale as Locale })
}

export default async function CmsPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  if (slug === 'home') notFound()
  const aSlug = areaSlug(slug)
  if (aSlug) {
    const area = await getArea(aSlug, locale as Locale)
    if (!area) notFound()
    return <AreaLanding area={area} locale={locale as Locale} />
  }
  const page = await getPage(slug, locale as Locale)
  if (!page) notFound()
  return <RenderBlocks blocks={page.layout} locale={locale as Locale} />
}
