import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { O as renderTemplate, S as renderComponent } from "./sequence_D8AML-3n.mjs";
import { t as createComponent } from "./compiler_DXKtTkSA.mjs";
import { t as $$CatalogPage } from "./CatalogPage_CxAPjK6H.mjs";
//#region src/pages/en/index.astro
var en_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => "/en"
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "CatalogPage", $$CatalogPage, { "lang": "en" })}`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/pages/en/index.astro", void 0);
var $$file = "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/pages/en/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/en/index@_@astro
var page = () => en_exports;
//#endregion
export { page };
