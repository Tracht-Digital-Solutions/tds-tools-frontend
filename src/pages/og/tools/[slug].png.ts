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
