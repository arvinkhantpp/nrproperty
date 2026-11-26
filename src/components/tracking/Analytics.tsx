'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import type { PublicTracking } from '@/lib/tracking/config'
import { hasConsent, track, trackLead } from '@/lib/tracking/client'
import type { LEAD_EVENTS } from '@/lib/tracking/config'

/**
 * Loads GTM, GA4 / Google Ads (gtag), Meta Pixel and Microsoft Clarity from the IDs in
 * Admin → Tracking, and wires site events:
 * - page views on every client-side navigation
 * - form submissions (the `nr:lead` event from LeadForm) → Lead / Schedule / Contact / LandownerLead,
 *   with the same event id the server sends to the Conversions API so Meta de-duplicates them
 * - taps on call and WhatsApp links → Contact
 * With GTM configured, GA4 and Ads are expected to live inside GTM (only dataLayer events are sent).
 */
export function Analytics({ config }: { config: PublicTracking }) {
  const pathname = usePathname()
  const first = useRef(true)
  const [consent, setConsentState] = useState(false)

  useEffect(() => {
    window.__nrTracking = config
    setConsentState(hasConsent())
    const onConsent = (e: Event) => setConsentState((e as CustomEvent).detail === 'granted')
    window.addEventListener('nr:consent', onConsent)
    return () => window.removeEventListener('nr:consent', onConsent)
  }, [config])

  // Page views (initial + every App Router navigation).
  useEffect(() => {
    const send = () => {
      const params = { page_location: window.location.href, page_title: document.title, page_path: pathname }
      window.dataLayer?.push({ event: 'page_view', ...params })
      if (!config.gtmId && config.ga4Id) window.gtag?.('event', 'page_view', params)
      if (!first.current) window.fbq?.('track', 'PageView')
      first.current = false
    }
    // Let the new page set its <title> first.
    const id = window.setTimeout(send, 50)
    return () => window.clearTimeout(id)
  }, [pathname, config.gtmId, config.ga4Id])

  // Form submissions and contact taps.
  useEffect(() => {
    const onLead = (e: Event) => {
      const d = (e as CustomEvent<{ type: keyof typeof LEAD_EVENTS; eventId: string; projectId?: string }>).detail
      trackLead(d.type, d.eventId, { projectId: d.projectId })
    }
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a) return
      const href = a.getAttribute('href') ?? ''
      const method = href.startsWith('tel:') ? 'call' : /wa\.me|whatsapp\.com/.test(href) ? 'whatsapp' : null
      if (!method) return
      track(
        method === 'call' ? 'click_call' : 'click_whatsapp',
        { link_url: href, page_path: window.location.pathname },
        { event: 'Contact', data: { content_category: method } },
        window.__nrTracking?.adsLabels.contact,
      )
    }
    window.addEventListener('nr:lead', onLead)
    document.addEventListener('click', onClick, { capture: true })
    return () => {
      window.removeEventListener('nr:lead', onLead)
      document.removeEventListener('click', onClick, { capture: true })
    }
  }, [])

  const gtagId = !config.gtmId ? (config.ga4Id ?? config.adsId) : null

  return (
    <>
      {config.gtmId ? (
        <Script id="nr-gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${config.gtmId}');`}
        </Script>
      ) : null}
      {gtagId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`} strategy="afterInteractive" />
          <Script id="nr-gtag" strategy="afterInteractive">
            {`gtag('js', new Date());${config.ga4Id ? `gtag('config','${config.ga4Id}',{send_page_view:false});` : ''}${config.adsId ? `gtag('config','${config.adsId}');` : ''}`}
          </Script>
        </>
      ) : null}
      {config.pixelId ? <Script src="https://connect.facebook.net/en_US/fbevents.js" strategy="afterInteractive" /> : null}
      {config.clarityId && consent ? (
        <Script id="nr-clarity" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${config.clarityId}");`}
        </Script>
      ) : null}
    </>
  )
}

/** Fires ViewContent / view_item once on a project page. */
export function TrackViewContent({ id, name, price }: { id: string; name: string; price?: number | null }) {
  useEffect(() => {
    const t = window.setTimeout(() => {
      track(
        'view_item',
        { items: [{ item_id: id, item_name: name, price: price ?? undefined }], currency: 'BDT', value: price ?? undefined },
        { event: 'ViewContent', data: { content_ids: [id], content_name: name, content_type: 'product', currency: 'BDT', value: price ?? undefined } },
      )
    }, 300)
    return () => window.clearTimeout(t)
  }, [id, name, price])
  return null
}
