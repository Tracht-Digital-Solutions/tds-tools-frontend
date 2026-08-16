/**
 * Build-time catalog resolution.
 *
 * The tool *defaults* (name, slug, category, premium/login defaults) come from
 * the composed manifests (`virtual:tools-catalog`). The *admin overrides*
 * (enabled / requires-login / premium / price + the AdSense config) come from
 * the `tds-ext-tools` panel extension's public endpoint, fetched once at build
 * time and baked into the static pages — exactly like `tds-blog` bakes its
 * content + ads config. A failed/absent fetch (or demo mode) falls back to the
 * manifest defaults with ads OFF, so the site always builds even when the panel
 * backend is unreachable or not yet deployed.
 *
 * When an admin toggles a tool or the ads config, the extension fires a rebuild
 * of this site (the `RebuildTrigger` pattern), so the baked catalog refreshes.
 *
 * ### The catalog only ever OVERRIDES — it never supplies the tool list
 *
 * `composed.tools` is the list; the backend can flip flags on it and nothing
 * more. A tool with no matching row resolves to `enabled: true`. So no state of
 * the backend — down, 500, empty, unparseable — can empty this site.
 *
 * ### Why there is no registry sync here any more
 *
 * This module used to POST the composed catalog to `/tools/registry` at build
 * time, gated on `import.meta.env.TOOLS_REGISTRY_TOKEN`. That never ran once:
 * no workflow exported the variable, and without a `PUBLIC_` prefix Vite never
 * puts it on `import.meta.env` at all (there is no `envField` schema in
 * `astro.config.mjs`), so the guard was unconditionally true. It failed soft by
 * design, so nothing went red — and the admin panel's tool list stayed empty
 * for the whole life of the platform while the panel told the operator the
 * tools would "appear automatically".
 *
 * The sync lives host-side now: the build publishes the same payload as a
 * static artefact (`src/pages/tools-catalog.json.ts` → `dist/tools-catalog.json`)
 * and `/_setup/install.php` posts it with the token entered in its form. That
 * also keeps the token off the CI runner. See TOOLS-PLATFORM.md.
 */

import { catalog as composed } from "virtual:tools-catalog";
import type { ToolDef } from "@tracht-digital-solutions/tds-tools-contract";

/** A tool with its admin-resolved runtime flags folded onto the manifest def. */
export interface ResolvedTool extends ToolDef {
  enabled: boolean;
  requiresLogin: boolean;
  isPremium: boolean;
  priceCents: number;
}

/** Resolved AdSense config (mirrors the tds-blog `ads` block shape). */
export interface AdsConfig {
  enabled: boolean;
  publisherId: string;
  slotCatalog: string;
  slotTool: string;
}

const ADS_OFF: AdsConfig = { enabled: false, publisherId: "", slotCatalog: "", slotTool: "" };

const DEMO_MODE = import.meta.env.PUBLIC_DEMO_MODE === "true";

/**
 * The catalog API this build reads its overrides from.
 *
 * Deliberately a constant, not an env lookup. This used to read
 * `import.meta.env.CATALOG_API_URL`, which — like the registry token above —
 * is never populated: it carries no `PUBLIC_` prefix and there is no
 * `envField` schema, so Vite leaves it undefined and the `??` default was the
 * only value it ever had. A key with no working reader is worse than a
 * constant, because it reads like configuration that exists.
 *
 * Runtime targets are a different question and are answered by
 * `tds-runtime.json` on the host (see `apiBase()` in tds-shared); this is the
 * BUILD-time read, and the gateway hostname is stable.
 */
const BASE_URL = "https://api.tracht-digital.de";

interface CatalogApiTool {
  id: string;
  enabled?: boolean;
  requires_login?: boolean;
  is_premium?: boolean;
  price_cents?: number;
}
interface CatalogApiResponse {
  tools?: CatalogApiTool[];
  ads?: {
    enabled?: boolean;
    publisherId?: string;
    slotCatalog?: string;
    slotTool?: string;
  };
}

let cache: Promise<{ tools: ResolvedTool[]; ads: AdsConfig }> | null = null;

/** Merge one manifest tool with its (optional) admin override row. */
function resolve(tool: ToolDef, row: CatalogApiTool | undefined): ResolvedTool {
  return {
    ...tool,
    enabled: row?.enabled ?? true,
    requiresLogin: row?.requires_login ?? tool.requiresLoginDefault ?? false,
    isPremium: row?.is_premium ?? tool.premiumDefault ?? false,
    priceCents: row?.price_cents ?? tool.priceCentsDefault ?? 0,
  };
}

/** Every tool with manifest defaults (no backend) — the safe fallback. */
function fallback(): { tools: ResolvedTool[]; ads: AdsConfig } {
  return { tools: composed.tools.map((t) => resolve(t, undefined)), ads: ADS_OFF };
}

async function load(): Promise<{ tools: ResolvedTool[]; ads: AdsConfig }> {
  if (DEMO_MODE) return fallback();
  try {
    // The timeout is the point: every other failure mode here already falls
    // back, but a HANGING api host (not refusing, not erroring) would block
    // the release build until the job timeout — the one path that could
    // actually leave the live site stale.
    const res = await fetch(`${BASE_URL}/tools/catalog`, { signal: AbortSignal.timeout(10_000) });
    if (!res.ok) return fallback();
    const data = (await res.json()) as CatalogApiResponse;
    const byId = new Map((data.tools ?? []).map((r) => [r.id, r]));
    const tools = composed.tools.map((t) => resolve(t, byId.get(t.id)));

    const a = data.ads;
    const ads: AdsConfig =
      a && a.enabled === true && typeof a.publisherId === "string" && a.publisherId
        ? {
            enabled: true,
            publisherId: a.publisherId,
            slotCatalog: typeof a.slotCatalog === "string" ? a.slotCatalog : "",
            slotTool: typeof a.slotTool === "string" ? a.slotTool : "",
          }
        : ADS_OFF;

    return { tools, ads };
  } catch (err) {
    console.warn("[tds-tools] catalog API unreachable — using manifest defaults, ads off:", err);
    return fallback();
  }
}

/** The resolved catalog (memoised for the whole static build). */
export function toolsData(): Promise<{ tools: ResolvedTool[]; ads: AdsConfig }> {
  if (!cache) cache = load();
  return cache;
}

/** Enabled tools only (what the catalog + routes should surface). */
export async function enabledTools(): Promise<ResolvedTool[]> {
  return (await toolsData()).tools.filter((t) => t.enabled);
}

/** The AdSense config. */
export async function adsConfig(): Promise<AdsConfig> {
  return (await toolsData()).ads;
}
