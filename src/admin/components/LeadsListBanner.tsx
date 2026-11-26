import Link from 'next/link'
/** Shown above the classic Leads table, pointing to the inbox. */
export function LeadsListBanner() {
  return (
    <div className="nr-admin nr-banner">
      <span>Working through new leads? The inbox shows answers, tracking and notes side by side.</span>
      <Link className="nr-btn nr-btn--dark" href="/admin/leads-inbox">
        Open leads inbox
      </Link>
    </div>
  )
}
