/**
 * Smoke test for the OG card renderers.
 *
 * Renders the default card plus one tool card and writes both next to this
 * script so a human can eyeball them. Exits non-zero on a render failure
 * (CI-friendly). Mirrors the `og:smoke` convention of the landingpage and the
 * blog.
 *
 * Worth running after ANY change to `src/og/render.ts`: the two defects this
 * catches — a missing font file and a headline that overflows the card — are
 * both invisible to `astro check`, to vitest and to the build. Satori draws
 * outside the viewport without warning, so an over-long tool name simply goes
 * missing from the shared image.
 *
 * Run: `npm run og:smoke`
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderDefaultOgPng, renderToolOgPng } from "../src/og/render.ts";

const outDir = fileURLToPath(new URL(".", import.meta.url));

async function write(name: string, png: Buffer) {
  const file = path.join(outDir, name);
  fs.writeFileSync(file, png);
  // eslint-disable-next-line no-console
  console.log(`✓ rendered ${file} (${(png.length / 1024).toFixed(1)} KB)`);
}

await write("og-smoke-default.png", await renderDefaultOgPng());
await write(
  "og-smoke-tool.png",
  // The longest name the composed packs currently produce — the one that
  // decides whether `headlineSize()` is still right.
  await renderToolOgPng({
    name: "WCAG-Kontrast-Prüfer",
    category: "Entwickler",
    slug: "wcag-kontrast",
    isPremium: false,
    lang: "de",
  }),
);
