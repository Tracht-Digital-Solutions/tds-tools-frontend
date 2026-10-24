import { A as renderTemplate, B as unescapeHTML, N as addAttribute, T as Fragment$2, j as maybeRenderHead, w as renderComponent } from "./sequence_DLpv-Taf.mjs";
import { n as createComponent, t as createAstro } from "./compiler_Dsmi62zL.mjs";
import { C as $$Icon, S as imageObject, T as runtimeSetting, _ as readPublicJson, b as editorialSrcset, c as softwareApplicationSchema, d as $$AdSlot, f as cheapestTierFor, g as PublicHttpError, h as tierCopy, i as howToSchema, l as webPageNode, m as premiumOffer, n as breadcrumbSchema, r as faqPageSchema, t as asGraph, u as websiteSchema, v as categoryArtwork, w as $$Layout, x as imageHints, y as editorialSrc } from "./jsonld_Qx2w1OxL.mjs";
import { t as apiBase } from "./connection_dnxqDzH_.mjs";
import { d as site, h as toolCopyFor, i as seoConfig, m as t, o as localizedPath, u as links } from "./sitemapExclusions_CdWkPvzd.mjs";
import { i as memoisedOr, r as enabledTools, t as adsConfig } from "./catalog_CeEEGYwE.mjs";
import { A as contrast$1, B as STUDIO_TOOL_ID, C as defaultStyle, D as parseProject, E as newProject, F as parseColor, H as mayExport, I as round2, L as shiftLightness, M as ensureContrast, N as formatColor, O as setPath, P as normalizeColor, R as toHex, S as VARIANTS, T as isValidPrefix, U as offlineAccess, W as parseAccess, _ as ANIMATIONS, a as resolveProject, b as FONT_STACKS, c as previewBody, d as componentSelector, f as emitCss, g as parseShadow, h as COLOR_ROLES, i as createZip$1, j as describe, k as HARMONIES, l as previewDocument, m as singleComponentCss, n as FORMAT_LABELS$1, o as DEVICES, p as sanitizeCss, s as PREVIEW_VIEWS, t as FORMAT_DESCRIPTIONS, u as seedBody, v as BORDER_STYLES, w as getPath, x as SEED_KINDS, y as COMPONENT_KINDS, z as EXPORT_FORMATS } from "./adapters_DpKdDLOY.mjs";
import { n as guideUpdatedAt } from "./guides_lhhxC2m7.mjs";
import { n as mergeCopy, r as mergeGuide, t as guideOverrides } from "./guideOverrides_D3-B8Smn.mjs";
import { useCallback, useDeferredValue, useEffect, useId, useLayoutEffect, useMemo, useReducer, useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { PDFDocument, PDFName, PDFNumber, PDFRawStream, StandardFonts, degrees, rgb } from "pdf-lib";
import QRCode from "qrcode";
// src/lib/premiumClient.ts
/** The registration page of the central login site, with `next` back to here. */
function signupUrl(login, back) {
	const base = login.endsWith("/") ? login : `${login}/`;
	const url = new URL("registrieren", base);
	url.searchParams.set("next", back);
	return url.toString();
}
// src/components/ToolGate.tsx
var TX = {
	de: {
		checking: "Zugang wird geprüft …",
		premium: "Premium-Tool",
		loginRequired: "Anmeldung erforderlich",
		loginPremium: "Mit einem Konto lässt sich dieses Premium-Tool freischalten.",
		loginFree: "Dieses Tool steht nach der Anmeldung zur Verfügung.",
		login: "Anmelden",
		signup: "Konto anlegen",
		unlockTitle: "Dieses Tool freischalten",
		monthly: (stage, price) => `Enthalten in „${stage}“: ${price} im Monat, monatlich kündbar.`,
		notBookable: "Premium ist gerade nicht buchbar.",
		allPlans: "Alle Premium-Stufen",
		redirecting: "Weiterleitung …",
		unlock: "Freischalten",
		httpError: (status) => `Fehler (HTTP ${status}).`,
		payFailed: "Zahlung konnte nicht gestartet werden.",
		failed: "Der Zugang konnte nicht geprüft werden. Bitte später erneut versuchen.",
		locale: "de-DE"
	},
	en: {
		checking: "Checking access …",
		premium: "Premium tool",
		loginRequired: "Sign-in required",
		loginPremium: "With an account you can unlock this premium tool.",
		loginFree: "Please sign in to use this tool.",
		login: "Sign in",
		signup: "Create account",
		unlockTitle: "Unlock this tool",
		monthly: (stage, price) => `Included in “${stage}”: ${price} per month, cancellable monthly.`,
		notBookable: "Premium cannot be booked right now.",
		allPlans: "All premium plans",
		redirecting: "Redirecting …",
		unlock: "Unlock",
		httpError: (status) => `Error (HTTP ${status}).`,
		payFailed: "The payment could not be started.",
		failed: "Access could not be checked. Please try again later.",
		locale: "en-GB"
	}
};
/**
* Build-time fallbacks. A host configured with `/install/` overrides
* both through `tds-runtime.json`, which is also what switches this gate onto
* the same-origin proxy (`/api/auth/me` instead of the API domain).
*/
var API = "https://api.tracht-digital.de";
/**
* The CENTRAL login site, and the same default `tds-core-frontend-pkg` uses.
*
* This used to fall back to `https://app.tracht-digital.de/login` — the customer
* PORTAL, which is not the login UI and no longer even serves that route (the
* host's in-app `/login` was deleted when login moved to the central site). It
* only ever worked because the production host happens to supply `loginUrl`
* through `tds-runtime.json`; on a fresh host, or if that file were lost, the
* gate would have sent people to the wrong domain with nothing to explain it.
*
* No path: the login form is the index route of `tds-auth-frontend`, and the
* `?next=` is appended directly, exactly as `lib/auth.ts` does in the frontend
* host. The login site validates that value against a `*.tracht-digital.de`
* allow-list, which this origin satisfies.
*/
var LOGIN = "https://auth.tracht-digital.de";
/**
* Client-side access gate for login-required / premium tools. On mount it probes
* the shared session (`/auth/me`, cross-subdomain cookie), then — for premium —
* the entitlement (`/tools/entitlement`). On access it reveals the tool body and
* removes itself; otherwise it shows a login prompt (with "Konto anlegen") or
* the "Freischalten" button, which opens the MONTHLY checkout of the cheapest
* premium stage with this tool (2026-10-24; one-off purchases are no longer
* sold, earlier ones still pass the entitlement check). Free tools never
* render this.
*
* Note: premium tools are client-side, so their code ships to everyone — this is
* a convenience/paywall gate, not DRM. The value is the polished UI + the
* purchase flow, not withholding the bundle.
*/
function ToolGate({ toolId, isPremium, unlock = null, bodySelector, lang = "de" }) {
	const t = TX[lang];
	const [state, setState] = useState("checking");
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState(null);
	const [endpoints, setEndpoints] = useState({
		api: API,
		login: LOGIN
	});
	const reveal = () => {
		const el = document.querySelector(bodySelector);
		if (el) el.hidden = false;
	};
	useEffect(() => {
		let cancelled = false;
		(async () => {
			try {
				const api = await runtimeSetting("apiBase", API);
				const login = await runtimeSetting("loginUrl", LOGIN);
				if (cancelled) return;
				setEndpoints({
					api,
					login
				});
				const me = await fetch(`${api}/auth/me`, { credentials: "include" }).catch(() => null);
				const authed = !!me && me.ok;
				if (cancelled) return;
				if (!authed) {
					setState("login");
					return;
				}
				if (!isPremium) {
					reveal();
					setState("granted");
					return;
				}
				const res = await fetch(`${api}/tools/entitlement?tool=${encodeURIComponent(toolId)}`, { credentials: "include" }).catch(() => null);
				if (!res || !res.ok && res.status !== 403) {
					if (!cancelled) setState("error");
					return;
				}
				const ent = res.ok ? await res.json() : null;
				if (cancelled) return;
				if (ent?.entitled) {
					reveal();
					setState("granted");
				} else setState("buy");
			} catch {
				if (!cancelled) setState("error");
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [toolId, isPremium]);
	const here = typeof location !== "undefined" ? location.href : "";
	const loginHref = `${endpoints.login}?next=${encodeURIComponent(here)}`;
	const signupHref = signupUrl(endpoints.login, here);
	const catalogHref = lang === "de" ? "/#premium" : "/en/#premium";
	/** A running subscription on another stage: change it in the portal, never book a second. */
	const portal = async () => {
		const res = await fetch(`${endpoints.api}/tools/billing-portal`, {
			method: "POST",
			credentials: "include"
		});
		const data = await res.json().catch(() => null);
		if (res.ok && data?.url) {
			window.location.href = data.url;
			return;
		}
		setError(data?.error ?? t.httpError(res.status));
	};
	const buy = async () => {
		setBusy(true);
		setError(null);
		try {
			const res = await fetch(`${endpoints.api}/tools/checkout`, {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ tool: toolId })
			});
			if (res.status === 401) {
				window.location.href = loginHref;
				return;
			}
			const data = await res.json().catch(() => null);
			if (res.ok && data?.url) {
				window.location.href = data.url;
				return;
			}
			if (res.status === 409 && data?.code === "has_subscription") {
				await portal();
				return;
			}
			setError(data?.error ?? t.httpError(res.status));
		} catch {
			setError(t.payFailed);
		} finally {
			setBusy(false);
		}
	};
	if (state === "granted") return null;
	const box = "tds-card p-6 text-center";
	if (state === "checking") return /* @__PURE__ */ jsx("div", {
		className: box,
		children: /* @__PURE__ */ jsx("p", {
			className: "text-[color:var(--color-muted)]",
			children: t.checking
		})
	});
	if (state === "login") return /* @__PURE__ */ jsxs("div", {
		className: box,
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "mb-1 text-lg font-semibold",
				children: isPremium ? t.premium : t.loginRequired
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mb-4 text-sm text-[color:var(--color-muted)]",
				children: isPremium ? t.loginPremium : t.loginFree
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "tds-toolbar justify-center",
				children: [isPremium && /* @__PURE__ */ jsx("a", {
					href: signupHref,
					className: "btn btn-primary no-underline",
					children: t.signup
				}), /* @__PURE__ */ jsx("a", {
					href: loginHref,
					className: `btn ${isPremium ? "btn-ghost" : "btn-primary"} no-underline`,
					children: t.login
				})]
			})
		]
	});
	if (state === "buy") return /* @__PURE__ */ jsxs("div", {
		className: box,
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "chip chip--warning mb-2 inline-flex",
				children: "Premium"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mb-1 text-lg font-semibold",
				children: t.unlockTitle
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mb-4 text-sm text-[color:var(--color-muted)]",
				children: unlock ? t.monthly(unlock.name, (unlock.priceCents / 100).toLocaleString(t.locale, {
					style: "currency",
					currency: unlock.currency
				})) : t.notBookable
			}),
			error && /* @__PURE__ */ jsx("p", {
				className: "tds-alert tds-alert--danger mb-3",
				children: error
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "tds-toolbar justify-center",
				children: [unlock && /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "btn btn-primary",
					onClick: buy,
					disabled: busy,
					children: busy ? t.redirecting : t.unlock
				}), /* @__PURE__ */ jsx("a", {
					href: catalogHref,
					className: "btn btn-ghost no-underline",
					children: t.allPlans
				})]
			})
		]
	});
	return /* @__PURE__ */ jsx("div", {
		className: box,
		children: /* @__PURE__ */ jsx("p", {
			className: "text-[color:var(--color-muted)]",
			children: t.failed
		})
	});
}
// src/components/ToolBody.astro
createAstro("https://tools.tracht-digital.de");
var $$ToolBody = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ToolBody;
	const { tool, Tool, gated, lang, unlock = null } = Astro.props;
	return renderTemplate`${gated && renderTemplate`${renderComponent($$result, "ToolGate", ToolGate, {
		"client:load": true,
		"toolId": tool.id,
		"isPremium": tool.isPremium,
		"lang": lang,
		"unlock": unlock,
		"bodySelector": "#tool-body",
		"client:component-hydration": "load",
		"client:component-path": "~/components/ToolGate.tsx",
		"client:component-export": "default"
	})}`}${maybeRenderHead($$result)}<section id="tool-body"${addAttribute(gated, "hidden")} class="tds-card p-5 sm:p-7">${Tool ? renderTemplate`${renderComponent($$result, "Tool", Tool, { "lang": lang })}` : renderTemplate`<p class="text-[color:var(--color-danger)]">${lang === "de" ? "Dieses Tool konnte nicht geladen werden." : "This tool could not be loaded."}</p>`}</section>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/components/ToolBody.astro", void 0);
// src/components/ToolGuide.astro
createAstro("https://tools.tracht-digital.de");
var $$ToolGuide = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ToolGuide;
	const { guide, toolName, lang = "de", updatedAt } = Astro.props;
	const s = t(lang);
	const stand = updatedAt ? new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-GB", {
		month: "long",
		year: "numeric",
		timeZone: "UTC"
	}).format(/* @__PURE__ */ new Date(`${updatedAt}T12:00:00Z`)) : null;
	return renderTemplate`${maybeRenderHead($$result)}<section class="tool-guide" aria-labelledby="guide-heading"><h2 id="guide-heading" class="tool-guide__h2">${s.guideHeading}: ${toolName}</h2><span aria-hidden="true" class="tool-guide__mark"></span><div class="tool-guide__intro">${guide.intro.map((p) => renderTemplate`<p>${p}</p>`)}</div><h3 class="tool-guide__h3">${s.guideUseCases}</h3><ul class="tool-guide__cases">${guide.useCases.map((c) => renderTemplate`<li><p class="tool-guide__case-title">${c.title}</p><p class="tool-guide__case-text">${c.text}</p></li>`)}</ul><h3 class="tool-guide__h3">${s.guideSteps}</h3><ol class="tool-guide__steps">${guide.steps.map((step) => renderTemplate`<li><p class="tool-guide__step-title">${step.title}</p><p class="tool-guide__step-text">${step.description}</p></li>`)}</ol><h3 class="tool-guide__h3">${s.guidePrivacy}</h3><p class="tool-guide__privacy">${guide.privacy}</p><h3 class="tool-guide__h3">${s.guideFaq}</h3><div class="tool-guide__faq">${guide.faq.map((item) => renderTemplate`<details><summary>${item.q}</summary><p>${item.a}</p></details>`)}</div>${stand && renderTemplate`<p class="tool-guide__meta">${lang === "de" ? "Stand" : "Updated"}: <time${addAttribute(updatedAt, "datetime")}>${stand}</time><span aria-hidden="true"> · </span>${lang === "de" ? "Von" : "By"}${" "}<a${addAttribute(`${links.main}/#about`, "href")} class="tnav-link link-underline">${seoConfig.founder.name}</a>${lang === "de" ? `, ${seoConfig.founder.jobTitle}, ${seoConfig.name}` : `, owner and developer, ${seoConfig.name}`}</p>`}</section>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/components/ToolGuide.astro", void 0);
// node_modules/@tracht-digital-solutions/tds-shared/dist/markdown/index.js
function escapeHtml$1(s) {
	return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function safeHref(url) {
	const u = url.trim();
	return /^(https?:\/\/|mailto:|\/|#)/i.test(u) ? u : null;
}
var HARD_BREAK = "\0";
var HARD_BREAK_MARKER = /(?:\\| {2,})$/;
function inlineMd(escaped) {
	return escaped.replace(/`([^`]+)`/g, (_m, c) => `<code>${c}</code>`).replace(/\*\*([^*]+)\*\*/g, (_m, c) => `<strong>${c}</strong>`).replace(/(^|[^*])\*([^*]+)\*/g, (_m, pre, c) => `${pre}<em>${c}</em>`).replace(/\[([^\]]+)\]\(([^) ]+)\)/g, (m, text, url) => {
		const href = safeHref(url);
		return href ? `<a href="${href}" rel="noopener" target="_blank">${text}</a>` : m;
	});
}
function renderMarkdown(src) {
	const lines = src.replace(/ /g, "").replace(/\r\n/g, "\n").split("\n");
	const out = [];
	let inFence = false;
	let fenceBuf = [];
	let listBuf = [];
	let listTag = "ul";
	let paraBuf = [];
	const flushList = () => {
		if (listBuf.length) {
			out.push(`<${listTag}>${listBuf.map((li) => `<li>${inlineMd(escapeHtml$1(li))}</li>`).join("")}</${listTag}>`);
			listBuf = [];
		}
	};
	const flushPara = () => {
		if (paraBuf.length) {
			const html = inlineMd(escapeHtml$1(paraBuf.join(" "))).replace(/  /g, "<br>").replace(/ /g, "");
			out.push(`<p>${html}</p>`);
			paraBuf = [];
		}
	};
	for (const line of lines) {
		if (line.trim().startsWith("```")) {
			if (inFence) {
				out.push(`<pre><code>${escapeHtml$1(fenceBuf.join("\n"))}</code></pre>`);
				fenceBuf = [];
				inFence = false;
			} else {
				flushPara();
				flushList();
				inFence = true;
			}
			continue;
		}
		if (inFence) {
			fenceBuf.push(line);
			continue;
		}
		const heading = /^(#{1,4})\s+(.*)$/.exec(line);
		if (heading) {
			flushPara();
			flushList();
			const level = heading[1].length;
			out.push(`<h${level}>${inlineMd(escapeHtml$1(heading[2]))}</h${level}>`);
			continue;
		}
		const li = /^[-*]\s+(.*)$/.exec(line);
		const oli = li ? null : /^\d{1,3}[.)]\s+(.*)$/.exec(line);
		if (li || oli) {
			flushPara();
			const tag = li ? "ul" : "ol";
			if (listBuf.length && tag !== listTag) flushList();
			listTag = tag;
			listBuf.push((li ?? oli)[1]);
			continue;
		}
		if (line.trim() === "") {
			flushPara();
			flushList();
			continue;
		}
		if (listBuf.length && /^\s{2,}\S/.test(line)) {
			listBuf[listBuf.length - 1] += ` ${line.trim()}`;
			continue;
		}
		flushList();
		paraBuf.push(HARD_BREAK_MARKER.test(line) ? line.replace(HARD_BREAK_MARKER, "").trim() + HARD_BREAK : line.trim());
	}
	if (inFence) out.push(`<pre><code>${escapeHtml$1(fenceBuf.join("\n"))}</code></pre>`);
	flushPara();
	flushList();
	return out.join("\n");
}
// src/lib/ratgeber.ts
/**
* The Ratgeber article of a tool (`blog_slug`, chosen per tool in the panel).
*
* Every tool page points at the Ratgeber: with the blog CMS composed in the
* API it SHOWS the assigned article (`/content/blog/{slug}`), without it — or
* when the article is missing in this language — it links to the article on
* the blog, and a tool without an assignment links to the Ratgeber itself.
*
* Read without the site key; see `publicFetch.ts` for why.
*/
var SLUG = /^[a-z0-9](?:[a-z0-9-]{0,158}[a-z0-9])?$/;
/** The article on the blog: German at the root, English under `/en/`. */
function ratgeberUrl(slug, lang) {
	const root = lang === "en" ? `${links.blog}/en` : links.blog;
	return slug && SLUG.test(slug) ? `${root}/${slug}` : `${root}/`;
}
/** Normalise one post; null when it lacks a title or a body. */
function parseArticle(data, slug, lang) {
	const p = data.post;
	if (!p || typeof p.title !== "string" || p.title.trim() === "" || typeof p.body !== "string" || p.body.trim() === "") return null;
	return {
		slug,
		title: p.title.trim(),
		excerpt: typeof p.excerpt === "string" ? p.excerpt.trim() : "",
		body: p.body,
		url: ratgeberUrl(slug, lang),
		readingMinutes: typeof p.readingMinutes === "number" ? p.readingMinutes : null
	};
}
/**
* The article; "missing" when the CMS answers that it does not exist in this
* language (a 404, remembered); null for no slug, no blog CMS or the API
* unreachable (a failure the cache does not keep).
*/
function ratgeberArticle(slug, lang) {
	if (!slug || !SLUG.test(slug)) return Promise.resolve(null);
	return memoisedOr(`tools:ratgeber:${lang}:${slug}`, async () => {
		try {
			return parseArticle(await readPublicJson(`${apiBase()}/content/blog/${slug}?lang=${lang}`), slug, lang);
		} catch (err) {
			if (err instanceof PublicHttpError && err.status === 404) return "missing";
			throw err;
		}
	}, () => null, `Ratgeber article "${slug}" (linked instead)`);
}
/**
* Where the tool page links. An article missing in this language (e.g. only
* German, on an English page) would be a dead link on the blog, so the link
* goes to the Ratgeber in this language instead.
*/
function ratgeberLink(slug, lang, article) {
	if (article === "missing") return ratgeberUrl(null, lang);
	return article?.url ?? ratgeberUrl(slug, lang);
}
// src/components/ToolRatgeber.astro
createAstro("https://tools.tracht-digital.de");
var $$ToolRatgeber = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ToolRatgeber;
	const { slug, lang } = Astro.props;
	const r = t(lang).ratgeber;
	const found = await ratgeberArticle(slug, lang);
	const article = found === "missing" ? null : found;
	const url = ratgeberLink(slug, lang, found);
	return renderTemplate`${maybeRenderHead($$result)}<section class="tool-ratgeber" aria-labelledby="tool-ratgeber-heading"><p class="tool-ratgeber__eyebrow">${r.heading}${article?.readingMinutes ? ` · ${r.minutes(article.readingMinutes)}` : ""}</p>${article ? renderTemplate`${renderComponent($$result, "Fragment", Fragment$2, {}, { "default": ($$result) => renderTemplate`<h2 id="tool-ratgeber-heading" class="tool-ratgeber__title">${article.title}</h2><div class="tool-ratgeber__body" data-nosnippet>${unescapeHTML(renderMarkdown(article.body))}</div><a class="link-underline tool-ratgeber__link"${addAttribute(url, "href")}>${r.read} →</a>` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment$2, {}, { "default": ($$result) => renderTemplate`<h2 id="tool-ratgeber-heading" class="tool-ratgeber__title">${r.heading}</h2><a class="link-underline tool-ratgeber__link"${addAttribute(url, "href")}>${slug && found !== "missing" ? r.read : r.more} →</a>` })}`}</section>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/components/ToolRatgeber.astro", void 0);
// src/components/RelatedTools.astro
createAstro("https://tools.tracht-digital.de");
var $$RelatedTools = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RelatedTools;
	const { slugs, all, current, lang = "de", base = "" } = Astro.props;
	const s = t(lang);
	const related = slugs.filter((slug) => slug !== current).map((slug) => all.find((tool) => tool.slug === slug)).filter((tool) => Boolean(tool));
	return renderTemplate`${related.length > 0 && renderTemplate`${maybeRenderHead($$result)}<section class="tool-related" aria-labelledby="related-heading"><h2 id="related-heading" class="tool-guide__h2">${s.relatedHeading}</h2><span aria-hidden="true" class="tool-guide__mark"></span><div class="tds-grid-auto" style="--tds-grid-min: 16rem; gap: 1rem;">${related.map((tool) => {
		const copy = toolCopyFor(lang, tool, site.name);
		return renderTemplate`<a${addAttribute(`${base}/tools/${tool.slug}`, "href")} class="tool-card"><span class="tool-card__title">${renderComponent($$result, "Icon", $$Icon, {
			"name": tool.icon,
			"class": "h-5 w-5 text-[color:var(--color-accent)]"
		})}${copy.name}</span><p class="tool-card__desc">${copy.description}</p></a>`;
	})}</div></section>`}`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/components/RelatedTools.astro", void 0);
// node_modules/@tracht-digital-solutions/tds-shared/dist/chunk-TIOFUDWJ.js
var DOWNLOAD_REVOKE_MS = 1e3;
function downloadUrl(href, filename) {
	const a = document.createElement("a");
	a.href = href;
	a.download = filename;
	a.rel = "noopener";
	a.style.display = "none";
	document.body.appendChild(a);
	a.click();
	a.remove();
}
function downloadBlob(blob, filename) {
	const url = URL.createObjectURL(blob);
	downloadUrl(url, filename);
	setTimeout(() => URL.revokeObjectURL(url), DOWNLOAD_REVOKE_MS);
}
function downloadBytes(bytes, mime, filename) {
	downloadBlob(new Blob([bytes.slice()], { type: mime }), filename);
}
function downloadText$1(text, filename, mime = "text/plain;charset=utf-8") {
	downloadBlob(new Blob([text], { type: mime }), filename);
}
// node_modules/@tracht-digital-solutions/tds-tool-office/islands/shared.ts
/**
* Helpers shared by this pack's islands. Imported relatively — that is fine
* *inside* a pack; only the `component` entry of a tool manifest has to be a
* package subpath.
*
* See the tools-site convention: labels are translated, logic is not.
*/
/** pdf-lib bytes as a `.pdf` download (the shared helper copies the view first). */
function downloadPdf$1(bytes, name) {
	downloadBytes(bytes, "application/pdf", name);
}
var LOCALE = {
	de: "de-DE",
	en: "en-GB"
};
/** Millimetres → PDF points (72 dpi). Sheet geometry is authored in mm here. */
function mm$1(value) {
	return value * 72 / 25.4;
}
/** A4 in millimetres — every sheet this pack produces is A4. */
var A4 = {
	w: 210,
	h: 297
};
/**
* The 14 standard PDF fonts are encoded WinAnsi, which covers German but not a
* typographic dash pasted out of Word or an emoji. An unencodable character
* makes pdf-lib throw at draw time, which would surface as a generic failure for
* what is really one bad character — so they are folded down here instead.
*/
function toWinAnsi$1(text) {
	return text.replace(/[‘’‚‹›]/g, "'").replace(/[“”„]/g, "\"").replace(/[–—]/g, "-").replace(/…/g, "...").replace(/[^ -ÿ\n]/g, "");
}
/** "08:30" → 510 minutes. Returns null for anything that is not a time. */
function parseTime(value) {
	const m = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
	if (!m || !m[1] || !m[2]) return null;
	const h = Number(m[1]);
	const min = Number(m[2]);
	if (h > 23 || min > 59) return null;
	return h * 60 + min;
}
/**
* Worked minutes for one day. An end time before the start time is read as a
* shift running past midnight rather than as a negative day — a late shift is
* ordinary in the trades this is built for, and a negative total would quietly
* corrupt the month.
*/
function workedMinutes(start, end, breakMinutes) {
	const from = parseTime(start);
	const to = parseTime(end);
	if (from === null || to === null) return 0;
	const span = to >= from ? to - from : to + 1440 - from;
	return Math.max(0, span - Math.max(0, breakMinutes));
}
/** 510 → "8:30". Minutes are the unit everywhere; hours are only for display. */
function formatDuration(minutes) {
	const sign = minutes < 0 ? "-" : "";
	const abs = Math.abs(Math.round(minutes));
	return `${sign}${Math.floor(abs / 60)}:${String(abs % 60).padStart(2, "0")}`;
}
// node_modules/@tracht-digital-solutions/tds-shared/dist/chunk-S5MXGWAS.js
function Alert({ tone = "danger", children, className }) {
	if (children === null || children === void 0 || children === false || children === "") return null;
	const urgent = tone === "danger";
	return /* @__PURE__ */ jsx("p", {
		className: `tds-alert${tone === "neutral" ? "" : ` tds-alert--${tone}`} tds-appear${className ? ` ${className}` : ""}`,
		role: urgent ? "alert" : "status",
		children
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-office/islands/LabelSheet.tsx
/**
* The common German label sheets. The product codes are given as compatibility
* hints, not as a claim about any manufacturer — what actually matters is the
* geometry, and a sheet from any brand with the same grid fits.
*/
var PRESETS$1 = [
	{
		key: "70x37",
		label: "24 · 70 × 37 mm (3 × 8) · Avery 3475",
		cols: 3,
		rows: 8,
		width: 70,
		height: 37,
		marginLeft: 0,
		marginTop: .5,
		gapX: 0,
		gapY: 0
	},
	{
		key: "635x381",
		label: "21 · 63,5 × 38,1 mm (3 × 7) · Avery L7160",
		cols: 3,
		rows: 7,
		width: 63.5,
		height: 38.1,
		marginLeft: 7.2,
		marginTop: 15.1,
		gapX: 2.5,
		gapY: 0
	},
	{
		key: "991x381",
		label: "14 · 99,1 × 38,1 mm (2 × 7) · Avery L7163",
		cols: 2,
		rows: 7,
		width: 99.1,
		height: 38.1,
		marginLeft: 4.65,
		marginTop: 15.1,
		gapX: 2.5,
		gapY: 0
	},
	{
		key: "105x57",
		label: "10 · 105 × 57 mm (2 × 5) · Avery 3483",
		cols: 2,
		rows: 5,
		width: 105,
		height: 57,
		marginLeft: 0,
		marginTop: 6,
		gapX: 0,
		gapY: 0
	},
	{
		key: "525x297",
		label: "40 · 52,5 × 29,7 mm (4 × 10) · Avery 3474",
		cols: 4,
		rows: 10,
		width: 52.5,
		height: 29.7,
		marginLeft: 0,
		marginTop: 0,
		gapX: 0,
		gapY: 0
	}
];
/** German is the default; an older pinned pack must keep working unchanged. */
var STRINGS$19 = {
	de: {
		needText: "Bitte mindestens ein Etikett eingeben.",
		failed: "Der Etikettenbogen konnte nicht erstellt werden.",
		done: (labels, sheets) => `${labels} Etikett(en) auf ${sheets} Bogen erstellt.`,
		outName: "etiketten.pdf",
		sheet: "Bogen",
		content: "Etiketten",
		contentHint: "Ein Etikett je Absatz. Zeilenumbrüche innerhalb eines Absatzes werden zu Zeilen auf dem Etikett; ein Etikett endet an einer Leerzeile.",
		placeholder: "Musterfirma GmbH\nHauptstraße 1\n21493 Schwarzenbek",
		repeat: "Dasselbe Etikett auf allen Feldern",
		repeatHint: "Für Absender- oder Inventaraufkleber: der erste Absatz füllt den ganzen Bogen.",
		startAt: "Erstes benutztes Feld",
		startAtHint: "Bei einem angebrochenen Bogen: die Felder davor bleiben leer.",
		fontSize: "Schriftgröße",
		align: "Ausrichtung",
		alignLeft: "Linksbündig",
		alignCenter: "Zentriert",
		guides: "Schnittlinien andeuten",
		guidesHint: "Hilfslinien zum Prüfen der Passgenauigkeit — vor dem echten Druck abschalten.",
		preview: (n) => `${n} Etikett(en) erkannt`,
		working: "Erstelle …",
		run: "Bogen erstellen & herunterladen",
		note: "Der Bogen wird lokal im Browser erzeugt; die Adressen verlassen den Rechner nicht."
	},
	en: {
		needText: "Please enter at least one label.",
		failed: "The label sheet could not be created.",
		done: (labels, sheets) => `Created ${labels} label(s) across ${sheets} sheet(s).`,
		outName: "labels.pdf",
		sheet: "Sheet",
		content: "Labels",
		contentHint: "One label per paragraph. Line breaks inside a paragraph become lines on the label; a label ends at a blank line.",
		placeholder: "Example Ltd\n1 High Street\nLondon",
		repeat: "Put the same label in every slot",
		repeatHint: "For return addresses or asset stickers: the first paragraph fills the whole sheet.",
		startAt: "First slot to use",
		startAtHint: "For a partly used sheet: the slots before it are left empty.",
		fontSize: "Font size",
		align: "Alignment",
		alignLeft: "Left",
		alignCenter: "Centred",
		guides: "Show cutting guides",
		guidesHint: "Guide lines for checking the alignment — switch them off for the real print run.",
		preview: (n) => `${n} label(s) detected`,
		working: "Creating …",
		run: "Create sheet & download",
		note: "The sheet is produced locally in your browser; the addresses never leave your machine."
	}
};
/**
* Split the textarea into labels: a blank line ends a label, so a multi-line
* address stays one label. Trailing blank lines are ignored rather than becoming
* empty stickers.
*/
function splitLabels(input) {
	return input.replace(/\r\n/g, "\n").split(/\n\s*\n/).map((block) => block.split("\n").map((line) => line.trim()).filter((line) => line !== "")).filter((lines) => lines.length > 0);
}
function LabelSheet({ lang = "de" }) {
	const t = STRINGS$19[lang];
	const [presetKey, setPresetKey] = useState(PRESETS$1[0]?.key ?? "70x37");
	const [text, setText] = useState("");
	const [repeat, setRepeat] = useState(false);
	const [startAt, setStartAt] = useState(1);
	const [fontSize, setFontSize] = useState(10);
	const [align, setAlign] = useState("left");
	const [guides, setGuides] = useState(false);
	const [busy, setBusy] = useState(false);
	const [status, setStatus] = useState(null);
	const [error, setError] = useState(null);
	const preset = PRESETS$1.find((p) => p.key === presetKey) ?? PRESETS$1[0];
	const perSheet = preset.cols * preset.rows;
	const parsed = splitLabels(text);
	const run = async () => {
		setBusy(true);
		setError(null);
		setStatus(null);
		try {
			if (parsed.length === 0) throw new Error(t.needText);
			const skip = Math.min(Math.max(1, startAt), perSheet) - 1;
			const labels = repeat ? Array.from({ length: perSheet - skip }, () => parsed[0]) : parsed;
			const doc = await PDFDocument.create();
			const font = await doc.embedFont(StandardFonts.Helvetica);
			const lineHeight = fontSize * 1.25;
			let page = doc.addPage([mm$1(A4.w), mm$1(A4.h)]);
			let sheets = 1;
			for (const [i, lines] of labels.entries()) {
				const onSheet = (i + skip) % perSheet;
				if (i > 0 && onSheet === 0) {
					page = doc.addPage([mm$1(A4.w), mm$1(A4.h)]);
					sheets++;
				}
				const col = onSheet % preset.cols;
				const row = Math.floor(onSheet / preset.cols);
				const left = mm$1(preset.marginLeft + col * (preset.width + preset.gapX));
				const top = mm$1(A4.h - preset.marginTop - row * (preset.height + preset.gapY));
				if (guides) page.drawRectangle({
					x: left,
					y: top - mm$1(preset.height),
					width: mm$1(preset.width),
					height: mm$1(preset.height),
					borderColor: rgb(.8, .8, .8),
					borderWidth: .5
				});
				const padding = mm$1(3);
				const block = lines.length * lineHeight;
				const firstBaseline = top - mm$1(preset.height) / 2 + block / 2 - lineHeight * .8;
				for (const [j, raw] of lines.entries()) {
					const line = toWinAnsi$1(raw);
					const width = font.widthOfTextAtSize(line, fontSize);
					const x = align === "center" ? left + (mm$1(preset.width) - width) / 2 : left + padding;
					page.drawText(line, {
						x,
						y: firstBaseline - j * lineHeight,
						size: fontSize,
						font,
						color: rgb(0, 0, 0),
						maxWidth: mm$1(preset.width) - padding * 2
					});
				}
			}
			downloadPdf$1(await doc.save(), t.outName);
			setStatus(t.done(labels.length, sheets));
		} catch (e) {
			setError(e instanceof Error ? e.message : t.failed);
		} finally {
			setBusy(false);
		}
	};
	const field = "field-boxed w-full";
	return /* @__PURE__ */ jsxs("div", {
		className: "label-sheet space-y-5",
		children: [
			/* @__PURE__ */ jsxs("label", {
				className: "block text-sm",
				children: [/* @__PURE__ */ jsx("span", {
					className: "mb-1 block opacity-80",
					children: t.sheet
				}), /* @__PURE__ */ jsx("select", {
					className: field,
					value: presetKey,
					onChange: (e) => setPresetKey(e.target.value),
					children: PRESETS$1.map((p) => /* @__PURE__ */ jsx("option", {
						value: p.key,
						children: p.label
					}, p.key))
				})]
			}),
			/* @__PURE__ */ jsxs("label", {
				className: "block text-sm",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "mb-1 block opacity-80",
						children: t.content
					}),
					/* @__PURE__ */ jsx("textarea", {
						className: field,
						rows: 8,
						value: text,
						placeholder: t.placeholder,
						onChange: (e) => setText(e.target.value)
					}),
					/* @__PURE__ */ jsx("span", {
						className: "mt-1 block text-xs opacity-60",
						children: t.contentHint
					}),
					parsed.length > 0 && /* @__PURE__ */ jsx("span", {
						className: "mt-1 block text-xs opacity-60",
						children: t.preview(parsed.length)
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ jsxs("label", {
						className: "block text-sm",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "mb-1 block opacity-80",
								children: t.startAt
							}),
							/* @__PURE__ */ jsx("input", {
								type: "number",
								min: 1,
								max: perSheet,
								className: field,
								value: startAt,
								onChange: (e) => setStartAt(Math.min(Math.max(1, Number(e.target.value) || 1), perSheet))
							}),
							/* @__PURE__ */ jsx("span", {
								className: "mt-1 block text-xs opacity-60",
								children: t.startAtHint
							})
						]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block text-sm",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "mb-1 block opacity-80",
							children: [
								t.fontSize,
								": ",
								fontSize,
								" pt"
							]
						}), /* @__PURE__ */ jsx("input", {
							type: "range",
							min: 6,
							max: 18,
							step: 1,
							value: fontSize,
							onChange: (e) => setFontSize(Number(e.target.value)),
							className: "w-full"
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block text-sm",
						children: [/* @__PURE__ */ jsx("span", {
							className: "mb-1 block opacity-80",
							children: t.align
						}), /* @__PURE__ */ jsxs("select", {
							className: field,
							value: align,
							onChange: (e) => setAlign(e.target.value),
							children: [/* @__PURE__ */ jsx("option", {
								value: "left",
								children: t.alignLeft
							}), /* @__PURE__ */ jsx("option", {
								value: "center",
								children: t.alignCenter
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-2 text-sm",
				children: [/* @__PURE__ */ jsxs("label", {
					className: "flex items-start gap-2",
					children: [/* @__PURE__ */ jsx("input", {
						type: "checkbox",
						checked: repeat,
						onChange: (e) => setRepeat(e.target.checked)
					}), /* @__PURE__ */ jsxs("span", { children: [t.repeat, /* @__PURE__ */ jsx("span", {
						className: "mt-0.5 block text-xs opacity-60",
						children: t.repeatHint
					})] })]
				}), /* @__PURE__ */ jsxs("label", {
					className: "flex items-start gap-2",
					children: [/* @__PURE__ */ jsx("input", {
						type: "checkbox",
						checked: guides,
						onChange: (e) => setGuides(e.target.checked)
					}), /* @__PURE__ */ jsxs("span", { children: [t.guides, /* @__PURE__ */ jsx("span", {
						className: "mt-0.5 block text-xs opacity-60",
						children: t.guidesHint
					})] })]
				})]
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "btn btn-primary",
				onClick: run,
				disabled: busy,
				children: busy ? t.working : t.run
			}),
			/* @__PURE__ */ jsx(Alert, { children: error }),
			/* @__PURE__ */ jsx(Alert, {
				tone: "success",
				children: status
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-xs opacity-60",
				children: t.note
			})
		]
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-office/tools/LabelSheet.astro
createAstro("https://tools.tracht-digital.de");
var $$LabelSheet = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$LabelSheet;
	const { lang = "de" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="tool tool--label-sheet">${renderComponent($$result, "LabelSheet", LabelSheet, {
		"client:load": true,
		"lang": lang,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-office/islands/LabelSheet.tsx",
		"client:component-export": "default"
	})}</div>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-office/tools/LabelSheet.astro", void 0);
// node_modules/@tracht-digital-solutions/tds-tool-office/islands/Timesheet.tsx
/** German is the default; an older pinned pack must keep working unchanged. */
var STRINGS$18 = {
	de: {
		failed: "Der Stundenzettel konnte nicht erstellt werden.",
		needMonth: "Bitte einen Monat wählen.",
		done: (days, total) => `${days} Arbeitstag(e), ${total} Stunden insgesamt.`,
		outName: (month) => `stundenzettel-${month}.pdf`,
		employee: "Mitarbeiterin / Mitarbeiter",
		employer: "Betrieb",
		month: "Monat",
		fillWeekdays: "Werktage vorbelegen",
		fillHint: "Trägt die Zeiten unten in alle Montage bis Freitage ein. Einzelne Tage bleiben änderbar.",
		defaultStart: "Beginn",
		defaultEnd: "Ende",
		defaultPause: "Pause (Min.)",
		apply: "Übernehmen",
		clear: "Alle Zeiten leeren",
		day: "Tag",
		date: "Datum",
		from: "Beginn",
		to: "Ende",
		pause: "Pause",
		hours: "Stunden",
		noteCol: "Bemerkung",
		total: "Summe",
		daysWorked: "Arbeitstage",
		working: "Erstelle …",
		run: "Stundenzettel erstellen & herunterladen",
		signEmployee: "Datum, Unterschrift Mitarbeiter/in",
		signEmployer: "Datum, Unterschrift Betrieb",
		title: "Arbeitszeitnachweis",
		note: "Der Stundenzettel wird lokal im Browser erzeugt; die Zeiten verlassen den Rechner nicht.",
		tableLabel: "Arbeitszeiten je Tag"
	},
	en: {
		failed: "The timesheet could not be created.",
		needMonth: "Please choose a month.",
		done: (days, total) => `${days} working day(s), ${total} hours in total.`,
		outName: (month) => `timesheet-${month}.pdf`,
		employee: "Employee",
		employer: "Employer",
		month: "Month",
		fillWeekdays: "Prefill weekdays",
		fillHint: "Writes the times below into every Monday to Friday. Individual days stay editable.",
		defaultStart: "Start",
		defaultEnd: "End",
		defaultPause: "Break (min)",
		apply: "Apply",
		clear: "Clear all times",
		day: "Day",
		date: "Date",
		from: "Start",
		to: "End",
		pause: "Break",
		hours: "Hours",
		noteCol: "Note",
		total: "Total",
		daysWorked: "Working days",
		working: "Creating …",
		run: "Create timesheet & download",
		signEmployee: "Date, employee signature",
		signEmployer: "Date, employer signature",
		title: "Record of working time",
		note: "The timesheet is produced locally in your browser; the times never leave your machine.",
		tableLabel: "Working time per day"
	}
};
/** "2026-08" → the number of days in that month. */
function daysInMonth(month) {
	const m = /^(\d{4})-(\d{2})$/.exec(month);
	if (!m || !m[1] || !m[2]) return 0;
	return new Date(Number(m[1]), Number(m[2]), 0).getDate();
}
function currentMonth() {
	const now = /* @__PURE__ */ new Date();
	return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}
var EMPTY = {
	start: "",
	end: "",
	pause: 0,
	note: ""
};
function Timesheet({ lang = "de" }) {
	const t = STRINGS$18[lang];
	const [employee, setEmployee] = useState("");
	const [employer, setEmployer] = useState("");
	const [month, setMonth] = useState(currentMonth());
	const [defStart, setDefStart] = useState("08:00");
	const [defEnd, setDefEnd] = useState("16:30");
	const [defPause, setDefPause] = useState(30);
	const [entries, setEntries] = useState({});
	const [busy, setBusy] = useState(false);
	const [status, setStatus] = useState(null);
	const [error, setError] = useState(null);
	const count = daysInMonth(month);
	const days = useMemo(() => {
		const [y, m] = month.split("-").map(Number);
		return Array.from({ length: count }, (_, i) => {
			const date = new Date(y ?? 1970, (m ?? 1) - 1, i + 1);
			return {
				day: i + 1,
				date,
				weekday: date.toLocaleDateString(LOCALE[lang], { weekday: "short" }),
				isWeekend: date.getDay() === 0 || date.getDay() === 6
			};
		});
	}, [
		month,
		count,
		lang
	]);
	const entryFor = (day) => entries[day] ?? EMPTY;
	const setEntry = (day, patch) => setEntries((prev) => ({
		...prev,
		[day]: {
			...prev[day] ?? EMPTY,
			...patch
		}
	}));
	const totals = useMemo(() => {
		let minutes = 0;
		let worked = 0;
		for (const d of days) {
			const e = entryFor(d.day);
			const m = workedMinutes(e.start, e.end, e.pause);
			if (m > 0) {
				minutes += m;
				worked++;
			}
		}
		return {
			minutes,
			worked
		};
	}, [days, entries]);
	const prefill = () => {
		const next = { ...entries };
		for (const d of days) {
			if (d.isWeekend) continue;
			next[d.day] = {
				...next[d.day] ?? EMPTY,
				start: defStart,
				end: defEnd,
				pause: defPause
			};
		}
		setEntries(next);
	};
	const run = async () => {
		setBusy(true);
		setError(null);
		setStatus(null);
		try {
			const doc = await PDFDocument.create();
			const page = doc.addPage([mm$1(A4.w), mm$1(A4.h)]);
			const font = await doc.embedFont(StandardFonts.Helvetica);
			const bold = await doc.embedFont(StandardFonts.HelveticaBold);
			const left = mm$1(15);
			const right = mm$1(A4.w - 15);
			let y = mm$1(A4.h - 18);
			const monthStart = /* @__PURE__ */ new Date(`${month}-01T00:00:00`);
			if (Number.isNaN(monthStart.getTime())) throw new Error(t.needMonth);
			const monthLabel = monthStart.toLocaleDateString(LOCALE[lang], {
				month: "long",
				year: "numeric"
			});
			page.drawText(toWinAnsi$1(t.title), {
				x: left,
				y,
				size: 16,
				font: bold,
				color: rgb(0, 0, 0)
			});
			y -= 18;
			page.drawText(toWinAnsi$1(`${t.employee}: ${employee || "—"}`), {
				x: left,
				y,
				size: 10,
				font
			});
			page.drawText(toWinAnsi$1(monthLabel), {
				x: right - mm$1(45),
				y,
				size: 10,
				font
			});
			y -= 14;
			page.drawText(toWinAnsi$1(`${t.employer}: ${employer || "—"}`), {
				x: left,
				y,
				size: 10,
				font
			});
			y -= 16;
			const cols = [
				left,
				left + mm$1(14),
				left + mm$1(30),
				mm$1(77),
				mm$1(101),
				mm$1(123),
				mm$1(145)
			];
			const header = [
				t.day,
				"",
				t.from,
				t.to,
				t.pause,
				t.hours,
				t.noteCol
			];
			page.drawLine({
				start: {
					x: left,
					y: y + 12
				},
				end: {
					x: right,
					y: y + 12
				},
				thickness: .7,
				color: rgb(.2, .2, .2)
			});
			header.forEach((label, i) => {
				if (!label) return;
				page.drawText(toWinAnsi$1(label), {
					x: cols[i],
					y,
					size: 9,
					font: bold
				});
			});
			y -= 4;
			page.drawLine({
				start: {
					x: left,
					y
				},
				end: {
					x: right,
					y
				},
				thickness: .7,
				color: rgb(.2, .2, .2)
			});
			y -= 12;
			for (const d of days) {
				const e = entryFor(d.day);
				const minutes = workedMinutes(e.start, e.end, e.pause);
				if (d.isWeekend) page.drawRectangle({
					x: left,
					y: y - 3,
					width: right - left,
					height: 12,
					color: rgb(.95, .95, .95)
				});
				[
					String(d.day),
					d.weekday,
					e.start,
					e.end,
					e.pause > 0 ? String(e.pause) : "",
					minutes > 0 ? formatDuration(minutes) : "",
					e.note
				].forEach((value, i) => {
					if (!value) return;
					page.drawText(toWinAnsi$1(value), {
						x: cols[i],
						y,
						size: 8.5,
						font,
						maxWidth: i === 6 ? right - cols[6] : mm$1(20)
					});
				});
				y -= 12;
			}
			y -= 4;
			page.drawLine({
				start: {
					x: left,
					y: y + 8
				},
				end: {
					x: right,
					y: y + 8
				},
				thickness: .7,
				color: rgb(.2, .2, .2)
			});
			page.drawText(toWinAnsi$1(`${t.total}: ${formatDuration(totals.minutes)}   ·   ${t.daysWorked}: ${totals.worked}`), {
				x: left,
				y: y - 6,
				size: 10,
				font: bold
			});
			const signY = mm$1(24);
			page.drawLine({
				start: {
					x: left,
					y: signY
				},
				end: {
					x: left + mm$1(70),
					y: signY
				},
				thickness: .5
			});
			page.drawLine({
				start: {
					x: right - mm$1(70),
					y: signY
				},
				end: {
					x: right,
					y: signY
				},
				thickness: .5
			});
			page.drawText(toWinAnsi$1(t.signEmployee), {
				x: left,
				y: signY - 10,
				size: 8,
				font
			});
			page.drawText(toWinAnsi$1(t.signEmployer), {
				x: right - mm$1(70),
				y: signY - 10,
				size: 8,
				font
			});
			downloadPdf$1(await doc.save(), t.outName(month));
			setStatus(t.done(totals.worked, formatDuration(totals.minutes)));
		} catch (e) {
			setError(e instanceof Error ? e.message : t.failed);
		} finally {
			setBusy(false);
		}
	};
	const field = "field-boxed w-full";
	return /* @__PURE__ */ jsxs("div", {
		className: "timesheet space-y-5",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ jsxs("label", {
						className: "block text-sm",
						children: [/* @__PURE__ */ jsx("span", {
							className: "mb-1 block opacity-80",
							children: t.employee
						}), /* @__PURE__ */ jsx("input", {
							type: "text",
							className: field,
							value: employee,
							onChange: (e) => setEmployee(e.target.value)
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block text-sm",
						children: [/* @__PURE__ */ jsx("span", {
							className: "mb-1 block opacity-80",
							children: t.employer
						}), /* @__PURE__ */ jsx("input", {
							type: "text",
							className: field,
							value: employer,
							onChange: (e) => setEmployer(e.target.value)
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block text-sm",
						children: [/* @__PURE__ */ jsx("span", {
							className: "mb-1 block opacity-80",
							children: t.month
						}), /* @__PURE__ */ jsx("input", {
							type: "month",
							className: field,
							value: month,
							onChange: (e) => setMonth(e.target.value)
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-sm opacity-80",
						children: t.fillWeekdays
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "tds-toolbar flex flex-wrap items-end gap-3",
						children: [
							/* @__PURE__ */ jsxs("label", {
								className: "block text-sm",
								children: [/* @__PURE__ */ jsx("span", {
									className: "mb-1 block opacity-80",
									children: t.defaultStart
								}), /* @__PURE__ */ jsx("input", {
									type: "time",
									className: "field-boxed",
									value: defStart,
									onChange: (e) => setDefStart(e.target.value)
								})]
							}),
							/* @__PURE__ */ jsxs("label", {
								className: "block text-sm",
								children: [/* @__PURE__ */ jsx("span", {
									className: "mb-1 block opacity-80",
									children: t.defaultEnd
								}), /* @__PURE__ */ jsx("input", {
									type: "time",
									className: "field-boxed",
									value: defEnd,
									onChange: (e) => setDefEnd(e.target.value)
								})]
							}),
							/* @__PURE__ */ jsxs("label", {
								className: "block text-sm",
								children: [/* @__PURE__ */ jsx("span", {
									className: "mb-1 block opacity-80",
									children: t.defaultPause
								}), /* @__PURE__ */ jsx("input", {
									type: "number",
									min: 0,
									max: 240,
									className: "field-boxed",
									value: defPause,
									onChange: (e) => setDefPause(Math.max(0, Number(e.target.value)))
								})]
							}),
							/* @__PURE__ */ jsx("button", {
								type: "button",
								className: "btn btn-ghost",
								onClick: prefill,
								children: t.apply
							}),
							/* @__PURE__ */ jsx("button", {
								type: "button",
								className: "btn btn-ghost",
								onClick: () => setEntries({}),
								children: t.clear
							})
						]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-xs opacity-60",
						children: t.fillHint
					})
				]
			}),
			/* @__PURE__ */ jsxs("table", {
				className: "tds-table",
				tabIndex: 0,
				role: "region",
				"aria-label": t.tableLabel,
				children: [
					/* @__PURE__ */ jsx("caption", {
						className: "text-sm opacity-80",
						children: t.tableLabel
					}),
					/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
						/* @__PURE__ */ jsx("th", {
							scope: "col",
							children: t.date
						}),
						/* @__PURE__ */ jsx("th", {
							scope: "col",
							children: t.from
						}),
						/* @__PURE__ */ jsx("th", {
							scope: "col",
							children: t.to
						}),
						/* @__PURE__ */ jsx("th", {
							scope: "col",
							children: t.pause
						}),
						/* @__PURE__ */ jsx("th", {
							scope: "col",
							children: t.hours
						}),
						/* @__PURE__ */ jsx("th", {
							scope: "col",
							children: t.noteCol
						})
					] }) }),
					/* @__PURE__ */ jsx("tbody", { children: days.map((d) => {
						const e = entryFor(d.day);
						const minutes = workedMinutes(e.start, e.end, e.pause);
						return /* @__PURE__ */ jsxs("tr", { children: [
							/* @__PURE__ */ jsxs("td", { children: [
								d.day,
								". ",
								d.weekday
							] }),
							/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("input", {
								type: "time",
								className: "field-boxed",
								"aria-label": `${t.from} ${d.day}`,
								value: e.start,
								onChange: (ev) => setEntry(d.day, { start: ev.target.value })
							}) }),
							/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("input", {
								type: "time",
								className: "field-boxed",
								"aria-label": `${t.to} ${d.day}`,
								value: e.end,
								onChange: (ev) => setEntry(d.day, { end: ev.target.value })
							}) }),
							/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("input", {
								type: "number",
								min: 0,
								max: 240,
								className: "field-boxed",
								"aria-label": `${t.pause} ${d.day}`,
								value: e.pause || "",
								onChange: (ev) => setEntry(d.day, { pause: Math.max(0, Number(ev.target.value)) })
							}) }),
							/* @__PURE__ */ jsx("td", { children: minutes > 0 ? formatDuration(minutes) : "—" }),
							/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("input", {
								type: "text",
								className: "field-boxed",
								"aria-label": `${t.noteCol} ${d.day}`,
								value: e.note,
								onChange: (ev) => setEntry(d.day, { note: ev.target.value })
							}) })
						] }, d.day);
					}) })
				]
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "text-sm",
				children: [
					/* @__PURE__ */ jsxs("strong", { children: [t.total, ":"] }),
					" ",
					formatDuration(totals.minutes),
					" · ",
					t.daysWorked,
					":",
					" ",
					totals.worked
				]
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "btn btn-primary",
				onClick: run,
				disabled: busy,
				children: busy ? t.working : t.run
			}),
			/* @__PURE__ */ jsx(Alert, { children: error }),
			/* @__PURE__ */ jsx(Alert, {
				tone: "success",
				children: status
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-xs opacity-60",
				children: t.note
			})
		]
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-office/tools/Timesheet.astro
createAstro("https://tools.tracht-digital.de");
var $$Timesheet = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Timesheet;
	const { lang = "de" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="tool tool--timesheet">${renderComponent($$result, "Timesheet", Timesheet, {
		"client:load": true,
		"lang": lang,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-office/islands/Timesheet.tsx",
		"client:component-export": "default"
	})}</div>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-office/tools/Timesheet.astro", void 0);
// node_modules/@tracht-digital-solutions/tds-shared/dist/chunk-2NLUY6RS.js
async function copyText(text) {
	try {
		if (!navigator.clipboard?.writeText) throw new Error("no async clipboard");
		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		const ta = document.createElement("textarea");
		try {
			ta.value = text;
			ta.setAttribute("readonly", "");
			ta.style.position = "fixed";
			ta.style.opacity = "0";
			document.body.appendChild(ta);
			ta.select();
			return document.execCommand("copy");
		} catch {
			return false;
		} finally {
			ta.remove();
		}
	}
}
var COPY_FLAG_MS = 1500;
function useCopyFlag(delayMs = COPY_FLAG_MS) {
	const [copied, setCopied] = useState(false);
	const timer = useRef(null);
	useEffect(() => () => {
		if (timer.current !== null) clearTimeout(timer.current);
	}, []);
	return {
		copied,
		copy: useCallback(async (text) => {
			if (!text) return false;
			const ok = await copyText(text);
			if (timer.current !== null) clearTimeout(timer.current);
			setCopied(ok);
			if (ok) timer.current = setTimeout(() => setCopied(false), delayMs);
			return ok;
		}, [delayMs]),
		reset: useCallback(() => setCopied(false), [])
	};
}
// node_modules/@tracht-digital-solutions/tds-tool-legal/islands/shared.ts
/**
* Gemeinsame Helfer der vier Werkzeuge dieses Packs.
*
* Bewusst eine `.ts`-Datei ohne JSX: die Textaufbau-Funktionen sollen im
* node-Umfeld getestet werden können, ohne dass vitest dafür jsdom hochfährt.
*/
/** Klartext als `.txt` herunterladen. */
function downloadText(text, filename) {
	downloadText$1(text, filename);
}
/** HTML-Bruchstück als `.html` herunterladen. */
function downloadHtml(html, filename) {
	downloadText$1(html, filename, "text/html;charset=utf-8");
}
/** Leerwerte aussortieren und Zeilen trimmen — Formulareingaben sind roh. */
var clean = (value) => (value ?? "").trim();
/** Nur die belegten Teile, mit dem Trenner verbunden. */
var join = (parts, separator = ", ") => parts.map(clean).filter(Boolean).join(separator);
/** Klartextfassung: Titel, dann je Abschnitt Überschrift und Absätze. */
function renderText(title, sections) {
	const blocks = [clean(title)];
	for (const section of sections) {
		const paragraphs = section.paragraphs.map(clean).filter(Boolean);
		blocks.push([clean(section.heading), ...paragraphs].join("\n\n"));
	}
	return blocks.filter(Boolean).join("\n\n") + "\n";
}
/** Für die HTML-Ausgabe: die vier Zeichen, die in Textinhalt gefährlich sind. */
function escapeHtml(value) {
	return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
/**
* HTML-Fassung zum Einfügen in ein CMS.
*
* Ohne Inline-Styles und ohne Klassen: der Text soll die Typografie der
* Zielseite erben. Zeilenumbrüche innerhalb eines Absatzes werden zu
* Zeilenumbruch-Elementen, weil die Anschriftenblöcke sonst zu einer Zeile
* zusammenlaufen.
*/
function renderHtml(title, sections) {
	const lines = ["<section>", `  <h1>${escapeHtml(clean(title))}</h1>`];
	for (const section of sections) {
		lines.push(`  <h2>${escapeHtml(clean(section.heading))}</h2>`);
		for (const paragraph of section.paragraphs.map(clean).filter(Boolean)) lines.push(`  <p>${escapeHtml(paragraph).split("\n").join("<br />\n  ")}</p>`);
	}
	lines.push("</section>");
	return lines.join("\n") + "\n";
}
var emptyProvider = {
	company: "",
	represented: "",
	street: "",
	postalCode: "",
	city: "",
	country: "",
	phone: "",
	email: "",
	website: ""
};
/** Anschrift als Block, wie sie in jedem der drei Dokumente steht. */
function addressBlock(provider) {
	return [
		clean(provider.company),
		clean(provider.street),
		join([provider.postalCode, provider.city], " "),
		clean(provider.country)
	].filter(Boolean).join("\n");
}
/** Kontaktzeilen, beschriftet in der Sprache des Dokuments. */
function contactBlock(provider, lang) {
	const labels = lang === "de" ? {
		phone: "Telefon",
		email: "E-Mail",
		web: "Web"
	} : {
		phone: "Phone",
		email: "Email",
		web: "Web"
	};
	return [
		clean(provider.phone) && `${labels.phone}: ${clean(provider.phone)}`,
		clean(provider.email) && `${labels.email}: ${clean(provider.email)}`,
		clean(provider.website) && `${labels.web}: ${clean(provider.website)}`
	].filter(Boolean).join("\n");
}
/** Ein Dateiname ohne Zeichen, an denen ein Dateisystem oder ein Browser stolpert. */
function safeFilename(base, extension) {
	return `${base.toLowerCase().replace(/[äàáâ]/g, "a").replace(/[öòóô]/g, "o").replace(/[üùúû]/g, "u").replace(/ß/g, "ss").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "dokument"}.${extension}`;
}
// node_modules/@tracht-digital-solutions/tds-tool-legal/islands/accessibility.ts
var emptyAccessibility = {
	provider: {
		...emptyProvider,
		country: "Deutschland"
	},
	regime: "bfsg",
	serviceName: "",
	serviceUrl: "",
	conformity: "partial",
	standard: "en301549",
	createdOn: "",
	reviewedOn: "",
	assessment: "self",
	assessor: "",
	nonAccessible: "",
	reason: "none",
	reasonDetails: "",
	feedbackContact: "",
	feedbackDeadline: "",
	enforcementBody: "",
	marketSurveillance: ""
};
var STANDARDS = {
	en301549: "EN 301 549",
	wcag21: "WCAG 2.1 (Konformitätsstufe AA)",
	wcag22: "WCAG 2.2 (Konformitätsstufe AA)"
};
var STANDARD_ORDER = [
	"en301549",
	"wcag21",
	"wcag22"
];
var standardLabel = (standard) => STANDARDS[standard];
var accessibilityTitle = (lang) => lang === "de" ? "Erklärung zur Barrierefreiheit" : "Accessibility statement";
/** Angaben, ohne die die Erklärung ihren Zweck nicht erfüllt. */
function missingAccessibilityFields(values, lang) {
	const de = lang === "de";
	const missing = [];
	if (!clean(values.provider.company)) missing.push(de ? "Name des Anbieters" : "name of the provider");
	if (!clean(values.serviceName)) missing.push(de ? "Bezeichnung des Angebots" : "name of the service");
	if (!clean(values.createdOn)) missing.push(de ? "Datum der Erstellung" : "date of preparation");
	if (!clean(values.feedbackContact)) missing.push(de ? "Kontaktweg für Rückmeldungen" : "contact channel for feedback");
	if (values.conformity !== "full" && !clean(values.nonAccessible)) missing.push(de ? "Beschreibung der nicht barrierefreien Inhalte" : "description of the non-accessible content");
	if (values.assessment === "external" && !clean(values.assessor)) missing.push(de ? "Name der Prüfstelle" : "name of the assessing body");
	return missing;
}
/** Die Abschnitte der Erklärung, abhängig vom gewählten Regime. */
function buildAccessibilitySections(values, lang) {
	const de = lang === "de";
	const isPublic = values.regime === "public";
	const service = clean(values.serviceName) || (de ? "dieses Angebot" : "this service");
	const url = clean(values.serviceUrl);
	const standard = standardLabel(values.standard);
	const sections = [];
	sections.push({
		heading: de ? "Geltungsbereich" : "Scope",
		paragraphs: [
			isPublic ? de ? `Diese Erklärung zur Barrierefreiheit gilt für ${service}${url ? ` (${url})` : ""}. Sie wird nach § 12b des Behindertengleichstellungsgesetzes (BGG) in Verbindung mit der Barrierefreie-Informationstechnik-Verordnung (BITV 2.0) abgegeben.` : `This accessibility statement applies to ${service}${url ? ` (${url})` : ""}. It is issued pursuant to section 12b of the German Disability Equality Act (BGG) in conjunction with the Barrier-Free Information Technology Ordinance (BITV 2.0).` : de ? `Diese Erklärung zur Barrierefreiheit gilt für ${service}${url ? ` (${url})` : ""}. Sie wird nach dem Barrierefreiheitsstärkungsgesetz (BFSG) und der dazugehörigen Verordnung abgegeben.` : `This accessibility statement applies to ${service}${url ? ` (${url})` : ""}. It is issued pursuant to the German Accessibility Strengthening Act (BFSG) and its implementing ordinance.`,
			addressBlock(values.provider),
			contactBlock(values.provider, lang)
		]
	});
	const conformitySentence = values.conformity === "full" ? de ? `Dieses Angebot ist mit ${standard} vollständig vereinbar.` : `This service is fully compliant with ${standard}.` : values.conformity === "partial" ? de ? `Dieses Angebot ist mit ${standard} teilweise vereinbar. Die nachstehend aufgeführten Inhalte sind aus den genannten Gründen noch nicht barrierefrei.` : `This service is partially compliant with ${standard}. The content listed below is not yet accessible, for the reasons given.` : de ? `Dieses Angebot ist mit ${standard} nicht vereinbar. Die nachstehend aufgeführten Inhalte sind nicht barrierefrei.` : `This service is not compliant with ${standard}. The content listed below is not accessible.`;
	sections.push({
		heading: de ? "Stand der Vereinbarkeit" : "Compliance status",
		paragraphs: [conformitySentence]
	});
	if (values.conformity !== "full") sections.push({
		heading: de ? "Nicht barrierefreie Inhalte" : "Non-accessible content",
		paragraphs: [clean(values.nonAccessible)]
	});
	if (values.reason !== "none") {
		const details = clean(values.reasonDetails);
		const reasonText = values.reason === "burden" ? de ? "Die Herstellung der Barrierefreiheit für die genannten Inhalte würde uns derzeit unverhältnismäßig belasten. Wir prüfen die Einschätzung regelmäßig neu." : "Making the content listed above accessible would currently place a disproportionate burden on us. We review that assessment regularly." : values.reason === "exempt" ? de ? "Die genannten Inhalte fallen nicht in den Anwendungsbereich der einschlägigen Vorschriften." : "The content listed above falls outside the scope of the applicable rules." : de ? "Wir arbeiten daran, die genannten Inhalte barrierefrei zu gestalten." : "We are working on making the content listed above accessible.";
		sections.push({
			heading: de ? "Begründung" : "Reasoning",
			paragraphs: [reasonText, details]
		});
	}
	const created = clean(values.createdOn);
	const reviewed = clean(values.reviewedOn);
	const assessor = clean(values.assessor);
	sections.push({
		heading: de ? "Erstellung dieser Erklärung" : "Preparation of this statement",
		paragraphs: [de ? `Diese Erklärung wurde am ${created || "…"} erstellt${reviewed ? ` und zuletzt am ${reviewed} überprüft` : ""}.` : `This statement was prepared on ${created || "…"}${reviewed ? ` and last reviewed on ${reviewed}` : ""}.`, values.assessment === "external" ? de ? `Grundlage ist eine externe Prüfung durch ${assessor || "eine unabhängige Prüfstelle"}.` : `It is based on an external assessment carried out by ${assessor || "an independent assessing body"}.` : de ? "Grundlage ist eine Selbstbewertung anhand der oben genannten Anforderungen." : "It is based on a self-assessment against the requirements named above."]
	});
	const deadline = clean(values.feedbackDeadline) || (de ? "einem Monat" : "one month");
	sections.push({
		heading: de ? "Rückmeldung und Kontakt" : "Feedback and contact",
		paragraphs: [de ? `Sind Ihnen Mängel beim barrierefreien Zugang aufgefallen, oder benötigen Sie einen Inhalt in einer zugänglichen Form? Dann melden Sie sich bei uns: ${clean(values.feedbackContact)}` : `Have you noticed shortcomings in the accessible access, or do you need content in an accessible form? Please get in touch: ${clean(values.feedbackContact)}`, de ? `Wir antworten innerhalb von ${deadline} und teilen Ihnen mit, wie wir mit Ihrem Hinweis umgehen.` : `We will respond within ${deadline} and tell you how we intend to act on your feedback.`]
	});
	if (isPublic) {
		const body = clean(values.enforcementBody);
		sections.push({
			heading: de ? "Durchsetzungsverfahren" : "Enforcement procedure",
			paragraphs: [de ? "Konnten wir Ihre Rückmeldung nicht zu Ihrer Zufriedenheit beantworten, können Sie sich an die Schlichtungsstelle nach § 16 BGG wenden. Das Schlichtungsverfahren ist für Sie kostenfrei; eine rechtliche Vertretung ist nicht erforderlich." : "If we could not answer your feedback to your satisfaction, you can turn to the conciliation body under section 16 BGG. The conciliation procedure is free of charge for you, and legal representation is not required.", body]
		});
	} else {
		const body = clean(values.marketSurveillance);
		sections.push({
			heading: de ? "Marktüberwachung" : "Market surveillance",
			paragraphs: [de ? "Konnten wir Ihre Rückmeldung nicht zu Ihrer Zufriedenheit beantworten, können Sie sich an die Marktüberwachungsstelle der Länder für die Barrierefreiheit von Produkten und Dienstleistungen wenden. Sie prüft, ob die Anforderungen des BFSG eingehalten werden." : "If we could not answer your feedback to your satisfaction, you can turn to the market surveillance authority of the federal states for the accessibility of products and services. It examines whether the requirements of the BFSG are being met.", body]
		});
	}
	return sections;
}
// node_modules/@tracht-digital-solutions/tds-tool-legal/islands/ui.tsx
/**
* Die Formularbausteine der drei Textgeneratoren.
*
* An einer Stelle statt dreimal: die Generatoren unterscheiden sich in ihren
* Klauseln, nicht in ihrer Bedienung, und drei Kopien desselben Eingabefeldes
* driften auseinander, sobald eines davon einen Hinweis bekommt.
*
* Die Geometrie kommt vollständig aus tds-shared. Das Pack liefert kein CSS,
* also trägt jedes Bedienelement eine geteilte Klasse: ohne `field-boxed`
* rendert ein Eingabefeld unsichtbar, weil Tailwinds Preflight die Rahmen
* nullt, und ohne `btn` hat eine Schaltfläche weder Innenabstand noch
* Berührungsfläche.
*/
var field = "field-boxed w-full";
function Field$1({ label, value, onChange, placeholder, type = "text", hint, required }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "block text-sm",
		children: [
			/* @__PURE__ */ jsxs("span", {
				className: "mb-1 block opacity-80",
				children: [label, required ? /* @__PURE__ */ jsx("span", {
					className: "text-[color:var(--color-danger)]",
					children: " *"
				}) : null]
			}),
			/* @__PURE__ */ jsx("input", {
				className: field,
				type,
				value,
				placeholder,
				onChange: (event) => onChange(event.target.value)
			}),
			hint ? /* @__PURE__ */ jsx("span", {
				className: "mt-1 block text-xs opacity-60",
				children: hint
			}) : null
		]
	});
}
function Area({ label, value, onChange, placeholder, rows = 4, hint }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "block text-sm",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "mb-1 block opacity-80",
				children: label
			}),
			/* @__PURE__ */ jsx("textarea", {
				className: field,
				rows,
				value,
				placeholder,
				onChange: (event) => onChange(event.target.value)
			}),
			hint ? /* @__PURE__ */ jsx("span", {
				className: "mt-1 block text-xs opacity-60",
				children: hint
			}) : null
		]
	});
}
function Choice({ label, value, options, onChange, hint }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "block text-sm",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "mb-1 block opacity-80",
				children: label
			}),
			/* @__PURE__ */ jsx("select", {
				className: field,
				value,
				onChange: (event) => onChange(event.target.value),
				children: options.map((option) => /* @__PURE__ */ jsx("option", {
					value: option.value,
					children: option.label
				}, option.value))
			}),
			hint ? /* @__PURE__ */ jsx("span", {
				className: "mt-1 block text-xs opacity-60",
				children: hint
			}) : null
		]
	});
}
function Check({ label, checked, onChange, hint }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "flex items-start gap-2 text-sm",
		children: [/* @__PURE__ */ jsx("input", {
			type: "checkbox",
			className: "mt-1",
			checked,
			onChange: (event) => onChange(event.target.checked)
		}), /* @__PURE__ */ jsxs("span", { children: [label, hint ? /* @__PURE__ */ jsx("span", {
			className: "mt-0.5 block text-xs opacity-60",
			children: hint
		}) : null] })]
	});
}
/**
* Eine Auswahl aus mehreren Möglichkeiten.
*
* Die Legende ist nur für Hilfsmittel sichtbar: beide Aufrufer setzen die
* Gruppe in ein `Group` mit derselben Überschrift, und zweimal derselbe Satz
* untereinander liest sich wie ein Fehler. Weglassen ist trotzdem keine
* Option — ein `fieldset` ohne Legende hat für einen Screenreader keinen
* Namen, und die Auswahl stünde dann ohne ihre Frage im Raum.
*/
function Radios({ legend, name, value, options, onChange }) {
	return /* @__PURE__ */ jsxs("fieldset", {
		className: "text-sm",
		children: [/* @__PURE__ */ jsx("legend", {
			className: "sr-only",
			children: legend
		}), /* @__PURE__ */ jsx("div", {
			className: "grid gap-2",
			children: options.map((option) => /* @__PURE__ */ jsxs("label", {
				className: "flex items-start gap-2",
				children: [/* @__PURE__ */ jsx("input", {
					type: "radio",
					className: "mt-1",
					name,
					value: option.value,
					checked: value === option.value,
					onChange: () => onChange(option.value)
				}), /* @__PURE__ */ jsxs("span", { children: [option.label, option.hint ? /* @__PURE__ */ jsx("span", {
					className: "mt-0.5 block text-xs opacity-60",
					children: option.hint
				}) : null] })]
			}, option.value))
		})]
	});
}
/** Ein beschrifteter Abschnitt des Formulars. */
function Group({ title, children }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "space-y-3",
		children: [/* @__PURE__ */ jsx("h2", {
			className: "text-sm font-semibold tracking-wide uppercase opacity-70",
			children: title
		}), children]
	});
}
var NOTE = {
	de: {
		disclaimer: "Dieses Werkzeug erzeugt ein Muster zur Orientierung. Es ersetzt keine Rechtsberatung und keine Prüfung des konkreten Falls durch eine Anwältin oder einen Anwalt.",
		missing: (fields) => `Für einen vollständigen Text fehlt noch: ${fields}.`,
		preview: "Vorschau",
		copy: "Kopieren",
		copied: "Kopiert ✓",
		txt: "Als .txt speichern",
		html: "Als .html speichern",
		footer: "Den Text vor der Veröffentlichung prüfen. Die Pflichtangaben hängen am Betrieb, nicht an diesem Formular — und dieses Werkzeug kennt den Betrieb nicht."
	},
	en: {
		disclaimer: "This tool produces a sample for orientation. It is not legal advice and does not replace having your specific case reviewed by a lawyer.",
		missing: (fields) => `Still missing for a complete text: ${fields}.`,
		preview: "Preview",
		copy: "Copy",
		copied: "Copied ✓",
		txt: "Save as .txt",
		html: "Save as .html",
		footer: "Review the text before you publish it. Which details are mandatory depends on your business, not on this form — and this tool does not know your business."
	}
};
/**
* Der Rechtshinweis. Steht über dem Formular und noch einmal unter der Ausgabe.
*
* `.tds-alert` und nicht `.status-pill`: die Plakette ist ein kurzes
* Zustandsetikett mit `white-space: nowrap` und Versalien, gedacht für ein
* Wort. Ein ganzer Satz darin bricht nicht um, sondern schiebt das Dokument
* auseinander — auf einem 390 Pixel breiten Fenster auf über 1100 Pixel. Zu
* sehen ist davon nichts, weil `body { overflow-x: hidden }` den Überhang
* abschneidet; man merkt es erst, wenn man die Dokumentbreite misst.
*/
function Disclaimer({ lang }) {
	return /* @__PURE__ */ jsx("p", {
		className: "tds-alert tds-alert--warning",
		role: "note",
		children: NOTE[lang].disclaimer
	});
}
/**
* Vorschau und Ausgabe.
*
* Klartext und HTML entstehen aus derselben Abschnittsliste wie die Vorschau —
* eine zweite Quelle für dieselben Sätze wäre die Stelle, an der die
* heruntergeladene Fassung von der angezeigten abweicht, und zwar erst
* Wochen später und ohne Fehlermeldung.
*
* Der Rechtshinweis steht bewusst NICHT im erzeugten Text: er würde beim
* Einfügen mit auf die Seite des Nutzers wandern und dort als Teil des
* Pflichttextes gelesen.
*/
function DocumentOutput({ lang, title, sections, missing, filenameBase }) {
	const t = NOTE[lang];
	const { copied, copy } = useCopyFlag();
	const text = renderText(title, sections);
	const html = renderHtml(title, sections);
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-3",
		children: [
			missing.length > 0 && /* @__PURE__ */ jsx("p", {
				className: "text-xs opacity-70",
				children: t.missing(missing.join(", "))
			}),
			/* @__PURE__ */ jsx("h2", {
				className: "text-sm font-semibold tracking-wide uppercase opacity-70",
				children: t.preview
			}),
			/* @__PURE__ */ jsx("div", {
				className: "tds-card p-4",
				children: /* @__PURE__ */ jsx("output", {
					className: "block max-h-96 w-full overflow-auto text-sm whitespace-pre-wrap",
					children: text
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ jsx("button", {
						type: "button",
						className: "btn btn-primary",
						onClick: () => void copy(text),
						children: copied ? t.copied : t.copy
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						className: "btn btn-ghost",
						onClick: () => downloadText(text, safeFilename(filenameBase, "txt")),
						children: t.txt
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						className: "btn btn-ghost",
						onClick: () => downloadHtml(html, safeFilename(filenameBase, "html")),
						children: t.html
					})
				]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-xs opacity-60",
				children: t.footer
			})
		]
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-legal/islands/AccessibilityStatementGenerator.tsx
/** Deutsch ist der Default, hier wie in der Shell. */
var STRINGS$17 = {
	de: {
		regime: "Wer gibt die Erklärung ab?",
		regimeBfsg: "Unternehmen (BFSG)",
		regimeBfsgHint: "Gilt seit dem 28. Juni 2025 unter anderem für Onlineshops und andere Dienstleistungen an Verbraucher.",
		regimePublic: "Öffentliche Stelle (BITV 2.0, § 12b BGG)",
		regimePublicHint: "Behörden, Kommunen und andere Träger öffentlicher Verwaltung.",
		provider: "Anbieter",
		company: "Name oder Firma",
		street: "Straße und Hausnummer",
		postalCode: "PLZ",
		city: "Ort",
		country: "Land",
		phone: "Telefon",
		email: "E-Mail",
		serviceName: "Bezeichnung des Angebots",
		serviceNameHint: "Etwa „die Website www.beispiel.de“ oder „der Onlineshop“.",
		serviceUrl: "Adresse",
		status: "Stand der Barrierefreiheit",
		conformity: "Vereinbarkeit",
		conformityFull: "Vollständig vereinbar",
		conformityPartial: "Teilweise vereinbar",
		conformityNone: "Nicht vereinbar",
		standard: "Angewandter Standard",
		nonAccessible: "Nicht barrierefreie Inhalte",
		nonAccessibleHint: "Konkret benennen — pauschale Sätze helfen niemandem weiter.",
		reason: "Begründung",
		reasonNone: "Keine Begründung angeben",
		reasonBurden: "Unverhältnismäßige Belastung",
		reasonExempt: "Außerhalb des Anwendungsbereichs",
		reasonInProgress: "Wird derzeit umgesetzt",
		reasonDetails: "Erläuterung",
		preparation: "Erstellung",
		createdOn: "Erstellt am",
		reviewedOn: "Zuletzt überprüft am",
		assessment: "Bewertungsverfahren",
		assessmentSelf: "Selbstbewertung",
		assessmentExternal: "Externe Prüfung",
		assessor: "Prüfstelle",
		feedback: "Rückmeldung",
		feedbackContact: "Kontaktweg für Rückmeldungen",
		feedbackContactHint: "E-Mail-Adresse, Formular oder Telefonnummer — erreichbar und benannt.",
		feedbackDeadline: "Antwortfrist",
		feedbackDeadlineHint: "Leer lassen für „einem Monat“.",
		enforcement: "Durchsetzung",
		enforcementBody: "Schlichtungsstelle",
		enforcementBodyHint: "Anschrift der zuständigen Schlichtungsstelle nach § 16 BGG.",
		marketSurveillance: "Marktüberwachungsstelle",
		marketSurveillanceHint: "Anschrift der zuständigen Marktüberwachungsstelle der Länder.",
		filename: "barrierefreiheitserklaerung"
	},
	en: {
		regime: "Who is issuing the statement?",
		regimeBfsg: "Business (BFSG)",
		regimeBfsgHint: "Applies since 28 June 2025 to online shops and other services offered to consumers, among others.",
		regimePublic: "Public body (BITV 2.0, section 12b BGG)",
		regimePublicHint: "Authorities, municipalities and other public administration bodies.",
		provider: "Provider",
		company: "Name or company",
		street: "Street and number",
		postalCode: "Postcode",
		city: "Town",
		country: "Country",
		phone: "Phone",
		email: "Email",
		serviceName: "Name of the service",
		serviceNameHint: "For example “the website www.example.com” or “the online shop”.",
		serviceUrl: "Address",
		status: "State of accessibility",
		conformity: "Compliance",
		conformityFull: "Fully compliant",
		conformityPartial: "Partially compliant",
		conformityNone: "Not compliant",
		standard: "Standard applied",
		nonAccessible: "Non-accessible content",
		nonAccessibleHint: "Name it concretely — blanket sentences help nobody.",
		reason: "Reasoning",
		reasonNone: "Give no reason",
		reasonBurden: "Disproportionate burden",
		reasonExempt: "Outside the scope",
		reasonInProgress: "Being implemented",
		reasonDetails: "Explanation",
		preparation: "Preparation",
		createdOn: "Prepared on",
		reviewedOn: "Last reviewed on",
		assessment: "Assessment method",
		assessmentSelf: "Self-assessment",
		assessmentExternal: "External assessment",
		assessor: "Assessing body",
		feedback: "Feedback",
		feedbackContact: "Contact channel for feedback",
		feedbackContactHint: "An email address, a form or a phone number — reachable and named.",
		feedbackDeadline: "Response time",
		feedbackDeadlineHint: "Leave empty for “one month”.",
		enforcement: "Enforcement",
		enforcementBody: "Conciliation body",
		enforcementBodyHint: "Address of the competent conciliation body under section 16 BGG.",
		marketSurveillance: "Market surveillance authority",
		marketSurveillanceHint: "Address of the competent market surveillance authority of the federal states.",
		filename: "accessibility-statement"
	}
};
function AccessibilityStatementGenerator({ lang = "de" }) {
	const t = STRINGS$17[lang];
	const [values, setValues] = useState(emptyAccessibility);
	const set = (key, value) => setValues((prev) => ({
		...prev,
		[key]: value
	}));
	const setProvider = (key, value) => setValues((prev) => ({
		...prev,
		provider: {
			...prev.provider,
			[key]: value
		}
	}));
	const sections = useMemo(() => buildAccessibilitySections(values, lang), [values, lang]);
	const missing = useMemo(() => missingAccessibilityFields(values, lang), [values, lang]);
	return /* @__PURE__ */ jsxs("div", {
		className: "accessibility-tool space-y-6",
		children: [
			/* @__PURE__ */ jsx(Disclaimer, { lang }),
			/* @__PURE__ */ jsx(Group, {
				title: t.regime,
				children: /* @__PURE__ */ jsx(Radios, {
					legend: t.regime,
					name: "a11y-regime",
					value: values.regime,
					onChange: (value) => set("regime", value),
					options: [{
						value: "bfsg",
						label: t.regimeBfsg,
						hint: t.regimeBfsgHint
					}, {
						value: "public",
						label: t.regimePublic,
						hint: t.regimePublicHint
					}]
				})
			}),
			/* @__PURE__ */ jsxs(Group, {
				title: t.provider,
				children: [
					/* @__PURE__ */ jsx(Field$1, {
						label: t.company,
						required: true,
						value: values.provider.company,
						onChange: (value) => setProvider("company", value)
					}),
					/* @__PURE__ */ jsx(Field$1, {
						label: t.street,
						value: values.provider.street,
						onChange: (value) => setProvider("street", value)
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ jsx(Field$1, {
								label: t.postalCode,
								value: values.provider.postalCode,
								onChange: (value) => setProvider("postalCode", value)
							}),
							/* @__PURE__ */ jsx(Field$1, {
								label: t.city,
								value: values.provider.city,
								onChange: (value) => setProvider("city", value)
							}),
							/* @__PURE__ */ jsx(Field$1, {
								label: t.country,
								value: values.provider.country,
								onChange: (value) => setProvider("country", value)
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ jsx(Field$1, {
							label: t.phone,
							type: "tel",
							value: values.provider.phone,
							onChange: (value) => setProvider("phone", value)
						}), /* @__PURE__ */ jsx(Field$1, {
							label: t.email,
							type: "email",
							value: values.provider.email,
							onChange: (value) => setProvider("email", value)
						})]
					}),
					/* @__PURE__ */ jsx(Field$1, {
						label: t.serviceName,
						hint: t.serviceNameHint,
						required: true,
						value: values.serviceName,
						onChange: (value) => set("serviceName", value)
					}),
					/* @__PURE__ */ jsx(Field$1, {
						label: t.serviceUrl,
						type: "url",
						value: values.serviceUrl,
						onChange: (value) => set("serviceUrl", value)
					})
				]
			}),
			/* @__PURE__ */ jsxs(Group, {
				title: t.status,
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ jsx(Choice, {
							label: t.conformity,
							value: values.conformity,
							onChange: (value) => set("conformity", value),
							options: [
								{
									value: "full",
									label: t.conformityFull
								},
								{
									value: "partial",
									label: t.conformityPartial
								},
								{
									value: "none",
									label: t.conformityNone
								}
							]
						}), /* @__PURE__ */ jsx(Choice, {
							label: t.standard,
							value: values.standard,
							onChange: (value) => set("standard", value),
							options: STANDARD_ORDER.map((standard) => ({
								value: standard,
								label: standardLabel(standard)
							}))
						})]
					}),
					values.conformity !== "full" && /* @__PURE__ */ jsx(Area, {
						label: t.nonAccessible,
						hint: t.nonAccessibleHint,
						rows: 5,
						value: values.nonAccessible,
						onChange: (value) => set("nonAccessible", value)
					}),
					/* @__PURE__ */ jsx(Choice, {
						label: t.reason,
						value: values.reason,
						onChange: (value) => set("reason", value),
						options: [
							{
								value: "none",
								label: t.reasonNone
							},
							{
								value: "burden",
								label: t.reasonBurden
							},
							{
								value: "exempt",
								label: t.reasonExempt
							},
							{
								value: "inprogress",
								label: t.reasonInProgress
							}
						]
					}),
					values.reason !== "none" && /* @__PURE__ */ jsx(Area, {
						label: t.reasonDetails,
						rows: 3,
						value: values.reasonDetails,
						onChange: (value) => set("reasonDetails", value)
					})
				]
			}),
			/* @__PURE__ */ jsxs(Group, {
				title: t.preparation,
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ jsx(Field$1, {
							label: t.createdOn,
							type: "date",
							required: true,
							value: values.createdOn,
							onChange: (value) => set("createdOn", value)
						}), /* @__PURE__ */ jsx(Field$1, {
							label: t.reviewedOn,
							type: "date",
							value: values.reviewedOn,
							onChange: (value) => set("reviewedOn", value)
						})]
					}),
					/* @__PURE__ */ jsx(Choice, {
						label: t.assessment,
						value: values.assessment,
						onChange: (value) => set("assessment", value),
						options: [{
							value: "self",
							label: t.assessmentSelf
						}, {
							value: "external",
							label: t.assessmentExternal
						}]
					}),
					values.assessment === "external" && /* @__PURE__ */ jsx(Field$1, {
						label: t.assessor,
						value: values.assessor,
						onChange: (value) => set("assessor", value)
					})
				]
			}),
			/* @__PURE__ */ jsxs(Group, {
				title: t.feedback,
				children: [/* @__PURE__ */ jsx(Field$1, {
					label: t.feedbackContact,
					hint: t.feedbackContactHint,
					required: true,
					value: values.feedbackContact,
					onChange: (value) => set("feedbackContact", value)
				}), /* @__PURE__ */ jsx(Field$1, {
					label: t.feedbackDeadline,
					hint: t.feedbackDeadlineHint,
					value: values.feedbackDeadline,
					onChange: (value) => set("feedbackDeadline", value)
				})]
			}),
			/* @__PURE__ */ jsx(Group, {
				title: t.enforcement,
				children: values.regime === "public" ? /* @__PURE__ */ jsx(Area, {
					label: t.enforcementBody,
					hint: t.enforcementBodyHint,
					rows: 3,
					value: values.enforcementBody,
					onChange: (value) => set("enforcementBody", value)
				}) : /* @__PURE__ */ jsx(Area, {
					label: t.marketSurveillance,
					hint: t.marketSurveillanceHint,
					rows: 3,
					value: values.marketSurveillance,
					onChange: (value) => set("marketSurveillance", value)
				})
			}),
			/* @__PURE__ */ jsx(DocumentOutput, {
				lang,
				title: accessibilityTitle(lang),
				sections,
				missing,
				filenameBase: t.filename
			})
		]
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-legal/tools/AccessibilityStatementGenerator.astro
createAstro("https://tools.tracht-digital.de");
var $$AccessibilityStatementGenerator = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$AccessibilityStatementGenerator;
	const { lang = "de" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="tool tool--accessibility">${renderComponent($$result, "AccessibilityStatementGenerator", AccessibilityStatementGenerator, {
		"client:load": true,
		"lang": lang,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-legal/islands/AccessibilityStatementGenerator.tsx",
		"client:component-export": "default"
	})}</div>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-legal/tools/AccessibilityStatementGenerator.astro", void 0);
// node_modules/@tracht-digital-solutions/tds-tool-legal/islands/privacy.ts
var emptyPrivacy = {
	provider: {
		...emptyProvider,
		country: "Deutschland"
	},
	hasDpo: false,
	dpoName: "",
	dpoContact: "",
	supervisoryAuthority: "",
	hosting: true,
	hostingProvider: "",
	hostingCountry: "",
	serverLogs: true,
	contactForm: true,
	emailContact: true,
	phoneContact: false,
	essentialCookies: true,
	consentCookies: false,
	consentTool: "",
	analytics: false,
	analyticsTool: "matomo",
	analyticsName: "",
	newsletter: false,
	newsletterProvider: "",
	maps: false,
	mapsProvider: "osm",
	mapsName: "",
	webfonts: false,
	fontsMode: "local",
	videos: false,
	videoProvider: "",
	socialProfiles: false,
	socialNetworks: "",
	socialPlugins: false,
	shop: false,
	paymentProviders: "",
	booking: false,
	bookingProvider: "",
	liveChat: false,
	chatProvider: "",
	cdn: false,
	cdnProvider: "",
	applications: false,
	thirdCountry: false,
	thirdCountryDetails: "",
	retention: ""
};
var privacyTitle = (lang) => lang === "de" ? "Datenschutzerklärung" : "Privacy policy";
/** Was ohne Angabe zu einer Lücke im Pflichttext führt. */
function missingPrivacyFields(values, lang) {
	const de = lang === "de";
	const missing = [];
	const p = values.provider;
	if (!clean(p.company)) missing.push(de ? "Name des Verantwortlichen" : "name of the controller");
	if (!clean(p.street) || !clean(p.postalCode) || !clean(p.city)) missing.push(de ? "Anschrift des Verantwortlichen" : "address of the controller");
	if (!clean(p.email)) missing.push(de ? "E-Mail-Adresse" : "email address");
	if (values.hasDpo && !clean(values.dpoContact)) missing.push(de ? "Kontakt des Datenschutzbeauftragten" : "contact of the data protection officer");
	if (values.analytics && values.analyticsTool === "other" && !clean(values.analyticsName)) missing.push(de ? "Name des Analysewerkzeugs" : "name of the analytics tool");
	if (values.newsletter && !clean(values.newsletterProvider)) missing.push(de ? "Newsletter-Anbieter" : "newsletter provider");
	if (values.thirdCountry && !clean(values.thirdCountryDetails)) missing.push(de ? "Angaben zur Drittlandübermittlung" : "details of the third-country transfer");
	return missing;
}
var analyticsLabel = (values) => {
	if (values.analyticsTool === "matomo") return "Matomo";
	if (values.analyticsTool === "ga4") return "Google Analytics 4";
	return clean(values.analyticsName) || "das eingesetzte Analysewerkzeug";
};
var mapsLabel = (values) => {
	if (values.mapsProvider === "google") return "Google Maps";
	if (values.mapsProvider === "osm") return "OpenStreetMap";
	return clean(values.mapsName) || "der eingesetzte Kartendienst";
};
/**
* Die Abschnitte der Erklärung.
*
* Reihenfolge: wer verarbeitet (Verantwortlicher, Datenschutzbeauftragte),
* dann was auf dieser Website passiert (die Bausteine), dann die Rechte der
* betroffenen Person. Diese Reihenfolge entspricht dem Aufbau, den die
* Aufsichtsbehörden in ihren Mustern verwenden.
*/
function buildPrivacySections(values, lang) {
	const de = lang === "de";
	const p = values.provider;
	const sections = [];
	sections.push({
		heading: de ? "Verantwortlicher" : "Controller",
		paragraphs: [
			de ? "Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website im Sinne der Datenschutz-Grundverordnung ist:" : "The controller responsible for the processing of personal data on this website within the meaning of the General Data Protection Regulation is:",
			addressBlock(p),
			contactBlock(p, lang)
		]
	});
	if (values.hasDpo) sections.push({
		heading: de ? "Datenschutzbeauftragte Person" : "Data protection officer",
		paragraphs: [de ? "Wir haben eine datenschutzbeauftragte Person benannt. Sie erreichen sie unter:" : "We have appointed a data protection officer. You can reach them at:", [clean(values.dpoName), clean(values.dpoContact)].filter(Boolean).join("\n")]
	});
	sections.push({
		heading: de ? "Allgemeines zur Verarbeitung" : "General information on processing",
		paragraphs: de ? ["Wir verarbeiten personenbezogene Daten nur, soweit dies für die Bereitstellung dieser Website und unserer Leistungen erforderlich ist oder Sie eingewilligt haben. Rechtsgrundlage ist je nach Zweck Art. 6 Abs. 1 lit. a DSGVO (Einwilligung), Art. 6 Abs. 1 lit. b DSGVO (Vertrag oder vorvertragliche Maßnahmen) oder Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).", "Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare Person beziehen. Die Nutzung dieser Website ist grundsätzlich ohne Angabe personenbezogener Daten möglich; wo wir Angaben erheben, geschieht dies auf den unten beschriebenen Wegen."] : ["We process personal data only where this is necessary to provide this website and our services, or where you have given your consent. Depending on the purpose, the legal basis is Article 6 (1) (a) GDPR (consent), Article 6 (1) (b) GDPR (contract or pre-contractual measures) or Article 6 (1) (f) GDPR (legitimate interest).", "Personal data means any information relating to an identified or identifiable person. This website can generally be used without providing personal data; where we do collect it, this happens through the channels described below."]
	});
	if (values.hosting) {
		const host = clean(values.hostingProvider);
		const where = clean(values.hostingCountry);
		sections.push({
			heading: de ? "Hosting" : "Hosting",
			paragraphs: [de ? `Diese Website wird bei einem externen Dienstleister gehostet${host ? ` (${host})` : ""}. Die dabei erhobenen Daten werden auf den Servern des Anbieters gespeichert${where ? `, die sich in ${where} befinden` : ""}. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt in einer sicheren und zuverlässigen Bereitstellung unseres Angebots.` : `This website is hosted by an external service provider${host ? ` (${host})` : ""}. The data collected in that context is stored on the provider's servers${where ? `, which are located in ${where}` : ""}. The legal basis is Article 6 (1) (f) GDPR; our legitimate interest lies in providing our offering securely and reliably.`, de ? "Mit dem Anbieter haben wir einen Vertrag über die Auftragsverarbeitung nach Art. 28 DSGVO geschlossen. Der Anbieter verarbeitet die Daten ausschließlich nach unserer Weisung." : "We have concluded a data processing agreement with the provider pursuant to Article 28 GDPR. The provider processes the data solely on our instructions."]
		});
	}
	if (values.serverLogs) sections.push({
		heading: de ? "Server-Logdateien" : "Server log files",
		paragraphs: [de ? "Beim Aufruf dieser Website werden automatisch Informationen erfasst, die Ihr Browser übermittelt: Browsertyp und -version, verwendetes Betriebssystem, aufgerufene Seite, zuvor besuchte Seite, Uhrzeit der Anfrage und die IP-Adresse. Eine Zusammenführung dieser Daten mit anderen Datenquellen nehmen wir nicht vor." : "When you access this website, information transmitted by your browser is recorded automatically: browser type and version, operating system, page requested, referring page, time of the request and the IP address. We do not merge this data with other sources.", de ? "Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt im technisch fehlerfreien Betrieb und in der Sicherheit unserer Systeme. Die Protokolle werden gelöscht, sobald sie für diesen Zweck nicht mehr erforderlich sind." : "The legal basis is Article 6 (1) (f) GDPR. Our legitimate interest lies in the technically error-free operation and the security of our systems. The logs are deleted as soon as they are no longer needed for that purpose."]
	});
	if (values.contactForm) sections.push({
		heading: de ? "Kontaktformular" : "Contact form",
		paragraphs: [de ? "Wenn Sie uns über das Kontaktformular schreiben, verarbeiten wir Ihre Angaben aus dem Formular einschließlich der dort angegebenen Kontaktdaten, um Ihre Anfrage zu bearbeiten und für Anschlussfragen bereitzuhalten. Ohne Ihre Einwilligung geben wir diese Daten nicht weiter." : "If you write to us using the contact form, we process the details you provide, including the contact data given there, in order to handle your enquiry and to remain available for follow-up questions. We do not pass this data on without your consent.", de ? "Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage der Anbahnung oder Erfüllung eines Vertrags dient, im Übrigen Art. 6 Abs. 1 lit. f DSGVO wegen unseres berechtigten Interesses an der Beantwortung von Anfragen. Wir löschen die Angaben, sobald der Vorgang abgeschlossen ist und keine Aufbewahrungspflichten entgegenstehen." : "The legal basis is Article 6 (1) (b) GDPR where your enquiry serves the initiation or performance of a contract, and otherwise Article 6 (1) (f) GDPR, based on our legitimate interest in answering enquiries. We delete the details once the matter has been concluded and no retention obligations apply."]
	});
	if (values.emailContact || values.phoneContact) {
		const list = (de ? [values.emailContact ? "E-Mail" : "", values.phoneContact ? "Telefon" : ""] : [values.emailContact ? "email" : "", values.phoneContact ? "telephone" : ""]).filter(Boolean).join(de ? " oder " : " or ");
		sections.push({
			heading: de ? "Kontaktaufnahme per E-Mail oder Telefon" : "Contact by email or telephone",
			paragraphs: [de ? `Wenn Sie uns per ${list} kontaktieren, speichern wir Ihre Angaben zur Bearbeitung des Anliegens. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO bei vertragsbezogenen Anfragen, sonst Art. 6 Abs. 1 lit. f DSGVO.` : `If you contact us by ${list}, we store your details in order to deal with your request. The legal basis is Article 6 (1) (b) GDPR for contract-related enquiries and otherwise Article 6 (1) (f) GDPR.`]
		});
	}
	if (values.essentialCookies || values.consentCookies) {
		const paragraphs = [];
		if (values.essentialCookies) paragraphs.push(de ? "Diese Website verwendet technisch notwendige Cookies. Sie sind erforderlich, damit die Seite funktioniert, etwa um eine Sitzung zu halten oder eine Formulareingabe abzusichern. Rechtsgrundlage ist § 25 Abs. 2 Nr. 2 TDDDG in Verbindung mit Art. 6 Abs. 1 lit. f DSGVO." : "This website uses technically necessary cookies. They are required for the site to work, for instance to maintain a session or to secure a form submission. The legal basis is section 25 (2) no. 2 TDDDG in conjunction with Article 6 (1) (f) GDPR.");
		if (values.consentCookies) {
			const tool = clean(values.consentTool);
			paragraphs.push(de ? `Darüber hinaus setzen wir Cookies und vergleichbare Techniken ein, die nicht technisch notwendig sind. Sie werden erst gesetzt, nachdem Sie eingewilligt haben${tool ? ` — die Einwilligung holen wir über ${tool} ein` : ""}. Rechtsgrundlage ist § 25 Abs. 1 TDDDG in Verbindung mit Art. 6 Abs. 1 lit. a DSGVO. Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.` : `We also use cookies and comparable technologies that are not technically necessary. They are only set once you have given consent${tool ? ` — we obtain that consent through ${tool}` : ""}. The legal basis is section 25 (1) TDDDG in conjunction with Article 6 (1) (a) GDPR. You can withdraw your consent at any time with effect for the future.`);
		}
		sections.push({
			heading: de ? "Cookies" : "Cookies",
			paragraphs
		});
	}
	if (values.analytics) {
		const tool = analyticsLabel(values);
		sections.push({
			heading: de ? "Webanalyse" : "Web analytics",
			paragraphs: [de ? `Wir werten die Nutzung dieser Website mit ${tool} aus, um zu erkennen, welche Inhalte gefunden und gelesen werden, und um das Angebot darauf einzurichten.` : `We analyse the use of this website with ${tool} in order to understand which content is found and read, and to shape our offering accordingly.`, de ? "Die Auswertung findet nur statt, wenn Sie eingewilligt haben. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO in Verbindung mit § 25 Abs. 1 TDDDG. Sie können die Einwilligung jederzeit widerrufen; die Rechtmäßigkeit der bis dahin erfolgten Verarbeitung bleibt davon unberührt." : "The analysis only takes place if you have given consent. The legal basis is Article 6 (1) (a) GDPR in conjunction with section 25 (1) TDDDG. You can withdraw your consent at any time; the lawfulness of processing carried out until then is unaffected."]
		});
	}
	if (values.newsletter) {
		const provider = clean(values.newsletterProvider);
		sections.push({
			heading: de ? "Newsletter" : "Newsletter",
			paragraphs: [de ? `Für den Versand unseres Newsletters benötigen wir Ihre E-Mail-Adresse. Die Anmeldung erfolgt im Bestätigungsverfahren: Nach der Eintragung senden wir Ihnen eine E-Mail, in der Sie die Anmeldung bestätigen${provider ? `. Für den Versand nutzen wir ${provider}` : ""}.` : `We need your email address in order to send our newsletter. Registration uses a confirmed opt-in: after you sign up we send you an email in which you confirm the subscription${provider ? `. We use ${provider} to send it` : ""}.`, de ? "Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO. Sie können den Newsletter jederzeit abbestellen, etwa über den Abmeldelink in jeder Ausgabe. Nach der Abmeldung löschen wir Ihre Adresse aus dem Verteiler." : "The legal basis is Article 6 (1) (a) GDPR. You can unsubscribe at any time, for example using the link in every issue. After you unsubscribe we delete your address from the distribution list."]
		});
	}
	if (values.maps) {
		const service = mapsLabel(values);
		sections.push({
			heading: de ? "Kartendienst" : "Map service",
			paragraphs: [de ? `Zur Darstellung unseres Standorts binden wir ${service} ein. Beim Laden der Karte wird Ihre IP-Adresse an den Anbieter übermittelt, der sie technisch benötigt, um die Kartenausschnitte an Ihr Gerät auszuliefern.` : `We embed ${service} to show our location. When the map loads, your IP address is transmitted to the provider, which technically needs it in order to deliver the map tiles to your device.`, de ? "Die Karte wird erst nach Ihrer Einwilligung geladen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO in Verbindung mit § 25 Abs. 1 TDDDG." : "The map is only loaded after you have given consent. The legal basis is Article 6 (1) (a) GDPR in conjunction with section 25 (1) TDDDG."]
		});
	}
	if (values.webfonts) sections.push({
		heading: de ? "Schriftarten" : "Web fonts",
		paragraphs: [values.fontsMode === "local" ? de ? "Die auf dieser Website verwendeten Schriftarten liegen auf unserem eigenen Server und werden von dort ausgeliefert. Eine Verbindung zu einem Server Dritter wird dabei nicht aufgebaut, und es werden keine Daten an einen Schriftanbieter übermittelt." : "The fonts used on this website are stored on our own server and delivered from there. No connection to a third-party server is established, and no data is transmitted to a font provider." : de ? "Diese Website bindet Schriftarten von Google Fonts ein. Beim Aufruf einer Seite lädt Ihr Browser die Schriften von einem Server des Anbieters; dabei wird Ihre IP-Adresse übermittelt. Die Einbindung erfolgt erst nach Ihrer Einwilligung; Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO in Verbindung mit § 25 Abs. 1 TDDDG." : "This website embeds fonts from Google Fonts. When a page is opened, your browser loads the fonts from a server operated by the provider, transmitting your IP address in the process. The fonts are only embedded after you have given consent; the legal basis is Article 6 (1) (a) GDPR in conjunction with section 25 (1) TDDDG."]
	});
	if (values.videos) {
		const provider = clean(values.videoProvider) || (de ? "einem externen Anbieter" : "an external provider");
		sections.push({
			heading: de ? "Eingebettete Videos" : "Embedded videos",
			paragraphs: [de ? `Wir binden Videos von ${provider} ein. Ein Video wird erst geladen, nachdem Sie es angefordert und in die Einbindung eingewilligt haben. Mit dem Laden wird eine Verbindung zu den Servern des Anbieters aufgebaut, wobei unter anderem Ihre IP-Adresse übermittelt wird.` : `We embed videos from ${provider}. A video is only loaded once you have requested it and consented to the embedding. Loading it establishes a connection to the provider's servers, transmitting your IP address among other data.`, de ? "Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO in Verbindung mit § 25 Abs. 1 TDDDG." : "The legal basis is Article 6 (1) (a) GDPR in conjunction with section 25 (1) TDDDG."]
		});
	}
	if (values.socialProfiles || values.socialPlugins) {
		const paragraphs = [];
		const networks = clean(values.socialNetworks);
		if (values.socialProfiles) paragraphs.push(de ? `Wir unterhalten Profile in sozialen Netzwerken${networks ? ` (${networks})` : ""}. Wenn Sie ein solches Profil besuchen, verarbeitet der jeweilige Anbieter Ihre Daten in eigener Verantwortung nach seinen eigenen Bestimmungen. Auf diese Verarbeitung haben wir keinen Einfluss. Für die Verarbeitung, die wir gemeinsam mit dem Anbieter zu verantworten haben, ist Rechtsgrundlage Art. 6 Abs. 1 lit. f DSGVO.` : `We maintain profiles on social networks${networks ? ` (${networks})` : ""}. If you visit such a profile, the respective provider processes your data on its own responsibility and under its own terms. We have no influence over that processing. For the processing for which we are jointly responsible with the provider, the legal basis is Article 6 (1) (f) GDPR.`);
		if (values.socialPlugins) paragraphs.push(de ? "Auf unseren Seiten sind Schaltflächen sozialer Netzwerke eingebunden. Sie stellen erst dann eine Verbindung zum jeweiligen Netzwerk her, wenn Sie sie aktiv anklicken; ohne diesen Klick werden keine Daten an das Netzwerk übertragen. Rechtsgrundlage für die anschließende Verarbeitung ist Art. 6 Abs. 1 lit. a DSGVO." : "Our pages contain buttons for social networks. They only establish a connection to the respective network once you actively click them; without that click, no data is transmitted to the network. The legal basis for the subsequent processing is Article 6 (1) (a) GDPR.");
		sections.push({
			heading: de ? "Soziale Netzwerke" : "Social networks",
			paragraphs
		});
	}
	if (values.shop) {
		const payments = clean(values.paymentProviders);
		sections.push({
			heading: de ? "Bestellungen und Zahlungsabwicklung" : "Orders and payment processing",
			paragraphs: [de ? "Wenn Sie bei uns bestellen, verarbeiten wir die dafür erforderlichen Daten — Bestand, Anschrift, Kontaktdaten und die Angaben zur gewählten Zahlungsart. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO." : "When you place an order with us, we process the data required to do so: the items ordered, your address, your contact details and the information relating to the chosen payment method. The legal basis is Article 6 (1) (b) GDPR.", de ? `Die Zahlungsabwicklung erfolgt über Zahlungsdienstleister${payments ? ` (${payments})` : ""}, die die für die Zahlung erforderlichen Daten in eigener Verantwortung verarbeiten. Handels- und steuerrechtliche Aufbewahrungsfristen bleiben unberührt.` : `Payments are processed by payment service providers${payments ? ` (${payments})` : ""}, which process the data required for the payment on their own responsibility. Commercial and tax retention periods remain unaffected.`]
		});
	}
	if (values.booking) {
		const provider = clean(values.bookingProvider);
		sections.push({
			heading: de ? "Termin- und Buchungssystem" : "Appointment and booking system",
			paragraphs: [de ? `Für die Vereinbarung von Terminen setzen wir ein Buchungssystem ein${provider ? ` (${provider})` : ""}. Verarbeitet werden die Angaben, die Sie im Buchungsformular machen, sowie der gewünschte Termin. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.` : `We use a booking system to arrange appointments${provider ? ` (${provider})` : ""}. We process the details you enter in the booking form and the requested appointment. The legal basis is Article 6 (1) (b) GDPR.`]
		});
	}
	if (values.liveChat) {
		const provider = clean(values.chatProvider);
		sections.push({
			heading: de ? "Chat" : "Chat",
			paragraphs: [de ? `Auf unserer Website können Sie uns über einen Chat erreichen${provider ? ` (${provider})` : ""}. Der Chatverlauf und die dabei gemachten Angaben werden gespeichert, um Ihr Anliegen zu bearbeiten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b beziehungsweise lit. f DSGVO.` : `You can reach us through a chat on our website${provider ? ` (${provider})` : ""}. The conversation and the details you provide are stored in order to deal with your request. The legal basis is Article 6 (1) (b) or (f) GDPR.`]
		});
	}
	if (values.cdn) {
		const provider = clean(values.cdnProvider);
		sections.push({
			heading: de ? "Content Delivery Network" : "Content delivery network",
			paragraphs: [de ? `Wir liefern Teile dieser Website über ein Content Delivery Network aus${provider ? ` (${provider})` : ""}. Dabei wird Ihre IP-Adresse an den Anbieter übermittelt, der sie technisch benötigt, um die Inhalte auszuliefern. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt in einer schnellen und sicheren Auslieferung.` : `We deliver parts of this website through a content delivery network${provider ? ` (${provider})` : ""}. Your IP address is transmitted to the provider, which technically needs it in order to deliver the content. The legal basis is Article 6 (1) (f) GDPR; our legitimate interest lies in fast and secure delivery.`]
		});
	}
	if (values.applications) sections.push({
		heading: de ? "Bewerbungen" : "Job applications",
		paragraphs: [de ? "Wenn Sie sich bei uns bewerben, verarbeiten wir Ihre Bewerbungsunterlagen zur Durchführung des Bewerbungsverfahrens. Rechtsgrundlage ist § 26 Abs. 1 BDSG in Verbindung mit Art. 6 Abs. 1 lit. b DSGVO." : "If you apply to us, we process your application documents in order to carry out the application procedure. The legal basis is section 26 (1) BDSG in conjunction with Article 6 (1) (b) GDPR.", de ? "Kommt es nicht zu einer Einstellung, löschen wir die Unterlagen sechs Monate nach Abschluss des Verfahrens, sofern Sie einer längeren Aufbewahrung nicht zugestimmt haben." : "If no employment relationship comes about, we delete the documents six months after the procedure has ended, unless you have agreed to longer storage."]
	});
	if (values.thirdCountry) sections.push({
		heading: de ? "Übermittlung in Drittländer" : "Transfers to third countries",
		paragraphs: [de ? `Einzelne der oben genannten Verarbeitungen bringen eine Übermittlung personenbezogener Daten in ein Land außerhalb der Europäischen Union mit sich: ${clean(values.thirdCountryDetails)}` : `Some of the processing described above involves transferring personal data to a country outside the European Union: ${clean(values.thirdCountryDetails)}`, de ? "Soweit für das Zielland kein Angemessenheitsbeschluss der Europäischen Kommission vorliegt, stützen wir die Übermittlung auf Standardvertragsklauseln nach Art. 46 Abs. 2 lit. c DSGVO oder auf Ihre ausdrückliche Einwilligung nach Art. 49 Abs. 1 lit. a DSGVO." : "Where no adequacy decision of the European Commission exists for the destination country, we base the transfer on standard contractual clauses pursuant to Article 46 (2) (c) GDPR or on your explicit consent pursuant to Article 49 (1) (a) GDPR."]
	});
	sections.push({
		heading: de ? "Speicherdauer" : "Storage period",
		paragraphs: [clean(values.retention) || (de ? "Nach dem Grundsatz der Speicherbegrenzung (Art. 5 Abs. 1 lit. e DSGVO) speichern wir personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck erforderlich ist. Danach löschen wir sie, es sei denn, gesetzliche Aufbewahrungsfristen — insbesondere aus dem Handels- und Steuerrecht — verpflichten uns zu einer längeren Speicherung." : "Under the storage limitation principle (Article 5 (1) (e) GDPR) we store personal data only for as long as is necessary for the respective purpose. After that we delete it, unless statutory retention periods — in particular under commercial and tax law — oblige us to store it for longer.")]
	});
	sections.push({
		heading: de ? "Ihre Rechte" : "Your rights",
		paragraphs: de ? ["Sie haben das Recht auf Auskunft über die zu Ihnen gespeicherten Daten (Art. 15 DSGVO), auf Berichtigung unrichtiger Daten (Art. 16 DSGVO), auf Löschung (Art. 17 DSGVO), auf Einschränkung der Verarbeitung (Art. 18 DSGVO) und auf Datenübertragbarkeit (Art. 20 DSGVO).", "Verarbeiten wir Daten auf Grundlage eines berechtigten Interesses, können Sie der Verarbeitung nach Art. 21 DSGVO widersprechen. Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen; die Rechtmäßigkeit der bis dahin erfolgten Verarbeitung bleibt davon unberührt."] : ["You have the right to obtain information about the data stored about you (Article 15 GDPR), to have inaccurate data corrected (Article 16 GDPR), to erasure (Article 17 GDPR), to restriction of processing (Article 18 GDPR) and to data portability (Article 20 GDPR).", "Where we process data on the basis of a legitimate interest, you may object to that processing under Article 21 GDPR. You can withdraw consent you have given at any time with effect for the future; the lawfulness of processing carried out until then is unaffected."]
	});
	const authority = clean(values.supervisoryAuthority);
	sections.push({
		heading: de ? "Beschwerderecht bei einer Aufsichtsbehörde" : "Right to lodge a complaint",
		paragraphs: [de ? `Unabhängig von anderen Rechtsbehelfen steht Ihnen ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu (Art. 77 DSGVO). Zuständig ist die Behörde Ihres gewöhnlichen Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes${authority ? `. Für uns zuständig ist: ${authority}` : ""}.` : `Irrespective of other remedies, you have the right to lodge a complaint with a data protection supervisory authority (Article 77 GDPR). The competent authority is the one at your habitual residence, your place of work or the place of the alleged infringement${authority ? `. The authority responsible for us is: ${authority}` : ""}.`]
	});
	sections.push({
		heading: de ? "Verschlüsselte Übertragung" : "Encrypted transmission",
		paragraphs: [de ? "Diese Website nutzt eine verschlüsselte Verbindung (TLS). Sie erkennen das an der Adresszeile Ihres Browsers, die mit https:// beginnt. Bei aktiver Verschlüsselung können die Daten, die Sie an uns übermitteln, von Dritten nicht mitgelesen werden." : "This website uses an encrypted connection (TLS). You can recognise it by the address bar of your browser, which begins with https://. While encryption is active, the data you transmit to us cannot be read by third parties."]
	});
	return sections;
}
// node_modules/@tracht-digital-solutions/tds-tool-legal/islands/PrivacyPolicyGenerator.tsx
/** Deutsch ist der Default, hier wie in der Shell. */
var STRINGS$16 = {
	de: {
		controller: "Verantwortlicher",
		company: "Name oder Firma",
		street: "Straße und Hausnummer",
		postalCode: "PLZ",
		city: "Ort",
		country: "Land",
		phone: "Telefon",
		email: "E-Mail",
		website: "Website",
		dpo: "Datenschutzbeauftragte Person benannt",
		dpoHint: "Pflicht etwa bei umfangreicher Verarbeitung besonderer Datenkategorien.",
		dpoName: "Name",
		dpoContact: "Kontakt",
		supervisoryAuthority: "Zuständige Aufsichtsbehörde",
		supervisoryHint: "Die Behörde des Bundeslands, in dem der Betrieb sitzt.",
		basics: "Betrieb der Website",
		hosting: "Website wird extern gehostet",
		hostingProvider: "Hosting-Anbieter",
		hostingCountry: "Standort der Server",
		serverLogs: "Server-Logdateien werden geführt",
		serverLogsHint: "Das ist bei nahezu jedem Hoster der Fall.",
		communication: "Kontaktwege",
		contactForm: "Kontaktformular",
		emailContact: "Kontakt per E-Mail",
		phoneContact: "Kontakt per Telefon",
		tracking: "Cookies und Auswertung",
		essentialCookies: "Technisch notwendige Cookies",
		essentialHint: "Etwa für eine Sitzung oder den Schutz eines Formulars.",
		consentCookies: "Einwilligungspflichtige Cookies",
		consentTool: "Eingesetztes Einwilligungswerkzeug",
		analytics: "Webanalyse",
		analyticsTool: "Analysewerkzeug",
		analyticsMatomo: "Matomo",
		analyticsGa4: "Google Analytics 4",
		analyticsOther: "Anderes Werkzeug",
		analyticsName: "Name des Werkzeugs",
		embedded: "Eingebundene Dienste",
		maps: "Kartendienst eingebunden",
		mapsProvider: "Anbieter",
		mapsGoogle: "Google Maps",
		mapsOsm: "OpenStreetMap",
		mapsOther: "Anderer Anbieter",
		mapsName: "Name des Anbieters",
		webfonts: "Schriftarten von außen oder lokal",
		fontsMode: "Einbindung",
		fontsLocal: "Lokal auf dem eigenen Server",
		fontsGoogle: "Google Fonts",
		videos: "Videos eingebunden",
		videoProvider: "Videoanbieter",
		cdn: "Content Delivery Network",
		cdnProvider: "CDN-Anbieter",
		further: "Weitere Verarbeitungen",
		newsletter: "Newsletter",
		newsletterProvider: "Versandanbieter",
		socialProfiles: "Profile in sozialen Netzwerken",
		socialNetworks: "Netzwerke",
		socialPlugins: "Schaltflächen sozialer Netzwerke auf der Seite",
		socialPluginsHint: "Nur ankreuzen, wenn die Schaltflächen erst auf Klick verbinden.",
		shop: "Onlineshop oder Zahlungsabwicklung",
		paymentProviders: "Zahlungsdienstleister",
		booking: "Termin- oder Buchungssystem",
		bookingProvider: "Anbieter",
		liveChat: "Chat auf der Website",
		chatProvider: "Chat-Anbieter",
		applications: "Bewerbungen werden entgegengenommen",
		thirdCountry: "Übermittlung in ein Land außerhalb der EU",
		thirdCountryHint: "Etwa bei einem Dienstleister mit Servern in den USA.",
		thirdCountryDetails: "Welche Verarbeitung, welches Land",
		retention: "Eigene Angabe zur Speicherdauer",
		retentionHint: "Leer lassen, um den allgemeinen Absatz zu verwenden.",
		filename: "datenschutzerklaerung"
	},
	en: {
		controller: "Controller",
		company: "Name or company",
		street: "Street and number",
		postalCode: "Postcode",
		city: "Town",
		country: "Country",
		phone: "Phone",
		email: "Email",
		website: "Website",
		dpo: "Data protection officer appointed",
		dpoHint: "Required for instance where special categories of data are processed at scale.",
		dpoName: "Name",
		dpoContact: "Contact",
		supervisoryAuthority: "Competent supervisory authority",
		supervisoryHint: "The authority of the federal state your business is based in.",
		basics: "Running the website",
		hosting: "Website is hosted externally",
		hostingProvider: "Hosting provider",
		hostingCountry: "Location of the servers",
		serverLogs: "Server log files are kept",
		serverLogsHint: "That is the case with virtually every host.",
		communication: "Contact channels",
		contactForm: "Contact form",
		emailContact: "Contact by email",
		phoneContact: "Contact by telephone",
		tracking: "Cookies and analysis",
		essentialCookies: "Technically necessary cookies",
		essentialHint: "For example for a session or to protect a form.",
		consentCookies: "Cookies requiring consent",
		consentTool: "Consent tool in use",
		analytics: "Web analytics",
		analyticsTool: "Analytics tool",
		analyticsMatomo: "Matomo",
		analyticsGa4: "Google Analytics 4",
		analyticsOther: "Another tool",
		analyticsName: "Name of the tool",
		embedded: "Embedded services",
		maps: "Map service embedded",
		mapsProvider: "Provider",
		mapsGoogle: "Google Maps",
		mapsOsm: "OpenStreetMap",
		mapsOther: "Another provider",
		mapsName: "Name of the provider",
		webfonts: "Web fonts, external or local",
		fontsMode: "How they are embedded",
		fontsLocal: "Locally, from our own server",
		fontsGoogle: "Google Fonts",
		videos: "Videos embedded",
		videoProvider: "Video provider",
		cdn: "Content delivery network",
		cdnProvider: "CDN provider",
		further: "Further processing",
		newsletter: "Newsletter",
		newsletterProvider: "Sending provider",
		socialProfiles: "Profiles on social networks",
		socialNetworks: "Networks",
		socialPlugins: "Social network buttons on the site",
		socialPluginsHint: "Only tick this if the buttons connect on click, not on load.",
		shop: "Online shop or payment processing",
		paymentProviders: "Payment service providers",
		booking: "Appointment or booking system",
		bookingProvider: "Provider",
		liveChat: "Chat on the website",
		chatProvider: "Chat provider",
		applications: "Job applications are received",
		thirdCountry: "Transfer to a country outside the EU",
		thirdCountryHint: "For example a provider with servers in the United States.",
		thirdCountryDetails: "Which processing, which country",
		retention: "Own wording on the storage period",
		retentionHint: "Leave empty to use the general paragraph.",
		filename: "privacy-policy"
	}
};
function PrivacyPolicyGenerator({ lang = "de" }) {
	const t = STRINGS$16[lang];
	const [values, setValues] = useState(emptyPrivacy);
	const set = (key, value) => setValues((prev) => ({
		...prev,
		[key]: value
	}));
	const setProvider = (key, value) => setValues((prev) => ({
		...prev,
		provider: {
			...prev.provider,
			[key]: value
		}
	}));
	const sections = useMemo(() => buildPrivacySections(values, lang), [values, lang]);
	const missing = useMemo(() => missingPrivacyFields(values, lang), [values, lang]);
	return /* @__PURE__ */ jsxs("div", {
		className: "privacy-tool space-y-6",
		children: [
			/* @__PURE__ */ jsx(Disclaimer, { lang }),
			/* @__PURE__ */ jsxs(Group, {
				title: t.controller,
				children: [
					/* @__PURE__ */ jsx(Field$1, {
						label: t.company,
						required: true,
						value: values.provider.company,
						onChange: (value) => setProvider("company", value)
					}),
					/* @__PURE__ */ jsx(Field$1, {
						label: t.street,
						required: true,
						value: values.provider.street,
						onChange: (value) => setProvider("street", value)
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ jsx(Field$1, {
								label: t.postalCode,
								required: true,
								value: values.provider.postalCode,
								onChange: (value) => setProvider("postalCode", value)
							}),
							/* @__PURE__ */ jsx(Field$1, {
								label: t.city,
								required: true,
								value: values.provider.city,
								onChange: (value) => setProvider("city", value)
							}),
							/* @__PURE__ */ jsx(Field$1, {
								label: t.country,
								value: values.provider.country,
								onChange: (value) => setProvider("country", value)
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ jsx(Field$1, {
								label: t.phone,
								type: "tel",
								value: values.provider.phone,
								onChange: (value) => setProvider("phone", value)
							}),
							/* @__PURE__ */ jsx(Field$1, {
								label: t.email,
								type: "email",
								required: true,
								value: values.provider.email,
								onChange: (value) => setProvider("email", value)
							}),
							/* @__PURE__ */ jsx(Field$1, {
								label: t.website,
								type: "url",
								value: values.provider.website,
								onChange: (value) => setProvider("website", value)
							})
						]
					}),
					/* @__PURE__ */ jsx(Check, {
						label: t.dpo,
						hint: t.dpoHint,
						checked: values.hasDpo,
						onChange: (checked) => set("hasDpo", checked)
					}),
					values.hasDpo && /* @__PURE__ */ jsxs("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ jsx(Field$1, {
							label: t.dpoName,
							value: values.dpoName,
							onChange: (value) => set("dpoName", value)
						}), /* @__PURE__ */ jsx(Field$1, {
							label: t.dpoContact,
							value: values.dpoContact,
							onChange: (value) => set("dpoContact", value)
						})]
					}),
					/* @__PURE__ */ jsx(Field$1, {
						label: t.supervisoryAuthority,
						hint: t.supervisoryHint,
						value: values.supervisoryAuthority,
						onChange: (value) => set("supervisoryAuthority", value)
					})
				]
			}),
			/* @__PURE__ */ jsxs(Group, {
				title: t.basics,
				children: [
					/* @__PURE__ */ jsx(Check, {
						label: t.hosting,
						checked: values.hosting,
						onChange: (checked) => set("hosting", checked)
					}),
					values.hosting && /* @__PURE__ */ jsxs("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ jsx(Field$1, {
							label: t.hostingProvider,
							value: values.hostingProvider,
							onChange: (value) => set("hostingProvider", value)
						}), /* @__PURE__ */ jsx(Field$1, {
							label: t.hostingCountry,
							value: values.hostingCountry,
							onChange: (value) => set("hostingCountry", value)
						})]
					}),
					/* @__PURE__ */ jsx(Check, {
						label: t.serverLogs,
						hint: t.serverLogsHint,
						checked: values.serverLogs,
						onChange: (checked) => set("serverLogs", checked)
					})
				]
			}),
			/* @__PURE__ */ jsxs(Group, {
				title: t.communication,
				children: [
					/* @__PURE__ */ jsx(Check, {
						label: t.contactForm,
						checked: values.contactForm,
						onChange: (checked) => set("contactForm", checked)
					}),
					/* @__PURE__ */ jsx(Check, {
						label: t.emailContact,
						checked: values.emailContact,
						onChange: (checked) => set("emailContact", checked)
					}),
					/* @__PURE__ */ jsx(Check, {
						label: t.phoneContact,
						checked: values.phoneContact,
						onChange: (checked) => set("phoneContact", checked)
					})
				]
			}),
			/* @__PURE__ */ jsxs(Group, {
				title: t.tracking,
				children: [
					/* @__PURE__ */ jsx(Check, {
						label: t.essentialCookies,
						hint: t.essentialHint,
						checked: values.essentialCookies,
						onChange: (checked) => set("essentialCookies", checked)
					}),
					/* @__PURE__ */ jsx(Check, {
						label: t.consentCookies,
						checked: values.consentCookies,
						onChange: (checked) => set("consentCookies", checked)
					}),
					values.consentCookies && /* @__PURE__ */ jsx(Field$1, {
						label: t.consentTool,
						value: values.consentTool,
						onChange: (value) => set("consentTool", value)
					}),
					/* @__PURE__ */ jsx(Check, {
						label: t.analytics,
						checked: values.analytics,
						onChange: (checked) => set("analytics", checked)
					}),
					values.analytics && /* @__PURE__ */ jsxs("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ jsx(Choice, {
							label: t.analyticsTool,
							value: values.analyticsTool,
							onChange: (value) => set("analyticsTool", value),
							options: [
								{
									value: "matomo",
									label: t.analyticsMatomo
								},
								{
									value: "ga4",
									label: t.analyticsGa4
								},
								{
									value: "other",
									label: t.analyticsOther
								}
							]
						}), values.analyticsTool === "other" && /* @__PURE__ */ jsx(Field$1, {
							label: t.analyticsName,
							value: values.analyticsName,
							onChange: (value) => set("analyticsName", value)
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs(Group, {
				title: t.embedded,
				children: [
					/* @__PURE__ */ jsx(Check, {
						label: t.maps,
						checked: values.maps,
						onChange: (checked) => set("maps", checked)
					}),
					values.maps && /* @__PURE__ */ jsxs("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ jsx(Choice, {
							label: t.mapsProvider,
							value: values.mapsProvider,
							onChange: (value) => set("mapsProvider", value),
							options: [
								{
									value: "osm",
									label: t.mapsOsm
								},
								{
									value: "google",
									label: t.mapsGoogle
								},
								{
									value: "other",
									label: t.mapsOther
								}
							]
						}), values.mapsProvider === "other" && /* @__PURE__ */ jsx(Field$1, {
							label: t.mapsName,
							value: values.mapsName,
							onChange: (value) => set("mapsName", value)
						})]
					}),
					/* @__PURE__ */ jsx(Check, {
						label: t.webfonts,
						checked: values.webfonts,
						onChange: (checked) => set("webfonts", checked)
					}),
					values.webfonts && /* @__PURE__ */ jsx(Choice, {
						label: t.fontsMode,
						value: values.fontsMode,
						onChange: (value) => set("fontsMode", value),
						options: [{
							value: "local",
							label: t.fontsLocal
						}, {
							value: "google",
							label: t.fontsGoogle
						}]
					}),
					/* @__PURE__ */ jsx(Check, {
						label: t.videos,
						checked: values.videos,
						onChange: (checked) => set("videos", checked)
					}),
					values.videos && /* @__PURE__ */ jsx(Field$1, {
						label: t.videoProvider,
						value: values.videoProvider,
						onChange: (value) => set("videoProvider", value)
					}),
					/* @__PURE__ */ jsx(Check, {
						label: t.cdn,
						checked: values.cdn,
						onChange: (checked) => set("cdn", checked)
					}),
					values.cdn && /* @__PURE__ */ jsx(Field$1, {
						label: t.cdnProvider,
						value: values.cdnProvider,
						onChange: (value) => set("cdnProvider", value)
					})
				]
			}),
			/* @__PURE__ */ jsxs(Group, {
				title: t.further,
				children: [
					/* @__PURE__ */ jsx(Check, {
						label: t.newsletter,
						checked: values.newsletter,
						onChange: (checked) => set("newsletter", checked)
					}),
					values.newsletter && /* @__PURE__ */ jsx(Field$1, {
						label: t.newsletterProvider,
						value: values.newsletterProvider,
						onChange: (value) => set("newsletterProvider", value)
					}),
					/* @__PURE__ */ jsx(Check, {
						label: t.socialProfiles,
						checked: values.socialProfiles,
						onChange: (checked) => set("socialProfiles", checked)
					}),
					values.socialProfiles && /* @__PURE__ */ jsx(Field$1, {
						label: t.socialNetworks,
						value: values.socialNetworks,
						onChange: (value) => set("socialNetworks", value)
					}),
					/* @__PURE__ */ jsx(Check, {
						label: t.socialPlugins,
						hint: t.socialPluginsHint,
						checked: values.socialPlugins,
						onChange: (checked) => set("socialPlugins", checked)
					}),
					/* @__PURE__ */ jsx(Check, {
						label: t.shop,
						checked: values.shop,
						onChange: (checked) => set("shop", checked)
					}),
					values.shop && /* @__PURE__ */ jsx(Field$1, {
						label: t.paymentProviders,
						value: values.paymentProviders,
						onChange: (value) => set("paymentProviders", value)
					}),
					/* @__PURE__ */ jsx(Check, {
						label: t.booking,
						checked: values.booking,
						onChange: (checked) => set("booking", checked)
					}),
					values.booking && /* @__PURE__ */ jsx(Field$1, {
						label: t.bookingProvider,
						value: values.bookingProvider,
						onChange: (value) => set("bookingProvider", value)
					}),
					/* @__PURE__ */ jsx(Check, {
						label: t.liveChat,
						checked: values.liveChat,
						onChange: (checked) => set("liveChat", checked)
					}),
					values.liveChat && /* @__PURE__ */ jsx(Field$1, {
						label: t.chatProvider,
						value: values.chatProvider,
						onChange: (value) => set("chatProvider", value)
					}),
					/* @__PURE__ */ jsx(Check, {
						label: t.applications,
						checked: values.applications,
						onChange: (checked) => set("applications", checked)
					}),
					/* @__PURE__ */ jsx(Check, {
						label: t.thirdCountry,
						hint: t.thirdCountryHint,
						checked: values.thirdCountry,
						onChange: (checked) => set("thirdCountry", checked)
					}),
					values.thirdCountry && /* @__PURE__ */ jsx(Area, {
						label: t.thirdCountryDetails,
						rows: 3,
						value: values.thirdCountryDetails,
						onChange: (value) => set("thirdCountryDetails", value)
					}),
					/* @__PURE__ */ jsx(Area, {
						label: t.retention,
						hint: t.retentionHint,
						rows: 3,
						value: values.retention,
						onChange: (value) => set("retention", value)
					})
				]
			}),
			/* @__PURE__ */ jsx(DocumentOutput, {
				lang,
				title: privacyTitle(lang),
				sections,
				missing,
				filenameBase: t.filename
			})
		]
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-legal/tools/PrivacyPolicyGenerator.astro
createAstro("https://tools.tracht-digital.de");
var $$PrivacyPolicyGenerator = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PrivacyPolicyGenerator;
	const { lang = "de" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="tool tool--privacy">${renderComponent($$result, "PrivacyPolicyGenerator", PrivacyPolicyGenerator, {
		"client:load": true,
		"lang": lang,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-legal/islands/PrivacyPolicyGenerator.tsx",
		"client:component-export": "default"
	})}</div>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-legal/tools/PrivacyPolicyGenerator.astro", void 0);
// node_modules/@tracht-digital-solutions/tds-tool-legal/islands/imprint.ts
var emptyImprint = {
	provider: {
		...emptyProvider,
		country: "Deutschland"
	},
	legalForm: "sole",
	registered: false,
	registerCourt: "",
	registerNumber: "",
	vatRegistered: false,
	vatId: "",
	regulatedProfession: false,
	professionTitle: "",
	chamber: "",
	professionState: "",
	professionRules: "",
	professionRulesUrl: "",
	hasSupervisoryAuthority: false,
	authorityName: "",
	authorityUrl: "",
	editorial: false,
	editorName: "",
	editorAddress: "",
	hasInsurance: false,
	insurerName: "",
	insurerAddress: "",
	insuranceScope: "",
	disputeResolution: "unwilling",
	disputeBody: "",
	includeLiability: true,
	includeCopyright: true
};
/**
* Rechtsform → ausgeschriebene Bezeichnung und die passende Beschriftung der
* Vertretung. Ein Verein hat einen Vorstand, eine GmbH eine Geschäftsführung —
* „Vertreten durch“ über beiden wäre nicht falsch, aber es liest sich wie ein
* Formular und nicht wie ein Impressum.
*/
var FORMS = {
	sole: {
		de: "Einzelunternehmen",
		en: "Sole proprietorship",
		deRep: "Inhaberin bzw. Inhaber",
		enRep: "Owner"
	},
	freelance: {
		de: "Freiberufliche Tätigkeit",
		en: "Freelance practice",
		deRep: "Inhaberin bzw. Inhaber",
		enRep: "Owner"
	},
	gbr: {
		de: "Gesellschaft bürgerlichen Rechts (GbR)",
		en: "Gesellschaft bürgerlichen Rechts (GbR)",
		deRep: "Gesellschafterinnen und Gesellschafter",
		enRep: "Partners"
	},
	ek: {
		de: "Eingetragene Kauffrau bzw. eingetragener Kaufmann (e. K.)",
		en: "Registered merchant (e. K.)",
		deRep: "Inhaberin bzw. Inhaber",
		enRep: "Owner"
	},
	ug: {
		de: "Unternehmergesellschaft (haftungsbeschränkt)",
		en: "Unternehmergesellschaft (haftungsbeschränkt)",
		deRep: "Geschäftsführung",
		enRep: "Managing directors"
	},
	gmbh: {
		de: "Gesellschaft mit beschränkter Haftung (GmbH)",
		en: "Gesellschaft mit beschränkter Haftung (GmbH)",
		deRep: "Geschäftsführung",
		enRep: "Managing directors"
	},
	"gmbh-co-kg": {
		de: "GmbH & Co. KG",
		en: "GmbH & Co. KG",
		deRep: "Vertreten durch die persönlich haftende Gesellschafterin",
		enRep: "Represented by the general partner"
	},
	ag: {
		de: "Aktiengesellschaft (AG)",
		en: "Aktiengesellschaft (AG)",
		deRep: "Vorstand",
		enRep: "Executive board"
	},
	ev: {
		de: "Eingetragener Verein (e. V.)",
		en: "Registered association (e. V.)",
		deRep: "Vorstand",
		enRep: "Board"
	}
};
/** Die Rechtsformen in der Reihenfolge, in der die Auswahlliste sie zeigt. */
var LEGAL_FORMS = [
	"sole",
	"freelance",
	"gbr",
	"ek",
	"ug",
	"gmbh",
	"gmbh-co-kg",
	"ag",
	"ev"
];
/** Anzeigename einer Rechtsform in der Sprache des Formulars. */
var legalFormLabel = (form, lang) => lang === "de" ? FORMS[form].de : FORMS[form].en;
/**
* Die Rechtsformen, die in ein Register eingetragen sind.
*
* Nur eine Vorbelegung der Ankreuzfelder, keine Sperre: eine GbR kann keine
* Handelsregisternummer haben, ein Verein aber sehr wohl eine
* Vereinsregisternummer, und die Kombinationen sind zu vielfältig, um sie
* einem Nutzer zu verbieten.
*/
var REGISTERED_FORMS = [
	"ek",
	"ug",
	"gmbh",
	"gmbh-co-kg",
	"ag",
	"ev"
];
var imprintTitle = (lang) => lang === "de" ? "Impressum" : "Legal notice";
/** Pflichtangaben, die noch fehlen — als Hinweis, nicht als Sperre. */
function missingImprintFields(values, lang) {
	const de = lang === "de";
	const missing = [];
	const p = values.provider;
	if (!clean(p.company)) missing.push(de ? "Name oder Firma" : "name or company");
	if (!clean(p.street) || !clean(p.postalCode) || !clean(p.city)) missing.push(de ? "vollständige Anschrift" : "complete address");
	if (!clean(p.email)) missing.push(de ? "E-Mail-Adresse" : "email address");
	if (values.registered && !clean(values.registerNumber)) missing.push(de ? "Registernummer" : "register number");
	if (values.vatRegistered && !clean(values.vatId)) missing.push(de ? "USt-IdNr." : "VAT ID");
	if (values.editorial && !clean(values.editorName)) missing.push(de ? "redaktionell verantwortliche Person" : "responsible editor");
	return missing;
}
/** Die Abschnitte des Impressums in der Reihenfolge, in der sie ausgegeben werden. */
function buildImprintSections(values, lang) {
	const de = lang === "de";
	const p = values.provider;
	const form = FORMS[values.legalForm];
	const sections = [];
	const identity = addressBlock(p);
	const representation = clean(p.represented) ? `${de ? form.deRep : form.enRep}: ${clean(p.represented)}` : "";
	sections.push({
		heading: de ? "Angaben gemäß § 5 DDG" : "Information pursuant to section 5 DDG",
		paragraphs: [
			identity,
			`${de ? "Rechtsform" : "Legal form"}: ${de ? form.de : form.en}`,
			representation
		]
	});
	const contact = contactBlock(p, lang);
	if (contact) sections.push({
		heading: de ? "Kontakt" : "Contact",
		paragraphs: [contact]
	});
	if (values.registered) {
		const court = clean(values.registerCourt);
		const number = clean(values.registerNumber);
		sections.push({
			heading: de ? "Registereintrag" : "Register entry",
			paragraphs: [[court && `${de ? "Registergericht" : "Registering court"}: ${court}`, number && `${de ? "Registernummer" : "Register number"}: ${number}`].filter(Boolean).join("\n")]
		});
	}
	if (values.vatRegistered) sections.push({
		heading: de ? "Umsatzsteuer-Identifikationsnummer" : "VAT identification number",
		paragraphs: [de ? `Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: ${clean(values.vatId)}` : `VAT identification number pursuant to section 27 a of the German VAT Act: ${clean(values.vatId)}`]
	});
	if (values.regulatedProfession) sections.push({
		heading: de ? "Berufsrechtliche Angaben" : "Professional regulations",
		paragraphs: [
			[
				clean(values.professionTitle) && `${de ? "Berufsbezeichnung" : "Professional title"}: ${clean(values.professionTitle)}`,
				clean(values.professionState) && `${de ? "Verliehen in" : "Awarded in"}: ${clean(values.professionState)}`,
				clean(values.chamber) && `${de ? "Zuständige Kammer" : "Competent chamber"}: ${clean(values.chamber)}`
			].filter(Boolean).join("\n"),
			clean(values.professionRules) && (de ? `Es gelten folgende berufsrechtliche Regelungen: ${clean(values.professionRules)}` : `The following professional regulations apply: ${clean(values.professionRules)}`),
			clean(values.professionRulesUrl) && (de ? `Einsehbar unter: ${clean(values.professionRulesUrl)}` : `Available at: ${clean(values.professionRulesUrl)}`)
		]
	});
	if (values.hasSupervisoryAuthority) sections.push({
		heading: de ? "Aufsichtsbehörde" : "Supervisory authority",
		paragraphs: [join([values.authorityName, values.authorityUrl], "\n")]
	});
	if (values.hasInsurance) sections.push({
		heading: de ? "Berufshaftpflichtversicherung" : "Professional indemnity insurance",
		paragraphs: [[
			clean(values.insurerName) && `${de ? "Versicherer" : "Insurer"}: ${clean(values.insurerName)}`,
			clean(values.insurerAddress),
			clean(values.insuranceScope) && `${de ? "Räumlicher Geltungsbereich" : "Geographical scope"}: ${clean(values.insuranceScope)}`
		].filter(Boolean).join("\n")]
	});
	if (values.editorial) sections.push({
		heading: de ? "Redaktionell verantwortlich nach § 18 Abs. 2 MStV" : "Editorial responsibility pursuant to section 18 (2) MStV",
		paragraphs: [join([values.editorName, values.editorAddress], "\n")]
	});
	sections.push({
		heading: de ? "Verbraucherstreitbeilegung" : "Consumer dispute resolution",
		paragraphs: [values.disputeResolution === "willing" ? de ? `Wir sind bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. Zuständig ist: ${clean(values.disputeBody)}` : `We are willing to take part in dispute resolution proceedings before a consumer arbitration board. The competent body is: ${clean(values.disputeBody)}` : de ? "Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen." : "We are neither willing nor obliged to take part in dispute resolution proceedings before a consumer arbitration board."]
	});
	if (values.includeLiability) sections.push({
		heading: de ? "Haftung für Inhalte und Verweise" : "Liability for content and links",
		paragraphs: de ? ["Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.", "Unser Angebot enthält Verweise auf Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar. Werden uns Rechtsverstöße bekannt, entfernen wir den jeweiligen Verweis umgehend."] : ["As a service provider we are responsible for our own content on these pages under the general laws. We are not, however, obliged to monitor third-party information that we transmit or store, or to investigate circumstances that indicate unlawful activity.", "Our pages contain links to third-party websites over whose content we have no control. No infringements were apparent at the time the links were created. Should we become aware of any infringement, we will remove the link without delay."]
	});
	if (values.includeCopyright) sections.push({
		heading: de ? "Urheberrecht" : "Copyright",
		paragraphs: de ? ["Die von uns erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen unserer schriftlichen Zustimmung.", "Soweit die Inhalte auf dieser Seite nicht von uns erstellt wurden, werden die Urheberrechte Dritter beachtet und entsprechend gekennzeichnet."] : ["The content and works created by us on these pages are subject to German copyright law. Reproduction, adaptation, distribution and any kind of exploitation beyond the limits of copyright require our written consent.", "Where the content on this page was not created by us, the copyright of third parties is respected and marked accordingly."]
	});
	return sections;
}
// node_modules/@tracht-digital-solutions/tds-tool-legal/islands/ImprintGenerator.tsx
/**
* Deutsch ist der Default, hier wie in der Shell. Ein Aufrufer ohne `lang`
* bekommt damit dasselbe Verhalten wie vor dem englischen Baum — und die
* gesamte deutsche Testreihe ist zugleich der Regressionstest dafür.
*/
var STRINGS$15 = {
	de: {
		provider: "Anbieter",
		company: "Name oder Firma",
		companyHint: "So, wie der Betrieb im Register oder in der Gewerbeanmeldung steht.",
		represented: "Vertretungsberechtigte Person",
		representedHint: "Bei einer GmbH die Geschäftsführung, bei einem Verein der Vorstand.",
		street: "Straße und Hausnummer",
		postalCode: "PLZ",
		city: "Ort",
		country: "Land",
		contact: "Kontakt",
		phone: "Telefon",
		email: "E-Mail",
		website: "Website",
		legalForm: "Rechtsform",
		additions: "Zusätzliche Angaben",
		registered: "Im Handels-, Vereins- oder Partnerschaftsregister eingetragen",
		registeredHint: "Steht auf dem Registerauszug.",
		registerCourt: "Registergericht",
		registerNumber: "Registernummer",
		vat: "Umsatzsteuer-Identifikationsnummer vorhanden",
		vatHint: "Nicht die Steuernummer des Finanzamts — die gehört nicht ins Impressum.",
		vatId: "USt-IdNr.",
		profession: "Reglementierter Beruf",
		professionHint: "Etwa Handwerk mit Meisterpflicht, Heilberufe, Rechts- oder Steuerberatung.",
		professionTitle: "Berufsbezeichnung",
		chamber: "Zuständige Kammer",
		professionState: "Verliehen in",
		professionRules: "Berufsrechtliche Regelungen",
		professionRulesUrl: "Fundstelle im Netz",
		authority: "Zuständige Aufsichtsbehörde angeben",
		authorityHint: "Nötig bei erlaubnispflichtigen Tätigkeiten, etwa Bewachung oder Vermittlung.",
		authorityName: "Aufsichtsbehörde",
		authorityUrl: "Website der Behörde",
		insurance: "Berufshaftpflichtversicherung angeben",
		insurerName: "Versicherer",
		insurerAddress: "Anschrift des Versicherers",
		insuranceScope: "Räumlicher Geltungsbereich",
		editorial: "Journalistisch-redaktionelle Inhalte (§ 18 Abs. 2 MStV)",
		editorialHint: "Etwa ein Blog oder ein Magazin auf der eigenen Seite.",
		editorName: "Redaktionell verantwortliche Person",
		editorAddress: "Anschrift der verantwortlichen Person",
		dispute: "Verbraucherstreitbeilegung",
		disputeUnwilling: "Wir nehmen an keinem Schlichtungsverfahren teil",
		disputeWilling: "Wir nehmen an einem Schlichtungsverfahren teil",
		disputeBody: "Zuständige Verbraucherschlichtungsstelle",
		clauses: "Freiwillige Klauseln",
		liability: "Haftung für Inhalte und Verweise anhängen",
		copyright: "Urheberrechtshinweis anhängen",
		filename: "impressum"
	},
	en: {
		provider: "Provider",
		company: "Name or company",
		companyHint: "As the business appears in the register or the trade registration.",
		represented: "Authorised representative",
		representedHint: "For a GmbH the managing director, for an association the board.",
		street: "Street and number",
		postalCode: "Postcode",
		city: "Town",
		country: "Country",
		contact: "Contact",
		phone: "Phone",
		email: "Email",
		website: "Website",
		legalForm: "Legal form",
		additions: "Additional details",
		registered: "Entered in the commercial, association or partnership register",
		registeredHint: "It is on the register extract.",
		registerCourt: "Registering court",
		registerNumber: "Register number",
		vat: "VAT identification number held",
		vatHint: "Not the tax number issued by the tax office — that does not belong here.",
		vatId: "VAT ID",
		profession: "Regulated profession",
		professionHint: "For example regulated trades, health professions, legal or tax advice.",
		professionTitle: "Professional title",
		chamber: "Competent chamber",
		professionState: "Awarded in",
		professionRules: "Professional regulations",
		professionRulesUrl: "Where they can be read",
		authority: "State the supervisory authority",
		authorityHint: "Required for licensed activities such as security services or brokerage.",
		authorityName: "Supervisory authority",
		authorityUrl: "Website of the authority",
		insurance: "State the professional indemnity insurance",
		insurerName: "Insurer",
		insurerAddress: "Address of the insurer",
		insuranceScope: "Geographical scope",
		editorial: "Journalistic and editorial content (section 18 (2) MStV)",
		editorialHint: "For example a blog or a magazine on your own site.",
		editorName: "Responsible editor",
		editorAddress: "Address of the responsible editor",
		dispute: "Consumer dispute resolution",
		disputeUnwilling: "We do not take part in arbitration proceedings",
		disputeWilling: "We do take part in arbitration proceedings",
		disputeBody: "Competent consumer arbitration board",
		clauses: "Optional clauses",
		liability: "Append liability for content and links",
		copyright: "Append a copyright notice",
		filename: "legal-notice"
	}
};
function ImprintGenerator({ lang = "de" }) {
	const t = STRINGS$15[lang];
	const [values, setValues] = useState(emptyImprint);
	const set = (key, value) => setValues((prev) => ({
		...prev,
		[key]: value
	}));
	const setProvider = (key, value) => setValues((prev) => ({
		...prev,
		provider: {
			...prev.provider,
			[key]: value
		}
	}));
	/**
	* Die Registerangabe wird beim Wechsel der Rechtsform vorbelegt, nicht
	* erzwungen: eine GmbH ohne Registereintrag gibt es nicht, aber die
	* Ankreuzung bleibt bedienbar, weil die Kombinationen zu vielfältig sind, um
	* sie einem Nutzer zu verbieten.
	*/
	const setLegalForm = (form) => setValues((prev) => ({
		...prev,
		legalForm: form,
		registered: REGISTERED_FORMS.includes(form)
	}));
	const sections = useMemo(() => buildImprintSections(values, lang), [values, lang]);
	const missing = useMemo(() => missingImprintFields(values, lang), [values, lang]);
	return /* @__PURE__ */ jsxs("div", {
		className: "imprint-tool space-y-6",
		children: [
			/* @__PURE__ */ jsx(Disclaimer, { lang }),
			/* @__PURE__ */ jsxs(Group, {
				title: t.provider,
				children: [
					/* @__PURE__ */ jsx(Choice, {
						label: t.legalForm,
						value: values.legalForm,
						onChange: setLegalForm,
						options: LEGAL_FORMS.map((form) => ({
							value: form,
							label: legalFormLabel(form, lang)
						}))
					}),
					/* @__PURE__ */ jsx(Field$1, {
						label: t.company,
						hint: t.companyHint,
						required: true,
						value: values.provider.company,
						onChange: (value) => setProvider("company", value)
					}),
					/* @__PURE__ */ jsx(Field$1, {
						label: t.represented,
						hint: t.representedHint,
						value: values.provider.represented,
						onChange: (value) => setProvider("represented", value)
					}),
					/* @__PURE__ */ jsx(Field$1, {
						label: t.street,
						required: true,
						value: values.provider.street,
						onChange: (value) => setProvider("street", value)
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ jsx(Field$1, {
								label: t.postalCode,
								required: true,
								value: values.provider.postalCode,
								onChange: (value) => setProvider("postalCode", value)
							}),
							/* @__PURE__ */ jsx(Field$1, {
								label: t.city,
								required: true,
								value: values.provider.city,
								onChange: (value) => setProvider("city", value)
							}),
							/* @__PURE__ */ jsx(Field$1, {
								label: t.country,
								value: values.provider.country,
								onChange: (value) => setProvider("country", value)
							})
						]
					})
				]
			}),
			/* @__PURE__ */ jsx(Group, {
				title: t.contact,
				children: /* @__PURE__ */ jsxs("div", {
					className: "grid gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ jsx(Field$1, {
							label: t.phone,
							type: "tel",
							value: values.provider.phone,
							onChange: (value) => setProvider("phone", value)
						}),
						/* @__PURE__ */ jsx(Field$1, {
							label: t.email,
							type: "email",
							required: true,
							value: values.provider.email,
							onChange: (value) => setProvider("email", value)
						}),
						/* @__PURE__ */ jsx(Field$1, {
							label: t.website,
							type: "url",
							value: values.provider.website,
							onChange: (value) => setProvider("website", value)
						})
					]
				})
			}),
			/* @__PURE__ */ jsxs(Group, {
				title: t.additions,
				children: [
					/* @__PURE__ */ jsx(Check, {
						label: t.registered,
						hint: t.registeredHint,
						checked: values.registered,
						onChange: (checked) => set("registered", checked)
					}),
					values.registered && /* @__PURE__ */ jsxs("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ jsx(Field$1, {
							label: t.registerCourt,
							value: values.registerCourt,
							onChange: (value) => set("registerCourt", value)
						}), /* @__PURE__ */ jsx(Field$1, {
							label: t.registerNumber,
							value: values.registerNumber,
							onChange: (value) => set("registerNumber", value)
						})]
					}),
					/* @__PURE__ */ jsx(Check, {
						label: t.vat,
						hint: t.vatHint,
						checked: values.vatRegistered,
						onChange: (checked) => set("vatRegistered", checked)
					}),
					values.vatRegistered && /* @__PURE__ */ jsx(Field$1, {
						label: t.vatId,
						value: values.vatId,
						onChange: (value) => set("vatId", value)
					}),
					/* @__PURE__ */ jsx(Check, {
						label: t.profession,
						hint: t.professionHint,
						checked: values.regulatedProfession,
						onChange: (checked) => set("regulatedProfession", checked)
					}),
					values.regulatedProfession && /* @__PURE__ */ jsxs("div", {
						className: "grid gap-3",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-3 sm:grid-cols-3",
								children: [
									/* @__PURE__ */ jsx(Field$1, {
										label: t.professionTitle,
										value: values.professionTitle,
										onChange: (value) => set("professionTitle", value)
									}),
									/* @__PURE__ */ jsx(Field$1, {
										label: t.chamber,
										value: values.chamber,
										onChange: (value) => set("chamber", value)
									}),
									/* @__PURE__ */ jsx(Field$1, {
										label: t.professionState,
										value: values.professionState,
										onChange: (value) => set("professionState", value)
									})
								]
							}),
							/* @__PURE__ */ jsx(Field$1, {
								label: t.professionRules,
								value: values.professionRules,
								onChange: (value) => set("professionRules", value)
							}),
							/* @__PURE__ */ jsx(Field$1, {
								label: t.professionRulesUrl,
								type: "url",
								value: values.professionRulesUrl,
								onChange: (value) => set("professionRulesUrl", value)
							})
						]
					}),
					/* @__PURE__ */ jsx(Check, {
						label: t.authority,
						hint: t.authorityHint,
						checked: values.hasSupervisoryAuthority,
						onChange: (checked) => set("hasSupervisoryAuthority", checked)
					}),
					values.hasSupervisoryAuthority && /* @__PURE__ */ jsxs("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ jsx(Field$1, {
							label: t.authorityName,
							value: values.authorityName,
							onChange: (value) => set("authorityName", value)
						}), /* @__PURE__ */ jsx(Field$1, {
							label: t.authorityUrl,
							type: "url",
							value: values.authorityUrl,
							onChange: (value) => set("authorityUrl", value)
						})]
					}),
					/* @__PURE__ */ jsx(Check, {
						label: t.insurance,
						checked: values.hasInsurance,
						onChange: (checked) => set("hasInsurance", checked)
					}),
					values.hasInsurance && /* @__PURE__ */ jsxs("div", {
						className: "grid gap-3",
						children: [
							/* @__PURE__ */ jsx(Field$1, {
								label: t.insurerName,
								value: values.insurerName,
								onChange: (value) => set("insurerName", value)
							}),
							/* @__PURE__ */ jsx(Field$1, {
								label: t.insurerAddress,
								value: values.insurerAddress,
								onChange: (value) => set("insurerAddress", value)
							}),
							/* @__PURE__ */ jsx(Field$1, {
								label: t.insuranceScope,
								value: values.insuranceScope,
								onChange: (value) => set("insuranceScope", value)
							})
						]
					}),
					/* @__PURE__ */ jsx(Check, {
						label: t.editorial,
						hint: t.editorialHint,
						checked: values.editorial,
						onChange: (checked) => set("editorial", checked)
					}),
					values.editorial && /* @__PURE__ */ jsxs("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ jsx(Field$1, {
							label: t.editorName,
							value: values.editorName,
							onChange: (value) => set("editorName", value)
						}), /* @__PURE__ */ jsx(Field$1, {
							label: t.editorAddress,
							value: values.editorAddress,
							onChange: (value) => set("editorAddress", value)
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs(Group, {
				title: t.dispute,
				children: [/* @__PURE__ */ jsx(Radios, {
					legend: t.dispute,
					name: "imprint-dispute",
					value: values.disputeResolution,
					onChange: (value) => set("disputeResolution", value),
					options: [{
						value: "unwilling",
						label: t.disputeUnwilling
					}, {
						value: "willing",
						label: t.disputeWilling
					}]
				}), values.disputeResolution === "willing" && /* @__PURE__ */ jsx(Area, {
					label: t.disputeBody,
					rows: 3,
					value: values.disputeBody,
					onChange: (value) => set("disputeBody", value)
				})]
			}),
			/* @__PURE__ */ jsxs(Group, {
				title: t.clauses,
				children: [/* @__PURE__ */ jsx(Check, {
					label: t.liability,
					checked: values.includeLiability,
					onChange: (checked) => set("includeLiability", checked)
				}), /* @__PURE__ */ jsx(Check, {
					label: t.copyright,
					checked: values.includeCopyright,
					onChange: (checked) => set("includeCopyright", checked)
				})]
			}),
			/* @__PURE__ */ jsx(DocumentOutput, {
				lang,
				title: imprintTitle(lang),
				sections,
				missing,
				filenameBase: t.filename
			})
		]
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-legal/tools/ImprintGenerator.astro
createAstro("https://tools.tracht-digital.de");
var $$ImprintGenerator = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ImprintGenerator;
	const { lang = "de" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="tool tool--imprint">${renderComponent($$result, "ImprintGenerator", ImprintGenerator, {
		"client:load": true,
		"lang": lang,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-legal/islands/ImprintGenerator.tsx",
		"client:component-export": "default"
	})}</div>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-legal/tools/ImprintGenerator.astro", void 0);
// node_modules/@tracht-digital-solutions/tds-tool-legal/islands/badge.ts
var CORNERS$2 = [
	"tl",
	"tr",
	"bl",
	"br"
];
var defaultBadge = {
	text: "KI-generiert",
	corner: "br",
	scale: 4,
	opacity: .75,
	style: "dark"
};
/** Vorschläge für den Badge-Text; frei überschreibbar. */
function presetTexts(lang) {
	return lang === "de" ? [
		"KI-generiert",
		"Mit KI erstellt",
		"KI-bearbeitet",
		"AI-generated"
	] : [
		"AI-generated",
		"Created with AI",
		"AI-edited",
		"KI-generiert"
	];
}
/**
* Schriftgröße aus der Bildbreite.
*
* Untergrenze 10 Pixel: darunter ist der Hinweis auf keinem Bildschirm mehr
* lesbar, und ein unlesbarer Hinweis erfüllt die Offenlegung nicht.
*/
function badgeFontSize(imageWidth, scale) {
	return Math.max(10, Math.round(imageWidth * scale / 100));
}
/**
* Lage und Größe der Fläche für einen bereits gemessenen Text.
*
* `textWidth` kommt aus `measureText` und damit aus dem Browser; die
* Platzierung darum herum ist reine Arithmetik und wird als solche geprüft.
*/
function badgeLayout(imageWidth, imageHeight, textWidth, fontSize, corner) {
	const paddingX = Math.round(fontSize * .6);
	const paddingY = Math.round(fontSize * .35);
	const width = Math.round(textWidth + paddingX * 2);
	const height = Math.round(fontSize + paddingY * 2);
	const margin = Math.round(fontSize * .6);
	const left = corner === "tl" || corner === "bl";
	const top = corner === "tl" || corner === "tr";
	const x = left ? margin : Math.max(margin, imageWidth - margin - width);
	const y = top ? margin : Math.max(margin, imageHeight - margin - height);
	return {
		x,
		y,
		width,
		height,
		radius: Math.round(height / 4),
		textX: x + paddingX,
		textY: y + paddingY + fontSize * .8
	};
}
/** Flächen- und Schriftfarbe der beiden Stile. */
function badgeColors(style, opacity) {
	const clamped = Math.min(1, Math.max(0, opacity));
	return style === "dark" ? {
		fill: `rgba(17, 24, 39, ${clamped})`,
		text: "#ffffff"
	} : {
		fill: `rgba(255, 255, 255, ${clamped})`,
		text: "#111827"
	};
}
/**
* Die Plakette auf eine Zeichenfläche bringen.
*
* Abgerundete Ecken über `roundRect`, mit Rückfall auf ein Rechteck: die
* Methode fehlt in älteren Browsern und in der Testumgebung, und ein Badge mit
* eckigen Ecken ist immer noch eine Kennzeichnung — ein Absturz nicht.
*/
function drawBadge(ctx, imageWidth, imageHeight, options) {
	const text = options.text.trim();
	if (!text) return;
	const fontSize = badgeFontSize(imageWidth, options.scale);
	ctx.font = `600 ${fontSize}px system-ui, -apple-system, "Segoe UI", sans-serif`;
	ctx.textBaseline = "alphabetic";
	const textWidth = ctx.measureText(text).width;
	const rect = badgeLayout(imageWidth, imageHeight, textWidth, fontSize, options.corner);
	const colors = badgeColors(options.style, options.opacity);
	ctx.fillStyle = colors.fill;
	const rounded = ctx;
	if (typeof rounded.roundRect === "function") {
		ctx.beginPath();
		rounded.roundRect(rect.x, rect.y, rect.width, rect.height, rect.radius);
		ctx.fill();
	} else ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
	ctx.fillStyle = colors.text;
	ctx.fillText(text, rect.textX, rect.textY);
}
/**
* Der Hinweis, der in die Datei geschrieben wird.
*
* Immer englisch beginnend, weil das die Zeichenkette ist, nach der Werkzeuge
* und Plattformen suchen; der eingegebene Badge-Text hängt hinten an, damit
* die Datei dasselbe sagt wie das Bild.
*/
function machineNote(badgeText) {
	const text = badgeText.trim();
	return text ? `AI-generated image. ${text}` : "AI-generated image.";
}
/** Ein fertiger Satz für Bildunterschrift oder Alternativtext. */
function captionFor(badgeText, lang) {
	const text = badgeText.trim() || (lang === "de" ? "KI-generiert" : "AI-generated");
	return lang === "de" ? `Dieses Bild wurde mit künstlicher Intelligenz erzeugt (${text}).` : `This image was generated using artificial intelligence (${text}).`;
}
// node_modules/@tracht-digital-solutions/tds-tool-legal/islands/metadata.ts
var table = null;
function crcTable() {
	if (table) return table;
	const built = /* @__PURE__ */ new Uint32Array(256);
	for (let n = 0; n < 256; n++) {
		let c = n;
		for (let k = 0; k < 8; k++) c = (c & 1) !== 0 ? 3988292384 ^ c >>> 1 : c >>> 1;
		built[n] = c >>> 0;
	}
	table = built;
	return built;
}
/** CRC-32 wie in PNG (RFC 1952, gespiegeltes Polynom 0xEDB88320). */
function crc32(bytes) {
	const t = crcTable();
	let c = 4294967295;
	for (let i = 0; i < bytes.length; i++) c = (t[(c ^ (bytes[i] ?? 0)) & 255] ?? 0) ^ c >>> 8;
	return (c ^ 4294967295) >>> 0;
}
/** Latin-1-Bytes, oder `null`, wenn der Text darin nicht darstellbar ist. */
function latin1(text) {
	const out = new Uint8Array(text.length);
	for (let i = 0; i < text.length; i++) {
		const code = text.charCodeAt(i);
		if (code > 255) return null;
		out[i] = code;
	}
	return out;
}
var utf8 = (text) => new TextEncoder().encode(text);
var PNG_SIGNATURE = [
	137,
	80,
	78,
	71,
	13,
	10,
	26,
	10
];
/** Trägt die Datei die PNG-Signatur? */
function isPng(bytes) {
	if (bytes.length < 8) return false;
	return PNG_SIGNATURE.every((byte, index) => bytes[index] === byte);
}
/** Beginnt die Datei mit einem JPEG-SOI-Marker? */
function isJpeg(bytes) {
	return bytes.length > 3 && bytes[0] === 255 && bytes[1] === 216;
}
/** Ein vollständiger PNG-Abschnitt: Länge, Typ, Daten, Prüfsumme. */
function pngChunk(type, data) {
	const typeBytes = /* @__PURE__ */ new Uint8Array(4);
	for (let i = 0; i < 4; i++) typeBytes[i] = type.charCodeAt(i);
	const out = new Uint8Array(12 + data.length);
	const view = new DataView(out.buffer);
	view.setUint32(0, data.length);
	out.set(typeBytes, 4);
	out.set(data, 8);
	const checked = new Uint8Array(4 + data.length);
	checked.set(typeBytes, 0);
	checked.set(data, 4);
	view.setUint32(8 + data.length, crc32(checked));
	return out;
}
/**
* Ein Textabschnitt für PNG.
*
* `tEXt` speichert Latin-1 und wird von jedem Betrachter gelesen; sobald der
* Text ein Zeichen außerhalb davon enthält, wird daraus ein `iTXt` mit UTF-8.
* Ein `tEXt` mit abgeschnittenen Zeichen wäre die schlechtere Variante: der
* Hinweis stünde dann zwar in der Datei, aber verstümmelt.
*/
function pngTextChunk(keyword, text) {
	const keywordBytes = latin1(keyword.slice(0, 79));
	const textBytes = latin1(text);
	if (keywordBytes && textBytes) {
		const data = new Uint8Array(keywordBytes.length + 1 + textBytes.length);
		data.set(keywordBytes, 0);
		data[keywordBytes.length] = 0;
		data.set(textBytes, keywordBytes.length + 1);
		return pngChunk("tEXt", data);
	}
	const kw = keywordBytes ?? utf8(keyword.slice(0, 79));
	const body = utf8(text);
	const data = new Uint8Array(kw.length + 5 + body.length);
	data.set(kw, 0);
	data[kw.length] = 0;
	data[kw.length + 1] = 0;
	data[kw.length + 2] = 0;
	data[kw.length + 3] = 0;
	data[kw.length + 4] = 0;
	data.set(body, kw.length + 5);
	return pngChunk("iTXt", data);
}
/**
* Textabschnitte hinter den IHDR eines PNG setzen.
*
* Hinter den IHDR, weil der PNG-Standard verlangt, dass er der erste Abschnitt
* ist — davor eingefügt wäre die Datei kaputt, und zwar in einer Weise, die
* mancher Betrachter noch anzeigt und mancher nicht. Ist die Eingabe kein PNG,
* kommt sie unverändert zurück: der Aufrufer soll nicht raten müssen.
*/
function embedPngText(bytes, entries) {
	if (!isPng(bytes) || entries.length === 0) return bytes;
	const insertAt = 20 + new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(8);
	if (insertAt > bytes.length) return bytes;
	const chunks = entries.filter((entry) => entry.keyword.trim() !== "" && entry.text.trim() !== "").map((entry) => pngTextChunk(entry.keyword, entry.text));
	if (chunks.length === 0) return bytes;
	const added = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
	const out = new Uint8Array(bytes.length + added);
	out.set(bytes.subarray(0, insertAt), 0);
	let offset = insertAt;
	for (const chunk of chunks) {
		out.set(chunk, offset);
		offset += chunk.length;
	}
	out.set(bytes.subarray(insertAt), offset);
	return out;
}
/**
* Ein Kommentarsegment (COM, 0xFFFE) direkt hinter den SOI-Marker eines JPEG.
*
* Die Segmentlänge zählt sich selbst mit und passt in zwei Bytes, also wird
* ein übermäßig langer Text gekürzt statt eine unlesbare Datei zu erzeugen.
*/
function embedJpegComment(bytes, text) {
	if (!isJpeg(bytes) || text.trim() === "") return bytes;
	let body = utf8(text);
	if (body.length > 65533) body = body.subarray(0, 65533);
	const segment = new Uint8Array(4 + body.length);
	segment[0] = 255;
	segment[1] = 254;
	const length = body.length + 2;
	segment[2] = length >> 8 & 255;
	segment[3] = length & 255;
	segment.set(body, 4);
	const out = new Uint8Array(bytes.length + segment.length);
	out.set(bytes.subarray(0, 2), 0);
	out.set(segment, 2);
	out.set(bytes.subarray(2), 2 + segment.length);
	return out;
}
/**
* Den Hinweis in das Format einbetten, das ihn tragen kann.
*
* Gibt zurück, ob das gelungen ist — die Insel sagt es dem Nutzer, statt ein
* WebP stillschweigend ohne Metadaten auszuliefern.
*/
async function embedNote(blob, note, software) {
	const bytes = new Uint8Array(await blob.arrayBuffer());
	if (isPng(bytes)) {
		const out = embedPngText(bytes, [
			{
				keyword: "Description",
				text: note
			},
			{
				keyword: "Comment",
				text: note
			},
			{
				keyword: "Software",
				text: software
			}
		]);
		return {
			blob: new Blob([out], { type: "image/png" }),
			embedded: out.length > bytes.length
		};
	}
	if (isJpeg(bytes)) {
		const out = embedJpegComment(bytes, `${note} — ${software}`);
		return {
			blob: new Blob([out], { type: "image/jpeg" }),
			embedded: out.length > bytes.length
		};
	}
	return {
		blob,
		embedded: false
	};
}
// node_modules/@tracht-digital-solutions/tds-shared/dist/dropzone/index.js
function matchesAccept(file, accept) {
	const tokens = (accept ?? "").split(",").map((t) => t.trim().toLowerCase()).filter(Boolean);
	if (tokens.length === 0) return true;
	const type = (file.type || "").toLowerCase();
	const name = file.name.toLowerCase();
	return tokens.some((t) => {
		if (t.startsWith(".")) return name.endsWith(t);
		if (t.endsWith("/*")) return type.startsWith(t.slice(0, -1));
		return type === t;
	});
}
function partitionFiles(files, accept, multiple = false) {
	const accepted = [];
	const rejected = [];
	for (const f of files) (matchesAccept(f, accept) ? accepted : rejected).push(f);
	return {
		accepted: multiple ? accepted : accepted.slice(0, 1),
		rejected
	};
}
function carriesFiles(e) {
	return Array.from(e.dataTransfer?.types ?? []).includes("Files");
}
function UploadIcon() {
	return /* @__PURE__ */ jsxs("svg", {
		className: "tds-dropzone__icon",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.75",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("path", { d: "M12 15V4" }),
			/* @__PURE__ */ jsx("path", { d: "m7.5 8.5 4.5-4.5 4.5 4.5" }),
			/* @__PURE__ */ jsx("path", { d: "M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" })
		]
	});
}
function summarise(names) {
	if (names.length <= 3) return names.join(", ");
	return `${names.slice(0, 3).join(", ")} +${names.length - 3}`;
}
function FileDropZone({ label, hint, activeLabel, accept, multiple = false, disabled = false, paste = false, onFiles, onReject, className, children }) {
	const [over, setOver] = useState(false);
	const [pageDrag, setPageDrag] = useState(false);
	const [dropped, setDropped] = useState(false);
	const [names, setNames] = useState([]);
	const hintId = useId();
	const zone = useRef(null);
	const latest = useRef({
		onFiles,
		onReject,
		accept,
		multiple,
		disabled
	});
	latest.current = {
		onFiles,
		onReject,
		accept,
		multiple,
		disabled
	};
	const take = (list) => {
		const { onFiles: give, onReject: refuse, accept: acc, multiple: many, disabled: off } = latest.current;
		if (off || list.length === 0) return;
		const { accepted, rejected } = partitionFiles(list, acc, many);
		if (rejected.length) refuse?.(rejected);
		if (accepted.length === 0) return;
		setNames(accepted.map((f) => f.name));
		setDropped(true);
		give(accepted);
	};
	useEffect(() => {
		let depth = 0;
		const enter = (e) => {
			if (!carriesFiles(e)) return;
			depth++;
			setPageDrag(true);
		};
		const leave = (e) => {
			if (!carriesFiles(e)) return;
			depth = Math.max(0, depth - 1);
			if (depth === 0) setPageDrag(false);
		};
		const end = () => {
			depth = 0;
			setPageDrag(false);
			setOver(false);
		};
		const overDoc = (e) => {
			if (carriesFiles(e)) e.preventDefault();
		};
		const dropDoc = (e) => {
			if (carriesFiles(e)) e.preventDefault();
			end();
		};
		document.addEventListener("dragenter", enter);
		document.addEventListener("dragleave", leave);
		document.addEventListener("dragover", overDoc);
		document.addEventListener("drop", dropDoc);
		document.addEventListener("dragend", end);
		return () => {
			document.removeEventListener("dragenter", enter);
			document.removeEventListener("dragleave", leave);
			document.removeEventListener("dragover", overDoc);
			document.removeEventListener("drop", dropDoc);
			document.removeEventListener("dragend", end);
		};
	}, []);
	useEffect(() => {
		const el = zone.current;
		if (!el) return;
		const done = (e) => {
			if (e.target === el) setDropped(false);
		};
		el.addEventListener("animationend", done);
		return () => el.removeEventListener("animationend", done);
	}, []);
	useEffect(() => {
		if (!paste) return;
		const onPaste = (e) => {
			if (e.target?.closest?.("input:not([type=file]), textarea, [contenteditable]")) return;
			const files = Array.from(e.clipboardData?.files ?? []);
			if (files.length === 0) return;
			e.preventDefault();
			take(files);
		};
		document.addEventListener("paste", onPaste);
		return () => document.removeEventListener("paste", onPaste);
	}, [paste]);
	const classes = ["tds-dropzone", className].filter(Boolean).join(" ");
	return /* @__PURE__ */ jsx("div", {
		ref: zone,
		className: classes,
		"data-over": over || void 0,
		"data-page-drag": pageDrag && !disabled || void 0,
		"data-dropped": dropped || void 0,
		"data-disabled": disabled || void 0,
		onDragEnter: (e) => {
			if (!carriesFiles(e) || disabled) return;
			e.preventDefault();
			setOver(true);
		},
		onDragOver: (e) => {
			if (!carriesFiles(e) || disabled) return;
			e.preventDefault();
			e.dataTransfer.dropEffect = "copy";
			setOver(true);
		},
		onDragLeave: (e) => {
			if (!zone.current?.contains(e.relatedTarget)) setOver(false);
		},
		onDrop: (e) => {
			e.preventDefault();
			setOver(false);
			setPageDrag(false);
			take(Array.from(e.dataTransfer?.files ?? []));
		},
		children: /* @__PURE__ */ jsxs("label", {
			className: "tds-dropzone__body",
			children: [
				/* @__PURE__ */ jsx(UploadIcon, {}),
				/* @__PURE__ */ jsx("span", {
					className: "tds-dropzone__title",
					children: over && activeLabel ? activeLabel : label
				}),
				hint && /* @__PURE__ */ jsx("span", {
					id: hintId,
					className: "tds-dropzone__hint",
					children: hint
				}),
				names.length > 0 && /* @__PURE__ */ jsx("span", {
					className: "tds-dropzone__files",
					"aria-live": "polite",
					children: summarise(names)
				}),
				/* @__PURE__ */ jsx("input", {
					type: "file",
					className: "tds-dropzone__input",
					"aria-label": label,
					"aria-describedby": hint ? hintId : void 0,
					accept,
					multiple,
					disabled,
					onChange: (e) => {
						take(Array.from(e.target.files ?? []));
						e.target.value = "";
					}
				}),
				children
			]
		})
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-legal/islands/AiImageBadge.tsx
/**
* KI-Kennzeichnung für Bilder.
*
* Zwei Hälften, weil die Pflicht zwei Hälften hat: ein sichtbarer Hinweis für
* den Menschen, der das Bild sieht, und ein maschinenlesbarer für alles, was
* das Bild später verarbeitet. Beide entstehen hier im Browser; hochgeladen
* wird nichts.
*
* Was das Werkzeug nebenbei tut und was es deshalb auch sagt: ein Durchlauf
* über die Zeichenfläche verwirft die vorhandenen EXIF-Daten des Originals.
* Bei einem Kennzeichnungswerkzeug ist das keine Fußnote — wer ein Bild
* kennzeichnet, verliert dabei möglicherweise die Aufnahmedaten.
*/
/** Die Kanten des Vorschaubilds. Größere Bilder werden nur für die ANZEIGE verkleinert. */
var PREVIEW_MAX = 1200;
var SOFTWARE = "TD Tools — KI-Kennzeichnung (tools.tracht-digital.de)";
/** Deutsch ist der Default, hier wie in der Shell. */
var STRINGS$14 = {
	de: {
		chooseImage: "Bild auswählen",
		chooseHint: "PNG, JPEG oder WebP. Das Bild verlässt das Gerät nicht.",
		dropHint: "oder hierher ziehen bzw. mit Strg+V einfügen",
		dropActive: "Loslassen zum Hinzufügen",
		loadFailed: "Bild konnte nicht geladen werden.",
		noCanvas: "Zeichenfläche nicht verfügbar.",
		renderFailed: "Das Bild konnte nicht erzeugt werden.",
		badgeText: "Text auf der Plakette",
		presets: "Vorschläge",
		corner: "Ecke",
		corners: {
			tl: "Oben links",
			tr: "Oben rechts",
			bl: "Unten links",
			br: "Unten rechts"
		},
		size: "Größe",
		opacity: "Deckkraft",
		style: "Stil",
		styleDark: "Hell auf Dunkel",
		styleLight: "Dunkel auf Hell",
		format: "Format",
		quality: "Qualität",
		embed: "Maschinenlesbaren Hinweis einbetten",
		embedHint: "Wird als Textabschnitt (PNG) oder Kommentarsegment (JPEG) in die Datei geschrieben.",
		embedWebp: "WebP kann den maschinenlesbaren Hinweis nicht tragen — dafür PNG oder JPEG wählen.",
		build: "Bild erzeugen",
		building: "Erzeuge …",
		download: "Herunterladen",
		downloadName: "ki-gekennzeichnet",
		preview: "Vorschau",
		result: "Ergebnis",
		resultAlt: "Gekennzeichnetes Bild",
		embedded: "Hinweis in der Datei eingebettet.",
		notEmbedded: "Nur sichtbare Kennzeichnung — die Datei trägt keinen maschinenlesbaren Hinweis.",
		caption: "Bildunterschrift zum Mitkopieren",
		copyCaption: "Text kopieren",
		copied: "Kopiert ✓",
		exifNote: "Beim Erzeugen wird das Bild neu gezeichnet. Vorhandene Aufnahmedaten des Originals (EXIF) gehen dabei verloren.",
		privacyNote: "Das Bild wird ausschließlich im Browser verarbeitet und niemals hochgeladen."
	},
	en: {
		chooseImage: "Choose an image",
		chooseHint: "PNG, JPEG or WebP. The image never leaves your device.",
		dropHint: "or drag it here, or paste with Ctrl+V",
		dropActive: "Release to add",
		loadFailed: "The image could not be loaded.",
		noCanvas: "Canvas is not available.",
		renderFailed: "The image could not be produced.",
		badgeText: "Text on the badge",
		presets: "Suggestions",
		corner: "Corner",
		corners: {
			tl: "Top left",
			tr: "Top right",
			bl: "Bottom left",
			br: "Bottom right"
		},
		size: "Size",
		opacity: "Opacity",
		style: "Style",
		styleDark: "Light on dark",
		styleLight: "Dark on light",
		format: "Format",
		quality: "Quality",
		embed: "Embed a machine-readable note",
		embedHint: "Written into the file as a text chunk (PNG) or a comment segment (JPEG).",
		embedWebp: "WebP cannot carry the machine-readable note — choose PNG or JPEG.",
		build: "Produce the image",
		building: "Producing …",
		download: "Download",
		downloadName: "ai-labelled",
		preview: "Preview",
		result: "Result",
		resultAlt: "Labelled image",
		embedded: "Note embedded in the file.",
		notEmbedded: "Visible label only — the file carries no machine-readable note.",
		caption: "Caption to copy",
		copyCaption: "Copy the text",
		copied: "Copied ✓",
		exifNote: "Producing the image redraws it. Any capture data (EXIF) held by the original is lost in the process.",
		privacyNote: "The image is processed entirely in your browser and is never uploaded."
	}
};
function AiImageBadge({ lang = "de" }) {
	const t = STRINGS$14[lang];
	const [badge, setBadge] = useState({
		...defaultBadge,
		text: presetTexts(lang)[0] ?? defaultBadge.text
	});
	const [format, setFormat] = useState("image/png");
	const [quality, setQuality] = useState(.9);
	const [embed, setEmbed] = useState(true);
	const [image, setImage] = useState(null);
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState(null);
	const [result, setResult] = useState(null);
	const previewRef = useRef(null);
	const { copied, copy } = useCopyFlag();
	/**
	* Jede Object-URL, die diese Insel erzeugt hat.
	*
	* Eine Object-URL hält ihren Blob bis zum Ende des DOKUMENTS am Leben, nicht
	* bis zum Ende der Komponente — die letzte Referenz fallen zu lassen gibt
	* nichts frei. Ein Refs statt State, weil das Freigeben keinen Rendervorgang
	* auslösen darf und das Aufräumen beim Aushängen den aktuellen Wert sehen
	* muss.
	*/
	const sourceUrl = useRef(null);
	const resultUrl = useRef(null);
	const releaseSource = () => {
		if (sourceUrl.current) URL.revokeObjectURL(sourceUrl.current);
		sourceUrl.current = null;
	};
	const releaseResult = () => {
		if (resultUrl.current) URL.revokeObjectURL(resultUrl.current);
		resultUrl.current = null;
	};
	useEffect(() => () => {
		releaseSource();
		releaseResult();
	}, []);
	const onFile = (file) => {
		if (!file) return;
		setError(null);
		setResult(null);
		releaseResult();
		releaseSource();
		const element = new Image();
		const url = URL.createObjectURL(file);
		sourceUrl.current = url;
		element.onload = () => setImage(element);
		element.onerror = () => setError(t.loadFailed);
		element.src = url;
	};
	useEffect(() => {
		const canvas = previewRef.current;
		if (!canvas || !image) return;
		const scale = image.width > PREVIEW_MAX ? PREVIEW_MAX / image.width : 1;
		const width = Math.max(1, Math.round(image.width * scale));
		const height = Math.max(1, Math.round(image.height * scale));
		canvas.width = width;
		canvas.height = height;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		ctx.clearRect(0, 0, width, height);
		ctx.drawImage(image, 0, 0, width, height);
		drawBadge(ctx, width, height, badge);
	}, [image, badge]);
	const extension = format === "image/png" ? "png" : format === "image/webp" ? "webp" : "jpg";
	const canEmbed = format !== "image/webp";
	const produce = async () => {
		if (!image) return;
		setBusy(true);
		setError(null);
		try {
			const canvas = document.createElement("canvas");
			canvas.width = image.width;
			canvas.height = image.height;
			const ctx = canvas.getContext("2d");
			if (!ctx) throw new Error(t.noCanvas);
			ctx.drawImage(image, 0, 0);
			drawBadge(ctx, image.width, image.height, badge);
			const blob = await new Promise((resolve) => canvas.toBlob(resolve, format, format === "image/png" ? void 0 : quality));
			if (!blob) throw new Error(t.renderFailed);
			const marked = embed && canEmbed ? await embedNote(blob, machineNote(badge.text), SOFTWARE) : {
				blob,
				embedded: false
			};
			releaseResult();
			const url = URL.createObjectURL(marked.blob);
			resultUrl.current = url;
			setResult({
				url,
				embedded: marked.embedded
			});
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : t.renderFailed);
		} finally {
			setBusy(false);
		}
	};
	const field = "field-boxed w-full";
	const caption = captionFor(badge.text, lang);
	return /* @__PURE__ */ jsxs("div", {
		className: "ai-badge-tool space-y-5",
		children: [
			/* @__PURE__ */ jsx(FileDropZone, {
				label: t.chooseImage,
				hint: t.dropHint,
				activeLabel: t.dropActive,
				accept: "image/png,image/jpeg,image/webp",
				paste: true,
				onFiles: (files) => onFile(files[0]),
				children: /* @__PURE__ */ jsx("span", {
					className: "block text-xs opacity-60",
					children: t.chooseHint
				})
			}),
			image && /* @__PURE__ */ jsxs(Fragment$1, { children: [
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ jsxs("label", {
						className: "block text-sm",
						children: [/* @__PURE__ */ jsx("span", {
							className: "mb-1 block opacity-80",
							children: t.badgeText
						}), /* @__PURE__ */ jsx("input", {
							className: field,
							value: badge.text,
							onChange: (event) => setBadge((prev) => ({
								...prev,
								text: event.target.value
							}))
						})]
					}), /* @__PURE__ */ jsxs("label", {
						className: "block text-sm",
						children: [/* @__PURE__ */ jsx("span", {
							className: "mb-1 block opacity-80",
							children: t.corner
						}), /* @__PURE__ */ jsx("select", {
							className: field,
							value: badge.corner,
							onChange: (event) => setBadge((prev) => ({
								...prev,
								corner: event.target.value
							})),
							children: CORNERS$2.map((corner) => /* @__PURE__ */ jsx("option", {
								value: corner,
								children: t.corners[corner]
							}, corner))
						})]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ jsxs("span", {
						className: "text-xs opacity-60",
						children: [t.presets, ":"]
					}), presetTexts(lang).map((preset) => /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "chip",
						onClick: () => setBadge((prev) => ({
							...prev,
							text: preset
						})),
						children: preset
					}, preset))]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ jsxs("label", {
							className: "block text-sm",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "mb-1 block opacity-80",
								children: [
									t.size,
									": ",
									badge.scale,
									"%"
								]
							}), /* @__PURE__ */ jsx("input", {
								type: "range",
								min: 2,
								max: 12,
								step: .5,
								value: badge.scale,
								className: "w-full",
								onChange: (event) => setBadge((prev) => ({
									...prev,
									scale: Number(event.target.value)
								}))
							})]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "block text-sm",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "mb-1 block opacity-80",
								children: [
									t.opacity,
									": ",
									Math.round(badge.opacity * 100),
									"%"
								]
							}), /* @__PURE__ */ jsx("input", {
								type: "range",
								min: .2,
								max: 1,
								step: .05,
								value: badge.opacity,
								className: "w-full",
								onChange: (event) => setBadge((prev) => ({
									...prev,
									opacity: Number(event.target.value)
								}))
							})]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "block text-sm",
							children: [/* @__PURE__ */ jsx("span", {
								className: "mb-1 block opacity-80",
								children: t.style
							}), /* @__PURE__ */ jsxs("select", {
								className: field,
								value: badge.style,
								onChange: (event) => setBadge((prev) => ({
									...prev,
									style: event.target.value
								})),
								children: [/* @__PURE__ */ jsx("option", {
									value: "dark",
									children: t.styleDark
								}), /* @__PURE__ */ jsx("option", {
									value: "light",
									children: t.styleLight
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ jsxs("label", {
						className: "block text-sm",
						children: [/* @__PURE__ */ jsx("span", {
							className: "mb-1 block opacity-80",
							children: t.format
						}), /* @__PURE__ */ jsxs("select", {
							className: field,
							value: format,
							onChange: (event) => setFormat(event.target.value),
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "image/png",
									children: "PNG"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "image/jpeg",
									children: "JPEG"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "image/webp",
									children: "WebP"
								})
							]
						})]
					}), format !== "image/png" && /* @__PURE__ */ jsxs("label", {
						className: "block text-sm",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "mb-1 block opacity-80",
							children: [
								t.quality,
								": ",
								Math.round(quality * 100),
								"%"
							]
						}), /* @__PURE__ */ jsx("input", {
							type: "range",
							min: .5,
							max: 1,
							step: .05,
							value: quality,
							className: "w-full",
							onChange: (event) => setQuality(Number(event.target.value))
						})]
					})]
				}),
				/* @__PURE__ */ jsxs("label", {
					className: "flex items-start gap-2 text-sm",
					children: [/* @__PURE__ */ jsx("input", {
						type: "checkbox",
						className: "mt-1",
						checked: embed,
						onChange: (event) => setEmbed(event.target.checked)
					}), /* @__PURE__ */ jsxs("span", { children: [t.embed, /* @__PURE__ */ jsx("span", {
						className: "mt-0.5 block text-xs opacity-60",
						children: t.embedHint
					})] })]
				}),
				embed && !canEmbed && /* @__PURE__ */ jsx("p", {
					className: "text-xs opacity-70",
					children: t.embedWebp
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "tds-card p-4",
					children: [/* @__PURE__ */ jsx("p", {
						className: "mb-2 text-xs opacity-60",
						children: t.preview
					}), /* @__PURE__ */ jsx("canvas", {
						ref: previewRef,
						className: "h-auto max-w-full"
					})]
				}),
				/* @__PURE__ */ jsx("button", {
					type: "button",
					className: "btn btn-primary",
					onClick: () => void produce(),
					disabled: busy,
					children: busy ? t.building : t.build
				})
			] }),
			error && /* @__PURE__ */ jsx(Alert, { children: error }),
			result && /* @__PURE__ */ jsxs("div", {
				className: "tds-card tds-appear space-y-3 p-4",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-xs opacity-60",
						children: t.result
					}),
					/* @__PURE__ */ jsx("img", {
						src: result.url,
						alt: t.resultAlt,
						className: "h-auto max-h-64 max-w-full"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm opacity-80",
						children: result.embedded ? t.embedded : t.notEmbedded
					}),
					/* @__PURE__ */ jsx("a", {
						href: result.url,
						download: safeFilename(t.downloadName, extension),
						className: "btn btn-ghost",
						children: t.download
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-sm opacity-80",
						children: t.caption
					}),
					/* @__PURE__ */ jsx("div", {
						className: "tds-card p-3",
						children: /* @__PURE__ */ jsx("output", {
							className: "block text-sm",
							children: caption
						})
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						className: "btn btn-ghost",
						onClick: () => void copy(caption),
						children: copied ? t.copied : t.copyCaption
					})
				]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-xs opacity-60",
				children: t.exifNote
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-xs opacity-60",
				children: t.privacyNote
			})
		]
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-legal/tools/AiImageBadge.astro
createAstro("https://tools.tracht-digital.de");
var $$AiImageBadge = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$AiImageBadge;
	const { lang = "de" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="tool tool--ai-badge">${renderComponent($$result, "AiImageBadge", AiImageBadge, {
		"client:load": true,
		"lang": lang,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-legal/islands/AiImageBadge.tsx",
		"client:component-export": "default"
	})}</div>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-legal/tools/AiImageBadge.astro", void 0);
// node_modules/@tracht-digital-solutions/tds-tool-office/islands/TextRecognition.tsx
/** German is the default; an older pinned pack must keep working unchanged. */
var STRINGS$13 = {
	de: {
		needImage: "Bitte ein Bild wählen.",
		failed: "Der Text konnte nicht erkannt werden.",
		empty: "Es wurde kein Text gefunden. Ein schärferes, gerade ausgerichtetes Bild mit gutem Kontrast hilft am meisten.",
		done: (chars, confidence) => `${chars} Zeichen erkannt (Sicherheit ${confidence} %).`,
		chooseImage: "Bild auswählen (JPG, PNG, WebP)",
		dropHint: "oder hierher ziehen bzw. mit Strg+V einfügen",
		dropActive: "Loslassen zum Hinzufügen",
		language: "Sprache des Textes",
		german: "Deutsch",
		english: "Englisch",
		both: "Deutsch und Englisch",
		loading: "Lade Texterkennung …",
		recognising: (percent) => `Erkenne Text … ${percent} %`,
		run: "Text erkennen",
		result: "Erkannter Text",
		copy: "Kopieren",
		copied: "Kopiert.",
		copyFailed: "Der Text konnte nicht kopiert werden.",
		save: "Als Textdatei speichern",
		outName: "erkannter-text.txt",
		pdfHint: "PDFs werden hier nicht gelesen — eine Seite zuerst in ein Bild umwandeln, dann klappt die Erkennung.",
		note: "Texterkennung und Sprachdaten laufen auf dem eigenen Gerät. Das Bild wird nicht hochgeladen und keine fremde Seite wird dabei aufgerufen."
	},
	en: {
		needImage: "Please choose an image.",
		failed: "The text could not be recognised.",
		empty: "No text was found. A sharper, straight image with good contrast makes the biggest difference.",
		done: (chars, confidence) => `Recognised ${chars} characters (confidence ${confidence} %).`,
		chooseImage: "Choose an image (JPG, PNG, WebP)",
		dropHint: "or drag it here, or paste with Ctrl+V",
		dropActive: "Release to add",
		language: "Language of the text",
		german: "German",
		english: "English",
		both: "German and English",
		loading: "Loading text recognition …",
		recognising: (percent) => `Recognising text … ${percent} %`,
		run: "Recognise text",
		result: "Recognised text",
		copy: "Copy",
		copied: "Copied.",
		copyFailed: "The text could not be copied.",
		save: "Save as a text file",
		outName: "recognised-text.txt",
		pdfHint: "PDFs are not read here — convert a page to an image first and recognition will work.",
		note: "Recognition and the language data run on your device. The image is not uploaded and no third-party site is contacted."
	}
};
/**
* The engine, its WebAssembly core and the language data are served by this site
* (`public/ocr/`, filled by `scripts/sync-ocr.mjs`) rather than by tesseract.js's
* default CDN. That is the whole privacy claim of this tool: opening it must not
* contact anybody. Change these paths and the claim quietly stops being true.
*/
var OCR_PATHS = {
	workerPath: "/ocr/worker.min.js",
	corePath: "/ocr",
	langPath: "/ocr/lang"
};
function TextRecognition({ lang = "de" }) {
	const t = STRINGS$13[lang];
	const [file, setFile] = useState(null);
	const [preview, setPreview] = useState(null);
	const [recognised, setRecognised] = useState(lang === "de" ? "deu" : "eng");
	const [text, setText] = useState("");
	const [phase, setPhase] = useState("idle");
	const [percent, setPercent] = useState(0);
	const [status, setStatus] = useState(null);
	const [error, setError] = useState(null);
	const previewUrl = useRef(null);
	const replacePreview = (next) => {
		if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
		previewUrl.current = next ? URL.createObjectURL(next) : null;
		setPreview(previewUrl.current);
	};
	/** Pending "Kopiert." reset, cleared on unmount so it cannot set state after. */
	const copyReset = useRef(null);
	useEffect(() => () => {
		if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
		if (copyReset.current !== null) clearTimeout(copyReset.current);
	}, []);
	const run = async () => {
		setError(null);
		setStatus(null);
		setText("");
		setPercent(0);
		try {
			if (!file) throw new Error(t.needImage);
			setPhase("loading");
			const { createWorker } = await import("tesseract.js");
			const worker = await createWorker(recognised, 1, {
				...OCR_PATHS,
				logger: (m) => {
					if (m.status === "recognizing text") {
						setPhase("working");
						setPercent(Math.round(m.progress * 100));
					}
				}
			});
			try {
				const { data } = await worker.recognize(file);
				const clean = data.text.trim();
				setText(clean);
				if (clean === "") setStatus(t.empty);
				else setStatus(t.done(clean.length, Math.round(data.confidence)));
			} finally {
				await worker.terminate();
			}
		} catch (e) {
			setError(e instanceof Error ? e.message : t.failed);
		} finally {
			setPhase("idle");
		}
	};
	const copy = async () => {
		if (text === "") return;
		try {
			await navigator.clipboard.writeText(text);
			setStatus(t.copied);
			if (copyReset.current !== null) clearTimeout(copyReset.current);
			copyReset.current = setTimeout(() => setStatus(null), 1500);
		} catch {
			setError(t.copyFailed);
		}
	};
	const busy = phase !== "idle";
	const field = "field-boxed w-full";
	return /* @__PURE__ */ jsxs("div", {
		className: "text-recognition space-y-5",
		children: [
			/* @__PURE__ */ jsx(FileDropZone, {
				label: t.chooseImage,
				hint: t.dropHint,
				activeLabel: t.dropActive,
				accept: "image/*",
				paste: true,
				onFiles: (files) => {
					const next = files[0] ?? null;
					setFile(next);
					replacePreview(next);
				},
				children: /* @__PURE__ */ jsx("span", {
					className: "block text-xs opacity-60",
					children: t.pdfHint
				})
			}),
			preview && /* @__PURE__ */ jsx("img", {
				src: preview,
				alt: "",
				className: "max-h-64 w-auto"
			}),
			/* @__PURE__ */ jsxs("label", {
				className: "block text-sm",
				children: [/* @__PURE__ */ jsx("span", {
					className: "mb-1 block opacity-80",
					children: t.language
				}), /* @__PURE__ */ jsxs("select", {
					className: field,
					value: recognised,
					onChange: (e) => setRecognised(e.target.value),
					children: [
						/* @__PURE__ */ jsx("option", {
							value: "deu",
							children: t.german
						}),
						/* @__PURE__ */ jsx("option", {
							value: "eng",
							children: t.english
						}),
						/* @__PURE__ */ jsx("option", {
							value: "deu+eng",
							children: t.both
						})
					]
				})]
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "btn btn-primary",
				onClick: run,
				disabled: busy,
				children: phase === "loading" ? t.loading : phase === "working" ? t.recognising(percent) : t.run
			}),
			/* @__PURE__ */ jsx(Alert, { children: error }),
			/* @__PURE__ */ jsx(Alert, {
				tone: "success",
				children: status
			}),
			text !== "" && /* @__PURE__ */ jsxs("div", {
				className: "space-y-3 tds-appear",
				children: [/* @__PURE__ */ jsxs("label", {
					className: "block text-sm",
					children: [/* @__PURE__ */ jsx("span", {
						className: "mb-1 block opacity-80",
						children: t.result
					}), /* @__PURE__ */ jsx("textarea", {
						className: field,
						rows: 12,
						value: text,
						onChange: (e) => setText(e.target.value)
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						type: "button",
						className: "btn btn-ghost",
						onClick: copy,
						children: t.copy
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "btn btn-ghost",
						onClick: () => downloadBlob(new Blob([text], { type: "text/plain;charset=utf-8" }), t.outName),
						children: t.save
					})]
				})]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-xs opacity-60",
				children: t.note
			})
		]
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-office/tools/TextRecognition.astro
createAstro("https://tools.tracht-digital.de");
var $$TextRecognition = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$TextRecognition;
	const { lang = "de" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="tool tool--text-recognition">${renderComponent($$result, "TextRecognition", TextRecognition, {
		"client:load": true,
		"lang": lang,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-office/islands/TextRecognition.tsx",
		"client:component-export": "default"
	})}</div>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-office/tools/TextRecognition.astro", void 0);
// node_modules/@tracht-digital-solutions/tds-tool-devkit/src/studio/api.ts
var FALLBACK_API = "https://api.tracht-digital.de";
var FALLBACK_LOGIN = "https://auth.tracht-digital.de";
var runtimePromise = null;
/** The host's runtime config (`/tds-runtime.json`), as the site's own gate reads it. */
function runtime() {
	runtimePromise ??= (async () => {
		const envApi = Object.assign({
			"ASSETS_PREFIX": void 0,
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
			"PUBLIC_DEMO_MODE": "false",
			"SITE": "https://tools.tracht-digital.de",
			"SSR": true
		}, { _: "/opt/hostedtoolcache/node/22.23.3/x64/bin/npm" })?.PUBLIC_API_URL;
		const envLogin = Object.assign({
			"ASSETS_PREFIX": void 0,
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
			"PUBLIC_DEMO_MODE": "false",
			"SITE": "https://tools.tracht-digital.de",
			"SSR": true
		}, { _: "/opt/hostedtoolcache/node/22.23.3/x64/bin/npm" })?.PUBLIC_LOGIN_URL;
		let api = envApi ?? FALLBACK_API;
		let login = envLogin ?? FALLBACK_LOGIN;
		try {
			const res = await fetch("/tds-runtime.json", { credentials: "same-origin" });
			if (res.ok) {
				const cfg = await res.json();
				if (typeof cfg.apiBase === "string" && cfg.apiBase) api = cfg.apiBase;
				if (typeof cfg.loginUrl === "string" && cfg.loginUrl) login = cfg.loginUrl;
			}
		} catch {}
		return {
			api: api.replace(/\/+$/, ""),
			login
		};
	})();
	return runtimePromise;
}
var ApiError = class extends Error {
	status;
	code;
	constructor(message, status, code) {
		super(message);
		this.status = status;
		this.code = code;
	}
};
async function call(path, init = {}) {
	const { api } = await runtime();
	let res;
	try {
		res = await fetch(`${api}${path}`, {
			...init,
			credentials: "include",
			headers: {
				Accept: "application/json",
				...init.body ? { "Content-Type": "application/json" } : {},
				...init.headers ?? {}
			}
		});
	} catch {
		throw new ApiError("network", 0);
	}
	const data = await res.json().catch(() => null);
	if (!res.ok) throw new ApiError(typeof data?.error === "string" ? data.error : `HTTP ${res.status}`, res.status, typeof data?.code === "string" ? data.code : void 0);
	return data;
}
/** Never throws: an unreachable API means "guest, default policy, premium closed". */
async function getAccess() {
	try {
		return parseAccess(await call("/tools/studio/access"));
	} catch {
		return offlineAccess();
	}
}
var listProjects = () => call("/tools/studio/projects").then((d) => d.projects);
var openProject = (id) => call(`/tools/studio/projects/${id}`).then((d) => d.project);
var saveProject = (project, id) => call(id ? `/tools/studio/projects/${id}` : "/tools/studio/projects", {
	method: id ? "PUT" : "POST",
	body: JSON.stringify({
		name: project.name,
		data: project
	})
}).then((d) => d.project);
var deleteProject = (id) => call(`/tools/studio/projects/${id}`, { method: "DELETE" });
var analyzeUrl = (url) => call("/tools/studio/analyze", {
	method: "POST",
	body: JSON.stringify({ url })
});
async function startCheckout() {
	const d = await call("/tools/checkout", {
		method: "POST",
		body: JSON.stringify({ tool: STUDIO_TOOL_ID })
	});
	if (!d.url) throw new ApiError("no checkout url", 502);
	return d.url;
}
async function loginHref() {
	const { login } = await runtime();
	return `${login}?next=${encodeURIComponent(typeof location !== "undefined" ? location.href : "")}`;
}
/** Downloads one export from the site server, which enforces the policy. */
async function requestExport(format, project) {
	let res;
	try {
		res = await fetch("/tds/studio/export", {
			method: "POST",
			credentials: "same-origin",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				format,
				project
			})
		});
	} catch {
		throw new ApiError("network", 0);
	}
	if (!res.ok) {
		const data = await res.json().catch(() => null);
		throw new ApiError(typeof data?.error === "string" ? data.error : `HTTP ${res.status}`, res.status, typeof data?.code === "string" ? data.code : void 0);
	}
	const cd = res.headers.get("Content-Disposition") ?? "";
	const filename = /filename="([^"]+)"/.exec(cd)?.[1] ?? `designsystem.${format}`;
	return {
		blob: await res.blob(),
		filename
	};
}
// node_modules/@tracht-digital-solutions/tds-tool-devkit/src/studio/a11y.ts
/**
* Rule-based accessibility assistant for the checkable design properties.
*
* It checks colour contrast, focus visibility, sizes, motion and target sizes
* against WCAG 2.2 success criteria and proposes concrete fixes. It never
* claims conformance: most of WCAG is about content and markup, which a design
* system cannot decide — those items are listed as "manual" instead.
*/
var SUBJECT = {
	button: "Button",
	buttonSecondary: "Zweiter Button",
	link: "Link",
	heading: "Überschrift",
	text: "Fließtext",
	card: "Karte",
	input: "Formularfeld",
	label: "Label",
	formButton: "Formular-Button",
	nav: "Navigation",
	footer: "Footer"
};
var VAR_RE = /var\(--[a-z0-9-]+?-color-([a-z-]+)\)/;
var camel$1 = (s) => s.replace(/-([a-z])/g, (_m, c) => c.toUpperCase());
/** The role a component colour points at, if it is a role reference. */
function roleOf(value) {
	const m = VAR_RE.exec(value);
	return m ? camel$1(m[1]) : null;
}
/** A component colour as a concrete colour in a theme (null for gradients / unknown). */
function colorIn(value, theme) {
	if (!value) return null;
	const role = roleOf(value);
	if (role) return theme.colors[role] ?? null;
	if (value === "transparent") return null;
	return parseColor(value) ? value : null;
}
var isLarge = (s) => s.fontSize >= 24 || s.fontSize >= 18.66 && s.fontWeight >= 700;
/** Proposes a fix for a foreground colour: theme role if it is one, else a component override. */
function fixColor(ctx, theme, kind, path, value, against, target) {
	const current = colorIn(value, theme);
	if (!current) return void 0;
	let fixed = current;
	for (let i = 0; i < 3; i++) for (const bg of against) fixed = ensureContrast(fixed, bg, target);
	const after = Math.min(...against.map((bg) => contrast$1(fixed, bg) ?? 0));
	if (after < target) return void 0;
	const role = roleOf(value);
	if (role) {
		const src = theme.source[role];
		return {
			text: `Farbrolle „${role}“ im Theme „${theme.def.name}“ auf ${fixed} setzen.`,
			target: {
				scope: "theme",
				themeId: theme.def.id,
				role,
				value: fixed
			},
			overridesUserChoice: src === "manual" || src === "seed",
			after: round2(after)
		};
	}
	const comp = ctx.r.components[kind];
	return {
		text: `Farbe von „${SUBJECT[kind]}“ auf ${fixed} setzen.`,
		target: {
			scope: "component",
			kind,
			path,
			value: fixed
		},
		overridesUserChoice: comp.source[path] === "manual" || comp.source[path] === "seed",
		after: round2(after)
	};
}
function contrastCheck(ctx, theme, opts) {
	const fg = colorIn(opts.fg, theme);
	const bgs = opts.bgs.filter((b) => !!b);
	const subject = SUBJECT[opts.kind];
	if (!fg || bgs.length === 0) {
		ctx.out.push({
			id: `${opts.id}:${theme.def.id}`,
			status: "manual",
			criterion: opts.text ? "1.4.3 Kontrast (Minimum)" : "1.4.11 Nicht-Text-Kontrast",
			level: "AA",
			subject,
			themeId: theme.def.id,
			property: opts.property,
			message: "Nicht automatisch prüfbar (Verlauf, Transparenz oder eigene Farbfunktion). Bitte mit dem Kontrast-Checker an der echten Darstellung prüfen."
		});
		return;
	}
	const ratio = Math.min(...bgs.map((bg) => contrast$1(fg, bg) ?? 21));
	const aa = opts.text ? opts.large ? 3 : 4.5 : 3;
	const aaa = opts.text ? opts.large ? 4.5 : 7 : null;
	const base = {
		subject,
		themeId: theme.def.id,
		property: opts.property,
		actual: `${round2(ratio)}:1`
	};
	if (ratio < aa) {
		ctx.out.push({
			...base,
			id: `${opts.id}:${theme.def.id}`,
			status: "fail",
			criterion: opts.text ? "1.4.3 Kontrast (Minimum)" : "1.4.11 Nicht-Text-Kontrast",
			level: "AA",
			required: `${aa}:1`,
			message: `${subject}: ${opts.property} erreicht im Theme „${theme.def.name}“ nur ${round2(ratio)}:1, benötigt werden ${aa}:1${opts.large ? " (großer Text)" : ""}.`,
			suggestion: fixColor(ctx, theme, opts.kind, opts.fgPath, opts.fg ?? "", bgs, aa)
		});
		return;
	}
	ctx.out.push({
		...base,
		id: `${opts.id}:${theme.def.id}`,
		status: "pass",
		criterion: opts.text ? "1.4.3 Kontrast (Minimum)" : "1.4.11 Nicht-Text-Kontrast",
		level: "AA",
		required: `${aa}:1`,
		message: `${subject}: ${opts.property} ${round2(ratio)}:1 — erfüllt AA.`
	});
	if (aaa !== null) {
		const ok = ratio >= aaa;
		ctx.out.push({
			...base,
			id: `${opts.id}-aaa:${theme.def.id}`,
			status: ok ? "pass" : "warn",
			criterion: "1.4.6 Kontrast (erhöht)",
			level: "AAA",
			required: `${aaa}:1`,
			message: ok ? `${subject}: ${opts.property} erfüllt auch AAA.` : `${subject}: ${opts.property} erfüllt AA, aber nicht AAA (${aaa}:1).`,
			suggestion: ok ? void 0 : fixColor(ctx, theme, opts.kind, opts.fgPath, opts.fg ?? "", bgs, aaa)
		});
	}
}
function themeChecks(ctx, theme) {
	const c = ctx.r.components;
	const tc = theme.colors;
	const page = tc.background;
	const bgOf = (kind) => colorIn(c[kind].style.background, theme) ?? page;
	contrastCheck(ctx, theme, {
		id: "text",
		kind: "text",
		property: "Textfarbe auf Seiten- und Kartenhintergrund",
		fgPath: "color",
		fg: c.text.style.color,
		bgs: [page, colorIn(c.card.style.background, theme)],
		text: true
	});
	contrastCheck(ctx, theme, {
		id: "muted",
		kind: "text",
		property: "Gedämpfter Text (muted)",
		fgPath: "color",
		fg: `var(--${ctx.r.project.prefix}-color-muted)`,
		bgs: [
			page,
			tc.surface,
			tc.surfaceAlt
		],
		text: true
	});
	contrastCheck(ctx, theme, {
		id: "heading",
		kind: "heading",
		property: "Überschriftenfarbe",
		fgPath: "color",
		fg: c.heading.style.color,
		bgs: [page],
		text: true,
		large: true
	});
	contrastCheck(ctx, theme, {
		id: "link",
		kind: "link",
		property: "Linkfarbe",
		fgPath: "color",
		fg: c.link.style.color,
		bgs: [page, colorIn(c.card.style.background, theme)],
		text: true
	});
	const btn = c.button.style;
	const btnBgs = btn.gradientTo ? [colorIn(btn.background, theme), colorIn(btn.gradientTo, theme)] : [bgOf("button")];
	contrastCheck(ctx, theme, {
		id: "button-text",
		kind: "button",
		property: "Buttontext auf Buttonfläche",
		fgPath: "color",
		fg: btn.color,
		bgs: btnBgs,
		text: true,
		large: isLarge(btn)
	});
	if (btn.states.hover.background || btn.states.hover.color) contrastCheck(ctx, theme, {
		id: "button-hover",
		kind: "button",
		property: "Buttontext im Hover-Zustand",
		fgPath: btn.states.hover.color ? "states.hover.color" : "color",
		fg: btn.states.hover.color ?? btn.color,
		bgs: [colorIn(btn.states.hover.background, theme) ?? bgOf("button")],
		text: true,
		large: isLarge(btn)
	});
	const sec = c.buttonSecondary.style;
	contrastCheck(ctx, theme, {
		id: "button2-text",
		kind: "buttonSecondary",
		property: "Text des zweiten Buttons",
		fgPath: "color",
		fg: sec.color,
		bgs: [colorIn(sec.background, theme) ?? page],
		text: true,
		large: isLarge(sec)
	});
	contrastCheck(ctx, theme, {
		id: "input-text",
		kind: "input",
		property: "Eingabetext im Formularfeld",
		fgPath: "color",
		fg: c.input.style.color,
		bgs: [bgOf("input")],
		text: true
	});
	contrastCheck(ctx, theme, {
		id: "label",
		kind: "label",
		property: "Labelfarbe",
		fgPath: "color",
		fg: c.label.style.color,
		bgs: [page, colorIn(c.card.style.background, theme)],
		text: true,
		large: isLarge(c.label.style)
	});
	contrastCheck(ctx, theme, {
		id: "footer",
		kind: "footer",
		property: "Footertext",
		fgPath: "color",
		fg: c.footer.style.color,
		bgs: [bgOf("footer")],
		text: true
	});
	contrastCheck(ctx, theme, {
		id: "nav",
		kind: "nav",
		property: "Navigationstext",
		fgPath: "color",
		fg: c.nav.style.color,
		bgs: [bgOf("nav")],
		text: true
	});
	const inp = c.input.style;
	if (Math.max(inp.borderWidth.top, inp.borderWidth.bottom) > 0 && inp.borderStyle !== "none") contrastCheck(ctx, theme, {
		id: "input-border",
		kind: "input",
		property: "Rahmen des Formularfelds",
		fgPath: "borderColor.top",
		fg: inp.borderColor.bottom,
		bgs: [page, bgOf("input")],
		text: false
	});
	else {
		const fieldVsPage = contrast$1(bgOf("input"), page) ?? 1;
		ctx.out.push({
			id: `input-boundary:${theme.def.id}`,
			status: fieldVsPage >= 3 ? "pass" : "fail",
			criterion: "1.4.11 Nicht-Text-Kontrast",
			level: "AA",
			subject: SUBJECT.input,
			themeId: theme.def.id,
			property: "Begrenzung des Formularfelds",
			actual: `${round2(fieldVsPage)}:1`,
			required: "3:1",
			message: fieldVsPage >= 3 ? "Das Feld hebt sich durch seine Fläche ausreichend ab." : "Das Feld hat keinen Rahmen und hebt sich kaum vom Hintergrund ab.",
			suggestion: fieldVsPage >= 3 ? void 0 : {
				text: "Einen 1px-Rahmen in der Rolle „borderStrong“ hinzufügen.",
				target: {
					scope: "component",
					kind: "input",
					path: "borderWidth.bottom",
					value: 1
				},
				overridesUserChoice: c.input.source["borderWidth.bottom"] === "manual"
			}
		});
	}
	for (const kind of [
		"button",
		"link",
		"input"
	]) {
		const f = c[kind].style.states.focus;
		if ((f.outlineWidth ?? 0) > 0) contrastCheck(ctx, theme, {
			id: `focus-color-${kind}`,
			kind,
			property: "Farbe des Fokusrahmens",
			fgPath: "states.focus.outlineColor",
			fg: f.outlineColor ?? c[kind].style.color,
			bgs: [page],
			text: false
		});
	}
	const sd = contrast$1(tc.success, tc.danger) ?? 1;
	ctx.out.push({
		id: `status-colours:${theme.def.id}`,
		status: sd >= 1.4 ? "pass" : "warn",
		criterion: "1.4.1 Benutzung von Farbe",
		level: "A",
		subject: "Statusfarben",
		themeId: theme.def.id,
		property: "Erfolg- und Fehlerfarbe",
		actual: `${round2(sd)}:1`,
		message: sd >= 1.4 ? "Erfolg und Fehler unterscheiden sich auch in der Helligkeit." : "Erfolg (Grün) und Fehler (Rot) unterscheiden sich fast nur im Farbton — für Menschen mit Rot-Grün-Schwäche schwer lesbar. Status immer zusätzlich mit Text oder Symbol kennzeichnen."
	});
}
function globalChecks(ctx) {
	const c = ctx.r.components;
	const t = ctx.r.tokens;
	for (const kind of [
		"button",
		"buttonSecondary",
		"link",
		"input",
		"formButton"
	]) {
		const f = c[kind].style.states.focus;
		const visible = (f.outlineWidth ?? 0) >= 2 || !!(f.shadow && f.shadow !== "none") || !!f.borderColor;
		const thin = (f.outlineWidth ?? 0) > 0 && (f.outlineWidth ?? 0) < 2 && !f.shadow;
		ctx.out.push({
			id: `focus-visible-${kind}`,
			status: visible ? "pass" : "fail",
			criterion: "2.4.7 Fokus sichtbar",
			level: "AA",
			subject: SUBJECT[kind],
			property: "Fokuszustand",
			actual: visible ? `Rahmen ${f.outlineWidth ?? 0}px` : thin ? `nur ${f.outlineWidth}px` : "kein sichtbarer Fokus",
			required: "deutlich sichtbarer Fokus (empfohlen ≥ 2px)",
			message: visible ? `${SUBJECT[kind]} zeigt bei Tastaturbedienung einen sichtbaren Fokus.` : `${SUBJECT[kind]} hat keinen ausreichend sichtbaren Fokuszustand.`,
			suggestion: visible ? void 0 : {
				text: "Einen 2px-Fokusrahmen in der Fokusfarbe ergänzen.",
				target: {
					scope: "component",
					kind,
					path: "states.focus.outlineWidth",
					value: 2
				},
				overridesUserChoice: c[kind].source["states.focus.outlineWidth"] === "manual" || c[kind].source["states.focus.outlineWidth"] === "seed"
			}
		});
	}
	for (const kind of [
		"button",
		"buttonSecondary",
		"formButton",
		"input"
	]) {
		const s = c[kind].style;
		const h = Math.max(s.minHeight, s.padding.top + s.padding.bottom + s.fontSize * s.lineHeight + s.borderWidth.top + s.borderWidth.bottom);
		const status = h >= 44 ? "pass" : h >= 24 ? "warn" : "fail";
		ctx.out.push({
			id: `target-${kind}`,
			status,
			criterion: h >= 24 ? "2.5.5 Zielgröße (erweitert)" : "2.5.8 Zielgröße (Minimum)",
			level: h >= 24 ? "AAA" : "AA",
			subject: SUBJECT[kind],
			property: "Klickfläche (Höhe)",
			actual: `${Math.round(h)}px`,
			required: h >= 24 ? "44px (AAA)" : "24px (AA)",
			message: status === "pass" ? `${SUBJECT[kind]} ist mindestens 44px hoch.` : status === "warn" ? `${SUBJECT[kind]} erfüllt 24px (AA), aber nicht die empfohlenen 44px für Touch-Bedienung.` : `${SUBJECT[kind]} ist kleiner als 24px und schwer zu treffen.`,
			suggestion: status === "pass" ? void 0 : {
				text: "Mindesthöhe auf 44px setzen.",
				target: {
					scope: "component",
					kind,
					path: "minHeight",
					value: 44
				},
				overridesUserChoice: c[kind].source.minHeight === "manual" || c[kind].source.minHeight === "seed"
			}
		});
	}
	const body = t.font.size;
	ctx.out.push({
		id: "font-size-body",
		status: body >= 16 ? "pass" : "warn",
		criterion: "Lesbarkeit (1.4.4 / 1.4.12 Umfeld)",
		level: "Empfehlung",
		subject: SUBJECT.text,
		property: "Grundschriftgröße",
		actual: `${body}px`,
		required: "≥ 16px empfohlen",
		message: body >= 16 ? "Die Grundschrift ist gut lesbar groß." : "Unter 16px wird Fließtext auf Smartphones schnell anstrengend."
	});
	for (const kind of [
		"button",
		"label",
		"footer",
		"input",
		"nav"
	]) {
		const fs = c[kind].style.fontSize;
		if (fs < 12) ctx.out.push({
			id: `font-size-${kind}`,
			status: "warn",
			criterion: "Lesbarkeit",
			level: "Empfehlung",
			subject: SUBJECT[kind],
			property: "Schriftgröße",
			actual: `${fs}px`,
			required: "≥ 12px",
			message: `${SUBJECT[kind]} verwendet eine sehr kleine Schrift.`,
			suggestion: {
				text: "Schriftgröße auf 14px anheben.",
				target: {
					scope: "component",
					kind,
					path: "fontSize",
					value: 14
				},
				overridesUserChoice: c[kind].source.fontSize === "manual" || c[kind].source.fontSize === "seed"
			}
		});
	}
	ctx.out.push({
		id: "line-height",
		status: t.font.lineHeight >= 1.5 ? "pass" : "warn",
		criterion: "1.4.12 Textabstand",
		level: "AA",
		subject: SUBJECT.text,
		property: "Zeilenhöhe",
		actual: String(t.font.lineHeight),
		required: "≥ 1.5 empfohlen",
		message: t.font.lineHeight >= 1.5 ? "Die Zeilenhöhe unterstützt gute Lesbarkeit." : "Eine Zeilenhöhe unter 1,5 erschwert das Lesen längerer Texte. (1.4.12 verlangt, dass Nutzer sie erhöhen können — das tut das erzeugte CSS nicht verhindern.)"
	});
	for (const kind of Object.keys(c)) {
		const s = c[kind].style;
		if (s.animation === "pulse") ctx.out.push({
			id: `animation-${kind}`,
			status: "fail",
			criterion: "2.2.2 Pausieren, Stoppen, Ausblenden",
			level: "A",
			subject: SUBJECT[kind],
			property: "Endlos-Animation",
			actual: "läuft unbegrenzt",
			required: "≤ 5 s oder abschaltbar",
			message: `${SUBJECT[kind]} pulsiert endlos. Das lenkt ab und lässt sich nicht anhalten (bei reduzierter Bewegung wird sie abgeschaltet, sonst nicht).`,
			suggestion: {
				text: "Animation entfernen.",
				target: {
					scope: "component",
					kind,
					path: "animation",
					value: "none"
				},
				overridesUserChoice: true
			}
		});
		if (s.transitionDuration > 500) ctx.out.push({
			id: `transition-${kind}`,
			status: "warn",
			criterion: "Bewegung",
			level: "Empfehlung",
			subject: SUBJECT[kind],
			property: "Übergangsdauer",
			actual: `${s.transitionDuration}ms`,
			required: "≤ 500ms",
			message: "Lange Übergänge lassen die Oberfläche träge wirken.",
			suggestion: {
				text: "Übergangsdauer auf 200ms setzen.",
				target: {
					scope: "component",
					kind,
					path: "transitionDuration",
					value: 200
				},
				overridesUserChoice: c[kind].source.transitionDuration === "manual" || c[kind].source.transitionDuration === "seed"
			}
		});
		const hs = s.states.hover.scale ?? 1;
		if (hs > 1.1) ctx.out.push({
			id: `hover-scale-${kind}`,
			status: "warn",
			criterion: "Bewegung",
			level: "Empfehlung",
			subject: SUBJECT[kind],
			property: "Vergrößerung bei Hover",
			actual: `${hs}×`,
			required: "≤ 1,1×",
			message: "Starke Vergrößerung verschiebt benachbarte Inhalte optisch und kann irritieren.",
			suggestion: {
				text: "Vergrößerung auf 1,03× reduzieren.",
				target: {
					scope: "component",
					kind,
					path: "states.hover.scale",
					value: 1.03
				},
				overridesUserChoice: true
			}
		});
	}
	ctx.out.push({
		id: "reduced-motion",
		status: "pass",
		criterion: "2.3.3 Animation durch Interaktionen",
		level: "AAA",
		subject: "Gesamtsystem",
		property: "prefers-reduced-motion",
		message: "Das erzeugte CSS schaltet Übergänge und Animationen bei „Bewegung reduzieren“ ab."
	});
	ctx.out.push({
		id: "disabled",
		status: "pass",
		criterion: "1.4.3 Ausnahme: inaktive Elemente",
		level: "AA",
		subject: "Deaktivierte Zustände",
		property: "Kontrast deaktivierter Elemente",
		message: "Deaktivierte Bedienelemente sind von der Kontrastanforderung ausgenommen; sie werden zusätzlich über den Cursor gekennzeichnet."
	});
}
var MANUAL = [
	[
		"1.1.1 Nicht-Text-Inhalt",
		"Alternativtexte",
		"A",
		"Bilder und Icons brauchen Alternativtexte — das legt die spätere Seite fest, nicht das Designsystem."
	],
	[
		"1.3.1 Info und Beziehungen",
		"Semantisches HTML",
		"A",
		"Überschriften, Listen, Labels (for/id) und Landmarken müssen im HTML korrekt ausgezeichnet sein."
	],
	[
		"2.1.1 Tastatur",
		"Tastaturbedienung",
		"A",
		"Alle Funktionen müssen per Tastatur erreichbar sein. Das hängt von HTML und Skripten der Seite ab."
	],
	[
		"2.4.3 Fokusreihenfolge",
		"Reihenfolge",
		"A",
		"Die Tab-Reihenfolge ergibt sich aus der Struktur der fertigen Seite."
	],
	[
		"3.1.1 Sprache der Seite",
		"lang-Attribut",
		"A",
		"Die Seite muss ihre Sprache im <html lang> angeben."
	],
	[
		"3.3.1 Fehlererkennung",
		"Fehlermeldungen",
		"A",
		"Formularfehler müssen als Text beschrieben werden, nicht nur farbig."
	],
	[
		"1.4.10 Umbruch",
		"Reflow bei 320px",
		"AA",
		"Das erzeugte CSS bricht flüssig um; ob der echte Inhalt bei 320px ohne horizontales Scrollen auskommt, muss an der Seite geprüft werden."
	],
	[
		"1.4.12 Textabstand",
		"Nutzerdefinierte Abstände",
		"AA",
		"Prüfen, ob Inhalte bei vergrößerten Zeilen- und Buchstabenabständen nicht abgeschnitten werden."
	]
];
function auditProject(r) {
	const ctx = {
		r,
		out: []
	};
	for (const theme of r.themes) themeChecks(ctx, theme);
	globalChecks(ctx);
	MANUAL.forEach(([criterion, property, level, message], i) => ctx.out.push({
		id: `manual-${i}`,
		status: "manual",
		criterion,
		level,
		subject: "Fertige Website",
		property,
		message
	}));
	const counts = {
		pass: 0,
		fail: 0,
		warn: 0,
		manual: 0
	};
	for (const f of ctx.out) counts[f.status]++;
	return {
		findings: ctx.out,
		counts
	};
}
/** Applies an accepted suggestion. The caller confirms `overridesUserChoice` first. */
function applySuggestion(project, s) {
	const t = s.target;
	if (t.scope === "theme") return {
		...project,
		themes: project.themes.map((th) => th.id === t.themeId ? {
			...th,
			overrides: {
				...th.overrides,
				[t.role]: t.value
			}
		} : th)
	};
	const extra = {};
	if (t.path === "borderWidth.bottom" && t.kind === "input") {
		for (const side of [
			"top",
			"right",
			"bottom",
			"left"
		]) extra[`borderWidth.${side}`] = 1;
		extra.borderStyle = "solid";
	}
	if (t.path === "states.focus.outlineWidth") {
		extra["states.focus.outlineColor"] = `var(--${project.prefix}-color-focus)`;
		extra["states.focus.outlineOffset"] = 2;
	}
	return {
		...project,
		components: {
			...project.components,
			[t.kind]: {
				...project.components[t.kind] ?? {},
				...extra,
				[t.path]: t.value
			}
		}
	};
}
// node_modules/@tracht-digital-solutions/tds-tool-devkit/src/studio/state.ts
/**
* The studio's state transitions. Pure, so every rule about what survives
* which edit is testable without a browser:
*
* - editing the seed re-derives generated values, never manual ones;
* - switching the variant keeps globals, component edits, themes and custom CSS;
* - a lock freezes the CURRENT value into the manual layer;
* - resetting manual edits keeps the custom CSS (it has its own editor).
*/
function themeId(name, taken) {
	const base = name.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 24) || "theme";
	let id = base;
	for (let i = 2; taken.includes(id); i++) id = `${base}-${i}`;
	return id;
}
function reduce(p, a) {
	switch (a.type) {
		case "load": return a.project;
		case "name": return {
			...p,
			name: a.name.slice(0, 120)
		};
		case "prefix": return isValidPrefix(a.prefix) ? {
			...p,
			prefix: a.prefix
		} : p;
		case "seedKind": return a.kind === p.seed.kind ? p : {
			...p,
			seed: {
				kind: a.kind,
				style: defaultStyle(a.kind)
			}
		};
		case "seed": return {
			...p,
			seed: {
				...p.seed,
				style: setPath(p.seed.style, a.path, a.value)
			}
		};
		case "variant": return {
			...p,
			variant: a.variant
		};
		case "harmony": return {
			...p,
			harmony: a.harmony
		};
		case "global": return {
			...p,
			globals: {
				...p.globals,
				[a.path]: a.value
			}
		};
		case "resetGlobal": {
			const { [a.path]: _gone, ...rest } = p.globals;
			return {
				...p,
				globals: rest,
				locks: p.locks.filter((l) => l !== a.path)
			};
		}
		case "lock": return p.locks.includes(a.path) ? p : {
			...p,
			locks: [...p.locks, a.path],
			globals: {
				...p.globals,
				[a.path]: a.value
			}
		};
		case "unlock": {
			const { [a.path]: _gone, ...rest } = p.globals;
			return {
				...p,
				locks: p.locks.filter((l) => l !== a.path),
				globals: rest
			};
		}
		case "component": return {
			...p,
			components: {
				...p.components,
				[a.kind]: {
					...p.components[a.kind] ?? {},
					[a.path]: a.value
				}
			}
		};
		case "resetComponent": {
			if (!a.path) {
				const { [a.kind]: _gone, ...rest } = p.components;
				return {
					...p,
					components: rest
				};
			}
			const current = { ...p.components[a.kind] ?? {} };
			for (const key of Object.keys(current)) if (key === a.path || key.startsWith(`${a.path}.`)) delete current[key];
			return {
				...p,
				components: {
					...p.components,
					[a.kind]: current
				}
			};
		}
		case "themeAdd": {
			if (p.themes.length >= 12) return p;
			const def = {
				id: themeId(a.name, p.themes.map((t) => t.id)),
				name: a.name.slice(0, 40) || "Theme",
				base: a.base,
				contrast: a.contrast,
				overrides: {}
			};
			return {
				...p,
				themes: [...p.themes, def]
			};
		}
		case "themeUpdate": return {
			...p,
			themes: p.themes.map((t) => t.id === a.id ? {
				...t,
				name: a.name !== void 0 ? a.name.slice(0, 40) : t.name,
				base: a.base ?? t.base,
				contrast: a.contrast ?? t.contrast
			} : t)
		};
		case "themeRole":
			if (!COLOR_ROLES.includes(a.role)) return p;
			return {
				...p,
				themes: p.themes.map((t) => {
					if (t.id !== a.id) return t;
					const overrides = { ...t.overrides };
					if (a.value === null) delete overrides[a.role];
					else overrides[a.role] = a.value;
					return {
						...t,
						overrides
					};
				})
			};
		case "themeRemove": return p.themes.length <= 1 ? p : {
			...p,
			themes: p.themes.filter((t) => t.id !== a.id)
		};
		case "customCss": return {
			...p,
			customCss: a.css.slice(0, 2e5)
		};
		case "resetManual": {
			const locked = Object.fromEntries(Object.entries(p.globals).filter(([k]) => p.locks.includes(k)));
			return {
				...p,
				globals: locked,
				components: {},
				themes: p.themes.map((t) => ({
					...t,
					overrides: {}
				}))
			};
		}
		case "suggestion": return applySuggestion(p, a.suggestion);
	}
}
/** Count of manual edits, for the "you have N own adjustments" hint. */
function manualCount(p) {
	return Object.keys(p.globals).length + COMPONENT_KINDS.reduce((n, k) => n + Object.keys(p.components[k] ?? {}).length, 0) + p.themes.reduce((n, t) => n + Object.keys(t.overrides).length, 0);
}
// node_modules/@tracht-digital-solutions/tds-shared/dist/chunk-5OYAWIY6.js
function localeOf(lang = "de") {
	return lang === "en" ? "en-GB" : "de-DE";
}
function formatBytes(bytes, lang = "de", digits = 1) {
	const units = [
		"B",
		"KB",
		"MB",
		"GB"
	];
	let v = Math.max(0, bytes);
	let u = 0;
	const shown = (n, unit) => Number(n.toFixed(unit === 0 ? 0 : digits));
	while (shown(v, u) >= 1024 && u < units.length - 1) {
		v /= 1024;
		u++;
	}
	const d = u === 0 ? 0 : digits;
	return `${v.toLocaleString(localeOf(lang), {
		minimumFractionDigits: d,
		maximumFractionDigits: d
	})} ${units[u]}`;
}
// node_modules/@tracht-digital-solutions/tds-shared/dist/components/index.js
function Segmented({ value, options, onChange, label, className, disabled }) {
	return /* @__PURE__ */ jsx("div", {
		className: `flex flex-wrap gap-2${className ? ` ${className}` : ""}`,
		role: "group",
		"aria-label": label,
		children: options.map(([v, text]) => /* @__PURE__ */ jsx("button", {
			type: "button",
			className: value === v ? "chip chip-active" : "chip",
			"aria-pressed": value === v,
			disabled,
			onClick: () => onChange(v),
			children: text
		}, String(v)))
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-devkit/islands/studio/controls.tsx
/**
* Small, labelled controls built only from shared primitives (`field-boxed`,
* `chip`, `btn`). Every control names the plain-language property first and
* the CSS property second, so no CSS knowledge is needed to use it.
*/
function Field({ label, tech, children, aside }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "dss-field grid gap-1 text-sm",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex flex-wrap items-center justify-between gap-2",
			children: [/* @__PURE__ */ jsxs("span", {
				className: "opacity-80",
				children: [label, tech && /* @__PURE__ */ jsx("code", {
					className: "ml-2 text-xs opacity-60",
					children: tech
				})]
			}), aside]
		}), children]
	});
}
function Section({ title, children, open = false }) {
	return /* @__PURE__ */ jsxs("details", {
		className: "tds-disclosure dss-section",
		open,
		children: [/* @__PURE__ */ jsx("summary", {
			className: "cursor-pointer py-2 font-semibold",
			children: title
		}), /* @__PURE__ */ jsx("div", {
			className: "grid gap-4 pb-4 pt-2",
			children
		})]
	});
}
/** A range slider with a number box beside it; both edit the same value. */
function NumberInput({ value, onChange, min, max, step = 1, unit, label }) {
	const [draft, setDraft] = useState(String(value));
	useEffect(() => setDraft(String(value)), [value]);
	const commit = (raw) => {
		const n = Number(raw.replace(",", "."));
		if (Number.isFinite(n)) onChange(Math.min(max * 10, Math.max(min < 0 ? min * 10 : 0, n)));
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-2",
		children: [
			/* @__PURE__ */ jsx("input", {
				type: "range",
				className: "min-w-0 flex-1",
				"aria-label": label,
				min,
				max,
				step,
				value: Math.min(max, Math.max(min, value)),
				onChange: (e) => onChange(Number(e.target.value))
			}),
			/* @__PURE__ */ jsx("input", {
				className: "field-boxed text-right",
				style: {
					width: "5rem",
					flex: "none"
				},
				inputMode: "decimal",
				"aria-label": `${label} (${unit ?? "Wert"})`,
				value: draft,
				onChange: (e) => {
					setDraft(e.target.value);
					commit(e.target.value);
				}
			}),
			unit && /* @__PURE__ */ jsx("span", {
				className: "w-8 text-xs opacity-70",
				children: unit
			})
		]
	});
}
function SelectInput({ value, options, onChange, label }) {
	return /* @__PURE__ */ jsx("select", {
		className: "field-boxed w-full",
		"aria-label": label,
		value,
		onChange: (e) => onChange(e.target.value),
		children: options.map(([v, text]) => /* @__PURE__ */ jsx("option", {
			value: v,
			children: text
		}, v))
	});
}
function TextInput({ value, onChange, label, placeholder }) {
	const [draft, setDraft] = useState(value);
	useEffect(() => setDraft(value), [value]);
	return /* @__PURE__ */ jsx("input", {
		className: "field-boxed w-full",
		"aria-label": label,
		value: draft,
		placeholder,
		onChange: (e) => {
			setDraft(e.target.value);
			onChange(e.target.value);
		}
	});
}
function Toggle({ checked, onChange, label }) {
	const id = useId();
	return /* @__PURE__ */ jsxs("div", {
		className: "tds-toggle-row",
		children: [/* @__PURE__ */ jsx("label", {
			htmlFor: id,
			className: "text-sm",
			children: label
		}), /* @__PURE__ */ jsx("input", {
			id,
			type: "checkbox",
			checked,
			onChange: (e) => onChange(e.target.checked)
		})]
	});
}
var ROLE_RE = /^var\(--[a-z0-9-]+?-color-([a-z-]+)\)$/;
var camel = (s) => s.replace(/-([a-z])/g, (_m, c) => c.toUpperCase());
var kebab = (s) => s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
/**
* Colour control: a picker, a free text field (HEX, RGB, HSL, OKLCH, names),
* a transparency slider and — where the value may be a theme role — a role
* selector, so a component colour can follow the theme instead of being fixed.
*/
function ColorInput({ value, onChange, label, t, expert, prefix, resolve }) {
	const roleMatch = ROLE_RE.exec(value.trim());
	const role = roleMatch ? camel(roleMatch[1]) : null;
	const concrete = role ? resolve?.(value) ?? "#000000" : value;
	const parsed = parseColor(concrete);
	const [format, setFormat] = useState("hex");
	const [draft, setDraft] = useState(value);
	useEffect(() => setDraft(value), [value]);
	const alpha = parsed ? parsed.a : 1;
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-2",
		children: [
			prefix && /* @__PURE__ */ jsxs("select", {
				className: "field-boxed w-full",
				"aria-label": `${label}: ${t.f.role}`,
				value: role ?? "__custom",
				onChange: (e) => {
					const v = e.target.value;
					if (v === "__custom") onChange(parsed ? toHex(parsed) : "#000000");
					else onChange(`var(--${prefix}-color-${kebab(v)})`);
				},
				children: [/* @__PURE__ */ jsx("option", {
					value: "__custom",
					children: t.f.customColor
				}), COLOR_ROLES.map((r) => /* @__PURE__ */ jsxs("option", {
					value: r,
					children: [
						t.f.role,
						": ",
						r
					]
				}, r))]
			}),
			!role && /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ jsx("input", {
					type: "color",
					className: "field-boxed p-1",
					style: {
						width: "3.5rem",
						height: "2.75rem",
						flex: "none"
					},
					"aria-label": label,
					value: parsed ? toHex({
						...parsed,
						a: 1
					}).slice(0, 7) : "#000000",
					onChange: (e) => {
						const c = parseColor(e.target.value);
						onChange(toHex({
							...c,
							a: alpha
						}));
					}
				}), /* @__PURE__ */ jsx("input", {
					className: "field-boxed font-mono text-sm",
					style: {
						flex: "1 1 auto",
						minWidth: 0,
						width: "auto"
					},
					"aria-label": `${label} (CSS)`,
					value: draft,
					spellCheck: false,
					onChange: (e) => {
						setDraft(e.target.value);
						if (parseColor(e.target.value) || e.target.value === "transparent") onChange(e.target.value.trim());
					}
				})]
			}),
			!role && expert && parsed && /* @__PURE__ */ jsxs("div", {
				className: "grid gap-2 sm:grid-cols-2",
				children: [/* @__PURE__ */ jsx(Field, {
					label: t.f.alpha,
					tech: "alpha",
					children: /* @__PURE__ */ jsx(NumberInput, {
						label: `${label}: ${t.f.alpha}`,
						value: Math.round(alpha * 100),
						min: 0,
						max: 100,
						unit: "%",
						onChange: (n) => onChange(toHex({
							...parsed,
							a: n / 100
						}))
					})
				}), /* @__PURE__ */ jsx(Field, {
					label: t.f.format,
					children: /* @__PURE__ */ jsx(SelectInput, {
						label: `${label}: ${t.f.format}`,
						value: format,
						options: [
							["hex", "HEX"],
							["rgb", "RGB"],
							["hsl", "HSL"],
							["oklch", "OKLCH"]
						],
						onChange: (f) => {
							setFormat(f);
							onChange(formatColor(parsed, f));
						}
					})
				})]
			})
		]
	});
}
function SourceBadge({ source, t }) {
	if (!source) return null;
	return /* @__PURE__ */ jsx("span", {
		className: `${source === "manual" || source === "locked" ? "chip chip--info" : source === "imported" || source === "seed" ? "chip chip--success" : "chip chip--neutral"} text-xs`,
		children: t.sources[source] ?? source
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-devkit/islands/studio/A11yStep.tsx
var PILL = {
	pass: "status-pill status-pill--ok",
	fail: "status-pill status-pill--danger",
	warn: "status-pill status-pill--warning",
	manual: "status-pill status-pill--muted"
};
function A11yStep({ t, resolved, onApply, onShow }) {
	const report = useMemo(() => auditProject(resolved), [resolved]);
	const [filter, setFilter] = useState(report.counts.fail > 0 ? "problems" : report.counts.warn > 0 ? "warn" : "pass");
	const [themeId, setThemeId] = useState("all");
	const [pending, setPending] = useState(null);
	const [applied, setApplied] = useState(null);
	const { copied, copy } = useCopyFlag(1800);
	const visible = report.findings.filter((f) => {
		if (themeId !== "all" && f.themeId && f.themeId !== themeId) return false;
		if (filter === "all") return true;
		if (filter === "problems") return f.status === "fail";
		return f.status === filter;
	});
	const apply = (f) => {
		if (!f.suggestion) return;
		if (f.suggestion.overridesUserChoice && pending !== f.id) {
			setPending(f.id);
			return;
		}
		onApply(f.suggestion);
		setPending(null);
		setApplied(f.id);
	};
	const themeName = (id) => resolved.themes.find((th) => th.def.id === id)?.def.name;
	const markdown = () => [
		`# ${t.a11y.report} — ${resolved.project.name}`,
		"",
		t.a11y.disclaimer,
		"",
		`| ${t.a11y.result} | ${t.a11y.criterion} | ${t.a11y.subject} | ${t.a11y.property} | ${t.a11y.actual} | ${t.a11y.required} | ${t.a11y.suggestion} |`,
		"|---|---|---|---|---|---|---|",
		...report.findings.map((f) => `| ${t.a11y.status[f.status]} | ${f.criterion} (${f.level}) | ${f.subject}${f.themeId ? ` · ${themeName(f.themeId)}` : ""} | ${f.property} | ${f.actual ?? ""} | ${f.required ?? ""} | ${f.suggestion?.text ?? (f.status === "pass" ? "" : f.message)} |`)
	].join("\n");
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-5",
		children: [
			/* @__PURE__ */ jsx(Alert, {
				tone: "warning",
				className: "text-sm",
				children: t.a11y.disclaimer
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center gap-2",
				"aria-live": "polite",
				children: [
					/* @__PURE__ */ jsxs("span", {
						className: "chip chip--danger",
						children: [
							report.counts.fail,
							" ",
							t.a11y.filters.problems
						]
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "chip chip--warning",
						children: [
							report.counts.warn,
							" ",
							t.a11y.filters.warn
						]
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "chip chip--success",
						children: [
							report.counts.pass,
							" ",
							t.a11y.filters.pass
						]
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "chip chip--neutral",
						children: [
							report.counts.manual,
							" ",
							t.a11y.filters.manual
						]
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ jsx(Segmented, {
					label: t.a11y.title,
					value: filter,
					options: [
						"problems",
						"warn",
						"pass",
						"manual",
						"all"
					].map((k) => [k, t.a11y.filters[k]]),
					onChange: setFilter
				}), /* @__PURE__ */ jsx(Segmented, {
					label: t.preview.theme,
					value: themeId,
					options: [["all", t.a11y.allThemes], ...resolved.themes.map((th) => [th.def.id, th.def.name])],
					onChange: setThemeId
				})]
			}),
			applied && /* @__PURE__ */ jsx(Alert, {
				tone: "success",
				className: "text-sm",
				children: t.a11y.applied
			}),
			report.counts.fail === 0 && !applied && /* @__PURE__ */ jsx(Alert, {
				tone: "success",
				className: "text-sm",
				children: t.a11y.noProblems
			}),
			visible.length === 0 ? /* @__PURE__ */ jsx("p", {
				className: "tds-empty",
				children: t.a11y.none
			}) : /* @__PURE__ */ jsx("ul", {
				className: "grid gap-3",
				children: visible.map((f) => /* @__PURE__ */ jsxs("li", {
					className: "grid gap-2 p-4",
					style: { background: "var(--color-soft)" },
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: PILL[f.status],
									children: t.a11y.status[f.status]
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "text-sm font-semibold",
									children: [f.subject, f.themeId ? ` · ${themeName(f.themeId)}` : ""]
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "text-xs opacity-70",
									children: [
										f.criterion,
										" · ",
										f.level
									]
								})
							]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-sm",
							children: f.message
						}),
						(f.actual || f.required) && /* @__PURE__ */ jsxs("p", {
							className: "text-xs opacity-80",
							children: [
								f.property,
								": ",
								t.a11y.actual,
								" ",
								f.actual ?? "–",
								" · ",
								t.a11y.required,
								" ",
								f.required ?? "–"
							]
						}),
						f.suggestion && f.status !== "pass" && /* @__PURE__ */ jsxs("div", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ jsxs("p", {
									className: "text-sm",
									children: [
										/* @__PURE__ */ jsxs("strong", { children: [t.a11y.suggestion, ":"] }),
										" ",
										f.suggestion.text,
										f.suggestion.after ? ` (→ ${f.suggestion.after}:1)` : ""
									]
								}),
								pending === f.id && /* @__PURE__ */ jsx(Alert, {
									tone: "warning",
									className: "text-sm",
									children: t.a11y.overrideWarn
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap gap-2",
									children: [
										/* @__PURE__ */ jsx("button", {
											type: "button",
											className: "btn btn-primary",
											onClick: () => apply(f),
											children: pending === f.id ? t.a11y.applyAnyway : t.a11y.apply
										}),
										pending === f.id && /* @__PURE__ */ jsx("button", {
											type: "button",
											className: "btn btn-ghost",
											onClick: () => setPending(null),
											children: t.a11y.cancel
										}),
										f.themeId && /* @__PURE__ */ jsx("button", {
											type: "button",
											className: "btn btn-ghost",
											onClick: () => onShow(f.themeId),
											children: t.a11y.show
										})
									]
								})
							]
						})
					]
				}, f.id))
			}),
			/* @__PURE__ */ jsxs("details", {
				className: "tds-disclosure",
				children: [/* @__PURE__ */ jsx("summary", {
					className: "cursor-pointer font-semibold",
					children: t.a11y.report
				}), /* @__PURE__ */ jsxs("div", {
					className: "mt-3 grid gap-3",
					children: [/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "btn btn-ghost",
						onClick: () => void copy(markdown()),
						children: copied ? t.code.copied : t.a11y.copyReport
					}) }), /* @__PURE__ */ jsx("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ jsxs("table", {
							className: "tds-table text-sm",
							children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
								/* @__PURE__ */ jsx("th", {
									scope: "col",
									children: t.a11y.result
								}),
								/* @__PURE__ */ jsx("th", {
									scope: "col",
									children: t.a11y.criterion
								}),
								/* @__PURE__ */ jsx("th", {
									scope: "col",
									children: t.a11y.subject
								}),
								/* @__PURE__ */ jsx("th", {
									scope: "col",
									children: t.a11y.property
								}),
								/* @__PURE__ */ jsx("th", {
									scope: "col",
									children: t.a11y.actual
								}),
								/* @__PURE__ */ jsx("th", {
									scope: "col",
									children: t.a11y.required
								})
							] }) }), /* @__PURE__ */ jsx("tbody", { children: report.findings.map((f) => /* @__PURE__ */ jsxs("tr", { children: [
								/* @__PURE__ */ jsx("td", { children: t.a11y.status[f.status] }),
								/* @__PURE__ */ jsxs("td", { children: [
									f.criterion,
									" (",
									f.level,
									")"
								] }),
								/* @__PURE__ */ jsxs("td", { children: [f.subject, f.themeId ? ` · ${themeName(f.themeId)}` : ""] }),
								/* @__PURE__ */ jsx("td", { children: f.property }),
								/* @__PURE__ */ jsx("td", { children: f.actual ?? "–" }),
								/* @__PURE__ */ jsx("td", { children: f.required ?? "–" })
							] }, f.id)) })]
						})
					})]
				})]
			})
		]
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-devkit/src/studio/cssParser.ts
var isNameStart = (c) => /[A-Za-z_\u0080-￿]/.test(c);
var isName = (c) => /[A-Za-z0-9_\-\u0080-￿]/.test(c);
var isDigit = (c) => c >= "0" && c <= "9";
function tokenize(src, issues = []) {
	const tokens = [];
	let i = 0;
	const n = src.length;
	const push = (type, start, value = src.slice(start, i)) => tokens.push({
		type,
		value,
		start,
		end: i
	});
	const err = (message, offset) => issues.push({
		severity: "error",
		message,
		offset,
		...lineCol$1(src, offset)
	});
	const readEscape = () => {
		i++;
		if (i < n && /[0-9a-fA-F]/.test(src[i])) {
			let k = 0;
			while (i < n && k < 6 && /[0-9a-fA-F]/.test(src[i])) {
				i++;
				k++;
			}
			if (src[i] === " ") i++;
		} else if (i < n) i++;
	};
	const startsIdent = (at) => {
		const c = src[at] ?? "";
		if (c === "-") return isNameStart(src[at + 1] ?? "") || src[at + 1] === "-" || src[at + 1] === "\\" && src[at + 2] !== "\n";
		if (c === "\\") return src[at + 1] !== "\n" && at + 1 < n;
		return isNameStart(c);
	};
	const readName = () => {
		while (i < n) if (src[i] === "\\" && src[i + 1] !== "\n") readEscape();
		else if (isName(src[i])) i++;
		else break;
	};
	const startsNumber = (at) => {
		const c = src[at] ?? "";
		if (isDigit(c)) return true;
		if (c === ".") return isDigit(src[at + 1] ?? "");
		if (c === "+" || c === "-") return isDigit(src[at + 1] ?? "") || src[at + 1] === "." && isDigit(src[at + 2] ?? "");
		return false;
	};
	while (i < n) {
		const start = i;
		const c = src[i];
		if (/\s/.test(c)) {
			while (i < n && /\s/.test(src[i])) i++;
			push("ws", start);
		} else if (c === "/" && src[i + 1] === "*") {
			const close = src.indexOf("*/", i + 2);
			if (close < 0) {
				err("Kommentar wird nicht geschlossen (fehlendes */).", start);
				i = n;
			} else i = close + 2;
			push("comment", start);
		} else if (c === "\"" || c === "'") {
			i++;
			let bad = false;
			while (i < n && src[i] !== c) {
				if (src[i] === "\\") {
					i += 2;
					continue;
				}
				if (src[i] === "\n") {
					bad = true;
					break;
				}
				i++;
			}
			if (i >= n || bad) {
				err("Zeichenkette wird nicht geschlossen.", start);
				push("bad-string", start);
			} else {
				i++;
				push("string", start);
			}
		} else if (startsNumber(i)) {
			if (src[i] === "+" || src[i] === "-") i++;
			while (i < n && isDigit(src[i])) i++;
			if (src[i] === "." && isDigit(src[i + 1] ?? "")) {
				i++;
				while (i < n && isDigit(src[i])) i++;
			}
			if ((src[i] === "e" || src[i] === "E") && (isDigit(src[i + 1] ?? "") || (src[i + 1] === "+" || src[i + 1] === "-") && isDigit(src[i + 2] ?? ""))) {
				i += 2;
				while (i < n && isDigit(src[i])) i++;
			}
			if (src[i] === "%") {
				i++;
				push("percentage", start);
			} else if (startsIdent(i)) {
				readName();
				push("dimension", start);
			} else push("number", start);
		} else if (startsIdent(i)) {
			readName();
			if (src[i] === "(") {
				const name = src.slice(start, i).toLowerCase();
				i++;
				if (name === "url") {
					let j = i;
					while (j < n && /\s/.test(src[j])) j++;
					if (src[j] !== "\"" && src[j] !== "'") {
						const close = src.indexOf(")", j);
						if (close < 0) {
							err("url( wird nicht geschlossen.", start);
							i = n;
						} else i = close + 1;
						push("url", start);
						continue;
					}
				}
				push("function", start);
			} else push("ident", start);
		} else if (c === "@") {
			i++;
			if (startsIdent(i)) {
				readName();
				push("at-keyword", start);
			} else push("delim", start);
		} else if (c === "#") {
			i++;
			if (i < n && (isName(src[i]) || src[i] === "\\")) {
				readName();
				push("hash", start);
			} else push("delim", start);
		} else if (c === "<" && src.startsWith("<!--", i)) {
			i += 4;
			push("cdo", start);
		} else if (c === "-" && src.startsWith("-->", i)) {
			i += 3;
			push("cdc", start);
		} else {
			i++;
			push({
				":": "colon",
				";": "semicolon",
				",": "comma",
				"{": "{",
				"}": "}",
				"(": "(",
				")": ")",
				"[": "[",
				"]": "]"
			}[c] ?? "delim", start);
		}
	}
	return tokens;
}
function lineCol$1(src, offset) {
	let line = 1;
	let last = -1;
	for (let k = 0; k < offset && k < src.length; k++) if (src[k] === "\n") {
		line++;
		last = k;
	}
	return {
		line,
		column: offset - last
	};
}
/** At-rules whose block holds rules (not declarations). */
var RULE_BLOCK_AT = /* @__PURE__ */ new Set([
	"media",
	"supports",
	"layer",
	"container",
	"document",
	"scope",
	"starting-style"
]);
/** At-rules whose block holds declarations. */
var DECL_BLOCK_AT = /* @__PURE__ */ new Set([
	"font-face",
	"page",
	"property",
	"counter-style",
	"font-palette-values",
	"viewport"
]);
function parseCss(src) {
	const issues = [];
	const toks = tokenize(src, issues).filter((t) => t.type !== "comment");
	let pos = 0;
	const err = (message, offset, severity = "error") => issues.push({
		severity,
		message,
		offset,
		...lineCol$1(src, offset)
	});
	const text = (from, to) => src.slice(from, to).trim().replace(/\s+/g, " ");
	/** Consumes tokens until a stop token at depth 0, returning the end offset. */
	const skipBalanced = (stops) => {
		const stack = [];
		while (pos < toks.length) {
			const t = toks[pos];
			if (stack.length === 0 && stops.includes(t.type)) return t.start;
			if (t.type === "{" || t.type === "(" || t.type === "[" || t.type === "function") stack.push(t.type);
			else if (t.type === "}" || t.type === ")" || t.type === "]") {
				const open = stack.pop();
				if (open === void 0) return t.start;
				const want = t.type === "}" ? "{" : t.type === ")" ? ["(", "function"] : "[";
				if (Array.isArray(want) ? !want.includes(open) : open !== want) err(`Klammern passen nicht zusammen („${t.value}“).`, t.start);
			}
			pos++;
		}
		return src.length;
	};
	const parseBlock = (mode, closeAt) => {
		const out = [];
		while (pos < toks.length) {
			const t = toks[pos];
			if (t.type === "ws" || t.type === "semicolon" || t.type === "cdo" || t.type === "cdc") {
				pos++;
				continue;
			}
			if (t.type === "}") {
				if (closeAt) return out;
				err("Überzählige schließende Klammer „}“.", t.start);
				pos++;
				continue;
			}
			if (t.type === "at-keyword") {
				out.push(parseAt());
				continue;
			}
			if (mode !== "rules" && isDeclStart()) {
				const d = parseDecl();
				if (d) out.push(d);
				continue;
			}
			if (mode === "decls") {
				err("Ungültige Deklaration (erwartet „Eigenschaft: Wert;“).", t.start);
				skipBalanced(["semicolon", "}"]);
				continue;
			}
			out.push(parseRule());
		}
		if (closeAt) err("Block wird nicht geschlossen (fehlende „}“).", src.length);
		return out;
	};
	/** Is the token stream at `ident ws* :` (and not a selector like `a:hover {`)? */
	const isDeclStart = () => {
		const t = toks[pos];
		if (t.type !== "ident") return false;
		let j = pos + 1;
		while (toks[j]?.type === "ws") j++;
		if (toks[j]?.type !== "colon") return false;
		if (t.value.startsWith("--")) return true;
		let depth = 0;
		for (let k = j + 1; k < toks.length; k++) {
			const tk = toks[k];
			if (tk.type === "(" || tk.type === "function" || tk.type === "[") depth++;
			else if (tk.type === ")" || tk.type === "]") depth--;
			else if (depth === 0 && (tk.type === "semicolon" || tk.type === "}")) return true;
			else if (depth === 0 && tk.type === "{") return false;
		}
		return true;
	};
	const parseDecl = () => {
		const first = toks[pos];
		const prop = first.value;
		pos++;
		while (toks[pos]?.type === "ws") pos++;
		pos++;
		const vStart = toks[pos]?.start ?? src.length;
		const end = skipBalanced(["semicolon", "}"]);
		let value = src.slice(vStart, end).replace(/\/\*[\s\S]*?\*\//g, "").trim();
		let important = false;
		const imp = /!\s*important\s*$/i.exec(value);
		if (imp) {
			important = true;
			value = value.slice(0, imp.index).trim();
		}
		if (toks[pos]?.type === "semicolon") pos++;
		if (value === "") {
			err(`„${prop}“ hat keinen Wert.`, first.start);
			return null;
		}
		if (!prop.startsWith("--")) {
			const lower = prop.toLowerCase();
			if (!KNOWN_PROPERTIES.has(lower) && !/^-(webkit|moz|ms|o)-/.test(lower)) err(`Unbekannte Eigenschaft „${prop}“ — Tippfehler?`, first.start, "warning");
		}
		return {
			type: "decl",
			prop: prop.startsWith("--") ? prop : prop.toLowerCase(),
			value,
			important,
			start: first.start,
			end
		};
	};
	const parseRule = () => {
		const start = toks[pos].start;
		const preludeEnd = skipBalanced([
			"{",
			"semicolon",
			"}"
		]);
		const selector = text(start, preludeEnd);
		const t = toks[pos];
		if (!t || t.type !== "{") {
			err(`Nach „${selector.slice(0, 40)}“ fehlt ein „{“.`, start);
			if (t?.type === "semicolon") pos++;
			return {
				type: "rule",
				selector,
				body: [],
				start,
				end: preludeEnd
			};
		}
		if (selector === "") err("Regel ohne Selektor.", start);
		pos++;
		const body = parseBlock("mixed", true);
		const end = toks[pos]?.end ?? src.length;
		if (toks[pos]?.type === "}") pos++;
		return {
			type: "rule",
			selector,
			body,
			start,
			end
		};
	};
	const parseAt = () => {
		const kw = toks[pos];
		const name = kw.value.slice(1).toLowerCase();
		pos++;
		const preStart = toks[pos]?.start ?? src.length;
		const preEnd = skipBalanced([
			"{",
			"semicolon",
			"}"
		]);
		const prelude = text(preStart, preEnd);
		const t = toks[pos];
		if (!t || t.type !== "{") {
			if (t?.type === "semicolon") pos++;
			return {
				type: "at",
				name,
				prelude,
				body: null,
				start: kw.start,
				end: preEnd
			};
		}
		pos++;
		const mode = RULE_BLOCK_AT.has(name) ? "rules" : DECL_BLOCK_AT.has(name) ? "decls" : name === "keyframes" || name.endsWith("-keyframes") ? "rules" : "mixed";
		const body = parseBlock(mode, true);
		const end = toks[pos]?.end ?? src.length;
		if (toks[pos]?.type === "}") pos++;
		return {
			type: "at",
			name,
			prelude,
			body,
			start: kw.start,
			end
		};
	};
	return {
		nodes: parseBlock("rules", false),
		issues
	};
}
/** Serialises nodes back to CSS (normalised whitespace, comments dropped). */
function stringify(nodes, indent = "") {
	let out = "";
	for (const node of nodes) if (node.type === "decl") out += `${indent}${node.prop}: ${node.value}${node.important ? " !important" : ""};\n`;
	else if (node.type === "rule") out += `${indent}${node.selector} {\n${stringify(node.body, `${indent}  `)}${indent}}\n`;
	else if (node.body === null) out += `${indent}@${node.name}${node.prelude ? ` ${node.prelude}` : ""};\n`;
	else out += `${indent}@${node.name}${node.prelude ? ` ${node.prelude}` : ""} {\n${stringify(node.body, `${indent}  `)}${indent}}\n`;
	return out;
}
/**
* Flattens nested rules into selector + declarations, resolving CSS nesting
* (`&`) and recording the at-rule context of each rule.
*/
function flattenRules(nodes) {
	const out = [];
	let order = 0;
	const walk = (list, parentSel, context) => {
		for (const node of list) if (node.type === "rule") {
			const sel = parentSel ? nestSelector(parentSel, node.selector) : node.selector;
			const decls = node.body.filter((b) => b.type === "decl");
			if (decls.length) out.push({
				selector: sel,
				decls,
				context,
				order: order++
			});
			walk(node.body.filter((b) => b.type !== "decl"), sel, context);
		} else if (node.type === "at" && node.body) {
			if (node.name === "keyframes" || node.name.endsWith("keyframes") || node.name === "font-face") continue;
			const decls = node.body.filter((b) => b.type === "decl");
			if (decls.length && parentSel) out.push({
				selector: parentSel,
				decls,
				context: [...context, `${node.name} ${node.prelude}`],
				order: order++
			});
			walk(node.body.filter((b) => b.type !== "decl"), parentSel, [...context, `${node.name} ${node.prelude}`.trim()]);
		}
	};
	walk(nodes, null, []);
	return out;
}
function nestSelector(parent, child) {
	const parents = splitSelectorList(parent);
	return splitSelectorList(child).flatMap((c) => parents.map((p) => c.includes("&") ? c.replace(/&/g, p) : `${p} ${c}`)).join(", ");
}
/** Splits a selector list on top-level commas. */
function splitSelectorList(selector) {
	const out = [];
	let depth = 0;
	let quote = null;
	let cur = "";
	for (const ch of selector) {
		if (quote) {
			cur += ch;
			if (ch === quote) quote = null;
			continue;
		}
		if (ch === "\"" || ch === "'") quote = ch;
		if (ch === "(" || ch === "[") depth++;
		if (ch === ")" || ch === "]") depth--;
		if (ch === "," && depth === 0) {
			if (cur.trim()) out.push(cur.trim());
			cur = "";
		} else cur += ch;
	}
	if (cur.trim()) out.push(cur.trim());
	return out;
}
/** Selector specificity [ids, classes/attributes/pseudo-classes, types]. */
function specificity(selector) {
	let a = 0;
	let b = 0;
	let c = 0;
	let s = selector.replace(/"[^"]*"|'[^']*'/g, "");
	s = s.replace(/:where\((?:[^()]|\([^()]*\))*\)/g, "");
	s = s.replace(/:(is|not|has|matches)\(((?:[^()]|\([^()]*\))*)\)/g, (_m, _n, inner) => {
		const best = splitSelectorList(inner).map(specificity).sort((x, y) => y[0] - x[0] || y[1] - x[1] || y[2] - x[2])[0] ?? [
			0,
			0,
			0
		];
		a += best[0];
		b += best[1];
		c += best[2];
		return "";
	});
	a += (s.match(/#[\w-]+/g) ?? []).length;
	b += (s.match(/\.[\w-]+/g) ?? []).length;
	b += (s.match(/\[[^\]]*\]/g) ?? []).length;
	b += (s.replace(/::[\w-]+/g, "").match(/:[\w-]+(\([^)]*\))?/g) ?? []).length;
	c += (s.match(/::[\w-]+/g) ?? []).length;
	c += (s.replace(/\[[^\]]*\]/g, "").replace(/[#.:][\w-]+(\([^)]*\))?/g, "").match(/(^|[\s>+~])([a-zA-Z][\w-]*)/g) ?? []).length;
	return [
		a,
		b,
		c
	];
}
/** The base selector without trailing state pseudo-classes, e.g. `.btn:hover` → `.btn`. */
function stripState(selector) {
	const m = /^(.*?)(:(hover|focus|focus-visible|focus-within|active|disabled))+$/.exec(selector.trim());
	if (!m) return {
		base: selector.trim(),
		state: null
	};
	const state = /:(hover|focus-visible|focus-within|focus|active|disabled)$/.exec(selector.trim())?.[1] ?? null;
	return {
		base: m[1].trim(),
		state
	};
}
var KNOWN_PROPERTIES = new Set("accent-color align-content align-items align-self all animation animation-composition animation-delay animation-direction animation-duration animation-fill-mode animation-iteration-count animation-name animation-play-state animation-timeline animation-timing-function appearance aspect-ratio backdrop-filter backface-visibility background background-attachment background-blend-mode background-clip background-color background-image background-origin background-position background-position-x background-position-y background-repeat background-size block-size border border-block border-block-color border-block-end border-block-end-color border-block-end-style border-block-end-width border-block-start border-block-start-color border-block-start-style border-block-start-width border-block-style border-block-width border-bottom border-bottom-color border-bottom-left-radius border-bottom-right-radius border-bottom-style border-bottom-width border-collapse border-color border-end-end-radius border-end-start-radius border-image border-image-outset border-image-repeat border-image-slice border-image-source border-image-width border-inline border-inline-color border-inline-end border-inline-end-color border-inline-end-style border-inline-end-width border-inline-start border-inline-start-color border-inline-start-style border-inline-start-width border-inline-style border-inline-width border-left border-left-color border-left-style border-left-width border-radius border-right border-right-color border-right-style border-right-width border-spacing border-start-end-radius border-start-start-radius border-style border-top border-top-color border-top-left-radius border-top-right-radius border-top-style border-top-width border-width bottom box-decoration-break box-shadow box-sizing break-after break-before break-inside caption-side caret-color clear clip clip-path color color-scheme column-count column-fill column-gap column-rule column-rule-color column-rule-style column-rule-width column-span column-width columns contain contain-intrinsic-size container container-name container-type content content-visibility counter-increment counter-reset counter-set cursor direction display empty-cells field-sizing fill filter flex flex-basis flex-direction flex-flow flex-grow flex-shrink flex-wrap float font font-display font-family font-feature-settings font-kerning font-optical-sizing font-palette font-size font-size-adjust font-stretch font-style font-synthesis font-variant font-variant-caps font-variant-ligatures font-variant-numeric font-variation-settings font-weight forced-color-adjust gap grid grid-area grid-auto-columns grid-auto-flow grid-auto-rows grid-column grid-column-end grid-column-gap grid-column-start grid-gap grid-row grid-row-end grid-row-gap grid-row-start grid-template grid-template-areas grid-template-columns grid-template-rows hanging-punctuation height hyphens hyphenate-character image-rendering inline-size inset inset-block inset-block-end inset-block-start inset-inline inset-inline-end inset-inline-start isolation justify-content justify-items justify-self left letter-spacing line-break line-clamp line-height list-style list-style-image list-style-position list-style-type margin margin-block margin-block-end margin-block-start margin-bottom margin-inline margin-inline-end margin-inline-start margin-left margin-right margin-top marker mask mask-image mask-mode mask-position mask-repeat mask-size max-block-size max-height max-inline-size max-width min-block-size min-height min-inline-size min-width mix-blend-mode object-fit object-position offset opacity order orphans outline outline-color outline-offset outline-style outline-width overflow overflow-anchor overflow-block overflow-clip-margin overflow-inline overflow-wrap overflow-x overflow-y overscroll-behavior overscroll-behavior-block overscroll-behavior-inline overscroll-behavior-x overscroll-behavior-y padding padding-block padding-block-end padding-block-start padding-bottom padding-inline padding-inline-end padding-inline-start padding-left padding-right padding-top page page-break-after page-break-before page-break-inside paint-order perspective perspective-origin place-content place-items place-self pointer-events position print-color-adjust quotes resize right rotate row-gap ruby-position scale scroll-behavior scroll-margin scroll-margin-block scroll-margin-bottom scroll-margin-inline scroll-margin-left scroll-margin-right scroll-margin-top scroll-padding scroll-padding-block scroll-padding-bottom scroll-padding-inline scroll-padding-left scroll-padding-right scroll-padding-top scroll-snap-align scroll-snap-stop scroll-snap-type scrollbar-color scrollbar-gutter scrollbar-width shape-image-threshold shape-margin shape-outside stroke stroke-width stroke-linecap stroke-linejoin stroke-dasharray stroke-dashoffset tab-size table-layout text-align text-align-last text-combine-upright text-decoration text-decoration-color text-decoration-line text-decoration-skip-ink text-decoration-style text-decoration-thickness text-emphasis text-indent text-justify text-orientation text-overflow text-rendering text-shadow text-size-adjust text-transform text-underline-offset text-underline-position text-wrap text-wrap-mode text-wrap-style top touch-action transform transform-box transform-origin transform-style transition transition-behavior transition-delay transition-duration transition-property transition-timing-function translate unicode-bidi user-select vertical-align view-transition-name visibility white-space white-space-collapse widows width will-change word-break word-spacing word-wrap writing-mode z-index zoom src font-named-instance unicode-range size-adjust ascent-override descent-override line-gap-override syntax inherits initial-value interpolate-size anchor-name position-anchor".split(" "));
// node_modules/@tracht-digital-solutions/tds-tool-devkit/src/studio/customCss.ts
/**
* Checks the user's own CSS: syntax errors and warnings from the parser, plus
* the properties it overrides in generated component rules. Overriding is
* allowed — custom CSS is the highest layer on purpose — but it is shown, so a
* later change in the visual editor that "does nothing" has a visible cause.
*/
var norm = (s) => s.replace(/\s+/g, " ").replace(/\s*([>+~,])\s*/g, "$1").trim();
function checkCustomCss(r) {
	const src = r.project.customCss;
	const { nodes, issues } = parseCss(src);
	const generated = flattenRules(parseCss(emitCss(r, {
		includeCustom: false,
		includeImported: false,
		header: false
	})).nodes);
	const genProps = /* @__PURE__ */ new Map();
	for (const rule of generated) for (const sel of splitSelectorList(rule.selector)) {
		const key = norm(sel);
		const set = genProps.get(key) ?? /* @__PURE__ */ new Set();
		for (const d of rule.decls) if (!d.prop.startsWith("--")) set.add(d.prop);
		genProps.set(key, set);
	}
	const kindOf = (sel) => {
		for (const k of [...COMPONENT_KINDS].reverse()) if (norm(sel).startsWith(norm(componentSelector(r.project.prefix, k)))) return k;
		return null;
	};
	const conflicts = [];
	for (const rule of flattenRules(nodes)) for (const sel of splitSelectorList(rule.selector)) {
		const props = genProps.get(norm(sel));
		if (!props) continue;
		for (const d of rule.decls) if (props.has(d.prop)) {
			const line = src.slice(0, d.start).split("\n").length;
			conflicts.push({
				selector: sel,
				property: d.prop,
				kind: kindOf(sel),
				line
			});
		}
	}
	for (const rule of flattenRules(nodes)) for (const d of rule.decls) if (d.important) {
		const line = src.slice(0, d.start).split("\n").length;
		issues.push({
			severity: "warning",
			message: `„${d.prop}“ mit !important lässt sich später kaum noch überschreiben.`,
			line,
			column: 1,
			offset: d.start
		});
	}
	return {
		issues,
		conflicts
	};
}
// node_modules/@tracht-digital-solutions/tds-tool-devkit/islands/studio/CodeStep.tsx
var COLORS = {
	comment: "var(--color-muted)",
	"at-keyword": "var(--color-accent)",
	string: "var(--color-success, #15803d)",
	"bad-string": "var(--color-danger)",
	hash: "var(--color-warning, #b45309)",
	number: "var(--color-warning, #b45309)",
	percentage: "var(--color-warning, #b45309)",
	dimension: "var(--color-warning, #b45309)",
	function: "var(--color-accent)",
	url: "var(--color-success, #15803d)"
};
/** Syntax highlighting from the same tokenizer that validates the CSS. */
function highlight(css) {
	const toks = tokenize(css);
	const out = [];
	for (let i = 0; i < toks.length; i++) {
		const tok = toks[i];
		let color = COLORS[tok.type];
		if (tok.type === "ident") {
			let j = i + 1;
			while (toks[j]?.type === "ws") j++;
			if (toks[j]?.type === "colon") color = "var(--color-primary, #1d4ed8)";
		}
		out.push(color ? /* @__PURE__ */ jsx("span", {
			style: { color },
			children: tok.value
		}, i) : tok.value);
	}
	return out;
}
function CodeBlock({ code, t, canCopy }) {
	const { copied, copy } = useCopyFlag(1800);
	const deferred = useDeferredValue(code);
	const nodes = useMemo(() => highlight(deferred), [deferred]);
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-2",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "btn btn-ghost",
				disabled: !canCopy,
				onClick: () => void copy(code),
				children: copied ? t.code.copied : t.code.copy
			}), !canCopy && /* @__PURE__ */ jsx("span", {
				className: "text-sm opacity-80",
				children: t.code.copyLocked
			})]
		}), /* @__PURE__ */ jsx("pre", {
			className: "dss-code max-h-96 overflow-auto p-4 font-mono text-xs leading-relaxed",
			style: {
				background: "var(--color-soft)",
				margin: 0
			},
			tabIndex: 0,
			children: /* @__PURE__ */ jsx("code", { children: nodes })
		})]
	});
}
/**
* A textarea over a highlighted copy of its own text. The textarea keeps every
* native editing behaviour (undo, IME, screen readers); the layer behind it
* only paints. Its metrics are copied from the textarea at runtime, because
* the shared `field-boxed` padding is the source of truth, not this file.
*/
function CssEditor({ value, onChange, label }) {
	const area = useRef(null);
	const layer = useRef(null);
	const deferred = useDeferredValue(value);
	const nodes = useMemo(() => highlight(deferred), [deferred]);
	useLayoutEffect(() => {
		const a = area.current;
		const l = layer.current;
		if (!a || !l || typeof getComputedStyle !== "function") return;
		const cs = getComputedStyle(a);
		for (const prop of [
			"paddingTop",
			"paddingRight",
			"paddingBottom",
			"paddingLeft",
			"fontSize",
			"lineHeight",
			"letterSpacing",
			"borderTopWidth",
			"borderLeftWidth"
		]) l.style[prop] = cs[prop];
	}, []);
	const sync = () => {
		if (area.current && layer.current) {
			layer.current.scrollTop = area.current.scrollTop;
			layer.current.scrollLeft = area.current.scrollLeft;
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "relative",
		children: [/* @__PURE__ */ jsxs("pre", {
			ref: layer,
			"aria-hidden": "true",
			className: "pointer-events-none absolute inset-0 m-0 overflow-hidden whitespace-pre font-mono",
			style: {
				borderStyle: "solid",
				borderColor: "transparent"
			},
			children: [/* @__PURE__ */ jsx("code", { children: nodes }), "\n"]
		}), /* @__PURE__ */ jsx("textarea", {
			ref: area,
			className: "field-boxed relative block min-h-64 w-full whitespace-pre font-mono text-sm",
			style: {
				background: "transparent",
				color: "transparent",
				caretColor: "var(--color-ink, currentColor)",
				overflowWrap: "normal"
			},
			"aria-label": label,
			spellCheck: false,
			autoCapitalize: "off",
			autoCorrect: "off",
			wrap: "off",
			value,
			onScroll: sync,
			onChange: (e) => onChange(e.target.value)
		})]
	});
}
function CodeStep({ t, resolved, customCss, onCustomCss, canCopy }) {
	const [kind, setKind] = useState("button");
	const full = useMemo(() => emitCss(resolved), [resolved]);
	const single = useMemo(() => singleComponentCss(resolved, kind), [resolved, kind]);
	const deferred = useDeferredValue(resolved);
	const check = useMemo(() => checkCustomCss(deferred), [deferred]);
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-8",
		children: [
			/* @__PURE__ */ jsxs("section", {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ jsx("h3", {
						className: "eyebrow",
						children: t.code.custom
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm opacity-80",
						children: t.code.customHint
					}),
					/* @__PURE__ */ jsx(CssEditor, {
						value: customCss,
						onChange: onCustomCss,
						label: t.code.editorLabel
					}),
					/* @__PURE__ */ jsxs("div", {
						"aria-live": "polite",
						className: "grid gap-2",
						children: [check.issues.length === 0 ? /* @__PURE__ */ jsx("p", {
							className: "text-sm opacity-80",
							children: t.code.noIssues
						}) : /* @__PURE__ */ jsx("ul", {
							className: "tds-alert tds-alert--warning grid gap-1 text-sm",
							children: check.issues.slice(0, 30).map((i, n) => /* @__PURE__ */ jsxs("li", { children: [
								/* @__PURE__ */ jsxs("strong", { children: [
									t.code.line,
									" ",
									i.line,
									":"
								] }),
								" ",
								i.message
							] }, n))
						}), check.conflicts.length > 0 && /* @__PURE__ */ jsxs("div", {
							className: "tds-alert tds-alert--warning text-sm",
							children: [/* @__PURE__ */ jsx("p", {
								className: "font-semibold",
								children: t.code.conflicts
							}), /* @__PURE__ */ jsx("ul", {
								className: "grid gap-1",
								children: check.conflicts.map((c, n) => /* @__PURE__ */ jsxs("li", { children: [
									t.code.line,
									" ",
									c.line,
									": ",
									/* @__PURE__ */ jsx("code", { children: c.selector }),
									" → ",
									/* @__PURE__ */ jsx("code", { children: c.property }),
									c.kind ? ` (${t.kinds[c.kind]})` : ""
								] }, n))
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ jsx("h3", {
						className: "eyebrow",
						children: t.code.component
					}),
					/* @__PURE__ */ jsx(Field, {
						label: t.system.component,
						children: /* @__PURE__ */ jsx(SelectInput, {
							label: t.system.component,
							value: kind,
							options: COMPONENT_KINDS.map((k) => [k, t.kinds[k]]),
							onChange: (k) => setKind(k)
						})
					}),
					/* @__PURE__ */ jsx(CodeBlock, {
						code: single,
						t,
						canCopy
					})
				]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "grid gap-3",
				children: [/* @__PURE__ */ jsx("h3", {
					className: "eyebrow",
					children: t.code.generated
				}), /* @__PURE__ */ jsx(CodeBlock, {
					code: full,
					t,
					canCopy
				})]
			})
		]
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-devkit/islands/studio/ComponentEditor.tsx
var SIDES = [
	"top",
	"right",
	"bottom",
	"left"
];
var CORNERS$1 = [
	"tl",
	"tr",
	"br",
	"bl"
];
var SHADOW_PRESETS = {
	none: "none",
	soft: "0 1px 3px rgba(15, 23, 42, 0.12)",
	medium: "0 6px 18px rgba(15, 23, 42, 0.14)",
	hard: "4px 4px 0 rgba(15, 23, 42, 0.9)"
};
var fontOptions = (t, current) => {
	const known = Object.entries(FONT_STACKS).map(([id, stack]) => [stack, t.presets.fonts[id]]);
	return known.some(([s]) => s === current) ? known : [[current, current.split(",")[0].replace(/["']/g, "")], ...known];
};
/** Detects which hover preset a state set corresponds to (for the simple mode chips). */
function hoverPreset(h) {
	if ((h.translateY ?? 0) < 0) return "lift";
	if ((h.scale ?? 1) > 1) return "scale";
	if (h.shadow && h.shadow !== "none" && h.shadow.includes("0 0 0")) return "glow";
	if (h.background) return "darken";
	return "none";
}
/**
* Edits one {@link ComponentStyle}. Used for the seed (the wizard) and for
* per-component overrides in the system view; `sources` marks values the user
* set there and `onReset` takes them back.
*/
function ComponentEditor({ style, onChange, t, mode, prefix, sources, onReset, resolveColor, showStates = true }) {
	const expert = mode === "expert";
	const [perSide, setPerSide] = useState(false);
	const [perCorner, setPerCorner] = useState(false);
	const [state, setState] = useState("hover");
	const st = style.states[state];
	const marker = (path) => {
		const s = sources && Object.keys(sources).find((k) => k === path || k.startsWith(`${path}.`)) ? sources[Object.keys(sources).find((k) => k === path || k.startsWith(`${path}.`))] : void 0;
		if (!s || s === "generated") return void 0;
		return /* @__PURE__ */ jsxs("span", {
			className: "flex items-center gap-1",
			children: [/* @__PURE__ */ jsx(SourceBadge, {
				source: s,
				t
			}), s === "manual" && onReset && /* @__PURE__ */ jsx("button", {
				type: "button",
				className: "btn btn-ghost px-2 py-0 text-xs",
				onClick: () => onReset(path),
				children: t.system.reset
			})]
		});
	};
	const color = (path, label, tech, value) => /* @__PURE__ */ jsx(Field, {
		label,
		tech,
		aside: marker(path),
		children: /* @__PURE__ */ jsx(ColorInput, {
			value,
			label,
			t,
			expert,
			prefix,
			resolve: resolveColor,
			onChange: (v) => onChange(path, v)
		})
	});
	const uniformBorder = Math.max(...SIDES.map((s) => style.borderWidth[s]));
	const uniformRadius = style.radius.tl;
	const shadow = parseShadow(style.shadow);
	return /* @__PURE__ */ jsxs("div", {
		className: "dss-editor grid gap-1",
		children: [
			/* @__PURE__ */ jsxs(Section, {
				title: t.g.colors,
				open: true,
				children: [
					color("background", t.f.background, "background", style.background),
					/* @__PURE__ */ jsx(Toggle, {
						label: t.f.gradient,
						checked: !!style.gradientTo,
						onChange: (on) => onChange("gradientTo", on ? style.background.startsWith("var(") ? style.background : "#7c3aed" : "")
					}),
					style.gradientTo && color("gradientTo", t.f.gradientTo, "linear-gradient", style.gradientTo),
					style.gradientTo && expert && /* @__PURE__ */ jsx(Field, {
						label: t.f.gradientAngle,
						tech: "deg",
						children: /* @__PURE__ */ jsx(NumberInput, {
							label: t.f.gradientAngle,
							value: style.gradientAngle,
							min: 0,
							max: 360,
							unit: "°",
							onChange: (v) => onChange("gradientAngle", v)
						})
					}),
					color("color", t.f.color, "color", style.color),
					expert && /* @__PURE__ */ jsx(Field, {
						label: t.f.opacity,
						tech: "opacity",
						aside: marker("opacity"),
						children: /* @__PURE__ */ jsx(NumberInput, {
							label: t.f.opacity,
							value: Math.round(style.opacity * 100),
							min: 0,
							max: 100,
							unit: "%",
							onChange: (v) => onChange("opacity", v / 100)
						})
					})
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				title: t.g.type,
				children: [
					/* @__PURE__ */ jsx(Field, {
						label: t.f.fontFamily,
						tech: "font-family",
						aside: marker("fontFamily"),
						children: /* @__PURE__ */ jsx(SelectInput, {
							label: t.f.fontFamily,
							value: style.fontFamily,
							options: fontOptions(t, style.fontFamily),
							onChange: (v) => onChange("fontFamily", v)
						})
					}),
					expert && /* @__PURE__ */ jsx(Field, {
						label: t.f.customFont,
						tech: "font-family",
						children: /* @__PURE__ */ jsx(TextInput, {
							label: t.f.customFont,
							value: style.fontFamily,
							onChange: (v) => v.trim() && onChange("fontFamily", v)
						})
					}),
					/* @__PURE__ */ jsx(Field, {
						label: t.f.fontSize,
						tech: "font-size",
						aside: marker("fontSize"),
						children: /* @__PURE__ */ jsx(NumberInput, {
							label: t.f.fontSize,
							value: style.fontSize,
							min: 10,
							max: 72,
							unit: "px",
							onChange: (v) => onChange("fontSize", v)
						})
					}),
					/* @__PURE__ */ jsx(Field, {
						label: t.f.fontWeight,
						tech: "font-weight",
						aside: marker("fontWeight"),
						children: /* @__PURE__ */ jsx(SelectInput, {
							label: t.f.fontWeight,
							value: String(style.fontWeight),
							options: [
								300,
								400,
								500,
								600,
								700,
								800,
								900
							].map((w) => [String(w), `${w} · ${t.presets.weight[w]}`]),
							onChange: (v) => onChange("fontWeight", Number(v))
						})
					}),
					expert && /* @__PURE__ */ jsx(Field, {
						label: t.f.lineHeight,
						tech: "line-height",
						aside: marker("lineHeight"),
						children: /* @__PURE__ */ jsx(NumberInput, {
							label: t.f.lineHeight,
							value: style.lineHeight,
							min: .8,
							max: 2.4,
							step: .05,
							onChange: (v) => onChange("lineHeight", v)
						})
					}),
					/* @__PURE__ */ jsx(Field, {
						label: t.f.letterSpacing,
						tech: "letter-spacing",
						aside: marker("letterSpacing"),
						children: /* @__PURE__ */ jsx(NumberInput, {
							label: t.f.letterSpacing,
							value: style.letterSpacing,
							min: -.05,
							max: .3,
							step: .005,
							unit: "em",
							onChange: (v) => onChange("letterSpacing", v)
						})
					}),
					/* @__PURE__ */ jsx(Field, {
						label: t.f.textTransform,
						tech: "text-transform",
						aside: marker("textTransform"),
						children: /* @__PURE__ */ jsx(Segmented, {
							label: t.f.textTransform,
							value: style.textTransform,
							options: [
								"none",
								"uppercase",
								"lowercase",
								"capitalize"
							].map((v) => [v, t.presets.transform[v]]),
							onChange: (v) => onChange("textTransform", v)
						})
					}),
					expert && /* @__PURE__ */ jsx(Field, {
						label: t.f.textAlign,
						tech: "text-align",
						children: /* @__PURE__ */ jsx(Segmented, {
							label: t.f.textAlign,
							value: style.textAlign,
							options: [
								"left",
								"center",
								"right"
							].map((v) => [v, t.presets.align[v]]),
							onChange: (v) => onChange("textAlign", v)
						})
					})
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				title: t.g.border,
				children: [
					/* @__PURE__ */ jsx(Toggle, {
						label: t.f.borderOn,
						checked: uniformBorder > 0 && style.borderStyle !== "none",
						onChange: (on) => {
							for (const s of SIDES) onChange(`borderWidth.${s}`, on ? 1 : 0);
							if (on && style.borderStyle === "none") onChange("borderStyle", "solid");
						}
					}),
					uniformBorder > 0 && /* @__PURE__ */ jsxs(Fragment$1, { children: [
						expert && /* @__PURE__ */ jsx(Toggle, {
							label: t.f.perSide,
							checked: perSide,
							onChange: setPerSide
						}),
						perSide && expert ? SIDES.map((s) => /* @__PURE__ */ jsxs("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ jsx(Field, {
								label: `${t.f.borderWidth} (${t.f[s]})`,
								tech: `border-${s}-width`,
								aside: marker(`borderWidth.${s}`),
								children: /* @__PURE__ */ jsx(NumberInput, {
									label: `${t.f.borderWidth} ${t.f[s]}`,
									value: style.borderWidth[s],
									min: 0,
									max: 12,
									unit: "px",
									onChange: (v) => onChange(`borderWidth.${s}`, v)
								})
							}), color(`borderColor.${s}`, `${t.f.borderColor} (${t.f[s]})`, `border-${s}-color`, style.borderColor[s])]
						}, s)) : /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Field, {
							label: t.f.borderWidth,
							tech: "border-width",
							aside: marker("borderWidth"),
							children: /* @__PURE__ */ jsx(NumberInput, {
								label: t.f.borderWidth,
								value: uniformBorder,
								min: 0,
								max: 12,
								unit: "px",
								onChange: (v) => SIDES.forEach((s) => onChange(`borderWidth.${s}`, v))
							})
						}), /* @__PURE__ */ jsx(Field, {
							label: t.f.borderColor,
							tech: "border-color",
							aside: marker("borderColor"),
							children: /* @__PURE__ */ jsx(ColorInput, {
								value: style.borderColor.top,
								label: t.f.borderColor,
								t,
								expert,
								prefix,
								resolve: resolveColor,
								onChange: (v) => SIDES.forEach((s) => onChange(`borderColor.${s}`, v))
							})
						})] }),
						/* @__PURE__ */ jsx(Field, {
							label: t.f.borderStyle,
							tech: "border-style",
							aside: marker("borderStyle"),
							children: /* @__PURE__ */ jsx(SelectInput, {
								label: t.f.borderStyle,
								value: style.borderStyle,
								options: BORDER_STYLES.map((b) => [b, b]),
								onChange: (v) => onChange("borderStyle", v)
							})
						})
					] }),
					/* @__PURE__ */ jsxs(Field, {
						label: t.f.radius,
						tech: "border-radius",
						aside: marker("radius"),
						children: [/* @__PURE__ */ jsx(Segmented, {
							label: t.f.radius,
							value: uniformRadius >= 999 ? 999 : uniformRadius === 0 ? 0 : uniformRadius <= 4 ? 4 : uniformRadius <= 14 ? 12 : -1,
							options: [
								[0, t.presets.radius.square],
								[4, t.presets.radius.slight],
								[12, t.presets.radius.round],
								[999, t.presets.radius.pill]
							],
							onChange: (v) => CORNERS$1.forEach((c) => onChange(`radius.${c}`, v))
						}), !perCorner && /* @__PURE__ */ jsx(NumberInput, {
							label: t.f.radius,
							value: Math.min(uniformRadius, 64),
							min: 0,
							max: 64,
							unit: "px",
							onChange: (v) => CORNERS$1.forEach((c) => onChange(`radius.${c}`, v))
						})]
					}),
					expert && /* @__PURE__ */ jsx(Toggle, {
						label: t.f.perCorner,
						checked: perCorner,
						onChange: setPerCorner
					}),
					expert && perCorner && CORNERS$1.map((c) => /* @__PURE__ */ jsx(Field, {
						label: `${t.f.radius} (${t.f[c]})`,
						tech: `border-${c === "tl" ? "top-left" : c === "tr" ? "top-right" : c === "br" ? "bottom-right" : "bottom-left"}-radius`,
						children: /* @__PURE__ */ jsx(NumberInput, {
							label: `${t.f.radius} ${t.f[c]}`,
							value: Math.min(style.radius[c], 64),
							min: 0,
							max: 64,
							unit: "px",
							onChange: (v) => onChange(`radius.${c}`, v)
						})
					}, c))
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				title: t.g.spacing,
				children: [expert ? SIDES.map((s) => /* @__PURE__ */ jsx(Field, {
					label: `${t.f.padding} (${t.f[s]})`,
					tech: `padding-${s}`,
					aside: marker(`padding.${s}`),
					children: /* @__PURE__ */ jsx(NumberInput, {
						label: `${t.f.padding} ${t.f[s]}`,
						value: style.padding[s],
						min: 0,
						max: 64,
						unit: "px",
						onChange: (v) => onChange(`padding.${s}`, v)
					})
				}, s)) : /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Field, {
					label: t.f.paddingY,
					tech: "padding-block",
					aside: marker("padding"),
					children: /* @__PURE__ */ jsx(NumberInput, {
						label: t.f.paddingY,
						value: style.padding.top,
						min: 0,
						max: 48,
						unit: "px",
						onChange: (v) => {
							onChange("padding.top", v);
							onChange("padding.bottom", v);
						}
					})
				}), /* @__PURE__ */ jsx(Field, {
					label: t.f.paddingX,
					tech: "padding-inline",
					children: /* @__PURE__ */ jsx(NumberInput, {
						label: t.f.paddingX,
						value: style.padding.left,
						min: 0,
						max: 64,
						unit: "px",
						onChange: (v) => {
							onChange("padding.left", v);
							onChange("padding.right", v);
						}
					})
				})] }), /* @__PURE__ */ jsx(Field, {
					label: t.f.minHeight,
					tech: "min-height",
					aside: marker("minHeight"),
					children: /* @__PURE__ */ jsx(NumberInput, {
						label: t.f.minHeight,
						value: style.minHeight,
						min: 0,
						max: 96,
						unit: "px",
						onChange: (v) => onChange("minHeight", v)
					})
				})]
			}),
			/* @__PURE__ */ jsxs(Section, {
				title: t.g.effects,
				children: [
					/* @__PURE__ */ jsx(Field, {
						label: t.f.shadow,
						tech: "box-shadow",
						aside: marker("shadow"),
						children: /* @__PURE__ */ jsx(Segmented, {
							label: t.f.shadow,
							value: Object.entries(SHADOW_PRESETS).find(([, v]) => v === style.shadow)?.[0] ?? "custom",
							options: Object.keys(SHADOW_PRESETS).map((k) => [k, t.presets.shadow[k]]),
							onChange: (k) => onChange("shadow", SHADOW_PRESETS[k])
						})
					}),
					expert && shadow && /* @__PURE__ */ jsx("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [
							"x",
							"y",
							"blur",
							"spread"
						].map((k) => /* @__PURE__ */ jsx(Field, {
							label: t.f[k],
							tech: "px",
							children: /* @__PURE__ */ jsx(NumberInput, {
								label: `${t.f.shadow} ${t.f[k]}`,
								value: shadow[k],
								min: k === "blur" || k === "spread" ? k === "spread" ? -20 : 0 : -40,
								max: k === "blur" ? 80 : 40,
								unit: "px",
								onChange: (v) => {
									const s = {
										...shadow,
										[k]: v
									};
									onChange("shadow", `${s.inset ? "inset " : ""}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`);
								}
							})
						}, k))
					}),
					expert && /* @__PURE__ */ jsx(Field, {
						label: t.f.shadowCustom,
						tech: "box-shadow",
						children: /* @__PURE__ */ jsx(TextInput, {
							label: t.f.shadowCustom,
							value: style.shadow,
							onChange: (v) => onChange("shadow", v || "none")
						})
					}),
					expert && /* @__PURE__ */ jsx(Field, {
						label: t.f.textShadow,
						tech: "text-shadow",
						aside: marker("textShadow"),
						children: /* @__PURE__ */ jsx(TextInput, {
							label: t.f.textShadow,
							value: style.textShadow,
							placeholder: "0 1px 2px rgba(0,0,0,.3)",
							onChange: (v) => onChange("textShadow", v)
						})
					}),
					expert && /* @__PURE__ */ jsx(Field, {
						label: t.f.filter,
						tech: "filter",
						aside: marker("filter"),
						children: /* @__PURE__ */ jsx(TextInput, {
							label: t.f.filter,
							value: style.filter,
							placeholder: "saturate(1.2)",
							onChange: (v) => onChange("filter", v)
						})
					})
				]
			}),
			showStates && /* @__PURE__ */ jsxs(Section, {
				title: t.g.states,
				children: [
					/* @__PURE__ */ jsx(Field, {
						label: t.f.hoverEffect,
						tech: ":hover",
						children: /* @__PURE__ */ jsx(Segmented, {
							label: t.f.hoverEffect,
							value: hoverPreset(style.states.hover),
							options: [
								"none",
								"darken",
								"lift",
								"scale",
								"glow"
							].map((k) => [k, t.presets.hover[k]]),
							onChange: (k) => {
								const keep = style.states.hover.background ?? style.background;
								const next = k === "none" ? {} : k === "darken" ? { background: keep !== style.background ? keep : parseColor(style.background) ? shiftLightness(style.background, -.08) : prefix ? `var(--${prefix}-color-primary-hover)` : style.background } : k === "lift" ? {
									background: keep,
									translateY: -2,
									shadow: "0 8px 20px rgba(15, 23, 42, 0.18)"
								} : k === "scale" ? {
									background: keep,
									scale: 1.04
								} : {
									background: keep,
									shadow: `0 0 0 4px rgba(37, 99, 235, 0.3)`
								};
								const leaves = {
									background: next.background ?? style.background,
									translateY: next.translateY ?? 0,
									scale: next.scale ?? 1,
									shadow: next.shadow ?? (style.shadow || "none")
								};
								for (const [key, v] of Object.entries(leaves)) onChange(`states.hover.${key}`, v);
							}
						})
					}),
					/* @__PURE__ */ jsx(Toggle, {
						label: t.f.focusRing,
						checked: (style.states.focus.outlineWidth ?? 0) > 0,
						onChange: (on) => onChange("states.focus.outlineWidth", on ? 2 : 0)
					}),
					/* @__PURE__ */ jsx(Segmented, {
						label: t.g.states,
						value: state,
						options: [
							"hover",
							"focus",
							"active",
							"disabled"
						].map((s) => [s, t.states[s]]),
						onChange: setState
					}),
					color(`states.${state}.background`, `${t.states[state]}: ${t.f.stateBackground}`, "background", st.background ?? style.background),
					color(`states.${state}.color`, `${t.states[state]}: ${t.f.stateColor}`, "color", st.color ?? style.color),
					expert && color(`states.${state}.borderColor`, `${t.states[state]}: ${t.f.stateBorder}`, "border-color", st.borderColor ?? style.borderColor.top),
					(expert || state === "hover") && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Field, {
						label: t.f.translateY,
						tech: "transform: translateY",
						aside: marker(`states.${state}.translateY`),
						children: /* @__PURE__ */ jsx(NumberInput, {
							label: `${t.states[state]} ${t.f.translateY}`,
							value: st.translateY ?? 0,
							min: -12,
							max: 12,
							unit: "px",
							onChange: (v) => onChange(`states.${state}.translateY`, v)
						})
					}), /* @__PURE__ */ jsx(Field, {
						label: t.f.scale,
						tech: "transform: scale",
						aside: marker(`states.${state}.scale`),
						children: /* @__PURE__ */ jsx(NumberInput, {
							label: `${t.states[state]} ${t.f.scale}`,
							value: st.scale ?? 1,
							min: .8,
							max: 1.3,
							step: .01,
							onChange: (v) => onChange(`states.${state}.scale`, v)
						})
					})] }),
					expert && /* @__PURE__ */ jsx(Field, {
						label: t.f.opacity,
						tech: "opacity",
						children: /* @__PURE__ */ jsx(NumberInput, {
							label: `${t.states[state]} ${t.f.opacity}`,
							value: Math.round((st.opacity ?? 1) * 100),
							min: 0,
							max: 100,
							unit: "%",
							onChange: (v) => onChange(`states.${state}.opacity`, v / 100)
						})
					}),
					expert && /* @__PURE__ */ jsx(Field, {
						label: `${t.states[state]}: ${t.f.shadow}`,
						tech: "box-shadow",
						children: /* @__PURE__ */ jsx(TextInput, {
							label: `${t.states[state]} ${t.f.shadow}`,
							value: st.shadow ?? "",
							placeholder: "none",
							onChange: (v) => onChange(`states.${state}.shadow`, v)
						})
					}),
					state === "focus" && /* @__PURE__ */ jsxs(Fragment$1, { children: [
						/* @__PURE__ */ jsx(Field, {
							label: t.f.outlineWidth,
							tech: "outline-width",
							aside: marker("states.focus.outlineWidth"),
							children: /* @__PURE__ */ jsx(NumberInput, {
								label: t.f.outlineWidth,
								value: st.outlineWidth ?? 0,
								min: 0,
								max: 6,
								unit: "px",
								onChange: (v) => onChange("states.focus.outlineWidth", v)
							})
						}),
						color("states.focus.outlineColor", t.f.outlineColor, "outline-color", st.outlineColor ?? (prefix ? `var(--${prefix}-color-focus)` : "#2563eb")),
						/* @__PURE__ */ jsx(Field, {
							label: t.f.outlineOffset,
							tech: "outline-offset",
							children: /* @__PURE__ */ jsx(NumberInput, {
								label: t.f.outlineOffset,
								value: st.outlineOffset ?? 2,
								min: -4,
								max: 8,
								unit: "px",
								onChange: (v) => onChange("states.focus.outlineOffset", v)
							})
						})
					] })
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				title: t.g.motion,
				children: [
					/* @__PURE__ */ jsx(Field, {
						label: t.f.duration,
						tech: "transition-duration",
						aside: marker("transitionDuration"),
						children: /* @__PURE__ */ jsx(NumberInput, {
							label: t.f.duration,
							value: style.transitionDuration,
							min: 0,
							max: 1e3,
							step: 10,
							unit: "ms",
							onChange: (v) => onChange("transitionDuration", v)
						})
					}),
					/* @__PURE__ */ jsx(Field, {
						label: t.f.easing,
						tech: "transition-timing-function",
						aside: marker("transitionEasing"),
						children: /* @__PURE__ */ jsx(SelectInput, {
							label: t.f.easing,
							value: style.transitionEasing,
							options: Array.from(/* @__PURE__ */ new Set([
								style.transitionEasing,
								"ease",
								"ease-out",
								"ease-in-out",
								"linear",
								"cubic-bezier(0.2, 0.8, 0.2, 1)",
								"cubic-bezier(0.34, 1.56, 0.64, 1)"
							])).map((e) => [e, e]),
							onChange: (v) => onChange("transitionEasing", v)
						})
					}),
					/* @__PURE__ */ jsx(Field, {
						label: t.f.animation,
						tech: "animation / @keyframes",
						aside: marker("animation"),
						children: /* @__PURE__ */ jsx(SelectInput, {
							label: t.f.animation,
							value: style.animation,
							options: ANIMATIONS.map((a) => [a, t.presets.animation[a]]),
							onChange: (v) => onChange("animation", v)
						})
					})
				]
			})
		]
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-devkit/islands/studio/Layout.tsx
/**
* The studio's frame: a stepper that shows where you are and what is done, a
* short intro per step, and one two-pane workspace (settings | live preview)
* that every editing step uses the same way.
*
* Built from shared primitives only (`chip`, `btn`); areas are separated by
* fill (`--color-soft`), never by drawn lines — the site is borderless.
*/
function Stepper({ steps, current, enabled, done, labels, onGo, t }) {
	const index = steps.indexOf(current);
	return /* @__PURE__ */ jsxs("nav", {
		"aria-label": t.stepsLabel,
		className: "dss-stepper grid gap-2",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between gap-3 text-xs",
				style: { color: "var(--color-muted)" },
				children: [/* @__PURE__ */ jsx("span", { children: t.layout.progress(index + 1, steps.length) }), /* @__PURE__ */ jsx("span", {
					className: "font-semibold",
					style: { color: "var(--color-ink)" },
					children: labels[current]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				"aria-hidden": "true",
				style: {
					height: 4,
					background: "var(--color-soft)",
					overflow: "hidden"
				},
				children: /* @__PURE__ */ jsx("div", { style: {
					height: "100%",
					width: `${(index + 1) / steps.length * 100}%`,
					background: "var(--color-accent)",
					transition: "width 200ms ease-out"
				} })
			}),
			/* @__PURE__ */ jsx("ol", {
				className: "flex gap-2 overflow-x-auto pb-1",
				style: {
					listStyle: "none",
					margin: 0,
					padding: 0,
					scrollbarWidth: "thin"
				},
				children: steps.map((s, i) => {
					const isCurrent = s === current;
					const isDone = done(s) && !isCurrent;
					return /* @__PURE__ */ jsx("li", {
						className: "shrink-0",
						children: /* @__PURE__ */ jsxs("button", {
							type: "button",
							className: isCurrent ? "chip chip-active" : "chip",
							"aria-current": isCurrent ? "step" : void 0,
							disabled: !enabled(s),
							title: enabled(s) ? void 0 : t.lockedStep,
							onClick: () => onGo(s),
							children: [/* @__PURE__ */ jsx("span", {
								"aria-hidden": "true",
								className: "mr-1 inline-block text-center",
								style: {
									minWidth: "1.1em",
									opacity: isCurrent ? 1 : .7
								},
								children: isDone ? "✓" : i + 1
							}), labels[s]]
						})
					}, s);
				})
			})
		]
	});
}
function StepIntro({ title, text, aside }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-wrap items-end justify-between gap-3",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "grid max-w-2xl gap-1",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "text-xl font-semibold",
				children: title
			}), /* @__PURE__ */ jsx("p", {
				className: "text-sm",
				style: { color: "var(--color-muted)" },
				children: text
			})]
		}), aside]
	});
}
/**
* Settings left, preview right; the preview stays in view while the settings
* scroll (`self-start` — a stretched grid item cannot stick). On a phone the
* preview comes first, so a change is visible without scrolling back up.
*/
function Workspace({ controls, preview, t }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "dss-workspace grid gap-6 lg:grid-cols-[minmax(20rem,27rem)_minmax(0,1fr)]",
		children: [/* @__PURE__ */ jsx("section", {
			"aria-label": t.layout.controls,
			className: "order-2 grid content-start gap-4 lg:order-1",
			children: controls
		}), /* @__PURE__ */ jsx("section", {
			"aria-label": t.layout.previewPanel,
			className: "order-1 grid content-start gap-3 self-start lg:sticky lg:top-24 lg:order-2",
			children: preview
		})]
	});
}
/** The bar above a preview frame: view, device and theme in one row. */
function PreviewToolbar({ children }) {
	return /* @__PURE__ */ jsx("div", {
		className: "flex flex-wrap items-center gap-2 p-2",
		style: { background: "var(--color-soft)" },
		children
	});
}
/** A labelled, selectable card: content plus a select / selected control. */
function ChoiceCard({ title, text, selected, onSelect, t, children, cta }) {
	return /* @__PURE__ */ jsxs("article", {
		className: "grid content-between gap-3 p-4",
		style: { background: selected ? "color-mix(in srgb, var(--color-accent) 12%, var(--color-soft))" : "var(--color-soft)" },
		children: [/* @__PURE__ */ jsxs("div", {
			className: "grid gap-2",
			children: [
				/* @__PURE__ */ jsx("h3", {
					className: "font-semibold",
					children: title
				}),
				children,
				/* @__PURE__ */ jsx("p", {
					className: "text-sm",
					style: { color: "var(--color-muted)" },
					children: text
				})
			]
		}), /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("button", {
			type: "button",
			className: selected ? "chip chip-active" : "btn btn-ghost",
			"aria-pressed": selected,
			onClick: onSelect,
			children: selected ? `✓ ${t.layout.selected}` : cta ?? t.layout.choose
		}) })]
	});
}
/** Previous / next at the end of a step; the next button names its target. */
function StepFooter({ back, next, backLabel, nextLabel }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-wrap items-center justify-between gap-3 pt-2",
		children: [back ? /* @__PURE__ */ jsxs("button", {
			type: "button",
			className: "btn btn-ghost",
			onClick: back,
			children: ["← ", backLabel]
		}) : /* @__PURE__ */ jsx("span", {}), next && nextLabel && /* @__PURE__ */ jsxs("button", {
			type: "button",
			className: "btn btn-primary",
			onClick: next,
			children: [nextLabel, " →"]
		})]
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-devkit/islands/studio/ExportStep.tsx
function PremiumBox({ t, lang, access }) {
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState(null);
	const [login, setLogin] = useState("#");
	useEffect(() => {
		loginHref().then(setLogin);
	}, []);
	if (access.entitled) return /* @__PURE__ */ jsx(Alert, {
		tone: "success",
		className: "text-sm",
		children: t.premium.active
	});
	const price = access.priceCents > 0 ? (access.priceCents / 100).toLocaleString(lang === "de" ? "de-DE" : "en-GB", {
		style: "currency",
		currency: access.currency || "EUR"
	}) : null;
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-3 p-4",
		style: { background: "var(--color-soft)" },
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "flex flex-wrap items-center gap-2 font-semibold",
				children: /* @__PURE__ */ jsx("span", {
					className: "chip chip--warning",
					children: t.premium.title
				})
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-sm",
				children: price ? t.premium.pitch(price) : t.premium.pitchNoPrice
			}),
			!access.authenticated ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("p", {
				className: "text-sm opacity-80",
				children: t.premium.loginText
			}), /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("a", {
				className: "btn btn-primary no-underline",
				href: login,
				children: t.premium.login
			}) })] }) : price && /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("button", {
				type: "button",
				className: "btn btn-primary",
				disabled: busy,
				onClick: async () => {
					setBusy(true);
					setError(null);
					try {
						window.location.href = await startCheckout();
					} catch (e) {
						setError(e.status === 0 ? t.premium.checkoutFailed : e.message || t.premium.checkoutFailed);
						setBusy(false);
					}
				},
				children: busy ? t.premium.redirecting : t.premium.unlock
			}) }),
			error && /* @__PURE__ */ jsx(Alert, {
				className: "text-sm",
				children: error
			})
		]
	});
}
function ExportStep({ t, lang, project, access }) {
	const [busy, setBusy] = useState(null);
	const [error, setError] = useState(null);
	const download = async (format) => {
		setBusy(format);
		setError(null);
		try {
			const { blob, filename } = await requestExport(format, project);
			downloadBlob(blob, filename);
		} catch (e) {
			const err = e;
			setError(err.code === "premium_required" ? t.exp.premiumRequired : err.code === "disabled" ? t.exp.disabled : t.exp.failed);
		} finally {
			setBusy(null);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "text-sm opacity-80",
				children: t.exp.noJs
			}),
			/* @__PURE__ */ jsx("ul", {
				className: "grid gap-3 sm:grid-cols-2",
				children: EXPORT_FORMATS.map((f) => {
					const premium = access.formats[f] === "premium";
					const allowed = mayExport(access, f);
					return /* @__PURE__ */ jsxs("li", {
						className: "grid content-between gap-3 p-4",
						style: { background: "var(--color-soft)" },
						children: [/* @__PURE__ */ jsxs("div", {
							className: "grid gap-1",
							children: [/* @__PURE__ */ jsxs("p", {
								className: "flex flex-wrap items-center gap-2 font-semibold",
								children: [FORMAT_LABELS$1[f][lang], /* @__PURE__ */ jsx("span", {
									className: premium ? "chip chip--warning text-xs" : "chip chip--success text-xs",
									children: premium ? t.exp.premium : t.exp.free
								})]
							}), /* @__PURE__ */ jsx("p", {
								className: "text-sm opacity-80",
								children: FORMAT_DESCRIPTIONS[f][lang]
							})]
						}), /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("button", {
							type: "button",
							className: allowed ? "btn btn-primary" : "btn btn-ghost",
							disabled: !allowed || busy !== null,
							onClick: () => void download(f),
							children: busy === f ? t.exp.preparing : allowed ? t.exp.download : t.exp.locked
						}) })]
					}, f);
				})
			}),
			error && /* @__PURE__ */ jsx(Alert, { children: error })
		]
	});
}
function ProjectsPanel({ t, lang, access, project, projectId, dirty, onSaved, onOpen, onNameChange }) {
	const [items, setItems] = useState(null);
	const [busy, setBusy] = useState(false);
	const [message, setMessage] = useState(null);
	const [confirmDelete, setConfirmDelete] = useState(null);
	const [confirmOpen, setConfirmOpen] = useState(null);
	const refresh = async () => {
		try {
			setItems(await listProjects());
		} catch {
			setItems([]);
		}
	};
	useEffect(() => {
		if (access.entitled) refresh();
	}, [access.entitled]);
	if (!access.entitled) return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-3",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-sm",
			children: t.projects.guest
		}), /* @__PURE__ */ jsx(PremiumBox, {
			t,
			lang,
			access
		})]
	});
	const save = async (asNew) => {
		setBusy(true);
		setMessage(null);
		try {
			onSaved((await saveProject(project, asNew ? null : projectId)).id);
			setMessage({
				tone: "success",
				text: t.projects.savedOk
			});
			await refresh();
		} catch (e) {
			setMessage({
				tone: "danger",
				text: e.message && e.status !== 0 ? e.message : t.projects.failed
			});
		} finally {
			setBusy(false);
		}
	};
	const open = async (id) => {
		if (dirty && confirmOpen !== id) {
			setConfirmOpen(id);
			return;
		}
		setConfirmOpen(null);
		try {
			const p = await openProject(id);
			const parsed = parseProject(p.data);
			if (!parsed) throw new Error("invalid");
			onOpen(parsed, p.id);
		} catch {
			setMessage({
				tone: "danger",
				text: t.projects.failed
			});
		}
	};
	const remove = async (id) => {
		if (confirmDelete !== id) {
			setConfirmDelete(id);
			return;
		}
		setConfirmDelete(null);
		try {
			await deleteProject(id);
			await refresh();
		} catch {
			setMessage({
				tone: "danger",
				text: t.projects.failed
			});
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ jsx(PremiumBox, {
				t,
				lang,
				access
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-end",
				children: [
					/* @__PURE__ */ jsxs("label", {
						className: "grid gap-1 text-sm",
						children: [/* @__PURE__ */ jsx("span", {
							className: "opacity-80",
							children: t.projects.name
						}), /* @__PURE__ */ jsx("input", {
							className: "field-boxed w-full",
							value: project.name,
							maxLength: 120,
							onChange: (e) => onNameChange(e.target.value)
						})]
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						className: "btn btn-primary",
						disabled: busy || !project.name.trim(),
						onClick: () => void save(false),
						children: busy ? t.projects.saving : t.projects.save
					}),
					projectId !== null && /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "btn btn-ghost",
						disabled: busy,
						onClick: () => void save(true),
						children: t.projects.saveNew
					})
				]
			}),
			access.projectLimit > 0 && /* @__PURE__ */ jsx("p", {
				className: "text-xs opacity-70",
				children: t.projects.limit(access.projectLimit)
			}),
			message && /* @__PURE__ */ jsx("p", {
				className: `tds-alert tds-alert--${message.tone} text-sm`,
				children: message.text
			}),
			items === null ? /* @__PURE__ */ jsx("p", {
				className: "text-sm opacity-80",
				children: t.common.loading
			}) : items.length === 0 ? /* @__PURE__ */ jsx("p", {
				className: "tds-empty",
				children: t.projects.empty
			}) : /* @__PURE__ */ jsx("ul", {
				className: "grid gap-2",
				children: items.map((p) => /* @__PURE__ */ jsxs("li", {
					className: "grid gap-2 p-3",
					style: { background: "var(--color-soft)" },
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "font-semibold",
								children: [p.name, p.id === projectId && /* @__PURE__ */ jsx("span", {
									className: "chip chip--info ml-2 text-xs",
									children: "✓"
								})]
							}), /* @__PURE__ */ jsxs("span", {
								className: "text-xs opacity-70",
								children: [
									t.projects.updated,
									" ",
									new Date(p.updated_at.replace(" ", "T")).toLocaleString(lang === "de" ? "de-DE" : "en-GB")
								]
							})]
						}),
						confirmOpen === p.id && /* @__PURE__ */ jsx(Alert, {
							tone: "warning",
							className: "text-sm",
							children: t.projects.openWarn
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								className: "btn btn-ghost",
								onClick: () => void open(p.id),
								children: t.projects.open
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								className: "btn btn-danger",
								onClick: () => void remove(p.id),
								children: confirmDelete === p.id ? t.projects.deleteConfirm : t.projects.delete
							})]
						})
					]
				}, p.id))
			})
		]
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-devkit/islands/studio/PreviewFrame.tsx
/**
* The isolated preview.
*
* `sandbox="allow-same-origin"` WITHOUT `allow-scripts`: nothing inside can
* run, submit a form, open a popup or navigate the page, while the studio can
* still reach into the document to swap the stylesheet. That swap is what
* makes edits appear instantly — reloading `srcdoc` on every keystroke would
* flash the frame white. The body is only rebuilt when the view changes.
*
* Clicks are additionally cancelled from outside, so a `href="#"` in a demo
* page does not even scroll the frame.
*/
function PreviewFrame({ css, body, prefix, theme, device, lang, title, height = 720 }) {
	const frame = useRef(null);
	const wrap = useRef(null);
	const [scale, setScale] = useState(1);
	const [fitWidth, setFitWidth] = useState(640);
	const width = device === "fit" ? fitWidth : DEVICES[device];
	const [srcDoc, setSrcDoc] = useState(() => previewDocument({
		css,
		prefix,
		body,
		theme,
		lang
	}));
	const latest = useRef({
		css,
		theme
	});
	latest.current = {
		css,
		theme
	};
	useEffect(() => {
		setSrcDoc(previewDocument({
			css: latest.current.css,
			prefix,
			body,
			theme: latest.current.theme,
			lang
		}));
	}, [
		body,
		prefix,
		lang
	]);
	const patch = () => {
		const doc = frame.current?.contentDocument;
		if (!doc) return;
		const style = doc.getElementById("ds-css");
		if (style && style.textContent !== latest.current.css) style.textContent = latest.current.css;
		if (latest.current.theme) doc.documentElement.setAttribute("data-theme", latest.current.theme);
		else doc.documentElement.removeAttribute("data-theme");
	};
	useEffect(patch, [css, theme]);
	const onLoad = () => {
		patch();
		const doc = frame.current?.contentDocument;
		if (!doc) return;
		const block = (e) => {
			const target = e.target;
			if (e.type === "submit" || target?.closest?.("a, button, form, input[type=submit]")) e.preventDefault();
		};
		doc.addEventListener("click", block, true);
		doc.addEventListener("submit", block, true);
	};
	useLayoutEffect(() => {
		const el = wrap.current;
		if (!el) return;
		const measure = () => {
			if (device === "fit") {
				setFitWidth(Math.max(240, el.clientWidth));
				setScale(1);
			} else setScale(Math.min(1, el.clientWidth / width));
		};
		measure();
		if (typeof ResizeObserver === "undefined") return;
		const ro = new ResizeObserver(measure);
		ro.observe(el);
		return () => ro.disconnect();
	}, [width, device]);
	const frameHeight = Math.round(height / Math.max(scale, .3));
	return /* @__PURE__ */ jsx("div", {
		ref: wrap,
		className: "dss-frame w-full overflow-hidden",
		style: { height: Math.round(frameHeight * scale) },
		children: /* @__PURE__ */ jsx("iframe", {
			ref: frame,
			title,
			sandbox: "allow-same-origin",
			referrerPolicy: "no-referrer",
			srcDoc,
			onLoad,
			style: {
				width,
				height: frameHeight,
				border: 0,
				transform: `scale(${scale})`,
				transformOrigin: "top left",
				display: "block",
				background: "transparent"
			}
		})
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-devkit/src/studio/sanitize.ts
var browserParse = (html) => new DOMParser().parseFromString(html, "text/html");
var ALLOWED_TAGS = new Set("a abbr article aside b blockquote br button caption code dd del details div dl dt em fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 header hr i input ins kbd label legend li main mark nav ol optgroup option p pre q s section select small span strong sub summary sup table tbody td textarea tfoot th thead time tr u ul".split(" "));
/** Dropped together with their whole content. */
var DROP_WITH_CONTENT = /* @__PURE__ */ new Set([
	"script",
	"style",
	"template",
	"noscript",
	"iframe",
	"object",
	"embed",
	"svg",
	"math",
	"canvas",
	"audio",
	"video",
	"link",
	"meta",
	"base",
	"title",
	"head"
]);
var ALLOWED_ATTRS = /* @__PURE__ */ new Set([
	"class",
	"id",
	"role",
	"title",
	"alt",
	"placeholder",
	"value",
	"name",
	"for",
	"type",
	"disabled",
	"checked",
	"selected",
	"readonly",
	"required",
	"rows",
	"cols",
	"colspan",
	"rowspan",
	"datetime",
	"open",
	"lang",
	"dir",
	"tabindex",
	"href"
]);
var SAFE_INPUT_TYPES = /* @__PURE__ */ new Set([
	"text",
	"email",
	"search",
	"tel",
	"url",
	"password",
	"number",
	"checkbox",
	"radio",
	"date",
	"range",
	"button"
]);
function sanitizeHtml(input, parse = browserParse) {
	const src = parse(`<!doctype html><html><body>${input}</body></html>`);
	const out = src.implementation.createHTMLDocument("");
	const styles = Array.from(src.querySelectorAll("style")).map((s) => s.textContent ?? "");
	const removed = /* @__PURE__ */ new Set();
	const inline = [];
	let counter = 0;
	const copy = (node, parent) => {
		if (node.nodeType === 3) {
			parent.appendChild(out.createTextNode(node.textContent ?? ""));
			return;
		}
		if (node.nodeType !== 1) return;
		const el = node;
		const tag = el.tagName.toLowerCase();
		if (DROP_WITH_CONTENT.has(tag)) {
			if (tag !== "style") removed.add(`<${tag}>`);
			return;
		}
		if (!ALLOWED_TAGS.has(tag)) {
			removed.add(`<${tag}>`);
			for (const child of Array.from(el.childNodes)) copy(child, parent);
			return;
		}
		const clean = out.createElement(tag);
		for (const attr of Array.from(el.attributes)) {
			const name = attr.name.toLowerCase();
			if (name.startsWith("on")) {
				removed.add("Eventhandler (on…)");
				continue;
			}
			if (name === "style") {
				const id = `ds-import-${++counter}`;
				clean.setAttribute("data-import", id);
				inline.push(`[data-import="${id}"] { ${attr.value.replace(/[{}<>]/g, "")} }`);
				continue;
			}
			if (name.startsWith("aria-") || name.startsWith("data-")) {
				if (name !== "data-import") clean.setAttribute(name, attr.value);
				continue;
			}
			if (!ALLOWED_ATTRS.has(name)) {
				removed.add(`Attribut ${name}`);
				continue;
			}
			if (name === "href") {
				clean.setAttribute("href", "#");
				continue;
			}
			if (name === "type" && tag === "input") {
				const t = attr.value.toLowerCase();
				clean.setAttribute("type", SAFE_INPUT_TYPES.has(t) ? t : t === "submit" || t === "reset" || t === "image" ? "button" : "text");
				continue;
			}
			if (name === "type" && tag === "button") continue;
			clean.setAttribute(name, attr.value);
		}
		if (tag === "button") clean.setAttribute("type", "button");
		parent.appendChild(clean);
		for (const child of Array.from(el.childNodes)) copy(child, clean);
	};
	const container = out.createElement("div");
	for (const child of Array.from(src.body.childNodes)) copy(child, container);
	return {
		html: container.innerHTML,
		styles,
		inlineCss: inline.join("\n"),
		removed: [...removed]
	};
}
// node_modules/@tracht-digital-solutions/tds-tool-devkit/src/studio/importer.ts
/**
* Importers: CSS files, HTML/CSS components, JSON design tokens and the style
* data of one fetched web page all end up as the same thing — a seed component
* plus a list of imported token values, each with a confidence and a source.
*
* Nothing is invented. A value that cannot be read stays out of `values`; the
* generator then derives it and the UI marks it as derived, not as found.
*/
var MAX_INPUT = 1e6;
/** Resolves `var(--x, fallback)` against a custom-property map. */
function resolveVars(value, props, depth = 0) {
	if (depth > 8 || !value.includes("var(")) return value;
	let out = "";
	let i = 0;
	while (i < value.length) {
		const at = value.indexOf("var(", i);
		if (at < 0) {
			out += value.slice(i);
			break;
		}
		out += value.slice(i, at);
		let d = 0;
		let j = at + 4;
		for (; j < value.length; j++) if (value[j] === "(") d++;
		else if (value[j] === ")") {
			if (d === 0) break;
			d--;
		}
		const inner = value.slice(at + 4, j);
		const comma = inner.indexOf(",");
		const name = (comma >= 0 ? inner.slice(0, comma) : inner).trim();
		const fallback = comma >= 0 ? inner.slice(comma + 1).trim() : "";
		const found = props[name];
		out += resolveVars(found !== void 0 ? found : fallback, props, depth + 1);
		i = j + 1;
	}
	return out;
}
/** A length in px; `em` is taken relative to `em`, `%` and unknown units give null. */
function lengthPx(token, em = 16) {
	if (!token) return null;
	const t = token.trim().toLowerCase();
	if (t === "0") return 0;
	const m = /^(-?\d*\.?\d+)(px|rem|em|pt)?$/.exec(t);
	if (!m) return null;
	const n = Number(m[1]);
	switch (m[2]) {
		case "rem": return n * 16;
		case "em": return n * em;
		case "pt": return n * 4 / 3;
		case void 0: return n === 0 ? 0 : null;
		default: return n;
	}
}
/** Splits a value on top-level whitespace. */
function words(value) {
	const out = [];
	let depth = 0;
	let cur = "";
	for (const ch of value.trim()) {
		if (ch === "(") depth++;
		if (ch === ")") depth--;
		if (/\s/.test(ch) && depth === 0) {
			if (cur) out.push(cur);
			cur = "";
		} else cur += ch;
	}
	if (cur) out.push(cur);
	return out;
}
function fourSides(value, em) {
	const parts = words(value).map((w) => lengthPx(w, em));
	if (parts.some((p) => p === null) || parts.length === 0 || parts.length > 4) return null;
	const [a, b = a, c = a, d = b] = parts;
	return [
		a,
		b,
		c,
		d
	];
}
var firstColor = (value) => {
	for (const w of words(value.replace(/,/g, " , "))) if (parseColor(w)) return w;
	return null;
};
function parseBorder(value, em) {
	const out = {};
	for (const w of words(value)) {
		const lw = w === "thin" ? 1 : w === "medium" ? 3 : w === "thick" ? 5 : lengthPx(w, em);
		if (lw !== null && out.width === void 0) out.width = lw;
		else if (BORDER_STYLES.includes(w) || [
			"hidden",
			"groove",
			"ridge",
			"inset",
			"outset"
		].includes(w)) out.style = w;
		else if (parseColor(w)) out.color = w;
	}
	return out;
}
function parseGradient(value) {
	const m = /linear-gradient\((.*)\)/i.exec(value);
	if (!m) return null;
	const parts = [];
	let depth = 0;
	let cur = "";
	for (const ch of m[1]) {
		if (ch === "(") depth++;
		if (ch === ")") depth--;
		if (ch === "," && depth === 0) {
			parts.push(cur.trim());
			cur = "";
		} else cur += ch;
	}
	parts.push(cur.trim());
	let angle = 180;
	const first = parts[0] ?? "";
	if (/deg$/.test(first)) angle = Number.parseFloat(first);
	else if (/^to /.test(first)) angle = {
		"to top": 0,
		"to right": 90,
		"to bottom": 180,
		"to left": 270
	}[first] ?? 135;
	const colors = parts.map((p) => firstColor(p)).filter((c) => !!c);
	if (colors.length < 2) return null;
	return {
		from: colors[0],
		to: colors[colors.length - 1],
		angle
	};
}
function parseTransform(value) {
	const out = {};
	const ty = /translateY\(\s*(-?[\d.]+)px\s*\)/i.exec(value) ?? /translate\(\s*[^,]+,\s*(-?[\d.]+)px\s*\)/i.exec(value);
	if (ty) out.translateY = Number(ty[1]);
	const sc = /scale\(\s*([\d.]+)\s*\)/i.exec(value);
	if (sc) out.scale = Number(sc[1]);
	return out;
}
function parseDuration(value) {
	const m = /(\d*\.?\d+)(ms|s)\b/.exec(value);
	if (!m) return null;
	return m[2] === "s" ? Number(m[1]) * 1e3 : Number(m[1]);
}
/** Applies an ordered list of declarations to a component style (later wins). */
function applyDecls(style, decls, notes) {
	const s = JSON.parse(JSON.stringify(style));
	let em = s.fontSize;
	for (const { prop, value } of decls) {
		const v = value.trim();
		switch (prop) {
			case "background":
			case "background-color":
			case "background-image": {
				const g = parseGradient(v);
				if (g) {
					s.background = g.from;
					s.gradientTo = g.to;
					s.gradientAngle = g.angle;
				} else if (v === "none" || v === "transparent") {
					if (prop !== "background-image") {
						s.background = "transparent";
						s.gradientTo = "";
					}
				} else {
					const c = firstColor(v);
					if (c) {
						s.background = c;
						s.gradientTo = "";
					} else if (/url\(/i.test(v)) notes?.add("Hintergrundbilder werden nicht übernommen.");
				}
				break;
			}
			case "color":
				if (parseColor(v)) s.color = v;
				break;
			case "font-family":
				s.fontFamily = v;
				break;
			case "font-size": {
				const px = lengthPx(v, em);
				if (px) {
					s.fontSize = px;
					em = px;
				}
				break;
			}
			case "font-weight": {
				const w = v === "bold" ? 700 : v === "normal" ? 400 : Number(v);
				if (Number.isFinite(w) && w >= 100 && w <= 1e3) s.fontWeight = w;
				break;
			}
			case "line-height": {
				const n = Number(v);
				if (Number.isFinite(n) && n > 0) s.lineHeight = n;
				else {
					const px = lengthPx(v, em);
					if (px) s.lineHeight = Math.round(px / em * 100) / 100;
				}
				break;
			}
			case "letter-spacing":
				if (v === "normal") s.letterSpacing = 0;
				else if (v.endsWith("em") && !v.endsWith("rem")) s.letterSpacing = Number.parseFloat(v);
				else {
					const px = lengthPx(v, em);
					if (px !== null) s.letterSpacing = Math.round(px / em * 1e3) / 1e3;
				}
				break;
			case "text-transform":
				if ([
					"none",
					"uppercase",
					"lowercase",
					"capitalize"
				].includes(v)) s.textTransform = v;
				break;
			case "text-align":
				if (v === "left" || v === "center" || v === "right") s.textAlign = v;
				else if (v === "start") s.textAlign = "left";
				break;
			case "border":
			case "border-top":
			case "border-right":
			case "border-bottom":
			case "border-left": {
				const b = parseBorder(v, em);
				const sides = prop === "border" ? [
					"top",
					"right",
					"bottom",
					"left"
				] : [prop.slice(7)];
				if (v === "none" || v === "0") for (const side of sides) s.borderWidth[side] = 0;
				for (const side of sides) {
					if (b.width !== void 0) s.borderWidth[side] = b.width;
					if (b.color) s.borderColor[side] = b.color;
				}
				if (b.style) s.borderStyle = BORDER_STYLES.includes(b.style) ? b.style : "solid";
				if (b.style === "none") for (const side of sides) s.borderWidth[side] = 0;
				break;
			}
			case "border-width": {
				const f = fourSides(v, em);
				if (f) [s.borderWidth.top, s.borderWidth.right, s.borderWidth.bottom, s.borderWidth.left] = f;
				break;
			}
			case "border-color": {
				const cs = words(v).filter((w) => parseColor(w));
				if (cs.length) {
					const [a, b = a, c = a, d = b] = cs;
					s.borderColor = {
						top: a,
						right: b,
						bottom: c,
						left: d
					};
				}
				break;
			}
			case "border-style": {
				const st = words(v)[0] ?? "solid";
				s.borderStyle = BORDER_STYLES.includes(st) ? st : "solid";
				break;
			}
			case "border-top-width":
			case "border-right-width":
			case "border-bottom-width":
			case "border-left-width": {
				const px = lengthPx(v, em);
				if (px !== null) s.borderWidth[prop.split("-")[1]] = px;
				break;
			}
			case "border-top-color":
			case "border-right-color":
			case "border-bottom-color":
			case "border-left-color":
				if (parseColor(v)) s.borderColor[prop.split("-")[1]] = v;
				break;
			case "border-radius": {
				const main = v.split("/")[0].trim();
				if (/%/.test(main)) {
					s.radius = {
						tl: 9999,
						tr: 9999,
						br: 9999,
						bl: 9999
					};
					break;
				}
				const f = fourSides(main, em);
				if (f) s.radius = {
					tl: f[0],
					tr: f[1],
					br: f[2],
					bl: f[3]
				};
				break;
			}
			case "border-top-left-radius":
			case "border-top-right-radius":
			case "border-bottom-right-radius":
			case "border-bottom-left-radius": {
				const px = lengthPx(words(v)[0], em);
				const key = {
					"border-top-left-radius": "tl",
					"border-top-right-radius": "tr",
					"border-bottom-right-radius": "br",
					"border-bottom-left-radius": "bl"
				}[prop];
				if (px !== null) s.radius[key] = px;
				break;
			}
			case "padding": {
				const f = fourSides(v, em);
				if (f) s.padding = {
					top: f[0],
					right: f[1],
					bottom: f[2],
					left: f[3]
				};
				break;
			}
			case "padding-top":
			case "padding-right":
			case "padding-bottom":
			case "padding-left": {
				const px = lengthPx(v, em);
				if (px !== null) s.padding[prop.slice(8)] = px;
				break;
			}
			case "padding-block":
			case "padding-inline": {
				const f = words(v).map((w) => lengthPx(w, em));
				if (f[0] != null) {
					const a = f[0];
					const b = f[1] ?? a;
					if (prop === "padding-block") [s.padding.top, s.padding.bottom] = [a, b];
					else [s.padding.left, s.padding.right] = [a, b];
				}
				break;
			}
			case "min-height":
			case "height": {
				const px = lengthPx(v, em);
				if (px !== null && px < 200) s.minHeight = px;
				break;
			}
			case "box-shadow":
				s.shadow = v;
				break;
			case "text-shadow":
				s.textShadow = v === "none" ? "" : v;
				break;
			case "filter":
				s.filter = v === "none" ? "" : v;
				break;
			case "opacity": {
				const n = Number(v);
				if (Number.isFinite(n)) s.opacity = Math.min(1, Math.max(0, n));
				break;
			}
			case "transition":
			case "transition-duration": {
				const d = parseDuration(v);
				if (d !== null) s.transitionDuration = d;
				const ease = /(ease-in-out|ease-in|ease-out|ease|linear|cubic-bezier\([^)]*\))/.exec(v);
				if (ease) s.transitionEasing = ease[1];
				break;
			}
			case "transition-timing-function":
				s.transitionEasing = v;
				break;
			case "animation":
			case "animation-name": {
				const name = ANIMATIONS.find((a) => a !== "none" && v.includes(a));
				if (name) s.animation = name;
				else if (v !== "none") notes?.add("Eigene Keyframe-Animationen werden nicht nachgebildet.");
				break;
			}
		}
	}
	return s;
}
function applyStateDecls(state, decls) {
	const s = { ...state };
	for (const { prop, value } of decls) {
		const v = value.trim();
		if (prop === "background" || prop === "background-color") {
			const c = firstColor(v);
			if (c) s.background = c;
		} else if (prop === "color" && parseColor(v)) s.color = v;
		else if (prop === "border-color" && firstColor(v)) s.borderColor = firstColor(v);
		else if (prop === "border" && parseBorder(v, 16).color) s.borderColor = parseBorder(v, 16).color;
		else if (prop === "box-shadow") s.shadow = v;
		else if (prop === "transform") Object.assign(s, parseTransform(v));
		else if (prop === "opacity" && Number.isFinite(Number(v))) s.opacity = Number(v);
		else if (prop === "outline") {
			if (v === "none" || v === "0") s.outlineWidth = 0;
			else {
				const b = parseBorder(v, 16);
				if (b.width !== void 0) s.outlineWidth = b.width;
				if (b.color) s.outlineColor = b.color;
			}
		} else if (prop === "outline-width") s.outlineWidth = lengthPx(v) ?? s.outlineWidth;
		else if (prop === "outline-color" && parseColor(v)) s.outlineColor = v;
		else if (prop === "outline-offset") s.outlineOffset = lengthPx(v) ?? s.outlineOffset;
	}
	return s;
}
var INHERITED = [
	"color",
	"font-family",
	"font-size",
	"font-weight",
	"line-height",
	"letter-spacing",
	"text-transform",
	"text-align"
];
/** Whether a rule's at-rule context applies to a default desktop, light screen. */
function contextApplies(context) {
	return context.every((c) => {
		if (!c.startsWith("media")) return !c.startsWith("container") && !c.startsWith("starting-style");
		const q = c.slice(5).toLowerCase();
		if (/print|speech|prefers-color-scheme:\s*dark|max-width|max-device-width|hover:\s*none|pointer:\s*coarse|prefers-contrast|forced-colors/.test(q)) return false;
		return true;
	});
}
function safeMatches(el, selector) {
	if (/::|:(hover|focus|active|visited|focus-visible|focus-within|target)\b/.test(selector)) return false;
	try {
		return el.matches(selector);
	} catch {
		return false;
	}
}
/** Collects the declarations that apply to `el`, in cascade order (lowest first). */
function cascadeFor(el, rules, props) {
	const buckets = {
		base: [],
		hover: [],
		focus: [],
		active: [],
		disabled: []
	};
	let matched = 0;
	for (const rule of rules) {
		if (!contextApplies(rule.context)) continue;
		for (const sel of splitSelectorList(rule.selector)) {
			const { base, state } = stripState(sel);
			const bucket = state === null ? "base" : state === "hover" ? "hover" : state.startsWith("focus") ? "focus" : state === "active" ? "active" : "disabled";
			if (!safeMatches(el, base || "*")) continue;
			matched++;
			const spec = specificity(sel);
			for (const d of rule.decls) buckets[bucket].push({
				prop: d.prop,
				value: resolveVars(d.value, props),
				important: d.important,
				spec,
				order: rule.order
			});
		}
	}
	const sort = (list) => list.sort((a, b) => Number(a.important) - Number(b.important) || a.spec[0] - b.spec[0] || a.spec[1] - b.spec[1] || a.spec[2] - b.spec[2] || a.order - b.order).map(({ prop, value }) => ({
		prop,
		value
	}));
	const inlineStyle = el.getAttribute("style");
	const base = sort(buckets.base);
	if (inlineStyle) {
		const { nodes } = parseCss(`x{${inlineStyle}}`);
		for (const r of flattenRules(nodes)) for (const d of r.decls) base.push({
			prop: d.prop,
			value: resolveVars(d.value, props)
		});
	}
	return {
		base,
		hover: sort(buckets.hover),
		focus: sort(buckets.focus),
		active: sort(buckets.active),
		disabled: sort(buckets.disabled),
		matched
	};
}
/** Custom properties declared on :root / html / body (and `*`), resolved. */
function rootProps(rules, dark = false) {
	const props = {};
	for (const r of rules) {
		if (r.context.some((c) => /prefers-color-scheme:\s*dark/.test(c)) !== dark && dark) continue;
		if (!dark && !contextApplies(r.context)) continue;
		const sels = splitSelectorList(r.selector);
		const isRoot = sels.some((s) => /^(:root|html|body|\*|:host)$/i.test(s.trim()));
		const isDarkSel = sels.some((s) => /\[data-theme=["']?dark|\.dark\b|\[data-bs-theme=["']?dark/i.test(s));
		if (!(isRoot || dark && isDarkSel) || isDarkSel && !dark) continue;
		for (const d of r.decls) if (d.prop.startsWith("--")) props[d.prop] = d.value;
	}
	for (const k of Object.keys(props)) props[k] = resolveVars(props[k], props);
	return props;
}
/** Maps a custom-property / token name onto a token path or colour role. */
function mapTokenName(rawName, value) {
	const name = rawName.toLowerCase().replace(/^--/, "");
	const isCol = !!parseColor(value);
	const has = (...k) => k.some((x) => new RegExp(`(^|[-_.])${x}($|[-_.\\d])`).test(name) || name.includes(x));
	if (isCol) {
		if (/hover|active|focus|disabled|light|dark|\d00\b|-(50|9\d0)\b|rgb$/.test(name) && !/^(color-)?(primary|brand)$/.test(name)) {
			if (has("focus", "ring")) return {
				path: "role.focus",
				confidence: "medium"
			};
			return null;
		}
		if (has("primary", "brand", "main")) return {
			path: "color.primary",
			confidence: "high"
		};
		if (has("secondary")) return {
			path: "color.secondary",
			confidence: "high"
		};
		if (has("accent", "highlight", "tertiary")) return {
			path: "color.accent",
			confidence: "high"
		};
		if (has("link")) return {
			path: "role.link",
			confidence: "medium"
		};
		if (has("muted", "subtle", "secondary-text")) return {
			path: "role.muted",
			confidence: "medium"
		};
		if (has("surface", "card", "panel")) return {
			path: "role.surface",
			confidence: "medium"
		};
		if (has("border", "line", "divider")) return {
			path: "role.border",
			confidence: "medium"
		};
		if (has("background", "bg", "body-bg", "canvas")) return {
			path: "role.background",
			confidence: "medium"
		};
		if (has("text", "foreground", "fg", "body-color", "ink")) return {
			path: "role.text",
			confidence: "medium"
		};
		if (has("success")) return {
			path: "role.success",
			confidence: "medium"
		};
		if (has("danger", "error")) return {
			path: "role.danger",
			confidence: "medium"
		};
		if (has("warning")) return {
			path: "role.warning",
			confidence: "medium"
		};
		return null;
	}
	if (has("font", "family") && !has("size", "weight")) {
		if (has("heading", "display", "title")) return {
			path: "font.heading",
			confidence: "high"
		};
		if (has("mono", "code")) return {
			path: "font.mono",
			confidence: "high"
		};
		return {
			path: "font.body",
			confidence: "medium"
		};
	}
	if (has("radius", "rounded", "corner")) {
		if (has("sm", "small")) return {
			path: "radius.sm",
			confidence: "medium"
		};
		if (has("lg", "large", "xl")) return {
			path: "radius.lg",
			confidence: "medium"
		};
		if (has("button", "btn", "pill")) return {
			path: "radius.button",
			confidence: "medium"
		};
		return {
			path: "radius.md",
			confidence: "medium"
		};
	}
	if (has("shadow", "elevation")) {
		if (has("sm", "small", "1")) return {
			path: "shadow.sm",
			confidence: "medium"
		};
		if (has("lg", "large", "3")) return {
			path: "shadow.lg",
			confidence: "medium"
		};
		return {
			path: "shadow.md",
			confidence: "medium"
		};
	}
	if (has("duration", "transition", "speed")) return {
		path: "motion.duration",
		confidence: "low"
	};
	if (has("container", "max-width", "content-width")) return {
		path: "layout.container",
		confidence: "low"
	};
	return null;
}
/** Converts a raw value into what the token path stores; null if unusable. */
function valueFor(path, value) {
	const v = value.trim();
	if (path.startsWith("color.") || path.startsWith("role.")) {
		const c = parseColor(v);
		return c && c.a > 0 ? normalizeColor(v) : null;
	}
	if (path.startsWith("font.")) return v.length > 0 && v.length < 300 ? v : null;
	if (path.startsWith("radius.") || path === "layout.container") {
		const px = lengthPx(v);
		return px !== null && px >= 0 && px < 4e3 ? Math.round(px * 100) / 100 : null;
	}
	if (path.startsWith("shadow.")) return /\d/.test(v) || v === "none" ? v : null;
	if (path === "motion.duration") return parseDuration(v);
	return null;
}
function push(values, path, raw, confidence, source) {
	if (values.some((x) => x.path === path && (x.confidence === "high" || confidence !== "high"))) return;
	const value = valueFor(path, raw);
	if (value === null) return;
	const idx = values.findIndex((x) => x.path === path);
	if (idx >= 0) values.splice(idx, 1);
	values.push({
		path,
		value,
		confidence,
		source
	});
}
function mostCommon(items) {
	const counts = /* @__PURE__ */ new Map();
	for (const i of items) counts.set(i, (counts.get(i) ?? 0) + 1);
	return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
}
var isChromatic = (c) => describe(c).c >= .04 && (parseColor(c)?.a ?? 0) > .5;
var BUTTON_SEL = /(^|[\s>+~,(])(button|\.btn\b|\.button\b|\.cta\b|\[type=["']?submit|input\[type=["']?(submit|button))|\.(btn|button)-?(primary)?\b/i;
var CARD_SEL = /\.(card|panel|tile|box)\b/i;
var INPUT_SEL = /(^|[\s>+~,])(input\b|textarea\b|select\b)|\.(form-control|input|field)\b/i;
/** Everything one stylesheet can tell, as values + a seed kind + its declarations. */
function readStylesheet(rules, notes) {
	const values = [];
	const props = rootProps(rules);
	for (const [name, raw] of Object.entries(props)) {
		const m = mapTokenName(name, raw);
		if (m) push(values, m.path, raw, m.confidence, name);
	}
	const darkProps = rootProps(rules, true);
	for (const [name, raw] of Object.entries(darkProps)) {
		if (props[name] === raw) continue;
		const m = mapTokenName(name, raw);
		if (m?.path.startsWith("role.")) push(values, `role.dark.${m.path.slice(5)}`, raw, "medium", `${name} (dunkel)`);
	}
	const bgs = [];
	const texts = [];
	const radii = [];
	const shadows = [];
	const fonts = [];
	for (const r of rules) for (const d of r.decls) {
		const v = resolveVars(d.value, props);
		if (d.prop === "background" || d.prop === "background-color") {
			const c = firstColor(v);
			if (c) bgs.push(normalizeColor(c));
		} else if (d.prop === "color" && parseColor(v)) texts.push(normalizeColor(v));
		else if (d.prop === "border-radius") {
			const px = lengthPx(words(v)[0]);
			if (px && px < 100) radii.push(px);
		} else if (d.prop === "box-shadow" && v !== "none") shadows.push(v);
		else if (d.prop === "font-family") fonts.push(v);
	}
	const brand = mostCommon([...bgs, ...texts].filter(isChromatic));
	if (brand) push(values, "color.primary", brand, "medium", "häufigste Markenfarbe");
	const radius = mostCommon(radii);
	if (radius !== void 0) push(values, "radius.md", `${radius}px`, "medium", "häufigster Eckenradius");
	const shadow = mostCommon(shadows);
	if (shadow) push(values, "shadow.md", shadow, "low", "häufigster Schatten");
	const font = mostCommon(fonts);
	if (font) push(values, "font.body", font, "low", "häufigste Schriftfamilie");
	return {
		values,
		props
	};
}
/** Element rules (body, headings, links) read by selector text. */
function readElementRules(rules, props, values) {
	for (const r of rules) {
		if (!contextApplies(r.context)) continue;
		const sels = splitSelectorList(r.selector).map((s) => s.trim().toLowerCase());
		const get = (p) => {
			const d = [...r.decls].reverse().find((x) => x.prop === p);
			return d ? resolveVars(d.value, props) : void 0;
		};
		if (sels.some((s) => s === "body" || s === "html" || s === ":root")) {
			const bg = get("background-color") ?? get("background");
			if (bg && firstColor(bg)) push(values, "role.background", firstColor(bg), "high", `${r.selector} background`);
			const col = get("color");
			if (col) push(values, "role.text", col, "high", `${r.selector} color`);
			const ff = get("font-family");
			if (ff) push(values, "font.body", ff, "high", `${r.selector} font-family`);
		}
		if (sels.some((s) => /^h[1-3]$/.test(s))) {
			const ff = get("font-family");
			if (ff) push(values, "font.heading", ff, "high", `${r.selector} font-family`);
		}
		if (sels.some((s) => s === "a" || s === "a:link")) {
			const col = get("color");
			if (col) push(values, "role.link", col, "high", `${r.selector} color`);
		}
	}
}
/** Builds a seed from a declaration cascade. */
function seedFrom(kind, c, inherited, notes) {
	let style = defaultStyle(kind);
	const inh = inherited.filter((d) => INHERITED.includes(d.prop));
	style = applyDecls(style, [...inh, ...c.base], notes);
	if (!c.base.some((d) => d.prop === "box-shadow")) style.shadow = "none";
	if (!c.base.some((d) => d.prop.startsWith("border") && !d.prop.includes("radius"))) style.borderWidth = {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};
	if (!c.base.some((d) => d.prop.includes("radius"))) style.radius = {
		tl: 0,
		tr: 0,
		br: 0,
		bl: 0
	};
	style.states = {
		hover: applyStateDecls({}, c.hover),
		focus: applyStateDecls({}, c.focus),
		active: applyStateDecls({}, c.active),
		disabled: applyStateDecls({ opacity: .5 }, c.disabled)
	};
	if (c.focus.length === 0) {
		style.states.focus = {
			outlineWidth: 2,
			outlineOffset: 2
		};
		notes.add("Kein eigener Fokuszustand gefunden — ein sichtbarer Fokusrahmen wurde ergänzt.");
	}
	return style;
}
function finish(kind, seedKind, style, values, extra, notes) {
	return {
		...newProject(seedKind),
		seed: {
			kind: seedKind,
			style
		},
		variant: "original",
		imported: {
			kind,
			at: (/* @__PURE__ */ new Date()).toISOString(),
			values,
			unmapped: extra.unmapped ?? [],
			preservedCss: extra.preservedCss ?? "",
			notes: [...notes],
			url: extra.url
		}
	};
}
/** Imports a CSS file. Unmapped rules are kept verbatim as `preservedCss`. */
function importCss(cssText, parse = browserParse) {
	const { nodes, issues } = parseCss(cssText.slice(0, MAX_INPUT));
	const rules = flattenRules(nodes);
	const notes = /* @__PURE__ */ new Set();
	const { values, props } = readStylesheet(rules, notes);
	readElementRules(rules, props, values);
	const pick = (re) => rules.filter((r) => contextApplies(r.context) && splitSelectorList(r.selector).some((s) => re.test(s) && !/:(hover|focus|active|disabled)/.test(s))).sort((a, b) => b.decls.length - a.decls.length)[0];
	const doc = parse("<!doctype html><html><body></body></html>");
	let seedKind = "button";
	let style = null;
	const consumed = /* @__PURE__ */ new Set();
	for (const [kind, re] of [
		["button", BUTTON_SEL],
		["card", CARD_SEL],
		["input", INPUT_SEL]
	]) {
		const rule = pick(re);
		if (!rule) continue;
		const sel = splitSelectorList(rule.selector).find((s) => re.test(s));
		const el = syntheticElement(doc, sel);
		if (!el) continue;
		const c = cascadeFor(el, rules, props);
		seedKind = kind;
		style = seedFrom(kind, c, [], notes);
		consumed.add(stripState(sel).base);
		notes.add(`Ausgangskomponente aus „${sel}“ gelesen.`);
		break;
	}
	if (!style) {
		style = defaultStyle("button");
		notes.add("Keine Button-, Karten- oder Formularregel gefunden — die Ausgangskomponente wurde aus den Farben und Variablen abgeleitet.");
		const primary = values.find((v) => v.path === "color.primary");
		if (primary) {
			style.background = String(primary.value);
			style.borderColor = {
				top: style.background,
				right: style.background,
				bottom: style.background,
				left: style.background
			};
		}
	}
	const preserved = [];
	const unmapped = [];
	for (const node of nodes) {
		if (node.type === "at" && node.name === "import") {
			notes.add(`@import ${node.prelude} wurde nicht übernommen — bitte am Anfang der eigenen Datei einbinden.`);
			continue;
		}
		if (node.type === "rule") {
			if (splitSelectorList(node.selector).every((s) => /^(:root|html|body)$/i.test(s.trim()) && node.body.every((d) => d.type === "decl" && d.prop.startsWith("--")))) continue;
			unmapped.push(node.selector);
		} else if (node.type === "at") unmapped.push(`@${node.name} ${node.prelude}`.trim());
		preserved.push(node);
	}
	return {
		project: finish("css", seedKind, style, values, {
			preservedCss: stringify(preserved),
			unmapped: unmapped.slice(0, 200)
		}, notes),
		notes: [...notes],
		issues: issues.filter((i) => i.severity === "error").map((i) => `Zeile ${i.line}: ${i.message}`)
	};
}
/** Builds a detached element that matches a simple selector like `button.btn-primary`. */
function syntheticElement(doc, selector) {
	const { base } = stripState(selector.trim().split(/[\s>+~]+/).pop() ?? "");
	const tag = /^[a-z][a-z0-9-]*/i.exec(base)?.[0] ?? (/(submit|button)/i.test(base) ? "button" : "div");
	let el;
	try {
		el = doc.createElement(tag);
	} catch {
		return null;
	}
	for (const m of base.matchAll(/\.([\w-]+)/g)) el.classList.add(m[1]);
	const id = /#([\w-]+)/.exec(base);
	if (id) el.id = id[1];
	for (const m of base.matchAll(/\[([\w-]+)(?:[~|^$*]?=["']?([^"'\]]*)["']?)?\]/g)) el.setAttribute(m[1], m[2] ?? "");
	doc.body.appendChild(el);
	return el;
}
function kindOfElement(el) {
	const tag = el.tagName.toLowerCase();
	const cls = (el.getAttribute("class") ?? "").toLowerCase();
	if (tag === "button" || /\b(btn|button|cta)\b/.test(cls) || tag === "input" && /submit|button/.test(el.getAttribute("type") ?? "")) return "button";
	if (tag === "input" || tag === "textarea" || tag === "select") return "input";
	if (tag === "a") return "link";
	return "card";
}
/** Imports a pasted HTML/CSS component; the first element is the component. */
function importHtmlComponent(input, parse = browserParse) {
	const clean = sanitizeHtml(input.slice(0, MAX_INPUT), parse);
	const { nodes, issues } = parseCss([...clean.styles, clean.inlineCss].join("\n"));
	const rules = flattenRules(nodes);
	const notes = /* @__PURE__ */ new Set();
	if (clean.removed.length) notes.add(`Aus Sicherheitsgründen entfernt: ${clean.removed.join(", ")}.`);
	const { values, props } = readStylesheet(rules, notes);
	const doc = parse(`<!doctype html><html><body>${clean.html}</body></html>`);
	const root = doc.body.firstElementChild;
	if (!root) return {
		project: newProject(),
		notes: ["Kein HTML-Element gefunden. Bitte ein Element einfügen, z. B. <button class=\"btn\">Text</button>."],
		issues: []
	};
	const target = root.matches("button, a, input, textarea, select") ? root : root.querySelector("button, .btn, .button, input, textarea, select") ?? root;
	const kind = kindOfElement(target);
	const bodyCascade = cascadeFor(doc.body, rules, props);
	const c = cascadeFor(target, rules, props);
	if (c.matched === 0 && !target.getAttribute("style")) notes.add("Für das Element wurde keine passende CSS-Regel gefunden; es wurden Standardwerte verwendet.");
	return {
		project: finish("html", kind, seedFrom(kind, c, bodyCascade.base, notes), values, { preservedCss: stringify(nodes) }, notes),
		notes: [...notes],
		issues: issues.filter((i) => i.severity === "error").map((i) => `Zeile ${i.line}: ${i.message}`),
		referenceHtml: clean.html
	};
}
/** Imports JSON: a saved studio project, DTCG tokens (`$value`) or a plain token tree. */
function importTokensJson(text) {
	let data;
	try {
		data = JSON.parse(text.slice(0, MAX_INPUT));
	} catch (e) {
		return {
			project: newProject(),
			notes: [],
			issues: [`Kein gültiges JSON: ${e.message}`]
		};
	}
	if (data && typeof data === "object" && data.schema !== void 0) {
		const p = parseProject(data);
		if (p) return {
			project: p,
			notes: ["Studio-Projekt geladen."],
			issues: []
		};
		return {
			project: newProject(),
			notes: [],
			issues: [`Projektdatei mit unbekannter Version (unterstützt bis 1).`]
		};
	}
	const values = [];
	const unmapped = [];
	const walk = (node, path) => {
		if (node === null || typeof node !== "object") {
			if (typeof node === "string" || typeof node === "number") leaf(String(node), path);
			return;
		}
		const obj = node;
		if ("$value" in obj || "value" in obj) {
			const v = obj.$value ?? obj.value;
			if (typeof v === "string" || typeof v === "number") leaf(String(v), path);
			else if (v && typeof v === "object" && (obj.$type === "shadow" || path.join("-").includes("shadow"))) {
				const s = v;
				leaf(`${s.offsetX ?? 0} ${s.offsetY ?? 0} ${s.blur ?? 0} ${s.spread ?? 0} ${s.color ?? "rgba(0,0,0,.2)"}`, path);
			}
			return;
		}
		for (const [k, v] of Object.entries(obj)) if (!k.startsWith("$")) walk(v, [...path, k]);
	};
	const leaf = (value, path) => {
		const m = mapTokenName(path.join("-"), value);
		if (m) push(values, m.path, value, m.confidence === "high" ? "high" : "medium", path.join("."));
		else unmapped.push(`${path.join(".")}: ${value}`);
	};
	walk(data, []);
	const notes = /* @__PURE__ */ new Set();
	const style = defaultStyle("button");
	const primary = values.find((v) => v.path === "color.primary");
	if (primary) {
		style.background = String(primary.value);
		style.borderColor = {
			top: style.background,
			right: style.background,
			bottom: style.background,
			left: style.background
		};
	}
	const radius = values.find((v) => v.path === "radius.button" || v.path === "radius.md");
	if (radius && typeof radius.value === "number") style.radius = {
		tl: radius.value,
		tr: radius.value,
		br: radius.value,
		bl: radius.value
	};
	const font = values.find((v) => v.path === "font.body");
	if (font) style.fontFamily = String(font.value);
	if (values.length === 0) notes.add("In der Datei wurden keine zuordenbaren Tokens gefunden.");
	return {
		project: finish("tokens", "button", style, values, { unmapped: unmapped.slice(0, 200) }, notes),
		notes: [...notes],
		issues: []
	};
}
/**
* Analyses the style data of ONE fetched page. Reads colours, type, geometry
* and the first button/input/card it can find; copies no text, images or
* logos, and keeps none of the page's CSS.
*/
function analyzePage(page, parse = browserParse) {
	const notes = /* @__PURE__ */ new Set();
	const doc = parse(page.html.slice(0, 3e6));
	for (const n of Array.from(doc.querySelectorAll("script, noscript, template, iframe, object, embed"))) n.remove();
	const inlineCss = Array.from(doc.querySelectorAll("style")).map((s) => s.textContent ?? "");
	const { nodes } = parseCss([...page.stylesheets.map((s) => s.css), ...inlineCss].join("\n").slice(0, 6e6));
	const rules = flattenRules(nodes);
	const { values, props } = readStylesheet(rules, notes);
	readElementRules(rules, props, values);
	const themeColor = doc.querySelector("meta[name=\"theme-color\"]")?.getAttribute("content");
	if (themeColor && parseColor(themeColor) && isChromatic(themeColor)) push(values, "color.primary", themeColor, "medium", "meta theme-color");
	const body = doc.body;
	const bodyC = cascadeFor(body, rules, props);
	const find = (sel) => {
		try {
			return Array.from(doc.querySelectorAll(sel)).find((el) => !el.closest("[hidden], [aria-hidden='true']")) ?? null;
		} catch {
			return null;
		}
	};
	const buttonEl = find("a.btn, a.button, button.btn, .btn-primary, .button--primary, a[class*='btn'], button[class*='btn'], [class*='button']:not(body):not(html), input[type='submit'], button");
	let seedKind = "button";
	let style;
	let buttonConfidence = "none";
	if (buttonEl) {
		const c = cascadeFor(buttonEl, rules, props);
		if (c.matched > 0) {
			style = seedFrom("button", c, bodyC.base, notes);
			buttonConfidence = c.base.some((d) => d.prop.startsWith("background")) ? "high" : "medium";
			notes.add(`Button-Gestaltung von <${buttonEl.tagName.toLowerCase()}${buttonEl.className ? ` class="${String(buttonEl.className).slice(0, 60)}"` : ""}> gelesen.`);
		} else style = defaultStyle("button");
	} else style = defaultStyle("button");
	if (buttonConfidence === "none") {
		const inputEl = find("input[type='text'], input[type='email'], input:not([type]), textarea");
		const c = inputEl ? cascadeFor(inputEl, rules, props) : null;
		if (inputEl && c && c.matched > 0) {
			seedKind = "input";
			style = seedFrom("input", c, bodyC.base, notes);
			notes.add("Kein gestalteter Button gefunden — Ausgangspunkt ist das Formularfeld.");
		} else {
			const primary = values.find((v) => v.path === "color.primary");
			if (primary) {
				style.background = String(primary.value);
				style.borderColor = {
					top: style.background,
					right: style.background,
					bottom: style.background,
					left: style.background
				};
			}
			notes.add("Kein gestalteter Button gefunden — der Button wurde aus den erkannten Farben abgeleitet.");
		}
	}
	if (style.background && parseColor(style.background) && isChromatic(style.background) && buttonConfidence === "high") push(values, "color.primary", style.background, "high", "Button-Hintergrund");
	const reference = [];
	const entry = (label, path) => {
		const v = values.find((x) => x.path === path);
		reference.push(v ? {
			label,
			value: String(v.value),
			confidence: v.confidence,
			source: v.source
		} : {
			label,
			value: "nicht ermittelt",
			confidence: "none",
			source: ""
		});
	};
	entry("Primärfarbe", "color.primary");
	entry("Sekundärfarbe", "color.secondary");
	entry("Akzentfarbe", "color.accent");
	entry("Seitenhintergrund", "role.background");
	entry("Textfarbe", "role.text");
	entry("Linkfarbe", "role.link");
	entry("Schrift (Text)", "font.body");
	entry("Schrift (Überschriften)", "font.heading");
	entry("Eckenradius", "radius.md");
	entry("Schatten", "shadow.md");
	reference.push(buttonConfidence === "none" ? {
		label: "Button-Gestaltung",
		value: "nicht ermittelt",
		confidence: "none",
		source: ""
	} : {
		label: "Button-Gestaltung",
		value: `${style.background} · Radius ${style.radius.tl}px · Innenabstand ${Math.round(style.padding.top)}/${Math.round(style.padding.right)}px`,
		confidence: buttonConfidence,
		source: "erster Button der Seite"
	});
	for (const s of page.skipped ?? []) notes.add(`Stylesheet nicht geladen (${s.reason}): ${s.url}`);
	if (page.stylesheets.length === 0 && inlineCss.length === 0) notes.add("Die Seite liefert kein auswertbares CSS — die meisten Werte sind abgeleitet, nicht gefunden.");
	notes.add("Schriftarten werden nur namentlich übernommen; Webfonts sind selbst zu lizenzieren und einzubinden.");
	const project = finish("url", seedKind, style, values, { url: page.finalUrl ?? page.url }, notes);
	try {
		project.name = `Stil von ${new URL(page.finalUrl ?? page.url).hostname}`;
	} catch {}
	return {
		reference,
		project,
		notes: [...notes]
	};
}
// node_modules/@tracht-digital-solutions/tds-tool-devkit/islands/studio/StartStep.tsx
var MAX_FILE = 1e6;
function StartStep({ t, lang, analysisEnabled, onDesign, onLoaded }) {
	const [path, setPath] = useState(null);
	const [kind, setKind] = useState("button");
	const entries = [
		[
			"a",
			t.start.a,
			t.start.aText
		],
		[
			"b",
			t.start.b,
			t.start.bText
		],
		[
			"c",
			t.start.c,
			t.start.cText
		]
	];
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-6",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "grid gap-3 md:grid-cols-3",
				children: entries.map(([id, title, text]) => /* @__PURE__ */ jsx(ChoiceCard, {
					title,
					text,
					selected: path === id,
					onSelect: () => setPath(id),
					t,
					cta: t.layout.entryCta[id]
				}, id))
			}),
			path === "a" && /* @__PURE__ */ jsxs("section", {
				className: "tds-appear grid gap-4",
				"aria-label": t.start.a,
				children: [
					/* @__PURE__ */ jsx("h3", {
						className: "eyebrow",
						children: t.wizard.kind
					}),
					/* @__PURE__ */ jsx("div", {
						className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
						children: SEED_KINDS.map((k) => /* @__PURE__ */ jsxs("button", {
							type: "button",
							className: `btn ${kind === k ? "btn-primary" : "btn-ghost"} h-auto w-full flex-col items-start gap-2 whitespace-normal p-4 text-left`,
							"aria-pressed": kind === k,
							onClick: () => setKind(k),
							children: [
								/* @__PURE__ */ jsx(KindGlyph, { kind: k }),
								/* @__PURE__ */ jsx("span", {
									className: "font-semibold",
									children: t.start.kinds[k]
								}),
								/* @__PURE__ */ jsx("span", {
									className: "text-xs font-normal opacity-80",
									children: t.layout.kindHint[k]
								})
							]
						}, k))
					}),
					/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("button", {
						type: "button",
						className: "btn btn-primary",
						onClick: () => onDesign(kind),
						children: [t.layout.entryCta.a, " →"]
					}) })
				]
			}),
			path === "b" && /* @__PURE__ */ jsx(ImportPanel, {
				t,
				onLoaded
			}),
			path === "c" && (analysisEnabled ? /* @__PURE__ */ jsx(UrlPanel, {
				t,
				lang,
				onLoaded
			}) : /* @__PURE__ */ jsx(Alert, {
				tone: "warning",
				children: t.url.disabled
			}))
		]
	});
}
/** A tiny drawing of each starting component, so the choice is visual. */
function KindGlyph({ kind }) {
	const ink = "currentColor";
	return /* @__PURE__ */ jsx("span", {
		"aria-hidden": "true",
		style: {
			display: "block",
			height: 40,
			width: "100%"
		},
		children: /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 120 40",
			width: "100%",
			height: "40",
			preserveAspectRatio: "xMinYMid meet",
			children: [
				kind === "button" && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("rect", {
					x: "2",
					y: "8",
					width: "70",
					height: "24",
					rx: "12",
					fill: ink,
					opacity: "0.85"
				}), /* @__PURE__ */ jsx("rect", {
					x: "16",
					y: "18",
					width: "42",
					height: "4",
					rx: "2",
					fill: "var(--color-card, #fff)"
				})] }),
				kind === "card" && /* @__PURE__ */ jsxs(Fragment$1, { children: [
					/* @__PURE__ */ jsx("rect", {
						x: "2",
						y: "2",
						width: "80",
						height: "36",
						rx: "5",
						fill: ink,
						opacity: "0.18"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "10",
						y: "9",
						width: "44",
						height: "5",
						rx: "2",
						fill: ink,
						opacity: "0.8"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "10",
						y: "19",
						width: "62",
						height: "3",
						rx: "1.5",
						fill: ink,
						opacity: "0.5"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "10",
						y: "26",
						width: "50",
						height: "3",
						rx: "1.5",
						fill: ink,
						opacity: "0.5"
					})
				] }),
				kind === "input" && /* @__PURE__ */ jsxs(Fragment$1, { children: [
					/* @__PURE__ */ jsx("rect", {
						x: "2",
						y: "2",
						width: "30",
						height: "4",
						rx: "2",
						fill: ink,
						opacity: "0.7"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "2.75",
						y: "12.75",
						width: "94.5",
						height: "22.5",
						rx: "4",
						fill: "none",
						stroke: ink,
						strokeWidth: "1.5",
						opacity: "0.8"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "9",
						y: "22",
						width: "36",
						height: "4",
						rx: "2",
						fill: ink,
						opacity: "0.35"
					})
				] }),
				kind === "link" && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("rect", {
					x: "2",
					y: "14",
					width: "56",
					height: "5",
					rx: "2",
					fill: ink,
					opacity: "0.85"
				}), /* @__PURE__ */ jsx("rect", {
					x: "2",
					y: "23",
					width: "56",
					height: "2",
					fill: ink,
					opacity: "0.85"
				})] })
			]
		})
	});
}
function ImportPanel({ t, onLoaded }) {
	const [kind, setKind] = useState("css");
	const [text, setText] = useState("");
	const [result, setResult] = useState(null);
	const [error, setError] = useState(null);
	const run = (source = text) => {
		setError(null);
		if (!source.trim()) {
			setError(t.imp.empty);
			return;
		}
		setResult(kind === "css" ? importCss(source) : kind === "html" ? importHtmlComponent(source) : importTokensJson(source));
	};
	const onFile = async (file) => {
		if (!file) return;
		if (file.size > MAX_FILE) {
			setError(t.imp.fileTooBig);
			return;
		}
		const content = await file.text();
		const detected = /\.json$/i.test(file.name) ? "json" : /\.html?$/i.test(file.name) ? "html" : "css";
		setKind(detected);
		setText(content);
		setResult(detected === "css" ? importCss(content) : detected === "html" ? importHtmlComponent(content) : importTokensJson(content));
	};
	const placeholder = kind === "css" ? t.imp.placeholderCss : kind === "html" ? t.imp.placeholderHtml : t.imp.placeholderJson;
	const isProject = result?.notes.includes("Studio-Projekt geladen.");
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ jsx(Segmented, {
				label: t.start.b,
				value: kind,
				options: [
					"css",
					"html",
					"json"
				].map((k) => [k, t.imp.tabs[k]]),
				onChange: (k) => {
					setKind(k);
					setResult(null);
				}
			}),
			/* @__PURE__ */ jsx(Field, {
				label: t.imp.paste,
				children: /* @__PURE__ */ jsx("textarea", {
					className: "field-boxed min-h-48 w-full font-mono text-sm",
					spellCheck: false,
					value: text,
					placeholder,
					onChange: (e) => setText(e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FileDropZone, {
				label: t.imp.file,
				accept: ".css,.html,.htm,.json,text/css,text/html,application/json",
				onFiles: (files) => void onFile(files[0])
			}),
			/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("button", {
				type: "button",
				className: "btn btn-primary",
				onClick: () => run(),
				children: t.imp.run
			}) }),
			/* @__PURE__ */ jsx(Alert, { children: error }),
			result && /* @__PURE__ */ jsxs("div", {
				className: "tds-appear grid gap-4",
				children: [
					result.issues.length > 0 && /* @__PURE__ */ jsxs("div", {
						className: "tds-alert tds-alert--warning",
						children: [/* @__PURE__ */ jsx("p", {
							className: "font-semibold",
							children: t.imp.issues
						}), /* @__PURE__ */ jsx("ul", {
							className: "list-disc pl-5",
							children: result.issues.slice(0, 12).map((i) => /* @__PURE__ */ jsx("li", { children: i }, i))
						})]
					}),
					result.notes.length > 0 && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "eyebrow mb-1",
						children: t.imp.notes
					}), /* @__PURE__ */ jsx("ul", {
						className: "list-disc pl-5 text-sm",
						children: result.notes.map((n) => /* @__PURE__ */ jsx("li", { children: n }, n))
					})] }),
					result.project.imported && result.project.imported.values.length > 0 && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "eyebrow mb-1",
						children: t.imp.found
					}), /* @__PURE__ */ jsx("ul", {
						className: "grid gap-1 text-sm",
						children: result.project.imported.values.map((v) => /* @__PURE__ */ jsxs("li", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ jsx("code", { children: v.path }),
								/* @__PURE__ */ jsx("span", { children: String(v.value) }),
								/* @__PURE__ */ jsx("span", {
									className: "chip chip--neutral text-xs",
									children: t.url.conf[v.confidence]
								}),
								/* @__PURE__ */ jsx("span", {
									className: "text-xs opacity-70",
									children: v.source
								})
							]
						}, v.path))
					})] }),
					result.project.imported && result.project.imported.unmapped.length > 0 && /* @__PURE__ */ jsxs("details", {
						className: "tds-disclosure",
						children: [/* @__PURE__ */ jsxs("summary", {
							className: "cursor-pointer text-sm font-semibold",
							children: [
								t.imp.unmapped,
								" (",
								result.project.imported.unmapped.length,
								")"
							]
						}), /* @__PURE__ */ jsx("ul", {
							className: "mt-2 grid gap-1 font-mono text-xs",
							children: result.project.imported.unmapped.slice(0, 80).map((u) => /* @__PURE__ */ jsx("li", { children: u }, u))
						})]
					}),
					result.referenceHtml && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "eyebrow mb-1",
						children: t.imp.reference
					}), /* @__PURE__ */ jsx(PreviewFrame, {
						css: sanitizeCss(result.project.imported?.preservedCss ?? ""),
						body: `<div style="padding:24px">${result.referenceHtml}</div>`,
						prefix: "ref",
						theme: null,
						device: "phone",
						lang: "de",
						title: t.imp.reference,
						height: 220
					})] }),
					/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "btn btn-primary",
						onClick: () => onLoaded(result.project, isProject ? "system" : "component"),
						children: t.imp.open
					}) })
				]
			})
		]
	});
}
function UrlPanel({ t, lang, onLoaded }) {
	const [url, setUrl] = useState("https://");
	const [mode, setMode] = useState("faithful");
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState(null);
	const [analysis, setAnalysis] = useState(null);
	const [pick, setPick] = useState("original");
	const run = async () => {
		setError(null);
		setAnalysis(null);
		let parsed;
		try {
			parsed = new URL(url.trim());
		} catch {
			setError({ text: t.url.errors.invalid_url });
			return;
		}
		if (parsed.protocol !== "https:") {
			setError({ text: t.url.httpsOnly });
			return;
		}
		setBusy(true);
		try {
			const result = analyzePage(await analyzeUrl(parsed.toString()));
			setAnalysis(result);
			setPick(mode === "faithful" ? "original" : "modern");
		} catch (e) {
			const err = e;
			const code = err.status === 0 ? "network" : err.code ?? "fetch_failed";
			const loc = code === "redirect" ? /https:\/\/\S+/.exec(err.message)?.[0] : void 0;
			setError({
				text: t.url.errors[code] ?? t.url.errors.fetch_failed,
				location: loc
			});
		} finally {
			setBusy(false);
		}
	};
	const variants = mode === "faithful" ? [
		"original",
		"modern",
		"minimal",
		"elegant"
	] : [
		"modern",
		"minimal",
		"elegant",
		"playful",
		"technical",
		"original"
	];
	const previews = useMemo(() => {
		if (!analysis) return [];
		return variants.map((v) => {
			const project = {
				...analysis.project,
				variant: v
			};
			return {
				v,
				project,
				css: emitCss(resolveProject(project))
			};
		});
	}, [analysis, mode]);
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ jsx(Field, {
				label: t.url.label,
				children: /* @__PURE__ */ jsx("input", {
					className: "field-boxed w-full",
					type: "url",
					inputMode: "url",
					value: url,
					onChange: (e) => setUrl(e.target.value),
					placeholder: "https://www.beispiel.de/"
				})
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-sm opacity-80",
				children: t.url.hint
			}),
			/* @__PURE__ */ jsxs("fieldset", {
				className: "grid gap-2",
				children: [
					/* @__PURE__ */ jsx("legend", {
						className: "mb-1 text-sm opacity-80",
						children: t.url.mode
					}),
					/* @__PURE__ */ jsx(Segmented, {
						label: t.url.mode,
						value: mode,
						options: [["faithful", t.url.faithful], ["creative", t.url.creative]],
						onChange: setMode
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm opacity-80",
						children: mode === "faithful" ? t.url.faithfulText : t.url.creativeText
					})
				]
			}),
			/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("button", {
				type: "button",
				className: "btn btn-primary",
				onClick: () => void run(),
				disabled: busy,
				children: busy ? t.url.running : t.url.run
			}) }),
			error && /* @__PURE__ */ jsxs(Alert, { children: [error.text, error.location && /* @__PURE__ */ jsxs(Fragment$1, { children: [" ", /* @__PURE__ */ jsx("button", {
				type: "button",
				className: "btn btn-ghost px-2 py-0",
				onClick: () => setUrl(error.location),
				children: error.location
			})] })] }),
			analysis && /* @__PURE__ */ jsxs("div", {
				className: "tds-appear grid gap-5",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-sm opacity-80",
						children: t.url.noContent
					}),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "eyebrow mb-2",
						children: t.url.reference
					}), /* @__PURE__ */ jsx("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ jsxs("table", {
							className: "tds-table text-sm",
							children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
								/* @__PURE__ */ jsx("th", { scope: "col" }),
								/* @__PURE__ */ jsx("th", {
									scope: "col",
									children: t.url.value
								}),
								/* @__PURE__ */ jsx("th", {
									scope: "col",
									children: t.url.confidence
								}),
								/* @__PURE__ */ jsx("th", {
									scope: "col",
									children: t.url.source
								})
							] }) }), /* @__PURE__ */ jsx("tbody", { children: analysis.reference.map((e) => /* @__PURE__ */ jsxs("tr", { children: [
								/* @__PURE__ */ jsx("th", {
									scope: "row",
									children: e.label
								}),
								/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-2",
									children: [/^#[0-9a-f]{3,8}$/i.test(e.value) && /* @__PURE__ */ jsx("span", {
										"aria-hidden": "true",
										className: "inline-block h-4 w-4 rounded-full",
										style: { background: e.value }
									}), /* @__PURE__ */ jsx("span", {
										className: e.confidence === "none" ? "opacity-60" : "",
										children: e.value
									})]
								}) }),
								/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("span", {
									className: e.confidence === "none" ? "chip chip--warning text-xs" : e.confidence === "high" ? "chip chip--success text-xs" : "chip chip--neutral text-xs",
									children: t.url.conf[e.confidence]
								}) }),
								/* @__PURE__ */ jsx("td", {
									className: "text-xs opacity-70",
									children: e.source
								})
							] }, e.label)) })]
						})
					})] }),
					analysis.notes.length > 0 && /* @__PURE__ */ jsx("ul", {
						className: "list-disc pl-5 text-sm",
						children: analysis.notes.map((n) => /* @__PURE__ */ jsx("li", { children: n }, n))
					}),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "eyebrow mb-2",
						children: t.url.compare
					}), /* @__PURE__ */ jsx("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: previews.map(({ v, css }) => /* @__PURE__ */ jsxs("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								className: pick === v ? "chip chip-active justify-self-start" : "chip justify-self-start",
								"aria-pressed": pick === v,
								onClick: () => setPick(v),
								children: v === "original" ? mode === "faithful" ? t.url.faithful : t.system.variants.original[0] : t.system.variants[v][0]
							}), /* @__PURE__ */ jsx(PreviewFrame, {
								css,
								body: previewBody(analysis.project.prefix, "landing", lang),
								prefix: analysis.project.prefix,
								theme: "light",
								device: "desktop",
								lang,
								title: `${t.preview.frameTitle}: ${v}`,
								height: 340
							})]
						}, v))
					})] }),
					/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "btn btn-primary",
						onClick: () => onLoaded({
							...analysis.project,
							variant: VARIANTS.includes(pick) ? pick : "original"
						}, "system"),
						children: t.url.choose
					}) })
				]
			})
		]
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-devkit/islands/studio/strings.ts
var de = {
	steps: {
		start: "Start",
		component: "Komponente",
		system: "Designsystem",
		preview: "Vorschau",
		code: "Code",
		a11y: "Barrierefreiheit",
		export: "Export & Projekte"
	},
	stepsLabel: "Arbeitsschritte",
	lockedStep: "Erst nach dem Erzeugen des Designsystems verfügbar",
	guestNote: "Die Arbeit bleibt nur in diesem Browserfenster. Dauerhaftes Speichern ist mit Premium möglich.",
	unsaved: "Ungespeicherte Änderungen",
	saved: "Gespeichert",
	leaveWarning: "Ungespeicherte Änderungen gehen beim Verlassen der Seite verloren.",
	start: {
		title: "Womit beginnen?",
		a: "Neue Komponente gestalten",
		aText: "Einen Button, eine Karte, ein Formularfeld oder einen Link gestalten. Daraus entsteht das ganze Designsystem.",
		aGo: "Gestalten",
		b: "Komponente oder CSS importieren",
		bText: "CSS-Datei, HTML/CSS-Komponente oder JSON-Design-Tokens einlesen und visuell weiterbearbeiten.",
		c: "Website per HTTPS analysieren",
		cText: "Eine öffentliche Seite auswerten und ihren Stil als Ausgangspunkt nehmen — originalgetreu oder neu interpretiert.",
		kinds: {
			button: "Button",
			card: "Karte",
			input: "Formularfeld",
			link: "Link"
		}
	},
	imp: {
		tabs: {
			css: "CSS",
			html: "HTML + CSS",
			json: "JSON-Tokens"
		},
		paste: "Code einfügen",
		file: "Oder Datei wählen",
		fileTooBig: "Die Datei ist größer als 1 MB.",
		run: "Importieren",
		open: "Im Editor öffnen",
		notes: "Hinweise",
		issues: "Fehler im CSS",
		found: "Erkannte Werte",
		unmapped: "Unverändert übernommene Regeln",
		reference: "Eigene Komponente (bereinigt, ohne Skripte)",
		empty: "Bitte zuerst Code einfügen oder eine Datei wählen.",
		placeholderCss: ":root { --primary: #0f766e; }\n.btn { background: var(--primary); border-radius: 6px; }",
		placeholderHtml: "<style>.btn { background: #0f766e; color: #fff; padding: 10px 20px; border-radius: 6px }</style>\n<button class=\"btn\">Jetzt starten</button>",
		placeholderJson: "{ \"color\": { \"primary\": { \"$type\": \"color\", \"$value\": \"#0f766e\" } } }"
	},
	url: {
		label: "HTTPS-Adresse der Seite",
		hint: "Es wird genau diese eine Seite mit ihren Stylesheets geladen — keine Unterseiten, keine Skripte.",
		mode: "Art der Übernahme",
		faithful: "Originalgetreu",
		faithfulText: "Erkannte Eigenschaften möglichst genau übernehmen.",
		creative: "Kreativ neu interpretiert",
		creativeText: "Mehrere eigenständige Varianten aus dem erkannten Stil ableiten.",
		run: "Analysieren",
		running: "Seite wird geladen …",
		httpsOnly: "Bitte eine Adresse mit https:// angeben.",
		disabled: "Die Website-Analyse ist derzeit abgeschaltet.",
		reference: "Ermittelte Stilreferenz",
		value: "Wert",
		confidence: "Sicherheit",
		source: "Quelle",
		conf: {
			high: "sicher",
			medium: "wahrscheinlich",
			low: "unsicher",
			none: "nicht ermittelt"
		},
		compare: "Vergleich",
		choose: "Mit dieser Variante weiterarbeiten",
		noContent: "Übernommen werden nur Gestaltungsmerkmale — keine Texte, Bilder oder Logos.",
		errors: {
			invalid_url: "Diese Adresse kann nicht analysiert werden.",
			blocked_host: "Diese Adresse zeigt auf ein internes oder reserviertes Netz und wird nicht geladen.",
			redirect: "Die Seite leitet weiter. Bitte das Ziel direkt analysieren:",
			not_html: "Unter dieser Adresse liegt keine HTML-Seite.",
			too_large: "Die Seite ist zu groß für die Analyse.",
			timeout: "Die Seite hat nicht rechtzeitig geantwortet.",
			rate_limited: "Zu viele Analysen in kurzer Zeit. Bitte später erneut versuchen.",
			fetch_failed: "Die Seite konnte nicht geladen werden.",
			network: "Der Analysedienst ist nicht erreichbar."
		}
	},
	wizard: {
		title: "Komponente gestalten",
		simple: "Einfach",
		expert: "Experte",
		mode: "Modus",
		generate: "Designsystem erzeugen",
		regenerateNote: "Änderungen hier leiten alle automatisch erzeugten Werte neu ab. Eigene Anpassungen und eigenes CSS bleiben erhalten.",
		kind: "Ausgangskomponente",
		kindChangeWarn: "Ein Wechsel der Komponente setzt ihre Gestaltung auf Standardwerte zurück."
	},
	g: {
		colors: "Farben und Hintergrund",
		type: "Schrift",
		border: "Rahmen und Ecken",
		spacing: "Abstände und Größe",
		effects: "Schatten und Effekte",
		states: "Zustände",
		motion: "Bewegung"
	},
	f: {
		background: "Hintergrundfarbe",
		gradient: "Farbverlauf",
		gradientTo: "Verlauf bis",
		gradientAngle: "Verlaufswinkel",
		color: "Textfarbe",
		opacity: "Deckkraft",
		fontFamily: "Schriftart",
		customFont: "Eigene Schriftliste",
		fontSize: "Schriftgröße",
		fontWeight: "Schriftstärke",
		lineHeight: "Zeilenhöhe",
		letterSpacing: "Buchstabenabstand",
		textTransform: "Schreibweise",
		textAlign: "Ausrichtung",
		borderOn: "Rahmen anzeigen",
		borderWidth: "Rahmenstärke",
		borderStyle: "Rahmenart",
		borderColor: "Rahmenfarbe",
		perSide: "Seiten einzeln",
		perCorner: "Ecken einzeln",
		radius: "Eckenabrundung",
		padding: "Innenabstand",
		paddingY: "Innenabstand oben/unten",
		paddingX: "Innenabstand links/rechts",
		minHeight: "Mindesthöhe",
		shadow: "Schatten",
		shadowCustom: "Schatten (CSS)",
		textShadow: "Textschatten",
		filter: "Filter",
		duration: "Übergangsdauer",
		easing: "Zeitverlauf",
		animation: "Animation",
		hoverEffect: "Hover-Effekt",
		focusRing: "Fokusrahmen",
		translateY: "Verschiebung (Y)",
		scale: "Skalierung",
		outlineWidth: "Fokusrahmen-Stärke",
		outlineColor: "Fokusrahmen-Farbe",
		outlineOffset: "Fokusrahmen-Abstand",
		stateBackground: "Hintergrund",
		stateColor: "Textfarbe",
		stateBorder: "Rahmenfarbe",
		alpha: "Transparenz",
		format: "Farbformat",
		role: "Farbrolle",
		customColor: "Eigene Farbe",
		top: "oben",
		right: "rechts",
		bottom: "unten",
		left: "links",
		tl: "oben links",
		tr: "oben rechts",
		br: "unten rechts",
		bl: "unten links",
		x: "Versatz X",
		y: "Versatz Y",
		blur: "Unschärfe",
		spread: "Ausdehnung",
		inset: "Innen"
	},
	presets: {
		radius: {
			square: "Eckig",
			slight: "Leicht",
			round: "Rund",
			pill: "Pille"
		},
		shadow: {
			none: "Ohne",
			soft: "Weich",
			medium: "Mittel",
			hard: "Hart"
		},
		hover: {
			none: "Keiner",
			darken: "Abdunkeln",
			lift: "Anheben",
			scale: "Vergrößern",
			glow: "Leuchten"
		},
		transform: {
			none: "normal",
			uppercase: "GROSS",
			lowercase: "klein",
			capitalize: "Wortanfang groß"
		},
		align: {
			left: "links",
			center: "zentriert",
			right: "rechts"
		},
		animation: {
			none: "keine",
			"fade-in": "Einblenden",
			"slide-up": "Hochgleiten",
			pulse: "Pulsieren (endlos)"
		},
		weight: {
			300: "leicht",
			400: "normal",
			500: "mittel",
			600: "halbfett",
			700: "fett",
			800: "extrafett",
			900: "schwarz"
		},
		fonts: {
			sans: "System-Sans",
			geometric: "Geometrisch",
			humanist: "Humanistisch",
			serif: "Serif",
			rounded: "Abgerundet",
			mono: "Monospace"
		}
	},
	states: {
		hover: "Hover",
		focus: "Fokus",
		active: "Aktiv",
		disabled: "Deaktiviert"
	},
	system: {
		tabs: {
			variants: "Varianten",
			tokens: "Globale Tokens",
			components: "Komponenten",
			themes: "Themes"
		},
		variantTitle: "Stilrichtung",
		harmony: "Farbharmonie",
		harmonies: {
			analogous: "Analog",
			complementary: "Komplementär",
			triadic: "Triadisch",
			split: "Geteilt komplementär",
			monochrome: "Monochrom"
		},
		variants: {
			original: ["Ausgangsdesign", "Die eigene Komponente bleibt genau so; alles andere wird daraus abgeleitet."],
			minimal: ["Minimalistisch", "Kleine Radien, feine Linien, keine Schatten, viel Luft."],
			modern: ["Modern", "Weiche Schatten, mittlere Rundungen, leichtes Anheben beim Hover."],
			elegant: ["Elegant", "Serifen-Überschriften, kaum Rundung, gesperrte Großbuchstaben-Buttons."],
			playful: ["Verspielt", "Kräftige Rundungen, harte Versatzschatten, Vergrößern beim Hover."],
			technical: ["Technisch", "Monospace-Überschriften, eckig, 2px-Rahmen, gestrichelter Fokus."]
		},
		resetManual: "Alle eigenen Anpassungen zurücksetzen",
		resetConfirm: "Wirklich alle eigenen Anpassungen (außer gesperrten Werten und eigenem CSS) verwerfen?",
		manualCount: (n) => `${n} eigene Anpassung${n === 1 ? "" : "en"}`,
		lock: "Sperren",
		unlock: "Entsperren",
		reset: "Zurücksetzen",
		component: "Komponente",
		resetComponent: "Alle Anpassungen dieser Komponente zurücksetzen",
		overrideHint: "Hier geänderte Werte gelten nur für diese Komponente und bleiben bei globalen Änderungen erhalten.",
		groups: {
			colors: "Farben",
			typography: "Typografie",
			spacing: "Abstände",
			radius: "Ecken",
			border: "Rahmen",
			shadow: "Schatten",
			motion: "Bewegung",
			layout: "Layout und Responsive",
			style: "Stilregeln"
		},
		tokens: {
			"color.primary": "Primärfarbe",
			"color.secondary": "Sekundärfarbe",
			"color.accent": "Akzentfarbe",
			"color.neutralChroma": "Farbstich der Grautöne",
			"font.body": "Schrift für Text",
			"font.heading": "Schrift für Überschriften",
			"font.size": "Grundschriftgröße",
			"font.ratio": "Schriftgrößen-Stufung",
			"font.lineHeight": "Zeilenhöhe",
			"font.bodyWeight": "Stärke Text",
			"font.headingWeight": "Stärke Überschriften",
			"font.headingTracking": "Buchstabenabstand Überschriften",
			"font.headingTransform": "Überschriften in Großbuchstaben",
			"space.unit": "Abstands-Grundeinheit",
			"radius.sm": "Radius klein",
			"radius.md": "Radius mittel",
			"radius.lg": "Radius groß",
			"radius.button": "Radius Buttons",
			"border.width": "Rahmenstärke",
			"border.style": "Rahmenart",
			"shadow.sm": "Schatten klein",
			"shadow.md": "Schatten mittel",
			"shadow.lg": "Schatten groß",
			"motion.duration": "Übergangsdauer",
			"motion.easing": "Zeitverlauf",
			"layout.container": "Maximale Inhaltsbreite",
			"layout.gutter": "Seitenrand",
			"layout.fluid": "Flüssige Schriftgrößen",
			"layout.navBreakpoint": "Umbruch der Navigation ab",
			"style.hover": "Hover-Effekt",
			"style.shadow": "Schattenstil",
			"style.buttonCase": "Buttons in Großbuchstaben",
			"style.buttonTracking": "Buchstabenabstand Buttons",
			"style.focus": "Fokusstil"
		},
		focusStyles: {
			ring: "Ring",
			outline: "Kräftig",
			dashed: "Gestrichelt"
		},
		shadowStyles: {
			none: "keine",
			soft: "weich",
			hard: "hart"
		},
		themes: "Themes",
		themeName: "Name",
		themeBase: "Grundlage",
		light: "Hell",
		dark: "Dunkel",
		contrast: "Kontrast",
		contrastNormal: "Normal",
		contrastMore: "Erhöht",
		addTheme: "Theme hinzufügen",
		newThemeName: "Neues Theme",
		removeTheme: "Theme entfernen",
		roles: "Farbrollen",
		roleHint: "Eigene Farben gelten nur für dieses Theme und bleiben beim Wechsel der Variante erhalten."
	},
	sources: {
		derived: "abgeleitet",
		variant: "Variante",
		imported: "importiert",
		manual: "eigene",
		locked: "gesperrt",
		seed: "Ausgangsdesign",
		generated: "erzeugt"
	},
	kinds: {
		button: "Button",
		buttonSecondary: "Zweiter Button",
		link: "Link",
		heading: "Überschriften",
		text: "Fließtext",
		card: "Karte",
		input: "Formularfeld",
		label: "Label",
		formButton: "Formular-Button",
		nav: "Navigation",
		footer: "Footer"
	},
	preview: {
		views: {
			components: "Komponenten",
			panel: "Panel",
			landing: "Landingpage"
		},
		devices: {
			desktop: "Desktop",
			tablet: "Tablet",
			phone: "Smartphone"
		},
		theme: "Theme",
		auto: "System (automatisch)",
		view: "Ansicht",
		device: "Gerät",
		frameTitle: "Vorschau des Designsystems",
		note: "Die Vorschau ist rein visuell: Buttons, Links und Formulare lösen nichts aus."
	},
	code: {
		generated: "Erzeugtes CSS",
		copy: "Kopieren",
		copied: "Kopiert",
		copyLocked: "Kopieren ist für dieses Konto nicht freigeschaltet.",
		component: "CSS einer Komponente",
		custom: "Eigenes CSS",
		customHint: "Eigene Regeln stehen am Ende, ohne Kaskadenebene — sie gewinnen gegen alle erzeugten Regeln und bleiben beim erneuten Erzeugen erhalten.",
		issues: "Prüfung",
		noIssues: "Keine Syntaxfehler gefunden.",
		conflicts: "Überschreibt erzeugte Werte",
		line: "Zeile",
		editorLabel: "Eigenes CSS bearbeiten",
		show: "Anzeigen"
	},
	a11y: {
		title: "Barrierefreiheits-Prüfung",
		disclaimer: "Geprüft werden die Gestaltungseigenschaften dieses Designsystems nach WCAG 2.2. Ob die spätere Website barrierefrei ist, hängt außerdem von Inhalten, HTML-Struktur und Umsetzung ab — diese Prüfung ist keine Konformitätsbestätigung.",
		filters: {
			problems: "Probleme",
			warn: "Hinweise",
			pass: "Bestanden",
			manual: "Manuell prüfen",
			all: "Alle"
		},
		status: {
			pass: "OK",
			fail: "Problem",
			warn: "Hinweis",
			manual: "Manuell"
		},
		allThemes: "Alle Themes",
		apply: "Vorschlag übernehmen",
		applyAnyway: "Trotzdem übernehmen",
		cancel: "Abbrechen",
		overrideWarn: "Dieser Vorschlag ändert eine Farbe oder einen Wert, der von Hand festgelegt wurde.",
		applied: "Übernommen — die Prüfung wurde neu ausgeführt.",
		noProblems: "Keine Probleme in den automatisch prüfbaren Punkten. Die Hinweise unten sind Empfehlungen; die manuellen Punkte betreffen die fertige Website.",
		show: "In der Vorschau zeigen",
		actual: "Ist",
		required: "Soll",
		criterion: "Kriterium",
		subject: "Bereich",
		property: "Eigenschaft",
		result: "Ergebnis",
		suggestion: "Vorschlag",
		report: "Prüfbericht",
		copyReport: "Bericht kopieren",
		none: "Keine Einträge in dieser Auswahl."
	},
	exp: {
		title: "Exportieren",
		free: "Kostenlos",
		premium: "Premium",
		download: "Herunterladen",
		preparing: "Wird erstellt …",
		locked: "Premium erforderlich",
		failed: "Der Export ist fehlgeschlagen.",
		premiumRequired: "Dieses Format ist Premium-Nutzern vorbehalten.",
		disabled: "Das Studio ist derzeit deaktiviert.",
		noJs: "Exporte enthalten nur HTML und CSS — keinen JavaScript-Code."
	},
	premium: {
		title: "Premium",
		active: "Premium ist für dieses Konto aktiv.",
		pitch: (price) => `Projekte dauerhaft speichern und alle Exportformate nutzen — einmalig ${price}.`,
		pitchNoPrice: "Projekte dauerhaft speichern und alle Exportformate nutzen.",
		login: "Anmelden",
		loginText: "Nach der Anmeldung lassen sich Premium freischalten und gespeicherte Projekte öffnen.",
		unlock: "Premium freischalten",
		redirecting: "Weiterleitung …",
		checkoutFailed: "Die Zahlung konnte nicht gestartet werden."
	},
	projects: {
		title: "Projekte",
		name: "Projektname",
		save: "Speichern",
		saveNew: "Als neues Projekt speichern",
		saving: "Wird gespeichert …",
		savedOk: "Projekt gespeichert.",
		open: "Öffnen",
		delete: "Löschen",
		deleteConfirm: "Endgültig löschen",
		empty: "Noch keine gespeicherten Projekte.",
		guest: "Speichern ist Premium-Nutzern vorbehalten. Ohne Premium bleibt die Arbeit nur bis zum Schließen dieses Fensters erhalten.",
		limit: (n) => `Bis zu ${n} Projekte.`,
		failed: "Die Aktion ist fehlgeschlagen.",
		openWarn: "Ungespeicherte Änderungen am aktuellen Projekt gehen dabei verloren.",
		updated: "geändert"
	},
	layout: {
		intro: {
			start: ["Womit beginnen?", "Drei Einstiege, alle führen in denselben Editor."],
			component: ["Ausgangskomponente gestalten", "Aus dieser einen Komponente leitet das Studio das ganze Designsystem ab. Jede Änderung erscheint sofort in der Vorschau."],
			system: ["Designsystem verfeinern", "Stilrichtung wählen, globale Werte ändern oder einzelne Komponenten und Themes anpassen. Eigene Anpassungen bleiben erhalten."],
			preview: ["Vorschau", "Dasselbe CSS wie im Export — als Komponenten-Übersicht, Verwaltungsoberfläche und Landingpage."],
			code: ["Code", "Erzeugtes CSS ansehen und kopieren, eigene Regeln ergänzen."],
			a11y: ["Barrierefreiheit prüfen", "Kontraste, Fokus, Klickflächen und Bewegung nach WCAG 2.2 — mit Vorschlägen zum Übernehmen."],
			export: ["Exportieren und speichern", "Formate herunterladen und — mit Premium — Projekte dauerhaft speichern."]
		},
		next: (step) => `Weiter: ${step}`,
		selected: "Ausgewählt",
		choose: "Auswählen",
		notSaved: "Nicht gespeichert",
		progress: (n, total) => `Schritt ${n} von ${total}`,
		entryCta: {
			a: "Komponente gestalten",
			b: "Code importieren",
			c: "Website analysieren"
		},
		kindHint: {
			button: "Aktionen, Formulare, Hero-Bereich",
			card: "Inhalte, Leistungen, Teaser",
			input: "Formulare, Suche, Kontakt",
			link: "Navigation, Fließtext"
		},
		locked: "Gesperrt",
		workspace: "Arbeitsbereich",
		previewPanel: "Vorschau",
		controls: "Einstellungen"
	},
	common: {
		back: "Zurück",
		next: "Weiter",
		close: "Schließen",
		loading: "Lädt …",
		yes: "Ja",
		no: "Nein",
		retry: "Erneut versuchen"
	}
};
var STRINGS$12 = {
	de,
	en: {
		steps: {
			start: "Start",
			component: "Component",
			system: "Design system",
			preview: "Preview",
			code: "Code",
			a11y: "Accessibility",
			export: "Export & projects"
		},
		stepsLabel: "Steps",
		lockedStep: "Available once the design system has been generated",
		guestNote: "Your work stays in this browser window only. Saving permanently is a Premium feature.",
		unsaved: "Unsaved changes",
		saved: "Saved",
		leaveWarning: "Unsaved changes are lost when you leave the page.",
		start: {
			title: "How would you like to start?",
			a: "Design a new component",
			aText: "Design a button, a card, a form field or a link. The whole design system grows from it.",
			aGo: "Design",
			b: "Import a component or CSS",
			bText: "Read a CSS file, an HTML/CSS component or JSON design tokens and keep editing visually.",
			c: "Analyse a website over HTTPS",
			cText: "Read a public page and use its style as a starting point — faithfully or re-interpreted.",
			kinds: {
				button: "Button",
				card: "Card",
				input: "Form field",
				link: "Link"
			}
		},
		imp: {
			tabs: {
				css: "CSS",
				html: "HTML + CSS",
				json: "JSON tokens"
			},
			paste: "Paste code",
			file: "Or choose a file",
			fileTooBig: "The file is larger than 1 MB.",
			run: "Import",
			open: "Open in the editor",
			notes: "Notes",
			issues: "Errors in the CSS",
			found: "Recognised values",
			unmapped: "Rules kept unchanged",
			reference: "Your component (cleaned, without scripts)",
			empty: "Please paste code or choose a file first.",
			placeholderCss: de.imp.placeholderCss,
			placeholderHtml: de.imp.placeholderHtml.replace("Jetzt starten", "Get started"),
			placeholderJson: de.imp.placeholderJson
		},
		url: {
			label: "HTTPS address of the page",
			hint: "Exactly this one page and its stylesheets are loaded — no subpages, no scripts.",
			mode: "How to adopt it",
			faithful: "Faithful",
			faithfulText: "Adopt the recognised properties as closely as possible.",
			creative: "Creatively re-interpreted",
			creativeText: "Derive several distinct variants from the recognised style.",
			run: "Analyse",
			running: "Loading the page …",
			httpsOnly: "Please enter an address starting with https://.",
			disabled: "Website analysis is currently switched off.",
			reference: "Recognised style reference",
			value: "Value",
			confidence: "Confidence",
			source: "Source",
			conf: {
				high: "certain",
				medium: "likely",
				low: "uncertain",
				none: "not determined"
			},
			compare: "Comparison",
			choose: "Continue with this variant",
			noContent: "Only design properties are adopted — no text, images or logos.",
			errors: {
				invalid_url: "This address cannot be analysed.",
				blocked_host: "This address points to an internal or reserved network and is not loaded.",
				redirect: "The page redirects. Please analyse the target directly:",
				not_html: "There is no HTML page at this address.",
				too_large: "The page is too large to analyse.",
				timeout: "The page did not answer in time.",
				rate_limited: "Too many analyses in a short time. Please try again later.",
				fetch_failed: "The page could not be loaded.",
				network: "The analysis service cannot be reached."
			}
		},
		wizard: {
			title: "Design the component",
			simple: "Simple",
			expert: "Expert",
			mode: "Mode",
			generate: "Generate design system",
			regenerateNote: "Changes here re-derive every generated value. Your own adjustments and your CSS are kept.",
			kind: "Starting component",
			kindChangeWarn: "Switching the component resets its design to the defaults."
		},
		g: {
			colors: "Colours and background",
			type: "Typography",
			border: "Borders and corners",
			spacing: "Spacing and size",
			effects: "Shadows and effects",
			states: "States",
			motion: "Motion"
		},
		f: {
			background: "Background colour",
			gradient: "Gradient",
			gradientTo: "Gradient to",
			gradientAngle: "Gradient angle",
			color: "Text colour",
			opacity: "Opacity",
			fontFamily: "Typeface",
			customFont: "Custom font stack",
			fontSize: "Font size",
			fontWeight: "Font weight",
			lineHeight: "Line height",
			letterSpacing: "Letter spacing",
			textTransform: "Case",
			textAlign: "Alignment",
			borderOn: "Show border",
			borderWidth: "Border width",
			borderStyle: "Border style",
			borderColor: "Border colour",
			perSide: "Per side",
			perCorner: "Per corner",
			radius: "Corner radius",
			padding: "Padding",
			paddingY: "Padding top/bottom",
			paddingX: "Padding left/right",
			minHeight: "Minimum height",
			shadow: "Shadow",
			shadowCustom: "Shadow (CSS)",
			textShadow: "Text shadow",
			filter: "Filter",
			duration: "Transition duration",
			easing: "Timing",
			animation: "Animation",
			hoverEffect: "Hover effect",
			focusRing: "Focus ring",
			translateY: "Offset (Y)",
			scale: "Scale",
			outlineWidth: "Focus ring width",
			outlineColor: "Focus ring colour",
			outlineOffset: "Focus ring offset",
			stateBackground: "Background",
			stateColor: "Text colour",
			stateBorder: "Border colour",
			alpha: "Transparency",
			format: "Colour format",
			role: "Colour role",
			customColor: "Custom colour",
			top: "top",
			right: "right",
			bottom: "bottom",
			left: "left",
			tl: "top left",
			tr: "top right",
			br: "bottom right",
			bl: "bottom left",
			x: "Offset X",
			y: "Offset Y",
			blur: "Blur",
			spread: "Spread",
			inset: "Inset"
		},
		presets: {
			radius: {
				square: "Square",
				slight: "Slight",
				round: "Round",
				pill: "Pill"
			},
			shadow: {
				none: "None",
				soft: "Soft",
				medium: "Medium",
				hard: "Hard"
			},
			hover: {
				none: "None",
				darken: "Darken",
				lift: "Lift",
				scale: "Grow",
				glow: "Glow"
			},
			transform: {
				none: "normal",
				uppercase: "UPPER",
				lowercase: "lower",
				capitalize: "Capitalised"
			},
			align: {
				left: "left",
				center: "centre",
				right: "right"
			},
			animation: {
				none: "none",
				"fade-in": "Fade in",
				"slide-up": "Slide up",
				pulse: "Pulse (endless)"
			},
			weight: {
				300: "light",
				400: "regular",
				500: "medium",
				600: "semibold",
				700: "bold",
				800: "extra bold",
				900: "black"
			},
			fonts: {
				sans: "System sans",
				geometric: "Geometric",
				humanist: "Humanist",
				serif: "Serif",
				rounded: "Rounded",
				mono: "Monospace"
			}
		},
		states: {
			hover: "Hover",
			focus: "Focus",
			active: "Active",
			disabled: "Disabled"
		},
		system: {
			tabs: {
				variants: "Variants",
				tokens: "Global tokens",
				components: "Components",
				themes: "Themes"
			},
			variantTitle: "Style direction",
			harmony: "Colour harmony",
			harmonies: {
				analogous: "Analogous",
				complementary: "Complementary",
				triadic: "Triadic",
				split: "Split complementary",
				monochrome: "Monochrome"
			},
			variants: {
				original: ["Starting design", "Your component stays exactly as designed; everything else is derived from it."],
				minimal: ["Minimal", "Small radii, fine lines, no shadows, plenty of space."],
				modern: ["Modern", "Soft shadows, medium radii, a slight lift on hover."],
				elegant: ["Elegant", "Serif headings, barely rounded, tracked uppercase buttons."],
				playful: ["Playful", "Generous radii, hard offset shadows, grow on hover."],
				technical: ["Technical", "Monospace headings, square, 2px borders, dashed focus."]
			},
			resetManual: "Reset all own adjustments",
			resetConfirm: "Really discard all own adjustments (except locked values and custom CSS)?",
			manualCount: (n) => `${n} own adjustment${n === 1 ? "" : "s"}`,
			lock: "Lock",
			unlock: "Unlock",
			reset: "Reset",
			component: "Component",
			resetComponent: "Reset all adjustments of this component",
			overrideHint: "Values changed here apply to this component only and survive global changes.",
			groups: {
				colors: "Colours",
				typography: "Typography",
				spacing: "Spacing",
				radius: "Corners",
				border: "Borders",
				shadow: "Shadows",
				motion: "Motion",
				layout: "Layout and responsive",
				style: "Style rules"
			},
			tokens: {
				"color.primary": "Primary colour",
				"color.secondary": "Secondary colour",
				"color.accent": "Accent colour",
				"color.neutralChroma": "Tint of the greys",
				"font.body": "Body typeface",
				"font.heading": "Heading typeface",
				"font.size": "Base font size",
				"font.ratio": "Type scale ratio",
				"font.lineHeight": "Line height",
				"font.bodyWeight": "Body weight",
				"font.headingWeight": "Heading weight",
				"font.headingTracking": "Heading letter spacing",
				"font.headingTransform": "Uppercase headings",
				"space.unit": "Spacing base unit",
				"radius.sm": "Radius small",
				"radius.md": "Radius medium",
				"radius.lg": "Radius large",
				"radius.button": "Button radius",
				"border.width": "Border width",
				"border.style": "Border style",
				"shadow.sm": "Shadow small",
				"shadow.md": "Shadow medium",
				"shadow.lg": "Shadow large",
				"motion.duration": "Transition duration",
				"motion.easing": "Timing",
				"layout.container": "Maximum content width",
				"layout.gutter": "Page margin",
				"layout.fluid": "Fluid font sizes",
				"layout.navBreakpoint": "Navigation wraps below",
				"style.hover": "Hover effect",
				"style.shadow": "Shadow style",
				"style.buttonCase": "Uppercase buttons",
				"style.buttonTracking": "Button letter spacing",
				"style.focus": "Focus style"
			},
			focusStyles: {
				ring: "Ring",
				outline: "Strong",
				dashed: "Dashed"
			},
			shadowStyles: {
				none: "none",
				soft: "soft",
				hard: "hard"
			},
			themes: "Themes",
			themeName: "Name",
			themeBase: "Based on",
			light: "Light",
			dark: "Dark",
			contrast: "Contrast",
			contrastNormal: "Normal",
			contrastMore: "Increased",
			addTheme: "Add theme",
			newThemeName: "New theme",
			removeTheme: "Remove theme",
			roles: "Colour roles",
			roleHint: "Custom colours apply to this theme only and survive a variant switch."
		},
		sources: {
			derived: "derived",
			variant: "variant",
			imported: "imported",
			manual: "own",
			locked: "locked",
			seed: "starting design",
			generated: "generated"
		},
		kinds: {
			button: "Button",
			buttonSecondary: "Secondary button",
			link: "Link",
			heading: "Headings",
			text: "Body text",
			card: "Card",
			input: "Form field",
			label: "Label",
			formButton: "Form button",
			nav: "Navigation",
			footer: "Footer"
		},
		preview: {
			views: {
				components: "Components",
				panel: "Panel",
				landing: "Landing page"
			},
			devices: {
				desktop: "Desktop",
				tablet: "Tablet",
				phone: "Smartphone"
			},
			theme: "Theme",
			auto: "System (automatic)",
			view: "View",
			device: "Device",
			frameTitle: "Preview of the design system",
			note: "The preview is purely visual: buttons, links and forms do nothing."
		},
		code: {
			generated: "Generated CSS",
			copy: "Copy",
			copied: "Copied",
			copyLocked: "Copying is not unlocked for your account.",
			component: "CSS of one component",
			custom: "Custom CSS",
			customHint: "Your rules come last, outside every cascade layer — they beat every generated rule and survive regeneration.",
			issues: "Check",
			noIssues: "No syntax errors found.",
			conflicts: "Overrides generated values",
			line: "Line",
			editorLabel: "Edit custom CSS",
			show: "Show"
		},
		a11y: {
			title: "Accessibility check",
			disclaimer: "This checks the design properties of this design system against WCAG 2.2. Whether the finished website is accessible also depends on content, HTML structure and implementation — this check does not certify conformance.",
			filters: {
				problems: "Problems",
				warn: "Notes",
				pass: "Passed",
				manual: "Check manually",
				all: "All"
			},
			status: {
				pass: "OK",
				fail: "Problem",
				warn: "Note",
				manual: "Manual"
			},
			allThemes: "All themes",
			apply: "Apply suggestion",
			applyAnyway: "Apply anyway",
			cancel: "Cancel",
			overrideWarn: "This suggestion changes a colour or value you set yourself.",
			applied: "Applied — the check has run again.",
			noProblems: "No problems in the automatically checkable items. The notes below are recommendations; the manual items concern the finished website.",
			show: "Show in the preview",
			actual: "Actual",
			required: "Required",
			criterion: "Criterion",
			subject: "Area",
			property: "Property",
			result: "Result",
			suggestion: "Suggestion",
			report: "Report",
			copyReport: "Copy report",
			none: "Nothing in this selection."
		},
		exp: {
			title: "Export",
			free: "Free",
			premium: "Premium",
			download: "Download",
			preparing: "Preparing …",
			locked: "Premium required",
			failed: "The export failed.",
			premiumRequired: "This format is reserved for Premium users.",
			disabled: "The studio is currently switched off.",
			noJs: "Exports contain HTML and CSS only — no JavaScript."
		},
		premium: {
			title: "Premium",
			active: "Premium is active for your account.",
			pitch: (price) => `Save projects permanently and use every export format — a one-off ${price}.`,
			pitchNoPrice: "Save projects permanently and use every export format.",
			login: "Sign in",
			loginText: "Sign in to unlock Premium or to open your projects.",
			unlock: "Unlock Premium",
			redirecting: "Redirecting …",
			checkoutFailed: "The payment could not be started."
		},
		projects: {
			title: "Your projects",
			name: "Project name",
			save: "Save",
			saveNew: "Save as a new project",
			saving: "Saving …",
			savedOk: "Project saved.",
			open: "Open",
			delete: "Delete",
			deleteConfirm: "Delete for good",
			empty: "No saved projects yet.",
			guest: "Saving is reserved for Premium users. Without Premium your work only lasts until you close this window.",
			limit: (n) => `Up to ${n} projects.`,
			failed: "The action failed.",
			openWarn: "Unsaved changes to the current project are lost.",
			updated: "updated"
		},
		layout: {
			intro: {
				start: ["How would you like to start?", "Choose an entry point. All three lead into the same editor."],
				component: ["Design the starting component", "The studio derives the whole design system from this one component. Every change shows in the preview at once."],
				system: ["Refine the design system", "Pick a style direction, change global values or adjust single components and themes. Your own adjustments are kept."],
				preview: ["Preview", "The same CSS as the export — as a component overview, an admin panel and a landing page."],
				code: ["Code", "View and copy the generated CSS, add your own rules."],
				a11y: ["Check accessibility", "Contrast, focus, target sizes and motion against WCAG 2.2 — with suggestions you can apply."],
				export: ["Export and save", "Download formats and — with Premium — save projects permanently."]
			},
			next: (step) => `Next: ${step}`,
			selected: "Selected",
			choose: "Select",
			notSaved: "Not saved",
			progress: (n, total) => `Step ${n} of ${total}`,
			entryCta: {
				a: "Design a component",
				b: "Import code",
				c: "Analyse a website"
			},
			kindHint: {
				button: "Actions, forms, hero area",
				card: "Content, services, teasers",
				input: "Forms, search, contact",
				link: "Navigation, body text"
			},
			locked: "Locked",
			workspace: "Workspace",
			previewPanel: "Preview",
			controls: "Settings"
		},
		common: {
			back: "Back",
			next: "Next",
			close: "Close",
			loading: "Loading …",
			yes: "Yes",
			no: "No",
			retry: "Try again"
		}
	}
};
// node_modules/@tracht-digital-solutions/tds-tool-devkit/islands/studio/SystemStep.tsx
function tokenGroups(t) {
	return [
		[t.system.groups.colors, [
			["color.primary", { kind: "color" }],
			["color.secondary", { kind: "color" }],
			["color.accent", { kind: "color" }],
			["color.neutralChroma", {
				kind: "number",
				min: 0,
				max: .06,
				step: .002
			}]
		]],
		[t.system.groups.typography, [
			["font.body", { kind: "font" }],
			["font.heading", { kind: "font" }],
			["font.size", {
				kind: "number",
				min: 12,
				max: 22,
				unit: "px"
			}],
			["font.ratio", {
				kind: "number",
				min: 1.067,
				max: 1.618,
				step: .001
			}],
			["font.lineHeight", {
				kind: "number",
				min: 1.1,
				max: 2,
				step: .05
			}],
			["font.bodyWeight", {
				kind: "number",
				min: 300,
				max: 600,
				step: 100
			}],
			["font.headingWeight", {
				kind: "number",
				min: 300,
				max: 900,
				step: 100
			}],
			["font.headingTracking", {
				kind: "number",
				min: -.05,
				max: .15,
				step: .005,
				unit: "em"
			}],
			["font.headingTransform", {
				kind: "select",
				options: [["none", "–"], ["uppercase", "ABC"]]
			}]
		]],
		[t.system.groups.spacing, [["space.unit", {
			kind: "number",
			min: 2,
			max: 12,
			step: 1,
			unit: "px"
		}]]],
		[t.system.groups.radius, [
			["radius.sm", {
				kind: "number",
				min: 0,
				max: 24,
				unit: "px"
			}],
			["radius.md", {
				kind: "number",
				min: 0,
				max: 32,
				unit: "px"
			}],
			["radius.lg", {
				kind: "number",
				min: 0,
				max: 48,
				unit: "px"
			}],
			["radius.button", {
				kind: "number",
				min: 0,
				max: 48,
				unit: "px"
			}]
		]],
		[t.system.groups.border, [["border.width", {
			kind: "number",
			min: 1,
			max: 6,
			unit: "px"
		}], ["border.style", {
			kind: "select",
			options: [
				"solid",
				"dashed",
				"dotted",
				"double"
			].map((s) => [s, s])
		}]]],
		[t.system.groups.shadow, [
			["shadow.sm", { kind: "text" }],
			["shadow.md", { kind: "text" }],
			["shadow.lg", { kind: "text" }]
		]],
		[t.system.groups.motion, [["motion.duration", {
			kind: "number",
			min: 0,
			max: 800,
			step: 10,
			unit: "ms"
		}], ["motion.easing", { kind: "text" }]]],
		[t.system.groups.layout, [
			["layout.container", {
				kind: "number",
				min: 640,
				max: 1600,
				step: 10,
				unit: "px"
			}],
			["layout.gutter", {
				kind: "number",
				min: 8,
				max: 64,
				unit: "px"
			}],
			["layout.fluid", { kind: "bool" }],
			["layout.navBreakpoint", {
				kind: "number",
				min: 480,
				max: 1200,
				step: 8,
				unit: "px"
			}]
		]],
		[t.system.groups.style, [
			["style.hover", {
				kind: "select",
				options: [
					"darken",
					"lift",
					"scale",
					"glow",
					"underline"
				].map((h) => [h, h === "underline" ? "underline" : t.presets.hover[h]])
			}],
			["style.shadow", {
				kind: "select",
				options: [
					"none",
					"soft",
					"hard"
				].map((s) => [s, t.system.shadowStyles[s]])
			}],
			["style.buttonCase", {
				kind: "select",
				options: [["none", "–"], ["uppercase", "ABC"]]
			}],
			["style.buttonTracking", {
				kind: "number",
				min: 0,
				max: .2,
				step: .005,
				unit: "em"
			}],
			["style.focus", {
				kind: "select",
				options: [
					"ring",
					"outline",
					"dashed"
				].map((f) => [f, t.system.focusStyles[f]])
			}]
		]]
	];
}
function SystemStep({ t, project, resolved, dispatch, mode, previewTheme }) {
	const [tab, setTab] = useState("variants");
	const [kind, setKind] = useState("button");
	const [themeId, setThemeId] = useState(project.themes[0]?.id ?? "light");
	const [confirmReset, setConfirmReset] = useState(false);
	const theme = resolved.themes.find((th) => th.def.id === themeId) ?? resolved.themes[0];
	const previewThemeObj = resolved.themes.find((th) => th.def.id === previewTheme) ?? resolved.themes[0];
	const resolveColor = (v) => colorIn(v, previewThemeObj);
	const count = manualCount(project);
	const variantSamples = useMemo(() => VARIANTS.map((v) => ({
		v,
		r: resolveProject({
			...project,
			variant: v
		})
	})), [project]);
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-5",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ jsx(Segmented, {
					label: t.steps.system,
					value: tab,
					options: [
						"variants",
						"tokens",
						"components",
						"themes"
					].map((k) => [k, t.system.tabs[k]]),
					onChange: setTab
				}), count > 0 && /* @__PURE__ */ jsxs("span", {
					className: "flex flex-wrap items-center gap-2 text-sm",
					children: [/* @__PURE__ */ jsx("span", {
						className: "chip chip--info",
						children: t.system.manualCount(count)
					}), confirmReset ? /* @__PURE__ */ jsxs(Fragment$1, { children: [
						/* @__PURE__ */ jsx("span", { children: t.system.resetConfirm }),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							className: "btn btn-danger",
							onClick: () => {
								dispatch({ type: "resetManual" });
								setConfirmReset(false);
							},
							children: t.common.yes
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							className: "btn btn-ghost",
							onClick: () => setConfirmReset(false),
							children: t.common.no
						})
					] }) : /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "btn btn-ghost",
						onClick: () => setConfirmReset(true),
						children: t.system.resetManual
					})]
				})]
			}),
			tab === "variants" && /* @__PURE__ */ jsxs("div", {
				className: "grid gap-4",
				children: [
					/* @__PURE__ */ jsx("h3", {
						className: "eyebrow",
						children: t.system.variantTitle
					}),
					/* @__PURE__ */ jsx("div", {
						className: "grid gap-3",
						children: variantSamples.map(({ v, r }) => {
							const [name, text] = t.system.variants[v];
							const tk = r.tokens;
							const light = r.themes[0].colors;
							return /* @__PURE__ */ jsx(ChoiceCard, {
								title: name,
								text,
								selected: project.variant === v,
								onSelect: () => dispatch({
									type: "variant",
									variant: v
								}),
								t,
								children: /* @__PURE__ */ jsxs("span", {
									"aria-hidden": "true",
									className: "flex flex-wrap items-center gap-3",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "flex gap-1",
											children: [
												light.primary,
												light.secondary,
												light.accent,
												light.text,
												light.surfaceAlt
											].map((c, i) => /* @__PURE__ */ jsx("span", { style: {
												width: 16,
												height: 16,
												borderRadius: 999,
												background: c,
												boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.12)"
											} }, i))
										}),
										/* @__PURE__ */ jsx("span", {
											style: {
												fontFamily: tk.font.heading,
												fontWeight: tk.font.headingWeight,
												fontSize: 18,
												textTransform: tk.font.headingTransform
											},
											children: "Aa"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "inline-block px-3 py-1 text-xs",
											style: {
												background: light.primary,
												color: light.onPrimary,
												borderRadius: tk.radius.button >= 999 ? 999 : tk.radius.button,
												fontWeight: 600,
												textTransform: tk.style.buttonCase,
												letterSpacing: `${tk.style.buttonTracking}em`,
												boxShadow: tk.shadow.sm === "none" ? void 0 : tk.shadow.sm
											},
											children: "Button"
										})
									]
								})
							}, v);
						})
					}),
					/* @__PURE__ */ jsx(Field, {
						label: t.system.harmony,
						tech: "hue",
						children: /* @__PURE__ */ jsx(Segmented, {
							label: t.system.harmony,
							value: project.harmony,
							options: HARMONIES.map((h) => [h, t.system.harmonies[h]]),
							onChange: (h) => dispatch({
								type: "harmony",
								harmony: h
							})
						})
					})
				]
			}),
			tab === "tokens" && /* @__PURE__ */ jsx("div", {
				className: "grid gap-6",
				children: tokenGroups(t).map(([title, items], gi) => /* @__PURE__ */ jsx(Section, {
					title,
					open: gi === 0,
					children: items.map(([path, control]) => {
						const value = getPath(resolved.tokens, path);
						const source = resolved.tokenSource[path];
						const locked = project.locks.includes(path);
						const label = t.system.tokens[path] ?? path;
						const set = (v) => dispatch({
							type: "global",
							path,
							value: v
						});
						return /* @__PURE__ */ jsxs(Field, {
							label,
							tech: path,
							aside: /* @__PURE__ */ jsxs("span", {
								className: "flex flex-wrap items-center gap-1",
								children: [
									source !== "derived" && /* @__PURE__ */ jsx(SourceBadge, {
										source,
										t
									}),
									/* @__PURE__ */ jsx("button", {
										type: "button",
										className: locked ? "chip chip-active text-xs" : "chip text-xs",
										"aria-pressed": locked,
										title: locked ? t.system.unlock : t.system.lock,
										onClick: () => dispatch(locked ? {
											type: "unlock",
											path
										} : {
											type: "lock",
											path,
											value
										}),
										children: locked ? `🔒 ${t.layout.locked}` : t.system.lock
									}),
									source === "manual" && /* @__PURE__ */ jsxs("button", {
										type: "button",
										className: "chip text-xs",
										onClick: () => dispatch({
											type: "resetGlobal",
											path
										}),
										children: ["↺ ", t.system.reset]
									})
								]
							}),
							children: [
								control.kind === "color" && /* @__PURE__ */ jsx(ColorInput, {
									value: String(value),
									label,
									t,
									expert: mode === "expert",
									onChange: set
								}),
								control.kind === "number" && /* @__PURE__ */ jsx(NumberInput, {
									label,
									value: Number(value),
									min: control.min,
									max: control.max,
									step: control.step,
									unit: control.unit,
									onChange: set
								}),
								control.kind === "text" && /* @__PURE__ */ jsx(TextInput, {
									label,
									value: String(value),
									onChange: (v) => v.trim() && set(v)
								}),
								control.kind === "bool" && /* @__PURE__ */ jsx(Toggle, {
									label,
									checked: value === true,
									onChange: set
								}),
								control.kind === "select" && /* @__PURE__ */ jsx(SelectInput, {
									label,
									value: String(value),
									options: control.options,
									onChange: set
								}),
								control.kind === "font" && /* @__PURE__ */ jsx(SelectInput, {
									label,
									value: String(value),
									options: [...Object.values(FONT_STACKS).includes(String(value)) ? [] : [[String(value), String(value).split(",")[0].replace(/["']/g, "")]], ...Object.entries(FONT_STACKS).map(([id, stack]) => [stack, t.presets.fonts[id]])],
									onChange: set
								})
							]
						}, path);
					})
				}, title))
			}),
			tab === "components" && /* @__PURE__ */ jsxs("div", {
				className: "grid gap-4",
				children: [
					/* @__PURE__ */ jsx(Field, {
						label: t.system.component,
						children: /* @__PURE__ */ jsx(SelectInput, {
							label: t.system.component,
							value: kind,
							options: COMPONENT_KINDS.map((k) => [k, t.kinds[k]]),
							onChange: (k) => setKind(k)
						})
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm opacity-80",
						children: t.system.overrideHint
					}),
					project.components[kind] && Object.keys(project.components[kind]).length > 0 && /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "btn btn-ghost",
						onClick: () => dispatch({
							type: "resetComponent",
							kind
						}),
						children: t.system.resetComponent
					}) }),
					/* @__PURE__ */ jsx(ComponentEditor, {
						style: resolved.components[kind].style,
						t,
						mode,
						prefix: project.prefix,
						sources: resolved.components[kind].source,
						resolveColor,
						onReset: (path) => dispatch({
							type: "resetComponent",
							kind,
							path
						}),
						onChange: (path, value) => {
							if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") dispatch({
								type: "component",
								kind,
								path,
								value
							});
						},
						showStates: ![
							"heading",
							"text",
							"label"
						].includes(kind)
					}, kind)
				]
			}),
			tab === "themes" && /* @__PURE__ */ jsx(ThemesPanel, {
				t,
				project,
				resolved,
				dispatch,
				themeId: theme.def.id,
				setThemeId,
				mode
			})
		]
	});
}
function ThemesPanel({ t, project, resolved, dispatch, themeId, setThemeId, mode }) {
	const theme = resolved.themes.find((th) => th.def.id === themeId) ?? resolved.themes[0];
	const [name, setName] = useState(t.system.newThemeName);
	const [base, setBase] = useState("light");
	const [contrast, setContrast] = useState("normal");
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-5",
		children: [
			/* @__PURE__ */ jsx(Segmented, {
				label: t.system.themes,
				value: theme.def.id,
				options: project.themes.map((th) => [th.id, th.name]),
				onChange: setThemeId
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-4",
				children: [
					/* @__PURE__ */ jsx(Field, {
						label: t.system.themeName,
						children: /* @__PURE__ */ jsx(TextInput, {
							label: t.system.themeName,
							value: theme.def.name,
							onChange: (v) => dispatch({
								type: "themeUpdate",
								id: theme.def.id,
								name: v
							})
						})
					}),
					/* @__PURE__ */ jsx(Field, {
						label: t.system.themeBase,
						children: /* @__PURE__ */ jsx(SelectInput, {
							label: t.system.themeBase,
							value: theme.def.base,
							options: [["light", t.system.light], ["dark", t.system.dark]],
							onChange: (v) => dispatch({
								type: "themeUpdate",
								id: theme.def.id,
								base: v
							})
						})
					}),
					/* @__PURE__ */ jsx(Field, {
						label: t.system.contrast,
						children: /* @__PURE__ */ jsx(SelectInput, {
							label: t.system.contrast,
							value: theme.def.contrast,
							options: [["normal", t.system.contrastNormal], ["more", t.system.contrastMore]],
							onChange: (v) => dispatch({
								type: "themeUpdate",
								id: theme.def.id,
								contrast: v
							})
						})
					})
				]
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "text-sm opacity-80",
				children: [
					/* @__PURE__ */ jsxs("code", { children: [
						"data-theme=\"",
						theme.def.id,
						"\""
					] }),
					" · ",
					t.system.roleHint
				]
			}),
			/* @__PURE__ */ jsx(Section, {
				title: t.system.roles,
				open: true,
				children: COLOR_ROLES.map((role) => /* @__PURE__ */ jsx(Field, {
					label: role,
					tech: `--${project.prefix}-color-${role.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`,
					aside: /* @__PURE__ */ jsxs("span", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ jsx(SourceBadge, {
							source: theme.source[role],
							t
						}), theme.source[role] === "manual" && /* @__PURE__ */ jsx("button", {
							type: "button",
							className: "btn btn-ghost px-2 py-0 text-xs",
							onClick: () => dispatch({
								type: "themeRole",
								id: theme.def.id,
								role,
								value: null
							}),
							children: t.system.reset
						})]
					}),
					children: /* @__PURE__ */ jsx(ColorInput, {
						value: theme.colors[role],
						label: role,
						t,
						expert: mode === "expert",
						onChange: (v) => dispatch({
							type: "themeRole",
							id: theme.def.id,
							role,
							value: v
						})
					})
				}, role))
			}),
			project.themes.length > 1 && /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("button", {
				type: "button",
				className: "btn btn-danger",
				onClick: () => {
					dispatch({
						type: "themeRemove",
						id: theme.def.id
					});
					setThemeId(project.themes.find((th) => th.id !== theme.def.id).id);
				},
				children: t.system.removeTheme
			}) }),
			/* @__PURE__ */ jsxs("fieldset", {
				className: "grid gap-3 p-4",
				style: { background: "var(--color-soft)" },
				children: [
					/* @__PURE__ */ jsx("legend", {
						className: "eyebrow mb-1",
						children: t.system.addTheme
					}),
					/* @__PURE__ */ jsx(Field, {
						label: t.system.themeName,
						children: /* @__PURE__ */ jsx("input", {
							className: "field-boxed w-full",
							value: name,
							onChange: (e) => setName(e.target.value)
						})
					}),
					/* @__PURE__ */ jsx(Field, {
						label: t.system.themeBase,
						children: /* @__PURE__ */ jsx(SelectInput, {
							label: t.system.themeBase,
							value: base,
							options: [["light", t.system.light], ["dark", t.system.dark]],
							onChange: (v) => setBase(v)
						})
					}),
					/* @__PURE__ */ jsx(Field, {
						label: t.system.contrast,
						children: /* @__PURE__ */ jsx(SelectInput, {
							label: t.system.contrast,
							value: contrast,
							options: [["normal", t.system.contrastNormal], ["more", t.system.contrastMore]],
							onChange: (v) => setContrast(v)
						})
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						className: "btn btn-primary",
						disabled: project.themes.length >= 12,
						onClick: () => dispatch({
							type: "themeAdd",
							name,
							base,
							contrast
						}),
						children: t.system.addTheme
					})
				]
			})
		]
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-devkit/islands/studio/Studio.tsx
var STEPS = [
	"start",
	"component",
	"system",
	"preview",
	"code",
	"a11y",
	"export"
];
/**
* Designsystem-Studio: design one component, derive a complete design system
* by rule, refine it, check it, export it.
*
* Nothing here persists on its own. The project lives in memory; Premium users
* save it server-side through `tds-ext-tools-pkg`. There is deliberately no
* localStorage/IndexedDB copy — a guest's work ends with the tab, and the page
* warns before that happens.
*/
function Studio({ lang = "de" }) {
	const t = STRINGS$12[lang];
	const [project, dispatch] = useReducer(reduce, void 0, () => newProject("button"));
	const [step, setStep] = useState("start");
	const [generated, setGenerated] = useState(false);
	const [mode, setMode] = useState("simple");
	const [view, setView] = useState("components");
	const [device, setDevice] = useState("desktop");
	const [previewTheme, setPreviewTheme] = useState("light");
	const [access, setAccess] = useState(offlineAccess());
	const [projectId, setProjectId] = useState(null);
	const [savedSnapshot, setSavedSnapshot] = useState(null);
	const [touched, setTouched] = useState(false);
	const top = useRef(null);
	const resolved = useMemo(() => resolveProject(project), [project]);
	const deferred = useDeferredValue(resolved);
	const previewCss = useMemo(() => emitCss(deferred, { simulateStates: true }), [deferred]);
	const serialized = useMemo(() => JSON.stringify(project), [project]);
	const deferredProject = useDeferredValue(project);
	const seedCss = useMemo(() => emitCss(resolveProject({
		...deferredProject,
		variant: "original"
	}), { simulateStates: true }), [deferredProject]);
	const dirty = touched && serialized !== savedSnapshot;
	useEffect(() => {
		getAccess().then(setAccess);
	}, []);
	useEffect(() => {
		if (!dirty) return;
		const warn = (e) => {
			e.preventDefault();
			e.returnValue = t.leaveWarning;
			return t.leaveWarning;
		};
		window.addEventListener("beforeunload", warn);
		return () => window.removeEventListener("beforeunload", warn);
	}, [dirty, t.leaveWarning]);
	useEffect(() => {
		if (!project.themes.some((th) => th.id === previewTheme)) setPreviewTheme(project.themes[0]?.id ?? "light");
	}, [project.themes, previewTheme]);
	const act = (a) => {
		setTouched(true);
		dispatch(a);
	};
	const go = (s) => {
		setStep(s);
		if (typeof top.current?.scrollIntoView === "function") top.current.scrollIntoView({
			block: "start",
			behavior: "auto"
		});
	};
	const load = (p, next) => {
		dispatch({
			type: "load",
			project: p
		});
		setTouched(true);
		if (next !== "component") setGenerated(true);
		go(next);
	};
	const themeForFrame = previewTheme === "auto" ? null : previewTheme;
	const themeOptions = [["auto", t.preview.auto], ...project.themes.map((th) => [th.id, th.name])];
	const stepEnabled = (s) => s === "start" || s === "component" || generated;
	const stepIndex = STEPS.indexOf(step);
	const nextStep = STEPS[stepIndex + 1];
	const prevStep = STEPS[stepIndex - 1];
	const [introTitle, introText] = t.layout.intro[step];
	const themeSelect = /* @__PURE__ */ jsx("div", {
		className: "min-w-36",
		children: /* @__PURE__ */ jsx(SelectInput, {
			label: t.preview.theme,
			value: previewTheme,
			options: themeOptions,
			onChange: setPreviewTheme
		})
	});
	const fullToolbar = /* @__PURE__ */ jsxs(PreviewToolbar, { children: [
		/* @__PURE__ */ jsx(Segmented, {
			label: t.preview.view,
			value: view,
			options: PREVIEW_VIEWS.map((v) => [v, t.preview.views[v]]),
			onChange: setView
		}),
		/* @__PURE__ */ jsx(Segmented, {
			label: t.preview.device,
			value: device,
			options: [
				"desktop",
				"tablet",
				"phone"
			].map((d) => [d, t.preview.devices[d]]),
			onChange: setDevice
		}),
		themeSelect
	] });
	const note = /* @__PURE__ */ jsx("p", {
		className: "text-xs",
		style: { color: "var(--color-muted)" },
		children: t.preview.note
	});
	const modeToggle = /* @__PURE__ */ jsx(Segmented, {
		label: t.wizard.mode,
		value: mode,
		options: [["simple", t.wizard.simple], ["expert", t.wizard.expert]],
		onChange: setMode
	});
	const status = !touched ? null : access.entitled ? /* @__PURE__ */ jsx("span", {
		className: dirty ? "chip chip--warning" : "chip chip--success",
		children: dirty ? t.unsaved : t.saved
	}) : /* @__PURE__ */ jsx("span", {
		className: "chip chip--neutral",
		title: t.guestNote,
		children: t.layout.notSaved
	});
	return /* @__PURE__ */ jsxs("div", {
		ref: top,
		className: "dss grid gap-6",
		style: { scrollMarginTop: "6rem" },
		children: [
			/* @__PURE__ */ jsxs("header", {
				className: "grid gap-4",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "flex min-w-0 flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ jsx("span", {
							className: "truncate font-semibold",
							children: project.name
						}), status]
					}), (step === "component" || step === "system") && modeToggle]
				}), /* @__PURE__ */ jsx(Stepper, {
					steps: STEPS,
					current: step,
					enabled: stepEnabled,
					done: (s) => STEPS.indexOf(s) < stepIndex,
					labels: t.steps,
					onGo: go,
					t
				})]
			}),
			!access.enabled && /* @__PURE__ */ jsx(Alert, {
				tone: "warning",
				children: t.exp.disabled
			}),
			/* @__PURE__ */ jsx(StepIntro, {
				title: introTitle,
				text: introText
			}),
			step === "start" && /* @__PURE__ */ jsx(StartStep, {
				t,
				lang,
				analysisEnabled: access.analysisEnabled,
				onDesign: (kind) => {
					act({
						type: "seedKind",
						kind
					});
					go("component");
				},
				onLoaded: (p, next) => load(p, next)
			}),
			step === "component" && /* @__PURE__ */ jsx(Workspace, {
				t,
				controls: /* @__PURE__ */ jsxs(Fragment$1, { children: [
					/* @__PURE__ */ jsx(Segmented, {
						label: t.wizard.kind,
						value: project.seed.kind,
						options: [
							"button",
							"card",
							"input",
							"link"
						].map((k) => [k, t.start.kinds[k]]),
						onChange: (k) => act({
							type: "seedKind",
							kind: k
						})
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-xs",
						style: { color: "var(--color-muted)" },
						children: t.wizard.kindChangeWarn
					}),
					/* @__PURE__ */ jsx(ComponentEditor, {
						style: project.seed.style,
						t,
						mode,
						onChange: (path, value) => act({
							type: "seed",
							path,
							value
						})
					}),
					generated && /* @__PURE__ */ jsx("p", {
						className: "text-sm",
						style: { color: "var(--color-muted)" },
						children: t.wizard.regenerateNote
					})
				] }),
				preview: /* @__PURE__ */ jsxs(Fragment$1, { children: [
					/* @__PURE__ */ jsx(PreviewToolbar, { children: themeSelect }),
					/* @__PURE__ */ jsx(PreviewFrame, {
						css: seedCss,
						body: seedBody(project.prefix, project.seed.kind, lang),
						prefix: project.prefix,
						theme: themeForFrame,
						device: "fit",
						lang,
						title: t.preview.frameTitle,
						height: 380
					}),
					note
				] })
			}),
			step === "system" && /* @__PURE__ */ jsx(Workspace, {
				t,
				controls: /* @__PURE__ */ jsx(SystemStep, {
					t,
					project,
					resolved,
					dispatch: act,
					mode,
					previewTheme: themeForFrame
				}),
				preview: /* @__PURE__ */ jsxs(Fragment$1, { children: [
					fullToolbar,
					/* @__PURE__ */ jsx(PreviewFrame, {
						css: previewCss,
						body: previewBody(project.prefix, view, lang),
						prefix: project.prefix,
						theme: themeForFrame,
						device,
						lang,
						title: t.preview.frameTitle,
						height: 640
					}),
					note
				] })
			}),
			step === "preview" && /* @__PURE__ */ jsxs("div", {
				className: "grid gap-3",
				children: [
					fullToolbar,
					/* @__PURE__ */ jsx(PreviewFrame, {
						css: previewCss,
						body: previewBody(project.prefix, view, lang),
						prefix: project.prefix,
						theme: themeForFrame,
						device,
						lang,
						title: t.preview.frameTitle,
						height: 820
					}),
					note
				]
			}),
			step === "code" && /* @__PURE__ */ jsx(CodeStep, {
				t,
				resolved,
				customCss: project.customCss,
				onCustomCss: (css) => act({
					type: "customCss",
					css
				}),
				canCopy: mayExport(access, "css")
			}),
			step === "a11y" && /* @__PURE__ */ jsx(A11yStep, {
				t,
				resolved,
				onApply: (s) => act({
					type: "suggestion",
					suggestion: s
				}),
				onShow: (themeId) => {
					if (themeId) setPreviewTheme(themeId);
					setView("components");
					go("preview");
				}
			}),
			step === "export" && /* @__PURE__ */ jsxs("div", {
				className: "grid gap-8 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]",
				children: [/* @__PURE__ */ jsxs("section", {
					className: "grid content-start gap-3",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "eyebrow",
						children: t.exp.title
					}), /* @__PURE__ */ jsx(ExportStep, {
						t,
						lang,
						project,
						access
					})]
				}), /* @__PURE__ */ jsxs("section", {
					className: "grid content-start gap-3",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "eyebrow",
						children: t.projects.title
					}), /* @__PURE__ */ jsx(ProjectsPanel, {
						t,
						lang,
						access,
						project,
						projectId,
						dirty,
						onNameChange: (name) => act({
							type: "name",
							name
						}),
						onSaved: (id) => {
							setProjectId(id);
							setSavedSnapshot(serialized);
						},
						onOpen: (p, id) => {
							dispatch({
								type: "load",
								project: p
							});
							setProjectId(id);
							setSavedSnapshot(JSON.stringify(p));
							setTouched(true);
							setGenerated(true);
							go("system");
						}
					})]
				})]
			}),
			step !== "start" && /* @__PURE__ */ jsx(StepFooter, {
				back: prevStep ? () => go(prevStep) : void 0,
				backLabel: prevStep ? t.steps[prevStep] : t.common.back,
				next: step === "component" ? () => {
					setGenerated(true);
					setTouched(true);
					go("system");
				} : nextStep && stepEnabled(nextStep) ? () => go(nextStep) : void 0,
				nextLabel: step === "component" ? t.wizard.generate : nextStep ? t.layout.next(t.steps[nextStep]) : void 0
			})
		]
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-devkit/tools/DesignSystemStudio.astro
createAstro("https://tools.tracht-digital.de");
var $$DesignSystemStudio = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$DesignSystemStudio;
	const { lang = "de" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="tool tool--designsystem">${renderComponent($$result, "Studio", Studio, {
		"client:load": true,
		"lang": lang,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-devkit/islands/studio/Studio.tsx",
		"client:component-export": "default"
	})}</div>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-devkit/tools/DesignSystemStudio.astro", void 0);
// node_modules/@tracht-digital-solutions/tds-tool-devkit/islands/ContrastChecker.tsx
/** Parse #rgb / #rrggbb into [r,g,b] 0-255, or null if malformed. */
function parseHex(hex) {
	const s = hex.trim().replace(/^#/, "");
	const full = s.length === 3 ? s.split("").map((c) => c + c).join("") : s;
	if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
	return [
		parseInt(full.slice(0, 2), 16),
		parseInt(full.slice(2, 4), 16),
		parseInt(full.slice(4, 6), 16)
	];
}
/** WCAG relative luminance of an sRGB channel triple. */
function luminance$1([r, g, b]) {
	const chan = (v) => {
		const s = v / 255;
		return s <= .03928 ? s / 12.92 : ((s + .055) / 1.055) ** 2.4;
	};
	return .2126 * chan(r) + .7152 * chan(g) + .0722 * chan(b);
}
function ratio(fg, bg) {
	const l1 = luminance$1(fg);
	const l2 = luminance$1(bg);
	const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
	return (hi + .05) / (lo + .05);
}
/** German is the default — every existing test here asserts German labels. */
var STRINGS$11 = {
	de: {
		pass: "bestanden ✓",
		fail: "nicht bestanden ✗",
		textColour: "Textfarbe",
		background: "Hintergrund",
		invalidHex: "Bitte gültige Hex-Farben eingeben (z. B. #1f2937).",
		aaNormal: "AA (Normal)",
		aaLarge: "AA (Groß)",
		aaaNormal: "AAA (Normal)",
		aaaLarge: "AAA (Groß)",
		legend: "„Groß“ = ab 18,66px fett bzw. 24px normal. AA verlangt 4,5:1 (normal) / 3:1 (groß), AAA 7:1 / 4,5:1.",
		sampleHeading: "Beispieltext",
		sampleBody: "Digitalisierung für Unternehmen — barrierefrei und lesbar für alle. Dieser Vorschautext verwendet die gewählten Farben.",
		sampleSmall: "Kleinerer Fließtext zur Kontrollprüfung."
	},
	en: {
		pass: "passed ✓",
		fail: "not passed ✗",
		textColour: "Text colour",
		background: "Background",
		invalidHex: "Please enter valid hex colours (e.g. #1f2937).",
		aaNormal: "AA (normal)",
		aaLarge: "AA (large)",
		aaaNormal: "AAA (normal)",
		aaaLarge: "AAA (large)",
		legend: "“Large” = from 18.66px bold or 24px regular. AA requires 4.5:1 (normal) / 3:1 (large), AAA 7:1 / 4.5:1.",
		sampleHeading: "Sample text",
		sampleBody: "Digitalisation for businesses — accessible and readable for everyone. This preview text uses the colours you selected.",
		sampleSmall: "Smaller body copy for a second check."
	}
};
function Badge({ pass, label, t }) {
	return /* @__PURE__ */ jsxs("span", {
		className: `status-pill text-sm ${pass ? "status-pill--success" : "status-pill--danger"}`,
		children: [
			label,
			": ",
			pass ? t.pass : t.fail
		]
	});
}
function ContrastChecker({ lang = "de" }) {
	const t = STRINGS$11[lang];
	const [fg, setFg] = useState("#1f2937");
	const [bg, setBg] = useState("#ffffff");
	const parsed = useMemo(() => {
		const f = parseHex(fg);
		const b = parseHex(bg);
		if (!f || !b) return null;
		return { r: ratio(f, b) };
	}, [fg, bg]);
	const r = parsed?.r ?? 0;
	const rounded = r ? `${r.toFixed(2)} : 1` : "—";
	const field = "field-boxed w-28 font-mono text-sm";
	const swatch = (label, value, set) => /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ jsx("input", {
			type: "color",
			className: "field-boxed h-10 w-10",
			value: parseHex(value) ? value : "#000000",
			onChange: (e) => set(e.target.value),
			"aria-label": label
		}), /* @__PURE__ */ jsxs("label", {
			className: "text-sm",
			children: [/* @__PURE__ */ jsx("span", {
				className: "mb-1 block opacity-80",
				children: label
			}), /* @__PURE__ */ jsx("input", {
				className: field,
				value,
				onChange: (e) => set(e.target.value)
			})]
		})]
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "contrast-tool grid gap-6 md:grid-cols-2",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "space-y-4",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap gap-4",
				children: [swatch(t.textColour, fg, setFg), swatch(t.background, bg, setBg)]
			}), !parsed ? /* @__PURE__ */ jsx(Alert, {
				tone: "warning",
				children: t.invalidHex
			}) : /* @__PURE__ */ jsxs("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-3xl font-semibold",
						"aria-live": "polite",
						children: rounded
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ jsx(Badge, {
								label: t.aaNormal,
								pass: r >= 4.5,
								t
							}),
							/* @__PURE__ */ jsx(Badge, {
								label: t.aaLarge,
								pass: r >= 3,
								t
							}),
							/* @__PURE__ */ jsx(Badge, {
								label: t.aaaNormal,
								pass: r >= 7,
								t
							}),
							/* @__PURE__ */ jsx(Badge, {
								label: t.aaaLarge,
								pass: r >= 4.5,
								t
							})
						]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-xs opacity-60",
						children: t.legend
					})
				]
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "tds-card p-6",
			style: {
				background: parseHex(bg) ? bg : "#fff",
				color: parseHex(fg) ? fg : "#000",
				outline: "1px solid var(--color-line)",
				outlineOffset: "-1px"
			},
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-2xl font-semibold",
					children: t.sampleHeading
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2",
					children: t.sampleBody
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm opacity-90",
					children: t.sampleSmall
				})
			]
		})]
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-devkit/tools/ContrastChecker.astro
createAstro("https://tools.tracht-digital.de");
var $$ContrastChecker = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ContrastChecker;
	const { lang = "de" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="tool tool--contrast">${renderComponent($$result, "ContrastChecker", ContrastChecker, {
		"client:load": true,
		"lang": lang,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-devkit/islands/ContrastChecker.tsx",
		"client:component-export": "default"
	})}</div>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-devkit/tools/ContrastChecker.astro", void 0);
// node_modules/@tracht-digital-solutions/tds-tool-devkit/islands/JsonFormatter.tsx
/** German is the default — every existing test here asserts German labels. */
var STRINGS$10 = {
	de: {
		lineCol: (line, col) => `(Zeile ${line}, Spalte ${col})`,
		enterJson: "Bitte JSON eingeben.",
		enterJsonLabel: "JSON eingeben",
		invalidJson: "Ungültiges JSON.",
		format: "Formatieren",
		minify: "Minimieren",
		indent: "Einrückung",
		spaces: (n) => `${n} Leerzeichen`,
		compact: "Tab-frei / kompakt",
		valid: "Gültiges JSON ✓",
		copy: "Kopieren",
		copied: "Kopiert ✓"
	},
	en: {
		lineCol: (line, col) => `(line ${line}, column ${col})`,
		enterJson: "Please enter some JSON.",
		enterJsonLabel: "Enter JSON",
		invalidJson: "Invalid JSON.",
		format: "Format",
		minify: "Minify",
		indent: "Indentation",
		spaces: (n) => `${n} spaces`,
		compact: "Compact",
		valid: "Valid JSON ✓",
		copy: "Copy",
		copied: "Copied ✓"
	}
};
/** 1-based line/column of a character offset into `input`. */
function lineCol(input, pos) {
	const upto = input.slice(0, pos);
	return {
		line: upto.split("\n").length,
		col: pos - upto.lastIndexOf("\n")
	};
}
/**
* Turn a `JSON.parse` SyntaxError into a message that points at the offending
* spot. Engines disagree on the wording, so all three shapes are handled:
*
*  - V8 ≥ 19 often omits any offset ("Unexpected token 'o', ...\"…\" is not
*    valid JSON"). The offset is then recovered by re-scanning for the quoted
*    snippet, so the common case still gets a position.
*  - V8 also emits "... at position N (line L column C)" — already located, so
*    it must NOT get a second suffix appended. It is re-formatted through
*    `t.lineCol` like every other branch: this one interpolated German
*    directly, so an English page read "Zeile 3, Spalte 12" in exactly the
*    case where the engine supplies its own position.
*  - Older V8 / other engines emit a bare "at position N".
*/
function locate(input, message, t) {
	if (/line \d+ column \d+/i.test(message)) {
		const m = /line (\d+) column (\d+)/i.exec(message);
		return `${message.replace(/ at position \d+ \(line \d+ column \d+\)/i, "")} ${t.lineCol(m[1], m[2])}`;
	}
	const byPosition = /position (\d+)/.exec(message);
	if (byPosition) {
		const { line, col } = lineCol(input, Number(byPosition[1]));
		return `${message} ${t.lineCol(line, col)}`;
	}
	const window = /"([\s\S]*)" is not valid JSON$/.exec(message);
	const token = /Unexpected token '(.)'/.exec(message);
	if (window && token) {
		const context = window[1].replace(/^\.\.\./, "");
		const start = input.indexOf(context);
		if (start >= 0) {
			const at = input.indexOf(token[1], start);
			if (at >= 0) {
				const { line, col } = lineCol(input, at);
				return `${message} ${t.lineCol(line, col)}`;
			}
		}
	}
	return message;
}
function JsonFormatter({ lang = "de" }) {
	const t = STRINGS$10[lang];
	const [input, setInput] = useState("");
	const [indent, setIndent] = useState(2);
	const [result, setResult] = useState(null);
	const { copied, copy: copyFlag, reset: resetCopied } = useCopyFlag();
	const run = (minify) => {
		resetCopied();
		if (!input.trim()) {
			setResult({
				ok: false,
				error: t.enterJson
			});
			return;
		}
		try {
			const parsed = JSON.parse(input);
			const output = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, indent === 0 ? void 0 : indent);
			setResult({
				ok: true,
				output
			});
		} catch (e) {
			setResult({
				ok: false,
				error: locate(input, e instanceof Error ? e.message : t.invalidJson, t)
			});
		}
	};
	const copy = () => void copyFlag(result?.output ?? "");
	return /* @__PURE__ */ jsxs("div", {
		className: "json-tool space-y-4",
		children: [
			/* @__PURE__ */ jsxs("label", {
				className: "block text-sm",
				children: [/* @__PURE__ */ jsx("span", {
					className: "mb-1 block opacity-80",
					children: t.enterJsonLabel
				}), /* @__PURE__ */ jsx("textarea", {
					className: "field-boxed w-full font-mono text-sm",
					rows: 8,
					value: input,
					onChange: (e) => setInput(e.target.value),
					placeholder: "{\"hallo\": \"welt\"}",
					spellcheck: false
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ jsx("button", {
						type: "button",
						className: "btn btn-primary",
						onClick: () => run(false),
						children: t.format
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						className: "btn btn-ghost",
						onClick: () => run(true),
						children: t.minify
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "ml-auto flex items-center gap-2 text-sm",
						children: [t.indent, /* @__PURE__ */ jsxs("select", {
							className: "field-boxed",
							value: indent,
							onChange: (e) => setIndent(Number(e.target.value)),
							children: [
								/* @__PURE__ */ jsx("option", {
									value: 2,
									children: t.spaces(2)
								}),
								/* @__PURE__ */ jsx("option", {
									value: 4,
									children: t.spaces(4)
								}),
								/* @__PURE__ */ jsx("option", {
									value: 0,
									children: t.compact
								})
							]
						})]
					})
				]
			}),
			result?.ok === false && /* @__PURE__ */ jsx(Alert, { children: result.error }),
			result?.ok && result.output !== void 0 && /* @__PURE__ */ jsxs("div", {
				className: "space-y-2 tds-appear",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ jsx("span", {
						className: "status-pill status-pill--success text-sm",
						children: t.valid
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "btn btn-ghost",
						onClick: copy,
						children: copied ? t.copied : t.copy
					})]
				}), /* @__PURE__ */ jsx("pre", {
					className: "tds-card max-h-96 overflow-auto p-3 font-mono text-sm",
					children: result.output
				})]
			})
		]
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-devkit/tools/JsonFormatter.astro
createAstro("https://tools.tracht-digital.de");
var $$JsonFormatter = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$JsonFormatter;
	const { lang = "de" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="tool tool--json">${renderComponent($$result, "JsonFormatter", JsonFormatter, {
		"client:load": true,
		"lang": lang,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-devkit/islands/JsonFormatter.tsx",
		"client:component-export": "default"
	})}</div>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-devkit/tools/JsonFormatter.astro", void 0);
// node_modules/@tracht-digital-solutions/tds-tool-qr/islands/QrCode.tsx
/** Escape the special characters in a WLAN QR payload (`\ ; , : "`). */
function wifiEscape(value) {
	return value.replace(/([\\;,:"])/g, "\\$1");
}
/** Build the raw string a QR code encodes from the current form state. */
function buildPayload(state) {
	if (state.mode === "wifi") {
		if (!state.ssid) return "";
		return `WIFI:${[
			`S:${wifiEscape(state.ssid)}`,
			`T:${state.encryption}`,
			state.encryption !== "nopass" ? `P:${wifiEscape(state.password)}` : "",
			state.hidden ? "H:true" : ""
		].filter(Boolean).join(";")};;`;
	}
	if (state.mode === "vcard") {
		if (!state.name && !state.email && !state.phone) return "";
		return [
			"BEGIN:VCARD",
			"VERSION:3.0",
			`N:${state.name}`,
			state.org ? `ORG:${state.org}` : "",
			state.phone ? `TEL:${state.phone}` : "",
			state.email ? `EMAIL:${state.email}` : "",
			state.vurl ? `URL:${state.vurl}` : "",
			"END:VCARD"
		].filter(Boolean).join("\n");
	}
	return state.text;
}
/** German is the default — every existing test here asserts German labels. */
var STRINGS$9 = {
	de: {
		renderFailed: "QR-Code konnte nicht erstellt werden.",
		qrType: "QR-Typ",
		tabUrl: "URL / Text",
		tabWifi: "WLAN",
		tabVcard: "Kontakt (vCard)",
		urlOrText: "URL oder Text",
		ssid: "Netzwerkname (SSID)",
		encryption: "Verschlüsselung",
		noPassword: "Kein Passwort",
		password: "Passwort",
		hiddenNetwork: "Verstecktes Netzwerk",
		name: "Name",
		company: "Firma",
		phone: "Telefon",
		email: "E-Mail",
		website: "Website",
		optional: "(optional)",
		ecc: "Fehlerkorrektur",
		eccLow: "Niedrig (L)",
		eccMedium: "Mittel (M)",
		eccHigh: "Hoch (Q)",
		eccVeryHigh: "Sehr hoch (H)",
		size: "Größe",
		foreground: "Vordergrund",
		background: "Hintergrund",
		emptyHint: "Sobald Daten eingetragen sind, entsteht hier der QR-Code.",
		downloadPng: "PNG herunterladen",
		downloadSvg: "SVG herunterladen"
	},
	en: {
		renderFailed: "The QR code could not be created.",
		qrType: "QR type",
		tabUrl: "URL / text",
		tabWifi: "Wi-Fi",
		tabVcard: "Contact (vCard)",
		urlOrText: "URL or text",
		ssid: "Network name (SSID)",
		encryption: "Encryption",
		noPassword: "No password",
		password: "Password",
		hiddenNetwork: "Hidden network",
		name: "Name",
		company: "Company",
		phone: "Phone",
		email: "Email",
		website: "Website",
		optional: "(optional)",
		ecc: "Error correction",
		eccLow: "Low (L)",
		eccMedium: "Medium (M)",
		eccHigh: "High (Q)",
		eccVeryHigh: "Very high (H)",
		size: "Size",
		foreground: "Foreground",
		background: "Background",
		emptyHint: "Enter some data to generate the QR code.",
		downloadPng: "Download PNG",
		downloadSvg: "Download SVG"
	}
};
/**
* Fully client-side QR-Code-Generator: URL/Text, WLAN and vCard payloads, live
* canvas preview, and PNG + SVG download. No network, no login — everything
* happens in the browser.
*/
function QrCode({ lang = "de" }) {
	const t = STRINGS$9[lang];
	const [mode, setMode] = useState("url");
	const [text, setText] = useState("https://tracht-digital.de");
	const [ssid, setSsid] = useState("");
	const [password, setPassword] = useState("");
	const [encryption, setEncryption] = useState("WPA");
	const [hidden, setHidden] = useState(false);
	const [name, setName] = useState("");
	const [org, setOrg] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [vurl, setVurl] = useState("");
	const [ecc, setEcc] = useState("M");
	const [size, setSize] = useState(320);
	const [fg, setFg] = useState("#0f172a");
	const [bg, setBg] = useState("#ffffff");
	const [error, setError] = useState(null);
	const canvasRef = useRef(null);
	const payload = useMemo(() => buildPayload({
		mode,
		text,
		ssid,
		password,
		encryption,
		hidden,
		name,
		org,
		phone,
		email,
		vurl
	}), [
		mode,
		text,
		ssid,
		password,
		encryption,
		hidden,
		name,
		org,
		phone,
		email,
		vurl
	]);
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		if (!payload) {
			const ctx = canvas.getContext("2d");
			if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
			setError(null);
			return;
		}
		QRCode.toCanvas(canvas, payload, {
			width: size,
			errorCorrectionLevel: ecc,
			margin: 2,
			color: {
				dark: fg,
				light: bg
			}
		}).then(() => setError(null)).catch((e) => setError(e instanceof Error ? e.message : t.renderFailed));
	}, [
		payload,
		size,
		ecc,
		fg,
		bg
	]);
	const download = (href, filename) => downloadUrl(href, filename);
	const downloadPng = () => {
		const canvas = canvasRef.current;
		if (!canvas || !payload) return;
		download(canvas.toDataURL("image/png"), "qr-code.png");
	};
	const downloadSvg = async () => {
		if (!payload) return;
		const svg = await QRCode.toString(payload, {
			type: "svg",
			errorCorrectionLevel: ecc,
			margin: 2,
			color: {
				dark: fg,
				light: bg
			}
		});
		download(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`, "qr-code.svg");
	};
	const field = "field-boxed w-full";
	return /* @__PURE__ */ jsxs("div", {
		className: "qr-tool grid gap-6 md:grid-cols-[minmax(0,1fr)_auto]",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "qr-tool__form space-y-4",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "flex flex-wrap gap-2",
					role: "tablist",
					"aria-label": t.qrType,
					children: [
						["url", t.tabUrl],
						["wifi", t.tabWifi],
						["vcard", t.tabVcard]
					].map(([value, label]) => /* @__PURE__ */ jsx("button", {
						type: "button",
						role: "tab",
						"aria-selected": mode === value,
						className: mode === value ? "chip chip-active" : "chip",
						onClick: () => setMode(value),
						children: label
					}, value))
				}),
				mode === "url" && /* @__PURE__ */ jsxs("label", {
					className: "block text-sm",
					children: [/* @__PURE__ */ jsx("span", {
						className: "mb-1 block opacity-80",
						children: t.urlOrText
					}), /* @__PURE__ */ jsx("textarea", {
						className: field,
						rows: 3,
						value: text,
						onChange: (e) => setText(e.target.value)
					})]
				}),
				mode === "wifi" && /* @__PURE__ */ jsxs("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ jsxs("label", {
							className: "block text-sm",
							children: [/* @__PURE__ */ jsx("span", {
								className: "mb-1 block opacity-80",
								children: t.ssid
							}), /* @__PURE__ */ jsx("input", {
								className: field,
								value: ssid,
								onChange: (e) => setSsid(e.target.value)
							})]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "block text-sm",
							children: [/* @__PURE__ */ jsx("span", {
								className: "mb-1 block opacity-80",
								children: t.encryption
							}), /* @__PURE__ */ jsxs("select", {
								className: field,
								value: encryption,
								onChange: (e) => setEncryption(e.target.value),
								children: [
									/* @__PURE__ */ jsx("option", {
										value: "WPA",
										children: "WPA / WPA2 / WPA3"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "WEP",
										children: "WEP"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "nopass",
										children: t.noPassword
									})
								]
							})]
						}),
						encryption !== "nopass" && /* @__PURE__ */ jsxs("label", {
							className: "block text-sm",
							children: [/* @__PURE__ */ jsx("span", {
								className: "mb-1 block opacity-80",
								children: t.password
							}), /* @__PURE__ */ jsx("input", {
								className: field,
								value: password,
								onChange: (e) => setPassword(e.target.value)
							})]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ jsx("input", {
								type: "checkbox",
								checked: hidden,
								onChange: (e) => setHidden(e.target.checked)
							}), t.hiddenNetwork]
						})
					]
				}),
				mode === "vcard" && /* @__PURE__ */ jsxs("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ jsxs("label", {
							className: "block text-sm",
							children: [/* @__PURE__ */ jsx("span", {
								className: "mb-1 block opacity-80",
								children: t.name
							}), /* @__PURE__ */ jsx("input", {
								className: field,
								value: name,
								onChange: (e) => setName(e.target.value)
							})]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "block text-sm",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "mb-1 block opacity-80",
								children: [
									t.company,
									" ",
									t.optional
								]
							}), /* @__PURE__ */ jsx("input", {
								className: field,
								value: org,
								onChange: (e) => setOrg(e.target.value)
							})]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "block text-sm",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "mb-1 block opacity-80",
								children: [
									t.phone,
									" ",
									t.optional
								]
							}), /* @__PURE__ */ jsx("input", {
								className: field,
								value: phone,
								onChange: (e) => setPhone(e.target.value)
							})]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "block text-sm",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "mb-1 block opacity-80",
								children: [
									t.email,
									" ",
									t.optional
								]
							}), /* @__PURE__ */ jsx("input", {
								className: field,
								type: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value)
							})]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "block text-sm",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "mb-1 block opacity-80",
								children: [
									t.website,
									" ",
									t.optional
								]
							}), /* @__PURE__ */ jsx("input", {
								className: field,
								value: vurl,
								onChange: (e) => setVurl(e.target.value)
							})]
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-2 gap-3 pt-6",
					children: [
						/* @__PURE__ */ jsxs("label", {
							className: "block text-sm",
							children: [/* @__PURE__ */ jsx("span", {
								className: "mb-1 block opacity-80",
								children: t.ecc
							}), /* @__PURE__ */ jsxs("select", {
								className: field,
								value: ecc,
								onChange: (e) => setEcc(e.target.value),
								children: [
									/* @__PURE__ */ jsx("option", {
										value: "L",
										children: t.eccLow
									}),
									/* @__PURE__ */ jsx("option", {
										value: "M",
										children: t.eccMedium
									}),
									/* @__PURE__ */ jsx("option", {
										value: "Q",
										children: t.eccHigh
									}),
									/* @__PURE__ */ jsx("option", {
										value: "H",
										children: t.eccVeryHigh
									})
								]
							})]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "block text-sm",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "mb-1 block opacity-80",
								children: [
									t.size,
									": ",
									size,
									"px"
								]
							}), /* @__PURE__ */ jsx("input", {
								type: "range",
								min: 128,
								max: 640,
								step: 16,
								value: size,
								onChange: (e) => setSize(Number(e.target.value)),
								className: "w-full"
							})]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "block text-sm",
							children: [/* @__PURE__ */ jsx("span", {
								className: "mb-1 block opacity-80",
								children: t.foreground
							}), /* @__PURE__ */ jsx("input", {
								type: "color",
								className: "field-boxed h-10 w-full",
								value: fg,
								onChange: (e) => setFg(e.target.value)
							})]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "block text-sm",
							children: [/* @__PURE__ */ jsx("span", {
								className: "mb-1 block opacity-80",
								children: t.background
							}), /* @__PURE__ */ jsx("input", {
								type: "color",
								className: "field-boxed h-10 w-full",
								value: bg,
								onChange: (e) => setBg(e.target.value)
							})]
						})
					]
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "qr-tool__preview flex flex-col items-center gap-3",
			children: [
				/* @__PURE__ */ jsx("canvas", {
					ref: canvasRef,
					width: size,
					height: size,
					className: "tds-card h-auto max-w-full"
				}),
				/* @__PURE__ */ jsx(Alert, { children: error }),
				!payload && !error && /* @__PURE__ */ jsx("p", {
					className: "text-sm opacity-70",
					children: t.emptyHint
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: downloadPng,
						disabled: !payload,
						className: "btn btn-primary",
						children: t.downloadPng
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: downloadSvg,
						disabled: !payload,
						className: "btn btn-ghost",
						children: t.downloadSvg
					})]
				})
			]
		})]
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-qr/tools/QrCode.astro
createAstro("https://tools.tracht-digital.de");
var $$QrCode = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$QrCode;
	const { lang = "de" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="tool tool--qr">${renderComponent($$result, "QrCode", QrCode, {
		"client:load": true,
		"lang": lang,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-qr/islands/QrCode.tsx",
		"client:component-export": "default"
	})}</div>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-qr/tools/QrCode.astro", void 0);
// node_modules/@tracht-digital-solutions/tds-tool-textkit/islands/UtmBuilder.tsx
/** Lowercase, spaces→hyphens, strip anything but a-z0-9-_ — a clean UTM value. */
function slugify(value) {
	return value.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-_]/g, "").replace(/-+/g, "-");
}
/**
* UI strings. German is the default and stays the default — the site's
* audience is local businesses in Northern Germany, and every existing test
* in this repo asserts against the German labels. An island called without
* `lang` therefore behaves exactly as it did before this file learned English.
*/
var STRINGS$8 = {
	de: {
		targetUrl: "Ziel-URL",
		invalidUrl: "Bitte eine gültige URL inkl. https:// eingeben.",
		normalise: "Werte automatisch normalisieren (Kleinbuchstaben, Bindestriche)",
		recommended: (fields) => `Empfohlen: ${fields} ausfüllen.`,
		copy: "Kopieren",
		copied: "Kopiert ✓",
		params: [
			{
				key: "utm_source",
				label: "Quelle (utm_source)",
				placeholder: "newsletter",
				required: true
			},
			{
				key: "utm_medium",
				label: "Medium (utm_medium)",
				placeholder: "email",
				required: true
			},
			{
				key: "utm_campaign",
				label: "Kampagne (utm_campaign)",
				placeholder: "fruehjahr-2026",
				required: true
			},
			{
				key: "utm_term",
				label: "Keyword (utm_term)",
				placeholder: "digitalisierung"
			},
			{
				key: "utm_content",
				label: "Inhalt (utm_content)",
				placeholder: "header-button"
			}
		]
	},
	en: {
		targetUrl: "Target URL",
		invalidUrl: "Please enter a valid URL including https://.",
		normalise: "Normalise values automatically (lower case, hyphens)",
		recommended: (fields) => `Recommended: fill in ${fields}.`,
		copy: "Copy",
		copied: "Copied ✓",
		params: [
			{
				key: "utm_source",
				label: "Source (utm_source)",
				placeholder: "newsletter",
				required: true
			},
			{
				key: "utm_medium",
				label: "Medium (utm_medium)",
				placeholder: "email",
				required: true
			},
			{
				key: "utm_campaign",
				label: "Campaign (utm_campaign)",
				placeholder: "spring-2026",
				required: true
			},
			{
				key: "utm_term",
				label: "Keyword (utm_term)",
				placeholder: "digitalisation"
			},
			{
				key: "utm_content",
				label: "Content (utm_content)",
				placeholder: "header-button"
			}
		]
	}
};
/**
* UTM campaign-link builder — compose a trackable URL from a base address +
* utm_* parameters, with optional slug normalisation, live preview and copy.
* Client-side only.
*/
function UtmBuilder({ lang = "de" }) {
	const t = STRINGS$8[lang];
	const PARAMS = t.params;
	const [base, setBase] = useState("https://tracht-digital.de");
	const [values, setValues] = useState({});
	const [autoSlug, setAutoSlug] = useState(true);
	const { copied, copy: copyFlag, reset: resetCopied } = useCopyFlag();
	const set = (key, v) => {
		setValues((prev) => ({
			...prev,
			[key]: v
		}));
		resetCopied();
	};
	const { url, error } = useMemo(() => {
		if (!base.trim()) return {
			url: "",
			error: null
		};
		let parsed;
		try {
			parsed = new URL(base.trim());
		} catch {
			return {
				url: "",
				error: t.invalidUrl
			};
		}
		for (const p of PARAMS) {
			const raw = values[p.key];
			if (!raw) continue;
			parsed.searchParams.set(p.key, autoSlug && p.key !== "utm_term" ? slugify(raw) : raw.trim());
		}
		return {
			url: parsed.toString(),
			error: null
		};
	}, [
		base,
		values,
		autoSlug,
		t,
		PARAMS
	]);
	const missing = PARAMS.filter((p) => p.required && !values[p.key]).map((p) => p.label.split(" (")[0]);
	const copy = () => void copyFlag(url);
	const field = "field-boxed w-full";
	return /* @__PURE__ */ jsxs("div", {
		className: "utm-tool space-y-5",
		children: [
			/* @__PURE__ */ jsxs("label", {
				className: "block text-sm",
				children: [/* @__PURE__ */ jsx("span", {
					className: "mb-1 block opacity-80",
					children: t.targetUrl
				}), /* @__PURE__ */ jsx("input", {
					className: field,
					value: base,
					onChange: (e) => {
						setBase(e.target.value);
						resetCopied();
					},
					placeholder: "https://…"
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: PARAMS.map((p) => /* @__PURE__ */ jsxs("label", {
					className: "block text-sm",
					children: [/* @__PURE__ */ jsxs("span", {
						className: "mb-1 block opacity-80",
						children: [p.label, p.required ? /* @__PURE__ */ jsx("span", {
							className: "text-[color:var(--color-danger)]",
							children: " *"
						}) : null]
					}), /* @__PURE__ */ jsx("input", {
						className: field,
						value: values[p.key] ?? "",
						onChange: (e) => set(p.key, e.target.value),
						placeholder: p.placeholder
					})]
				}, p.key))
			}),
			/* @__PURE__ */ jsxs("label", {
				className: "flex items-center gap-2 text-sm",
				children: [/* @__PURE__ */ jsx("input", {
					type: "checkbox",
					checked: autoSlug,
					onChange: (e) => setAutoSlug(e.target.checked)
				}), t.normalise]
			}),
			error ? /* @__PURE__ */ jsx(Alert, { children: error }) : /* @__PURE__ */ jsxs("div", {
				className: "space-y-2",
				children: [missing.length > 0 && /* @__PURE__ */ jsx("p", {
					className: "text-xs opacity-70",
					children: t.recommended(missing.join(", "))
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-stretch gap-2",
					children: [/* @__PURE__ */ jsx("output", {
						className: "tds-card flex-1 select-all px-4 py-3 font-mono text-sm break-all",
						children: /* @__PURE__ */ jsx("span", {
							className: "tds-appear block",
							children: url || "—"
						}, url)
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "btn btn-primary",
						onClick: copy,
						disabled: !url,
						children: copied ? t.copied : t.copy
					})]
				})]
			})
		]
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-textkit/tools/UtmBuilder.astro
createAstro("https://tools.tracht-digital.de");
var $$UtmBuilder = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$UtmBuilder;
	const { lang = "de" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="tool tool--utm">${renderComponent($$result, "UtmBuilder", UtmBuilder, {
		"client:load": true,
		"lang": lang,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-textkit/islands/UtmBuilder.tsx",
		"client:component-export": "default"
	})}</div>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-textkit/tools/UtmBuilder.astro", void 0);
// node_modules/@tracht-digital-solutions/tds-tool-businesscard/src/card.ts
/**
* The business card, as geometry and one drawing function.
*
* ### Why the preview IS the export
*
* The obvious build is an HTML card for the preview and a second renderer for
* the download. That is two implementations of one design, and they drift: the
* file a visitor downloads stops being the card they approved, usually in the
* details nobody re-checks (a font fallback, a shadow offset, a rounding).
* There is one renderer here, it draws to a canvas, and the preview is that
* canvas at screen size while the download is the same call at print size. A
* difference between what was seen and what was saved is therefore not
* expressible.
*
* ### Units
*
* Everything below is in MILLIMETRES on a standard 85 × 55 mm card, and
* `scale` turns those into device pixels: `scale` 4 is a ~344 px preview,
* `scale` 35.4 is 300 dpi for print. So a layout decision is taken once, in the
* units a printer uses, instead of in pixels that mean something different on
* every screen.
*
* No DOM beyond the 2D context it is handed, so the rules are testable against
* a recording stub.
*/
/** The ISO 7810 ID-1-ish card every German print shop quotes for. */
var CARD_MM = {
	width: 85,
	height: 55
};
var PRINT_SCALE = 300 / 25.4;
var DEFAULT_SPEC = {
	name: "Max Mustermann",
	role: "Geschäftsführer",
	company: "Musterfirma GmbH",
	phone: "+49 170 1234567",
	email: "max@musterfirma.de",
	website: "musterfirma.de",
	accent: "#820933",
	surface: "paper",
	corner: "soft",
	shadow: "hard",
	layout: "left",
	showBar: true
};
/** Ground and ink for each surface. Fixed pairs, so contrast cannot be lost. */
var SURFACES = {
	paper: {
		ground: "#fafaf7",
		ink: "#12121a",
		muted: "#6b6b66"
	},
	sand: {
		ground: "#f1efe8",
		ink: "#12121a",
		muted: "#6b6b66"
	},
	navy: {
		ground: "#050f68",
		ink: "#ffffff",
		muted: "#b9c0e8"
	},
	ink: {
		ground: "#12121a",
		ink: "#ffffff",
		muted: "#9c9ca8"
	}
};
/** Corner radius in mm. */
var CORNERS = {
	sharp: 0,
	soft: 1.5,
	round: 4
};
/**
* The shadow's own colour, per surface.
*
* The site's hard shadow is navy, and navy under a navy card is a card with no
* shadow — which is what the first render produced. Making it darker does not
* rescue it either: a navy ground sits at 0.015 luminance, so even black only
* reaches 1.3:1 against it. There is no dark left to use.
*
* So a dark card casts a LIGHT shadow, which is exactly what the site itself
* does in dark mode (`--tds-shadow-ink` flips to a pale blue there). The edge
* of the card stays findable either way, which is the only thing the offset is
* for.
*/
var SHADOW_INK = {
	paper: "#050f68",
	sand: "#050f68",
	navy: "#93a7ff",
	ink: "#8f8fa8"
};
/** Soft-shadow geometry, in mm like everything else here. */
var SOFT_SHADOW = {
	blur: 2.5,
	offsetX: .8,
	offsetY: 1.4
};
/**
* On a dark ground the picked accent can fall below readable contrast, and the
* picker has no way to know that. Rather than refusing the colour, the card
* lightens it until it carries — the visitor keeps their colour and keeps a
* card that can be read.
*/
function readableAccent(accent, surface) {
	const ground = SURFACES[surface].ground;
	if (contrast(accent, ground) >= 3) return accent;
	const [h, s, l] = toHsl(accent);
	const lighter = luminance(ground) < .5;
	for (let step = 1; step <= 10; step += 1) {
		const next = fromHsl(h, s, Math.min(.96, Math.max(.06, l + (lighter ? step * .07 : -step * .07))));
		if (contrast(next, ground) >= 3) return next;
	}
	return SURFACES[surface].ink;
}
/** How much room the shadow needs around the card, in mm. */
function shadowPadding(shadow) {
	return shadow === "none" ? 0 : shadow === "hard" ? 2 : 3;
}
/** The canvas size for a spec at a given scale, in device pixels. */
function canvasSize(spec, scale) {
	const pad = shadowPadding(spec.shadow);
	return {
		width: Math.round((CARD_MM.width + pad) * scale),
		height: Math.round((CARD_MM.height + pad) * scale)
	};
}
function path(ctx, x, y, w, h, r) {
	ctx.beginPath();
	if (r > 0 && typeof ctx.roundRect === "function") ctx.roundRect(x, y, w, h, r);
	else ctx.rect(x, y, w, h);
}
/**
* Draw the card. `scale` is px per mm; everything else is in mm.
*
* The caller owns the canvas size (`canvasSize`) — this only draws, so the
* same call serves a 5 px/mm preview and a 300 dpi export.
*/
function drawCard(ctx, spec, scale) {
	const { ground, ink, muted } = SURFACES[spec.surface];
	const accent = readableAccent(spec.accent, spec.surface);
	const radius = CORNERS[spec.corner];
	const pad = shadowPadding(spec.shadow);
	ctx.save();
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.scale(scale, scale);
	if (spec.shadow === "hard") {
		ctx.fillStyle = SHADOW_INK[spec.surface];
		path(ctx, pad, pad, CARD_MM.width, CARD_MM.height, radius);
		ctx.fill();
	} else if (spec.shadow === "soft") {
		ctx.shadowColor = "rgba(0,0,0,0.22)";
		ctx.shadowBlur = SOFT_SHADOW.blur * scale;
		ctx.shadowOffsetX = SOFT_SHADOW.offsetX * scale;
		ctx.shadowOffsetY = SOFT_SHADOW.offsetY * scale;
	}
	ctx.fillStyle = ground;
	path(ctx, 0, 0, CARD_MM.width, CARD_MM.height, radius);
	ctx.fill();
	ctx.shadowColor = "transparent";
	ctx.shadowBlur = 0;
	ctx.shadowOffsetX = 0;
	ctx.shadowOffsetY = 0;
	ctx.save();
	path(ctx, 0, 0, CARD_MM.width, CARD_MM.height, radius);
	ctx.clip();
	if (spec.layout === "band") {
		ctx.fillStyle = accent;
		ctx.fillRect(0, 0, CARD_MM.width, 9);
	}
	ctx.restore();
	const centred = spec.layout === "centre";
	const left = centred ? CARD_MM.width / 2 : 8;
	const top = spec.layout === "band" ? 20 : 15;
	const put = (text, y, size, colour, weight = "400") => {
		if (!text) return;
		ctx.font = `${weight} ${size}px "Plus Jakarta Sans", "Helvetica Neue", Arial, sans-serif`;
		ctx.fillStyle = colour;
		ctx.textBaseline = "alphabetic";
		const x = centred ? left - ctx.measureText(text).width / 2 : left;
		ctx.fillText(text, x, y);
	};
	put(spec.name, top, 5.2, ink, "700");
	put(spec.role, top + 5.4, 3, accent, "600");
	put(spec.company, top + 9.8, 3, muted);
	if (spec.showBar) {
		const barY = top + 13.5;
		const widths = [
			9,
			4,
			2.5
		];
		let x = centred ? left - (widths[0] + widths[1] + widths[2] + 2) / 2 : left;
		for (const [index, width] of widths.entries()) {
			ctx.fillStyle = [
				accent,
				"#ff7a9c",
				"#c8a04a"
			][index];
			ctx.fillRect(x, barY, width, .9);
			x += width + 1;
		}
	}
	let y = CARD_MM.height - 14;
	for (const line of [
		spec.phone,
		spec.email,
		spec.website
	]) {
		put(line, y, 2.8, muted);
		y += 4.2;
	}
	ctx.restore();
}
function toRgb(hex) {
	const clean = hex.replace("#", "");
	const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
	const value = Number.parseInt(full, 16);
	if (!Number.isFinite(value)) return [
		0,
		0,
		0
	];
	return [
		value >> 16 & 255,
		value >> 8 & 255,
		value & 255
	];
}
function luminance(hex) {
	const channel = (c) => {
		const v = c / 255;
		return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4;
	};
	const [r, g, b] = toRgb(hex);
	return .2126 * channel(r) + .7152 * channel(g) + .0722 * channel(b);
}
function contrast(a, b) {
	const la = luminance(a);
	const lb = luminance(b);
	return (Math.max(la, lb) + .05) / (Math.min(la, lb) + .05);
}
function toHsl(hex) {
	const [r255, g255, b255] = toRgb(hex);
	const r = r255 / 255;
	const g = g255 / 255;
	const b = b255 / 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const l = (max + min) / 2;
	if (max === min) return [
		0,
		0,
		l
	];
	const d = max - min;
	const s = l > .5 ? d / (2 - max - min) : d / (max + min);
	let h;
	if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
	else if (max === g) h = ((b - r) / d + 2) / 6;
	else h = ((r - g) / d + 4) / 6;
	return [
		h,
		s,
		l
	];
}
function fromHsl(h, s, l) {
	const f = (n) => {
		const k = (n + h * 12) % 12;
		const value = l - s * Math.min(l, 1 - l) * Math.max(-1, Math.min(k - 3, 9 - k, 1));
		return Math.round(value * 255);
	};
	return `#${[
		f(0),
		f(8),
		f(4)
	].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}
// node_modules/@tracht-digital-solutions/tds-tool-businesscard/islands/CardDesigner.tsx
var STRINGS$7 = {
	de: {
		content: "Inhalt",
		name: "Name",
		role: "Position",
		company: "Firma",
		phone: "Telefon",
		email: "E-Mail",
		website: "Webseite",
		look: "Aussehen",
		accent: "Akzentfarbe",
		surface: "Fläche",
		corner: "Ecken",
		shadow: "Schatten",
		layout: "Aufteilung",
		bar: "Farbbalken zeigen",
		preview: "Vorschau",
		download: "Als PNG herunterladen",
		downloadHint: "85 × 55 mm, 300 dpi — Druckauflösung.",
		reset: "Zurücksetzen",
		accentAdjusted: "Die Farbe wurde aufgehellt, damit sie auf dieser Fläche lesbar bleibt.",
		surfaces: {
			paper: "Papier",
			sand: "Sand",
			navy: "Navy",
			ink: "Anthrazit"
		},
		corners: {
			sharp: "Scharf",
			soft: "Leicht",
			round: "Rund"
		},
		shadows: {
			none: "Ohne",
			hard: "Hart",
			soft: "Weich"
		},
		layouts: {
			left: "Linksbündig",
			centre: "Zentriert",
			band: "Mit Farbband"
		}
	},
	en: {
		content: "Content",
		name: "Name",
		role: "Role",
		company: "Company",
		phone: "Phone",
		email: "Email",
		website: "Website",
		look: "Look",
		accent: "Accent colour",
		surface: "Surface",
		corner: "Corners",
		shadow: "Shadow",
		layout: "Layout",
		bar: "Show the colour bar",
		preview: "Preview",
		download: "Download as PNG",
		downloadHint: "85 × 55 mm at 300 dpi — print resolution.",
		reset: "Reset",
		accentAdjusted: "The colour was lightened so it stays readable on this surface.",
		surfaces: {
			paper: "Paper",
			sand: "Sand",
			navy: "Navy",
			ink: "Charcoal"
		},
		corners: {
			sharp: "Sharp",
			soft: "Slight",
			round: "Round"
		},
		shadows: {
			none: "None",
			hard: "Hard",
			soft: "Soft"
		},
		layouts: {
			left: "Left aligned",
			centre: "Centred",
			band: "With a colour band"
		}
	}
};
/**
* A business card, designed in the browser.
*
* The preview and the download are the SAME renderer (`src/card.ts`) at two
* scales, so the file that lands in the visitor's downloads folder cannot
* differ from the card they approved. Everything is local: no upload, no
* account, nothing leaves the page.
*/
function CardDesigner({ lang = "de" }) {
	const t = STRINGS$7[lang];
	const [spec, setSpec] = useState(DEFAULT_SPEC);
	const canvasRef = useRef(null);
	const set = (key, value) => setSpec((current) => ({
		...current,
		[key]: value
	}));
	const preview = useMemo(() => canvasSize(spec, 5), [spec]);
	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;
		const dpr = Math.min(3, window.devicePixelRatio || 1);
		canvas.width = Math.round(preview.width * dpr);
		canvas.height = Math.round(preview.height * dpr);
		drawCard(ctx, spec, 5 * dpr);
	}, [
		spec,
		preview.width,
		preview.height
	]);
	const download = () => {
		const size = canvasSize(spec, PRINT_SCALE);
		const out = document.createElement("canvas");
		out.width = size.width;
		out.height = size.height;
		const ctx = out.getContext("2d");
		if (!ctx) return;
		drawCard(ctx, spec, PRINT_SCALE);
		downloadUrl(out.toDataURL("image/png"), "visitenkarte.png");
	};
	const adjusted = readableAccent(spec.accent, spec.surface).toLowerCase() !== spec.accent.toLowerCase();
	const field = "field-boxed w-full";
	const text = (key) => /* @__PURE__ */ jsxs("label", {
		className: "block text-sm",
		children: [/* @__PURE__ */ jsx("span", {
			className: "mb-1 block opacity-80",
			children: t[key]
		}), /* @__PURE__ */ jsx("input", {
			className: field,
			value: spec[key],
			onChange: (event) => set(key, event.target.value)
		})]
	});
	const choice = (key, values, names) => /* @__PURE__ */ jsxs("fieldset", { children: [/* @__PURE__ */ jsx("legend", {
		className: "mb-1 block text-sm opacity-80",
		children: t[key]
	}), /* @__PURE__ */ jsx("div", {
		className: "flex flex-wrap gap-2",
		children: values.map((value) => /* @__PURE__ */ jsx("button", {
			type: "button",
			className: spec[key] === value ? "chip chip-active" : "chip",
			"aria-pressed": spec[key] === value,
			onClick: () => set(key, value),
			children: names[String(value)]
		}, String(value)))
	})] });
	return /* @__PURE__ */ jsxs("div", {
		className: "bc-tool grid gap-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "bc-tool__form space-y-5",
			children: [
				/* @__PURE__ */ jsxs("fieldset", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ jsx("legend", {
							className: "eyebrow mb-1",
							children: t.content
						}),
						text("name"),
						text("role"),
						text("company"),
						text("phone"),
						text("email"),
						text("website")
					]
				}),
				/* @__PURE__ */ jsxs("fieldset", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ jsx("legend", {
							className: "eyebrow mb-1",
							children: t.look
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "block text-sm",
							children: [/* @__PURE__ */ jsx("span", {
								className: "mb-1 block opacity-80",
								children: t.accent
							}), /* @__PURE__ */ jsx("input", {
								type: "color",
								className: "field-boxed",
								style: { width: "6rem" },
								value: spec.accent,
								onChange: (event) => set("accent", event.target.value),
								"aria-describedby": adjusted ? "bc-accent-note" : void 0
							})]
						}),
						adjusted && /* @__PURE__ */ jsx("p", {
							id: "bc-accent-note",
							className: "text-sm opacity-80",
							children: t.accentAdjusted
						}),
						choice("surface", Object.keys(SURFACES), t.surfaces),
						choice("corner", Object.keys(CORNERS), t.corners),
						choice("shadow", [
							"none",
							"hard",
							"soft"
						], t.shadows),
						choice("layout", [
							"left",
							"centre",
							"band"
						], t.layouts),
						/* @__PURE__ */ jsxs("label", {
							className: "flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ jsx("input", {
								type: "checkbox",
								checked: spec.showBar,
								onChange: (event) => set("showBar", event.target.checked)
							}), /* @__PURE__ */ jsx("span", { children: t.bar })]
						})
					]
				}),
				/* @__PURE__ */ jsx("button", {
					type: "button",
					className: "btn btn-ghost",
					onClick: () => setSpec(DEFAULT_SPEC),
					children: t.reset
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "bc-tool__preview space-y-3",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "eyebrow",
					children: t.preview
				}),
				/* @__PURE__ */ jsx("canvas", {
					ref: canvasRef,
					role: "presentation",
					style: {
						width: `${preview.width}px`,
						height: `${preview.height}px`,
						maxWidth: "100%"
					}
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ jsx("button", {
						type: "button",
						className: "btn btn-primary",
						onClick: download,
						children: t.download
					}), /* @__PURE__ */ jsx("p", {
						className: "text-sm opacity-80",
						children: t.downloadHint
					})]
				})
			]
		})]
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-businesscard/tools/CardDesigner.astro
createAstro("https://tools.tracht-digital.de");
var $$CardDesigner = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$CardDesigner;
	const { lang = "de" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="tool tool--businesscard">${renderComponent($$result, "CardDesigner", CardDesigner, {
		"client:load": true,
		"lang": lang,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-businesscard/islands/CardDesigner.tsx",
		"client:component-export": "default"
	})}</div>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-businesscard/tools/CardDesigner.astro", void 0);
// node_modules/@tracht-digital-solutions/tds-tool-media/islands/compressCore.ts
/**
* The image compressor's arithmetic, kept apart from the island so it can be
* tested without a DOM: the resize rule, the target-size search, file naming
* and the ZIP container for "download all".
*
* Nothing here touches a canvas. The island passes an `encode` callback, which
* keeps the search testable with a fake encoder whose output size is a plain
* function of scale and quality.
*/
var ENCODABLE = [
	"image/jpeg",
	"image/webp",
	"image/png",
	"image/avif"
];
/**
* The type to encode to. `original` maps a JPG to JPG and a PNG to PNG; an
* input the canvas cannot write back (GIF, BMP, HEIC on Safari) becomes JPEG.
*/
function resolveMime(format, inputType) {
	if (format !== "original") return format;
	const t = inputType === "image/jpg" ? "image/jpeg" : inputType;
	return ENCODABLE.includes(t) ? t : "image/jpeg";
}
/** PNG has no quality knob — only fewer pixels make it smaller. */
function isLossy(mime) {
	return mime !== "image/png";
}
/** File extension for a written type. */
function extensionFor(mime) {
	switch (mime) {
		case "image/webp": return "webp";
		case "image/png": return "png";
		case "image/avif": return "avif";
		default: return "jpg";
	}
}
/**
* Output dimensions: fit inside `maxWidth` × `maxHeight`, keep the aspect
* ratio, never upscale, never collapse an edge to zero.
*
* `null` or a non-positive bound means "no limit on that edge". The clamp to 1
* is the branch that matters: inverting it stretches an 800 px image to
* 1600 px, which makes it bigger AND blurrier.
*/
function fitDimensions(width, height, maxWidth, maxHeight) {
	const limits = [1];
	if (maxWidth && maxWidth > 0 && width > 0) limits.push(maxWidth / width);
	if (maxHeight && maxHeight > 0 && height > 0) limits.push(maxHeight / height);
	const scale = Math.min(...limits);
	return {
		width: Math.max(1, Math.round(width * scale)),
		height: Math.max(1, Math.round(height * scale)),
		scale
	};
}
/** The lowest quality the search will go to. Below it a photo turns to blocks. */
var MIN_QUALITY = .3;
/** Each downscale step keeps this share of the edge length. */
var SCALE_STEP = .85;
var MAX_SCALE_STEPS = 8;
var QUALITY_ITERATIONS = 7;
/**
* Encode with no target: one pass at the chosen quality.
*/
async function encodeOnce(encode, quality) {
	const blob = await encode(1, quality);
	if (!blob) throw new Error("encode");
	return {
		blob,
		scale: 1,
		quality,
		reached: true
	};
}
/**
* Encode to at most `targetBytes`.
*
* Quality first: a binary search between {@link MIN_QUALITY} and the user's
* chosen quality (the ceiling — a target never makes an image *better* than
* asked). Only when the floor still does not fit does it start dropping
* pixels, 15 % of the edge per step, because a smaller sharp image beats a
* full-size smeared one. A lossless format skips straight to the pixels.
*
* Returns the best attempt with `reached: false` rather than throwing when the
* target is out of reach — the user still gets the smallest file there was.
*/
async function encodeToTarget(encode, opts) {
	const { targetBytes, maxQuality, lossy } = opts;
	let best = null;
	let scale = 1;
	for (let step = 0; step <= MAX_SCALE_STEPS; step++) {
		const top = await encode(scale, maxQuality);
		if (!top) throw new Error("encode");
		if (top.size <= targetBytes) return {
			blob: top,
			scale,
			quality: maxQuality,
			reached: true
		};
		if (!best || top.size < best.blob.size) best = {
			blob: top,
			scale,
			quality: maxQuality,
			reached: false
		};
		if (lossy && maxQuality > .3) {
			const floor = await encode(scale, MIN_QUALITY);
			if (!floor) throw new Error("encode");
			if (floor.size < best.blob.size) best = {
				blob: floor,
				scale,
				quality: MIN_QUALITY,
				reached: false
			};
			if (floor.size <= targetBytes) {
				let lo = MIN_QUALITY;
				let hi = maxQuality;
				let fit = {
					blob: floor,
					scale,
					quality: MIN_QUALITY,
					reached: true
				};
				for (let i = 0; i < QUALITY_ITERATIONS; i++) {
					const mid = (lo + hi) / 2;
					const blob = await encode(scale, mid);
					if (!blob) throw new Error("encode");
					if (blob.size <= targetBytes) {
						fit = {
							blob,
							scale,
							quality: mid,
							reached: true
						};
						lo = mid;
					} else hi = mid;
				}
				return fit;
			}
		}
		scale *= SCALE_STEP;
	}
	return best;
}
/**
* Human file size, German or English decimal mark (tds-shared `formatBytes`):
* one decimal for KB, two for MB, so a compression result reads precisely.
*/
function formatSize(bytes, lang = "de") {
	return formatBytes(bytes, lang, bytes >= 1048576 ? 2 : 1);
}
/** Saving in whole percent; negative when the file grew. */
function savingPercent(before, after) {
	if (before <= 0) return 0;
	return Math.round((1 - after / before) * 100);
}
/**
* Download name: the original's base name plus a suffix and the new extension
* — `urlaub.jpeg` → `urlaub-komprimiert.webp`. A file called just `.jpg`, or
* one with characters a file system rejects, still yields something savable.
*/
function outputName(original, suffix, ext) {
	const dot = original.lastIndexOf(".");
	return `${(dot > 0 ? original.slice(0, dot) : original).replace(/[\\/:*?"<>|\u0000-\u001f]/g, "_").trim() || "bild"}-${suffix}.${ext}`;
}
/**
* Make names unique within one ZIP. Two `IMG_0001.jpg` from different folders
* are common; the second would silently overwrite the first on extraction.
*/
function uniqueNames(names) {
	const seen = /* @__PURE__ */ new Map();
	return names.map((name) => {
		const key = name.toLowerCase();
		const count = seen.get(key) ?? 0;
		seen.set(key, count + 1);
		if (count === 0) return name;
		const dot = name.lastIndexOf(".");
		const candidate = dot > 0 ? `${name.slice(0, dot)}-${count + 1}${name.slice(dot)}` : `${name}-${count + 1}`;
		seen.set(candidate.toLowerCase(), 1);
		return candidate;
	});
}
/**
* A ZIP archive with every entry STORED (no deflate), written by tds-shared's
* `./zip`. The entries are JPEG/WebP/PNG/AVIF — already compressed, so
* deflating them again saves next to nothing. Names are UTF-8, so
* "Prüfbericht-komprimiert.jpg" survives; the date is the real one, since a
* person unpacks this archive.
*/
function createZip(entries, date = /* @__PURE__ */ new Date()) {
	return createZip$1(entries.map((e) => ({
		path: e.name,
		data: e.data
	})), {
		date,
		names: "unicode"
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-media/islands/ImageCompress.tsx
/**
* Starting points for the common jobs. Values follow the guide on the tools
* site ("1600 px for full-width, quality around 80 %"); a preset only fills
* the fields, every one stays editable afterwards.
*/
var PRESETS = {
	web: {
		format: "image/webp",
		quality: .8,
		maxWidth: 1600,
		maxHeight: null,
		targetKb: null
	},
	email: {
		format: "image/jpeg",
		quality: .8,
		maxWidth: 1280,
		maxHeight: 1280,
		targetKb: 300
	},
	social: {
		format: "image/jpeg",
		quality: .85,
		maxWidth: 1080,
		maxHeight: 1350,
		targetKb: null
	},
	thumb: {
		format: "image/webp",
		quality: .75,
		maxWidth: 400,
		maxHeight: 400,
		targetKb: null
	}
};
/** German is the default — every existing test here asserts German labels. */
var STRINGS$6 = {
	de: {
		loadFailed: "Bild konnte nicht geladen werden. Formate wie HEIC bitte vorher als JPG exportieren.",
		noCanvas: "Canvas nicht verfügbar.",
		compressFailed: "Komprimierung fehlgeschlagen.",
		formatUnsupported: "Dieser Browser kann das gewählte Format nicht schreiben. Bitte JPEG oder PNG wählen.",
		chooseImage: "Bilder auswählen",
		dropHint: "oder hierher ziehen bzw. mit Strg+V einfügen. JPG, PNG, WebP, AVIF und GIF; mehrere auf einmal.",
		dropActive: "Loslassen zum Hinzufügen",
		presets: "Voreinstellung",
		presetNames: {
			web: "Website",
			email: "E-Mail",
			social: "Social Media",
			thumb: "Vorschaubild"
		},
		format: "Format",
		formatOriginal: "Wie Original",
		quality: "Qualität",
		qualityLossless: "PNG ist verlustfrei, kleiner wird es nur über die Pixelmaße.",
		maxWidth: "Max. Breite (px)",
		maxHeight: "Max. Höhe (px)",
		unlimited: "unbegrenzt",
		targetSize: "Zielgröße (KB)",
		targetHint: "Optional. Die Qualität wird automatisch gesenkt, bis die Datei höchstens so groß ist.",
		compressing: "Komprimiere …",
		compress: "Komprimieren",
		clearAll: "Alle entfernen",
		remove: (name) => `${name} entfernen`,
		resultAlt: (name) => `${name}, komprimiert`,
		originalAlt: (name) => `${name}, Original`,
		compare: "Vorher und nachher vergleichen",
		before: "Vorher",
		after: "Nachher",
		smaller: (pct) => ` (${pct}% kleiner)`,
		larger: (pct) => ` (${pct}% größer)`,
		keptOriginal: "Das Original war bereits kleiner und bleibt unverändert.",
		targetMissed: "Zielgröße nicht ganz erreicht; das ist die kleinste mögliche Datei.",
		download: "Herunterladen",
		downloadZip: (n) => `Alle ${n} als ZIP herunterladen`,
		suffix: "komprimiert",
		zipName: "bilder-komprimiert.zip",
		summary: (n, before, after, pct) => `${n} ${n === 1 ? "Bild" : "Bilder"}: ${before} → ${after}${pct > 0 ? ` (${pct}% kleiner)` : ""}`,
		waiting: "Bereit",
		note: "Alle Bilder werden lokal im Browser verarbeitet und niemals hochgeladen."
	},
	en: {
		loadFailed: "The image could not be loaded. Please export formats such as HEIC as JPG first.",
		noCanvas: "Canvas is not available.",
		compressFailed: "Compression failed.",
		formatUnsupported: "This browser cannot write the chosen format. Please pick JPEG or PNG.",
		chooseImage: "Choose images",
		dropHint: "or drag them here, or paste with Ctrl+V. JPG, PNG, WebP, AVIF and GIF; several at once.",
		dropActive: "Release to add",
		presets: "Preset",
		presetNames: {
			web: "Website",
			email: "Email",
			social: "Social media",
			thumb: "Thumbnail"
		},
		format: "Format",
		formatOriginal: "Same as original",
		quality: "Quality",
		qualityLossless: "PNG is lossless; it only gets smaller through its pixel dimensions.",
		maxWidth: "Max. width (px)",
		maxHeight: "Max. height (px)",
		unlimited: "unlimited",
		targetSize: "Target size (KB)",
		targetHint: "Optional. Quality is lowered automatically until the file is at most this size.",
		compressing: "Compressing …",
		compress: "Compress",
		clearAll: "Remove all",
		remove: (name) => `Remove ${name}`,
		resultAlt: (name) => `${name}, compressed`,
		originalAlt: (name) => `${name}, original`,
		compare: "Compare before and after",
		before: "Before",
		after: "After",
		smaller: (pct) => ` (${pct}% smaller)`,
		larger: (pct) => ` (${pct}% larger)`,
		keptOriginal: "The original was already smaller and is kept unchanged.",
		targetMissed: "Target size not quite reached; this is the smallest file possible.",
		download: "Download",
		downloadZip: (n) => `Download all ${n} as ZIP`,
		suffix: "compressed",
		zipName: "images-compressed.zip",
		summary: (n, before, after, pct) => `${n} ${n === 1 ? "image" : "images"}: ${before} → ${after}${pct > 0 ? ` (${pct}% smaller)` : ""}`,
		waiting: "Ready",
		note: "All images are processed locally in your browser and are never uploaded."
	}
};
var FORMAT_LABELS = {
	"image/jpeg": "JPEG",
	"image/webp": "WebP",
	"image/png": "PNG",
	"image/avif": "AVIF"
};
/**
* Probe whether this browser's canvas can write `mime`. An unsupported type
* does not fail — `toBlob` silently falls back to PNG — so the returned type
* is the only honest answer. Safari, for one, writes no WebP from a canvas.
*/
function probe(mime) {
	return new Promise((resolve) => {
		try {
			const c = document.createElement("canvas");
			c.width = 1;
			c.height = 1;
			c.toBlob((b) => resolve(!!b && b.type === mime), mime, .5);
		} catch {
			resolve(false);
		}
	});
}
/** Whole positive pixels or KB from a number field; empty or junk means no limit. */
function parseLimit(value) {
	const n = Math.round(Number(value));
	return value.trim() !== "" && Number.isFinite(n) && n > 0 ? n : null;
}
/**
* Client-side image compressor: several images at once, resized to fit a
* maximum width and height, re-encoded as JPEG, WebP, PNG or AVIF at a chosen
* quality or down to a target file size, downloadable one by one or as one
* ZIP. Nothing is uploaded — files are read and processed in the browser.
*/
function ImageCompress({ lang = "de" }) {
	const t = STRINGS$6[lang];
	const [items, setItems] = useState([]);
	const [settings, setSettings] = useState({
		format: "image/jpeg",
		quality: .8,
		maxWidth: 1600,
		maxHeight: null,
		targetKb: null
	});
	const [preset, setPreset] = useState(null);
	const [supported, setSupported] = useState({
		"image/webp": true,
		"image/avif": false
	});
	const [busy, setBusy] = useState(false);
	const nextId = useRef(1);
	const hintId = useId();
	/**
	* Every object URL this island has minted, so each can be released.
	*
	* An object URL pins its Blob for the lifetime of the DOCUMENT, not of the
	* component — dropping the last reference to it frees nothing. Compressing a
	* folder of 12 MP photos twice without revoking would keep every decoded
	* bitmap alive until the tab closed. Nothing errors; the tab just grows.
	*
	* A ref mirrors the list so the unmount cleanup sees the latest value, which
	* a captured state variable would not.
	*/
	const itemsRef = useRef([]);
	itemsRef.current = items;
	const release = (item) => {
		URL.revokeObjectURL(item.sourceUrl);
		if (item.result && item.result.url !== item.sourceUrl) URL.revokeObjectURL(item.result.url);
	};
	useEffect(() => () => itemsRef.current.forEach(release), []);
	useEffect(() => {
		let live = true;
		Promise.all([probe("image/webp"), probe("image/avif")]).then(([webp, avif]) => {
			if (live) setSupported({
				"image/webp": webp,
				"image/avif": avif
			});
		});
		return () => {
			live = false;
		};
	}, []);
	const patch = (id, change) => setItems((list) => list.map((it) => it.id === id ? {
		...it,
		...change
	} : it));
	const addFiles = (files) => {
		const added = [];
		for (const file of files) {
			if (file.type && !file.type.startsWith("image/")) continue;
			const id = nextId.current++;
			const sourceUrl = URL.createObjectURL(file);
			added.push({
				id,
				file,
				sourceUrl,
				img: null,
				error: null,
				result: null
			});
			const img = new Image();
			img.onload = () => patch(id, { img });
			img.onerror = () => patch(id, { error: t.loadFailed });
			img.src = sourceUrl;
		}
		if (added.length) setItems((list) => [...list, ...added]);
	};
	const remove = (id) => {
		setItems((list) => {
			const gone = list.find((it) => it.id === id);
			if (gone) release(gone);
			return list.filter((it) => it.id !== id);
		});
	};
	const clearAll = () => {
		items.forEach(release);
		setItems([]);
	};
	const update = (change) => {
		setSettings((s) => ({
			...s,
			...change
		}));
		setPreset(null);
	};
	const applyPreset = (id) => {
		const p = PRESETS[id];
		const format = (p.format === "image/webp" || p.format === "image/avif") && !supported[p.format] ? "image/jpeg" : p.format;
		setSettings({
			...p,
			format
		});
		setPreset(id);
	};
	/** Compress one decoded image with the current settings. */
	const compressOne = async (item, img) => {
		const mime = resolveMime(settings.format, item.file.type);
		const fit = fitDimensions(img.width, img.height, settings.maxWidth, settings.maxHeight);
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error(t.noCanvas);
		const encode = (scale, quality) => {
			canvas.width = Math.max(1, Math.round(fit.width * scale));
			canvas.height = Math.max(1, Math.round(fit.height * scale));
			if (mime === "image/jpeg") {
				ctx.fillStyle = "#ffffff";
				ctx.fillRect(0, 0, canvas.width, canvas.height);
			}
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			return new Promise((resolve) => canvas.toBlob(resolve, mime, quality));
		};
		const out = settings.targetKb ? await encodeToTarget(encode, {
			targetBytes: settings.targetKb * 1024,
			maxQuality: settings.quality,
			lossy: isLossy(mime)
		}) : await encodeOnce(encode, settings.quality);
		if (out.blob.type && out.blob.type !== mime) throw new Error(t.formatUnsupported);
		const width = canvas.width;
		const height = canvas.height;
		if (resolveMime("original", item.file.type) === mime && item.file.type !== "" && out.blob.size >= item.file.size && width === img.width && height === img.height) return {
			url: item.sourceUrl,
			blob: item.file,
			mime,
			width,
			height,
			name: outputName(item.file.name, t.suffix, extensionFor(mime)),
			keptOriginal: true,
			targetMissed: false
		};
		return {
			url: URL.createObjectURL(out.blob),
			blob: out.blob,
			mime,
			width,
			height,
			name: outputName(item.file.name, t.suffix, extensionFor(mime)),
			keptOriginal: false,
			targetMissed: !out.reached
		};
	};
	const compressAll = async () => {
		setBusy(true);
		for (const item of itemsRef.current) {
			if (!item.img) continue;
			try {
				const result = await compressOne(item, item.img);
				if (item.result && item.result.url !== item.sourceUrl) URL.revokeObjectURL(item.result.url);
				patch(item.id, {
					result,
					error: null
				});
			} catch (e) {
				patch(item.id, { error: e instanceof Error && e.message !== "encode" ? e.message : t.compressFailed });
			}
		}
		setBusy(false);
	};
	const downloadZip = async () => {
		const done = items.filter((it) => it.result);
		const names = uniqueNames(done.map((it) => it.result.name));
		downloadBytes(createZip(await Promise.all(done.map(async (it, i) => ({
			name: names[i],
			data: new Uint8Array(await it.result.blob.arrayBuffer())
		})))), "application/zip", t.zipName);
	};
	const ready = items.some((it) => it.img);
	const done = items.filter((it) => it.result);
	const totalBefore = done.reduce((n, it) => n + it.file.size, 0);
	const totalAfter = done.reduce((n, it) => n + it.result.blob.size, 0);
	const lossless = (settings.format === "original" ? null : settings.format) === "image/png";
	const field = "field-boxed w-full";
	return /* @__PURE__ */ jsxs("div", {
		className: "image-compress space-y-5",
		children: [
			/* @__PURE__ */ jsx(FileDropZone, {
				label: t.chooseImage,
				hint: t.dropHint,
				activeLabel: t.dropActive,
				accept: "image/*",
				multiple: true,
				paste: true,
				onFiles: addFiles
			}),
			ready && /* @__PURE__ */ jsxs(Fragment$1, { children: [
				/* @__PURE__ */ jsxs("div", {
					role: "group",
					"aria-label": t.presets,
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ jsxs("span", {
						className: "text-sm opacity-80",
						children: [t.presets, ":"]
					}), Object.keys(PRESETS).map((id) => /* @__PURE__ */ jsx("button", {
						type: "button",
						className: preset === id ? "chip chip-active" : "chip",
						"aria-pressed": preset === id,
						onClick: () => applyPreset(id),
						children: t.presetNames[id]
					}, id))]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
					children: [
						/* @__PURE__ */ jsxs("label", {
							className: "block text-sm",
							children: [/* @__PURE__ */ jsx("span", {
								className: "mb-1 block opacity-80",
								children: t.format
							}), /* @__PURE__ */ jsxs("select", {
								className: field,
								value: settings.format,
								onChange: (e) => update({ format: e.target.value }),
								children: [
									/* @__PURE__ */ jsx("option", {
										value: "image/jpeg",
										children: "JPEG"
									}),
									supported["image/webp"] && /* @__PURE__ */ jsx("option", {
										value: "image/webp",
										children: "WebP"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "image/png",
										children: "PNG"
									}),
									supported["image/avif"] && /* @__PURE__ */ jsx("option", {
										value: "image/avif",
										children: "AVIF"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "original",
										children: t.formatOriginal
									})
								]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "text-sm",
							children: [/* @__PURE__ */ jsxs("label", {
								className: "block",
								children: [/* @__PURE__ */ jsxs("span", {
									className: "mb-1 block opacity-80",
									children: [
										t.quality,
										": ",
										Math.round(settings.quality * 100),
										"%"
									]
								}), /* @__PURE__ */ jsx("input", {
									type: "range",
									min: .3,
									max: 1,
									step: .05,
									value: settings.quality,
									disabled: lossless,
									"aria-describedby": lossless ? `${hintId}-q` : void 0,
									onChange: (e) => update({ quality: Number(e.target.value) }),
									className: "w-full"
								})]
							}), lossless && /* @__PURE__ */ jsx("p", {
								id: `${hintId}-q`,
								className: "mt-1 text-xs opacity-60",
								children: t.qualityLossless
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "text-sm",
							children: [/* @__PURE__ */ jsxs("label", {
								className: "block",
								children: [/* @__PURE__ */ jsx("span", {
									className: "mb-1 block opacity-80",
									children: t.targetSize
								}), /* @__PURE__ */ jsx("input", {
									type: "number",
									inputMode: "numeric",
									min: 10,
									step: 10,
									placeholder: t.unlimited,
									value: settings.targetKb ?? "",
									"aria-describedby": `${hintId}-t`,
									onChange: (e) => update({ targetKb: parseLimit(e.target.value) }),
									className: field
								})]
							}), /* @__PURE__ */ jsx("p", {
								id: `${hintId}-t`,
								className: "mt-1 text-xs opacity-60",
								children: t.targetHint
							})]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "block text-sm",
							children: [/* @__PURE__ */ jsx("span", {
								className: "mb-1 block opacity-80",
								children: t.maxWidth
							}), /* @__PURE__ */ jsx("input", {
								type: "number",
								inputMode: "numeric",
								min: 1,
								placeholder: t.unlimited,
								value: settings.maxWidth ?? "",
								onChange: (e) => update({ maxWidth: parseLimit(e.target.value) }),
								className: field
							})]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "block text-sm",
							children: [/* @__PURE__ */ jsx("span", {
								className: "mb-1 block opacity-80",
								children: t.maxHeight
							}), /* @__PURE__ */ jsx("input", {
								type: "number",
								inputMode: "numeric",
								min: 1,
								placeholder: t.unlimited,
								value: settings.maxHeight ?? "",
								onChange: (e) => update({ maxHeight: parseLimit(e.target.value) }),
								className: field
							})]
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ jsx("button", {
							type: "button",
							className: "btn btn-primary",
							onClick: compressAll,
							disabled: busy,
							children: busy ? t.compressing : t.compress
						}),
						done.length > 1 && /* @__PURE__ */ jsx("button", {
							type: "button",
							className: "btn btn-ghost",
							onClick: downloadZip,
							disabled: busy,
							children: t.downloadZip(done.length)
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							className: "btn btn-ghost",
							onClick: clearAll,
							disabled: busy,
							children: t.clearAll
						})
					]
				})
			] }),
			done.length > 0 && /* @__PURE__ */ jsx("p", {
				className: "text-sm font-semibold",
				"aria-live": "polite",
				children: /* @__PURE__ */ jsx("span", { children: t.summary(done.length, formatSize(totalBefore, lang), formatSize(totalAfter, lang), savingPercent(totalBefore, totalAfter)) }, `${done.length}-${totalAfter}`)
			}),
			items.length > 0 && /* @__PURE__ */ jsx("ul", {
				className: "space-y-3",
				children: items.map((item) => {
					const r = item.result;
					const pct = r ? savingPercent(item.file.size, r.blob.size) : 0;
					return /* @__PURE__ */ jsxs("li", {
						className: "tds-card tds-appear space-y-3 p-4",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-wrap items-center gap-3",
								children: [
									r && /* @__PURE__ */ jsx("img", {
										src: r.url,
										alt: t.resultAlt(item.file.name),
										className: "tds-card h-16 w-16 shrink-0 object-cover"
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "min-w-[12rem] flex-1 text-sm",
										children: [/* @__PURE__ */ jsx("p", {
											className: "truncate font-semibold",
											children: item.file.name
										}), r ? /* @__PURE__ */ jsxs("p", { children: [
											formatSize(item.file.size, lang),
											" → ",
											/* @__PURE__ */ jsx("strong", { children: formatSize(r.blob.size, lang) }),
											pct > 0 && /* @__PURE__ */ jsx("span", {
												className: "text-[color:var(--color-success)]",
												children: t.smaller(pct)
											}),
											pct < 0 && /* @__PURE__ */ jsx("span", {
												className: "text-[color:var(--color-warning-ink)]",
												children: t.larger(-pct)
											}),
											/* @__PURE__ */ jsxs("span", {
												className: "opacity-60",
												children: [
													" ",
													"· ",
													r.width,
													"×",
													r.height,
													"px"
												]
											})
										] }) : !item.error && /* @__PURE__ */ jsxs("p", {
											className: "opacity-60",
											children: [formatSize(item.file.size, lang), item.img && ` · ${item.img.width}×${item.img.height}px · ${t.waiting}`]
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-wrap gap-2",
										children: [r && /* @__PURE__ */ jsx("a", {
											href: r.url,
											download: r.name,
											className: "btn btn-ghost",
											children: t.download
										}), /* @__PURE__ */ jsx("button", {
											type: "button",
											className: "btn btn-ghost",
											"aria-label": t.remove(item.file.name),
											onClick: () => remove(item.id),
											disabled: busy,
											children: "✕"
										})]
									})
								]
							}),
							item.error && /* @__PURE__ */ jsx(Alert, { children: item.error }),
							r?.keptOriginal && /* @__PURE__ */ jsx(Alert, {
								tone: "success",
								children: t.keptOriginal
							}),
							r?.targetMissed && /* @__PURE__ */ jsx(Alert, {
								tone: "warning",
								children: t.targetMissed
							}),
							r && !r.keptOriginal && /* @__PURE__ */ jsxs("details", {
								className: "text-sm",
								children: [/* @__PURE__ */ jsx("summary", {
									className: "link-underline cursor-pointer",
									children: t.compare
								}), /* @__PURE__ */ jsxs("div", {
									className: "mt-3 grid gap-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ jsxs("figure", {
										className: "space-y-1",
										children: [/* @__PURE__ */ jsx("img", {
											src: item.sourceUrl,
											alt: t.originalAlt(item.file.name),
											className: "tds-card h-auto max-h-80 w-full object-contain"
										}), /* @__PURE__ */ jsxs("figcaption", {
											className: "opacity-70",
											children: [
												t.before,
												" · ",
												formatSize(item.file.size, lang)
											]
										})]
									}), /* @__PURE__ */ jsxs("figure", {
										className: "space-y-1",
										children: [/* @__PURE__ */ jsx("img", {
											src: r.url,
											alt: t.resultAlt(item.file.name),
											className: "tds-card h-auto max-h-80 w-full object-contain"
										}), /* @__PURE__ */ jsxs("figcaption", {
											className: "opacity-70",
											children: [
												t.after,
												" · ",
												formatSize(r.blob.size, lang),
												" · ",
												FORMAT_LABELS[r.mime]
											]
										})]
									})]
								})]
							})
						]
					}, item.id);
				})
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-xs opacity-60",
				children: t.note
			})
		]
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-media/tools/ImageCompress.astro
createAstro("https://tools.tracht-digital.de");
var $$ImageCompress = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ImageCompress;
	const { lang = "de" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="tool tool--image-compress">${renderComponent($$result, "ImageCompress", ImageCompress, {
		"client:load": true,
		"lang": lang,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-media/islands/ImageCompress.tsx",
		"client:component-export": "default"
	})}</div>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-media/tools/ImageCompress.astro", void 0);
// node_modules/@tracht-digital-solutions/tds-tool-pdf/islands/shared.ts
/**
* Helpers shared by this pack's islands. Imported relatively — that is fine
* *inside* a pack; only the `component` entry of a tool manifest has to be a
* package subpath.
*
* See the tools-site convention: labels are translated, logic is not.
*/
/** pdf-lib bytes as a `.pdf` download (the shared helper copies the view first). */
function downloadPdf(bytes, name) {
	downloadBytes(bytes, "application/pdf", name);
}
/**
* Parse "1-3,5" (1-indexed) into a sorted, de-duped 0-indexed page list.
* An empty spec means "every page" — that is what the page-range inputs in this
* pack promise, and it keeps the common case free of typing.
*/
function parseRange$1(spec, pageCount) {
	if (spec.trim() === "") return Array.from({ length: pageCount }, (_, i) => i);
	const out = /* @__PURE__ */ new Set();
	for (const part of spec.split(",")) {
		const t = part.trim();
		if (!t) continue;
		const m = /^(\d+)(?:-(\d+))?$/.exec(t);
		if (!m) continue;
		const start = Number(m[1]);
		const end = m[2] ? Number(m[2]) : start;
		for (let i = start; i <= end; i++) if (i >= 1 && i <= pageCount) out.add(i - 1);
	}
	return [...out].sort((a, b) => a - b);
}
/** Millimetres → PDF points (72 dpi). Page geometry is authored in mm here. */
function mm(value) {
	return value * 72 / 25.4;
}
var PAGE_SIZES = {
	a4: {
		w: 210,
		h: 297
	},
	a5: {
		w: 148,
		h: 210
	},
	letter: {
		w: 215.9,
		h: 279.4
	}
};
/**
* Decode an image file to a canvas-drawable bitmap and re-encode it as JPEG or
* PNG at the requested size. Used by the compressor and by images-to-PDF, which
* both need a normalised, embeddable image regardless of what was dropped in.
*
* Returns `null` when the browser cannot decode the input at all.
*/
async function reencode(source, opts) {
	let bitmap;
	try {
		bitmap = await createImageBitmap(source);
	} catch {
		return null;
	}
	const scale = opts.maxWidth && bitmap.width > opts.maxWidth ? opts.maxWidth / bitmap.width : 1;
	const width = Math.max(1, Math.round(bitmap.width * scale));
	const height = Math.max(1, Math.round(bitmap.height * scale));
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d");
	if (!ctx) return null;
	if (opts.type === "image/jpeg") {
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, width, height);
	}
	ctx.drawImage(bitmap, 0, 0, width, height);
	bitmap.close?.();
	const blob = await new Promise((resolve) => canvas.toBlob((b) => resolve(b), opts.type, opts.quality));
	if (!blob) return null;
	return {
		blob,
		width,
		height
	};
}
/**
* The 14 standard PDF fonts are encoded WinAnsi, which covers German but not,
* say, an em dash typed on a Mac or a stray emoji. An unencodable character
* makes pdf-lib throw at draw time, which would surface as "could not be
* processed" for what is really one bad character — so they are dropped here.
*/
function toWinAnsi(text) {
	return text.replace(/[‘’‚‹›]/g, "'").replace(/[“”„]/g, "\"").replace(/[–—]/g, "-").replace(/…/g, "...").replace(/[^\u0000-\u00FF]/g, "");
}
// node_modules/@tracht-digital-solutions/tds-tool-pdf/islands/ImagesToPdf.tsx
/** German is the default; an older pinned pack must keep working unchanged. */
var STRINGS$5 = {
	de: {
		needImages: "Bitte mindestens ein Bild wählen.",
		failed: "Das PDF konnte nicht erstellt werden.",
		noneUsable: "Keines der gewählten Bilder konnte gelesen werden.",
		done: (n) => `PDF mit ${n} Seite(n) erstellt.`,
		outName: "bilder.pdf",
		chooseImages: "Bilder auswählen (JPG, PNG, WebP)",
		dropHint: "oder hierher ziehen bzw. mit Strg+V einfügen",
		dropActive: "Loslassen zum Hinzufügen",
		chosen: (n) => `${n} Bild(er) gewählt`,
		pageSize: "Seitenformat",
		sizeFromImage: "So groß wie das Bild",
		orientation: "Ausrichtung",
		portrait: "Hochformat",
		landscape: "Querformat",
		auto: "Nach Bild richten",
		margin: "Rand (mm)",
		fit: "Bild einpassen",
		fitWhole: "Ganz sichtbar (mit Rand)",
		fitFill: "Seite füllen (Ränder werden beschnitten)",
		quality: "Bildqualität",
		order: "Reihenfolge",
		up: "Nach oben",
		down: "Nach unten",
		remove: "Entfernen",
		working: "Erstelle …",
		run: "PDF erstellen & herunterladen",
		note: "Die Bilder werden lokal im Browser verarbeitet und niemals hochgeladen."
	},
	en: {
		needImages: "Please choose at least one image.",
		failed: "The PDF could not be created.",
		noneUsable: "None of the chosen images could be read.",
		done: (n) => `Created a PDF with ${n} page(s).`,
		outName: "images.pdf",
		chooseImages: "Choose images (JPG, PNG, WebP)",
		dropHint: "or drag them here, or paste with Ctrl+V",
		dropActive: "Release to add",
		chosen: (n) => `${n} image(s) selected`,
		pageSize: "Page size",
		sizeFromImage: "Same size as the image",
		orientation: "Orientation",
		portrait: "Portrait",
		landscape: "Landscape",
		auto: "Follow the image",
		margin: "Margin (mm)",
		fit: "Image fit",
		fitWhole: "Fully visible (with margin)",
		fitFill: "Fill the page (edges are cropped)",
		quality: "Image quality",
		order: "Order",
		up: "Move up",
		down: "Move down",
		remove: "Remove",
		working: "Creating …",
		run: "Create PDF & download",
		note: "The images are processed locally in your browser and are never uploaded."
	}
};
/**
* Scale an image into a page box. `fit` keeps the whole image visible (letterboxed);
* `fill` covers the box and lets the overflow be cropped.
*/
function layout(image, box, mode) {
	const ratio = image.width / image.height;
	const boxRatio = box.width / box.height;
	const wide = mode === "fit" ? ratio > boxRatio : ratio < boxRatio;
	const width = wide ? box.width : box.height * ratio;
	const height = wide ? box.width / ratio : box.height;
	return {
		width,
		height,
		x: (box.width - width) / 2,
		y: (box.height - height) / 2
	};
}
/** Move an item within a list; out-of-range moves are a no-op, not an error. */
function reorder(items, from, to) {
	if (to < 0 || to >= items.length || from < 0 || from >= items.length) return items;
	const next = items.slice();
	const [moved] = next.splice(from, 1);
	if (moved === void 0) return items;
	next.splice(to, 0, moved);
	return next;
}
function ImagesToPdf({ lang = "de" }) {
	const t = STRINGS$5[lang];
	const [files, setFiles] = useState([]);
	const [pageSize, setPageSize] = useState("a4");
	const [orientation, setOrientation] = useState("auto");
	const [margin, setMargin] = useState(10);
	const [fit, setFit] = useState("fit");
	const [quality, setQuality] = useState(80);
	const [busy, setBusy] = useState(false);
	const [status, setStatus] = useState(null);
	const [error, setError] = useState(null);
	const run = async () => {
		setBusy(true);
		setError(null);
		setStatus(null);
		try {
			if (files.length === 0) throw new Error(t.needImages);
			const doc = await PDFDocument.create();
			let pages = 0;
			for (const file of files) {
				const out = await reencode(file, {
					quality: quality / 100,
					type: "image/jpeg"
				});
				if (!out) continue;
				const embedded = await doc.embedJpg(new Uint8Array(await out.blob.arrayBuffer()));
				let pageWidth;
				let pageHeight;
				if (pageSize === "image") {
					pageWidth = embedded.width;
					pageHeight = embedded.height;
				} else {
					const preset = PAGE_SIZES[pageSize];
					const wantLandscape = orientation === "landscape" || orientation === "auto" && embedded.width > embedded.height;
					pageWidth = mm(wantLandscape ? preset.h : preset.w);
					pageHeight = mm(wantLandscape ? preset.w : preset.h);
				}
				const page = doc.addPage([pageWidth, pageHeight]);
				const inset = pageSize === "image" ? 0 : mm(margin);
				const placed = layout(embedded, {
					width: Math.max(1, pageWidth - inset * 2),
					height: Math.max(1, pageHeight - inset * 2)
				}, pageSize === "image" ? "fit" : fit);
				page.drawImage(embedded, {
					x: inset + placed.x,
					y: inset + placed.y,
					width: placed.width,
					height: placed.height
				});
				pages++;
			}
			if (pages === 0) throw new Error(t.noneUsable);
			downloadPdf(await doc.save(), t.outName);
			setStatus(t.done(pages));
		} catch (e) {
			setError(e instanceof Error ? e.message : t.failed);
		} finally {
			setBusy(false);
		}
	};
	const field = "field-boxed w-full";
	return /* @__PURE__ */ jsxs("div", {
		className: "images-to-pdf space-y-5",
		children: [
			/* @__PURE__ */ jsx(FileDropZone, {
				label: t.chooseImages,
				hint: t.dropHint,
				activeLabel: t.dropActive,
				accept: "image/*",
				multiple: true,
				paste: true,
				onFiles: setFiles,
				children: files.length > 0 && /* @__PURE__ */ jsx("span", {
					className: "block text-xs opacity-60",
					children: t.chosen(files.length)
				})
			}),
			files.length > 1 && /* @__PURE__ */ jsxs("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-sm opacity-80",
					children: t.order
				}), /* @__PURE__ */ jsx("ul", {
					className: "tds-list space-y-2",
					children: files.map((f, i) => /* @__PURE__ */ jsxs("li", {
						className: "flex flex-wrap items-center gap-2 text-sm",
						children: [
							/* @__PURE__ */ jsxs("span", {
								className: "min-w-0 flex-1 truncate",
								children: [
									i + 1,
									". ",
									f.name
								]
							}),
							/* @__PURE__ */ jsx("button", {
								type: "button",
								className: "btn btn-ghost",
								"aria-label": t.up,
								onClick: () => setFiles(reorder(files, i, i - 1)),
								disabled: i === 0,
								children: "↑"
							}),
							/* @__PURE__ */ jsx("button", {
								type: "button",
								className: "btn btn-ghost",
								"aria-label": t.down,
								onClick: () => setFiles(reorder(files, i, i + 1)),
								disabled: i === files.length - 1,
								children: "↓"
							}),
							/* @__PURE__ */ jsx("button", {
								type: "button",
								className: "btn btn-ghost",
								"aria-label": t.remove,
								onClick: () => setFiles(files.filter((_, j) => j !== i)),
								children: "✕"
							})
						]
					}, `${f.name}-${i}`))
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ jsxs("label", {
						className: "block text-sm",
						children: [/* @__PURE__ */ jsx("span", {
							className: "mb-1 block opacity-80",
							children: t.pageSize
						}), /* @__PURE__ */ jsxs("select", {
							className: field,
							value: pageSize,
							onChange: (e) => setPageSize(e.target.value),
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "a4",
									children: "A4"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "a5",
									children: "A5"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "letter",
									children: "Letter"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "image",
									children: t.sizeFromImage
								})
							]
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block text-sm",
						children: [/* @__PURE__ */ jsx("span", {
							className: "mb-1 block opacity-80",
							children: t.orientation
						}), /* @__PURE__ */ jsxs("select", {
							className: field,
							value: orientation,
							disabled: pageSize === "image",
							onChange: (e) => setOrientation(e.target.value),
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "auto",
									children: t.auto
								}),
								/* @__PURE__ */ jsx("option", {
									value: "portrait",
									children: t.portrait
								}),
								/* @__PURE__ */ jsx("option", {
									value: "landscape",
									children: t.landscape
								})
							]
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block text-sm",
						children: [/* @__PURE__ */ jsx("span", {
							className: "mb-1 block opacity-80",
							children: t.margin
						}), /* @__PURE__ */ jsx("input", {
							type: "number",
							min: 0,
							max: 40,
							className: field,
							value: margin,
							disabled: pageSize === "image",
							onChange: (e) => setMargin(Math.max(0, Number(e.target.value)))
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block text-sm",
						children: [/* @__PURE__ */ jsx("span", {
							className: "mb-1 block opacity-80",
							children: t.fit
						}), /* @__PURE__ */ jsxs("select", {
							className: field,
							value: fit,
							disabled: pageSize === "image",
							onChange: (e) => setFit(e.target.value),
							children: [/* @__PURE__ */ jsx("option", {
								value: "fit",
								children: t.fitWhole
							}), /* @__PURE__ */ jsx("option", {
								value: "fill",
								children: t.fitFill
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block text-sm sm:col-span-2",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "mb-1 block opacity-80",
							children: [
								t.quality,
								": ",
								quality,
								" %"
							]
						}), /* @__PURE__ */ jsx("input", {
							type: "range",
							min: 40,
							max: 95,
							step: 5,
							value: quality,
							onChange: (e) => setQuality(Number(e.target.value)),
							className: "w-full"
						})]
					})
				]
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "btn btn-primary",
				onClick: run,
				disabled: busy,
				children: busy ? t.working : t.run
			}),
			/* @__PURE__ */ jsx(Alert, { children: error }),
			/* @__PURE__ */ jsx(Alert, {
				tone: "success",
				children: status
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-xs opacity-60",
				children: t.note
			})
		]
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-pdf/tools/ImagesToPdf.astro
createAstro("https://tools.tracht-digital.de");
var $$ImagesToPdf = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ImagesToPdf;
	const { lang = "de" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="tool tool--images-to-pdf">${renderComponent($$result, "ImagesToPdf", ImagesToPdf, {
		"client:load": true,
		"lang": lang,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-pdf/islands/ImagesToPdf.tsx",
		"client:component-export": "default"
	})}</div>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-pdf/tools/ImagesToPdf.astro", void 0);
// node_modules/@tracht-digital-solutions/tds-tool-pdf/islands/PdfCompress.tsx
/** German is the default; an older pinned pack must keep working unchanged. */
var STRINGS$4 = {
	de: {
		needOne: "Bitte ein PDF wählen.",
		failed: "Das PDF konnte nicht verarbeitet werden.",
		nothingToDo: "In diesem PDF ließ sich nichts verkleinern — es enthält keine neu berechenbaren Bilder. Das ist bei reinen Textdokumenten normal.",
		choosePdf: "PDF auswählen",
		dropHint: "oder hierher ziehen",
		dropActive: "Loslassen zum Hinzufügen",
		quality: "Bildqualität",
		maxWidth: "Bilder höchstens breit (Pixel)",
		keepSize: "Größe beibehalten",
		working: "Verarbeite …",
		run: "Verkleinern & herunterladen",
		outName: "verkleinert.pdf",
		note: "Das PDF wird lokal im Browser verarbeitet und niemals hochgeladen.",
		result: (before, after, percent, images) => `${images} Bild(er) neu berechnet: ${before} → ${after} (${percent} kleiner).`,
		grew: "Das Ergebnis wäre größer als das Original gewesen — die Datei ist bereits gut komprimiert und wurde unverändert gelassen."
	},
	en: {
		needOne: "Please choose a PDF.",
		failed: "The PDF could not be processed.",
		nothingToDo: "Nothing in this PDF could be made smaller — it holds no images that can be recomputed. That is normal for a pure text document.",
		choosePdf: "Choose a PDF",
		dropHint: "or drag it here",
		dropActive: "Release to add",
		quality: "Image quality",
		maxWidth: "Limit image width to (pixels)",
		keepSize: "Keep original size",
		working: "Processing …",
		run: "Compress & download",
		outName: "compressed.pdf",
		note: "The PDF is processed locally in your browser and is never uploaded.",
		result: (before, after, percent, images) => `Recomputed ${images} image(s): ${before} → ${after} (${percent} smaller).`,
		grew: "The result would have been larger than the original — the file is already well compressed and was left untouched."
	}
};
/** A PDF name object stringifies as "/Image"; comparing that is dialect-proof. */
function nameOf(value) {
	return value === void 0 || value === null ? "" : String(value);
}
/**
* Is this stream a JPEG image we may safely re-encode?
*
* Only DCTDecode (JPEG) qualifies. A FlateDecode image carries raw samples whose
* meaning depends on predictors, bit depth and colour space, and getting any of
* those wrong silently corrupts the page rather than failing — so those are left
* exactly as they are.
*/
function isRecompressibleImage(dict) {
	if (nameOf(dict.get(PDFName.of("Subtype"))) !== "/Image") return false;
	if (!nameOf(dict.get(PDFName.of("Filter"))).includes("/DCTDecode")) return false;
	if (nameOf(dict.get(PDFName.of("ImageMask"))) === "true") return false;
	return true;
}
function PdfCompress({ lang = "de" }) {
	const t = STRINGS$4[lang];
	const [file, setFile] = useState(null);
	const [quality, setQuality] = useState(65);
	const [maxWidth, setMaxWidth] = useState(1600);
	const [busy, setBusy] = useState(false);
	const [status, setStatus] = useState(null);
	const [error, setError] = useState(null);
	const run = async () => {
		setBusy(true);
		setError(null);
		setStatus(null);
		try {
			if (!file) throw new Error(t.needOne);
			const originalBytes = await file.arrayBuffer();
			const doc = await PDFDocument.load(originalBytes);
			let touched = 0;
			for (const [ref, obj] of doc.context.enumerateIndirectObjects()) {
				if (!(obj instanceof PDFRawStream)) continue;
				if (!isRecompressibleImage(obj.dict)) continue;
				const out = await reencode(new Blob([obj.asUint8Array().slice()], { type: "image/jpeg" }), {
					maxWidth: maxWidth > 0 ? maxWidth : void 0,
					quality: quality / 100,
					type: "image/jpeg"
				});
				if (!out) continue;
				const bytes = new Uint8Array(await out.blob.arrayBuffer());
				if (bytes.length >= obj.asUint8Array().length) continue;
				const dict = obj.dict;
				dict.set(PDFName.of("Width"), PDFNumber.of(out.width));
				dict.set(PDFName.of("Height"), PDFNumber.of(out.height));
				dict.set(PDFName.of("Length"), PDFNumber.of(bytes.length));
				dict.set(PDFName.of("Filter"), PDFName.of("DCTDecode"));
				dict.set(PDFName.of("ColorSpace"), PDFName.of("DeviceRGB"));
				dict.set(PDFName.of("BitsPerComponent"), PDFNumber.of(8));
				dict.delete(PDFName.of("DecodeParms"));
				dict.delete(PDFName.of("Decode"));
				doc.context.assign(ref, PDFRawStream.of(dict, bytes));
				touched++;
			}
			if (touched === 0) {
				setStatus(t.nothingToDo);
				return;
			}
			const saved = await doc.save({ useObjectStreams: true });
			if (saved.length >= originalBytes.byteLength) {
				setStatus(t.grew);
				return;
			}
			const percent = `${Math.round((1 - saved.length / originalBytes.byteLength) * 100)} %`;
			downloadPdf(saved, t.outName);
			setStatus(t.result(formatBytes(originalBytes.byteLength, lang), formatBytes(saved.length, lang), percent, touched));
		} catch (e) {
			setError(e instanceof Error ? e.message : t.failed);
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "pdf-compress space-y-5",
		children: [
			/* @__PURE__ */ jsx(FileDropZone, {
				label: t.choosePdf,
				hint: t.dropHint,
				activeLabel: t.dropActive,
				accept: "application/pdf",
				onFiles: (files) => setFile(files[0] ?? null)
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ jsxs("label", {
					className: "block text-sm",
					children: [/* @__PURE__ */ jsxs("span", {
						className: "mb-1 block opacity-80",
						children: [
							t.quality,
							": ",
							quality,
							" %"
						]
					}), /* @__PURE__ */ jsx("input", {
						type: "range",
						min: 30,
						max: 95,
						step: 5,
						value: quality,
						onChange: (e) => setQuality(Number(e.target.value)),
						className: "w-full"
					})]
				}), /* @__PURE__ */ jsxs("label", {
					className: "block text-sm",
					children: [/* @__PURE__ */ jsx("span", {
						className: "mb-1 block opacity-80",
						children: t.maxWidth
					}), /* @__PURE__ */ jsxs("select", {
						className: "field-boxed w-full",
						value: maxWidth,
						onChange: (e) => setMaxWidth(Number(e.target.value)),
						children: [
							/* @__PURE__ */ jsx("option", {
								value: 0,
								children: t.keepSize
							}),
							/* @__PURE__ */ jsx("option", {
								value: 2400,
								children: "2400"
							}),
							/* @__PURE__ */ jsx("option", {
								value: 1600,
								children: "1600"
							}),
							/* @__PURE__ */ jsx("option", {
								value: 1200,
								children: "1200"
							}),
							/* @__PURE__ */ jsx("option", {
								value: 800,
								children: "800"
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "btn btn-primary",
				onClick: run,
				disabled: busy,
				children: busy ? t.working : t.run
			}),
			/* @__PURE__ */ jsx(Alert, { children: error }),
			/* @__PURE__ */ jsx(Alert, {
				tone: "success",
				children: status
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-xs opacity-60",
				children: t.note
			})
		]
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-pdf/tools/PdfCompress.astro
createAstro("https://tools.tracht-digital.de");
var $$PdfCompress = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PdfCompress;
	const { lang = "de" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="tool tool--pdf-compress">${renderComponent($$result, "PdfCompress", PdfCompress, {
		"client:load": true,
		"lang": lang,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-pdf/islands/PdfCompress.tsx",
		"client:component-export": "default"
	})}</div>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-pdf/tools/PdfCompress.astro", void 0);
// node_modules/@tracht-digital-solutions/tds-tool-pdf/islands/PdfToImages.tsx
/** German is the default; an older pinned pack must keep working unchanged. */
var STRINGS$3 = {
	de: {
		needPdf: "Bitte ein PDF wählen.",
		badRange: "Kein gültiger Seitenbereich.",
		failed: "Das PDF konnte nicht gelesen werden.",
		tooMany: (max) => `Es werden höchstens ${max} Seiten auf einmal umgewandelt.`,
		done: (n) => `${n} Seite(n) umgewandelt.`,
		choosePdf: "PDF auswählen",
		dropHint: "oder hierher ziehen",
		dropActive: "Loslassen zum Hinzufügen",
		pages: "Seiten",
		pagesHint: "Leer lassen für alle Seiten, sonst z. B. 1-3,5",
		format: "Format",
		quality: "JPG-Qualität",
		resolution: "Auflösung",
		screen: "Bildschirm (96 dpi)",
		print: "Druck (150 dpi)",
		high: "Hoch (300 dpi)",
		working: (done, total) => `Seite ${done} von ${total} …`,
		run: "Umwandeln",
		download: "Herunterladen",
		downloadAll: "Alle herunterladen",
		pageLabel: (n) => `Seite ${n}`,
		pageFile: (n) => `seite-${n}`,
		note: "Das PDF wird lokal im Browser gelesen und niemals hochgeladen."
	},
	en: {
		needPdf: "Please choose a PDF.",
		badRange: "That is not a valid page range.",
		failed: "The PDF could not be read.",
		tooMany: (max) => `At most ${max} pages are converted at a time.`,
		done: (n) => `Converted ${n} page(s).`,
		choosePdf: "Choose a PDF",
		dropHint: "or drag it here",
		dropActive: "Release to add",
		pages: "Pages",
		pagesHint: "Leave empty for every page, otherwise e.g. 1-3,5",
		format: "Format",
		quality: "JPEG quality",
		resolution: "Resolution",
		screen: "Screen (96 dpi)",
		print: "Print (150 dpi)",
		high: "High (300 dpi)",
		working: (done, total) => `Page ${done} of ${total} …`,
		run: "Convert",
		download: "Download",
		downloadAll: "Download all",
		pageLabel: (n) => `Page ${n}`,
		pageFile: (n) => `page-${n}`,
		note: "The PDF is read locally in your browser and is never uploaded."
	}
};
/**
* pdf.js needs its worker as a URL. Vite emits the file as a build asset via the
* `?url` suffix, which is what keeps this working from inside a published
* package rather than only in the pack's own repo. Loaded lazily so the ~1 MB
* engine is fetched when the visitor converts something, not on page load.
*/
async function loadPdfjs() {
	const pdfjs = await import("pdfjs-dist");
	const worker = await import("./pdf.worker.min_ueT0RWJN.mjs");
	pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
	return pdfjs;
}
function PdfToImages({ lang = "de" }) {
	const t = STRINGS$3[lang];
	const [file, setFile] = useState(null);
	const [range, setRange] = useState("");
	const [format, setFormat] = useState("image/png");
	const [quality, setQuality] = useState(85);
	const [dpi, setDpi] = useState(150);
	const [busy, setBusy] = useState(false);
	const [progress, setProgress] = useState(null);
	const [pages, setPages] = useState([]);
	const [status, setStatus] = useState(null);
	const [error, setError] = useState(null);
	const urls = useRef([]);
	const releaseUrls = () => {
		urls.current.forEach((u) => URL.revokeObjectURL(u));
		urls.current = [];
	};
	useEffect(() => releaseUrls, []);
	const run = async () => {
		setBusy(true);
		setError(null);
		setStatus(null);
		releaseUrls();
		setPages([]);
		try {
			if (!file) throw new Error(t.needPdf);
			const pdfjs = await loadPdfjs();
			const data = new Uint8Array(await file.arrayBuffer());
			const doc = await pdfjs.getDocument({ data }).promise;
			const indices = parseRange$1(range, doc.numPages);
			if (indices.length === 0) throw new Error(t.badRange);
			if (indices.length > 50) throw new Error(t.tooMany(50));
			const scale = dpi / 72;
			const out = [];
			for (const [i, index] of indices.entries()) {
				setProgress({
					done: i + 1,
					total: indices.length
				});
				const page = await doc.getPage(index + 1);
				const viewport = page.getViewport({ scale });
				const canvas = document.createElement("canvas");
				canvas.width = Math.max(1, Math.floor(viewport.width));
				canvas.height = Math.max(1, Math.floor(viewport.height));
				const ctx = canvas.getContext("2d");
				if (!ctx) continue;
				ctx.fillStyle = "#ffffff";
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				await page.render({
					canvas,
					canvasContext: ctx,
					viewport
				}).promise;
				const blob = await new Promise((resolve) => canvas.toBlob((b) => resolve(b), format, quality / 100));
				if (!blob) continue;
				const url = URL.createObjectURL(blob);
				urls.current.push(url);
				out.push({
					page: index + 1,
					url,
					blob,
					width: canvas.width,
					height: canvas.height
				});
			}
			setPages(out);
			setStatus(t.done(out.length));
		} catch (e) {
			setError(e instanceof Error ? e.message : t.failed);
		} finally {
			setBusy(false);
			setProgress(null);
		}
	};
	const extension = format === "image/png" ? "png" : "jpg";
	const saveOne = (p) => downloadBlob(p.blob, `${t.pageFile(p.page)}.${extension}`);
	const field = "field-boxed w-full";
	return /* @__PURE__ */ jsxs("div", {
		className: "pdf-to-images space-y-5",
		children: [
			/* @__PURE__ */ jsx(FileDropZone, {
				label: t.choosePdf,
				hint: t.dropHint,
				activeLabel: t.dropActive,
				accept: "application/pdf",
				onFiles: (files) => setFile(files[0] ?? null)
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ jsxs("label", {
						className: "block text-sm",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "mb-1 block opacity-80",
								children: t.pages
							}),
							/* @__PURE__ */ jsx("input", {
								type: "text",
								className: field,
								value: range,
								placeholder: "1-3,5",
								onChange: (e) => setRange(e.target.value)
							}),
							/* @__PURE__ */ jsx("span", {
								className: "mt-1 block text-xs opacity-60",
								children: t.pagesHint
							})
						]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block text-sm",
						children: [/* @__PURE__ */ jsx("span", {
							className: "mb-1 block opacity-80",
							children: t.resolution
						}), /* @__PURE__ */ jsxs("select", {
							className: field,
							value: dpi,
							onChange: (e) => setDpi(Number(e.target.value)),
							children: [
								/* @__PURE__ */ jsx("option", {
									value: 96,
									children: t.screen
								}),
								/* @__PURE__ */ jsx("option", {
									value: 150,
									children: t.print
								}),
								/* @__PURE__ */ jsx("option", {
									value: 300,
									children: t.high
								})
							]
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block text-sm",
						children: [/* @__PURE__ */ jsx("span", {
							className: "mb-1 block opacity-80",
							children: t.format
						}), /* @__PURE__ */ jsxs("select", {
							className: field,
							value: format,
							onChange: (e) => setFormat(e.target.value),
							children: [/* @__PURE__ */ jsx("option", {
								value: "image/png",
								children: "PNG"
							}), /* @__PURE__ */ jsx("option", {
								value: "image/jpeg",
								children: "JPG"
							})]
						})]
					}),
					format === "image/jpeg" && /* @__PURE__ */ jsxs("label", {
						className: "block text-sm",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "mb-1 block opacity-80",
							children: [
								t.quality,
								": ",
								quality,
								" %"
							]
						}), /* @__PURE__ */ jsx("input", {
							type: "range",
							min: 40,
							max: 95,
							step: 5,
							value: quality,
							onChange: (e) => setQuality(Number(e.target.value)),
							className: "w-full"
						})]
					})
				]
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "btn btn-primary",
				onClick: run,
				disabled: busy,
				children: busy && progress ? t.working(progress.done, progress.total) : t.run
			}),
			/* @__PURE__ */ jsx(Alert, { children: error }),
			/* @__PURE__ */ jsx(Alert, {
				tone: "success",
				children: status
			}),
			pages.length > 0 && /* @__PURE__ */ jsxs("div", {
				className: "space-y-4 tds-appear",
				children: [/* @__PURE__ */ jsx("button", {
					type: "button",
					className: "btn btn-ghost",
					onClick: () => pages.forEach(saveOne),
					children: t.downloadAll
				}), /* @__PURE__ */ jsx("ul", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: pages.map((p) => /* @__PURE__ */ jsxs("li", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("img", {
							src: p.url,
							alt: t.pageLabel(p.page),
							loading: "lazy",
							className: "w-full",
							width: p.width,
							height: p.height
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap items-center justify-between gap-2 text-xs opacity-70",
							children: [/* @__PURE__ */ jsxs("span", { children: [
								t.pageLabel(p.page),
								" · ",
								p.width,
								"×",
								p.height,
								" · ",
								formatBytes(p.blob.size, lang)
							] }), /* @__PURE__ */ jsx("button", {
								type: "button",
								className: "btn btn-ghost",
								onClick: () => saveOne(p),
								children: t.download
							})]
						})]
					}, p.page))
				})]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-xs opacity-60",
				children: t.note
			})
		]
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-pdf/tools/PdfToImages.astro
createAstro("https://tools.tracht-digital.de");
var $$PdfToImages = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PdfToImages;
	const { lang = "de" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="tool tool--pdf-to-images">${renderComponent($$result, "PdfToImages", PdfToImages, {
		"client:load": true,
		"lang": lang,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-pdf/islands/PdfToImages.tsx",
		"client:component-export": "default"
	})}</div>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-pdf/tools/PdfToImages.astro", void 0);
// node_modules/@tracht-digital-solutions/tds-tool-pdf/islands/PdfWatermark.tsx
/** German is the default; an older pinned pack must keep working unchanged. */
var STRINGS$2 = {
	de: {
		needPdf: "Bitte ein PDF wählen.",
		needText: "Bitte einen Text für das Wasserzeichen eingeben.",
		badRange: "Kein gültiger Seitenbereich.",
		failed: "Das PDF konnte nicht verarbeitet werden.",
		done: (n) => `Wasserzeichen auf ${n} Seite(n) gesetzt.`,
		outName: "wasserzeichen.pdf",
		choosePdf: "PDF auswählen",
		dropHint: "oder hierher ziehen",
		dropActive: "Loslassen zum Hinzufügen",
		text: "Text",
		textPlaceholder: "Entwurf",
		size: "Schriftgröße",
		opacity: "Deckkraft",
		colour: "Farbe",
		rotation: "Winkel",
		placement: "Anordnung",
		placeDiagonal: "Diagonal über die Seite",
		placeCenter: "Waagerecht in der Mitte",
		placeFooter: "Als Fußzeile",
		placeTile: "Gekachelt über die ganze Seite",
		pages: "Seiten",
		pagesHint: "Leer lassen für alle Seiten, sonst z. B. 1-3,5",
		working: "Verarbeite …",
		run: "Wasserzeichen setzen & herunterladen",
		note: "Das PDF wird lokal im Browser verarbeitet und niemals hochgeladen."
	},
	en: {
		needPdf: "Please choose a PDF.",
		needText: "Please enter the watermark text.",
		badRange: "That is not a valid page range.",
		failed: "The PDF could not be processed.",
		done: (n) => `Watermark applied to ${n} page(s).`,
		outName: "watermarked.pdf",
		choosePdf: "Choose a PDF",
		dropHint: "or drag it here",
		dropActive: "Release to add",
		text: "Text",
		textPlaceholder: "Draft",
		size: "Font size",
		opacity: "Opacity",
		colour: "Colour",
		rotation: "Angle",
		placement: "Placement",
		placeDiagonal: "Diagonally across the page",
		placeCenter: "Horizontally in the centre",
		placeFooter: "As a footer",
		placeTile: "Tiled across the whole page",
		pages: "Pages",
		pagesHint: "Leave empty for every page, otherwise e.g. 1-3,5",
		working: "Processing …",
		run: "Apply watermark & download",
		note: "The PDF is processed locally in your browser and is never uploaded."
	}
};
/** "#e8536f" → pdf-lib rgb(). Falls back to a mid grey on anything unparseable. */
function hexToRgb(hex) {
	const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
	if (!m || !m[1]) return {
		r: .5,
		g: .5,
		b: .5
	};
	const n = parseInt(m[1], 16);
	return {
		r: (n >> 16 & 255) / 255,
		g: (n >> 8 & 255) / 255,
		b: (n & 255) / 255
	};
}
/**
* Where to stamp the watermark on a page of the given size. Returns one or more
* draw positions in PDF user space (origin bottom-left).
*/
function placementPositions(placement, page, textWidth, fontSize) {
	if (placement === "footer") return [{
		x: (page.width - textWidth) / 2,
		y: fontSize
	}];
	if (placement === "tile") {
		const stepX = Math.max(textWidth + fontSize * 2, 80);
		const stepY = Math.max(fontSize * 5, 80);
		const out = [];
		for (let y = stepY / 2; y < page.height; y += stepY) for (let x = -textWidth / 2; x < page.width; x += stepX) out.push({
			x,
			y
		});
		return out;
	}
	return [{
		x: (page.width - textWidth) / 2,
		y: (page.height - fontSize) / 2
	}];
}
function PdfWatermark({ lang = "de" }) {
	const t = STRINGS$2[lang];
	const [file, setFile] = useState(null);
	const [text, setText] = useState("");
	const [size, setSize] = useState(48);
	const [opacity, setOpacity] = useState(20);
	const [colour, setColour] = useState("#c0392b");
	const [angle, setAngle] = useState(45);
	const [placement, setPlacement] = useState("diagonal");
	const [range, setRange] = useState("");
	const [busy, setBusy] = useState(false);
	const [status, setStatus] = useState(null);
	const [error, setError] = useState(null);
	const run = async () => {
		setBusy(true);
		setError(null);
		setStatus(null);
		try {
			if (!file) throw new Error(t.needPdf);
			const clean = toWinAnsi(text).trim();
			if (clean === "") throw new Error(t.needText);
			const doc = await PDFDocument.load(await file.arrayBuffer());
			const font = await doc.embedFont(StandardFonts.HelveticaBold);
			const pages = doc.getPages();
			const indices = parseRange$1(range, pages.length);
			if (indices.length === 0) throw new Error(t.badRange);
			const { r, g, b } = hexToRgb(colour);
			const textWidth = font.widthOfTextAtSize(clean, size);
			const turn = placement === "diagonal" ? angle : 0;
			for (const i of indices) {
				const page = pages[i];
				if (!page) continue;
				const { width, height } = page.getSize();
				for (const pos of placementPositions(placement, {
					width,
					height
				}, textWidth, size)) page.drawText(clean, {
					x: pos.x,
					y: pos.y,
					size,
					font,
					color: rgb(r, g, b),
					opacity: opacity / 100,
					rotate: degrees(turn)
				});
			}
			downloadPdf(await doc.save(), t.outName);
			setStatus(t.done(indices.length));
		} catch (e) {
			setError(e instanceof Error ? e.message : t.failed);
		} finally {
			setBusy(false);
		}
	};
	const field = "field-boxed w-full";
	return /* @__PURE__ */ jsxs("div", {
		className: "pdf-watermark space-y-5",
		children: [
			/* @__PURE__ */ jsx(FileDropZone, {
				label: t.choosePdf,
				hint: t.dropHint,
				activeLabel: t.dropActive,
				accept: "application/pdf",
				onFiles: (files) => setFile(files[0] ?? null)
			}),
			/* @__PURE__ */ jsxs("label", {
				className: "block text-sm",
				children: [/* @__PURE__ */ jsx("span", {
					className: "mb-1 block opacity-80",
					children: t.text
				}), /* @__PURE__ */ jsx("input", {
					type: "text",
					className: field,
					value: text,
					placeholder: t.textPlaceholder,
					onChange: (e) => setText(e.target.value)
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ jsxs("label", {
						className: "block text-sm",
						children: [/* @__PURE__ */ jsx("span", {
							className: "mb-1 block opacity-80",
							children: t.placement
						}), /* @__PURE__ */ jsxs("select", {
							className: field,
							value: placement,
							onChange: (e) => setPlacement(e.target.value),
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "diagonal",
									children: t.placeDiagonal
								}),
								/* @__PURE__ */ jsx("option", {
									value: "center",
									children: t.placeCenter
								}),
								/* @__PURE__ */ jsx("option", {
									value: "footer",
									children: t.placeFooter
								}),
								/* @__PURE__ */ jsx("option", {
									value: "tile",
									children: t.placeTile
								})
							]
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block text-sm",
						children: [/* @__PURE__ */ jsx("span", {
							className: "mb-1 block opacity-80",
							children: t.colour
						}), /* @__PURE__ */ jsx("input", {
							type: "color",
							className: field,
							value: colour,
							onChange: (e) => setColour(e.target.value)
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block text-sm",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "mb-1 block opacity-80",
							children: [
								t.size,
								": ",
								size,
								" pt"
							]
						}), /* @__PURE__ */ jsx("input", {
							type: "range",
							min: 8,
							max: 120,
							step: 2,
							value: size,
							onChange: (e) => setSize(Number(e.target.value)),
							className: "w-full"
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block text-sm",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "mb-1 block opacity-80",
							children: [
								t.opacity,
								": ",
								opacity,
								" %"
							]
						}), /* @__PURE__ */ jsx("input", {
							type: "range",
							min: 5,
							max: 100,
							step: 5,
							value: opacity,
							onChange: (e) => setOpacity(Number(e.target.value)),
							className: "w-full"
						})]
					}),
					placement === "diagonal" && /* @__PURE__ */ jsxs("label", {
						className: "block text-sm",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "mb-1 block opacity-80",
							children: [
								t.rotation,
								": ",
								angle,
								"°"
							]
						}), /* @__PURE__ */ jsx("input", {
							type: "range",
							min: 0,
							max: 90,
							step: 5,
							value: angle,
							onChange: (e) => setAngle(Number(e.target.value)),
							className: "w-full"
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block text-sm",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "mb-1 block opacity-80",
								children: t.pages
							}),
							/* @__PURE__ */ jsx("input", {
								type: "text",
								className: field,
								value: range,
								placeholder: "1-3,5",
								onChange: (e) => setRange(e.target.value)
							}),
							/* @__PURE__ */ jsx("span", {
								className: "mt-1 block text-xs opacity-60",
								children: t.pagesHint
							})
						]
					})
				]
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "btn btn-primary",
				onClick: run,
				disabled: busy,
				children: busy ? t.working : t.run
			}),
			/* @__PURE__ */ jsx(Alert, { children: error }),
			/* @__PURE__ */ jsx(Alert, {
				tone: "success",
				children: status
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-xs opacity-60",
				children: t.note
			})
		]
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-pdf/tools/PdfWatermark.astro
createAstro("https://tools.tracht-digital.de");
var $$PdfWatermark = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PdfWatermark;
	const { lang = "de" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="tool tool--pdf-watermark">${renderComponent($$result, "PdfWatermark", PdfWatermark, {
		"client:load": true,
		"lang": lang,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-pdf/islands/PdfWatermark.tsx",
		"client:component-export": "default"
	})}</div>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-pdf/tools/PdfWatermark.astro", void 0);
// node_modules/@tracht-digital-solutions/tds-tool-media/islands/PdfTools.tsx
/** German is the default — every existing test here asserts German labels. */
var STRINGS$1 = {
	de: {
		needTwo: "Bitte mindestens zwei PDFs wählen.",
		needOne: "Bitte ein PDF wählen.",
		badRange: "Kein gültiger Seitenbereich.",
		failed: "PDF konnte nicht verarbeitet werden.",
		merged: (n) => `${n} PDFs zusammengeführt.`,
		extracted: (n) => `${n} Seite(n) extrahiert.`,
		rotated: "Seiten gedreht.",
		mergeName: "zusammengefuehrt.pdf",
		splitName: "auszug.pdf",
		rotateName: "gedreht.pdf",
		tabsLabel: "Werkzeug",
		tabMerge: "Zusammenführen",
		tabSplit: "Aufteilen",
		tabRotate: "Drehen",
		choosePdfs: "PDFs auswählen (Reihenfolge = Auswahlreihenfolge)",
		filesChosen: (n) => `${n} Datei(en) gewählt`,
		choosePdf: "PDF auswählen",
		dropHint: "oder hierher ziehen",
		dropActive: "Loslassen zum Hinzufügen",
		pages: "Seiten (z. B. 1-3,5)",
		rotation: "Drehung",
		cw90: "90° im Uhrzeigersinn",
		deg180: "180°",
		ccw90: "270° (90° gegen den Uhrzeigersinn)",
		working: "Verarbeite …",
		run: "Ausführen & herunterladen",
		note: "Alle PDFs werden lokal im Browser verarbeitet und niemals hochgeladen."
	},
	en: {
		needTwo: "Please choose at least two PDFs.",
		needOne: "Please choose a PDF.",
		badRange: "That is not a valid page range.",
		failed: "The PDF could not be processed.",
		merged: (n) => `Merged ${n} PDFs.`,
		extracted: (n) => `Extracted ${n} page(s).`,
		rotated: "Pages rotated.",
		mergeName: "merged.pdf",
		splitName: "extract.pdf",
		rotateName: "rotated.pdf",
		tabsLabel: "Tool",
		tabMerge: "Merge",
		tabSplit: "Split",
		tabRotate: "Rotate",
		choosePdfs: "Choose PDFs (order of selection = order in the result)",
		filesChosen: (n) => `${n} file(s) selected`,
		choosePdf: "Choose a PDF",
		dropHint: "or drag here",
		dropActive: "Release to add",
		pages: "Pages (e.g. 1-3,5)",
		rotation: "Rotation",
		cw90: "90° clockwise",
		deg180: "180°",
		ccw90: "270° (90° counter-clockwise)",
		working: "Processing …",
		run: "Run & download",
		note: "All PDFs are processed locally in your browser and are never uploaded."
	}
};
/** Parse "1-3,5" (1-indexed) into a sorted, de-duped 0-indexed page list. */
function parseRange(spec, pageCount) {
	const out = /* @__PURE__ */ new Set();
	for (const part of spec.split(",")) {
		const t = part.trim();
		if (!t) continue;
		const m = /^(\d+)(?:-(\d+))?$/.exec(t);
		if (!m) continue;
		const start = Number(m[1]);
		const end = m[2] ? Number(m[2]) : start;
		for (let i = start; i <= end; i++) if (i >= 1 && i <= pageCount) out.add(i - 1);
	}
	return [...out].sort((a, b) => a - b);
}
function download(bytes, name) {
	downloadBytes(bytes, "application/pdf", name);
}
function PdfTools({ lang = "de" }) {
	const t = STRINGS$1[lang];
	const [mode, setMode] = useState("merge");
	const [mergeFiles, setMergeFiles] = useState([]);
	const [singleFile, setSingleFile] = useState(null);
	const [range, setRange] = useState("1-1");
	const [angle, setAngle] = useState(90);
	const [busy, setBusy] = useState(false);
	const [status, setStatus] = useState(null);
	const [error, setError] = useState(null);
	const run = async () => {
		setBusy(true);
		setError(null);
		setStatus(null);
		try {
			if (mode === "merge") {
				if (mergeFiles.length < 2) throw new Error(t.needTwo);
				const out = await PDFDocument.create();
				for (const f of mergeFiles) {
					const doc = await PDFDocument.load(await f.arrayBuffer());
					(await out.copyPages(doc, doc.getPageIndices())).forEach((p) => out.addPage(p));
				}
				download(await out.save(), t.mergeName);
				setStatus(t.merged(mergeFiles.length));
			} else if (mode === "split") {
				if (!singleFile) throw new Error(t.needOne);
				const src = await PDFDocument.load(await singleFile.arrayBuffer());
				const idx = parseRange(range, src.getPageCount());
				if (idx.length === 0) throw new Error(t.badRange);
				const out = await PDFDocument.create();
				(await out.copyPages(src, idx)).forEach((p) => out.addPage(p));
				download(await out.save(), t.splitName);
				setStatus(t.extracted(idx.length));
			} else {
				if (!singleFile) throw new Error(t.needOne);
				const src = await PDFDocument.load(await singleFile.arrayBuffer());
				src.getPages().forEach((p) => {
					const current = p.getRotation().angle;
					p.setRotation(degrees((current + angle) % 360));
				});
				download(await src.save(), t.rotateName);
				setStatus(t.rotated);
			}
		} catch (e) {
			setError(e instanceof Error ? e.message : t.failed);
		} finally {
			setBusy(false);
		}
	};
	const field = "field-boxed w-full";
	return /* @__PURE__ */ jsxs("div", {
		className: "pdf-tools space-y-5",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "flex flex-wrap gap-2",
				role: "tablist",
				"aria-label": t.tabsLabel,
				children: [
					["merge", t.tabMerge],
					["split", t.tabSplit],
					["rotate", t.tabRotate]
				].map(([value, label]) => /* @__PURE__ */ jsx("button", {
					type: "button",
					role: "tab",
					"aria-selected": mode === value,
					className: mode === value ? "chip chip-active" : "chip",
					onClick: () => {
						setMode(value);
						setStatus(null);
						setError(null);
					},
					children: label
				}, value))
			}),
			mode === "merge" ? /* @__PURE__ */ jsx(FileDropZone, {
				label: t.choosePdfs,
				hint: t.dropHint,
				activeLabel: t.dropActive,
				accept: "application/pdf",
				multiple: true,
				onFiles: setMergeFiles,
				children: mergeFiles.length > 0 && /* @__PURE__ */ jsx("span", {
					className: "block text-xs opacity-60",
					children: t.filesChosen(mergeFiles.length)
				})
			}, "merge") : /* @__PURE__ */ jsx(FileDropZone, {
				label: t.choosePdf,
				hint: t.dropHint,
				activeLabel: t.dropActive,
				accept: "application/pdf",
				onFiles: (files) => setSingleFile(files[0] ?? null)
			}, "single"),
			mode === "split" && /* @__PURE__ */ jsxs("label", {
				className: "block text-sm",
				children: [/* @__PURE__ */ jsx("span", {
					className: "mb-1 block opacity-80",
					children: t.pages
				}), /* @__PURE__ */ jsx("input", {
					type: "text",
					className: field,
					value: range,
					onChange: (e) => setRange(e.target.value),
					placeholder: "1-3,5"
				})]
			}),
			mode === "rotate" && /* @__PURE__ */ jsxs("label", {
				className: "block text-sm",
				children: [/* @__PURE__ */ jsx("span", {
					className: "mb-1 block opacity-80",
					children: t.rotation
				}), /* @__PURE__ */ jsxs("select", {
					className: field,
					value: angle,
					onChange: (e) => setAngle(Number(e.target.value)),
					children: [
						/* @__PURE__ */ jsx("option", {
							value: 90,
							children: t.cw90
						}),
						/* @__PURE__ */ jsx("option", {
							value: 180,
							children: t.deg180
						}),
						/* @__PURE__ */ jsx("option", {
							value: 270,
							children: t.ccw90
						})
					]
				})]
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "btn btn-primary",
				onClick: run,
				disabled: busy,
				children: busy ? t.working : t.run
			}),
			/* @__PURE__ */ jsx(Alert, { children: error }),
			/* @__PURE__ */ jsx(Alert, {
				tone: "success",
				children: status
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-xs opacity-60",
				children: t.note
			})
		]
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-media/tools/PdfTools.astro
createAstro("https://tools.tracht-digital.de");
var $$PdfTools = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PdfTools;
	const { lang = "de" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="tool tool--pdf">${renderComponent($$result, "PdfTools", PdfTools, {
		"client:load": true,
		"lang": lang,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-media/islands/PdfTools.tsx",
		"client:component-export": "default"
	})}</div>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-media/tools/PdfTools.astro", void 0);
// node_modules/@tracht-digital-solutions/tds-tool-textkit/islands/PasswordGenerator.tsx
var SETS = {
	lower: "abcdefghijklmnopqrstuvwxyz",
	upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	digits: "0123456789",
	symbols: "!@#$%^&*()-_=+[]{};:,.?/"
};
var AMBIGUOUS = new Set("Il1O0o".split(""));
/** Cryptographically-strong random integer in [0, max) via rejection sampling. */
function randInt(max) {
	const buf = /* @__PURE__ */ new Uint32Array(1);
	const limit = Math.floor(4294967295 / max) * max;
	let x = 0;
	do {
		crypto.getRandomValues(buf);
		x = buf[0];
	} while (x >= limit);
	return x % max;
}
/** German is the default; every existing test here asserts German labels. */
var STRINGS = {
	de: {
		weak: "Schwach",
		medium: "Mittel",
		strong: "Stark",
		veryStrong: "Sehr stark",
		copy: "Kopieren",
		copied: "Kopiert ✓",
		regenerate: "Neu erzeugen",
		length: "Länge",
		charsets: "Zeichenarten",
		noCharsSelected: "Keine Zeichen gewählt",
		lowercase: "Kleinbuchstaben (a-z)",
		uppercase: "Großbuchstaben (A-Z)",
		digits: "Ziffern (0-9)",
		symbols: "Sonderzeichen",
		excludeAmbiguous: "Verwechselbare Zeichen ausschließen (I l 1 O 0 o)",
		note: "Passwörter werden lokal im Browser mit einem kryptografisch sicheren Zufallsgenerator erzeugt und niemals übertragen."
	},
	en: {
		weak: "Weak",
		medium: "Medium",
		strong: "Strong",
		veryStrong: "Very strong",
		copy: "Copy",
		copied: "Copied ✓",
		regenerate: "Generate a new one",
		length: "Length",
		charsets: "Character types",
		noCharsSelected: "No characters selected",
		lowercase: "Lowercase (a-z)",
		uppercase: "Uppercase (A-Z)",
		digits: "Digits (0-9)",
		symbols: "Symbols",
		excludeAmbiguous: "Exclude ambiguous characters (I l 1 O 0 o)",
		note: "Passwords are generated locally in your browser with a cryptographically secure random generator and are never transmitted."
	}
};
/** Rough strength label from entropy (bits = length * log2(poolSize)). */
function strength(bits, t) {
	const pct = Math.max(0, Math.min(100, Math.round(bits / 128 * 100)));
	if (bits < 40) return {
		label: t.weak,
		tone: "var(--color-danger)",
		pct
	};
	if (bits < 70) return {
		label: t.medium,
		tone: "var(--color-warning)",
		pct
	};
	if (bits < 100) return {
		label: t.strong,
		tone: "var(--color-success)",
		pct
	};
	return {
		label: t.veryStrong,
		tone: "var(--color-success)",
		pct
	};
}
/**
* Secure password generator — `crypto.getRandomValues` (not `Math.random`),
* configurable length + character sets, live strength estimate, copy to
* clipboard. Everything client-side; nothing leaves the browser.
*/
function PasswordGenerator({ lang = "de" }) {
	const t = STRINGS[lang];
	const [length, setLength] = useState(20);
	const [lower, setLower] = useState(true);
	const [upper, setUpper] = useState(true);
	const [digits, setDigits] = useState(true);
	const [symbols, setSymbols] = useState(true);
	const [noAmbiguous, setNoAmbiguous] = useState(false);
	const [password, setPassword] = useState("");
	const { copied, copy: copyFlag, reset: resetCopied } = useCopyFlag();
	const buildPool = useCallback(() => {
		let pool = "";
		if (lower) pool += SETS.lower;
		if (upper) pool += SETS.upper;
		if (digits) pool += SETS.digits;
		if (symbols) pool += SETS.symbols;
		if (noAmbiguous) pool = [...pool].filter((c) => !AMBIGUOUS.has(c)).join("");
		return pool;
	}, [
		lower,
		upper,
		digits,
		symbols,
		noAmbiguous
	]);
	const generate = useCallback(() => {
		const pool = buildPool();
		if (pool.length === 0) {
			setPassword("");
			return;
		}
		let out = "";
		for (let i = 0; i < length; i++) out += pool[randInt(pool.length)];
		setPassword(out);
		resetCopied();
	}, [buildPool, length]);
	useEffect(() => {
		generate();
	}, [generate]);
	const pool = buildPool();
	const bits = pool.length > 0 ? Math.round(length * Math.log2(pool.length)) : 0;
	const s = strength(bits, t);
	const copy = () => void copyFlag(password);
	return /* @__PURE__ */ jsxs("div", {
		className: "password-tool space-y-5",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-stretch gap-2",
				children: [
					/* @__PURE__ */ jsx("output", {
						className: "tds-card flex-1 select-all px-4 py-3 font-mono text-lg break-all",
						"aria-live": "polite",
						children: /* @__PURE__ */ jsx("span", {
							className: "tds-appear block",
							children: password || "—"
						}, password)
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						className: "btn btn-ghost",
						onClick: copy,
						disabled: !password,
						children: copied ? t.copied : t.copy
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						className: "btn btn-primary",
						onClick: generate,
						"aria-label": t.regenerate,
						children: "↻"
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsxs("div", {
					className: "mb-1 flex justify-between text-sm",
					children: [/* @__PURE__ */ jsxs("span", {
						className: "opacity-80",
						children: [
							t.length,
							": ",
							length
						]
					}), /* @__PURE__ */ jsx("span", {
						style: { color: s.tone },
						children: pool.length > 0 ? `${s.label} · ~${bits} bit` : t.noCharsSelected
					})]
				}),
				/* @__PURE__ */ jsx("input", {
					type: "range",
					min: 6,
					max: 64,
					value: length,
					onChange: (e) => setLength(Number(e.target.value)),
					className: "w-full"
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[color:var(--color-border)]",
					children: /* @__PURE__ */ jsx("div", {
						className: "h-full rounded-full transition-all",
						style: {
							width: `${s.pct}%`,
							background: s.tone
						}
					})
				})
			] }),
			/* @__PURE__ */ jsxs("fieldset", {
				className: "grid grid-cols-2 gap-2 text-sm",
				children: [
					/* @__PURE__ */ jsx("legend", {
						className: "sr-only",
						children: t.charsets
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx("input", {
								type: "checkbox",
								checked: lower,
								onChange: (e) => setLower(e.target.checked)
							}),
							" ",
							t.lowercase
						]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx("input", {
								type: "checkbox",
								checked: upper,
								onChange: (e) => setUpper(e.target.checked)
							}),
							" ",
							t.uppercase
						]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx("input", {
								type: "checkbox",
								checked: digits,
								onChange: (e) => setDigits(e.target.checked)
							}),
							" ",
							t.digits
						]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx("input", {
								type: "checkbox",
								checked: symbols,
								onChange: (e) => setSymbols(e.target.checked)
							}),
							" ",
							t.symbols
						]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "col-span-2 flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx("input", {
								type: "checkbox",
								checked: noAmbiguous,
								onChange: (e) => setNoAmbiguous(e.target.checked)
							}),
							" ",
							t.excludeAmbiguous
						]
					})
				]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-xs opacity-60",
				children: t.note
			})
		]
	});
}
// node_modules/@tracht-digital-solutions/tds-tool-textkit/tools/PasswordGenerator.astro
createAstro("https://tools.tracht-digital.de");
var $$PasswordGenerator = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PasswordGenerator;
	const { lang = "de" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="tool tool--password">${renderComponent($$result, "PasswordGenerator", PasswordGenerator, {
		"client:load": true,
		"lang": lang,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-textkit/islands/PasswordGenerator.tsx",
		"client:component-export": "default"
	})}</div>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/node_modules/@tracht-digital-solutions/tds-tool-textkit/tools/PasswordGenerator.astro", void 0);
// \0virtual:tools-components
var components = {
	"etiketten-drucken": $$LabelSheet,
	"stundenzettel": $$Timesheet,
	"accessibility-statement-generator": $$AccessibilityStatementGenerator,
	"privacy-policy-generator": $$PrivacyPolicyGenerator,
	"imprint-generator": $$ImprintGenerator,
	"ai-image-badge": $$AiImageBadge,
	"texterkennung": $$TextRecognition,
	"design-system-studio": $$DesignSystemStudio,
	"contrast-checker": $$ContrastChecker,
	"json-formatter": $$JsonFormatter,
	"qr-code": $$QrCode,
	"utm-builder": $$UtmBuilder,
	"businesscard-designer": $$CardDesigner,
	"image-compress": $$ImageCompress,
	"bilder-zu-pdf": $$ImagesToPdf,
	"pdf-komprimieren": $$PdfCompress,
	"pdf-zu-bildern": $$PdfToImages,
	"pdf-wasserzeichen": $$PdfWatermark,
	"pdf-tools": $$PdfTools,
	"password-generator": $$PasswordGenerator
};
// src/components/ToolPage.astro
createAstro("https://tools.tracht-digital.de");
var $$ToolPage = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ToolPage;
	const { tool, allTools, lang, overrides = {} } = Astro.props;
	const override = overrides[tool.id];
	const s = t(lang);
	const ads = await adsConfig();
	const base = lang === "de" ? "" : "/en";
	const Tool = components[tool.id];
	const showAds = ads.enabled && !!ads.slotTool && !tool.isPremium;
	const gated = tool.requiresLogin || tool.isPremium;
	const wide = tool.layout === "wide";
	const offer = tool.isPremium ? await premiumOffer() : {
		tiers: [],
		currency: "EUR"
	};
	const stage = tool.isPremium ? cheapestTierFor(tool.id, offer.tiers) : null;
	const unlock = stage ? {
		name: tierCopy(stage, lang).name,
		priceCents: stage.priceCents,
		currency: offer.currency
	} : null;
	const copy = mergeCopy(toolCopyFor(lang, tool, site.name), override);
	const toolUrl = `${site.origin}${localizedPath(`/tools/${tool.slug}`, lang)}`;
	const guide = mergeGuide(tool.slug, lang, override);
	const breadcrumbId = `${toolUrl}#breadcrumb`;
	const updatedAt = guideUpdatedAt(tool.slug);
	const jsonLd = asGraph(websiteSchema(site.description), imageObject(editorialSrc(categoryArtwork[tool.category]), lang, toolUrl), webPageNode({
		url: toolUrl,
		name: copy.name,
		description: copy.description,
		lang,
		dateModified: updatedAt,
		breadcrumbId
	}), softwareApplicationSchema({
		name: copy.name,
		url: toolUrl,
		description: copy.description,
		type: tool.seo?.jsonLdType ?? "WebApplication",
		lang,
		isFree: !tool.isPremium,
		priceCents: tool.isPremium ? unlock?.priceCents ?? null : 0,
		monthly: tool.isPremium,
		currency: unlock?.currency,
		keywords: tool.keywords
	}), breadcrumbSchema([{
		name: s.breadcrumbAll,
		url: `${site.origin}${base}/`
	}, {
		name: copy.name,
		url: toolUrl
	}], breadcrumbId), ...guide ? [howToSchema(lang === "de" ? `${copy.name} verwenden` : `How to use ${copy.name}`, guide.steps), faqPageSchema(guide.faq)] : []);
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": copy.seoTitle,
		"description": copy.seoDescription ?? copy.description,
		"lang": lang,
		"ogImage": lang === "de" ? `/og/tools/${tool.slug}.png` : `/og/en/tools/${tool.slug}.png`,
		"jsonLd": jsonLd
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="tds-page tds-shell py-10"><nav class="text-sm text-[color:var(--color-muted)]"><a${addAttribute(`${base}/`, "href")} class="tnav-link link-underline">${s.breadcrumbAll}</a><span class="mx-2">/</span><span class="text-[color:var(--color-ink)]">${copy.name}</span></nav><div class="tool-intro"><div class="tds-page__head"><h1 class="tds-page__title tool-title flex w-full items-center gap-3">${renderComponent($$result, "Icon", $$Icon, {
		"name": tool.icon,
		"class": "h-7 w-7 shrink-0 text-[color:var(--color-accent)]"
	})}<span class="min-w-0 hyphens-auto break-words">${copy.name}</span></h1></div><p class="tds-page__lede max-w-2xl">${copy.description}</p><ul class="tool-facts"${addAttribute(s.access.label, "aria-label")}>${tool.isPremium ? renderTemplate`<li class="chip chip--warning">${s.access.premium}</li>` : renderTemplate`<li class="chip chip--success">${s.access.free}</li>`}<li${addAttribute(tool.requiresLogin || tool.isPremium ? "chip chip--info" : "chip chip--neutral", "class")}>${tool.requiresLogin || tool.isPremium ? s.access.login : s.access.noLogin}</li><li class="chip chip--neutral">${s.access.browser}</li></ul></div>${wide && renderTemplate`<div class="tool-wide">${renderComponent($$result, "ToolBody", $$ToolBody, {
		"tool": tool,
		"Tool": Tool,
		"gated": gated,
		"lang": lang,
		"unlock": unlock
	})}</div>`}<div class="tool-layout"><div class="tool-main">${!wide && renderTemplate`${renderComponent($$result, "ToolBody", $$ToolBody, {
		"tool": tool,
		"Tool": Tool,
		"gated": gated,
		"lang": lang,
		"unlock": unlock
	})}`}${showAds && renderTemplate`${renderComponent($$result, "AdSlot", $$AdSlot, {
		"client": ads.publisherId,
		"slot": ads.slotTool,
		"lang": lang
	})}`}${guide && renderTemplate`${renderComponent($$result, "Fragment", Fragment$2, {}, { "default": ($$result) => renderTemplate`<img class="tool-guide__photo"${addAttribute(editorialSrc(categoryArtwork[tool.category]), "src")}${addAttribute(imageHints(editorialSrc(categoryArtwork[tool.category]), lang)?.srcSet ?? editorialSrcset(categoryArtwork[tool.category]), "srcset")} sizes="(min-width: 80rem) 65vw, 100vw" width="960" height="640"${addAttribute(imageHints(editorialSrc(categoryArtwork[tool.category]), lang)?.alt ?? "", "alt")} loading="lazy" decoding="async">${renderComponent($$result, "ToolGuide", $$ToolGuide, {
		"guide": guide,
		"toolName": copy.name,
		"lang": lang,
		"updatedAt": guideUpdatedAt(tool.slug)
	})}` })}`}${renderComponent($$result, "ToolRatgeber", $$ToolRatgeber, {
		"slug": tool.blogSlug,
		"lang": lang
	})}</div><div class="tool-aside">${guide && renderTemplate`${renderComponent($$result, "RelatedTools", $$RelatedTools, {
		"slugs": guide.related,
		"all": allTools,
		"current": tool.slug,
		"lang": lang,
		"base": base
	})}`}</div></div></div>` })}`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/components/ToolPage.astro", void 0);
// src/lib/toolRoute.ts
/**
* What a `/tools/[slug]` route needs, in either language.
*
* The two route files were byte-identical apart from three occurrences of
* `"de"`/`"en"` — including the twelve-line comment explaining the 404 rule,
* which is exactly the kind of thing that gets corrected in one copy only. The
* catalog pages already delegate to `CatalogPage.astro`; the tool routes never
* got the same treatment.
*
* The 404 itself stays in the page: an `.astro` frontmatter has to `return` the
* Response from its own module scope, so a helper can report "no such tool" but
* cannot answer for it.
*/
/**
* Resolve one tool page, or `null` when the catalog does not know the slug.
*
* `null` must become a 404, never an empty page: a tool the admin switched off
* has to stop existing rather than stay indexable and permanently 200 with
* nothing on it.
*
* Both trees carry the SAME slugs on purpose (`/tools/x` and `/en/tools/x`),
* which is what makes the hreflang pair a pure prefix operation — the two URLs
* always name each other.
*/
async function resolveToolRoute(slug, lang) {
	const allTools = await enabledTools();
	const tool = allTools.find((candidate) => candidate.slug === slug);
	if (!tool) return null;
	return {
		tool,
		allTools,
		overrides: await guideOverrides(lang)
	};
}
export { $$ToolPage as n, resolveToolRoute as t };
