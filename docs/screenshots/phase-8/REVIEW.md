# Phase 8 review: SEO, performance, Bangla content

Screenshots of the Bangla site at 375 / 768 / 1440 after the Bangla seed: home, a project page,
the blog list and an area page. No page scrolls sideways at any width.

## Round 1 (found and fixed)

- `/bn` showed English page copy. The seed now writes first-draft Bangla for every page, project,
  post, area, testimonial, team member and setting. No English is left apart from names and codes.
- The home page had no `<title>` or description (an empty value overrode the site default). Fixed.
- Title, description and share tags were streamed into the page body for normal browsers, which
  link previews and Lighthouse miss. They now always sit in `<head>`.
- Chrome repeated the first request on every page (~0.6 s on mobile) because of a header Payload
  adds for the admin. It now applies to `/admin` only.
- Accessibility: stats, project facts and floor-plan markup fixed; Lighthouse accessibility is 100
  on every page tested.

## Round 2 (left for the content review)

- Numbers mix Bangla and Latin digits (`৫ কাঠা` vs `5 কাঠা`, `৳ 1.28 Cr`). Values typed in the admin
  are shown as typed, so the client can choose either style per field. Worth deciding in the
  native-speaker review.
- The Bangla blog list has a small layout shift (CLS 0.15) while the Bangla font loads.
- All Bangla is a first draft and must be reviewed before launch.
