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
import { EN_ENABLED, localizedPath, type Lang } from "./seo";
import { exclusionPatterns, groupExcluded, hreflangGroup } from "./sitemapExclusions";
import { site } from "./site";

export interface SitemapUrl {
  path: string;
  changefreq: "weekly" | "monthly";
  priority: number;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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
  const [tools, patterns] = await Promise.all([enabledTools(), exclusionPatterns()]);

  const all: SitemapUrl[] = [
    { path: "/", changefreq: "weekly", priority: 1.0 },
    ...tools.map((tool) => ({
      path: `/tools/${tool.slug}`,
      changefreq: "monthly" as const,
      priority: 0.8,
    })),
  ];

  if (patterns.length === 0) return all;

  // Filtered on the whole hreflang group, never on one URL: `renderUrlset`
  // emits both trees from ONE entry here, so dropping a language would be
  // impossible anyway — and if it were possible it would leave the surviving
  // side pointing an alternate at a URL no longer offered, which invalidates
  // the set on both sides.
  return all.filter((entry) => !groupExcluded(hreflangGroup(entry.path), patterns));
}

export function renderUrlset(paths: SitemapUrl[], lastmod: string): string {
  const langs: Lang[] = EN_ENABLED ? ["de", "en"] : ["de"];

  const body = paths
    .flatMap((entry) =>
      langs.map((lang) => {
        const alternates = EN_ENABLED
          ? [
              `<xhtml:link rel="alternate" hreflang="de-DE" href="${escapeXml(absolute(localizedPath(entry.path, "de")))}"/>`,
              `<xhtml:link rel="alternate" hreflang="en-GB" href="${escapeXml(absolute(localizedPath(entry.path, "en")))}"/>`,
              `<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(absolute(localizedPath(entry.path, "de")))}"/>`,
            ].join("")
          : "";
        return [
          "<url>",
          `<loc>${escapeXml(absolute(localizedPath(entry.path, lang)))}</loc>`,
          alternates,
          `<lastmod>${escapeXml(lastmod)}</lastmod>`,
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
    'xmlns:xhtml="http://www.w3.org/1999/xhtml">' +
    body +
    "</urlset>"
  );
}

/**
 * The index document — the filename `public/robots.txt` advertises and Search
 * Console already knows. `@astrojs/sitemap` produced this exact pair.
 */
export function renderSitemapIndex(lastmod: string): string {
  return (
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    "<sitemap>" +
    `<loc>${escapeXml(absolute("/sitemap-0.xml"))}</loc>` +
    `<lastmod>${escapeXml(lastmod)}</lastmod>` +
    "</sitemap>" +
    "</sitemapindex>"
  );
}
