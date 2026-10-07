# Surface, styling and build CSS

## The `blog` surface, borderless

`<html data-surface="blog" data-flat>` in `Layout.astro` selects tds-shared's `surfaces/blog.css`, the same
layer as `blog.tracht-digital.de`: no radii, nothing elevated, display voice at 800, separation by colour blocks
(`--color-soft`, `--tds-flat-tint`, `--tds-flat-hover`) and 2 px accent bars. `global.css` imports `base.css` →
`primitives.css` → `surfaces/blog.css`.

- **`data-flat` is an explicit opt-in.** The blog base block keeps `--tds-border-hairline: 1px`; without
  `data-flat`, every button, chip, input and card gets an outline.
- **The variant has two halves.** Fill counterparts live in `primitives.css` under bare `[data-flat]`; the token
  half (`--tds-border-hairline: 0`) is written per surface. `lib/surface.test.ts` asserts against the
  **installed** tds-shared `surfaces/blog.css`.
- **Never chase a stray outline with a local `border: 0`.** Four primitives separate from their ground only by
  their edge (`.status-pill`, `.field-boxed`, `.chip`, `.btn-ghost`); removing the edge without the fill
  counterpart makes them invisible. Counterparts belong in tds-shared.
- **A nested `.tds-card` needs its counterpart** (tds-shared ≥ 0.25.2); on this site it is always the result the
  visitor came for. Judge flat changes in a browser: walk each box to its first opaque ancestor and compare
  `backgroundColor`s.
- **`--tds-panel-*` has no value here** and falls back to an inert navy without error. `lib/surface.test.ts` fails
  on any reference.
- **`app.css` and `prose.css` are not imported.** `app.css` scopes its rules to the panel. `prose.css` styles
  markdown descendants, while guides are structured content with their own ~60-line `.tool-guide*` block.
- `<body>` paints no canvas; the page is plain `--color-paper` with `--color-soft` blocks.
- **`data-frontend` stays unset.** It is the panel's accent axis; `admin` would paint the management burgundy,
  a claim a public catalog must not make. tds-shared's `design.test.ts` pins the other half.

## Shared classes, never local geometry

- Every control carries `btn` / `chip` / `field-boxed` / `tds-card`; `npm run lint:primitives` (CI) fails on a
  bare one.
- **Never hand-author a radius** and don't use `rounded-[var(--tds-radius-*)]` (Tailwind generates no arbitrary
  value from `node_modules`). The one exception: the password meter's `rounded-full`, commented at the call site.
- **Don't re-declare a shared class**; set the token in tds-shared and bump. Use `.chip` + a shared variant
  instead of local badges.
- **A Tailwind utility can't override a shared class on the same element.** tds-shared is unlayered CSS; Tailwind
  utilities sit in `@layer utilities`, and unlayered CSS wins regardless of specificity. Colour shared components
  from a rule in `global.css` (also unlayered, see `.tnav-link`) or put the utility on a wrapper.
- `.status-pill` is a one-word label (`white-space: nowrap`); a sentence inside one widened a 390 px viewport to
  1117 px, hidden by `body { overflow-x: hidden }`. Block messages use `.tds-alert`. Measure
  `document.documentElement.scrollWidth`.
- `--color-border` is an accepted alias of `--color-line`; prefer `--color-line` in new code.

## Header, hero and brand

- **The header owns none of its chrome**: fill, blur and the bottom hairline come from `.brand-header`, and
  `[data-flat] .brand-header` makes it opaque without blur.
- **The hero is a flat navy band** (`.tools-hero` = `--color-surface-navy`) with a coral `.eyebrow`, a `.display`
  headline with one `.accent-italic` word and `.tds-brandbar--on-dark` (required on the dark band). Eyebrow and
  accent use `--color-accent-pink` (the bordeaux is ~2:1 on navy). On the phone the header is the first line,
  navy with a light logo where the catalog opens on `.tools-hero`.
- **The brand mark is `.brand-logo`**, a CSS mask over `--color-primary` using `public/brand/td-logomark.webp`
  (identical to the landing page's and the blog's). Only `--tds-brand-logo-mask` and `--tds-brand-logo-size` are
  local; never override `--tds-brand-logo-ratio` (713 × 483).
- **The site is called TD Tools and the mark is the "TD".** Header and footer set only `Tools` beside the mark.
  `site.name` is the same string, used where the name is written out (SEO suffix, OG eyebrow, 404, header label).
- The mark is `aria-hidden`, so the header link has `aria-label={`${site.name} — …`}` and the footer restates
  `TD` as `sr-only`. `components/header.test.ts` pins this.
- **Every manifest icon needs a path in `Icon.astro`** (missing keys render a blank square silently).
  `lib/site.test.ts` checks every composed tool's icon.

## Catalog grid

`CatalogPage.astro` renders one `.tds-grid-auto.tool-grid` (`--tds-grid-min: 17rem`) over the full viewport width
in stable `categoryOrder`; the category rides on each card as a mono eyebrow. One display heading, a mono counter
(`toolCount`) and an accent bar sit above it. The body lifts the shell ceiling (`--tds-shell-max: none`); header
and hero keep 120rem.

- **Seams are not a `gap: 1px` over a line-coloured grid** (`auto-fill` keeps empty tracks that would show as grey
  blocks). Cards draw inset 1 px seams on their right and bottom edges.
- `.tool-card` is the journal's flat card: `--color-soft` block, no border or radius; hover deepens to
  `--tds-flat-hover` and grows a 2 px left accent bar. `.tds-card` still wraps the tool body on tool pages.
- **Muted text in the grid is `--tool-muted`** (ink 72 % in soft); `--color-muted` drops to 4.49:1 on the hover
  fill. Measure contrast with transitions disabled.
- **Hover tilt (`lib/cardTilt.ts`)** runs only for a fine hovering pointer and never under reduced motion. The rect
  is read from the untransformed `<li>` once per hover; no `setPointerCapture` (it would eat the link click). The
  transform exists only while `data-tilting` is set.
- `RelatedTools.astro` uses `.tool-card` outside the grid; grid and tilt rules are scoped to `.tool-grid`.

## Hard 2D shadows (tds-shared ≥ 0.42)

- The grid has no gap, so each card carries the offset **and an opaque fill**: later cells paint over earlier
  shadows, and only the block's outer edge shows them. Empty tracks show the page ground; the active cell
  (z-index 2) shows its whole offset.
- `.tool-card` outside the grid and `.service-note` take the large offset.
- Hover lifts a card 2 px up-left while its offset grows (`--tds-shadow-hard-hover`). Tilt uses `transform`, lift
  uses `translate`, so neither overwrites the other.
- **Never transition a `box-shadow`.**

## Build CSS

- **`postcss.config.mjs` is required.** Tailwind v4 runs through `@tailwindcss/postcss` (never the Vite plugin);
  without the config no utilities are generated and the build still succeeds.
- **`@source` lines after the `@import`s** scan `tds-shared` and every `tds-tool-*` package (Tailwind ignores
  `node_modules`). Add one per new pack. Without tds-shared's line, the theme toggle shipped as a bare 18 × 18 icon.
  Judge by grepping the **built** CSS in escaped form (`grep -c '\.w-9' dist/_astro/*.css`).
- **Fonts are JS imports in `Layout.astro`**, never CSS `@import`s. Stack: Lato / Plus Jakarta Sans /
  JetBrains Mono from tds-shared tokens.
- `<meta charset>` must stay within the first 1024 bytes; the long comment above `<html>` is an Astro comment.
