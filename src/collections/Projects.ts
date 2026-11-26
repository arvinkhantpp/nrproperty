import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'

import { anyone, isAdminOrEditor } from '@/access/roles'
import { previewUrl } from '@/admin/lib/preview'
import { PROJECT_STATUSES, PROJECT_TYPES, requiredInEnglish, seoGroup, slugify } from '@/fields'
import { revalidateHooks } from '@/hooks/revalidate'

/** SEO-style slug: apartment-for-sale-in-<area>-<name>, built when the slug is left empty. */
const buildSlug: CollectionBeforeChangeHook = async ({ data, req, originalDoc }) => {
  if (data.slug) {
    data.slug = slugify(data.slug)
    return data
  }
  if (originalDoc?.slug) return data
  const name = typeof data.name === 'string' ? data.name : data.name?.en
  if (!name) return data
  let area = ''
  const areaId = typeof data.area === 'object' ? data.area?.id : data.area
  if (areaId) {
    try {
      const doc = await req.payload.findByID({ collection: 'areas', id: areaId, depth: 0, req })
      area = doc?.slug ?? ''
    } catch {
      area = ''
    }
  }
  data.slug = slugify(`apartment-for-sale-in-${area}-${name.replace(/^nr\s+/i, 'nr-')}`)
  return data
}

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'status', 'area', 'featuredOnHome', 'updatedAt'],
    group: 'Content',
    listSearchableFields: ['name', 'slug', 'address'],
    description: 'Every project appears on /projects and gets its own page automatically.',
    preview: previewUrl('/projects'),
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  versions: { drafts: { autosave: { interval: 2000 } }, maxPerDoc: 30 },
  hooks: { beforeChange: [buildSlug], ...revalidateHooks },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Details',
          fields: [
            { name: 'name', type: 'text', localized: true, validate: requiredInEnglish },
            {
              type: 'row',
              fields: [
                {
                  name: 'status',
                  type: 'select',
                  required: true,
                  defaultValue: 'ongoing',
                  options: PROJECT_STATUSES,
                  // Avoid clashing with the drafts "_status" enum Payload creates.
                  enumName: 'enum_projects_sales_status',
                },
                {
                  name: 'type',
                  type: 'select',
                  required: true,
                  defaultValue: 'residential',
                  options: PROJECT_TYPES,
                },
                { name: 'area', type: 'relationship', relationTo: 'areas', required: true },
              ],
            },
            { name: 'address', type: 'text', localized: true },
            {
              name: 'tagline',
              type: 'text',
              localized: true,
              admin: { description: 'One line under the name.' },
            },
            { name: 'overview', type: 'richText', localized: true },
            {
              name: 'facts',
              label: 'Key facts',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'landAreaKatha', label: 'Land area (katha)', type: 'number' },
                    { name: 'floors', type: 'text', admin: { description: 'e.g. G + 14' } },
                    { name: 'units', label: 'Total units', type: 'number' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'sizeMinSft', label: 'Smallest unit (sft)', type: 'number' },
                    { name: 'sizeMaxSft', label: 'Largest unit (sft)', type: 'number' },
                    { name: 'bedrooms', type: 'text', admin: { description: 'e.g. 3–4' } },
                    { name: 'bathrooms', type: 'text' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'frontRoadFt', label: 'Front road (ft)', type: 'number' },
                    { name: 'parking', type: 'text', localized: true },
                    {
                      name: 'handoverDate',
                      type: 'date',
                      admin: { date: { pickerAppearance: 'monthOnly' } },
                    },
                    { name: 'rajukNo', label: 'RAJUK approval no.', type: 'text' },
                  ],
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'showPrice', type: 'checkbox', defaultValue: true },
                {
                  name: 'startingPrice',
                  label: 'Starting price (BDT)',
                  type: 'number',
                  admin: { condition: (d) => Boolean(d?.showPrice) },
                },
              ],
            },
            { name: 'priceNote', type: 'text', localized: true },
          ],
        },
        {
          label: 'Media & plans',
          fields: [
            {
              name: 'gallery',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              admin: { description: 'Drag to reorder. The first photo is the cover.' },
            },
            {
              name: 'videos',
              type: 'array',
              fields: [
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                  admin: { description: 'YouTube or Facebook video link' },
                },
                { name: 'title', type: 'text', localized: true },
              ],
            },
            {
              name: 'floorPlans',
              type: 'array',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      localized: true,
                      validate: requiredInEnglish,
                      admin: { description: 'e.g. Type A' },
                    },
                    { name: 'sizeSft', label: 'Size (sft)', type: 'number' },
                    { name: 'beds', type: 'number' },
                    { name: 'baths', type: 'number' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'balconies', type: 'number' },
                    { name: 'facing', type: 'text', localized: true },
                  ],
                },
                { name: 'image', type: 'upload', relationTo: 'media' },
                { name: 'pdf', label: 'PDF', type: 'upload', relationTo: 'media' },
              ],
            },
            {
              name: 'brochure',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'PDF sent after the brochure form.' },
            },
          ],
        },
        {
          label: 'Amenities',
          fields: [
            { name: 'amenities', type: 'relationship', relationTo: 'amenities', hasMany: true },
          ],
        },
        {
          label: 'Location',
          fields: [
            {
              name: 'geo',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'lat', type: 'number' },
                    { name: 'lng', type: 'number' },
                  ],
                },
                {
                  name: 'mapEmbedUrl',
                  label: 'Google Maps embed URL',
                  type: 'text',
                  admin: {
                    description: 'Google Maps → Share → Embed a map → copy the src="…" link.',
                  },
                },
              ],
            },
            {
              name: 'nearby',
              type: 'array',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'place', type: 'text', localized: true, validate: requiredInEnglish },
                    { name: 'minutes', type: 'number', required: true },
                    {
                      name: 'mode',
                      type: 'select',
                      defaultValue: 'drive',
                      options: [
                        { label: 'Drive', value: 'drive' },
                        { label: 'Walk', value: 'walk' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Progress',
          fields: [
            {
              name: 'progress',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'stage',
                      type: 'text',
                      localized: true,
                      admin: { description: 'e.g. Roof casting, 9th floor' },
                    },
                    { name: 'percent', type: 'number', min: 0, max: 100 },
                  ],
                },
                {
                  name: 'updates',
                  label: 'Monthly updates',
                  type: 'array',
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      name: 'date',
                      type: 'date',
                      required: true,
                      admin: { date: { pickerAppearance: 'monthOnly' } },
                    },
                    { name: 'note', type: 'text', localized: true },
                    { name: 'photos', type: 'upload', relationTo: 'media', hasMany: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'FAQ',
          fields: [
            {
              name: 'faqs',
              label: 'FAQs',
              type: 'array',
              fields: [
                { name: 'question', type: 'text', localized: true, validate: requiredInEnglish },
                { name: 'answer', type: 'textarea', localized: true, validate: requiredInEnglish },
              ],
            },
          ],
        },
        { label: 'SEO', fields: [seoGroup({ basePath: '/projects', titleField: 'name', descriptionField: 'tagline' })] },
      ],
    },
    {
      name: 'cardPreview',
      type: 'ui',
      admin: { position: 'sidebar', components: { Field: '/admin/components/ProjectPreview#ProjectPreview' } },
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Leave empty to build it: apartment-for-sale-in-<area>-<name>.',
      },
    },
    {
      name: 'featuredOnHome',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Lower shows first.' },
    },
    { name: 'advisor', type: 'relationship', relationTo: 'team', admin: { position: 'sidebar' } },
  ],
}
