import type { APIRoute } from "astro";
import { renderUrlset, sitemapPaths } from "~/lib/sitemap";
import { isSitemapSection } from "~/lib/sitemapSections";

/**
 * One child of the sectioned sitemap: `/sitemap-pages.xml`, `/sitemap-tools.xml`.
 * `/sitemap-0.xml` keeps its own static route and still lists everything.
 */
export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  if (!isSitemapSection(params.section)) return new Response(null, { status: 404 });
  const paths = (await sitemapPaths()).filter((p) => p.section === params.section);
  if (paths.length === 0) return new Response(null, { status: 404 });
  return new Response(renderUrlset(paths), {
    headers: { "content-type": "application/xml; charset=utf-8" },
  });
};
