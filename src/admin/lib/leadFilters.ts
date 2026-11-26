import type { Where } from 'payload'

import { STATUS } from './labels'

export type LeadFilterInput = { q?: string | null; status?: string | null; project?: string | number | null; from?: string | null; to?: string | null }

const DATE = /^\d{4}-\d{2}-\d{2}$/

/** Inbox and CSV export filters. Dates are Dhaka calendar days (UTC+6), `to` inclusive. */
export function parseLeadFilters(input: LeadFilterInput) {
  const q = (input.q ?? '').trim().slice(0, 80)
  const status = STATUS.some((s) => s.value === input.status) ? (input.status as string) : undefined
  const project = Number(input.project) || undefined
  const from = input.from && DATE.test(input.from) ? input.from : undefined
  const to = input.to && DATE.test(input.to) ? input.to : undefined

  const where: Where[] = []
  if (q) where.push({ or: [{ name: { like: q } }, { phone: { like: q.replace(/[^\d+]/g, '') || q } }, { email: { like: q } }] })
  if (status) where.push({ status: { equals: status } })
  if (project) where.push({ project: { equals: project } })
  if (from) where.push({ createdAt: { greater_than_equal: new Date(`${from}T00:00:00+06:00`).toISOString() } })
  if (to) where.push({ createdAt: { less_than: new Date(new Date(`${to}T00:00:00+06:00`).getTime() + 86_400_000).toISOString() } })
  return { q, status, project, from, to, where }
}
