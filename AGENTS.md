# AGENTS.md — tds-tools-frontend

Authoritative architecture/gotcha doc for the public tools site. Read before
non-trivial changes.

## What this is

The public, indexable site at `tools.tracht-digital.de`, in German at `/` and English at `/en/`. Composes
`tds-tool-*` packages (via `tds-tools-contract-pkg`'s `toolHost`) into a tool catalog;
consent-gated AdSense; admin-controlled catalog + premium from `tds-ext-tools-pkg`.
A standalone Astro **`output: "server"`** product (`@astrojs/node`, standalone,
under Passenger) behind a file-backed page cache, modelled on
`tds-landingpage-frontend` / `tds-blog-frontend` — NOT the noindex frontend host.
It was static until 2026-08-24; anything below still calling it a static build
is describing the shape, not the runtime.

## Architecture

- **Build-time composition.** `astro.config.mjs` → `toolHost({ packs })` composes
  the tool manifests and serves `virtual:tools-catalog` (data) +
  `virtual:tools-components` (id → Component). Routing is the site's own
  `src/pages/tools/[slug].astro` (the template owns the Layout/SEO/ads/premium
  chrome, so it can't live in the contract). **Not `getStaticPaths()`** — that
  is illegal on an on-demand route; both language routes resolve their own tool
  through `~/lib/toolRoute` and answer 404 themselves, so a tool the admin
  switched off stops existing instead of rendering an indexable empty page.
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

- **A tool page's `<title>` comes through `mergeCopy`, and it used to be lost
  there.** `ToolPage.astro` hands `copy.seoTitle` straight to the layout, and
  `mergeCopy` returned `undefined` for that field whenever the panel supplied
  no override — which is every page, because the panel ships none by default.
  All eighteen tool pages therefore rendered an empty `<title>` and an empty
  `og:title` (fixed 2026-09-02; the two SEO fields now fall back to the copy
  that came in, exactly like `name` and `description` beside them).
  Worth knowing because **no gate could see it**: `seo.test.ts` measures
  `tool.seo?.title`, the value in the MANIFEST, not the one that reaches the
  page; a browser shows the URL in the tab when the title is empty, so the
  page still looks right; and the only visible trace is a search result nobody
  is watching. `guideOverrides.test.ts` now pins the fallback in both
  directions, including that an emptied panel field is a WITHDRAWAL of the
  override rather than a blank title.
- **A whole sentence in a `.status-pill` silently widens the document.** The
  pill is an inline label with `white-space: nowrap`; a legal notice inside one
  pushed a 390px viewport out to 1117px. `body { overflow-x: hidden }` clips
  the overhang, so nothing looks wrong — the only way to find it is to measure
  `document.documentElement.scrollWidth` against the viewport. Block messages
  belong in `.tds-alert` (`--success` / `--warning` / `--danger`), which
  tds-shared documents right above the pill rule.

- **The current tds-shared line is `^0.33.0`.** A caret on a `0.x` package is
  minor-locked, so every shared minor needs an explicit repin here. Validate
  it from a fresh `npm install --no-package-lock`; otherwise the installed
  tree can remain on an older surface/cache implementation while every local
  gate stays green.
- **`.htaccess` may not ask for `Options +FollowSymLinks`.** Plesk grants its
  vhosts a restricted `AllowOverride Options=…` that omits it, and an Option the
  host does not allow is **fatal rather than ignored**: Apache answers *every*
  request with 500 and logs `Option FollowSymLinks not allowed here` — the whole
  site, not just the rule that wanted it. It shipped that way with the SSR move
  on 2026-08-24 and took the domain down on every path. `Options -Indexes` is
  all this file may set. Nothing here needs more: per-directory rewriting
  already works under the vhost's own grant (`api.tracht-digital.de` rewrites
  everything with `-Indexes` alone), and the `_tds-cache` symlink is created by
  the same user that owns its target, which satisfies SymLinksIfOwnerMatch. If a
  cache hit ever answers 403, grant it at the **vhost** level in Plesk's
  *Additional Apache directives*, which `AllowOverride` does not restrict.
- **The mobile navigation is shared, and it did not exist here at all until
  2026-08-18 (tds-shared 0.25.0).** The nav used to reflow onto a second
  full-width row below `sm`; there was no hamburger, no panel, nothing to open.
  That is worth remembering as a *class* of defect: it was not a bug anyone
  could see in a diff, and this is a public, indexable property. `Header.astro`
  now hides its desktop cluster at `lg` and opens the shared `.tds-mobile-menu`
  sheet via `mountMobileNav` (`@tracht-digital-solutions/tds-shared/nav`);
  `src/components/header.test.ts` fails if the menu disappears again or if any
  mechanic gets hand-rolled back into this repo.
  - **Hide the desktop cluster on a WRAPPER, never on the `.btn` itself.** This
    file already documented the reason for the CTA: tds-shared is unlayered and
    `.btn`'s own `display` beats a layered `hidden` utility, so
    `hidden lg:inline-flex` on a button does nothing whatsoever. Same for the
    hamburger — its breakpoint belongs to `.tds-menu-toggle`.
  - **The toggle carries `btn btn-ghost tds-menu-toggle`, all three.**
    `lint:primitives` accepts only `btn` / `chip` / `tds-dropdown__*`, so the
    shared geometry class alone would be reported as a bare control.
  - **The panel's labels are bilingual.** `navMenu` exists in both copy tables;
    an `aria-label` is exactly the sort of string that gets left in German, and
    a half-translated surface is the documented failure mode for this site.
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
    `prose.css` is `.tds-prose` long-form typography; the tool pages DO carry
    long-form guides now, and it is still not imported — for the sharper
    reason given in the guide section below. (Under the panel surface
    `app.css` WAS required — it is where the flat variant's hover-lift opt-out
    and the `.panel-main` canvas live.)
  - **`<body>` no longer paints a canvas.** The tinted `--tds-panel-canvas` plus
    the two `background-attachment: fixed` brand fields were the panel's page
    surface, restated here because this site has no `.panel-main`. The journal
    sits on plain `--color-paper` and separates with `--color-soft` blocks, so
    the restatement is gone with the surface it belonged to.
  - **The site is BORDERLESS, and that takes an explicit opt-in:
    `<html data-surface="blog" data-flat>`.** The blog surface's BASE block
    keeps `--tds-border-hairline: 1px` — it is angular and unelevated, not
    edgeless, and an article list separates its rows by their edge. So the
    move off the panel surface on 2026-08-17 silently re-drew an outline
    around every button, chip, boxed input and card here; the site had been
    borderless under `panel` + `data-flat` and simply stopped being so, with
    nothing red anywhere. `data-flat` is back as of 0.13.1, now paired with
    the blog layer in tds-shared 0.25.1.
  - **The variant has TWO HALVES and only one of them is surface-scoped.**
    The fill counterparts live in `primitives.css` under the bare
    `[data-flat]` and reach every surface; the token half
    (`--tds-border-hairline: 0`) is written per surface. Writing the attribute
    on a layer with no pairing therefore gets every fill and none of the
    flattening — an attribute that selects nothing, invisible to `astro
    check`, to the build, and to any test that reads only this repo. So
    `lib/surface.test.ts` asserts against the INSTALLED
    `node_modules/@tracht-digital-solutions/tds-shared/styles/surfaces/blog.css`,
    not against our own source.
  - **Never chase a stray outline with a local `border: 0`.** Four primitives
    separate from their ground ONLY by their edge, and the tool islands hold
    all four (20 `.status-pill`, 10 `.field-boxed`, 6 `.chip`, 5 `.btn-ghost`
    across the seven packs): removing the edge without the fill counterpart
    does not make the page flatter, it makes a boxed input inside a card
    completely invisible with its label colliding into its value. The
    counterparts belong in tds-shared, next to the token.
  - **A card inside a card needed a counterpart of its own** (tds-shared
    0.25.2), and it was found in a browser rather than in a diff: a nested
    `.tds-card` carries its parent's exact `--color-card` fill, so borderless
    it merged into it. On this site the nested card is always the RESULT — the
    QR preview, the contrast sample, the generated password, the generated UTM
    link — i.e. the thing the visitor came to read and copy. Judge a flat
    change by rendering the page, not by reading the diff: walk each box to
    its first opaque ancestor and compare the two `backgroundColor`s.
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
    `z-40` against the shared stacking ladder's 30. The bar is opaque with no
    blur again, because `[data-flat] .brand-header` turns it so: that class
    draws its bottom line with a LITERAL 1px the hairline token cannot reach,
    so the variant is the only thing that can switch it off — and translucency
    over a blurred page is a depth effect, the one thing on a flat page that
    still reads as glass.
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
  - **The site is called TD Tools, and the MARK is the "TD".** Header and
    footer set only `Tools` in type beside `.brand-logo`; the mark carries the
    first half, exactly as the journal's does (`.brand-logo` + *Journal*),
    which is what makes the two public properties read as one brand rather
    than as two sites sharing a font. It was `TDS Tools` written out beside
    the mark until 0.13.1, i.e. the name rendered twice.
  - **`site.name` is the SAME string, because it is where the name is written
    OUT** — the SEO title suffix, the OG eyebrow, the 404, the header's
    accessible name. The rendered mark and the written name have to agree or
    the site is called one thing on the page and another in every search
    result and share card.
  - **Replacing text with a graphic costs an accessible name.** The mark is
    `aria-hidden`, so the header link carries `aria-label={`${site.name} — …`}`
    and the footer restates the `TD` `sr-only`. Without them the brand
    announces as the bare word "Tools". `components/header.test.ts` pins both
    halves plus the absence of a written-out `TD`/`TDS` beside the mark.
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
- **Every tool page carries a long-form guide (`src/content/guides/<slug>.ts`).**
  A tool page used to be a heading, a one-line lede and the tool — about forty
  words. That is thin content, and this site's whole ranking case rests on tool
  queries, where the competition is a hundred identical
  "free-online-converter" pages. What this site can say that they cannot is why
  the tool behaves as it does and that nothing is uploaded, so every guide
  carries a `privacy` paragraph and it is never boilerplate (`guides.test.ts`
  fails on two identical ones — the claim is the same everywhere, but a WLAN
  password is not a JSON blob is not a personnel file).
  - **One object feeds the visible section AND the `HowTo` + `FAQPage`
    nodes.** Google drops a FAQ rich result when the structured answer differs
    from the visible one, and two hand-kept copies of a sentence diverge on
    the first edit.
  - **The guide sits BELOW the tool.** Someone who searched for "qr code
    generator" came to use one; prose between the heading and the input is the
    pattern that made recipe sites a punchline. It is still in the DOM ahead of
    the footer, which is all a crawler needs.
  - **`related` is authored per guide, not derived from the category.** The
    pairings that help a reader (a QR code beside a UTM link) cut across the
    catalog's categories. `RelatedTools.astro` drops a slug that is not in the
    enabled catalog rather than rendering a dead link — the admin can switch a
    tool off at any time.
  - **`guides.test.ts` measures depth, not presence**: ≥ 300 words (the seven
    run 557–683), ≥ 4 use cases, ≥ 3 steps whose description outweighs its
    title, ≥ 3 FAQ with answers over 80 characters, every `related` slug real
    and never self-referential, and every tool linked to from somewhere. A
    guide that decays into four bullet points still renders perfectly, which is
    exactly why it is measured.
  - **It also pins the two positioning rules**, because nothing else can see
    them: no free or time-limited initial consultation is offered on any web
    property (the call is "Unverbindlich anfragen"), no customer is named even
    anonymously, and the copy stays in the "Sie" form the money pages use.
  - **`prose.css` is still not imported**, and now for a sharper reason than
    "no page renders markdown": it styles the DESCENDANTS of a markdown blob
    (`.tds-prose p`, `… ul`), while a guide is structured content whose parts
    each want their own treatment — a two-column case list, a numbered step
    list, a disclosure FAQ. The local `.tool-guide*` block is ~60 lines and
    fights nothing.
- **`vitest.config.ts` has to restate the `~` alias.** Astro resolves it from
  `tsconfig`'s `paths`; vitest does not read those. Without it any module
  importing through `~/…` fails to LOAD under test, which reads as a broken
  suite rather than a failed assertion.
- **The site publishes DE at `/` and EN at `/en/`, with the SAME slugs.**
  `/tools/qr-code-generator` and `/en/tools/qr-code-generator`. That is what
  makes an hreflang pair a pure prefix operation (`localizedPath` /
  `neutralPath` in `lib/seo.ts`) and guarantees the two URLs always name each
  other — the commonest way an hreflang set goes wrong is one side pointing
  at a URL that does not point back. Both sides emit an identical
  de/en/x-default block, and `lib/sitemap.ts` puts the same pairs in the
  sitemap (Search Console only calls a set valid when both agree). This is
  also why an exclusion drops the whole language group: see
  `lib/sitemapExclusions.ts`, where `hreflangGroup()` is the only sanctioned
  way to ask whether a page is excluded.
  - **Where each string lives, and why the split is not arbitrary:** a tool's
    GERMAN name/description/SEO title belongs to its pack manifest, its island
    labels to the pack's own `STRINGS` table, the site chrome AND the ENGLISH
    tool copy to `lib/i18n.ts`, and the long-form guide (both languages) to
    `content/guides`. The English tool copy sits in the site rather than in
    four manifests for the same reason the description BUDGET test already
    did: the packs publish independently, and this is the surface that renders
    those strings into `<title>` and `<meta>`.
  - **A page template exists ONCE.** `components/CatalogPage.astro` and
    `components/ToolPage.astro` hold the bodies; the four route files under
    `pages/` are three lines each. A template that exists twice drifts, and
    the half that drifts is always the one nobody looks at — here, the English
    one.
  - **`lang` reaches the tool ISLANDS through the pack shells** (`<Tool
    lang={lang} />` → `tools/*.astro` → island). Packs default it to German,
    so an older pinned pack keeps working; but until the packs are published
    the local build renders German islands under `<html lang="en">`. Verify
    the wiring with `npm install --install-links ../tds-tool-*-pkg`, build,
    and grep the EN page for an English label — then restore the committed
    `^` ranges (`git checkout -- package.json`), which `--install-links`
    rewrites to `file:` paths.
  - **`EN_ENABLED` in `lib/seo.ts` gates the hreflang block** and must agree
    with the existence of `src/pages/en/` — `seo.test.ts` asserts exactly that.
    An `hreflang="en"` pointing at a 404 invalidates the whole set, the German
    side included.
  - **The language switch links to THIS page in the other language**, never to
    the other home page: a reader who followed a search result to one tool
    wants that tool, and a switch that dumps them on the catalog is why people
    stop using them.
  - **The budgets are properties of the search engine, not of a language.**
    `i18n.test.ts` applies the same 80–160 description and ≤ 60 title bounds to
    the English copy, requires the two languages to differ (an English page
    carrying the German description is indexed as a duplicate of it), and
    requires an English guide for every composed tool — a German article under
    `<html lang="en">` is the exact signal that gets a page classified as thin.
- **Marketing on this site is ONE line (`components/ServiceNote.astro`) plus
  the footer's services column.** Visitors arrived from a search for a tool;
  a boxed call-to-action after every one of them reads as bait, so the note is
  a `--color-soft` block with no card, no second accent and no second CTA.
  The footer column exists as internal linking: before it, this property
  linked to the main domain's home page and nothing else, so no page that
  actually sells anything was ever pointed at from here.
  - **`marketing.test.ts` pins the two positioning rules across BOTH languages
    and every surface that carries copy**: no free or time-limited initial
    consultation is promised anywhere (the classifieds ads offer one, the web
    properties deliberately do not), and no customer is ever named. It also
    pins the canonical CTA — "Unverbindlich anfragen" / "Get in touch". The
    header used to say "Termin vereinbaren", which promises a scheduled
    appointment nobody offered. None of this has a visible failure mode: the
    page renders perfectly and simply makes a commitment the business did not
    intend to make.
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
- **The per-tool descriptions are asserted HERE, not in the six
  `tds-tool-*` repos.** Those publish independently, and this is the surface
  that renders them into `<meta>` — so a pack shipping an over-long or
  duplicate description fails the site build that would have deployed it.
  (The two newest packs assert the same budgets on their own side as well, so
  the failure also lands in the repo that owns the sentence.)

## The language switch and the premium block

- **The DE|EN control is `.tds-lang-toggle` from tds-shared (0.25.3), not a local
  link.** It used to be a single anchor rendering `s.languageOther` — the
  language you are *not* reading — which looks like another nav item and never
  states the current language. The blog had a real segmented switch; the class
  was promoted into the library rather than copied, because a second copy is
  exactly the drift the surface split exists to end.
  - `aria-current="true"` on the active half is what carries the state; `.on` is
    only paint. Setting one without the other renders correctly and lies to a
    screen reader.
  - **Both halves point at the equivalent page** (`localizedPath(path, …)`),
    where the blog's copy points at the two home pages. Deliberate: somebody who
    followed a search result to one tool wants that tool.
  - It renders **twice** — the desktop bar and the mobile drawer's control row,
    beside the theme toggle, because it is a setting and not a destination.
  - `header.test.ts` pins all of the above, including that the class resolves in
    the **installed** tds-shared. That last assertion is the lesson from the
    `data-flat` variant: a 0.x caret can resolve a version predating the
    primitive, and the class then selects nothing — invisible to `astro check`,
    to the build, and to any test that reads only this repo.
  - Known trade-off: the control is 26px tall (24px on phones), matching the
    blog exactly. That is below the 44px touch target the rest of the kit keeps.
    Raising it means changing the shared primitive and therefore the blog too.
- **`PremiumNote.astro` is the only place the paid tier is explained.** The
  paywall, the entitlement and the checkout were all built while nothing on the
  site said what unlocking gets you or that it is a one-off rather than a
  subscription. It derives its list from the catalog, so a tool switched to free
  in `/tools-verwaltung` leaves the block on the next build with no edit here,
  and it renders **nothing at all** when no tool is premium — an empty heading
  promising a tier that does not exist is worse than silence.
  - It is a plain block on the page's own ground, not a card, for the same
    reason `ServiceNote` is: visitors arrived from a search for "qr code
    generator", and a boxed advert after a free-tools catalog reads as bait.
  - It doubles as internal linking — the catalog is the page that actually gets
    crawled, and it now links every premium tool by name.
  - Its copy is scanned by `marketing.test.ts` like all other site copy: no free
    or time-limited initial consultation, no customer ever named, no du-form.
- **The site no longer calls itself free (2026-08-18).** The hero, the tagline
  and the meta description said *"Kostenlose digitale Werkzeuge"* / *"Free
  digital tools"* while 8 of the 14 composed tools are premium. The description
  only ever *named* free tools, so it was not false — but the H1 and the
  `<title>` were claims about the whole site, and the `<title>` is the one users
  read in a search result before deciding to trust it.
  - **The keyword is kept, its scope is corrected.** "kostenlos" now attaches to
    the tools it is true of ("vieles kostenlos" / "much of it free") instead of
    to the property. Dropping the stem entirely would have surrendered the query
    the free tools actually rank on.
  - The descriptions now also name **PDF and Texterkennung**, which are real
    search terms the site had no claim on while its copy listed only the
    original five free tools.
  - Budgets after the change: both titles 54/60, descriptions 155 and 151 of
    160. `seo.test.ts`, `site.test.ts` and `i18n.test.ts` measure all of it.
- **`ToolGate`'s login fallback is the CENTRAL login**
  (`https://auth.tracht-digital.de`), the same default `tds-core-frontend-pkg`
  uses. It used to be `https://app.tracht-digital.de/login` — the customer
  portal, which is not the login UI and no longer serves that route at all. That
  survived only because production supplies `loginUrl` via `tds-runtime.json`,
  so the wrong default was invisible except on a fresh host. The older test
  parsed the href as a `URL` and asserted only the `next` parameter, which is
  why it never looked at the origin; `ToolGate.test.tsx` now pins the origin too.

## The account menu (2026-08-22, tds-shared 0.25.6)

The header carries `AccountMenu` from
`@tracht-digital-solutions/tds-shared/components` — avatar, name, dropdown, top
right, the same control the panel has. This site already knew about the shared
session, but only inside `ToolGate`, for premium tools: a signed-in visitor on
the catalog page saw nothing at all.

- **Signed out it shows a sign-in link** (`loggedOut="login"`), unlike the blog,
  which passes nothing. Here a session unlocks something, so the way in belongs
  in the bar. The link **paints immediately** rather than after the `/me` probe —
  anonymous is the common case on a public site, and making nearly every
  visitor watch the header reflow would be a poor trade for one round trip.
- **It is mounted OUTSIDE the `hidden … lg:flex` cluster**, before
  `#menu-toggle`. Below `lg` that cluster is gone and this is the only control
  beside the hamburger, so inside it the menu would be absent rather than
  smaller. Pinned by `header.test.ts`.
- **Utilities go on the wrapper `<div>`, never on `<AccountMenu>`** — the same
  unlayered-vs-`@layer utilities` trap the CTA above it already documents.
- **Signing out reloads the page.** Not cosmetic: `ToolGate` may already have
  revealed a premium tool's body from the session it probed at mount, so
  leaving the page standing would show an unlocked paid tool to someone who
  just signed out.
- **`ToolGate` and the menu both probe `/auth/me` and do NOT share the memo** —
  the gate still uses its own bare `fetch`. Pointing it at tds-shared's
  `fetchAccount` would collapse the two into one request per page and is the
  named next step; it is a behaviour change to a paywall, so it is not being
  folded into a header change.
- **The panel keeps its shadow on this flat surface, and that is its whole
  separator.** `data-flat` zeroes `--tds-border-hairline`, so the outline is
  gone; the shadow (8% navy at 12px blur) is what makes the panel read against
  the page and against a card beneath it. It deliberately gets no fill
  counterpart in tds-shared's FLAT section — those wash toward `--color-ink`,
  and this panel's usual ground is `--color-paper`, so a wash would move it
  toward the common ground to fix a rare overlap. tds-shared's `design.test.ts`
  pins the shadow.

## The OCR assets are served by this site, and that is the whole privacy claim

`texterkennung` (from `tds-tool-office`) runs tesseract.js, which by default
fetches its worker, its WebAssembly core and its language data from a
third-party CDN. That would make *opening* a tool whose promise is "the image
never leaves your device" contact somebody else, and it drags a foreign host
into the consent story. So the island pins `/ocr/worker.min.js`, `/ocr` and
`/ocr/lang`, and `scripts/sync-ocr.mjs` (a `prebuild` step) fills `public/ocr/`
out of `node_modules`.

- **The language data is COMMITTED** under `public/ocr/lang/` (~2.7 MB, German
  and English, `tessdata_fast`); everything else in `public/ocr/` is generated
  and gitignored. A build that downloaded it would fail whenever that host does,
  and the failure mode is a premium tool that silently stops recognising
  anything. `npm run ocr:fetch-lang` re-fetches when a language is added.
- **The three `-lstm` core builds are all copied.** tesseract.js chooses between
  a plain, a `simd` and a `relaxedsimd` build at runtime; shipping only the one
  your machine picks works locally and 404s on somebody else's. It also wants the
  **single-file** core (`tesseract-core-*.wasm.js`, wasm inlined), not the small
  loader plus a separate `.wasm`.
- **`tsconfig.json` excludes `public/ocr/`.** The worker and the three core
  bundles are generated deploy assets, not application source. After a build,
  `astro check` otherwise parses the minified WASM wrappers and emits millions
  of diagnostic lines before it reaches the real project files. Keep the
  committed language data excluded with the directory too; it has no TypeScript
  surface to validate.
- **The resolver probes paths and deliberately avoids `require.resolve`.** A
  package with an `exports` map — which both new tool packs have — refuses
  `require.resolve("<pkg>/package.json")` with `ERR_PACKAGE_PATH_NOT_EXPORTED`,
  and that throw is indistinguishable from "not installed". It cost one debugging
  round: the script reported a missing dependency for a package sitting right
  there, and the only symptom downstream was an empty `dist/ocr/`.
- The step fails **soft** (a warning) so a missing
  optional dependency cannot take the whole site build down.
- This adds roughly 14 MB to `dist/`. That is the price of not calling a CDN;
  it is served static and gzipped by the host.

## Tests

`npm run test:run` (vitest). 392 tests over `lib/catalog.ts`, `lib/site.ts`,
`ToolGate.tsx` and — as plain text — the layout/CSS surface contract
(`lib/surface.test.ts`). The `.astro` pages otherwise stay on `astro check` +
the real build.

- **`lib/surface.test.ts` reads the markup and the CSS as TEXT**, because
  `.astro` is compiled by neither vitest nor tsc and because the defect it
  guards is invisible to every other gate: a `var(--tds-panel-…)` left behind
  after the surface move type-checks, builds, minifies and then renders in
  base.css's inert navy fallback rather than the surface's accent. It also pins
  `data-surface="blog"`, the PRESENCE of `data-flat` and the absence of
  `data-frontend`, the imported surface layer, and the blog + main-site links
  in header and footer. One assertion deliberately reads the INSTALLED
  tds-shared rather than this repo: the flat variant's token half is
  surface-scoped, so a pin resolving a library without the blog pairing gives
  the site every fill counterpart and none of the flattening, silently.
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

Deploy: `release.yml` only, and only on a manual dispatch (→ the orphan
`release` branch + `DEPLOY_WEBHOOK_URL`). There is no `dev.yml` here: the
release tree is a Node application now, so a deploy onto a host still set up
for static serving takes the site down on every path — that must not be a side
effect of a routine push to `main`.

## Site key (`TDS_SITE_KEY`)

The credential this site presents to the API for its **build-time** catalog read
(`/tools/catalog`). Issued in the admin portal under *Einstellungen →
Site-Verbindungen*, and it also serves as the credential for the `/install`
registry sync — the legacy `registry_token` still works for one release.

Optional: unset, the build behaves exactly as before.

Four things here were each learned by breaking:

- **`process.env`, never `import.meta.env`.** Only `PUBLIC_` names are inlined
  there and this repo declares no `envField` schema — which is precisely how
  `TOOLS_REGISTRY_TOKEN` died. The obvious "fix", a `PUBLIC_` prefix, is worse:
  it inlines the credential into the shipped bundle.
- **A `throw` from the fetch helper does NOT fail the build**, because the
  catalog fetch is fail-soft and returns the static fallback. The first version
  did that and a real build against a 401 stub completed green.
- **`siteKeyGuard()` in `astro.config.mjs`** throws in `astro:build:done`,
  outside every `try/catch`.
- **The rejection list hangs off `globalThis`** — the config and the page
  modules are separate module graphs, so a module-scoped array leaves the guard
  reading zero while the pages record several.

`src/lib/siteKey.test.ts` pins the structural half.

### `TDS_SITE_KEY` is a BUILD secret, and this site is server-rendered now

Unresolved, and host-side — recorded here because nothing in the code can show
it.

`_build.yml` supplies `TDS_SITE_KEY` as an env var **on the build step only**,
and `src/lib/siteKey.ts` reads `process.env.TDS_SITE_KEY` at *module load*.
Under `output: "static"` that was the build, and the key was baked into every
content fetch. Under SSR, module load is **server boot on the host** — where
nothing sets the variable. So the request-time catalog and guide reads go out
with no key at all.

Invisible today, because site-key enforcement is `off`/`warn`. The moment it
moves to `enforce`:

- both reads answer 401,
- `assertKeyAccepted()` returns early — it only records a rejection when a key
  *is* configured, and here `SITE_KEY === ""`,
- the fail-soft `catch` returns `{}`,
- and the site serves manifest defaults with **ads off** and every admin
  override ignored, permanently, with nothing red anywhere.

`siteKeyGuard()` cannot catch it either: it throws in `astro:build:done`, and
the content fetches no longer happen during the build.

**The fix is host configuration**, not code: set `TDS_SITE_KEY` in the Plesk
Node application's environment (alongside the document root and startup file),
so the running server has it. Until then, leave enforcement below `enforce`.
See `tds-gateway-api/DEPLOY-PLESK.md` §3.2.

## Duplicated with the sibling public sites

Six files are byte-identical (or two log-prefix lines apart) across
`tds-tools-frontend`, `tds-blog-frontend` and `tds-landingpage-frontend`:

| File | Delta |
|---|---|
| `scripts/pack-release.mjs` (320 lines) | identical |
| `app.cjs` | identical |
| `src/middleware.ts` | identical |
| `public/.htaccess` | two comment hunks |
| `src/lib/siteKey.ts` | two log-prefix strings |
| `src/lib/pageCache.ts` | two log-prefix strings |

`src/components/AdSlot.astro` is a seventh, and it is the cautionary one: it was
copied from the blog **without** the `lang` prop the original has, so `/en/`
pages labelled their ad units in German until 0.20.0. A copy does not stay a
copy.

The shared home would be `tds-shared` (`siteKey({ prefix })`, a `pageCache`
factory, a `bin` entry for the release packer). Deliberately **not** done in
0.20.0: it drags `tds-shared-pkg` plus both sibling sites into a release cycle
they did not otherwise need, and a `tds-shared` minor then forces repinning
every consumer. Kept as a named follow-up rather than a silent divergence — if
you fix a bug in any of the six, fix it in all three repos.
