import type { GlobalConfig } from 'payload'

import { anyone, isAdminOrEditor } from '@/access/roles'
import { linkFields } from '@/fields'
import { revalidateGlobal } from '@/hooks/revalidate'

export const Header: GlobalConfig = {
  slug: 'header',
  admin: { group: 'Settings' },
  access: { read: anyone, update: isAdminOrEditor },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      name: 'menu',
      type: 'array',
      admin: { description: 'Drag to reorder.' },
      fields: [
        { type: 'row', fields: linkFields({ required: true }) },
        { name: 'show', type: 'checkbox', defaultValue: true },
      ],
    },
    {
      name: 'cta',
      label: 'Header button',
      type: 'group',
      fields: [
        { type: 'row', fields: linkFields() },
        {
          name: 'opensSiteVisit',
          label: 'Open the site-visit form instead of a link',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'showHotline', type: 'checkbox', defaultValue: true },
        { name: 'showLanguageSwitch', type: 'checkbox', defaultValue: true },
      ],
    },
  ],
}
