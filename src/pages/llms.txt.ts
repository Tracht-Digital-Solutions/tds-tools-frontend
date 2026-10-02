import type { APIRoute } from "astro";
import { enabledTools } from "~/lib/catalog";
import { guideOverrides, mergeCopy } from "~/lib/guideOverrides";
import { toolCopyFor } from "~/lib/i18n";
import { renderLlmsTxt, type LlmsTool } from "~/lib/llmsTxt";
import { site } from "~/lib/site";

/**
 * `/llms.txt`, derived from the composed and panel-configured catalogue.
 *
 * Server-rendered, and it has to be: `enabledTools()` reads the panel's
 * per-tool flags and `guideOverrides()` its copy edits, so a prerendered file
 * would freeze both at build time — a tool disabled in the panel would keep
 * being advertised here, which is the same silent no-op `/sitemap-0.xml` is
 * `prerender = false` for.
 *
 * There is no `public/llms.txt` and there must not be one: a static asset
 * shadows a route of the same path, so the file would win and this endpoint
 * would never answer. `llmsTxt.test.ts` asserts the absence.
 *
 * NOT on a cache event and not in the rebuild's warm list: the page cache
 * stores no `text/plain`, so a hit is impossible and warming it would render a
 * document per rebuild and discard it. It is fresh by construction instead.
 */
export const prerender = false;

export const GET: APIRoute = async () => {
  const [tools, overrides] = await Promise.all([enabledTools(), guideOverrides("de")]);

  // The same resolution the tool page does: pack manifest, then the panel's
  // per-field override. A file that names a tool differently from its own page
  // is worse than one that does not name it.
  const described: LlmsTool[] = tools.map((tool) => {
    const copy = mergeCopy(toolCopyFor("de", tool, site.name), overrides[tool.id]);
    return {
      slug: tool.slug,
      category: tool.category,
      name: copy.name,
      description: copy.description,
      requiresLogin: tool.requiresLogin,
      isPremium: tool.isPremium,
    };
  });

  return new Response(renderLlmsTxt({ tools: described }), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
};
