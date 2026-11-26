import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { ReactNode } from 'react'

import { AnnouncementBar } from '@/components/site/AnnouncementBar'
import { DraftBar } from '@/components/site/DraftBar'
import { JsonLd } from '@/components/site/JsonLd'
import { AttributionCapture } from '@/components/site/AttributionCapture'
import { BrandingStyle } from '@/components/site/BrandingStyle'
import { FormModal } from '@/components/site/FormModal'
import { QuickActions } from '@/components/site/QuickActions'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'
import { SiteProvider } from '@/components/site/SiteProvider'
import { Analytics } from '@/components/tracking/Analytics'
import { ConsentBanner } from '@/components/tracking/ConsentBanner'
import { TrackingHead } from '@/components/tracking/TrackingHead'
import { ToastProvider } from '@/components/ui/Toast'
import { routing, type Locale } from '@/i18n/routing'
import { fontVariables } from '@/lib/fonts'
import { getGlobal } from '@/lib/cms'
import { organizationLd } from '@/lib/jsonld'
import { fileUrl } from '@/lib/media'
import { defaultOgImage, SITE_URL, siteNoIndex } from '@/lib/metadata'
import { clientSiteConfig, getSiteData } from '@/lib/site'
import { publicTracking } from '@/lib/tracking/config'
import '@/styles/globals.css'

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  const [seo, branding, og] = await Promise.all([
    getGlobal('seo', locale as Locale),
    getGlobal('branding', locale as Locale),
    defaultOgImage(locale as Locale),
  ])
  const favicon = fileUrl(branding.favicon)
  const siteName = branding.companyName || 'NR Property'
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: seo.defaultTitle || t('title'), template: seo.titleTemplate || '%s · NR Property' },
    description: seo.defaultDescription || t('description'),
    applicationName: siteName,
    openGraph: { siteName, type: 'website', ...(og ? { images: [{ url: og.src, width: og.width, height: og.height, alt: og.alt }] } : {}) },
    twitter: { card: 'summary_large_image' },
    ...(favicon ? { icons: { icon: favicon, apple: favicon } } : {}),
    formatDetection: { telephone: false },
    ...(siteNoIndex() ? { robots: { index: false, follow: false } } : {}),
  }
}

export const viewport: Viewport = {
  themeColor: '#0E1B17',
  width: 'device-width',
  initialScale: 1,
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'common' })

  const [data, trackingGlobal] = await Promise.all([getSiteData(locale as Locale), getGlobal('tracking', locale as Locale)])
  const tracking = publicTracking(trackingGlobal)
  const { header, announcement, branding } = data
  const menu = (header.menu ?? [])
    .filter((m) => m.show !== false && m.label)
    .map((m) => ({ label: m.label as string, href: m.href }))

  return (
    <html lang={locale} className={fontVariables}>
      <head>
        <TrackingHead config={tracking} />
        <BrandingStyle colors={branding.colors} />
      </head>
      <body>
        {tracking.gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${tracking.gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              title="GTM"
            />
          </noscript>
        ) : null}
        <NextIntlClientProvider>
          <SiteProvider config={clientSiteConfig(data)}>
            <ToastProvider>
              <a
                href="#main"
                className="sr-only z-[60] rounded-sm bg-gold px-4 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
              >
                {t('skipToContent')}
              </a>
              <JsonLd data={organizationLd({ name: branding.companyName || 'NR Property', contact: data.contact, logo: fileUrl(branding.logoDark) ?? fileUrl(branding.favicon), locale: locale as Locale })} />
              <DraftBar />
              {announcement.enabled ? (
                <AnnouncementBar text={announcement.text} label={announcement.label} href={announcement.href} />
              ) : null}
              <SiteHeader
                menu={menu}
                cta={{
                  label: header.cta?.label || t('bookVisit'),
                  href: header.cta?.href,
                  opensSiteVisit: header.cta?.opensSiteVisit !== false,
                }}
                showHotline={header.showHotline !== false}
                showLanguageSwitch={header.showLanguageSwitch !== false}
              />
              <main id="main">{children}</main>
              <SiteFooter data={data} />
              <QuickActions />
              <FormModal />
              <AttributionCapture />
              <Analytics config={tracking} />
              <ConsentBanner required={tracking.consentRequired && Boolean(tracking.gtmId || tracking.ga4Id || tracking.pixelId || tracking.clarityId || tracking.adsId)} />
            </ToastProvider>
          </SiteProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
