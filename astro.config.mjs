import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import react from "@astrojs/react";
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
import pdf from "@tracht-digital-solutions/tds-tool-pdf";
import office from "@tracht-digital-solutions/tds-tool-office";

const packs = [qr, textkit, devkit, media, pdf, office];

export default defineConfig({
  site: "https://tools.tracht-digital.de",

  // ─── Server-rendered, behind a file-backed page cache ───────────────────
  //
  // This site used to be a static build, and until the guides moved into the
  // CMS it had nothing that changed independently of a deploy — which was a
  // fair argument for leaving it static. That is no longer true: the tool
  // guides, the tool copy and the SEO fields are panel-editable now, so a
  // wording fix would otherwise cost a full rebuild of every tool page.
  //
  // A cache hit costs exactly what the static file cost, because it is one.
  output: "server",
  adapter: node({
    mode: "standalone",
    // The cache writer needs a complete body before it can store a page.
    experimentalDisableStreaming: true,
  }),
  integrations: [
    react(),
    toolHost({ packs }),
    // @astrojs/sitemap is deliberately gone. It derives its entries from the
    // routes the build EMITS, and the tool pages are server-rendered now — it
    // would have shipped a sitemap holding only the pages its own filter used
    // to exclude, with nothing red anywhere. src/lib/sitemap.ts replaces it and
    // keeps the de/en alternates, which on THIS site really are a pure prefix
    // operation (same slugs in both trees).
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
    ssr: {
      // Bundle first-party and pure-JS packages INTO dist/server so the host
      // never needs a GitHub Packages token to boot — that covers every
      // tds-tool-* pack and the tools contract as well as tds-shared.
      //
      // Rule of thumb from the sibling sites: bundle a leaf, ship a tree. A
      // package with its own dependency tree costs one failed build per
      // transitive name when bundled; as a runtime dependency npm resolves it
      // in one step.
      // "marked" used to be listed here. It is not a dependency of this site
      // and is not installed — the entry was copied from tds-blog, where the
      // markdown renderer does need it. A noExternal name nothing imports is a
      // silent no-op, which is exactly why it survived.
      noExternal: [/^@tracht-digital-solutions\//, "zod"],
      // Native addons cannot be bundled.
      external: ["sharp"],
    },
  },
});
