/**
 * What a `/tools/[slug]` route needs, in either language.
 *
 * The two route files were byte-identical apart from three occurrences of
 * `"de"`/`"en"` — including the twelve-line comment explaining the 404 rule,
 * which is exactly the kind of thing that gets corrected in one copy only. The
 * catalog pages already delegate to `CatalogPage.astro`; the tool routes never
 * got the same treatment.
 *
 * The 404 itself stays in the page: an `.astro` frontmatter has to `return` the
 * Response from its own module scope, so a helper can report "no such tool" but
 * cannot answer for it.
 */
import { enabledTools, type ResolvedTool } from "./catalog";
import { guideOverrides, type GuideOverrides } from "./guideOverrides";
import type { Lang } from "./seo";

export interface ToolRouteData {
  tool: ResolvedTool;
  allTools: ResolvedTool[];
  overrides: GuideOverrides;
}

/**
 * Resolve one tool page, or `null` when the catalog does not know the slug.
 *
 * `null` must become a 404, never an empty page: a tool the admin switched off
 * has to stop existing rather than stay indexable and permanently 200 with
 * nothing on it.
 *
 * Both trees carry the SAME slugs on purpose (`/tools/x` and `/en/tools/x`),
 * which is what makes the hreflang pair a pure prefix operation — the two URLs
 * always name each other.
 */
export async function resolveToolRoute(
  slug: string,
  lang: Lang,
): Promise<ToolRouteData | null> {
  const allTools = await enabledTools();
  const tool = allTools.find((candidate) => candidate.slug === slug);
  if (!tool) return null;

  // Panel-editable copy, merged over the manifest and the committed guide.
  const overrides = await guideOverrides(lang);
  return { tool, allTools, overrides };
}
