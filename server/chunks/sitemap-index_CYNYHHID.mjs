import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { t as renderSitemapIndex } from "./sitemap_Dq_muwVU.mjs";
//#region src/pages/sitemap-index.xml.ts
var sitemap_index_xml_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = () => new Response(renderSitemapIndex((/* @__PURE__ */ new Date()).toISOString().slice(0, 10)), { headers: { "content-type": "application/xml; charset=utf-8" } });
//#endregion
//#region \0virtual:astro:page:src/pages/sitemap-index.xml@_@ts
var page = () => sitemap_index_xml_exports;
//#endregion
export { page };
