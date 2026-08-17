import type { Lang } from "./seo";

/**
 * UI strings for the site's own chrome.
 *
 * Only the site's words live here. A TOOL's name, description and guide are
 * not chrome — they belong to the tool (manifest) and to `content/guides`
 * respectively.
 *
 * German is the default everywhere: this site's audience is local businesses
 * in Northern Germany, and English is the addition, not the base.
 */
export const strings = {
  de: {
    guideHeading: "Ratgeber",
    guideUseCases: "Typische Anwendungsfälle",
    guideSteps: "So gehen Sie vor",
    guidePrivacy: "Was mit Ihren Daten passiert",
    guideFaq: "Häufige Fragen",
    relatedHeading: "Passt dazu",
    breadcrumbAll: "Alle Tools",
  },
  en: {
    guideHeading: "Guide",
    guideUseCases: "Typical use cases",
    guideSteps: "How to use it",
    guidePrivacy: "What happens to your data",
    guideFaq: "Frequently asked questions",
    relatedHeading: "Related tools",
    breadcrumbAll: "All tools",
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type StringKey = keyof (typeof strings)["de"];

/** The string table for a language. */
export function t(lang: Lang) {
  return strings[lang];
}
