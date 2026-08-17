import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { copy } from "./i18n";
import { guides } from "./guides";
import { links } from "./site";

/**
 * The marketing copy, and the rules it must not break.
 *
 * These rules are Julian's, not derived: the classifieds ads offer a free
 * 30-minute initial consultation and name a customer, and the web properties
 * deliberately do neither. Nothing else can see a violation — a page with a
 * free-consultation promise renders perfectly, builds green and simply makes
 * a commitment the business did not intend to make — so it is measured here,
 * across BOTH languages and every surface that carries copy.
 *
 * Scope note: `guides.test.ts` pins the same rules for the German guides.
 * This file covers the site chrome, the service note and the English guides,
 * so no surface is left unchecked.
 */

/** Every string the site says, in both languages, as one haystack. */
const siteText = (["de", "en"] as const)
  .flatMap((lang) =>
    Object.values(copy[lang]).filter((v): v is string => typeof v === "string"),
  )
  .join(" ");

const guideText = Object.values(guides)
  .flatMap((set) => [set.de, set.en].filter(Boolean))
  .map((g) => JSON.stringify(g))
  .join(" ");

const allText = `${siteText} ${guideText}`.toLowerCase();

describe("the positioning rules", () => {
  it("promises no free or time-limited initial consultation, in either language", () => {
    expect(allText).not.toMatch(/kostenlos\w*\s+(erst)?(gespräch|beratung)/);
    expect(allText).not.toMatch(/kostenfrei\w*\s+(erst)?(gespräch|beratung)/);
    expect(allText).not.toMatch(/unverbindlich\w*\s+(erst)?gespräch/);
    expect(allText).not.toMatch(/free\s+(initial\s+)?(consultation|call)/);
    expect(allText).not.toMatch(/no-obligation\s+(call|consultation)/);
    expect(allText).not.toMatch(/30 minuten|30-minuten|30 minutes/);
  });

  it("names no customer", () => {
    expect(allText).not.toMatch(/hofladen|referenzkunde|case study|fallstudie/);
  });

  it("uses the canonical call to action", () => {
    // The landingpage and the shared i18n say "Unverbindlich anfragen" /
    // "Get in touch". This site used to say "Termin vereinbaren", which
    // promises a scheduled appointment nobody offered.
    expect(copy.de.cta).toBe("Unverbindlich anfragen");
    expect(copy.en.cta).toBe("Get in touch");
    expect(copy.de.serviceNoteCta).toBe("Unverbindlich anfragen");
    expect(copy.en.serviceNoteCta).toBe("Get in touch");
  });

  it("never promises an appointment", () => {
    expect(allText).not.toMatch(/termin vereinbaren|book a (meeting|call)/);
  });
});

describe("the service note", () => {
  it("is one sentence-length line, not a landing page", () => {
    // The restraint is the point: visitors arrived from a search for a tool,
    // and a paragraph of sales copy after every one of them reads as bait.
    for (const lang of ["de", "en"] as const) {
      const note = copy[lang].serviceNote;
      expect(note.length, `${lang}: ${note.length} chars`).toBeLessThan(200);
      expect(note.length, `${lang} is too thin to say anything`).toBeGreaterThan(60);
    }
  });

  it("names what the business actually sells", () => {
    // Naming the services is the whole reason the line exists — a vague
    // "let's talk" would occupy the same space and carry no information.
    expect(copy.de.serviceNote).toMatch(/Website|Webshop/);
    expect(copy.en.serviceNote).toMatch(/website|shop/i);
  });

  it("links once, to the contact form", () => {
    const note = readFileSync(
      join(__dirname, "..", "components", "ServiceNote.astro"),
      "utf8",
    );
    // Read as text: an .astro component is compiled by neither vitest nor
    // tsc, so this is the only way to assert what it actually renders.
    const hrefs = [...note.matchAll(/href=\{?([^}\s>]+)\}?/g)].map((m) => m[1]);
    expect(hrefs).toHaveLength(1);
    expect(hrefs[0]).toContain("links.contact");
    expect(links.contact).toBe("https://tracht-digital.de/#contact");
  });

  it("wears no card and no second accent", () => {
    // `.tds-card` here would make it an advert block on a surface whose own
    // cards are the tools. It is a `--color-soft` colour block like everything
    // else on this page.
    const note = readFileSync(
      join(__dirname, "..", "components", "ServiceNote.astro"),
      "utf8",
    );
    expect(note).not.toMatch(/tds-card|btn-primary/);
  });
});

describe("the footer's services column", () => {
  it("links every one of the five services to the main site", () => {
    // Before this column, the only link from this property to the business's
    // own pages was the bare home page — nothing that actually sells anything
    // was ever pointed at from here.
    const footer = readFileSync(
      join(__dirname, "..", "components", "Footer.astro"),
      "utf8",
    );
    for (const service of [
      "Digitalisierung für Unternehmen",
      "Digitale Konzepte",
      "Auftragsentwicklung",
      "Webauftritt",
      "Webshop",
    ]) {
      expect(footer, `footer does not name "${service}"`).toContain(service);
    }
  });
});
