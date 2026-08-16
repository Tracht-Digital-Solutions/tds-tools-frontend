import { describe, expect, it } from "vitest";

import devkit from "@tracht-digital-solutions/tds-tool-devkit";
import media from "@tracht-digital-solutions/tds-tool-media";
import qr from "@tracht-digital-solutions/tds-tool-qr";
import textkit from "@tracht-digital-solutions/tds-tool-textkit";

import { site } from "./site";

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
