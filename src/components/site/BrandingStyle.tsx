import { COLOR_VARS, DEFAULT_COLORS } from '@/globals/Branding'
import type { Branding } from '@/payload-types'

const HEX = /^#[0-9a-fA-F]{6}$/

/** Injects colours changed in Branding (admin) as CSS variables, overriding the defaults in globals.css. */
export function BrandingStyle({ colors }: { colors: Branding['colors'] }) {
  if (!colors) return null
  const rules = (Object.keys(COLOR_VARS) as (keyof typeof COLOR_VARS)[])
    .map((key) => {
      const value = colors[key]
      if (!value || !HEX.test(value) || value.toLowerCase() === DEFAULT_COLORS[key].toLowerCase()) return null
      return `${COLOR_VARS[key]}:${value};`
    })
    .filter(Boolean)
  if (!rules.length) return null
  return <style id="nr-branding">{`:root{${rules.join('')}}`}</style>
}
