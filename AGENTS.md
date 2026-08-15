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
- **This site renders on the `panel` surface** — the same layer the admin frontend
  and the customer portal use. `<html data-surface="panel">` in `Layout.astro`
  selects `tds-shared/styles/surfaces/panel.css`: 8px product-UI geometry, 0.75rem
  chips, softly elevated cards and the navy accent axis. `global.css` imports
  `base.css` → `primitives.css` → `app.css` → `surfaces/panel.css`.
  - It was the `marketing` surface until 2026-08-05. A tool site reads as a piece
    of software, not as a brochure, so it now matches the products it belongs to.
  - **`app.css` IS imported** (it was not, under `marketing`): the panel's card
    elevation and hover lift live there, scoped to `[data-surface="panel"]`, so
    without it `.tds-card` renders flat here while the panels lift. The dashboard
    chrome it also carries (`.portal-sidebar`, `.nav-item*`, `.stat-tile*`) is
    simply never used — this is a public catalog, not a dashboard.
  - **`data-frontend` is deliberately unset**, which resolves `--tds-panel-accent`
    to the base `--color-primary` (brand navy) — the same accent the customer
    portal renders. Setting it to `admin` would paint this **public** site in
    `--color-management`, the burgundy that signals management rights, which is
    exactly the claim a public catalog must not make. (Since tds-shared 0.20.1 the
    base accent is the navy and ADMIN is the override; tds-shared's
    `design.test.ts` fails the build if the management red ever moves into the
    base block, because this site is what would inherit it.)
  - The page canvas is `--tds-panel-canvas` on `<body>`, because app.css scopes
    that tint to `.panel-main` and this site has no such wrapper. Without it cards
    sit on the same white they are made of.
    - **Since tds-shared 0.23.0 ("Digitale Maßarbeit") `<body>` also restates
      the two soft brand fields** that `[data-surface="panel"] .panel-main`
      paints in app.css, for the same reason: there is no `.panel-main` here to
      inherit them from. They are `background-attachment: fixed` so a long tool
      page does not repeat them down the scroll. **If the panel's canvas is
      retuned in tds-shared, retune this with it** — the tokens
      (`--tds-decor-*`) are shared, the two gradient declarations are not.
  - **The hero carries `.tds-brandbar--on-dark`** under its `<h1>`. The `--on-dark`
    run is not optional there: the band is a fixed dark surface in both themes,
    and the bar's light bordeaux segment sinks into it.
  - **Still a PUBLIC, indexable site.** The surface choice is geometry and colour
    only — the panel products are `noindex`, this one must never become so.
  - **Don't hand-author a radius and don't re-declare a shared class** — set the
    token in the surface layer in tds-shared and bump. (The convention used to be
    the opposite, "geometry stays app-local", and that is exactly what let one
    design drift into three separately-maintained variations.) `.tool-badge*` was
    a live example: it re-implemented `chip--warning`/`chip--info` with a
    hand-authored 999px radius, so the badges kept marketing pill geometry after
    the surface moved. Deleted — use `.chip` + a shared variant.
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

## Tests

`npm run test:run` (vitest). 47 tests over `lib/catalog.ts` and `ToolGate.tsx`;
the `.astro` pages stay on `astro check` + the real build.

- **`virtual:tools-catalog` is aliased to `test/fixtures/tools-catalog.ts`.**
  The real module is generated by `toolHost()` during `astro build`, so it does
  not exist under vitest. The fixture mirrors a real composition — a free tool,
  one with `requiresLoginDefault`, one premium with a price — so every branch of
  the default→override merge is exercised.
- **`toolsData()` memoises for the whole build**, so each test re-imports via
  `vi.resetModules()`. Without that the first test's catalog leaks into the rest.
- **The ads guard is deliberately strict** (`enabled === true` *and* a non-empty
  `publisherId`). Loosening it to `a && a.enabled` fails three tests — verified.
  Ads must never ship from a partial or error response.
- **A non-OK catalog response must be ignored wholesale.** The test feeds a 500
  whose body *would* change the result if applied; asserting only "3 tools came
  back" passes with or without the `res.ok` guard and proves nothing. (It did,
  until a mutation caught it.)
- **`ToolGate` is asserted to fail closed.** Treating a failed `/auth/me` as
  authed, or a failed entitlement probe as entitled, each fails several tests.
  It is a paywall, not DRM — premium tools ship their bundle regardless — but
  the flow must still never reveal the body without a real grant.

## Commands

```bash
npm install --no-package-lock
npm run type-check   # astro check — 0 errors gate
npm run test:run     # vitest — catalog + access gate
npm run build        # → dist/
```

Deploy: `dev.yml` (push→dev, demo), `release.yml` (manual→release + webhook).
