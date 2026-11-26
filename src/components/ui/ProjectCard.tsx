import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'

import { Icon } from './Icon'
import { StatusBadge, type ProjectStatus } from './StatusBadge'

export type ProjectCardProps = {
  href: string
  name: string
  location: string
  status: ProjectStatus
  image: { src: string; alt: string; blurDataURL?: string }
  /** e.g. "3 & 4 Beds · 2,150–2,650 sft" */
  meta?: string
  /** Formatted price ("৳ 2.45 Cr"); null shows "Price on request". */
  price?: string | null
  priority?: boolean
  className?: string
}

export function ProjectCard({
  href,
  name,
  location,
  status,
  image,
  meta,
  price,
  priority,
  className,
}: ProjectCardProps) {
  const t = useTranslations('common')
  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-lg bg-white transition-shadow duration-300 hover:shadow-card',
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          placeholder={image.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={image.blurDataURL}
          className="object-cover transition-transform duration-[900ms] ease-out-soft group-hover:scale-[1.04]"
        />
        <StatusBadge status={status} onImage className="absolute top-4 left-4" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5 lg:p-6">
        <p className="text-eyebrow text-[0.6875rem] text-gold-text">{location}</p>
        <h3 className="font-display text-[1.75rem] leading-tight font-medium text-ink">
          {/* The whole card is clickable through this link's stretched ::after. */}
          <Link
            href={href}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-lg focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-gold"
          >
            {name}
          </Link>
        </h3>
        {meta ? <p className="text-small font-medium text-muted">{meta}</p> : null}
        <div className="mt-auto pt-3">
          <div className="flex items-end justify-between gap-4 border-t border-line pt-4">
            <div className="flex flex-col">
              <span className="text-[0.6875rem] font-semibold tracking-[1.6px] text-muted uppercase">
                {price ? t('startingFrom') : ' '}
              </span>
              <span className="font-display text-[1.375rem] leading-tight font-medium text-ink">
                {price ?? t('priceOnRequest')}
              </span>
            </div>
            <span
              aria-hidden="true"
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 group-hover:border-ink group-hover:bg-ink group-hover:text-cream"
            >
              <Icon name="arrowUpRight" size={18} />
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
