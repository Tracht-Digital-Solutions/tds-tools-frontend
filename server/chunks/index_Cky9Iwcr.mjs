import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { A as renderTemplate, w as renderComponent } from "./sequence_DLpv-Taf.mjs";
import { n as createComponent } from "./compiler_Dsmi62zL.mjs";
import { t as $$CatalogPage } from "./CatalogPage_CxWqSfCI.mjs";
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
