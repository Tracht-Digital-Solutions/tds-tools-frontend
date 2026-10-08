# SEO, languages and content

SEO rides along with every page or section change: title, description, canonical, JSON-LD and sitemap. Keywords:
"Digitalisierung für Unternehmen", 21493 Schwarzenbek bei Hamburg (NAP matches the Impressum).

## Identity and structured data

`lib/seo.ts` (identity) and `lib/jsonld.ts` (schema renderers) are ports of the landing page's files with the same
names and shapes.

- **Every NAP value is a verbatim copy of the landing page's.** `seo.test.ts` greps the landing page's `seo.ts` for
  each value.
- **The organisation's `@id` is anchored on `tracht-digital.de`**, and each page emits **one** `@graph` that points
  at it, so the business is described once.

## Titles and descriptions

- **Every meta description: 80 < n ≤ 160**, for `site.description` and every composed tool (`lib/site.test.ts`).
  Concrete tool names first, brand and town in the tail.
- **Titles ≤ 60, distinct, never brand-leading** (`seo.test.ts`).
- The per-tool descriptions are asserted **here**, because this site renders them; newer packs assert the budgets
  on their side too.
- **A tool page's `<title>` comes through `mergeCopy`**, which falls back to the incoming copy when the panel has no
  override. `guideOverrides.test.ts` pins this both ways; `seo.test.ts` alone measures only the manifest value.
- The site doesn't call itself free: "kostenlos" attaches to the tools it is true of ("vieles kostenlos" /
  "much of it free").

## Languages (DE at `/`, EN at `/en/`, same slugs)

- An hreflang pair is a pure prefix operation (`localizedPath` / `neutralPath` in `lib/seo.ts`); both sides emit
  an identical de / en / x-default block.
- **`EN_ENABLED` gates the hreflang block** and must agree with the existence of `src/pages/en/` (`seo.test.ts`).
  An `hreflang="en"` pointing at a 404 invalidates the whole set.
- Where strings live: a tool's **German** name, description and SEO title in its pack manifest; island labels in
  the pack's `STRINGS`; site chrome **and English tool copy** in `lib/i18n.ts`; guides (both languages) in
  `content/guides`.
- `i18n.test.ts` applies the same budgets to English, requires DE and EN to differ, and requires an English guide
  for every tool.

## Long-form guides (`src/content/guides/<slug>.ts`)

Every tool page carries a guide; a 40-word tool page is thin content against hundreds of identical converters.

- Each guide has a `privacy` paragraph, never boilerplate (`guides.test.ts` fails on duplicates).
- **One object feeds the visible section and the `HowTo` + `FAQPage` nodes**, so structured and visible answers
  can't diverge.
- **The guide sits below the tool.**
- **`related` is authored per guide**; `RelatedTools.astro` drops slugs not in the enabled catalog.
- `guides.test.ts` measures depth: ≥ 300 words, ≥ 4 use cases, ≥ 3 steps whose description outweighs the title,
  ≥ 3 FAQ with answers over 80 characters, real and non-self `related` slugs, every tool linked from somewhere.

## Positioning rules (pinned in `guides.test.ts` and `marketing.test.ts`)

- No free or time-limited initial consultation anywhere.
- No customer named, not even anonymously.
- "Sie" form.
- Canonical CTA "Unverbindlich anfragen" / "Get in touch".

## Marketing

One line (`components/ServiceNote.astro`, a `--color-soft` block, no card, no second CTA) plus the footer's
services column, which provides internal links to the pages that sell.

## OG cards (`src/og/render.ts`)

Rendered at build time: `/og/default.png` and `/og/tools/<slug>.png` (one per enabled tool, from the same
`enabledTools()` as the routes). The card is the journal's hero band (navy, coral eyebrow, three-part bar).

- **Run `npm run og:smoke` after any renderer change.** Satori draws outside the viewport silently;
  `headlineSize()` steps down at 18 and 26 characters.
- Colours are literals (satori resolves no CSS custom properties); the bar is the light-theme `--on-dark` run.

## Sitemap and llms.txt

- Sectioned sitemaps: `sitemap-{pages,tools}.xml` (`src/lib/sitemapSections.ts`), tool pages with their OG card as
  `image:image`; `/sitemap-0.xml` still lists everything; `sitemap-index.xml` ties them together.
- The panel's exclusion list (`/content/sitemap-exclusions?site=tools`, `src/lib/sitemapExclusions.ts`) drops a
  page from every sitemap AND serves it `noindex`. A pattern always takes the whole hreflang pair; an unreachable
  API means nothing excluded. The `sitemap` cache event rebuilds the sitemaps, the catalog and every tool page.
- `/llms.txt` is a generated route (`src/lib/llmsTxt.ts`, `src/pages/llms.txt.ts`). Don't add a static
  `public/llms.txt`; it would shadow the route.
- `npm run audit:geo -- <url>` runs the shared geo audit (`scripts/geo-audit.mjs`, `src/lib/geoAudit.test.ts`).
