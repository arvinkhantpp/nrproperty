import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'

import { Icon, type IconName } from './Icon'

export type ButtonVariant = 'primary' | 'dark' | 'outline' | 'onDark' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

const base =
  'group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-sans font-semibold whitespace-nowrap select-none ' +
  'transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-out-soft ' +
  'hover:-translate-y-px active:translate-y-0 disabled:pointer-events-none [&:disabled:not([aria-busy])]:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-gold text-ink hover:bg-[color-mix(in_srgb,var(--nr-gold)_88%,white)] hover:shadow-card',
  dark: 'bg-ink text-cream hover:bg-forest-2 hover:shadow-card',
  outline: 'border border-line bg-transparent text-ink hover:border-ink hover:bg-white',
  onDark: 'border border-white/35 bg-transparent text-white hover:border-white hover:bg-white/10',
  ghost: 'bg-transparent text-ink hover:bg-sand',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-11 px-5 text-sm',
  md: 'h-12 px-6 text-[0.9375rem]',
  lg: 'h-14 px-8 text-base',
}

type CommonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  iconLeft?: IconName
  iconRight?: IconName
  fullWidth?: boolean
  loading?: boolean
  children: ReactNode
  className?: string
}

type AsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined }
type AsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string }

export type ButtonProps = AsButton | AsLink

export function buttonClasses({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
}: Pick<CommonProps, 'variant' | 'size' | 'fullWidth' | 'className'>) {
  return cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)
}

function Inner({
  iconLeft,
  iconRight,
  loading,
  children,
}: Pick<CommonProps, 'iconLeft' | 'iconRight' | 'loading' | 'children'>) {
  return (
    <>
      {loading ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 m-auto size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
        />
      ) : null}
      <span className={cn('inline-flex items-center gap-2', loading && 'invisible')}>
        {iconLeft ? <Icon name={iconLeft} size={18} /> : null}
        {children}
        {iconRight ? (
          <Icon
            name={iconRight}
            size={18}
            className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
          />
        ) : null}
      </span>
    </>
  )
}

const isInternal = (href: string) => href.startsWith('/') && !href.startsWith('/api')

export function Button(props: ButtonProps) {
  const { variant, size, iconLeft, iconRight, fullWidth, loading, children, className, ...rest } =
    props
  const classes = buttonClasses({ variant, size, fullWidth, className })
  const inner = (
    <Inner iconLeft={iconLeft} iconRight={iconRight} loading={loading}>
      {children}
    </Inner>
  )

  if (typeof rest.href === 'string') {
    const { href, ...anchorRest } = rest as AsLink
    if (isInternal(href)) {
      return (
        <Link href={href} className={classes} {...anchorRest}>
          {inner}
        </Link>
      )
    }
    const external = /^https?:/.test(href)
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...anchorRest}
      >
        {inner}
      </a>
    )
  }

  const { type = 'button', disabled, ...buttonRest } = rest as AsButton
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...buttonRest}
    >
      {inner}
    </button>
  )
}
