import 'server-only'

/**
 * Verifies a Cloudflare Turnstile token. Without TURNSTILE_SECRET_KEY (development, or before
 * the client creates a Turnstile site) the check is skipped and the rate limit still applies.
 */
export async function verifyTurnstile(token: string | undefined, ip?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true
  if (!token) return false
  try {
    const body = new URLSearchParams({ secret, response: token })
    if (ip) body.set('remoteip', ip)
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(8000),
    })
    const data = (await res.json()) as { success?: boolean }
    return Boolean(data.success)
  } catch (err) {
    console.error('[turnstile]', err)
    // Fail open on a Cloudflare outage rather than losing real leads; the rate limit still applies.
    return true
  }
}
