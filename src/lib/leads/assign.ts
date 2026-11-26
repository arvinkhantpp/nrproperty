import 'server-only'

import type { Payload } from 'payload'

/**
 * Round-robin: the next active sales user (with "receives auto-assign" on) after the one who got
 * the previous lead. Returns null when auto-assign is off or nobody is eligible.
 */
export async function nextAssignee(payload: Payload): Promise<number | null> {
  const settings = await payload.findGlobal({ slug: 'siteSettings', depth: 0, overrideAccess: true })
  if (!settings.leadRouting?.autoAssign) return null
  const users = await payload.find({
    collection: 'users',
    overrideAccess: true,
    depth: 0,
    limit: 100,
    sort: 'id',
    where: { role: { equals: 'sales' } },
  })
  // Filtered here rather than in SQL: "not_equals false" would also drop users where the box was never touched (null).
  const eligible = users.docs.filter((u) => u.active !== false && u.receivesAutoAssign !== false)
  if (!eligible.length) return null
  const last = settings.leadRouting.lastAssignedUser
  const lastId = typeof last === 'object' && last ? last.id : last
  const idx = eligible.findIndex((u) => u.id === lastId)
  const next = eligible[(idx + 1) % eligible.length]!
  await payload.updateGlobal({
    slug: 'siteSettings',
    overrideAccess: true,
    data: { leadRouting: { ...settings.leadRouting, lastAssignedUser: next.id } },
    context: { skipRevalidate: true },
  })
  return next.id
}
