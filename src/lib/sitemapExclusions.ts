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

import { apiBase } from "./connection";
import { memoisedOr, readContentJson } from "./contentFetch";
import { EN_ENABLED, localizedPath, neutralPath, type Lang } from "./seo";

/** This site's id in the panel's site registry. */
export const SITE_ID = "tools";

const DEMO_MODE = import.meta.env.PUBLIC_DEMO_MODE === "true";

interface ExclusionsResponse {
  site?: string;
  paths?: unknown;
}

/** Trailing slash folded away, root kept — `trailingSlash: "ignore"` in the Astro config. */
function canonical(path: string): string {
  const value = path.trim();
  if (value === "" || value === "/") return "/";
  return value.replace(/\/+$/, "") || "/";
}

/**
 * One pattern against one path.
 *
 * Deliberately the same two rules the API validates and documents: an exact
 * path, or a trailing `*` making it a raw prefix. Kept dumb on purpose — a
 * glob library here would accept patterns the API rejects, and the disagreement
 * would only ever show up as a page that quietly stayed in the sitemap.
 */
export function matchesPattern(path: string, pattern: string): boolean {
  const value = pattern.trim();
  if (value === "") return false;

  if (value.endsWith("*")) {
    const prefix = value.slice(0, -1);
    return prefix === "" || canonical(path).startsWith(prefix);
  }
  return canonical(value) === canonical(path);
}

/** Does any pattern hit any member of this hreflang group? */
export function groupExcluded(paths: readonly string[], patterns: readonly string[]): boolean {
  return paths.some((path) => patterns.some((pattern) => matchesPattern(path, pattern)));
}

/**
 * Every URL that shares one page's hreflang group.
 *
 * A pure prefix operation here, which is the whole reason the English tree was
 * built with identical slugs. When `EN_ENABLED` is false there is no English
 * tree and the group is the German path alone.
 */
export function hreflangGroup(pathname: string): string[] {
  const neutral = neutralPath(pathname);
  const langs: Lang[] = EN_ENABLED ? ["de", "en"] : ["de"];
  return langs.map((lang) => localizedPath(neutral, lang));
}

async function load(): Promise<string[]> {
  const url = new URL(`${apiBase()}/content/sitemap-exclusions`);
  url.searchParams.set("site", SITE_ID);
  // Throws on failure — `exclusionPatterns` decides what that renders as.
  const data = await readContentJson<ExclusionsResponse>(url.toString());
  if (!Array.isArray(data.paths)) return [];
  return data.paths.filter((p): p is string => typeof p === "string" && p.trim() !== "");
}

/**
 * The patterns, memoised for the render generation.
 *
 * Through `contentCache` rather than a module-level promise: the latter would
 * live as long as the server under SSR, so an exclusion added in the panel
 * would never reach a visitor and nothing would log.
 */
export function exclusionPatterns(): Promise<string[]> {
  if (DEMO_MODE) return Promise.resolve([]);
  return memoisedOr("sitemap:exclusions", load, () => [], "sitemap exclusions (nothing excluded)");
}

/** Is this page excluded — counting its English or German twin as the same page? */
export async function isExcluded(pathname: string): Promise<boolean> {
  const patterns = await exclusionPatterns();
  if (patterns.length === 0) return false;
  return groupExcluded(hreflangGroup(pathname), patterns);
}
