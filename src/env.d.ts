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

interface ImportMetaEnv {
  /** Build-time base URL of the tools catalog API (tds-ext-tools via the gateway). */
  readonly CATALOG_API_URL?: string;
  /** "true" builds with the static fallback catalog + ads off (dev/staging). */
  readonly PUBLIC_DEMO_MODE?: string;
  /** Auth API base for the premium login gate (SSO cookie verify). */
  readonly PUBLIC_AUTH_API_URL?: string;
  /** Token for the build-time registry sync (POST /tools/registry). Release only. */
  readonly TOOLS_REGISTRY_TOKEN?: string;
  /** Public panel API base for the client-side gate (entitlement/checkout/me). */
  readonly PUBLIC_API_URL?: string;
  /** Login URL the premium/login gate links to (customer portal). */
  readonly PUBLIC_LOGIN_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
