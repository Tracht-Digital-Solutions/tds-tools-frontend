import { A as renderTemplate, D as renderSlot, N as addAttribute, T as Fragment, j as maybeRenderHead, w as renderComponent } from "./sequence_DLpv-Taf.mjs";
import { n as createComponent, t as createAstro } from "./compiler_Dsmi62zL.mjs";
import { D as renderScript, S as imageHints, T as $$Layout, a as itemListSchema, b as editorialSrc, d as $$ServiceNote, f as $$AdSlot, g as tierCopy, h as premiumOffer, l as webPageNode, m as formatPrice, o as organizationSchema, s as personSchema, t as asGraph, u as websiteSchema, w as $$Icon, x as editorialSrcset, y as categoryArtwork } from "./jsonld_CMdsBXBF.mjs";
import { d as site, f as categoryLabels, l as categoryOrder, m as toolCopyFor, o as localizedPath, p as t } from "./sitemapExclusions_CGYKMf6c.mjs";
import { r as enabledTools, t as adsConfig } from "./catalog_CeEEGYwE.mjs";
// src/components/ToolCard.astro
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
	return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(`${base}/tools/${tool.slug}`, "href")} class="tool-card"${addAttribute(tool.category, "data-category")}${addAttribute(`tool-${tool.slug}`, "data-track")}><img class="tool-card__photo"${addAttribute(editorialSrc(categoryArtwork[tool.category], 480), "src")}${addAttribute(imageHints(editorialSrc(categoryArtwork[tool.category]), lang)?.srcSet ?? editorialSrcset(categoryArtwork[tool.category]), "srcset")} sizes="(min-width: 64rem) 320px, (min-width: 40rem) 50vw, 100vw" width="480" height="320" alt="" loading="lazy" decoding="async"><span class="tool-card__eyebrow"><span class="tool-cat-swatch" aria-hidden="true"></span>${category}</span><span class="tool-card__title"><span class="tool-card__icon">${renderComponent($$result, "Icon", $$Icon, {
		"name": tool.icon,
		"class": "h-5 w-5 text-[color:var(--color-accent)]"
	})}</span>${copy.name}<span class="tool-card__arrow" aria-hidden="true">${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow-right",
		"class": "h-4 w-4"
	})}</span></span><p class="tool-card__desc">${copy.description}</p>${(tool.isPremium || tool.requiresLogin) && renderTemplate`<span class="mt-auto flex flex-wrap gap-1.5 pt-1">${tool.isPremium && renderTemplate`<span class="chip chip--warning">${badges.premium}</span>`}${tool.requiresLogin && renderTemplate`<span class="chip chip--info">${badges.login}</span>`}</span>`}</a>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/components/ToolCard.astro", void 0);
// src/components/ToolCell.astro
createAstro("https://tools.tracht-digital.de");
var $$ToolCell = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ToolCell;
	const { tool, lang, base, order, access, search } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<li class="tool-grid__cell"${addAttribute(tool.category, "data-category")}${addAttribute(access, "data-access")}${addAttribute(search, "data-search")}${addAttribute(order, "data-order")}>${renderComponent($$result, "ToolCard", $$ToolCard, {
		"tool": tool,
		"lang": lang,
		"base": base
	})}</li>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/components/ToolCell.astro", void 0);
// src/components/PremiumSection.astro
createAstro("https://tools.tracht-digital.de");
var $$PremiumSection = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PremiumSection;
	const { tools, offer, lang } = Astro.props;
	const s = t(lang);
	const p = s.premium;
	const premium = tools.filter((tool) => tool.isPremium);
	const nameOf = (id) => {
		const tool = tools.find((x) => x.id === id);
		return tool ? toolCopyFor(lang, tool, site.name).name : id;
	};
	return renderTemplate`${premium.length > 0 && renderTemplate`${maybeRenderHead($$result)}<section class="premium-area" id="premium" aria-labelledby="premium-heading" data-premium-area${addAttribute(p.redirecting, "data-copy-redirecting")}${addAttribute(p.failed, "data-copy-failed")}><div class="premium-area__offer" data-premium-offer><h2 id="premium-heading" class="premium-area__title">${s.premiumHeading}</h2><span aria-hidden="true" class="cat-head__mark"></span><p class="premium-area__text">${s.premiumBody}</p>${renderSlot($$result, $$slots["default"])}<h3 class="premium-area__subtitle">${p.plansHeading}</h3>${offer.tiers.length === 0 ? renderTemplate`<p class="premium-area__text">${p.noPlans}</p>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<ul class="premium-plans">${offer.tiers.map((tier) => {
		const c = tierCopy(tier, lang);
		return renderTemplate`<li class="premium-plan"${addAttribute(tier.highlight ? "" : void 0, "data-highlight")}><div class="premium-plan__head"><h4 class="premium-plan__name">${c.name}</h4>${tier.highlight && renderTemplate`<span class="chip chip--info">${p.recommended}</span>`}</div>${c.tagline && renderTemplate`<p class="premium-plan__tagline">${c.tagline}</p>`}<p class="premium-plan__price"><span class="premium-plan__amount">${formatPrice(tier.priceCents, offer.currency, lang)}</span><span class="premium-plan__per">${p.perMonth}</span></p>${c.features.length > 0 && renderTemplate`<ul class="premium-plan__features">${c.features.map((f) => renderTemplate`<li>${f}</li>`)}</ul>`}<p class="premium-plan__tools"><span class="premium-plan__label">${p.unlocks}</span> ${tier.toolIds.map(nameOf).join(", ")}</p><button type="button" class="btn btn-primary premium-plan__cta"${addAttribute(tier.slug, "data-subscribe")}>${p.unlock}</button></li>`;
	})}</ul><p class="premium-area__terms">${p.terms}</p><p class="premium-area__account" data-premium-signup>${p.signupHint}${" "}<a class="link-underline premium-area__link" href="#premium" data-signup-link>${p.createAccount}</a>${" · "}<a class="link-underline premium-area__link" href="#premium" data-signin-link>${p.signIn}</a></p>` })}`}</div><div class="premium-area__active" data-premium-active hidden><p class="premium-area__text">${p.active}</p><button type="button" class="btn btn-ghost" data-premium-manage hidden>${p.manage}</button></div><p class="premium-area__message" data-premium-message aria-live="polite"></p></section>`}`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/components/PremiumSection.astro", void 0);
// src/components/CatalogPage.astro
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
	const sizeOf = /* @__PURE__ */ new Map();
	for (const tool of tools) sizeOf.set(tool.category, (sizeOf.get(tool.category) ?? 0) + 1);
	const byCategory = (a, b) => (sizeOf.get(b) ?? 0) - (sizeOf.get(a) ?? 0) || rank(a) - rank(b);
	const nameOf = (tool) => toolCopyFor(lang, tool, site.name).name;
	const orderedTools = [...tools].sort((a, b) => byCategory(a.category, b.category) || nameOf(a).localeCompare(nameOf(b), lang));
	const orderOf = new Map(orderedTools.map((tool, i) => [tool.id, i]));
	const freeTools = orderedTools.filter((tool) => !tool.isPremium);
	const premiumTools = orderedTools.filter((tool) => tool.isPremium);
	const offer = premiumTools.length > 0 ? await premiumOffer() : {
		tiers: [],
		currency: "EUR"
	};
	const presentCategories = [...sizeOf.keys()].sort(byCategory);
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
	const jsonLd = asGraph(organizationSchema(), personSchema(), websiteSchema(s.description), {
		...webPageNode({
			url: `${site.origin}${base}/`,
			name: `${site.name} — ${s.tagline}`,
			description: s.description,
			lang
		}),
		"@type": "CollectionPage"
	}, itemListSchema(orderedTools.map((tool) => ({
		name: toolCopyFor(lang, tool, site.name).name,
		url: `${site.origin}${localizedPath(`/tools/${tool.slug}`, lang)}`
	}))));
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": `${site.name} — ${s.tagline}`,
		"description": s.description,
		"lang": lang,
		"ogImage": lang === "de" ? "/og/default.png" : "/og/en/default.png",
		"jsonLd": jsonLd
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="tds-shell py-12" style="--tds-shell-max: none;">${ads.enabled && ads.slotCatalog && renderTemplate`${renderComponent($$result, "AdSlot", $$AdSlot, {
		"client": ads.publisherId,
		"slot": ads.slotCatalog,
		"lang": lang
	})}`}${orderedTools.length === 0 ? renderTemplate`<p class="text-[color:var(--color-muted)]">${s.emptyCatalog}</p>` : renderTemplate`<section aria-labelledby="catalog-heading"><div class="cat-head"><div class="cat-head__title"><h1 id="catalog-heading" class="sr-only">${s.heroHeadlineLead} ${s.heroHeadlineAccent} ${s.heroHeadlineTail}</h1><span class="sr-only" data-tool-count aria-live="polite"></span></div><button type="button" class="btn btn-primary tds-filterbar__toggle cat-head__filter" data-filter-toggle aria-expanded="false" aria-controls="catalog-filter"><svg class="tds-filterbar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3M14 2v4M8 10v4M16 18v4"></path></svg><span class="tds-filterbar__label">${s.filter.toggle}</span><span class="tds-filterbar__count"></span></button></div><div class="tds-filterbar__panel" id="catalog-filter" data-tool-filter${addAttribute(s.toolCount(1).replace(/^1\s*/, ""), "data-unit-one")}${addAttribute(s.toolCount(2).replace(/^2\s*/, ""), "data-unit-many")}${addAttribute(s.filter.none, "data-none")} hidden><input type="search" class="field-boxed tds-filterbar__search" data-filter-search${addAttribute(s.filter.search, "placeholder")}${addAttribute(s.filter.search, "aria-label")} autocomplete="off"><fieldset class="tds-filterbar__group"><legend class="tds-filterbar__legend">${s.filter.category}</legend><div class="tds-toolbar"><button type="button" class="chip" data-filter-group="category" data-value="all" aria-pressed="true">${s.filter.all}</button>${presentCategories.map((cat) => renderTemplate`<button type="button" class="chip" data-filter-group="category"${addAttribute(cat, "data-value")}${addAttribute(cat, "data-category")} aria-pressed="false"><span class="tool-cat-swatch" aria-hidden="true"></span>${categoryLabels[lang][cat]}</button>`)}</div></fieldset><fieldset class="tds-filterbar__group"><legend class="tds-filterbar__legend">${s.filter.access}</legend><div class="tds-toolbar">${[
		"all",
		"free",
		"premium",
		"login"
	].map((key) => renderTemplate`<button type="button" class="chip" data-filter-group="access"${addAttribute(key, "data-value")}${addAttribute(key === "all" ? "true" : "false", "aria-pressed")}>${s.filter.accesses[key]}</button>`)}</div></fieldset><button type="button" class="tds-filterbar__reset" data-filter-reset>${s.filter.reset}</button><button type="button" class="tds-filterbar__close" data-filter-close${addAttribute(s.filter.close, "aria-label")}${addAttribute(s.filter.close, "title")}></button></div><p class="tool-filter-empty" data-tool-filter-empty></p><ul class="tds-grid-auto tool-grid" style="--tds-grid-min: 17rem;" data-tool-grid data-catalog-grid>${freeTools.map((tool) => renderTemplate`${renderComponent($$result, "ToolCell", $$ToolCell, {
		"tool": tool,
		"lang": lang,
		"base": base,
		"order": orderOf.get(tool.id) ?? 0,
		"access": accessOf(tool),
		"search": searchOf(tool)
	})}`)}</ul></section>`}${renderComponent($$result, "PremiumSection", $$PremiumSection, {
		"tools": tools,
		"offer": offer,
		"lang": lang
	}, { "default": ($$result) => renderTemplate`<ul class="tds-grid-auto tool-grid premium-area__tools" style="--tds-grid-min: 17rem;" data-tool-grid data-premium-grid>${premiumTools.map((tool) => renderTemplate`${renderComponent($$result, "ToolCell", $$ToolCell, {
		"tool": tool,
		"lang": lang,
		"base": base,
		"order": orderOf.get(tool.id) ?? 0,
		"access": accessOf(tool),
		"search": searchOf(tool)
	})}`)}</ul>` })}${renderComponent($$result, "ServiceNote", $$ServiceNote, { "lang": lang })}</div>` })}${renderScript($$result, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/components/CatalogPage.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/components/CatalogPage.astro", void 0);
export { $$CatalogPage as t };
