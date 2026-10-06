import type { APIRoute } from "astro";
import { buildManifest, MANIFEST_HEADERS } from "@tracht-digital-solutions/tds-shared/pwa";

/** Installable tools site (tds-shared/pwa). Prerendered — never varies per request. */
export const prerender = true;

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify(
      buildManifest({
        name: "TD Tools — Werkzeuge für deinen Betrieb",
        shortName: "TD Tools",
        description: "Kostenlose Werkzeuge, die direkt im Browser laufen — auch offline.",
        lang: "de",
        themeColor: "#fafaf7",
        backgroundColor: "#fafaf7",
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", purpose: "any" },
          { src: "/icons/icon-512.png", sizes: "512x512", purpose: "any" },
          { src: "/icons/maskable-512.png", sizes: "512x512", purpose: "maskable" },
        ],
        shortcuts: [{ name: "English", url: "/en/" }],
        categories: ["business", "productivity", "utilities"],
      }),
    ),
    { headers: MANIFEST_HEADERS },
  );
