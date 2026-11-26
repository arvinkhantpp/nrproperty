import type { CollectionConfig } from 'payload'

import { anyone, isAdminOrEditor } from '@/access/roles'
import { requiredInEnglish, seoGroup, slugField } from '@/fields'
import { revalidateHooks } from '@/hooks/revalidate'

export const Areas: CollectionConfig = {
  slug: 'areas',
  admin: {
    useAsTitle: 'name',
    group: 'Content',
    defaultColumns: ['name', 'slug', 'order'],
    description: 'Neighbourhoods. Each one gets a landing page at /apartments-in-<slug>.',
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
    slugField('name'),
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'intro', type: 'richText', localized: true },
    seoGroup(),
  ],
}
