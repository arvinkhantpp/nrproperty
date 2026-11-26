import type { Block, Field } from 'payload'

import {
  backgroundField,
  iconField,
  linkFields,
  linkGroup,
  requiredInEnglish,
  type Background,
} from '@/fields'

/** Every block: show/hide, background and an optional anchor id (e.g. #land-form). */
const common = (bg: Background = 'cream'): Field[] => [
  {
    type: 'row',
    fields: [
      {
        name: 'hidden',
        label: 'Hide this section',
        type: 'checkbox',
        defaultValue: false,
      },
      backgroundField(bg),
      {
        name: 'anchorId',
        label: 'Anchor id',
        type: 'text',
        admin: { description: 'Optional, lets links jump here (e.g. land-form).' },
      },
    ],
  },
]

const heading: Field[] = [
  { name: 'eyebrow', type: 'text', localized: true },
  {
    name: 'title',
    type: 'text',
    localized: true,
    admin: {
      description:
        'Wrap the gold italic phrase in *asterisks*, e.g. Homes crafted with patience, *built on trust.*',
    },
  },
  { name: 'description', type: 'textarea', localized: true },
]

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    ...common('ink'),
    ...heading,
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'photo',
      options: [
        { label: 'Full-bleed photo', value: 'photo' },
        { label: 'Split (text + image)', value: 'split' },
        { label: 'Text only', value: 'plain' },
      ],
    },
    linkGroup('primary', 'Primary button'),
    linkGroup('secondary', 'Secondary button'),
    {
      name: 'showSearch',
      label: 'Show project search bar',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}

export const StatsBlock: Block = {
  slug: 'stats',
  labels: { singular: 'Stats', plural: 'Stats' },
  fields: [
    ...common('cream'),
    {
      name: 'source',
      type: 'select',
      defaultValue: 'site',
      options: [
        { label: 'Site settings (shared numbers)', value: 'site' },
        { label: 'Custom numbers below', value: 'custom' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      maxRows: 4,
      admin: { condition: (_, s) => s?.source === 'custom' },
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', localized: true, validate: requiredInEnglish },
      ],
    },
  ],
}

export const FeaturedProjectsBlock: Block = {
  slug: 'featuredProjects',
  labels: { singular: 'Featured projects', plural: 'Featured projects' },
  fields: [
    ...common('sand'),
    ...heading,
    {
      name: 'showTabs',
      label: 'Status tabs (Ongoing / Upcoming / Completed)',
      type: 'checkbox',
      defaultValue: true,
    },
    { name: 'limit', type: 'number', defaultValue: 3, min: 1, max: 9 },
    linkGroup('cta', 'Button under the cards'),
  ],
}

export const FeaturesBlock: Block = {
  slug: 'features',
  labels: { singular: 'Why us / features', plural: 'Why us / features' },
  fields: [
    ...common('cream'),
    ...heading,
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'items',
      type: 'array',
      maxRows: 8,
      fields: [
        iconField(),
        { name: 'title', type: 'text', localized: true, validate: requiredInEnglish },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
  ],
}

export const LandownerBandBlock: Block = {
  slug: 'landownerBand',
  labels: { singular: 'Landowner band', plural: 'Landowner bands' },
  fields: [
    ...common('forest'),
    ...heading,
    linkGroup('primary', 'Primary button'),
    linkGroup('secondary', 'Secondary button'),
    {
      name: 'steps',
      type: 'array',
      maxRows: 6,
      fields: [
        { name: 'title', type: 'text', localized: true, validate: requiredInEnglish },
        { name: 'description', type: 'text', localized: true },
      ],
    },
  ],
}

export const StepsBlock: Block = {
  slug: 'steps',
  labels: { singular: 'Steps', plural: 'Steps' },
  fields: [
    ...common('cream'),
    ...heading,
    {
      name: 'items',
      type: 'array',
      maxRows: 8,
      fields: [
        iconField(),
        { name: 'title', type: 'text', localized: true, validate: requiredInEnglish },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
  ],
}

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: { singular: 'Testimonials', plural: 'Testimonials' },
  fields: [
    ...common('cream'),
    ...heading,
    {
      name: 'filter',
      type: 'select',
      defaultValue: 'all',
      options: [
        { label: 'All', value: 'all' },
        { label: 'Buyers', value: 'buyer' },
        { label: 'Landowners', value: 'landowner' },
        { label: 'NRB', value: 'nrb' },
      ],
    },
    { name: 'limit', type: 'number', defaultValue: 3 },
  ],
}

export const NrbBannerBlock: Block = {
  slug: 'nrbBanner',
  labels: { singular: 'NRB banner', plural: 'NRB banners' },
  fields: [
    ...common('cream'),
    ...heading,
    { name: 'image', type: 'upload', relationTo: 'media' },
    linkGroup('cta', 'Button'),
  ],
}

export const BlogLatestBlock: Block = {
  slug: 'blogLatest',
  labels: { singular: 'Latest blog posts', plural: 'Latest blog posts' },
  fields: [
    ...common('sand'),
    ...heading,
    { name: 'limit', type: 'number', defaultValue: 3 },
    linkGroup('cta', 'Button'),
  ],
}

export const EnquiryFormBlock: Block = {
  slug: 'enquiryForm',
  labels: { singular: 'Enquiry form', plural: 'Enquiry forms' },
  fields: [
    ...common('ink'),
    ...heading,
    {
      name: 'form',
      type: 'select',
      defaultValue: 'enquiry',
      options: [
        { label: 'Quick enquiry', value: 'enquiry' },
        { label: 'Site visit', value: 'siteVisit' },
        { label: 'Landowner', value: 'landowner' },
        { label: 'NRB', value: 'nrb' },
        { label: 'Contact', value: 'contact' },
      ],
    },
    { name: 'formTitle', type: 'text', localized: true },
    {
      name: 'showContacts',
      label: 'Show hotline, WhatsApp, email and address',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: { singular: 'Rich text', plural: 'Rich text' },
  fields: [
    ...common('cream'),
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'content', type: 'richText', localized: true },
    {
      name: 'width',
      type: 'select',
      defaultValue: 'narrow',
      options: [
        { label: 'Narrow (reading)', value: 'narrow' },
        { label: 'Wide', value: 'wide' },
      ],
    },
  ],
}

export const ImageTextBlock: Block = {
  slug: 'imageText',
  labels: { singular: 'Image + text', plural: 'Image + text' },
  fields: [
    ...common('cream'),
    ...heading,
    { name: 'body', type: 'richText', localized: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
    linkGroup('cta', 'Button'),
  ],
}

export const FaqBlock: Block = {
  slug: 'faq',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  fields: [
    ...common('cream'),
    ...heading,
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', localized: true, validate: requiredInEnglish },
        { name: 'answer', type: 'textarea', localized: true, validate: requiredInEnglish },
      ],
    },
  ],
}

export const CtaBandBlock: Block = {
  slug: 'ctaBand',
  labels: { singular: 'Call-to-action band', plural: 'Call-to-action bands' },
  fields: [
    ...common('ink'),
    ...heading,
    linkGroup('primary', 'Primary button'),
    linkGroup('secondary', 'Secondary button'),
  ],
}

export const GalleryBlock: Block = {
  slug: 'gallery',
  labels: { singular: 'Gallery', plural: 'Galleries' },
  fields: [
    ...common('cream'),
    ...heading,
    { name: 'images', type: 'upload', relationTo: 'media', hasMany: true },
  ],
}

export const pageBlocks: Block[] = [
  HeroBlock,
  StatsBlock,
  FeaturedProjectsBlock,
  FeaturesBlock,
  LandownerBandBlock,
  StepsBlock,
  TestimonialsBlock,
  NrbBannerBlock,
  BlogLatestBlock,
  EnquiryFormBlock,
  RichTextBlock,
  ImageTextBlock,
  FaqBlock,
  CtaBandBlock,
  GalleryBlock,
]

export { linkFields }
