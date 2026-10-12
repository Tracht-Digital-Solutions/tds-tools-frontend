import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Every tool that takes files takes them by drag and drop too.
 *
 * The behaviour and its animation live once, in tds-shared's
 * `<FileDropZone>` (`./dropzone`). A bare `<input type="file">` in a tool
 * island is a tool that silently lost drag and drop, the page-wide drop
 * guard (a missed drop navigates the browser away to the file) and the
 * animation — nothing renders wrong, so only a scan finds it.
 *
 * Reads the INSTALLED packs, which are what this site builds from, so a new
 * pack is covered the moment it is composed.
 */
const scope = join(process.cwd(), "node_modules", "@tracht-digital-solutions");
const packs = readdirSync(scope).filter((name) => name.startsWith("tds-tool-"));

const islands = packs.flatMap((pack) => {
  const dir = join(scope, pack, "islands");
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".tsx") && !f.endsWith(".test.tsx"))
    .map((f) => ({ name: `${pack}/islands/${f}`, src: readFileSync(join(dir, f), "utf8") }));
});

describe("file tools", () => {
  it("finds the composed packs' islands", () => {
    expect(islands.length).toBeGreaterThan(5);
  });

  it.each(islands.map((i) => [i.name, i.src] as const))("%s takes files only through FileDropZone", (_name, src) => {
    expect(src).not.toMatch(/type=["']file["']/);
  });

  it("has at least the known file tools on the shared drop zone", () => {
    const users = islands.filter((i) => i.src.includes("<FileDropZone")).map((i) => i.name.split("/islands/")[1]);
    for (const tool of [
      "ImageCompress.tsx",
      "PdfTools.tsx",
      "TextRecognition.tsx",
      "AiImageBadge.tsx",
      "ImagesToPdf.tsx",
      "PdfCompress.tsx",
      "PdfToImages.tsx",
      "PdfWatermark.tsx",
    ]) {
      expect(users, tool).toContain(tool);
    }
  });
});
