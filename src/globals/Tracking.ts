import type { GlobalConfig } from 'payload'

import { anyone, isAdmin } from '@/access/roles'
import { revalidateGlobal } from '@/hooks/revalidate'

export const Tracking: GlobalConfig = {
  slug: 'tracking',
  admin: { group: 'Settings', description: 'Paste IDs here; no code changes needed.' },
  access: { read: anyone, update: isAdmin },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'gtmId',
          label: 'Google Tag Manager ID',
          type: 'text',
          admin: { placeholder: 'GTM-XXXXXXX' },
        },
        {
          name: 'ga4Id',
          label: 'GA4 Measurement ID',
          type: 'text',
          admin: { placeholder: 'G-XXXXXXXXXX' },
        },
        { name: 'clarityId', label: 'Microsoft Clarity ID', type: 'text' },
      ],
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'pixelId', label: 'Meta Pixel ID', type: 'text' },
            {
              name: 'testEventCode',
              type: 'text',
              admin: { description: 'From Events Manager → Test events. Remove after testing.' },
            },
          ],
        },
        {
          name: 'capiToken',
          label: 'Conversions API access token',
          type: 'text',
          access: { read: ({ req }) => req.user?.role === 'admin' },
          admin: {
            description: 'Or set META_CAPI_ACCESS_TOKEN on the server, which wins if both are set.',
          },
        },
      ],
    },
    {
      name: 'googleAds',
      type: 'group',
      fields: [
        { name: 'conversionId', type: 'text', admin: { placeholder: 'AW-XXXXXXXXX' } },
        {
          name: 'labels',
          type: 'group',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'lead', type: 'text' },
                { name: 'schedule', type: 'text' },
                { name: 'landowner', type: 'text' },
                { name: 'contact', type: 'text' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'consentRequired',
      label: 'Show cookie consent banner',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
