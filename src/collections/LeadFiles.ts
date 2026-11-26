import type { CollectionConfig } from 'payload'

/**
 * Landowner documents (deeds, mutation papers). Kept apart from public media: only logged-in
 * staff can read them, and uploads come only from the website's form handler.
 */
export const LeadFiles: CollectionConfig = {
  slug: 'lead-files',
  labels: { singular: 'Lead document', plural: 'Lead documents' },
  admin: { group: 'Leads', hidden: ({ user }) => user?.role === 'sales' },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => false,
    update: () => false,
    delete: ({ req }) => req.user?.role === 'admin',
  },
  upload: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
    staticDir: 'media-private',
  },
  fields: [{ name: 'originalName', type: 'text' }],
}
