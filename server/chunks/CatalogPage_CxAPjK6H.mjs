import { O as renderTemplate, S as renderComponent, j as addAttribute, k as maybeRenderHead, z as createAstro } from "./sequence_D8AML-3n.mjs";
import { t as createComponent } from "./compiler_DXKtTkSA.mjs";
import { a as itemListSchema, d as $$AdSlot, f as $$Icon, l as websiteSchema, o as organizationSchema, p as $$Layout, s as personSchema, t as asGraph, u as $$ServiceNote } from "./jsonld_gNOKO9fO.mjs";
import { c as links, d as t, f as toolCopyFor, l as site, n as enabledTools, r as localizedPath, s as categoryOrder, t as adsConfig, u as categoryLabels } from "./catalog_r24T3a_b.mjs";
//#region src/components/ToolCard.astro
createAstro("https://tools.tracht-digital.de");
var $$ToolCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ToolCard;
	const { tool, lang = "de", base = "" } = Astro.props;
	const copy = toolCopyFor(lang, tool, site.name);
	const badges = lang === "de" ? {
		premium: "Premium",
		login: "Login"
	} : {
		premium: "Premium",
		login: "Sign-in"
	};
	return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(`${base}/tools/${tool.slug}`, "href")} class="tool-card"><span class="tool-card__title">${renderComponent($$result, "Icon", $$Icon, {
		"name": tool.icon,
		"class": "h-5 w-5 text-[color:var(--color-accent)]"
	})}${copy.name}</span><p class="tool-card__desc">${copy.description}</p>${(tool.isPremium || tool.requiresLogin) && renderTemplate`<span class="mt-auto flex flex-wrap gap-1.5 pt-1">${tool.isPremium && renderTemplate`<span class="chip chip--warning">${badges.premium}</span>`}${tool.requiresLogin && renderTemplate`<span class="chip chip--info">${badges.login}</span>`}</span>`}</a>`;
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
	const labels = categoryLabels[lang];
	const base = lang === "de" ? "" : "/en";
	const tools = await enabledTools();
	const ads = await adsConfig();
	const groups = categoryOrder.map((cat) => ({
		cat,
		tools: tools.filter((tool) => tool.category === cat)
	})).filter((group) => group.tools.length > 0);
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
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="tools-hero"><div class="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20"><p class="eyebrow" style="color: var(--color-accent-pink);">${s.heroEyebrow}</p><h1 class="display mt-3 max-w-3xl text-4xl leading-tight sm:text-5xl">${s.heroHeadlineLead}${" "}<span class="accent-italic" style="color: var(--color-accent-pink);">${s.heroHeadlineAccent}</span>${" "}${s.heroHeadlineTail}</h1><span aria-hidden="true" class="tds-brandbar tds-brandbar--on-dark mt-5"></span><p class="mt-4 max-w-2xl text-lg" style="color: rgb(255 255 255 / 0.75); line-height: 1.6;">${s.heroBody}</p><p class="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"><a${addAttribute(links.blog, "href")} class="link-underline">${s.toBlog}</a><a${addAttribute(links.main, "href")} class="link-underline">${s.toHome}</a></p></div></section><div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">${ads.enabled && ads.slotCatalog && renderTemplate`${renderComponent($$result, "AdSlot", $$AdSlot, {
		"client": ads.publisherId,
		"slot": ads.slotCatalog,
		"lang": lang
	})}`}${groups.length === 0 ? renderTemplate`<p class="text-[color:var(--color-muted)]">${s.emptyCatalog}</p>` : groups.map(({ cat, tools: catTools }) => renderTemplate`<section${addAttribute(`kategorie-${cat}`, "id")} class="cat-section"><div class="cat-head"><h2 class="cat-head__label">${labels[cat]}</h2><span class="cat-head__count">${s.toolCount(catTools.length)}</span></div><span aria-hidden="true" class="cat-head__mark"></span><div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">${catTools.map((tool) => renderTemplate`${renderComponent($$result, "ToolCard", $$ToolCard, {
		"tool": tool,
		"lang": lang,
		"base": base
	})}`)}</div></section>`)}${renderComponent($$result, "PremiumNote", $$PremiumNote, {
		"tools": tools,
		"lang": lang,
		"base": base
	})}${renderComponent($$result, "ServiceNote", $$ServiceNote, { "lang": lang })}</div>` })}`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/components/CatalogPage.astro", void 0);
//#endregion
export { $$CatalogPage as t };
