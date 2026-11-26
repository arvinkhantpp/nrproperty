import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'

import { Accent, Button, Logo } from '@/components/ui'
import { telHref, whatsappHref } from '@/lib/contact'
import { SITE_DEFAULTS } from '@/lib/site-defaults'

/**
 * Temporary holding page for Phase 1. The real, CMS-driven home page is built in Phase 3.
 */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const dev = process.env.NODE_ENV !== 'production'

  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden bg-ink text-cream">
      <Image
        src="/images/placeholder/hero-dusk.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[38%_50%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgb(14_27_23/0.6)_0%,rgb(14_27_23/0.15)_40%,rgb(14_27_23/0.92)_100%)]"
      />
      <div className="relative container-site py-6">
        <Logo tone="dark" />
      </div>
      <div className="relative container-site mt-auto flex flex-col gap-6 pb-16 lg:pb-24">
        <p className="text-eyebrow text-gold-soft">Premium residences · Dhaka</p>
        <h1 className="max-w-4xl text-display-xl text-balance">
          Homes crafted with patience, <Accent tone="dark">built on trust.</Accent>
        </h1>
        <p className="max-w-xl text-body-l text-cream/80">
          Our new website is being built. Call or WhatsApp us on {SITE_DEFAULTS.hotline}.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button href={telHref(SITE_DEFAULTS.hotline)} iconLeft="phone">
            Call {SITE_DEFAULTS.hotline}
          </Button>
          <Button variant="onDark" href={whatsappHref(SITE_DEFAULTS.whatsapp)} iconLeft="whatsapp">
            WhatsApp
          </Button>
          {dev ? (
            <Button variant="onDark" href="/styleguide">
              Styleguide
            </Button>
          ) : null}
        </div>
      </div>
    </main>
  )
}
