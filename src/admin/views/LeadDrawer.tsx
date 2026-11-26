'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import { STATUS } from '../lib/labels'

export type DrawerLead = {
  id: number
  name: string
  phone: string
  form: string
  when: string
  created: string
  status: string
  assignee: string | null
  duplicateOf: number | null
  fields: { k: string; v: string }[]
  documents: { id: number; name: string; url: string }[]
  tracking: { page: string; utm: string; source: string; clickId: string; language: string }
  pipeline: { email: boolean; sheet: boolean; capi: boolean; errors: string }
  notes: { text: string; author: string; date: string }[]
  rawNotes: { text: string; author: number | null; date: string | null }[]
}

const digits = (p: string) => p.replace(/\D/g, '')
const waNumber = (p: string) => {
  const d = digits(p)
  return /^01\d{9}$/.test(d) ? `88${d}` : d
}

async function patchLead(id: number, data: Record<string, unknown>) {
  const res = await fetch(`/api/leads/${id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(String(res.status))
}

export function LeadDrawer({ lead, userId }: { lead: DrawerLead; userId: number }) {
  const router = useRouter()
  const [status, setStatus] = useState(lead.status)
  const [note, setNote] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, start] = useTransition()
  const initials = lead.name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const save = (data: Record<string, unknown>, after?: () => void) =>
    start(async () => {
      setError(null)
      try {
        await patchLead(lead.id, data)
        after?.()
        router.refresh()
      } catch {
        setError('Could not save. Check your connection and try again.')
      }
    })

  return (
    <aside className="nr-card nr-drawer" aria-label={`Lead details: ${lead.name}`}>
      <div className="nr-drawer__who">
        <span className="nr-avatar" aria-hidden="true">
          {initials}
        </span>
        <div>
          <h2 className="nr-drawer__name">{lead.name}</h2>
          <p className="nr-muted">
            {lead.form} · <span title={lead.created}>{lead.when}</span>
          </p>
        </div>
      </div>

      {lead.duplicateOf ? (
        <p className="nr-note">
          Same phone and form as <a href={`?lead=${lead.duplicateOf}`}>lead #{lead.duplicateOf}</a> within 10 minutes, so no
          second email was sent.
        </p>
      ) : null}

      <div className="nr-drawer__actions">
        <a className="nr-btn nr-btn--dark" href={`tel:+${waNumber(lead.phone)}`}>
          Call {lead.phone}
        </a>
        <a className="nr-btn nr-btn--wa" href={`https://wa.me/${waNumber(lead.phone)}`} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
      </div>

      <section>
        <h3 className="nr-label">Status</h3>
        <div className="nr-status" role="group" aria-label="Lead status">
          {STATUS.map((s) => (
            <button
              key={s.value}
              type="button"
              aria-pressed={status === s.value}
              disabled={pending}
              onClick={() => {
                setStatus(s.value)
                save({ status: s.value })
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
        <p className="nr-muted nr-small">Assigned to {lead.assignee ?? 'nobody yet'}</p>
      </section>

      <section>
        <h3 className="nr-label">Form answers</h3>
        <dl className="nr-kv">
          <div>
            <dt>Phone</dt>
            <dd>{lead.phone}</dd>
          </div>
          {lead.fields.map((f) => (
            <div key={f.k}>
              <dt>{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>
        {lead.documents.length ? (
          <ul className="nr-docs">
            {lead.documents.map((d) => (
              <li key={d.id}>
                <a href={d.url} target="_blank" rel="noopener">
                  📎 {d.name}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      <section className="nr-tracking">
        <h3 className="nr-label">Tracking</h3>
        <dl className="nr-kv nr-kv--small">
          <div>
            <dt>Source</dt>
            <dd>{lead.tracking.source}</dd>
          </div>
          <div>
            <dt>Landing page</dt>
            <dd>{lead.tracking.page}</dd>
          </div>
          <div>
            <dt>utm_source / campaign</dt>
            <dd>{lead.tracking.utm}</dd>
          </div>
          <div>
            <dt>Ad click id</dt>
            <dd>{lead.tracking.clickId}</dd>
          </div>
          <div>
            <dt>Sent to</dt>
            <dd>
              {[lead.pipeline.email && 'Email', lead.pipeline.sheet && 'Sheet', lead.pipeline.capi && 'Meta CAPI'].filter(Boolean).join(' · ') || '—'}
            </dd>
          </div>
        </dl>
        {lead.pipeline.errors ? <p className="nr-error nr-small">{lead.pipeline.errors}</p> : null}
      </section>

      <section>
        <h3 className="nr-label">Notes</h3>
        {lead.notes.length ? (
          <ul className="nr-notes">
            {lead.notes.map((n, i) => (
              <li key={i}>
                <p>{n.text}</p>
                <span className="nr-muted nr-small">{[n.author, n.date].filter(Boolean).join(' · ')}</span>
              </li>
            ))}
          </ul>
        ) : null}
        <form
          className="nr-notes__form"
          onSubmit={(e) => {
            e.preventDefault()
            const text = note.trim()
            if (!text) return
            save({ notes: [...lead.rawNotes, { text, author: userId, date: new Date().toISOString() }] }, () => setNote(''))
          }}
        >
          <label>
            <span className="nr-sr">Add a note</span>
            <textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Called, wants a Friday site visit" />
          </label>
          <button type="submit" className="nr-btn" disabled={pending || !note.trim()}>
            {pending ? 'Saving…' : 'Save note'}
          </button>
        </form>
      </section>

      {error ? (
        <p role="alert" className="nr-error">
          {error}
        </p>
      ) : null}
      <a className="nr-link nr-small" href={`/admin/collections/leads/${lead.id}`}>
        Open full record →
      </a>
    </aside>
  )
}
