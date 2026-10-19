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

/** Every island file under `dir`, subfolders included (the devkit studio keeps its steps in one). */
function walk(dir: string, rel = ""): string[] {
  return readdirSync(join(dir, rel), { withFileTypes: true }).flatMap((entry) => {
    const path = rel ? `${rel}/${entry.name}` : entry.name;
    if (entry.isDirectory()) return walk(dir, path);
    return entry.name.endsWith(".tsx") && !entry.name.endsWith(".test.tsx") ? [path] : [];
  });
}

const islands = packs.flatMap((pack) => {
  const dir = join(scope, pack, "islands");
  if (!existsSync(dir)) return [];
  return walk(dir).map((f) => ({ name: `${pack}/islands/${f}`, src: readFileSync(join(dir, f), "utf8") }));
});

describe("file tools", () => {
  it("finds the composed packs' islands", () => {
    expect(islands.length).toBeGreaterThan(5);
  });

  it.each(islands.map((i) => [i.name, i.src] as const))("%s takes files only through FileDropZone", (_name, src) => {
    expect(src).not.toMatch(/type=["']file["']/);
  });

  it("has at least the known file tools on the shared drop zone", () => {
    const users = islands.filter((i) => i.src.includes("<FileDropZone")).map((i) => i.name.split("/").at(-1));
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
