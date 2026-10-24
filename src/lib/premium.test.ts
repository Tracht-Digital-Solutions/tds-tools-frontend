import { describe, expect, it } from "vitest";
import { cheapestTierFor, formatPrice, parseTiers, tierCopy } from "./premium";
import { parseArticle, ratgeberLink, ratgeberUrl } from "./ratgeber";

/**
 * The server half of premium and the Ratgeber link: what the API's payloads
 * turn into on the page. The prices shown are the stages' own — never derived,
 * never rounded — and a broken stage never reaches the page.
 */
describe("premium stages", () => {
  const payload = {
    currency: "EUR",
    tiers: [
      { slug: "gross", name: "Groß", price_cents: 2900, tool_ids: ["pdf-komprimieren", "texterkennung"], highlight: true, features: ["A", "", 3] },
      { slug: "klein", name: "Klein", name_en: "Small", tagline: "Das Nötigste", price_cents: 490, tool_ids: ["pdf-komprimieren"], features_en: ["B"] },
      { slug: "", name: "Ohne Slug", price_cents: 100, tool_ids: [] },
      { slug: "null", name: "Gratis", price_cents: 0, tool_ids: ["x"] },
    ],
  };

  it("keeps only complete stages and cleans their lists", () => {
    const { tiers, currency } = parseTiers(payload);
    expect(currency).toBe("EUR");
    expect(tiers.map((t) => t.slug)).toEqual(["gross", "klein"]);
    expect(tiers[0]!.features).toEqual(["A"]);
    expect(tiers[0]!.highlight).toBe(true);
  });

  it("books the cheapest stage that has the tool", () => {
    const { tiers } = parseTiers(payload);
    expect(cheapestTierFor("pdf-komprimieren", tiers)?.slug).toBe("klein");
    expect(cheapestTierFor("texterkennung", tiers)?.slug).toBe("gross");
    expect(cheapestTierFor("qr-code", tiers)).toBeNull();
  });

  it("speaks English field by field, falling back to German", () => {
    const klein = parseTiers(payload).tiers[1]!;
    expect(tierCopy(klein, "en")).toEqual({ name: "Small", tagline: "Das Nötigste", features: ["B"] });
    expect(tierCopy(klein, "de").name).toBe("Klein");
  });

  it("prints the fixed price in the page's format", () => {
    expect(formatPrice(990, "EUR", "de").replace(/\s/g, " ")).toBe("9,90 €");
    expect(formatPrice(990, "EUR", "en")).toBe("€9.90");
  });

  it("refuses a currency that is not an ISO code", () => {
    expect(parseTiers({ tiers: [], currency: "<b>" }).currency).toBe("EUR");
  });
});

describe("the Ratgeber link", () => {
  it("points at the article on the blog, English under /en", () => {
    expect(ratgeberUrl("pdf-verkleinern", "de")).toBe("https://blog.tracht-digital.de/pdf-verkleinern");
    expect(ratgeberUrl("pdf-verkleinern", "en")).toBe("https://blog.tracht-digital.de/en/pdf-verkleinern");
  });

  it("falls back to the Ratgeber itself without a usable slug", () => {
    expect(ratgeberUrl(null, "de")).toBe("https://blog.tracht-digital.de/");
    expect(ratgeberUrl("../etc", "en")).toBe("https://blog.tracht-digital.de/en/");
  });

  it("links to the Ratgeber in this language when the article is missing in it", () => {
    expect(ratgeberLink("nur-deutsch", "en", "missing")).toBe("https://blog.tracht-digital.de/en/");
    expect(ratgeberLink("pdf-verkleinern", "en", null)).toBe("https://blog.tracht-digital.de/en/pdf-verkleinern");
  });

  it("shows only an article with a title and a body", () => {
    expect(parseArticle({ post: { title: "PDF verkleinern", body: "# Hallo", readingMinutes: 4 } }, "pdf", "de")).toMatchObject({
      title: "PDF verkleinern",
      url: "https://blog.tracht-digital.de/pdf",
      readingMinutes: 4,
    });
    expect(parseArticle({ post: { title: "", body: "x" } }, "pdf", "de")).toBeNull();
    expect(parseArticle({ post: { title: "T" } }, "pdf", "de")).toBeNull();
    expect(parseArticle({}, "pdf", "de")).toBeNull();
  });
});
