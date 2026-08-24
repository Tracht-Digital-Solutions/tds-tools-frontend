import type { APIRoute, GetStaticPaths } from "astro";
import { renderToolOgPng } from "~/og/render";
import { enabledTools } from "~/lib/catalog";
import { categoryLabels } from "~/lib/site";

/**
 * One OG card per enabled tool, emitted as `/og/tools/<slug>.png`.
 *
 * Keyed off the same `enabledTools()` the routes are, so a tool the admin
 * catalog switches off gets no page AND no orphan image. The tool page
 * references it explicitly; the catalog keeps the default card.
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

export const getStaticPaths = (async () => {
  const tools = await enabledTools();
  return tools.map((tool) => ({ params: { slug: tool.slug }, props: { tool } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const tool = props.tool as Awaited<ReturnType<typeof enabledTools>>[number];
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
