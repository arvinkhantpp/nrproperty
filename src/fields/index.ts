import type { Field, GroupField, SelectField, TextField } from 'payload'

/** URL-safe slug from any text (Bangla characters are dropped; slugs stay English for ads and hreflang). */
export const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/** Slug field that fills itself from `sourceField` when left empty. Shared across languages. */
export const slugField = (sourceField = 'title'): TextField => ({
  name: 'slug',
  type: 'text',
  index: true,
  unique: true,
  admin: {
    position: 'sidebar',
    description: 'Part of the web address. Filled in automatically; edit only if you need to.',
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (typeof value === 'string' && value.trim()) return slugify(value)
        const source = data?.[sourceField]
        const text = typeof source === 'string' ? source : source?.en
        return typeof text === 'string' ? slugify(text) : value
      },
    ],
  },
})

export const seoGroup = (): GroupField => ({
  name: 'seo',
  label: 'SEO',
  type: 'group',
  admin: { description: 'Leave empty to use the page title and default description.' },
  fields: [
    { name: 'metaTitle', type: 'text', localized: true, maxLength: 70 },
    { name: 'metaDescription', type: 'textarea', localized: true, maxLength: 170 },
    { name: 'ogImage', label: 'Share image', type: 'upload', relationTo: 'media' },
    { name: 'noIndex', label: 'Hide from Google', type: 'checkbox', defaultValue: false },
  ],
})

export const BACKGROUNDS = ['cream', 'sand', 'ink', 'forest'] as const
export type Background = (typeof BACKGROUNDS)[number]

export const backgroundField = (defaultValue: Background = 'cream'): SelectField => ({
  name: 'background',
  type: 'select',
  defaultValue,
  options: BACKGROUNDS.map((b) => ({ label: b[0]!.toUpperCase() + b.slice(1), value: b })),
})

/** A link that is either a page on this site (relative path) or a full URL / tel: / wa.me link. */
export const linkFields = (opts: { required?: boolean } = {}): Field[] => [
  {
    name: 'label',
    type: 'text',
    localized: true,
    ...(opts.required ? { validate: requiredInEnglish } : {}),
  },
  {
    name: 'href',
    label: 'Link',
    type: 'text',
    required: opts.required,
    admin: { description: 'e.g. /projects, /landowner#land-form, https://…, tel:+880…' },
  },
]

export const linkGroup = (name: string, label?: string): GroupField => ({
  name,
  label,
  type: 'group',
  fields: linkFields(),
})

export const PROJECT_STATUSES = [
  { label: 'Ongoing', value: 'ongoing' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Completed', value: 'completed' },
  { label: 'Sold Out', value: 'soldOut' },
]

export const PROJECT_TYPES = [
  { label: 'Residential', value: 'residential' },
  { label: 'Commercial', value: 'commercial' },
  { label: 'Mixed use', value: 'mixed' },
]

export const ICONS = [
  'shield',
  'clock',
  'layers',
  'key',
  'globe',
  'phone',
  'mail',
  'pin',
  'calendar',
  'land',
  'floors',
  'area',
  'bed',
  'road',
  'car',
  'check',
  'grid',
  'play',
  'download',
  'heart',
  'info',
] as const

export const iconField = (name = 'icon'): SelectField => ({
  name,
  type: 'select',
  defaultValue: 'check',
  options: ICONS.map((i) => ({ label: i, value: i })),
})

/**
 * "Required" for localized fields, enforced only in English (the default locale). Bangla falls back
 * to English, so editors can save a Bangla version without translating every field first.
 */
export const requiredInEnglish = (value: unknown, { req }: { req: { locale?: string | null } }) =>
  req.locale && req.locale !== 'en'
    ? true
    : value !== undefined && value !== null && value !== ''
      ? true
      : 'This field is required'
