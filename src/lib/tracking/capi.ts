import 'server-only'

import { createHash } from 'node:crypto'

import type { Lead, Tracking } from '@/payload-types'

import { LEAD_EVENTS } from './config'

const sha = (v: string) => createHash('sha256').update(v.trim().toLowerCase()).digest('hex')

/** Phone in E.164 digits (no +), as Meta expects before hashing. Bangladeshi 01… numbers get 880. */
export function capiPhone(phone: string) {
  const digits = phone.replace(/\D/g, '')
  if (/^01\d{9}$/.test(digits)) return `88${digits}`
  return digits
}

/**
 * Sends the lead to the Meta Conversions API with the same event id the browser Pixel used, so
 * Meta counts it once. Personal data is SHA-256 hashed as Meta requires. Returns false when not configured.
 */
export async function sendCapiLead(lead: Lead, tracking: Tracking): Promise<boolean> {
  const pixelId = tracking.meta?.pixelId?.trim()
  const token = process.env.META_CAPI_ACCESS_TOKEN || tracking.meta?.capiToken
  if (!pixelId || !token) return false

  const t = lead.tracking ?? {}
  const map = LEAD_EVENTS[lead.type]
  const created = new Date(lead.createdAt).getTime()
  const fbc = t.fbc || (t.fbclid ? `fb.1.${created}.${t.fbclid}` : undefined)
  const [first, ...rest] = lead.name.trim().split(/\s+/)
  const project = lead.project && typeof lead.project === 'object' ? lead.project : null

  const user_data: Record<string, unknown> = {
    ph: [sha(capiPhone(lead.phone))],
    external_id: [sha(capiPhone(lead.phone))],
    ...(lead.email ? { em: [sha(lead.email)] } : {}),
    ...(first ? { fn: [sha(first)] } : {}),
    ...(rest.length ? { ln: [sha(rest.join(' '))] } : {}),
    ...(lead.type !== 'nrb' ? { country: [sha('bd')] } : {}),
    ...(t.ip ? { client_ip_address: t.ip } : {}),
    ...(t.userAgent ? { client_user_agent: t.userAgent } : {}),
    ...(t.fbp ? { fbp: t.fbp } : {}),
    ...(fbc ? { fbc } : {}),
  }

  const body = {
    data: [
      {
        event_name: map.meta,
        event_time: Math.floor(created / 1000),
        event_id: t.eventId || `lead-${lead.id}`,
        event_source_url: t.pageUrl || undefined,
        action_source: 'website',
        user_data,
        custom_data: {
          content_category: lead.type,
          ...(project ? { content_name: project.name, content_ids: [String(project.id)] } : {}),
          lead_id: String(lead.id),
        },
      },
    ],
    ...(tracking.meta?.testEventCode ? { test_event_code: tracking.meta.testEventCode } : {}),
  }

  const res = await fetch(`https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${encodeURIComponent(token)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(10_000),
  })
  if (!res.ok) throw new Error(`Meta ${res.status}: ${(await res.text()).slice(0, 300)}`)
  return true
}
