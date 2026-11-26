import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import type { ReactNode } from 'react'

import {
  Accent,
  Breadcrumbs,
  Button,
  FeatureItem,
  Logo,
  ProjectCard,
  ProjectCardSkeleton,
  SectionHeader,
  StatBlock,
  StatusBadge,
} from '@/components/ui'
import { telHref, whatsappHref } from '@/lib/contact'
import { SITE_DEFAULTS } from '@/lib/site-defaults'

import { InteractiveDemos, FormDemos, MobileBarsDemo } from './demos'

export const metadata: Metadata = { title: 'Styleguide', robots: { index: false, follow: false } }

const enabled = process.env.NODE_ENV !== 'production' || process.env.ENABLE_STYLEGUIDE === 'true'

const colors = [
  { token: 'ink', hex: '#0E1B17', use: 'Dark sections, primary dark buttons, footer' },
  { token: 'forest', hex: '#1F3A32', use: 'Landowner section, form cards' },
  { token: 'forest-2', hex: '#2C4A40', use: 'Hover / secondary dark' },
  { token: 'gold', hex: '#B08D57', use: 'Primary CTA background, accents on dark' },
  {
    token: 'gold-text',
    hex: '#7F6034',
    use: 'Gold text on light backgrounds (brief #8A6A3A, darkened for AA)',
  },
  { token: 'gold-light', hex: '#D9BC8A', use: 'Small gold text on forest and photos' },
  { token: 'gold-soft', hex: '#E9DCC5', use: 'Icon circles, badges' },
  { token: 'cream', hex: '#F6F2EA', use: 'Page background' },
  { token: 'sand', hex: '#EDE6DA', use: 'Alternate section background' },
  { token: 'text', hex: '#16211D', use: 'Body text' },
  {
    token: 'muted',
    hex: '#5A6762',
    use: 'Secondary text (brief #5E6B66, darkened for AA on sand)',
  },
  { token: 'line', hex: '#DDD5C7', use: 'Borders, dividers' },
  { token: 'success', hex: '#2E7D5B', use: 'Success' },
  { token: 'warning', hex: '#C98A1B', use: 'Warning' },
  { token: 'danger', hex: '#B4483C', use: 'Errors' },
  { token: 'info', hex: '#3B6EA8', use: 'Info' },
  { token: 'admin-bg', hex: '#F4F5F3', use: 'Admin background' },
]

// WCAG contrast of each token against cream, so the styleguide shows which pairs are safe for text.
function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }) as [number, number, number]
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
function contrast(a: string, b: string) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number]
  return (l1 + 0.05) / (l2 + 0.05)
}

function Block({
  id,
  title,
  children,
  dark,
}: {
  id: string
  title: string
  children: ReactNode
  dark?: boolean
}) {
  return (
    <section id={id} className={dark ? 'bg-forest text-cream' : undefined}>
      <div className="container-site">
        <div className={`py-14 lg:py-20 ${dark ? '' : 'border-t border-line/70'}`}>
          <h2
            className={`mb-10 text-eyebrow ${dark ? 'text-gold-light' : 'text-gold-text'}`}
          >{`${title}`}</h2>
          {children}
        </div>
      </div>
    </section>
  )
}

const projects = [
  {
    href: '/projects/placeholder-a',
    name: '[Project name A]',
    location: 'Bashundhara R/A',
    status: 'ongoing' as const,
    image: {
      src: '/images/placeholder/project-white.jpg',
      alt: 'Placeholder: white residential tower',
    },
    meta: '3 & 4 Beds · 2,150–2,650 sft',
    price: '৳ 2.45 Cr',
  },
  {
    href: '/projects/placeholder-b',
    name: '[Project name B]',
    location: 'Dhanmondi',
    status: 'upcoming' as const,
    image: {
      src: '/images/placeholder/project-brick.jpg',
      alt: 'Placeholder: brick-clad apartment building',
    },
    meta: '3 Beds · 1,750–1,980 sft',
    price: null,
  },
  {
    href: '/projects/placeholder-c',
    name: '[Project name C]',
    location: 'Gulshan-2',
    status: 'completed' as const,
    image: { src: '/images/placeholder/hero-dusk.jpg', alt: 'Placeholder: building at dusk' },
    meta: '4 Beds · Duplex',
    price: '৳ 6.80 Cr',
  },
]

export default async function StyleguidePage({ params }: { params: Promise<{ locale: string }> }) {
  if (!enabled) notFound()
  const { locale } = await params
  setRequestLocale(locale)

  const phone = telHref(SITE_DEFAULTS.hotline)
  const wa = whatsappHref(SITE_DEFAULTS.whatsapp)

  return (
    <main className="pb-32 lg:pb-0">
      <header className="bg-ink text-cream">
        <div className="container-site flex flex-col gap-10 py-14 lg:py-20">
          <Logo tone="dark" />
          <div className="flex flex-col gap-4">
            <p className="text-eyebrow text-gold">Design system · development only</p>
            <h1 className="max-w-3xl text-display-l text-balance">
              Quiet luxury, <Accent tone="dark">built in tokens.</Accent>
            </h1>
            <p className="max-w-xl text-body-l text-cream/75">
              Every colour, size and radius on the site comes from here. Colours can be overridden
              from the admin (Branding).
            </p>
          </div>
          <nav
            aria-label="Styleguide sections"
            className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-cream/70"
          >
            {[
              'colours',
              'type',
              'buttons',
              'badges',
              'forms',
              'cards',
              'content',
              'interactive',
              'mobile',
            ].map((s) => (
              <a key={s} href={`#${s}`} className="capitalize hover:text-cream">
                {s}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <Block id="colours" title="Colours">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {colors.map((c) => {
            const ratio = contrast(c.hex, '#F6F2EA')
            return (
              <li key={c.token} className="overflow-hidden rounded-md border border-line bg-white">
                <div className="h-20" style={{ background: `var(--nr-${c.token})` }} />
                <div className="flex flex-col gap-1 p-4">
                  <p className="text-label text-ink">{c.token}</p>
                  <p className="font-mono text-small text-muted">{c.hex}</p>
                  <p className="text-small text-muted">{c.use}</p>
                  <p className="text-small text-muted">
                    on cream {ratio.toFixed(1)}:1{' '}
                    <span
                      className={
                        ratio >= 4.5 ? 'text-success' : ratio >= 3 ? 'text-warning' : 'text-danger'
                      }
                    >
                      {ratio >= 4.5 ? 'AA text' : ratio >= 3 ? 'large only' : 'decor only'}
                    </span>
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </Block>

      <Block id="type" title="Typography">
        <div className="flex flex-col divide-y divide-line">
          {[
            [
              'Display XL · 88/1.0',
              'text-display-xl',
              <>
                Homes crafted with patience, <Accent>built on trust.</Accent>
              </>,
            ],
            [
              'Display L · 64/1.05',
              'text-display-l',
              <>
                Addresses worth <Accent>coming home to.</Accent>
              </>,
            ],
            [
              'Display M · 44/1.1',
              'text-display-m',
              'Built the way we’d build for our own family.',
            ],
            ['Display S · 32/1.15', 'text-display-s', 'Request a call back'],
          ].map(([label, cls, sample]) => (
            <div
              key={label as string}
              className="grid gap-3 py-8 lg:grid-cols-[14rem_1fr] lg:gap-10"
            >
              <p className="text-small text-muted">{label}</p>
              <p className={`${cls as string} text-balance text-ink`}>{sample}</p>
            </div>
          ))}
          {[
            [
              'Eyebrow · 12 SemiBold, 2px',
              'text-eyebrow text-gold-text',
              'Premium residences · Dhaka',
            ],
            [
              'Body L · 18/1.6',
              'text-body-l',
              'Every NR home starts with a clear promise: honest contracts, engineered safety and a handover date we keep.',
            ],
            [
              'Body · 15/1.6',
              'text-body',
              'Share a few details and a property advisor will call you within one working day.',
            ],
            [
              'Small · 13',
              'text-small text-muted',
              'By submitting, you agree to be contacted by phone or WhatsApp.',
            ],
            ['Label · 14 SemiBold', 'text-label', 'Phone number'],
          ].map(([label, cls, sample]) => (
            <div key={label} className="grid gap-3 py-6 lg:grid-cols-[14rem_1fr] lg:gap-10">
              <p className="text-small text-muted">{label}</p>
              <p className={`${cls} max-w-2xl`}>{sample}</p>
            </div>
          ))}
          <div lang="bn" className="grid gap-3 py-8 lg:grid-cols-[14rem_1fr] lg:gap-10">
            <p className="text-small text-muted">Bangla · Hind Siliguri</p>
            <div className="flex flex-col gap-3 font-bangla">
              <p className="text-display-m leading-[1.28] text-ink">
                ধৈর্য দিয়ে গড়া, বিশ্বাসে নির্মিত বাড়ি।
              </p>
              <p className="text-body-l text-muted">
                ঢাকার সবচেয়ে কাঙ্ক্ষিত এলাকায় যত্নে নকশা করা অ্যাপার্টমেন্ট। এক কর্মদিবসের মধ্যে
                আমাদের একজন উপদেষ্টা আপনাকে কল করবেন।
              </p>
            </div>
          </div>
        </div>
      </Block>

      <Block id="buttons" title="Buttons">
        <div className="flex flex-col gap-10">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" iconRight="arrowRight">
              Explore Projects
            </Button>
            <Button variant="dark">Talk to an Advisor</Button>
            <Button variant="outline" iconLeft="download">
              Download Brochure
            </Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="flex flex-wrap items-center gap-4 rounded-lg bg-forest p-8">
            <Button variant="primary">Submit Your Land</Button>
            <Button variant="onDark">How it works</Button>
            <Button variant="onDark" iconLeft="whatsapp" href={wa}>
              WhatsApp
            </Button>
          </div>
        </div>
      </Block>

      <Block id="badges" title="Status badges">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-3">
            <StatusBadge status="ongoing" />
            <StatusBadge status="upcoming" />
            <StatusBadge status="completed" />
            <StatusBadge status="soldOut" />
          </div>
          <div className="flex flex-wrap gap-3 rounded-lg bg-[url(/images/placeholder/project-white.jpg)] bg-cover bg-center p-8">
            <StatusBadge status="ongoing" onImage />
            <StatusBadge status="upcoming" onImage />
            <StatusBadge status="completed" onImage />
            <StatusBadge status="soldOut" onImage />
          </div>
        </div>
      </Block>

      <Block id="forms" title="Form fields">
        <FormDemos />
      </Block>

      <Block id="cards" title="Project cards">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.href} {...p} priority={i === 0} />
          ))}
        </div>
        <p className="mt-10 mb-4 text-small text-muted">Loading state</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCardSkeleton />
          <div className="hidden sm:block">
            <ProjectCardSkeleton />
          </div>
          <div className="hidden lg:block">
            <ProjectCardSkeleton />
          </div>
        </div>
      </Block>

      <Block id="content" title="Content blocks">
        <div className="flex flex-col gap-16">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Projects', href: '/projects' },
              { label: '[Project name A]' },
            ]}
          />
          <SectionHeader
            eyebrow="Our projects"
            title={
              <>
                Addresses worth <Accent>coming home to.</Accent>
              </>
            }
            action={
              <Button variant="outline" iconRight="arrowRight" href="/projects">
                View all projects
              </Button>
            }
          />
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-y border-line py-10 lg:grid-cols-4 lg:divide-x lg:divide-line">
            {[
              ['[18+]', 'Years of building'],
              ['[42]', 'Projects completed'],
              ['[1,250+]', 'Families handed over'],
              ['[100%]', 'RAJUK-approved plans'],
            ].map(([v, l], i) => (
              <StatBlock
                key={l}
                value={v as string}
                label={l as string}
                className={i > 0 ? 'lg:pl-10' : undefined}
              />
            ))}
          </div>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:max-w-[34rem]">
            <FeatureItem
              icon="shield"
              title="Engineered for safety"
              description="BNBC-compliant structure, lab-tested materials, earthquake-resistant design."
            />
            <FeatureItem
              icon="clock"
              title="Handover on schedule"
              description="Monthly construction updates so you always know where your home stands."
            />
            <FeatureItem
              icon="layers"
              title="Thoughtful layouts"
              description="Light, ventilation and privacy planned into every floor plan."
            />
            <FeatureItem
              icon="key"
              title="After-sales care"
              description="One year of free maintenance and a dedicated customer desk."
            />
          </div>
        </div>
      </Block>

      <Block id="content-dark" title="On forest" dark>
        <div className="flex flex-col gap-14">
          <SectionHeader
            tone="forest"
            eyebrow="For landowners"
            title={
              <>
                Own land in Dhaka? Let’s build something <Accent tone="forest">remarkable.</Accent>
              </>
            }
            description="A transparent joint-venture partnership: fair share ratio, signing money, rent support during construction, and a handover date written into the contract."
          />
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            <StatBlock tone="forest" value="[72 hrs]" label="Site visit after you submit" />
            <StatBlock tone="forest" value="[50:50]" label="Typical share ratio" />
          </div>
          <Breadcrumbs
            tone="forest"
            items={[{ label: 'Home', href: '/' }, { label: 'Landowner' }]}
          />
        </div>
      </Block>

      <Block id="interactive" title="Tabs, accordion, modal, drawer, toast">
        <InteractiveDemos />
      </Block>

      <Block id="mobile" title="Mobile actions">
        <MobileBarsDemo phoneHref={phone} whatsappHref={wa} />
      </Block>
    </main>
  )
}
