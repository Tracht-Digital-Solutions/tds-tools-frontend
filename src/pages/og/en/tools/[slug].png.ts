import type { APIRoute, GetStaticPaths } from "astro";
import { renderToolOgPng } from "~/og/render";
import { enabledTools } from "~/lib/catalog";
import { categoryLabels, toolCopyFor } from "~/lib/i18n";
import { site } from "~/lib/site";

/**
 * The English card for each tool, at `/og/en/tools/<slug>.png`.
 *
 * `renderToolOgPng` has always taken a `lang`, and the German route always
 * passed `"de"` — so every `/en/tools/*` share went out with a German category
 * label and a German badge. The English half was built and simply unused.
 *
 * Prerendered for the same two reasons as the German route: satori plus the
 * native resvg addon must stay out of the runtime, and `getStaticPaths` is
 * only legal on a prerendered route.
 */
export const prerender = true;

export const getStaticPaths = (async () => {
  const tools = await enabledTools();
  return tools.map((tool) => ({ params: { slug: tool.slug }, props: { tool } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const tool = props.tool as Awaited<ReturnType<typeof enabledTools>>[number];
  const copy = toolCopyFor("en", tool, site.name);
  const png = await renderToolOgPng({
    name: copy.name,
    category: categoryLabels.en[tool.category],
    slug: tool.slug,
    isPremium: tool.isPremium,
    lang: "en",
  });
  return new Response(new Uint8Array(png), {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
