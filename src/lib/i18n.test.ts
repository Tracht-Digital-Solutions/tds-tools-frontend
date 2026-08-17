import { describe, expect, it } from "vitest";

import devkit from "@tracht-digital-solutions/tds-tool-devkit";
import media from "@tracht-digital-solutions/tds-tool-media";
import qr from "@tracht-digital-solutions/tds-tool-qr";
import textkit from "@tracht-digital-solutions/tds-tool-textkit";

import { categoryLabels, copy, t, toolCopyEn, toolCopyFor } from "./i18n";
import { guides } from "./guides";
import { EN_ENABLED } from "./seo";
import { site, categoryOrder } from "./site";

/**
 * The English tree.
 *
 * An English page is not a feature until it is COMPLETE — a half-translated
 * page is worse for a reader than a German one and worse for a crawler than
 * nothing, because it gets indexed as thin duplicate content. So these tests
 * are mostly about completeness: every tool, every category, every guide.
 *
 * The SEO budgets that apply to the German copy apply here identically; they
 * are properties of the search engine, not of a language.
 */

const tools = [qr, textkit, devkit, media].flatMap((p) => p.tools);
const RENDERED = 160;
const MIN_USEFUL = 80;
const TITLE_RENDERED = 60;

describe("site copy", () => {
  it("exists in both languages with the same keys", () => {
    // A key present in one language and missing in the other renders
    // `undefined` on the page — visible only to whoever reads that language.
    expect(Object.keys(copy.de).sort()).toEqual(Object.keys(copy.en).sort());
  });

  it("keeps the meta-description budget in English too", () => {
    const d = copy.en.description;
    expect(d.length, `${d.length} chars`).toBeLessThanOrEqual(RENDERED);
    expect(d.length).toBeGreaterThan(MIN_USEFUL);
  });

  it("keeps brand and town inside the rendered part in both languages", () => {
    for (const lang of ["de", "en"] as const) {
      const rendered = copy[lang].description.slice(0, RENDERED);
      expect(rendered, `${lang}`).toMatch(/TDS|Tracht Digital Solutions/);
      expect(rendered, `${lang}`).toMatch(/Schwarzenbek/);
    }
  });

  it("gives the two languages DIFFERENT descriptions", () => {
    // An English page carrying the German description would be indexed as a
    // duplicate of it, which is the one outcome worse than not translating.
    expect(copy.en.description).not.toBe(copy.de.description);
  });

  it("keeps the catalog title inside the title budget in both languages", () => {
    for (const lang of ["de", "en"] as const) {
      const title = `${site.name} — ${copy[lang].tagline}`;
      expect(title.length, `${lang}: ${title}`).toBeLessThanOrEqual(TITLE_RENDERED);
    }
  });

  it("pluralises the tool counter in both languages", () => {
    expect(t("de").toolCount(1)).toBe("1 Werkzeug");
    expect(t("de").toolCount(2)).toBe("2 Werkzeuge");
    expect(t("en").toolCount(1)).toBe("1 tool");
    expect(t("en").toolCount(2)).toBe("2 tools");
  });

  it("carries no stray whitespace", () => {
    for (const lang of ["de", "en"] as const) {
      for (const [key, value] of Object.entries(copy[lang])) {
        if (typeof value !== "string") continue;
        expect(value.trim(), `${lang}.${key}`).toBe(value);
        expect(value, `${lang}.${key}`).not.toMatch(/\s{2,}/);
      }
    }
  });
});

describe("category labels", () => {
  it("labels every category in both languages", () => {
    for (const lang of ["de", "en"] as const) {
      for (const cat of categoryOrder) {
        expect(categoryLabels[lang][cat], `${lang}/${cat}`).toBeTruthy();
      }
    }
  });
});

describe("tool copy", () => {
  it("has English copy for every composed tool", () => {
    // The fallback in `toolCopyFor` returns German rather than nothing, which
    // is a safety net for a newly composed tool — not a strategy. This is what
    // keeps it from becoming one.
    for (const tool of tools) {
      expect(toolCopyEn[tool.slug], `no English copy for ${tool.slug}`).toBeDefined();
    }
  });

  it("has no English copy for a tool that does not exist", () => {
    const slugs = new Set(tools.map((t2) => t2.slug));
    for (const slug of Object.keys(toolCopyEn)) {
      expect(slugs.has(slug), `English copy for unknown tool "${slug}"`).toBe(true);
    }
  });

  it.each(Object.entries(toolCopyEn))("%s fits the description budget", (slug, c) => {
    expect(c.description.length, `${slug}: ${c.description.length} chars`)
      .toBeLessThanOrEqual(RENDERED);
    expect(c.description.length, `${slug} is too thin`).toBeGreaterThan(MIN_USEFUL);
  });

  it.each(Object.entries(toolCopyEn))("%s fits the title budget", (slug, c) => {
    expect(c.seoTitle.length, `${slug}: "${c.seoTitle}"`).toBeLessThanOrEqual(
      TITLE_RENDERED,
    );
    expect(c.seoTitle.startsWith(site.name), `${slug} leads with the brand`).toBe(false);
  });

  it("gives every English tool a distinct description and title", () => {
    const descriptions = Object.values(toolCopyEn).map((c) => c.description);
    const titles = Object.values(toolCopyEn).map((c) => c.seoTitle);
    expect(new Set(descriptions).size).toBe(descriptions.length);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("does not leave a German description on an English tool", () => {
    for (const tool of tools) {
      const de = toolCopyFor("de", tool, site.name);
      const en = toolCopyFor("en", tool, site.name);
      expect(en.description, `${tool.slug}`).not.toBe(de.description);
      expect(en.seoTitle, `${tool.slug}`).not.toBe(de.seoTitle);
    }
  });

  it("resolves German from the manifest, not from the English table", () => {
    const tool = tools.find((t2) => t2.slug === "qr-code-generator")!;
    expect(toolCopyFor("de", tool, site.name).name).toBe(tool.name);
  });

  it("falls back to German for a tool with no English copy", () => {
    const unknown = {
      slug: "does-not-exist",
      name: "Neues Werkzeug",
      description: "Beschreibung.",
    };
    // A visibly imperfect English page beats an empty one when a pack adds a
    // tool before its translation lands.
    expect(toolCopyFor("en", unknown, site.name).name).toBe("Neues Werkzeug");
  });
});

describe("guides in English", () => {
  it("has an English guide for every tool, now that the tree is live", () => {
    // EN_ENABLED is what puts `/en/` in front of a reader and in an hreflang
    // set. A tool whose guide is German-only would render a German article
    // under an `<html lang="en">` — the exact signal that gets a page
    // classified as low quality.
    expect(EN_ENABLED).toBe(true);
    for (const tool of tools) {
      expect(guides[tool.slug]?.en, `no English guide for ${tool.slug}`).toBeDefined();
    }
  });

  it("does not ship the German text as the English guide", () => {
    for (const [slug, set] of Object.entries(guides)) {
      if (!set.en) continue;
      expect(set.en.intro[0], `${slug} intro is untranslated`).not.toBe(set.de.intro[0]);
      expect(set.en.privacy, `${slug} privacy is untranslated`).not.toBe(set.de.privacy);
    }
  });

  it("keeps the two languages structurally parallel", () => {
    // Not a word count — a translation may legitimately differ in length —
    // but a guide that dropped half its FAQ in translation is a different
    // page, and the JSON-LD would then differ between the two.
    for (const [slug, set] of Object.entries(guides)) {
      if (!set.en) continue;
      expect(set.en.steps.length, `${slug} steps`).toBe(set.de.steps.length);
      expect(set.en.faq.length, `${slug} faq`).toBe(set.de.faq.length);
      expect(set.en.useCases.length, `${slug} use cases`).toBe(set.de.useCases.length);
      expect(set.en.related, `${slug} related`).toEqual(set.de.related);
    }
  });

  it("asks real questions in English too", () => {
    for (const [slug, set] of Object.entries(guides)) {
      if (!set.en) continue;
      for (const item of set.en.faq) {
        expect(item.q.endsWith("?"), `${slug}: "${item.q}"`).toBe(true);
        expect(item.a.length, `${slug}: answer to "${item.q}"`).toBeGreaterThan(80);
      }
    }
  });
});
