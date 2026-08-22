import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Header posture test.
 *
 * Companion to surface.test.ts, same principle: source-reading assertions for
 * the mistakes that produce no error, no failing build and no visible symptom
 * until someone opens the page at a phone width.
 *
 * This site had NO mobile menu at all until tds-shared 0.25.0 — the nav simply
 * reflowed onto a second row. So most of what is pinned here is new behaviour,
 * and the point of pinning it is that it stays SHARED rather than becoming a
 * fourth private implementation.
 */

const SRC = join(process.cwd(), "src");
const raw = readFileSync(join(SRC, "components", "Header.astro"), "utf8");
const i18n = readFileSync(join(SRC, "lib", "i18n.ts"), "utf8");
const site = readFileSync(join(SRC, "lib", "site.ts"), "utf8");

/** This file documents the traps being pinned, so assert against code only. */
const source = raw
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
  .replace(/^\s*\/\/.*$/gm, "");

/**
 * The opening tag carrying `id="…"`. Walks back to the nearest `<` rather than
 * matching `<tag[\s\S]*?id="…"`, which starts at an EARLIER tag of the same
 * name and swallows everything between.
 */
function openingTag(id: string): string {
  const at = source.indexOf(`id="${id}"`);
  if (at === -1) return "";
  const start = source.lastIndexOf("<", at);
  const end = source.indexOf(">", at);
  return start === -1 || end === -1 ? "" : source.slice(start, end + 1);
}

describe("the wordmark", () => {
  it("lets the logomark carry the TD and sets only Tools in type", () => {
    // The site is called TD Tools and the MARK is the "TD" — the same
    // construction as the journal's (`.brand-logo` + "Journal"), which is
    // what makes the two public properties read as one brand. Spelling the
    // letters out beside the mark would render the name twice.
    expect(source).toContain('<span class="brand-logo" aria-hidden="true">');
    expect(source).toContain("<span class=\"accent-italic\">Tools</span>");
    // Not "TDS Tools" and not "TD Tools" beside the mark: the mark already
    // says it, and the two together render the name twice.
    expect(source, "the mark already says TD").not.toContain("TDS ");
    expect(source, "the mark already says TD").not.toContain("TD Tools");
  });

  it("keeps the full name as the link's accessible name", () => {
    // The mark is `aria-hidden`, so without this the home link announces as
    // the bare word "Tools" — the one place where replacing text with a
    // graphic actually costs something.
    expect(source).toContain("aria-label={`${site.name} — ${s.navAllTools}`}");
    expect(site).toContain('name: "TD Tools"');
  });
});
describe("mobile navigation", () => {
  it("exists at all", () => {
    // The regression this guards is the site's own history: a public,
    // indexable property shipped for months with no mobile menu, because a
    // reflowing nav row is not obviously wrong in a diff.
    expect(openingTag("menu-toggle")).not.toBe("");
    expect(openingTag("mobile-menu")).not.toBe("");
  });

  it("takes its mechanics from tds-shared", () => {
    expect(source).toMatch(
      /import \{ mountMobileNav \} from "@tracht-digital-solutions\/tds-shared\/nav"/,
    );
    expect(source).toContain("mountMobileNav({");
  });

  it("hand-rolls none of the mechanics", () => {
    expect(source).not.toContain("body.style.overflow");
    expect(source).not.toContain("drawer-open");
    expect(source).not.toMatch(/document\.addEventListener\(\s*"keydown"/);
    expect(source).not.toMatch(/matchMedia\(\s*"\(min-width/);
  });

  it("wears the shared classes", () => {
    expect(openingTag("menu-toggle")).toContain("btn btn-ghost tds-menu-toggle");
    expect(openingTag("mobile-menu")).toContain("tds-mobile-menu");
    expect(source).toContain("tds-menu-bar-top");
  });

  it("hides the desktop cluster on a wrapper, never on the button itself", () => {
    // `hidden` loses to unlayered `.btn { display: inline-flex }`, so hiding
    // the CTA directly does nothing — this site already carries that trap
    // written up for its own header. The wrapper is the fix; the hamburger's
    // breakpoint belongs to `.tds-menu-toggle`.
    const cta = source.match(/<a[^>]*class="btn btn-primary[^"]*"[^>]*>/g) ?? [];
    expect(cta.length).toBeGreaterThan(0);
    for (const tag of cta) {
      expect(tag, "a .btn cannot hide itself with a utility").not.toMatch(
        /\b(lg|sm|md):?hidden\b|\bhidden\b/,
      );
    }
    expect(openingTag("menu-toggle")).not.toMatch(/\blg:hidden\b/);
    expect(source).toContain('class="hidden shrink-0 items-center gap-2 lg:flex"');
  });

  it("keeps the panel's docking offset and its max-height in agreement", () => {
    const panel = openingTag("mobile-menu");
    const top = panel.match(/top-\[([\d.]+rem)\]/)?.[1];
    const inset = panel.match(/--tds-mobile-menu-inset:\s*([\d.]+rem)/)?.[1];
    expect(top).toBeDefined();
    expect(inset).toBe(top);
  });

  it("labels the toggle in both languages", () => {
    // A half-translated surface is the documented failure mode here, and an
    // aria-label is exactly the kind of string that gets left in German.
    expect(source).toContain("aria-label={s.navMenu}");
    expect(i18n).toContain('navMenu: "Menü"');
    expect(i18n).toContain('navMenu: "Menu"');
  });

  it("bundles the script rather than inlining it", () => {
    expect(raw).not.toMatch(/<script[^>]*\bis:inline\b/);
  });
});

describe("the DE|EN language switch", () => {
  it("is the shared segmented control, not a private text link", () => {
    // It used to be one anchor showing `s.languageOther` — the language you are
    // NOT reading — which renders as another nav item and never states the
    // current language. The blog had a real switch; this is the same one.
    expect(source).toContain("tds-lang-toggle");
    expect(source).not.toContain("{s.languageOther}");
  });

  it("offers both languages rather than only the other one", () => {
    expect(source).toMatch(/label:\s*"DE"/);
    expect(source).toMatch(/label:\s*"EN"/);
  });

  it("states the active language to assistive tech, not only in paint", () => {
    // `.on` is colour. A consumer that paints the active half without setting
    // aria-current is lying to a screen reader, and nothing renders wrong.
    expect(source).toContain('aria-current={l.code === lang ? "true" : undefined}');
    expect(source).toContain('class={l.code === lang ? "on" : ""}');
  });

  it("labels the group in both languages", () => {
    // The control names languages in their own tongue, so a single-language
    // label is wrong for half the people who hear it.
    expect(source).toContain('aria-label="Sprache / Language"');
  });

  it("keeps both halves on the equivalent page, never the two home pages", () => {
    // Somebody who followed a search result to one tool wants that tool; a
    // switch that drops them at the catalog is why people stop using switches.
    expect(source).toContain('href: localizedPath(path, "de")');
    expect(source).toContain('href: localizedPath(path, "en")');
  });

  it("renders in the mobile drawer as well as the desktop bar", () => {
    expect(source.match(/tds-lang-toggle/g)?.length).toBe(2);
  });

  it("resolves the class in the INSTALLED tds-shared", () => {
    // The lesson from the data-flat variant: a 0.x caret can resolve a version
    // that predates the primitive, and the attribute then selects nothing —
    // invisible to astro check, to the build and to any test reading only this
    // repo. Assert against what node_modules actually holds.
    const primitives = readFileSync(
      join(
        process.cwd(),
        "node_modules",
        "@tracht-digital-solutions",
        "tds-shared",
        "styles",
        "primitives.css",
      ),
      "utf8",
    );
    expect(primitives).toContain(".tds-lang-toggle");
    expect(primitives).toContain(".tds-lang-toggle a.on");
  });
});

describe("the account menu", () => {
  /**
   * The shared session, visible in the header. Unlike the blog's copy this one
   * also has to serve the signed-OUT visitor: on this site a session unlocks
   * the premium tools, so the way in belongs in the bar.
   */

  it("comes from tds-shared, not from a local copy", () => {
    expect(source).toMatch(
      /import \{[^}]*\bAccountMenu\b[^}]*\} from "@tracht-digital-solutions\/tds-shared\/components"/,
    );
  });

  it("offers a sign-in link to a visitor with no session", () => {
    // Without `loggedOut="login"` the island renders nothing at all when
    // signed out — correct for the blog, wrong here, and indistinguishable
    // from "the session probe failed" by looking at the page.
    expect(source).toMatch(
      /<AccountMenu\s+client:idle\s+lang=\{lang\}\s+loggedOut="login"\s*\/>/,
    );
  });

  it("sits OUTSIDE the desktop-only cluster and before the hamburger", () => {
    // Inside `hidden … lg:flex` it would vanish below `lg` — where it is the
    // only control beside the hamburger, so its absence would be total.
    const cluster = source.indexOf('class="hidden shrink-0 items-center gap-2 lg:flex"');
    const clusterEnd = source.indexOf("</div>", source.indexOf("btn btn-primary", cluster));
    const mount = source.indexOf("<AccountMenu");
    const toggle = source.indexOf('id="menu-toggle"');

    expect(cluster).toBeGreaterThan(-1);
    expect(mount).toBeGreaterThan(clusterEnd);
    expect(mount).toBeLessThan(toggle);
  });

  it("carries no visibility utility of its own", () => {
    // tds-shared's CSS is unlayered and Tailwind's utilities are layered, so
    // `hidden` on `.tds-dropdown` loses outright — the same trap the CTA above
    // it already documents.
    const tag = source.slice(source.indexOf("<AccountMenu"));
    const opening = tag.slice(0, tag.indexOf(">") + 1);
    expect(opening).not.toMatch(/\bhidden\b/);
    expect(opening).not.toMatch(/\blg:hidden\b/);
  });

  it("resolves in the INSTALLED tds-shared", () => {
    // Same lesson as the lang toggle above: a 0.x caret is minor-locked and CI
    // re-resolves every range, so a pin that cannot reach the version carrying
    // this export fails at build time and nowhere earlier.
    const dts = readFileSync(
      join(
        process.cwd(),
        "node_modules",
        "@tracht-digital-solutions",
        "tds-shared",
        "dist",
        "components",
        "index.d.ts",
      ),
      "utf8",
    );
    expect(dts).toMatch(/\bAccountMenu\b/);
  });
});
