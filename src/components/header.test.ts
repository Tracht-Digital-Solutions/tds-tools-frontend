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
 * This site had NO mobile menu at all until tds-shared 0.25.0. Since 0.47 the
 * phone navigates with the shared app tab bar (AppChrome.astro); what is
 * pinned here keeps it SHARED rather than a private implementation.
 */

const SRC = join(process.cwd(), "src");
const raw = readFileSync(join(SRC, "components", "Header.astro"), "utf8");
const site = readFileSync(join(SRC, "lib", "site.ts"), "utf8");

/** This file documents the traps being pinned, so assert against code only. */
const source = raw
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
  .replace(/^\s*\/\/.*$/gm, "");

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
  const chrome = readFileSync(join(SRC, "components", "AppChrome.astro"), "utf8");
  const layout = readFileSync(join(SRC, "layouts", "Layout.astro"), "utf8");

  it("exists at all — as the app tab bar", () => {
    // The regression this guards is the site's own history: a public,
    // indexable property shipped for months with no mobile navigation. It is
    // the bottom tab bar now (AppChrome), mounted on every page.
    expect(chrome).toContain('class="tds-tabbar"');
    expect(layout).toContain("<AppChrome lang={lang} />");
    expect(source).not.toContain("tds-menu-toggle");
  });

  it("takes its mechanics from tds-shared", () => {
    expect(chrome).toMatch(/mountAppTabBar\(/);
    expect(chrome).toMatch(/mountTabPages\(/);
    expect(source).toContain("mountAppHeader(header)");
  });

  it("hand-rolls none of the mechanics", () => {
    for (const file of [source, chrome]) {
      expect(file).not.toContain("body.style.overflow");
      expect(file).not.toMatch(/document\.addEventListener\(\s*"keydown"/);
      expect(file).not.toMatch(/matchMedia\(\s*"\(min-width/);
    }
  });

  it("hides the desktop cluster on a wrapper, never on the button itself", () => {
    // `hidden` loses to unlayered `.btn { display: inline-flex }`.
    const cta = source.match(/<a[^>]*class="btn btn-primary[^"]*"[^>]*>/g) ?? [];
    expect(cta.length).toBeGreaterThan(0);
    for (const tag of cta) {
      expect(tag, "a .btn cannot hide itself with a utility").not.toMatch(
        /(lg|sm|md):?hidden|hidden/,
      );
    }
    expect(source).toContain('<div class="tds-sitebar__desktop">');
    expect(source).toMatch(/<div class="tds-sitebar__wide">\s*<a href=\{contact\} class="btn btn-primary/);
  });

  it("bundles the script rather than inlining it", () => {
    expect(raw).not.toMatch(/<script[^>]*is:inline/);
    expect(chrome).not.toMatch(/<script[^>]*is:inline/);
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

  it("remembers the choice for every Tracht Digital site", () => {
    // The phone's copy of the switch lives in the app's "Mehr" sheet.
    expect(source).toContain("data-locale-link={l.code}");
    expect(source).toContain("mountPreferenceControls(header)");
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

describe("the property bar", () => {
  /**
   * The journal, this site and the shop share one bar. Each of these used to
   * be different on each site: the width (120rem there, 72rem here), the link
   * style, and the names and order of the sibling links.
   */

  it("is the shared bar, at the page's own edges", () => {
    expect(source).toContain('<div class="tds-shell tds-sitebar">');
    expect(source).not.toMatch(/max-w-6xl/);
    expect(source).toContain('class="tds-sitebar__brand brand-wordmark"');
    expect(source).toContain('<span class="tds-sitebar__divider" aria-hidden="true">');
  });

  it("takes its links from propertyNav, never from a local list", () => {
    expect(source).toMatch(
      /import \{[^}]*\bpropertyNav\b[^}]*\} from "@tracht-digital-solutions\/tds-shared\/nav"/,
    );
    expect(source).toContain('propertyNav("tools", lang, `${base}/`)');
    expect(source).not.toMatch(/links\.(blog|main)/);
    expect(source).toContain('class="tds-sitebar__link"');
  });

  it("sends the CTA to the contact section in the reader's language", () => {
    expect(source).toContain("propertyContact(lang)");
    expect(source).not.toContain("links.contact");
  });

  it("marks this property current on every page of it", () => {
    // `page` on the catalog, `true` on a tool page — never absent inside the
    // property, never on a sibling.
    expect(source).toContain('aria-current={item.current ? (onCatalog ? "page" : "true") : undefined}');
  });

  it("resolves the bar in the INSTALLED tds-shared", () => {
    const shared = join(process.cwd(), "node_modules", "@tracht-digital-solutions", "tds-shared");
    const primitives = readFileSync(join(shared, "styles", "primitives.css"), "utf8");
    expect(primitives).toContain(".tds-sitebar__wide");
    const nav = readFileSync(join(shared, "dist", "nav", "index.d.ts"), "utf8");
    expect(nav).toMatch(/\bpropertyNav\b/);
    expect(nav).toMatch(/\bpropertyContact\b/);
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

  it("sits OUTSIDE the desktop-only cluster", () => {
    // Inside `.tds-sitebar__desktop` it would vanish below `lg` — where it is
    // the only control beside the hamburger, so its absence would be total.
    const cluster = source.indexOf('<div class="tds-sitebar__desktop">');
    // Two closing tags after the CTA: its `.tds-sitebar__wide`, then the cluster.
    const cta = source.indexOf("btn btn-primary", cluster);
    const clusterEnd = source.indexOf("</div>", source.indexOf("</div>", cta) + 1);
    const mount = source.indexOf("<AccountMenu");

    expect(cluster).toBeGreaterThan(-1);
    expect(mount).toBeGreaterThan(clusterEnd);
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
