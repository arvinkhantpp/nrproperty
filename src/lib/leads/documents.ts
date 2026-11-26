import 'server-only'

import { DeleteObjectCommand, GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'
import type { Payload } from 'payload'

import { bucket, getS3, INCOMING_PREFIX } from './s3'

export const DOC_RULES = {
  types: ['image/jpeg', 'image/png', 'application/pdf'],
  maxBytes: 10 * 1024 * 1024,
  maxFiles: 5,
}

export const safeName = (name: string) =>
  name.normalize('NFKD').replace(/[^\w.-]+/g, '-').replace(/-+/g, '-').slice(-80) || 'document'

/** Saves one file into the private Lead documents collection and returns its id. */
export async function saveDocument(payload: Payload, data: Buffer, name: string, mimetype: string) {
  const doc = await payload.create({
    collection: 'lead-files',
    overrideAccess: true,
    data: { originalName: name },
    file: { data, mimetype, name: `${Date.now()}-${safeName(name)}`, size: data.length },
  })
  return doc.id
}

/**
 * Turns files the browser uploaded straight to R2 (under private/incoming/) into Lead documents,
 * then removes the temporary objects. Anything that isn't a valid, recent upload is ignored.
 */
export async function adoptIncoming(payload: Payload, keys: string[]) {
  const s3 = getS3()
  if (!s3) return []
  const ids: number[] = []
  for (const key of keys.slice(0, DOC_RULES.maxFiles)) {
    if (!key.startsWith(INCOMING_PREFIX) || key.includes('..')) continue
    try {
      const head = await s3.send(new HeadObjectCommand({ Bucket: bucket(), Key: key }))
      const type = head.ContentType ?? ''
      if (!DOC_RULES.types.includes(type) || (head.ContentLength ?? 0) > DOC_RULES.maxBytes) continue
      const obj = await s3.send(new GetObjectCommand({ Bucket: bucket(), Key: key }))
      const bytes = Buffer.from(await obj.Body!.transformToByteArray())
      const original = decodeURIComponent(key.split('/').pop() ?? 'document').replace(/^[\w-]{36}-/, '')
      ids.push(await saveDocument(payload, bytes, original, type))
      await s3.send(new DeleteObjectCommand({ Bucket: bucket(), Key: key }))
    } catch (err) {
      console.error('[documents] could not adopt', key, err)
    }
  }
  return ids
}
