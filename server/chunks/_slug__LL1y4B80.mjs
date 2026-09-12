import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { A as renderTemplate, V as createAstro, w as renderComponent } from "./sequence_BDmC7xT1.mjs";
import { t as createComponent } from "./compiler_Bp427A9v.mjs";
import { n as $$ToolPage, t as resolveToolRoute } from "./toolRoute_CnCgcack.mjs";
//#region src/pages/en/tools/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://tools.tracht-digital.de");
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const data = await resolveToolRoute(String(Astro.params.slug ?? ""), "en");
	if (!data) return new Response("Not found", { status: 404 });
	return renderTemplate`${renderComponent($$result, "ToolPage", $$ToolPage, {
		"tool": data.tool,
		"allTools": data.allTools,
		"lang": "en",
		"overrides": data.overrides
	})}`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/pages/en/tools/[slug].astro", void 0);
var $$file = "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/pages/en/tools/[slug].astro";
var $$url = "/en/tools/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/en/tools/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
