import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * The surface contract of this site, asserted as text.
 *
 * WHY TEXT. `.astro` files are compiled by neither vitest nor `tsc`, and a
 * reference to a token whose surface layer is gone is not an error anywhere in
 * the toolchain: `astro check` passes, the build passes, lightningcss emits the
 * declaration unchanged.
 *
 * WHAT CHANGED (0.9.0). This site moved from the `panel` surface in its
 * `data-flat` variant to the **blog** surface — the same layer
 * `blog.tracht-digital.de` renders. `styles/surfaces/panel.css` is what gives
 * the `--tds-panel-*` family real values, and it is no longer imported; there
 * were nine references to it.
 *
 * The reason that needs a test rather than a careful read: base.css declares
 * the same family with INERT defaults (accent = `--color-primary`, rail = a
 * flat `--color-surface-navy`), precisely so a non-panel consumer renders
 * unchanged. So a missed reference does not go blank and shout — it renders in
 * the fallback navy, which looks like a considered colour and is simply not the
 * surface's accent. Only a browser, and only someone who knew, would catch it.
 */
const SRC = join(__dirname, "..");

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((entry) => {
    const p = join(dir, entry);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const sources = walk(SRC).filter((p) => /\.(astro|tsx|ts|css)$/.test(p) && !/\.test\.tsx?$/.test(p));

const read = (p: string) => readFileSync(p, "utf8");

describe("the design surface", () => {
  it("declares the blog surface on <html>", () => {
    const layout = read(join(SRC, "layouts", "Layout.astro"));
    expect(layout).toMatch(/<html[^>]*data-surface="blog"/);
  });

  it("writes no data-frontend and no data-flat", () => {
    // `data-frontend` is the panel layer's accent axis — the invariant that
    // keeps this PUBLIC site out of the management red (tds-shared's
    // design.test.ts pins the other half). `data-flat` is a panel-only
    // variant; on the blog surface it selects nothing at all, so leaving it
    // behind would just be a false claim about how this page is styled.
    const layout = read(join(SRC, "layouts", "Layout.astro"));
    const html = layout.match(/<html[^>]*>/)?.[0] ?? "";
    expect(html).not.toMatch(/data-frontend/);
    expect(html).not.toMatch(/data-flat/);
  });

  it("imports the blog surface layer and not the panel one", () => {
    const css = read(join(SRC, "styles", "global.css"));
    expect(css).toContain("styles/surfaces/blog.css");
    expect(css).not.toContain("styles/surfaces/panel.css");
  });

  it("references no --tds-panel-* token anywhere in src", () => {
    const offenders = sources
      .map((p) => [p, read(p)] as const)
      // The prose in a comment may NAME the token it is explaining — the
      // failure is a reference the browser tries to resolve, i.e. one inside a
      // `var()`.
      .filter(([, src]) => /var\(\s*--tds-panel-/.test(src))
      .map(([p]) => p.replace(SRC, "src").replace(/\\/g, "/"));
    expect(offenders, `still reading panel tokens: ${offenders.join(", ")}`).toEqual([]);
  });
});

describe("the sibling properties", () => {
  it("links the blog and the main site from the header AND the footer", () => {
    // The blog links here from its own nav and footer (`TOOLS_URL` in its
    // nav.ts). A one-way link leaves this site a dead end for a reader and an
    // orphan for a crawler, which is the whole reason both were added.
    for (const file of ["components/Header.astro", "components/Footer.astro"]) {
      const src = read(join(SRC, file));
      expect(src, `${file} does not link the blog`).toMatch(/links\.blog/);
      expect(src, `${file} does not link the main site`).toMatch(/links\.main/);
    }
  });
});
