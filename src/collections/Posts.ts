import type { CollectionConfig } from 'payload'

import { isAdminOrEditor } from '@/access/roles'
import { previewUrl } from '@/admin/lib/preview'
import { requiredInEnglish, seoGroup, slugField } from '@/fields'
import { revalidateHooks } from '@/hooks/revalidate'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Blog post', plural: 'Blog posts' },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'category', 'publishedAt', '_status'],
    preview: previewUrl('/blog'),
  },
  access: {
    read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } }),
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  versions: { drafts: { autosave: { interval: 2000 } }, maxPerDoc: 20 },
  hooks: revalidateHooks,
  defaultSort: '-publishedAt',
  fields: [
    { name: 'title', type: 'text', localized: true, validate: requiredInEnglish },
    { name: 'excerpt', type: 'textarea', localized: true, maxLength: 240 },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    { name: 'body', type: 'richText', localized: true },
    { name: 'relatedProjects', type: 'relationship', relationTo: 'projects', hasMany: true },
    seoGroup({ basePath: '/blog', descriptionField: 'excerpt' }),
    slugField('title'),
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
      hooks: { beforeChange: [({ value }) => value ?? new Date().toISOString()] },
    },
    {
      name: 'category',
      type: 'select',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Buying guide', value: 'buying' },
        { label: 'Landowners', value: 'landowner' },
        { label: 'NRB', value: 'nrb' },
        { label: 'News', value: 'news' },
      ],
    },
    { name: 'author', type: 'relationship', relationTo: 'team', admin: { position: 'sidebar' } },
  ],
}
