import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { C as renderComponent, k as renderTemplate } from "./sequence_CBa0I6Lo.mjs";
import { D as createComponent } from "./jsonld_CZTFuJwX.mjs";
import { t as createAstro } from "./compiler_DlX6Xx-G.mjs";
import { n as $$ToolPage, t as resolveToolRoute } from "./toolRoute_C0lKno8L.mjs";
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
