import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { A as renderTemplate, w as renderComponent } from "./sequence_DLpv-Taf.mjs";
import { n as createComponent } from "./compiler_Dsmi62zL.mjs";
import { t as $$CatalogPage } from "./CatalogPage_CxWqSfCI.mjs";
// src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "CatalogPage", $$CatalogPage, { "lang": "de" })}`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/pages/index.astro", void 0);
var $$file = "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/pages/index.astro";
// \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
export { page };
