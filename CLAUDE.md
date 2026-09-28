# aashi-29

Aashi's 29th birthday getaway site — Mount Buller, 2–4 October 2026. Rebuild
of a friend's Canva site (https://aashis29birthday.my.canva.site/) as a
single scrolling page with real header nav, better visuals, and a few useful
guest features (countdown, live itinerary, weather, photo upload).

Read `docs/PRD.md`, `docs/DESIGN.md`, `docs/ARCHITECTURE.md`, `docs/CONTENT.md`
before making changes — they're the contract this project was built against.

## Commands
- `npm run dev` — dev server on **port 5729** (fixed, `strictPort`)
- `npm run build` — typecheck + build + `scripts/check.mjs`
- `npm run check` — just the runnable logic check
- `npm run lint`

## Rules specific to this repo
- **Content is verbatim.** Every string in `src/content.ts` came from the
  original Canva site. Don't paraphrase or "improve" copy — if wording needs
  to change, that's Neil/Aashi's call, not a build-time decision.
- **Commit author:** snb.1996@gmail.com. No `Co-Authored-By` trailer (other
  emails/trailers break Vercel deploy for this account — see user memory).
- **Two photos are fixed assets, not generated:** `public/img/hero-aashi.jpg`
  (Home) and `public/img/stay-sunset.jpg` (Weekend & Stay) — kept as-is from
  the original site, do not replace with AI-generated art.
- **Deploy target:** GitHub Pages *or* Vercel. `vite.config.ts` reads
  `VITE_BASE` so the Pages workflow can set `/aashi-29/` while local dev and
  Vercel use `/`.
