import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Registering a tool pack takes THREE edits in this repo, and two of them are
 * silent when forgotten.
 *
 * 1. `package.json` — the dependency.
 * 2. `astro.config.mjs` — the import and the `packs` array. Forget this and
 *    the tool simply does not exist; `toolHost` never sees it. Loud enough.
 * 3. `src/styles/global.css` — an `@source` line so Tailwind SCANS the pack's
 *    markup. Forget this and the tool's page renders, its route answers 200,
 *    its tests pass — and its layout is gone, because not one of its utility
 *    classes was generated. That is what happened to the business-card pack:
 *    a two-column designer shipped as one column of controls with the preview
 *    nowhere, and nothing anywhere said why.
 *
 * So the three lists are checked against each other here. The dependency list
 * is the source of truth: a pack you depend on is a pack you meant to ship.
 */
const read = (rel: string) => readFileSync(resolve(process.cwd(), rel), "utf8");

const pkg = JSON.parse(read("package.json")) as { dependencies?: Record<string, string> };
const astroConfig = read("astro.config.mjs");
const globalCss = read("src/styles/global.css");

/** Every `@tracht-digital-solutions/tds-tool-*` this site depends on. */
const packs = Object.keys(pkg.dependencies ?? {})
  .filter((name) => name.startsWith("@tracht-digital-solutions/tds-tool-"))
  .map((name) => name.replace("@tracht-digital-solutions/", ""))
  .sort();

describe("every tool pack this site depends on", () => {
  it("is a list worth checking", () => {
    // A zero-length list would make every assertion below pass vacuously.
    expect(packs.length).toBeGreaterThanOrEqual(7);
  });

  it.each(packs)("%s is imported and composed in astro.config.mjs", (pack) => {
    expect(astroConfig, `import of ${pack}`).toContain(`@tracht-digital-solutions/${pack}`);
    // The import alone is not composition: the local name has to reach `packs`.
    const imported = astroConfig.match(
      new RegExp(`import\\s+(\\w+)\\s+from\\s+"@tracht-digital-solutions/${pack}"`),
    );
    expect(imported, `import statement for ${pack}`).not.toBeNull();
    const list = astroConfig.match(/const packs = \[([^\]]*)\]/)?.[1] ?? "";
    expect(
      list.split(",").map((entry) => entry.trim()),
      `${pack} in the packs array`,
    ).toContain(imported![1]);
  });

  it.each(packs)("%s is scanned by Tailwind (@source in global.css)", (pack) => {
    expect(globalCss, `@source for ${pack}`).toContain(
      `@source "../../node_modules/@tracht-digital-solutions/${pack}/**/*.{astro,tsx}";`,
    );
  });

  it("has no @source line for a pack it does not depend on", () => {
    // The other direction: a pack removed from the dependencies but left in
    // the scan list makes Tailwind read a folder that is not there.
    const scanned = [...globalCss.matchAll(/@source "\.\.\/\.\.\/node_modules\/@tracht-digital-solutions\/(tds-tool-[a-z-]+)\//g)]
      .map((match) => match[1]!)
      .sort();
    expect(scanned).toEqual(packs);
  });
});
