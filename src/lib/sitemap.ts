/**
 * The sitemap, built from the composed + panel-configured catalog.
 *
 * ### Why this is hand-written now
 *
 * `@astrojs/sitemap` derives its entries from the routes the build EMITS, and
 * the tool pages are server-rendered — it would have shipped a sitemap holding
 * only the pages its own `filter` used to exclude. A near-empty, technically
 * valid file, with nothing red anywhere.
 *
 * ### The hreflang rules it has to keep
 *
 * Both trees carry the SAME slugs, so an alternate is a pure prefix operation
 * and every page gets one — that is the whole reason the English tree was
 * built that way. Two rules survive from the integration's config and are the
 * easiest things to get wrong:
 *
 * - `/install` is excluded. It is a noindex operator page with no English
 *   twin, so an alternate would point at a 404 — and one dangling alternate
 *   invalidates the whole set, the German side included.
 * - Nothing is emitted for the English tree while `EN_ENABLED` is false. An
 *   `hreflang="en"` on a tree that does not exist is the same failure.
 */

import { enabledTools } from "./catalog";
import { guideUpdatedAt } from "./guides";
import { EN_ENABLED, localizedPath, type Lang } from "./seo";
import { site } from "./site";
import { escapeXml, newestDay, renderSectionedSitemapIndex } from "@tracht-digital-solutions/tds-shared/site";
import { exclusionPatterns, groupExcluded, hreflangGroup } from "./sitemapExclusions";
import { SITEMAP_SECTIONS, sectionPath, type SitemapSection } from "./sitemapSections";

export interface SitemapUrl {
  path: string;
  /** Which child sitemap lists it. */
  section: SitemapSection;
  /** The page's share image, per language (the tool's generated OG card). */
  image?: { de: string; en: string; title: string };
  changefreq: "weekly" | "monthly";
  priority: number;
  /**
   * When the page last really changed (YYYY-MM-DD), or absent. Every URL used
   * to report the render date, which tells a crawler the whole site changed on
   * every visit — the same as telling it nothing.
   */
  lastmod?: string;
}


/** Absolute URL for a path on this site. */
export function absolute(path: string): string {
  return new URL(path, site.origin).href;
}

/**
 * Every indexable page, as language-neutral paths.
 *
 * Returned once and then localised, rather than assembled per tree, because
 * that is what guarantees the two trees stay a prefix pair — the property the
 * alternates depend on.
 */
export async function sitemapPaths(): Promise<SitemapUrl[]> {
  const [enabled, patterns] = await Promise.all([enabledTools(), exclusionPatterns()]);
  const tools = enabled.map((tool) => ({
    path: `/tools/${tool.slug}`,
    section: "tools" as const,
    image: { de: `/og/tools/${tool.slug}.png`, en: `/og/en/tools/${tool.slug}.png`, title: tool.name },
    changefreq: "monthly" as const,
    priority: 0.8,
    lastmod: guideUpdatedAt(tool.slug),
  }));
  // The catalog lists every tool, so it changed when the newest guide did.
  const newest = tools
    .map((t) => t.lastmod)
    .filter((d): d is string => Boolean(d))
    .sort()
    .at(-1);
  const all: SitemapUrl[] = [
    { path: "/", section: "pages", changefreq: "weekly", priority: 1.0, lastmod: newest },
    ...tools,
  ];
  if (patterns.length === 0) return all;

  // Filtered on the whole hreflang group, never on one URL: `renderUrlset`
  // emits both trees from ONE entry, and a surviving side would point an
  // alternate at a URL no longer offered, which invalidates the set on both.
  return all.filter((entry) => !groupExcluded(hreflangGroup(entry.path), patterns));
}

export function renderUrlset(paths: SitemapUrl[], fallbackLastmod?: string): string {
  const langs: Lang[] = EN_ENABLED ? ["de", "en"] : ["de"];

  const body = paths
    .flatMap((entry) =>
      langs.map((lang) => {
        const lastmod = entry.lastmod ?? fallbackLastmod;
        const alternates = EN_ENABLED
          ? [
              `<xhtml:link rel="alternate" hreflang="de-DE" href="${escapeXml(absolute(localizedPath(entry.path, "de")))}"/>`,
              `<xhtml:link rel="alternate" hreflang="en-GB" href="${escapeXml(absolute(localizedPath(entry.path, "en")))}"/>`,
              `<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(absolute(localizedPath(entry.path, "de")))}"/>`,
            ].join("")
          : "";
        const image = entry.image
          ? `<image:image><image:loc>${escapeXml(absolute(entry.image[lang]))}</image:loc>` +
            `<image:title>${escapeXml(entry.image.title)}</image:title></image:image>`
          : "";
        return [
          "<url>",
          `<loc>${escapeXml(absolute(localizedPath(entry.path, lang)))}</loc>`,
          alternates,
          image,
          lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : "",
          `<changefreq>${entry.changefreq}</changefreq>`,
          `<priority>${entry.priority.toFixed(1)}</priority>`,
          "</url>",
        ].join("");
      }),
    )
    .join("");

  return (
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ' +
    'xmlns:xhtml="http://www.w3.org/1999/xhtml" ' +
    'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">' +
    body +
    "</urlset>"
  );
}

/**
 * The index document — the filename `public/robots.txt` advertises and Search
 * Console already knows. `@astrojs/sitemap` produced this exact pair.
 */
export function renderSitemapIndex(lastmod?: string): string {
  return (
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    "<sitemap>" +
    `<loc>${escapeXml(absolute("/sitemap-0.xml"))}</loc>` +
    (lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : "") +
    "</sitemap>" +
    "</sitemapindex>"
  );
}

/**
 * The sectioned index (2026-10-06): one child per non-empty section, each with
 * the newest real date inside it — or none, never the render date.
 */
export function renderSectionIndex(paths: readonly SitemapUrl[]): string {
  return renderSectionedSitemapIndex(
    SITEMAP_SECTIONS.flatMap((section) => {
      const inSection = paths.filter((p) => p.section === section);
      if (inSection.length === 0) return [];
      return [{ loc: absolute(sectionPath(section)), lastmod: newestDay(inSection.map((p) => p.lastmod)) }];
    }),
  );
}
