import type { APIRoute } from "astro";
import { buildServiceWorker, SW_HEADERS } from "@tracht-digital-solutions/tds-shared/pwa";

/**
 * The service worker (tds-shared/pwa). Prerendered: its version is the build
 * time, so a deploy installs a new worker and a server restart does not.
 * Pages network-first; every tool opened online keeps working offline (they
 * compute in the browser). Feeds, OG images and the catalog JSON are excluded.
 */
export const prerender = true;

const VERSION = String(Date.now());

export const GET: APIRoute = () =>
  new Response(
    buildServiceWorker({
      version: VERSION,
      offlinePages: { "/": "/offline", "/en/": "/en/offline" },
      exclude: ["/og/", "/sitemap", "/llms.txt", "/tools-catalog.json", "/tds-runtime.json"],
      maxPages: 40,
    }),
    { headers: SW_HEADERS },
  );
