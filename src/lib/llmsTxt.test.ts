import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import businesscard from "@tracht-digital-solutions/tds-tool-businesscard";
import devkit from "@tracht-digital-solutions/tds-tool-devkit";
import legal from "@tracht-digital-solutions/tds-tool-legal";
import media from "@tracht-digital-solutions/tds-tool-media";
import office from "@tracht-digital-solutions/tds-tool-office";
import pdf from "@tracht-digital-solutions/tds-tool-pdf";
import qr from "@tracht-digital-solutions/tds-tool-qr";
import textkit from "@tracht-digital-solutions/tds-tool-textkit";

import { renderLlmsTxt, type LlmsTool } from "./llmsTxt";
import { absolute } from "./sitemap";
import { localizedPath } from "./seo";

/**
 * `/llms.txt` is this site's index for answer engines, and it is GENERATED —
 * the whole point, since the journal's hand-written one went months without
 * naming a single article.
 *
 * So the assertions below check the renderer against the composed catalogue:
 * every tool named, both language URLs present, no price stated, and the one
 * claim that distinguishes this site kept.
 */
const tools: LlmsTool[] = [qr, textkit, devkit, media, pdf, office, legal, businesscard]
  .flatMap((pack) => pack.tools)
  .map((tool) => ({
    slug: tool.slug,
    category: tool.category,
    name: tool.name,
    description: tool.description,
    requiresLogin: tool.requiresLoginDefault ?? false,
    isPremium: tool.premiumDefault ?? false,
  }));

const llms = renderLlmsTxt({ tools });

describe("llms.txt", () => {
  it("names every tool and both of its URLs", () => {
    for (const tool of tools) {
      expect(llms, tool.slug).toContain(`**${tool.name}**`);
      expect(llms, `${tool.slug} de`).toContain(absolute(localizedPath(`/tools/${tool.slug}`, "de")));
      expect(llms, `${tool.slug} en`).toContain(absolute(localizedPath(`/tools/${tool.slug}`, "en")));
    }
  });

  it("names both catalogue pages, which the sitemap also lists", () => {
    expect(llms).toContain(absolute(localizedPath("/", "de")));
    expect(llms).toContain(absolute(localizedPath("/", "en")));
  });

  it("states no price", () => {
    // A premium price is a panel setting and this file is rendered from a
    // cached catalogue read. A figure here would be a stale price stated with
    // authority; the tool's own page carries the current one.
    expect(llms).not.toMatch(/\d[\d.,]*\s*(€|EUR)/);
  });

  it("keeps the claim that distinguishes the site", () => {
    expect(llms).toMatch(/im Browser/);
    expect(llms).toMatch(/nicht\s+auf einen Server geladen/);
  });

  it("keeps the site's copy rules", () => {
    expect(llms).not.toMatch(/kostenlos\w*\s+(erst)?(gespräch|beratung)/i);
    expect(llms).not.toMatch(/kostenfrei\w*\s+(erst)?(gespräch|beratung)/i);
    expect(llms).not.toMatch(/unverbindlich\w*\s+(erst)?gespräch/i);
    expect(llms.toLowerCase()).not.toMatch(/hofladen|referenzkunde|case study|fallstudie/);
  });

  it("stays one small file", () => {
    expect(Buffer.byteLength(llms, "utf8")).toBeLessThanOrEqual(8 * 1024);
    expect(llms).not.toMatch(/llms-full/);
  });

  it("has no static copy to shadow the route", () => {
    // A file in `public/` wins over a route of the same path, so a
    // `public/llms.txt` would silently serve instead of the endpoint.
    expect(existsSync(resolve(process.cwd(), "public/llms.txt"))).toBe(false);
  });

  it("names a tool whose category the contract added later", () => {
    const rendered = renderLlmsTxt({
      tools: [
        ...tools,
        {
          slug: "etwas-neues",
          // Cast: the point is a category this site's order does not list.
          category: "frisch-erfunden" as LlmsTool["category"],
          name: "Etwas Neues",
          description: "Ein Werkzeug in einer Kategorie, die die Reihenfolge nicht kennt.",
          requiresLogin: false,
          isPremium: false,
        },
      ],
    });
    expect(rendered).toContain("**Etwas Neues**");
    expect(rendered).toContain(absolute(localizedPath("/tools/etwas-neues", "de")));
  });
});
