import type { CollectionConfig } from 'payload'

import { anyone, isAdminOrEditor } from '@/access/roles'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Content' },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
      admin: { description: 'Describe the image for screen readers and Google.' },
    },
    { name: 'caption', type: 'text', localized: true },
  ],
  upload: {
    mimeTypes: ['image/*', 'application/pdf', 'video/mp4'],
    focalPoint: true,
    imageSizes: [
      { name: 'thumb', width: 480, height: 360, position: 'centre' },
      { name: 'card', width: 960, height: 720, position: 'centre' },
      { name: 'wide', width: 1920, withoutEnlargement: true },
    ],
    adminThumbnail: 'thumb',
  },
}
