import type { Access, CollectionConfig, FieldAccess } from 'payload'

import { hasRole } from '@/access/roles'

export const LEAD_TYPES = [
  { label: 'Quick enquiry', value: 'enquiry' },
  { label: 'Brochure', value: 'brochure' },
  { label: 'Site visit', value: 'siteVisit' },
  { label: 'Landowner', value: 'landowner' },
  { label: 'NRB', value: 'nrb' },
  { label: 'Contact', value: 'contact' },
] as const

export const LEAD_STATUSES = [
  { label: 'New', value: 'new' },
  { label: 'Contacted', value: 'contacted' },
  { label: 'Visit booked', value: 'visitBooked' },
  { label: 'Booked', value: 'booked' },
  { label: 'Lost', value: 'lost' },
] as const

/** Sales users see leads assigned to them plus unassigned ones; admins and editors see all. */
const readLeads: Access = ({ req }) => {
  const user = req.user
  if (!user) return false
  if (hasRole(user, 'admin', 'editor')) return true
  if (hasRole(user, 'sales'))
    return { or: [{ assignedTo: { equals: user.id } }, { assignedTo: { exists: false } }] }
  return false
}

const staff: Access = ({ req }) => Boolean(req.user)
const adminOnlyField: FieldAccess = ({ req }) => hasRole(req.user, 'admin')
const ro = { update: adminOnlyField }

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'type', 'project', 'status', 'assignedTo', 'createdAt'],
    group: 'Leads',
    listSearchableFields: ['name', 'phone', 'email'],
    pagination: { defaultLimit: 50 },
  },
  access: {
    read: readLeads,
    // Leads are created only by the website's form handler (server-side, access overridden).
    create: ({ req }) => hasRole(req.user, 'admin'),
    update: staff,
    delete: ({ req }) => hasRole(req.user, 'admin'),
  },
  defaultSort: '-createdAt',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Answers',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  required: true,
                  options: [...LEAD_TYPES],
                  access: ro,
                },
                {
                  name: 'segment',
                  type: 'select',
                  index: true,
                  options: [
                    { label: 'Buyer', value: 'buyer' },
                    { label: 'Landowner', value: 'landowner' },
                    { label: 'NRB', value: 'nrb' },
                  ],
                  access: ro,
                  admin: { readOnly: true },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'name', type: 'text', required: true, access: ro },
                { name: 'phone', type: 'text', required: true, index: true, access: ro },
                { name: 'email', type: 'email', access: ro },
              ],
            },
            { name: 'project', type: 'relationship', relationTo: 'projects', access: ro },
            { name: 'message', type: 'textarea', access: ro },
            {
              name: 'details',
              label: 'Form-specific answers',
              type: 'group',
              access: ro,
              fields: [
                { name: 'bedrooms', type: 'text' },
                { name: 'visitDate', type: 'date' },
                { name: 'timeSlot', type: 'text' },
                { name: 'area', type: 'text' },
                { name: 'plotAddress', type: 'text' },
                { name: 'landSizeKatha', type: 'number' },
                { name: 'frontRoadFt', type: 'number' },
                { name: 'ownership', type: 'text' },
                { name: 'documents', type: 'upload', relationTo: 'lead-files', hasMany: true },
                { name: 'country', type: 'text' },
                { name: 'whatsapp', type: 'text' },
                { name: 'budgetRange', type: 'text' },
                { name: 'bestTimeToCall', type: 'text' },
                { name: 'subject', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Tracking',
          fields: [
            {
              name: 'tracking',
              type: 'group',
              access: ro,
              fields: [
                { name: 'pageUrl', type: 'text' },
                { name: 'referrer', type: 'text' },
                {
                  type: 'row',
                  fields: [
                    { name: 'utmSource', type: 'text', index: true },
                    { name: 'utmMedium', type: 'text' },
                    { name: 'utmCampaign', type: 'text' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'utmContent', type: 'text' },
                    { name: 'utmTerm', type: 'text' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'fbclid', type: 'text' },
                    { name: 'gclid', type: 'text' },
                    { name: 'fbp', type: 'text' },
                    { name: 'fbc', type: 'text' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'language', type: 'text' },
                    { name: 'ip', type: 'text' },
                    { name: 'eventId', type: 'text' },
                  ],
                },
                { name: 'userAgent', type: 'text' },
              ],
            },
            {
              name: 'pipeline',
              label: 'Delivery',
              type: 'group',
              access: ro,
              admin: {
                description: 'Whether the email, Google Sheet row and Meta event went out.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'emailSent', type: 'checkbox' },
                    { name: 'sheetAppended', type: 'checkbox' },
                    { name: 'capiSent', type: 'checkbox' },
                  ],
                },
                { name: 'errors', type: 'textarea' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      index: true,
      options: [...LEAD_STATUSES],
      admin: { position: 'sidebar' },
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
      index: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'duplicateOf',
      type: 'relationship',
      relationTo: 'leads',
      access: ro,
      admin: { position: 'sidebar', description: 'Same phone number within 10 minutes.' },
    },
    {
      name: 'notes',
      type: 'array',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'text', type: 'textarea', required: true },
        { name: 'author', type: 'relationship', relationTo: 'users', admin: { readOnly: true } },
        { name: 'date', type: 'date', admin: { readOnly: true } },
      ],
      hooks: {
        beforeChange: [
          ({ value, req }) =>
            Array.isArray(value)
              ? value.map((n) => ({
                  ...n,
                  author: n.author ?? req.user?.id,
                  date: n.date ?? new Date().toISOString(),
                }))
              : value,
        ],
      },
    },
  ],
}
