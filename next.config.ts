import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

// Remote image hosts (e.g. the Cloudflare R2 public bucket) come from env so nothing is hard-coded.
const remoteHosts = (process.env.NEXT_PUBLIC_IMAGE_HOSTS ?? '')
  .split(',')
  .map((h) => h.trim())
  .filter(Boolean)

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  // Always put <title>, description and Open Graph tags in <head>. Streaming them into the body
  // breaks link previews on Facebook/WhatsApp and some crawlers that don't run JavaScript.
  htmlLimitedBots: /.*/,
  // Landowner documents (up to 10 MB each) are posted to a server action when R2 is not configured.
  experimental: { serverActions: { bodySizeLimit: '11mb' } },
  images: {
    formats: ['image/avif', 'image/webp'],
    localPatterns: [{ pathname: '/api/media/file/**' }, { pathname: '/images/**' }],
    remotePatterns: remoteHosts.map((hostname) => ({ protocol: 'https' as const, hostname })),
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return webpackConfig
  },
}

const config = withPayload(withNextIntl(nextConfig), { devBundleServerPackages: false })

// Payload asks every route for the colour-scheme client hint with `Critical-CH`, which makes Chrome
// repeat the first request (~0.6 s on mobile). Only the admin needs it, so scope those headers there.
const payloadHeaders = config.headers
config.headers = async () =>
  ((await payloadHeaders?.()) ?? []).map((rule) =>
    rule.headers.some((h) => h.key === 'Critical-CH') ? { ...rule, source: '/admin/:path*' } : rule,
  )

export default config
