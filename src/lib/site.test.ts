import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import devkit from "@tracht-digital-solutions/tds-tool-devkit";
import media from "@tracht-digital-solutions/tds-tool-media";
import qr from "@tracht-digital-solutions/tds-tool-qr";
import textkit from "@tracht-digital-solutions/tds-tool-textkit";

import { categoryLabels, categoryOrder, site, toolCountLabel } from "./site";

/**
 * Meta-description budgets for the public tools site.
 *
 * This exists because the site-level description shipped at 201 characters —
 * everything past "…ohne Anmeldung." was cut in the SERP, which happened to be
 * the entire brand and local signal. It is the same defect the landingpage's
 * `seo.ts` fixed in 2026-07-29, and it recurred here for the same reason:
 * a meta description has no visible failure mode. Nothing renders wrong,
 * nothing errors, the page looks perfect — the tail is simply absent from a
 * search result nobody on the team is looking at.
 *
 * So the bound is asserted as a property of the SEARCH ENGINE (one number for
 * every description on the site), never as a per-string budget seeded from
 * whatever the copy happens to be today.
 *
 * The per-TOOL descriptions are asserted here rather than in the four
 * `tds-tool-*` repos deliberately: those repos publish independently, and this
 * is the surface that actually renders them into `<meta>`. A pack that ships an
 * over-long description fails the site build that would have deployed it.
 */
const RENDERED = 160;
const MIN_USEFUL = 80;

const packs = [qr, textkit, devkit, media];
const tools = packs.flatMap((p) => p.tools);

describe("the site-level description", () => {
  it("fits inside what Google actually renders", () => {
    expect(site.description.length, `${site.description.length} chars`).toBeLessThanOrEqual(
      RENDERED,
    );
  });

  it("is long enough to be worth rendering", () => {
    expect(site.description.length).toBeGreaterThan(MIN_USEFUL);
  });

  it("keeps the brand and the local signal INSIDE the rendered part", () => {
    // The whole point of the fix: these used to sit past the cut, so the site
    // published a description that identified nobody.
    const rendered = site.description.slice(0, RENDERED);
    expect(rendered).toMatch(/TDS|Tracht Digital Solutions/);
    expect(rendered).toMatch(/Schwarzenbek/);
  });

  it("carries no stray whitespace that would render oddly", () => {
    expect(site.description.trim()).toBe(site.description);
    expect(site.description).not.toMatch(/\s{2,}/);
  });
});

describe("every composed tool has a usable meta description", () => {
  it("composes the packs this site actually ships", () => {
    expect(tools.length).toBeGreaterThanOrEqual(7);
  });

  it.each(tools.map((t) => [t.slug, t] as const))("%s fits the budget", (_slug, tool) => {
    // This is what `/tools/[slug].astro` renders into <meta name="description">.
    const description = tool.seo?.description ?? tool.description;
    expect(description, `${tool.slug} has no description at all`).toBeTruthy();
    expect(description.length, `${tool.slug}: ${description.length} chars`).toBeLessThanOrEqual(
      RENDERED,
    );
    expect(description.length, `${tool.slug} is too thin`).toBeGreaterThan(MIN_USEFUL);
  });

  it("gives every tool a DISTINCT description", () => {
    // Two tools sharing a description is a duplicate-content signal, and the
    // cheapest way for it to happen is a copy-paste while adding a pack.
    const seen = tools.map((t) => t.seo?.description ?? t.description);
    expect(new Set(seen).size).toBe(seen.length);
  });

  it("keeps tool slugs globally unique across packs", () => {
    // composeToolPacks hard-errors on this at build time; asserting it here
    // turns a build crash into a named test failure.
    const slugs = tools.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("category section headings", () => {
  it("pluralises the tool counter", () => {
    // The catalog genuinely produces categories of one — four of the six
    // sections hold a single tool — so the singular is the common case here,
    // not the edge case.
    expect(toolCountLabel(1)).toBe("1 Werkzeug");
    expect(toolCountLabel(2)).toBe("2 Werkzeuge");
    expect(toolCountLabel(0)).toBe("0 Werkzeuge");
  });

  it("labels and orders every category the contract can produce", () => {
    // `ToolCategory` is a closed union in the contract, and a value with no
    // label renders `undefined` as a section heading while a value missing from
    // the order silently DROPS its whole section — the page just has fewer
    // tools on it. Both are invisible to `astro check`.
    for (const cat of categoryOrder) {
      expect(categoryLabels[cat], `no label for category ${cat}`).toBeTruthy();
    }
    expect(new Set(categoryOrder).size).toBe(categoryOrder.length);
    expect(Object.keys(categoryLabels).sort()).toEqual([...categoryOrder].sort());
    // Every category the composed packs actually use must be orderable.
    for (const tool of tools) {
      expect(categoryOrder, `category ${tool.category} is not ordered`).toContain(
        tool.category,
      );
    }
  });
});

describe("tool icons", () => {
  it("has an inline path for every icon the composed packs declare", () => {
    // `Icon.astro` falls back to a generic square with `paths[name] ?? …`, so a
    // missing key is completely silent: the tool renders a blank box on its card
    // AND in its page heading, and nothing logs, throws or fails a build.
    // `file-text` (the premium PDF tool) shipped exactly that way.
    // Read as text because an .astro component is compiled by neither vitest
    // nor tsc — the same reason the host's activeCompany header has its own test.
    const icon = readFileSync(
      join(__dirname, "..", "components", "Icon.astro"),
      "utf8",
    );
    const declared = new Set(
      [...icon.matchAll(/^\s*"?([a-z-]+)"?:\s*"M/gm)].map((m) => m[1]),
    );
    for (const tool of tools) {
      if (!tool.icon) continue;
      expect(declared, `Icon.astro has no path for "${tool.icon}"`).toContain(
        tool.icon,
      );
    }
  });
});
