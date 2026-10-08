import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { groupExcluded, hreflangGroup, matchesPattern } from "./sitemapExclusions";

/**
 * The comparison this site performs against the list the panel maintains.
 *
 * It has to agree, rule for rule, with `SitemapExclusions::matches()` in
 * `tds-core-frontend-api` — the API validates what an operator may type, so a
 * looser matcher here would accept a pattern the panel rejects, and a stricter
 * one would silently ignore a pattern it accepted. Either way the only symptom
 * is a page that stayed in the sitemap when somebody asked for it to go.
 */
describe("matchesPattern", () => {
  it("matches an exact path either way around the trailing slash", () => {
    expect(matchesPattern("/tools/qr", "/tools/qr")).toBe(true);
    expect(matchesPattern("/tools/qr/", "/tools/qr")).toBe(true);
    expect(matchesPattern("/tools/qr", "/tools/qr/")).toBe(true);
  });

  it("does not match a longer path that merely starts the same", () => {
    expect(matchesPattern("/tools/qr-code", "/tools/qr")).toBe(false);
  });

  it("treats a trailing star as a prefix", () => {
    expect(matchesPattern("/tools/qr", "/tools/*")).toBe(true);
    expect(matchesPattern("/tools/a/b", "/tools/*")).toBe(true);
  });

  it("leaves the bare segment alone when the pattern names what is under it", () => {
    expect(matchesPattern("/tools", "/tools/*")).toBe(false);
  });

  it("is a raw prefix when the star follows a segment directly", () => {
    expect(matchesPattern("/tools", "/tools*")).toBe(true);
    expect(matchesPattern("/toolsomething", "/tools*")).toBe(true);
  });

  it("is case-sensitive, because URL paths are", () => {
    expect(matchesPattern("/Tools/qr", "/tools/qr")).toBe(false);
  });

  it("ignores an empty pattern instead of matching everything", () => {
    // The difference between "no exclusions" and "exclude the whole site".
    expect(matchesPattern("/tools/qr", "")).toBe(false);
    expect(matchesPattern("/tools/qr", "   ")).toBe(false);
  });

  it("matches everything only for the deliberate bare star", () => {
    expect(matchesPattern("/anything", "*")).toBe(true);
  });
});

describe("hreflangGroup", () => {
  it("pairs a German path with its English twin", () => {
    expect(hreflangGroup("/tools/qr")).toEqual(["/tools/qr", "/en/tools/qr"]);
  });

  it("returns the same pair when handed the English member", () => {
    // The group is a property of the PAGE, not of the URL it was asked about —
    // otherwise excluding via the English path would leave the German one.
    expect(hreflangGroup("/en/tools/qr")).toEqual(["/tools/qr", "/en/tools/qr"]);
  });

  it("pairs the two home pages", () => {
    expect(hreflangGroup("/")).toEqual(["/", "/en/"]);
    expect(hreflangGroup("/en/")).toEqual(["/", "/en/"]);
  });
});

describe("groupExcluded", () => {
  it("drops the whole group when the pattern names the German side", () => {
    expect(groupExcluded(hreflangGroup("/tools/qr"), ["/tools/qr"])).toBe(true);
  });

  it("drops the whole group when the pattern names the ENGLISH side", () => {
    // Keeping the German URL while the English one is gone leaves an alternate
    // pointing at a page no longer offered, and one dangling alternate
    // invalidates the set on both sides.
    expect(groupExcluded(hreflangGroup("/tools/qr"), ["/en/tools/qr"])).toBe(true);
  });

  it("keeps a group no pattern names", () => {
    expect(groupExcluded(hreflangGroup("/tools/qr"), ["/tools/pdf", "/impressum"])).toBe(false);
  });

  it("keeps everything when the list is empty", () => {
    expect(groupExcluded(hreflangGroup("/tools/qr"), [])).toBe(false);
  });
});

/**
 * The fetch is fail-soft in ONE direction on purpose: an unreachable API means
 * "nothing excluded". The opposite default would empty the sitemap on a hiccup,
 * and because the API's own route is fail-soft too, neither end would go red.
 */
describe("exclusionPatterns", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  async function patternsWith(fetchImpl: (input: RequestInfo | URL) => Promise<Response>): Promise<string[]> {
    vi.stubGlobal("fetch", vi.fn(fetchImpl));
    const mod = await import("./sitemapExclusions");
    return mod.exclusionPatterns();
  }

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

  it("reads the list the API returns", async () => {
    expect(await patternsWith(async () => json({ site: "tools", paths: ["/tools/qr", "/x/*"] }))).toEqual([
      "/tools/qr",
      "/x/*",
    ]);
  });

  it("asks for THIS site by name", async () => {
    let seen = "";
    await patternsWith(async (input) => {
      seen = String(input);
      return json({ paths: [] });
    });
    // Without it the API can only answer from a verified key, and with
    // `enforcement = off` there is none — so the list would silently be empty
    // on exactly the installations that have not finished pairing.
    expect(seen).toContain("/content/sitemap-exclusions");
    expect(seen).toContain("site=tools");
  });

  it("excludes nothing when the API is unreachable", async () => {
    expect(await patternsWith(() => Promise.reject(new Error("ECONNREFUSED")))).toEqual([]);
  });

  it("excludes nothing on a non-OK response", async () => {
    expect(await patternsWith(async () => new Response("nope", { status: 500 }))).toEqual([]);
  });

  it("excludes nothing when the payload is the wrong shape", async () => {
    expect(await patternsWith(async () => json({ paths: "everything" }))).toEqual([]);
  });

  it("drops blank entries rather than treating them as a match-all", async () => {
    expect(await patternsWith(async () => json({ paths: ["", "   ", "/keep", 7] }))).toEqual(["/keep"]);
  });
});

/**
 * The subtraction applied to the real URL list. The catalog API is down in
 * these tests, so `catalog.ts` falls back to the composed manifest — the
 * vitest fixture.
 */
describe("sitemapPaths with exclusions", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  async function pathsWith(patterns: string[]): Promise<string[]> {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) =>
        String(input).includes("sitemap-exclusions")
          ? new Response(JSON.stringify({ paths: patterns }), { status: 200 })
          : new Response("no", { status: 500 }),
      ),
    );
    const mod = await import("./sitemap");
    return (await mod.sitemapPaths()).map((u) => u.path);
  }

  it("lists the home page and every enabled tool without a list", async () => {
    const paths = await pathsWith([]);
    expect(paths[0]).toBe("/");
    expect(paths).toContain("/tools/kostenloses-tool");
    expect(paths).toContain("/tools/premium-tool");
  });

  it("drops a path the panel excluded", async () => {
    const paths = await pathsWith(["/tools/premium-tool"]);
    expect(paths).not.toContain("/tools/premium-tool");
    expect(paths).toContain("/tools/kostenloses-tool");
  });

  it("drops the German page when the ENGLISH URL is the one excluded", async () => {
    // The entry is language-neutral, so this proves the filter reads the whole
    // group rather than the stored path.
    expect(await pathsWith(["/en/tools/premium-tool"])).not.toContain("/tools/premium-tool");
  });

  it("honours a prefix pattern", async () => {
    expect(await pathsWith(["/tools/*"])).toEqual(["/"]);
  });
});
