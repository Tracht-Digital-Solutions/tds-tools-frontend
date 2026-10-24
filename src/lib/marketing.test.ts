import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { copy } from "./i18n";
import { guides } from "./guides";
import { DEFAULT_OG_HEADLINES } from "../og/render";

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
 * This file covers the site chrome, the catalogue FAQ and the English guides,
 * so no surface is left unchecked.
 */

/**
 * Separator between independent strings.
 *
 * A plain space invents phrases that nothing on the site ever says: the copy
 * holds "…much of it free" and "tools straight in your browser…" as two
 * unrelated values, and joining them with a space produced a literal "free
 * tools" for a claim-scanning regex to find. A non-word token keeps every
 * pattern inside one real string.
 */
const SEP = " ¶ ";

/** Every string the site says, in both languages, as one haystack. */
const siteText = (["de", "en"] as const)
  .flatMap((lang) => [
    ...Object.values(copy[lang]).filter((v): v is string => typeof v === "string"),
    ...copy[lang].catalogFaq.flatMap((item) => [item.q, item.a]),
  ])
  .join(SEP);

const guideText = Object.values(guides)
  .flatMap((set) => [set.de, set.en].filter(Boolean))
  .map((g) => JSON.stringify(g))
  .join(SEP);

/**
 * The share cards say things too, and nothing was reading them.
 *
 * `src/og/render.ts` hard-codes its headline in TypeScript rather than pulling
 * it from `copy`, so it sat outside every haystack above. The default card kept
 * announcing "Kostenlose digitale Werkzeuge." for six days after that claim was
 * removed from the hero, the title and the meta description — because 8 of the
 * 14 composed tools are premium. A share card is the one surface nobody looks
 * at while working on the site.
 */
const ogText = Object.values(DEFAULT_OG_HEADLINES)
  .map((spans) => spans.join(" "))
  .join(SEP);

const allText = [siteText, guideText, ogText].join(SEP).toLowerCase();

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

  it("never calls the SITE free — 8 of the 14 composed tools are premium", () => {
    // "vieles kostenlos" is the honest form and is used throughout. What must
    // not come back is the unqualified claim: "kostenlose Werkzeuge",
    // "kostenlose digitale Werkzeuge", "free tools". The per-tool badge is
    // exempt by construction — it is derived from `isPremium`.
    expect(allText).not.toMatch(/kostenlose\s+(digitale\s+)?werkzeuge/);
    expect(allText).not.toMatch(/\bfree\s+(digital\s+)?tools\b/);
  });

  it("uses the canonical call to action", () => {
    // The landingpage and the shared i18n say "Unverbindlich anfragen" /
    // "Get in touch". This site used to say "Termin vereinbaren", which
    // promises a scheduled appointment nobody offered.
    expect(copy.de.cta).toBe("Unverbindlich anfragen");
    expect(copy.en.cta).toBe("Get in touch");
  });

  it("never promises an appointment", () => {
    expect(allText).not.toMatch(/termin vereinbaren|book a (meeting|call)/);
  });
});

describe("the access labels", () => {
  it("marks every catalog card as free or premium", () => {
    // A free tool used to carry no badge, so "free" read only as the absence
    // of "Premium". Both branches must render a chip.
    const card = readFileSync(join(__dirname, "..", "components", "ToolCard.astro"), "utf8");
    expect(card).toMatch(/isPremium\s*\?[\s\S]*access\.premium[\s\S]*:[\s\S]*access\.free/);
    expect(copy.de.access.free).toBe("Kostenlos");
    expect(copy.en.access.free).toBe("Free");
  });

  it("keeps the removed service note gone", () => {
    for (const page of ["CatalogPage.astro", "ToolPage.astro"]) {
      const source = readFileSync(join(__dirname, "..", "components", page), "utf8");
      expect(source, page).not.toMatch(/ServiceNote|service-note/);
    }
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
