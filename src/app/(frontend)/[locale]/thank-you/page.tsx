import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import type { LayoutBlock } from '@/blocks/components/types'
import { Button, Icon } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { getPage, payloadClient } from '@/lib/cms'
import { telHref, whatsappHref } from '@/lib/contact'
import { FORM_TYPES, type FormType } from '@/lib/forms/schemas'
import { fileUrl } from '@/lib/media'
import { getSiteData } from '@/lib/site'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ form?: string; project?: string }>
}

export const metadata: Metadata = { robots: { index: false, follow: false } }

async function brochureFor(id: string | undefined, locale: Locale) {
  const n = Number(id)
  if (!Number.isInteger(n) || n <= 0) return null
  try {
    const payload = await payloadClient()
    const p = await payload.findByID({ collection: 'projects', id: n, locale, depth: 1 })
    const url = fileUrl(p.brochure)
    return url ? { name: p.name ?? '', url, slug: p.slug } : null
  } catch {
    return null
  }
}

export default async function ThankYouPage({ params, searchParams }: Props) {
  const locale = (await params).locale as Locale
  setRequestLocale(locale)
  const { form, project } = await searchParams
  const t = await getTranslations('thankYou')
  const [page, site] = await Promise.all([getPage('thank-you', locale), getSiteData(locale)])
  const type = FORM_TYPES.includes(form as FormType) ? (form as FormType) : null
  const success = type ? site.forms[type]?.successMessage : null

  // The form's own success message (Admin → Forms) replaces the hero description.
  const blocks = (page?.layout ?? []).map((b, i): LayoutBlock =>
    i === 0 && b.blockType === 'hero' && success ? { ...b, description: success } : b,
  )
  const brochure = type === 'brochure' ? await brochureFor(project, locale) : null
  const { contact } = site

  return (
    <>
      {blocks.length ? (
        <RenderBlocks blocks={blocks} locale={locale} />
      ) : (
        <section className="bg-ink pt-16 pb-14 text-cream lg:pt-28 lg:pb-24">
          <div className="container-site">
            <h1 className="text-display-l">{t('title')}</h1>
          </div>
        </section>
      )}
      <section className="bg-cream section-y">
        <div className="container-site grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {brochure ? (
            <div className="flex flex-col gap-4 rounded-lg bg-white p-7 shadow-card md:col-span-2 lg:col-span-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gold-soft text-forest">
                  <Icon name="download" size={22} />
                </span>
                <div>
                  <p className="font-semibold text-ink">{t('brochureReady')}</p>
                  <p className="text-small text-muted">{brochure.name}</p>
                </div>
              </div>
              <Button href={brochure.url} iconLeft="download" target="_blank" rel="noopener" data-track="brochure-download">
                {t('downloadBrochure')}
              </Button>
            </div>
          ) : null}
          <a
            href={whatsappHref(contact.whatsapp, contact.whatsappMessage ?? undefined)}
            target="_blank"
            rel="noopener noreferrer"
            data-track="whatsapp"
            className="flex items-center gap-4 rounded-lg bg-white p-6 transition-shadow hover:shadow-card"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-whatsapp text-white">
              <Icon name="whatsapp" size={22} />
            </span>
            <span>
              <span className="block font-semibold text-ink">{t('whatsappTitle')}</span>
              <span className="text-small text-muted">{t('whatsappBody')}</span>
            </span>
          </a>
          <a
            href={telHref(contact.hotline)}
            data-track="call"
            className="flex items-center gap-4 rounded-lg bg-white p-6 transition-shadow hover:shadow-card"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-ink text-gold">
              <Icon name="phone" size={22} />
            </span>
            <span>
              <span className="block font-semibold text-ink">{t('callTitle')}</span>
              <span className="text-small text-muted">{contact.hotline}</span>
            </span>
          </a>
          <Button href="/projects" variant="outline" size="lg" iconRight="arrowRight" className="h-auto min-h-14 self-stretch rounded-lg md:col-span-2 lg:col-span-1">
            {t('browseProjects')}
          </Button>
        </div>
      </section>
    </>
  )
}
