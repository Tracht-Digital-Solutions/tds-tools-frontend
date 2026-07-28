/**
 * Stand-in for `virtual:tools-catalog`, the module `toolHost()` generates at
 * build time from the composed tool packs. Vitest aliases the virtual specifier
 * to this file (see vitest.config.ts) so `src/lib/catalog.ts` can be tested
 * without running an Astro build.
 *
 * The shape mirrors a real composition: one plain tool, one that defaults to
 * login-required, and one premium tool with a price — enough to exercise every
 * branch of the manifest-default → admin-override merge.
 */
import type { ToolDef } from "@tracht-digital-solutions/tds-tools-contract";

export const catalog: { tools: ToolDef[] } = {
  tools: [
    {
      id: "free-tool",
      slug: "kostenloses-tool",
      name: "Kostenloses Tool",
      category: "developer",
      description: "Ein freies Werkzeug ohne Anmeldung.",
      icon: "wrench",
      keywords: ["frei", "test", "tool"],
      component: "@scope/pack/tools/Free.astro",
    },
    {
      id: "login-tool",
      slug: "login-tool",
      name: "Login-Tool",
      category: "marketing",
      description: "Erfordert standardmäßig eine Anmeldung.",
      icon: "lock",
      keywords: ["login", "test", "tool"],
      component: "@scope/pack/tools/Login.astro",
      requiresLoginDefault: true,
    },
    {
      id: "premium-tool",
      slug: "premium-tool",
      name: "Premium-Tool",
      category: "media",
      description: "Kostenpflichtiges Werkzeug mit Standardpreis.",
      icon: "star",
      keywords: ["premium", "test", "tool"],
      component: "@scope/pack/tools/Premium.astro",
      premiumDefault: true,
      priceCentsDefault: 500,
    },
  ] as ToolDef[],
};
