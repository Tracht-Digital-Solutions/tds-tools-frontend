/**
 * The panel-editable half of a tool page.
 *
 * The guides committed in `src/content/guides` stay the source of truth; this
 * module fetches whatever an editor has overridden in the admin panel and
 * merges it on top, **field by field**. That granularity is the point: an
 * editor who rewrote the intro but not the FAQ gets the rewritten intro and
 * the committed FAQ, rather than an empty FAQ.
 *
 * Same fail-soft contract as every other content read on these sites — an
 * unreachable or empty API leaves the committed text exactly as it was, so a
 * tool page can never go blank. That is also why `guides.test.ts` keeps
 * failing when a composed tool has no committed guide: the fallback is load
 * bearing, not decoration.
 */

import { assertKeyAccepted, siteKeyHeaders } from "./siteKey";
import { contentCache } from "./cache";
import { guideFor, type ToolGuide } from "./guides";
import type { Lang } from "./seo";
import { apiBase } from "./connection";

/** One tool's overridden copy, in the shape `GET /tools/guides` returns. */
export interface ToolCopyOverride {
  name?: string;
  description?: string;
  seo_title?: string;
  seo_description?: string;
  intro?: string[];
  use_cases?: { title: string; text: string }[];
  steps?: { title: string; description: string }[];
  faq?: { q: string; a: string }[];
  related?: string[];
  privacy?: string;
}

export type GuideOverrides = Record<string, ToolCopyOverride>;

/**
 * Every override for a language.
 *
 * Memoised through `contentCache`, so the dozen tool pages of one render share
 * a single request while a cache rebuild still reads through. A module-level
 * memo would pin the overrides for the life of the server — an edit would
 * never appear, however often its cache was rebuilt.
 */
export async function guideOverrides(lang: Lang): Promise<GuideOverrides> {
  if (import.meta.env.PUBLIC_DEMO_MODE === "true") return {};

  return contentCache.get(`tool-guides:${lang}`, async () => {
    try {
      const url = new URL(`${apiBase()}/tools/guides`);
      url.searchParams.set("lang", lang);
      const res = await fetch(url, {
        headers: siteKeyHeaders(),
        // A hanging API host must not hold a render open; the committed text
        // is a perfectly good answer.
        signal: AbortSignal.timeout(10_000),
      });
      assertKeyAccepted(res, url);
      if (!res.ok) return {};
      const data = (await res.json()) as { guides?: GuideOverrides };
      return data.guides ?? {};
    } catch (err) {
      console.warn("[tds-tools] tool guides fetch failed, using committed text:", err);
      return {};
    }
  });
}

/** True for an override value worth using — a present, non-empty one. */
function has<T>(value: T | undefined | null): value is T {
  if (value === undefined || value === null) return false;
  if (typeof value === "string") return value.trim() !== "";
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

/**
 * The guide to render for one tool: the committed one with any overrides
 * merged on top.
 *
 * Returns `undefined` only when there is no committed guide AND no override —
 * i.e. exactly when `guideFor` alone would have.
 */
export function mergeGuide(
  slug: string,
  lang: Lang,
  override: ToolCopyOverride | undefined,
): ToolGuide | undefined {
  const base = guideFor(slug, lang);
  if (!override) return base;

  // The API's snake_case is the storage shape; the frontend's camelCase is the
  // render shape. Translating here keeps the mapping in one place rather than
  // in every component that reads a guide.
  const merged: ToolGuide = {
    intro: has(override.intro) ? override.intro : (base?.intro ?? []),
    useCases: has(override.use_cases) ? override.use_cases : (base?.useCases ?? []),
    steps: has(override.steps) ? override.steps : (base?.steps ?? []),
    privacy: has(override.privacy) ? override.privacy : (base?.privacy ?? ""),
    faq: has(override.faq) ? override.faq : (base?.faq ?? []),
    related: has(override.related) ? override.related : (base?.related ?? []),
  };

  // Nothing at all to show: neither a committed guide nor a usable override.
  const empty =
    merged.intro.length === 0 &&
    merged.useCases.length === 0 &&
    merged.steps.length === 0 &&
    merged.faq.length === 0;

  return empty && !base ? undefined : merged;
}

/**
 * The display copy for one tool: manifest values with overrides on top.
 *
 * The two SEO fields fall back to the copy that came IN, exactly like the name
 * and the description above. They used to fall back to `undefined`, and
 * because `ToolPage.astro` passes `copy.seoTitle` straight into the layout,
 * every tool page without a panel override rendered an empty `<title>` — all
 * of them, since the panel ships no overrides by default.
 *
 * Nothing could see it. `seo.test.ts` measures `tool.seo?.title`, the value in
 * the MANIFEST, not the one the page ends up with; the browser shows the URL in
 * the tab when a title is empty, so the page still looks fine; and the OG card
 * simply loses its heading. The only visible trace was in a search result
 * nobody on the team was looking at.
 */
export function mergeCopy<
  T extends { name: string; description: string; seoTitle?: string; seoDescription?: string },
>(
  tool: T,
  override: ToolCopyOverride | undefined,
): T & { seoTitle?: string; seoDescription?: string } {
  return {
    ...tool,
    name: has(override?.name) ? override.name : tool.name,
    description: has(override?.description) ? override.description : tool.description,
    seoTitle: has(override?.seo_title) ? override.seo_title : tool.seoTitle,
    seoDescription: has(override?.seo_description) ? override.seo_description : tool.seoDescription,
  };
}
