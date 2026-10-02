import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Every test that reasons about "all composed tools" keeps its own copy of the
 * pack list, and on 2026-10-02 two of them were wrong in the same way:
 * `guides.test.ts` and `i18n.test.ts` both omitted
 * `@tracht-digital-solutions/tds-tool-businesscard`.
 *
 * Neither failure looked like a failure. "Has a guide for every composed tool"
 * passed while `visitenkarten-designer` had no guide — so that page emitted
 * neither `HowTo` nor `FAQPage`. "Every tool has English copy" passed while
 * that tool had none — so the English page served the GERMAN title and
 * description, and two pages shared one title. Both were found by
 * `npm run audit:geo` against the rendered site, which is the wrong place to
 * find them.
 *
 * The lists cannot be collapsed into one without either importing
 * `astro.config.mjs` into unit tests (it would pull the whole integration
 * chain) or moving the composition decision out of the config, where it
 * belongs. So instead: whichever test files import a tool pack must import
 * ALL of them, and this is the one guard that says so.
 */
const LIB = resolve(process.cwd(), "src/lib");
const PACK = /@tracht-digital-solutions\/(tds-tool-[a-z]+)"/g;

const packsIn = (source: string) => new Set([...source.matchAll(PACK)].map((m) => m[1]!));

const composed = packsIn(readFileSync(resolve(process.cwd(), "astro.config.mjs"), "utf8"));

/** The test files that reason about the composed catalogue at all. */
const consumers = readdirSync(LIB)
  .filter((name) => name.endsWith(".test.ts"))
  .map((name) => ({ name, source: readFileSync(resolve(LIB, name), "utf8") }))
  .filter((file) => packsIn(file.source).size > 0 && file.name !== "composedPacks.test.ts");

describe("the composed tool packs", () => {
  it("are discoverable in astro.config.mjs", () => {
    // If the import style there changes, this guard would silently pass on an
    // empty set and protect nothing.
    expect(composed.size, "no tds-tool-* packs found in astro.config.mjs").toBeGreaterThan(0);
  });

  it("are read by at least one test file", () => {
    expect(consumers.map((f) => f.name)).not.toEqual([]);
  });

  it.each(["guides.test.ts", "i18n.test.ts"])("%s is one of those files", (name) => {
    // Named explicitly: these two are the ones whose blind spot shipped, and
    // a rename that quietly dropped them from the scan would restore it.
    expect(consumers.map((f) => f.name)).toContain(name);
  });

  it("are every one of them, in every one of those files", () => {
    for (const file of consumers) {
      const theirs = packsIn(file.source);
      for (const pack of composed) {
        expect(theirs.has(pack), `${file.name} does not import ${pack}, which the build composes`).toBe(true);
      }
    }
  });
});
