/** Indian-system grouping (1,00,000) used across Bangladesh. */
const grouping = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 })

export const formatBDT = (amount: number) => `৳ ${grouping.format(Math.round(amount))}`

/** 24,500,000 → "৳ 2.45 Cr"; 8,500,000 → "৳ 85 Lakh". */
export function formatPriceShort(amount: number | null | undefined): string | null {
  if (!amount || amount <= 0) return null
  if (amount >= 10_000_000) {
    const cr = amount / 10_000_000
    return `৳ ${cr.toFixed(cr >= 10 ? 1 : 2).replace(/\.?0+$/, '')} Cr`
  }
  const lakh = amount / 100_000
  return `৳ ${lakh.toFixed(lakh >= 10 ? 0 : 1).replace(/\.0$/, '')} Lakh`
}

export const formatNumber = (n: number) => grouping.format(n)

export function formatSizeRange(min?: number | null, max?: number | null, unit = 'sft') {
  if (min && max && min !== max) return `${formatNumber(min)}–${formatNumber(max)} ${unit}`
  const one = min ?? max
  return one ? `${formatNumber(one)} ${unit}` : null
}

export function formatMonthYear(date: string | null | undefined, locale: string) {
  if (!date) return null
  return new Intl.DateTimeFormat(locale === 'bn' ? 'bn-BD' : 'en-GB', { month: 'short', year: 'numeric' }).format(new Date(date))
}

export function formatDate(date: string | null | undefined, locale: string) {
  if (!date) return null
  return new Intl.DateTimeFormat(locale === 'bn' ? 'bn-BD' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(date))
}

/** Monthly EMI for a reducing-balance loan. */
export function monthlyEmi(principal: number, annualRatePct: number, years: number) {
  const n = Math.max(1, Math.round(years * 12))
  const r = annualRatePct / 12 / 100
  if (r === 0) return principal / n
  const f = Math.pow(1 + r, n)
  return (principal * r * f) / (f - 1)
}
