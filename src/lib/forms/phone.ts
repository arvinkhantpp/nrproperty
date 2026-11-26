import { parsePhoneNumberFromString } from 'libphonenumber-js/min'

/**
 * Bangladesh mobile numbers: accepts 01XXXXXXXXX, 8801XXXXXXXXX, +880 1XXX-XXXXXX…
 * Returns the local 11-digit form (01XXXXXXXXX) or null when invalid.
 */
export function normaliseBDPhone(input: string): string | null {
  const digits = input.replace(/[^\d]/g, '')
  const local = digits.startsWith('880') ? `0${digits.slice(3)}` : digits.startsWith('1') && digits.length === 10 ? `0${digits}` : digits
  return /^01[3-9]\d{8}$/.test(local) ? local : null
}

export const bdToE164 = (local: string) => `+88${local}`

/** International number (NRB form). Returns E.164 or null. */
export function normaliseIntlPhone(input: string): string | null {
  const p = parsePhoneNumberFromString(input.trim().startsWith('+') ? input.trim() : `+${input.trim()}`)
  return p && p.isValid() ? p.number : null
}
