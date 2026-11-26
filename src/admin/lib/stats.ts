import 'server-only'

import type { Payload, PayloadRequest } from 'payload'

import type { Lead } from '@/payload-types'

import { sourceOf, type Source } from './labels'

const DAY = 86_400_000

export type Stats = Awaited<ReturnType<typeof getLeadStats>>

/** Everything the dashboard shows, computed from leads the current user may read. */
export async function getLeadStats(payload: Payload, req: PayloadRequest, days: number) {
  const now = Date.now()
  const start = new Date(now - days * DAY)
  start.setHours(0, 0, 0, 0)
  const prevStart = new Date(start.getTime() - days * DAY)
  const access = { overrideAccess: false, user: req.user, req } as const

  const [current, previous] = await Promise.all([
    payload.find({
      collection: 'leads',
      ...access,
      depth: 0,
      limit: 5000,
      pagination: false,
      sort: '-createdAt',
      where: { createdAt: { greater_than_equal: start.toISOString() } },
      select: { createdAt: true, segment: true, type: true, status: true, project: true, tracking: true, duplicateOf: true },
    }),
    payload.count({
      collection: 'leads',
      ...access,
      where: {
        and: [
          { createdAt: { greater_than_equal: prevStart.toISOString() } },
          { createdAt: { less_than: start.toISOString() } },
          { duplicateOf: { exists: false } },
        ],
      },
    }),
  ])
  const leads = (current.docs as Lead[]).filter((l) => !l.duplicateOf)

  const byDay = Array.from({ length: days }, (_, i) => {
    const d = new Date(start.getTime() + i * DAY)
    return { date: d.toISOString().slice(0, 10), buyer: 0, other: 0 }
  })
  const sources = new Map<Source, number>()
  const projects = new Map<number, number>()
  const projectBrochures = new Map<number, number>()
  for (const l of leads) {
    const idx = Math.floor((new Date(l.createdAt).getTime() - start.getTime()) / DAY)
    const day = byDay[Math.min(Math.max(idx, 0), days - 1)]
    if (day) {
      if (l.segment === 'buyer') day.buyer++
      else day.other++
    }
    const src = sourceOf(l.tracking)
    sources.set(src, (sources.get(src) ?? 0) + 1)
    const pid = typeof l.project === 'object' ? l.project?.id : l.project
    if (pid) {
      projects.set(pid, (projects.get(pid) ?? 0) + 1)
      if (l.type === 'brochure') projectBrochures.set(pid, (projectBrochures.get(pid) ?? 0) + 1)
    }
  }

  const count = (fn: (l: Lead) => boolean) => leads.filter(fn).length
  const newCount = count((l) => l.status === 'new' || !l.status)
  const visits = count((l) => l.type === 'siteVisit' || l.status === 'visitBooked')
  const booked = count((l) => l.status === 'booked')

  return {
    days,
    total: leads.length,
    previousTotal: previous.totalDocs,
    newCount,
    visits,
    landowner: count((l) => l.segment === 'landowner'),
    nrb: count((l) => l.segment === 'nrb'),
    booked,
    byDay,
    sources: [...sources.entries()].sort((a, b) => b[1] - a[1]),
    projects: [...projects.entries()].sort((a, b) => b[1] - a[1]),
    projectBrochures,
  }
}
