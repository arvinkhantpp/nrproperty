import {
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react'

import { cn } from '@/lib/cn'

import { Icon } from './Icon'

export type FieldTheme = 'light' | 'dark'

type FieldShellProps = {
  id: string
  label: ReactNode
  required?: boolean
  hint?: ReactNode
  error?: string
  theme: FieldTheme
  className?: string
  children: ReactNode
}

function FieldShell({
  id,
  label,
  required,
  hint,
  error,
  theme,
  className,
  children,
}: FieldShellProps) {
  const dark = theme === 'dark'
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label
        htmlFor={id}
        className={cn('text-[0.8125rem] font-semibold', dark ? 'text-gold-soft' : 'text-text')}
      >
        {label}
        {required ? (
          <span aria-hidden="true" className={dark ? 'text-gold' : 'text-gold-text'}>
            {' '}
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className={cn(
            'flex items-start gap-1.5 text-small font-medium',
            dark ? 'text-[#F0A79D]' : 'text-danger',
          )}
        >
          <Icon name="alert" size={14} className="mt-[3px] shrink-0" />
          <span>{error}</span>
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className={cn('text-small', dark ? 'text-white/60' : 'text-muted')}>
          {hint}
        </p>
      ) : null}
    </div>
  )
}

const control = (theme: FieldTheme, invalid: boolean) =>
  cn(
    // 16px text stops iOS Safari zooming into the field.
    'w-full rounded-sm border px-4 py-3.5 font-sans text-base transition-[border-color,box-shadow,background-color] duration-150',
    'focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60',
    theme === 'light'
      ? 'border-line bg-white text-text placeholder:text-muted/70 hover:border-[#C9BFAE] focus:border-gold-text focus:shadow-[0_0_0_3px_rgb(176_141_87/0.22)]'
      : 'border-white/20 bg-white/[0.06] text-white placeholder:text-white/45 hover:border-white/35 focus:border-gold focus:shadow-[0_0_0_3px_rgb(176_141_87/0.3)]',
    invalid && (theme === 'light' ? 'border-danger' : 'border-[#F0A79D]'),
  )

type Shared = {
  label: ReactNode
  hint?: ReactNode
  error?: string
  theme?: FieldTheme
  containerClassName?: string
}

const describedBy = (id: string, error?: string, hint?: ReactNode) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined

export function Input({
  label,
  hint,
  error,
  theme = 'light',
  containerClassName,
  className,
  id: idProp,
  required,
  ref,
  ...rest
}: Shared & InputHTMLAttributes<HTMLInputElement> & { ref?: Ref<HTMLInputElement> }) {
  const autoId = useId()
  const id = idProp ?? autoId
  return (
    <FieldShell {...{ id, label, required, hint, error, theme }} className={containerClassName}>
      <input
        ref={ref}
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(control(theme, Boolean(error)), className)}
        {...rest}
      />
    </FieldShell>
  )
}

export function Textarea({
  label,
  hint,
  error,
  theme = 'light',
  containerClassName,
  className,
  id: idProp,
  required,
  rows = 4,
  ref,
  ...rest
}: Shared & TextareaHTMLAttributes<HTMLTextAreaElement> & { ref?: Ref<HTMLTextAreaElement> }) {
  const autoId = useId()
  const id = idProp ?? autoId
  return (
    <FieldShell {...{ id, label, required, hint, error, theme }} className={containerClassName}>
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(control(theme, Boolean(error)), 'resize-y', className)}
        {...rest}
      />
    </FieldShell>
  )
}

export type SelectOption = { value: string; label: string }

export function Select({
  label,
  hint,
  error,
  theme = 'light',
  containerClassName,
  className,
  id: idProp,
  required,
  options,
  placeholder,
  ref,
  ...rest
}: Shared &
  SelectHTMLAttributes<HTMLSelectElement> & {
    options: SelectOption[]
    placeholder?: string
    ref?: Ref<HTMLSelectElement>
  }) {
  const autoId = useId()
  const id = idProp ?? autoId
  return (
    <FieldShell {...{ id, label, required, hint, error, theme }} className={containerClassName}>
      <div className="relative">
        <select
          ref={ref}
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error, hint)}
          className={cn(
            control(theme, Boolean(error)),
            'appearance-none pr-11',
            // Native option lists can't be transparent; give the dark theme a solid forest base.
            theme === 'dark' && 'bg-forest',
            className,
          )}
          defaultValue={
            rest.value === undefined && rest.defaultValue === undefined ? '' : undefined
          }
          {...rest}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <Icon
          name="chevronDown"
          size={18}
          className={cn(
            'pointer-events-none absolute top-1/2 right-4 -translate-y-1/2',
            theme === 'dark' ? 'text-white/70' : 'text-muted',
          )}
        />
      </div>
    </FieldShell>
  )
}
