# AGENTS.md — tds-tools

Authoritative architecture/gotcha doc for the public tools site. Read before
non-trivial changes.

## What this is

The public, indexable static site at `tools.tracht-digital.de`. Composes
`tds-tool-*` packages (via `tds-tools-contract`'s `toolHost`) into a tool catalog;
consent-gated AdSense; admin-controlled catalog + premium from `tds-ext-tools`.
A standalone Astro `output:"static"` product modelled on `tds-landingpage` /
`tds-blog` — NOT the noindex panel host.

## Architecture

- **Build-time composition.** `astro.config.mjs` → `toolHost({ packs })` composes
  the tool manifests and serves `virtual:tools-catalog` (data) +
  `virtual:tools-components` (id → Component). Routing is the site's own
  `src/pages/tools/[slug].astro` via `getStaticPaths()` over the catalog (the
  template owns the Layout/SEO/ads/premium chrome, so it can't live in the
  contract).
- **Catalog = manifest defaults + admin overrides.** `src/lib/catalog.ts` fetches
  `GET {CATALOG_API_URL}/tools/catalog` (served by `tds-ext-tools`) at build time
  and merges enabled/requires-login/premium/price + ads config onto the manifest
  defaults. A failed/absent fetch or `PUBLIC_DEMO_MODE=true` → manifest defaults,
  ads OFF (the site always builds; **this is why the free tools ship independently
  of the not-yet-deployed `tds-core-panel-api`**). Memoised for the whole build.
- **Premium gate (Phase 3).** Premium tools require login; entitlement is bound to
  `userId` and checked against the panel API. Free tools stay anonymous. Premium
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
  (@tailwindcss/postcss doesn't rebase the woff2 urls → fonts 404).
- **AdSense loader body is raw** (`is:inline define:vars={{ adsClient }}`) — never
  wrap it in a template literal (leaks braces into dist). Consent-gated: the
  loader only injects `adsbygoogle.js` after `tds-ad-consent === "granted"`.
  Reuses `tds-shared`'s `CookieNotice` (consent mode). Neutral "Anzeige" labels.
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
