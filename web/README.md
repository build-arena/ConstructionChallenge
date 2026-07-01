# BuildArena 2.0 — Construction Challenge (Web)

Season 1 competition site. **Display-only** — submissions are routed to Kaggle.

Stack: **React 19 + Vite 8 + TypeScript 6 + Tailwind CSS v4 + shadcn/ui**.
Bilingual (EN / 中文), retro-arcade space theme migrated from the legacy `#challenge` page.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build    # tsc -b && vite build  → dist/
npm run preview  # preview the production build
npm run lint     # oxlint src
```

## Structure

```
src/
  index.css              # design tokens + utilities + CSS backdrops (see docs/DESIGN.md)
  config/links.ts        # external links (PLACEHOLDERS to replace before launch)
  i18n/                  # I18nContext + bilingual content dictionary
  components/ui/         # shadcn components (themed: zero-radius arcade style)
  components/layout/     # Background / NavBar / Section / SectionHeading
  components/sections/   # Hero, Season, Tracks, HowItWorks, Scoring,
                         # Submission, Leaderboard, Awards, Faq, CtaFooter
```

## Before launch

Replace placeholders in `src/config/links.ts`: `kaggle`, `icmlPaper`, `repo`,
`besiege`, `dlc`, `discord`, `email`.

Planning docs: [`../docs/CONTENT.md`](../docs/CONTENT.md) · [`../docs/DESIGN.md`](../docs/DESIGN.md)
