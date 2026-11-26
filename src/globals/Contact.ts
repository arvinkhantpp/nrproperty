import type { GlobalConfig } from 'payload'

import { anyone, isAdmin } from '@/access/roles'
import { revalidateGlobal } from '@/hooks/revalidate'

/** The one place phone numbers, email and address live. Every button and link on the site reads from here. */
export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Contact details',
  admin: { group: 'Settings' },
  access: { read: anyone, update: isAdmin },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'hotline',
          type: 'text',
          required: true,
          admin: { description: 'e.g. 01816-917164' },
        },
        { name: 'whatsapp', type: 'text', required: true },
      ],
    },
    {
      name: 'whatsappMessage',
      label: 'Default WhatsApp message',
      type: 'text',
      localized: true,
    },
    {
      name: 'showWhatsappButton',
      label: 'Floating WhatsApp button',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'emails',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', localized: true },
            { name: 'email', type: 'email', required: true },
          ],
        },
      ],
    },
    { name: 'address', label: 'Office address', type: 'textarea', localized: true },
    { name: 'mapEmbedUrl', label: 'Google Maps embed URL', type: 'text' },
    { name: 'officeHours', type: 'text', localized: true },
    {
      name: 'socials',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'facebook', type: 'text' },
            { name: 'instagram', type: 'text' },
            { name: 'youtube', type: 'text' },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'linkedin', type: 'text' },
            { name: 'tiktok', type: 'text' },
          ],
        },
      ],
    },
  ],
}
