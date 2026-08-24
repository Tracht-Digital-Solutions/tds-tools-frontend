import type { APIRoute } from "astro";
import { renderDefaultOgPng } from "~/og/render";

/**
 * The English catalog card.
 *
 * `/en/` shared the German card until 2026-08-24: `renderDefaultOgPng` took no
 * language and `Layout.astro` pointed every page at `/og/default.png`. The
 * English tree has been indexable since 2026-08-18, so every share of it
 * carried German — the one part of the page a translation pass cannot see,
 * because nothing renders it in the browser.
 *
 * Prerendered for the same two reasons as the German route.
 */
export const prerender = true;

export const GET: APIRoute = async () => {
  const png = await renderDefaultOgPng("en");
  return new Response(new Uint8Array(png), {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
