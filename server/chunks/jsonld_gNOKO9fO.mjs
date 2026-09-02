import { A as renderHead, C as Fragment$2, L as unescapeHTML, M as defineScriptVars, N as createRenderInstruction, O as renderTemplate, S as renderComponent, T as renderSlot, j as addAttribute, k as maybeRenderHead, z as createAstro } from "./sequence_D8AML-3n.mjs";
import { t as createComponent } from "./compiler_DXKtTkSA.mjs";
import { a as ogLocale, c as links, d as t, i as neutralPath, l as site, o as seoConfig, r as localizedPath, t as adsConfig } from "./catalog_r24T3a_b.mjs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
//#region node_modules/astro/dist/runtime/server/render/script.js
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/components/index.js
var SEMANTIC_CHIP_VARIANTS$1 = [
	"neutral",
	"success",
	"warning",
	"danger",
	"info"
];
var CATEGORICAL_CHIP_VARIANTS$1 = [
	"cat-violet",
	"cat-teal",
	"cat-amber",
	"cat-rose",
	"cat-cyan"
];
var CHIP_VARIANTS$1 = [...SEMANTIC_CHIP_VARIANTS$1, ...CATEGORICAL_CHIP_VARIANTS$1];
new Set(CHIP_VARIANTS$1);
var THEME_STORAGE_KEY$1 = "tds-theme";
var THEME_ATTRIBUTE$1 = "data-theme";
var THEME_CHANGE_EVENT = "tds:theme-change";
var DARK_QUERY = "(prefers-color-scheme: dark)";
var hasDocument = () => typeof document !== "undefined";
function systemTheme() {
	try {
		return typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
	} catch {
		return "light";
	}
}
function resolveTheme(preference) {
	return preference === "system" ? systemTheme() : preference;
}
function applyThemePreference(preference, options = {}) {
	const theme = resolveTheme(preference);
	try {
		if (preference === "system") localStorage.removeItem(THEME_STORAGE_KEY$1);
		else localStorage.setItem(THEME_STORAGE_KEY$1, preference);
	} catch {}
	if (hasDocument()) document.documentElement.setAttribute(THEME_ATTRIBUTE$1, theme);
	if (options.announce !== false && typeof window !== "undefined") try {
		const detail = {
			preference,
			theme
		};
		window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail }));
	} catch {}
	return theme;
}
var cssEase = {
	out: `cubic-bezier(${[
		.2,
		.8,
		.2,
		1
	].join(", ")})`,
	inOut: `cubic-bezier(${[
		.4,
		0,
		.2,
		1
	].join(", ")})`
};
function ThemeToggle({ labelToDark = "Auf Dunkel umschalten", labelToLight = "Auf Hell umschalten" } = {}) {
	const [theme, setTheme] = useState("light");
	const [mounted, setMounted] = useState(false);
	const buttonRef = useRef(null);
	useEffect(() => {
		const current = document.documentElement.getAttribute(THEME_ATTRIBUTE$1);
		setTheme(current === "dark" ? "dark" : "light");
		setMounted(true);
	}, []);
	const flip = () => {
		const next = theme === "dark" ? "light" : "dark";
		const apply = () => {
			setTheme(next);
			applyThemePreference(next);
		};
		const startViewTransition = document.startViewTransition;
		const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (!startViewTransition || prefersReduced) {
			apply();
			return;
		}
		if (window.matchMedia("(pointer: coarse)").matches) {
			startViewTransition.call(document, () => {
				flushSync(apply);
			}).ready.then(() => {
				document.documentElement.animate({
					opacity: [0, 1],
					transform: ["scale(1.02)", "scale(1)"]
				}, {
					duration: 320,
					easing: cssEase.out,
					pseudoElement: "::view-transition-new(root)"
				});
			});
			return;
		}
		const rect = buttonRef.current?.getBoundingClientRect();
		const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
		const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
		const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
		startViewTransition.call(document, () => {
			flushSync(apply);
		}).ready.then(() => {
			document.documentElement.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] }, {
				duration: 480,
				easing: cssEase.inOut,
				pseudoElement: "::view-transition-new(root)"
			});
		});
	};
	const label = mounted && theme === "dark" ? labelToLight : labelToDark;
	return /* @__PURE__ */ jsxs("button", {
		ref: buttonRef,
		type: "button",
		onClick: flip,
		"aria-label": label,
		title: label,
		className: "tds-theme-toggle inline-flex items-center justify-center w-9 h-9 rounded-full text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:bg-black/5 active:bg-black/10 transition-colors cursor-pointer",
		children: [/* @__PURE__ */ jsx("svg", {
			"aria-hidden": "true",
			width: "18",
			height: "18",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.75",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			className: mounted && theme === "dark" ? "hidden" : "block",
			children: /* @__PURE__ */ jsx("path", { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" })
		}), /* @__PURE__ */ jsxs("svg", {
			"aria-hidden": "true",
			width: "18",
			height: "18",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.75",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			className: mounted && theme === "dark" ? "block" : "hidden",
			children: [
				/* @__PURE__ */ jsx("circle", {
					cx: "12",
					cy: "12",
					r: "4"
				}),
				/* @__PURE__ */ jsx("line", {
					x1: "12",
					y1: "2",
					x2: "12",
					y2: "5"
				}),
				/* @__PURE__ */ jsx("line", {
					x1: "12",
					y1: "19",
					x2: "12",
					y2: "22"
				}),
				/* @__PURE__ */ jsx("line", {
					x1: "2",
					y1: "12",
					x2: "5",
					y2: "12"
				}),
				/* @__PURE__ */ jsx("line", {
					x1: "19",
					y1: "12",
					x2: "22",
					y2: "12"
				}),
				/* @__PURE__ */ jsx("line", {
					x1: "4.93",
					y1: "4.93",
					x2: "6.99",
					y2: "6.99"
				}),
				/* @__PURE__ */ jsx("line", {
					x1: "17.01",
					y1: "17.01",
					x2: "19.07",
					y2: "19.07"
				}),
				/* @__PURE__ */ jsx("line", {
					x1: "4.93",
					y1: "19.07",
					x2: "6.99",
					y2: "17.01"
				}),
				/* @__PURE__ */ jsx("line", {
					x1: "17.01",
					y1: "6.99",
					x2: "19.07",
					y2: "4.93"
				})
			]
		})]
	});
}
function initialsOf(name) {
	const words = name.trim().split(/\s+/).filter(Boolean);
	if (words.length === 0) return "?";
	const head = (value) => Array.from(value ?? "")[0] ?? "";
	return (head(words[0]) + (words.length > 1 ? head(words[words.length - 1]) : "")).toUpperCase() || "?";
}
function hash(value) {
	let h = 5381;
	for (let i = 0; i < value.length; i += 1) h = (h << 5) + h + value.charCodeAt(i) | 0;
	return Math.abs(h);
}
function Avatar({ name, src, seed, size = "md", decorative = false, className }) {
	const [failed, setFailed] = useState(false);
	const label = (name ?? "").trim();
	const classes = ["tds-avatar"];
	if (size === "sm") classes.push("tds-avatar--sm");
	else if (size === "lg") classes.push("tds-avatar--lg");
	if (className) classes.push(className);
	const showImage = Boolean(src) && !failed;
	const variant = CATEGORICAL_CHIP_VARIANTS$1[hash(String(seed ?? label ?? "")) % CATEGORICAL_CHIP_VARIANTS$1.length];
	const a11y = decorative ? { "aria-hidden": true } : {
		role: "img",
		"aria-label": label || "Profilbild"
	};
	if (showImage) return /* @__PURE__ */ jsx("img", {
		...a11y,
		alt: decorative ? "" : label,
		src: src ?? void 0,
		className: classes.join(" "),
		onError: () => setFailed(true),
		loading: "lazy",
		decoding: "async"
	});
	return /* @__PURE__ */ jsx("span", {
		...a11y,
		className: classes.join(" "),
		"data-avatar-variant": variant,
		children: /* @__PURE__ */ jsx("span", {
			"aria-hidden": "true",
			children: initialsOf(label)
		})
	});
}
var translations = {
	de: {
		nav: {
			about: "Über mich",
			services: "Leistungen",
			tech: "Tech",
			portfolio: "Portfolio",
			process: "Prozess",
			blog: "Journal",
			contact: "Kontakt",
			cta: "Unverbindlich anfragen",
			pricing: "Preise"
		},
		hero: {
			availability: "Verfügbar für Projekte · Q3 2026",
			location: "Schwarzenbek · Hamburg",
			headline: "Digitalisierung, die",
			headlineAccent: "Arbeit",
			headlineSuffix: "abnimmt.",
			sub: "Websites, Webshops und Werkzeuge für kleine Betriebe. Ich schaue, wo es hakt – und baue, was hilft. Aus Schwarzenbek bei Hamburg.",
			cta1: "Unverbindlich anfragen",
			cta2: "Leistungen ansehen",
			scrollHint: "Scrollen"
		},
		about: {
			label: "— 01 / Über mich",
			headline: "Hi, ich bin",
			headlineAccent: "Julian.",
			lead: "Ich bin freier Entwickler in Schwarzenbek bei Hamburg. Ich arbeite für Selbstständige und kleine Betriebe ohne eigene IT.",
			p1: "Website, Webshop, kleines Programm oder ein Ablauf, der einfacher werden soll: Ich höre zu, sortiere das Vorhaben und setze es um. Ein Ansprechpartner, von Anfang bis Ende.",
			p2: "Standardsoftware zwingt Sie, sich anzupassen. Ein gutes Werkzeug macht es andersherum. Manchmal ist die ehrliche Antwort: Es lohnt sich nicht.",
			portraitPlaceholder: "Hier könnte ein Schwarz-Weiß-Portrait von Julian stehen — schräg sitzend am Schreibtisch, leicht zur Kamera gewandt, naturnahes Licht.",
			stat1Value: "5+",
			stat1Label: "Jahre Erfahrung",
			stat2Value: "5",
			stat2Label: "Leistungsbereiche",
			stat3Value: "1:1",
			stat3Label: "Persönliche Betreuung"
		},
		services: {
			label: "— 02 / Leistungen",
			headline: "Was ich für Sie",
			headlineAccent: "leiste.",
			items: [
				{
					number: "01",
					title: "Digitalisierung für Unternehmen",
					description: "Listen von Hand, Zahlen aus drei Quellen, immer wieder abtippen. Ich nehme mir einen konkreten Ablauf vor und mache ihn einfacher – nicht gleich den ganzen Betrieb.",
					tags: [
						"Abläufe",
						"Auswertungen",
						"Automatisierung",
						"Schnittstellen"
					]
				},
				{
					number: "02",
					title: "Digitale Konzepte",
					description: "Sie haben eine Idee, aber noch keinen Plan. Ich mache daraus ein verständliches Konzept: was gebraucht wird, welcher Weg sinnvoll ist, was er kostet.",
					tags: [
						"Anforderungen",
						"Klickbarer Entwurf",
						"Aufwand",
						"Fahrplan"
					]
				},
				{
					number: "03",
					title: "Auftragsentwicklung",
					description: "Nicht jede Aufgabe braucht ein großes Programm. Oft reicht das Werkzeug, das zu Ihrer Arbeit passt: eine Excel-Vorlage, eine kleine Anwendung, eine Auswertung.",
					tags: [
						"Excel-Vorlage",
						"Kleine Anwendung",
						"Auswertung",
						"Datenübernahme"
					]
				},
				{
					number: "04",
					title: "Webauftritt",
					description: "Veraltet, unklar oder noch gar nicht da? Dann springen Interessenten ab, bevor sie anfragen. Ich baue neu, bringe Bestehendes auf Stand – und pflege es weiter.",
					tags: [
						"Neue Website",
						"Überarbeitung",
						"Pflege",
						"Auffindbarkeit"
					]
				},
				{
					number: "05",
					title: "Webshop",
					description: "Ihr Laden läuft, jetzt soll es online weitergehen. Ich plane, baue und betreue den Shop – auf Wunsch so, dass Artikel und Bestand vom Handy aus laufen.",
					tags: [
						"Onlineverkauf",
						"Produktpflege",
						"Bestand per Handy",
						"Betreuung"
					]
				}
			]
		},
		tech: {
			label: "Tech Stack",
			headline: "Womit ich",
			headlineAccent: "arbeite.",
			body: "Werkzeuge, die sich bewährt haben – keine Glaubensfrage, sondern das Richtige fürs Problem. Sprachen wechseln, gute Architektur bleibt."
		},
		portfolio: {
			label: "— 03 / Portfolio",
			headline: "Ausgewählte",
			headlineAccent: "Projekte.",
			comingSoon: "Demnächst",
			placeholderLabel: "Platzhalter",
			items: [
				{
					number: "01",
					badge: "Web-App",
					title: "Mittelstands-Plattform",
					description: "Eine maßgeschneiderte Webanwendung für einen mittelständischen Kunden – individuell entwickelt, skalierbar gebaut.",
					stack: [
						"Angular",
						"Node.js",
						"SQL"
					],
					imagePlaceholder: "Screenshot des Dashboards mit zentraler KPI-Übersicht, links Sidebar-Navigation, rechts ein Detailpanel."
				},
				{
					number: "02",
					badge: "Digitalisierung",
					title: "Prozess-Automatisierung",
					description: "Automatisierung manueller Geschäftsprozesse durch intelligente Workflows und Datenpipelines.",
					stack: [
						"Python",
						"KNIME",
						"SQL"
					],
					imagePlaceholder: "Workflow-Diagramm: KNIME-Knoten, die Daten aus drei Quellen zusammenführen, validieren und in eine SQL-Tabelle schreiben."
				},
				{
					number: "03",
					badge: "Web-Auftritt",
					title: "Markenpräsenz Mittelstand",
					description: "Professioneller Webauftritt für ein etabliertes Unternehmen – performant, barrierefrei, individuell.",
					stack: ["WordPress", "TypeScript"],
					imagePlaceholder: "Hero-Mockup der Kunden-Website auf Desktop und Mobile – ruhige Typografie, großes Schlüsselbild."
				},
				{
					number: "04",
					badge: "App",
					title: "Interne Business-App",
					description: "Desktop-Applikation zur internen Prozessverwaltung – intuitiv bedienbar, wartungsfreundlich dokumentiert.",
					stack: [
						"C#",
						"SQL",
						"Vue"
					],
					imagePlaceholder: "Screenshot der Desktop-App: Listenansicht der Aufträge mit Filterleiste oben und Detail-Panel rechts."
				}
			]
		},
		process: {
			label: "— 04 / Vorgehen",
			headline: "Wie ich",
			headlineAccent: "arbeite.",
			body: "Kein starrer Ablauf. Je nach Vorhaben verschiebt sich das Gewicht. Die vier Schritte sind der übliche Rahmen, kein Korsett.",
			steps: [
				{
					number: "01",
					title: "Zuhören",
					duration: "Zum Einstieg",
					description: "Sie schildern mir, wo es hakt. Ich frage nach – und sage ehrlich, ob sich eine Umsetzung lohnt."
				},
				{
					number: "02",
					title: "Konzept",
					duration: "Je nach Umfang",
					description: "Was wird gebraucht, welcher Weg ist sinnvoll, was kostet er? Die Grundlage steht, bevor Budget fließt."
				},
				{
					number: "03",
					title: "Umsetzung",
					duration: "Nach Absprache",
					description: "Ich baue es und zeige Ihnen Zwischenstände. Nachsteuern ist unterwegs günstig, hinterher teuer."
				},
				{
					number: "04",
					title: "Betreuung",
					duration: "Auf Wunsch",
					description: "Übergabe, Einweisung, auf Wunsch Pflege und Anpassungen. Ansprechpartner bleibe ich in jedem Fall."
				}
			]
		},
		blog: {
			label: "— 05 / Journal",
			headline: "Gedanken &",
			headlineAccent: "Artikel.",
			readMore: "Weiterlesen",
			allPosts: "Alle Artikel",
			placeholderLabel: "Platzhalter",
			posts: [
				{
					category: "Digitalisierung",
					title: "Digitalisierung fängt nicht beim Großprojekt an.",
					excerpt: "Sie fängt bei dem einen Ablauf an, der Sie jede Woche Stunden kostet – und den außer Ihnen niemand sieht.",
					date: "2026-08-04",
					slug: "digitalisierung-faengt-klein-an",
					imagePlaceholder: "Handgeschriebene Liste auf einem Klemmbrett neben einem Laptop – warmes Morgenlicht, Werkstatt im Hintergrund."
				},
				{
					category: "Webshop",
					title: "Lohnt sich ein Webshop für mein Ladengeschäft?",
					excerpt: "Nicht für jedes Sortiment. Vier Fragen, die die Antwort meist schon vorwegnehmen.",
					date: "2026-07-21",
					slug: "lohnt-sich-ein-webshop",
					imagePlaceholder: "Ladentheke von oben – Produkte, ein Notizblock und ein Smartphone mit offener Produktliste."
				},
				{
					category: "Werkzeuge",
					title: "Excel-Tabelle oder eigenes Werkzeug?",
					excerpt: "Eine Tabelle ist erstaunlich weit tragfähig. Es gibt aber drei Punkte, an denen sie zuverlässig kippt.",
					date: "2026-07-07",
					slug: "excel-oder-eigenes-werkzeug",
					imagePlaceholder: "Bildschirm mit einer weit gescrollten Tabelle, daneben ein Notizzettel mit Formelfragment."
				}
			]
		},
		contact: {
			label: "— 06 / Kontakt",
			headline: "Lassen Sie uns",
			headlineAccent: "reden.",
			sub: "Schreiben Sie mir in zwei Sätzen, wo es hakt. Ich antworte in der Regel innerhalb von 24 Stunden.",
			form: {
				name: "Name",
				namePlaceholder: "Hanna Schmidt",
				email: "E-Mail",
				emailPlaceholder: "hanna@manufaktur.de",
				company: "Unternehmen (optional)",
				companyPlaceholder: "Schmidt Manufaktur",
				message: "Nachricht",
				messagePlaceholder: "Wir pflegen unsere Preise noch in drei Listen gleichzeitig — das kostet jede Woche einen halben Tag.",
				consent: "Ich willige in die Verarbeitung meiner Daten gemäß der",
				consentLink: "Datenschutzerklärung",
				consentSuffix: "ein.",
				submit: "Nachricht senden",
				submitting: "Wird gesendet …",
				successTitle: "Nachricht erhalten!",
				successMessage: "Danke für Ihre Nachricht. Ich melde mich in der Regel innerhalb von 24 Stunden.",
				errorMessage: "Etwas ist schiefgelaufen. Bitte versuchen Sie es noch einmal."
			},
			info: {
				emailLabel: "E-Mail",
				phoneLabel: "Handy",
				locationLabel: "Standort",
				socialLabel: "Social",
				email: "kontakt@tracht-digital.de",
				phone: "+49 178 822 4022",
				location: "Schwarzenbek · nähe Hamburg"
			}
		},
		pricing: {
			label: "— Preise",
			headline: "Transparente",
			headlineAccent: "Stundensätze.",
			sub: "Klare Preise, keine Pauschalpakete. Stundengenau abgerechnet, ehrlich geschätzt, mit einer Obergrenze, auf die Sie sich verlassen können.",
			teaserLabel: "Preise",
			teaserHeadline: "Klare Sätze,",
			teaserHeadlineAccent: "keine Pauschalen.",
			teaserSub: "Ab 95 € pro Stunde – stundengenau abgerechnet, ohne versteckte Kosten.",
			teaserCta: "Alle Stundensätze ansehen",
			teaserFromLabel: "ab",
			hourSuffix: "/ Stunde",
			includesLabel: "Beinhaltet:",
			items: [
				{
					title: "Beratung & Konzeption",
					rate: 120,
					description: "Strategische Begleitung, Architektur-Workshops, technische Reviews. Am Ende steht ein verständliches Konzept – nicht nur Folien.",
					includes: [
						"Aufnahme und Sortierung Ihrer Anforderungen",
						"Architektur- & Anforderungs-Workshops",
						"Code- & Stack-Reviews mit dokumentierten Empfehlungen",
						"Schriftliche Konzepte und Entscheidungsgrundlagen"
					],
					highlight: false
				},
				{
					title: "Web- & App-Entwicklung",
					rate: 105,
					description: "Frontend, Backend, mobile und Desktop-Apps. Sauber gebaut, getestet, dokumentiert – auch in zwei Jahren noch wartbar.",
					includes: [
						"Komponentenentwicklung (React, Vue, Angular)",
						"API- und Backend-Entwicklung (Node.js, C#, SQL)",
						"Mobile- und Desktop-Apps",
						"Tests, CI/CD und Dokumentation inklusive"
					],
					highlight: true
				},
				{
					title: "Digitalisierung & Automation",
					rate: 105,
					description: "Manuelle Abläufe durch Workflows, Datenpipelines und Integrationen ablösen. Konkrete Umsetzung, kein PowerPoint.",
					includes: [
						"Prozessanalyse vor Ort oder remote",
						"Workflow-Automation (Python, KNIME, n8n)",
						"Datenpipelines, ETL und SQL-Reporting",
						"Integration bestehender Tools und Systeme"
					],
					highlight: false
				},
				{
					title: "Wartung & Support",
					rate: 85,
					description: "Bestehende Systeme pflegen, Updates einspielen, Fehler beheben. Reaktionszeit nach Vereinbarung.",
					includes: [
						"Bug-Fixes und Hotfixes",
						"Dependency- und Sicherheits-Updates",
						"Monitoring und Performance-Optimierung",
						"Auf Wunsch monatliches Retainer-Modell"
					],
					highlight: false
				},
				{
					title: "Workshops & Schulungen",
					rate: 135,
					description: "Wissen weitergeben statt zurückhalten. Workshops für Ihr Team – von TypeScript-Basics bis Architektur.",
					includes: [
						"Inhouse- oder Remote-Workshops",
						"Maßgeschneiderte Schulungsunterlagen",
						"Hands-on-Übungen mit Ihrem echten Code",
						"Nachgespräch und Aufzeichnung inklusive"
					],
					highlight: false
				}
			],
			notesTitle: "Gut zu wissen",
			notes: [
				"Alle Preise zzgl. gesetzlicher Mehrwertsteuer (19 %).",
				"Tagessatz auf Anfrage – Rabatt ab 5 Tagen pro Monat verfügbar.",
				"Festpreis möglich, wenn der Umfang vorab klar ist.",
				"Reisekosten werden separat abgerechnet."
			],
			ctaTitle: "Klingt passend?",
			ctaSub: "Schreiben Sie mir kurz, worum es geht. Ich sage Ihnen ehrlich, ob und wie ich helfen kann.",
			ctaButton: "Unverbindlich anfragen",
			back: "Zurück"
		},
		consulting: {
			label: "— Beratung",
			headline: "Erst zuhören,",
			headlineAccent: "dann bauen.",
			body: "Vielleicht haben Sie ein klares Vorhaben, vielleicht nur das Gefühl, dass etwas einfacher laufen müsste. Beides ist ein guter Anfang.",
			primaryCta: "Unverbindlich anfragen",
			secondaryCta: "Leistungen ansehen"
		},
		footer: {
			slogan: "Digitale Lösungen, die wirklich passen.",
			tagline: "Persönlich, passgenau, aus einer Hand — aus Schwarzenbek bei Hamburg.",
			nav: "Navigation",
			contactTitle: "Kontakt",
			copyright: "© 2026 Tracht Digital Solutions. Alle Rechte vorbehalten.",
			impressum: "Impressum",
			datenschutz: "Datenschutz",
			pricing: "Preise"
		},
		errors: {
			name: "Bitte geben Sie Ihren Namen an.",
			email: "Bitte geben Sie eine gültige E-Mail-Adresse an.",
			message: "Mindestens 20 Zeichen, bitte.",
			consent: "Zustimmung erforderlich."
		},
		cookieNotice: {
			label: "Hinweis zu Cookies und Datenschutz",
			siteText: "Diese Website verwendet keine Tracking-Cookies. Es werden lediglich technisch notwendige Einstellungen (z. B. Ihr Farbschema) lokal in Ihrem Browser gespeichert.",
			panelText: "Dieser Bereich verwendet ausschließlich ein technisch notwendiges Cookie für die sichere Anmeldung (Session-Cookie). Es findet kein Tracking statt.",
			privacy: "Mehr in der Datenschutzerklärung.",
			accept: "Verstanden",
			consentText: "Wir zeigen auf diesem Blog Werbung von Google AdSense. Dafür werden – nur mit Ihrer Einwilligung – Cookies und ähnliche Technologien zu Werbezwecken gesetzt. Ihre Wahl ist freiwillig und jederzeit änderbar.",
			consentAccept: "Akzeptieren",
			consentDecline: "Ablehnen"
		},
		toast: { dismiss: "Schließen" }
	},
	en: {
		nav: {
			about: "About",
			services: "Services",
			tech: "Tech",
			portfolio: "Portfolio",
			process: "Process",
			blog: "Journal",
			contact: "Contact",
			cta: "Get in touch",
			pricing: "Pricing"
		},
		hero: {
			availability: "Available for projects · Q3 2026",
			location: "Schwarzenbek · Hamburg",
			headline: "Digitalization that takes",
			headlineAccent: "work",
			headlineSuffix: "off your hands.",
			sub: "Websites, online shops and tools for small businesses. I look at where things stick – and build what helps. From Schwarzenbek near Hamburg.",
			cta1: "Get in touch",
			cta2: "See services",
			scrollHint: "Scroll"
		},
		about: {
			label: "— 01 / About",
			headline: "Hi, I'm",
			headlineAccent: "Julian.",
			lead: "I'm a freelance developer in Schwarzenbek near Hamburg. I work with freelancers and small businesses that have no IT department.",
			p1: "Website, online shop, a small program or a workflow that should get simpler: I listen, sort out the plan and build it. One contact, start to finish.",
			p2: "Off-the-shelf software makes you adapt to it. A good tool works the other way round. Sometimes the honest answer is: it isn't worth it.",
			portraitPlaceholder: "A black-and-white portrait of Julian — seated at an angle at his desk, slightly turned toward the camera, soft natural light.",
			stat1Value: "5+",
			stat1Label: "Years of experience",
			stat2Value: "5",
			stat2Label: "Areas of work",
			stat3Value: "1:1",
			stat3Label: "Personal support"
		},
		services: {
			label: "— 02 / Services",
			headline: "What I",
			headlineAccent: "deliver.",
			items: [
				{
					number: "01",
					title: "Digitalization for Businesses",
					description: "Lists kept by hand, figures from three places, the same retyping every day. I take one concrete workflow and make it simpler – not the whole business at once.",
					tags: [
						"Workflows",
						"Reporting",
						"Automation",
						"Integrations"
					]
				},
				{
					number: "02",
					title: "Digital Concepts",
					description: "You have an idea but no plan yet. I turn it into a concept you can read: what is needed, which route makes sense, what it costs.",
					tags: [
						"Requirements",
						"Clickable draft",
						"Effort",
						"Roadmap"
					]
				},
				{
					number: "03",
					title: "Custom Development",
					description: "Not every task needs a big program. Often it just needs the tool that fits your work: a spreadsheet template, a small application, a report.",
					tags: [
						"Spreadsheet template",
						"Small application",
						"Reporting",
						"Data import"
					]
				},
				{
					number: "04",
					title: "Web Presence",
					description: "Out of date, unclear or not there at all? Then people leave before they get in touch. I build new, bring existing sites up to standard – and maintain them.",
					tags: [
						"New website",
						"Rework",
						"Maintenance",
						"Findability"
					]
				},
				{
					number: "05",
					title: "Online Shop",
					description: "Your shop runs locally, now it should run online too. I plan, build and look after it – set up so items and stock can be managed from a phone.",
					tags: [
						"Online sales",
						"Product upkeep",
						"Stock by phone",
						"Support"
					]
				}
			]
		},
		tech: {
			label: "Tech Stack",
			headline: "What I",
			headlineAccent: "work with.",
			body: "Tools that have proven themselves – not a matter of faith, just the right thing for the problem. Languages change; good architecture stays."
		},
		portfolio: {
			label: "— 03 / Portfolio",
			headline: "Selected",
			headlineAccent: "projects.",
			comingSoon: "Coming soon",
			placeholderLabel: "Placeholder",
			items: [
				{
					number: "01",
					badge: "Web App",
					title: "Mid-market platform",
					description: "A custom-built web application for a mid-market client – individually developed, built to scale.",
					stack: [
						"Angular",
						"Node.js",
						"SQL"
					],
					imagePlaceholder: "Dashboard screenshot with central KPI overview, sidebar navigation on the left, detail panel on the right."
				},
				{
					number: "02",
					badge: "Digitalization",
					title: "Process automation",
					description: "Automation of manual business processes through intelligent workflows and data pipelines.",
					stack: [
						"Python",
						"KNIME",
						"SQL"
					],
					imagePlaceholder: "Workflow diagram: KNIME nodes pulling data from three sources, validating it, writing into a SQL table."
				},
				{
					number: "03",
					badge: "Web presence",
					title: "Brand presence",
					description: "Professional web presence for an established company – performant, accessible, individually crafted.",
					stack: ["WordPress", "TypeScript"],
					imagePlaceholder: "Hero mockup of the client site on desktop and mobile — quiet typography, large keystone image."
				},
				{
					number: "04",
					badge: "App",
					title: "Internal business app",
					description: "Desktop application for internal process management – intuitively usable, cleanly documented.",
					stack: [
						"C#",
						"SQL",
						"Vue"
					],
					imagePlaceholder: "Desktop app screenshot: list view of orders with filter bar at the top and detail panel on the right."
				}
			]
		},
		process: {
			label: "— 04 / Process",
			headline: "How I",
			headlineAccent: "work.",
			body: "No rigid process. The weight shifts with the job. The four steps below are the usual frame, not a corset.",
			steps: [
				{
					number: "01",
					title: "Listening",
					duration: "To begin with",
					description: "You tell me where things get stuck. I keep asking – and say honestly whether building something is worth it."
				},
				{
					number: "02",
					title: "Concept",
					duration: "Depends on scope",
					description: "What is needed, which route makes sense, what does it cost? The groundwork is there before any budget moves."
				},
				{
					number: "03",
					title: "Delivery",
					duration: "As agreed",
					description: "I build it and show you where it stands. Changing course is cheap along the way and expensive afterwards."
				},
				{
					number: "04",
					title: "Support",
					duration: "If you want it",
					description: "Handover, a walkthrough, and maintenance if you want it. Either way I stay your point of contact."
				}
			]
		},
		blog: {
			label: "— 05 / Journal",
			headline: "Thoughts &",
			headlineAccent: "articles.",
			readMore: "Read more",
			allPosts: "All articles",
			placeholderLabel: "Placeholder",
			posts: [
				{
					category: "Digitalization",
					title: "Digitalization doesn't start with a big project.",
					excerpt: "It starts with the one routine that costs you hours every week – the one nobody but you can see.",
					date: "2026-08-04",
					slug: "digitalisierung-faengt-klein-an",
					imagePlaceholder: "A handwritten list on a clipboard beside a laptop — warm morning light, workshop in the background."
				},
				{
					category: "Online shop",
					title: "Is an online shop worth it for my local business?",
					excerpt: "Not for every range of products. Four questions that usually answer it for you.",
					date: "2026-07-21",
					slug: "lohnt-sich-ein-webshop",
					imagePlaceholder: "A shop counter from above — products, a notepad and a phone showing an open product list."
				},
				{
					category: "Tools",
					title: "Spreadsheet or a tool of your own?",
					excerpt: "A spreadsheet carries you surprisingly far. There are three points, though, where it reliably tips over.",
					date: "2026-07-07",
					slug: "excel-oder-eigenes-werkzeug",
					imagePlaceholder: "A screen showing a spreadsheet scrolled far down, next to a sticky note with a fragment of a formula."
				}
			]
		},
		contact: {
			label: "— 06 / Contact",
			headline: "Let's",
			headlineAccent: "talk.",
			sub: "Tell me in two sentences where things are getting stuck. I usually respond within 24 hours.",
			form: {
				name: "Name",
				namePlaceholder: "Alex Marlow",
				email: "Email",
				emailPlaceholder: "alex@marlow.studio",
				company: "Company (optional)",
				companyPlaceholder: "Marlow Studios",
				message: "Message",
				messagePlaceholder: "We still keep our prices in three separate lists — it costs us half a day every week.",
				consent: "I consent to the processing of my data in accordance with the",
				consentLink: "Privacy Policy",
				consentSuffix: ".",
				submit: "Send message",
				submitting: "Sending …",
				successTitle: "Message received!",
				successMessage: "Thank you for your message. I'll get back to you within 24 hours.",
				errorMessage: "Something went wrong. Please try again."
			},
			info: {
				emailLabel: "Email",
				phoneLabel: "Mobile",
				locationLabel: "Location",
				socialLabel: "Social",
				email: "contact@tracht-digital.de",
				phone: "+49 178 822 4022",
				location: "Schwarzenbek · near Hamburg"
			}
		},
		pricing: {
			label: "— Pricing",
			headline: "Transparent",
			headlineAccent: "hourly rates.",
			sub: "Clear pricing, no opaque packages. Billed by the actual hour, honestly estimated, with a ceiling you can rely on.",
			teaserLabel: "Pricing",
			teaserHeadline: "Clear rates,",
			teaserHeadlineAccent: "no packages.",
			teaserSub: "From €95 per hour – billed by the actual hour, no hidden fees.",
			teaserCta: "See all hourly rates",
			teaserFromLabel: "from",
			hourSuffix: "/ hour",
			includesLabel: "Included:",
			items: [
				{
					title: "Consulting & Strategy",
					rate: 120,
					description: "Strategic guidance, architecture workshops, technical reviews. You end up with a clear written concept — not just slides.",
					includes: [
						"Capturing and sorting your requirements",
						"Architecture and requirements workshops",
						"Code and stack reviews with documented recommendations",
						"Written concepts and decision-making input"
					],
					highlight: false
				},
				{
					title: "Web & App Development",
					rate: 105,
					description: "Frontend, backend, mobile and desktop apps. Cleanly built, tested, documented – still maintainable in two years.",
					includes: [
						"Component development (React, Vue, Angular)",
						"API and backend development (Node.js, C#, SQL)",
						"Mobile and desktop apps",
						"Tests, CI/CD and documentation included"
					],
					highlight: true
				},
				{
					title: "Digitalization & Automation",
					rate: 105,
					description: "Replacing manual processes with workflows, data pipelines and integrations. Concrete work, no PowerPoint.",
					includes: [
						"On-site or remote process analysis",
						"Workflow automation (Python, KNIME, n8n)",
						"Data pipelines, ETL and SQL reporting",
						"Integration of existing tools and systems"
					],
					highlight: false
				},
				{
					title: "Maintenance & Support",
					rate: 85,
					description: "Maintaining existing systems, rolling out updates, fixing bugs. Response times by agreement.",
					includes: [
						"Bug fixes and hotfixes",
						"Dependency and security updates",
						"Monitoring and performance optimization",
						"Optional monthly retainer model"
					],
					highlight: false
				},
				{
					title: "Workshops & Training",
					rate: 135,
					description: "Sharing knowledge instead of hoarding it. Workshops for your team – from TypeScript basics to architecture.",
					includes: [
						"On-site or remote workshops",
						"Tailored training materials",
						"Hands-on exercises with your real code",
						"Follow-up call and recording included"
					],
					highlight: false
				}
			],
			notesTitle: "Good to know",
			notes: [
				"All prices exclude German VAT (19 %).",
				"Day rate available on request — discount for 5+ days per month.",
				"Fixed price possible when the scope is clear up front.",
				"Travel costs are billed separately."
			],
			ctaTitle: "Sounds like a fit?",
			ctaSub: "Tell me briefly what it's about. I'll tell you honestly whether and how I can help.",
			ctaButton: "Get in touch",
			back: "Back"
		},
		consulting: {
			label: "— Consulting",
			headline: "Listen first,",
			headlineAccent: "build after.",
			body: "Maybe you have a clear plan, maybe just a feeling that something ought to be simpler. Either is a good place to start.",
			primaryCta: "Get in touch",
			secondaryCta: "See services"
		},
		footer: {
			slogan: "Digital solutions that truly fit.",
			tagline: "Personal, tailored, all from one source — from Schwarzenbek near Hamburg.",
			nav: "Navigation",
			contactTitle: "Contact",
			copyright: "© 2026 Tracht Digital Solutions. All rights reserved.",
			impressum: "Legal Notice",
			datenschutz: "Privacy Policy",
			pricing: "Pricing"
		},
		errors: {
			name: "Please enter your name.",
			email: "Please enter a valid email address.",
			message: "At least 20 characters, please.",
			consent: "Consent required."
		},
		cookieNotice: {
			label: "Cookie and privacy notice",
			siteText: "This website does not use tracking cookies. Only technically necessary preferences (e.g. your colour scheme) are stored locally in your browser.",
			panelText: "This area only uses one technically necessary cookie for secure sign-in (session cookie). No tracking takes place.",
			privacy: "More in the privacy policy.",
			accept: "Got it",
			consentText: "This blog shows advertising from Google AdSense. With your consent — and only then — cookies and similar technologies are set for advertising. Your choice is free and can be changed at any time.",
			consentAccept: "Accept",
			consentDecline: "Decline"
		},
		toast: { dismiss: "Dismiss" }
	}
};
var DEFAULT_STORAGE_KEY = "tds-cookie-notice";
var DEFAULT_PRIVACY_URL = "https://tracht-digital.de/legal/datenschutz";
var AD_CONSENT_KEY = "tds-ad-consent";
var AD_CONSENT_EVENT = "tds-ad-consent";
function getAdConsent() {
	if (typeof window === "undefined") return null;
	try {
		const v = window.localStorage.getItem(AD_CONSENT_KEY);
		return v === "granted" || v === "denied" ? v : null;
	} catch {
		return null;
	}
}
function setAdConsent(value) {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(AD_CONSENT_KEY, value);
	} catch {}
	try {
		window.dispatchEvent(new CustomEvent(AD_CONSENT_EVENT, { detail: value }));
	} catch {}
}
function CookieNotice({ lang = "de", variant = "site", consent = false, privacyUrl = DEFAULT_PRIVACY_URL, storageKey = DEFAULT_STORAGE_KEY } = {}) {
	const [visible, setVisible] = useState(false);
	const ref = useRef(null);
	useEffect(() => {
		try {
			if (consent) {
				if (getAdConsent() !== null) return;
			} else if (localStorage.getItem(storageKey) === "1") return;
		} catch {}
		setVisible(true);
	}, [consent, storageKey]);
	useEffect(() => {
		const el = ref.current;
		if (!visible || !el || typeof window === "undefined") return;
		const root = document.documentElement;
		const publish = () => {
			root.style.setProperty("--tds-bottom-lane", `${Math.ceil(el.getBoundingClientRect().height)}px`);
		};
		publish();
		const ro = typeof ResizeObserver === "function" ? new ResizeObserver(publish) : null;
		ro?.observe(el);
		window.addEventListener("resize", publish);
		return () => {
			ro?.disconnect();
			window.removeEventListener("resize", publish);
			root.style.removeProperty("--tds-bottom-lane");
		};
	}, [visible]);
	if (!visible) return null;
	const t = translations[lang].cookieNotice;
	const dismiss = () => {
		setVisible(false);
		try {
			localStorage.setItem(storageKey, "1");
		} catch {}
	};
	const decide = (value) => {
		setVisible(false);
		setAdConsent(value);
	};
	return /* @__PURE__ */ jsxs("aside", {
		ref,
		className: "cookie-notice",
		role: "region",
		"aria-label": t.label,
		children: [/* @__PURE__ */ jsxs("p", {
			className: "cookie-notice-text",
			children: [
				consent ? t.consentText : variant === "panel" ? t.panelText : t.siteText,
				" ",
				/* @__PURE__ */ jsx("a", {
					className: "cookie-notice-link",
					href: privacyUrl,
					children: t.privacy
				})
			]
		}), consent ? /* @__PURE__ */ jsxs("div", {
			className: "cookie-notice-actions",
			children: [/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "cookie-notice-btn cookie-notice-btn--ghost",
				onClick: () => decide("denied"),
				children: t.consentDecline
			}), /* @__PURE__ */ jsx("button", {
				type: "button",
				className: "cookie-notice-btn",
				onClick: () => decide("granted"),
				children: t.consentAccept
			})]
		}) : /* @__PURE__ */ jsx("button", {
			type: "button",
			className: "cookie-notice-btn",
			onClick: dismiss,
			children: t.accept
		})]
	});
}
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
async function runtimeAbsolute(key, fallback) {
	const value = await runtimeSetting(key, "");
	return trimEnd(/^https?:\/\//i.test(value) ? value : fallback);
}
var ACCOUNT_HINT_KEY = "tds_pub_account";
var ACCOUNT_LABEL_KEY = "tds_pub_account_label";
var trimEnd2 = (value) => value.replace(/\/+$/, "");
async function accountEndpoints(fallbacks = {}) {
	const base = await runtimeSetting("apiBase", fallbacks.apiBase ?? "https://api.tracht-digital.de");
	const login = await runtimeSetting("loginUrl", fallbacks.loginUrl ?? "https://auth.tracht-digital.de");
	const write = await runtimeAbsolute("authBase", fallbacks.authApi ?? "https://api.tracht-digital.de/auth");
	return {
		read: `${trimEnd2(base)}/auth`,
		write,
		login: trimEnd2(login)
	};
}
var mePromise = null;
async function fetchAccount(endpoints) {
	if (mePromise === null) {
		mePromise = (async () => {
			try {
				const res = await fetch(`${endpoints.read}/me`, { credentials: "include" });
				if (!res.ok) return null;
				return await res.json();
			} catch {
				return null;
			}
		})();
		mePromise = mePromise.then((me) => {
			if (me === null) mePromise = null;
			else setAccountHint(me.label ?? me.name ?? me.email ?? "");
			return me;
		});
	}
	return mePromise;
}
function invalidateAccount() {
	mePromise = null;
}
async function tryRefreshAccount(endpoints) {
	try {
		if (!(await fetch(`${endpoints.write}/refresh`, {
			method: "POST",
			credentials: "include"
		})).ok) return false;
		return (await fetch(`${endpoints.write}/me`, { credentials: "include" })).ok;
	} catch {
		return false;
	}
}
async function logoutAccount(endpoints) {
	try {
		await fetch(`${endpoints.write}/logout`, {
			method: "DELETE",
			credentials: "include"
		});
	} catch {}
	invalidateAccount();
	clearAccountHint();
}
function storage() {
	try {
		return typeof localStorage !== "undefined" ? localStorage : null;
	} catch {
		return null;
	}
}
function hasAccountHint() {
	try {
		return storage()?.getItem(ACCOUNT_HINT_KEY) === "1";
	} catch {
		return false;
	}
}
function setAccountHint(label = "") {
	try {
		const store = storage();
		store?.setItem(ACCOUNT_HINT_KEY, "1");
		if (label !== "") store?.setItem(ACCOUNT_LABEL_KEY, label);
	} catch {}
}
function clearAccountHint() {
	try {
		const store = storage();
		store?.removeItem(ACCOUNT_HINT_KEY);
		store?.removeItem(ACCOUNT_LABEL_KEY);
	} catch {}
}
function accountHintLabel() {
	try {
		return storage()?.getItem("tds_pub_account_label") ?? "";
	} catch {
		return "";
	}
}
function here() {
	return typeof location !== "undefined" ? location.href : "";
}
function loginHref(login, next = here()) {
	return `${trimEnd2(login)}?next=${encodeURIComponent(next)}`;
}
function passwordHref(login, next = here()) {
	return `${trimEnd2(login)}/passwort?next=${encodeURIComponent(next)}`;
}
var STR2 = {
	de: {
		menuLabel: "Kontomenü",
		portal: "Kundenportal",
		management: "Verwaltung",
		password: "Passwort ändern",
		logout: "Abmelden",
		signIn: "Anmelden"
	},
	en: {
		menuLabel: "Account menu",
		portal: "Customer portal",
		management: "Administration",
		password: "Change password",
		logout: "Sign out",
		signIn: "Sign in"
	}
};
var ICON = {
	user: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }), /* @__PURE__ */ jsx("circle", {
		cx: "12",
		cy: "7",
		r: "4"
	})] }),
	grid: /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx("rect", {
			width: "7",
			height: "7",
			x: "3",
			y: "3",
			rx: "1"
		}),
		/* @__PURE__ */ jsx("rect", {
			width: "7",
			height: "7",
			x: "14",
			y: "3",
			rx: "1"
		}),
		/* @__PURE__ */ jsx("rect", {
			width: "7",
			height: "7",
			x: "14",
			y: "14",
			rx: "1"
		}),
		/* @__PURE__ */ jsx("rect", {
			width: "7",
			height: "7",
			x: "3",
			y: "14",
			rx: "1"
		})
	] }),
	shield: /* @__PURE__ */ jsx("path", { d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" }),
	key: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("path", { d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" }), /* @__PURE__ */ jsx("circle", {
		cx: "16.5",
		cy: "7.5",
		r: ".5",
		fill: "currentColor"
	})] }),
	logout: /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
		/* @__PURE__ */ jsx("polyline", { points: "16 17 21 12 16 7" }),
		/* @__PURE__ */ jsx("line", {
			x1: "21",
			x2: "9",
			y1: "12",
			y2: "12"
		})
	] }),
	chevron: /* @__PURE__ */ jsx("path", { d: "m6 9 6 6 6-6" })
};
function Glyph({ children, size = 16 }) {
	return /* @__PURE__ */ jsx("svg", {
		"aria-hidden": "true",
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.75",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children
	});
}
var DEFAULT_LINKS = [{
	key: "portal",
	href: "https://app.tracht-digital.de",
	icon: "grid"
}, {
	key: "management",
	href: "https://management.tracht-digital.de",
	icon: "shield",
	adminOnly: true
}];
function AccountMenu({ lang = "de", compact = false, loggedOut = "nothing", afterLogout = "reload", apiBase: apiBase2, authApi, loginUrl, links = DEFAULT_LINKS, className }) {
	const s = STR2[lang] ?? STR2.de;
	const [me, setMe] = useState(null);
	const [loading, setLoading] = useState(true);
	const [endpoints, setEndpoints] = useState(null);
	const [open, setOpen] = useState(false);
	const [seenBefore] = useState(() => hasAccountHint());
	const [cachedLabel] = useState(() => accountHintLabel());
	const rootRef = useRef(null);
	const triggerRef = useRef(null);
	const panelRef = useRef(null);
	useEffect(() => {
		let cancelled = false;
		(async () => {
			const resolved = await accountEndpoints({
				apiBase: apiBase2,
				authApi,
				loginUrl
			});
			if (cancelled) return;
			setEndpoints(resolved);
			let principal = await fetchAccount(resolved);
			if (principal === null && seenBefore) {
				if (await tryRefreshAccount(resolved)) {
					invalidateAccount();
					principal = await fetchAccount(resolved);
				}
			}
			if (cancelled) return;
			if (principal === null) clearAccountHint();
			setMe(principal);
			setLoading(false);
		})();
		return () => {
			cancelled = true;
		};
	}, []);
	useEffect(() => {
		if (!open) return;
		const onPointerDown = (event) => {
			if (!rootRef.current?.contains(event.target)) setOpen(false);
		};
		document.addEventListener("mousedown", onPointerDown);
		return () => document.removeEventListener("mousedown", onPointerDown);
	}, [open]);
	useEffect(() => {
		if (!open) return;
		panelRef.current?.querySelector("[data-menu-item]")?.focus();
	}, [open]);
	const onRootKeyDown = useCallback((event) => {
		if (event.key === "Escape") {
			setOpen(false);
			triggerRef.current?.focus();
			return;
		}
		if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
		event.preventDefault();
		const items = Array.from(panelRef.current?.querySelectorAll("[data-menu-item]") ?? []);
		if (items.length === 0) return;
		items[(items.indexOf(document.activeElement) + (event.key === "ArrowDown" ? 1 : -1) + items.length) % items.length]?.focus();
	}, []);
	const label = useMemo(() => me?.label ?? me?.name ?? me?.email ?? "", [me]);
	const login = endpoints?.login ?? loginUrl ?? "https://auth.tracht-digital.de";
	const signOut = useCallback(async () => {
		if (endpoints === null) return;
		await logoutAccount(endpoints);
		if (afterLogout === "reload") {
			location.reload();
			return;
		}
		setMe(null);
		setOpen(false);
	}, [endpoints, afterLogout]);
	const signInLink = /* @__PURE__ */ jsx("a", {
		className: `btn btn-ghost${className ? ` ${className}` : ""}`,
		href: loginHref(login),
		children: s.signIn
	});
	if (loading) {
		if (seenBefore) return /* @__PURE__ */ jsx("div", {
			className: `tds-dropdown${className ? ` ${className}` : ""}`,
			"aria-hidden": "true",
			children: /* @__PURE__ */ jsxs("button", {
				type: "button",
				className: "tds-dropdown__trigger",
				disabled: true,
				tabIndex: -1,
				children: [
					/* @__PURE__ */ jsx("span", { className: "tds-avatar tds-avatar--sm" }),
					!compact && cachedLabel !== "" && /* @__PURE__ */ jsx("span", {
						className: "min-w-0 hidden sm:block",
						children: /* @__PURE__ */ jsx("span", {
							className: "tds-dropdown__label text-sm font-medium",
							children: cachedLabel
						})
					}),
					/* @__PURE__ */ jsx("span", {
						style: { color: "var(--color-muted)" },
						children: /* @__PURE__ */ jsx(Glyph, {
							size: 14,
							children: ICON.chevron
						})
					})
				]
			})
		});
		return loggedOut === "login" ? signInLink : null;
	}
	if (me === null) return loggedOut === "login" ? signInLink : null;
	const rows = links.filter((link) => !link.adminOnly || me.isAdmin);
	return /* @__PURE__ */ jsxs("div", {
		className: `tds-dropdown${className ? ` ${className}` : ""}`,
		ref: rootRef,
		onKeyDown: onRootKeyDown,
		children: [/* @__PURE__ */ jsxs("button", {
			type: "button",
			ref: triggerRef,
			className: "tds-dropdown__trigger",
			"aria-haspopup": "menu",
			"aria-expanded": open,
			onClick: () => setOpen((v) => !v),
			children: [
				/* @__PURE__ */ jsx(Avatar, {
					name: label,
					src: me.hasAvatar ? me.avatarUrl : null,
					seed: me.userId,
					size: "sm",
					decorative: true
				}),
				!compact && /* @__PURE__ */ jsx("span", {
					className: "min-w-0 hidden sm:block",
					children: /* @__PURE__ */ jsx("span", {
						className: "tds-dropdown__label text-sm font-medium",
						children: label
					})
				}),
				/* @__PURE__ */ jsx("span", {
					"aria-hidden": "true",
					style: { color: "var(--color-muted)" },
					children: /* @__PURE__ */ jsx(Glyph, {
						size: 14,
						children: ICON.chevron
					})
				}),
				/* @__PURE__ */ jsxs("span", {
					className: "sr-only",
					children: [s.menuLabel, label ? ` — ${label}` : ""]
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			ref: panelRef,
			className: "tds-dropdown__panel",
			role: "menu",
			"aria-label": s.menuLabel,
			hidden: !open,
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "tds-dropdown__head",
					children: [/* @__PURE__ */ jsx(Avatar, {
						name: label,
						src: me.hasAvatar ? me.avatarUrl : null,
						seed: me.userId,
						decorative: true
					}), /* @__PURE__ */ jsxs("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ jsx("span", {
							className: "tds-dropdown__label text-sm font-medium",
							children: label
						}), /* @__PURE__ */ jsx("span", {
							className: "tds-dropdown__label text-xs",
							style: { color: "var(--color-muted)" },
							children: me.email
						})]
					})]
				}),
				/* @__PURE__ */ jsx("hr", { className: "tds-dropdown__sep" }),
				rows.map((link) => /* @__PURE__ */ jsxs("a", {
					className: "tds-dropdown__item",
					role: "menuitem",
					"data-menu-item": true,
					href: link.href,
					children: [/* @__PURE__ */ jsx("span", {
						className: "tds-dropdown__icon",
						children: /* @__PURE__ */ jsx(Glyph, { children: ICON[link.icon ?? "user"] })
					}), link.label ?? s[link.key] ?? link.key]
				}, link.key)),
				/* @__PURE__ */ jsxs("a", {
					className: "tds-dropdown__item",
					role: "menuitem",
					"data-menu-item": true,
					href: passwordHref(login),
					children: [/* @__PURE__ */ jsx("span", {
						className: "tds-dropdown__icon",
						children: /* @__PURE__ */ jsx(Glyph, { children: ICON.key })
					}), s.password]
				}),
				/* @__PURE__ */ jsx("hr", { className: "tds-dropdown__sep" }),
				/* @__PURE__ */ jsxs("button", {
					type: "button",
					className: "tds-dropdown__item tds-dropdown__item--danger",
					role: "menuitem",
					"data-menu-item": true,
					onClick: () => void signOut(),
					children: [/* @__PURE__ */ jsx("span", {
						className: "tds-dropdown__icon",
						children: /* @__PURE__ */ jsx(Glyph, { children: ICON.logout })
					}), s.logout]
				})
			]
		})]
	});
}
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/astro/index.js
var SEMANTIC_CHIP_VARIANTS = [
	"neutral",
	"success",
	"warning",
	"danger",
	"info"
];
var CATEGORICAL_CHIP_VARIANTS = [
	"cat-violet",
	"cat-teal",
	"cat-amber",
	"cat-rose",
	"cat-cyan"
];
var CHIP_VARIANTS = [...SEMANTIC_CHIP_VARIANTS, ...CATEGORICAL_CHIP_VARIANTS];
new Set(CHIP_VARIANTS);
var THEME_STORAGE_KEY = "tds-theme";
var THEME_ATTRIBUTE = "data-theme";
var themeBootstrapScript = `(function () {
  function apply(root) {
    try {
      var saved = localStorage.getItem("${THEME_STORAGE_KEY}");
      if (saved === "light" || saved === "dark") {
        root.setAttribute("${THEME_ATTRIBUTE}", saved);
        return;
      }
    } catch (e) { /* storage disabled \u2014 fall through to OS */ }
    var dark = window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.setAttribute("${THEME_ATTRIBUTE}", dark ? "dark" : "light");
  }
  apply(document.documentElement);
  document.addEventListener("astro:before-swap", function (event) {
    apply(event.newDocument.documentElement);
  });
})();`;
//#endregion
//#region src/components/Header.astro
createAstro("https://tools.tracht-digital.de");
var $$Header = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Header;
	const { lang = "de" } = Astro.props;
	const s = t(lang);
	const base = lang === "de" ? "" : "/en";
	const path = Astro.url.pathname;
	const onCatalog = neutralPath(path) === "/";
	const langHrefs = [{
		code: "de",
		href: localizedPath(path, "de"),
		label: "DE"
	}, {
		code: "en",
		href: localizedPath(path, "en"),
		label: "EN"
	}];
	return renderTemplate`${maybeRenderHead($$result)}<header class="brand-header"><div class="mx-auto flex max-w-6xl flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2.5 sm:gap-x-4 sm:px-6 min-h-15"><a${addAttribute(`${base}/`, "href")} class="brand-wordmark inline-flex shrink-0 items-center gap-2 py-2 text-[1.0625rem] tracking-tight no-underline"${addAttribute(`${site.name} — ${s.navAllTools}`, "aria-label")}><span class="brand-logo" aria-hidden="true"></span><span class="accent-italic">Tools</span></a><span class="nav-divider hidden sm:block" aria-hidden="true"></span><nav class="hidden flex-wrap items-center gap-x-1 gap-y-0.5 text-sm lg:flex lg:flex-1" aria-label="Navigation"><a${addAttribute(`${base}/`, "href")} class="tnav-link link-underline px-2 py-2"${addAttribute(onCatalog ? "page" : void 0, "aria-current")}>${s.navAllTools}</a><a${addAttribute(links.blog, "href")} class="tnav-link link-underline px-2 py-2">${s.navBlog}</a><a${addAttribute(links.main, "href")} class="tnav-link link-underline px-2 py-2">${s.navHome}</a>${renderTemplate`<div class="tds-lang-toggle ml-1" role="group" aria-label="Sprache / Language">${langHrefs.map((l) => renderTemplate`<a${addAttribute(l.href, "href")}${addAttribute(l.code, "hreflang")}${addAttribute(l.code, "lang")}${addAttribute(l.code === lang ? "on" : "", "class")}${addAttribute(l.code === lang ? "true" : void 0, "aria-current")}>${l.label}</a>`)}</div>`}</nav><div class="flex-1 lg:hidden"></div><div class="hidden shrink-0 items-center gap-2 lg:flex">${renderComponent($$result, "ThemeToggle", ThemeToggle, {
		"client:idle": true,
		"client:component-hydration": "idle",
		"client:component-path": "@tracht-digital-solutions/tds-shared/components",
		"client:component-export": "ThemeToggle"
	})}<a${addAttribute(links.contact, "href")} class="btn btn-primary no-underline">${s.cta}</a></div><div class="flex shrink-0 items-center">${renderComponent($$result, "AccountMenu", AccountMenu, {
		"client:idle": true,
		"lang": lang,
		"loggedOut": "login",
		"client:component-hydration": "idle",
		"client:component-path": "@tracht-digital-solutions/tds-shared/components",
		"client:component-export": "AccountMenu"
	})}</div><button id="menu-toggle" type="button" class="btn btn-ghost tds-menu-toggle" aria-controls="mobile-menu" aria-expanded="false"${addAttribute(s.navMenu, "aria-label")}><span class="tds-menu-bar tds-menu-bar-top" aria-hidden="true"></span><span class="tds-menu-bar tds-menu-bar-mid" aria-hidden="true"></span><span class="tds-menu-bar tds-menu-bar-bot" aria-hidden="true"></span></button></div><div id="mobile-menu" class="tds-mobile-menu inset-x-0 top-[3.75rem]" style="--tds-mobile-menu-inset: 3.75rem" aria-hidden="true"${addAttribute(s.navMenu, "aria-label")}><nav aria-label="Navigation"><a${addAttribute(`${base}/`, "href")} data-menu-link class="tds-mobile-menu__link"${addAttribute(onCatalog ? "page" : void 0, "aria-current")}>${s.navAllTools}</a><a${addAttribute(links.blog, "href")} data-menu-link class="tds-mobile-menu__link">${s.navBlog}</a><a${addAttribute(links.main, "href")} data-menu-link class="tds-mobile-menu__link">${s.navHome}</a></nav><div class="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[color:var(--color-line)] pt-3"><div class="flex items-center gap-2">${renderComponent($$result, "ThemeToggle", ThemeToggle, {
		"client:idle": true,
		"client:component-hydration": "idle",
		"client:component-path": "@tracht-digital-solutions/tds-shared/components",
		"client:component-export": "ThemeToggle"
	})}${renderTemplate`<div class="tds-lang-toggle" role="group" aria-label="Sprache / Language">${langHrefs.map((l) => renderTemplate`<a${addAttribute(l.href, "href")}${addAttribute(l.code, "hreflang")}${addAttribute(l.code, "lang")} data-menu-link${addAttribute(l.code === lang ? "on" : "", "class")}${addAttribute(l.code === lang ? "true" : void 0, "aria-current")}>${l.label}</a>`)}</div>`}</div><a${addAttribute(links.contact, "href")} data-menu-link class="btn btn-primary no-underline">${s.cta}</a></div></div></header><span class="sr-only" data-site-tagline>${s.tagline}</span>${renderScript($$result, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/components/Header.astro", void 0);
//#endregion
//#region src/components/Footer.astro
createAstro("https://tools.tracht-digital.de");
var $$Footer = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Footer;
	const { lang = "de" } = Astro.props;
	const s = t(lang);
	const year = (/* @__PURE__ */ new Date()).getFullYear();
	const ads = await adsConfig();
	const adsEnabled = ads.enabled && !!ads.publisherId;
	const services = [
		{
			label: "Digitalisierung für Unternehmen",
			href: `${links.main}/#services`
		},
		{
			label: "Digitale Konzepte",
			href: `${links.main}/#services`
		},
		{
			label: "Auftragsentwicklung",
			href: `${links.main}/#services`
		},
		{
			label: "Webauftritt",
			href: `${links.main}/#services`
		},
		{
			label: "Webshop",
			href: `${links.main}/#services`
		}
	];
	const groups = [
		{
			head: s.footerGroupBrand,
			items: [
				{
					label: s.footerHome,
					href: links.main
				},
				{
					label: s.footerBlog,
					href: links.blog
				},
				{
					label: s.footerPortal,
					href: links.portal
				},
				{
					label: s.footerContact,
					href: links.contact
				}
			]
		},
		{
			head: s.footerGroupServices,
			items: services
		},
		{
			head: s.footerGroupLegal,
			items: [{
				label: s.footerImprint,
				href: links.impressum
			}, {
				label: s.footerPrivacy,
				href: links.datenschutz
			}]
		}
	];
	return renderTemplate`${maybeRenderHead($$result)}<footer class="mt-20 tds-tone-navy"><div class="mx-auto grid max-w-6xl gap-9 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)]"><div><p class="brand-wordmark mb-3 inline-flex items-center gap-2 text-lg" style="color: #fff;"><span class="brand-logo brand-logo--inverse" aria-hidden="true"></span><span><span class="sr-only">TD </span><span style="color: var(--color-accent-pink);">Tools</span></span></p><span aria-hidden="true" class="tds-brandbar tds-brandbar--sm tds-brandbar--on-dark mb-4"></span><p class="text-sm leading-relaxed" style="color: rgb(255 255 255 / 0.65); max-width: 34ch;">${s.footerBlurb}</p><p class="mt-5 text-[0.8125rem]" style="font-family: var(--font-mono); color: rgb(255 255 255 / 0.5);">Julian Tracht · 21493 Schwarzenbek bei Hamburg</p></div>${groups.map((g) => renderTemplate`<div><p class="eyebrow mb-4" style="color: rgb(255 255 255 / 0.5);">${g.head}</p><ul class="m-0 flex list-none flex-col gap-2.5 p-0">${g.items.map((it) => renderTemplate`<li><a${addAttribute(it.href, "href")} class="text-sm text-white/75 no-underline transition-colors hover:text-white">${it.label}</a></li>`)}</ul></div>`)}</div><div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 pt-4 pb-8 text-xs sm:px-6" style="border-top: 1px solid rgb(255 255 255 / 0.1); font-family: var(--font-mono); color: rgb(255 255 255 / 0.5);"><p>© ${year} Tracht Digital Solutions · ${s.footerTagline}</p>${adsEnabled && renderTemplate`<button type="button" id="tds-ad-consent-reset" class="btn btn-ghost" style="font-family: var(--font-mono); font-size: inherit;">${s.footerAdConsent}</button>`}</div>${adsEnabled && renderTemplate`<script>
      (function () {
        var b = document.getElementById("tds-ad-consent-reset");
        if (!b) return;
        b.addEventListener("click", function () {
          try { localStorage.removeItem("tds-ad-consent"); } catch (e) {}
          location.reload();
        });
      })();
    <\/script>`}</footer>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/components/Footer.astro", void 0);
//#endregion
//#region src/layouts/Layout.astro
createAstro("https://tools.tracht-digital.de");
var $$Layout = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Layout;
	const { title, lang = "de", description = site.description, canonical, ogImage = seoConfig.defaultOgImage, jsonLd, noindex = false } = Astro.props;
	const origin = Astro.site?.origin ?? site.origin;
	const url = canonical ?? new URL(Astro.url.pathname, origin).toString();
	const ogImageAbs = ogImage.startsWith("http") ? ogImage : new URL(ogImage, origin).toString();
	const deAltUrl = new URL(localizedPath(Astro.url.pathname, "de"), origin).toString();
	const enAltUrl = new URL(localizedPath(Astro.url.pathname, "en"), origin).toString();
	const altOgLocale = lang === "de" ? ogLocale.en : ogLocale.de;
	const ads = await adsConfig();
	const adsActive = ads.enabled && !!ads.publisherId;
	return renderTemplate`<!-- data-surface selects the geometry layer from tds-shared's design library.
     Since 0.9.0 this site renders the **blog** surface (surfaces/blog.css) —
     the same layer \`blog.tracht-digital.de\` renders: the flat "kantig" kit,
     every radius 0, no elevation anywhere, the 800 display voice and the
     \`--tds-flat-tint\` / \`--tds-flat-hover\` fills. The two public properties
     that link to each other now also read as one property.

     It replaces the panel surface, which this site rendered in the same
     \`data-flat\` variant. That pairing was already most of the way here
     (flat is flat), but it kept the panel's 8px cards, 0.75rem chips and
     \`--tds-panel-*\` colour axis — i.e. it looked like the ADMIN dashboard, on
     a public marketing-adjacent site whose sibling is the journal.

     data-flat is the opt-in FLAT variant, and it came BACK in 0.13.1 after a
     release without it. The blog surface is angular and flat but it keeps its
     hairlines — an article list separates its rows by their edge — so moving
     surface quietly re-drew an outline around every button, chip, boxed input
     and card on this site. The variant is what drops them:
     \`--tds-border-hairline: 0\` from surfaces/blog.css (tds-shared 0.25.1),
     plus the fill counterparts in primitives.css.

     THOSE FILLS ARE THE POINT, not an implementation detail. Four primitives
     separate from their ground ONLY by their edge, and this site's tool
     islands hold all four (28 \`.field-boxed\`, 21 \`.btn-ghost\`, 19 \`.chip\`,
     9 \`.status-pill\`, and 53 \`.tds-alert\` beside them): zeroing the token
     alone would not make the page flatter, it would make a boxed input inside
     a card completely INVISIBLE, its label colliding into its value. So never
     chase a stray outline with a local
     \`border: 0\` — the counterpart has to come with it, and it lives in
     tds-shared.

     Consequence worth knowing before you edit anything here: the
     \`--tds-panel-*\` family no longer carries panel VALUES. Real values come
     from surfaces/panel.css, which this site no longer imports; base.css
     still declares the family with deliberately INERT defaults (accent =
     \`--color-primary\`, rail = a flat \`--color-surface-navy\`, canvas =
     \`--color-paper\`). So a stale reference does not error and does not go
     blank either — it quietly renders in the panel's fallback navy, i.e. a
     plausible wrong colour on a surface whose accent is the bordeaux. Nothing
     but a browser would tell you, so \`src/lib/surface.test.ts\` fails the
     build on one. Use \`--color-accent\`, \`--color-primary\` and
     \`--color-surface-navy\` instead.

     Do NOT author radii or shadows locally — that is exactly what made the
     blog repo fork \`.chip\`, \`.display\` and \`.eyebrow\` before the surface
     split. Set a token in the surface layer or use a shared class. --><html${addAttribute(lang, "lang")} data-surface="blog" data-flat><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"${addAttribute(description, "content")}><meta name="theme-color" content="#050f68">${noindex && renderTemplate`<meta name="robots" content="noindex,nofollow">`}<link rel="icon" type="image/png" href="/favicon.png" sizes="any"><script>${unescapeHTML(themeBootstrapScript)}<\/script><link rel="canonical"${addAttribute(url, "href")}>${!noindex && renderTemplate`${renderComponent($$result, "Fragment", Fragment$2, {}, { "default": ($$result) => renderTemplate`<link rel="alternate" hreflang="de"${addAttribute(deAltUrl, "href")}><link rel="alternate" hreflang="en"${addAttribute(enAltUrl, "href")}><link rel="alternate" hreflang="x-default"${addAttribute(deAltUrl, "href")}>` })}`}<link rel="alternate" type="application/rss+xml" title="Tracht Digital — Journal"${addAttribute(`${seoConfig.blogUrl}/rss.xml`, "href")}><link rel="preconnect" href="https://api.tracht-digital.de" crossorigin><link rel="preconnect" href="https://tracht-digital.de" crossorigin>${adsActive && renderTemplate`<link rel="preconnect" href="https://pagead2.googlesyndication.com" crossorigin>`}<meta name="generator"${addAttribute(Astro.generator, "content")}><title>${title}</title><meta property="og:type" content="website"><meta property="og:url"${addAttribute(url, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(ogImageAbs, "content")}><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt"${addAttribute(title, "content")}><meta property="og:locale"${addAttribute(ogLocale[lang], "content")}>${!noindex && renderTemplate`<meta property="og:locale:alternate"${addAttribute(altOgLocale, "content")}>`}<meta property="og:site_name"${addAttribute(site.name, "content")}><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(ogImageAbs, "content")}>${jsonLd && renderTemplate`<script type="application/ld+json">${unescapeHTML(JSON.stringify(jsonLd))}<\/script>`}${renderHead($$result)}</head><body><a href="#main" class="absolute -top-full left-0 z-50 px-6 py-3 bg-[var(--color-surface-navy)] text-white text-sm font-semibold focus:top-0 transition-all">${t(lang).skipToContent}</a>${renderComponent($$result, "Header", $$Header, { "lang": lang })}<main id="main">${renderSlot($$result, $$slots["default"])}</main>${renderComponent($$result, "Footer", $$Footer, { "lang": lang })}${adsActive && renderTemplate`${renderComponent($$result, "CookieNotice", CookieNotice, {
		"client:idle": true,
		"lang": lang,
		"consent": true,
		"client:component-hydration": "idle",
		"client:component-path": "@tracht-digital-solutions/tds-shared/components",
		"client:component-export": "CookieNotice"
	})}`}${adsActive && renderTemplate`<script>(function(){${defineScriptVars({ adsClient: ads.publisherId })}
        (function () {
          function load() {
            if (window.__tdsAdsLoaded) return;
            window.__tdsAdsLoaded = true;
            var s = document.createElement("script");
            s.async = true;
            s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + adsClient;
            s.crossOrigin = "anonymous";
            document.head.appendChild(s);
          }
          try {
            if (localStorage.getItem("tds-ad-consent") === "granted") { load(); return; }
          } catch (e) {}
          window.addEventListener("tds-ad-consent", function (e) {
            if (e && e.detail === "granted") load();
          });
        })();
      })();<\/script>`}</body></html>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/layouts/Layout.astro", void 0);
//#endregion
//#region src/components/Icon.astro
createAstro("https://tools.tracht-digital.de");
var $$Icon = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Icon;
	const { name = "", class: cls = "" } = Astro.props;
	const d = {
		"qr-code": "M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h3v3h-3zM18 18h3v3h-3z",
		key: "M15 7a4 4 0 1 0-3.9 5H12l-2 2v2H8v2H5v-3l6-6a4 4 0 0 1 4-4z",
		link: "M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1",
		braces: "M7 4a2 2 0 0 0-2 2v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a2 2 0 0 0 2 2M17 4a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a2 2 0 0 1-2 2",
		contrast: "M12 3a9 9 0 1 0 0 18zM12 3v18",
		image: "M3 5h18v14H3zM3 15l5-5 4 4 3-3 6 6",
		"file-text": "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h6",
		shrink: "M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7",
		stamp: "M5 21h14M8 17v-2a5 5 0 0 1-1.5-3.5V9a3 3 0 0 1 3-3h5a3 3 0 0 1 3 3v2.5A5 5 0 0 1 16 15v2zM6 17h12v4H6z",
		images: "M8 3h13v13H8zM3 8v13h13M12 11l2-2 3 3 2-2",
		"file-image": "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M8 18l3-3 2 2 2-2 2 3z",
		tags: "M3 7v5l8 8 6-6-8-8H5a2 2 0 0 0-2 2zM7 11h.01M13 3h4a2 2 0 0 1 2 2v4",
		clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
		"scan-text": "M3 8V6a2 2 0 0 1 2-2h2M17 4h2a2 2 0 0 1 2 2v2M21 16v2a2 2 0 0 1-2 2h-2M7 20H5a2 2 0 0 1-2-2v-2M7 9h10M7 13h7M7 17h4",
		"scroll-text": "M8 21h11a2 2 0 0 0 2-2v-2H8M8 21a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h11a2 2 0 0 1 2 2v12H8zM9 7h7M9 11h7M9 15h4",
		"shield-check": "M12 3l8 3v6c0 4.4-3.2 7.9-8 9-4.8-1.1-8-4.6-8-9V6zM9 12l2 2 4-4",
		accessibility: "M12 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM4 9l8 1 8-1M12 10v5M12 15l-3 6M12 15l3 6",
		sparkles: "M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8zM18 15l.9 2.3 2.3.9-2.3.9L18 21.4l-.9-2.3-2.3-.9 2.3-.9z"
	}[name] ?? "M4 4h16v16H4z";
	return renderTemplate`${maybeRenderHead($$result)}<svg${addAttribute(cls, "class")} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path${addAttribute(d, "d")}></path></svg>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/components/Icon.astro", void 0);
//#endregion
//#region src/components/AdSlot.astro
createAstro("https://tools.tracht-digital.de");
var $$AdSlot = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$AdSlot;
	const { client, slot, lang = "de" } = Astro.props;
	const t = lang === "de" ? {
		region: "Werbung",
		label: "Anzeige"
	} : {
		region: "Advertisement",
		label: "Advertisement"
	};
	return renderTemplate`${maybeRenderHead($$result)}<aside class="tds-adslot"${addAttribute(t.region, "aria-label")} data-astro-cid-ygkiugat><span class="tds-adslot__label" data-astro-cid-ygkiugat>${t.label}</span><ins class="adsbygoogle" style="display:block"${addAttribute(client, "data-ad-client")}${addAttribute(slot, "data-ad-slot")} data-ad-format="auto" data-full-width-responsive="true" data-astro-cid-ygkiugat></ins><script>
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  <\/script></aside>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/components/AdSlot.astro", void 0);
//#endregion
//#region src/components/ServiceNote.astro
createAstro("https://tools.tracht-digital.de");
var $$ServiceNote = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ServiceNote;
	const { lang = "de" } = Astro.props;
	const s = t(lang);
	return renderTemplate`${maybeRenderHead($$result)}<aside class="service-note"><p class="service-note__text">${s.serviceNote}</p><a${addAttribute(links.contact, "href")} class="service-note__cta link-underline">${s.serviceNoteCta}</a></aside>`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/components/ServiceNote.astro", void 0);
//#endregion
//#region src/lib/jsonld.ts
/**
* Schema.org JSON-LD generators for the tools site.
*
* Ported from `tds-landingpage-frontend/src/lib/jsonld.ts` — same function
* names and shapes, so what is true about the structured data of one property
* stays true for the others. What is new here is the part the marketing site
* has no use for: a `SoftwareApplication` node per tool, and `HowTo`/`FAQPage`
* built from the per-tool guides.
*
* Every node is a plain object destined for `JSON.stringify` inside a
* `<script type="application/ld+json">`. Nodes are joined with {@link asGraph}
* rather than emitted as several script blocks: one `@graph` lets the nodes
* reference each other by `@id` (every tool points at the same organization
* node instead of restating the business), which is what makes the whole site
* read as one entity.
*/
/**
* Stable node ids. They are anchored on the MAIN site's origin, not this
* one — the organization behind these tools is the same entity the
* landingpage describes, and a second `#organization` id on a second origin
* would describe a second business.
*/
var ORG_ID = `${seoConfig.mainUrl}/#organization`;
var PERSON_ID = `${seoConfig.mainUrl}/#person`;
var WEBSITE_ID = `${seoConfig.url}/#website`;
/** The founder, referenced by the organization node. */
function personSchema() {
	return {
		"@type": "Person",
		"@id": PERSON_ID,
		name: seoConfig.founder.name,
		jobTitle: seoConfig.founder.jobTitle,
		worksFor: { "@id": ORG_ID },
		url: seoConfig.mainUrl,
		email: `mailto:${seoConfig.email}`,
		sameAs: Object.values(seoConfig.socials).filter(Boolean)
	};
}
/**
* Organization (+ ProfessionalService traits). Search engines treat
* ProfessionalService as a LocalBusiness subtype, which is what the business
* actually is. Street, postal code, phone and VAT ID match the Impressum.
*/
function organizationSchema() {
	const socials = Object.values(seoConfig.socials).filter(Boolean);
	const base = {
		"@type": ["Organization", "ProfessionalService"],
		"@id": ORG_ID,
		name: seoConfig.name,
		alternateName: seoConfig.shortName,
		legalName: seoConfig.legalName,
		vatID: seoConfig.vatID,
		url: seoConfig.mainUrl,
		email: `mailto:${seoConfig.email}`,
		telephone: seoConfig.telephone,
		logo: `${seoConfig.url}/brand/td-logomark.webp`,
		founder: { "@id": PERSON_ID },
		areaServed: seoConfig.areaServed.map((a) => ({
			"@type": "Place",
			name: a
		})),
		address: {
			"@type": "PostalAddress",
			streetAddress: seoConfig.address.streetAddress,
			postalCode: seoConfig.address.postalCode,
			addressLocality: seoConfig.address.addressLocality,
			addressRegion: seoConfig.address.addressRegion,
			addressCountry: seoConfig.address.addressCountry
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: seoConfig.geo.latitude,
			longitude: seoConfig.geo.longitude
		},
		knowsAbout: [...seoConfig.knowsAbout]
	};
	if (socials.length > 0) base.sameAs = socials;
	return base;
}
/** WebSite node for this property, published by the shared organization. */
function websiteSchema(description) {
	return {
		"@type": "WebSite",
		"@id": WEBSITE_ID,
		url: seoConfig.url,
		name: `${seoConfig.shortName} Tools`,
		description,
		publisher: { "@id": ORG_ID },
		inLanguage: ["de-DE", "en-GB"]
	};
}
/**
* BreadcrumbList — emitted on every tool page. The page has always DRAWN a
* breadcrumb ("Alle Tools / QR-Code-Generator") and never declared one, so
* the hierarchy was visible to a reader and invisible to everything else.
*/
function breadcrumbSchema(items) {
	return {
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: item.name,
			item: item.url
		}))
	};
}
/** The catalog itself, as an ordered list of tool pages. */
function itemListSchema(items) {
	return {
		"@type": "ItemList",
		itemListElement: items.map((item, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: item.name,
			url: item.url
		}))
	};
}
/**
* One tool as a SoftwareApplication (via its `WebApplication` subtype).
*
* A free tool gets `isAccessibleForFree: true` and an Offer at price 0 —
* both, deliberately: the boolean is what Google reads, and an `offers` node
* is what several AI answer engines look for before they will state a price.
* It used to emit `price: "0.00"` for everything including the premium PDF
* tool's real price, which stated the wrong thing about the one tool that
* charges money.
*/
function softwareApplicationSchema(input) {
	const price = input.isFree ? 0 : input.priceCents / 100;
	return {
		"@type": input.type,
		"@id": `${input.url}#app`,
		name: input.name,
		url: input.url,
		description: input.description,
		applicationCategory: "BusinessApplication",
		operatingSystem: "Web",
		browserRequirements: "Requires JavaScript",
		inLanguage: input.lang === "de" ? "de-DE" : "en-GB",
		isAccessibleForFree: input.isFree,
		offers: {
			"@type": "Offer",
			price: price.toFixed(2),
			priceCurrency: "EUR",
			availability: "https://schema.org/InStock"
		},
		provider: { "@id": ORG_ID },
		publisher: { "@id": ORG_ID },
		...input.keywords?.length ? { keywords: input.keywords.join(", ") } : {}
	};
}
/**
* FAQPage. The answer text must match the visible answer 1:1 or Google
* strips the rich result — which is why the page and this node are rendered
* from the same guide object rather than from two hand-kept copies.
*/
function faqPageSchema(items) {
	return {
		"@type": "FAQPage",
		mainEntity: items.map((item) => ({
			"@type": "Question",
			name: item.q,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.a
			}
		}))
	};
}
/** HowTo — the "so gehen Sie vor" steps of a tool guide. */
function howToSchema(name, steps) {
	return {
		"@type": "HowTo",
		name,
		step: steps.map((step, i) => ({
			"@type": "HowToStep",
			position: i + 1,
			name: step.title,
			text: step.description
		}))
	};
}
/**
* Combine nodes into a single `@graph` — the canonical way to emit several
* typed entities in one script block without repeating `@context`.
*/
function asGraph(...nodes) {
	return {
		"@context": "https://schema.org",
		"@graph": nodes
	};
}
//#endregion
export { itemListSchema as a, softwareApplicationSchema as c, $$AdSlot as d, $$Icon as f, howToSchema as i, websiteSchema as l, breadcrumbSchema as n, organizationSchema as o, $$Layout as p, faqPageSchema as r, personSchema as s, asGraph as t, $$ServiceNote as u };
