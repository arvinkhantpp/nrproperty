import type { CollectionConfig } from 'payload'

import { anyone, isAdminOrEditor } from '@/access/roles'
import { iconField, requiredInEnglish } from '@/fields'
import { revalidateHooks } from '@/hooks/revalidate'

export const Amenities: CollectionConfig = {
  slug: 'amenities',
  admin: { useAsTitle: 'name', group: 'Content', defaultColumns: ['name', 'icon'] },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  hooks: revalidateHooks,
  fields: [
    { name: 'name', type: 'text', localized: true, validate: requiredInEnglish },
    iconField(),
  ],
}
