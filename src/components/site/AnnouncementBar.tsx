import { Icon } from '@/components/ui'
import { Link } from '@/i18n/navigation'

type Props = { text?: string | null; label?: string | null; href?: string | null }

export function AnnouncementBar({ text, label, href }: Props) {
  if (!text) return null
  const inner = (
    <>
      <span>{text}</span>
      {label ? (
        <span className="inline-flex items-center gap-1 font-semibold text-gold-light underline-offset-4 group-hover:underline">
          {label}
          <Icon name="arrowRight" size={14} />
        </span>
      ) : null}
    </>
  )
  const cls =
    'group container-site flex min-h-10 flex-wrap items-center justify-center gap-x-3 gap-y-0.5 py-2 text-center text-small text-cream/90'
  return (
    <div className="relative z-[51] bg-forest">
      {href ? (
        href.startsWith('/') ? (
          <Link href={href} className={cls}>
            {inner}
          </Link>
        ) : (
          <a href={href} className={cls}>
            {inner}
          </a>
        )
      ) : (
        <p className={cls}>{inner}</p>
      )}
    </div>
  )
}
