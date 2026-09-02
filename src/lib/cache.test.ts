import { describe, expect, it } from "vitest";
import { resolveEvents } from "@tracht-digital-solutions/tds-shared/cache";

import { alwaysPaths, cacheEvents } from "./cache";

/**
 * This site's route table, as the cache sees it.
 *
 * Unlike the blog, both language trees here really are a prefix pair, and the
 * sitemap's hreflang alternates depend on that staying true — so the pairing is
 * asserted rather than assumed.
 */
describe("cacheEvents", () => {
  const paths = async (events: Parameters<typeof resolveEvents>[1]) =>
    (await resolveEvents(cacheEvents, events)).paths;

  it("rebuilds a tool's page and the pages that list it", async () => {
    expect(await paths([{ type: "tool", id: "qr-code-generator", lang: "de" }])).toEqual([
      "/",
      "/sitemap-0.xml",
      "/tools-catalog.json",
      "/tools/qr-code-generator",
    ]);
  });

  it("mirrors the two trees by prefix", async () => {
    const result = await paths([{ type: "tool", id: "qr-code-generator" }]);
    expect(result).toContain("/tools/qr-code-generator");
    expect(result).toContain("/en/tools/qr-code-generator");
  });

  it("rebuilds only the catalog when no tool is named", async () => {
    // A tool switched on or off, reordered or made premium changes the listing
    // but not any other tool's page.
    expect(await paths([{ type: "tool" }])).toEqual([
      "/",
      "/en/",
      "/sitemap-0.xml",
      "/tools-catalog.json",
    ]);
  });

  it("declares the sibling sites' events rather than leaving them unknown", async () => {
    // Silence here is intentional; saying so keeps a real typo in an event
    // type visible in `unknownEvents`.
    const result = await resolveEvents(cacheEvents, [
      { type: "post", id: "x" },
      { type: "block", id: "hero" },
      { type: "legal", id: "agb" },
    ]);
    expect(result.paths).toEqual([]);
    expect(result.unknown).toEqual([]);
  });

  it("reports an event type it does not know", async () => {
    expect((await resolveEvents(cacheEvents, [{ type: "widget" }])).unknown).toEqual(["widget"]);
  });

  it("rebuilds the tool pages too when the exclusion list changes", async () => {
    // The list moves the `robots` meta of the excluded page, not just the
    // sitemap. Rebuilding only the sitemap would leave that page serving its
    // old indexable head from cache — the omission visible in the XML, the
    // `noindex` nowhere.
    const result = await paths([{ type: "sitemap" }]);
    expect(result).toContain("/sitemap-0.xml");
    expect(result).toContain("/sitemap-index.xml");
    expect(result).toContain("/tools/kostenloses-tool");
    expect(result).toContain("/en/tools/kostenloses-tool");
  });

  it("keeps individual tool pages out of alwaysPaths", async () => {
    // The composed catalog is known to the build, not to this list — a second
    // copy would drift the first time a pack is added.
    expect(alwaysPaths.some((p) => p.startsWith("/tools/"))).toBe(false);
    expect(alwaysPaths).toContain("/");
    expect(alwaysPaths).toContain("/en/");
  });
});
