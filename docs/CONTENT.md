# CONTENT — provenance

Source: https://aashis29birthday.my.canva.site/ (Canva-hosted, 5 pages behind
a hamburger menu: Home, The Weekend & Stay, What To Pack & Dress Code, Food,
The Important Stuff). Extracted 2026-09-28 by decoding the page's embedded
`window['bootstrap']` JSON (Canva ships content as data, not HTML — a plain
fetch/WebFetch only returns an empty JS shell).

All verbatim copy now lives in `src/content.ts`, typed and structured by
section. That file is the source of truth for the running app; this doc
records where it came from and what was deliberately dropped.

## Kept as-is
- Both photos: `public/img/hero-aashi.jpg` (Home page hero — Aashi holding a
  slice of cake) and `public/img/stay-sunset.jpg` (Weekend & Stay page —
  sunset picnic on a deck), pulled from the Canva site's own media CDN at
  original resolution, then re-compressed with `sips` (no quality-affecting
  crop/edit).
- Every line of copy, every emoji, the exact address, all times, the full
  itinerary, dress code, menu, house rules, and the ten names.

## Dropped (deliberately)
- The Canva site's own hamburger-menu-only navigation ("Click the 3 lines at
  the top for more") — replaced with a real header, which is the entire
  point of the rebuild.
- Watercolour bunting clip-art, the embedded Google Maps static screenshot,
  and other generic Canva stock art/icons — replaced with a single
  consistent illustrated style, see `docs/DESIGN.md`.
- An embedded iframe to a third-party hiking listing page
  (`mansfieldmtbuller.com.au/listing/timbertop-summit-walk/`) — kept as a
  plain outbound link instead of an iframe embed (simpler, no sandboxing
  concerns, same destination).

## Links carried over
- Marmalades directions (Google Maps `dir` link) → `src/content.ts` `links.marmaladesDirections`.
- Timbertop Summit Walk listing → `links.timbertopWalk`.
- Address → geocoded into a clean Google Maps *search* URL (`address.mapsUrl`)
  rather than reusing Canva's route-specific directions URL, so it works
  regardless of where the visitor is starting from; an Apple Maps equivalent
  was added (`address.appleMapsUrl`) since it wasn't in the original.

## New (not in the original)
- Google Drive "Memories" upload section + QR code — original site had no
  photo-sharing mechanism.
- Countdown, "happening now", live weather, packing checklist — see
  `docs/PRD.md` Goals/Scope for rationale.
