import type { Endpoint, Where } from 'payload'

import type { Lead } from '@/payload-types'

const COLUMNS: [string, (l: Lead) => unknown][] = [
  ['ID', (l) => l.id],
  ['Created (Dhaka)', (l) => new Date(l.createdAt).toLocaleString('en-GB', { timeZone: 'Asia/Dhaka' })],
  ['Form', (l) => l.type],
  ['Segment', (l) => l.segment],
  ['Status', (l) => l.status],
  ['Name', (l) => l.name],
  ['Phone', (l) => l.phone],
  ['Email', (l) => l.email],
  ['Project', (l) => (typeof l.project === 'object' ? l.project?.name : l.project)],
  ['Assigned to', (l) => (typeof l.assignedTo === 'object' ? l.assignedTo?.name : l.assignedTo)],
  ['Bedrooms', (l) => l.details?.bedrooms],
  ['Visit date', (l) => l.details?.visitDate?.slice(0, 10)],
  ['Time slot', (l) => l.details?.timeSlot],
  ['Area', (l) => l.details?.area],
  ['Plot address', (l) => l.details?.plotAddress],
  ['Land size (katha)', (l) => l.details?.landSizeKatha],
  ['Front road (ft)', (l) => l.details?.frontRoadFt],
  ['Ownership', (l) => l.details?.ownership],
  ['Country', (l) => l.details?.country],
  ['WhatsApp', (l) => l.details?.whatsapp],
  ['Budget', (l) => l.details?.budgetRange],
  ['Best time to call', (l) => l.details?.bestTimeToCall],
  ['Message', (l) => l.message],
  ['UTM source', (l) => l.tracking?.utmSource],
  ['UTM medium', (l) => l.tracking?.utmMedium],
  ['UTM campaign', (l) => l.tracking?.utmCampaign],
  ['Click ID', (l) => (l.tracking?.fbclid ? 'fbclid' : l.tracking?.gclid ? 'gclid' : '')],
  ['Page', (l) => l.tracking?.pageUrl],
  ['Language', (l) => l.tracking?.language],
  ['Duplicate of', (l) => (typeof l.duplicateOf === 'object' ? l.duplicateOf?.id : l.duplicateOf)],
  ['Notes', (l) => (l.notes ?? []).map((n) => n.text).join(' | ')],
]

const cell = (v: unknown) => {
  if (v === null || v === undefined) return ''
  let s = String(v)
  // Stop spreadsheet formula injection from form answers. Plain phone numbers are safe as they are.
  if (/^[=+\-@\t\r]/.test(s) && !/^\+?[\d\s-]+$/.test(s)) s = `'${s}`
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

/** GET /api/leads/export: CSV of the leads the signed-in user can see, with the inbox filters. */
export const leadsExport: Endpoint = {
  path: '/export',
  method: 'get',
  handler: async (req) => {
    if (!req.user) return Response.json({ error: 'Unauthorized' }, { status: 401 })
    const sp = new URL(req.url ?? '', 'http://x').searchParams
    const and: Where[] = []
    const segment = sp.get('segment')
    if (segment && ['buyer', 'landowner', 'nrb'].includes(segment)) and.push({ segment: { equals: segment } })
    const status = sp.get('status')
    if (status) and.push({ status: { equals: status } })
    const project = Number(sp.get('project'))
    if (project) and.push({ project: { equals: project } })
    const q = (sp.get('q') ?? '').trim().slice(0, 80)
    if (q) and.push({ or: [{ name: { like: q } }, { phone: { like: q.replace(/[^\d+]/g, '') || q } }, { email: { like: q } }] })

    const rows: string[] = [COLUMNS.map(([h]) => h).join(',')]
    for (let page = 1; ; page++) {
      const res = await req.payload.find({
        collection: 'leads',
        where: { and },
        depth: 1,
        limit: 500,
        page,
        sort: '-createdAt',
        overrideAccess: false,
        user: req.user,
        req,
      })
      for (const l of res.docs) rows.push(COLUMNS.map(([, get]) => cell(get(l))).join(','))
      if (!res.hasNextPage) break
    }
    const date = new Date().toISOString().slice(0, 10)
    return new Response('﻿' + rows.join('\r\n'), {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="nr-leads-${segment || 'all'}-${date}.csv"`,
        'Cache-Control': 'no-store',
      },
    })
  },
}
