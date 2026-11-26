'use client'

import { useAllFormFields, useDocumentInfo } from '@payloadcms/ui'
import { useEffect, useState } from 'react'

type Counts = { leads: number; brochures: number; recent: number } | null

const val = (fields: Record<string, { value?: unknown }>, path: string) => fields[path]?.value

/** Sidebar on the project editor: live card preview, link to the page, and this project's lead counts. */
export function ProjectPreview() {
  const [fields] = useAllFormFields()
  const { id } = useDocumentInfo()
  const [counts, setCounts] = useState<Counts>(null)
  const [cover, setCover] = useState<string | null>(null)

  const name = (val(fields, 'name') as string) || 'Untitled project'
  const slug = val(fields, 'slug') as string | undefined
  const status = (val(fields, 'status') as string) || 'ongoing'
  const beds = val(fields, 'facts.bedrooms') as string | undefined
  const min = val(fields, 'facts.sizeMinSft') as number | undefined
  const max = val(fields, 'facts.sizeMaxSft') as number | undefined
  const price = val(fields, 'startingPrice') as number | undefined
  const showPrice = val(fields, 'showPrice') !== false
  const gallery = val(fields, 'gallery') as (number | { id: number })[] | undefined
  const firstId = Array.isArray(gallery) && gallery[0] ? (typeof gallery[0] === 'object' ? gallery[0].id : gallery[0]) : null

  useEffect(() => {
    if (!firstId) return setCover(null)
    fetch(`/api/media/${firstId}?depth=0`, { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((m: { sizes?: { thumb?: { url?: string } }; url?: string } | null) => setCover(m?.sizes?.thumb?.url || m?.url || null))
      .catch(() => setCover(null))
  }, [firstId])

  useEffect(() => {
    if (!id) return
    const q = (extra: string) =>
      fetch(`/api/leads?limit=0&depth=0&where[project][equals]=${id}${extra}`, { credentials: 'include' })
        .then((r) => (r.ok ? r.json() : { totalDocs: 0 }))
        .then((d: { totalDocs: number }) => d.totalDocs)
    const since = new Date(Date.now() - 30 * 86_400_000).toISOString()
    Promise.all([q(''), q('&where[type][equals]=brochure'), q(`&where[createdAt][greater_than]=${since}`)])
      .then(([leads, brochures, recent]) => setCounts({ leads, brochures, recent }))
      .catch(() => setCounts(null))
  }, [id])

  const size = min && max && min !== max ? `${min.toLocaleString('en-IN')}–${max.toLocaleString('en-IN')} sft` : min || max ? `${(min || max)!.toLocaleString('en-IN')} sft` : ''
  const priceText = !showPrice ? 'Price on request' : price ? (price >= 1e7 ? `৳ ${(price / 1e7).toFixed(2).replace(/\.?0+$/, '')} Cr` : `৳ ${Math.round(price / 1e5)} Lakh`) : 'Price on request'

  return (
    <div className="nr-admin nr-side">
      <div className="nr-side__card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {cover ? <img src={cover} alt="" /> : <div className="nr-side__ph">Add photos in “Media &amp; plans”</div>}
        <div className="nr-side__body">
          <span className="nr-label">Card preview · {status}</span>
          <strong className="nr-side__name">{name}</strong>
          <span className="nr-muted nr-small">{[beds && `${beds} Beds`, size].filter(Boolean).join(' · ') || 'Add bedrooms and sizes'}</span>
          <span className="nr-side__price">{priceText}</span>
        </div>
      </div>
      {slug ? (
        <a className="nr-btn" href={`/projects/${slug}`} target="_blank" rel="noopener">
          View on website ↗
        </a>
      ) : null}
      {id ? (
        <div className="nr-side__stats">
          <span className="nr-label">This project’s leads</span>
          <div>
            <span>Last 30 days</span>
            <strong>{counts?.recent ?? '…'}</strong>
          </div>
          <div>
            <span>All time</span>
            <strong>{counts?.leads ?? '…'}</strong>
          </div>
          <div>
            <span>Brochure requests</span>
            <strong>{counts?.brochures ?? '…'}</strong>
          </div>
          <a className="nr-link nr-small" href={`/admin/leads-inbox?project=${id}`}>
            Open in leads inbox →
          </a>
        </div>
      ) : null}
    </div>
  )
}
