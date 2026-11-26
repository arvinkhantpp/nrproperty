# Phase 1 design review

Screenshots at 375 / 768 / 1440 px (`pnpm screenshots`), two review rounds on the holding home page, `/styleguide`, `/bn/styleguide` and the 404 page.

## Round 1 → fixes

- **Gold text failed contrast.** `gold-text #8A6A3A` measured 4.47:1 on cream and 4.03:1 on sand, below the 4.5:1 the brief requires for 12px eyebrows. Darkened to `#7F6034` (5.2:1 cream, 4.7:1 sand). Visually almost identical.
- **Muted text on sand** was 4.49:1. `#5E6B66` → `#5A6762` (4.8:1).
- **Gold eyebrows on forest** were 3.97:1. Added `gold-light #D9BC8A` (taken from the mobile design's hero eyebrow) and a `forest` tone, so components on green sections switch automatically.
- **Loading buttons looked disabled** (50% opacity). Loading now keeps full colour and shows only the spinner.
- **Wrapped field errors** had the icon centred against two lines; it now sits on the first line.
- **Section dividers** ran wider than the content column; moved inside the container.
- **Screenshot script** missed lazy images below the fold; it now scrolls the page first.

## Round 2

All fixed items verified at 375, 768 and 1440. No horizontal overflow at any width. Bangla renders in Hind Siliguri with looser leading (1.28) so conjuncts don't collide.

## Deliberate changes from the references

- Italic accent on light backgrounds uses `gold-text`, not `gold`: `gold` on cream is 2.8:1.
- Project card adds a price row with a round arrow, so every card ends on the number buyers scan for.
- Placeholder photos are the 768px previews from the design canvas; the full-size ones are needed before launch (the hero looks soft at 1440).
