import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import devkit from "@tracht-digital-solutions/tds-tool-devkit";
import media from "@tracht-digital-solutions/tds-tool-media";
import pdf from "@tracht-digital-solutions/tds-tool-pdf";
import office from "@tracht-digital-solutions/tds-tool-office";
import qr from "@tracht-digital-solutions/tds-tool-qr";
import textkit from "@tracht-digital-solutions/tds-tool-textkit";

import { EN_ENABLED, localizedPath, neutralPath, ogLocale, seoConfig } from "./seo";
import {
  asGraph,
  breadcrumbSchema,
  faqPageSchema,
  howToSchema,
  itemListSchema,
  organizationSchema,
  softwareApplicationSchema,
  websiteSchema,
} from "./jsonld";
import { site } from "./site";

/**
 * SEO assertions for the tools site.
 *
 * Everything measured here shares one property: **it has no visible failure
 * mode.** A truncated `<title>`, an OG image that 404s, a `hreflang` pair that
 * does not point back, a business address that differs by one word from the
 * Impressum — none of them render wrong, error, or fail a build. They are
 * absent from a search result nobody on the team is looking at, or wrong in a
 * preview pane on someone else's phone. So they are measured, not reviewed.
 *
 * The per-tool DESCRIPTION budget lives in `site.test.ts`; this file owns the
 * title budget, the identity data and the structured data.
 */

const tools = [qr, textkit, devkit, media, pdf, office].flatMap((p) => p.tools);

/** Google renders roughly 60 characters of a title before it truncates. */
const TITLE_RENDERED = 60;

describe("page titles", () => {
  it.each(tools.map((t) => [t.slug, t] as const))(
    "%s has a title inside what a SERP renders",
    (_slug, tool) => {
      // Exactly what `/tools/[slug].astro` puts in <title>.
      const title = tool.seo?.title ?? `${tool.name} — ${site.name}`;
      expect(title.length, `${tool.slug}: "${title}" is ${title.length} chars`)
        .toBeLessThanOrEqual(TITLE_RENDERED);
    },
  );

  it("keeps the catalog title inside the same bound", () => {
    const title = `${site.name} — ${site.tagline}`;
    expect(title.length, `"${title}" is ${title.length} chars`).toBeLessThanOrEqual(
      TITLE_RENDERED,
    );
  });

  it("gives every tool a DISTINCT title", () => {
    const titles = tools.map((t) => t.seo?.title ?? `${t.name} — ${site.name}`);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("leads every tool title with the tool, not the brand", () => {
    // A site ranking on tool queries wants the matched words first; a title
    // that opens with "TD Tools — …" spends the rendered budget on a brand
    // nobody searched for.
    for (const tool of tools) {
      const title = tool.seo?.title ?? `${tool.name} — ${site.name}`;
      expect(title.startsWith(site.name), `${tool.slug} leads with the brand`).toBe(
        false,
      );
    }
  });
});

/**
 * The landingpage's `seo.ts`, when the sibling repo is checked out beside this
 * one — the normal developer workspace, and nothing like a CI runner, which
 * clones this repo alone.
 *
 * Reading it unconditionally is why this suite could never run in CI: the
 * ENOENT is thrown while the module is being collected, so it takes the whole
 * FILE down, not just these nine cases. Same convention as the DB-backed PHP
 * tests — run where the inputs exist, skip loudly where they do not.
 */
const LANDING_SEO = join(__dirname, "..", "..", "..", "tds-landingpage-frontend", "src", "lib", "seo.ts");
const hasLandingRepo = existsSync(LANDING_SEO);

describe.runIf(hasLandingRepo)("the business identity", () => {
  /**
   * The whole value of a local-business signal is that the name, address and
   * phone are byte-identical everywhere they appear. A paraphrase reads as a
   * DIFFERENT business, which is worse than emitting nothing — so the source
   * of truth is the landingpage's `seo.ts` and this compares against it
   * rather than trusting two hand-kept copies.
   */
  // Conditional, and `describe.runIf` alone is NOT enough: vitest still runs a
  // skipped suite's callback to collect its test names, so an unconditional
  // read here throws during collection and takes the whole file down — which
  // is precisely how this suite failed in CI. Verified by pointing the path at
  // a directory that does not exist.
  const landingSeo = hasLandingRepo ? readFileSync(LANDING_SEO, "utf8") : "";

  it.each([
    ["streetAddress", seoConfig.address.streetAddress],
    ["postalCode", seoConfig.address.postalCode],
    ["addressLocality", seoConfig.address.addressLocality],
    ["addressRegion", seoConfig.address.addressRegion],
    ["telephone", seoConfig.telephone],
    ["email", seoConfig.email],
    ["legalName", seoConfig.legalName],
    ["vatID", seoConfig.vatID],
    ["name", seoConfig.name],
  ])("%s matches the landingpage verbatim", (_field, value) => {
    expect(landingSeo).toContain(value);
  });

  it("anchors the organization node on the MAIN origin", () => {
    // Both sibling properties describe the same business. A second
    // `#organization` id on a second origin describes a second business.
    const org = organizationSchema() as Record<string, unknown>;
    expect(org["@id"]).toBe("https://tracht-digital.de/#organization");
  });

  it("points defaultOgImage at the route that actually emits it", () => {
    // This is the regression that shipped: the layout advertised
    // `/og-default.png` and no repo ever generated it, so every share
    // rendered a blank card with nothing anywhere reporting it.
    expect(seoConfig.defaultOgImage).toBe("/og/default.png");
    const route = join(__dirname, "..", "pages", "og", "default.png.ts");
    expect(() => readFileSync(route, "utf8")).not.toThrow();
  });

  it("keeps the origin in step with lib/site", () => {
    expect(seoConfig.url).toBe(site.origin);
  });
});

describe("hreflang paths", () => {
  it("round-trips a German path to English and back", () => {
    expect(localizedPath("/", "en")).toBe("/en/");
    expect(localizedPath("/tools/qr-code-generator", "en")).toBe(
      "/en/tools/qr-code-generator",
    );
    expect(neutralPath("/en/tools/qr-code-generator")).toBe("/tools/qr-code-generator");
    expect(neutralPath("/en/")).toBe("/");
    expect(neutralPath("/en")).toBe("/");
  });

  it("is idempotent — a localized path localizes to itself", () => {
    // The alternates are computed from whatever path the page happens to be
    // on, so the EN page must produce the same pair as the DE page. If this
    // drifted, the two sides would name different URLs and the set would be
    // silently invalid.
    const de = "/tools/passwort-generator";
    const en = localizedPath(de, "en");
    expect(localizedPath(en, "en")).toBe(en);
    expect(localizedPath(en, "de")).toBe(de);
  });

  it("does not mistake a path that merely starts with 'en'", () => {
    // `/entwickler…` must not be read as the English tree.
    expect(neutralPath("/entwickler")).toBe("/entwickler");
  });

  it("declares an OG locale for both languages", () => {
    expect(ogLocale.de).toBe("de_DE");
    expect(ogLocale.en).toBe("en_GB");
  });

  it("only claims an English alternate once the English tree is built", () => {
    // EN_ENABLED gates the <head> block. An hreflang pointing at a 404
    // invalidates the whole set, German side included — so this flag and the
    // existence of src/pages/en must agree.
    const enTreeExists = (() => {
      try {
        readFileSync(join(__dirname, "..", "pages", "en", "index.astro"), "utf8");
        return true;
      } catch {
        return false;
      }
    })();
    expect(EN_ENABLED).toBe(enTreeExists);
  });
});

describe("structured data", () => {
  const toolUrl = `${site.origin}/tools/qr-code-generator`;

  it("emits one graph, not a pile of contexts", () => {
    const graph = asGraph(organizationSchema(), websiteSchema(site.description)) as Record<
      string,
      unknown
    >;
    expect(graph["@context"]).toBe("https://schema.org");
    expect(Array.isArray(graph["@graph"])).toBe(true);
    // A node inside a graph must NOT restate the context.
    for (const node of graph["@graph"] as Record<string, unknown>[]) {
      expect(node["@context"]).toBeUndefined();
    }
  });

  it("survives JSON.stringify → JSON.parse", () => {
    // The graph is written into a <script> with `set:html`, so an
    // unserialisable value (undefined, a cycle, a Date) breaks the whole
    // block silently rather than failing the build.
    const graph = asGraph(
      organizationSchema(),
      websiteSchema(site.description),
      itemListSchema(tools.map((t) => ({ name: t.name, url: `${site.origin}/tools/${t.slug}` }))),
      breadcrumbSchema([{ name: "Alle Tools", url: site.origin }]),
      faqPageSchema([{ q: "Frage?", a: "Antwort." }]),
      howToSchema("Vorgehen", [{ title: "Schritt", description: "Text." }]),
    );
    const round = JSON.parse(JSON.stringify(graph));
    expect(round["@graph"]).toHaveLength(6);
  });

  it("declares a free tool as free AND priced at zero", () => {
    const node = softwareApplicationSchema({
      name: "QR-Code-Generator",
      url: toolUrl,
      description: "…",
      type: "WebApplication",
      lang: "de",
      isFree: true,
      priceCents: 0,
    }) as Record<string, unknown>;
    expect(node.isAccessibleForFree).toBe(true);
    expect((node.offers as Record<string, unknown>).price).toBe("0.00");
  });

  it("states a premium tool's REAL price", () => {
    // The previous node emitted `(priceCents / 100)` for every tool while
    // also implying everything was free — so the one tool that charges money
    // was the one it described wrongly.
    const node = softwareApplicationSchema({
      name: "PDF-Werkzeuge",
      url: `${site.origin}/tools/pdf-werkzeuge`,
      description: "…",
      type: "WebApplication",
      lang: "de",
      isFree: false,
      priceCents: 900,
    }) as Record<string, unknown>;
    expect(node.isAccessibleForFree).toBe(false);
    expect((node.offers as Record<string, unknown>).price).toBe("9.00");
  });

  it("orders breadcrumb positions from 1", () => {
    const crumb = breadcrumbSchema([
      { name: "Alle Tools", url: site.origin },
      { name: "QR-Code-Generator", url: toolUrl },
    ]) as { itemListElement: { position: number; item: string }[] };
    expect(crumb.itemListElement.map((i) => i.position)).toEqual([1, 2]);
    expect(crumb.itemListElement[1].item).toBe(toolUrl);
  });

  it("numbers HowTo steps in the order they are given", () => {
    const howTo = howToSchema("Vorgehen", [
      { title: "Eins", description: "a" },
      { title: "Zwei", description: "b" },
      { title: "Drei", description: "c" },
    ]) as { step: { position: number; name: string }[] };
    expect(howTo.step.map((s) => s.position)).toEqual([1, 2, 3]);
    expect(howTo.step[2].name).toBe("Drei");
  });
});
