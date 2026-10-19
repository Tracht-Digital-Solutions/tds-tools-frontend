/**
 * Paths the panel has taken out of the index.
 *
 * The sitemap is built from the catalog (see `sitemap.ts`); this is the
 * subtraction on top of it, maintained in the API because most of what an
 * operator wants to hide has no row to hang a flag on. A disabled tool already
 * disappears through `enabled`; this covers everything else, including whole
 * subtrees via a trailing `*`.
 *
 * ### An exclusion takes the whole language group
 *
 * Both trees carry the same slugs here, so `/tools/x` and `/en/tools/x` are one
 * page in two languages, and the sitemap emits reciprocal `hreflang` links for
 * every URL. Dropping one side and keeping the other leaves an alternate
 * pointing at a URL that is no longer offered — and one dangling alternate
 * invalidates the entire set, the German side included. So a pattern matching
 * either member excludes both. `isExcluded()` is what enforces that; nothing
 * should compare a single path against the patterns directly.
 *
 * ### Fail-soft, in the safe direction
 *
 * Every failure answers "nothing excluded". The opposite default would empty
 * the sitemap on an API hiccup, and since the API's own route is fail-soft too,
 * neither end would go red.
 */

import { createSitemapExclusions } from "@tracht-digital-solutions/tds-shared/site";
import { apiBase } from "./connection";
import { memoisedOr, readContentJson } from "./contentFetch";
import { EN_ENABLED, localizedPath, neutralPath, type Lang } from "./seo";

export { canonicalPath, groupExcluded, matchesPattern } from "@tracht-digital-solutions/tds-shared/site";

/** This site's id in the panel's site registry. */
export const SITE_ID = "tools";

/**
 * Every URL that shares one page's hreflang group. A pure prefix operation
 * here, which is the whole reason the English tree was built with identical
 * slugs. When `EN_ENABLED` is false there is no English tree.
 */
export function hreflangGroup(pathname: string): string[] {
  const neutral = neutralPath(pathname);
  const langs: Lang[] = EN_ENABLED ? ["de", "en"] : ["de"];
  return langs.map((lang) => localizedPath(neutral, lang));
}

const exclusions = createSitemapExclusions({
  siteId: SITE_ID,
  contentBase: () => `${apiBase()}/content`,
  read: (url) => readContentJson(url),
  memo: (key, load, fallback, label) => memoisedOr(key, load, () => fallback, label),
  hreflangGroup,
  disabled: import.meta.env.PUBLIC_DEMO_MODE === "true",
});

/** The patterns, memoised for the render generation; failures exclude nothing. */
export const exclusionPatterns = exclusions.exclusionPatterns;

/** Is this page excluded — counting its English or German twin as the same page? */
export const isExcluded = exclusions.isExcluded;
