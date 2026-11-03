import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { O as renderTemplate, S as renderComponent } from "./sequence_BSb_st-_.mjs";
import { D as createComponent } from "./jsonld_vAy34J9_.mjs";
import { t as createAstro } from "./compiler_BX7gy011.mjs";
import { n as $$ToolPage, t as resolveToolRoute } from "./toolRoute_qCoP4ovS.mjs";
// src/pages/en/tools/[slug].astro
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
// \0virtual:astro:page:src/pages/en/tools/[slug]@_@astro
var page = () => _slug__exports;
export { page };
