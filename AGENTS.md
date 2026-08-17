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
- **This site renders on the `blog` surface** — the same layer
  `blog.tracht-digital.de` renders. `<html data-surface="blog">` in
  `Layout.astro` selects `tds-shared/styles/surfaces/blog.css`: the flat
  "kantig" kit from the design-system handoff — *"keine Rundungen, kaum Borders
  — Abgrenzung über Farbflächen"*. Every radius collapses to 0, nothing is
  elevated, the display voice runs at 800, and separation comes from colour
  blocks (`--color-soft`, `--tds-flat-tint`, `--tds-flat-hover`) plus 2px accent
  bars. `global.css` imports `base.css` → `primitives.css` →
  `surfaces/blog.css`.
  - **It was `panel` + `data-flat` until 2026-08-17** (and `marketing` before
    2026-08-05). The flat panel was already flat, but it was the *dashboard's*
    geometry and colour axis — 8px cards, 0.75rem chips, `--tds-panel-accent` —
    on a public site whose sibling property is the journal. The two now link to
    each other in both directions and read as one property.
  - **`--tds-panel-*` no longer carries a panel value here, and that does not
    error.** `surfaces/panel.css` is what gives the family real values; base.css
    also declares it with deliberately INERT defaults (accent =
    `--color-primary`, rail = a flat `--color-surface-navy`, canvas =
    `--color-paper`) so a non-panel consumer renders unchanged. A missed
    reference therefore renders in the fallback **navy** — a plausible wrong
    colour, not a blank — on a surface whose accent is the bordeaux. There were
    nine of them; `lib/surface.test.ts` fails the build on the next one.
  - **`app.css` and `prose.css` are NOT imported.** `app.css` is dashboard +
    editorial chrome and scopes every rule on a generic primitive to
    `[data-surface="panel"]`, so on this surface it is dead weight; the blog
    imports it only for `.editorial-grid`, which this site does not render.
    `prose.css` is `.tds-prose` long-form typography and no page here renders a
    body of markdown. (Under the panel surface `app.css` WAS required — it is
    where the flat variant's hover-lift opt-out and the `.panel-main` canvas
    live.)
  - **`<body>` no longer paints a canvas.** The tinted `--tds-panel-canvas` plus
    the two `background-attachment: fixed` brand fields were the panel's page
    surface, restated here because this site has no `.panel-main`. The journal
    sits on plain `--color-paper` and separates with `--color-soft` blocks, so
    the restatement is gone with the surface it belonged to.
  - **Flat here does NOT mean borderless.** The blog surface keeps
    `--tds-border-hairline: 1px` — it is angular and unelevated, not edgeless —
    so `.tds-card`, `.field-boxed`, `.status-pill` and `.chip--neutral` all keep
    their outlines and need none of the fill counterparts the panel's
    `data-flat` variant required. Nothing in the tool islands had to change.
  - **The card hover cue is site-local and lives on `.tool-card`, not
    `.tds-card`.** `.tool-card` is now the journal's flat card: a `--color-soft`
    colour block, no border, no radius, hover deepening the fill to
    `--tds-flat-hover` and growing a 2px accent bar down its left edge —
    `.post-card`'s affordance, expressed with the same shared tokens. It used to
    stack on `.tds-card`, which added a second fill and an outline. `.tds-card`
    still wraps the tool BODY on `/tools/[slug]`, where a bordered panel around
    an interactive form is right.
  - **The header owns none of its own chrome.** Fill, blur and the warm bottom
    hairline come from `.brand-header`. It used to hand-author an 85% canvas
    tint, `backdrop-blur`, a `border-b` *on top of* the shared rule's own, and
    `z-40` against the shared stacking ladder's 30. Note the blur is back: the
    panel's `[data-flat]` variant had turned the bar opaque, and the journal's
    bar is the translucent one.
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
  - **`data-frontend` is still deliberately unset**, and it must stay that way
    even though this site no longer renders the panel. It is the panel layer's
    accent axis: setting it to `admin` there paints a surface in
    `--color-management`, the burgundy that signals management rights, which is
    exactly the claim a public catalog must not make. tds-shared's
    `design.test.ts` pins the other half of that invariant (the management red
    may never move into the panel's base block), and it names this repo as the
    site that would inherit it — so the two files have to stay agreed.
  - **The hero is a flat navy band** (`.tools-hero` = `--color-surface-navy`),
    the journal's own hero treatment, with an `.eyebrow` in coral, a `.display`
    headline carrying one `.accent-italic` word and `.tds-brandbar--on-dark`
    beneath it. It used to be a gradient over the panel's rail tokens — which
    do not exist on this surface, and a gradient is elevation-adjacent anyway.
    The `--on-dark` run is not optional: the band is a fixed dark surface in
    both themes and the bar's light bordeaux segment sinks into it. Same reason
    the eyebrow and the accent word take `--color-accent-pink` rather than
    `--color-accent`: the bordeaux is the light-mode accent and lands ~2:1 on
    navy.
  - **Still a PUBLIC, indexable site.** The surface choice is geometry and colour
    only — the panel products are `noindex`, this one must never become so.
  - **A Tailwind utility CANNOT override a shared class on the same element,
    and this is not a specificity question.** tds-shared's stylesheets are
    unlayered CSS; Tailwind emits its utilities inside `@layer utilities`, and
    unlayered CSS beats every cascade layer regardless of specificity or source
    order. Two live cases, both verified in a browser and both silent in the
    build: `text-[color:var(--color-muted)]` on a `.link-underline` lost to that
    class's own `color: inherit`, so the whole nav rendered in the body ink with
    a dead hover; and `hidden sm:inline-flex` on a `.btn` did nothing at all,
    because the component declares its own `display`. Colour a shared component
    from a rule in `global.css` (that file is unlayered too — see `.tnav-link`),
    or wrap the element and put the utility on the wrapper.
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
  read as one long list with headings in it. The heading is a **display** heading
  in the journal's 800 voice (fluid — at that weight and tracking a fixed
  1.875rem runs to the edge of a 375px phone once the counter sits beside it) +
  a mono tool counter (`toolCountLabel` in `lib/site.ts`, because four of the six
  sections hold exactly one tool) over a short accent **fill** bar, with a wider
  gap between sections. Deliberately no rule under the heading: this surface
  draws almost no borders, so five hairlines would be the heaviest thing on the
  page. `.tds-brandbar` is also wrong here — it is punctuation, and five per page
  is wallpaper. (Until 2026-08-17 the heading was a small uppercase eyebrow in
  the panel accent, which read as a label rather than as a section.)
- **The two sibling properties are linked by name, from three places.** The
  header nav, the hero band and the footer all carry *Blog*
  (`blog.tracht-digital.de`) and *Startseite* (`tracht-digital.de`); the URLs
  live once in `lib/site.ts` as `links`, never inline in markup. The blog links
  here from its own nav and footer (`TOOLS_URL` in its `nav.ts`), so a one-way
  link left this site a dead end for a reader and an orphan for a crawler —
  which is also why the header used to show a bare `tracht-digital.de` domain
  and nothing else. `lib/surface.test.ts` asserts both links exist in both
  components.
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
- **The identity lives in `lib/seo.ts`, the schema renderers in `lib/jsonld.ts`.**
  Both are ports of the landingpage's files of the same names, deliberately
  keeping the function names and shapes. Two rules that are not stylistic:
  - **Every NAP value is a verbatim copy of the landingpage's.** A local
    business signal is worth something only when name, address and phone are
    byte-identical wherever they appear; a paraphrased street reads as a
    *different* business, which is worse than saying nothing. `seo.test.ts`
    greps the landingpage's `seo.ts` for each value, so a change on either
    side fails this build.
  - **The `@id` of the organization is anchored on `tracht-digital.de`,** not
    on this origin, and the page emits ONE `@graph` rather than several script
    blocks. Inside a graph the nodes reference each other by `@id`, so the
    business is described once and merely pointed at from every tool page. A
    second, differently shaped Organization per property is how a brand ends
    up looking like several businesses that share a logo.
- **OG cards are rendered at build time (`src/og/render.ts`), and this was a
  live defect for the whole life of the site.** `Layout.astro` advertised
  `og:image = /og-default.png`, a file that existed in no repo — not in
  `public/`, not in `dist/`. The tag is well-formed, the build is green, and
  the only symptom is a blank card in someone else's preview pane, so nothing
  ever reported it. There are now two renderers: `/og/default.png` (catalog +
  fallback) and `/og/tools/<slug>.png` (one per enabled tool, keyed off the
  same `enabledTools()` as the routes, so a disabled tool leaves no orphan
  image). The card is the JOURNAL's hero band — navy ground, coral eyebrow,
  the three-part brand accent — because a share should look like the page it
  links to.
  - **`npm run og:smoke` after any change to the renderer.** Satori draws
    outside the viewport without warning, so an over-long headline is simply
    missing from the shared image — invisible to `astro check`, vitest and the
    build alike. `headlineSize()` steps the size down at 18 and 26 characters;
    the smoke script renders the longest name the packs currently produce.
  - Colours are literals in that file, not tokens: satori resolves no CSS
    custom properties. The bar is the `--on-dark` run (cranberry · coral ·
    gold) as it resolves in the light theme — a raster card cannot follow the
    viewer's theme.
- **`hreflang` is gated on `EN_ENABLED` (`lib/seo.ts`).** An `hreflang="en"`
  pointing at a URL that 404s invalidates the entire set *including the German
  side*, so the flag and the existence of `src/pages/en/` must agree —
  `seo.test.ts` asserts exactly that. English is mounted under `/en/` with the
  SAME slugs, which makes an alternate pair a pure prefix operation
  (`localizedPath`/`neutralPath`) and keeps the two URLs naming each other.
- **Titles are budgeted too, not just descriptions** (`seo.test.ts`, ≤ 60
  chars, distinct, and never leading with the brand — a site that ranks on
  tool queries must not spend the rendered budget on a word nobody searched
  for).
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

`npm run test:run` (vitest). 102 tests over `lib/catalog.ts`, `lib/site.ts`,
`ToolGate.tsx` and — as plain text — the layout/CSS surface contract
(`lib/surface.test.ts`). The `.astro` pages otherwise stay on `astro check` +
the real build.

- **`lib/surface.test.ts` reads the markup and the CSS as TEXT**, because
  `.astro` is compiled by neither vitest nor tsc and because the defect it
  guards is invisible to every other gate: a `var(--tds-panel-…)` left behind
  after the surface move type-checks, builds, minifies and then renders in
  base.css's inert navy fallback rather than the surface's accent. It also pins
  `data-surface="blog"`, the absence of `data-frontend` / `data-flat`, the
  imported surface layer, and the blog + main-site links in header and footer.
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
