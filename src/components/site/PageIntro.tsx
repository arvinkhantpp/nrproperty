import type { ReactNode } from 'react'

import { Breadcrumbs, Eyebrow, type Crumb } from '@/components/ui'
import { withAccent } from '@/lib/text'

/** The ink header used on listing pages (projects, blog, construction status, areas). */
export function PageIntro({
  crumbs,
  eyebrow,
  title,
  description,
  children,
}: {
  crumbs: Crumb[]
  eyebrow?: string | null
  title: string
  description?: string | null
  children?: ReactNode
}) {
  return (
    <section className="bg-ink text-cream">
      <div className="container-site flex flex-col gap-5 pt-10 pb-12 lg:pt-14 lg:pb-16">
        <Breadcrumbs items={crumbs} tone="dark" />
        {eyebrow ? <Eyebrow tone="dark">{eyebrow}</Eyebrow> : null}
        <h1 className="max-w-[44rem] text-display-l text-balance">{withAccent(title, 'dark')}</h1>
        {description ? <p className="max-w-[36rem] text-body-l text-cream/75">{description}</p> : null}
        {children}
      </div>
    </section>
  )
}
