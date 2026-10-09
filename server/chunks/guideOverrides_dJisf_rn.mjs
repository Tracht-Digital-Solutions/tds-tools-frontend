import { t as apiBase } from "./connection_C3l7lc1a.mjs";
import { a as readContentJson, i as memoisedOr } from "./catalog_CIi8pJsG.mjs";
import { t as guideFor } from "./guides_DMHEMftH.mjs";
//#region src/lib/guideOverrides.ts
/**
* The panel-editable half of a tool page.
*
* The guides committed in `src/content/guides` stay the source of truth; this
* module fetches whatever an editor has overridden in the admin panel and
* merges it on top, **field by field**. That granularity is the point: an
* editor who rewrote the intro but not the FAQ gets the rewritten intro and
* the committed FAQ, rather than an empty FAQ.
*
* Same fail-soft contract as every other content read on these sites — an
* unreachable or empty API leaves the committed text exactly as it was, so a
* tool page can never go blank. That is also why `guides.test.ts` keeps
* failing when a composed tool has no committed guide: the fallback is load
* bearing, not decoration.
*/
/**
* Every override for a language.
*
* Memoised through `contentCache`, so the dozen tool pages of one render share
* a single request while a cache rebuild still reads through. A module-level
* memo would pin the overrides for the life of the server — an edit would
* never appear, however often its cache was rebuilt.
*/
async function guideOverrides(lang) {
	return memoisedOr(`tool-guides:${lang}`, async () => {
		const url = new URL(`${apiBase()}/tools/guides`);
		url.searchParams.set("lang", lang);
		return (await readContentJson(url)).guides ?? {};
	}, () => ({}), `tool guides (${lang}, committed text)`);
}
/** True for an override value worth using — a present, non-empty one. */
function has(value) {
	if (value === void 0 || value === null) return false;
	if (typeof value === "string") return value.trim() !== "";
	if (Array.isArray(value)) return value.length > 0;
	return true;
}
/**
* The guide to render for one tool: the committed one with any overrides
* merged on top.
*
* Returns `undefined` only when there is no committed guide AND no override —
* i.e. exactly when `guideFor` alone would have.
*/
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
/**
* The display copy for one tool: manifest values with overrides on top.
*
* The two SEO fields fall back to the copy that came IN, exactly like the name
* and the description above. They used to fall back to `undefined`, and
* because `ToolPage.astro` passes `copy.seoTitle` straight into the layout,
* every tool page without a panel override rendered an empty `<title>` — all
* of them, since the panel ships no overrides by default.
*
* Nothing could see it. `seo.test.ts` measures `tool.seo?.title`, the value in
* the MANIFEST, not the one the page ends up with; the browser shows the URL in
* the tab when a title is empty, so the page still looks fine; and the OG card
* simply loses its heading. The only visible trace was in a search result
* nobody on the team was looking at.
*/
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
