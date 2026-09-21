# BuildArena 2.0 — Construction Challenge

Season 1 competition site. **Display-only** — submissions are routed to Kaggle.

Stack: **React 19 + Vite 8 + TypeScript 6 + Tailwind CSS v4 + shadcn/ui**.
Bilingual (EN / 中文), retro-arcade space theme migrated from the legacy `#challenge` page.

## Repository layout

```
docs/                    # competition spec + planning docs
  BuildArena Competition Spec v0.1.md
  CONTENT.md             # information architecture + bilingual copy
  DESIGN.md              # design system
web/                     # the frontend app (all commands below run here)
```

## Develop

```bash
cd web
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
cd web
npm run build    # tsc -b && vite build  → web/dist/
npm run preview  # preview the production build
npm run lint     # oxlint src
```

## Web app structure

```
web/src/
  index.css              # design tokens + utilities + CSS backdrops (see docs/DESIGN.md)
  config/links.ts        # external links (PLACEHOLDERS to replace before launch)
  i18n/                  # I18nContext + bilingual content dictionary
  components/ui/         # shadcn components (themed: zero-radius arcade style)
  components/layout/     # Background / NavBar / Section / SectionHeading
  components/sections/   # Hero, Season, Tracks, HowItWorks, Scoring,
                         # Submission, Leaderboard, Awards, Faq, CtaFooter
```

## Before launch

Replace placeholders in `web/src/config/links.ts`: `kaggle`, `icmlPaper`, `repo`,
`besiege`, `dlc`, `discord`, `email`.

Planning docs: [`docs/CONTENT.md`](docs/CONTENT.md) · [`docs/DESIGN.md`](docs/DESIGN.md)

## Season 1 archive results

The S01 leaderboard uses `web/src/data/s01-results.json`, a public-field snapshot of the scoring repository. The source SHA-256 is included for traceability. All 40 ranked teams are shown; mode/search filters retain global ranks. Awards use the cash recipients after team-level roll-down. Review is complete; the final S01 results and award winners have been announced on Kaggle. The three organizer-confirmed community recipients are maintained separately in `web/src/data/s01-community-awards.json`; they are not recalculated from the earlier questionnaire or overwritten by the technical-results importer. Community recipients are mutually exclusive with each other and with technical cash recipients. S02 keeps its existing leaderboard.

To refresh from the validated scorer output, run from `web/`:

```bash
node scripts/import-s01-results.mjs <path-to-results/result.json> <path-to-raw_submissions/projects_index.json>
npm run build
npm run lint
```

The importer checks contiguous ranks, unique teams, technical eligibility, finite scores, award de-duplication, and Kaggle writeup links. It only exports display fields, not private transcripts, adjudication evidence or local filesystem paths.
