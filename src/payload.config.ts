import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import type { CollectionConfig, GlobalConfig } from 'payload'

import { Amenities } from './collections/Amenities'
import { Areas } from './collections/Areas'
import { LeadFiles } from './collections/LeadFiles'
import { Leads } from './collections/Leads'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Projects } from './collections/Projects'
import { Team } from './collections/Team'
import { Testimonials } from './collections/Testimonials'
import { Users } from './collections/Users'
import { globals } from './globals'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// Cloudflare R2 (S3-compatible) in production; local disk when S3_BUCKET is not set.
const useS3 = Boolean(process.env.S3_BUCKET)

// Sales users only work with leads; hide everything else from their admin navigation.
type WithAdmin = { admin?: { hidden?: unknown } }
const hideFromSales = <T extends CollectionConfig | GlobalConfig>(c: T): T =>
  (c as WithAdmin).admin?.hidden !== undefined
    ? c
    : ({
        ...c,
        admin: {
          ...c.admin,
          hidden: ({ user }: { user?: { role?: string } | null }) => user?.role === 'sales',
        },
      } as T)

const collections = [Pages, Projects, Areas, Amenities, Testimonials, Posts, Team, Media].map(
  hideFromSales,
)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || '',
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' · NR Property Admin' },
    // Gravatar would call out to a third party and shows a broken image offline.
    avatar: 'default',
    importMap: { baseDir: path.resolve(dirname) },
    components: {
      graphics: {
        Logo: '/admin/components/Brand#Logo',
        Icon: '/admin/components/Brand#Icon',
      },
      beforeNavLinks: ['/admin/components/NavLinks#NavLinks'],
      views: {
        dashboard: { Component: '/admin/views/Dashboard#Dashboard' },
        leadsInbox: { Component: '/admin/views/LeadsInbox#LeadsInbox', path: '/leads-inbox' },
      },
    },
  },
  collections: [Leads, LeadFiles, ...collections, Users],
  globals: globals.map(hideFromSales),
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'বাংলা', code: 'bn' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    // Dev pushes schema automatically; production uses migrations (see README).
    push: process.env.NODE_ENV !== 'production',
  }),
  sharp,
  plugins: [
    s3Storage({
      enabled: useS3,
      // Landowner documents go under a private/ prefix and are only served through Payload's access control.
      collections: { media: true, 'lead-files': { prefix: 'private' } },
      bucket: process.env.S3_BUCKET || '',
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION || 'auto',
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
      },
    }),
  ],
})
