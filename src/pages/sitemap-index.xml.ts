import type { APIRoute } from "astro";
import { renderSitemapIndex } from "~/lib/sitemap";

export const prerender = false;

export const GET: APIRoute = () =>
  new Response(renderSitemapIndex(new Date().toISOString().slice(0, 10)), {
    headers: { "content-type": "application/xml; charset=utf-8" },
  });
