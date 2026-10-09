import { i as SITEMAP_SECTIONS, o as sectionPath } from "./cache_CTk_g6Zd.mjs";
import { o as newestDay, r as escapeXml, s as renderSectionedSitemapIndex } from "./site_TmeFq_K5.mjs";
import { r as enabledTools } from "./catalog_CIi8pJsG.mjs";
import { a as localizedPath, f as site, n as groupExcluded, r as hreflangGroup, t as exclusionPatterns } from "./sitemapExclusions_uCzo_05j.mjs";
import { n as guideUpdatedAt } from "./guides_DMHEMftH.mjs";
//#region src/lib/sitemap.ts
/**
* The sitemap, built from the composed + panel-configured catalog.
*
* ### Why this is hand-written now
*
* `@astrojs/sitemap` derives its entries from the routes the build EMITS, and
* the tool pages are server-rendered — it would have shipped a sitemap holding
* only the pages its own `filter` used to exclude. A near-empty, technically
* valid file, with nothing red anywhere.
*
* ### The hreflang rules it has to keep
*
* Both trees carry the SAME slugs, so an alternate is a pure prefix operation
* and every page gets one — that is the whole reason the English tree was
* built that way. Two rules survive from the integration's config and are the
* easiest things to get wrong:
*
* - `/install` is excluded. It is a noindex operator page with no English
*   twin, so an alternate would point at a 404 — and one dangling alternate
*   invalidates the whole set, the German side included.
* - Nothing is emitted for the English tree while `EN_ENABLED` is false. An
*   `hreflang="en"` on a tree that does not exist is the same failure.
*/
/** Absolute URL for a path on this site. */
function absolute(path) {
	return new URL(path, site.origin).href;
}
/**
* Every indexable page, as language-neutral paths.
*
* Returned once and then localised, rather than assembled per tree, because
* that is what guarantees the two trees stay a prefix pair — the property the
* alternates depend on.
*/
async function sitemapPaths() {
	const [enabled, patterns] = await Promise.all([enabledTools(), exclusionPatterns()]);
	const tools = enabled.map((tool) => ({
		path: `/tools/${tool.slug}`,
		section: "tools",
		image: {
			de: `/og/tools/${tool.slug}.png`,
			en: `/og/en/tools/${tool.slug}.png`,
			title: tool.name
		},
		changefreq: "monthly",
		priority: .8,
		lastmod: guideUpdatedAt(tool.slug)
	}));
	const all = [{
		path: "/",
		section: "pages",
		changefreq: "weekly",
		priority: 1,
		lastmod: tools.map((t) => t.lastmod).filter((d) => Boolean(d)).sort().at(-1)
	}, ...tools];
	if (patterns.length === 0) return all;
	return all.filter((entry) => !groupExcluded(hreflangGroup(entry.path), patterns));
}
function renderUrlset(paths, fallbackLastmod) {
	const langs = ["de", "en"];
	return "<?xml version=\"1.0\" encoding=\"UTF-8\"?><urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:xhtml=\"http://www.w3.org/1999/xhtml\" xmlns:image=\"http://www.google.com/schemas/sitemap-image/1.1\">" + paths.flatMap((entry) => langs.map((lang) => {
		const lastmod = entry.lastmod ?? fallbackLastmod;
		const alternates = [
			`<xhtml:link rel="alternate" hreflang="de-DE" href="${escapeXml(absolute(localizedPath(entry.path, "de")))}"/>`,
			`<xhtml:link rel="alternate" hreflang="en-GB" href="${escapeXml(absolute(localizedPath(entry.path, "en")))}"/>`,
			`<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(absolute(localizedPath(entry.path, "de")))}"/>`
		].join("");
		const image = entry.image ? `<image:image><image:loc>${escapeXml(absolute(entry.image[lang]))}</image:loc><image:title>${escapeXml(entry.image.title)}</image:title></image:image>` : "";
		return [
			"<url>",
			`<loc>${escapeXml(absolute(localizedPath(entry.path, lang)))}</loc>`,
			alternates,
			image,
			lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : "",
			`<changefreq>${entry.changefreq}</changefreq>`,
			`<priority>${entry.priority.toFixed(1)}</priority>`,
			"</url>"
		].join("");
	})).join("") + "</urlset>";
}
/**
* The sectioned index (2026-10-06): one child per non-empty section, each with
* the newest real date inside it — or none, never the render date.
*/
function renderSectionIndex(paths) {
	return renderSectionedSitemapIndex(SITEMAP_SECTIONS.flatMap((section) => {
		const inSection = paths.filter((p) => p.section === section);
		if (inSection.length === 0) return [];
		return [{
			loc: absolute(sectionPath(section)),
			lastmod: newestDay(inSection.map((p) => p.lastmod))
		}];
	}));
}
//#endregion
export { sitemapPaths as i, renderSectionIndex as n, renderUrlset as r, absolute as t };
