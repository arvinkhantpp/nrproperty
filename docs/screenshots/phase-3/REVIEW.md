# Phase 3 design review

Screenshots at 375 / 768 / 1440 for every public page (seeded placeholder content).

## Round 1 findings and fixes
- Media URLs were absolute (`http://localhost:3000/api/media/...`), which next/image rejected. Upload URLs are now made relative to the site.
- Project page: the address repeated the area name. It now shows the address, or the area when there is none.
- Project page: nine key facts in a four-column grid left one orphan card. Now three columns.
- Project page: "Nearby" sat at half width when no map URL is set. It now spans the row in two columns.

## Round 2
- No horizontal overflow at any width.
- Book-a-visit modal tested end to end: validation messages show, the lead is saved with UTM data, and the visitor lands on /thank-you.
- Production build: /projects filters and pagination render per request; unknown paths return the localized 404.

The dark "N" circle in the corner of the screenshots is the Next.js dev indicator, not part of the site.
