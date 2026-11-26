import type { CollectionConfig } from 'payload'

import { anyone, isAdminOrEditor } from '@/access/roles'
import { requiredInEnglish } from '@/fields'
import { revalidateHooks } from '@/hooks/revalidate'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
    group: 'Content',
    defaultColumns: ['name', 'type', 'role', 'order'],
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  hooks: revalidateHooks,
  defaultSort: 'order',
  fields: [
    { name: 'name', type: 'text', localized: true, validate: requiredInEnglish },
    {
      name: 'role',
      type: 'text',
      localized: true,
      admin: { description: 'e.g. Apartment owner · NR Aurelia' },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'buyer',
      options: [
        { label: 'Buyer', value: 'buyer' },
        { label: 'Landowner', value: 'landowner' },
        { label: 'NRB', value: 'nrb' },
      ],
    },
    { name: 'quote', type: 'textarea', localized: true, validate: requiredInEnglish },
    { name: 'project', type: 'relationship', relationTo: 'projects' },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'videoUrl', type: 'text' },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
