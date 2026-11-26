import type { GlobalConfig } from 'payload'

import { anyone, isAdminOrEditor } from '@/access/roles'
import { linkFields } from '@/fields'
import { revalidateGlobal } from '@/hooks/revalidate'

export const Popup: GlobalConfig = {
  slug: 'popup',
  label: 'Offer popup',
  admin: { group: 'Marketing' },
  access: { read: anyone, update: isAdminOrEditor },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    { name: 'enabled', type: 'checkbox', defaultValue: false },
    { name: 'title', type: 'text', localized: true },
    { name: 'body', type: 'textarea', localized: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      type: 'row',
      fields: [
        {
          name: 'trigger',
          type: 'select',
          defaultValue: 'delay',
          options: [
            { label: 'After a delay', value: 'delay' },
            { label: 'When leaving the page (desktop)', value: 'exit' },
          ],
        },
        { name: 'delaySeconds', type: 'number', defaultValue: 20 },
        {
          name: 'showForm',
          label: 'Show the quick enquiry form',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
    { type: 'row', fields: linkFields() },
    {
      name: 'excludePaths',
      label: "Don't show on",
      type: 'text',
      hasMany: true,
      admin: { description: 'Paths such as /thank-you or /contact.' },
    },
  ],
}
