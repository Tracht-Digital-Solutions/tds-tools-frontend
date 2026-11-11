import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { C as renderComponent, k as renderTemplate } from "./sequence_ChZr5Uq7.mjs";
import { D as createComponent } from "./jsonld_D-6RSikm.mjs";
import "./compiler_DN0qIFLy.mjs";
import { t as $$CatalogPage } from "./CatalogPage_QugaTV3H.mjs";
// src/pages/en/index.astro
var en_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => "/en"
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "CatalogPage", $$CatalogPage, { "lang": "en" })}`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/pages/en/index.astro", void 0);
var $$file = "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/pages/en/index.astro";
// \0virtual:astro:page:src/pages/en/index@_@astro
var page = () => en_exports;
export { page };
