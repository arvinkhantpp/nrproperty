import type { CollectionConfig } from 'payload'

import { hasRole, isAdmin, isAdminField, ROLES } from '@/access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role', 'active'],
    group: 'Settings',
  },
  auth: true,
  access: {
    // Admins manage everyone; other staff can read and update only themselves.
    read: ({ req }) => (hasRole(req.user, 'admin') ? true : { id: { equals: req.user?.id } }),
    create: isAdmin,
    update: ({ req }) => (hasRole(req.user, 'admin') ? true : { id: { equals: req.user?.id } }),
    delete: isAdmin,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      saveToJWT: true,
      access: { update: isAdminField, create: isAdminField },
      options: ROLES.map((r) => ({ label: r.charAt(0).toUpperCase() + r.slice(1), value: r })),
      admin: { description: 'Admin: everything. Editor: content. Sales: leads only.' },
    },
    { name: 'phone', type: 'text' },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      access: { update: isAdminField },
    },
    {
      name: 'receivesAutoAssign',
      label: 'Receives auto-assigned leads',
      type: 'checkbox',
      defaultValue: false,
      access: { update: isAdminField },
      admin: { condition: (data) => data?.role === 'sales' },
    },
  ],
}
