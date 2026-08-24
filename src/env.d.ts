/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Virtual modules served by `toolHost` (tds-tools-contract/astro) at build time.
declare module "virtual:tools-catalog" {
  import type { ComposedCatalog } from "@tracht-digital-solutions/tds-tools-contract";
  export const catalog: ComposedCatalog;
}

declare module "virtual:tools-components" {
  // id → Astro/React component factory. Rendered by the /tools/[slug] template.
  export const components: Record<string, unknown>;
}

/**
 * NB: only `PUBLIC_`-prefixed keys actually reach `import.meta.env` — Astro/Vite
 * inline those and nothing else, and this app declares no `envField` schema. A
 * non-prefixed key declared here would type-check everywhere and be `undefined`
 * at runtime, which is exactly how `CATALOG_API_URL` and `TOOLS_REGISTRY_TOKEN`
 * survived here as dead configuration (see src/lib/catalog.ts). Do not add one
 * back without a matching `envField` entry.
 */
interface ImportMetaEnv {
  /** "true" builds with the static fallback catalog + ads off (dev/staging). */
  readonly PUBLIC_DEMO_MODE?: string;
  /** Public panel API base for the client-side gate (entitlement/checkout/me). */
  readonly PUBLIC_API_URL?: string;
  /** Login URL the premium/login gate links to (the central login site). */
  readonly PUBLIC_LOGIN_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
