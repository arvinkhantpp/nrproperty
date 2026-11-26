'use server'

import { headers } from 'next/headers'

import { payloadClient } from '@/lib/cms'
import type { Lead } from '@/payload-types'

import { normaliseBDPhone, normaliseIntlPhone } from './phone'
import { schemas, trackingSchema, FORM_TYPES, type FormType } from './schemas'
import type { SubmitInput, SubmitResult } from './submit-types'

const SEGMENT: Record<FormType, Lead['segment']> = {
  enquiry: 'buyer',
  brochure: 'buyer',
  siteVisit: 'buyer',
  contact: 'buyer',
  landowner: 'landowner',
  nrb: 'nrb',
}

const str = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : undefined)
const num = (v: unknown) => (v === '' || v == null ? undefined : Number(v))
const projectId = (v: unknown) => {
  const n = Number(v)
  return Number.isInteger(n) && n > 0 ? n : undefined
}

/** Maps validated form values onto the Leads collection. */
function toLead(type: FormType, v: Record<string, unknown>): Omit<Lead, 'id' | 'createdAt' | 'updatedAt'> {
  const base = {
    type,
    segment: SEGMENT[type],
    name: String(v.name),
    phone:
      type === 'nrb'
        ? (normaliseIntlPhone(String(v.whatsapp)) ?? String(v.whatsapp))
        : (normaliseBDPhone(String(v.phone)) ?? String(v.phone)),
    email: str(v.email),
    message: str(v.message),
    project: projectId(v.project),
    status: 'new' as const,
  }
  switch (type) {
    case 'enquiry':
      return { ...base, details: { bedrooms: str(v.bedrooms) } }
    case 'siteVisit':
      return { ...base, details: { visitDate: str(v.visitDate), timeSlot: str(v.timeSlot) } }
    case 'landowner':
      return {
        ...base,
        details: {
          area: str(v.area),
          plotAddress: str(v.plotAddress),
          landSizeKatha: num(v.landSizeKatha),
          frontRoadFt: num(v.frontRoadFt),
          ownership: str(v.ownership),
        },
      }
    case 'nrb':
      return {
        ...base,
        details: {
          country: str(v.country),
          whatsapp: base.phone,
          budgetRange: str(v.budgetRange),
          bestTimeToCall: str(v.bestTimeToCall),
        },
      }
    case 'contact':
      return { ...base, details: { subject: str(v.subject) } }
    default:
      return base
  }
}

export async function submitLead(input: SubmitInput): Promise<SubmitResult> {
  if (!FORM_TYPES.includes(input.type)) return { ok: false, error: 'generic' }
  const parsed = schemas[input.type].safeParse(input.values)
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? '')
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message
    }
    return { ok: false, error: 'generic', fieldErrors }
  }
  const tracking = trackingSchema.safeParse(input.tracking ?? {})
  const h = await headers()
  const ip = (h.get('x-forwarded-for') ?? '').split(',')[0]?.trim() || h.get('x-real-ip') || undefined

  try {
    const payload = await payloadClient()
    const lead = await payload.create({
      collection: 'leads',
      overrideAccess: true,
      data: {
        ...toLead(input.type, parsed.data as Record<string, unknown>),
        tracking: {
          ...(tracking.success ? tracking.data : {}),
          ip,
          userAgent: h.get('user-agent')?.slice(0, 400) ?? undefined,
        },
      },
    })
    const params = new URLSearchParams({ form: input.type })
    if (input.type === 'brochure' && lead.project) {
      params.set('project', String(typeof lead.project === 'object' ? lead.project.id : lead.project))
    }
    return { ok: true, leadId: lead.id, redirect: `/thank-you?${params.toString()}` }
  } catch (err) {
    console.error('[submitLead]', err)
    return { ok: false, error: 'generic' }
  }
}
