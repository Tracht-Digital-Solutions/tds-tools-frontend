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
const BASE_URL = import.meta.env.CATALOG_API_URL ?? "https://api.tracht-digital.de";

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

/**
 * Best-effort registry sync — push the composed tool list (ids + names +
 * categories + defaults) to the backend so the admin panel can see + manage
 * every tool. Runs once per build when `TOOLS_REGISTRY_TOKEN` is set (release
 * builds); never throws, never clobbers an admin override (the backend upserts).
 */
async function syncRegistry(): Promise<void> {
  const token = import.meta.env.TOOLS_REGISTRY_TOKEN;
  if (!token) return;
  try {
    await fetch(`${BASE_URL}/tools/registry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        tools: composed.tools.map((t) => ({
          id: t.id,
          name: t.name,
          category: t.category,
          requires_login_default: t.requiresLoginDefault ?? false,
          premium_default: t.premiumDefault ?? false,
          price_cents_default: t.priceCentsDefault ?? 0,
        })),
      }),
    });
  } catch (err) {
    console.warn("[tds-tools] registry sync failed (non-fatal):", err);
  }
}

async function load(): Promise<{ tools: ResolvedTool[]; ads: AdsConfig }> {
  if (DEMO_MODE) return fallback();
  await syncRegistry();
  try {
    const res = await fetch(`${BASE_URL}/tools/catalog`);
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
