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
  `GET /tools/catalog` on the gateway (served by `tds-ext-tools-pkg`) at build time
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
  - **`tds-shared` needs its own `@source` line, and this repo was the one app
    of six that lacked it** (fixed 2026-08-16). The shared React islands are
    built from utilities too — `ThemeToggle` is `inline-flex w-9 h-9
    rounded-full … hover:bg-black/5` — so `.w-9` / `.h-9` / the hover tint were
    never emitted here and the theme toggle shipped as a bare **18×18** icon
    with no target box and no hover feedback, against 36×36 everywhere else.
    No error, no warning; it survived a redesign and two release rounds.
    **Judge this by grepping the BUILT css** (`grep -c '\.w-9' dist/_astro/*.css`),
    not by reading the diff — and grep the escaped form, since a search for
    `hover:bg-black/5` never matches what Tailwind emits.
- **Fonts are JS imports in `Layout.astro`**, never CSS `@import`s in `global.css`
  (@tailwindcss/postcss doesn't rebase the woff2 urls → fonts 404). The stack is
  Lato / Plus Jakarta Sans / JetBrains Mono, matching tds-shared's tokens. (This
  site was on Geist and carried a local `--font-mono` override, which existed only
  because the shared token used to name a Geist Mono that no app shipped.)
- **This site renders on the `panel` surface, in its FLAT variant** — the same
  layer the admin frontend and the customer portal use.
  `<html data-surface="panel" data-flat>` in `Layout.astro` selects
  `tds-shared/styles/surfaces/panel.css`: 8px product-UI geometry, 0.75rem chips
  and the navy accent axis, with **no self-outlines and no card elevation**.
  `global.css` imports `base.css` → `primitives.css` → `app.css` →
  `surfaces/panel.css`.
  - **`data-flat` (tds-shared 0.24.2) is what makes the site borderless**, and it
    is an opt-in on the panel layer rather than a change to it: the admin
    frontend and the customer portal render the same file and keep their
    hairlines, where a dozen equal-weight dashboard cards need the edge to read
    apart. Overlays (modal, dropdown) keep their depth on purpose — flat is
    about the page, not about what floats above it.
  - **Flat is not achieved by deleting borders here.** Four shared primitives
    separate from their ground *only* by their edge and get a fill counterpart
    in tds-shared's "FLAT variant" section: `.field-boxed` (whose `--color-card`
    fill is the same fill as the `.tds-card` it sits in — a borderless boxed
    input inside a card is an invisible input, and the tool islands use ten of
    them), `.status-pill`, `.chip--neutral`, `.btn-ghost`. Read that section
    before adding a control; the browser is the only thing that reports a miss.
  - **The card hover cue is site-local and lives on `.tool-card`, not
    `.tds-card`.** It used to be `border-color: accent` plus the panel's shadow
    lift, and flat removes both — so the catalog card now changes its FILL on
    hover (`global.css`). Deliberately not on `.tds-card`: the tool page wraps
    its non-interactive body in one, and tinting that would claim it does
    something.
  - **The header owns none of its own chrome any more.** Fill, blur and bottom
    edge come from `.brand-header` + its `[data-flat]` variant. It used to
    hand-author an 85% canvas tint, `backdrop-blur`, a `border-b` *on top of* the
    shared rule's own, and `z-40` against the shared stacking ladder's 30 — and
    it could not have gone flat locally anyway, because `.brand-header` draws its
    border with a literal 1px that no app-level class can reach.
  - It was the `marketing` surface until 2026-08-05. A tool site reads as a piece
    of software, not as a brochure, so it now matches the products it belongs to.
  - **Choosing the surface is not the same as USING it.** The surface layer only
    sets tokens; they reach an element through a shared class. Until 2026-08-16
    the markup wrote its own geometry — `rounded-2xl` (16px) for the gate box and
    the tool box while `--tds-radius-card` is 8px, `rounded-lg` buttons, and in
    the tool packs `rounded-full` tabs that kept the **marketing** pill long after
    the site had moved here. So the site declared the panel surface and did not
    look like it. Every control now carries `btn` / `chip` / `field-boxed` /
    `tds-card`, and `npm run lint:primitives` (CI step) fails the build on a bare
    one. Never hand-author a radius here.
    - Do **not** reach for `rounded-[var(--tds-radius-card)]` as a middle ground:
      Tailwind does not generate arbitrary values out of a package inside
      `node_modules`, so in the tool packs that ships as *no rule at all*.
    - The one deliberate exception is the password-strength meter's
      `rounded-full` — a 6px readout, not a control, and a capsule on every
      surface. It is commented as such at the call site.
  - **`app.css` IS imported** (it was not, under `marketing`). It used to be
    imported to GET the panel's card elevation and hover lift; since the flat
    variant it is imported partly to switch that lift OFF — the overlay drawing
    it is an `::after` in that file, and `--tds-elevation-card: none` only clears
    the *resting* shadow. It also carries the canvas and page-head rules this
    site reads. The dashboard chrome (`.portal-sidebar`, `.nav-item*`,
    `.stat-tile*`) is simply never used — this is a public catalog, not a
    dashboard.
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
- **The brand mark is `.brand-logo` (tds-shared), not an `<img>`.** The asset is
  `public/brand/td-logomark.webp` — byte-identical to the landingpage's and the
  blog's copy — and it is used as a CSS *mask* over `--color-primary`, so the
  mark follows the theme instead of needing an inverted second file. Only the
  URL and size are local (`--tds-brand-logo-mask`, `--tds-brand-logo-size` in
  `global.css`); never override `--tds-brand-logo-ratio`, whose default matches
  this exact asset (713×483). A box with the wrong aspect letterboxes the
  `contain`-fitted mask and renders the mark undersized with nothing to say so.
  The site carried no mark at all until 2026-08-17 — header and footer were text
  wordmarks — so a visitor arriving from `tracht-digital.de` saw no continuity.
- **Category sections are strengthened typographically, not structurally.** Every
  `ToolDef` has always carried a `category` and `index.astro` has always grouped
  by it; with 7 tools over 6 categories those sections run 1–2 cards and the page
  read as one long list with headings in it. The heading is now an eyebrow in the
  accent colour + a tool counter (`toolCountLabel` in `lib/site.ts`, because
  four of the six sections hold exactly one tool) over a short accent **fill**
  bar, with a wider gap between sections. Deliberately no rule under the heading:
  this surface is flat, so five hairlines would be the heaviest thing on the
  page. `.tds-brandbar` is also wrong here — it is punctuation, and five per page
  is wallpaper. The bar matches `.tds-page__head::before`, the panel's own 3px
  accent mark.
- **Every icon a manifest declares needs a path in `Icon.astro`.** The lookup is
  `paths[name] ?? "M4 4h16v16H4z"`, so a missing key is completely silent: the
  tool renders a blank square on its card *and* in its page heading, with nothing
  logged. `file-text` (the premium PDF tool) shipped that way. `lib/site.test.ts`
  now reads the component as text and asserts a path exists for every composed
  tool's icon — an `.astro` file is compiled by neither vitest nor tsc, so the
  test has to treat it as a string.
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
- **Every meta description has ONE budget: 80 < n ≤ 160**, asserted in
  `lib/site.test.ts` for `site.description` AND for every composed tool.
  `site.description` shipped at **201** characters until 2026-08-16, so the
  SERP cut everything from "Von Tracht Digital Solutions, 21493 Schwarzenbek
  bei Hamburg" onward — the site published a description that identified
  nobody, keeping only the generic half. A meta description has **no visible
  failure mode**: nothing renders wrong, nothing errors, the page looks
  perfect, and the tail is simply absent from a search result nobody is
  looking at. That is why it is measured rather than reviewed.
  Order matters: concrete tool names first (this site ranks on tool queries),
  brand + town in the tail where they still fit inside the cut.
- **The per-tool descriptions are asserted HERE, not in the four
  `tds-tool-*` repos.** Those publish independently, and this is the surface
  that renders them into `<meta>` — so a pack shipping an over-long or
  duplicate description fails the site build that would have deployed it.

## Tests

`npm run test:run` (vitest). 61 tests over `lib/catalog.ts`, `lib/site.ts` and `ToolGate.tsx`;
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
