import 'server-only'

type Mail = { to: string[]; subject: string; html: string; text: string; replyTo?: string }

/** Sends through Resend (HTTP API) or SMTP, chosen by EMAIL_PROVIDER. Returns false when not configured. */
export async function sendMail(mail: Mail): Promise<boolean> {
  if (!mail.to.length) return false
  const from = process.env.EMAIL_FROM || 'NR Property <onboarding@resend.dev>'
  const provider = process.env.EMAIL_PROVIDER || (process.env.RESEND_API_KEY ? 'resend' : 'smtp')

  if (provider === 'resend') {
    const key = process.env.RESEND_API_KEY
    if (!key) return false
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: mail.to, subject: mail.subject, html: mail.html, text: mail.text, reply_to: mail.replyTo }),
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 300)}`)
    return true
  }

  if (!process.env.SMTP_HOST) return false
  const nodemailer = await import('nodemailer')
  const port = Number(process.env.SMTP_PORT || 587)
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
  })
  await transport.sendMail({ from, to: mail.to, subject: mail.subject, html: mail.html, text: mail.text, replyTo: mail.replyTo })
  return true
}
