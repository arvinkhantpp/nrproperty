import type { GlobalConfig } from 'payload'

import { anyone, isAdmin } from '@/access/roles'
import { requiredInEnglish } from '@/fields'
import { revalidateGlobal } from '@/hooks/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  label: 'Site settings',
  admin: { group: 'Settings' },
  access: {
    // Public pages need the stats and licence numbers; lead routing fields are hidden below.
    read: anyone,
    update: isAdmin,
  },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      name: 'stats',
      label: 'Trust numbers',
      type: 'array',
      maxRows: 4,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'value', type: 'text', required: true },
            { name: 'label', type: 'text', localized: true, validate: requiredInEnglish },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'rehabNo', label: 'REHAB member no.', type: 'text' },
        { name: 'tradeLicence', type: 'text' },
      ],
    },
    {
      name: 'leadRouting',
      label: 'Lead routing',
      type: 'group',
      access: { read: ({ req }) => Boolean(req.user) },
      fields: [
        {
          name: 'recipients',
          label: 'Default lead email recipients',
          type: 'array',
          fields: [{ name: 'email', type: 'email', required: true }],
        },
        {
          name: 'googleSheetId',
          label: 'Google Sheet ID',
          type: 'text',
          admin: {
            description:
              'The long ID in the sheet URL. Share the sheet with the service-account email.',
          },
        },
        { name: 'googleSheetTab', type: 'text', defaultValue: 'Leads' },
        {
          name: 'autoAssign',
          label: 'Auto-assign new leads round-robin to sales users',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'lastAssignedUser',
          type: 'relationship',
          relationTo: 'users',
          admin: { readOnly: true },
        },
      ],
    },
  ],
}
