# AGENTS.md — tds-tools-frontend

The public, indexable tools site at `tools.tracht-digital.de` (DE at `/`, EN at `/en/`, same slugs).
It composes the `tds-tool-*` packs via `tds-tools-contract-pkg`'s `toolHost` into a catalog, merges the
admin catalog and premium settings from `tds-ext-tools-pkg`, and shows consent-gated AdSense. Astro
`output: "server"` (`@astrojs/node`, standalone under Passenger) behind a file-backed page cache, on the
journal's `blog` surface. Operator handbook: [TOOLS-PLATFORM.md](TOOLS-PLATFORM.md).

## Commands

```bash
npm install --no-package-lock   # local pack work: --install-links (then restore package.json)
npm run dev
npm run type-check              # astro check, 0 errors
npm run test:run                # vitest
npm run lint:primitives         # fails on a control without a shared class
npm run build                   # prebuild syncs OCR assets; postbuild assembles release/
npm run og:smoke                # after any OG renderer change
npm run audit:geo -- <url>
```

## Hard rules

- Stay **public and indexable**; never set `data-frontend`; keep `data-surface="blog" data-flat`.
- Every control carries a shared class; never hand-author a radius or re-declare a shared class.
- A Tailwind utility can't override a tds-shared class on the same element; use a wrapper or `global.css`.
- `postcss.config.mjs` and the `@source` lines (tds-shared + every pack) are required.
- `.htaccess` sets only `Options -Indexes`.
- Every meta description is 80 < n ≤ 160, titles ≤ 60 and never brand-leading, in both languages.
- No free or time-limited initial consultation, no named customer, "Sie" form; CTA "Unverbindlich anfragen".
- Every manifest icon needs a path in `Icon.astro`. NAP values are verbatim copies of the landing page's.
- OCR assets are served from this site; never let tesseract.js call a CDN.
- `TDS_SITE_KEY` comes from `process.env`; it must also be set in the host's Node app environment.
- Deploys only via the manual `release.yml`; there is no `dev.yml`.

## Topic files

| File | Read before |
|---|---|
| [docs/agents/architecture.md](docs/agents/architecture.md) | Changing composition, the catalog, routes, PWA, site key or shared site helpers |
| [docs/agents/design-surface.md](docs/agents/design-surface.md) | Changing styles, the header, brand mark, catalog grid, shadows or build CSS |
| [docs/agents/seo-content.md](docs/agents/seo-content.md) | Changing titles, descriptions, JSON-LD, OG cards, hreflang, guides or marketing copy |
| [docs/agents/premium-and-account.md](docs/agents/premium-and-account.md) | Touching `ToolGate`, `PremiumNote`, the account menu or the language switch |
| [docs/agents/ocr-assets.md](docs/agents/ocr-assets.md) | Touching `scripts/sync-ocr.mjs` or `public/ocr/` |
| [docs/agents/testing.md](docs/agents/testing.md) | Writing or changing tests |
| [docs/agents/deployment.md](docs/agents/deployment.md) | Changing workflows, `.htaccess`, env or host setup |

Workspace rules: `../CLAUDE.md`. Cross-repo state: `../MIGRATION-STATUS.md`.
