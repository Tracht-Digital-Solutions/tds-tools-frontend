import type { APIRoute } from "astro";
import { handleExport } from "@tracht-digital-solutions/tds-tool-devkit/studio/exportRoute";
import { apiBase } from "~/lib/connection";

/**
 * Designsystem-Studio exports, generated on THIS server.
 *
 * The handler lives in the devkit pack beside the export adapters. Before it
 * builds a premium format it asks the API (`GET /tools/studio/access`) with the
 * visitor's own session cookie whether they are entitled, and refuses when the
 * API cannot be asked — the server-side half of the premium check, which a
 * modified browser cannot skip. POST only, never cached (the page cache stores
 * GETs alone).
 */
export const prerender = false;
export const POST: APIRoute = ({ request }) => handleExport(request, { apiBase });
