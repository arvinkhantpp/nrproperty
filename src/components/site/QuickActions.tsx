'use client'

import { useTranslations } from 'next-intl'

import { StickyMobileCTA, WhatsAppFab } from '@/components/ui'
import { usePathname } from '@/i18n/navigation'

import { useSite } from './SiteProvider'

/**
 * Mobile quick-action bar and the desktop WhatsApp button. Project pages render their own bar
 * (with the project pre-selected), and the thank-you page shows neither.
 */
export function QuickActions() {
  const t = useTranslations('common')
  const site = useSite()
  const pathname = usePathname()
  const isProject = /^\/projects\/[^/]+/.test(pathname)
  const hidden = pathname === '/thank-you'
  return (
    <>
      {!isProject && !hidden ? (
        <StickyMobileCTA
          phoneHref={site.phoneHref}
          whatsappHref={site.whatsappLink}
          primary={{ label: t('enquire'), onClick: () => site.openForm('enquiry') }}
        />
      ) : null}
      {site.showWhatsappButton && !hidden ? <WhatsAppFab href={site.whatsappLink} /> : null}
    </>
  )
}
