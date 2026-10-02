import type { APIRoute } from "astro";
import { renderSitemapIndex, sitemapPaths } from "~/lib/sitemap";

export const prerender = false;

// The newest real date in the sitemap it names — the catalog entry carries it —
// rather than the render date, which claimed a change on every request.
export const GET: APIRoute = async () =>
  new Response(renderSitemapIndex((await sitemapPaths())[0]?.lastmod), {
    headers: { "content-type": "application/xml; charset=utf-8" },
  });
