import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
// Shared CSS minify settings (incl. the cssTarget that keeps lightningcss
// from dropping the header backdrop-filter prefix). See tds-shared#10.
import { tdsViteBuild } from "@tracht-digital-solutions/tds-shared/astro";
import { toolHost } from "@tracht-digital-solutions/tds-tools-contract/astro";

// The tool packs composed into this build. Adding a `tds-tool-*` package here
// (plus the matching dependency in package.json) is this repo's ONLY tool
// composition decision — routes + catalog come from the manifests. `toolHost`
// hard-errors the build on an id/slug collision or a missing dependency.
import qr from "@tracht-digital-solutions/tds-tool-qr";
import textkit from "@tracht-digital-solutions/tds-tool-textkit";
import devkit from "@tracht-digital-solutions/tds-tool-devkit";
import media from "@tracht-digital-solutions/tds-tool-media";

const packs = [qr, textkit, devkit, media];

export default defineConfig({
  site: "https://tools.tracht-digital.de",
  output: "static",
  integrations: [
    react(),
    toolHost({ packs }),
    sitemap({
      filter: (page) => !page.includes("/404") && !page.includes("/500"),
    }),
  ],
  trailingSlash: "ignore",
  build: {
    format: "directory",
    // Inline small stylesheets into <head> so critical CSS ships in the initial
    // HTML and the browser doesn't round-trip before paint.
    inlineStylesheets: "auto",
  },
  image: {
    service: { entrypoint: "astro/assets/services/sharp" },
  },
  vite: {
    build: { ...tdsViteBuild },
  },
});
