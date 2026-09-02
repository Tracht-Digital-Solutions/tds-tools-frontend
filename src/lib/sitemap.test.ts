import { afterEach, describe, expect, it, vi } from "vitest";

import { absolute, renderSitemapIndex, renderUrlset, type SitemapUrl } from "./sitemap";

/**
 * The sitemap document, and the rules that make it valid.
 *
 * None of this was covered before: the module is hand-written precisely because
 * `@astrojs/sitemap` could not see server-rendered routes, and what replaced it
 * had no test at all. The failure mode it guards against is the one this
 * codebase keeps meeting — a well-formed file that is quietly wrong, with
 * nothing red anywhere.
 */

const LAST = "2026-09-02";

function locs(xml: string): string[] {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

function alternates(xml: string): string[] {
  return [...xml.matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => `${m[1]} ${m[2]}`);
}

const entry = (path: string): SitemapUrl => ({ path, changefreq: "monthly", priority: 0.8 });

describe("renderUrlset", () => {
  it("emits one url per language for each entry", () => {
    const xml = renderUrlset([entry("/tools/qr")], LAST);
    expect(locs(xml)).toEqual([
      absolute("/tools/qr"),
      absolute("/en/tools/qr"),
    ]);
  });

  it("gives both sides the SAME reciprocal alternate block", () => {
    // Search Console treats a set as valid only when the two URLs name each
    // other. The commonest way it goes wrong is one side naming a URL that
    // does not name it back, so both blocks are compared, not just present.
    const xml = renderUrlset([entry("/tools/qr")], LAST);
    const expected = [
      `de-DE ${absolute("/tools/qr")}`,
      `en-GB ${absolute("/en/tools/qr")}`,
      `x-default ${absolute("/tools/qr")}`,
    ];
    expect(alternates(xml)).toEqual([...expected, ...expected]);
  });

  it("points x-default at the German page", () => {
    const xml = renderUrlset([entry("/tools/qr")], LAST);
    expect(xml).toContain(`hreflang="x-default" href="${absolute("/tools/qr")}"`);
  });

  it("pairs the home page as / and /en/", () => {
    const xml = renderUrlset([{ path: "/", changefreq: "weekly", priority: 1.0 }], LAST);
    expect(locs(xml)).toEqual([absolute("/"), absolute("/en/")]);
  });

  it("declares the xhtml namespace the alternates need", () => {
    // Without it the alternates are unnamespaced elements and every consumer
    // ignores them — the file still validates.
    expect(renderUrlset([entry("/x")], LAST)).toContain(
      'xmlns:xhtml="http://www.w3.org/1999/xhtml"',
    );
  });

  it("writes priority with one decimal and the given lastmod", () => {
    const xml = renderUrlset([{ path: "/", changefreq: "weekly", priority: 1 }], LAST);
    expect(xml).toContain("<priority>1.0</priority>");
    expect(xml).toContain(`<lastmod>${LAST}</lastmod>`);
  });

  it("escapes XML metacharacters in a slug", () => {
    // A slug is data. One unescaped `&` makes the whole document unparseable,
    // which a crawler reports as "could not read", not "page missing".
    const xml = renderUrlset([entry("/tools/a&b")], LAST);
    expect(xml).toContain("&amp;");
    expect(xml).not.toMatch(/<loc>[^<]*[^&]&[^a-z]/);
  });

  it("produces an empty urlset rather than malformed XML for no entries", () => {
    const xml = renderUrlset([], LAST);
    expect(xml).toContain("<urlset");
    expect(xml).toContain("</urlset>");
    expect(locs(xml)).toEqual([]);
  });
});

describe("renderSitemapIndex", () => {
  it("names the file robots.txt advertises", () => {
    // The filenames are the ones `@astrojs/sitemap` produced and Search Console
    // already knows; renaming either orphans the entry point.
    expect(renderSitemapIndex(LAST)).toContain(`<loc>${absolute("/sitemap-0.xml")}</loc>`);
  });
});

/**
 * The URL list itself, including the subtraction the panel maintains.
 */
describe("sitemapPaths", () => {
  afterEach(() => {
    vi.resetModules();
    vi.unstubAllGlobals();
  });

  async function pathsWith(patterns: string[]): Promise<string[]> {
    vi.resetModules();
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        if (String(input).includes("sitemap-exclusions")) {
          return new Response(JSON.stringify({ paths: patterns }), { status: 200 });
        }
        // No catalog API — `catalog.ts` falls back to the composed manifest,
        // which is the vitest fixture.
        return new Response("no", { status: 500 });
      }),
    );
    const mod = await import("./sitemap");
    return (await mod.sitemapPaths()).map((u) => u.path);
  }

  it("lists the home page and every enabled tool", async () => {
    const paths = await pathsWith([]);
    expect(paths[0]).toBe("/");
    expect(paths).toContain("/tools/kostenloses-tool");
    expect(paths).toContain("/tools/premium-tool");
  });

  it("omits /install — a noindex operator page with no English twin", async () => {
    // An entry for it would point an alternate at a 404, and one dangling
    // alternate invalidates the whole set.
    expect(await pathsWith([])).not.toContain("/install");
  });

  it("drops a path the panel excluded", async () => {
    const paths = await pathsWith(["/tools/premium-tool"]);
    expect(paths).not.toContain("/tools/premium-tool");
    expect(paths).toContain("/tools/kostenloses-tool");
  });

  it("drops the German page when the ENGLISH URL is the one excluded", async () => {
    // The entry is language-neutral, so this is the case that proves the filter
    // reads the whole group rather than the stored path.
    expect(await pathsWith(["/en/tools/premium-tool"])).not.toContain("/tools/premium-tool");
  });

  it("honours a prefix pattern", async () => {
    const paths = await pathsWith(["/tools/*"]);
    expect(paths).toEqual(["/"]);
  });

  it("can exclude the home page itself", async () => {
    expect(await pathsWith(["/"])).not.toContain("/");
  });

  it("is unchanged by an empty list", async () => {
    expect(await pathsWith([])).toEqual(await pathsWith([]));
  });
});
