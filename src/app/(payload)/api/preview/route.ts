import config from '@payload-config'
import { draftMode, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

/** Opens a draft on the website. Only signed-in admin users can turn draft mode on. */
export async function GET(request: Request) {
  const url = new URL(request.url)
  const path = url.searchParams.get('path') ?? '/'
  // Only same-site paths: no protocol-relative or absolute URLs.
  if (!path.startsWith('/') || path.startsWith('//')) return new Response('Bad path', { status: 400 })

  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })
  if (!user) return new Response('Sign in to the admin first.', { status: 401 })

  ;(await draftMode()).enable()
  redirect(path)
}
