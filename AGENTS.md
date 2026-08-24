# AGENTS.md — BuildArena 2.0 Construction Challenge

Orientation doc for AI agents working in this repo. Read this before making changes — it's
meant to save you from re-deriving context that's already been figured out.

## What this is

A **display-only** competition website for BuildArena Season 1 ("To Infinity, and Beyond").
The site never handles submissions itself — every "join / submit" action routes out to an
external Kaggle competition page. Bilingual (EN default / 中文 toggle), retro-arcade space
visual theme.

```
docs/                                      Spec + planning docs (see below)
web/                                       The actual frontend app — all commands run from here
web/public/BuildArena-Challenge-EN/ZH.md   Auto-generated from content.ts, do not hand-edit (see scripts/export-md.ts)
BuildArena v2.0 web端意见汇总/              Local feedback notes — gitignored, NEVER git add / commit this folder
```

Read `docs/CONTENT.md` (information architecture + bilingual copy source of truth) and
`docs/DESIGN.md` (visual design system) before making content or style changes — they predate
the code and most of the site still follows them, though the code has since evolved past what
they describe in some places (see "Drift from the docs" below).

## Stack & commands

React 19 + Vite 8 + TypeScript 6 + Tailwind CSS v4 + shadcn/ui. All work happens in `web/`.

```bash
cd web
npm install
npm run dev      # http://localhost:3000/ConstructionChallenge/ (base path matters, see vite.config.ts)
npm run build     # tsc -b && vite build — ALWAYS run this after edits, it's the fastest way to catch mistakes
npm run lint      # oxlint src
npm run export:md # regenerates web/public/BuildArena-Challenge-EN/ZH.md from content.ts
```

There is no test suite. `build` + `lint` passing is the bar for "done." There is no browser/
screenshot tool available in this environment — you cannot visually verify layout/CSS changes
yourself. Say so explicitly and ask the user to eyeball it after any visual change, especially
anything involving responsive breakpoints or animation.

Deploys to GitHub Pages as a project site (`base: "/ConstructionChallenge/"` in
`vite.config.ts`), via `.github/workflows/`. It's a pure static site — no backend, no server
code is possible here (relevant if a future ask involves "collect emails" / "send notifications"
type features; those need a third-party service, see the `gameKeyForm` / Feishu form pattern
below for how that was handled).

## Architecture

```
web/src/
  App.tsx                 # Top-level tree: I18nProvider > Background, NavBar, <main>{sections}</main>, CtaFooter
  main.tsx
  index.css               # Design tokens (CSS vars + Tailwind @theme), utility classes, global styles
  lib/utils.ts             # cn() = clsx + tailwind-merge
  config/
    links.ts               # LinkKey-typed registry of ALL external URLs. Add new links here, never inline a raw URL in a component.
    season.ts               # SEASON_START_UTC constant — currently only consumed by the (unused) Countdown feature
  hooks/
    CountdownContext.tsx    # CountdownProvider/useCountdown — built for a season-start countdown, NOT currently mounted in App.tsx (see below)
  i18n/
    I18nContext.tsx          # I18nProvider/useI18n() — lang state (localStorage-persisted, defaults to "en" always, does NOT read navigator.language)
    content.ts                # THE content source of truth: `en` and `zh` objects, `Content = typeof en`. Every UI string lives here, none hardcoded in components (except a few tiny English-only labels like aria-labels).
  components/
    ui/                       # shadcn primitives, themed zero-radius/arcade (button, card, badge, tabs, table, accordion, sheet, tooltip, separator)
    layout/                   # Background, NavBar, Section/SectionHeading, Countdown (unused), GameKeyOffer
    sections/                 # One file per page section, see App.tsx for the render order
```

### i18n pattern

Every section component does:
```tsx
const { t } = useI18n()
const x = t.someNamespace   // matches a top-level key in content.ts
```
`content.ts` has two objects, `en` (defines the shape) and `zh: Content = {...}` (must match
that shape exactly — TypeScript will fail the build if a key is missing/renamed in only one of
them). When adding a new string, add it to **both** `en` and `zh`. Multi-line copy uses `\n` —
`index.css` sets `white-space: pre-line` globally on text elements, so `\n` renders as a real
line break without needing `<br/>`.

### Design system (index.css)

- Zero border-radius everywhere (`--radius: 0`). Hard, offset "sticker" shadows instead of soft
  shadows/rounding — see `.shadow-arcade`, `.shadow-arcade-blue`, `.shadow-arcade-orange`,
  `.shadow-arcade-kaggle` utility classes (all follow the same pattern: bright color for
  border, an offset hard shadow in a *deeper* shade of the same color family, e.g.
  `--ba-crimson-bright` border + `--ba-crimson-deep` shadow).
- Color tokens are all CSS vars prefixed `--ba-*`, then re-exposed as Tailwind utilities via
  `--color-*` in the `@theme inline` block (e.g. `--ba-crimson` → `--color-crimson` →
  `bg-crimson`/`text-crimson`/`border-crimson` all become available). If you add a new brand
  color, follow this same two-step registration or the Tailwind class won't exist.
- `Button` (`components/ui/button.tsx`) has a `variant="kaggle"` in addition to the shadcn
  defaults — reserved specifically for buttons that link to `LINKS.kaggle`, using Kaggle's own
  brand blue (`#20beff`) so those CTAs are recognizable/distinct from the site's crimson
  default. Don't reuse this variant for non-Kaggle links.
- `prefers-reduced-motion: reduce` is respected for the one animated element on the site (the
  Hero Kaggle button's breathing glow, `.animate-breathe-kaggle`). Keep that pattern if you add
  more animation — this site deliberately uses motion sparingly (1-2 focal elements, not
  ambient/everywhere).

### Notable non-obvious things

- **`Countdown.tsx` / `CountdownContext.tsx` / `config/season.ts` are dead code, intentionally
  kept.** A season-start countdown (hide Join buttons until T-0) was built, shipped, then the
  competition launched early and it was ripped out of `App.tsx` and every section — but the
  files themselves were deliberately left in place, still compiling, in case a future season
  needs the same mechanism. Don't delete them without asking; don't be surprised they're
  unused; don't wire them back up without being asked to.
- **`Organizers.tsx` is unused/dead.** Its content was superseded by an inline block in
  `CtaFooter.tsx` (`id="organizers"`). Don't edit `Organizers.tsx` expecting it to affect the
  site — it doesn't render anywhere.
- **`GameKeyOffer.tsx`** (an orange "fill this form, get a free Besiege Steam key"
  callout+button, linking to `LINKS.gameKeyForm`, a Feishu form) is reused in both `Hero.tsx`
  and `HowItWorks.tsx`/`CtaFooter.tsx` contexts. It has a hand-rolled CSS speech-bubble tail
  (a rotated square, bordered only on two adjacent edges + clipped via an `overflow-hidden`
  wrapper) — if you need another pointer/tail shape elsewhere, copy that technique, it avoids
  the classic double-border-seam artifact of the naive version.
- **`HowItWorks.tsx`** groups its 5 steps into 3 color-coded phases (Prepare/orange,
  Compete/crimson, Submit/kaggle-blue) via a `PHASE_STYLES` lookup keyed by `phase.key`, laid
  out as 3 equal-height grid columns on `md:`+. The Kaggle submit button lives *inside* the
  Submit column (not a separate section below), centered in the leftover vertical space.
- **`LINKS.seasonReminder` and `LINKS.gameKeyForm`** point to the literal same Feishu form URL
  — `seasonReminder` is legacy (kept only so `Countdown.tsx` still compiles), `gameKeyForm` is
  the current, actually-used key. Use `gameKeyForm` for anything new.
- No backend exists or can exist (GitHub Pages, pure static). Anything requiring
  storage/email-sending was solved by delegating to a third-party form (Feishu) rather than
  building infra — keep that pattern in mind if asked for similar "collect X from users"
  features.

### Drift from `docs/CONTENT.md` / `docs/DESIGN.md`

Those docs describe the *original* v1 IA/design and are still mostly accurate, but the repo has
since diverged in a few places they don't reflect: the Season-1-countdown flow (added then
removed), the "3-step" `HowItWorks` redesign (was originally spec'd/built as 12 literal steps),
the game-key giveaway funnel, and the Kaggle-blue button variant. Treat the docs as background/
intent, not as a literal current-state spec — trust the code (and this file) over them when they
disagree.

## Working conventions established in this repo

- Run `npm run build && npm run lint` after every edit, before saying you're done.
- Only commit when explicitly asked to. Never touch `BuildArena v2.0 web端意见汇总/`.
- For anything with real visual/UX ambiguity (colors, spacing, animation feel, layout on a
  screenshot the user shares), state clearly that you can't see the rendered result yourself
  and ask the user to confirm after they refresh — don't claim it "looks right."
- Prefer adding to existing patterns (a new `LINKS` entry, a new `content.ts` key, a new
  `shadow-arcade-*` utility, a new `Button` variant) over inventing a parallel one-off way of
  doing the same kind of thing.
