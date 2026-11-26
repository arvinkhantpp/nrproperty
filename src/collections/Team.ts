import type { CollectionConfig } from 'payload'

import { anyone, isAdminOrEditor } from '@/access/roles'
import { requiredInEnglish } from '@/fields'
import { revalidateHooks } from '@/hooks/revalidate'

export const Team: CollectionConfig = {
  slug: 'team',
  labels: { singular: 'Team member', plural: 'Team' },
  admin: {
    useAsTitle: 'name',
    group: 'Content',
    defaultColumns: ['name', 'role', 'isAdvisor', 'order'],
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
    { name: 'role', type: 'text', localized: true },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text' },
        { name: 'whatsapp', type: 'text' },
      ],
    },
    { name: 'bio', type: 'textarea', localized: true },
    {
      name: 'isAdvisor',
      label: 'Sales advisor (shown on project pages)',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'showOnAbout',
      label: 'Show on About page',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
