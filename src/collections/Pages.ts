import type { CollectionConfig } from 'payload'

import { isAdminOrEditor } from '@/access/roles'
import { pageBlocks } from '@/blocks/config'
import { requiredInEnglish, seoGroup, slugField } from '@/fields'
import { revalidateHooks } from '@/hooks/revalidate'

/**
 * Block-built pages: home, about, landowner, nrb, contact, privacy, thank-you.
 * The slug decides the URL ("home" is "/").
 */
export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    description: 'Drag sections to reorder, tick "Hide this section" to hide one.',
  },
  access: {
    read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } }),
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  versions: { drafts: { autosave: { interval: 2000 } }, maxPerDoc: 30 },
  hooks: revalidateHooks,
  fields: [
    { name: 'title', type: 'text', localized: true, validate: requiredInEnglish },
    {
      type: 'tabs',
      tabs: [
        { label: 'Sections', fields: [{ name: 'layout', type: 'blocks', blocks: pageBlocks }] },
        { label: 'SEO', fields: [seoGroup()] },
      ],
    },
    slugField('title'),
  ],
}
