import type { APIRoute } from "astro";
import { renderSectionIndex, sitemapPaths } from "~/lib/sitemap";

/**
 * The index `public/robots.txt` advertises. Since 2026-10-06 it names one child
 * per section (src/lib/sitemapSections.ts), each with the newest real date in
 * it — never the render date, which claimed a change on every request.
 */
export const prerender = false;

export const GET: APIRoute = async () =>
  new Response(renderSectionIndex(await sitemapPaths()), {
    headers: { "content-type": "application/xml; charset=utf-8" },
  });
