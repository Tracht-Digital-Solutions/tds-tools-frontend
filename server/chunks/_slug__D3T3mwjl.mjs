import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { A as renderTemplate, w as renderComponent } from "./sequence_DLpv-Taf.mjs";
import { n as createComponent, t as createAstro } from "./compiler_Dsmi62zL.mjs";
import { n as $$ToolPage, t as resolveToolRoute } from "./toolRoute_De7u32Y0.mjs";
// src/pages/tools/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://tools.tracht-digital.de");
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const data = await resolveToolRoute(String(Astro.params.slug ?? ""), "de");
	if (!data) return new Response("Not found", { status: 404 });
	return renderTemplate`${renderComponent($$result, "ToolPage", $$ToolPage, {
		"tool": data.tool,
		"allTools": data.allTools,
		"lang": "de",
		"overrides": data.overrides
	})}`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/pages/tools/[slug].astro", void 0);
var $$file = "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/pages/tools/[slug].astro";
var $$url = "/tools/[slug]";
// \0virtual:astro:page:src/pages/tools/[slug]@_@astro
var page = () => _slug__exports;
export { page };
