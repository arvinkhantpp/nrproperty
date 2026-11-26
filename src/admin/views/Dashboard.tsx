import Link from 'next/link'
import type { AdminViewServerProps } from 'payload'

import { imageOf } from '@/lib/media'
import type { Project } from '@/payload-types'

import { SOURCE_COLOR, statusOf, timeAgo, TYPE_LABEL } from '../lib/labels'
import { getLeadStats } from '../lib/stats'

const RANGES = [7, 30, 90] as const

function greeting() {
  const h = Number(new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hour12: false, timeZone: 'Asia/Dhaka' }).format(new Date()))
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'
}

function Delta({ now, before }: { now: number; before: number }) {
  if (!before) return <span className="nr-kpi__delta">{now ? 'First leads in this period' : '–'}</span>
  // Percentages from tiny bases read as noise ("+1900%"), so show the raw count instead.
  if (before < 10) return <span className="nr-kpi__delta">{before} in the previous period</span>
  const pct = Math.round(((now - before) / before) * 100)
  const up = pct >= 0
  return (
    <span className={`nr-kpi__delta ${up ? 'is-up' : 'is-down'}`}>
      {up ? '↑' : '↓'} {Math.abs(pct)}% vs previous period
    </span>
  )
}

export async function Dashboard(props: AdminViewServerProps) {
  const { req } = props.initPageResult
  const { payload, user } = req
  const sp = (props.searchParams ?? {}) as Record<string, string | undefined>
  const days = RANGES.includes(Number(sp.range) as 30) ? Number(sp.range) : 30
  const stats = await getLeadStats(payload, req, days)

  const [recent, projectDocs] = await Promise.all([
    payload.find({ collection: 'leads', overrideAccess: false, user, req, depth: 1, limit: 6, sort: '-createdAt' }),
    stats.projects.length
      ? payload.find({
          collection: 'projects',
          depth: 1,
          limit: 6,
          where: { id: { in: stats.projects.slice(0, 6).map(([id]) => id) } },
          select: { name: true, status: true, area: true, gallery: true },
        })
      : Promise.resolve({ docs: [] as Project[] }),
  ])
  const projectById = new Map(projectDocs.docs.map((p) => [p.id, p as Project]))
  const max = Math.max(4, ...stats.byDay.map((d) => d.buyer + d.other))
  const maxSource = Math.max(1, ...stats.sources.map(([, n]) => n))
  const firstName = (user?.name as string | undefined)?.split(' ')[0] ?? ''
  const tick = (i: number) => new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' }).format(new Date(stats.byDay[i]!.date))
  const ticks = [0, Math.floor(days / 4), Math.floor(days / 2), Math.floor((3 * days) / 4), days - 1]

  const kpis = [
    { label: 'New leads', value: stats.total, extra: <Delta now={stats.total} before={stats.previousTotal} /> },
    { label: 'Leads today', value: stats.today, extra: <span className="nr-kpi__delta">{stats.newCount} waiting for a first call</span> },
    { label: 'Site visits', value: stats.visits, extra: <span className="nr-kpi__delta">Requested or booked</span> },
    { label: 'Landowner leads', value: stats.landowner, extra: <span className="nr-kpi__delta">+ {stats.nrb} NRB</span> },
  ]

  return (
    <div className="nr-admin nr-dash">
      <div className="nr-dash__head">
        <div>
          <h1 className="nr-h1">
            {greeting()}
            {firstName ? `, ${firstName}` : ''}
          </h1>
          <p className="nr-muted">
            {stats.newCount} lead{stats.newCount === 1 ? '' : 's'} waiting for a first call · last {days} days
          </p>
        </div>
        <div className="nr-dash__actions">
          <nav className="nr-seg" aria-label="Date range">
            {RANGES.map((r) => (
              <a key={r} href={`?range=${r}`} aria-current={r === days ? 'true' : undefined}>
                {r} days
              </a>
            ))}
          </nav>
          <Link className="nr-btn nr-btn--dark" href="/admin/leads-inbox">
            Open leads inbox
          </Link>
        </div>
      </div>

      <div className="nr-kpis">
        {kpis.map((k) => (
          <div key={k.label} className="nr-card nr-kpi">
            <span className="nr-kpi__label">{k.label}</span>
            <span className="nr-kpi__value">{k.value}</span>
            {k.extra}
          </div>
        ))}
      </div>

      <div className="nr-grid nr-grid--2-1">
        <section className="nr-card nr-pad">
          <div className="nr-card__head">
            <h2 className="nr-h2">Leads per day</h2>
            <div className="nr-legend">
              <span>
                <i style={{ background: '#1F3A32' }} />
                Buyer
              </span>
              <span>
                <i style={{ background: '#C9A46B' }} />
                Landowner &amp; NRB
              </span>
            </div>
          </div>
          <div className="nr-bars" role="img" aria-label={`Leads per day for the last ${days} days, ${stats.total} in total`}>
            {stats.byDay.map((d) => (
              <div key={d.date} className="nr-bars__col" title={`${d.date}: ${d.buyer} buyer, ${d.other} landowner/NRB`}>
                <div style={{ height: `${(d.other / max) * 100}%`, background: '#C9A46B' }} />
                <div style={{ height: `${(d.buyer / max) * 100}%`, background: '#1F3A32' }} />
              </div>
            ))}
          </div>
          <div className="nr-bars__axis">
            {ticks.map((i) => (
              <span key={i}>{tick(i)}</span>
            ))}
          </div>
        </section>

        <section className="nr-card nr-pad">
          <h2 className="nr-h2">Leads by source</h2>
          {stats.sources.length ? (
            <ul className="nr-sources">
              {stats.sources.map(([name, n]) => (
                <li key={name}>
                  <div className="nr-sources__row">
                    <span>{name}</span>
                    <strong>{n}</strong>
                  </div>
                  <div className="nr-meter">
                    <div style={{ width: `${(n / maxSource) * 100}%`, background: SOURCE_COLOR[name] }} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="nr-muted">No leads in this period yet.</p>
          )}
        </section>
      </div>

      <div className="nr-grid nr-grid--3-2">
        <section className="nr-card">
          <div className="nr-card__head nr-pad-x">
            <h2 className="nr-h2">Recent leads</h2>
            <Link className="nr-link" href="/admin/leads-inbox">
              View all →
            </Link>
          </div>
          <div className="nr-table-wrap">
            <table className="nr-table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Form</th>
                  <th scope="col">Project</th>
                  <th scope="col">Status</th>
                  <th scope="col" className="is-right">
                    When
                  </th>
                </tr>
              </thead>
              <tbody>
                {recent.docs.map((l) => {
                  const st = statusOf(l.status)
                  return (
                    <tr key={l.id}>
                      <td>
                        <Link href={`/admin/leads-inbox?lead=${l.id}`} className="nr-person">
                          <strong>{l.name}</strong>
                          <span>{l.phone}</span>
                        </Link>
                      </td>
                      <td>{TYPE_LABEL[l.type]}</td>
                      <td>
                        {typeof l.project === 'object' && l.project
                          ? l.project.name
                          : l.details?.area
                            ? `${l.details.landSizeKatha ?? '?'} katha · ${l.details.area}`
                            : '—'}
                      </td>
                      <td>
                        <span className="nr-pill" style={{ background: st.bg, color: st.fg }}>
                          {st.label}
                        </span>
                      </td>
                      <td className="is-right nr-muted">{timeAgo(l.createdAt)}</td>
                    </tr>
                  )
                })}
                {!recent.docs.length ? (
                  <tr>
                    <td colSpan={5} className="nr-muted">
                      No leads yet. They appear here as soon as someone sends a form.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>

        <section className="nr-card nr-pad">
          <h2 className="nr-h2">Projects by leads</h2>
          {stats.projects.length ? (
            <ul className="nr-projects">
              {stats.projects.slice(0, 6).map(([id, n]) => {
                const p = projectById.get(id)
                const cover = p ? imageOf(Array.isArray(p.gallery) ? (p.gallery[0] as never) : null, 'thumb') : null
                const area = p && typeof p.area === 'object' ? p.area?.name : ''
                return (
                  <li key={id}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {cover ? <img src={cover.src} alt="" /> : <span className="nr-projects__ph" />}
                    <Link href={`/admin/collections/projects/${id}`} className="nr-projects__name">
                      <strong>{p?.name ?? `Project ${id}`}</strong>
                      <span>{[p?.status, area].filter(Boolean).join(' · ')}</span>
                    </Link>
                    <span className="nr-projects__count">
                      <strong>{n}</strong>
                      <span>{stats.projectBrochures.get(id) ?? 0} brochures</span>
                    </span>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="nr-muted">Leads that name a project will be counted here.</p>
          )}
        </section>
      </div>
    </div>
  )
}
