import 'server-only'

import { S3Client } from '@aws-sdk/client-s3'

let client: S3Client | null | undefined

/** The R2 / S3 client, or null when uploads are stored on local disk. */
export function getS3() {
  if (client !== undefined) return client
  client = process.env.S3_BUCKET
    ? new S3Client({
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION || 'auto',
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
      })
    : null
  return client
}

export const bucket = () => process.env.S3_BUCKET || ''
/** Temporary prefix for documents uploaded straight from the browser before the form is sent. */
export const INCOMING_PREFIX = 'private/incoming/'
