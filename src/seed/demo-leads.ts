/**
 * Demo leads for trying the admin dashboard and inbox locally: `pnpm seed:demo-leads`.
 * Every demo lead uses a 0100… phone number and is tagged utmContent=demo, so
 * `pnpm seed:demo-leads --clear` (or DEMO_CLEAR=1) removes them again. Never run against production.
 */
import config from '@payload-config'
import { getPayload } from 'payload'

const NAMES = ['Rafiq Ahmed', 'Nusrat Jahan', 'Tanvir Hossain', 'Farhana Akter', 'Imran Kabir', 'Sadia Islam', 'Mahmud Hasan', 'Shirin Sultana', 'Arif Chowdhury', 'Laila Rahman', 'Kamal Uddin', 'Rumana Begum', 'Zahid Hasan', 'Mithila Das', 'Sohel Rana']
const SOURCES = [
  { utmSource: 'facebook', utmMedium: 'paid', utmCampaign: 'bashundhara-launch', fbclid: 'demo' },
  { utmSource: 'facebook', utmMedium: 'paid', utmCampaign: 'landowner-jv', fbclid: 'demo' },
  { utmSource: 'google', utmMedium: 'cpc', utmCampaign: 'brand', gclid: 'demo' },
  { utmSource: 'google', utmMedium: 'organic' },
  {},
  { utmSource: 'whatsapp', utmMedium: 'share' },
]
const STATUSES = ['new', 'new', 'new', 'contacted', 'contacted', 'visitBooked', 'booked', 'lost'] as const
const TYPES = ['enquiry', 'enquiry', 'brochure', 'brochure', 'siteVisit', 'siteVisit', 'landowner', 'nrb', 'contact'] as const
const SEGMENT = { enquiry: 'buyer', brochure: 'buyer', siteVisit: 'buyer', contact: 'buyer', landowner: 'landowner', nrb: 'nrb' } as const

const pick = <T,>(a: readonly T[], i: number) => a[i % a.length]!

async function run() {
  const payload = await getPayload({ config })
  const clear = process.argv.includes('--clear') || process.env.DEMO_CLEAR === '1'
  const old = await payload.delete({ collection: 'leads', where: { 'tracking.utmContent': { equals: 'demo' } } })
  payload.logger.info(`Removed ${old.docs.length} demo leads`)
  if (clear) process.exit(0)

  const projects = (await payload.find({ collection: 'projects', limit: 20, depth: 0, select: { name: true } })).docs
  const now = Date.now()
  let made = 0
  for (let i = 0; i < 64; i++) {
    // More leads in recent days so the chart has a shape.
    const daysAgo = Math.floor(Math.pow((i * 37) % 64 / 64, 1.6) * 34)
    const createdAt = new Date(now - daysAgo * 86400000 - ((i * 7919) % 86400) * 1000).toISOString()
    const type = pick(TYPES, i * 5 + 1)
    const src = pick(SOURCES, i * 3 + (type === 'landowner' ? 1 : 0))
    const name = pick(NAMES, i * 7)
    const buyer = SEGMENT[type] === 'buyer'
    await payload.create({
      collection: 'leads',
      overrideAccess: true,
      data: {
        createdAt,
        type,
        segment: SEGMENT[type],
        name,
        phone: `+880100${String(1000000 + i).slice(-7)}`,
        email: i % 3 === 0 ? `${name.split(' ')[0]!.toLowerCase()}@example.com` : undefined,
        project: buyer && projects.length && type !== 'contact' ? projects[i % projects.length]!.id : undefined,
        status: daysAgo < 2 ? 'new' : pick(STATUSES, i),
        message: i % 4 === 0 ? 'Please call me after 6pm. Looking for a south-facing unit.' : undefined,
        details: {
          bedrooms: buyer ? pick(['3', '4', '3', '4+'], i) : undefined,
          visitDate: type === 'siteVisit' ? new Date(now + ((i % 6) + 1) * 86400000).toISOString() : undefined,
          timeSlot: type === 'siteVisit' ? pick(['Morning (10am–12pm)', 'Afternoon (2pm–5pm)'], i) : undefined,
          area: type === 'landowner' ? pick(['Bashundhara R/A', 'Uttara', 'Mirpur DOHS', 'Aftabnagar'], i) : undefined,
          landSizeKatha: type === 'landowner' ? pick([5, 6.5, 8, 10], i) : undefined,
          frontRoadFt: type === 'landowner' ? pick([20, 25, 30, 40], i) : undefined,
          ownership: type === 'landowner' ? pick(['Single owner', 'Joint family'], i) : undefined,
          country: type === 'nrb' ? pick(['United Kingdom', 'UAE', 'USA', 'Canada', 'Malaysia'], i) : undefined,
          whatsapp: type === 'nrb' ? `+4470000${String(10000 + i).slice(-5)}` : undefined,
          budgetRange: type === 'nrb' ? pick(['1.5–2 crore', '2–3 crore'], i) : undefined,
        },
        tracking: { ...src, utmContent: 'demo', pageUrl: 'https://nrproperty.com/projects', language: i % 4 === 0 ? 'bn' : 'en' },
        pipeline: { emailSent: true, sheetAppended: i % 9 !== 0, capiSent: Boolean(src.fbclid), errors: i % 9 === 0 ? 'sheets: demo error, sheet not shared with the service account' : undefined },
      },
    })
    made++
  }
  payload.logger.info(`Created ${made} demo leads`)
  process.exit(0)
}

await run()
