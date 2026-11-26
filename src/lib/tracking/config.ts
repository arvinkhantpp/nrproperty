import type { Tracking } from '@/payload-types'

/** Only the public parts of the Tracking global; the CAPI token never reaches the browser. */
export type PublicTracking = {
  gtmId: string | null
  ga4Id: string | null
  clarityId: string | null
  pixelId: string | null
  adsId: string | null
  adsLabels: { lead?: string | null; schedule?: string | null; landowner?: string | null; contact?: string | null }
  consentRequired: boolean
}

const clean = (v: string | null | undefined, re: RegExp) => (v && re.test(v.trim()) ? v.trim() : null)

export function publicTracking(t: Tracking): PublicTracking {
  return {
    gtmId: clean(t.gtmId, /^GTM-[A-Z0-9]+$/i),
    ga4Id: clean(t.ga4Id, /^G-[A-Z0-9]+$/i),
    clarityId: clean(t.clarityId, /^[a-z0-9]{6,20}$/i),
    pixelId: clean(t.meta?.pixelId, /^\d{8,20}$/),
    adsId: clean(t.googleAds?.conversionId, /^AW-\d+$/i),
    adsLabels: t.googleAds?.labels ?? {},
    consentRequired: t.consentRequired !== false,
  }
}

export const CONSENT_COOKIE = 'nr_consent'

/** How each form maps onto Meta, GA4 and Google Ads events (shared by the browser and CAPI). */
export const LEAD_EVENTS = {
  enquiry: { meta: 'Lead', custom: false, ga: 'generate_lead', ads: 'lead' },
  brochure: { meta: 'Lead', custom: false, ga: 'generate_lead', ads: 'lead' },
  nrb: { meta: 'Lead', custom: false, ga: 'generate_lead', ads: 'lead' },
  siteVisit: { meta: 'Schedule', custom: false, ga: 'schedule_visit', ads: 'schedule' },
  landowner: { meta: 'LandownerLead', custom: true, ga: 'landowner_lead', ads: 'landowner' },
  contact: { meta: 'Contact', custom: false, ga: 'contact_form', ads: 'contact' },
} as const
