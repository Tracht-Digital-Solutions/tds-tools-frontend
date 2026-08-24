import type { APIRoute } from "astro";
import { catalog as composed } from "virtual:tools-catalog";

export const prerender = true;

/**
 * The composed tool list, emitted as a static file.
 *
 * Prerendered: it reads only `virtual:tools-catalog`, a build-time constant, so
 * rendering it per request would wake Node to reproduce a file that cannot
 * change between deploys. `src/lib/cache.ts` already treats it as a cacheable
 * artefact; being a real file is simply the cheaper way to be one.
 *
 * ### Why this file exists
 *
 * `src/lib/catalog.ts` used to POST the composed catalog to `/tools/registry`
 * at build time, gated on `TOOLS_REGISTRY_TOKEN` — which no workflow ever
 * exported, and which Vite never puts on `import.meta.env` anyway without a
 * `PUBLIC_` prefix. So it never ran once, the admin panel never saw the tool
 * list, and nothing went red, because the sync failed soft by design. That
 * code is gone.
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
