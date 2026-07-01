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
