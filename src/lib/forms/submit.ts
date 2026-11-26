'use server'

import { after } from 'next/server'
import { cookies, headers } from 'next/headers'

import { payloadClient } from '@/lib/cms'
import { nextAssignee } from '@/lib/leads/assign'
import { adoptIncoming, DOC_RULES } from '@/lib/leads/documents'
import { findDuplicate, isRateLimited } from '@/lib/leads/guards'
import { runLeadPipeline } from '@/lib/leads/pipeline'
import { verifyTurnstile } from '@/lib/leads/turnstile'
import { sendCapiLead } from '@/lib/tracking/capi'
import { CONSENT_COOKIE } from '@/lib/tracking/config'
import type { Lead } from '@/payload-types'

import { normaliseBDPhone, normaliseIntlPhone } from './phone'
import { schemas, trackingSchema, FORM_TYPES, type FormType } from './schemas'
import type { SubmitInput, SubmitResult } from './submit-types'
import { verifyDocumentToken } from './uploads'

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

async function resolveDocuments(payload: Awaited<ReturnType<typeof payloadClient>>, refs: string[] = []) {
  const ids: number[] = []
  const keys: string[] = []
  for (const ref of refs.slice(0, DOC_RULES.maxFiles)) {
    if (typeof ref !== 'string') continue
    if (ref.startsWith('private/')) keys.push(ref)
    else {
      const id = await verifyDocumentToken(ref)
      if (id) ids.push(id)
    }
  }
  return [...ids, ...(await adoptIncoming(payload, keys))]
}

/**
 * The single entry point for every website form:
 * honeypot → schema → Turnstile → IP rate limit → duplicate check → round-robin assignment →
 * save → (after the response) email, Google Sheet and, from Phase 5, Meta CAPI.
 */
export async function submitLead(input: SubmitInput): Promise<SubmitResult> {
  if (!input || !FORM_TYPES.includes(input.type)) return { ok: false, error: 'generic' }
  const thankYou = (extra: Record<string, string> = {}) =>
    `/thank-you?${new URLSearchParams({ form: input.type, ...extra }).toString()}`

  // Bots that fill the hidden field get a normal-looking success and nothing is saved.
  if (input.website) return { ok: true, leadId: 0, redirect: thankYou() }

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
  const jar = await cookies()
  const ip = (h.get('x-forwarded-for') ?? '').split(',')[0]?.trim() || h.get('x-real-ip') || undefined

  if (!(await verifyTurnstile(input.turnstileToken, ip))) return { ok: false, error: 'spam' }

  try {
    const payload = await payloadClient()
    if (await isRateLimited(payload, ip)) return { ok: false, error: 'rateLimited' }

    const data = toLead(input.type, parsed.data as Record<string, unknown>)
    const duplicate = await findDuplicate(payload, data.phone, input.type)
    const assignedTo = duplicate
      ? typeof duplicate.assignedTo === 'object'
        ? (duplicate.assignedTo?.id ?? null)
        : (duplicate.assignedTo ?? null)
      : await nextAssignee(payload)
    const documents = input.type === 'landowner' ? await resolveDocuments(payload, input.documents) : []

    const lead = await payload.create({
      collection: 'leads',
      overrideAccess: true,
      data: {
        ...data,
        details: { ...data.details, ...(documents.length ? { documents } : {}) },
        assignedTo,
        duplicateOf: duplicate?.id ?? null,
        tracking: {
          ...(tracking.success ? tracking.data : {}),
          eventId: input.tracking?.eventId?.slice(0, 100),
          fbp: (input.tracking?.fbp || jar.get('_fbp')?.value)?.slice(0, 200),
          fbc: (input.tracking?.fbc || jar.get('_fbc')?.value)?.slice(0, 300),
          ip,
          userAgent: h.get('user-agent')?.slice(0, 400) ?? undefined,
        },
      },
    })

    // Notifications run after the response, so the visitor never waits on email or Google.
    // Duplicates (same phone + form within 10 minutes) are saved and linked, but not re-sent.
    if (!duplicate) {
      const consent = jar.get(CONSENT_COOKIE)?.value
      after(async () => {
        try {
          const trackingGlobal = await payload.findGlobal({ slug: 'tracking', depth: 0, overrideAccess: true })
          // Respect the cookie choice: with consent required, only send to Meta after "Accept".
          const allowed = trackingGlobal.consentRequired === false ? consent !== 'denied' : consent === 'granted'
          await runLeadPipeline(payload, lead.id, allowed ? { capi: (l) => sendCapiLead(l, trackingGlobal) } : {})
        } catch (err) {
          console.error('[lead pipeline]', err)
        }
      })
    }

    const projectId = typeof lead.project === 'object' ? lead.project?.id : lead.project
    return {
      ok: true,
      leadId: lead.id,
      redirect: thankYou(input.type === 'brochure' && projectId ? { project: String(projectId) } : {}),
    }
  } catch (err) {
    console.error('[submitLead]', err)
    return { ok: false, error: 'generic' }
  }
}
