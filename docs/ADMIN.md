# Admin guide

Sign in at `/admin`.

## Dashboard (`/admin`)
New leads, leads today (and how many still wait for a first call), site visits and landowner leads for the last 7, 30 or
90 days, leads per day, leads by source (Meta Ads, Google Ads, organic, direct), the latest leads and
which projects bring the most leads and brochure requests. Sales users only see their own and unassigned leads.

## Leads inbox (`/admin/leads-inbox`)
Tabs for All, Buyer, Landowner and NRB. Search by name, phone or email, filter by project, status and date range (Dhaka days).
Click a lead to call or WhatsApp them, change the status, read every form answer, open landowner
documents, see where the lead came from and add notes. **Export CSV** downloads the leads you are
looking at (same tab and filters), and opens in Excel with Bangla text intact.

The classic Payload list is still under Leads → Leads for bulk edits and column picking.

## Projects, pages and blog posts
- The right sidebar of a project shows the card as it appears on the website and the project's lead counts.
- The SEO tab shows a Google preview with title and description length counters.
- **Preview** (the eye/external icon next to Publish) opens your unsaved draft on the website. A bar at
  the bottom says you are previewing; press **Exit preview** to go back to the live site.

## Demo data
`pnpm seed:demo-leads` adds 64 fake leads (phones +880100…) for trying the dashboard locally.
`pnpm seed:demo-leads --clear` removes them. Do not run it against production.

## Logo
The admin uses the Branding global: "Logo for light backgrounds" on the sign-in page and the favicon as
the small nav icon. Until those are uploaded it shows the NR placeholder monogram.
