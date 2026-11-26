import type { GlobalConfig } from 'payload'

import { anyone, isAdminOrEditor } from '@/access/roles'
import { linkFields, requiredInEnglish } from '@/fields'
import { revalidateGlobal } from '@/hooks/revalidate'

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: { group: 'Settings' },
  access: { read: anyone, update: isAdminOrEditor },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    { name: 'about', label: 'Short text under the logo', type: 'textarea', localized: true },
    {
      name: 'columns',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'title', type: 'text', localized: true, validate: requiredInEnglish },
        {
          name: 'links',
          type: 'array',
          fields: [{ type: 'row', fields: linkFields({ required: true }) }],
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      localized: true,
      admin: { description: '{year} is replaced with the current year.' },
    },
  ],
}
