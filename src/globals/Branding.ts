import type { GlobalConfig } from 'payload'

import { anyone, isAdmin } from '@/access/roles'
import { requiredInEnglish } from '@/fields'
import { revalidateGlobal } from '@/hooks/revalidate'

/** Default token values; the "Reset" action in the admin restores these. Keep in sync with globals.css. */
export const DEFAULT_COLORS = {
  ink: '#0E1B17',
  forest: '#1F3A32',
  forest2: '#2C4A40',
  gold: '#B08D57',
  goldText: '#7F6034',
  goldSoft: '#E9DCC5',
  goldLight: '#D9BC8A',
  cream: '#F6F2EA',
  sand: '#EDE6DA',
  text: '#16211D',
  muted: '#5A6762',
  line: '#DDD5C7',
} as const

export const COLOR_VARS: Record<keyof typeof DEFAULT_COLORS, string> = {
  ink: '--nr-ink',
  forest: '--nr-forest',
  forest2: '--nr-forest-2',
  gold: '--nr-gold',
  goldText: '--nr-gold-text',
  goldSoft: '--nr-gold-soft',
  goldLight: '--nr-gold-light',
  cream: '--nr-cream',
  sand: '--nr-sand',
  text: '--nr-text',
  muted: '--nr-muted',
  line: '--nr-line',
}

const HEX = /^#[0-9a-fA-F]{6}$/

export const Branding: GlobalConfig = {
  slug: 'branding',
  admin: { group: 'Settings' },
  access: { read: anyone, update: isAdmin },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Logo & name',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'companyName', type: 'text', localized: true, validate: requiredInEnglish },
                { name: 'tagline', type: 'text', localized: true },
              ],
            },
            {
              name: 'logoSubline',
              type: 'text',
              localized: true,
              admin: {
                description: 'Small line under the placeholder wordmark (e.g. DEVELOPMENTS LTD.).',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'logoLight',
                  label: 'Logo for dark backgrounds',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { description: 'Leave empty to use the NR placeholder wordmark.' },
                },
                {
                  name: 'logoDark',
                  label: 'Logo for light backgrounds',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'favicon',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { description: 'Square PNG, 512×512.' },
                },
                {
                  name: 'ogImage',
                  label: 'Default share image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { description: '1200×630.' },
                },
              ],
            },
          ],
        },
        {
          label: 'Colours',
          description:
            'Pick a colour or paste a hex code. Empty a field to go back to the default.',
          fields: [
            {
              name: 'colors',
              type: 'group',
              fields: (Object.keys(DEFAULT_COLORS) as (keyof typeof DEFAULT_COLORS)[]).map(
                (key) => ({
                  name: key,
                  type: 'text' as const,
                  admin: {
                    placeholder: DEFAULT_COLORS[key],
                    description: `Default ${DEFAULT_COLORS[key]}`,
                    components: { Field: '/admin/fields/ColorField#ColorField' },
                  },
                  validate: (v: unknown) =>
                    !v || (typeof v === 'string' && HEX.test(v)) || 'Use a hex colour like #B08D57',
                }),
              ),
            },
          ],
        },
      ],
    },
  ],
}
