import type { APIRoute, GetStaticPaths } from "astro";
import { renderToolOgPng } from "~/og/render";
import { toolsData, type ResolvedTool } from "~/lib/catalog";
import { categoryLabels } from "~/lib/site";

/**
 * One OG card per enabled tool, emitted as `/og/tools/<slug>.png`.
 *
 * The tool page references it explicitly; the catalog keeps the default card.
 */
/**
 * Prerendered, and it has to stay that way: the renderer pulls in satori and
 * @resvg/resvg-js (a native addon), and src/og/render.ts anchors its font
 * directory to process.cwd() — the project root during `astro build`, but a
 * deploy tree with no src/ at runtime. Prerendering is also what keeps
 * `getStaticPaths` legal here.
 *
 * The cost: a tool added after the last deploy has no card of its own until
 * the next one. Adding a tool is a package change anyway, so it always comes
 * with a deploy.
 */
export const prerender = true;

// EVERY composed tool, not only the enabled ones. The page references its card
// unconditionally, and a tool switched off at deploy time and back on in the
// panel afterwards would otherwise advertise an og:image that 404s until the
// next deploy. A card for a disabled tool is harmless: nothing links to it.
export const getStaticPaths = (async () => {
  const { tools } = await toolsData();
  return tools.map((tool) => ({ params: { slug: tool.slug }, props: { tool } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const tool = props.tool as ResolvedTool;
  const png = await renderToolOgPng({
    name: tool.name,
    category: categoryLabels[tool.category],
    slug: tool.slug,
    isPremium: tool.isPremium,
    lang: "de",
  });
  return new Response(new Uint8Array(png), {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
