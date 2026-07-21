# tds-tools

The **public tools site** — `tools.tracht-digital.de`. A static Astro site that
composes tool packages (`tds-tool-*`) into a catalog of free, browser-based
digitalisation tools, monetised with consent-gated Google AdSense and steered
from the admin panel (`tds-ext-tools`).

Public, indexable, no login for free tools. It is the tools-platform sibling of
`tds-landingpage` / `tds-blog` — a standalone static product, **not** part of the
noindex panel host.

> **Operator handbook:** `TOOLS-PLATFORM.md` is the hands-on guide (local dev,
> release, deploy, admin config, **how to add a new tool**).

## How it composes

`astro.config.mjs` spreads `toolHost({ packs })` (from `tds-tools-contract/astro`)
and lists the tool packages. `toolHost` composes the manifests (hard-erroring on
an id/slug collision) and serves two virtual modules:

- `virtual:tools-catalog` — the flattened catalog (index page + `getStaticPaths`).
- `virtual:tools-components` — an `id → Component` map the `/tools/[slug]`
  template renders.

Adding a tool = publish a new `tds-tool-*` package, add it to the `packs` array +
`package.json`, release.

## Catalog + ads config

`src/lib/catalog.ts` fetches the admin-controlled catalog (enabled / requires-login
/ premium / price + the AdSense config) from `tds-ext-tools`' public
`GET /tools/catalog` at build time, merged onto the manifest defaults. A
failed/absent fetch (or `PUBLIC_DEMO_MODE=true`) falls back to the manifest
defaults with ads OFF — so the site always builds, even before the panel backend
is deployed. An admin change fires a rebuild (the `RebuildTrigger` pattern).

## Commands

```bash
npm install --no-package-lock   # needs a GitHub PAT with read:packages (NPM_TOKEN)
npm run dev
npm run build                   # → dist/ (the static artifact deployed)
npm run preview
npm run type-check              # astro check — the correctness gate (0 errors)
```

### Local dev before the packages are published

The `tds-tool-*` packages + contract live side-by-side in this working root but
aren't on GitHub Packages yet. To build against the local copies:

```bash
npm install ../tds-shared ../tds-tools-contract \
  ../tds-tool-qr ../tds-tool-textkit ../tds-tool-devkit \
  --no-save --no-package-lock --install-links
```

`--install-links` copies them in as real dirs (Tailwind's `@source` won't scan a
symlink). Keep the published `^` ranges in `package.json` for CI.

## Env

| var | purpose |
|---|---|
| `CATALOG_API_URL` | base URL of the catalog API (default `https://api.tracht-digital.de`) |
| `PUBLIC_DEMO_MODE` | `true` → static fallback catalog, ads off (dev branch) |
| `PUBLIC_AUTH_API_URL` | auth base for the premium login gate (Phase 3) |

## Deploy

Continuous: **every push to `main` builds + deploys** to the orphan `release` branch
(`release.yml`, prod config) and pings `DEPLOY_WEBHOOK_URL`. The same deploy is also
dispatched automatically when a dependency package (`tds-tools-contract` /
`tds-tool-*`) publishes a new `@latest` — so a tool update rebuilds the site with no
manual step. Point `tools.tracht-digital.de` at the `release` branch. See
`TOOLS-PLATFORM.md` + `AGENTS.md`.
