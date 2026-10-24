import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { i as sitemapPaths, r as renderUrlset } from "./sitemap_Dt17HjKs.mjs";
// src/pages/sitemap-0.xml.ts
var sitemap_0_xml_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async () => new Response(renderUrlset(await sitemapPaths()), { headers: { "content-type": "application/xml; charset=utf-8" } });
// \0virtual:astro:page:src/pages/sitemap-0.xml@_@ts
var page = () => sitemap_0_xml_exports;
export { page };
