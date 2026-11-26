import { z } from 'zod'

import { normaliseBDPhone, normaliseIntlPhone } from './phone'

/**
 * One schema per form, shared by the browser (React Hook Form) and the server action.
 * Error messages are message keys, translated in the UI (see messages/*.json → "validation").
 */
const name = z.string().trim().min(2, 'nameRequired').max(80, 'tooLong')
const bdPhone = z
  .string()
  .trim()
  .min(1, 'phoneRequired')
  .refine((v) => normaliseBDPhone(v) !== null, 'phoneInvalid')
const optionalEmail = z.string().trim().email('emailInvalid').max(120).optional().or(z.literal(''))
const message = z.string().trim().max(2000, 'tooLong').optional().or(z.literal(''))
const requiredSelect = z.string().trim().min(1, 'selectRequired')

export const enquirySchema = z.object({
  name,
  phone: bdPhone,
  project: requiredSelect,
  bedrooms: z.string().optional().or(z.literal('')),
  message,
})

export const brochureSchema = z.object({ name, phone: bdPhone, project: requiredSelect })

export const siteVisitSchema = z.object({
  name,
  phone: bdPhone,
  project: requiredSelect,
  visitDate: z
    .string()
    .min(1, 'dateRequired')
    .refine((v) => {
      const d = new Date(`${v}T00:00:00`)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return !Number.isNaN(d.getTime()) && d >= today
    }, 'dateFuture'),
  timeSlot: requiredSelect,
})

export const landownerSchema = z.object({
  name,
  phone: bdPhone,
  email: optionalEmail,
  area: z.string().trim().min(2, 'areaRequired').max(120),
  plotAddress: z.string().trim().max(200).optional().or(z.literal('')),
  landSizeKatha: z.coerce.number({ invalid_type_error: 'numberRequired' }).positive('numberRequired').max(1000),
  frontRoadFt: z.union([z.coerce.number().nonnegative().max(500), z.literal('')]).optional(),
  ownership: z.enum(['single', 'joint'], { errorMap: () => ({ message: 'selectRequired' }) }),
  message,
})

export const nrbSchema = z.object({
  name,
  country: z.string().trim().min(2, 'countryRequired').max(60),
  whatsapp: z
    .string()
    .trim()
    .min(1, 'phoneRequired')
    .refine((v) => normaliseIntlPhone(v) !== null, 'intlPhoneInvalid'),
  email: z.string().trim().min(1, 'emailRequired').email('emailInvalid'),
  project: z.string().optional().or(z.literal('')),
  budgetRange: z.string().optional().or(z.literal('')),
  bestTimeToCall: z.string().optional().or(z.literal('')),
  message,
})

export const contactSchema = z.object({
  name,
  phone: bdPhone,
  email: optionalEmail,
  subject: requiredSelect,
  message: z.string().trim().min(5, 'messageRequired').max(2000, 'tooLong'),
})

export const schemas = {
  enquiry: enquirySchema,
  brochure: brochureSchema,
  siteVisit: siteVisitSchema,
  landowner: landownerSchema,
  nrb: nrbSchema,
  contact: contactSchema,
} as const

export type FormType = keyof typeof schemas
export const FORM_TYPES = Object.keys(schemas) as FormType[]

/** Hidden fields captured automatically on every form. */
export const trackingSchema = z.object({
  pageUrl: z.string().max(1000).optional(),
  referrer: z.string().max(1000).optional(),
  utmSource: z.string().max(200).optional(),
  utmMedium: z.string().max(200).optional(),
  utmCampaign: z.string().max(200).optional(),
  utmContent: z.string().max(200).optional(),
  utmTerm: z.string().max(200).optional(),
  fbclid: z.string().max(500).optional(),
  gclid: z.string().max(500).optional(),
  language: z.string().max(10).optional(),
  eventId: z.string().max(100).optional(),
})
export type Tracking = z.infer<typeof trackingSchema>
