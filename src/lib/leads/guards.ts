import 'server-only'

import type { Payload } from 'payload'

const MINUTE = 60_000

/** Max form submissions per IP in a 10-minute window (counted in the database, so it holds across server instances). */
export const RATE_LIMIT = { max: 5, windowMs: 10 * MINUTE }

export async function isRateLimited(payload: Payload, ip: string | undefined) {
  if (!ip) return false
  const since = new Date(Date.now() - RATE_LIMIT.windowMs).toISOString()
  const { totalDocs } = await payload.count({
    collection: 'leads',
    overrideAccess: true,
    where: { and: [{ 'tracking.ip': { equals: ip } }, { createdAt: { greater_than: since } }] },
  })
  return totalDocs >= RATE_LIMIT.max
}

/** The earlier lead when the same phone sent the same form in the last 10 minutes (double taps, refreshes). */
export async function findDuplicate(payload: Payload, phone: string, type: string) {
  const since = new Date(Date.now() - 10 * MINUTE).toISOString()
  const res = await payload.find({
    collection: 'leads',
    overrideAccess: true,
    depth: 0,
    limit: 1,
    sort: '-createdAt',
    where: {
      and: [
        { phone: { equals: phone } },
        { type: { equals: type } },
        { createdAt: { greater_than: since } },
        { duplicateOf: { exists: false } },
      ],
    },
  })
  return res.docs[0] ?? null
}

/** In-memory limiter for document uploads (per server instance; a second line behind Turnstile). */
const uploadHits = new Map<string, number[]>()
export function uploadLimited(ip: string | undefined, max = 12) {
  if (!ip) return false
  const now = Date.now()
  const hits = (uploadHits.get(ip) ?? []).filter((t) => now - t < 10 * MINUTE)
  hits.push(now)
  uploadHits.set(ip, hits)
  if (uploadHits.size > 5000) uploadHits.clear()
  return hits.length > max
}
