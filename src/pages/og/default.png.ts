import type { APIRoute } from "astro";
import { renderDefaultOgPng } from "~/og/render";

/**
 * Prerendered — see og/tools/[slug].png.ts for the two reasons.
 */
export const prerender = true;

/**
 * Default OG card. Astro emits this as a static `/og/default.png` at build
 * time; `Layout.astro` references it through `seoConfig.defaultOgImage` on
 * every page that does not pass its own `ogImage`.
 *
 * Before this route existed the layout pointed at `/og-default.png`, which
 * was never generated or committed anywhere — see `src/og/render.ts`.
 */
export const GET: APIRoute = async () => {
  const png = await renderDefaultOgPng();
  return new Response(new Uint8Array(png), {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
