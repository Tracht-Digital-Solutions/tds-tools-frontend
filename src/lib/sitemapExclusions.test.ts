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
    // `/tools` is the catalog page, not one of the tools. Hiding the tools is
    // not a request to hide the list of them.
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
    // The load-bearing case. Keeping the German URL while the English one is
    // gone leaves an alternate pointing at a page no longer offered, and one
    // dangling alternate invalidates the set on both sides.
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
  const original = globalThis.fetch;

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    globalThis.fetch = original;
    vi.unstubAllEnvs();
  });

  async function patternsWith(fetchImpl: typeof globalThis.fetch): Promise<string[]> {
    globalThis.fetch = fetchImpl;
    const mod = await import("./sitemapExclusions");
    return mod.exclusionPatterns();
  }

  it("reads the list the API returns", async () => {
    const patterns = await patternsWith(
      (async () =>
        new Response(JSON.stringify({ site: "tools", paths: ["/tools/qr", "/x/*"] }), {
          status: 200,
          headers: { "content-type": "application/json" },
        })) as typeof globalThis.fetch,
    );
    expect(patterns).toEqual(["/tools/qr", "/x/*"]);
  });

  it("asks for THIS site by name", async () => {
    let seen = "";
    await patternsWith((async (input: RequestInfo | URL) => {
      seen = String(input);
      return new Response(JSON.stringify({ paths: [] }), { status: 200 });
    }) as typeof globalThis.fetch);
    // Without it the API can only answer from a verified key, and with
    // `enforcement = off` there is none — so the list would silently be empty
    // on exactly the installations that have not finished pairing.
    expect(seen).toContain("site=tools");
  });

  it("excludes nothing when the API is unreachable", async () => {
    const patterns = await patternsWith((() =>
      Promise.reject(new Error("ECONNREFUSED"))) as typeof globalThis.fetch);
    expect(patterns).toEqual([]);
  });

  it("excludes nothing on a non-OK response", async () => {
    const patterns = await patternsWith((async () =>
      new Response("nope", { status: 500 })) as typeof globalThis.fetch);
    expect(patterns).toEqual([]);
  });

  it("excludes nothing when the payload is the wrong shape", async () => {
    const patterns = await patternsWith((async () =>
      new Response(JSON.stringify({ paths: "everything" }), {
        status: 200,
      })) as typeof globalThis.fetch);
    expect(patterns).toEqual([]);
  });

  it("drops blank entries rather than treating them as a match-all", async () => {
    const patterns = await patternsWith((async () =>
      new Response(JSON.stringify({ paths: ["", "   ", "/keep", 7] }), {
        status: 200,
      })) as typeof globalThis.fetch);
    expect(patterns).toEqual(["/keep"]);
  });
});
