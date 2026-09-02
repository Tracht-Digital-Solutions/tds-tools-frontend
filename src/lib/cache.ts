/**
 * This site's half of the page cache: which pages a content change dates, and
 * the memo that a rebuild throws away.
 *
 * The API sends *what changed* (`{type:"tool", id:"qr-code", lang:"de"}`); this
 * file answers *which of my pages that is*. Unlike the blog, this site's two
 * language trees DO mirror by prefix — same slugs at `/tools/x` and
 * `/en/tools/x` — which is what lets the sitemap emit alternates for every
 * page rather than only for articles.
 */

import {
  createGenerationCache,
  forLanguages,
  type CacheEvent,
  type EventMap,
} from "@tracht-digital-solutions/tds-shared/cache";

/**
 * The one memo every content fetch on this site shares.
 *
 * It replaces the module-level promise `catalog.ts` used to keep. That was
 * right while this site was a static build — one process, one fetch, then exit
 * — and becomes *permanent* under SSR: switching a tool off in the panel would
 * never reach a visitor, however often the cache was rebuilt, and nothing
 * would log.
 */
export const contentCache = createGenerationCache();

/** Language-tree prefix. German lives at the root. */
const prefix = (lang: "de" | "en") => (lang === "de" ? "" : "/en");

/** The catalog pages plus the sitemap — everything a tool appears on. */
function catalogPages(lang: "de" | "en"): string[] {
  return [`${prefix(lang)}/`, "/sitemap-0.xml", "/tools-catalog.json"];
}

/**
 * The route table, as the cache sees it.
 *
 * A tool event without an id means "the catalog changed" — a tool switched on
 * or off, reordered, or made premium. That changes the listing but not any
 * other tool's page, so only the catalog is rebuilt.
 */
export const cacheEvents: EventMap = {
  /** A tool's copy, guide or catalog flags changed. */
  tool: (event: CacheEvent) => {
    const slug = event.id;
    return forLanguages(event, (lang) => {
      const pages = catalogPages(lang);
      return slug ? [`${prefix(lang)}/tools/${slug}`, ...pages] : pages;
    });
  },

  /** AdSense or another global switch changed — it appears on every page. */
  catalog: (event: CacheEvent) => forLanguages(event, catalogPages),

  /**
   * The sitemap exclusion list changed.
   *
   * The widest event this site has, and it has to be. The list moves TWO
   * things: the sitemap, and the `robots` meta of every page that entered or
   * left it. A mapping that rebuilt only the sitemap would leave the excluded
   * page itself serving its old, indexable head out of cache — the omission
   * visible in the XML, the `noindex` nowhere, and nothing red.
   *
   * The tool pages are enumerated from the live catalog rather than from
   * `alwaysPaths`, where a hand-kept copy would drift the first time a pack is
   * added. The import is dynamic on purpose: `catalog.ts` reads `contentCache`
   * from this module, so a static import would close the cycle at module-init
   * time — the same `TypeError` the landingpage split `contentCache.ts` out to
   * avoid. A resolver runs per request, long after both modules exist.
   */
  sitemap: async (event: CacheEvent) => {
    const { enabledTools } = await import("./catalog");
    let slugs: string[] = [];
    try {
      slugs = (await enabledTools()).map((tool) => tool.slug);
    } catch {
      // Catalog unreachable — still rebuild the listing pages and the sitemap,
      // which is strictly better than rebuilding nothing.
    }
    return forLanguages(event, (lang) => [
      ...catalogPages(lang),
      "/sitemap-index.xml",
      ...slugs.map((slug) => `${prefix(lang)}/tools/${slug}`),
    ]);
  },

  /** These belong to the sibling sites; saying so keeps a typo visible. */
  post: () => [],
  block: () => [],
  legal: () => [],
};

/**
 * Pages a "rebuild everything" must include even when nothing is cached yet.
 *
 * The individual tool pages are absent on purpose: the composed catalog is
 * known to the build, not to this list, and enumerating it here would be a
 * second copy that drifts the first time a pack is added. A rebuild covers
 * whatever is already cached plus these entry points.
 */
export const alwaysPaths = [
  "/",
  "/en/",
  "/sitemap-0.xml",
  "/sitemap-index.xml",
  "/tools-catalog.json",
];
