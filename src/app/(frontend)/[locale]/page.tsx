import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import type { Locale } from '@/i18n/routing'
import { getPage } from '@/lib/cms'
import { buildMetadata } from '@/lib/metadata'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale as Locale
  const page = await getPage('home', locale)
  const meta = await buildMetadata({ seo: page?.seo, path: '/', locale })
  // The home page uses the site-wide default title and description (SEO global) unless the home
  // page sets its own; never the "%s · NR Property" template.
  const { title: _t, description: _d, ...rest } = meta
  return {
    ...rest,
    ...(page?.seo?.metaTitle ? { title: { absolute: page.seo.metaTitle } } : {}),
    ...(page?.seo?.metaDescription ? { description: page.seo.metaDescription } : {}),
  }
}

export default async function HomePage({ params }: Props) {
  const locale = (await params).locale as Locale
  setRequestLocale(locale)
  const page = await getPage('home', locale)
  if (!page) notFound()
  return <RenderBlocks blocks={page.layout} locale={locale} />
}
