# DESIGN — aashi-29

## Direction contract (locked — see `index.html` comment for the canonical copy)
**Seed:** `alpine-apres-birthday-01`
**Thesis:** Editorial "alpine après-ski" mood, not a party flyer — warm film
photography, hand-painted gouache mountain vignettes, paper grain, plum ink
on cream. One scrolling page, real header nav (the old site's biggest miss).
**Anti-slop:** no gradient blobs, no glassmorphism card grids, no generic
sparkle/emoji icon sets standing in for real art, no centered-everything
hero. Real asymmetric editorial layout. Content-first — the copy is funny and
specific ("questionable amount of food"); let it carry the page instead of
burying it under decoration.

## Palette
Evolved from the Canva site's own five colours (`#441828 #fcf8f1 #ebdbc6
#f9c2a6 #e2a9f1`), pulled toward a real editorial palette:

| Token | Hex | Use |
|---|---|---|
| `paper` | `#fcf8f1` | page ground |
| `paper-card` | `#f5ecdd` | card surfaces |
| `paper-deep` | `#ebdbc6` | borders, deep cards |
| `ink` | `#441828` | headings, primary text |
| `ink-soft` | `#6b3345` | secondary text |
| `apricot` | `#f4b494` | primary accent / CTAs |
| `apricot-deep` | `#e69567` | CTA hover, focus ring |
| `lilac` | `#d9a6ec` | secondary accent — sparing, one or two touches per section |
| `pine` | `#2f4a3a` | after-dark sections (footer, midnight itinerary beat) |

Contrast: `ink` on `paper` and `paper-card` clears AA for body text (ink
#441828 on #fcf8f1 ≈ 10.9:1). `paper` on `pine` ≈ 8.7:1. Don't put `ink-soft`
below 14px on `paper-deep` — check before shipping new combinations.

## Type
Revised from an initial Fraunces + Figtree pairing — tasteful but the exact
pairing every "editorial AI site" reaches for by default. Replaced with a
combination that's less generic and gives the hero somewhere to be genuinely
loud, the way the original Canva site's hand-lettered title was.

- **Display** (`font-display`) — Petrona, a warm editorial serif with real
  character in its `a`/`g` (wght 400–800 + italic), for section headings,
  day headings, house-rule numbers, dress-code titles. Not Fraunces —
  distinctive without being a display gimmick, holds up at both a 96px hero
  numeral and a 16px card heading.
- **Body/UI** (`font-sans`) — Nunito, a soft rounded humanist sans (wght
  400–800), for paragraphs, nav, buttons, labels. Replaced Schibsted Grotesk
  — too sharp/newspapery for this theme; Nunito's rounded terminals sit
  warmer against Petrona's serif curves and the alpine-editorial mood.
- **Script** (`font-script`) — Barracuda Script, ONE loud accent face
  (Neil's own font, picked to match the original Canva site's hand-lettered
  title energy), used only for the hero's three-line title (`Hero.tsx`) and
  the closing signature ("AASHI x" in `Important.tsx`) as a bookend. This is
  the site's single permitted "party invite" moment — everywhere else stays
  in the editorial voice per the anti-slop thesis above. Never use
  `font-script` for body copy, nav, or anything that needs to stay
  comfortably legible at small sizes — brush scripts don't scale down.
  **Self-hosted**, not a Google Font: TTF lives at
  `src/assets/fonts/BarracudaScript-Regular.ttf`, `@font-face` in
  `src/index.css` (relative `url()` so Vite hashes/bases it correctly — a
  raw `public/fonts/...` path breaks under the GitHub Pages `/aashi-29/`
  base, same trap the hero/stay photos were originally in, fixed alongside
  this). **License:** confirm this font's license permits web-embedding
  before a public launch — a "desktop" font purchase often doesn't include
  webfont rights; check the vendor's terms or ask them directly.
- Petrona and Nunito load via one Google Fonts `<link>` in `index.html`
  (matches the Ask project's pattern — no extra `@fontsource` dependency
  for those two).
- Tabular numerals for the countdown and itinerary times (`font-variant-
  numeric: tabular-nums` utility where digits change on a timer).

## Motion (framer-motion + apple-design feel)
- Entrance reveals: `opacity`/`y` fade-up on scroll (`whileInView`), 400–600ms,
  `ease-out-expo`, staggered by ~40–60ms per sibling. Nothing re-animates on
  every scroll direction change — `viewport={{ once: true }}`.
- Header active-section underline: shared-layout spring (`layoutId`).
- Countdown digits: flip/roll only on the ones digit changing, not the whole
  block re-rendering.
- Respect `prefers-reduced-motion` globally (see `src/index.css`) — reveals
  become instant, parallax disabled.

## Component inventory
- `Header` — sticky nav, mobile sheet, active-section tracking (built).
- `Footer` — sign-off + back-to-top (built).
- `Hero`, `Stay`, `Itinerary`, `Pack`, `Food`, `Important`, `Memories` —
  section components, one per nav anchor, each `export default function`
  with no props (content imported directly from `src/content.ts`).
- Shared visual language: `.grain` utility (paper texture), `shadow-card`,
  rounded-2xl cards on `paper-card`, thin `paper-deep` rules between list
  items instead of boxed borders everywhere.

## Image style guide + generation prompts
Two originals are kept exactly as-is (do not regenerate):
`public/img/hero-aashi.jpg` (Home), `public/img/stay-sunset.jpg` (Stay).

Everything else: hand-painted gouache illustration, consistent style, no
stock photography, no people's faces (keeps it evergreen if reused/shared).
Shared suffix for every prompt below:

> hand-painted gouache illustration, warm film-grain texture, muted palette
> of plum #441828, cream #fcf8f1, oat #ebdbc6, apricot #f4b494, pine green
> #2f4a3a, soft lilac accents, visible brush strokes on textured paper, cream
> background, no text, no people's faces, editorial magazine style, calm
> composition

1. **Hero backdrop** — wide Victorian Alps ridge line at golden hour, layered
   hills fading into haze. 21:9.
2. **Road trip** — small vintage car on a winding mountain road with snow
   gums. 4:3.
3. **Breakfast stop** — café table: pancakes, flat white, marmalade jar. 1:1.
4. **BBQ night** — timber deck, grill smoke, string lights, board games on
   the table, dusk. 4:3.
5. **Mountain day** — hiking boots on a rocky summit trail, alpine view. 4:3.
6. **Birthday dinner** — long candlelit table, neutral linens, wine glasses.
   4:3.
7. **After-dinner** — vinyl turntable + headphones, disco light spill on a
   wooden floor. 1:1.
8. **Cake** — two-tier cream cake, one lit candle, dried flowers. 1:1.
9. **Packing flat-lay** — knit jumper, beanie, puffer, sneakers, thermos.
   4:5.
10. **Sunday** — coffee cup + slice of leftover cake on a bed tray, morning
    window light. 4:3.
11. **Texture tile** — plain gouache paper texture, seamless. 1:1.

The generated illustrations are in `public/img/` as optimized JPEGs; original
PNG generations are retained in `design-assets/generated/`. The itinerary uses
the road-trip, mountain-day, and Sunday illustrations; Food uses the BBQ,
cake, and breakfast illustrations; Pack uses the packing flat-lay. The hero
backdrop, birthday dinner, after-dinner, and texture tile remain available for
future layout use. Until an illustration is wired into a section, keep the
existing flat `paper-card`/`pine` treatment with `.grain` — never a broken
image or a stock placeholder.

## Accessibility (vercel-skills pass)
- All interactive targets ≥44×44px.
- Visible focus ring (`apricot-deep`, 3px) on every focusable element, never
  `outline: none` without a replacement.
- Landmarks: `header`, `main`, one `section` per nav anchor with `aria-
  label` or heading, `footer`.
- Images: originals get real alt text; decorative illustrations get
  `alt=""`.
- Countdown/weather regions use `aria-live="polite"` where they update.
