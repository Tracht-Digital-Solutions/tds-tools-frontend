import { describe, expect, it } from "vitest";

import { mergeCopy, mergeGuide, type ToolCopyOverride } from "./guideOverrides";
import { guideFor } from "./guides";

/**
 * Merging panel edits over the committed text.
 *
 * The whole reason this is field-by-field rather than row-by-row: an editor who
 * rewrote the intro and left the FAQ alone must get the rewritten intro AND the
 * committed FAQ. Replacing the whole guide would silently blank every section
 * they did not touch — a page that looks edited rather than broken, which is
 * the worst kind of wrong.
 */
describe("mergeGuide", () => {
  const slug = "qr-code-generator";

  it("returns the committed guide when nothing is overridden", () => {
    expect(mergeGuide(slug, "de", undefined)).toEqual(guideFor(slug, "de"));
  });

  it("replaces only the fields the editor filled in", () => {
    const base = guideFor(slug, "de");
    const override: ToolCopyOverride = { intro: ["Ganz neuer Einstieg."] };

    const merged = mergeGuide(slug, "de", override);

    expect(merged?.intro).toEqual(["Ganz neuer Einstieg."]);
    expect(merged?.faq).toEqual(base?.faq);
    expect(merged?.steps).toEqual(base?.steps);
    expect(merged?.privacy).toBe(base?.privacy);
  });

  it("treats an empty override value as 'not overridden'", () => {
    // Clearing a field in the panel stores NULL, but a form can also submit an
    // empty string or an empty array. All three have to mean the same thing,
    // or clearing the intro would blank it instead of restoring it.
    const base = guideFor(slug, "de");
    const merged = mergeGuide(slug, "de", { intro: [], privacy: "   " });

    expect(merged?.intro).toEqual(base?.intro);
    expect(merged?.privacy).toBe(base?.privacy);
  });

  it("maps the API's snake_case onto the render shape", () => {
    const merged = mergeGuide(slug, "de", {
      use_cases: [{ title: "Neu", text: "Text" }],
    });
    expect(merged?.useCases).toEqual([{ title: "Neu", text: "Text" }]);
  });

  it("still yields a guide for a tool that has none committed", () => {
    const merged = mergeGuide("gibt-es-nicht", "de", {
      intro: ["Nur aus dem Panel."],
    });
    expect(merged?.intro).toEqual(["Nur aus dem Panel."]);
  });

  it("returns undefined when there is neither a committed guide nor content", () => {
    expect(mergeGuide("gibt-es-nicht", "de", {})).toBeUndefined();
    expect(mergeGuide("gibt-es-nicht", "de", undefined)).toBeUndefined();
  });
});

describe("mergeCopy", () => {
  const tool = { name: "QR-Code-Generator", description: "Aus dem Manifest." };

  it("keeps the manifest copy when nothing is overridden", () => {
    expect(mergeCopy(tool, undefined).name).toBe("QR-Code-Generator");
    expect(mergeCopy(tool, {}).description).toBe("Aus dem Manifest.");
  });

  it("lets an editor rewrite the description without restating the name", () => {
    const merged = mergeCopy(tool, { description: "Neu formuliert." });
    expect(merged.name).toBe("QR-Code-Generator");
    expect(merged.description).toBe("Neu formuliert.");
  });

  it("surfaces the SEO fields only when they are set", () => {
    expect(mergeCopy(tool, {}).seoTitle).toBeUndefined();
    expect(mergeCopy(tool, { seo_title: "Kurz & gut" }).seoTitle).toBe("Kurz & gut");
  });
});
