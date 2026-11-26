import 'server-only'

import type { Payload } from 'payload'

import type { Lead } from '@/payload-types'

import { sendMail } from './email'
import { appendRow } from './sheets'

const TYPE_LABEL: Record<Lead['type'], string> = {
  enquiry: 'Enquiry',
  brochure: 'Brochure download',
  siteVisit: 'Site visit',
  landowner: 'Landowner',
  nrb: 'NRB',
  contact: 'Contact',
}

const esc = (s: unknown) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

/** Label/value rows describing a lead, shared by the email and the sheet. */
export function leadRows(lead: Lead): [string, string][] {
  const d = lead.details ?? {}
  const t = lead.tracking ?? {}
  const project = lead.project && typeof lead.project === 'object' ? lead.project.name : ''
  const rows: [string, unknown][] = [
    ['Form', TYPE_LABEL[lead.type]],
    ['Name', lead.name],
    ['Phone', lead.phone],
    ['Email', lead.email],
    ['Project', project],
    ['Bedrooms', d.bedrooms],
    ['Visit date', d.visitDate?.slice(0, 10)],
    ['Time slot', d.timeSlot],
    ['Land area / location', d.area],
    ['Plot address', d.plotAddress],
    ['Land size (katha)', d.landSizeKatha],
    ['Front road (ft)', d.frontRoadFt],
    ['Ownership', d.ownership],
    ['Documents', d.documents?.length ? `${d.documents.length} attached (see admin)` : ''],
    ['Country', d.country],
    ['WhatsApp', d.whatsapp],
    ['Budget', d.budgetRange],
    ['Best time to call', d.bestTimeToCall],
    ['Subject', d.subject],
    ['Message', lead.message],
    ['Source', [t.utmSource, t.utmMedium, t.utmCampaign].filter(Boolean).join(' / ') || (t.fbclid ? 'facebook (fbclid)' : t.gclid ? 'google (gclid)' : t.referrer || 'direct')],
    ['Page', t.pageUrl],
    ['Language', t.language],
  ]
  return rows.filter(([, v]) => v !== undefined && v !== null && v !== '').map(([k, v]) => [k, String(v)])
}

function emailFor(lead: Lead, adminUrl: string) {
  const rows = leadRows(lead)
  const subject = `New ${TYPE_LABEL[lead.type].toLowerCase()} lead: ${lead.name} (${lead.phone})`
  const html = `<!doctype html><html><body style="margin:0;background:#F6F2EA;font-family:Arial,sans-serif;color:#16211D">
<div style="max-width:560px;margin:0 auto;padding:24px">
<p style="margin:0 0 4px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#7F6034">NR Property · ${esc(TYPE_LABEL[lead.type])}</p>
<h1 style="margin:0 0 16px;font-size:22px;color:#0E1B17">${esc(lead.name)}</h1>
<p style="margin:0 0 20px"><a href="tel:${esc(lead.phone)}" style="display:inline-block;background:#B08D57;color:#0E1B17;padding:10px 18px;border-radius:8px;font-weight:bold;text-decoration:none">Call ${esc(lead.phone)}</a></p>
<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;background:#fff;border-radius:12px;border-collapse:separate">
${rows.map(([k, v]) => `<tr><td style="padding:10px 16px;border-bottom:1px solid #EDE6DA;font-size:13px;color:#5A6762;width:38%;vertical-align:top">${esc(k)}</td><td style="padding:10px 16px;border-bottom:1px solid #EDE6DA;font-size:14px;white-space:pre-line">${esc(v)}</td></tr>`).join('')}
</table>
<p style="margin:20px 0 0"><a href="${esc(adminUrl)}" style="color:#0E1B17">Open in admin →</a></p>
</div></body></html>`
  const text = `${subject}\n\n${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${adminUrl}`
  return { subject, html, text }
}

/**
 * Runs after the visitor has already been sent to the thank-you page: email the sales team,
 * append to the Google Sheet, and record what worked on the lead (Pipeline tab in the admin).
 * Phase 5 adds the Meta Conversions API call here.
 */
export async function runLeadPipeline(payload: Payload, leadId: number, extra: { capi?: (lead: Lead) => Promise<boolean> } = {}) {
  const lead = await payload.findByID({ collection: 'leads', id: leadId, depth: 1, overrideAccess: true })
  const [settings, forms] = await Promise.all([
    payload.findGlobal({ slug: 'siteSettings', depth: 0, overrideAccess: true }),
    payload.findGlobal({ slug: 'forms', depth: 0, overrideAccess: true }),
  ])
  const errors: string[] = []
  const pipeline: NonNullable<Lead['pipeline']> = { ...(lead.pipeline ?? {}) }
  const site = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')

  const formRecipients = forms[lead.type]?.recipients?.map((r) => r.email) ?? []
  const defaults = settings.leadRouting?.recipients?.map((r) => r.email) ?? []
  const to = formRecipients.length ? formRecipients : defaults
  if (lead.assignedTo && typeof lead.assignedTo === 'object' && lead.assignedTo.email) to.push(lead.assignedTo.email)

  try {
    const mail = emailFor(lead, `${site}/admin/collections/leads/${lead.id}`)
    pipeline.emailSent = await sendMail({ to: [...new Set(to)], ...mail, replyTo: lead.email ?? undefined })
  } catch (err) {
    errors.push(`email: ${(err as Error).message}`)
  }

  try {
    const created = new Date(lead.createdAt).toLocaleString('en-GB', { timeZone: 'Asia/Dhaka' })
    const rows = Object.fromEntries(leadRows(lead))
    pipeline.sheetAppended = await appendRow(settings.leadRouting?.googleSheetId, settings.leadRouting?.googleSheetTab, [
      created,
      lead.id,
      rows.Form ?? '',
      lead.name,
      lead.phone,
      lead.email ?? '',
      rows.Project ?? '',
      rows.Message ?? '',
      JSON.stringify(lead.details ?? {}),
      rows.Source ?? '',
      lead.tracking?.utmCampaign ?? '',
      lead.tracking?.pageUrl ?? '',
      `${site}/admin/collections/leads/${lead.id}`,
    ])
  } catch (err) {
    errors.push(`sheet: ${(err as Error).message}`)
  }

  if (extra.capi) {
    try {
      pipeline.capiSent = await extra.capi(lead)
    } catch (err) {
      errors.push(`capi: ${(err as Error).message}`)
    }
  }

  if (errors.length) console.error(`[lead ${lead.id}]`, errors.join(' | '))
  await payload.update({
    collection: 'leads',
    id: lead.id,
    overrideAccess: true,
    data: { pipeline: { ...pipeline, errors: errors.join('\n') || null } },
  })
}
