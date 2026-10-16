import { A as renderTemplate, N as addAttribute, j as maybeRenderHead, w as renderComponent } from "./sequence_DX1xZtXX.mjs";
import { n as createComponent, t as createAstro } from "./compiler_CcmY9EQl.mjs";
import { _ as $$Layout, a as itemListSchema, d as $$ServiceNote, f as $$AdSlot, g as $$Icon, h as editorialSrcset, m as editorialSrc, o as organizationSchema, p as categoryArtwork, s as personSchema, t as asGraph, u as websiteSchema, y as renderScript } from "./jsonld_DmYaf1s0.mjs";
import { r as enabledTools, t as adsConfig } from "./catalog_Bb5Qjqoi.mjs";
import { a as localizedPath, d as links, f as site, h as toolCopyFor, m as t, p as categoryLabels, u as categoryOrder } from "./sitemapExclusions_UinN3Rgj.mjs";
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
	return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(`${base}/tools/${tool.slug}`, "href")} class="tool-card"${addAttribute(`tool-${tool.slug}`, "data-track")}><img class="tool-card__photo"${addAttribute(editorialSrc(categoryArtwork[tool.category], 480), "src")}${addAttribute(editorialSrcset(categoryArtwork[tool.category]), "srcset")} sizes="(min-width: 64rem) 320px, (min-width: 40rem) 50vw, 100vw" width="480" height="320" alt="" loading="lazy" decoding="async"><span class="tool-card__eyebrow">${category}</span><span class="tool-card__title"><span class="tool-card__icon">${renderComponent($$result, "Icon", $$Icon, {
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
	return renderTemplate`${premium.length > 0 && renderTemplate`${maybeRenderHead($$result)}<section class="premium-note" aria-labelledby="premium-heading"><h2 id="premium-heading" class="premium-note__title">${s.premiumHeading}</h2><span aria-hidden="true" class="cat-head__mark"></span><p class="premium-note__text">${s.premiumBody}</p><p class="premium-note__lead">${s.premiumLead}</p><ul class="premium-note__list">${premium.map((tool) => renderTemplate`<li><a${addAttribute(`${base}/tools/${tool.slug}`, "href")} class="link-underline premium-note__link"${addAttribute(`premium-${tool.slug}`, "data-track")}>${toolCopyFor(lang, tool, site.name).name}</a></li>`)}</ul></section>`}`;
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
	const presentCategories = categoryOrder.filter((cat) => orderedTools.some((tool) => tool.category === cat));
	const accessOf = (tool) => [tool.isPremium ? "premium" : "free", tool.requiresLogin ? "login" : ""].filter(Boolean).join(" ");
	const searchOf = (tool) => {
		const copy = toolCopyFor(lang, tool, site.name);
		return [
			copy.name,
			copy.description,
			categoryLabels[lang][tool.category],
			...tool.keywords ?? []
		].join(" ").toLowerCase();
	};
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
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="tools-hero"><div class="tds-shell py-16 sm:py-20 tools-hero__layout"><div><p class="eyebrow" style="color: var(--color-accent-pink);">${s.heroEyebrow}</p><h1 class="display mt-3 max-w-3xl text-4xl leading-tight sm:text-5xl">${s.heroHeadlineLead}${" "}<span class="accent-italic" style="color: var(--color-accent-pink);">${s.heroHeadlineAccent}</span>${" "}${s.heroHeadlineTail}</h1><span aria-hidden="true" class="tds-brandbar tds-brandbar--on-dark mt-5"></span><p class="mt-4 max-w-2xl text-lg" style="color: rgb(255 255 255 / 0.75); line-height: 1.6;">${s.heroBody}</p><p class="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"><a${addAttribute(links.blog, "href")} class="link-underline">${s.toBlog}</a><a${addAttribute(links.main, "href")} class="link-underline">${s.toHome}</a></p></div><img class="tools-hero__photo"${addAttribute(editorialSrc("hero"), "src")}${addAttribute(editorialSrcset("hero"), "srcset")} sizes="(min-width: 64rem) 40vw, 100vw" width="960" height="540" alt="" decoding="async"></div></section><div class="tds-shell py-12" style="--tds-shell-max: none;">${ads.enabled && ads.slotCatalog && renderTemplate`${renderComponent($$result, "AdSlot", $$AdSlot, {
		"client": ads.publisherId,
		"slot": ads.slotCatalog,
		"lang": lang
	})}`}${orderedTools.length === 0 ? renderTemplate`<p class="text-[color:var(--color-muted)]">${s.emptyCatalog}</p>` : renderTemplate`<section aria-labelledby="catalog-heading"><div class="cat-head"><div class="cat-head__title"><h2 id="catalog-heading" class="cat-head__label">${s.catalogHeading}</h2><span class="cat-head__count" data-tool-count aria-live="polite">${s.toolCount(orderedTools.length)}</span></div><button type="button" class="btn btn-primary tds-filterbar__toggle cat-head__filter" data-filter-toggle aria-expanded="false" aria-controls="catalog-filter"><svg class="tds-filterbar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3M14 2v4M8 10v4M16 18v4"></path></svg><span class="tds-filterbar__label">${s.filter.toggle}</span><span class="tds-filterbar__count"></span></button></div><span aria-hidden="true" class="cat-head__mark"></span><div class="tds-filterbar__panel" id="catalog-filter" data-tool-filter${addAttribute(s.toolCount(1).replace(/^1\s*/, ""), "data-unit-one")}${addAttribute(s.toolCount(2).replace(/^2\s*/, ""), "data-unit-many")}${addAttribute(s.filter.none, "data-none")} hidden><input type="search" class="field-boxed tds-filterbar__search" data-filter-search${addAttribute(s.filter.search, "placeholder")}${addAttribute(s.filter.search, "aria-label")} autocomplete="off"><fieldset class="tds-filterbar__group"><legend class="tds-filterbar__legend">${s.filter.category}</legend><div class="tds-toolbar"><button type="button" class="chip" data-filter-group="category" data-value="all" aria-pressed="true">${s.filter.all}</button>${presentCategories.map((cat) => renderTemplate`<button type="button" class="chip" data-filter-group="category"${addAttribute(cat, "data-value")} aria-pressed="false">${categoryLabels[lang][cat]}</button>`)}</div></fieldset><fieldset class="tds-filterbar__group"><legend class="tds-filterbar__legend">${s.filter.access}</legend><div class="tds-toolbar">${[
		"all",
		"free",
		"premium",
		"login"
	].map((key) => renderTemplate`<button type="button" class="chip" data-filter-group="access"${addAttribute(key, "data-value")}${addAttribute(key === "all" ? "true" : "false", "aria-pressed")}>${s.filter.accesses[key]}</button>`)}</div></fieldset><button type="button" class="tds-filterbar__reset" data-filter-reset>${s.filter.reset}</button></div><p class="tool-filter-empty" data-tool-filter-empty></p><ul class="tds-grid-auto tool-grid" style="--tds-grid-min: 17rem;" data-tool-grid>${orderedTools.map((tool) => renderTemplate`<li class="tool-grid__cell"${addAttribute(tool.category, "data-category")}${addAttribute(accessOf(tool), "data-access")}${addAttribute(searchOf(tool), "data-search")}>${renderComponent($$result, "ToolCard", $$ToolCard, {
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
