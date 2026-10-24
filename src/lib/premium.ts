/**
 * Premium stages, as the admin manages them (`tds-ext-tools`, `/tools/tiers`).
 *
 * Premium is a monthly subscription since 2026-10-24: each stage has a FIXED
 * monthly price, its advertising copy and the tools it unlocks. The site
 * renders those prices server-side, so they are on the page for every visitor
 * and every crawler; a stage change in the panel refreshes the cache.
 *
 * Fails soft to no stages: the premium block then still shows the tools, just
 * without anything to book. One-off purchases made before stay valid (the
 * backend honours them); this site no longer sells them.
 */
import { apiBase } from "./connection";
import { memoisedOr } from "./contentFetch";
import { readPublicJson } from "./publicFetch";
import type { Lang } from "./seo";

export interface PremiumTier {
  slug: string;
  name: string;
  tagline: string | null;
  features: string[];
  nameEn: string | null;
  taglineEn: string | null;
  featuresEn: string[];
  priceCents: number;
  toolIds: string[];
  highlight: boolean;
}

export interface PremiumOffer {
  tiers: PremiumTier[];
  currency: string;
}

interface TiersResponse {
  tiers?: Array<{
    slug?: unknown;
    name?: unknown;
    name_en?: unknown;
    tagline?: unknown;
    tagline_en?: unknown;
    features?: unknown;
    features_en?: unknown;
    price_cents?: unknown;
    tool_ids?: unknown;
    highlight?: unknown;
  }>;
  currency?: unknown;
}

const DEMO_MODE = import.meta.env.PUBLIC_DEMO_MODE === "true";
const NONE: PremiumOffer = { tiers: [], currency: "EUR" };

const text = (v: unknown): string | null => (typeof v === "string" && v.trim() !== "" ? v.trim() : null);
const list = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string" && x.trim() !== "") : []);

/** Normalise the API payload; drops a stage without a name, a slug or a price. */
export function parseTiers(data: TiersResponse): PremiumOffer {
  const tiers: PremiumTier[] = [];
  for (const t of data.tiers ?? []) {
    const slug = text(t.slug);
    const name = text(t.name);
    const price = typeof t.price_cents === "number" && Number.isInteger(t.price_cents) ? t.price_cents : 0;
    if (!slug || !name || price <= 0) continue;
    tiers.push({
      slug,
      name,
      tagline: text(t.tagline),
      features: list(t.features),
      nameEn: text(t.name_en),
      taglineEn: text(t.tagline_en),
      featuresEn: list(t.features_en),
      priceCents: price,
      toolIds: list(t.tool_ids),
      highlight: t.highlight === true,
    });
  }
  const currency = typeof data.currency === "string" && /^[A-Z]{3}$/.test(data.currency) ? data.currency : "EUR";
  return { tiers, currency };
}

export function premiumOffer(): Promise<PremiumOffer> {
  if (DEMO_MODE) return Promise.resolve(NONE);
  return memoisedOr(
    "tools:tiers",
    async () => parseTiers(await readPublicJson<TiersResponse>(`${apiBase()}/tools/tiers`)),
    () => NONE,
    "premium stages (none shown)",
  );
}

/** The cheapest stage that unlocks the tool — what "Freischalten" on its page books. */
export function cheapestTierFor(toolId: string, tiers: PremiumTier[]): PremiumTier | null {
  let best: PremiumTier | null = null;
  for (const t of tiers) {
    if (t.toolIds.includes(toolId) && (best === null || t.priceCents < best.priceCents)) best = t;
  }
  return best;
}

/** The stage in the page language; English falls back to the German copy field by field. */
export function tierCopy(tier: PremiumTier, lang: Lang): { name: string; tagline: string | null; features: string[] } {
  if (lang === "en") {
    return {
      name: tier.nameEn ?? tier.name,
      tagline: tier.taglineEn ?? tier.tagline,
      features: tier.featuresEn.length > 0 ? tier.featuresEn : tier.features,
    };
  }
  return { name: tier.name, tagline: tier.tagline, features: tier.features };
}

/** `990` → `9,90 €` (de) / `€9.90` (en). */
export function formatPrice(cents: number, currency: string, lang: Lang): string {
  return (cents / 100).toLocaleString(lang === "de" ? "de-DE" : "en-GB", { style: "currency", currency });
}
