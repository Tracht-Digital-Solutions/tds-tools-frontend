import type { ToolCategory } from "@tracht-digital-solutions/tds-tools-contract";
import { categoryLabels as labels, copy } from "./i18n";

/** Site-wide constants + copy. Keep the NAP in sync with the Impressum + seo.ts
 *  of the other TDS properties (SEO convention).
 *
 *  The German copy is DERIVED from `lib/i18n` rather than restated here: the
 *  site publishes two languages now, and a second copy of the German strings
 *  is how the two would drift. This module keeps the language-independent
 *  identity (name, origin) and re-exports the German defaults that predate the
 *  English tree, so nothing that already imported them had to change. */
export const site = {
  name: "TDS Tools",
  origin: "https://tools.tracht-digital.de",
  tagline: copy.de.tagline,
  /**
   * Site-level meta description. Google renders roughly the first 155–160
   * characters and truncates the rest — `site.test.ts` fails the build past
   * that bound.
   *
   * This was 201 characters until 2026-08-16, so everything from "Von Tracht
   * Digital Solutions, 21493 Schwarzenbek bei Hamburg" onward was cut in the
   * SERP: the site lost its brand AND its local signal while keeping the
   * generic half. Exactly the defect the landingpage's seo.ts fixed in
   * 2026-07-29, repeated here because nothing measured it.
   *
   * Order is deliberate: the concrete tool names come first (this site ranks
   * on tool queries), and the brand + town ride in the tail where they still
   * fit inside the cut.
   */
  description: copy.de.description,
} as const;

/**
 * The sibling TDS properties this site links to.
 *
 * Declared once here rather than inline in the header/footer markup: the blog
 * links back to this site from its own `nav.ts` (`TOOLS_URL`), and the two
 * link sets are each other's counterpart — a public property that only ever
 * gets linked TO is a dead end for a reader and an orphan for a crawler.
 *
 * Absolute URLs on purpose. These are separate hosts (`tracht-digital.de`,
 * `blog.tracht-digital.de`), so a site-relative path would resolve against
 * `tools.tracht-digital.de` and 404 into this site's own SPA-less 404 page.
 */
export const links = {
  main: "https://tracht-digital.de",
  blog: "https://blog.tracht-digital.de",
  contact: "https://tracht-digital.de/#contact",
  portal: "https://app.tracht-digital.de",
  impressum: "https://tracht-digital.de/legal/impressum",
  datenschutz: "https://tracht-digital.de/legal/datenschutz",
} as const;

/** German labels for the tool categories (catalog section headings). */
export const categoryLabels: Record<ToolCategory, string> = labels.de;

/**
 * "1 Werkzeug" / "n Werkzeuge" for a category heading.
 *
 * A helper rather than an inline ternary in the template because German
 * pluralisation is the kind of thing that reads as correct in a diff and wrong
 * on the page — and because the catalog genuinely produces categories of one
 * (five of the six sections hold one or two tools).
 */
export const toolCountLabel = (n: number): string => copy.de.toolCount(n);

/** Stable display order of the category sections in the catalog. */
export const categoryOrder: ToolCategory[] = [
  "marketing",
  "security",
  "developer",
  "design",
  "media",
  "content",
  "business",
  "other",
];
