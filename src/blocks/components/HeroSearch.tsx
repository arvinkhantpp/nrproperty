import { getLocale, getTranslations } from 'next-intl/server'

import { Icon } from '@/components/ui'
import { getPathname } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { getAreas } from '@/lib/cms'

const selectCls =
  'h-12 w-full appearance-none rounded-sm border border-line bg-cream/60 pr-10 pl-4 text-body text-ink outline-none transition-colors focus:border-gold focus:bg-white lg:h-auto lg:border-0 lg:bg-transparent lg:p-0 lg:pr-8 lg:font-semibold'

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col gap-1.5 lg:gap-1 lg:border-r lg:border-line lg:px-6 lg:first:pl-2 lg:last-of-type:border-r-0">
      <label htmlFor={id} className="text-[0.6875rem] font-semibold tracking-[1.6px] text-muted uppercase">
        {label}
      </label>
      <div className="relative">
        {children}
        <Icon
          name="chevronDown"
          size={18}
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted lg:right-0"
        />
      </div>
    </div>
  )
}

/** Plain GET form to /projects, so it works before JavaScript loads and the result URL is shareable. */
export async function HeroSearch() {
  const locale = (await getLocale()) as Locale
  const t = await getTranslations('search')
  const tf = await getTranslations('filters')
  const areas = await getAreas(locale)
  const action = getPathname({ href: '/projects', locale })
  return (
    <form
      action={action}
      method="get"
      role="search"
      aria-label={t('label')}
      className="grid gap-3 rounded-[18px] bg-white p-4 text-ink shadow-float lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-center lg:gap-0 lg:rounded-full lg:py-3 lg:pr-3 lg:pl-6"
    >
      <Field id="hs-area" label={tf('area')}>
        <select id="hs-area" name="area" defaultValue="" className={selectCls}>
          <option value="">{tf('anyArea')}</option>
          {areas.map((a) => (
            <option key={a.id} value={a.slug ?? ''}>
              {a.name}
            </option>
          ))}
        </select>
      </Field>
      <Field id="hs-size" label={tf('size')}>
        <select id="hs-size" name="size" defaultValue="" className={selectCls}>
          <option value="">{tf('anySize')}</option>
          <option value="under-1500">{tf('sizeUnder1500')}</option>
          <option value="1500-2000">1,500–2,000 sft</option>
          <option value="2000-2500">2,000–2,500 sft</option>
          <option value="2500-plus">{tf('size2500plus')}</option>
        </select>
      </Field>
      <Field id="hs-status" label={tf('status')}>
        <select id="hs-status" name="status" defaultValue="" className={selectCls}>
          <option value="">{tf('anyStatus')}</option>
          <option value="ongoing">{tf('ongoing')}</option>
          <option value="upcoming">{tf('upcoming')}</option>
          <option value="completed">{tf('completed')}</option>
        </select>
      </Field>
      <button
        type="submit"
        className="mt-1 inline-flex h-13 items-center justify-center gap-2 rounded-md bg-ink px-7 text-[0.9375rem] font-semibold text-cream transition-colors hover:bg-forest-2 lg:mt-0 lg:h-14 lg:rounded-full"
      >
        <Icon name="search" size={18} />
        {t('submit')}
      </button>
    </form>
  )
}
