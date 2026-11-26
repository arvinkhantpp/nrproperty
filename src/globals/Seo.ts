import type { GlobalConfig } from 'payload'

import { anyone, isAdminOrEditor } from '@/access/roles'
import { revalidateGlobal } from '@/hooks/revalidate'

export const Seo: GlobalConfig = {
  slug: 'seo',
  label: 'SEO & redirects',
  admin: { group: 'Settings' },
  access: { read: anyone, update: isAdminOrEditor },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      name: 'titleTemplate',
      type: 'text',
      defaultValue: '%s · NR Property',
      admin: { description: '%s is replaced with the page title.' },
    },
    { name: 'defaultTitle', type: 'text', localized: true },
    { name: 'defaultDescription', type: 'textarea', localized: true },
    { name: 'ogImage', type: 'upload', relationTo: 'media' },
    {
      name: 'redirects',
      type: 'array',
      admin: {
        description:
          'Send visitors from an old address to a new one (e.g. after renaming a project).',
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'from', type: 'text', required: true, admin: { placeholder: '/old-page' } },
            {
              name: 'to',
              type: 'text',
              required: true,
              admin: { placeholder: '/projects/new-page' },
            },
            { name: 'permanent', type: 'checkbox', defaultValue: true },
          ],
        },
      ],
    },
  ],
}
