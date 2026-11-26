import type { Locale } from '@/i18n/routing'

import { BlogLatestBlock } from './components/BlogLatestBlock'
import { CtaBandBlock } from './components/CtaBandBlock'
import { EnquiryFormBlock } from './components/EnquiryFormBlock'
import { FaqBlock } from './components/FaqBlock'
import { FeaturedProjectsBlock } from './components/FeaturedProjectsBlock'
import { FeaturesBlock } from './components/FeaturesBlock'
import { GalleryBlock } from './components/GalleryBlock'
import { HeroBlock } from './components/HeroBlock'
import { ImageTextBlock } from './components/ImageTextBlock'
import { LandownerBandBlock } from './components/LandownerBandBlock'
import { NrbBannerBlock } from './components/NrbBannerBlock'
import { RichTextBlock } from './components/RichTextBlock'
import { StatsBlock } from './components/StatsBlock'
import { StepsBlock } from './components/StepsBlock'
import { TestimonialsBlock } from './components/TestimonialsBlock'
import type { LayoutBlock } from './components/types'

/** Renders a page's layout blocks in order, skipping hidden ones. */
export function RenderBlocks({ blocks, locale }: { blocks: LayoutBlock[] | null | undefined; locale: Locale }) {
  const visible = (blocks ?? []).filter((b) => !b.hidden)
  return (
    <>
      {visible.map((b, i) => {
        const key = b.id ?? `${b.blockType}-${i}`
        switch (b.blockType) {
          case 'hero':
            return <HeroBlock key={key} data={b} isFirst={i === 0} />
          case 'stats':
            return <StatsBlock key={key} data={b} locale={locale} />
          case 'featuredProjects':
            return <FeaturedProjectsBlock key={key} data={b} locale={locale} />
          case 'features':
            return <FeaturesBlock key={key} data={b} />
          case 'landownerBand':
            return <LandownerBandBlock key={key} data={b} />
          case 'steps':
            return <StepsBlock key={key} data={b} />
          case 'testimonials':
            return <TestimonialsBlock key={key} data={b} locale={locale} />
          case 'nrbBanner':
            return <NrbBannerBlock key={key} data={b} />
          case 'blogLatest':
            return <BlogLatestBlock key={key} data={b} locale={locale} />
          case 'enquiryForm':
            return <EnquiryFormBlock key={key} data={b} locale={locale} />
          case 'richText':
            return <RichTextBlock key={key} data={b} />
          case 'imageText':
            return <ImageTextBlock key={key} data={b} />
          case 'faq':
            return <FaqBlock key={key} data={b} />
          case 'ctaBand':
            return <CtaBandBlock key={key} data={b} />
          case 'gallery':
            return <GalleryBlock key={key} data={b} />
          default:
            return null
        }
      })}
    </>
  )
}
