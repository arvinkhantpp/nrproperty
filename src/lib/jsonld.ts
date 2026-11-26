import type { Locale } from '@/i18n/routing'
import type { Contact, Post, Project, Team } from '@/payload-types'

import { lexicalText } from './lexical-text'
import { imageOf } from './media'
import { absoluteUrl, SITE_URL } from './metadata'
import { areaName } from './project-card'

const abs = (src: string) => (src.startsWith('http') ? src : `${SITE_URL}${src}`)

export function organizationLd({ name, contact, logo, locale }: { name: string; contact: Contact; logo?: string | null; locale: Locale }) {
  const sameAs = Object.values(contact.socials ?? {}).filter((v): v is string => typeof v === 'string' && v.startsWith('http'))
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${SITE_URL}/#organization`,
    name,
    url: absoluteUrl('/', locale),
    ...(logo ? { logo: abs(logo), image: abs(logo) } : {}),
    telephone: contact.hotline,
    ...(contact.emails?.[0]?.email ? { email: contact.emails[0].email } : {}),
    ...(contact.address ? { address: { '@type': 'PostalAddress', streetAddress: contact.address, addressLocality: 'Dhaka', addressCountry: 'BD' } } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  }
}

export function projectLd(p: Project, locale: Locale) {
  const f = p.facts ?? {}
  const url = absoluteUrl(`/projects/${p.slug}`, locale)
  const images = (p.gallery ?? []).map((m) => imageOf(m, 'wide')).filter(Boolean).slice(0, 6).map((i) => abs(i!.src))
  const area = areaName(p)
  const residence = {
    '@type': 'ApartmentComplex',
    name: p.name,
    address: { '@type': 'PostalAddress', streetAddress: p.address || area, addressLocality: area || 'Dhaka', addressRegion: 'Dhaka', addressCountry: 'BD' },
    ...(p.geo?.lat != null && p.geo?.lng != null ? { geo: { '@type': 'GeoCoordinates', latitude: p.geo.lat, longitude: p.geo.lng } } : {}),
    ...(f.units ? { numberOfAccommodationUnits: f.units } : {}),
    ...(p.amenities?.length
      ? {
          amenityFeature: p.amenities
            .filter((a) => typeof a === 'object' && a)
            .map((a) => ({ '@type': 'LocationFeatureSpecification', name: (a as { name?: string | null }).name, value: true })),
        }
      : {}),
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    '@id': `${url}#listing`,
    name: p.name,
    url,
    ...(p.tagline ? { description: p.tagline } : {}),
    ...(images.length ? { image: images } : {}),
    datePosted: p.createdAt,
    dateModified: p.updatedAt,
    ...(p.showPrice && p.startingPrice
      ? { offers: { '@type': 'Offer', price: p.startingPrice, priceCurrency: 'BDT', availability: p.status === 'completed' ? 'https://schema.org/LimitedAvailability' : 'https://schema.org/PreOrder' } }
      : {}),
    about: residence,
    provider: { '@id': `${SITE_URL}/#organization` },
  }
}

export function faqLd(items: { question?: string | null; answer?: string | null }[]) {
  const qa = items.filter((i) => i.question && i.answer)
  if (!qa.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qa.map((i) => ({ '@type': 'Question', name: i.question, acceptedAnswer: { '@type': 'Answer', text: i.answer } })),
  }
}

export function articleLd(post: Post, locale: Locale) {
  const url = absoluteUrl(`/blog/${post.slug}`, locale)
  const cover = imageOf(post.cover, 'wide')
  const author = typeof post.author === 'object' ? (post.author as Team | null) : null
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || lexicalText(post.body).slice(0, 160),
    url,
    mainEntityOfPage: url,
    inLanguage: locale === 'bn' ? 'bn-BD' : 'en',
    ...(cover ? { image: [abs(cover.src)] } : {}),
    datePublished: post.publishedAt ?? post.createdAt,
    dateModified: post.updatedAt,
    author: author?.name ? { '@type': 'Person', name: author.name } : { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
  }
}
