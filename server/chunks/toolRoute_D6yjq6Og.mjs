import { O as renderTemplate, S as renderComponent, j as addAttribute, k as maybeRenderHead, z as createAstro } from "./sequence_D8AML-3n.mjs";
import { t as createComponent } from "./compiler_DXKtTkSA.mjs";
import { c as softwareApplicationSchema, d as $$AdSlot, f as $$Icon, i as howToSchema, n as breadcrumbSchema, p as $$Layout, r as faqPageSchema, t as asGraph, u as $$ServiceNote } from "./jsonld_gNOKO9fO.mjs";
import { r as contentCache } from "./cache_Co9YbPGn.mjs";
import { t as apiBase } from "./connection_jGVRvpuo.mjs";
import { n as siteKeyHeaders, t as assertKeyAccepted } from "./siteKey_qLmc5xZf.mjs";
import { d as t, f as toolCopyFor, l as site, n as enabledTools, r as localizedPath, t as adsConfig } from "./catalog_r24T3a_b.mjs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { PDFDocument, PDFName, PDFNumber, PDFRawStream, StandardFonts, degrees, rgb } from "pdf-lib";
import QRCode from "qrcode";
var RUNTIME_CONFIG_PATH = "/tds-runtime.json";
var STATE_KEY = /* @__PURE__ */ Symbol.for("@tracht-digital-solutions/tds-shared:api-state");
var state = (() => {
	const host = globalThis;
	const existing = host[STATE_KEY];
	if (existing !== void 0) return existing;
	const fresh = {
		cached: null,
		runtimePromise: null,
		runtimeValue: null,
		onUnauthorized: null,
		headersProvider: null
	};
	host[STATE_KEY] = fresh;
	return fresh;
})();
var trimEnd = (value) => value.replace(/\/+$/, "");
async function runtimeConfig() {
	if (state.runtimePromise !== null) return state.runtimePromise;
	if (typeof document === "undefined" || typeof fetch !== "function") {
		state.runtimePromise = Promise.resolve(null);
		return state.runtimePromise;
	}
	let declared = "";
	try {
		declared = document.querySelector(`meta[name="tds-api-base"]`)?.getAttribute("content") ?? "";
	} catch {}
	if (declared.trim() !== "") {
		state.runtimePromise = Promise.resolve(null);
		return state.runtimePromise;
	}
	state.runtimePromise = (async () => {
		try {
			const res = await fetch(RUNTIME_CONFIG_PATH, {
				credentials: "same-origin",
				headers: { Accept: "application/json" },
				signal: typeof AbortSignal?.timeout === "function" ? AbortSignal.timeout(3e3) : void 0
			});
			if (!res.ok) return null;
			if (!(res.headers.get("content-type") ?? "").includes("json")) return null;
			const parsed = await res.json();
			if (parsed === null || typeof parsed !== "object") return null;
			const config = parsed;
			if (typeof config.apiBase === "string" && config.apiBase !== "") state.cached = trimEnd(config.apiBase);
			state.runtimeValue = config;
			return config;
		} catch {
			return null;
		}
	})();
	return state.runtimePromise;
}
async function runtimeSetting(key, fallback) {
	const value = (await runtimeConfig())?.[key];
	return typeof value === "string" && value !== "" ? value : fallback;
}
//#endregion
//#region src/components/ToolGate.tsx
var API = "https://api.tracht-digital.de";
var LOGIN = "https://auth.tracht-digital.de";
function ToolGate({ toolId, requiresLogin, isPremium, priceCents, bodySelector }) {
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
				const ent = res && res.ok ? await res.json() : null;
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
	const loginHref = `${endpoints.login}?next=${encodeURIComponent(typeof location !== "undefined" ? location.href : "")}`;
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
			setError(data?.error ?? `Fehler (HTTP ${res.status}).`);
		} catch {
			setError("Zahlung konnte nicht gestartet werden.");
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
			children: "Zugang wird geprüft …"
		})
	});
	if (state === "login") return /* @__PURE__ */ jsxs("div", {
		className: box,
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "mb-1 text-lg font-semibold",
				children: isPremium ? "Premium-Tool" : "Anmeldung erforderlich"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mb-4 text-sm text-[color:var(--color-muted)]",
				children: isPremium ? "Melde dich an, um dieses Premium-Tool freizuschalten." : "Bitte melde dich an, um dieses Tool zu nutzen."
			}),
			/* @__PURE__ */ jsx("a", {
				href: loginHref,
				className: "btn btn-primary no-underline",
				children: "Anmelden"
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
				children: "Dieses Tool freischalten"
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "mb-4 text-sm text-[color:var(--color-muted)]",
				children: [
					"Einmalig ",
					(priceCents / 100).toLocaleString("de-DE", {
						style: "currency",
						currency: "EUR"
					}),
					" — danach dauerhaft nutzbar."
				]
			}),
			error && /* @__PURE__ */ jsx("p", {
				className: "tds-alert tds-alert--danger mb-3",
				children: error
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "btn btn-primary",
				onClick: buy,
				disabled: busy,
				children: busy ? "Weiterleitung …" : "Jetzt freischalten"
			})
		]
	});
	return /* @__PURE__ */ jsx("div", {
		className: box,
		children: /* @__PURE__ */ jsx("p", {
			className: "text-[color:var(--color-muted)]",
			children: "Der Zugang konnte nicht geprüft werden. Bitte später erneut versuchen."
		})
	});
}
//#endregion
//#region src/components/ToolGuide.astro
createAstro("https://tools.tracht-digital.de");
var $$ToolGuide = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ToolGuide;
	const { guide, toolName, lang = "de" } = Astro.props;
	const s = t(lang);
	return renderTemplate`${maybeRenderHead($$result)}<section class="tool-guide" aria-labelledby="guide-heading"><h2 id="guide-heading" class="tool-guide__h2">${s.guideHeading}: ${toolName}</h2><span aria-hidden="true" class="tool-guide__mark"></span><div class="tool-guide__intro">${guide.intro.map((p) => renderTemplate`<p>${p}</p>`)}</div><h3 class="tool-guide__h3">${s.guideUseCases}</h3><ul class="tool-guide__cases">${guide.useCases.map((c) => renderTemplate`<li><p class="tool-guide__case-title">${c.title}</p><p class="tool-guide__case-text">${c.text}</p></li>`)}</ul><h3 class="tool-guide__h3">${s.guideSteps}</h3><ol class="tool-guide__steps">${guide.steps.map((step) => renderTemplate`<li><p class="tool-guide__step-title">${step.title}</p><p class="tool-guide__step-text">${step.description}</p></li>`)}</ol><h3 class="tool-guide__h3">${s.guidePrivacy}</h3><p class="tool-guide__privacy">${guide.privacy}</p><h3 class="tool-guide__h3">${s.guideFaq}</h3><div class="tool-guide__faq">${guide.faq.map((item) => renderTemplate`<details><summary>${item.q}</summary><p>${item.a}</p></details>`)}</div></section>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/components/ToolGuide.astro", void 0);
//#endregion
//#region src/components/RelatedTools.astro
createAstro("https://tools.tracht-digital.de");
var $$RelatedTools = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RelatedTools;
	const { slugs, all, current, lang = "de", base = "" } = Astro.props;
	const s = t(lang);
	const related = slugs.filter((slug) => slug !== current).map((slug) => all.find((tool) => tool.slug === slug)).filter((tool) => Boolean(tool));
	return renderTemplate`${related.length > 0 && renderTemplate`${maybeRenderHead($$result)}<section class="tool-related" aria-labelledby="related-heading"><h2 id="related-heading" class="tool-guide__h2">${s.relatedHeading}</h2><span aria-hidden="true" class="tool-guide__mark"></span><div class="grid gap-4 sm:grid-cols-2">${related.map((tool) => {
		const copy = toolCopyFor(lang, tool, site.name);
		return renderTemplate`<a${addAttribute(`${base}/tools/${tool.slug}`, "href")} class="tool-card"><span class="tool-card__title">${renderComponent($$result, "Icon", $$Icon, {
			"name": tool.icon,
			"class": "h-5 w-5 text-[color:var(--color-accent)]"
		})}${copy.name}</span><p class="tool-card__desc">${copy.description}</p></a>`;
	})}</div></section>`}`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/components/RelatedTools.astro", void 0);
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-office/islands/shared.ts
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
/** Hand a Blob to the visitor as a download. Nothing here ever leaves the tab. */
function downloadBlob$2(blob, name) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = name;
	document.body.appendChild(a);
	a.click();
	a.remove();
	setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
function downloadPdf$1(bytes, name) {
	downloadBlob$2(new Blob([bytes.slice()], { type: "application/pdf" }), name);
}
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-office/islands/LabelSheet.tsx
/**
* The common German label sheets. The product codes are given as compatibility
* hints, not as a claim about any manufacturer — what actually matters is the
* geometry, and a sheet from any brand with the same grid fits.
*/
var PRESETS = [
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
var STRINGS$17 = {
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
		note: "Der Bogen wird lokal im Browser erzeugt; die Adressen verlassen Ihren Rechner nicht."
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
	const t = STRINGS$17[lang];
	const [presetKey, setPresetKey] = useState(PRESETS[0]?.key ?? "70x37");
	const [text, setText] = useState("");
	const [repeat, setRepeat] = useState(false);
	const [startAt, setStartAt] = useState(1);
	const [fontSize, setFontSize] = useState(10);
	const [align, setAlign] = useState("left");
	const [guides, setGuides] = useState(false);
	const [busy, setBusy] = useState(false);
	const [status, setStatus] = useState(null);
	const [error, setError] = useState(null);
	const preset = PRESETS.find((p) => p.key === presetKey) ?? PRESETS[0];
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
					children: PRESETS.map((p) => /* @__PURE__ */ jsx("option", {
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
			error && /* @__PURE__ */ jsx("p", {
				className: "tds-alert tds-alert--danger",
				role: "alert",
				children: error
			}),
			status && /* @__PURE__ */ jsx("p", {
				className: "tds-alert tds-alert--success",
				children: status
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-xs opacity-60",
				children: t.note
			})
		]
	});
}
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-office/tools/LabelSheet.astro
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-office/islands/Timesheet.tsx
/** German is the default; an older pinned pack must keep working unchanged. */
var STRINGS$16 = {
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
		note: "Der Stundenzettel wird lokal im Browser erzeugt; die Zeiten verlassen Ihren Rechner nicht.",
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
	const t = STRINGS$16[lang];
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
			error && /* @__PURE__ */ jsx("p", {
				className: "tds-alert tds-alert--danger",
				role: "alert",
				children: error
			}),
			status && /* @__PURE__ */ jsx("p", {
				className: "tds-alert tds-alert--success",
				children: status
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-xs opacity-60",
				children: t.note
			})
		]
	});
}
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-office/tools/Timesheet.astro
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-legal/islands/shared.ts
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
/**
* Eine Datei zum Herunterladen anbieten.
*
* Die Object-URL wird verzögert freigegeben: ein sofortiges `revoke` nach dem
* Klick kommt in Firefox dem Download zuvor, und eine nie freigegebene URL
* hält ihren Blob bis zum Schließen des Tabs am Leben.
*/
function downloadBlob$1(blob, filename) {
	const url = URL.createObjectURL(blob);
	const anchor = document.createElement("a");
	anchor.href = url;
	anchor.download = filename;
	document.body.appendChild(anchor);
	anchor.click();
	anchor.remove();
	setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
/** Klartext als `.txt` herunterladen. */
function downloadText(text, filename) {
	downloadBlob$1(new Blob([text], { type: "text/plain;charset=utf-8" }), filename);
}
/** HTML-Bruchstück als `.html` herunterladen. */
function downloadHtml(html, filename) {
	downloadBlob$1(new Blob([html], { type: "text/html;charset=utf-8" }), filename);
}
/**
* Der „Kopiert ✓“-Zustand mit aufgeräumtem Timer.
*
* Der Reset wird in einem Ref geführt, damit das Aushängen der Insel ihn
* löschen kann — eine Astro-Insel wird bei der Navigation abgebaut, und ein
* laufender Timer setzt sonst den Zustand einer verschwundenen Komponente.
*/
function useCopyFlag(delayMs = 1500) {
	const [copied, setCopied] = useState(false);
	const timer = useRef(null);
	useEffect(() => () => {
		if (timer.current !== null) clearTimeout(timer.current);
	}, []);
	const copy = async (text) => {
		if (!text) return;
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			if (timer.current !== null) clearTimeout(timer.current);
			timer.current = setTimeout(() => setCopied(false), delayMs);
		} catch {
			setCopied(false);
		}
	};
	return {
		copied,
		copy,
		reset: () => setCopied(false)
	};
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-legal/islands/accessibility.ts
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-legal/islands/ui.tsx
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
function Field({ label, value, onChange, placeholder, type = "text", hint, required }) {
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
		children: [/* @__PURE__ */ jsx("h3", {
			className: "text-sm font-semibold tracking-wide uppercase opacity-70",
			children: title
		}), children]
	});
}
var NOTE = {
	de: {
		disclaimer: "Dieses Werkzeug erzeugt ein Muster zur Orientierung. Es ersetzt keine Rechtsberatung und keine Prüfung Ihres konkreten Falls durch eine Anwältin oder einen Anwalt.",
		missing: (fields) => `Für einen vollständigen Text fehlt noch: ${fields}.`,
		preview: "Vorschau",
		copy: "Kopieren",
		copied: "Kopiert ✓",
		txt: "Als .txt speichern",
		html: "Als .html speichern",
		footer: "Prüfen Sie den Text vor der Veröffentlichung. Die Pflichtangaben hängen an Ihrem Betrieb, nicht an diesem Formular — und dieses Werkzeug kennt Ihren Betrieb nicht."
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
			/* @__PURE__ */ jsx("h3", {
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-legal/islands/AccessibilityStatementGenerator.tsx
/** Deutsch ist der Default, hier wie in der Shell. */
var STRINGS$15 = {
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
	const t = STRINGS$15[lang];
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
					/* @__PURE__ */ jsx(Field, {
						label: t.company,
						required: true,
						value: values.provider.company,
						onChange: (value) => setProvider("company", value)
					}),
					/* @__PURE__ */ jsx(Field, {
						label: t.street,
						value: values.provider.street,
						onChange: (value) => setProvider("street", value)
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ jsx(Field, {
								label: t.postalCode,
								value: values.provider.postalCode,
								onChange: (value) => setProvider("postalCode", value)
							}),
							/* @__PURE__ */ jsx(Field, {
								label: t.city,
								value: values.provider.city,
								onChange: (value) => setProvider("city", value)
							}),
							/* @__PURE__ */ jsx(Field, {
								label: t.country,
								value: values.provider.country,
								onChange: (value) => setProvider("country", value)
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ jsx(Field, {
							label: t.phone,
							type: "tel",
							value: values.provider.phone,
							onChange: (value) => setProvider("phone", value)
						}), /* @__PURE__ */ jsx(Field, {
							label: t.email,
							type: "email",
							value: values.provider.email,
							onChange: (value) => setProvider("email", value)
						})]
					}),
					/* @__PURE__ */ jsx(Field, {
						label: t.serviceName,
						hint: t.serviceNameHint,
						required: true,
						value: values.serviceName,
						onChange: (value) => set("serviceName", value)
					}),
					/* @__PURE__ */ jsx(Field, {
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
						children: [/* @__PURE__ */ jsx(Field, {
							label: t.createdOn,
							type: "date",
							required: true,
							value: values.createdOn,
							onChange: (value) => set("createdOn", value)
						}), /* @__PURE__ */ jsx(Field, {
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
					values.assessment === "external" && /* @__PURE__ */ jsx(Field, {
						label: t.assessor,
						value: values.assessor,
						onChange: (value) => set("assessor", value)
					})
				]
			}),
			/* @__PURE__ */ jsxs(Group, {
				title: t.feedback,
				children: [/* @__PURE__ */ jsx(Field, {
					label: t.feedbackContact,
					hint: t.feedbackContactHint,
					required: true,
					value: values.feedbackContact,
					onChange: (value) => set("feedbackContact", value)
				}), /* @__PURE__ */ jsx(Field, {
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-legal/tools/AccessibilityStatementGenerator.astro
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-legal/islands/privacy.ts
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-legal/islands/PrivacyPolicyGenerator.tsx
/** Deutsch ist der Default, hier wie in der Shell. */
var STRINGS$14 = {
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
		supervisoryHint: "Die Behörde des Bundeslands, in dem Ihr Betrieb sitzt.",
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
	const t = STRINGS$14[lang];
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
					/* @__PURE__ */ jsx(Field, {
						label: t.company,
						required: true,
						value: values.provider.company,
						onChange: (value) => setProvider("company", value)
					}),
					/* @__PURE__ */ jsx(Field, {
						label: t.street,
						required: true,
						value: values.provider.street,
						onChange: (value) => setProvider("street", value)
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ jsx(Field, {
								label: t.postalCode,
								required: true,
								value: values.provider.postalCode,
								onChange: (value) => setProvider("postalCode", value)
							}),
							/* @__PURE__ */ jsx(Field, {
								label: t.city,
								required: true,
								value: values.provider.city,
								onChange: (value) => setProvider("city", value)
							}),
							/* @__PURE__ */ jsx(Field, {
								label: t.country,
								value: values.provider.country,
								onChange: (value) => setProvider("country", value)
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ jsx(Field, {
								label: t.phone,
								type: "tel",
								value: values.provider.phone,
								onChange: (value) => setProvider("phone", value)
							}),
							/* @__PURE__ */ jsx(Field, {
								label: t.email,
								type: "email",
								required: true,
								value: values.provider.email,
								onChange: (value) => setProvider("email", value)
							}),
							/* @__PURE__ */ jsx(Field, {
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
						children: [/* @__PURE__ */ jsx(Field, {
							label: t.dpoName,
							value: values.dpoName,
							onChange: (value) => set("dpoName", value)
						}), /* @__PURE__ */ jsx(Field, {
							label: t.dpoContact,
							value: values.dpoContact,
							onChange: (value) => set("dpoContact", value)
						})]
					}),
					/* @__PURE__ */ jsx(Field, {
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
						children: [/* @__PURE__ */ jsx(Field, {
							label: t.hostingProvider,
							value: values.hostingProvider,
							onChange: (value) => set("hostingProvider", value)
						}), /* @__PURE__ */ jsx(Field, {
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
					values.consentCookies && /* @__PURE__ */ jsx(Field, {
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
						}), values.analyticsTool === "other" && /* @__PURE__ */ jsx(Field, {
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
						}), values.mapsProvider === "other" && /* @__PURE__ */ jsx(Field, {
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
					values.videos && /* @__PURE__ */ jsx(Field, {
						label: t.videoProvider,
						value: values.videoProvider,
						onChange: (value) => set("videoProvider", value)
					}),
					/* @__PURE__ */ jsx(Check, {
						label: t.cdn,
						checked: values.cdn,
						onChange: (checked) => set("cdn", checked)
					}),
					values.cdn && /* @__PURE__ */ jsx(Field, {
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
					values.newsletter && /* @__PURE__ */ jsx(Field, {
						label: t.newsletterProvider,
						value: values.newsletterProvider,
						onChange: (value) => set("newsletterProvider", value)
					}),
					/* @__PURE__ */ jsx(Check, {
						label: t.socialProfiles,
						checked: values.socialProfiles,
						onChange: (checked) => set("socialProfiles", checked)
					}),
					values.socialProfiles && /* @__PURE__ */ jsx(Field, {
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
					values.shop && /* @__PURE__ */ jsx(Field, {
						label: t.paymentProviders,
						value: values.paymentProviders,
						onChange: (value) => set("paymentProviders", value)
					}),
					/* @__PURE__ */ jsx(Check, {
						label: t.booking,
						checked: values.booking,
						onChange: (checked) => set("booking", checked)
					}),
					values.booking && /* @__PURE__ */ jsx(Field, {
						label: t.bookingProvider,
						value: values.bookingProvider,
						onChange: (value) => set("bookingProvider", value)
					}),
					/* @__PURE__ */ jsx(Check, {
						label: t.liveChat,
						checked: values.liveChat,
						onChange: (checked) => set("liveChat", checked)
					}),
					values.liveChat && /* @__PURE__ */ jsx(Field, {
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-legal/tools/PrivacyPolicyGenerator.astro
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-legal/islands/imprint.ts
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-legal/islands/ImprintGenerator.tsx
/**
* Deutsch ist der Default, hier wie in der Shell. Ein Aufrufer ohne `lang`
* bekommt damit dasselbe Verhalten wie vor dem englischen Baum — und die
* gesamte deutsche Testreihe ist zugleich der Regressionstest dafür.
*/
var STRINGS$13 = {
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
	const t = STRINGS$13[lang];
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
					/* @__PURE__ */ jsx(Field, {
						label: t.company,
						hint: t.companyHint,
						required: true,
						value: values.provider.company,
						onChange: (value) => setProvider("company", value)
					}),
					/* @__PURE__ */ jsx(Field, {
						label: t.represented,
						hint: t.representedHint,
						value: values.provider.represented,
						onChange: (value) => setProvider("represented", value)
					}),
					/* @__PURE__ */ jsx(Field, {
						label: t.street,
						required: true,
						value: values.provider.street,
						onChange: (value) => setProvider("street", value)
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ jsx(Field, {
								label: t.postalCode,
								required: true,
								value: values.provider.postalCode,
								onChange: (value) => setProvider("postalCode", value)
							}),
							/* @__PURE__ */ jsx(Field, {
								label: t.city,
								required: true,
								value: values.provider.city,
								onChange: (value) => setProvider("city", value)
							}),
							/* @__PURE__ */ jsx(Field, {
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
						/* @__PURE__ */ jsx(Field, {
							label: t.phone,
							type: "tel",
							value: values.provider.phone,
							onChange: (value) => setProvider("phone", value)
						}),
						/* @__PURE__ */ jsx(Field, {
							label: t.email,
							type: "email",
							required: true,
							value: values.provider.email,
							onChange: (value) => setProvider("email", value)
						}),
						/* @__PURE__ */ jsx(Field, {
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
						children: [/* @__PURE__ */ jsx(Field, {
							label: t.registerCourt,
							value: values.registerCourt,
							onChange: (value) => set("registerCourt", value)
						}), /* @__PURE__ */ jsx(Field, {
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
					values.vatRegistered && /* @__PURE__ */ jsx(Field, {
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
									/* @__PURE__ */ jsx(Field, {
										label: t.professionTitle,
										value: values.professionTitle,
										onChange: (value) => set("professionTitle", value)
									}),
									/* @__PURE__ */ jsx(Field, {
										label: t.chamber,
										value: values.chamber,
										onChange: (value) => set("chamber", value)
									}),
									/* @__PURE__ */ jsx(Field, {
										label: t.professionState,
										value: values.professionState,
										onChange: (value) => set("professionState", value)
									})
								]
							}),
							/* @__PURE__ */ jsx(Field, {
								label: t.professionRules,
								value: values.professionRules,
								onChange: (value) => set("professionRules", value)
							}),
							/* @__PURE__ */ jsx(Field, {
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
						children: [/* @__PURE__ */ jsx(Field, {
							label: t.authorityName,
							value: values.authorityName,
							onChange: (value) => set("authorityName", value)
						}), /* @__PURE__ */ jsx(Field, {
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
							/* @__PURE__ */ jsx(Field, {
								label: t.insurerName,
								value: values.insurerName,
								onChange: (value) => set("insurerName", value)
							}),
							/* @__PURE__ */ jsx(Field, {
								label: t.insurerAddress,
								value: values.insurerAddress,
								onChange: (value) => set("insurerAddress", value)
							}),
							/* @__PURE__ */ jsx(Field, {
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
						children: [/* @__PURE__ */ jsx(Field, {
							label: t.editorName,
							value: values.editorName,
							onChange: (value) => set("editorName", value)
						}), /* @__PURE__ */ jsx(Field, {
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-legal/tools/ImprintGenerator.astro
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-legal/islands/badge.ts
var CORNERS = [
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-legal/islands/metadata.ts
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-legal/islands/AiImageBadge.tsx
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
var STRINGS$12 = {
	de: {
		chooseImage: "Bild auswählen",
		chooseHint: "PNG, JPEG oder WebP. Das Bild verlässt Ihr Gerät nicht.",
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
		embedWebp: "WebP kann den maschinenlesbaren Hinweis nicht tragen — wählen Sie PNG oder JPEG.",
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
		privacyNote: "Das Bild wird ausschließlich in Ihrem Browser verarbeitet und niemals hochgeladen."
	},
	en: {
		chooseImage: "Choose an image",
		chooseHint: "PNG, JPEG or WebP. The image never leaves your device.",
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
	const t = STRINGS$12[lang];
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
			/* @__PURE__ */ jsxs("label", {
				className: "block",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "mb-1 block text-sm opacity-80",
						children: t.chooseImage
					}),
					/* @__PURE__ */ jsx("input", {
						type: "file",
						accept: "image/png,image/jpeg,image/webp",
						className: field,
						onChange: (event) => onFile(event.target.files?.[0])
					}),
					/* @__PURE__ */ jsx("span", {
						className: "mt-1 block text-xs opacity-60",
						children: t.chooseHint
					})
				]
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
							children: CORNERS.map((corner) => /* @__PURE__ */ jsx("option", {
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
			error && /* @__PURE__ */ jsx("p", {
				className: "tds-alert tds-alert--danger",
				role: "alert",
				children: error
			}),
			result && /* @__PURE__ */ jsxs("div", {
				className: "tds-card space-y-3 p-4",
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-legal/tools/AiImageBadge.astro
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-office/islands/TextRecognition.tsx
/** German is the default; an older pinned pack must keep working unchanged. */
var STRINGS$11 = {
	de: {
		needImage: "Bitte ein Bild wählen.",
		failed: "Der Text konnte nicht erkannt werden.",
		empty: "Es wurde kein Text gefunden. Ein schärferes, gerade ausgerichtetes Bild mit gutem Kontrast hilft am meisten.",
		done: (chars, confidence) => `${chars} Zeichen erkannt (Sicherheit ${confidence} %).`,
		chooseImage: "Bild auswählen (JPG, PNG, WebP)",
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
		pdfHint: "PDFs werden hier nicht gelesen — wandeln Sie eine Seite zuerst in ein Bild um, dann klappt die Erkennung.",
		note: "Texterkennung und Sprachdaten laufen auf Ihrem Gerät. Das Bild wird nicht hochgeladen und keine fremde Seite wird dabei aufgerufen."
	},
	en: {
		needImage: "Please choose an image.",
		failed: "The text could not be recognised.",
		empty: "No text was found. A sharper, straight image with good contrast makes the biggest difference.",
		done: (chars, confidence) => `Recognised ${chars} characters (confidence ${confidence} %).`,
		chooseImage: "Choose an image (JPG, PNG, WebP)",
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
	const t = STRINGS$11[lang];
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
			/* @__PURE__ */ jsxs("label", {
				className: "block text-sm",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "mb-1 block opacity-80",
						children: t.chooseImage
					}),
					/* @__PURE__ */ jsx("input", {
						type: "file",
						accept: "image/*",
						className: field,
						onChange: (e) => {
							const next = e.target.files?.[0] ?? null;
							setFile(next);
							replacePreview(next);
						}
					}),
					/* @__PURE__ */ jsx("span", {
						className: "mt-1 block text-xs opacity-60",
						children: t.pdfHint
					})
				]
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
			error && /* @__PURE__ */ jsx("p", {
				className: "tds-alert tds-alert--danger",
				role: "alert",
				children: error
			}),
			status && /* @__PURE__ */ jsx("p", {
				className: "tds-alert tds-alert--success",
				children: status
			}),
			text !== "" && /* @__PURE__ */ jsxs("div", {
				className: "space-y-3",
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
						onClick: () => downloadBlob$2(new Blob([text], { type: "text/plain;charset=utf-8" }), t.outName),
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-office/tools/TextRecognition.astro
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-devkit/islands/ContrastChecker.tsx
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
function luminance([r, g, b]) {
	const chan = (v) => {
		const s = v / 255;
		return s <= .03928 ? s / 12.92 : ((s + .055) / 1.055) ** 2.4;
	};
	return .2126 * chan(r) + .7152 * chan(g) + .0722 * chan(b);
}
function ratio(fg, bg) {
	const l1 = luminance(fg);
	const l2 = luminance(bg);
	const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
	return (hi + .05) / (lo + .05);
}
/** German is the default — every existing test here asserts German labels. */
var STRINGS$10 = {
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
	const t = STRINGS$10[lang];
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
			}), !parsed ? /* @__PURE__ */ jsx("p", {
				className: "tds-alert tds-alert--warning",
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-devkit/tools/ContrastChecker.astro
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-devkit/islands/JsonFormatter.tsx
/** German is the default — every existing test here asserts German labels. */
var STRINGS$9 = {
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
	const t = STRINGS$9[lang];
	const [input, setInput] = useState("");
	const [indent, setIndent] = useState(2);
	const [result, setResult] = useState(null);
	const [copied, setCopied] = useState(false);
	/** Pending "copied" reset, cleared on unmount. */
	const copyReset = useRef(null);
	useEffect(() => () => {
		if (copyReset.current !== null) clearTimeout(copyReset.current);
	}, []);
	const run = (minify) => {
		setCopied(false);
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
	const copy = async () => {
		if (!result?.output) return;
		try {
			await navigator.clipboard.writeText(result.output);
			setCopied(true);
			if (copyReset.current !== null) clearTimeout(copyReset.current);
			copyReset.current = setTimeout(() => setCopied(false), 1500);
		} catch {
			setCopied(false);
		}
	};
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
			result?.ok === false && /* @__PURE__ */ jsx("p", {
				className: "tds-alert tds-alert--danger",
				children: result.error
			}),
			result?.ok && result.output !== void 0 && /* @__PURE__ */ jsxs("div", {
				className: "space-y-2",
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-devkit/tools/JsonFormatter.astro
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-qr/islands/QrCode.tsx
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
var STRINGS$8 = {
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
		emptyHint: "Geben Sie Daten ein, um den QR-Code zu erzeugen.",
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
	const t = STRINGS$8[lang];
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
	const download = (href, filename) => {
		const a = document.createElement("a");
		a.href = href;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		a.remove();
	};
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
				error && /* @__PURE__ */ jsx("p", {
					className: "tds-alert tds-alert--danger",
					role: "alert",
					children: error
				}),
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-qr/tools/QrCode.astro
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-textkit/islands/UtmBuilder.tsx
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
var STRINGS$7 = {
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
	const t = STRINGS$7[lang];
	const PARAMS = t.params;
	const [base, setBase] = useState("https://tracht-digital.de");
	const [values, setValues] = useState({});
	const [autoSlug, setAutoSlug] = useState(true);
	const [copied, setCopied] = useState(false);
	/** Pending "copied" reset, cleared on unmount. */
	const copyReset = useRef(null);
	useEffect(() => () => {
		if (copyReset.current !== null) clearTimeout(copyReset.current);
	}, []);
	const set = (key, v) => {
		setValues((prev) => ({
			...prev,
			[key]: v
		}));
		setCopied(false);
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
	const copy = async () => {
		if (!url) return;
		try {
			await navigator.clipboard.writeText(url);
			setCopied(true);
			if (copyReset.current !== null) clearTimeout(copyReset.current);
			copyReset.current = setTimeout(() => setCopied(false), 1500);
		} catch {
			setCopied(false);
		}
	};
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
						setCopied(false);
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
			error ? /* @__PURE__ */ jsx("p", {
				className: "tds-alert tds-alert--danger",
				children: error
			}) : /* @__PURE__ */ jsxs("div", {
				className: "space-y-2",
				children: [missing.length > 0 && /* @__PURE__ */ jsx("p", {
					className: "text-xs opacity-70",
					children: t.recommended(missing.join(", "))
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-stretch gap-2",
					children: [/* @__PURE__ */ jsx("output", {
						className: "tds-card flex-1 select-all px-4 py-3 font-mono text-sm break-all",
						children: url || "—"
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-textkit/tools/UtmBuilder.astro
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-media/islands/ImageCompress.tsx
/** German is the default — every existing test here asserts German labels. */
var STRINGS$6 = {
	de: {
		loadFailed: "Bild konnte nicht geladen werden.",
		noCanvas: "Canvas nicht verfügbar.",
		compressFailed: "Komprimierung fehlgeschlagen.",
		genericError: "Fehler bei der Komprimierung.",
		chooseImage: "Bild auswählen",
		format: "Format",
		quality: "Qualität",
		maxWidth: "Max. Breite",
		compressing: "Komprimiere …",
		compress: "Komprimieren",
		resultAlt: "Komprimiertes Bild",
		smaller: (pct) => ` (${pct}% kleiner)`,
		download: "Herunterladen",
		downloadName: "komprimiert",
		note: "Alle Bilder werden lokal in Ihrem Browser verarbeitet und niemals hochgeladen."
	},
	en: {
		loadFailed: "The image could not be loaded.",
		noCanvas: "Canvas is not available.",
		compressFailed: "Compression failed.",
		genericError: "Something went wrong while compressing.",
		chooseImage: "Choose an image",
		format: "Format",
		quality: "Quality",
		maxWidth: "Max. width",
		compressing: "Compressing …",
		compress: "Compress",
		resultAlt: "Compressed image",
		smaller: (pct) => ` (${pct}% smaller)`,
		download: "Download",
		downloadName: "compressed",
		note: "All images are processed locally in your browser and are never uploaded."
	}
};
/** Human file size. */
function fmtSize(bytes) {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / 1048576).toFixed(2)} MB`;
}
function ImageCompress({ lang = "de" }) {
	const t = STRINGS$6[lang];
	const [original, setOriginal] = useState(null);
	const [result, setResult] = useState(null);
	const [format, setFormat] = useState("image/jpeg");
	const [quality, setQuality] = useState(.75);
	const [maxWidth, setMaxWidth] = useState(1600);
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState(null);
	const [imgEl, setImgEl] = useState(null);
	/**
	* Every object URL this island has minted, so each can be released.
	*
	* An object URL pins its Blob for the lifetime of the DOCUMENT, not of the
	* component — dropping the last reference to it frees nothing. Both URLs here
	* were previously created and never revoked, and the result URL was replaced
	* on every run, so compressing a 12 MP photo ten times left ten decoded
	* bitmaps alive until the tab closed. Nothing errors; the tab just grows.
	*
	* A ref rather than state: revoking must not schedule a render, and the
	* unmount cleanup has to see the latest value, which a captured state
	* variable would not.
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
		setOriginal({
			name: file.name,
			size: file.size
		});
		const img = new Image();
		const url = URL.createObjectURL(file);
		sourceUrl.current = url;
		img.onload = () => setImgEl(img);
		img.onerror = () => setError(t.loadFailed);
		img.src = url;
	};
	const compress = async () => {
		if (!imgEl) return;
		setBusy(true);
		setError(null);
		try {
			const scale = imgEl.width > maxWidth ? maxWidth / imgEl.width : 1;
			const w = Math.max(1, Math.round(imgEl.width * scale));
			const h = Math.max(1, Math.round(imgEl.height * scale));
			const canvas = document.createElement("canvas");
			canvas.width = w;
			canvas.height = h;
			const ctx = canvas.getContext("2d");
			if (!ctx) throw new Error(t.noCanvas);
			ctx.drawImage(imgEl, 0, 0, w, h);
			const blob = await new Promise((resolve) => canvas.toBlob(resolve, format, quality));
			if (!blob) throw new Error(t.compressFailed);
			releaseResult();
			const url = URL.createObjectURL(blob);
			resultUrl.current = url;
			setResult({
				url,
				size: blob.size,
				width: w,
				height: h
			});
		} catch (e) {
			setError(e instanceof Error ? e.message : t.genericError);
		} finally {
			setBusy(false);
		}
	};
	const ext = format === "image/webp" ? "webp" : "jpg";
	const saving = original && result ? Math.round((1 - result.size / original.size) * 100) : null;
	const field = "field-boxed w-full";
	return /* @__PURE__ */ jsxs("div", {
		className: "image-compress space-y-5",
		children: [
			/* @__PURE__ */ jsxs("label", {
				className: "block",
				children: [/* @__PURE__ */ jsx("span", {
					className: "mb-1 block text-sm opacity-80",
					children: t.chooseImage
				}), /* @__PURE__ */ jsx("input", {
					type: "file",
					accept: "image/*",
					onChange: (e) => onFile(e.target.files?.[0]),
					className: field
				})]
			}),
			imgEl && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
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
								value: "image/jpeg",
								children: "JPEG"
							}), /* @__PURE__ */ jsx("option", {
								value: "image/webp",
								children: "WebP"
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
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
							min: .3,
							max: 1,
							step: .05,
							value: quality,
							onChange: (e) => setQuality(Number(e.target.value)),
							className: "w-full"
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block text-sm",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "mb-1 block opacity-80",
							children: [
								t.maxWidth,
								": ",
								maxWidth,
								"px"
							]
						}), /* @__PURE__ */ jsx("input", {
							type: "range",
							min: 320,
							max: 4e3,
							step: 80,
							value: maxWidth,
							onChange: (e) => setMaxWidth(Number(e.target.value)),
							className: "w-full"
						})]
					})
				]
			}), /* @__PURE__ */ jsx("button", {
				type: "button",
				className: "btn btn-primary",
				onClick: compress,
				disabled: busy,
				children: busy ? t.compressing : t.compress
			})] }),
			error && /* @__PURE__ */ jsx("p", {
				className: "tds-alert tds-alert--danger",
				role: "alert",
				children: error
			}),
			result && original && /* @__PURE__ */ jsxs("div", {
				className: "tds-card space-y-3 p-4",
				children: [
					/* @__PURE__ */ jsx("img", {
						src: result.url,
						alt: t.resultAlt,
						className: "tds-card h-auto max-h-64 max-w-full"
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "text-sm",
						children: [
							fmtSize(original.size),
							" → ",
							/* @__PURE__ */ jsx("strong", { children: fmtSize(result.size) }),
							saving !== null && saving > 0 && /* @__PURE__ */ jsx("span", {
								className: "text-[color:var(--color-success)]",
								children: t.smaller(saving)
							}),
							/* @__PURE__ */ jsxs("span", {
								className: "opacity-60",
								children: [
									" · ",
									result.width,
									"×",
									result.height,
									"px"
								]
							})
						]
					}),
					/* @__PURE__ */ jsx("a", {
						href: result.url,
						download: `${t.downloadName}.${ext}`,
						className: "btn btn-ghost",
						children: t.download
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-media/tools/ImageCompress.astro
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-pdf/islands/shared.ts
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
/** Hand a Blob to the visitor as a download. Nothing here ever leaves the tab. */
function downloadBlob(blob, name) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = name;
	document.body.appendChild(a);
	a.click();
	a.remove();
	setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
function downloadPdf(bytes, name) {
	downloadBlob(new Blob([bytes.slice()], { type: "application/pdf" }), name);
}
/** Human-readable byte size, German-style decimal comma via toLocaleString. */
function formatBytes(n, lang) {
	const units = [
		"B",
		"KB",
		"MB"
	];
	let v = n;
	let u = 0;
	while (v >= 1024 && u < units.length - 1) {
		v /= 1024;
		u++;
	}
	const digits = u === 0 ? 0 : 1;
	return `${v.toLocaleString(lang === "de" ? "de-DE" : "en-GB", {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	})} ${units[u]}`;
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-pdf/islands/ImagesToPdf.tsx
/** German is the default; an older pinned pack must keep working unchanged. */
var STRINGS$5 = {
	de: {
		needImages: "Bitte mindestens ein Bild wählen.",
		failed: "Das PDF konnte nicht erstellt werden.",
		noneUsable: "Keines der gewählten Bilder konnte gelesen werden.",
		done: (n) => `PDF mit ${n} Seite(n) erstellt.`,
		outName: "bilder.pdf",
		chooseImages: "Bilder auswählen (JPG, PNG, WebP)",
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
			/* @__PURE__ */ jsxs("label", {
				className: "block text-sm",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "mb-1 block opacity-80",
						children: t.chooseImages
					}),
					/* @__PURE__ */ jsx("input", {
						type: "file",
						accept: "image/*",
						multiple: true,
						className: field,
						onChange: (e) => setFiles(Array.from(e.target.files ?? []))
					}),
					files.length > 0 && /* @__PURE__ */ jsx("span", {
						className: "mt-1 block text-xs opacity-60",
						children: t.chosen(files.length)
					})
				]
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
			error && /* @__PURE__ */ jsx("p", {
				className: "tds-alert tds-alert--danger",
				role: "alert",
				children: error
			}),
			status && /* @__PURE__ */ jsx("p", {
				className: "tds-alert tds-alert--success",
				children: status
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-xs opacity-60",
				children: t.note
			})
		]
	});
}
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-pdf/tools/ImagesToPdf.astro
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-pdf/islands/PdfCompress.tsx
/** German is the default; an older pinned pack must keep working unchanged. */
var STRINGS$4 = {
	de: {
		needOne: "Bitte ein PDF wählen.",
		failed: "Das PDF konnte nicht verarbeitet werden.",
		nothingToDo: "In diesem PDF ließ sich nichts verkleinern — es enthält keine neu berechenbaren Bilder. Das ist bei reinen Textdokumenten normal.",
		choosePdf: "PDF auswählen",
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
	const field = "field-boxed w-full";
	return /* @__PURE__ */ jsxs("div", {
		className: "pdf-compress space-y-5",
		children: [
			/* @__PURE__ */ jsxs("label", {
				className: "block text-sm",
				children: [/* @__PURE__ */ jsx("span", {
					className: "mb-1 block opacity-80",
					children: t.choosePdf
				}), /* @__PURE__ */ jsx("input", {
					type: "file",
					accept: "application/pdf",
					className: field,
					onChange: (e) => setFile(e.target.files?.[0] ?? null)
				})]
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
						className: field,
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
			error && /* @__PURE__ */ jsx("p", {
				className: "tds-alert tds-alert--danger",
				role: "alert",
				children: error
			}),
			status && /* @__PURE__ */ jsx("p", {
				className: "tds-alert tds-alert--success",
				children: status
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-xs opacity-60",
				children: t.note
			})
		]
	});
}
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-pdf/tools/PdfCompress.astro
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-pdf/islands/PdfToImages.tsx
/** German is the default; an older pinned pack must keep working unchanged. */
var STRINGS$3 = {
	de: {
		needPdf: "Bitte ein PDF wählen.",
		badRange: "Kein gültiger Seitenbereich.",
		failed: "Das PDF konnte nicht gelesen werden.",
		tooMany: (max) => `Es werden höchstens ${max} Seiten auf einmal umgewandelt.`,
		done: (n) => `${n} Seite(n) umgewandelt.`,
		choosePdf: "PDF auswählen",
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
	const worker = await import("./pdf.worker.min_B2VoFekv.mjs");
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
			/* @__PURE__ */ jsxs("label", {
				className: "block text-sm",
				children: [/* @__PURE__ */ jsx("span", {
					className: "mb-1 block opacity-80",
					children: t.choosePdf
				}), /* @__PURE__ */ jsx("input", {
					type: "file",
					accept: "application/pdf",
					className: field,
					onChange: (e) => setFile(e.target.files?.[0] ?? null)
				})]
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
			error && /* @__PURE__ */ jsx("p", {
				className: "tds-alert tds-alert--danger",
				role: "alert",
				children: error
			}),
			status && /* @__PURE__ */ jsx("p", {
				className: "tds-alert tds-alert--success",
				children: status
			}),
			pages.length > 0 && /* @__PURE__ */ jsxs("div", {
				className: "space-y-4",
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-pdf/tools/PdfToImages.astro
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-pdf/islands/PdfWatermark.tsx
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
			/* @__PURE__ */ jsxs("label", {
				className: "block text-sm",
				children: [/* @__PURE__ */ jsx("span", {
					className: "mb-1 block opacity-80",
					children: t.choosePdf
				}), /* @__PURE__ */ jsx("input", {
					type: "file",
					accept: "application/pdf",
					className: field,
					onChange: (e) => setFile(e.target.files?.[0] ?? null)
				})]
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
			error && /* @__PURE__ */ jsx("p", {
				className: "tds-alert tds-alert--danger",
				role: "alert",
				children: error
			}),
			status && /* @__PURE__ */ jsx("p", {
				className: "tds-alert tds-alert--success",
				children: status
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-xs opacity-60",
				children: t.note
			})
		]
	});
}
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-pdf/tools/PdfWatermark.astro
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-media/islands/PdfTools.tsx
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
	const blob = new Blob([bytes.slice()], { type: "application/pdf" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = name;
	document.body.appendChild(a);
	a.click();
	a.remove();
	setTimeout(() => URL.revokeObjectURL(url), 1e3);
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
			mode === "merge" ? /* @__PURE__ */ jsxs("label", {
				className: "block text-sm",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "mb-1 block opacity-80",
						children: t.choosePdfs
					}),
					/* @__PURE__ */ jsx("input", {
						type: "file",
						accept: "application/pdf",
						multiple: true,
						className: field,
						onChange: (e) => setMergeFiles(Array.from(e.target.files ?? []))
					}),
					mergeFiles.length > 0 && /* @__PURE__ */ jsx("span", {
						className: "mt-1 block text-xs opacity-60",
						children: t.filesChosen(mergeFiles.length)
					})
				]
			}) : /* @__PURE__ */ jsxs("label", {
				className: "block text-sm",
				children: [/* @__PURE__ */ jsx("span", {
					className: "mb-1 block opacity-80",
					children: t.choosePdf
				}), /* @__PURE__ */ jsx("input", {
					type: "file",
					accept: "application/pdf",
					className: field,
					onChange: (e) => setSingleFile(e.target.files?.[0] ?? null)
				})]
			}),
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
			error && /* @__PURE__ */ jsx("p", {
				className: "tds-alert tds-alert--danger",
				role: "alert",
				children: error
			}),
			status && /* @__PURE__ */ jsx("p", {
				className: "tds-alert tds-alert--success",
				children: status
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-xs opacity-60",
				children: t.note
			})
		]
	});
}
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-media/tools/PdfTools.astro
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-textkit/islands/PasswordGenerator.tsx
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
		note: "Passwörter werden lokal in Ihrem Browser mit einem kryptografisch sicheren Zufallsgenerator erzeugt und niemals übertragen."
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
	const [copied, setCopied] = useState(false);
	/** Pending "copied" reset, cleared on unmount. */
	const copyReset = useRef(null);
	useEffect(() => () => {
		if (copyReset.current !== null) clearTimeout(copyReset.current);
	}, []);
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
		setCopied(false);
	}, [buildPool, length]);
	useEffect(() => {
		generate();
	}, [generate]);
	const pool = buildPool();
	const bits = pool.length > 0 ? Math.round(length * Math.log2(pool.length)) : 0;
	const s = strength(bits, t);
	const copy = async () => {
		if (!password) return;
		try {
			await navigator.clipboard.writeText(password);
			setCopied(true);
			if (copyReset.current !== null) clearTimeout(copyReset.current);
			copyReset.current = setTimeout(() => setCopied(false), 1500);
		} catch {
			setCopied(false);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "password-tool space-y-5",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-stretch gap-2",
				children: [
					/* @__PURE__ */ jsx("output", {
						className: "tds-card flex-1 select-all px-4 py-3 font-mono text-lg break-all",
						"aria-live": "polite",
						children: password || "—"
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-tool-textkit/tools/PasswordGenerator.astro
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
//#endregion
//#region \0virtual:tools-components
var components = {
	"etiketten-drucken": $$LabelSheet,
	"stundenzettel": $$Timesheet,
	"accessibility-statement-generator": $$AccessibilityStatementGenerator,
	"privacy-policy-generator": $$PrivacyPolicyGenerator,
	"imprint-generator": $$ImprintGenerator,
	"ai-image-badge": $$AiImageBadge,
	"texterkennung": $$TextRecognition,
	"contrast-checker": $$ContrastChecker,
	"json-formatter": $$JsonFormatter,
	"qr-code": $$QrCode,
	"utm-builder": $$UtmBuilder,
	"image-compress": $$ImageCompress,
	"bilder-zu-pdf": $$ImagesToPdf,
	"pdf-komprimieren": $$PdfCompress,
	"pdf-zu-bildern": $$PdfToImages,
	"pdf-wasserzeichen": $$PdfWatermark,
	"pdf-tools": $$PdfTools,
	"password-generator": $$PasswordGenerator
};
//#endregion
//#region src/lib/guides.ts
var guides = {
	"qr-code-generator": {
		de: {
			intro: [
				"Ein QR-Code ist nichts weiter als eine Adresse in Bildform. Wer ihn mit der Handykamera erfasst, landet direkt auf Ihrer Website, im WLAN Ihres Betriebs oder mit Ihren Kontaktdaten im Adressbuch — ohne dass jemand etwas abtippen muss. Genau da liegt der praktische Nutzen: Jede Ziffer, die ein Kunde selbst eingeben soll, ist eine Gelegenheit, sich zu vertippen und aufzugeben.",
				"Dieser Generator erzeugt vier Arten von Codes: freie URLs und Texte, WLAN-Zugänge und Kontaktdaten als vCard. Sie können Vorder- und Hintergrundfarbe an Ihr Erscheinungsbild anpassen und das Ergebnis als PNG für den Druck oder als SVG für die skalierbare Weiterverarbeitung herunterladen.",
				"Wichtig zu wissen: Der Code enthält das Ziel unmittelbar — er ist keine Weiterleitung über einen fremden Dienst. Das bedeutet, dass er dauerhaft funktioniert, aber auch, dass sich das Ziel nachträglich nicht ändern lässt. Wenn Sie damit rechnen, die Adresse später zu wechseln, verweisen Sie besser auf eine eigene Seite, deren Inhalt Sie selbst anpassen können."
			],
			useCases: [
				{
					title: "Gäste-WLAN ohne Zettel",
					text: "Der WLAN-Code hinterlegt Netzname und Passwort. Gäste verbinden sich mit einem Scan, statt ein 20-stelliges Passwort von einem Aushang abzuschreiben."
				},
				{
					title: "Speisekarte, Preisliste, Anleitung",
					text: "Ein Code am Tisch, am Regal oder auf der Maschine führt zur aktuellen Fassung — und Sie tauschen künftig die Seite aus statt des Aufstellers."
				},
				{
					title: "Visitenkarte, die im Adressbuch landet",
					text: "Der vCard-Code überträgt Name, Firma, Telefon und E-Mail in einem Zug. Deutlich zuverlässiger, als eine Karte später abzutippen."
				},
				{
					title: "Flyer und Anzeigen messbar machen",
					text: "Zeigt der Code auf einen Link mit UTM-Parametern, sehen Sie in Ihrer Statistik, wie viele Besucher tatsächlich aus dem Print gekommen sind."
				},
				{
					title: "Formulare am Fahrzeug oder auf der Baustelle",
					text: "Ein Aufkleber mit Code führt direkt zum Schadens-, Abnahme- oder Kontaktformular, ohne dass jemand die Adresse kennt."
				}
			],
			steps: [
				{
					title: "Art des Codes wählen",
					description: "Entscheiden Sie zwischen URL beziehungsweise freiem Text, WLAN-Zugang und Kontaktdaten. Die Eingabefelder darunter richten sich nach dieser Auswahl."
				},
				{
					title: "Inhalt eintragen",
					description: "Tragen Sie die Zieladresse ein — bei einer Website vollständig mit https://. Beim WLAN kommen Netzname und Passwort dazu, bei der vCard Name, Firma, Telefon und E-Mail."
				},
				{
					title: "Farben anpassen",
					description: "Vorder- und Hintergrundfarbe lassen sich an Ihr Erscheinungsbild angleichen. Achten Sie auf deutlichen Unterschied zwischen beiden: Ein zu heller Code wird von vielen Kameras nicht erkannt."
				},
				{
					title: "Prüfen und herunterladen",
					description: "Scannen Sie den Code einmal mit dem eigenen Telefon, bevor Sie ihn in den Druck geben. Danach als PNG für Papier oder als SVG für skalierbare Layouts speichern."
				}
			],
			privacy: "Der Code entsteht vollständig in Ihrem Browser. Weder die Zieladresse noch Ihr WLAN-Passwort oder Ihre Kontaktdaten werden an einen Server übertragen oder gespeichert — das Werkzeug hat gar keine Gegenstelle, an die es etwas senden könnte. Sie können die Seite nach dem Laden vom Netz nehmen und trotzdem weiterarbeiten. Bei einem WLAN-Passwort ist das kein akademischer Unterschied: Viele Online-Generatoren senden genau diese Eingabe zur Erzeugung an ihren Server.",
			faq: [
				{
					q: "Läuft der QR-Code irgendwann ab?",
					a: "Nein. Der Code enthält das Ziel direkt und ist nicht an einen Dienst gebunden, der ihn auflösen müsste. Er funktioniert, solange die Zieladresse erreichbar ist. Genau deshalb lässt sich das Ziel aber auch nicht nachträglich ändern."
				},
				{
					q: "PNG oder SVG — was soll ich nehmen?",
					a: "PNG für alles, was in fester Größe gedruckt oder eingefügt wird. SVG, wenn der Code noch vergrößert wird, etwa für ein Plakat oder eine Fahrzeugbeschriftung: Ein SVG bleibt in jeder Größe scharf, ein PNG wird beim Hochskalieren unsauber."
				},
				{
					q: "Wie groß muss ein gedruckter QR-Code sein?",
					a: "Als Faustregel gilt ein Zehntel des Leseabstands: Wer aus einem Meter Entfernung scannt, braucht etwa zehn Zentimeter Kantenlänge. Lassen Sie außerdem einen weißen Rand von der Breite mehrerer Module stehen — ohne diese Ruhezone finden viele Kameras den Code nicht."
				},
				{
					q: "Warum wird mein Code nicht erkannt?",
					a: "Meist liegt es am Kontrast oder am fehlenden Rand. Der Vordergrund muss deutlich dunkler sein als der Hintergrund, invertierte Codes lesen viele Kameras nicht. Auch sehr lange Inhalte machen das Muster feiner und damit schwerer erkennbar — kürzen Sie die Adresse, wenn möglich."
				},
				{
					q: "Kann ich damit Codes für Kunden erstellen?",
					a: "Ja, das Werkzeug ist kostenlos und ohne Anmeldung nutzbar, auch geschäftlich. Wenn Sie regelmäßig viele Codes brauchen oder sie aus eigenen Daten erzeugen wollen, lässt sich das automatisieren — sprechen Sie mich an."
				}
			],
			related: ["utm-link-generator", "bild-komprimieren"]
		},
		en: {
			intro: [
				"A QR code is nothing more than an address in the shape of a picture. Point a phone camera at it and the person lands directly on your website, on your business Wi-Fi, or with your contact details in their address book — without anyone having to type. That is where the practical value sits: every character a customer is asked to enter themselves is an opportunity to mistype it and give up.",
				"This generator produces four kinds of code: plain URLs and text, Wi-Fi credentials, and contact details as a vCard. You can match the foreground and background colours to your own look, and download the result as a PNG for print or an SVG for scalable use.",
				"One thing worth knowing: the code contains its destination directly — it is not a redirect through someone else's service. That means it keeps working indefinitely, but it also means the destination cannot be changed afterwards. If you expect the address to move, point the code at a page of your own whose content you can edit instead."
			],
			useCases: [
				{
					title: "Guest Wi-Fi without a printed note",
					text: "The Wi-Fi code carries the network name and password. Guests connect with one scan instead of copying a 20-character password off a sign."
				},
				{
					title: "Menu, price list, instructions",
					text: "A code on the table, the shelf or the machine leads to the current version — and from then on you replace the page, not the stand."
				},
				{
					title: "A business card that lands in the address book",
					text: "The vCard code transfers name, company, phone and email in one go. Considerably more reliable than typing a card up later."
				},
				{
					title: "Making print measurable",
					text: "Point the code at a link carrying UTM parameters and your analytics will show how many visitors genuinely came from the printed piece."
				},
				{
					title: "Forms on a vehicle or a building site",
					text: "A sticker with a code leads straight to the damage, handover or contact form, without anyone needing to know the address."
				}
			],
			steps: [
				{
					title: "Choose the kind of code",
					description: "Decide between a URL or free text, Wi-Fi access, and contact details. The input fields below change to match that choice."
				},
				{
					title: "Enter the content",
					description: "Fill in the destination — for a website, complete with https://. Wi-Fi adds the network name and password; a vCard adds name, company, phone and email."
				},
				{
					title: "Adjust the colours",
					description: "Foreground and background can be matched to your own look. Keep a clear difference between the two: a code that is too light will not be recognised by many cameras."
				},
				{
					title: "Test it, then download",
					description: "Scan the code once with your own phone before sending it to print. Then save it as a PNG for paper, or as an SVG for layouts that scale."
				}
			],
			privacy: "The code is created entirely in your browser. Neither the destination address nor your Wi-Fi password or contact details are sent to a server or stored anywhere — the tool has no counterpart to send anything to. You can disconnect from the network after the page has loaded and carry on working. With a Wi-Fi password that is not an academic distinction: many online generators send exactly that input to their server to produce the image.",
			faq: [
				{
					q: "Does the QR code expire?",
					a: "No. The code contains its destination directly and is not tied to a service that has to resolve it. It works for as long as the destination is reachable. That is also precisely why the destination cannot be changed afterwards."
				},
				{
					q: "PNG or SVG — which should I use?",
					a: "PNG for anything printed or placed at a fixed size. SVG when the code will be enlarged, for a poster or vehicle lettering: an SVG stays sharp at any size, while a PNG becomes ragged when scaled up."
				},
				{
					q: "How big does a printed QR code need to be?",
					a: "A rule of thumb is one tenth of the reading distance: scanning from one metre away needs roughly ten centimetres of edge length. Also leave a white margin several modules wide — without that quiet zone many cameras will not find the code at all."
				},
				{
					q: "Why is my code not being recognised?",
					a: "Usually it is the contrast or the missing margin. The foreground has to be clearly darker than the background; many cameras will not read an inverted code. Very long content also makes the pattern finer and harder to read — shorten the address where you can."
				},
				{
					q: "Can I create codes for clients with this?",
					a: "Yes, the tool is free and needs no sign-up, commercial use included. If you regularly need many codes, or want to generate them from your own data, that can be automated — get in touch."
				}
			],
			related: ["utm-link-generator", "bild-komprimieren"]
		}
	},
	"passwort-generator": {
		de: {
			intro: [
				"Die meisten Passwörter in kleinen Betrieben sind gewachsen, nicht gewählt: der Firmenname mit einer Jahreszahl, der Ort mit einem Ausrufezeichen, ein Muster, das sich auf der Tastatur gut anfühlt. Angriffe raten heute aber nicht Zeichen für Zeichen, sondern probieren Listen aus geleakten Passwörtern und ihre naheliegenden Abwandlungen durch. Gegen diese Listen hilft nur eines: ein Passwort, das niemand gewählt hat, sondern der Zufall.",
				"Dieser Generator erzeugt genau solche Passwörter. Länge und Zeichenauswahl — Großbuchstaben, Kleinbuchstaben, Ziffern, Sonderzeichen — stellen Sie selbst ein, und eine Anzeige schätzt die Stärke des Ergebnisses ein. Auf Wunsch bleiben leicht verwechselbare Zeichen wie große i, kleine L, Null und großes O außen vor: sinnvoll überall dort, wo ein Passwort auch einmal vorgelesen oder abgeschrieben werden muss.",
				"Zur Einordnung: Länge wirkt stärker als Sonderzeichen. Ein zwanzig Zeichen langes Passwort aus Buchstaben und Ziffern ist erheblich schwerer zu brechen als ein achtstelliges mit drei Sonderzeichen — und Sie müssen sich ohnehin keines von beiden merken, wenn Sie einen Passwortmanager verwenden."
			],
			useCases: [
				{
					title: "Zugänge für neue Mitarbeitende",
					text: "Ein zufälliges Erstpasswort, das beim ersten Anmelden geändert wird, statt eines Schemas, das nach dem dritten Mal jeder kennt."
				},
				{
					title: "Router, Kasse, Netzwerkdrucker",
					text: "Geräte, deren Werkspasswort im Handbuch steht und im Internet auffindbar ist. Hier ohne verwechselbare Zeichen erzeugen — es wird abgetippt."
				},
				{
					title: "Gäste-WLAN mit eigenem Passwort",
					text: "Ein langes Zufallspasswort für das Gastnetz, getrennt vom Betriebsnetz. Zusammen mit einem QR-Code muss es niemand eingeben."
				},
				{
					title: "Datenbank- und Dienstzugänge",
					text: "Zugangsdaten, die nur Software benutzt, sollten maximal lang und zufällig sein — sie werden ohnehin nie von Hand eingegeben."
				},
				{
					title: "Verschlüsselte Archive und Sicherungen",
					text: "Ein starkes Passwort für Backups ist die letzte Verteidigungslinie, wenn eine Festplatte oder ein Stick verloren geht."
				}
			],
			steps: [
				{
					title: "Länge festlegen",
					description: "Stellen Sie die gewünschte Länge über den Schieberegler ein. Für Zugänge, die ein Mensch tippt, sind sechzehn Zeichen ein guter Ausgangspunkt; für alles, was in einem Passwortmanager liegt, dürfen es deutlich mehr sein."
				},
				{
					title: "Zeichenarten auswählen",
					description: "Aktivieren Sie Großbuchstaben, Kleinbuchstaben, Ziffern und Sonderzeichen nach Bedarf. Manche Systeme verbieten bestimmte Sonderzeichen — dann schalten Sie sie hier ab, statt das Ergebnis hinterher von Hand zu verändern."
				},
				{
					title: "Verwechselbare Zeichen ausschließen",
					description: "Wenn das Passwort vorgelesen, abgeschrieben oder ausgedruckt wird, blenden Sie große i, kleine L, Null und großes O aus. Das kostet etwas Stärke und erspart die Rückfrage, ob das nun eine Eins oder ein L war."
				},
				{
					title: "Erzeugen, prüfen, übernehmen",
					description: "Lassen Sie sich ein neues Passwort erzeugen, achten Sie auf die Stärkeanzeige und kopieren Sie es direkt in Ihren Passwortmanager. Legen Sie es dort ab, bevor Sie die Seite schließen — das Werkzeug speichert nichts."
				}
			],
			privacy: "Das Passwort entsteht in Ihrem Browser über den kryptografischen Zufallsgenerator des Systems und verlässt Ihr Gerät nicht. Es wird nicht übertragen, nicht protokolliert und nirgends zwischengespeichert; nach dem Schließen der Seite ist es weg. Bei einem Passwortgenerator ist das der entscheidende Punkt — ein Dienst, der das Passwort auf seinem Server erzeugt, kennt es, und Sie können nicht überprüfen, was er damit tut.",
			faq: [
				{
					q: "Wie lang sollte ein Passwort sein?",
					a: "Für Zugänge, die ein Mensch eingibt, sind sechzehn zufällige Zeichen eine gute Untergrenze. Für Zugänge, die nur Software verwendet, spricht nichts gegen dreißig oder mehr. Länge bringt mehr Sicherheit als exotische Sonderzeichen."
				},
				{
					q: "Ist der Zufall hier wirklich zufällig?",
					a: "Das Werkzeug nutzt die Schnittstelle crypto.getRandomValues des Browsers, also den kryptografisch sicheren Zufallsgenerator des Betriebssystems. Das ist derselbe Mechanismus, auf dem auch die Verschlüsselung Ihrer Verbindungen aufbaut — kein simpler Zufall wie bei Math.random."
				},
				{
					q: "Muss ich Passwörter regelmäßig wechseln?",
					a: "Nach heutiger Empfehlung des BSI nicht mehr routinemäßig. Ein starkes, einzigartiges Passwort bleibt so lange gültig, bis es Anlass zur Sorge gibt — etwa nach einem bekannt gewordenen Datenleck. Erzwungene Wechsel führen erfahrungsgemäß zu schwächeren Passwörtern mit hochgezählter Endziffer."
				},
				{
					q: "Wie merke ich mir solche Passwörter?",
					a: "Gar nicht. Nutzen Sie einen Passwortmanager und merken Sie sich genau ein starkes Hauptpasswort. Alles andere liegt verschlüsselt im Manager und wird beim Anmelden eingesetzt."
				},
				{
					q: "Kann ich das Werkzeug im Betrieb einsetzen?",
					a: "Ja, es ist kostenlos, ohne Anmeldung nutzbar und läuft lokal — es gibt keine Übertragung, die eine betriebliche Richtlinie verletzen könnte. Wenn Sie Zugänge für mehrere Personen strukturiert verwalten wollen, ist ein Passwortmanager der nächste Schritt."
				}
			],
			related: ["qr-code-generator", "json-formatter"]
		},
		en: {
			intro: [
				"Most passwords in a small business have grown rather than been chosen: the company name with a year, the town with an exclamation mark, a pattern that feels good on the keyboard. Attacks today do not guess character by character, though — they work through lists of leaked passwords and their obvious variations. There is only one defence against those lists: a password nobody chose, but chance produced.",
				"This generator produces exactly that kind of password. You set the length and the character sets — upper case, lower case, digits, symbols — and a meter estimates the strength of the result. Optionally, easily confused characters such as capital i, lower-case L, zero and capital O are left out: worth doing wherever a password will be read aloud or copied by hand.",
				"For perspective: length does more than symbols do. A twenty-character password of letters and digits is considerably harder to break than an eight-character one with three symbols — and you need to memorise neither of them if you use a password manager."
			],
			useCases: [
				{
					title: "Accounts for new staff",
					text: "A random first password that gets changed at first sign-in, instead of a scheme everyone recognises after the third time."
				},
				{
					title: "Router, till, network printer",
					text: "Devices whose factory password is printed in the manual and findable online. Generate these without ambiguous characters — they get typed by hand."
				},
				{
					title: "Guest Wi-Fi with its own password",
					text: "A long random password for the guest network, separate from the business one. Paired with a QR code, nobody has to enter it at all."
				},
				{
					title: "Database and service accounts",
					text: "Credentials only software ever uses should be as long and as random as possible — they are never typed by a person anyway."
				},
				{
					title: "Encrypted archives and backups",
					text: "A strong password on a backup is the last line of defence when a drive or a stick goes missing."
				}
			],
			steps: [
				{
					title: "Set the length",
					description: "Use the slider to choose the length. For accounts a human types, sixteen characters is a good starting point; for anything living in a password manager, considerably more is fine."
				},
				{
					title: "Pick the character sets",
					description: "Enable upper case, lower case, digits and symbols as needed. Some systems forbid particular symbols — switch them off here rather than editing the result by hand afterwards."
				},
				{
					title: "Exclude ambiguous characters",
					description: "If the password will be read aloud, copied down or printed, hide capital i, lower-case L, zero and capital O. It costs a little strength and saves the question of whether that was a one or an L."
				},
				{
					title: "Generate, check, store",
					description: "Generate a password, watch the strength meter, and copy it straight into your password manager. Store it there before you close the page — the tool keeps nothing."
				}
			],
			privacy: "The password is created in your browser using the operating system's cryptographic random generator, and it does not leave your device. It is not transmitted, not logged and not cached anywhere; once you close the page it is gone. With a password generator that is the decisive point — a service that generates the password on its server knows it, and you have no way to check what it does with it.",
			faq: [
				{
					q: "How long should a password be?",
					a: "For accounts a person types, sixteen random characters is a sensible floor. For accounts only software uses, there is nothing against thirty or more. Length buys more security than exotic symbols do."
				},
				{
					q: "Is the randomness here genuinely random?",
					a: "The tool uses the browser's crypto.getRandomValues interface, which is the operating system's cryptographically secure random generator. That is the same mechanism your encrypted connections are built on — not the simple randomness of Math.random."
				},
				{
					q: "Should I change passwords regularly?",
					a: "By current guidance, not as a routine. A strong, unique password stays valid until there is a reason for concern — after a known breach, for instance. Forced rotation reliably produces weaker passwords with an incremented digit on the end."
				},
				{
					q: "How am I supposed to remember these?",
					a: "You are not. Use a password manager and memorise exactly one strong master password. Everything else lives encrypted in the manager and is filled in for you at sign-in."
				},
				{
					q: "Can I use this at work?",
					a: "Yes. It is free, needs no sign-up and runs locally, so there is no transmission that could breach a company policy. If you need to manage accounts for several people in a structured way, a password manager is the next step."
				}
			],
			related: ["qr-code-generator", "json-formatter"]
		}
	},
	"utm-link-generator": {
		de: {
			intro: [
				"Wer Werbung schaltet, einen Newsletter verschickt oder einen Flyer verteilt, sieht in der Website-Statistik hinterher meist nur eines: Es kamen Besucher. Woher genau, bleibt offen — und damit auch die Frage, welche Maßnahme sich gelohnt hat. UTM-Parameter lösen das, indem sie die Herkunft an den Link selbst hängen. Ihre Statistik liest sie aus und ordnet den Besuch der richtigen Quelle zu.",
				"Ein solcher Link sieht aus wie Ihre normale Adresse, ergänzt um Angaben wie utm_source, utm_medium und utm_campaign. Dieses Werkzeug baut ihn korrekt zusammen: Es kodiert Sonderzeichen, wandelt Ihre Eingaben in saubere Kleinschreibung ohne Leerzeichen um und zeigt den fertigen Link zum Kopieren an.",
				"Der Nutzen steht und fällt mit der Einheitlichkeit. Newsletter, newsletter und Newsletter-Mai sind für die Auswertung drei verschiedene Quellen, und niemand merkt es, bis der Bericht in fünf Zeilen zerfällt, die alle dasselbe meinen. Legen Sie sich einmal eine Schreibweise fest und halten Sie sich daran."
			],
			useCases: [
				{
					title: "Newsletter auswerten",
					text: "Ein eigener Link je Aussendung zeigt, welches Thema tatsächlich Klicks gebracht hat — und nicht nur, wer die Mail geöffnet hat."
				},
				{
					title: "Bezahlte Anzeigen trennen",
					text: "Getrennte Kennzeichnung je Plattform und Anzeige macht sichtbar, welches Motiv Besucher bringt und welches nur Budget verbraucht."
				},
				{
					title: "Print messbar machen",
					text: "Der Link hinter einem QR-Code auf Flyer, Plakat oder Fahrzeug macht aus Druckwerbung eine Maßnahme mit nachvollziehbarem Ergebnis."
				},
				{
					title: "Einträge in Verzeichnissen",
					text: "Branchenbücher, Kleinanzeigen und Kartendienste bekommen jeweils eigene Links — so sehen Sie, welcher Eintrag seinen Preis wert ist."
				},
				{
					title: "Social-Media-Profile",
					text: "Der Link im Profil bekommt eine eigene Kennzeichnung, getrennt von Links in einzelnen Beiträgen."
				}
			],
			steps: [
				{
					title: "Zieladresse eintragen",
					description: "Beginnen Sie mit der Seite, auf der die Besucher landen sollen — vollständig mit https:// und möglichst genau die passende Unterseite, nicht pauschal die Startseite."
				},
				{
					title: "Quelle und Medium angeben",
					description: "Die Quelle ist, wo der Link steht: newsletter, instagram, flyer. Das Medium ist die Art: email, social, print, cpc. Beide Felder sind das Minimum, damit eine Auswertung überhaupt etwas trennen kann."
				},
				{
					title: "Kampagne benennen",
					description: "Die Kampagne fasst eine Maßnahme zusammen, etwa fruehjahr-2026 oder tag-der-offenen-tuer. Verwenden Sie denselben Namen über alle Kanäle einer Aktion, sonst lässt sie sich später nicht als Ganzes auswerten."
				},
				{
					title: "Link kopieren und einsetzen",
					description: "Kopieren Sie den fertigen Link und verwenden Sie ihn überall dort, wo diese Quelle verlinkt. Prüfen Sie ihn einmal im Browser: Die Seite muss normal laden, die Parameter stehen sichtbar in der Adresszeile."
				}
			],
			privacy: "Der Link wird ausschließlich in Ihrem Browser zusammengesetzt; weder Zieladresse noch Kampagnenname werden übertragen oder gespeichert. Ein Hinweis zur Sache selbst: UTM-Parameter sind für Ihre Besucher sichtbar, sie stehen in der Adresszeile. Schreiben Sie deshalb nichts hinein, was nicht öffentlich sein soll — interne Kürzel, Budgetzahlen oder Kundennamen haben dort nichts verloren.",
			faq: [
				{
					q: "Welche Parameter brauche ich wirklich?",
					a: "utm_source und utm_medium sind das Minimum, utm_campaign kommt dazu, sobald Sie mehrere Aktionen unterscheiden wollen. utm_term und utm_content sind Feinheiten für Suchanzeigen und A/B-Tests und können in den meisten Fällen leer bleiben."
				},
				{
					q: "Schadet ein UTM-Link meinem SEO?",
					a: "Für Links, die auf Ihre eigene Seite zeigen und in Werbung, Newslettern oder auf Druckerzeugnissen stehen, ist das unkritisch. Verwenden Sie UTM-Parameter aber nicht für die interne Verlinkung innerhalb Ihrer Website — dort erzeugen sie mehrere Adressen für dieselbe Seite und stören die Auswertung."
				},
				{
					q: "Warum werden meine Eingaben kleingeschrieben?",
					a: "Weil Auswertungswerkzeuge Groß- und Kleinschreibung unterscheiden. Newsletter und newsletter erscheinen als zwei getrennte Quellen im Bericht. Das Werkzeug vereinheitlicht deshalb automatisch und ersetzt Leerzeichen durch Bindestriche."
				},
				{
					q: "Funktioniert das auch ohne Google Analytics?",
					a: "Ja. UTM-Parameter sind eine reine Konvention in der Adresse, kein Google-Produkt. Matomo, Plausible, Fathom und praktisch jede Server-Logauswertung verstehen sie ebenfalls."
				},
				{
					q: "Kann ich den Link kürzen?",
					a: "Ja, ein Kurzlink-Dienst oder eine eigene Weiterleitung behält die Parameter beim Weiterleiten bei. Für gedruckte Werbung ist das sinnvoll — dort steht ohnehin meist ein QR-Code, und dann spielt die Länge des Links keine Rolle mehr."
				}
			],
			related: ["qr-code-generator", "kontrast-checker"]
		},
		en: {
			intro: [
				"If you run ads, send a newsletter or hand out flyers, your website statistics afterwards usually tell you one thing: visitors arrived. Exactly where from stays open — and with it the question of which effort paid off. UTM parameters solve that by attaching the origin to the link itself. Your analytics reads them and files the visit under the right source.",
				"Such a link looks like your normal address, extended with values like utm_source, utm_medium and utm_campaign. This tool assembles it correctly: it encodes special characters, turns your input into clean lower case without spaces, and shows the finished link ready to copy.",
				"The value of all this stands or falls with consistency. Newsletter, newsletter and Newsletter-May are three different sources to a report, and nobody notices until it splits into five rows that all mean the same thing. Decide on one spelling and stick to it."
			],
			useCases: [
				{
					title: "Measuring a newsletter",
					text: "A separate link per send shows which subject actually produced clicks — not merely who opened the mail."
				},
				{
					title: "Separating paid ads",
					text: "Distinct tagging per platform and creative makes it visible which one brings visitors and which one only spends budget."
				},
				{
					title: "Making print measurable",
					text: "The link behind a QR code on a flyer, poster or vehicle turns printed advertising into something with a traceable result."
				},
				{
					title: "Directory listings",
					text: "Trade directories, classifieds and map services each get their own link — so you can see which listing is worth its price."
				},
				{
					title: "Social media profiles",
					text: "The link in a profile gets its own tagging, kept separate from links inside individual posts."
				}
			],
			steps: [
				{
					title: "Enter the destination",
					description: "Start with the page visitors should land on — complete with https://, and ideally the precise sub-page rather than the home page by default."
				},
				{
					title: "Give a source and a medium",
					description: "The source is where the link sits: newsletter, instagram, flyer. The medium is the kind: email, social, print, cpc. Both are the minimum for a report to separate anything at all."
				},
				{
					title: "Name the campaign",
					description: "The campaign groups one effort together, such as spring-2026 or open-day. Use the same name across every channel of one activity, or it cannot be evaluated as a whole later."
				},
				{
					title: "Copy the link and use it",
					description: "Copy the finished link and use it everywhere that source links to you. Try it once in a browser: the page must load normally, with the parameters visible in the address bar."
				}
			],
			privacy: "The link is assembled entirely in your browser; neither the destination nor the campaign name is transmitted or stored. A note about the thing itself: UTM parameters are visible to your visitors, sitting in plain view in the address bar. So do not put anything in them that should not be public — internal codes, budget figures or client names have no place there.",
			faq: [
				{
					q: "Which parameters do I actually need?",
					a: "utm_source and utm_medium are the minimum; utm_campaign joins them as soon as you want to tell several activities apart. utm_term and utm_content are refinements for search ads and A/B tests and can stay empty in most cases."
				},
				{
					q: "Do UTM links hurt my SEO?",
					a: "For links pointing at your own site from ads, newsletters or printed material this is not a concern. Do not use UTM parameters for internal links within your website, though — there they create several addresses for one page and muddle the reporting."
				},
				{
					q: "Why is my input converted to lower case?",
					a: "Because analytics tools distinguish upper and lower case. Newsletter and newsletter appear as two separate sources in the report. The tool therefore normalises automatically and replaces spaces with hyphens."
				},
				{
					q: "Does this work without Google Analytics?",
					a: "Yes. UTM parameters are a convention in the address, not a Google product. Matomo, Plausible, Fathom and practically any server log analysis understand them too."
				},
				{
					q: "Can I shorten the link?",
					a: "Yes — a link shortener or a redirect of your own preserves the parameters when forwarding. For printed advertising that makes sense; there a QR code usually carries the link anyway, at which point its length stops mattering."
				}
			],
			related: ["qr-code-generator", "kontrast-checker"]
		}
	},
	"json-formatter": {
		de: {
			intro: [
				"JSON ist das Format, in dem sich Programme heute Daten schicken: Schnittstellen antworten damit, Konfigurationsdateien sind darin geschrieben, Exporte aus Warenwirtschaft, Shop oder Buchhaltung liegen oft in dieser Form vor. Solange alles funktioniert, sieht man es nie. Man sieht es genau dann, wenn etwas klemmt — und dann meist als eine einzige, endlos lange Zeile ohne Umbrüche.",
				"Dieses Werkzeug macht daraus lesbaren Text: Es rückt die Struktur ein, prüft sie auf Gültigkeit und nennt bei einem Fehler die Stelle mit Zeile und Spalte, statt nur zu behaupten, irgendwo stimme etwas nicht. Umgekehrt minimiert es auch — entfernt also alle überflüssigen Leerzeichen, wenn die Daten wieder kompakt weitergegeben werden sollen.",
				"Für den Alltag heißt das: Sie können eine Schnittstellenantwort selbst ansehen, bevor Sie sie weitergeben, und eine abgelehnte Konfigurationsdatei prüfen, ohne zu raten. Häufigste Ursachen sind ein Komma hinter dem letzten Eintrag, einfache statt doppelte Anführungszeichen und eine Klammer, die nicht geschlossen wurde."
			],
			useCases: [
				{
					title: "Schnittstellenantwort lesbar machen",
					text: "Eine API-Antwort als eine Zeile ist für Menschen unbrauchbar. Eingerückt sehen Sie in Sekunden, welche Felder tatsächlich geliefert werden."
				},
				{
					title: "Abgelehnte Konfiguration prüfen",
					text: "Wenn ein Programm eine Datei nicht annimmt, zeigt die Prüfung die genaue Position des Syntaxfehlers statt einer allgemeinen Fehlermeldung."
				},
				{
					title: "Export vor dem Import kontrollieren",
					text: "Vor dem Einspielen in ein anderes System einmal ansehen, ob Struktur und Feldnamen dem entsprechen, was das Zielsystem erwartet."
				},
				{
					title: "Daten kompakt weitergeben",
					text: "Minimiertes JSON spart Platz und Übertragungszeit — sinnvoll überall dort, wo die Datei nicht von Menschen gelesen wird."
				},
				{
					title: "Fehler nachvollziehbar melden",
					text: "Ein eingerückter Ausschnitt mit markierter Fehlerstelle macht aus einer vagen Störungsmeldung eine, mit der sich arbeiten lässt."
				}
			],
			steps: [
				{
					title: "JSON einfügen",
					description: "Fügen Sie den Inhalt in das Eingabefeld ein — eine ganze Datei, eine Schnittstellenantwort oder auch nur den Ausschnitt, um den es geht."
				},
				{
					title: "Formatieren oder prüfen",
					description: "Das Formatieren rückt die Struktur ein und macht die Verschachtelung sichtbar. Ist der Inhalt ungültig, erscheint stattdessen die Fehlermeldung mit Position, Zeile und Spalte."
				},
				{
					title: "Fehlerstelle beheben",
					description: "Springen Sie an die genannte Stelle und prüfen Sie zuerst die üblichen Verdächtigen: ein Komma nach dem letzten Element, einfache Anführungszeichen, ein fehlendes Klammerpaar oder ein Zeilenumbruch mitten in einer Zeichenkette."
				},
				{
					title: "Ergebnis übernehmen",
					description: "Kopieren Sie das eingerückte Ergebnis zur Weiterverwendung — oder minimieren Sie es vorher, wenn es maschinell weiterverarbeitet wird."
				}
			],
			privacy: "Die Verarbeitung findet vollständig in Ihrem Browser statt; der eingefügte Inhalt wird nicht übertragen, nicht gespeichert und nicht protokolliert. Das ist bei diesem Werkzeug mehr als eine Formalie: In JSON-Daten stehen regelmäßig Kundendaten, Bestellungen, Zugangsschlüssel oder Preise. Wer solche Inhalte in ein beliebiges Online-Formular einfügt, gibt sie aus der Hand — hier verlassen sie das Gerät nicht.",
			faq: [
				{
					q: "Werden meine Daten hochgeladen?",
					a: "Nein. Das Formatieren und Prüfen läuft als JavaScript in Ihrem Browser. Es gibt keinen Server, der den Inhalt entgegennimmt — Sie können die Seite nach dem Laden vom Netz trennen und weiterarbeiten."
				},
				{
					q: "Was bedeutet die Fehlermeldung mit Position?",
					a: "Die Position ist die Zeichenanzahl vom Anfang des Textes, Zeile und Spalte rechnen das in eine Stelle im Text um. Der Fehler liegt in aller Regel unmittelbar davor: Ein Zeichen, das an dieser Stelle nicht erwartet wurde, ist meist die Folge eines vergessenen Kommas oder einer offenen Klammer weiter oben."
				},
				{
					q: "Warum ist mein JSON ungültig, obwohl es richtig aussieht?",
					a: "Die drei häufigsten Ursachen sind ein Komma hinter dem letzten Element einer Liste, einfache statt doppelter Anführungszeichen und Kommentare. Alle drei sind in JavaScript erlaubt, in JSON aber nicht."
				},
				{
					q: "Kann ich sehr große Dateien verarbeiten?",
					a: "Bis in den Bereich einiger Megabyte arbeitet das Werkzeug problemlos. Weil alles im Browser läuft, ist die Grenze der Arbeitsspeicher Ihres Geräts — bei sehr großen Exporten wird die Seite langsam, statt eine Fehlermeldung zu zeigen."
				},
				{
					q: "Verändert das Formatieren meine Daten?",
					a: "Nein, nur die Darstellung. Einrückungen und Zeilenumbrüche sind in JSON bedeutungslos; Werte, Reihenfolge und Struktur bleiben unangetastet."
				}
			],
			related: ["kontrast-checker", "passwort-generator"]
		},
		en: {
			intro: [
				"JSON is the format programs use to send each other data today: interfaces answer in it, configuration files are written in it, and exports from inventory, shop or accounting systems often arrive in this shape. As long as everything works, you never see it. You see it precisely when something jams — and then usually as one endless line with no breaks in it.",
				"This tool turns that into readable text: it indents the structure, checks that it is valid, and on an error names the spot with a line and a column instead of merely claiming something is wrong somewhere. It also does the reverse — stripping every unnecessary space when the data needs to go back out compactly.",
				"In practice that means you can inspect an interface response yourself before passing it on, and check a rejected configuration file without guessing. The most common causes are a comma after the last entry, single instead of double quotes, and a bracket that was never closed."
			],
			useCases: [
				{
					title: "Making an API response readable",
					text: "An API response as a single line is useless to a human. Indented, you can see in seconds which fields are actually being delivered."
				},
				{
					title: "Checking a rejected configuration",
					text: "When a program refuses a file, the validation shows the exact position of the syntax error rather than a generic complaint."
				},
				{
					title: "Inspecting an export before importing it",
					text: "Before loading data into another system, check whether the structure and field names match what the target expects."
				},
				{
					title: "Passing data on compactly",
					text: "Minified JSON saves space and transfer time — worth doing wherever the file is not read by people."
				},
				{
					title: "Reporting an error usefully",
					text: "An indented excerpt with the failing position marked turns a vague fault report into one somebody can work with."
				}
			],
			steps: [
				{
					title: "Paste the JSON",
					description: "Drop the content into the input field — a whole file, an interface response, or just the excerpt you are asking about."
				},
				{
					title: "Format or validate",
					description: "Formatting indents the structure and makes the nesting visible. If the content is invalid, the error message appears instead, with the position, line and column."
				},
				{
					title: "Fix the failing spot",
					description: "Jump to the position named and check the usual suspects first: a comma after the last element, single quotes, a missing pair of brackets, or a line break in the middle of a string."
				},
				{
					title: "Take the result",
					description: "Copy the indented output for onward use — or minify it first if it is going to be processed by a machine."
				}
			],
			privacy: "Processing happens entirely in your browser; the content you paste is not transmitted, not stored and not logged. With this tool that is more than a formality: JSON data regularly contains customer records, orders, access keys or prices. Pasting that into an arbitrary online form gives it away — here it never leaves your device.",
			faq: [
				{
					q: "Is my data uploaded?",
					a: "No. Formatting and validation run as JavaScript in your browser. There is no server that receives the content — you can disconnect from the network after the page loads and keep working."
				},
				{
					q: "What does the error position mean?",
					a: "The position is the character count from the start of the text, and the line and column translate that into a spot you can find. The fault is almost always immediately before it: a character that was not expected there is usually the consequence of a forgotten comma or an open bracket further up."
				},
				{
					q: "Why is my JSON invalid when it looks fine?",
					a: "The three most common causes are a comma after the last element of a list, single instead of double quotes, and comments. All three are legal in JavaScript and none of them are in JSON."
				},
				{
					q: "Can I process very large files?",
					a: "Up to the low megabytes the tool handles it comfortably. Because everything runs in the browser, the limit is your device's memory — with very large exports the page slows down rather than showing an error."
				},
				{
					q: "Does formatting change my data?",
					a: "No, only the presentation. Indentation and line breaks carry no meaning in JSON; values, order and structure are left untouched."
				}
			],
			related: ["kontrast-checker", "passwort-generator"]
		}
	},
	"kontrast-checker": {
		de: {
			intro: [
				"Ob Text lesbar ist, entscheidet nicht der Geschmack, sondern der Unterschied zwischen Schrift- und Hintergrundhelligkeit. Die Web-Richtlinien für Barrierefreiheit drücken ihn als Verhältnis aus: 1:1 bedeutet identische Farben, 21:1 ist Schwarz auf Weiß. Ab 4,5:1 gilt normaler Text als ausreichend lesbar, große Schrift ab 3:1 — das ist die Stufe AA. Wer strenger sein will, zielt auf AAA mit 7:1.",
				"Dieses Werkzeug rechnet das Verhältnis für ein Farbpaar aus und sagt Ihnen unmittelbar, welche Stufen bestanden sind: AA und AAA, jeweils für normale und für große Schrift. Sie geben die beiden Farben als Hex-Wert ein oder wählen sie über die Farbfelder.",
				"Der praktische Nutzen liegt weniger in der Note als in der Korrektur: Fast jedes Corporate-Grau auf Weiß scheitert knapp, und fast immer reicht es, die Schrift eine Spur dunkler zu ziehen, statt die Gestaltung umzuwerfen. Wichtig ist außerdem, was oft vergessen wird — geprüft wird jede Kombination, die tatsächlich vorkommt: heller Text auf einem Farbbutton, Text auf einem Bild, der Hinweistext in einem Formularfeld."
			],
			useCases: [
				{
					title: "Neue Website vor dem Start prüfen",
					text: "Fließtext, Überschriften, Links und Buttons einmal durchgehen, bevor die Seite live geht — später ist jede Änderung teurer."
				},
				{
					title: "Farben aus dem Logo übernehmen",
					text: "Eine Markenfarbe, die im Logo gut aussieht, ist als Schriftfarbe oft zu hell. Die Prüfung zeigt, ob eine dunklere Variante nötig ist."
				},
				{
					title: "Buttons und Hinweise kontrollieren",
					text: "Weiße Schrift auf einem Aktionsbutton ist der häufigste stille Durchfaller — der Button fällt auf, der Text darauf ist trotzdem schwer lesbar."
				},
				{
					title: "Öffentliche Aufträge vorbereiten",
					text: "Für Websites öffentlicher Stellen ist Barrierefreiheit in Deutschland verbindlich. Die Kontrastprüfung ist einer der ersten Punkte jeder Abnahme."
				},
				{
					title: "Dunkles Design gegenprüfen",
					text: "Helle Schrift auf dunklem Grund verhält sich anders als umgekehrt. Beide Varianten einer Seite gehören getrennt geprüft."
				}
			],
			steps: [
				{
					title: "Textfarbe eintragen",
					description: "Geben Sie die Schriftfarbe als Hex-Wert ein oder wählen Sie sie über das Farbfeld. Kurzformen wie #fff werden ebenso verstanden wie die lange Schreibweise."
				},
				{
					title: "Hintergrundfarbe eintragen",
					description: "Entscheidend ist die Farbe, die im fertigen Layout tatsächlich hinter dem Text liegt — also die Fläche der Karte oder des Buttons, nicht die Seitenfarbe dahinter."
				},
				{
					title: "Ergebnis ablesen",
					description: "Das Verhältnis erscheint zusammen mit vier Bewertungen: AA und AAA, jeweils für normale und große Schrift. Groß bedeutet ab 18,66 Pixel fett oder ab 24 Pixel regulär."
				},
				{
					title: "Nachjustieren",
					description: "Reicht es nicht, verändern Sie zuerst die Helligkeit der Schriftfarbe und lassen den Farbton stehen — so bleibt der Markeneindruck erhalten und der Text wird trotzdem lesbar."
				}
			],
			privacy: "Die Berechnung läuft vollständig in Ihrem Browser; es werden keine Farbwerte übertragen oder gespeichert. Das Werkzeug prüft ausschließlich das Kontrastverhältnis nach WCAG 2.1 — es ist damit ein Baustein der Barrierefreiheit, nicht deren Nachweis. Tastaturbedienbarkeit, sinnvolle Alternativtexte, Formularbeschriftungen und eine schlüssige Überschriftenstruktur gehören ebenso dazu.",
			faq: [
				{
					q: "Was ist der Unterschied zwischen AA und AAA?",
					a: "AA verlangt 4,5:1 für normalen und 3:1 für großen Text und ist die Stufe, auf die in der Praxis abgezielt wird. AAA verlangt 7:1 beziehungsweise 4,5:1. AAA ist für längere Fließtexte anspruchsvoll und wird meist nur dort verlangt, wo eine besonders breite Leserschaft erreicht werden muss."
				},
				{
					q: "Ab wann gilt Schrift als groß?",
					a: "Ab 18,66 Pixel in Fettschrift oder ab 24 Pixel in normaler Stärke — das entspricht etwa 14 beziehungsweise 18 Punkt. Darunter gilt die strengere Anforderung für normalen Text."
				},
				{
					q: "Gilt das auch für Logos und Bilder?",
					a: "Für reine Logos nicht, die sind ausgenommen. Text, der als Teil eines Bildes gesetzt ist, muss die Anforderung dagegen erfüllen — und Bedienelemente sowie Grafiken, die Information tragen, brauchen mindestens 3:1 gegenüber ihrer Umgebung."
				},
				{
					q: "Mein Grau scheitert knapp. Was tun?",
					a: "Ziehen Sie die Helligkeit der Schriftfarbe herunter und lassen Sie den Farbton unverändert. In den meisten Fällen genügen wenige Prozent, um von 4,1:1 auf über 4,5:1 zu kommen, ohne dass sich der Gesamteindruck sichtbar ändert."
				},
				{
					q: "Muss meine Website barrierefrei sein?",
					a: "Für öffentliche Stellen ist es in Deutschland verbindlich. Seit Juni 2025 gelten über das Barrierefreiheitsstärkungsgesetz zudem Anforderungen für viele privatwirtschaftliche Online-Angebote, etwa im Onlinehandel; Kleinstunternehmen sind teilweise ausgenommen. Unabhängig von der Pflicht gilt: Lesbarer Text nutzt allen, auch bei Sonnenlicht auf dem Telefon."
				}
			],
			related: [
				"json-formatter",
				"bild-komprimieren",
				"barrierefreiheitserklaerung-generator"
			]
		},
		en: {
			intro: [
				"Whether text is readable is not decided by taste but by the difference in brightness between the type and its background. The web accessibility guidelines express that as a ratio: 1:1 means identical colours, 21:1 is black on white. From 4.5:1 normal text counts as sufficiently readable, large type from 3:1 — that is level AA. If you want to be stricter, aim for AAA at 7:1.",
				"This tool calculates the ratio for a pair of colours and tells you straight away which levels pass: AA and AAA, each for normal and for large text. Enter the two colours as hex values or pick them from the colour fields.",
				"The practical value lies less in the grade than in the correction: almost every corporate grey on white fails narrowly, and almost always it is enough to pull the type a shade darker rather than rework the design. What is often forgotten matters too — every combination that actually occurs needs checking: light text on a coloured button, text over an image, the hint text inside a form field."
			],
			useCases: [
				{
					title: "Checking a new website before launch",
					text: "Walk through body text, headings, links and buttons once before the site goes live — afterwards every change costs more."
				},
				{
					title: "Reusing colours from the logo",
					text: "A brand colour that looks right in a logo is often too light as type. The check shows whether a darker variant is needed."
				},
				{
					title: "Testing buttons and notices",
					text: "White type on an action button is the most common silent failure — the button stands out, the text on it is still hard to read."
				},
				{
					title: "Preparing for public-sector work",
					text: "Accessibility is binding for public bodies' websites. A contrast check is one of the first items in any acceptance review."
				},
				{
					title: "Verifying a dark design",
					text: "Light type on a dark ground behaves differently from the reverse. Both variants of a page deserve to be checked separately."
				}
			],
			steps: [
				{
					title: "Enter the text colour",
					description: "Give the type colour as a hex value or pick it from the colour field. Short forms such as #fff are understood as well as the long notation."
				},
				{
					title: "Enter the background colour",
					description: "What matters is the colour that genuinely sits behind the text in the finished layout — the surface of the card or the button, not the page colour behind that."
				},
				{
					title: "Read the result",
					description: "The ratio appears together with four verdicts: AA and AAA, each for normal and large text. Large means from 18.66 pixels bold or from 24 pixels regular."
				},
				{
					title: "Adjust",
					description: "If it falls short, change the brightness of the type colour first and leave the hue alone — the brand impression survives and the text becomes readable anyway."
				}
			],
			privacy: "The calculation runs entirely in your browser; no colour values are transmitted or stored. The tool checks the contrast ratio under WCAG 2.1 and nothing else — it is one building block of accessibility, not a certificate of it. Keyboard operability, meaningful alternative texts, labelled form fields and a coherent heading structure all belong to it as well.",
			faq: [
				{
					q: "What is the difference between AA and AAA?",
					a: "AA requires 4.5:1 for normal and 3:1 for large text, and is the level aimed at in practice. AAA requires 7:1 and 4.5:1 respectively. AAA is demanding for longer body text and is usually only required where a particularly broad readership must be reached."
				},
				{
					q: "When does type count as large?",
					a: "From 18.66 pixels in bold or from 24 pixels at normal weight — roughly 14 and 18 point. Below that the stricter requirement for normal text applies."
				},
				{
					q: "Does this apply to logos and images?",
					a: "Not to logos as such, which are exempt. Text set as part of an image does have to meet the requirement — and interface controls and graphics that carry information need at least 3:1 against their surroundings."
				},
				{
					q: "My grey fails narrowly. What now?",
					a: "Reduce the brightness of the type colour and leave the hue unchanged. In most cases a few per cent is enough to move from 4.1:1 to over 4.5:1 without the overall impression visibly changing."
				},
				{
					q: "Does my website have to be accessible?",
					a: "For public bodies in Germany it is binding. Since June 2025 the Barrierefreiheitsstärkungsgesetz has also imposed requirements on many private online offerings, in online retail for instance; micro-enterprises are partly exempt. Regardless of obligation: readable text helps everyone, including in sunlight on a phone."
				}
			],
			related: [
				"json-formatter",
				"bild-komprimieren",
				"barrierefreiheitserklaerung-generator"
			]
		}
	},
	"bild-komprimieren": {
		de: {
			intro: [
				"Bilder aus einer Handy- oder Systemkamera sind für das Web unnötig groß: vier bis zwölf Megabyte, mehrere tausend Pixel breit. Auf einer Website wird davon meist ein Ausschnitt von tausend Pixeln angezeigt — der Rest wird übertragen, bezahlt und dann verworfen. Auf dem Telefon im Mobilfunknetz entscheidet das darüber, ob eine Seite in einer oder in acht Sekunden steht.",
				"Dieses Werkzeug verkleinert Bilder auf eine Zielbreite und komprimiert sie mit einstellbarer Qualität. Es zeigt die neue Dateigröße im Vergleich zur alten und gibt das Ergebnis als JPEG oder WebP aus. WebP ist dabei in aller Regel die bessere Wahl: gleiche sichtbare Qualität bei spürbar kleinerer Datei, und alle aktuellen Browser verstehen es.",
				"Eine sinnvolle Faustregel für den Alltag: Zielbreite 1600 Pixel für großflächige Bilder, 800 für Bilder in Textbreite, Qualität um 80 Prozent. Damit landen die meisten Fotos zwischen 60 und 200 Kilobyte — statt bei acht Megabyte — ohne dass ein Unterschied auffällt."
			],
			useCases: [
				{
					title: "Bilder für die eigene Website",
					text: "Produktfotos, Referenzbilder und Teamfotos vor dem Hochladen verkleinern. Der schnellste Hebel für eine schnellere Seite."
				},
				{
					title: "Anhänge, die durch das Postfach passen",
					text: "Viele Postfächer nehmen Anhänge nur bis zu einer bestimmten Größe an. Fünf komprimierte Fotos passen, wo zwei Originale scheitern."
				},
				{
					title: "Fotos für Kleinanzeigen und Portale",
					text: "Verkaufsportale rechnen Bilder ohnehin herunter — oft schlechter als nötig. Wer selbst verkleinert, behält die Kontrolle über das Ergebnis."
				},
				{
					title: "Dokumentation aus dem Betrieb",
					text: "Aufmaß-, Schadens- und Baufortschrittsfotos summieren sich schnell auf Gigabyte. Komprimiert bleiben sie lesbar und das Archiv handhabbar."
				},
				{
					title: "Bilder für Newsletter",
					text: "Große Bilder in E-Mails werden von manchen Programmen gar nicht erst geladen und verlängern die Ladezeit auf dem Telefon deutlich."
				}
			],
			steps: [
				{
					title: "Bild auswählen",
					description: "Wählen Sie eine Datei im Format JPG, PNG oder WebP. Die Vorschau und die ursprüngliche Dateigröße erscheinen sofort."
				},
				{
					title: "Zielbreite festlegen",
					description: "Geben Sie an, wie breit das Bild höchstens werden soll. Die Höhe wird im Seitenverhältnis mitgerechnet. Für die Anzeige im Web sind 1600 Pixel bei großen Bildern und 800 Pixel innerhalb von Text gute Werte."
				},
				{
					title: "Qualität einstellen",
					description: "Zwischen 70 und 85 Prozent liegt der brauchbare Bereich; darunter werden Kanten und Flächen sichtbar unruhig. Die Wirkung sehen Sie unmittelbar an der neuen Dateigröße."
				},
				{
					title: "Herunterladen",
					description: "Speichern Sie das Ergebnis als JPEG oder WebP. Bei Fotos ist WebP fast immer kleiner; für Grafiken mit harten Kanten oder Transparenz ist es ebenfalls die bessere Wahl."
				}
			],
			privacy: "Das Bild wird nicht hochgeladen. Es wird im Browser über ein Canvas-Element neu gezeichnet und dort komprimiert — die Datei verlässt Ihr Gerät zu keinem Zeitpunkt. Das ist der eigentliche Unterschied zu den verbreiteten Kompressionsdiensten: Dort landen Ihre Fotos auf einem fremden Server, was bei Baustellen-, Schadens- oder Personenaufnahmen nicht nur eine Geschmacksfrage ist, sondern eine datenschutzrechtliche.",
			faq: [
				{
					q: "Verliert das Bild sichtbar an Qualität?",
					a: "Bei 80 Prozent Qualität sehen die wenigsten Betrachter einen Unterschied zum Original, während die Datei um ein Vielfaches kleiner wird. Deutlich sichtbar wird die Kompression meist erst unterhalb von 60 Prozent, zuerst an weichen Farbverläufen wie einem Himmel."
				},
				{
					q: "JPEG oder WebP?",
					a: "WebP, sofern das Zielsystem es annimmt: gleiche wahrgenommene Qualität bei etwa 25 bis 35 Prozent weniger Daten, dazu Transparenz. JPEG bleibt die sichere Wahl für ältere Programme und für Portale, die nur dieses Format akzeptieren."
				},
				{
					q: "Werden meine Bilder auf einen Server geladen?",
					a: "Nein. Die gesamte Verarbeitung findet in Ihrem Browser statt; es gibt keine Gegenstelle, die die Datei entgegennehmen könnte. Sie können die Seite nach dem Laden vom Netz trennen und weiterarbeiten."
				},
				{
					q: "Bleiben Aufnahmedatum und Ort erhalten?",
					a: "Nein. Beim Neuzeichnen im Browser gehen die EXIF-Daten verloren, also auch GPS-Koordinaten und Kameramodell. Für Bilder im Internet ist das ein Vorteil — wenn Sie die Angaben brauchen, bewahren Sie das Original auf."
				},
				{
					q: "Kann ich mehrere Bilder auf einmal verarbeiten?",
					a: "Das Werkzeug arbeitet Bild für Bild. Wenn bei Ihnen regelmäßig ganze Ordner anfallen — etwa aus der Baustellendokumentation —, lässt sich das automatisieren, statt es von Hand zu wiederholen."
				}
			],
			related: [
				"pdf-werkzeuge",
				"qr-code-generator",
				"ki-kennzeichnung-bilder"
			]
		},
		en: {
			intro: [
				"Photos out of a phone or system camera are needlessly large for the web: four to twelve megabytes, several thousand pixels wide. A website usually displays a thousand-pixel crop of that — the rest is transferred, paid for and then discarded. On a phone over mobile data, that is the difference between a page appearing in one second and in eight.",
				"This tool scales images down to a target width and compresses them at an adjustable quality. It shows the new file size next to the old one and outputs the result as JPEG or WebP. WebP is usually the better choice: the same apparent quality at a noticeably smaller file, and every current browser understands it.",
				"A workable rule of thumb: a target width of 1600 pixels for full-width images, 800 for images inside text, and quality around 80 per cent. That puts most photos between 60 and 200 kilobytes — instead of eight megabytes — without any visible difference."
			],
			useCases: [
				{
					title: "Images for your own website",
					text: "Shrink product, reference and team photos before uploading. The single fastest lever for a faster site."
				},
				{
					title: "Attachments that fit through a mailbox",
					text: "Many mailboxes only accept attachments up to a certain size. Five compressed photos fit where two originals fail."
				},
				{
					title: "Photos for classifieds and portals",
					text: "Selling portals downscale images anyway — often worse than necessary. Doing it yourself keeps control of the result."
				},
				{
					title: "Documentation from the field",
					text: "Measurement, damage and progress photos add up to gigabytes quickly. Compressed they stay legible and the archive stays manageable."
				},
				{
					title: "Images for a newsletter",
					text: "Large images in email are not even loaded by some clients and noticeably lengthen the load on a phone."
				}
			],
			steps: [
				{
					title: "Choose an image",
					description: "Pick a file in JPG, PNG or WebP format. The preview and the original file size appear immediately."
				},
				{
					title: "Set the target width",
					description: "State how wide the image should be at most. The height follows the aspect ratio. For display on the web, 1600 pixels for large images and 800 pixels within text are good values."
				},
				{
					title: "Set the quality",
					description: "Between 70 and 85 per cent is the usable range; below that edges and flat areas become visibly restless. You can see the effect immediately in the new file size."
				},
				{
					title: "Download",
					description: "Save the result as JPEG or WebP. For photographs WebP is almost always smaller; for graphics with hard edges or transparency it is the better choice too."
				}
			],
			privacy: "The image is not uploaded. It is redrawn and compressed in your browser through a canvas element — the file never leaves your device at any point. That is the real difference from the widespread compression services: there your photos land on somebody else's server, which for site, damage or personal photographs is not a matter of taste but of data protection law.",
			faq: [
				{
					q: "Does the image visibly lose quality?",
					a: "At 80 per cent quality very few viewers see any difference from the original, while the file becomes several times smaller. Compression usually only becomes clearly visible below 60 per cent, first in soft gradients such as a sky."
				},
				{
					q: "JPEG or WebP?",
					a: "WebP, provided the target system accepts it: the same perceived quality at roughly 25 to 35 per cent fewer bytes, plus transparency. JPEG remains the safe choice for older software and for portals that only accept that format."
				},
				{
					q: "Are my images uploaded to a server?",
					a: "No. All processing happens in your browser; there is no counterpart that could receive the file. You can disconnect from the network after the page loads and keep working."
				},
				{
					q: "Are the capture date and location preserved?",
					a: "No. Redrawing in the browser discards the EXIF data, including GPS coordinates and camera model. For images destined for the internet that is an advantage — if you need the values, keep the original."
				},
				{
					q: "Can I process several images at once?",
					a: "The tool works one image at a time. If whole folders regularly come up for you — from site documentation, say — that can be automated rather than repeated by hand."
				}
			],
			related: [
				"pdf-werkzeuge",
				"qr-code-generator",
				"ki-kennzeichnung-bilder"
			]
		}
	},
	"pdf-werkzeuge": {
		de: {
			intro: [
				"PDF ist das Format, in dem Angebote, Rechnungen, Lieferscheine und Nachweise durch den Betrieb wandern. Genau deshalb fallen ständig kleine Handgriffe an: drei Scans zu einem Dokument zusammenfassen, aus einem zwanzigseitigen Vertrag die zwei relevanten Seiten herauslösen, eine quer eingezogene Seite geraderücken.",
				"Diese Werkzeuge erledigen genau das — zusammenführen, aufteilen und drehen. Beim Zusammenführen bestimmen Sie die Reihenfolge, beim Aufteilen geben Sie einen Seitenbereich wie 1-3,5 an, und das Drehen wirkt auf die gewählten Seiten. Das Ergebnis laden Sie unmittelbar als neue Datei herunter.",
				"Der übliche Weg für diese Aufgaben führt über einen der großen Online-Dienste — und damit über einen Upload. Bei einem Angebot mit Preisen, einer Rechnung mit Bankverbindung oder einer Personalakte ist das der Punkt, an dem es aufhört, eine reine Bequemlichkeitsfrage zu sein. Hier bleibt die Datei auf Ihrem Gerät."
			],
			useCases: [
				{
					title: "Scans zu einem Dokument bündeln",
					text: "Der Einzug liefert Seite für Seite eine eigene Datei. Zusammengeführt entsteht daraus ein Dokument, das sich versenden und ablegen lässt."
				},
				{
					title: "Nur die relevanten Seiten weitergeben",
					text: "Aus einem umfangreichen Vertrag oder Prüfbericht den Auszug lösen, der den Empfänger tatsächlich etwas angeht."
				},
				{
					title: "Quer eingezogene Seiten geraderücken",
					text: "Eine gedrehte Seite macht ein Dokument unlesbar und beim Ausdruck unbrauchbar. Drehen, speichern, fertig."
				},
				{
					title: "Angebot und Anlagen als eine Datei",
					text: "Anschreiben, Leistungsverzeichnis und Datenblätter in der richtigen Reihenfolge zusammenlegen, statt fünf Anhänge zu verschicken."
				},
				{
					title: "Unterlagen für die Buchhaltung",
					text: "Belege eines Vorgangs zu einer Datei zusammenfassen, bevor sie in die Ablage oder zur Steuerberatung gehen."
				}
			],
			steps: [
				{
					title: "Werkzeug wählen",
					description: "Entscheiden Sie zwischen Zusammenführen, Aufteilen und Drehen. Die Eingabefelder richten sich nach dieser Wahl."
				},
				{
					title: "Dateien auswählen",
					description: "Zum Zusammenführen wählen Sie mindestens zwei PDFs; die Reihenfolge der Auswahl ist die Reihenfolge im Ergebnis. Für das Aufteilen und Drehen genügt eine Datei."
				},
				{
					title: "Seitenbereich angeben",
					description: "Beim Aufteilen tragen Sie die gewünschten Seiten ein, etwa 1-3,5 für die ersten drei Seiten und die fünfte. Beim Drehen wählen Sie den Winkel für die betroffenen Seiten."
				},
				{
					title: "Ausführen und herunterladen",
					description: "Das Ergebnis wird im Browser erzeugt und sofort als neue Datei angeboten. Die Ausgangsdateien bleiben unverändert."
				}
			],
			privacy: "Die PDFs werden nicht hochgeladen. Sie werden im Browser gelesen und dort neu geschrieben; keine Seite und keine Datei verlässt Ihr Gerät. Bei Dokumenten aus dem Geschäftsbetrieb ist das der eigentliche Grund, dieses Werkzeug einem der großen Online-Dienste vorzuziehen: Wer ein Angebot, eine Rechnung oder eine Personalakte auf einen fremden Server lädt, verarbeitet damit personenbezogene oder vertrauliche Daten außerhalb des eigenen Hauses — mit allem, was daran hängt.",
			faq: [
				{
					q: "Werden meine Dokumente hochgeladen?",
					a: "Nein. Die Verarbeitung läuft vollständig im Browser; es gibt keinen Server, der die Datei entgegennimmt. Das gilt für alle drei Funktionen gleichermaßen."
				},
				{
					q: "Wie gebe ich einen Seitenbereich an?",
					a: "Einzelne Seiten trennen Sie mit Komma, zusammenhängende Bereiche mit Bindestrich. 1-3,5 bedeutet also die Seiten eins bis drei und zusätzlich die Seite fünf. Die Reihenfolge im Ergebnis entspricht der Reihenfolge im Original."
				},
				{
					q: "Bleibt die Qualität erhalten?",
					a: "Ja. Die Seiten werden übernommen, nicht neu gerendert — Text bleibt Text, eingebettete Schriften und Auflösung bleiben unverändert. Es findet keine Kompression statt."
				},
				{
					q: "Funktionieren passwortgeschützte PDFs?",
					a: "Verschlüsselte Dateien lassen sich nicht verarbeiten. Entfernen Sie den Schutz vorher im Programm, mit dem die Datei erstellt wurde, oder speichern Sie eine ungeschützte Fassung."
				},
				{
					q: "Warum ist dieses Werkzeug kostenpflichtig?",
					a: "Die frei zugänglichen Werkzeuge auf dieser Seite finanzieren sich über Werbung. Die PDF-Werkzeuge kommen ohne Werbung aus und sind stattdessen einmalig freizuschalten — bei Dokumenten aus dem Geschäftsbetrieb ist eine werbefreie, rein lokale Verarbeitung der ehrlichere Handel."
				}
			],
			related: ["pdf-wasserzeichen", "bild-komprimieren"]
		},
		en: {
			intro: [
				"PDF is the format in which quotes, invoices, delivery notes and certificates travel through a business. That is exactly why small jobs come up constantly: combining three scans into one document, pulling the two relevant pages out of a twenty-page contract, straightening a page that went through the feeder sideways.",
				"These tools do precisely that — merge, split and rotate. Merging lets you set the order, splitting takes a page range such as 1-3,5, and rotating applies to the pages you choose. You download the result immediately as a new file.",
				"The usual route for these jobs runs through one of the large online services, and therefore through an upload. With a quote carrying prices, an invoice carrying bank details or a personnel file, that is the point where it stops being a question of convenience. Here the file stays on your device."
			],
			useCases: [
				{
					title: "Bundling scans into one document",
					text: "The feeder produces a separate file per page. Merged, they become a document you can send and file."
				},
				{
					title: "Passing on only the relevant pages",
					text: "Pull the extract that actually concerns the recipient out of a lengthy contract or inspection report."
				},
				{
					title: "Straightening sideways pages",
					text: "A rotated page makes a document unreadable and useless in print. Rotate, save, done."
				},
				{
					title: "Quote and attachments as one file",
					text: "Put the cover letter, the specification and the data sheets in the right order instead of sending five attachments."
				},
				{
					title: "Paperwork for the bookkeeping",
					text: "Combine the receipts for one matter into a single file before it goes into the archive or to the accountant."
				}
			],
			steps: [
				{
					title: "Choose a tool",
					description: "Decide between merging, splitting and rotating. The input fields follow that choice."
				},
				{
					title: "Select the files",
					description: "For merging, choose at least two PDFs; the order you select them in is the order in the result. Splitting and rotating need a single file."
				},
				{
					title: "Give the page range",
					description: "For splitting, enter the pages you want, such as 1-3,5 for the first three pages plus the fifth. For rotating, choose the angle for the affected pages."
				},
				{
					title: "Run it and download",
					description: "The result is produced in the browser and offered straight away as a new file. Your source files are left untouched."
				}
			],
			privacy: "The PDFs are not uploaded. They are read in the browser and written out again there; no page and no file leaves your device. With documents from a business that is the real reason to prefer this tool to one of the large online services: uploading a quote, an invoice or a personnel file to somebody else's server means processing personal or confidential data outside your own house, with everything that entails.",
			faq: [
				{
					q: "Are my documents uploaded?",
					a: "No. Processing runs entirely in the browser; there is no server that receives the file. That holds for all three functions equally."
				},
				{
					q: "How do I write a page range?",
					a: "Separate individual pages with commas and continuous ranges with a hyphen. So 1-3,5 means pages one to three plus page five. The order in the result follows the order in the original."
				},
				{
					q: "Is quality preserved?",
					a: "Yes. Pages are carried over rather than re-rendered — text stays text, embedded fonts and resolution are unchanged. No compression takes place."
				},
				{
					q: "Do password-protected PDFs work?",
					a: "Encrypted files cannot be processed. Remove the protection beforehand in the program the file was created with, or save an unprotected copy."
				},
				{
					q: "Why does this tool cost money?",
					a: "The freely available tools on this site are funded by advertising. The PDF tools carry no advertising and are unlocked once instead — with documents from a business, ad-free and purely local processing is the more honest trade."
				}
			],
			related: ["pdf-wasserzeichen", "bild-komprimieren"]
		}
	},
	"pdf-komprimieren": {
		de: {
			intro: [
				"Ein PDF wird fast nie vom Text groß, sondern von den Bildern darin. Ein eingescannter Vertrag, ein Angebot mit Produktfotos, ein bebildertes Protokoll — der Text darin wiegt ein paar Kilobyte, die Fotos einige Megabyte. Genau dort setzt dieses Werkzeug an: Es sucht die eingebetteten Bilder, rechnet sie in der von Ihnen gewählten Qualität neu und schreibt sie an dieselbe Stelle zurück.",
				"Der Rest des Dokuments bleibt dabei unangetastet. Text bleibt Text und damit durchsuchbar und markierbar, Vektorgrafiken bleiben scharf, Verlinkungen und die Seitenreihenfolge bleiben, wie sie waren. Das ist der Unterschied zu Werkzeugen, die jede Seite in ein Bild verwandeln: Die Datei wird zwar auch kleiner, aber aus einem Dokument wird ein Stapel Fotos, in dem sich nichts mehr suchen lässt.",
				"Wie viel dabei herauskommt, hängt am Ausgangsmaterial. Ein Scan mit 300 dpi lässt sich meist auf ein Viertel eindampfen, ohne dass es am Bildschirm auffällt. Ein reines Textdokument dagegen enthält nichts, was sich neu rechnen ließe — dann sagt das Werkzeug genau das, statt eine Verbesserung zu behaupten, die es nicht gibt."
			],
			useCases: [
				{
					title: "Anhänge unter die Größengrenze bringen",
					text: "Viele Postfächer nehmen keine Anhänge über zehn oder zwanzig Megabyte an. Eine Angebotsmappe mit Fotos liegt schnell darüber und wird kommentarlos abgewiesen."
				},
				{
					title: "Scans aus dem Multifunktionsgerät",
					text: "Kopierer scannen im Zweifel mit voller Auflösung in Farbe. Für ein Dokument, das ohnehin nur abgelegt und gelesen wird, ist das um ein Vielfaches mehr, als nötig wäre."
				},
				{
					title: "Unterlagen für ein Portal hochladen",
					text: "Förderportale, Ausschreibungsplattformen und Versicherungen setzen oft harte Obergrenzen je Datei — und melden die Überschreitung erst nach dem Ausfüllen des ganzen Formulars."
				},
				{
					title: "Archiv aufräumen",
					text: "Wenn Jahre an Belegen und Protokollen auf einem Laufwerk liegen, macht ein Faktor drei bei der Dateigröße im Backup und in der Synchronisierung einen spürbaren Unterschied."
				},
				{
					title: "Dokumentation auf die Website stellen",
					text: "Ein Datenblatt, das der Besucher erst nach zehn Sekunden Ladezeit sieht, wird meist gar nicht erst geöffnet — besonders auf dem Mobilfunknetz einer Baustelle."
				}
			],
			steps: [
				{
					title: "PDF auswählen",
					description: "Wählen Sie die Datei aus, die kleiner werden soll. Sie wird ausschließlich in Ihrem Browser geöffnet und nirgendwohin übertragen; auch sehr große Dateien sind kein Problem, sie brauchen nur etwas länger."
				},
				{
					title: "Bildqualität festlegen",
					description: "Der Regler steuert, wie stark die enthaltenen Bilder neu gerechnet werden. 65 Prozent ist ein guter Startwert für Dokumente, die am Bildschirm gelesen werden; für einen Ausdruck in guter Qualität sollten Sie eher bei 80 Prozent bleiben."
				},
				{
					title: "Bildbreite begrenzen",
					description: "Ein Foto mit 4000 Pixeln Breite bringt in einem A4-Dokument nichts, das nie größer als 2000 Pixel gedruckt wird. Die Begrenzung ist deshalb oft der größere Hebel als die Qualität — probieren Sie 1600 Pixel, bevor Sie die Qualität weiter senken."
				},
				{
					title: "Ergebnis prüfen",
					description: "Nach dem Herunterladen steht die Ersparnis in Prozent unter dem Knopf. Öffnen Sie die Datei einmal und sehen Sie sich die bildlastigste Seite an: Was dort gut aussieht, sieht im ganzen Dokument gut aus."
				}
			],
			privacy: "Die Datei wird vollständig in Ihrem Browser geöffnet, verarbeitet und wieder gespeichert. Nichts davon wird auf einen Server übertragen, und es entsteht auch keine Kopie im Netz — das ist bei Verträgen, Personalunterlagen und Angeboten der eigentliche Punkt, denn ein Dokument, das man zum Verkleinern hochlädt, hat man aus der Hand gegeben.",
			faq: [
				{
					q: "Leidet die Qualität des Textes?",
					a: "Nein. Angefasst werden ausschließlich die eingebetteten Bilder. Text bleibt Text, bleibt durchsuchbar, bleibt beim Zoomen scharf und lässt sich weiterhin markieren und kopieren."
				},
				{
					q: "Warum wird meine Datei nicht kleiner?",
					a: "Dann enthält sie nichts, was sich neu rechnen ließe — entweder gar keine Bilder, oder nur solche in einem Format, das hier bewusst unangetastet bleibt, weil eine falsche Annahme über Farbraum oder Bittiefe die Seite still zerstören würde."
				},
				{
					q: "Kann ich mehrere Dateien auf einmal verkleinern?",
					a: "Derzeit wird eine Datei pro Durchgang verarbeitet. Bei einem Stapel lohnt es sich, die Einstellung einmal an der größten Datei zu prüfen und sie dann für die übrigen zu übernehmen."
				},
				{
					q: "Bleibt das Dokument nach dem Verkleinern gültig?",
					a: "Der Aufbau des Dokuments bleibt vollständig erhalten. Eine digitale Signatur ist davon allerdings ausgenommen: Jede Änderung an der Datei macht sie ungültig, das gilt für jedes Werkzeug gleichermaßen."
				}
			],
			related: ["pdf-werkzeuge", "bild-komprimieren"]
		},
		en: {
			intro: [
				"A PDF is almost never made large by its text, but by the images inside it. A scanned contract, a quotation with product photos, an illustrated report — the words weigh a few kilobytes, the pictures several megabytes. That is exactly where this tool works: it finds the embedded images, recomputes them at the quality you choose, and writes them back into the same place.",
				"The rest of the document is left alone. Text stays text and therefore stays searchable and selectable, vector graphics stay sharp, links and page order stay as they were. That is the difference from tools that turn every page into a picture: the file does get smaller, but a document becomes a stack of photos in which nothing can be found again.",
				"How much comes out of it depends on the material. A 300 dpi scan can usually be cut to a quarter without anything showing on screen. A pure text document, on the other hand, holds nothing that could be recomputed — and then the tool says so, rather than claiming an improvement that is not there."
			],
			useCases: [
				{
					title: "Getting an attachment under the limit",
					text: "Plenty of mailboxes refuse attachments over ten or twenty megabytes. A quotation pack with photos passes that quickly and is rejected without comment."
				},
				{
					title: "Scans out of the office machine",
					text: "Copiers scan at full resolution in colour when in doubt. For a document that will only ever be filed and read, that is many times more than would be needed."
				},
				{
					title: "Uploading papers to a portal",
					text: "Funding portals, tender platforms and insurers often set a hard per-file limit — and report the breach only after the whole form has been filled in."
				},
				{
					title: "Tidying up an archive",
					text: "When years of receipts and reports sit on a drive, a factor of three in file size makes a noticeable difference to backups and to syncing."
				},
				{
					title: "Putting documentation on a website",
					text: "A data sheet a visitor only sees after ten seconds of loading is usually not opened at all — especially on the mobile signal of a building site."
				}
			],
			steps: [
				{
					title: "Choose the PDF",
					description: "Pick the file that should get smaller. It is opened purely inside your browser and transferred nowhere; even very large files are fine, they simply take a little longer."
				},
				{
					title: "Set the image quality",
					description: "The slider controls how hard the contained images are recomputed. 65 per cent is a good starting point for documents read on screen; for a good-quality print run, stay closer to 80 per cent."
				},
				{
					title: "Limit the image width",
					description: "A photo 4000 pixels wide gains nothing in an A4 document that is never printed larger than 2000 pixels. The width limit is therefore often the bigger lever than the quality — try 1600 pixels before lowering the quality further."
				},
				{
					title: "Check the result",
					description: "After the download the saving is shown as a percentage under the button. Open the file once and look at the most image-heavy page: what looks good there looks good throughout the document."
				}
			],
			privacy: "The file is opened, processed and saved again entirely inside your browser. None of it is transferred to a server and no copy comes into existence anywhere online — with contracts, personnel files and quotations that is the actual point, because a document you upload in order to shrink it is a document you have handed over.",
			faq: [
				{
					q: "Does the text lose quality?",
					a: "No. Only the embedded images are touched. Text stays text, stays searchable, stays sharp when zoomed, and can still be selected and copied."
				},
				{
					q: "Why does my file not get smaller?",
					a: "Then it holds nothing that could be recomputed — either no images at all, or only images in a format deliberately left alone here, because a wrong assumption about colour space or bit depth would corrupt the page silently."
				},
				{
					q: "Can I compress several files at once?",
					a: "One file is processed per run at the moment. With a batch it pays to test the setting once on the largest file and then apply it to the rest."
				},
				{
					q: "Is the document still valid afterwards?",
					a: "The structure of the document is fully preserved. A digital signature is the exception: any change to the file invalidates it, and that is true of every tool alike."
				}
			],
			related: ["pdf-werkzeuge", "bild-komprimieren"]
		}
	},
	"pdf-wasserzeichen": {
		de: {
			intro: [
				"Ein Wasserzeichen sagt einem Dokument an, was es ist. „Entwurf“ quer über der Seite verhindert, dass eine Zwischenfassung als endgültige Rechnung durchgeht; „Kopie“ trennt das Zweitexemplar vom Original; ein Firmenname über einem Angebot macht sichtbar, von wem es stammt, auch wenn nur eine einzelne Seite ausgedruckt weitergereicht wird.",
				"Dieses Werkzeug setzt einen solchen Schriftzug in ein vorhandenes PDF — mit frei wählbarer Größe, Farbe, Deckkraft und Neigung, auf allen Seiten oder nur auf denen, die Sie angeben. Die vier Anordnungen decken die üblichen Fälle ab: diagonal über die Seite, waagerecht in der Mitte, dezent als Fußzeile oder gekachelt über die gesamte Fläche.",
				"Wichtig ist die Erwartung: Ein Wasserzeichen ist eine Kennzeichnung, kein Kopierschutz. Es macht den Status eines Dokuments auf einen Blick erkennbar und erschwert die unbemerkte Weiterverwendung einzelner Seiten. Wer es technisch entfernen will, kann das mit genügend Aufwand — dagegen hilft kein Werkzeug dieser Art, und Anbieter, die etwas anderes versprechen, überversprechen."
			],
			useCases: [
				{
					title: "Entwürfe eindeutig kennzeichnen",
					text: "Solange ein Angebot noch abgestimmt wird, gehört „Entwurf“ auf jede Seite. Es kostet nichts und verhindert die peinlichste Verwechslung im Schriftverkehr."
				},
				{
					title: "Vertrauliche Unterlagen markieren",
					text: "Kalkulationen, Personalunterlagen und interne Auswertungen bekommen einen sichtbaren Hinweis, der auch auf einem herumliegenden Ausdruck noch zu lesen ist."
				},
				{
					title: "Muster und Vorlagen versenden",
					text: "Wer ein Musterdokument herausgibt, will nicht, dass es ausgefüllt zurückkommt und als echter Vorgang verbucht wird. Ein Aufdruck über der Fläche macht das unmissverständlich."
				},
				{
					title: "Herkunft eines Dokuments zeigen",
					text: "Bei Unterlagen, die durch mehrere Hände gehen, hält ein dezenter Firmenschriftzug in der Fußzeile fest, aus welchem Haus die Seite ursprünglich stammt."
				},
				{
					title: "Fassungen auseinanderhalten",
					text: "Ein aufgedrucktes Datum oder eine Versionsnummer erspart die Rückfrage, welcher von drei Ausdrucken auf dem Tisch der aktuelle ist."
				}
			],
			steps: [
				{
					title: "PDF und Text wählen",
					description: "Laden Sie das Dokument und tragen Sie den Schriftzug ein. Kurz ist besser: Ein Wort bleibt bei jeder Größe lesbar, ein ganzer Satz zwingt Sie zu einer Schriftgröße, bei der das Wasserzeichen kaum noch auffällt."
				},
				{
					title: "Anordnung festlegen",
					description: "Diagonal ist die klassische Wahl für einen Statusvermerk und lässt den Text darunter am besten lesbar. Gekachelt deckt die ganze Seite ab und eignet sich für Muster; die Fußzeile ist die zurückhaltendste Variante für eine Herkunftsangabe."
				},
				{
					title: "Deckkraft und Farbe abstimmen",
					description: "Zwischen 15 und 25 Prozent liegt der Bereich, in dem der Aufdruck deutlich zu sehen ist, ohne den Text darunter zu stören. Prüfen Sie das Ergebnis am besten auf einer Seite mit viel Text, nicht auf dem Deckblatt."
				},
				{
					title: "Seiten eingrenzen und speichern",
					description: "Bleibt das Feld leer, bekommt jede Seite den Aufdruck. Für eine Kennzeichnung nur auf dem Deckblatt genügt eine 1, für einen Bereich eine Angabe wie 1-3,5. Danach laden Sie das fertige Dokument herunter."
				}
			],
			privacy: "Das Dokument wird ausschließlich in Ihrem Browser geöffnet und dort mit dem Aufdruck versehen; weder die Datei noch der Text des Wasserzeichens verlässt Ihr Gerät. Gerade bei als vertraulich gekennzeichneten Unterlagen wäre alles andere widersinnig — ein Dokument zum Anbringen des Vermerks „Vertraulich“ auf einen fremden Server zu laden, hebt genau die Vertraulichkeit auf, um die es geht.",
			faq: [
				{
					q: "Lässt sich das Wasserzeichen wieder entfernen?",
					a: "Mit entsprechendem Aufwand ja — es ist eine Kennzeichnung und kein Kopierschutz. Für den Zweck, den Status eines Dokuments erkennbar zu machen, reicht das vollkommen; für echten Schutz bräuchte es Verschlüsselung und Rechteverwaltung."
				},
				{
					q: "Kann ich ein Logo statt eines Textes einsetzen?",
					a: "Derzeit setzt das Werkzeug einen Textaufdruck. Für eine bildliche Kennzeichnung ist der übliche Weg, das Logo in die Vorlage aufzunehmen, aus der das PDF entsteht."
				},
				{
					q: "Warum fehlen einzelne Sonderzeichen im Aufdruck?",
					a: "Die eingebaute Schrift deckt den westeuropäischen Zeichenvorrat ab. Typografische Anführungszeichen und Gedankenstriche werden automatisch ersetzt, alles darüber hinaus — etwa ein Emoji — wird weggelassen, statt den Export scheitern zu lassen."
				},
				{
					q: "Bleibt der Text unter dem Wasserzeichen auswählbar?",
					a: "Ja. Der Aufdruck ist eine zusätzliche Ebene über dem Inhalt; Text bleibt Text und lässt sich weiterhin markieren, kopieren und durchsuchen."
				}
			],
			related: ["pdf-komprimieren", "pdf-werkzeuge"]
		},
		en: {
			intro: [
				"A watermark tells a document what it is. “Draft” across the page stops an interim version from passing as a final invoice; “Copy” separates the duplicate from the original; a company name over a quotation shows where it came from, even when a single page is printed and passed on.",
				"This tool puts such a wording into an existing PDF — with a size, colour, opacity and tilt of your choosing, on every page or only on the ones you name. The four placements cover the usual cases: diagonally across the page, horizontally in the centre, discreetly as a footer, or tiled over the whole surface.",
				"The expectation matters: a watermark is a marking, not a copy protection. It makes the status of a document visible at a glance and makes it harder to reuse single pages unnoticed. Anyone determined to strip it can, with enough effort — no tool of this kind changes that, and vendors who promise otherwise are overpromising."
			],
			useCases: [
				{
					title: "Marking drafts unmistakably",
					text: "While a quotation is still being agreed, “Draft” belongs on every page. It costs nothing and prevents the most embarrassing mix-up in correspondence."
				},
				{
					title: "Flagging confidential papers",
					text: "Costings, personnel files and internal analyses get a visible note that is still legible on a printout left lying around."
				},
				{
					title: "Sending out samples and templates",
					text: "Anyone handing out a sample document does not want it filled in and returned as a genuine case. A marking across the surface makes that unambiguous."
				},
				{
					title: "Showing where a document came from",
					text: "For papers that pass through several hands, a discreet company wording in the footer records which office the page originally came from."
				},
				{
					title: "Telling versions apart",
					text: "A printed date or version number saves the question of which of the three printouts on the desk is the current one."
				}
			],
			steps: [
				{
					title: "Choose the PDF and the wording",
					description: "Load the document and type the wording. Short is better: one word stays legible at any size, while a whole sentence forces a font size at which the watermark is barely noticeable."
				},
				{
					title: "Pick the placement",
					description: "Diagonal is the classic choice for a status note and keeps the text underneath most readable. Tiled covers the whole page and suits samples; the footer is the most restrained variant for an origin note."
				},
				{
					title: "Tune the opacity and colour",
					description: "Between 15 and 25 per cent is the range where the marking is clearly visible without disturbing the text under it. Check the result on a page full of text rather than on the cover sheet."
				},
				{
					title: "Narrow the pages and save",
					description: "Left empty, the field marks every page. For the cover sheet alone a 1 is enough, for a range something like 1-3,5. Then download the finished document."
				}
			],
			privacy: "The document is opened and marked entirely inside your browser; neither the file nor the watermark wording leaves your device. With papers being marked confidential, anything else would be self-defeating — uploading a document to a stranger's server in order to stamp it “Confidential” removes exactly the confidentiality at stake.",
			faq: [
				{
					q: "Can the watermark be removed again?",
					a: "With enough effort, yes — it is a marking and not a copy protection. For the purpose of making a document's status recognisable that is entirely sufficient; real protection would need encryption and rights management."
				},
				{
					q: "Can I use a logo instead of text?",
					a: "The tool applies a text marking at the moment. For a pictorial marking the usual route is to include the logo in the template the PDF is produced from."
				},
				{
					q: "Why are some special characters missing?",
					a: "The built-in font covers the Western European character set. Typographic quotes and dashes are substituted automatically, and anything beyond that — an emoji, say — is dropped rather than being allowed to fail the export."
				},
				{
					q: "Is the text under the watermark still selectable?",
					a: "Yes. The marking is an extra layer over the content; text stays text and can still be selected, copied and searched."
				}
			],
			related: ["pdf-komprimieren", "pdf-werkzeuge"]
		}
	},
	"bilder-zu-pdf": {
		de: {
			intro: [
				"Der Scanner steht im Büro, die Belege liegen im Fahrzeug — und abfotografiert ist ein Lieferschein in drei Sekunden. Was danach fehlt, ist die Form: Zwölf einzelne Handybilder sind kein Dokument, sie sind zwölf Anhänge in unklarer Reihenfolge, mit denen in der Buchhaltung niemand etwas anfangen kann.",
				"Dieses Werkzeug macht daraus ein PDF. Sie wählen die Bilder, bringen sie in die richtige Reihenfolge und legen fest, wie die Seiten aussehen sollen: A4, A5 oder Letter, hoch oder quer, mit Rand oder randlos. Jedes Bild wird eine Seite, und heraus kommt eine Datei, die sich verschicken, ablegen und ausdrucken lässt wie jedes andere Dokument.",
				"Für die Ausrichtung gibt es bewusst eine Automatik: Ein querformatiges Foto bekommt eine querformatige Seite, ein hochkant aufgenommenes eine hochkante. Damit passt der Stapel auch dann, wenn er gemischt ist — was er bei zwischendurch abfotografierten Belegen praktisch immer ist."
			],
			useCases: [
				{
					title: "Belege für die Buchhaltung bündeln",
					text: "Tankquittungen, Bewirtungsbelege und Parkscheine eines Monats werden ein Dokument statt dreißig Bilddateien mit nichtssagenden Namen."
				},
				{
					title: "Baustellendokumentation abgeben",
					text: "Fotos vom Baufortschritt, in der richtigen Reihenfolge und mit ordentlichen Seiten, sind gegenüber dem Auftraggeber eine Dokumentation und kein Bilderordner."
				},
				{
					title: "Unterschriebene Seiten zurückschicken",
					text: "Ein abfotografierter, unterschriebener Vertrag geht als PDF zurück — so, wie er losgeschickt wurde, und nicht als Foto im Anhang."
				},
				{
					title: "Schadensmeldung bei der Versicherung",
					text: "Versicherungen verlangen fast immer ein Dokument je Vorgang. Mehrere Aufnahmen eines Schadens gehören dann in eine Datei, nicht in fünf Einzelbilder."
				},
				{
					title: "Ersatz für den Scanner unterwegs",
					text: "Wer keinen Scanner zur Hand hat, kommt mit Handykamera und diesem Schritt zu einem brauchbaren Ergebnis — ohne eine App zu installieren, die Bilder in eine fremde Cloud lädt."
				}
			],
			steps: [
				{
					title: "Bilder auswählen",
					description: "Wählen Sie alle Aufnahmen auf einmal aus. JPG, PNG und WebP werden gelesen; die Bilder werden vor dem Einbetten einheitlich aufbereitet, sodass auch gemischte Formate im selben Dokument landen."
				},
				{
					title: "Reihenfolge sortieren",
					description: "Ab zwei Bildern erscheint eine Liste mit Pfeilen zum Verschieben und einem Kreuz zum Entfernen. Die Reihenfolge in dieser Liste ist die Seitenreihenfolge im PDF — das ist meist der Schritt, der über brauchbar oder nicht entscheidet."
				},
				{
					title: "Seitenformat und Rand wählen",
					description: "A4 mit zehn Millimetern Rand passt für alles, was ausgedruckt oder eingereicht wird. Wer das Bild formatfüllend braucht, wählt „So groß wie das Bild“; dann bestimmt die Aufnahme die Seitengröße und es gibt keinen Rand."
				},
				{
					title: "Qualität abwägen und erzeugen",
					description: "Mit 80 Prozent bleibt ein abfotografierter Beleg gut lesbar und die Datei handlich. Erst wenn Kleingedrucktes wirklich entziffert werden muss, lohnt ein höherer Wert — der Zuwachs an Dateigröße ist erheblich."
				}
			],
			privacy: "Die Bilder werden im Browser gelesen, aufbereitet und zu einem PDF zusammengesetzt; keine Aufnahme wird übertragen oder gespeichert. Das ist bei genau diesem Werkzeug relevant, denn die typischen Vorlagen sind Belege, Verträge und Schadensfotos — also Unterlagen, die Adressen, Beträge und manchmal Unterschriften zeigen.",
			faq: [
				{
					q: "Werden die Bilder in der Auswahlreihenfolge eingefügt?",
					a: "Zunächst ja, und viele Dateisysteme sortieren dabei alphabetisch statt nach Aufnahmezeit. Deshalb gibt es die Liste zum Umsortieren — prüfen Sie sie einmal, bevor Sie das PDF erzeugen."
				},
				{
					q: "Kann ich mehrere Bilder auf eine Seite legen?",
					a: "Nein, jedes Bild wird eine eigene Seite. Für eine Kontaktbogen-artige Übersicht ist ein Textprogramm der bessere Weg, weil dort auch Beschriftungen dazugehören."
				},
				{
					q: "Was bedeutet „Seite füllen“ genau?",
					a: "Das Bild wird so vergrößert, dass es die ganze Seite bedeckt; was über den Rand hinausragt, fällt weg — gleichmäßig an beiden Seiten. Für Belege ist „Ganz sichtbar“ die sichere Wahl, weil dort nichts abgeschnitten werden darf."
				},
				{
					q: "Lässt sich das entstandene PDF durchsuchen?",
					a: "Nein. Es enthält Bilder, keinen Text — das ist bei jedem aus Fotos erzeugten PDF so. Wenn Sie den Inhalt als Text brauchen, ist die Texterkennung der passende Schritt davor."
				}
			],
			related: ["pdf-zu-bildern", "bild-komprimieren"]
		},
		en: {
			intro: [
				"The scanner is in the office, the receipts are in the van — and a delivery note is photographed in three seconds. What is missing afterwards is the form: twelve separate phone pictures are not a document, they are twelve attachments in unclear order that nobody in bookkeeping can work with.",
				"This tool turns them into a PDF. You choose the images, put them in the right order, and decide how the pages should look: A4, A5 or Letter, portrait or landscape, with a margin or without. Each image becomes a page, and out comes a file that can be sent, filed and printed like any other document.",
				"Orientation is handled automatically on purpose: a landscape photo gets a landscape page, an upright one gets an upright page. That way a mixed stack still fits — and with receipts photographed as you go, a stack is mixed practically every time."
			],
			useCases: [
				{
					title: "Bundling receipts for bookkeeping",
					text: "A month of fuel receipts, hospitality slips and parking tickets becomes one document instead of thirty image files with meaningless names."
				},
				{
					title: "Handing over site documentation",
					text: "Photos of the work in progress, in the right order and on proper pages, read to a client as documentation rather than as a folder of pictures."
				},
				{
					title: "Returning signed pages",
					text: "A photographed, signed contract goes back as a PDF — the way it was sent out, not as a picture attached to an email."
				},
				{
					title: "Reporting a claim to an insurer",
					text: "Insurers almost always ask for one document per case. Several shots of the same damage then belong in one file, not in five separate images."
				},
				{
					title: "Standing in for a scanner on the road",
					text: "With no scanner at hand, a phone camera plus this step gives a usable result — without installing an app that uploads the pictures to somebody's cloud."
				}
			],
			steps: [
				{
					title: "Choose the images",
					description: "Select all the shots at once. JPG, PNG and WebP are read; the images are normalised before being embedded, so mixed formats still end up in the same document."
				},
				{
					title: "Sort the order",
					description: "From two images on, a list appears with arrows to move an entry and a cross to remove it. The order in that list is the page order in the PDF — usually the step that decides between usable and not."
				},
				{
					title: "Choose the page size and margin",
					description: "A4 with a ten millimetre margin suits anything that will be printed or submitted. If you need the image to fill the page, choose “Same size as the image”; the shot then sets the page size and there is no margin."
				},
				{
					title: "Weigh the quality and create",
					description: "At 80 per cent a photographed receipt stays clearly legible and the file stays manageable. Only when small print really has to be deciphered is a higher value worth it — the growth in file size is considerable."
				}
			],
			privacy: "The images are read, prepared and assembled into a PDF inside the browser; no shot is transmitted or stored. That matters especially for this tool, because the typical inputs are receipts, contracts and damage photos — papers showing addresses, amounts and sometimes signatures.",
			faq: [
				{
					q: "Are the images added in the order I selected them?",
					a: "Initially yes, and many file pickers sort alphabetically rather than by capture time. That is what the reordering list is for — check it once before creating the PDF."
				},
				{
					q: "Can I put several images on one page?",
					a: "No, each image becomes its own page. For a contact-sheet style overview a word processor is the better route, because captions belong there too."
				},
				{
					q: "What exactly does “fill the page” do?",
					a: "The image is enlarged until it covers the whole page; whatever sticks out is cropped, evenly on both sides. For receipts “fully visible” is the safe choice, because nothing there may be cut off."
				},
				{
					q: "Can the resulting PDF be searched?",
					a: "No. It contains images, not text — which is true of every PDF made from photos. If you need the content as text, text recognition is the right step beforehand."
				}
			],
			related: ["pdf-zu-bildern", "bild-komprimieren"]
		}
	},
	"pdf-zu-bildern": {
		de: {
			intro: [
				"Manchmal ist ein PDF das falsche Format. In eine Präsentation lässt es sich nicht einfügen, in einem Social-Media-Beitrag zeigt es niemand an, und für eine Vorschau auf der eigenen Website braucht es ohnehin ein Bild. Dann hilft der umgekehrte Weg: die gewünschte Seite als PNG oder JPG herausrechnen und wie jedes andere Bild weiterverwenden.",
				"Dieses Werkzeug rendert die Seiten so, wie ein Betrachter sie anzeigen würde — mit Schriften, Vektorgrafiken und Layout, nicht als Ausschnitt eines Screenshots. Die Auflösung bestimmen Sie: 96 dpi für den Bildschirm, 150 dpi als guter Mittelweg, 300 dpi, wenn das Ergebnis gedruckt wird.",
				"Die erzeugten Seiten erscheinen als Vorschau, mit Größe und Abmessung je Bild und einem eigenen Knopf zum Herunterladen. So laden Sie gezielt die eine Seite, die Sie brauchen, statt einen Ordner voller Dateien zu sortieren, von denen Sie neun wieder löschen."
			],
			useCases: [
				{
					title: "Seite in eine Präsentation übernehmen",
					text: "Eine Auswertung oder ein Plan aus einem PDF landet als Bild auf der Folie, ohne den Umweg über einen unscharf zugeschnittenen Bildschirmausschnitt."
				},
				{
					title: "Vorschaubild für die Website",
					text: "Ein Datenblatt oder eine Speisekarte bekommt eine Vorschau, die Besucher sehen, bevor sie entscheiden, ob sie das ganze Dokument öffnen wollen."
				},
				{
					title: "Einzelne Seite weitergeben",
					text: "Wenn nur eine Seite gebraucht wird, ist ein Bild oft der einfachere Weg als ein neues PDF — der Empfänger sieht es sofort, ohne etwas zu öffnen."
				},
				{
					title: "Plan auf die Baustelle schicken",
					text: "Ein Bild lässt sich am Telefon in jedem Messenger anzeigen und heranziehen, während ein PDF-Anhang je nach Gerät erst eine App verlangt."
				},
				{
					title: "Vorlage für die Texterkennung",
					text: "Ein gescanntes PDF ist für eine Texterkennung erst nutzbar, wenn die Seite als Bild vorliegt — dieser Schritt liefert genau das, in der passenden Auflösung."
				}
			],
			steps: [
				{
					title: "PDF auswählen",
					description: "Wählen Sie die Datei aus. Sie wird im Browser gelesen; die Anzeige-Engine dafür wird erst beim ersten Umwandeln geladen, damit das bloße Öffnen der Seite nicht schon ein Megabyte kostet."
				},
				{
					title: "Seiten eingrenzen",
					description: "Leer lassen wandelt das ganze Dokument um. Bei einem längeren PDF lohnt sich eine Angabe wie 1 oder 2-4 — pro Durchgang werden höchstens fünfzig Seiten gerendert, weil ein ganzes Buch bei 300 dpi den Arbeitsspeicher des Geräts sprengen würde."
				},
				{
					title: "Auflösung und Format wählen",
					description: "PNG ist die richtige Wahl für Text, Linien und Pläne, weil es scharfe Kanten sauber wiedergibt. JPG lohnt sich bei fotolastigen Seiten und liefert dort deutlich kleinere Dateien; die Qualität stellen Sie dann selbst ein."
				},
				{
					title: "Vorschau prüfen und laden",
					description: "Unter jeder Seite stehen Abmessung und Dateigröße. Laden Sie einzelne Seiten über den Knopf daneben oder alle auf einmal — der Browser fragt je nach Einstellung einmal nach, ob er mehrere Dateien speichern darf."
				}
			],
			privacy: "Das Dokument wird ausschließlich lokal im Browser gelesen und gerendert; weder die Datei noch die erzeugten Bilder werden übertragen. Auch die Anzeige-Engine liegt auf dieser Website und nicht bei einem fremden Anbieter, sodass beim Umwandeln keine Verbindung nach außen entsteht.",
			faq: [
				{
					q: "Warum wird nur eine begrenzte Seitenzahl umgewandelt?",
					a: "Jede gerenderte Seite liegt als Bild im Arbeitsspeicher, und bei 300 dpi sind das mehrere Megabyte pro Seite. Die Grenze von fünfzig Seiten je Durchgang verhindert, dass der Browser-Tab mitten in der Arbeit abstürzt."
				},
				{
					q: "Welche Auflösung brauche ich zum Drucken?",
					a: "300 dpi ist der übliche Wert für einen sauberen Ausdruck. Für die Anzeige am Bildschirm oder im Web sind 96 bis 150 dpi völlig ausreichend und ergeben deutlich handlichere Dateien."
				},
				{
					q: "Warum ist der Hintergrund weiß und nicht durchsichtig?",
					a: "Eine PDF-Seite hat keinen eigenen Hintergrund. Ohne eine gesetzte weiße Fläche würden durchsichtige Bereiche in einem JPG schwarz erscheinen, deshalb wird vor dem Rendern grundsätzlich weiß gefüllt."
				},
				{
					q: "Bleibt der Text im Bild auswählbar?",
					a: "Nein. Ein Bild besteht aus Bildpunkten, egal wie hoch die Auflösung ist. Wer den Inhalt weiterverwenden will, braucht danach eine Texterkennung."
				}
			],
			related: ["bilder-zu-pdf", "texterkennung"]
		},
		en: {
			intro: [
				"Sometimes a PDF is the wrong format. It cannot be dropped into a presentation, nobody's social feed will display it, and a preview on your own website needs a picture anyway. Then the reverse route helps: render the page you want as a PNG or JPG and use it like any other image.",
				"This tool renders the pages the way a viewer would show them — with fonts, vector graphics and layout, not as a crop of a screenshot. You choose the resolution: 96 dpi for the screen, 150 dpi as a good middle ground, 300 dpi when the result will be printed.",
				"The rendered pages appear as previews, each with its size and dimensions and its own download button. That way you take the one page you need instead of sorting through a folder of files, nine of which you delete again."
			],
			useCases: [
				{
					title: "Putting a page into a presentation",
					text: "An analysis or a plan out of a PDF lands on the slide as an image, without the detour through a blurry cropped screen capture."
				},
				{
					title: "A preview picture for a website",
					text: "A data sheet or a menu gets a preview that visitors see before deciding whether to open the whole document."
				},
				{
					title: "Passing on a single page",
					text: "When only one page is needed, an image is often simpler than a new PDF — the recipient sees it immediately, without opening anything."
				},
				{
					title: "Sending a plan to the site",
					text: "An image can be displayed and zoomed in any messenger on a phone, while a PDF attachment demands an app first depending on the device."
				},
				{
					title: "Preparing input for text recognition",
					text: "A scanned PDF only becomes usable for text recognition once the page exists as an image — this step delivers exactly that, at a suitable resolution."
				}
			],
			steps: [
				{
					title: "Choose the PDF",
					description: "Pick the file. It is read inside the browser; the rendering engine for it is only loaded on the first conversion, so merely opening the page does not already cost a megabyte."
				},
				{
					title: "Narrow the pages",
					description: "Left empty, the whole document is converted. For a longer PDF an entry like 1 or 2-4 pays off — at most fifty pages are rendered per run, because a whole book at 300 dpi would exhaust the device's memory."
				},
				{
					title: "Choose resolution and format",
					description: "PNG is the right choice for text, lines and plans, because it reproduces sharp edges cleanly. JPG pays off on photo-heavy pages and gives markedly smaller files there; you then set the quality yourself."
				},
				{
					title: "Check the preview and download",
					description: "Dimensions and file size are shown under each page. Take individual pages with the button beside them, or all at once — depending on its settings the browser will ask once whether it may save several files."
				}
			],
			privacy: "The document is read and rendered purely locally in the browser; neither the file nor the produced images are transmitted. The rendering engine is served by this site rather than by a third party, so converting a document opens no outbound connection at all.",
			faq: [
				{
					q: "Why is the number of pages limited?",
					a: "Every rendered page sits in memory as an image, and at 300 dpi that is several megabytes per page. The limit of fifty pages per run stops the browser tab from crashing halfway through the job."
				},
				{
					q: "Which resolution do I need for printing?",
					a: "300 dpi is the usual value for a clean print. For display on screen or on the web, 96 to 150 dpi is entirely sufficient and gives far more manageable files."
				},
				{
					q: "Why is the background white rather than transparent?",
					a: "A PDF page has no background of its own. Without a white fill, transparent areas would come out black in a JPG, so the canvas is always filled with white before rendering."
				},
				{
					q: "Is the text in the image still selectable?",
					a: "No. An image is made of pixels, however high the resolution. If you want to reuse the content, text recognition is the step that follows."
				}
			],
			related: ["bilder-zu-pdf", "texterkennung"]
		}
	},
	"etiketten-drucken": {
		de: {
			intro: [
				"Etikettenbogen sind billig, das Beschriften ist es nicht. Wer einmal versucht hat, dreißig Adressen in einer Textverarbeitung so auf ein Raster zu bringen, dass sie nach dem Druck auch auf den Aufklebern landen, kennt das Ergebnis: zwei verschwendete Bogen und eine Tabelle, die beim nächsten Mal niemand mehr wiederfindet.",
				"Dieses Werkzeug erzeugt den Bogen als fertiges PDF. Sie wählen das Raster, fügen die Adressen ein — eine je Absatz — und bekommen eine Datei, die Sie ohne weitere Einstellung auf den Etikettenbogen drucken. Die gängigen Formate von 24 bis 40 Etiketten je A4-Seite sind hinterlegt, samt der Ränder und Abstände, die das jeweilige Raster braucht.",
				"Zwei Kleinigkeiten machen den Unterschied im Alltag. „Erstes benutztes Feld“ nimmt einen angebrochenen Bogen auf, sodass die ersten, schon abgezogenen Felder freibleiben. Und die Schnittlinien lassen sich zum Prüfen einblenden: einmal auf normalem Papier drucken, gegen den Etikettenbogen halten, und die Passgenauigkeit ist geklärt, bevor der teure Bogen durch den Drucker läuft."
			],
			useCases: [
				{
					title: "Serienbrief ohne Serienbrief",
					text: "Für eine Aussendung an dreißig Kunden braucht es keine Datenbankanbindung — die Adressen aus der Mail liegen ohnehin schon als Text vor."
				},
				{
					title: "Absenderaufkleber auf Vorrat",
					text: "Ein Bogen mit der eigenen Anschrift auf allen Feldern ist in einer Minute erzeugt und spart über das Jahr das Beschriften jedes einzelnen Umschlags."
				},
				{
					title: "Inventar und Lagerplätze beschriften",
					text: "Regalfächer, Werkzeugkisten und Ordnerrücken bekommen einheitliche Beschriftungen, statt der Handschrift von drei verschiedenen Kollegen."
				},
				{
					title: "Versandvorbereitung im Handel",
					text: "Wer regelmäßig Pakete verschickt, klebt die Empfängeradresse lieber auf, als sie jedes Mal von Hand auf den Karton zu schreiben."
				},
				{
					title: "Namensschilder für eine Veranstaltung",
					text: "Für einen Tag der offenen Tür oder eine Schulung reicht ein größeres Raster mit Name und Betrieb, gedruckt am Vorabend."
				}
			],
			steps: [
				{
					title: "Bogen auswählen",
					description: "Suchen Sie das Raster, das zu Ihrem Etikettenbogen passt. Entscheidend sind die Maße und die Anzahl je Seite, nicht die Marke — ein Bogen eines anderen Herstellers mit demselben Raster passt genauso."
				},
				{
					title: "Adressen einfügen",
					description: "Eine Adresse je Absatz: Die Zeilen innerhalb eines Absatzes werden zu den Zeilen auf dem Etikett, eine Leerzeile beendet das Etikett. Unter dem Feld steht laufend mit, wie viele Etiketten erkannt wurden — das ist die schnellste Kontrolle."
				},
				{
					title: "Angebrochenen Bogen berücksichtigen",
					description: "Wurden von einem Bogen schon Felder abgezogen, tragen Sie unter „Erstes benutztes Feld“ die Nummer des ersten freien Feldes ein. Gezählt wird zeilenweise von links oben, wie beim Lesen."
				},
				{
					title: "Probedruck und Druck",
					description: "Schalten Sie für den ersten Versuch die Schnittlinien ein und drucken Sie auf normales Papier. Wichtig ist dabei, dass der Drucker das PDF in Originalgröße ausgibt und nicht „an Seite anpassen“ — sonst verschiebt sich das ganze Raster um wenige Millimeter."
				}
			],
			privacy: "Der Bogen entsteht vollständig in Ihrem Browser; die eingefügten Adressen werden weder übertragen noch gespeichert. Bei einer Empfängerliste ist das keine Formalie, sondern der Unterschied zwischen einer internen Arbeitsdatei und einer Kundenliste, die auf einem fremden Server gelandet ist.",
			faq: [
				{
					q: "Mein Etikettenbogen steht nicht in der Liste — was nun?",
					a: "Vergleichen Sie die Maße auf der Verpackung mit den angebotenen Rastern; viele Hersteller verwenden identische Geometrien unter eigenen Nummern. Passt keines exakt, ist das nächstkleinere Raster meist noch brauchbar, weil der Text mittig auf dem Feld sitzt."
				},
				{
					q: "Warum sitzt der Druck ein paar Millimeter daneben?",
					a: "Fast immer liegt es an der Skalierung im Druckdialog. Die Einstellung muss „Originalgröße“ oder „100 %“ heißen; „An Seite anpassen“ verkleinert das Dokument minimal, und über eine A4-Seite summiert sich das zu einem sichtbaren Versatz."
				},
				{
					q: "Kann ich eine lange Adresse unterbringen?",
					a: "Der Text wird innerhalb des Etiketts umgebrochen, damit er nicht in das Nachbarfeld läuft. Bei sehr langen Zeilen hilft eine kleinere Schriftgröße — der Regler geht bis auf 6 pt herunter."
				},
				{
					q: "Lassen sich Barcodes oder Logos aufbringen?",
					a: "Das Werkzeug setzt Text. Für ein Etikett mit Code ist der QR-Code-Generator der passende Schritt davor; das erzeugte Bild lässt sich dann in einer Vorlage weiterverwenden."
				}
			],
			related: ["stundenzettel", "qr-code-generator"]
		},
		en: {
			intro: [
				"Label sheets are cheap; labelling them is not. Anyone who has tried to line up thirty addresses in a word processor so that they actually land on the stickers after printing knows the outcome: two wasted sheets and a table nobody can find again next time.",
				"This tool produces the sheet as a finished PDF. You choose the grid, paste the addresses — one per paragraph — and get a file you print onto the label sheet with no further settings. The common formats from 24 to 40 labels per A4 page are built in, along with the margins and gaps each grid needs.",
				"Two small things make the difference in daily use. “First slot to use” takes account of a partly used sheet, leaving the already-peeled slots empty. And the cutting guides can be shown for checking: print once on plain paper, hold it against the label sheet, and the alignment is settled before the expensive sheet goes through the printer."
			],
			useCases: [
				{
					title: "A mail merge without the mail merge",
					text: "A mailing to thirty customers needs no database connection — the addresses from the email are already sitting there as text."
				},
				{
					title: "Return address labels in stock",
					text: "A sheet with your own address in every slot takes a minute to produce and saves writing on each envelope for the rest of the year."
				},
				{
					title: "Labelling stock and storage places",
					text: "Shelves, tool boxes and file spines get consistent labels instead of the handwriting of three different colleagues."
				},
				{
					title: "Preparing shipments in retail",
					text: "Anyone sending parcels regularly would rather stick the recipient's address on than write it onto the box by hand every time."
				},
				{
					title: "Name badges for an event",
					text: "For an open day or a training session, a larger grid with a name and a company is enough, printed the evening before."
				}
			],
			steps: [
				{
					title: "Choose the sheet",
					description: "Find the grid that matches your label sheet. What counts is the measurements and the count per page, not the brand — a sheet from another manufacturer with the same grid fits just as well."
				},
				{
					title: "Paste the addresses",
					description: "One address per paragraph: the lines inside a paragraph become the lines on the label, and a blank line ends it. The number of labels detected is shown under the field as you type — the quickest check there is."
				},
				{
					title: "Account for a partly used sheet",
					description: "If slots have already been peeled off a sheet, enter the number of the first free slot under “First slot to use”. Counting runs row by row from the top left, the way you read."
				},
				{
					title: "Test print, then print",
					description: "For the first attempt switch the cutting guides on and print onto plain paper. What matters is that the printer outputs the PDF at original size and not “fit to page” — otherwise the whole grid shifts by a few millimetres."
				}
			],
			privacy: "The sheet is produced entirely in your browser; the pasted addresses are neither transmitted nor stored. With a recipient list that is not a formality but the difference between an internal working file and a customer list that has ended up on somebody else's server.",
			faq: [
				{
					q: "My label sheet is not in the list — what now?",
					a: "Compare the measurements on the packaging with the grids offered; many manufacturers use identical geometries under their own numbers. If none fits exactly, the next smaller grid is usually still usable, because the text sits centred on the slot."
				},
				{
					q: "Why is the print a few millimetres out?",
					a: "Almost always it is the scaling in the print dialogue. The setting must read “actual size” or “100 %”; “fit to page” shrinks the document slightly, and across an A4 page that adds up to a visible offset."
				},
				{
					q: "Can I fit a long address?",
					a: "The text is wrapped inside the label so that it does not run into the neighbouring slot. For very long lines a smaller font size helps — the slider goes down to 6 pt."
				},
				{
					q: "Can I add barcodes or logos?",
					a: "The tool sets text. For a label with a code, the QR code generator is the right step beforehand; the produced image can then be used in a template."
				}
			],
			related: ["stundenzettel", "qr-code-generator"]
		}
	},
	stundenzettel: {
		de: {
			intro: [
				"Arbeitszeiten müssen aufgezeichnet werden, und in vielen kleinen Betrieben passiert das bis heute auf einem Zettel im Fahrzeug oder in einer Tabelle, die jeden Monat neu zusammenkopiert wird. Beides funktioniert, solange niemand nachfragt — und beides ist mühsam in genau dem Moment, in dem jemand nachfragt.",
				"Dieses Werkzeug erzeugt einen Arbeitszeitnachweis für einen ganzen Monat als PDF. Sie tragen Beginn, Ende und Pause ein, die Tagesstunden und die Monatssumme werden gerechnet, und heraus kommt ein Blatt zum Ausdrucken und Unterschreiben — mit Namen, Betrieb, Monat und je einem Feld für beide Unterschriften.",
				"Damit das Ausfüllen nicht dreißigmal dasselbe ist, gibt es eine Vorbelegung: Sie geben die üblichen Zeiten einmal an, übernehmen sie für alle Werktage und ändern danach nur noch die Ausnahmen. Wochenenden bleiben leer, sind aber vorhanden — ein Samstagseinsatz muss schließlich irgendwo hin."
			],
			useCases: [
				{
					title: "Nachweis für Minijob und Teilzeit",
					text: "Gerade bei geringfügiger Beschäftigung wird die Aufzeichnung der täglichen Arbeitszeit erwartet, und ein sauberes Monatsblatt ist die einfachste Form davon."
				},
				{
					title: "Stunden gegenüber dem Kunden belegen",
					text: "Bei Arbeiten nach Aufwand ist ein unterschriebener Monatsnachweis die Grundlage, auf die sich beide Seiten später berufen können."
				},
				{
					title: "Übergabe an das Steuerbüro",
					text: "Ein PDF je Mitarbeiter und Monat lässt sich weiterreichen und ablegen, ohne dass jemand eine fremde Tabellendatei öffnen und interpretieren muss."
				},
				{
					title: "Aushilfen und Saisonkräfte",
					text: "Wo Arbeitszeiten stark schwanken, ist ein Blatt mit allen Tagen des Monats übersichtlicher als eine Sammlung einzelner Notizen."
				},
				{
					title: "Eigene Zeiten festhalten",
					text: "Auch wer allein arbeitet, hat am Jahresende eine belastbare Übersicht, wenn die Monate durchgehend auf demselben Blatt festgehalten wurden."
				}
			],
			steps: [
				{
					title: "Kopf ausfüllen",
					description: "Name, Betrieb und Monat stehen später oben auf dem Blatt. Der Monat bestimmt zugleich, wie viele Zeilen die Tabelle bekommt und welcher Wochentag auf welches Datum fällt — auch im Schaltjahr."
				},
				{
					title: "Werktage vorbelegen",
					description: "Tragen Sie die üblichen Zeiten und die Pause ein und übernehmen Sie sie. Alle Montage bis Freitage des Monats werden damit gefüllt; Wochenenden bleiben bewusst leer, lassen sich aber einzeln ausfüllen."
				},
				{
					title: "Abweichungen eintragen",
					description: "Ändern Sie danach nur noch die Tage, die anders liefen: Urlaub und Krankheit bleiben leer und zählen nicht mit, verkürzte Tage bekommen andere Zeiten, und in die Bemerkung passt ein kurzer Hinweis wie Urlaub oder Baustelle."
				},
				{
					title: "Summe prüfen und erzeugen",
					description: "Unter der Tabelle stehen die Monatssumme und die Zahl der Arbeitstage. Stimmen beide, erzeugen Sie das PDF; die Unterschriftenfelder stehen am unteren Rand des Blattes bereit."
				}
			],
			privacy: "Alle Eingaben bleiben in Ihrem Browser, und das PDF entsteht ebenfalls dort; weder Namen noch Arbeitszeiten werden übertragen oder gespeichert. Arbeitszeitdaten sind Personaldaten, und ein Werkzeug, das sie zur Verarbeitung an einen Server schickt, wäre für diesen Zweck die falsche Wahl.",
			faq: [
				{
					q: "Ersetzt das Blatt eine Zeiterfassung?",
					a: "Es ist ein Nachweis, kein System: Es hält fest, was eingetragen wurde, und liefert eine unterschreibbare Fassung davon. Für laufende Erfassung mit Projektbezug ist eine richtige Zeiterfassung der bessere Weg."
				},
				{
					q: "Wie werden Pausen behandelt?",
					a: "Die Pause wird in Minuten eingetragen und von der Spanne zwischen Beginn und Ende abgezogen. Die gesetzlichen Mindestpausen prüft das Werkzeug nicht — die Verantwortung dafür bleibt beim Betrieb."
				},
				{
					q: "Was passiert bei einer Schicht über Mitternacht?",
					a: "Endet die Schicht vor ihrem Beginn, wird sie als über Mitternacht laufend gerechnet und ergibt korrekt positive Stunden. Ein negativer Tag käme sonst in die Monatssumme und würde dort unbemerkt bleiben."
				},
				{
					q: "Bleiben meine Eingaben erhalten, wenn ich die Seite neu lade?",
					a: "Nein, die Angaben stehen nur im geöffneten Tab. Erzeugen Sie das PDF, bevor Sie die Seite verlassen — die fertige Datei ist die Fassung, die bleibt."
				}
			],
			related: ["etiketten-drucken", "pdf-werkzeuge"]
		},
		en: {
			intro: [
				"Working time has to be recorded, and in plenty of small businesses that still happens on a note in the van or in a spreadsheet copied together afresh each month. Both work as long as nobody asks — and both are painful at exactly the moment somebody does.",
				"This tool produces a record of working time for a whole month as a PDF. You enter the start, the end and the break, the daily hours and the monthly total are worked out, and out comes a sheet to print and sign — with the name, the employer, the month and a field for each of the two signatures.",
				"So that filling it in is not the same thing thirty times over, there is a prefill: you state the usual times once, apply them to every weekday, and then change only the exceptions. Weekends stay empty but are present — a Saturday call-out has to go somewhere after all."
			],
			useCases: [
				{
					title: "A record for part-time and casual work",
					text: "For marginal employment in particular the daily working time is expected to be recorded, and a clean monthly sheet is the simplest form of that."
				},
				{
					title: "Evidencing hours to a client",
					text: "For work charged by time spent, a signed monthly record is the basis both sides can point to later on."
				},
				{
					title: "Handing over to the accountant",
					text: "One PDF per person and month can be passed on and filed without anybody having to open and interpret somebody else's spreadsheet."
				},
				{
					title: "Temporary and seasonal staff",
					text: "Where hours vary a lot, one sheet holding every day of the month is clearer than a collection of separate notes."
				},
				{
					title: "Recording your own hours",
					text: "Even working alone, you end the year with a defensible overview if the months were recorded consistently on the same sheet."
				}
			],
			steps: [
				{
					title: "Fill in the header",
					description: "The name, the employer and the month appear at the top of the sheet later on. The month also decides how many rows the table gets and which weekday falls on which date — in a leap year too."
				},
				{
					title: "Prefill the weekdays",
					description: "Enter the usual times and the break and apply them. Every Monday to Friday of the month is filled in; weekends are deliberately left empty but can be filled in individually."
				},
				{
					title: "Enter the exceptions",
					description: "Then change only the days that went differently: holidays and sickness stay empty and do not count, shorter days get other times, and a brief note such as holiday or site work fits in the note column."
				},
				{
					title: "Check the total and create",
					description: "Under the table sit the monthly total and the number of working days. When both look right, create the PDF; the signature fields are waiting at the bottom of the sheet."
				}
			],
			privacy: "Every entry stays in your browser and the PDF is produced there too; neither names nor working times are transmitted or stored. Working-time data is personnel data, and a tool that sent it to a server for processing would be the wrong choice for this job.",
			faq: [
				{
					q: "Does this replace a time-tracking system?",
					a: "It is a record, not a system: it holds what was entered and produces a signable version of it. For ongoing tracking tied to projects, proper time tracking is the better route."
				},
				{
					q: "How are breaks handled?",
					a: "The break is entered in minutes and deducted from the span between start and end. The tool does not check statutory minimum breaks — that responsibility stays with the employer."
				},
				{
					q: "What happens with a shift over midnight?",
					a: "If the shift ends before it starts, it is treated as running past midnight and correctly yields positive hours. A negative day would otherwise enter the monthly total and go unnoticed there."
				},
				{
					q: "Are my entries kept if I reload the page?",
					a: "No, they live only in the open tab. Create the PDF before leaving the page — the finished file is the version that lasts."
				}
			],
			related: ["etiketten-drucken", "pdf-werkzeuge"]
		}
	},
	texterkennung: {
		de: {
			intro: [
				"Ein abfotografierter Beleg ist für einen Computer ein Bild und sonst nichts. Der Betrag darauf ist nicht suchbar, die Adresse nicht kopierbar, die Rechnungsnummer nicht in ein Formular zu übernehmen — obwohl alles davon gut lesbar vor einem liegt. Texterkennung schließt diese Lücke: Sie liest die Buchstaben aus dem Bild heraus und gibt sie als Text zurück.",
				"Dieses Werkzeug erkennt deutschen und englischen Text und arbeitet dabei vollständig auf Ihrem Gerät. Auch die Spracherkennungsdaten kommen von dieser Website und nicht von einem fremden Anbieter — beim Öffnen des Werkzeugs entsteht also keine Verbindung nach außen, und das Bild selbst wird ohnehin nicht übertragen.",
				"Wie gut das Ergebnis wird, entscheidet fast ausschließlich die Vorlage. Ein gerade aufgenommener, scharfer Ausschnitt mit gutem Kontrast liefert Text, den man nur noch überfliegen muss. Ein schräges Foto bei Kunstlicht liefert Bruchstücke. Es lohnt sich deshalb mehr, die Aufnahme zu wiederholen, als am Ergebnis herumzubessern."
			],
			useCases: [
				{
					title: "Rechnungsangaben übernehmen",
					text: "Rechnungsnummer, Betrag und Steuersatz aus einem Beleg herauslesen, statt sie abzutippen — mit dem üblichen Zahlendreher, den niemand bemerkt."
				},
				{
					title: "Visitenkarten erfassen",
					text: "Nach einer Messe liegen zwanzig Karten auf dem Tisch. Abfotografiert und erkannt sind die Kontaktdaten in wenigen Minuten in der Adressverwaltung."
				},
				{
					title: "Alte Unterlagen durchsuchbar machen",
					text: "Ein Aktenordner ist erst dann wirklich digitalisiert, wenn sich der Inhalt suchen lässt — nicht schon dann, wenn ein Bild davon existiert."
				},
				{
					title: "Zitate aus gedruckten Vorlagen",
					text: "Ein Absatz aus einem Prospekt, einer Norm oder einem Behördenschreiben landet als Text im Angebot, ohne ihn Wort für Wort zu übertragen."
				},
				{
					title: "Typenschilder und Seriennummern",
					text: "Auf einem Foto vom Typenschild einer Maschine ist die Nummer lesbar, aber nicht kopierbar. Genau dafür ist die Erkennung eines kleinen Ausschnitts gedacht."
				}
			],
			steps: [
				{
					title: "Bild auswählen",
					description: "Wählen Sie ein Foto, einen Screenshot oder einen Bildscan. Direkt aus einem PDF wird hier nicht gelesen — wandeln Sie in dem Fall zuerst die betreffende Seite in ein Bild um, am besten mit 300 dpi."
				},
				{
					title: "Sprache festlegen",
					description: "Wählen Sie die Sprache, in der der Text verfasst ist. Beide gleichzeitig ist möglich und sinnvoll bei gemischten Vorlagen, kostet aber etwas Genauigkeit und Zeit — bei rein deutschem Text bleiben Sie besser bei Deutsch."
				},
				{
					title: "Erkennung starten",
					description: "Beim ersten Durchgang wird die Erkennung geladen, was je nach Verbindung einen Moment dauert; danach zeigt der Knopf den Fortschritt in Prozent. Für ein einzelnes Bild dauert die Erkennung selbst meist wenige Sekunden."
				},
				{
					title: "Ergebnis nachsehen und übernehmen",
					description: "Der erkannte Text erscheint in einem bearbeitbaren Feld — Zahlen und Eigennamen sollten Sie kurz gegenlesen, denn dort sind Verwechslungen am wahrscheinlichsten. Danach kopieren Sie ihn oder speichern ihn als Textdatei."
				}
			],
			privacy: "Die Erkennung läuft vollständig auf Ihrem Gerät: Das Bild wird nicht hochgeladen, und die dafür nötige Software samt Sprachdaten wird von dieser Website ausgeliefert statt von einem fremden Anbieter. Beim Öffnen des Werkzeugs wird also keine dritte Seite aufgerufen — was gerade dann zählt, wenn auf der Vorlage Kundendaten oder Beträge stehen.",
			faq: [
				{
					q: "Warum ist die Erkennung stellenweise falsch?",
					a: "Meistens liegt es an der Vorlage: Unschärfe, Schatten, eine schräge Aufnahme oder eine gemusterte Unterlage kosten mehr Genauigkeit als jede Einstellung. Ein zweites, gerade und formatfüllend aufgenommenes Foto bringt fast immer mehr als Nacharbeit am Text."
				},
				{
					q: "Kann ich eine Handschrift erkennen lassen?",
					a: "Nein. Die Erkennung ist auf gedruckte Schrift ausgelegt; bei Handschrift sind die Ergebnisse nicht brauchbar. Das gilt für praktisch alle Werkzeuge dieser Art, die ohne Server auskommen."
				},
				{
					q: "Warum dauert der erste Start länger?",
					a: "Beim ersten Durchgang lädt der Browser die Erkennungssoftware und die Sprachdaten. Das sind einige Megabyte, die danach im Zwischenspeicher liegen — der zweite Lauf beginnt sofort."
				},
				{
					q: "Bleibt das Layout der Vorlage erhalten?",
					a: "Nur grob. Zeilenumbrüche bleiben meist stehen, Spalten und Tabellen dagegen werden zu fortlaufendem Text. Für tabellarische Vorlagen ist deshalb etwas Nacharbeit einzuplanen."
				}
			],
			related: ["bild-komprimieren", "pdf-zu-bildern"]
		},
		en: {
			intro: [
				"A photographed receipt is an image to a computer and nothing else. The amount on it cannot be searched, the address cannot be copied, the invoice number cannot be carried into a form — even though all of it is sitting there perfectly legible. Text recognition closes that gap: it reads the letters out of the picture and hands them back as text.",
				"This tool recognises German and English text and does the whole job on your device. Even the recognition data is served by this website rather than by a third party — so opening the tool opens no outbound connection, and the picture itself is not transmitted in any case.",
				"How good the result is depends almost entirely on the input. A straight, sharp, well-contrasted shot yields text you only have to skim. A tilted photo under artificial light yields fragments. It is therefore worth more to retake the picture than to patch up the output."
			],
			useCases: [
				{
					title: "Carrying over invoice details",
					text: "Read the invoice number, the amount and the tax rate out of a receipt instead of retyping them — with the usual transposed digits nobody notices."
				},
				{
					title: "Capturing business cards",
					text: "After a trade fair twenty cards sit on the desk. Photographed and recognised, the contact details are in the address book within minutes."
				},
				{
					title: "Making old papers searchable",
					text: "A file of documents is only really digitised once its contents can be searched — not merely once a picture of it exists."
				},
				{
					title: "Quoting from printed sources",
					text: "A paragraph from a brochure, a standard or an official letter lands in the quotation as text, without transcribing it word by word."
				},
				{
					title: "Rating plates and serial numbers",
					text: "In a photo of a machine's rating plate the number is legible but not copyable. Recognising a small crop is exactly what this is for."
				}
			],
			steps: [
				{
					title: "Choose the image",
					description: "Pick a photo, a screenshot or a scanned image. PDFs are not read here — in that case convert the page in question to an image first, ideally at 300 dpi."
				},
				{
					title: "Set the language",
					description: "Choose the language the text is written in. Both at once is possible and sensible for mixed material, but costs a little accuracy and time — for purely German text, stay with German."
				},
				{
					title: "Start the recognition",
					description: "On the first run the engine is loaded, which takes a moment depending on your connection; after that the button shows the progress as a percentage. For a single image the recognition itself usually takes a few seconds."
				},
				{
					title: "Review and take the result",
					description: "The recognised text appears in an editable field — numbers and proper names are worth a quick read, because that is where confusions are likeliest. Then copy it or save it as a text file."
				}
			],
			privacy: "Recognition runs entirely on your device: the image is not uploaded, and the software and language data needed for it are served by this website rather than by a third party. Opening the tool therefore contacts no other site — which counts most when the material shows customer details or amounts.",
			faq: [
				{
					q: "Why is the recognition wrong in places?",
					a: "Usually it is the input: blur, shadows, a tilted shot or a patterned surface cost more accuracy than any setting can win back. A second photo, straight and filling the frame, almost always beats reworking the text."
				},
				{
					q: "Can it recognise handwriting?",
					a: "No. The recognition is built for printed type; with handwriting the results are not usable. That is true of practically every tool of this kind that works without a server."
				},
				{
					q: "Why does the first start take longer?",
					a: "On the first run the browser loads the recognition software and the language data. That is a few megabytes, cached afterwards — the second run begins immediately."
				},
				{
					q: "Is the layout of the original kept?",
					a: "Only roughly. Line breaks usually survive, while columns and tables become running text. For tabular material, plan for some rework."
				}
			],
			related: ["bild-komprimieren", "pdf-zu-bildern"]
		}
	},
	"impressum-generator": {
		de: {
			intro: [
				"Ein Impressum ist keine Höflichkeit, sondern eine Auskunft: Wer betreibt diese Seite, und wo ist diese Person erreichbar, wenn etwas zu klären ist? § 5 des Digitale-Dienste-Gesetzes verlangt diese Angaben von jedem, der eine Website geschäftsmäßig betreibt — und „geschäftsmäßig“ beginnt deutlich früher, als die meisten annehmen. Eine Seite, auf der eine Leistung beschrieben und eine Telefonnummer genannt wird, ist bereits erfasst.",
				"Dieser Generator stellt ein Muster aus Ihren Angaben zusammen. Sie wählen die Rechtsform, tragen Anschrift und Kontakt ein und kreuzen an, was auf Ihren Betrieb zutrifft: Registereintrag, Umsatzsteuer-Identifikationsnummer, ein reglementierter Beruf mit Kammer, eine Aufsichtsbehörde, eine redaktionell verantwortliche Person nach dem Medienstaatsvertrag. Jede Ankreuzung fügt genau einen Abschnitt hinzu, jede zurückgenommene Ankreuzung entfernt ihn wieder.",
				"Zwei Dinge unterscheiden das Ergebnis von den Mustern, die seit Jahren unverändert im Netz stehen. Es verweist nicht auf die Online-Streitbeilegungsplattform der Europäischen Kommission — die wurde im Juli 2025 abgeschaltet, der Link führt seither ins Leere. Und es fragt nicht nach Ihrer Steuernummer: Ins Impressum gehört die Umsatzsteuer-Identifikationsnummer, nicht die Nummer, unter der Ihr Finanzamt Sie führt."
			],
			useCases: [
				{
					title: "Die erste eigene Website eines Handwerksbetriebs",
					text: "Ein Meisterbetrieb mit Handwerkskammer, Berufsbezeichnung und Verleihungsstaat braucht mehr Angaben als ein reiner Onlineshop. Die Ankreuzfelder führen durch genau diese Zusätze."
				},
				{
					title: "Umzug von der GbR in die GmbH",
					text: "Mit der neuen Rechtsform kommen Registergericht, Registernummer und die Geschäftsführung ins Impressum. Der Generator belegt die Registerangabe passend zur gewählten Rechtsform vor."
				},
				{
					title: "Ein Verein, der endlich online geht",
					text: "Vereinsregister statt Handelsregister, Vorstand statt Geschäftsführung: Die Beschriftung der Vertretung richtet sich nach der Rechtsform, damit der Text nicht wie ein ausgefülltes Formular klingt."
				},
				{
					title: "Ein Blog auf der Firmenseite",
					text: "Wer regelmäßig redaktionelle Beiträge veröffentlicht, braucht zusätzlich eine verantwortliche Person mit Anschrift nach § 18 Abs. 2 Medienstaatsvertrag. Ein eigenes Ankreuzfeld ergänzt diesen Abschnitt."
				},
				{
					title: "Ein altes Impressum überprüfen",
					text: "Stellen Sie Ihre Angaben neu zusammen und vergleichen Sie das Ergebnis mit dem, was auf Ihrer Seite steht. Vor allem der ODR-Verweis steht noch in erstaunlich vielen Impressen."
				}
			],
			steps: [
				{
					title: "Rechtsform wählen",
					description: "Die Auswahl steuert, wie die Vertretung beschriftet wird und ob ein Registereintrag vorbelegt ist. Eine GmbH hat eine Geschäftsführung und eine Handelsregisternummer, ein Verein einen Vorstand und eine Vereinsregisternummer."
				},
				{
					title: "Anbieter und Kontakt eintragen",
					description: "Name oder Firma, vollständige Anschrift mit Straße, Postleitzahl und Ort sowie mindestens eine E-Mail-Adresse. Ein Postfach genügt nicht: Verlangt ist eine ladungsfähige Anschrift, unter der Post tatsächlich zugestellt werden kann."
				},
				{
					title: "Zusätzliche Angaben ankreuzen",
					description: "Registereintrag, Umsatzsteuer-Identifikationsnummer, reglementierter Beruf, Aufsichtsbehörde, Berufshaftpflicht und redaktionelle Verantwortung. Zu jeder gesetzten Ankreuzung erscheinen die zugehörigen Felder direkt darunter."
				},
				{
					title: "Streitbeilegung entscheiden",
					description: "Sie erklären entweder, dass Sie an einem Schlichtungsverfahren vor einer Verbraucherschlichtungsstelle nicht teilnehmen, oder Sie benennen die zuständige Stelle. Beides ist zulässig; die Angabe selbst ist es, die nicht fehlen darf."
				},
				{
					title: "Prüfen und übernehmen",
					description: "Lesen Sie die Vorschau Zeile für Zeile gegen Ihren Registerauszug und Ihre Gewerbeanmeldung. Dann kopieren Sie den Text oder laden ihn als Datei herunter und fügen ihn in Ihr Redaktionssystem ein."
				}
			],
			privacy: "Ihre Firmendaten bleiben in Ihrem Browser. Der Text entsteht während der Eingabe im Gerät und wird an keinen Server übertragen, gespeichert oder ausgewertet — dieses Werkzeug hat gar keine Gegenstelle, an die es etwas senden könnte. Das ist bei einem Impressum kein akademischer Unterschied: Die Angaben, die Sie hier eintragen, umfassen die private Anschrift, wenn Sie von zu Hause aus arbeiten, und einige verbreitete Generatoren senden genau diese Eingaben zur Erzeugung an ihren Server.",
			faq: [
				{
					q: "Brauche ich ein Impressum, wenn ich nur eine kleine Seite ohne Shop habe?",
					a: "Sobald die Seite geschäftsmäßig betrieben wird, ja — und das beginnt nicht erst beim Verkauf. Eine Seite, die eine Leistung beschreibt und zur Kontaktaufnahme einlädt, ist bereits geschäftsmäßig. Rein private Seiten ohne jeden geschäftlichen Bezug sind ausgenommen, aber die Grenze ist enger, als sie klingt."
				},
				{
					q: "Warum verweist der Text nicht auf die OS-Plattform der EU?",
					a: "Weil es sie nicht mehr gibt. Die Europäische Kommission hat die Plattform zur Online-Streitbeilegung am 20. Juli 2025 abgeschaltet. Ein Verweis darauf führt heute ins Leere und ist damit eher ein Risiko als eine Pflichterfüllung. Die Angabe zur Verbraucherschlichtungsstelle nach dem Verbraucherstreitbeilegungsgesetz bleibt davon unberührt und steht weiterhin im Text."
				},
				{
					q: "Gehört meine Steuernummer ins Impressum?",
					a: "Nein. § 5 des Digitale-Dienste-Gesetzes verlangt die Umsatzsteuer-Identifikationsnummer, sofern eine vorhanden ist. Die Steuernummer des Finanzamts ist eine andere Angabe, sie ist nicht öffentlich und hat im Impressum nichts verloren. Deshalb bietet dieses Werkzeug dafür auch kein Feld an."
				},
				{
					q: "Reicht ein Postfach als Anschrift?",
					a: "Nein. Verlangt ist eine ladungsfähige Anschrift, unter der Post tatsächlich zugestellt werden kann. Wer von zu Hause aus arbeitet, muss deshalb in aller Regel die Wohnanschrift angeben. Eine Geschäftsadresse bei einem Anbieter, der Post entgegennimmt und weiterleitet, kann eine Alternative sein — das sollten Sie im Einzelfall prüfen lassen."
				},
				{
					q: "Ersetzt dieses Werkzeug die Prüfung durch eine Kanzlei?",
					a: "Nein. Es stellt ein Muster aus Ihren Angaben zusammen und macht sichtbar, welche Abschnitte üblicherweise dazugehören. Welche Pflichtangaben Ihr Betrieb tatsächlich schuldet, hängt an Rechtsform, Branche und Tätigkeit — und diese Umstände kennt das Werkzeug nicht. Lassen Sie den fertigen Text prüfen, bevor Sie ihn veröffentlichen."
				}
			],
			related: ["datenschutzerklaerung-generator", "barrierefreiheitserklaerung-generator"]
		},
		en: {
			intro: [
				"An imprint is not a courtesy, it is a piece of information: who runs this site, and where can that person be reached when something needs sorting out? Section 5 of the German Digital Services Act requires these details from anyone running a website in the course of business — and “in the course of business” starts a good deal earlier than most people assume. A page that describes a service and gives a phone number already qualifies.",
				"This generator assembles a sample from the details you enter. You pick the legal form, fill in the address and contact details, and tick what applies to your business: an entry in a register, a VAT identification number, a regulated profession with its chamber, a supervisory authority, a person with editorial responsibility under the German media treaty. Every tick adds exactly one section, and unticking it takes that section away again.",
				"Two things set the result apart from the samples that have sat unchanged on the web for years. It does not point at the European Commission's online dispute resolution platform — that was shut down in July 2025, and the link has led nowhere since. And it does not ask for your tax number: what belongs in an imprint is the VAT identification number, not the number your tax office files you under."
			],
			useCases: [
				{
					title: "A trade business putting up its first website",
					text: "A master craftsman with a chamber, a professional title and an awarding state needs more details than a plain online shop. The tick boxes walk through exactly those additions."
				},
				{
					title: "Moving from a partnership to a limited company",
					text: "The new legal form brings the registering court, the register number and the managing directors into the imprint. The generator pre-selects the register entry to match the legal form you choose."
				},
				{
					title: "An association finally going online",
					text: "An association register rather than a commercial one, a board rather than managing directors: the wording for the representation follows the legal form, so the text does not read like a filled-in form."
				},
				{
					title: "A blog on the company site",
					text: "Anyone publishing editorial content regularly also needs a responsible person with an address under section 18 (2) of the German media treaty. A separate tick box adds that section."
				},
				{
					title: "Checking an old imprint",
					text: "Assemble your details afresh and compare the result with what is on your site. The dead ODR reference in particular is still sitting in a surprising number of imprints."
				}
			],
			steps: [
				{
					title: "Choose the legal form",
					description: "The choice controls how the representation is labelled and whether a register entry is pre-selected. A limited company has managing directors and a commercial register number, an association has a board and an association register number."
				},
				{
					title: "Enter the provider and contact details",
					description: "Name or company, a complete address with street, postcode and town, and at least an email address. A post office box is not enough: what is required is an address at which documents can actually be served."
				},
				{
					title: "Tick the additional details",
					description: "Register entry, VAT identification number, regulated profession, supervisory authority, indemnity insurance and editorial responsibility. For every tick, the matching fields appear directly underneath."
				},
				{
					title: "Decide on dispute resolution",
					description: "You either declare that you do not take part in proceedings before a consumer arbitration board, or you name the competent body. Both are permissible; it is the statement itself that must not be missing."
				},
				{
					title: "Check it, then take it over",
					description: "Read the preview line by line against your register extract and your trade registration. Then copy the text or download it as a file and paste it into your content management system."
				}
			],
			privacy: "Your company details stay in your browser. The text is built on your device as you type and is never transmitted to a server, stored or analysed — this tool has no counterpart to send anything to. For an imprint that is not an academic distinction: the details you enter here include your private address if you work from home, and several widely used generators send exactly those inputs to their server to produce the text.",
			faq: [
				{
					q: "Do I need an imprint for a small site with no shop?",
					a: "As soon as the site is run in the course of business, yes — and that does not start with selling. A page that describes a service and invites people to get in touch is already commercial. Purely private pages with no business connection are exempt, but the boundary is narrower than it sounds."
				},
				{
					q: "Why does the text not point at the EU ODR platform?",
					a: "Because it no longer exists. The European Commission shut down the online dispute resolution platform on 20 July 2025. A reference to it now leads nowhere and is a liability rather than compliance. The statement about a consumer arbitration board under the German dispute resolution act is unaffected and stays in the text."
				},
				{
					q: "Does my tax number belong in the imprint?",
					a: "No. Section 5 of the German Digital Services Act asks for the VAT identification number, where one exists. The tax number issued by the tax office is a different thing, it is not public, and it has no place in an imprint. That is why this tool offers no field for it."
				},
				{
					q: "Is a post office box enough as an address?",
					a: "No. What is required is an address at which documents can actually be served. Anyone working from home will therefore usually have to give their home address. A business address with a provider that receives and forwards post can be an alternative — have that checked for your particular case."
				},
				{
					q: "Does this tool replace a review by a law firm?",
					a: "No. It assembles a sample from your details and shows which sections usually belong in one. Which mandatory details your business actually owes depends on its legal form, its sector and what it does — and the tool knows none of that. Have the finished text reviewed before you publish it."
				}
			],
			related: ["datenschutzerklaerung-generator", "barrierefreiheitserklaerung-generator"]
		}
	},
	"datenschutzerklaerung-generator": {
		de: {
			intro: [
				"Eine Datenschutzerklärung beantwortet eine einzige Frage, und zwar für jede Verarbeitung einzeln: Was passiert mit meinen Daten, und mit welchem Recht? Genau daran scheitern die meisten frei verfügbaren Muster. Sie zählen auf, welche Dienste eine Website einsetzt, nennen aber weder den Zweck noch die Rechtsgrundlage — und damit erfüllen sie Art. 13 der Datenschutz-Grundverordnung nicht, obwohl der Text vollständig aussieht.",
				"Dieser Generator arbeitet mit Bausteinen. Sie tragen den Verantwortlichen ein und kreuzen an, was auf Ihre Website zutrifft: externes Hosting, Server-Logdateien, Kontaktformular, Cookies, Webanalyse, Newsletter, Kartendienst, Schriftarten, Videos, soziale Netzwerke, Zahlungsdienstleister, Buchungssystem, Chat, Bewerbungen, Übermittlung in ein Drittland. Zu jedem gesetzten Haken erscheint ein Abschnitt mit Zweck und Rechtsgrundlage; ein entfernter Haken nimmt ihn wieder heraus.",
				"Der Unterschied zwischen Einwilligung und berechtigtem Interesse ist dabei fest verdrahtet und nicht Geschmackssache. Webanalyse, eingebundene Karten, Videos und von außen geladene Schriftarten werden hier auf Art. 6 Abs. 1 lit. a DSGVO in Verbindung mit § 25 Abs. 1 TDDDG gestützt, also auf eine Einwilligung. Ein Muster, das an diesen Stellen ein berechtigtes Interesse behauptet, schreibt eine falsche Angabe auf Ihre Seite — und sie steht dort schwarz auf weiß."
			],
			useCases: [
				{
					title: "Website ohne Analyse und ohne Werbung",
					text: "Der häufigste Fall bei kleinen Betrieben: Hosting, Server-Logdateien, ein Kontaktformular, sonst nichts. Nehmen Sie die Haken bei allem heraus, was Sie nicht einsetzen — der Text wird dadurch kürzer und richtiger."
				},
				{
					title: "Onlineshop mit Zahlungsdienstleister",
					text: "Bestellungen laufen über Art. 6 Abs. 1 lit. b DSGVO, die Zahlungsabwicklung über eigenverantwortliche Dienstleister, und die handels- und steuerrechtlichen Aufbewahrungsfristen bleiben unberührt."
				},
				{
					title: "Seite mit Karte und eingebetteten Videos",
					text: "Beide Dienste bauen beim Laden eine Verbindung zu einem fremden Server auf und übertragen dabei die IP-Adresse. Die zugehörigen Abschnitte sagen genau das und stützen sich auf eine Einwilligung."
				},
				{
					title: "Betrieb, der offene Stellen ausschreibt",
					text: "Bewerbungsunterlagen sind eine eigene Verarbeitung nach § 26 Abs. 1 BDSG mit eigener Löschfrist. Der Baustein nennt beides, statt Bewerbungen unter „Kontaktaufnahme“ verschwinden zu lassen."
				},
				{
					title: "Die eigene Erklärung gegenlesen",
					text: "Stellen Sie den Text neu zusammen und vergleichen Sie ihn Abschnitt für Abschnitt mit dem, was auf Ihrer Seite steht. Auffällig sind meist Dienste, die längst abgeschaltet sind, und fehlende Rechtsgrundlagen."
				}
			],
			steps: [
				{
					title: "Verantwortlichen eintragen",
					description: "Name, vollständige Anschrift und eine Kontaktmöglichkeit. Wenn Sie eine datenschutzbeauftragte Person benannt haben, kommt deren Kontakt dazu; ohne Benennung bleibt der Abschnitt weg, statt eine Stelle zu erfinden, die es nicht gibt."
				},
				{
					title: "Betrieb der Website ankreuzen",
					description: "Externes Hosting und Server-Logdateien treffen auf nahezu jede Website zu. Wo Sie den Anbieter und den Serverstandort kennen, tragen Sie beides ein — die Angabe macht aus einer allgemeinen Formel eine überprüfbare Aussage."
				},
				{
					title: "Kontaktwege und Auswertung wählen",
					description: "Kontaktformular, E-Mail, Telefon; danach technisch notwendige Cookies, einwilligungspflichtige Cookies mit dem eingesetzten Einwilligungswerkzeug und gegebenenfalls die Webanalyse mit dem Namen des Werkzeugs."
				},
				{
					title: "Eingebundene Dienste benennen",
					description: "Kartendienst, Schriftarten, Videos und Content Delivery Network. Bei den Schriftarten entscheidet die Auswahl zwischen lokaler Auslieferung und Google Fonts über den ganzen Absatz — die beiden Fälle sind datenschutzrechtlich nicht dasselbe."
				},
				{
					title: "Prüfen, kopieren, einbinden",
					description: "Lesen Sie die Vorschau gegen das, was Ihre Seite tatsächlich lädt. Dann kopieren Sie den Text oder laden ihn als Datei herunter und verlinken ihn von jeder Seite aus — üblicherweise aus der Fußzeile."
				}
			],
			privacy: "Alles, was Sie eintragen, bleibt auf Ihrem Gerät: die Anschrift Ihres Betriebs, die Namen Ihrer Dienstleister, der Kontakt Ihrer datenschutzbeauftragten Person. Der Text entsteht im Browser, es gibt keine Übertragung an einen Server und nichts wird gespeichert. Bei einem Werkzeug für Datenschutztexte wäre alles andere auch schwer zu erklären — die Liste der eingesetzten Dienste ist ein recht genaues Abbild der technischen Ausstattung eines Betriebs.",
			faq: [
				{
					q: "Warum stützt der Text die Webanalyse nicht auf ein berechtigtes Interesse?",
					a: "Weil das Speichern und Auslesen von Informationen auf dem Endgerät nach § 25 Abs. 1 TDDDG eine Einwilligung verlangt, sobald es nicht technisch notwendig ist. Für die Reichweitenmessung gilt das praktisch immer. Ein Muster, das hier ein berechtigtes Interesse behauptet, ist bequemer und falsch."
				},
				{
					q: "Muss ich jeden eingesetzten Dienst namentlich nennen?",
					a: "Die Verordnung verlangt, dass Betroffene die Verarbeitung nachvollziehen können, und dazu gehört in aller Regel, wer die Daten erhält. Der Name des Hosters, des Analysewerkzeugs oder des Zahlungsdienstleisters gehört deshalb hinein. Wo der Generator ein Feld dafür anbietet, ist die Angabe nicht schmückendes Beiwerk."
				},
				{
					q: "Was ist der Unterschied zwischen technisch notwendigen und anderen Cookies?",
					a: "Technisch notwendig ist, was die Seite braucht, um zu funktionieren — eine Sitzung, ein Warenkorb, der Schutz eines Formulars. Alles andere, insbesondere Reichweitenmessung und Werbung, darf erst nach einer Einwilligung gesetzt werden. Die Abschnitte im erzeugten Text sind entsprechend getrennt und nennen unterschiedliche Rechtsgrundlagen."
				},
				{
					q: "Brauche ich eine datenschutzbeauftragte Person?",
					a: "Nicht jeder Betrieb. Eine Benennungspflicht besteht unter anderem, wenn die Kerntätigkeit in umfangreicher Verarbeitung besonderer Datenkategorien oder in umfangreicher regelmäßiger Beobachtung besteht. Kreuzen Sie das Feld nur an, wenn Sie tatsächlich jemanden benannt haben — eine erfundene Stelle im Text ist schlechter als keine."
				},
				{
					q: "Ersetzt dieses Werkzeug eine anwaltliche Prüfung?",
					a: "Nein. Es setzt ein Muster aus Bausteinen zusammen und zeigt, welche Angaben zu welcher Verarbeitung gehören. Ob die Auswahl zu Ihrem Betrieb passt und ob Sie alle Verarbeitungen erfasst haben, kann es nicht wissen. Lassen Sie den Text prüfen, bevor Sie ihn veröffentlichen."
				}
			],
			related: ["impressum-generator", "ki-kennzeichnung-bilder"]
		},
		en: {
			intro: [
				"A privacy policy answers a single question, separately for every operation: what happens to my data, and on what legal basis? That is exactly where most freely available samples fail. They list the services a website uses but name neither the purpose nor the legal basis — and so they do not satisfy Article 13 of the General Data Protection Regulation, even though the text looks complete.",
				"This generator works with blocks. You enter the controller and tick what applies to your website: external hosting, server log files, a contact form, cookies, web analytics, a newsletter, a map service, web fonts, videos, social networks, payment providers, a booking system, chat, job applications, transfers to a third country. Each tick produces a section stating the purpose and the legal basis; removing a tick takes it out again.",
				"The distinction between consent and legitimate interest is hard-wired here rather than a matter of taste. Web analytics, embedded maps, videos and externally loaded fonts are placed on Article 6 (1) (a) GDPR together with section 25 (1) TDDDG — that is, on consent. A sample that claims a legitimate interest at those points puts an incorrect statement on your site, and there it sits in black and white."
			],
			useCases: [
				{
					title: "A site with no analytics and no advertising",
					text: "The commonest case for a small business: hosting, server log files, a contact form, nothing else. Untick everything you do not use — the text gets shorter and more accurate at the same time."
				},
				{
					title: "An online shop with a payment provider",
					text: "Orders run on Article 6 (1) (b) GDPR, payments through providers acting on their own responsibility, and the retention periods under commercial and tax law remain unaffected."
				},
				{
					title: "A page with a map and embedded videos",
					text: "Both services open a connection to a third-party server when they load, transmitting the IP address. The matching sections say precisely that and rest on consent."
				},
				{
					title: "A business advertising vacancies",
					text: "Application documents are processing in their own right under section 26 (1) BDSG, with their own deletion period. The block names both, instead of letting applications disappear under “getting in touch”."
				},
				{
					title: "Proof-reading your existing policy",
					text: "Assemble the text afresh and compare it section by section with what is on your site. What usually stands out are services switched off long ago, and missing legal bases."
				}
			],
			steps: [
				{
					title: "Enter the controller",
					description: "Name, complete address and a way to get in touch. If you have appointed a data protection officer, their contact details are added; without an appointment the section stays out, rather than inventing a role that does not exist."
				},
				{
					title: "Tick how the website is run",
					description: "External hosting and server log files apply to almost every website. Where you know the provider and the location of the servers, enter both — that turns a general formula into a statement someone can check."
				},
				{
					title: "Choose contact channels and analysis",
					description: "Contact form, email, telephone; then technically necessary cookies, cookies requiring consent along with the consent tool in use, and web analytics with the name of the tool where applicable."
				},
				{
					title: "Name the embedded services",
					description: "Map service, web fonts, videos and content delivery network. For fonts the choice between local delivery and Google Fonts decides the whole paragraph — in data protection terms the two are not the same case."
				},
				{
					title: "Check it, copy it, link it",
					description: "Read the preview against what your site actually loads. Then copy the text or download it as a file and link to it from every page, usually from the footer."
				}
			],
			privacy: "Everything you enter stays on your device: the address of your business, the names of your service providers, the contact details of your data protection officer. The text is built in the browser, nothing is transmitted to a server and nothing is stored. For a tool that writes data protection texts, anything else would be hard to explain — the list of services in use is a fairly precise picture of a company's technical setup.",
			faq: [
				{
					q: "Why does the text not place web analytics on a legitimate interest?",
					a: "Because storing and reading information on a terminal device requires consent under section 25 (1) TDDDG as soon as it is not technically necessary. For audience measurement that is practically always the case. A sample that claims a legitimate interest here is more convenient and wrong."
				},
				{
					q: "Do I have to name every service I use?",
					a: "The regulation requires that data subjects can follow what happens to their data, and that generally includes who receives it. The name of the host, the analytics tool or the payment provider therefore belongs in the text. Where the generator offers a field for it, filling it in is not decoration."
				},
				{
					q: "What is the difference between necessary cookies and the rest?",
					a: "Technically necessary means what the site needs in order to work — a session, a shopping basket, protecting a form. Everything else, audience measurement and advertising in particular, may only be set after consent. The sections in the generated text are separated accordingly and cite different legal bases."
				},
				{
					q: "Do I need a data protection officer?",
					a: "Not every business does. An appointment is required where, among other things, the core activity involves large-scale processing of special categories of data or large-scale regular monitoring. Only tick the box if you have actually appointed someone — an invented role in the text is worse than none."
				},
				{
					q: "Does this tool replace a legal review?",
					a: "No. It assembles a sample from blocks and shows which statements belong to which processing. Whether that selection fits your business, and whether you have captured every operation, is something it cannot know. Have the text reviewed before you publish it."
				}
			],
			related: ["impressum-generator", "ki-kennzeichnung-bilder"]
		}
	},
	"barrierefreiheitserklaerung-generator": {
		de: {
			intro: [
				"Seit dem 28. Juni 2025 gilt das Barrierefreiheitsstärkungsgesetz. Es verpflichtet Unternehmen, die bestimmte Dienstleistungen an Verbraucher erbringen — Onlineshops, Buchungs- und Terminsysteme, Bankdienste, Personenbeförderung —, ihre digitalen Angebote barrierefrei zu gestalten und darüber öffentlich Auskunft zu geben. Öffentliche Stellen trifft dieselbe Auskunftspflicht schon länger, allerdings über einen anderen Weg: § 12b des Behindertengleichstellungsgesetzes und die Barrierefreie-Informationstechnik-Verordnung.",
				"Das sind zwei verschiedene Erklärungen, und sie sehen einander zum Verwechseln ähnlich. Der Unterschied steht am Ende: Eine öffentliche Stelle verweist auf die Schlichtungsstelle nach § 16 BGG, ein Unternehmen auf die Marktüberwachungsstelle der Länder. Vertauscht sind beide Texte falsch — und zwar an einer Stelle, die niemand liest, solange sich niemand beschwert. Dieser Generator fragt deshalb als Erstes, wer die Erklärung abgibt, und richtet den ganzen Text danach aus.",
				"Alles Weitere ist die ehrliche Bestandsaufnahme: Ist das Angebot vollständig, teilweise oder nicht mit dem angewandten Standard vereinbar? Welche Inhalte sind es nicht, und warum? Wie erreicht man Sie, wenn jemand an eine Hürde stößt, und wie schnell antworten Sie? Eine Erklärung, die überall „vollständig vereinbar“ behauptet, ist selten glaubwürdig und im Zweifel eine falsche Angabe."
			],
			useCases: [
				{
					title: "Onlineshop unter dem BFSG",
					text: "Ein Shop, der an Verbraucher verkauft, braucht die Erklärung seit Juni 2025. Der Text nennt das Gesetz, den angewandten Standard und den Weg zur Marktüberwachungsstelle."
				},
				{
					title: "Buchungssystem einer Praxis oder Werkstatt",
					text: "Terminvergabe im Netz ist eine Dienstleistung im Sinne des Gesetzes. Wer sie anbietet, schuldet auch dann eine Erklärung, wenn die restliche Website nur informiert."
				},
				{
					title: "Kommune oder Behörde nach BITV 2.0",
					text: "Für öffentliche Stellen gilt der andere Weg: § 12b BGG, die Verordnung und am Ende die Schlichtungsstelle. Die Auswahl ganz oben stellt den kompletten Text darauf um."
				},
				{
					title: "Erklärung nach einer Überprüfung fortschreiben",
					text: "Die Erklärung ist kein einmaliges Dokument. Tragen Sie das neue Prüfdatum ein und kürzen Sie die Liste der Mängel um das, was inzwischen behoben ist."
				},
				{
					title: "Bestandsaufnahme vor dem Umbau",
					text: "Das Feld für die nicht barrierefreien Inhalte zwingt dazu, konkret zu werden. Wer es ausfüllt, hat nebenbei die Liste dessen, was am Angebot als Nächstes zu tun ist."
				}
			],
			steps: [
				{
					title: "Regime wählen",
					description: "Unternehmen nach dem BFSG oder öffentliche Stelle nach BITV 2.0 und § 12b BGG. Diese Auswahl steuert nicht nur eine Überschrift, sondern die genannten Vorschriften und die Stelle, an die sich eine unzufriedene Person am Ende wenden kann."
				},
				{
					title: "Angebot und Anbieter benennen",
					description: "Wer gibt die Erklärung ab, und wofür gilt sie? Benennen Sie das Angebot so, wie es die Nutzer kennen — „der Onlineshop shop.beispiel.de“ ist eine bessere Angabe als „unsere digitalen Angebote“."
				},
				{
					title: "Stand der Vereinbarkeit festhalten",
					description: "Vollständig, teilweise oder nicht vereinbar, dazu der angewandte Standard. Unterhalb der vollständigen Vereinbarkeit verlangt der Generator eine Liste der nicht barrierefreien Inhalte — pauschale Sätze helfen niemandem, der auf eine Hürde gestoßen ist."
				},
				{
					title: "Begründung und Prüfverfahren angeben",
					description: "Unverhältnismäßige Belastung, Ausnahme vom Anwendungsbereich oder laufende Umsetzung, und ob die Bewertung aus einer Selbstbewertung oder einer externen Prüfung stammt. Datum der Erstellung und der letzten Überprüfung gehören dazu."
				},
				{
					title: "Rückmeldeweg festlegen und veröffentlichen",
					description: "Ein erreichbarer Kontaktweg und eine Frist, innerhalb derer Sie antworten. Anschließend den Text übernehmen und dauerhaft auffindbar veröffentlichen, üblicherweise aus der Fußzeile heraus verlinkt."
				}
			],
			privacy: "Der Text entsteht vollständig in Ihrem Browser; weder die Angaben zu Ihrem Betrieb noch die Liste Ihrer bekannten Mängel verlassen das Gerät. Gerade der zweite Punkt ist hier relevant: Was Sie in das Feld für die nicht barrierefreien Inhalte schreiben, ist eine ungeschönte Aufstellung dessen, was an Ihrem Angebot noch nicht funktioniert. Diese Aufstellung geht an keinen Server, und sie wird nirgends zwischengespeichert.",
			faq: [
				{
					q: "Gilt das BFSG auch für meinen kleinen Betrieb?",
					a: "Das Gesetz kennt eine Ausnahme für Kleinstunternehmen, die Dienstleistungen erbringen: weniger als zehn Beschäftigte und höchstens zwei Millionen Euro Jahresumsatz oder Jahresbilanzsumme. Für Produkte gilt diese Ausnahme nicht. Ob Ihr Angebot als Dienstleistung in den Anwendungsbereich fällt, sollten Sie im Einzelfall prüfen lassen."
				},
				{
					q: "Worin unterscheiden sich BFSG und BITV 2.0?",
					a: "Im Adressaten und im Rechtsweg. Das BFSG richtet sich an Unternehmen, die Verbrauchern bestimmte Produkte und Dienstleistungen anbieten, und wird von der Marktüberwachung der Länder überwacht. Die BITV 2.0 samt § 12b BGG richtet sich an öffentliche Stellen, und dort führt der Weg zur Schlichtungsstelle nach § 16 BGG. Die inhaltlichen Anforderungen ähneln sich stark, beide verweisen auf die EN 301 549."
				},
				{
					q: "Was schreibe ich in die Liste der nicht barrierefreien Inhalte?",
					a: "Konkret das, was Sie wissen: ein nicht getaggtes PDF, ein Video ohne Untertitel, ein Formular ohne verbundene Beschriftungen, eine Karte ohne Textalternative. Je genauer die Angabe, desto eher findet jemand den Weg zu der Fassung, die er nutzen kann — und desto glaubwürdiger ist die Erklärung insgesamt."
				},
				{
					q: "Wie oft muss ich die Erklärung überprüfen?",
					a: "Sie soll den tatsächlichen Stand wiedergeben, also nach jeder wesentlichen Änderung am Angebot und ansonsten regelmäßig. Für öffentliche Stellen ist eine jährliche Überprüfung vorgesehen. Das Feld für das Datum der letzten Überprüfung ist deshalb kein Beiwerk: Es macht sichtbar, wie alt die Aussage ist."
				},
				{
					q: "Reicht die Erklärung, oder muss ich die Seite auch umbauen?",
					a: "Die Erklärung ist die Auskunftspflicht, nicht die Erfüllung. Sie beschreibt den Stand und benennt einen Rückmeldeweg; barrierefrei wird das Angebot dadurch nicht. Wer sie ernst nimmt, hat mit der Liste der Mängel allerdings genau den Arbeitsplan, den der Umbau braucht."
				}
			],
			related: ["kontrast-checker", "impressum-generator"]
		},
		en: {
			intro: [
				"The German Accessibility Strengthening Act has applied since 28 June 2025. It obliges businesses providing certain services to consumers — online shops, booking and appointment systems, banking services, passenger transport — to make their digital offerings accessible and to say publicly where they stand. Public bodies have had the same duty for longer, but by a different route: section 12b of the Disability Equality Act and the Barrier-Free Information Technology Ordinance.",
				"Those are two different statements, and they look confusingly alike. The difference is at the end: a public body points to the conciliation body under section 16 BGG, a business points to the market surveillance authority of the federal states. Swap them and both texts are wrong — in a place nobody reads until somebody complains. This generator therefore asks first who is issuing the statement, and shapes the whole text around that answer.",
				"Everything after that is an honest inventory: is the service fully, partially or not compliant with the standard applied? Which content is not, and why? How can people reach you when they hit a barrier, and how quickly do you answer? A statement claiming full compliance everywhere is rarely credible and, in case of doubt, an incorrect statement."
			],
			useCases: [
				{
					title: "An online shop under the BFSG",
					text: "A shop selling to consumers has needed the statement since June 2025. The text names the act, the standard applied and the route to the market surveillance authority."
				},
				{
					title: "The booking system of a practice or workshop",
					text: "Arranging appointments online is a service in the sense of the act. Anyone offering one owes a statement even where the rest of the website only informs."
				},
				{
					title: "A municipality or authority under BITV 2.0",
					text: "Public bodies take the other route: section 12b BGG, the ordinance, and the conciliation body at the end. The choice at the top switches the entire text over."
				},
				{
					title: "Updating the statement after a review",
					text: "The statement is not a one-off document. Enter the new review date and shorten the list of shortcomings by whatever has been fixed in the meantime."
				},
				{
					title: "Taking stock before a rebuild",
					text: "The field for non-accessible content forces you to be specific. Filling it in leaves you with the list of what needs doing next to the service anyway."
				}
			],
			steps: [
				{
					title: "Choose the regime",
					description: "A business under the BFSG, or a public body under BITV 2.0 and section 12b BGG. That choice controls more than a heading: it decides which rules are cited and which body a dissatisfied person can turn to at the end."
				},
				{
					title: "Name the service and the provider",
					description: "Who is issuing the statement, and what does it cover? Name the service the way its users know it — “the online shop shop.example.com” is a better statement than “our digital offerings”."
				},
				{
					title: "Record the compliance status",
					description: "Fully, partially or not compliant, together with the standard applied. Below full compliance the generator asks for a list of the non-accessible content — blanket sentences help nobody who has just hit a barrier."
				},
				{
					title: "State the reasoning and the assessment",
					description: "Disproportionate burden, an exemption from the scope, or work in progress, and whether the assessment comes from a self-assessment or an external review. The dates of preparation and of the last review belong here too."
				},
				{
					title: "Set out the feedback route and publish",
					description: "A contact channel that works and a period within which you answer. Then take the text over and publish it so that it stays findable, usually linked from the footer."
				}
			],
			privacy: "The text is produced entirely in your browser; neither the details of your business nor the list of shortcomings you know about ever leave the device. The second point matters here in particular: what you write into the field for non-accessible content is an unvarnished account of what does not yet work about your service. That account goes to no server, and it is cached nowhere.",
			faq: [
				{
					q: "Does the BFSG apply to my small business?",
					a: "The act exempts microenterprises providing services: fewer than ten employees and at most two million euros of annual turnover or balance sheet total. That exemption does not apply to products. Whether your offering falls within the scope as a service is something to have checked for your particular case."
				},
				{
					q: "What is the difference between the BFSG and BITV 2.0?",
					a: "The addressee and the route of redress. The BFSG addresses businesses offering certain products and services to consumers and is policed by the market surveillance authorities of the federal states. BITV 2.0 together with section 12b BGG addresses public bodies, where the route leads to the conciliation body under section 16 BGG. The substantive requirements are very similar; both refer to EN 301 549."
				},
				{
					q: "What do I write into the list of non-accessible content?",
					a: "Specifically what you know: an untagged PDF, a video without subtitles, a form without associated labels, a map without a text alternative. The more precise the entry, the more likely someone finds their way to a version they can use — and the more credible the statement is as a whole."
				},
				{
					q: "How often do I have to review the statement?",
					a: "It is meant to reflect the actual state, so after every substantial change to the service and otherwise at regular intervals. Public bodies are expected to review annually. The field for the date of the last review is therefore not decoration: it shows how old the claim is."
				},
				{
					q: "Is the statement enough, or do I have to rebuild the site?",
					a: "The statement is the duty to inform, not the compliance itself. It describes the state of play and names a feedback route; it does not make the service accessible. Taken seriously, though, the list of shortcomings is exactly the work plan the rebuild needs."
				}
			],
			related: ["kontrast-checker", "impressum-generator"]
		}
	},
	"ki-kennzeichnung-bilder": {
		de: {
			intro: [
				"Ein Bild, das eine Maschine erzeugt hat, sieht man ihm immer seltener an. Genau deshalb verlangt die KI-Verordnung der Europäischen Union eine Kennzeichnung — und sie verlangt sie zweimal: Wer ein System betreibt, das synthetische Inhalte erzeugt, muss die Ausgabe maschinenlesbar als künstlich erzeugt markieren; wer ein solches Bild veröffentlicht, muss das für die Betrachter offenlegen. Die Transparenzpflichten des Art. 50 greifen ab dem 2. August 2026.",
				"Dieses Werkzeug bedient beide Hälften. Es brennt eine Plakette mit einem Hinweis wie „KI-generiert“ in das Bild — Ecke, Größe, Deckkraft und Stil wählen Sie selbst — und es schreibt zusätzlich einen maschinenlesbaren Vermerk in die Datei: als Textabschnitt in ein PNG, als Kommentarsegment in ein JPEG. Beides passiert im Browser, ohne Upload und ohne Anmeldung.",
				"Zwei Dinge sagt das Werkzeug offen, statt sie zu verschweigen. WebP kann den maschinenlesbaren Vermerk nicht tragen; wählen Sie dieses Format, bekommen Sie nur die sichtbare Kennzeichnung, und die Insel weist darauf hin. Und das Bild wird beim Erzeugen neu gezeichnet, wodurch vorhandene Aufnahmedaten des Originals verloren gehen — bei einem Werkzeug, das Metadaten hinzufügt, ist das eine Nebenwirkung, die man kennen sollte."
			],
			useCases: [
				{
					title: "Produktbilder, die aus einem Bildgenerator stammen",
					text: "Wer Stimmungsbilder oder Freisteller aus einem KI-Werkzeug im Shop einsetzt, kennzeichnet sie sichtbar und legt den Vermerk zusätzlich in die Datei, wo Plattformen ihn auslesen können."
				},
				{
					title: "Beiträge in sozialen Netzwerken",
					text: "Mehrere Plattformen werten Metadaten aus und setzen selbst einen Hinweis. Ein Bild, das den Vermerk schon mitbringt, wird eher richtig einsortiert als eines, das erst geraten werden muss."
				},
				{
					title: "Redaktionelle Illustrationen auf der eigenen Seite",
					text: "Für den Blog eines Betriebs ist die Plakette die einfachste ehrliche Lösung: Sie steht im Bild und bleibt auch dann erhalten, wenn das Bild weiterverwendet wird."
				},
				{
					title: "Bestand nachträglich kennzeichnen",
					text: "Ältere Bilder lassen sich einzeln durchlaufen. Die Einstellungen bleiben zwischen zwei Bildern erhalten, sodass eine Serie dieselbe Plakette an derselben Stelle bekommt."
				},
				{
					title: "Bildunterschrift und Alternativtext vorbereiten",
					text: "Unter dem Werkzeug steht ein fertiger Satz zum Mitkopieren. Die Offenlegung im Text ergänzt die Plakette dort, wo das Bild ohne Beschriftung erscheint."
				}
			],
			steps: [
				{
					title: "Bild auswählen",
					description: "PNG, JPEG oder WebP aus dem eigenen Gerät. Die Datei wird gelesen, aber nicht übertragen; die Vorschau darunter zeigt das Ergebnis in verkleinerter Fassung, gerechnet mit denselben Maßen wie das spätere Bild."
				},
				{
					title: "Text und Ecke festlegen",
					description: "Wählen Sie einen der Vorschläge oder schreiben Sie einen eigenen Hinweis. Die Ecke sollte dorthin zeigen, wo im Bild wenig passiert — eine Plakette über einem Gesicht liest sich schlecht und wird beim Zuschneiden zuerst geopfert."
				},
				{
					title: "Größe, Deckkraft und Stil einstellen",
					description: "Die Größe ist ein Anteil der Bildbreite, damit die Plakette auf einem großen Foto genauso wirkt wie auf einem kleinen. Der Stil kehrt Fläche und Schrift um; wählen Sie den, der sich vom Bildhintergrund an dieser Stelle deutlich absetzt."
				},
				{
					title: "Format wählen und Hinweis einbetten",
					description: "PNG bewahrt die Bildqualität und trägt den maschinenlesbaren Vermerk, JPEG ebenfalls und ist kleiner. WebP ist am kleinsten, kann den Vermerk aber nicht aufnehmen — das Ankreuzfeld bleibt dann wirkungslos, und der Hinweis darunter sagt es."
				},
				{
					title: "Erzeugen und herunterladen",
					description: "Das fertige Bild erscheint unter dem Werkzeug, zusammen mit der Auskunft, ob der Vermerk in der Datei gelandet ist. Prüfen Sie das Ergebnis einmal in voller Größe, bevor Sie es veröffentlichen."
				}
			],
			privacy: "Ihr Bild verlässt das Gerät nicht. Es wird über eine Zeichenfläche im Browser gelesen, mit der Plakette versehen und dort auch wieder als Datei zusammengesetzt; einen Server, an den es gehen könnte, gibt es in diesem Werkzeug nicht. Das ist bei Bildern eine andere Größenordnung als bei einem Textschnipsel: Ein Foto trägt oft mehr Nebeninformation, als der Absender vermutet — Aufnahmeort, Gerät, Zeitpunkt. Und genau diese Aufnahmedaten verwirft der Zeichenvorgang, worauf das Werkzeug auch hinweist.",
			faq: [
				{
					q: "Ab wann muss ich KI-Bilder kennzeichnen?",
					a: "Die Transparenzpflichten des Art. 50 der KI-Verordnung gelten ab dem 2. August 2026. Unabhängig davon können sich Kennzeichnungspflichten schon heute aus dem Wettbewerbsrecht oder aus den Regeln einzelner Plattformen ergeben — eine Kennzeichnung vorher ist also kein vergebener Aufwand."
				},
				{
					q: "Reicht die sichtbare Plakette allein?",
					a: "Für die Offenlegung gegenüber Betrachtern ist ein deutlich erkennbarer Hinweis der Kern. Die Verordnung verlangt daneben aber ausdrücklich eine maschinenlesbare Markierung der Ausgabe. Deshalb schreibt dieses Werkzeug zusätzlich einen Vermerk in die Datei, und deshalb sagt es auch, wenn das Format das nicht zulässt."
				},
				{
					q: "Warum bekommt WebP keinen Vermerk in der Datei?",
					a: "Weil ein sauberer Weg dafür mehr Aufwand bedeutet, als dieses Werkzeug tragen soll: PNG hat einen Textabschnitt und JPEG ein Kommentarsegment, beides sind schlanke, überall gelesene Strukturen. Für WebP müsste ein XMP-Block in den Container geschrieben werden. Statt das halbfertig zu tun, sagt die Insel, dass der Vermerk fehlt."
				},
				{
					q: "Bleiben die EXIF-Daten des Originals erhalten?",
					a: "Nein. Das Bild wird auf eine Zeichenfläche neu gezeichnet, und dabei gehen Aufnahmedaten wie Kamera, Zeitpunkt und Aufnahmeort verloren. Wenn Sie diese Angaben brauchen, bewahren Sie das Original auf. Für ein rein synthetisches Bild ist der Verlust ohne Bedeutung — es hatte nie welche."
				},
				{
					q: "Kann jemand die Kennzeichnung wieder entfernen?",
					a: "Der Vermerk in der Datei lässt sich mit einem Metadatenwerkzeug löschen, und die Plakette lässt sich wegschneiden oder überdecken. Eine fälschungssichere Herkunft ist etwas anderes und braucht kryptografisch signierte Daten. Für die Offenlegung gegenüber Ihrem Publikum ist diese Kennzeichnung dennoch das, was verlangt ist."
				}
			],
			related: ["bild-komprimieren", "datenschutzerklaerung-generator"]
		},
		en: {
			intro: [
				"It gets harder every year to see that a picture was made by a machine. That is exactly why the European Union's AI Act requires labelling — and it requires it twice over: whoever runs a system that produces synthetic content must mark the output as artificially generated in a machine-readable form, and whoever publishes such a picture must disclose that to the people looking at it. The transparency duties in Article 50 apply from 2 August 2026.",
				"This tool covers both halves. It burns a badge carrying a note such as “AI-generated” into the picture — you choose the corner, the size, the opacity and the style — and it additionally writes a machine-readable note into the file: a text chunk in a PNG, a comment segment in a JPEG. Both happen in the browser, with no upload and no sign-up.",
				"Two things the tool states openly rather than glossing over. WebP cannot carry the machine-readable note; choose that format and you get the visible label only, and the island says so. And producing the image redraws it, which discards any capture data the original held — for a tool that adds metadata, that is a side effect worth knowing about."
			],
			useCases: [
				{
					title: "Product images that came out of an image generator",
					text: "Anyone using generated mood shots or cut-outs in a shop labels them visibly and puts the note into the file as well, where platforms can read it."
				},
				{
					title: "Posts on social networks",
					text: "Several platforms read metadata and add a notice of their own. A picture that already carries the note is more likely to be classified correctly than one that has to be guessed at."
				},
				{
					title: "Editorial illustrations on your own site",
					text: "For a company blog the badge is the simplest honest answer: it sits in the picture and survives even when the picture is reused elsewhere."
				},
				{
					title: "Labelling an existing library",
					text: "Older pictures can be run through one at a time. The settings persist between images, so a series gets the same badge in the same place."
				},
				{
					title: "Preparing a caption and alternative text",
					text: "A ready-made sentence sits underneath the tool for copying. Disclosure in the text complements the badge wherever the picture appears without a caption."
				}
			],
			steps: [
				{
					title: "Choose an image",
					description: "A PNG, JPEG or WebP from your own device. The file is read but never transmitted; the preview underneath shows the result at a reduced size, worked out with the same proportions as the final picture."
				},
				{
					title: "Set the text and the corner",
					description: "Pick one of the suggestions or write a note of your own. The corner should sit where little is happening in the picture — a badge across a face reads badly and is the first thing sacrificed when the image is cropped."
				},
				{
					title: "Adjust size, opacity and style",
					description: "The size is a share of the image width, so the badge carries the same weight on a large photograph as on a small one. The style swaps the panel and the lettering; pick whichever stands out clearly against the background at that spot."
				},
				{
					title: "Choose a format and embed the note",
					description: "PNG keeps the image quality and carries the machine-readable note, JPEG does too and is smaller. WebP is the smallest but cannot take the note — the tick box then has no effect, and the line underneath says so."
				},
				{
					title: "Produce it and download",
					description: "The finished picture appears below the tool, together with a statement of whether the note made it into the file. Look at the result once at full size before you publish it."
				}
			],
			privacy: "Your image never leaves the device. It is read onto a canvas in the browser, given the badge, and reassembled into a file right there; this tool has no server it could send anything to. With pictures that is a different order of magnitude from a snippet of text: a photograph often carries more incidental information than the sender assumes — where it was taken, on what, and when. And it is precisely that capture data the redraw discards, which the tool also points out.",
			faq: [
				{
					q: "From when do I have to label AI images?",
					a: "The transparency duties in Article 50 of the AI Act apply from 2 August 2026. Independently of that, labelling obligations can already follow today from competition law or from the rules of individual platforms — so labelling earlier is not wasted effort."
				},
				{
					q: "Is the visible badge on its own enough?",
					a: "For disclosure to the people looking at the picture, a clearly recognisable notice is the core of it. Alongside that, however, the regulation expressly requires the output to be marked in a machine-readable form. That is why this tool also writes a note into the file, and why it says so when the format does not allow it."
				},
				{
					q: "Why does WebP get no note in the file?",
					a: "Because doing it cleanly means more machinery than this tool should carry: PNG has a text chunk and JPEG a comment segment, both lean structures that everything reads. WebP would need an XMP block written into the container. Rather than do that half-way, the island says the note is missing."
				},
				{
					q: "Is the original EXIF data kept?",
					a: "No. The image is redrawn onto a canvas, and capture data such as the camera, the time and the location is lost in the process. If you need those details, keep the original. For a purely synthetic picture the loss means nothing — it never had any."
				},
				{
					q: "Can somebody remove the label again?",
					a: "The note in the file can be deleted with a metadata tool, and the badge can be cropped off or painted over. Tamper-proof provenance is a different thing and needs cryptographically signed data. For disclosure to your own audience, this labelling is nonetheless what is being asked for."
				}
			],
			related: ["bild-komprimieren", "datenschutzerklaerung-generator"]
		}
	}
};
/**
* The guide for a tool, in the requested language, falling back to German.
*
* Returns `undefined` for an unknown slug rather than throwing: a tool pack
* can add a tool before its guide is written, and a page without a guide is a
* thin page, not a broken build. `guides.test.ts` is what stops that state
* from lasting — it fails when a composed tool has no guide.
*/
function guideFor(slug, lang = "de") {
	const set = guides[slug];
	if (!set) return void 0;
	return set[lang] ?? set.de;
}
//#endregion
//#region src/lib/guideOverrides.ts
async function guideOverrides(lang) {
	return contentCache.get(`tool-guides:${lang}`, async () => {
		try {
			const url = new URL(`${apiBase()}/tools/guides`);
			url.searchParams.set("lang", lang);
			const res = await fetch(url, {
				headers: siteKeyHeaders(),
				signal: AbortSignal.timeout(1e4)
			});
			assertKeyAccepted(res, url);
			if (!res.ok) return {};
			return (await res.json()).guides ?? {};
		} catch (err) {
			console.warn("[tds-tools] tool guides fetch failed, using committed text:", err);
			return {};
		}
	});
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
//#region src/components/ToolPage.astro
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
	const copy = mergeCopy(toolCopyFor(lang, tool, site.name), override);
	const toolUrl = `${site.origin}${localizedPath(`/tools/${tool.slug}`, lang)}`;
	const guide = mergeGuide(tool.slug, lang, override);
	const jsonLd = asGraph(softwareApplicationSchema({
		name: copy.name,
		url: toolUrl,
		description: copy.description,
		type: tool.seo?.jsonLdType ?? "WebApplication",
		lang,
		isFree: !tool.isPremium,
		priceCents: tool.priceCents,
		keywords: tool.keywords
	}), breadcrumbSchema([{
		name: s.breadcrumbAll,
		url: `${site.origin}${base}/`
	}, {
		name: copy.name,
		url: toolUrl
	}]), ...guide ? [howToSchema(lang === "de" ? `${copy.name} verwenden` : `How to use ${copy.name}`, guide.steps), faqPageSchema(guide.faq)] : []);
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": copy.seoTitle,
		"description": copy.description,
		"lang": lang,
		"ogImage": lang === "de" ? `/og/tools/${tool.slug}.png` : `/og/en/tools/${tool.slug}.png`,
		"jsonLd": jsonLd
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="tds-page mx-auto max-w-4xl px-4 py-10 sm:px-6"><nav class="text-sm text-[color:var(--color-muted)]"><a${addAttribute(`${base}/`, "href")} class="tnav-link link-underline">${s.breadcrumbAll}</a><span class="mx-2">/</span><span class="text-[color:var(--color-ink)]">${copy.name}</span></nav><div class="tool-intro"><div class="tds-page__head"><h1 class="tds-page__title tool-title flex w-full items-center gap-3">${renderComponent($$result, "Icon", $$Icon, {
		"name": tool.icon,
		"class": "h-7 w-7 shrink-0 text-[color:var(--color-accent)]"
	})}<span class="min-w-0 hyphens-auto break-words">${copy.name}</span></h1></div><p class="tds-page__lede max-w-2xl">${copy.description}</p></div>${gated && renderTemplate`${renderComponent($$result, "ToolGate", ToolGate, {
		"client:load": true,
		"toolId": tool.id,
		"requiresLogin": tool.requiresLogin,
		"isPremium": tool.isPremium,
		"priceCents": tool.priceCents,
		"bodySelector": "#tool-body",
		"client:component-hydration": "load",
		"client:component-path": "~/components/ToolGate.tsx",
		"client:component-export": "default"
	})}`}<section id="tool-body"${addAttribute(gated, "hidden")} class="tds-card p-5 sm:p-7">${Tool ? renderTemplate`${renderComponent($$result, "Tool", Tool, { "lang": lang })}` : renderTemplate`<p class="text-[color:var(--color-danger)]">${lang === "de" ? "Dieses Tool konnte nicht geladen werden." : "This tool could not be loaded."}</p>`}</section>${showAds && renderTemplate`${renderComponent($$result, "AdSlot", $$AdSlot, {
		"client": ads.publisherId,
		"slot": ads.slotTool,
		"lang": lang
	})}`}${guide && renderTemplate`${renderComponent($$result, "ToolGuide", $$ToolGuide, {
		"guide": guide,
		"toolName": copy.name,
		"lang": lang
	})}`}${guide && renderTemplate`${renderComponent($$result, "RelatedTools", $$RelatedTools, {
		"slugs": guide.related,
		"all": allTools,
		"current": tool.slug,
		"lang": lang,
		"base": base
	})}`}${renderComponent($$result, "ServiceNote", $$ServiceNote, { "lang": lang })}</div>` })}`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/components/ToolPage.astro", void 0);
//#endregion
//#region src/lib/toolRoute.ts
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
//#endregion
export { $$ToolPage as n, resolveToolRoute as t };
