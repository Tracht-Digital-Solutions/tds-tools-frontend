/**
 * This site's profile for `tds-geo-audit` (the search and answer-engine
 * audit tds-shared ships since 0.59). The checks are shared; what a page here
 * must declare, refuse or close is decided below.
 *
 *   npm run audit:geo -- http://127.0.0.1:4321
 */
export default {
  /** The origin the markup names in canonicals, alternates and the sitemap. */
  site: "https://tools.tracht-digital.de",
  defaultBase: "http://localhost:4321",
  sitemapIndexPath: "/sitemap-index.xml",
  langs: ["de", "en"],
  titleMax: 65,
  descriptionRange: [80, 160],
  minWords: 300,

  /**
   * robots.txt must name every one of these and keep `requiredDisallow`
   * closed in each group. Blocking a search or fetch agent removes the site
   * from that engine's answers without producing any error, so the list is a
   * contract, not a preference. Tier A are answer engines, tier B retired
   * names kept so an old crawler reads the same rules, tier C newer answer
   * surfaces. Dataset-only crawlers (CCBot, Bytespider, Amazonbot, …) are
   * deliberately absent: they have no answer surface for this audience and
   * every added group has to repeat the whole Disallow set.
   */
  agents: [
    "*",
    // A — OpenAI, Anthropic, Perplexity, Google, Apple
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-SearchBot",
    "Claude-User",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot-Extended",
    // B — retired names
    "Claude-Web",
    "anthropic-ai",
    // C — Meta AI, DuckDuckGo, Mistral
    "meta-externalagent",
    "meta-externalfetcher",
    "DuckAssistBot",
    "MistralAI-User",
  ],
  /**
   * `/tools-catalog.json` is the extra one here: an internal registry shape
   * the setup wizard syncs from, which an engine could quote as if it were the
   * public catalogue.
   */
  /** Every indexable page here has a real twin by construction. */
  hreflangRequired: true,

  requiredDisallow: ["/install/", "/tds/", "/tools-catalog.json"],

  /**
   * `@id` values a reference may point at although no node on the page
   * declares them.
   *
   * The organisation and the person live on the MARKETING origin — one
   * business across four properties, described once there and referenced from
   * here. That is the point of the shared anchor, not an oversight. The
   * WebSite id belongs to this origin and is declared on every page, so it is
   * listed only for safety.
   */
  entityAnchors: [
    "https://tracht-digital.de/#organization",
    "https://tracht-digital.de/#person",
    "https://tools.tracht-digital.de/#website",
  ],

  /**
   * Types and properties this site has decided against.
   *
   * `HowTo` is NOT here, unlike on the marketing site: a tool guide really is
   * a click path, and although Google retired the rich result the node still
   * tells an answer engine how the tool is operated. There is no search route,
   * so a `SearchAction` would describe one that does not exist, and there are
   * no reviews of these tools anywhere.
   */
  forbiddenTypes: ["SearchAction", "Review", "AggregateRating"],
  forbiddenProps: ["openingHoursSpecification", "aggregateRating", "review"],

  /**
   * The copy rules that come from the positioning and are invisible to every
   * other gate — the same set `guides.test.ts` pins over the committed text,
   * applied here to what the page actually renders after a panel override.
   *
   * Note what is NOT banned: "echt" and "wirklich" are forbidden on the
   * marketing site's voice and are ordinary words in a guide explaining a file
   * format. A shared ban would fail five guides for no reason.
   */
  bannedWords: /kostenlos\w*\s+(erst)?(gespräch|beratung)|kostenfrei\w*\s+(erst)?(gespräch|beratung)|unverbindlich\w*\s+(erst)?gespräch|30[-\s]minuten|hofladen|referenzkunde|fallstudie/i,

  /**
   * 12 KB rather than the marketing site's 8: this file indexes nineteen tools
   * across two languages, and that is the content, not padding. The budget is
   * a guard against the file turning into a second corpus — prose, excerpts, a
   * keyword list — so it has to leave room for the catalogue to grow by a tool
   * without forcing an edit to the prose.
   */
  llmsBudgetBytes: 12 * 1024,

  /** Nothing to skip: this site has no counting redirect. */
  skipPaths: [],

  /**
   * Which structured data a page of this kind has to carry, and whether it
   * must name a date.
   */
  pageKind(path) {
    if (path === "/" || path === "/en/") {
      // The catalogue describes the business and lists the tools. No date is
      // required: the list changes when a pack is composed or a panel flag
      // flips, and neither is a content revision a reader could check.
      return { kind: "catalog", requiredTypes: ["Organization", "Person", "WebSite", "ItemList"] };
    }
    if (/^\/(en\/)?tools\/[^/]+$/.test(path)) {
      // `WebApplication` or `SoftwareApplication` — the pack's manifest
      // chooses via `seo.jsonLdType`, and both are right.
      return {
        kind: "tool",
        requiredTypes: [
          "WebSite",
          "WebPage",
          "BreadcrumbList",
          ["WebApplication", "SoftwareApplication"],
          "FAQPage",
          "HowTo",
        ],
        // Every composed tool has a guide (`guides.test.ts` holds 19/19), so
        // every tool page has a "Stand" line and a `dateModified`. Requiring
        // it here is the second guard, at the rendered page.
        requireDate: true,
      };
    }
    return { kind: "other", requiredTypes: [] };
  },

  /** No checks beyond the universal set: the lead/byline/source trio belongs
   * to the marketing site's detail pages, which promise those things. */
  extraCheckIds: [],
};
