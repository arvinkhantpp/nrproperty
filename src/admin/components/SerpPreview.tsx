'use client'

import { useAllFormFields } from '@payloadcms/ui'

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://nrproperty.com').replace(/\/$/, '')

function Counter({ n, max }: { n: number; max: number }) {
  return <span className={n > max ? 'nr-count is-over' : 'nr-count'}>{n} / {max}</span>
}

/**
 * Google result preview under the SEO fields. Reads the live form values; `basePath` is the URL
 * prefix for this collection (e.g. /projects) and `titleField` the fallback when no meta title is set.
 */
export function SerpPreview({ basePath = '', titleField = 'title', descriptionField }: { basePath?: string; titleField?: string; descriptionField?: string }) {
  const [fields] = useAllFormFields()
  const get = (p: string) => (fields[p]?.value as string | undefined) ?? ''
  const title = get('seo.metaTitle') || get(titleField)
  const description = get('seo.metaDescription') || (descriptionField ? get(descriptionField) : '')
  const slug = get('slug')
  const url = `${SITE}${basePath}${slug && slug !== 'home' ? `/${slug}` : ''}`
  const crumbs = url.replace(/^https?:\/\//, '').split('/').filter(Boolean).join(' › ')
  return (
    <div className="nr-admin nr-serp-wrap">
      <div className="nr-serp__meta">
        <span className="nr-label">Google preview</span>
        <span>
          Title <Counter n={title.length} max={60} /> · Description <Counter n={description.length} max={160} />
        </span>
      </div>
      <div className="nr-serp">
        <span className="nr-serp__url">{crumbs}</span>
        <span className="nr-serp__title">{(title || 'Add a meta title').slice(0, 70)}{title.length > 70 ? '…' : ''}</span>
        <span className="nr-serp__desc">{(description || 'Add a meta description: one or two sentences that make someone click.').slice(0, 165)}{description.length > 165 ? '…' : ''}</span>
      </div>
    </div>
  )
}
