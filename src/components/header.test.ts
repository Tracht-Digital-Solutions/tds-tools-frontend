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
