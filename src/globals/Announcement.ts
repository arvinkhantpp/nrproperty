import type { GlobalConfig } from 'payload'

import { anyone, isAdminOrEditor } from '@/access/roles'
import { linkFields } from '@/fields'
import { revalidateGlobal } from '@/hooks/revalidate'

export const Announcement: GlobalConfig = {
  slug: 'announcement',
  label: 'Announcement bar',
  admin: { group: 'Marketing' },
  access: { read: anyone, update: isAdminOrEditor },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    { name: 'enabled', type: 'checkbox', defaultValue: false },
    { name: 'text', type: 'text', localized: true },
    { type: 'row', fields: linkFields() },
  ],
}
