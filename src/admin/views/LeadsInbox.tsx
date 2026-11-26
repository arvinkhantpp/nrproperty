import { DefaultTemplate } from '@payloadcms/next/templates'
import { redirect } from 'next/navigation'
import type { AdminViewServerProps, Where } from 'payload'

import type { Lead } from '@/payload-types'

import { parseLeadFilters } from '../lib/leadFilters'
import { sourceOf, statusOf, STATUS, timeAgo, TYPE_LABEL } from '../lib/labels'
import { LeadDrawer, type DrawerLead } from './LeadDrawer'

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'buyer', label: 'Buyer' },
  { id: 'landowner', label: 'Landowner' },
  { id: 'nrb', label: 'NRB' },
] as const
const PER_PAGE = 30

function projectLabel(l: Lead) {
  if (typeof l.project === 'object' && l.project) return l.project.name ?? '—'
  if (l.details?.area) return `${l.details.landSizeKatha ?? '?'} katha · ${l.details.area}`
  if (l.details?.country) return l.details.country
  return '—'
}

function toDrawer(l: Lead): DrawerLead {
  const d = l.details ?? {}
  const t = l.tracking ?? {}
  const fields: [string, unknown][] = [
    ['Project', typeof l.project === 'object' ? l.project?.name : null],
    ['Email', l.email],
    ['Bedrooms', d.bedrooms],
    ['Visit date', d.visitDate ? new Date(d.visitDate).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }) : null],
    ['Time slot', d.timeSlot],
    ['Area', d.area],
    ['Plot address', d.plotAddress],
    ['Land size', d.landSizeKatha ? `${d.landSizeKatha} katha` : null],
    ['Front road', d.frontRoadFt ? `${d.frontRoadFt} ft` : null],
    ['Ownership', d.ownership],
    ['Country', d.country],
    ['WhatsApp', d.whatsapp],
    ['Budget', d.budgetRange],
    ['Best time', d.bestTimeToCall],
    ['Subject', d.subject],
    ['Message', l.message],
  ]
  return {
    id: l.id,
    name: l.name,
    phone: l.phone,
    form: TYPE_LABEL[l.type] ?? l.type,
    when: timeAgo(l.createdAt),
    created: new Date(l.createdAt).toLocaleString('en-GB', { timeZone: 'Asia/Dhaka', dateStyle: 'medium', timeStyle: 'short' }),
    status: l.status ?? 'new',
    assignee: typeof l.assignedTo === 'object' && l.assignedTo ? l.assignedTo.name : null,
    duplicateOf: typeof l.duplicateOf === 'object' ? (l.duplicateOf?.id ?? null) : (l.duplicateOf ?? null),
    fields: fields.filter(([, v]) => v !== null && v !== undefined && v !== '').map(([k, v]) => ({ k, v: String(v) })),
    documents: (d.documents ?? [])
      .filter((x) => typeof x === 'object')
      .map((x) => ({ id: (x as { id: number }).id, name: (x as { originalName?: string | null; filename?: string | null }).originalName ?? (x as { filename?: string | null }).filename ?? 'document', url: (x as { url?: string | null }).url ?? '' })),
    tracking: {
      page: t.pageUrl ? t.pageUrl.replace(/^https?:\/\/[^/]+/, '') || '/' : '—',
      utm: [t.utmSource, t.utmCampaign].filter(Boolean).join(' / ') || '—',
      source: sourceOf(t),
      clickId: t.fbclid ? 'fbclid' : t.gclid ? 'gclid' : '—',
      language: t.language ?? '—',
    },
    pipeline: { email: Boolean(l.pipeline?.emailSent), sheet: Boolean(l.pipeline?.sheetAppended), capi: Boolean(l.pipeline?.capiSent), errors: l.pipeline?.errors ?? '' },
    notes: (l.notes ?? []).map((n) => ({
      text: n.text,
      author: typeof n.author === 'object' && n.author ? n.author.name : '',
      date: n.date ? timeAgo(n.date) : '',
    })),
    rawNotes: (l.notes ?? []).map((n) => ({ text: n.text, author: typeof n.author === 'object' ? (n.author?.id ?? null) : (n.author ?? null), date: n.date ?? null })),
  }
}

export async function LeadsInbox(props: AdminViewServerProps) {
  const { initPageResult } = props
  const { req, permissions, visibleEntities, locale } = initPageResult
  if (!req.user) redirect('/admin/login?redirect=%2Fadmin%2Fleads-inbox')
  const { payload } = req
  const sp = (props.searchParams ?? {}) as Record<string, string | undefined>
  const tab = TABS.some((t) => t.id === sp.tab) ? sp.tab! : 'all'
  const { q, status, project, from, to, where: base } = parseLeadFilters(sp)
  const page = Math.max(1, Number(sp.page) || 1)
  const access = { overrideAccess: false, user: req.user, req } as const

  const where: Where = { and: [...base, ...(tab !== 'all' ? [{ segment: { equals: tab } }] : [])] }

  const [res, counts, projects, selected] = await Promise.all([
    payload.find({ collection: 'leads', ...access, where, depth: 1, limit: PER_PAGE, page, sort: '-createdAt' }),
    Promise.all(
      TABS.map((t) =>
        payload.count({ collection: 'leads', ...access, where: { and: [...base, ...(t.id !== 'all' ? [{ segment: { equals: t.id } }] : [])] } }),
      ),
    ),
    payload.find({ collection: 'projects', depth: 0, limit: 100, sort: 'order', select: { name: true } }),
    sp.lead
      ? payload.findByID({ collection: 'leads', id: Number(sp.lead), ...access, depth: 1 }).catch(() => null)
      : Promise.resolve(null),
  ])
  const current = selected ?? res.docs[0] ?? null

  const qs = (over: Record<string, string | number | undefined>) => {
    const p = new URLSearchParams()
    const merged = { tab, q, status, project, from, to, page: undefined, ...over } as Record<string, unknown>
    for (const [k, v] of Object.entries(merged)) if (v !== undefined && v !== '' && !(k === 'tab' && v === 'all')) p.set(k, String(v))
    const s = p.toString()
    return s ? `?${s}` : '?'
  }
  const exportQs = new URLSearchParams(
    Object.entries({ segment: tab === 'all' ? '' : tab, q, status: status ?? '', project: project ? String(project) : '', from: from ?? '', to: to ?? '' }).filter(([, v]) => v),
  ).toString()

  return (
    <DefaultTemplate
      i18n={req.i18n}
      locale={locale}
      params={props.params}
      payload={payload}
      permissions={permissions}
      searchParams={props.searchParams}
      user={req.user}
      visibleEntities={visibleEntities}
      req={req}
    >
      <div className="nr-admin nr-inbox">
        <header className="nr-inbox__head">
          <div>
            <h1 className="nr-h1">Leads inbox</h1>
            <p className="nr-muted">Every website form lands here. Click a lead to call, WhatsApp, update its status or add a note.</p>
          </div>
          <form className="nr-inbox__filters" method="get" role="search">
            {tab !== 'all' ? <input type="hidden" name="tab" value={tab} /> : null}
            <label className="nr-search">
              <span className="nr-sr">Search</span>
              <input type="search" name="q" defaultValue={q} placeholder="Name, phone or email" />
            </label>
            <label>
              <span className="nr-sr">Project</span>
              <select name="project" defaultValue={project ? String(project) : ''} className="nr-select">
                <option value="">All projects</option>
                {projects.docs.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="nr-sr">Status</span>
              <select name="status" defaultValue={status ?? ''} className="nr-select">
                <option value="">Any status</option>
                {STATUS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="nr-date">
              <span>From</span>
              <input type="date" name="from" defaultValue={from} className="nr-select" />
            </label>
            <label className="nr-date">
              <span>To</span>
              <input type="date" name="to" defaultValue={to} className="nr-select" />
            </label>
            <button type="submit" className="nr-btn">
              Filter
            </button>
            <a className="nr-btn" href={`/api/leads/export${exportQs ? `?${exportQs}` : ''}`}>
              Export CSV
            </a>
          </form>
        </header>

        <div className={sp.lead ? "nr-inbox__body has-lead" : "nr-inbox__body"}>
          <div className="nr-inbox__list">
            <nav className="nr-tabs" aria-label="Lead type">
              {TABS.map((t, i) => (
                <a key={t.id} href={qs({ tab: t.id })} aria-current={t.id === tab ? 'page' : undefined}>
                  {t.label} · {counts[i]?.totalDocs ?? 0}
                </a>
              ))}
            </nav>
            <div className="nr-card nr-table-wrap">
              <table className="nr-table nr-table--leads">
                <thead>
                  <tr>
                    <th scope="col">Lead</th>
                    <th scope="col">Form</th>
                    <th scope="col">Project / land</th>
                    <th scope="col">Source</th>
                    <th scope="col">Status</th>
                    <th scope="col">Received</th>
                  </tr>
                </thead>
                <tbody>
                  {res.docs.map((l) => {
                    const st = statusOf(l.status)
                    return (
                      <tr key={l.id} aria-selected={current?.id === l.id} className={current?.id === l.id ? 'is-selected' : undefined}>
                        <td>
                          <a href={qs({ lead: l.id, page: page > 1 ? page : undefined })} className="nr-person">
                            <strong>
                              {l.name}
                              {l.duplicateOf ? <em className="nr-dup">duplicate</em> : null}
                            </strong>
                            <span>{l.phone}</span>
                          </a>
                        </td>
                        <td>{TYPE_LABEL[l.type]}</td>
                        <td>{projectLabel(l)}</td>
                        <td>
                          <span className="nr-chip">{sourceOf(l.tracking)}</span>
                        </td>
                        <td>
                          <span className="nr-pill" style={{ background: st.bg, color: st.fg }}>
                            {st.label}
                          </span>
                        </td>
                        <td className="nr-muted nr-nowrap">{timeAgo(l.createdAt)}</td>
                      </tr>
                    )
                  })}
                  {!res.docs.length ? (
                    <tr>
                      <td colSpan={6} className="nr-empty">
                        No leads match. {q || status || project || from || to ? <a href="?">Clear filters</a> : 'New leads appear here as soon as a form is sent.'}
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
            <div className="nr-pager">
              <span className="nr-muted">
                {res.totalDocs} lead{res.totalDocs === 1 ? '' : 's'} · page {res.page} of {Math.max(1, res.totalPages)}
              </span>
              <span>
                {res.hasPrevPage ? <a className="nr-btn" href={qs({ page: page - 1 })}>← Newer</a> : null}
                {res.hasNextPage ? <a className="nr-btn" href={qs({ page: page + 1 })}>Older →</a> : null}
              </span>
            </div>
          </div>
          {current ? <LeadDrawer key={current.id} lead={toDrawer(current)} userId={req.user.id} /> : null}
        </div>
      </div>
    </DefaultTemplate>
  )
}
