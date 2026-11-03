import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { O as renderTemplate, S as renderComponent } from "./sequence_BSb_st-_.mjs";
import { D as createComponent } from "./jsonld_vAy34J9_.mjs";
import "./compiler_BX7gy011.mjs";
import { t as $$CatalogPage } from "./CatalogPage_xpMPmBW1.mjs";
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
