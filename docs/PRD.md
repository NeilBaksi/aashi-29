# PRD — aashi-29

## Problem
A friend built a birthday-weekend info site in Canva (5 hamburger-nav pages,
stock art, weak on mobile). Content is good and must be kept verbatim; the
presentation isn't. Guests need one place, easy on a phone at a campsite with
patchy signal, that answers: where, when, what to wear, what to eat, what's
happening right now.

## Audience
~10 named guests (see `docs/CONTENT.md` → People) + Aashi, mostly viewing on
phones, several checking the itinerary live during the weekend itself
(2–4 Oct 2026).

## Goals
1. Every fact from the Canva site present and correct (address, dates, times,
   dress code, menu, rules, names) — content parity is non-negotiable.
2. Fast, calm, good-looking on a 375px phone first, scales up cleanly.
3. One page, real header nav (not "click the 3 lines" — the old site's own
   copy admits this is a problem).
4. A couple of features that earn their place for an actual weekend, not just
   decoration.
5. Free to host, free to build with (no paid image/API services required to
   function — weather API is free-tier, photo sharing is Google Drive).

## Scope (v1)
- Sections: Home/Hero, The Weekend & Stay, Itinerary (Fri/Sat/Sun), What to
  Pack & Dress Code, Food, The Important Stuff (rules + people + thank you),
  Memories (photo upload).
- Features: countdown to check-in, "add to calendar" (.ics, all itinerary
  items), "happening now / up next" highlight during the actual weekend,
  live Mt Buller-area weather with a static fallback, tickable packing
  checklist (persisted locally), tap-to-copy + map-app links for the address,
  Google Drive upload link + QR code for photos.
- Two original photos kept as-is (hero + stay). All other imagery newly
  generated to a single consistent illustrated style (see DESIGN.md).

## Out of scope (v1)
- RSVP / guest accounts / auth.
- CMS or admin UI — content is a TypeScript file, edited directly.
- Native app / push notifications.
- Multi-event reuse (this is a one-off site for one weekend; no templating
  for "other events" abstraction).

## Acceptance criteria
- All copy in `src/content.ts` matches `docs/CONTENT.md` verbatim.
- Address links open Google Maps (and Apple Maps on iOS) to the correct pin.
- `npm run build` passes (typecheck + `scripts/check.mjs`).
- Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95.
- Works with JS-disabled-adjacent degradation: countdown/weather fail
  gracefully to static text, nothing blocks reading the core content.

## Open items
- Google Drive folder URL — placeholder in `content.ts` (`memoriesDrive`)
  until Neil supplies the real "anyone with link: editor" link.
- Final generated images — prompts in `docs/DESIGN.md`; site ships with
  palette-toned placeholder blocks until images land.
