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
import pdf from "@tracht-digital-solutions/tds-tool-pdf";
import office from "@tracht-digital-solutions/tds-tool-office";

const packs = [qr, textkit, devkit, media, pdf, office];

export default defineConfig({
  site: "https://tools.tracht-digital.de",
  output: "static",
  integrations: [
    react(),
    toolHost({ packs }),
    sitemap({
      // `/install` is a noindex operator page with no /en/ twin — the i18n
      // option below would otherwise emit an alternate pointing at a 404. It
      // was invisible to the sitemap while it lived in public/.
      filter: (page) =>
        !page.includes("/install") && !page.includes("/404") && !page.includes("/500"),
      // The site publishes German at `/` and English at `/en/` with the same
      // slugs. Declaring the pair here makes the sitemap carry `xhtml:link`
      // alternates alongside the ones in each page's <head> — the two are
      // read by different parts of a crawler, and Search Console reports an
      // hreflang set as valid only when both agree.
      i18n: {
        defaultLocale: "de",
        locales: { de: "de-DE", en: "en-GB" },
      },
      serialize(item) {
        // The catalog is the entry point; the tool pages are the corpus.
        // Everything else (og routes are not pages, 404 is filtered) keeps
        // the default. `lastmod` is the build time, which for a static site
        // rebuilt on every content change is the honest answer.
        const path = new URL(item.url).pathname.replace(/^\/en/, "") || "/";
        item.lastmod = new Date().toISOString();
        if (path === "/") {
          item.priority = 1.0;
          item.changefreq = "weekly";
        } else if (path.startsWith("/tools/")) {
          item.priority = 0.8;
          item.changefreq = "monthly";
        }
        return item;
      },
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
