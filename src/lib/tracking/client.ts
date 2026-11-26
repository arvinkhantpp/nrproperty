'use client'

import { CONSENT_COOKIE, LEAD_EVENTS, type PublicTracking } from './config'

type Fbq = ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[] }
declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    fbq?: Fbq
    clarity?: (...args: unknown[]) => void
    __nrConsent?: 'granted' | 'denied'
    __nrTracking?: PublicTracking
  }
}

export const hasConsent = () => typeof window !== 'undefined' && window.__nrConsent === 'granted'

export function setConsent(value: 'granted' | 'denied') {
  window.__nrConsent = value
  try {
    localStorage.setItem(CONSENT_COOKIE, value)
  } catch {}
  // The cookie lets the server respect the choice for the Conversions API.
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${60 * 60 * 24 * 180}; samesite=lax`
  window.gtag?.('consent', 'update', {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  })
  window.gtag?.('set', 'ads_data_redaction', value === 'denied')
  window.fbq?.('consent', value === 'granted' ? 'grant' : 'revoke')
  window.dispatchEvent(new CustomEvent('nr:consent', { detail: value }))
}

export function storedConsent(): 'granted' | 'denied' | null {
  try {
    const v = localStorage.getItem(CONSENT_COOKIE)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}

/** One call → dataLayer (GTM), GA4/Ads via gtag (only without GTM), and Meta Pixel. */
export function track(
  name: string,
  params: Record<string, unknown> = {},
  meta?: { event: string; custom?: boolean; data?: Record<string, unknown>; eventId?: string },
  adsLabel?: string | null,
) {
  const cfg = window.__nrTracking
  window.dataLayer?.push({ event: name, ...params, ...(meta?.eventId ? { event_id: meta.eventId } : {}) })
  if (cfg && !cfg.gtmId) {
    if (cfg.ga4Id) window.gtag?.('event', name, params)
    if (cfg.adsId && adsLabel) window.gtag?.('event', 'conversion', { send_to: `${cfg.adsId}/${adsLabel}` })
  }
  if (meta && window.fbq) {
    window.fbq(meta.custom ? 'trackCustom' : 'track', meta.event, meta.data ?? {}, meta.eventId ? { eventID: meta.eventId } : undefined)
  }
}

export function trackLead(type: keyof typeof LEAD_EVENTS, eventId: string, extra: { projectId?: string; projectName?: string } = {}) {
  const map = LEAD_EVENTS[type]
  const cfg = window.__nrTracking
  track(
    map.ga,
    { form_type: type, project_id: extra.projectId, project_name: extra.projectName },
    { event: map.meta, custom: map.custom, eventId, data: { content_category: type, content_name: extra.projectName } },
    cfg?.adsLabels[map.ads],
  )
}
