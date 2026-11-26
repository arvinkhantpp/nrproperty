# NR Property

Website and admin for NR Property, a real-estate developer in Dhaka. The site's job is to turn
visitors (buyers, landowners and Bangladeshis abroad) into leads that the sales team can call.

- **Stack:** Next.js 15 (App Router) with Payload CMS 3 in the same app, Postgres, Tailwind CSS v4,
  next-intl (English at `/`, Bangla at `/bn`), React Hook Form + Zod.
- **Admin:** `/admin`. Everything a non-developer should change lives there: projects, pages, blog,
  phone numbers, colours, tracking IDs, form labels, redirects.

| Guide                                  | For                                                         |
| -------------------------------------- | ----------------------------------------------------------- |
| [docs/ADMIN.md](docs/ADMIN.md)         | Dashboard, leads inbox, CSV export, previews, logo          |
| [docs/LEADS.md](docs/LEADS.md)         | How a form becomes a lead: email, Google Sheet, spam checks |
| [docs/TRACKING.md](docs/TRACKING.md)   | GTM, GA4, Meta Pixel + Conversions API, Clarity, consent    |
| `docs/screenshots/phase-*/REVIEW.md`   | Screenshots and design review notes for every phase         |

---

## Launch checklist

The seed fills the site with **clearly marked placeholders**. Before going live:

1. **Content (Admin):**
   - Replace every `[Placeholder]`, `[Project name]`, `[RAJUK no.]` and `[Office address]`.
     Search the admin for `[` to find them.
   - Replace the placeholder photos (their alt text starts with `[Placeholder photo]`).
   - Upload the logo and favicon in **Settings → Branding** (the site and the admin both use them).
   - Set the real stats in **Settings → Site settings**, plus REHAB and trade licence numbers.
   - Have the privacy policy reviewed (**Pages → Privacy policy**).
   - Have a native speaker review the Bangla: switch the admin locale to বাংলা at the top right.
     All Bangla is a first draft.
2. **Keys (hosting environment variables):**
   - `PAYLOAD_SECRET` (new random value).
   - Email: Resend or SMTP.
   - Turnstile.
   - Google service account.
   - `META_CAPI_ACCESS_TOKEN`.
   - R2 bucket.
   - See [Environment variables](#environment-variables).
3. **Tracking (Admin → Settings → Tracking):**
   - Paste the GTM, GA4, Pixel, Google Ads and Clarity IDs.
   - Send a test lead with Meta's **Test events** code, then clear the code.
4. **Google:**
   - Add the domain in Search Console.
   - Submit `https://nrproperty.com/sitemap.xml`.
5. **Leads:**
   - Add the sales team as users with the **Sales** role.
   - Set the notification emails and Google Sheet ID in **Settings → Forms**.
   - Submit one test of each form.
6. **Clean up:** delete the seeded admin user once real admins exist.

---

## Run locally

You need Node 20.9+, pnpm 10 and Docker (or your own Postgres 16).

```bash
pnpm install
cp .env.example .env          # set PAYLOAD_SECRET (openssl rand -hex 32)
docker compose up -d db       # Postgres on localhost:5432
pnpm dev                      # the database schema is pushed automatically in development
pnpm seed                     # placeholder content; set SEED_ADMIN_EMAIL/PASSWORD to also create an admin
```

- Site: http://localhost:3000 · Bangla: http://localhost:3000/bn
- Admin: http://localhost:3000/admin
- Design system: http://localhost:3000/styleguide (development only)

## Scripts

| Command                 | What it does                                                                        |
| ----------------------- | ----------------------------------------------------------------------------------- |
| `pnpm dev`              | Development server                                                                  |
| `pnpm check`            | Lint + typecheck + production build                                                 |
| `pnpm seed`             | Placeholder content (English + first-draft Bangla), only into an empty database     |
| `pnpm seed:fresh`       | Wipes content and reseeds. Leads and users are kept. **Never on production.**      |
| `pnpm seed:demo-leads`  | 64 fake leads for trying the dashboard (`DEMO_CLEAR=1 pnpm seed:demo-leads` removes them) |
| `pnpm migrate:create x` | New database migration after changing collections or fields (see below)             |
| `pnpm migrate`          | Apply pending migrations by hand (production also runs them on start-up)           |
| `pnpm generate:types`   | Regenerate `src/payload-types.ts` after changing collections                        |
| `pnpm screenshots`      | Full-page screenshots at 375/768/1440 (dev server running)                          |

## Changing the database schema

Development pushes schema changes straight to your local database. Production never does: it runs
the migrations in `src/migrations` when the app starts (and during `next build`). A database that
`pnpm dev` has touched is not migration-managed, so put `SKIP_PROD_MIGRATIONS=1` in your local
`.env` before running `pnpm build` / `pnpm start` on your own machine (`pnpm check` and
`pnpm build:local` set it for you). Otherwise Payload stops and asks before migrating. Production and staging should each have their own
database that only ever sees `pnpm build` / `pnpm start`.

After editing a collection, global or block:

```bash
pnpm generate:types
pnpm migrate:create describe-the-change   # commit the generated files in src/migrations
```

---

## Deploy

### Vercel + Neon (recommended)

1. Create a Neon project. Copy the **pooled** connection string and add `?sslmode=require`.
2. Import the GitHub repo in Vercel (framework: Next.js; the build command comes from `package.json`).
3. Add the environment variables below for Production. Previews get their own Neon branch if you
   use the Neon integration. Preview deployments are automatically kept out of Google.
4. Deploy. The first build creates every table through the initial migration.
5. Open `/admin` and create the first admin user. Or set `SEED_ADMIN_EMAIL` and
   `SEED_ADMIN_PASSWORD`, then run `pnpm seed` once from your computer against the Neon URL to load
   the placeholder content.
6. Point `nrproperty.com` at Vercel and set `NEXT_PUBLIC_SITE_URL=https://nrproperty.com`.

Uploads must go to R2 on Vercel, because the server's disk is not permanent. Set the `S3_*`
variables.

### VPS with Docker

```bash
cp .env.example .env        # fill it in; S3 is optional here (uploads stay in a Docker volume)
docker compose up -d --build
```

This runs Postgres and the site on port 3000. Put Caddy or Nginx in front for HTTPS. Back up the
`pgdata` and `media` volumes.

### Cloudflare R2 (media and landowner documents)

1. Create a bucket.
2. Create an API token with Object Read & Write on that bucket.
3. Set `S3_BUCKET`, `S3_ENDPOINT` (`https://<account-id>.r2.cloudflarestorage.com`) and the two keys.
4. To serve images from a public domain, add it to `NEXT_PUBLIC_IMAGE_HOSTS`.

Landowner documents are stored under `private/` and are only reachable through the admin.

---

## Environment variables

Everything here is a secret or an infrastructure setting. Anything a client may change (phone
numbers, Pixel ID, colours, sheet ID) is in the admin. `.env.example` has comments for each.

| Variable                                                        | Needed       | Notes                                                      |
| --------------------------------------------------------------- | ------------ | ---------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                                          | yes          | `https://nrproperty.com`, no trailing slash                |
| `DATABASE_URL`                                                  | yes          | Neon pooled URL with `?sslmode=require`                    |
| `PAYLOAD_SECRET`                                                | yes          | `openssl rand -hex 32`                                     |
| `REVALIDATE_SECRET`                                             | yes          | Random string                                              |
| `S3_BUCKET`, `S3_ENDPOINT`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` | on Vercel | Cloudflare R2                                        |
| `NEXT_PUBLIC_IMAGE_HOSTS`                                       | optional     | Public R2 domain(s), comma-separated                       |
| `EMAIL_PROVIDER`, `EMAIL_FROM`, `RESEND_API_KEY` or `SMTP_*`    | for email    | Lead notifications                                         |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | for Sheets | Share the sheet with this email as Editor              |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`        | recommended  | Spam protection. Without them the check is skipped         |
| `META_CAPI_ACCESS_TOKEN`                                        | for CAPI     | Events Manager → Settings → Conversions API                |
| `SITE_NOINDEX`                                                  | staging      | `1` keeps a staging copy out of Google                     |
| `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`                       | optional     | Only used by `pnpm seed`                                   |

---

## SEO

- Each page, project, post and area has an **SEO** tab with title, description, share image,
  "Hide from Google" and a Google preview. Site-wide defaults and the title template live in
  **Settings → SEO & redirects**.
- English and Bangla URLs are the same apart from the `/bn` prefix. Every page has canonical and
  hreflang links.
- `sitemap.xml` and `robots.txt` are generated. Hidden pages and the thank-you page are left out.
- Structured data:
  - Organization (RealEstateAgent) on every page.
  - RealEstateListing + ApartmentComplex on projects.
  - FAQPage on FAQs.
  - BreadcrumbList on breadcrumbs.
  - Article on blog posts.
- **Redirects:** add old URL → new URL in **Settings → SEO & redirects**. A redirect only applies
  to an address that no longer exists, so it can never hide a live page.
- **Ad landing pages:**
  - Projects: `/projects/<slug>`.
  - Areas: `/apartments-in-<area>`.
  - Filtered lists: `/projects?area=bashundhara&status=ongoing`.
  - UTM and click IDs are saved with every lead.

## Performance

Mobile Lighthouse on a local production build, 26 Nov 2026:

| Page              | Performance | Accessibility | Best practices | SEO |
| ----------------- | ----------- | ------------- | -------------- | --- |
| Home              | 86          | 100           | 96             | 100 |
| Project page      | 89          | 100           | 96             | 100 |
| Area page         | 89          | 100           | 96             | 100 |
| Bangla home       | 87          | 100           | 96             | 100 |
| Bangla blog       | 81          | 100           | 96             | 100 |

The Bangla blog list still has a small layout shift (CLS 0.15) while the Bangla font loads. It is
the main item left for a performance pass.

These scores use the placeholder photos and run without a CDN. On Vercel, images and static files
come from the edge, which usually adds a few points. LCP is driven by the hero headline font on the
home page and by the hero photo elsewhere. Keep hero photos under ~400 KB before upload; Payload
makes the smaller sizes.

---

## Project layout

```
src/app/(frontend)/[locale]   public site (en/bn): pages, projects, blog, construction status, areas
src/app/(payload)             admin + REST/GraphQL API; custom.scss styles the admin
src/admin                     custom admin views (dashboard, leads inbox) and fields
src/blocks                    page-builder blocks (config + React components)
src/collections, src/globals  CMS schema
src/components                site, form, project, tracking and design-system (ui) components
src/lib                       data access (cms.ts), forms, leads pipeline, tracking, SEO helpers
src/migrations                database migrations (production)
src/messages                  UI strings (en.json, bn.json)
src/seed                      placeholder content + first-draft Bangla (bn.ts)
src/styles/globals.css        design tokens (Tailwind v4 @theme)
```
