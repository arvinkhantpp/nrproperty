import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Media } from './collections/Media'
import { Users } from './collections/Users'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// Cloudflare R2 (S3-compatible) in production; local disk when S3_BUCKET is not set.
const useS3 = Boolean(process.env.S3_BUCKET)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || '',
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' · NR Property Admin' },
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [Users, Media],
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
      collections: { media: true },
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
