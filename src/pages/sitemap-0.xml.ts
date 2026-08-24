import type { APIRoute } from "astro";
import { renderUrlset, sitemapPaths } from "~/lib/sitemap";

/**
 * Server-rendered and cached: the URL list is the enabled-tool catalog, which
 * an admin can change without a deploy. `src/lib/cache.ts` rebuilds it on
 * every `tool` event.
 */
export const prerender = false;

export const GET: APIRoute = async () =>
  new Response(renderUrlset(await sitemapPaths(), new Date().toISOString().slice(0, 10)), {
    headers: { "content-type": "application/xml; charset=utf-8" },
  });
