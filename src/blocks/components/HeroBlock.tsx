import Image from 'next/image'

import { Button, Eyebrow } from '@/components/ui'
import { cn } from '@/lib/cn'
import { imageOf } from '@/lib/media'
import { withAccent } from '@/lib/text'
import type { BlockOf } from './types'

import { HeroSearch } from './HeroSearch'
import { BG_CLASS, toneOf } from './Section'

export type HeroData = BlockOf<'hero'>

function Buttons({ data, onDark }: { data: HeroData; onDark: boolean }) {
  if (!data.primary?.href && !data.secondary?.href) return null
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {data.primary?.href && data.primary.label ? (
        <Button href={data.primary.href} size="lg" iconRight="arrowRight">
          {data.primary.label}
        </Button>
      ) : null}
      {data.secondary?.href && data.secondary.label ? (
        <Button href={data.secondary.href} size="lg" variant={onDark ? 'onDark' : 'outline'}>
          {data.secondary.label}
        </Button>
      ) : null}
    </div>
  )
}

export function HeroBlock({ data, isFirst }: { data: HeroData; isFirst: boolean }) {
  const variant = data.variant ?? 'photo'
  const img = imageOf(data.image, 'wide') ?? (variant === 'photo' ? { src: '/images/placeholder/hero-dusk.jpg', alt: '' } : null)
  const Heading = isFirst ? 'h1' : 'h2'

  if (variant === 'photo' && img) {
    return (
      <section id={data.anchorId || undefined} className="relative isolate overflow-hidden bg-ink text-white">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          priority={isFirst}
          sizes="100vw"
          className="-z-10 object-cover"
          style={img.focal ? { objectPosition: img.focal } : undefined}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(14_27_23/0.55)_0%,rgb(14_27_23/0.15)_35%,rgb(14_27_23/0.85)_100%)] lg:bg-[linear-gradient(90deg,rgb(14_27_23/0.8)_0%,rgb(14_27_23/0.35)_60%,rgb(14_27_23/0.1)_100%)]"
        />
        <div className="container-site flex min-h-[640px] flex-col justify-end gap-8 pt-32 pb-10 lg:min-h-[min(860px,100svh)] lg:pt-44 lg:pb-16">
          <div className="flex max-w-[46rem] flex-col gap-6">
            {data.eyebrow ? <Eyebrow tone="forest">{data.eyebrow}</Eyebrow> : null}
            <Heading className="text-display-xl text-balance">{withAccent(data.title, 'dark')}</Heading>
            {data.description ? (
              <p className="max-w-[34rem] text-body-l text-pretty text-white/85">{data.description}</p>
            ) : null}
            {!data.showSearch ? <Buttons data={data} onDark /> : (
              <div className="hidden lg:block">
                <Buttons data={data} onDark />
              </div>
            )}
          </div>
          {data.showSearch ? (
            <div className="lg:mt-6 lg:max-w-[60rem]">
              <HeroSearch />
            </div>
          ) : null}
        </div>
      </section>
    )
  }

  const bg = data.background ?? 'ink'
  const tone = toneOf(bg)
  const dark = tone !== 'light'

  if (variant === 'split' && img) {
    return (
      <section id={data.anchorId || undefined} className={cn(BG_CLASS[bg], 'overflow-hidden')}>
        <div className="container-site grid items-center gap-10 pt-14 pb-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-20 lg:pb-24">
          <div className="flex flex-col gap-6">
            {data.eyebrow ? <Eyebrow tone={tone}>{data.eyebrow}</Eyebrow> : null}
            <Heading className={cn('text-display-l text-balance', dark ? 'text-cream' : 'text-ink')}>
              {withAccent(data.title, tone)}
            </Heading>
            {data.description ? (
              <p className={cn('max-w-[34rem] text-body-l text-pretty', dark ? 'text-cream/75' : 'text-muted')}>
                {data.description}
              </p>
            ) : null}
            <Buttons data={data} onDark={dark} />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg lg:aspect-[5/4]">
            <Image src={img.src} alt={img.alt} fill priority={isFirst} sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id={data.anchorId || undefined} className={BG_CLASS[bg]}>
      <div className="container-site flex flex-col gap-6 pt-16 pb-14 lg:pt-28 lg:pb-24">
        {data.eyebrow ? <Eyebrow tone={tone}>{data.eyebrow}</Eyebrow> : null}
        <Heading className={cn('max-w-[52rem] text-display-l text-balance', dark ? 'text-cream' : 'text-ink')}>
          {withAccent(data.title, tone)}
        </Heading>
        {data.description ? (
          <p className={cn('max-w-[38rem] text-body-l text-pretty', dark ? 'text-cream/75' : 'text-muted')}>
            {data.description}
          </p>
        ) : null}
        <Buttons data={data} onDark={dark} />
      </div>
    </section>
  )
}
