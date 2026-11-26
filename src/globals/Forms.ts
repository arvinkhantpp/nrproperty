import type { Field, GlobalConfig } from 'payload'

import { anyone, isAdmin } from '@/access/roles'
import { requiredInEnglish } from '@/fields'
import { revalidateGlobal } from '@/hooks/revalidate'

export const FORM_KEYS = [
  'enquiry',
  'brochure',
  'siteVisit',
  'landowner',
  'nrb',
  'contact',
] as const
export type FormKey = (typeof FORM_KEYS)[number]

/** Optional fields that each form can hide; required ones are always shown. */
const OPTIONAL_FIELDS: Record<FormKey, string[]> = {
  enquiry: ['bedrooms', 'message'],
  brochure: [],
  siteVisit: [],
  landowner: ['email', 'plotAddress', 'frontRoadFt', 'documents', 'message'],
  nrb: ['project', 'budgetRange', 'bestTimeToCall', 'message'],
  contact: ['email'],
}

const formGroup = (key: FormKey, label: string): Field => ({
  name: key,
  label,
  type: 'group',
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'submitLabel', type: 'text', localized: true },
    { name: 'successMessage', type: 'textarea', localized: true },
    {
      name: 'recipients',
      type: 'array',
      access: { read: ({ req }) => Boolean(req.user) },
      admin: { description: 'Leave empty to use the default recipients in Site settings.' },
      fields: [{ name: 'email', type: 'email', required: true }],
    },
    ...(OPTIONAL_FIELDS[key].length
      ? [
          {
            name: 'hiddenFields',
            label: 'Hide these optional fields',
            type: 'select' as const,
            hasMany: true,
            options: OPTIONAL_FIELDS[key].map((f) => ({ label: f, value: f })),
          },
        ]
      : []),
    {
      name: 'labels',
      label: 'Custom labels',
      type: 'array',
      admin: {
        description: 'Override a field label or placeholder (field names: name, phone, project…).',
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'field', type: 'text', required: true },
            { name: 'label', type: 'text', localized: true },
            { name: 'placeholder', type: 'text', localized: true },
          ],
        },
      ],
    },
  ],
})

const optionList = (name: string, label: string): Field => ({
  name,
  label,
  type: 'array',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', localized: true, validate: requiredInEnglish },
      ],
    },
  ],
})

export const Forms: GlobalConfig = {
  slug: 'forms',
  admin: { group: 'Settings' },
  access: { read: anyone, update: isAdmin },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Forms',
          fields: [
            formGroup('enquiry', 'Quick enquiry'),
            formGroup('brochure', 'Brochure'),
            formGroup('siteVisit', 'Site visit'),
            formGroup('landowner', 'Landowner'),
            formGroup('nrb', 'NRB'),
            formGroup('contact', 'Contact'),
          ],
        },
        {
          label: 'Dropdown options',
          fields: [
            optionList('bedrooms', 'Bedrooms'),
            optionList('timeSlots', 'Site-visit time slots'),
            optionList('budgetRanges', 'NRB budget ranges'),
            optionList('bestTimes', 'Best time to call'),
            optionList('subjects', 'Contact subjects'),
          ],
        },
      ],
    },
  ],
}
