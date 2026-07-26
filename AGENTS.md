# AGENTS.md — tds-tools-frontend

Authoritative architecture/gotcha doc for the public tools site. Read before
non-trivial changes.

## What this is

The public, indexable static site at `tools.tracht-digital.de`. Composes
`tds-tool-*` packages (via `tds-tools-contract-pkg`'s `toolHost`) into a tool catalog;
consent-gated AdSense; admin-controlled catalog + premium from `tds-ext-tools-pkg`.
A standalone Astro `output:"static"` product modelled on `tds-landingpage-frontend` /
`tds-blog-frontend` — NOT the noindex frontend host.

## Architecture

- **Build-time composition.** `astro.config.mjs` → `toolHost({ packs })` composes
  the tool manifests and serves `virtual:tools-catalog` (data) +
  `virtual:tools-components` (id → Component). Routing is the site's own
  `src/pages/tools/[slug].astro` via `getStaticPaths()` over the catalog (the
  template owns the Layout/SEO/ads/premium chrome, so it can't live in the
  contract).
- **Catalog = manifest defaults + admin overrides.** `src/lib/catalog.ts` fetches
  `GET {CATALOG_API_URL}/tools/catalog` (served by `tds-ext-tools-pkg`) at build time
  and merges enabled/requires-login/premium/price + ads config onto the manifest
  defaults. A failed/absent fetch or `PUBLIC_DEMO_MODE=true` → manifest defaults,
  ads OFF (the site always builds; **this is why the free tools ship independently
  of the not-yet-deployed `tds-core-frontend-api`**). Memoised for the whole build.
- **Premium gate (Phase 3).** Premium tools require login; entitlement is bound to
  `userId` and checked against the frontend API. Free tools stay anonymous. Premium
  pages suppress ads.

## Gotchas (repo-wide conventions apply — see root CLAUDE.md)

- **`postcss.config.mjs` is REQUIRED.** Tailwind v4 runs through
  `@tailwindcss/postcss` (never `@tailwindcss/vite` — Astro 6/rolldown breaks it).
  Without the postcss config Tailwind never runs — no utilities are generated at
  all (silent: the build succeeds with unstyled output). Don't delete it.
- **`@source` scans the tool packages for Tailwind classes.** `global.css` has
  `@source ".../tds-tool-*/**/*.{astro,tsx}"` AFTER the `@import`s (before →
  error). Without it the flex/grid/gap utilities used inside tool islands are
  never generated (Tailwind ignores node_modules by default). Add one `@source`
  line per new tool package.
- **Fonts are JS imports in `Layout.astro`**, never CSS `@import`s in `global.css`
  (@tailwindcss/postcss doesn't rebase the woff2 urls → fonts 404). The stack is
  Lato / Plus Jakarta Sans / JetBrains Mono, matching tds-shared's tokens. (This
  site was on Geist and carried a local `--font-mono` override, which existed only
  because the shared token used to name a Geist Mono that no app shipped.)
- **This site is the `marketing` surface of the shared design library.**
  `<html data-surface="marketing">` in `Layout.astro` selects
  `tds-shared/styles/surfaces/marketing.css`, which owns the geometry: round pill
  buttons, 6px cards, and the only card elevation of the three surfaces.
  `global.css` imports `base.css` → `primitives.css` → `surfaces/marketing.css`.
  **Don't hand-author a radius and don't re-declare a shared class** — set the
  token in the surface layer in tds-shared and bump. (The convention used to be
  the opposite, "geometry stays app-local", and that is exactly what let one
  design drift into three separately-maintained variations.)
  `app.css` is deliberately **not** imported: it is dashboard chrome
  (`.portal-sidebar`, `.nav-item*`, `.stat-tile*`, `.editorial-grid`) and this site
  renders none of it. The cross-surface primitives it does use (`.status-pill`,
  `.brand-header`) live in `primitives.css`.
- **`--color-border` is an accepted alias of `--color-line`.** The composed
  `tds-tool-*` packs write `border-[color:var(--color-border)]`; that token was
  defined nowhere for a long time, so every one of those borders silently fell
  back to `currentColor`. It resolves now — prefer `--color-line` in new code.
- **AdSense loader body is raw** (`is:inline define:vars={{ adsClient }}`) — never
  wrap it in a template literal (leaks braces into dist). Consent-gated: the
  loader only injects `adsbygoogle.js` after `tds-ad-consent === "granted"`.
  Reuses `tds-shared-pkg`'s `CookieNotice` (consent mode). Neutral "Anzeige" labels.
- **Local dev needs `--install-links`** for the sibling packages (Tailwind won't
  `@source`-scan a symlink); keep published `^` ranges committed.
- **SEO rides along** with any page/section change (title/description/canonical/
  JSON-LD/sitemap). Keywords: "Digitalisierung für Unternehmen" + 21493
  Schwarzenbek bei Hamburg (NAP matches the Impressum).

## Commands

```bash
npm install --no-package-lock
npm run type-check   # astro check — 0 errors gate
npm run build        # → dist/
```

Deploy: `dev.yml` (push→dev, demo), `release.yml` (manual→release + webhook).
