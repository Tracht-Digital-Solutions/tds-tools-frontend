import { t as apiBase } from "./connection_C9MWUnHz.mjs";
import { i as readContentJson, r as memoisedOr } from "./catalog_CX0A-i4F.mjs";
import { t as guideFor } from "./guides_DMHEMftH.mjs";
//#region src/lib/guideOverrides.ts
async function guideOverrides(lang) {
	return memoisedOr(`tool-guides:${lang}`, async () => {
		const url = new URL(`${apiBase()}/tools/guides`);
		url.searchParams.set("lang", lang);
		return (await readContentJson(url)).guides ?? {};
	}, () => ({}), `tool guides (${lang}, committed text)`);
}
function has(value) {
	if (value === void 0 || value === null) return false;
	if (typeof value === "string") return value.trim() !== "";
	if (Array.isArray(value)) return value.length > 0;
	return true;
}
function mergeGuide(slug, lang, override) {
	const base = guideFor(slug, lang);
	if (!override) return base;
	const merged = {
		intro: has(override.intro) ? override.intro : base?.intro ?? [],
		useCases: has(override.use_cases) ? override.use_cases : base?.useCases ?? [],
		steps: has(override.steps) ? override.steps : base?.steps ?? [],
		privacy: has(override.privacy) ? override.privacy : base?.privacy ?? "",
		faq: has(override.faq) ? override.faq : base?.faq ?? [],
		related: has(override.related) ? override.related : base?.related ?? []
	};
	return merged.intro.length === 0 && merged.useCases.length === 0 && merged.steps.length === 0 && merged.faq.length === 0 && !base ? void 0 : merged;
}
function mergeCopy(tool, override) {
	return {
		...tool,
		name: has(override?.name) ? override.name : tool.name,
		description: has(override?.description) ? override.description : tool.description,
		seoTitle: has(override?.seo_title) ? override.seo_title : tool.seoTitle,
		seoDescription: has(override?.seo_description) ? override.seo_description : tool.seoDescription
	};
}
//#endregion
export { mergeCopy as n, mergeGuide as r, guideOverrides as t };
