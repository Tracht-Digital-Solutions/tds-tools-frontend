# Architecture

## Composition and routing

- `astro.config.mjs` → `toolHost({ packs })` composes the tool manifests and serves
  `virtual:tools-catalog` (data) and `virtual:tools-components` (id → component).
- Routing is the site's own `src/pages/tools/[slug].astro` (the template owns layout, SEO, ads and the premium
  gate). **No `getStaticPaths()`** (illegal on an on-demand route): both language routes resolve the tool
  through `~/lib/toolRoute` and answer 404 themselves, so a tool switched off by the admin stops existing
  instead of rendering an indexable empty page.
- **A page template exists once:** `components/CatalogPage.astro` and `components/ToolPage.astro`; the route
  files under `pages/` are a few lines each.
- `lang` reaches tool islands through the pack shells (`<Tool lang={lang} />` → `tools/*.astro` → island).
  Packs default to German, so an older pack renders German islands under `<html lang="en">`. To verify
  locally: `npm install --install-links ../tds-tool-*-pkg`, build, grep the EN page for an English label, then
  `git checkout -- package.json` (it rewrites ranges to `file:`).

## Catalog = manifest defaults + admin overrides

`src/lib/catalog.ts` fetches `GET /tools/catalog` (served by `tds-ext-tools-pkg`) and merges enabled,
requires-login, premium, price and ads config onto manifest defaults; `toolsData()` is memoised.

- A failed or absent fetch, or `PUBLIC_DEMO_MODE=true` → manifest defaults with **ads off**; the site always
  renders.
- A non-OK response is ignored wholesale.
- The ads guard is strict: `enabled === true` **and** a non-empty `publisherId`.
- Panel-edited guides come from `GET /tools/guides` and are merged by `src/lib/guideOverrides.ts` (an emptied
  panel field withdraws the override).

## Premium

Premium tools require login; the entitlement is bound to `userId` and checked against the frontend API. Free
tools stay anonymous. Premium pages suppress ads. Details: [premium-and-account.md](premium-and-account.md).

## Site key (`TDS_SITE_KEY`)

The credential this site presents for its catalog and guide reads, issued under
*Einstellungen → Site-Verbindungen*. It also authenticates the `/install` registry sync (the legacy
`registry_token` works for one more release). Optional: unset, the site behaves as before.

- **`process.env`, never `import.meta.env`.** Only `PUBLIC_*` names are inlined, and a `PUBLIC_` prefix would
  ship the credential in the bundle.
- **A `throw` from the fetch helper doesn't fail anything** (the catalog fetch is fail-soft).
  `siteKeyGuard()` throws in `astro:build:done`, outside every `try/catch`.
- **The rejection list hangs off `globalThis`**; config and pages are separate module graphs.
- `src/lib/siteKey.ts` is a thin binding of tds-shared's `createSiteKeyGuard`.

**Open host issue:** under SSR, module load is server boot, and the host doesn't set `TDS_SITE_KEY` (CI sets
it only for the build step). Request-time reads therefore go out keyless. Harmless while enforcement is
`off` / `warn`; under `enforce` they would 401, `assertKeyAccepted()` would return early (no key configured),
and the site would silently serve manifest defaults with ads off. **Fix: set `TDS_SITE_KEY` in the Plesk Node
app's environment** before enforcement moves to `enforce` (`tds-gateway-api/DEPLOY-PLESK.md` §3.2).

## Shared from tds-shared (≥ 0.46)

| Concern | Source |
|---|---|
| Release packing | tds-shared's `scripts/pack-release.mjs` as `postbuild` |
| Site key guard | `createSiteKeyGuard`, `guardSiteKey` from `tds-shared/site` |
| Content reads | `createContentReader`, `memoisedOr` from `tds-shared/site` |
| Sitemap / JSON-LD helpers | `escapeXml`, `serializeJsonLd` from `tds-shared/site` |

Still per site, on purpose: `app.cjs` (identical to tds-shared's, so `npm start` works from the checkout),
`public/.htaccess`, `src/lib/pageCache.ts` (configuration), `src/components/AdSlot.astro` (a copy once lost its
`lang` prop and labelled English ad units in German; a copy doesn't stay a copy).

## Ads

The AdSense loader body is raw (`is:inline define:vars={{ adsClient }}`); never wrap it in a template literal.
It injects `adsbygoogle.js` only after `tds-ad-consent === "granted"`, reusing tds-shared's `CookieNotice` in
consent mode. Labels are a neutral "Anzeige".

## Phone, PWA and navigation

- On a phone the site is an app (tds-shared ≥ 0.47): `AppChrome.astro` in `Layout.astro` renders the shared
  bottom tab bar (Katalog · Kategorien · Suche · Mehr) with `tds-shared/app` sheets; the header keeps wordmark
  and account and tucks away while scrolling. No top bar on the phone. `header.test.ts` pins it.
- Hide the desktop cluster on a **wrapper**, never on the `.btn` itself.
- Theme and language are saved via `tds-shared/prefs` (cookie on `.tracht-digital.de` + account sync).
- PWA: `src/pages/manifest.webmanifest.ts`, `src/pages/sw.js.ts` (prerendered; worker version = build time),
  `/offline` and `/en/offline` listing tool pages this device kept. Tool pages opened once work offline.
- Page transitions: tds-shared's `page-transitions.css` cross-fades pages (opacity only, off under reduced
  motion). No scroll reveal. `motion` is bundled into the server build via `motionSsrNoExternal`. In Playwright,
  hover before clicking, or Chrome aborts the cross-document transition.

## Sibling links

Header nav, hero band and footer link *Blog* and *Startseite*; URLs live once in `lib/site.ts` as `links`.
`lib/surface.test.ts` asserts both links in both components.
