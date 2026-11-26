/** Display labels and colours shared by the admin views (safe for client components). */
export const TYPE_LABEL: Record<string, string> = {
  enquiry: 'Quick enquiry',
  brochure: 'Brochure',
  siteVisit: 'Site visit',
  landowner: 'Landowner',
  nrb: 'NRB',
  contact: 'Contact',
}

export const STATUS = [
  { value: 'new', label: 'New', bg: '#FBF1E2', fg: '#8A5A12' },
  { value: 'contacted', label: 'Contacted', bg: '#E7EEF7', fg: '#2D5A8E' },
  { value: 'visitBooked', label: 'Visit booked', bg: '#E6F0EA', fg: '#1F5C41' },
  { value: 'booked', label: 'Booked', bg: '#0E1B17', fg: '#F6F2EA' },
  { value: 'lost', label: 'Lost', bg: '#F6E7E5', fg: '#9A3B30' },
] as const

export const statusOf = (v: string | null | undefined) => STATUS.find((s) => s.value === v) ?? STATUS[0]

export type Source = 'Meta Ads' | 'Google Ads' | 'Organic search' | 'WhatsApp' | 'Referral' | 'Direct'

/** Where a lead came from, from its UTM tags, click ids and referrer. */
export function sourceOf(t: {
  utmSource?: string | null
  utmMedium?: string | null
  fbclid?: string | null
  gclid?: string | null
  referrer?: string | null
} | null | undefined): Source {
  const src = (t?.utmSource ?? '').toLowerCase()
  const ref = (t?.referrer ?? '').toLowerCase()
  if (t?.fbclid || /facebook|^fb$|instagram|^ig$|meta/.test(src)) return 'Meta Ads'
  if (t?.gclid || /google|adwords/.test(src)) return 'Google Ads'
  if (/whatsapp|^wa$/.test(src) || /whatsapp|wa\.me/.test(ref)) return 'WhatsApp'
  if (/google\.|bing\.|duckduckgo|yahoo\./.test(ref)) return 'Organic search'
  if (ref || src) return 'Referral'
  return 'Direct'
}

export const SOURCE_COLOR: Record<Source, string> = {
  'Meta Ads': '#1F3A32',
  'Google Ads': '#2C4A40',
  'Organic search': '#8A6A3A',
  WhatsApp: '#C9A46B',
  Referral: '#DCC9A6',
  Direct: '#B9C0BB',
}

export function timeAgo(iso: string, now = Date.now()) {
  const s = Math.max(0, Math.round((now - new Date(iso).getTime()) / 1000))
  if (s < 60) return 'just now'
  const m = Math.round(s / 60)
  if (m < 60) return `${m} min ago`
  const h = Math.round(m / 60)
  if (h < 24) return `${h} h ago`
  const d = Math.round(h / 24)
  if (d === 1) return 'Yesterday'
  if (d < 7) return `${d} days ago`
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', timeZone: 'Asia/Dhaka' }).format(new Date(iso))
}
