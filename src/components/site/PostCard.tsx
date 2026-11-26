import Image from 'next/image'

import { Link } from '@/i18n/navigation'
import { formatDate } from '@/lib/format'
import { imageOf } from '@/lib/media'
import type { Post } from '@/payload-types'

export function PostCard({ post, locale, categoryLabel, headingLevel = 3, priority }: { post: Post; locale: string; categoryLabel?: string; headingLevel?: 2 | 3; priority?: boolean }) {
  const H = headingLevel === 2 ? 'h2' : 'h3'
  const img = imageOf(post.cover, 'card')
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg bg-white transition-shadow duration-300 hover:shadow-card">
      <div className="relative aspect-[16/10] overflow-hidden bg-sand">
        {img ? (
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-[900ms] ease-out-soft group-hover:scale-[1.04]"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="text-eyebrow text-[0.6875rem] text-gold-text">
          {[categoryLabel, formatDate(post.publishedAt, locale)].filter(Boolean).join(' · ')}
        </p>
        <H className="font-display text-[1.5rem] leading-snug text-ink">
          <Link
            href={`/blog/${post.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-lg focus-visible:after:outline-2 focus-visible:after:outline-gold"
          >
            {post.title}
          </Link>
        </H>
        {post.excerpt ? <p className="line-clamp-3 text-body text-muted">{post.excerpt}</p> : null}
      </div>
    </article>
  )
}
