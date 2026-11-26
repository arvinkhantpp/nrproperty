'use client'

import type { Tracking } from '@/lib/forms/schemas'

const KEY = 'nr_attribution'
const PARAMS = {
  utm_source: 'utmSource',
  utm_medium: 'utmMedium',
  utm_campaign: 'utmCampaign',
  utm_content: 'utmContent',
  utm_term: 'utmTerm',
  fbclid: 'fbclid',
  gclid: 'gclid',
} as const

type Stored = Partial<Record<(typeof PARAMS)[keyof typeof PARAMS] | 'referrer' | 'landingPage', string>>

function read(): Stored {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}') as Stored
  } catch {
    return {}
  }
}

/**
 * Remembers where the visitor came from (UTM tags, ad click ids, first referrer) for 30 days,
 * so a lead submitted on a later page still carries its campaign. A new campaign click overwrites it.
 */
export function captureAttribution() {
  try {
    const url = new URL(window.location.href)
    const fromUrl: Stored = {}
    for (const [param, key] of Object.entries(PARAMS)) {
      const v = url.searchParams.get(param)
      if (v) fromUrl[key] = v.slice(0, 500)
    }
    const current = read()
    const external = document.referrer && !document.referrer.startsWith(window.location.origin)
    const next: Stored & { at?: number } = Object.keys(fromUrl).length
      ? { ...fromUrl, referrer: external ? document.referrer : current.referrer, landingPage: url.href }
      : { ...current }
    if (!next.referrer && external) next.referrer = document.referrer
    next.at = Date.now()
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // Storage blocked (private mode): forms still work, just without attribution.
  }
}

export function getAttribution(): Tracking {
  const s = read() as Stored & { at?: number }
  const fresh = s.at && Date.now() - s.at < 30 * 24 * 3600 * 1000
  const base = fresh ? s : {}
  return {
    pageUrl: typeof window !== 'undefined' ? window.location.href.slice(0, 1000) : undefined,
    referrer: base.referrer,
    utmSource: base.utmSource,
    utmMedium: base.utmMedium,
    utmCampaign: base.utmCampaign,
    utmContent: base.utmContent,
    utmTerm: base.utmTerm,
    fbclid: base.fbclid,
    gclid: base.gclid,
    language: typeof document !== 'undefined' ? document.documentElement.lang : undefined,
  }
}

export function newEventId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`
}
