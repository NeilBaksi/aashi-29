# ARCHITECTURE — aashi-29

## Stack
Vite + React 19 + TypeScript + Tailwind v3 + framer-motion + lucide-react.
Mirrors the `Ask` project's proven config (same tsconfig/eslint/postcss
shape) rather than introducing Tailwind v4 — one fewer thing to debug on a
short-lived project.

## Folder map
```
src/
  content.ts          — ALL copy + structured data (itinerary, people, etc). Source of truth.
  index.css           — Tailwind layers, grain utility, reduced-motion.
  main.tsx / App.tsx  — entry, section composition.
  components/
    Header.tsx         — sticky nav + mobile sheet (built)
    Footer.tsx          — sign-off (built)
    Countdown.tsx       — shared countdown digits component
    QrCode.tsx           — renders a pre-generated QR SVG for Memories
  sections/
    Hero.tsx, Stay.tsx, Itinerary.tsx, Pack.tsx, Food.tsx,
    Important.tsx, Memories.tsx   — one per nav anchor id
  lib/
    time.ts            — AEST/AEDT-aware now/countdown/happening-now
    time.test.ts        — the one runnable check for time.ts logic
    ics.ts               — itinerary[] → .ics Blob/string
    weather.ts            — Open-Meteo fetch + static fallback
public/img/            — hero-aashi.jpg, stay-sunset.jpg (kept originals),
                          generated illustrations, qr-drive.svg
docs/                   — PRD.md, DESIGN.md, ARCHITECTURE.md (this file), CONTENT.md
scripts/check.mjs      — imports lib/*.ts, runs assertions, `npm run build` depends on it
```

## Data flow
`content.ts` is the only place copy/schedule data lives. Section components
import from it directly — no context/store needed for a static one-page
site. `lib/time.ts` reads `itinerary` from `content.ts` to compute the
"happening now" item; `lib/ics.ts` reads the same array to build events.

## Timezone handling (important — read before touching itinerary/time code)
The weekend straddles the Victorian DST switch: **AEDT starts 2am Sunday 4
October 2026**. So:
- Fri 2 Oct & Sat 3 Oct events are `+10:00` (AEST).
- Sun 4 Oct events are `+11:00` (AEDT).

`content.ts` itinerary items encode this explicitly per item
(`iso: '2026-10-02T09:30:00+10:00'` vs `'2026-10-04T09:00:00+11:00'`) —
**do not** compute the offset in code from a single "Australia/Melbourne"
constant; for this one-off, fixed-date weekend, hardcoding the correct
offset per item in the data is simpler and correct (ponytail: no
timezone-library dependency for three known dates). `lib/time.ts` should
parse `iso` with `new Date(iso)` (offset-aware) and compare directly against
`new Date()` (which is always UTC-correct regardless of the viewer's own
timezone) — never re-derive Melbourne wall-clock time from the viewer's
local zone.

`lib/time.ts` contract:
```ts
export function getHappeningNow(now: Date): { day: ItineraryDay; item: ItineraryItem } | null
export function getUpNext(now: Date): { day: ItineraryDay; item: ItineraryItem } | null
export function getCountdown(now: Date): { days: number; hours: number; minutes: number; seconds: number; isPast: boolean }
```
Countdown target = first Friday item's `iso` (`2026-10-02T09:30:00+10:00`).
"Happening now" = an item whose `iso` ≤ now < `iso + durationMin`; items
without `iso`/`durationMin` are never "now" (they're sub-bullets of the
previous timed item).

## Weather
`lib/weather.ts` fetches Open-Meteo (no API key, free):
```
https://api.open-meteo.com/v1/forecast?latitude=-37.15&longitude=146.25&daily=temperature_2m_max,temperature_2m_min&timezone=Australia%2FMelbourne&start_date=2026-10-02&end_date=2026-10-04
```
On fetch failure/non-200/timeout (~5s `AbortController`), fall back to the
static copy already in `content.ts.pack.weatherBlurb` — the UI must never
show a loading spinner that hangs or an error state; it silently shows the
static line.

## localStorage keys
- `aashi29:packing` — `string[]` of checked item labels (from
  `packingChecklist`).
Namespaced with the project name so it never collides with another site on
the same browser profile.

## Build / deploy
- `vite.config.ts` — `base: process.env.VITE_BASE ?? '/'`, dev/preview port
  **5729** fixed.
- GitHub Pages: Actions workflow builds with `VITE_BASE=/aashi-29/`, deploys
  `dist/` (same shape as the `Ask` project's working workflow — reuse it).
- Vercel: import repo as-is, no env var needed (`base` defaults to `/`).
- `npm run build` = `tsc -b && vite build && node scripts/check.mjs` — the
  check script must pass for the build to succeed.

## Testing strategy
One runnable check (`scripts/check.mjs`, plain Node + `assert`, no test
framework — matches `Ask`'s pattern) covering: happening-now selection at a
handful of sample instants across all three days including the DST
boundary, countdown math at a known instant, and `.ics` output (event count
matches itinerary items with `iso`, `TZID`/offset correct, no malformed
lines). Everything else here is static content + CSS — no test needed for
that (ponytail: YAGNI applies to tests too).
