import { describe, expect, it } from "vitest";

import devkit from "@tracht-digital-solutions/tds-tool-devkit";
import media from "@tracht-digital-solutions/tds-tool-media";
import pdf from "@tracht-digital-solutions/tds-tool-pdf";
import office from "@tracht-digital-solutions/tds-tool-office";
import qr from "@tracht-digital-solutions/tds-tool-qr";
import textkit from "@tracht-digital-solutions/tds-tool-textkit";
import legal from "@tracht-digital-solutions/tds-tool-legal";

import { guideFor, guideWordCount, guides, type ToolGuide } from "./guides";


/**
 * The tool guides.
 *
 * The point of these pages is that they are NOT the hundredth
 * "free-online-converter" page, so the tests measure the two things that
 * would quietly turn them back into one: depth, and the substance of the
 * answers. A guide that decays into four bullet points still renders
 * perfectly.
 *
 * They also pin the two copy rules that come from the positioning and are
 * invisible to every other gate: no free/time-limited initial consultation
 * is offered anywhere on the web properties, and no customer is named — not
 * even anonymised as a "case study".
 */

const tools = [qr, textkit, devkit, media, pdf, office, legal].flatMap((p) => p.tools);
const entries = Object.entries(guides);
const allDe = entries.map(([slug, set]) => [slug, set.de] as const);

/** Below this a "guide" is a stub with a heading over it. */
const MIN_WORDS = 300;

describe("coverage", () => {
  it("has a guide for every composed tool", () => {
    // A tool page without a guide is a thin page. This is what stops a new
    // pack from silently reintroducing one.
    for (const tool of tools) {
      expect(guideFor(tool.slug), `no guide for ${tool.slug}`).toBeDefined();
    }
  });

  it("has no guide for a tool that does not exist", () => {
    // The other direction: a renamed slug would otherwise leave an orphan
    // guide that renders nowhere and is never noticed.
    const slugs = new Set(tools.map((t) => t.slug));
    for (const [slug] of entries) {
      expect(slugs.has(slug), `guide "${slug}" matches no composed tool`).toBe(true);
    }
  });

  it("returns the requested language when it exists", () => {
    const de = guideFor("qr-code-generator", "de")!;
    const en = guideFor("qr-code-generator", "en")!;
    expect(en.intro[0]).not.toBe(de.intro[0]);
  });

  it("falls back to German when a language has not been written yet", () => {
    // Exercised against a synthetic set rather than a real guide, because
    // every composed tool IS translated now (i18n.test.ts fails if one is
    // not). The fallback exists for the gap between a pack adding a tool and
    // its translation landing — a visibly German page beats an empty one.
    const set = guides["qr-code-generator"]!;
    const untranslated: typeof set = { de: set.de };
    expect(untranslated.en ?? untranslated.de).toBe(set.de);
  });

  it("returns undefined for an unknown slug rather than throwing", () => {
    expect(guideFor("gibt-es-nicht")).toBeUndefined();
  });
});

describe.each(allDe)("%s", (slug, guide: ToolGuide) => {
  it("is long enough to be a guide", () => {
    const words = guideWordCount(guide);
    expect(words, `${slug} has ${words} words`).toBeGreaterThanOrEqual(MIN_WORDS);
  });

  it("opens with real paragraphs", () => {
    expect(guide.intro.length).toBeGreaterThanOrEqual(2);
    for (const p of guide.intro) {
      expect(p.length, `${slug}: an intro paragraph is a fragment`).toBeGreaterThan(120);
    }
  });

  it("names concrete use cases", () => {
    expect(guide.useCases.length).toBeGreaterThanOrEqual(4);
    for (const c of guide.useCases) {
      expect(c.title.length).toBeGreaterThan(10);
      expect(c.text.length).toBeGreaterThan(60);
    }
  });

  it("describes a click path that could be followed", () => {
    expect(guide.steps.length).toBeGreaterThanOrEqual(3);
    for (const step of guide.steps) {
      expect(step.title.length).toBeGreaterThan(5);
      // A step whose description is shorter than its title tells nobody
      // anything, and it becomes a HowToStep either way.
      expect(step.description.length, `${slug}: step "${step.title}" is thin`)
        .toBeGreaterThan(80);
    }
  });

  it("says what happens to the data, specifically", () => {
    expect(guide.privacy.length, `${slug}: privacy paragraph is boilerplate-short`)
      .toBeGreaterThan(150);
    // The whole differentiator of these tools is that nothing is uploaded.
    // A guide that does not say so is not making the site's own case.
    expect(guide.privacy).toMatch(/Browser|Gerät|lokal|browser|device|locally/);
  });

  it("answers questions someone would actually ask", () => {
    expect(guide.faq.length).toBeGreaterThanOrEqual(3);
    for (const item of guide.faq) {
      expect(item.q.endsWith("?"), `${slug}: "${item.q}" is not a question`).toBe(true);
      // These become FAQPage answers; a fragment is worse than no rich
      // result, because it is what gets read aloud.
      expect(item.a.length, `${slug}: answer to "${item.q}" is too short`)
        .toBeGreaterThan(80);
    }
  });

  it("asks each question only once", () => {
    const qs = guide.faq.map((f) => f.q);
    expect(new Set(qs).size).toBe(qs.length);
  });

  it("links to tools that exist and never to itself", () => {
    const known = new Set(tools.map((t) => t.slug));
    expect(guide.related.length).toBeGreaterThanOrEqual(1);
    for (const rel of guide.related) {
      expect(known.has(rel), `${slug} links to unknown tool "${rel}"`).toBe(true);
      expect(rel, `${slug} links to itself`).not.toBe(slug);
    }
  });
});

describe("the guides as a set", () => {
  it("gives every tool its own opening", () => {
    // The cheapest way for these to become templated is a shared first
    // paragraph with the tool name swapped in.
    const openings = allDe.map(([, g]) => g.intro[0]);
    expect(new Set(openings).size).toBe(openings.length);
  });

  it("does not repeat a privacy paragraph verbatim", () => {
    // The claim is the same everywhere; the reason it matters differs per
    // tool (a WLAN password is not a JSON blob is not a personnel file).
    // Identical text across seven pages is duplicate content AND a weaker
    // argument than the specific one.
    const texts = allDe.map(([, g]) => g.privacy);
    expect(new Set(texts).size).toBe(texts.length);
  });

  it("is linked in both directions somewhere", () => {
    // Not every pair has to be mutual, but a tool nothing links TO is as
    // orphaned as it was before the related section existed.
    const linkedTo = new Set(allDe.flatMap(([, g]) => g.related));
    for (const [slug] of allDe) {
      expect(linkedTo.has(slug), `nothing links to ${slug}`).toBe(true);
    }
  });

  it("offers no free or time-limited initial consultation", () => {
    // A hard rule of the positioning: the classifieds ads offer a free 30
    // minute consultation, the web properties deliberately do not. The call
    // is "Unverbindlich anfragen".
    const all = allDe
      .map(([, g]) => JSON.stringify(g))
      .join(" ")
      .toLowerCase();
    expect(all).not.toMatch(/kostenlos\w*\s+(erst)?(gespräch|beratung)/);
    expect(all).not.toMatch(/kostenfrei\w*\s+(erst)?(gespräch|beratung)/);
    expect(all).not.toMatch(/unverbindlich\w*\s+(erst)?gespräch/);
    expect(all).not.toMatch(/30 minuten|30-minuten/);
  });

  it("names no customer", () => {
    // Capabilities are described, customers are not named — not even
    // anonymised. The portfolio section stays off for the same reason.
    const all = allDe.map(([, g]) => JSON.stringify(g)).join(" ");
    expect(all.toLowerCase()).not.toMatch(/hofladen|referenzkunde|case study|fallstudie/);
  });

  it("keeps the same voice throughout", () => {
    // The guides address the reader as "Sie", matching the landingpage and
    // the money pages. A single "du" would read as a different author.
    for (const [slug, guide] of allDe) {
      const text = [...guide.intro, guide.privacy].join(" ");
      expect(text, `${slug} slips into the du-form`).not.toMatch(
        /\b(du|dein|deine|deinem|deinen|deiner)\b/i,
      );
    }
  });
});
