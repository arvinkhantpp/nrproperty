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
  const meta = buildMetadata({ seo: page?.seo, path: '/', locale })
  // The home page uses the site-wide default title rather than the "%s · NR Property" template.
  return { ...meta, title: page?.seo?.metaTitle ? { absolute: page.seo.metaTitle } : undefined }
}

export default async function HomePage({ params }: Props) {
  const locale = (await params).locale as Locale
  setRequestLocale(locale)
  const page = await getPage('home', locale)
  if (!page) notFound()
  return <RenderBlocks blocks={page.layout} locale={locale} />
}
