/**
 * Seed script: `pnpm seed` (`pnpm seed:fresh` wipes and re-creates content).
 *
 * Confirmed client details (phone, email, Facebook) are real. Everything else — project names,
 * prices, stats, addresses, licence numbers, testimonials — is a clearly marked [placeholder].
 * Leads and users are never deleted.
 */
import config from '@payload-config'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload, type CollectionSlug, type Payload } from 'payload'

import { SITE_DEFAULTS } from '@/lib/site-defaults'

import { seedBangla } from './bn'
import { richText } from './richtext'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const imagesDir = path.resolve(dirname, '../../public/images/placeholder')
// `pnpm seed:fresh` (payload run does not forward --force from `pnpm seed --force`).
const force = process.argv.includes('--force') || process.env.SEED_FORCE === '1'

const CONTENT: CollectionSlug[] = [
  'pages',
  'posts',
  'testimonials',
  'projects',
  'team',
  'amenities',
  'areas',
  'media',
]

async function wipe(payload: Payload) {
  for (const collection of CONTENT) {
    await payload.delete({ collection, where: { id: { exists: true } }, overrideAccess: true })
  }
}

async function uploadImage(payload: Payload, file: string, alt: string, altBn: string) {
  const filePath = path.join(imagesDir, file)
  const doc = await payload.create({
    collection: 'media',
    data: { alt: `[Placeholder photo] ${alt}` },
    filePath,
    overrideAccess: true,
  })
  await payload.update({
    collection: 'media',
    id: doc.id,
    locale: 'bn',
    data: { alt: `[নমুনা ছবি] ${altBn}` },
  })
  return doc.id
}

export async function seed(payload: Payload) {
  const existing = await payload.count({ collection: 'projects' })
  if (existing.totalDocs > 0 && !force) {
    payload.logger.info(
      'Content already exists. Run `pnpm seed:fresh` to wipe and re-seed content.',
    )
    return
  }
  if (force) {
    payload.logger.info('Wiping content collections (leads and users are kept)…')
    await wipe(payload)
  }

  // ── Media ────────────────────────────────────────────────────────────────
  payload.logger.info('Uploading placeholder photos…')
  if (!fs.existsSync(imagesDir)) throw new Error(`Missing ${imagesDir}`)
  const img = {
    dusk: await uploadImage(
      payload,
      'hero-dusk.jpg',
      'Residential tower at dusk',
      'সন্ধ্যায় আবাসিক ভবন',
    ),
    white: await uploadImage(
      payload,
      'project-white.jpg',
      'White apartment building with balconies',
      'বারান্দাসহ সাদা অ্যাপার্টমেন্ট ভবন',
    ),
    brick: await uploadImage(
      payload,
      'project-brick.jpg',
      'Brick-clad apartment building',
      'ইটের ফিনিশের অ্যাপার্টমেন্ট ভবন',
    ),
    living: await uploadImage(
      payload,
      'interior-living.jpg',
      'Bright living room interior',
      'আলো-ঝলমলে বসার ঘর',
    ),
  }

  // ── Areas ────────────────────────────────────────────────────────────────
  const areaDefs = [
    ['Bashundhara R/A', 'বসুন্ধরা আ/এ', 'bashundhara'],
    ['Dhanmondi', 'ধানমন্ডি', 'dhanmondi'],
    ['Gulshan', 'গুলশান', 'gulshan'],
    ['Uttara', 'উত্তরা', 'uttara'],
    ['Mirpur', 'মিরপুর', 'mirpur'],
  ] as const
  const areas: Record<string, number> = {}
  for (const [i, [en, bn, slug]] of areaDefs.entries()) {
    const doc = await payload.create({
      collection: 'areas',
      data: {
        name: en,
        slug,
        order: i,
        heroImage: img.white,
        intro: richText(
          `[Placeholder] A short introduction to living in ${en}: what makes it sought-after and who it suits.`,
          '### Schools and hospitals',
          `[Placeholder] The nearest schools, colleges and hospitals, with travel times.`,
          '### Getting around',
          `[Placeholder] Main roads, distance to the airport and to business districts.`,
        ),
      },
    })
    await payload.update({ collection: 'areas', id: doc.id, locale: 'bn', data: { name: bn } })
    areas[slug] = doc.id
  }

  // ── Amenities ────────────────────────────────────────────────────────────
  const amenityDefs = [
    ['2 lifts with ARD', 'এআরডিসহ ২টি লিফট', 'layers'],
    ['Generator backup', 'জেনারেটর ব্যাকআপ', 'check'],
    ['24/7 CCTV & security', '২৪/৭ সিসিটিভি ও নিরাপত্তা', 'shield'],
    ['Fire safety system', 'অগ্নি নিরাপত্তা ব্যবস্থা', 'shield'],
    ['Rooftop garden', 'ছাদ বাগান', 'land'],
    ['Fibre internet', 'ফাইবার ইন্টারনেট', 'globe'],
    ['Community hall', 'কমিউনিটি হল', 'grid'],
    ['Rooftop gym', 'ছাদে জিম', 'heart'],
    ['Covered parking', 'আচ্ছাদিত পার্কিং', 'car'],
    ['Double-height lobby', 'ডাবল-হাইট লবি', 'floors'],
  ] as const
  const amenities: number[] = []
  for (const [en, bn, icon] of amenityDefs) {
    const doc = await payload.create({ collection: 'amenities', data: { name: en, icon } })
    await payload.update({ collection: 'amenities', id: doc.id, locale: 'bn', data: { name: bn } })
    amenities.push(doc.id)
  }

  // ── Team ─────────────────────────────────────────────────────────────────
  const advisor = await payload.create({
    collection: 'team',
    data: {
      name: '[Advisor name]',
      role: 'Sales Manager',
      phone: SITE_DEFAULTS.hotline,
      whatsapp: SITE_DEFAULTS.whatsapp,
      isAdvisor: true,
      showOnAbout: true,
      order: 0,
    },
  })
  await payload.create({
    collection: 'team',
    data: {
      name: '[Managing Director name]',
      role: 'Managing Director',
      showOnAbout: true,
      order: 1,
      bio: '[Placeholder] Short biography.',
    },
  })

  // ── Projects ─────────────────────────────────────────────────────────────
  type P = {
    letter: string
    area: string
    status: 'ongoing' | 'upcoming' | 'completed' | 'soldOut'
    cover: number
    price: number | null
    sizes: [number, number]
    beds: string
    floors: string
    units: number
    land: number
    road: number
    handover: string
    featured: boolean
    percent: number
  }
  const projectDefs: P[] = [
    {
      letter: 'A',
      area: 'bashundhara',
      status: 'ongoing',
      cover: img.white,
      price: 24_500_000,
      sizes: [2150, 2650],
      beds: '3–4',
      floors: 'G + 14',
      units: 52,
      land: 10,
      road: 40,
      handover: '2027-12-01',
      featured: true,
      percent: 62,
    },
    {
      letter: 'B',
      area: 'dhanmondi',
      status: 'ongoing',
      cover: img.brick,
      price: 18_900_000,
      sizes: [1750, 1980],
      beds: '3',
      floors: 'G + 9',
      units: 18,
      land: 6,
      road: 30,
      handover: '2027-06-01',
      featured: true,
      percent: 38,
    },
    {
      letter: 'C',
      area: 'gulshan',
      status: 'upcoming',
      cover: img.dusk,
      price: null,
      sizes: [3200, 4800],
      beds: '4',
      floors: 'G + 12',
      units: 22,
      land: 12,
      road: 60,
      handover: '2029-06-01',
      featured: true,
      percent: 0,
    },
    {
      letter: 'D',
      area: 'uttara',
      status: 'completed',
      cover: img.living,
      price: 12_800_000,
      sizes: [1450, 1650],
      beds: '3',
      floors: 'G + 8',
      units: 28,
      land: 5,
      road: 25,
      handover: '2024-03-01',
      featured: true,
      percent: 100,
    },
  ]
  const projects: number[] = []
  for (const [i, p] of projectDefs.entries()) {
    const areaName = areaDefs.find((a) => a[2] === p.area)?.[0] ?? p.area
    const name = `[Project name ${p.letter}]`
    const gallery = [
      p.cover,
      ...[img.living, img.dusk, img.white, img.brick].filter((m) => m !== p.cover),
    ]
    const doc = await payload.create({
      collection: 'projects',
      draft: false,
      data: {
        _status: 'published',
        name,
        slug: `apartment-for-sale-in-${p.area}-project-${p.letter.toLowerCase()}`,
        status: p.status,
        type: 'residential',
        area: areas[p.area]!,
        address: `[Plot, road, block], ${areaName}, Dhaka`,
        tagline: '[Placeholder project — replace with real details]',
        overview: richText(
          `[Placeholder] ${name} is a ${p.floors.replace('G + ', '')}-storey residence on a ${p.road}-ft road in ${areaName}. Each floor holds a small number of apartments, arranged so that every home receives morning light and cross-ventilation.`,
          'Replace this text with the real project description from the admin (Projects → this project → Details).',
        ),
        facts: {
          landAreaKatha: p.land,
          floors: p.floors,
          units: p.units,
          sizeMinSft: p.sizes[0],
          sizeMaxSft: p.sizes[1],
          bedrooms: p.beds,
          bathrooms: p.beds.includes('4') ? '4' : '3',
          frontRoadFt: p.road,
          parking: '1 per unit',
          handoverDate: p.handover,
          rajukNo: '[RAJUK no.]',
        },
        showPrice: p.price !== null,
        startingPrice: p.price ?? undefined,
        priceNote: p.price ? '[Placeholder price]' : 'Price on request',
        gallery,
        floorPlans: [
          {
            name: 'Type A',
            sizeSft: p.sizes[0],
            beds: 3,
            baths: 3,
            balconies: 2,
            facing: 'South-East',
          },
          {
            name: 'Type B',
            sizeSft: Math.round((p.sizes[0] + p.sizes[1]) / 2),
            beds: 3,
            baths: 4,
            balconies: 3,
            facing: 'South',
          },
          {
            name: 'Type C',
            sizeSft: p.sizes[1],
            beds: 4,
            baths: 4,
            balconies: 3,
            facing: 'North-East',
          },
        ],
        amenities: amenities.slice(0, 8),
        geo: { lat: 23.8103, lng: 90.4125 },
        nearby: [
          { place: '[Hospital]', minutes: 5, mode: 'drive' },
          { place: '[University]', minutes: 4, mode: 'drive' },
          { place: '[Shopping mall]', minutes: 10, mode: 'drive' },
          { place: 'Hazrat Shahjalal Airport', minutes: 20, mode: 'drive' },
        ],
        progress: {
          stage:
            p.percent === 100
              ? 'Handed over'
              : p.percent === 0
                ? 'Design & approvals'
                : '[Current stage]',
          percent: p.percent,
          updates:
            p.percent > 0 && p.percent < 100
              ? [
                  { date: '2026-11-01', note: '[Placeholder] What happened on site this month.', photos: [p.cover, ...gallery.slice(1, 4)] },
                  { date: '2026-10-01', note: '[Placeholder] Previous month’s update.', photos: gallery.slice(1, 3) },
                  { date: '2026-09-01', note: '[Placeholder] An earlier update.', photos: [p.cover] },
                ]
              : [],
        },
        faqs: [
          {
            question: 'Is the project approved by RAJUK?',
            answer: 'Yes. Approval number: [RAJUK no.].',
          },
          {
            question: 'Can I pay in instalments?',
            answer: '[Placeholder] Down payment followed by monthly instalments until handover.',
          },
          {
            question: 'Do you help with home loans?',
            answer: '[Placeholder] We can introduce you to partner banks.',
          },
        ],
        featuredOnHome: p.featured,
        order: i,
        advisor: advisor.id,
      },
    })
    await payload.update({
      collection: 'projects',
      id: doc.id,
      locale: 'bn',
      data: {
        name: `[প্রজেক্টের নাম ${p.letter}]`,
        tagline: '[নমুনা প্রজেক্ট — আসল তথ্য দিয়ে বদলান]',
      },
    })
    projects.push(doc.id)
  }

  // ── Testimonials ─────────────────────────────────────────────────────────
  const testimonialDefs = [
    [
      'buyer',
      'Apartment owner · [Project name A]',
      'We received our keys two weeks before the promised date. The finishing quality is better than the show flat.',
    ],
    [
      'landowner',
      'Landowner · Dhanmondi',
      'As a landowner I was nervous about joint ventures. NR explained every clause and kept every promise.',
    ],
    [
      'nrb',
      'NRB buyer · Canada',
      'I bought from Toronto without visiting once. Video site walks and monthly photos made it effortless.',
    ],
  ] as const
  for (const [i, [type, role, quote]] of testimonialDefs.entries()) {
    await payload.create({
      collection: 'testimonials',
      data: {
        name: '[Customer name]',
        role,
        type,
        quote: `[Placeholder] ${quote}`,
        order: i,
        project: type === 'buyer' ? projects[0] : undefined,
      },
    })
  }

  // ── Blog posts ───────────────────────────────────────────────────────────
  const postDefs = [
    ['Buying your first apartment in Dhaka: a checklist', 'buying', img.white],
    ['How a land-sharing joint venture works', 'landowner', img.brick],
    ['Buying a home in Bangladesh from abroad', 'nrb', img.dusk],
  ] as const
  for (const [title, category, cover] of postDefs) {
    await payload.create({
      collection: 'posts',
      draft: false,
      data: {
        _status: 'published',
        title: `[Placeholder] ${title}`,
        excerpt:
          '[Placeholder] A short summary of the article that appears on the blog list and in search results.',
        cover,
        category,
        body: richText(
          '[Placeholder article] Replace with a real article from the admin (Blog posts).',
          '## What to check first',
          'RAJUK approval, land ownership documents, the developer’s track record and the payment schedule.',
          '## Questions to ask',
          'Ask for the approved plan, the handover date in writing and the full list of included fittings.',
        ),
        relatedProjects: [projects[0]!],
      },
    })
  }

  // ── Pages ────────────────────────────────────────────────────────────────
  payload.logger.info('Creating pages…')
  const contactsBlock = {
    blockType: 'enquiryForm' as const,
    background: 'ink' as const,
    anchorId: 'enquire',
  }

  const home = await payload.create({
    collection: 'pages',
    draft: false,
    data: {
      _status: 'published',
      title: 'Home',
      slug: 'home',
      layout: [
        {
          blockType: 'hero',
          background: 'ink',
          variant: 'photo',
          eyebrow: 'Premium residences · Dhaka',
          title: 'Homes crafted with patience, *built on trust.*',
          description:
            'Thoughtfully designed apartments in Dhaka’s most sought-after neighbourhoods.',
          image: img.dusk,
          primary: { label: 'Explore Projects', href: '/projects' },
          secondary: { label: 'Talk to an Advisor', href: '#enquire' },
          showSearch: true,
        },
        { blockType: 'stats', background: 'cream', source: 'site' },
        {
          blockType: 'featuredProjects',
          background: 'sand',
          eyebrow: 'Our projects',
          title: 'Addresses worth *coming home to.*',
          showTabs: true,
          limit: 3,
          cta: { label: 'View all projects', href: '/projects' },
        },
        {
          blockType: 'features',
          background: 'cream',
          eyebrow: 'Why NR Property',
          title: 'Built the way we’d build for our *own family.*',
          description:
            'Every NR home starts with a clear promise: honest contracts, engineered safety and a handover date we keep.',
          image: img.living,
          items: [
            {
              icon: 'shield',
              title: 'Engineered for safety',
              description:
                'BNBC-compliant structure, lab-tested materials, earthquake-resistant design.',
            },
            {
              icon: 'clock',
              title: 'Handover on schedule',
              description:
                'Monthly construction updates so you always know where your home stands.',
            },
            {
              icon: 'layers',
              title: 'Thoughtful layouts',
              description: 'Light, ventilation and privacy planned into every floor plan.',
            },
            {
              icon: 'key',
              title: 'After-sales care',
              description: 'One year of free maintenance and a dedicated customer desk.',
            },
          ],
        },
        {
          blockType: 'landownerBand',
          background: 'forest',
          eyebrow: 'For landowners',
          title: 'Own land in Dhaka? Let’s build something *remarkable* on it.',
          description:
            'A transparent joint-venture partnership: fair share ratio, signing money, rent support during construction, and a handover date written into the contract.',
          primary: { label: 'Submit Your Land', href: '/landowner#land-form' },
          secondary: { label: 'How it works', href: '/landowner' },
          steps: [
            {
              title: 'Share your land details',
              description: 'Location, size and road width — takes 2 minutes.',
            },
            {
              title: 'Free site visit & valuation',
              description: 'Our architect and legal team visit within [72] hours.',
            },
            {
              title: 'Agreement & RAJUK approval',
              description: 'Clear share ratio, signing money and approvals handled by us.',
            },
            {
              title: 'Construction to handover',
              description: 'Monthly progress updates until you receive your keys.',
            },
          ],
        },
        {
          blockType: 'testimonials',
          background: 'cream',
          eyebrow: 'In their words',
          title: 'Families who made NR *home.*',
          filter: 'all',
          limit: 3,
        },
        {
          blockType: 'nrbBanner',
          background: 'cream',
          eyebrow: 'For non-resident Bangladeshis',
          title: 'Buy your home in Dhaka — from *anywhere in the world.*',
          description:
            'Video site visits, secure international payments, Power of Attorney guidance and a dedicated NRB relationship manager in your time zone.',
          image: img.white,
          cta: { label: 'NRB Services', href: '/nrb' },
        },
        {
          blockType: 'blogLatest',
          background: 'sand',
          eyebrow: 'From the journal',
          title: 'Guides for *buyers and landowners.*',
          limit: 3,
          cta: { label: 'Read the blog', href: '/blog' },
        },
        {
          ...contactsBlock,
          eyebrow: 'Get in touch',
          title: 'Let’s find the home that *fits your life.*',
          description:
            'Share a few details and a property advisor will call you within one working day — no pressure, no spam.',
          form: 'enquiry',
          formTitle: 'Request a call back',
          showContacts: true,
        },
      ],
    },
  })
  await payload.update({
    collection: 'pages',
    id: home.id,
    locale: 'bn',
    data: { title: 'হোম' },
  })

  const simplePages = [
    {
      title: 'About',
      slug: 'about',
      layout: [
        {
          blockType: 'hero' as const,
          background: 'ink' as const,
          variant: 'split' as const,
          eyebrow: 'About NR Property',
          title: 'Building Dhaka’s homes with *patience and trust.*',
          description:
            '[Placeholder] One or two sentences about the company, its history and its promise.',
          image: img.white,
        },
        { blockType: 'stats' as const, background: 'cream' as const, source: 'site' as const },
        {
          blockType: 'imageText' as const,
          background: 'cream' as const,
          eyebrow: 'Our story',
          title: 'From one building to a *neighbourhood name.*',
          body: richText(
            '[Placeholder] The company story: when it started, the first project, and what drives the team today.',
          ),
          image: img.living,
          imagePosition: 'right' as const,
        },
        {
          blockType: 'features' as const,
          background: 'sand' as const,
          eyebrow: 'What we stand for',
          title: 'Four promises in *every contract.*',
          items: [
            {
              icon: 'shield' as const,
              title: 'Engineered for safety',
              description: 'BNBC-compliant structure and lab-tested materials.',
            },
            {
              icon: 'clock' as const,
              title: 'Handover on schedule',
              description: 'The date is written into your contract.',
            },
            {
              icon: 'layers' as const,
              title: 'Thoughtful layouts',
              description: 'Light, ventilation and privacy on every floor.',
            },
            {
              icon: 'key' as const,
              title: 'After-sales care',
              description: 'One year of free maintenance after handover.',
            },
          ],
        },
        {
          blockType: 'testimonials' as const,
          background: 'cream' as const,
          eyebrow: 'In their words',
          title: 'Families who made NR *home.*',
          filter: 'all' as const,
          limit: 3,
        },
        {
          blockType: 'ctaBand' as const,
          background: 'forest' as const,
          eyebrow: 'Visit us',
          title: 'See a project *in person.*',
          description: 'Book a site visit and an advisor will walk you through.',
          primary: { label: 'Book a Visit', href: '/contact#enquire' },
          secondary: { label: 'View projects', href: '/projects' },
        },
      ],
    },
    {
      title: 'Landowner',
      slug: 'landowner',
      layout: [
        {
          blockType: 'hero' as const,
          background: 'forest' as const,
          variant: 'split' as const,
          eyebrow: 'For landowners',
          title: 'Your land, our craft. *A partnership you can trust.*',
          description:
            'Fair share ratio, signing money, rent support during construction and a handover date written into the contract.',
          image: img.brick,
          primary: { label: 'Submit Your Land', href: '#land-form' },
          secondary: {
            label: 'Call us',
            href: `tel:+88${SITE_DEFAULTS.hotline.replace(/\D/g, '')}`,
          },
        },
        {
          blockType: 'steps' as const,
          background: 'cream' as const,
          eyebrow: 'How it works',
          title: 'Four steps from *land to keys.*',
          items: [
            {
              icon: 'pin' as const,
              title: 'Share your land details',
              description: 'Location, size and road width — takes 2 minutes.',
            },
            {
              icon: 'calendar' as const,
              title: 'Free site visit & valuation',
              description: 'Our architect and legal team visit within [72] hours.',
            },
            {
              icon: 'shield' as const,
              title: 'Agreement & RAJUK approval',
              description: 'Clear share ratio, signing money and approvals handled by us.',
            },
            {
              icon: 'key' as const,
              title: 'Construction to handover',
              description: 'Monthly progress updates until you receive your keys.',
            },
          ],
        },
        {
          blockType: 'features' as const,
          background: 'sand' as const,
          eyebrow: 'What you receive',
          title: 'Everything agreed *in writing.*',
          items: [
            {
              icon: 'grid' as const,
              title: 'Fair share ratio',
              description: '[Placeholder] Typical ratio and how it is calculated.',
            },
            {
              icon: 'key' as const,
              title: 'Signing money',
              description: '[Placeholder] Paid when the agreement is signed.',
            },
            {
              icon: 'land' as const,
              title: 'Rent support',
              description:
                '[Placeholder] Monthly support while your building is under construction.',
            },
            {
              icon: 'calendar' as const,
              title: 'Handover in writing',
              description: 'The handover date is part of the contract.',
            },
          ],
        },
        {
          blockType: 'testimonials' as const,
          background: 'cream' as const,
          eyebrow: 'Landowners on NR',
          title: 'Partners who *trusted us.*',
          filter: 'landowner' as const,
          limit: 3,
        },
        {
          blockType: 'faq' as const,
          background: 'cream' as const,
          eyebrow: 'FAQ',
          title: 'Questions landowners *ask us.*',
          items: [
            {
              question: 'What size of land do you consider?',
              answer: '[Placeholder] Typically from [5] katha on a road of at least [20] ft.',
            },
            {
              question: 'Who pays for RAJUK approval?',
              answer: '[Placeholder] We handle and pay for approvals.',
            },
            {
              question: 'How long does construction take?',
              answer: '[Placeholder] Usually [36–42] months from approval.',
            },
          ],
        },
        {
          blockType: 'enquiryForm' as const,
          background: 'forest' as const,
          anchorId: 'land-form',
          eyebrow: 'Submit your land',
          title: 'Tell us about *your land.*',
          description: 'We’ll call within one working day to arrange a free site visit.',
          form: 'landowner' as const,
          formTitle: 'Land details',
          showContacts: true,
        },
      ],
    },
    {
      title: 'NRB',
      slug: 'nrb',
      layout: [
        {
          blockType: 'hero' as const,
          background: 'ink' as const,
          variant: 'split' as const,
          eyebrow: 'For non-resident Bangladeshis',
          title: 'A home in Dhaka, *from anywhere.*',
          description:
            'Video site visits, secure international payments, Power of Attorney guidance and a relationship manager in your time zone.',
          image: img.dusk,
          primary: { label: 'Talk to an NRB advisor', href: '#nrb-form' },
        },
        {
          blockType: 'steps' as const,
          background: 'cream' as const,
          eyebrow: 'How to buy from abroad',
          title: 'Five steps, *no flights needed.*',
          items: [
            {
              icon: 'phone' as const,
              title: 'Video consultation',
              description: 'Meet an advisor at a time that suits your time zone.',
            },
            {
              icon: 'play' as const,
              title: 'Live video site visit',
              description: 'Walk the site and show flat on a video call.',
            },
            {
              icon: 'shield' as const,
              title: 'Booking & agreement',
              description: 'Sign digitally or through a Power of Attorney.',
            },
            {
              icon: 'globe' as const,
              title: 'International payment',
              description: 'Pay through approved banking channels.',
            },
            {
              icon: 'key' as const,
              title: 'Monthly updates to handover',
              description: 'Photos and progress reports every month.',
            },
          ],
        },
        {
          blockType: 'features' as const,
          background: 'sand' as const,
          eyebrow: 'Payments & paperwork',
          title: 'The details, *handled.*',
          items: [
            {
              icon: 'globe' as const,
              title: 'Payment channels',
              description:
                '[Placeholder] Bank transfer, remittance partners and accepted currencies.',
            },
            {
              icon: 'shield' as const,
              title: 'Power of Attorney',
              description:
                '[Placeholder] How to appoint a family member and attest it at your embassy.',
            },
            {
              icon: 'play' as const,
              title: 'Video site visits',
              description: 'Book a live walk-through any day of the week.',
            },
            {
              icon: 'phone' as const,
              title: 'Your relationship manager',
              description: 'One person who answers on WhatsApp.',
            },
          ],
        },
        {
          blockType: 'testimonials' as const,
          background: 'cream' as const,
          eyebrow: 'From abroad',
          title: 'Bought from abroad, *handed over on time.*',
          filter: 'nrb' as const,
          limit: 3,
        },
        {
          blockType: 'faq' as const,
          background: 'sand' as const,
          items: [
            {
              question: 'Can I buy without visiting Bangladesh?',
              answer: '[Placeholder] Yes, through a video visit and a Power of Attorney.',
            },
            {
              question: 'Which currencies can I pay in?',
              answer: '[Placeholder] Payment channel details.',
            },
          ],
          eyebrow: 'FAQ',
          title: 'NRB *questions.*',
        },
        {
          blockType: 'enquiryForm' as const,
          background: 'ink' as const,
          anchorId: 'nrb-form',
          eyebrow: 'NRB enquiry',
          title: 'Let’s talk, *in your time zone.*',
          form: 'nrb' as const,
          formTitle: 'Your details',
          showContacts: true,
        },
      ],
    },
    {
      title: 'Contact',
      slug: 'contact',
      layout: [
        {
          blockType: 'hero' as const,
          background: 'ink' as const,
          variant: 'plain' as const,
          eyebrow: 'Contact',
          title: 'We’re a call *away.*',
          description:
            'Call, WhatsApp or send a message. An advisor replies within one working day.',
        },
        {
          ...contactsBlock,
          background: 'cream' as const,
          eyebrow: 'Send a message',
          title: 'How can we *help?*',
          form: 'contact' as const,
          formTitle: 'Your message',
          showContacts: true,
        },
        {
          blockType: 'enquiryForm' as const,
          background: 'sand' as const,
          anchorId: 'site-visit',
          eyebrow: 'Site visit',
          title: 'See a project *in person.*',
          form: 'siteVisit' as const,
          formTitle: 'Book a site visit',
          showContacts: false,
        },
      ],
    },
    {
      title: 'Privacy policy',
      slug: 'privacy',
      layout: [
        {
          blockType: 'richText' as const,
          background: 'cream' as const,
          width: 'narrow' as const,
          content: richText(
            '[Placeholder — have this reviewed before launch.]',
            '## What we collect',
            'When you fill in a form we collect your name, phone number and the details you choose to share, plus the page you came from and advertising identifiers (such as utm and fbclid).',
            '## How we use it',
            'To call or message you about the property you asked about, and to measure which advertising works. We never sell your details.',
            '## Cookies and analytics',
            'With your consent we use Google Analytics, Meta Pixel and Microsoft Clarity to understand how the site is used.',
            '## Your choices',
            `To see or delete your data, email ${SITE_DEFAULTS.email}.`,
          ),
        },
      ],
    },
    // Fixed routes: the first Hero sets the heading; any other blocks show below the list.
    {
      title: 'Blog',
      slug: 'blog',
      layout: [
        {
          blockType: 'hero' as const,
          background: 'ink' as const,
          variant: 'plain' as const,
          eyebrow: 'Guides & news',
          title: 'Know more, *buy with confidence.*',
          description: 'Plain-language guides on buying, land sharing and buying from abroad.',
        },
      ],
    },
    {
      title: 'Construction status',
      slug: 'construction-status',
      layout: [
        {
          blockType: 'hero' as const,
          background: 'ink' as const,
          variant: 'plain' as const,
          eyebrow: 'Construction status',
          title: 'Every project, *month by month.*',
          description: 'See where each building stands today. Photos and notes are updated every month.',
        },
      ],
    },
    {
      title: 'Thank you',
      slug: 'thank-you',
      layout: [
        {
          blockType: 'hero' as const,
          background: 'ink' as const,
          variant: 'plain' as const,
          eyebrow: 'Thank you',
          title: 'We’ve received *your details.*',
          description:
            'An advisor will call you within one working day. Need us sooner? Message us on WhatsApp.',
        },
      ],
    },
  ]
  for (const page of simplePages) {
    await payload.create({
      collection: 'pages',
      draft: false,
      data: { _status: 'published', ...page },
    })
  }

  // ── Globals ──────────────────────────────────────────────────────────────
  payload.logger.info('Saving settings…')
  await payload.updateGlobal({
    slug: 'branding',
    data: {
      companyName: SITE_DEFAULTS.companyName.en,
      tagline: 'Premium residences in Dhaka',
      logoSubline: 'DEVELOPMENTS LTD.',
      ogImage: img.dusk,
    },
  })
  await payload.updateGlobal({
    slug: 'branding',
    locale: 'bn',
    data: { companyName: SITE_DEFAULTS.companyName.bn, tagline: 'ঢাকার প্রিমিয়াম আবাসন' },
  })

  await payload.updateGlobal({
    slug: 'header',
    data: {
      menu: [
        { label: 'Home', href: '/', show: true },
        { label: 'Projects', href: '/projects', show: true },
        { label: 'Landowner', href: '/landowner', show: true },
        { label: 'NRB', href: '/nrb', show: true },
        { label: 'About', href: '/about', show: true },
        { label: 'Blog', href: '/blog', show: true },
        { label: 'Contact', href: '/contact', show: true },
      ],
      cta: { label: 'Book a Visit', href: '/contact#site-visit', opensSiteVisit: true },
      showHotline: true,
      showLanguageSwitch: true,
    },
  })
  const header = await payload.findGlobal({ slug: 'header' })
  const bnMenu = ['হোম', 'প্রজেক্ট', 'জমির মালিক', 'প্রবাসী', 'আমাদের কথা', 'ব্লগ', 'যোগাযোগ']
  await payload.updateGlobal({
    slug: 'header',
    locale: 'bn',
    data: {
      menu: (header.menu ?? []).map((m, i) => ({ ...m, label: bnMenu[i] ?? m.label })),
      cta: { ...header.cta, label: 'ভিজিট বুক করুন' },
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      about:
        'Building homes in Dhaka with honest contracts, engineered safety and handovers we keep.',
      columns: [
        {
          title: 'Explore',
          links: [
            { label: 'Ongoing projects', href: '/projects?status=ongoing' },
            { label: 'Upcoming projects', href: '/projects?status=upcoming' },
            { label: 'Completed projects', href: '/projects?status=completed' },
            { label: 'Construction status', href: '/construction-status' },
          ],
        },
        {
          title: 'Areas',
          links: [
            { label: 'Bashundhara R/A', href: '/apartments-in-bashundhara' },
            { label: 'Dhanmondi', href: '/apartments-in-dhanmondi' },
            { label: 'Gulshan', href: '/apartments-in-gulshan' },
            { label: 'Uttara', href: '/apartments-in-uttara' },
          ],
        },
        {
          title: 'Company',
          links: [
            { label: 'About us', href: '/about' },
            { label: 'Landowner', href: '/landowner' },
            { label: 'NRB services', href: '/nrb' },
            { label: 'Blog', href: '/blog' },
          ],
        },
        {
          title: 'Support',
          links: [
            { label: 'Contact', href: '/contact' },
            { label: 'Book a site visit', href: '/contact#site-visit' },
            { label: 'Privacy policy', href: '/privacy' },
          ],
        },
      ],
      copyright: '© {year} NR Property. All rights reserved.',
    },
  })

  await payload.updateGlobal({
    slug: 'contact',
    data: {
      hotline: SITE_DEFAULTS.hotline,
      whatsapp: SITE_DEFAULTS.whatsapp,
      whatsappMessage: 'Hello NR Property, I would like to know more about your projects.',
      showWhatsappButton: true,
      emails: [{ label: 'Sales', email: SITE_DEFAULTS.email }],
      address: '[Office address], Dhaka',
      officeHours: 'Saturday – Thursday, 10 am – 7 pm',
      socials: { facebook: SITE_DEFAULTS.facebook },
    },
  })
  await payload.updateGlobal({
    slug: 'contact',
    locale: 'bn',
    data: {
      whatsappMessage: 'আসসালামু আলাইকুম, আমি আপনাদের প্রজেক্ট সম্পর্কে জানতে চাই।',
      officeHours: 'শনিবার – বৃহস্পতিবার, সকাল ১০টা – সন্ধ্যা ৭টা',
    },
  })

  await payload.updateGlobal({
    slug: 'siteSettings',
    data: {
      stats: [
        { value: '[18+]', label: 'Years of building' },
        { value: '[42]', label: 'Projects completed' },
        { value: '[1,250+]', label: 'Families handed over' },
        { value: '[100%]', label: 'RAJUK-approved plans' },
      ],
      rehabNo: '[REHAB no.]',
      tradeLicence: '[Trade licence no.]',
      leadRouting: {
        recipients: [{ email: SITE_DEFAULTS.email }],
        googleSheetTab: 'Leads',
        autoAssign: false,
      },
    },
  })

  const opt = (pairs: [string, string][]) => pairs.map(([value, label]) => ({ value, label }))
  await payload.updateGlobal({
    slug: 'forms',
    data: {
      enquiry: {
        title: 'Request a call back',
        submitLabel: 'Request a Call Back',
        successMessage: 'Thank you. An advisor will call you within one working day.',
      },
      brochure: { title: 'Get the brochure', submitLabel: 'Download Brochure (PDF)' },
      siteVisit: { title: 'Book a site visit', submitLabel: 'Book a Visit' },
      landowner: { title: 'Submit your land', submitLabel: 'Submit Land Details' },
      nrb: { title: 'NRB enquiry', submitLabel: 'Send Enquiry' },
      contact: { title: 'Send a message', submitLabel: 'Send Message' },
      bedrooms: opt([
        ['2', '2 Beds'],
        ['3', '3 Beds'],
        ['4+', '4+ Beds'],
      ]),
      timeSlots: opt([
        ['morning', 'Morning (10 am – 1 pm)'],
        ['afternoon', 'Afternoon (1 pm – 4 pm)'],
        ['evening', 'Evening (4 pm – 7 pm)'],
      ]),
      budgetRanges: opt([
        ['under-1.5cr', 'Under ৳1.5 Cr'],
        ['1.5-2.5cr', '৳1.5 – 2.5 Cr'],
        ['2.5-4cr', '৳2.5 – 4 Cr'],
        ['4cr+', 'Above ৳4 Cr'],
      ]),
      bestTimes: opt([
        ['morning', 'Morning (Bangladesh time)'],
        ['afternoon', 'Afternoon (Bangladesh time)'],
        ['evening', 'Evening (Bangladesh time)'],
        ['whatsapp', 'WhatsApp message first'],
      ]),
      subjects: opt([
        ['buy', 'Buying an apartment'],
        ['land', 'Land / joint venture'],
        ['other', 'Something else'],
      ]),
    },
  })
  // First-draft Bangla for the form titles and buttons (flagged for review).
  await payload.updateGlobal({
    slug: 'forms',
    locale: 'bn',
    data: {
      enquiry: {
        title: 'কল ব্যাক অনুরোধ',
        submitLabel: 'কল ব্যাক চাই',
        successMessage: 'ধন্যবাদ। একজন পরামর্শক এক কর্মদিবসের মধ্যে আপনাকে কল করবেন।',
      },
      brochure: { title: 'ব্রোশিওর নিন', submitLabel: 'ব্রোশিওর ডাউনলোড (PDF)' },
      siteVisit: { title: 'সাইট ভিজিট বুক করুন', submitLabel: 'ভিজিট বুক করুন' },
      landowner: { title: 'আপনার জমির তথ্য দিন', submitLabel: 'জমির তথ্য জমা দিন' },
      nrb: { title: 'প্রবাসী অনুসন্ধান', submitLabel: 'অনুসন্ধান পাঠান' },
      contact: { title: 'মেসেজ পাঠান', submitLabel: 'মেসেজ পাঠান' },
    },
  })
  await payload.updateGlobal({
    slug: 'seo',
    data: {
      titleTemplate: '%s · NR Property',
      defaultTitle: 'NR Property · Premium apartments in Dhaka',
      defaultDescription:
        'Thoughtfully designed apartments in Bashundhara, Dhanmondi, Gulshan and Uttara. RAJUK-approved, handed over on schedule.',
      ogImage: img.dusk,
      redirects: [],
    },
  })
  await payload.updateGlobal({ slug: 'tracking', data: { consentRequired: true } })
  await payload.updateGlobal({
    slug: 'announcement',
    data: {
      enabled: false,
      text: '[Placeholder] Limited units left at [Project name A] — book a site visit this week.',
      href: '/projects',
    },
  })
  await payload.updateGlobal({
    slug: 'popup',
    data: {
      enabled: false,
      title: '[Placeholder offer]',
      body: 'Leave your number and an advisor will call you.',
      trigger: 'delay',
      delaySeconds: 25,
      showForm: true,
      excludePaths: ['/thank-you', '/contact'],
    },
  })

  // ── First admin user ─────────────────────────────────────────────────────
  const adminEmail = process.env.SEED_ADMIN_EMAIL
  const adminPassword = process.env.SEED_ADMIN_PASSWORD
  if (adminEmail && adminPassword) {
    const found = await payload.find({
      collection: 'users',
      where: { email: { equals: adminEmail } },
      limit: 1,
    })
    if (!found.docs.length) {
      await payload.create({
        collection: 'users',
        data: { email: adminEmail, password: adminPassword, name: 'Admin', role: 'admin' },
      })
      payload.logger.info(`Created admin user ${adminEmail}`)
    }
  }

  payload.logger.info('Writing first-draft Bangla content…')
  await seedBangla(payload)

  payload.logger.info('Seed complete.')
}

const payload = await getPayload({ config })
await seed(payload)
process.exit(0)
