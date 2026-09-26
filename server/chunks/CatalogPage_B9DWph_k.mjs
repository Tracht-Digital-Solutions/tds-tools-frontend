import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_ByUFWzed.mjs";
import { t as createComponent } from "./compiler_052WwKvu.mjs";
import { a as itemListSchema, d as $$AdSlot, f as $$Icon, h as renderScript, l as websiteSchema, o as organizationSchema, p as $$Layout, s as personSchema, t as asGraph, u as $$ServiceNote } from "./jsonld_CZXTFNiU.mjs";
import { c as links, d as t, f as toolCopyFor, l as site, n as enabledTools, r as localizedPath, s as categoryOrder, t as adsConfig, u as categoryLabels } from "./catalog_B2y3Hjla.mjs";
//#region src/components/ToolCard.astro
createAstro("https://tools.tracht-digital.de");
var $$ToolCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ToolCard;
	const { tool, lang = "de", base = "" } = Astro.props;
	const copy = toolCopyFor(lang, tool, site.name);
	const category = categoryLabels[lang][tool.category];
	const badges = lang === "de" ? {
		premium: "Premium",
		login: "Login"
	} : {
		premium: "Premium",
		login: "Sign-in"
	};
	return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(`${base}/tools/${tool.slug}`, "href")} class="tool-card"><span class="tool-card__eyebrow">${category}</span><span class="tool-card__title"><span class="tool-card__icon">${renderComponent($$result, "Icon", $$Icon, {
		"name": tool.icon,
		"class": "h-5 w-5 text-[color:var(--color-accent)]"
	})}</span>${copy.name}<span class="tool-card__arrow" aria-hidden="true">${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow-right",
		"class": "h-4 w-4"
	})}</span></span><p class="tool-card__desc">${copy.description}</p>${(tool.isPremium || tool.requiresLogin) && renderTemplate`<span class="mt-auto flex flex-wrap gap-1.5 pt-1">${tool.isPremium && renderTemplate`<span class="chip chip--warning">${badges.premium}</span>`}${tool.requiresLogin && renderTemplate`<span class="chip chip--info">${badges.login}</span>`}</span>`}</a>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/components/ToolCard.astro", void 0);
//#endregion
//#region src/components/PremiumNote.astro
createAstro("https://tools.tracht-digital.de");
var $$PremiumNote = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PremiumNote;
	const { tools, lang = "de", base } = Astro.props;
	const s = t(lang);
	const premium = tools.filter((tool) => tool.isPremium);
	return renderTemplate`${premium.length > 0 && renderTemplate`${maybeRenderHead($$result)}<section class="premium-note" aria-labelledby="premium-heading"><h2 id="premium-heading" class="premium-note__title">${s.premiumHeading}</h2><span aria-hidden="true" class="cat-head__mark"></span><p class="premium-note__text">${s.premiumBody}</p><p class="premium-note__lead">${s.premiumLead}</p><ul class="premium-note__list">${premium.map((tool) => renderTemplate`<li><a${addAttribute(`${base}/tools/${tool.slug}`, "href")} class="link-underline premium-note__link">${toolCopyFor(lang, tool, site.name).name}</a></li>`)}</ul></section>`}`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/components/PremiumNote.astro", void 0);
//#endregion
//#region src/components/CatalogPage.astro
createAstro("https://tools.tracht-digital.de");
var $$CatalogPage = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$CatalogPage;
	const { lang } = Astro.props;
	const s = t(lang);
	const base = lang === "de" ? "" : "/en";
	const tools = await enabledTools();
	const ads = await adsConfig();
	const rank = (cat) => {
		const index = categoryOrder.indexOf(cat);
		return index === -1 ? categoryOrder.length : index;
	};
	const orderedTools = [...tools].sort((a, b) => rank(a.category) - rank(b.category));
	const jsonLd = asGraph(organizationSchema(), personSchema(), websiteSchema(s.description), itemListSchema(tools.map((tool) => ({
		name: toolCopyFor(lang, tool, site.name).name,
		url: `${site.origin}${localizedPath(`/tools/${tool.slug}`, lang)}`
	}))));
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": `${site.name} — ${s.tagline}`,
		"description": s.description,
		"lang": lang,
		"ogImage": lang === "de" ? "/og/default.png" : "/og/en/default.png",
		"jsonLd": jsonLd
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="tools-hero"><div class="tds-shell py-16 sm:py-20"><p class="eyebrow" style="color: var(--color-accent-pink);">${s.heroEyebrow}</p><h1 class="display mt-3 max-w-3xl text-4xl leading-tight sm:text-5xl">${s.heroHeadlineLead}${" "}<span class="accent-italic" style="color: var(--color-accent-pink);">${s.heroHeadlineAccent}</span>${" "}${s.heroHeadlineTail}</h1><span aria-hidden="true" class="tds-brandbar tds-brandbar--on-dark mt-5"></span><p class="mt-4 max-w-2xl text-lg" style="color: rgb(255 255 255 / 0.75); line-height: 1.6;">${s.heroBody}</p><p class="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"><a${addAttribute(links.blog, "href")} class="link-underline">${s.toBlog}</a><a${addAttribute(links.main, "href")} class="link-underline">${s.toHome}</a></p></div></section><div class="tds-shell py-12" style="--tds-shell-max: none;">${ads.enabled && ads.slotCatalog && renderTemplate`${renderComponent($$result, "AdSlot", $$AdSlot, {
		"client": ads.publisherId,
		"slot": ads.slotCatalog,
		"lang": lang
	})}`}${orderedTools.length === 0 ? renderTemplate`<p class="text-[color:var(--color-muted)]">${s.emptyCatalog}</p>` : renderTemplate`<section aria-labelledby="catalog-heading"><div class="cat-head"><h2 id="catalog-heading" class="cat-head__label">${s.catalogHeading}</h2><span class="cat-head__count">${s.toolCount(orderedTools.length)}</span></div><span aria-hidden="true" class="cat-head__mark"></span><ul class="tds-grid-auto tool-grid" style="--tds-grid-min: 17rem;" data-tool-grid>${orderedTools.map((tool) => renderTemplate`<li class="tool-grid__cell">${renderComponent($$result, "ToolCard", $$ToolCard, {
		"tool": tool,
		"lang": lang,
		"base": base
	})}</li>`)}</ul></section>`}${renderComponent($$result, "PremiumNote", $$PremiumNote, {
		"tools": tools,
		"lang": lang,
		"base": base
	})}${renderComponent($$result, "ServiceNote", $$ServiceNote, { "lang": lang })}</div>` })}${renderScript($$result, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/components/CatalogPage.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/components/CatalogPage.astro", void 0);
//#endregion
export { $$CatalogPage as t };
