# Phase 6 design review

Screens: dashboard and leads inbox at 1440 / 768 / 375, plus the Payload leads list, a project edit page
(card preview sidebar, Google preview on the SEO tab) and the website preview bar. Data comes from
`pnpm seed:demo-leads` (64 fake leads, removable with `pnpm seed:demo-leads --clear`).

## Round 1
- Project thumbnails in "Projects by leads" rendered full size. Fixed to 44px covers.
- Dashboard cards stretched to the tallest neighbour. Grids now align to the top.
- "+1933% vs previous period" from a base of 3 read as noise. Under 10 leads it now shows the raw count.
- Inbox: name and phone ran together, the search box drew a second border, the filter row wrapped
  awkwardly next to the title. Fixed (filters get their own row).
- Drawer answers were squeezed into two columns. Now label / value rows.
- Gravatar avatar showed a broken image. Admin uses Payload's default avatar.
- Nav icon monogram was clipped.

## Round 2
- Notes box sat narrow inside its label. Full width now.
- CSV export: phone numbers got a leading apostrophe from the formula-injection guard. Plain phone
  numbers are now exempt; everything else that starts with = + - @ is still escaped.
- Phone width: a tapped lead opened below the 30-row list. The drawer now opens above it.
- Checked: status change and note save from the drawer, CSV export (signed in 200, signed out 401),
  admin Preview opens the draft with the "Previewing unpublished changes" bar.
