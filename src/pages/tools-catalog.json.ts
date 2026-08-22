import type { APIRoute } from "astro";
import { catalog as composed } from "virtual:tools-catalog";

/**
 * The composed tool list, emitted as a static file into `dist/`.
 *
 * ### Why this file exists
 *
 * The registry sync in `src/lib/catalog.ts` only runs when
 * `TOOLS_REGISTRY_TOKEN` is set at build time — and no workflow in this repo
 * ever exports it, so it has never run: the admin panel has never seen the tool
 * list, and nothing anywhere goes red about it, because the sync fails soft by
 * design.
 *
 * Publishing the catalog as a plain artefact lets the host-side setup wizard
 * (`/install/`) do the sync instead, with the token entered in the
 * form. That is the better home for it anyway: the token stays off the CI
 * runner, and the person who has the token is the person running the setup.
 *
 * The shape is deliberately IDENTICAL to what `syncRegistry()` posts, so both
 * paths upsert the same rows and neither can drift into producing a subtly
 * different tool record.
 */
export const GET: APIRoute = () =>
  new Response(
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        tools: composed.tools.map((t) => ({
          id: t.id,
          name: t.name,
          category: t.category,
          requires_login_default: t.requiresLoginDefault ?? false,
          premium_default: t.premiumDefault ?? false,
          price_cents_default: t.priceCentsDefault ?? 0,
        })),
      },
      null,
      2,
    ),
    { headers: { "Content-Type": "application/json; charset=utf-8" } },
  );
