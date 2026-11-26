import Link from 'next/link'
import type { ServerProps } from 'payload'

/** "Dashboard" and "Leads inbox" at the top of the admin sidebar, with a count of new leads. */
export async function NavLinks({ payload, user }: ServerProps) {
  let fresh = 0
  if (user) {
    try {
      const res = await payload.count({
        collection: 'leads',
        overrideAccess: false,
        user,
        where: { and: [{ status: { equals: 'new' } }, { duplicateOf: { exists: false } }] },
      })
      fresh = res.totalDocs
    } catch {
      fresh = 0
    }
  }
  return (
    <div className="nr-nav">
      <Link href="/admin" className="nr-nav__link">
        Dashboard
      </Link>
      <Link href="/admin/leads-inbox" className="nr-nav__link">
        Leads inbox
        {fresh ? (
          <span className="nr-nav__badge" aria-label={`${fresh} new`}>
            {fresh > 99 ? '99+' : fresh}
          </span>
        ) : null}
      </Link>
    </div>
  )
}
