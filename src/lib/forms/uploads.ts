'use server'

import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto'

import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { headers } from 'next/headers'

import { payloadClient } from '@/lib/cms'
import { DOC_RULES, safeName, saveDocument } from '@/lib/leads/documents'
import { uploadLimited } from '@/lib/leads/guards'
import { bucket, getS3, INCOMING_PREFIX } from '@/lib/leads/s3'

type FileMeta = { name: string; type: string; size: number }

const sign = (id: number) => createHmac('sha256', process.env.PAYLOAD_SECRET || 'dev').update(`lead-file:${id}`).digest('base64url')

/** "<id>.<hmac>": proves the document was uploaded through this form, not picked by id. */
export async function verifyDocumentToken(token: string): Promise<number | null> {
  const [idPart, mac] = token.split('.')
  const id = Number(idPart)
  if (!Number.isInteger(id) || !mac) return null
  const expected = Buffer.from(sign(id))
  const given = Buffer.from(mac)
  return expected.length === given.length && timingSafeEqual(expected, given) ? id : null
}

function checkMeta(f: FileMeta): string | null {
  if (!DOC_RULES.types.includes(f.type)) return 'fileType'
  if (f.size > DOC_RULES.maxBytes || f.size <= 0) return 'fileSize'
  return null
}

async function clientIp() {
  const h = await headers()
  return (h.get('x-forwarded-for') ?? '').split(',')[0]?.trim() || h.get('x-real-ip') || undefined
}

/**
 * Step 1 of a document upload. With R2 configured the browser gets short-lived signed URLs and
 * uploads straight to the bucket (no server body-size limits, e.g. Vercel's 4.5 MB); otherwise
 * it posts each file to `uploadDocument`.
 */
export async function prepareDocumentUploads(files: FileMeta[]) {
  if (files.length > DOC_RULES.maxFiles) return { ok: false as const, error: 'fileCount' }
  for (const f of files) {
    const err = checkMeta(f)
    if (err) return { ok: false as const, error: err }
  }
  if (uploadLimited(await clientIp())) return { ok: false as const, error: 'rateLimited' }
  const s3 = getS3()
  if (!s3) return { ok: true as const, mode: 'server' as const }
  const uploads = await Promise.all(
    files.map(async (f) => {
      const key = `${INCOMING_PREFIX}${randomUUID()}-${encodeURIComponent(safeName(f.name))}`
      const url = await getSignedUrl(
        s3,
        new PutObjectCommand({ Bucket: bucket(), Key: key, ContentType: f.type, ContentLength: f.size }),
        { expiresIn: 600 },
      )
      return { key, url }
    }),
  )
  return { ok: true as const, mode: 'direct' as const, uploads }
}

/** Server-mode upload of one document (local disk, or self-hosted Docker). */
export async function uploadDocument(fd: FormData) {
  const file = fd.get('file')
  if (!(file instanceof File)) return { ok: false as const, error: 'generic' }
  const err = checkMeta({ name: file.name, type: file.type, size: file.size })
  if (err) return { ok: false as const, error: err }
  if (uploadLimited(await clientIp())) return { ok: false as const, error: 'rateLimited' }
  try {
    const payload = await payloadClient()
    const id = await saveDocument(payload, Buffer.from(await file.arrayBuffer()), file.name, file.type)
    return { ok: true as const, token: `${id}.${sign(id)}` }
  } catch (e) {
    console.error('[uploadDocument]', e)
    return { ok: false as const, error: 'generic' }
  }
}
