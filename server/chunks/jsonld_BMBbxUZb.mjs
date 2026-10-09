import { A as renderTemplate, D as renderSlot, F as createRenderInstruction, M as renderHead, N as addAttribute, P as defineScriptVars, T as Fragment$2, V as createAstro, j as maybeRenderHead, w as renderComponent, z as unescapeHTML } from "./sequence_DhFMl9D5.mjs";
import { t as createComponent } from "./compiler_CeFfe2xG.mjs";
import { c as serializeJsonLd } from "./site_TmeFq_K5.mjs";
import { r as enabledTools, t as adsConfig } from "./catalog_CIi8pJsG.mjs";
import { a as localizedPath, c as seoConfig, d as links, f as site, h as toolCopyFor, i as isExcluded, m as t, o as neutralPath, p as categoryLabels, s as ogLocale, u as categoryOrder } from "./sitemapExclusions_uCzo_05j.mjs";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { flushSync } from "react-dom";
//#region node_modules/astro/dist/runtime/server/render/script.js
/**
* Relies on the `renderScript: true` compiler option
* @experimental
*/
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
//#region node_modules/@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2?url
var plus_jakarta_sans_latin_wght_normal_default = "/_astro/plus-jakarta-sans-latin-wght-normal.eXO_dkmS.woff2";
//#endregion
//#region node_modules/@fontsource/lato/files/lato-latin-900-normal.woff2?url
var lato_latin_900_normal_default = "/_astro/lato-latin-900-normal.C3uaq3BA.woff2";
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/chunk-GEUXWDQQ.js
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
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/chunk-OJ67AO74.js
var CONSENT_CATEGORIES = [
	"necessary",
	"functional",
	"analytics",
	"marketing"
];
var necessaryOnly = () => ({
	necessary: true,
	functional: false,
	analytics: false,
	marketing: false
});
var allGranted = () => ({
	necessary: true,
	functional: true,
	analytics: true,
	marketing: true
});
var grantShown = (shown) => restrictToShown(allGranted(), shown);
var restrictToShown = (choices, shown) => {
	const out = necessaryOnly();
	for (const cat of shown) out[cat] = choices[cat] === true;
	return out;
};
var isConsentCategory = (v) => typeof v === "string" && CONSENT_CATEGORIES.includes(v);
var CONSENT_KEY = "tds-consent";
var CONSENT_EVENT = "tds:consent-change";
var CONSENT_OPEN_EVENT = "tds:consent-open";
function readConsent() {
	if (typeof window === "undefined") return null;
	let raw = null;
	try {
		raw = window.localStorage.getItem(CONSENT_KEY);
	} catch {
		return null;
	}
	if (raw === null) return migrateLegacy();
	let parsed;
	try {
		parsed = JSON.parse(raw);
	} catch {
		return null;
	}
	const record = coerce(parsed);
	if (record === null) return null;
	if (record.v !== 2) return null;
	return record;
}
function migrateLegacy() {
	const legacy = getAdConsent();
	if (legacy === null) return null;
	return {
		v: 2,
		ts: null,
		lang: "de",
		choices: {
			...necessaryOnly(),
			marketing: legacy === "granted"
		}
	};
}
function coerce(value) {
	if (typeof value !== "object" || value === null) return null;
	const o = value;
	if (typeof o.v !== "number") return null;
	if (typeof o.choices !== "object" || o.choices === null) return null;
	const src = o.choices;
	const choices = necessaryOnly();
	for (const [k, v] of Object.entries(src)) if (isConsentCategory(k) && typeof v === "boolean") choices[k] = v;
	choices.necessary = true;
	return {
		v: o.v,
		ts: typeof o.ts === "string" ? o.ts : null,
		lang: typeof o.lang === "string" ? o.lang : "de",
		choices
	};
}
function writeConsent(choices, lang) {
	const record = {
		v: 2,
		ts: (/* @__PURE__ */ new Date()).toISOString(),
		lang,
		choices: {
			...choices,
			necessary: true
		}
	};
	if (typeof window === "undefined") return record;
	try {
		window.localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
	} catch {}
	setAdConsent(record.choices.marketing ? "granted" : "denied");
	try {
		window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: record }));
	} catch {}
	return record;
}
function openConsentSettings() {
	if (typeof window === "undefined") return;
	try {
		window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
	} catch {}
}
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/chunk-6MPR43TV.js
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
						"Hands-on-Übungen mit Ihrem eigenen Code",
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
			slogan: "Digitale Lösungen, die passen.",
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
			siteText: "Keine Tracking-Cookies: Nur technisch nötige Einstellungen wie das Farbschema bleiben lokal im Browser.",
			panelText: "Dieser Bereich verwendet ausschließlich ein technisch notwendiges Cookie für die sichere Anmeldung (Session-Cookie). Es findet kein Tracking statt.",
			privacy: "Mehr in der Datenschutzerklärung.",
			accept: "Verstanden",
			consentText: "Wir zeigen auf diesem Blog Werbung von Google AdSense. Dafür werden – nur mit Ihrer Einwilligung – Cookies und ähnliche Technologien zu Werbezwecken gesetzt. Ihre Wahl ist freiwillig und jederzeit änderbar.",
			consentAccept: "Akzeptieren",
			consentDecline: "Ablehnen"
		},
		consent: {
			label: "Datenschutz-Einstellungen",
			title: "Ihre Auswahl",
			intro: "Wir verwenden nur die Speicherung, die diese Seite zum Funktionieren braucht. Alles darüber hinaus setzen wir erst ein, wenn Sie zustimmen. Sie können Ihre Wahl jederzeit ändern.",
			privacy: "Datenschutzerklärung",
			imprint: "Impressum",
			acceptAll: "Alle akzeptieren",
			necessaryOnly: "Nur notwendige",
			settings: "Einstellungen",
			save: "Auswahl speichern",
			close: "Schließen",
			manage: "Cookie-Einstellungen",
			alwaysOn: "Immer aktiv",
			categories: {
				necessary: {
					label: "Notwendig",
					description: "Speichert, was die Seite zum Betrieb braucht: Ihr Farbschema, Ihre Sprache, den Inhalt Ihres Warenkorbs und diese Auswahl selbst. Ohne diese Speicherung funktioniert die Seite nicht, deshalb ist sie nicht abwählbar (§ 25 Abs. 2 Nr. 2 TDDDG)."
				},
				functional: {
					label: "Komfort",
					description: "Merkt sich Einstellungen, die die Bedienung angenehmer machen, für den Betrieb aber nicht nötig sind — etwa eine eingeklappte Seitenleiste oder eine zuletzt gewählte Ansicht."
				},
				analytics: {
					label: "Statistik",
					description: "Eigene Reichweitenmessung: welche Seiten gelesen werden, woher Besucher kommen, welche Schaltflächen sie nutzen und wo sie abbrechen. Dafür speichert Ihr Browser eine zufällige Kennung für 30 Tage. Ihre IP-Adresse wird nicht gespeichert, die Daten liegen auf unserem Server in Deutschland und gehen an niemanden weiter."
				},
				marketing: {
					label: "Werbung",
					description: "Erlaubt Werbeanzeigen und die dafür nötigen Cookies unserer Werbepartner. Ohne Ihre Einwilligung wird kein Werbeskript geladen."
				}
			},
			placeholder: {
				title: "Externer Inhalt",
				body: "Dieser Inhalt wird von {provider} geladen. Dabei werden Ihre IP-Adresse und Angaben zu Ihrem Gerät an {provider} übertragen.",
				load: "Inhalt laden",
				settings: "Dauerhaft entscheiden"
			}
		},
		a11y: { skipToContent: "Zum Inhalt springen" },
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
			slogan: "Digital solutions that fit.",
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
			siteText: "No tracking cookies: only necessary preferences such as your colour scheme stay local in your browser.",
			panelText: "This area only uses one technically necessary cookie for secure sign-in (session cookie). No tracking takes place.",
			privacy: "More in the privacy policy.",
			accept: "Got it",
			consentText: "This blog shows advertising from Google AdSense. With your consent — and only then — cookies and similar technologies are set for advertising. Your choice is free and can be changed at any time.",
			consentAccept: "Accept",
			consentDecline: "Decline"
		},
		consent: {
			label: "Privacy settings",
			title: "Your choice",
			intro: "We only use the storage this site needs to work. Anything beyond that we use once you agree. You can change your choice at any time.",
			privacy: "Privacy policy",
			imprint: "Legal notice",
			acceptAll: "Accept all",
			necessaryOnly: "Necessary only",
			settings: "Settings",
			save: "Save choice",
			close: "Close",
			manage: "Cookie settings",
			alwaysOn: "Always on",
			categories: {
				necessary: {
					label: "Necessary",
					description: "Stores what the site needs to operate: your colour scheme, your language, the contents of your basket and this choice itself. The site does not work without it, which is why it cannot be switched off (sec. 25(2) no. 2 TDDDG)."
				},
				functional: {
					label: "Convenience",
					description: "Remembers settings that make the site nicer to use but are not required to operate it — a collapsed sidebar, say, or the view you last picked."
				},
				analytics: {
					label: "Statistics",
					description: "Our own audience measurement: which pages get read, where visitors come from, which buttons they use and where they drop off. Your browser stores a random identifier for 30 days. Your IP address is not stored; the data stays on our server in Germany and is shared with no one."
				},
				marketing: {
					label: "Advertising",
					description: "Allows advertisements and the cookies our advertising partners need for them. Without your consent no advertising script is loaded."
				}
			},
			placeholder: {
				title: "External content",
				body: "This content is loaded from {provider}. Doing so transmits your IP address and details about your device to {provider}.",
				load: "Load content",
				settings: "Decide permanently"
			}
		},
		a11y: { skipToContent: "Skip to content" },
		toast: { dismiss: "Dismiss" }
	}
};
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/consent/index.js
function ConsentSettings({ open, lang, categories, initial, privacyUrl, imprintUrl, onSave, onClose }) {
	const t = translations[lang].consent;
	const ref = useRef(null);
	const titleRef = useRef(null);
	const titleId = useId();
	const descId = useId();
	const [choices, setChoices] = useState(initial);
	const [rendered, setRendered] = useState(open);
	useEffect(() => {
		if (open) setRendered(true);
	}, [open]);
	useEffect(() => {
		if (open) setChoices(initial);
	}, [open, initial]);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		if (open && !el.open) {
			if (typeof el.showModal === "function") el.showModal();
			else el.setAttribute("open", "");
			titleRef.current?.focus();
		} else if (!open && el.open) {
			if (typeof el.close === "function") el.close();
			else el.removeAttribute("open");
			const timer = window.setTimeout(() => setRendered(false), 450);
			return () => window.clearTimeout(timer);
		} else if (!open) setRendered(false);
	}, [open, rendered]);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const onNativeCancel = (e) => {
			e.preventDefault();
			onClose();
		};
		el.addEventListener("cancel", onNativeCancel);
		return () => el.removeEventListener("cancel", onNativeCancel);
	}, [onClose]);
	if (!open && !rendered) return null;
	const rows = ["necessary", ...categories];
	return /* @__PURE__ */ jsx("dialog", {
		ref,
		className: "tds-modal consent-dialog",
		"aria-labelledby": titleId,
		"aria-describedby": descId,
		onClick: (e) => {
			if (e.target === e.currentTarget) onClose();
		},
		children: /* @__PURE__ */ jsxs("div", {
			className: "tds-modal__panel consent-dialog__panel",
			children: [
				/* @__PURE__ */ jsx("button", {
					type: "button",
					className: "consent-dialog__close",
					"aria-label": t.close,
					onClick: onClose,
					children: /* @__PURE__ */ jsx("span", {
						"aria-hidden": "true",
						children: "×"
					})
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "tds-modal__title",
					id: titleId,
					ref: titleRef,
					tabIndex: -1,
					children: t.title
				}),
				/* @__PURE__ */ jsx("p", {
					className: "consent-dialog__intro",
					id: descId,
					children: t.intro
				}),
				/* @__PURE__ */ jsx("ul", {
					className: "consent-dialog__list",
					children: rows.map((cat) => {
						const meta = t.categories[cat];
						const locked = cat === "necessary";
						return /* @__PURE__ */ jsxs("li", {
							className: "consent-row",
							children: [/* @__PURE__ */ jsxs("label", {
								className: "consent-row__head",
								children: [
									/* @__PURE__ */ jsx("input", {
										type: "checkbox",
										className: "consent-row__input",
										checked: locked ? true : choices[cat],
										disabled: locked,
										onChange: (e) => setChoices((c) => ({
											...c,
											[cat]: e.target.checked
										}))
									}),
									/* @__PURE__ */ jsx("span", {
										className: "consent-row__label",
										children: meta.label
									}),
									locked ? /* @__PURE__ */ jsx("span", {
										className: "consent-row__badge",
										children: t.alwaysOn
									}) : null
								]
							}), /* @__PURE__ */ jsx("p", {
								className: "consent-row__desc",
								children: meta.description
							})]
						}, cat);
					})
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "consent-dialog__links",
					children: [/* @__PURE__ */ jsx("a", {
						href: privacyUrl,
						children: t.privacy
					}), imprintUrl ? /* @__PURE__ */ jsxs(Fragment$1, { children: [" · ", /* @__PURE__ */ jsx("a", {
						href: imprintUrl,
						children: t.imprint
					})] }) : null]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "consent-dialog__actions",
					children: [
						/* @__PURE__ */ jsx("button", {
							type: "button",
							className: "btn btn-ghost",
							onClick: () => onSave(necessaryOnly()),
							children: t.necessaryOnly
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							className: "btn btn-ghost",
							onClick: () => onSave(grantShown(categories)),
							children: t.acceptAll
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							className: "btn btn-primary",
							onClick: () => onSave(choices),
							children: t.save
						})
					]
				})
			]
		})
	});
}
var DEFAULT_PRIVACY_URL = "https://tracht-digital.de/legal/datenschutz";
function ConsentBanner({ lang = "de", categories = [], variant = "site", privacyUrl = DEFAULT_PRIVACY_URL, imprintUrl } = {}) {
	const t = translations[lang].consent;
	const notice = translations[lang].cookieNotice;
	const asks = categories.length > 0;
	const [decided, setDecided] = useState(null);
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [initial, setInitial] = useState(necessaryOnly);
	const ref = useRef(null);
	const focused = useRef(false);
	useEffect(() => {
		const record = readConsent();
		if (record) setInitial(record.choices);
		setDecided(record !== null);
	}, []);
	useEffect(() => {
		const open = () => {
			setInitial(readConsent()?.choices ?? necessaryOnly());
			setSettingsOpen(true);
		};
		window.addEventListener(CONSENT_OPEN_EVENT, open);
		return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
	}, []);
	const visible = decided === false;
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
	useEffect(() => {
		if (!visible || !asks || focused.current) return;
		focused.current = true;
		ref.current?.focus();
	}, [visible, asks]);
	const save = useCallback((choices) => {
		const stored = restrictToShown(choices, categories);
		writeConsent(stored, lang);
		setInitial(stored);
		setSettingsOpen(false);
		setDecided(true);
	}, [lang, categories]);
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [visible ? /* @__PURE__ */ jsxs("aside", {
		ref,
		className: "cookie-notice",
		role: "region",
		"aria-label": asks ? t.label : notice.label,
		tabIndex: -1,
		children: [/* @__PURE__ */ jsxs("p", {
			className: "cookie-notice-text",
			children: [
				asks ? t.intro : variant === "panel" ? notice.panelText : notice.siteText,
				" ",
				/* @__PURE__ */ jsx("a", {
					className: "cookie-notice-link",
					href: privacyUrl,
					children: asks ? t.privacy : notice.privacy
				})
			]
		}), asks ? /* @__PURE__ */ jsxs("div", {
			className: "cookie-notice-actions",
			children: [
				/* @__PURE__ */ jsx("button", {
					type: "button",
					className: "cookie-notice-btn cookie-notice-btn--ghost",
					onClick: () => setSettingsOpen(true),
					children: t.settings
				}),
				/* @__PURE__ */ jsx("button", {
					type: "button",
					className: "cookie-notice-btn",
					onClick: () => save(necessaryOnly()),
					children: t.necessaryOnly
				}),
				/* @__PURE__ */ jsx("button", {
					type: "button",
					className: "cookie-notice-btn",
					onClick: () => save(grantShown(categories)),
					children: t.acceptAll
				})
			]
		}) : /* @__PURE__ */ jsx("button", {
			type: "button",
			className: "cookie-notice-btn",
			onClick: () => save(necessaryOnly()),
			children: notice.accept
		})]
	}) : null, /* @__PURE__ */ jsx(ConsentSettings, {
		open: settingsOpen,
		lang,
		categories,
		initial,
		privacyUrl,
		imprintUrl,
		onSave: save,
		onClose: () => setSettingsOpen(false)
	})] });
}
function ConsentLink({ lang = "de", className } = {}) {
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		className: className ? `consent-link ${className}` : "consent-link",
		onClick: openConsentSettings,
		children: translations[lang].consent.manage
	});
}
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/chunk-CKIWAE4V.js
var PREFS_COOKIE = "tds_prefs";
var PREFS_CHANGE_EVENT = "tds:prefs-change";
var MAX_AGE = 31536e3;
var PREF_VALUES = {
	theme: [
		"light",
		"dark",
		"system"
	],
	locale: ["de", "en"],
	reader_zoom: [
		"0.9",
		"1",
		"1.1",
		"1.25",
		"1.4"
	],
	reader_sidenav: ["open", "collapsed"],
	reader_toc: ["open", "collapsed"]
};
function sanitizePrefs(raw) {
	if (typeof raw !== "object" || raw === null) return {};
	const out = {};
	for (const key of Object.keys(PREF_VALUES)) {
		const value = raw[key];
		const asString = typeof value === "number" ? String(value) : value;
		if (typeof asString === "string" && PREF_VALUES[key].includes(asString)) out[key] = asString;
	}
	return out;
}
function prefsCookieDomain(hostname) {
	const host = hostname.toLowerCase();
	return host === "tracht-digital.de" || host.endsWith(".tracht-digital.de") ? ".tracht-digital.de" : null;
}
function parsePrefsCookie(cookieString) {
	const match = cookieString.match(new RegExp(`(?:^|;\\s*)${PREFS_COOKIE}=([^;]*)`));
	if (!match) return {};
	try {
		return sanitizePrefs(JSON.parse(decodeURIComponent(match[1])));
	} catch {
		return {};
	}
}
function readPrefsCookie() {
	if (typeof document === "undefined") return {};
	try {
		return parsePrefsCookie(document.cookie);
	} catch {
		return {};
	}
}
function writePrefsCookie(partial, options = {}) {
	const next = { ...readPrefsCookie() };
	for (const [key, value] of Object.entries(partial)) if (value === void 0) delete next[key];
	else next[key] = value;
	const clean = sanitizePrefs(next);
	if (typeof document !== "undefined") try {
		const domain = prefsCookieDomain(location.hostname);
		document.cookie = `${PREFS_COOKIE}=${encodeURIComponent(JSON.stringify(clean))}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax` + (domain ? `; Domain=${domain}` : "") + (location.protocol === "https:" ? "; Secure" : "");
	} catch {}
	if (options.announce !== false && typeof window !== "undefined") try {
		window.dispatchEvent(new CustomEvent(PREFS_CHANGE_EVENT, { detail: clean }));
	} catch {}
	return clean;
}
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/chunk-5TJE6SC6.js
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
var THEME_CHANGE_EVENT = "tds:theme-change";
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/chunk-J7OBMTKV.js
var BOUNCE_KEYFRAMES = [
	{ translate: "0px 0px" },
	{
		translate: "-7px 0px",
		offset: .16
	},
	{
		translate: "6px 0px",
		offset: .36
	},
	{
		translate: "-4px 0px",
		offset: .56
	},
	{
		translate: "2px 0px",
		offset: .76
	},
	{ translate: "0px 0px" }
];
var BOUNCE_OPTIONS = {
	duration: 420,
	easing: "ease-out",
	composite: "add"
};
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/astro/index.js
var pageTransitionOptIn = "@view-transition{navigation:auto;types:page}@media (prefers-reduced-motion:reduce){@view-transition{navigation:none}}";
var themeBootstrapScript = `(function () {
  /* The cross-site preference cookie (tds-shared/prefs), parsed once and
     published as window.__tdsPrefs for the other pre-paint scripts of a site
     (reader zoom, sidebar state) \u2014 so none of them re-implements the parse. */
  var prefs = {};
  try {
    var m = document.cookie.match(/(?:^|;\\s*)${PREFS_COOKIE}=([^;]*)/);
    if (m) prefs = JSON.parse(decodeURIComponent(m[1])) || {};
  } catch (e) { prefs = {}; }
  window.__tdsPrefs = prefs;
  function apply(root) {
    try {
      var saved = localStorage.getItem("${THEME_STORAGE_KEY}");
      if (saved === "light" || saved === "dark") {
        root.setAttribute("${THEME_ATTRIBUTE}", saved);
        return;
      }
    } catch (e) { /* storage disabled \u2014 fall through to the cookie / OS */ }
    if (prefs.theme === "light" || prefs.theme === "dark") {
      root.setAttribute("${THEME_ATTRIBUTE}", prefs.theme);
      return;
    }
    var dark = window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.setAttribute("${THEME_ATTRIBUTE}", dark ? "dark" : "light");
  }
  apply(document.documentElement);
  document.addEventListener("astro:before-swap", function (event) {
    apply(event.newDocument.documentElement);
  });
})();`;
var pageDirectionScript = `(function () {
  window.addEventListener("pagereveal", function (e) {
    try {
      if (!e.viewTransition || !window.navigation || !navigation.activation) return;
      var a = navigation.activation;
      var back = a.navigationType === "traverse" && a.from && a.entry && a.entry.index < a.from.index;
      /* A tab or the language switch said which way (tds-shared/app
         setNavDirection); one hop, at most 4 s old. */
      try {
        var hint = JSON.parse(sessionStorage.getItem("tds-nav-dir") || "null");
        sessionStorage.removeItem("tds-nav-dir");
        if (hint && Date.now() - hint.t < 4000 && a.navigationType !== "traverse") back = hint.d === "back";
      } catch (err) {}
      e.viewTransition.types.add(back ? "back" : "forward");
    } catch (err) { /* older engine \u2014 the fade applies */ }
  });
})();`;
function speculationRules(excludePrefixes = []) {
	const never = [
		"/tds/",
		"/install",
		"/api/",
		...excludePrefixes
	];
	return JSON.stringify({ prerender: [{
		where: { and: [
			{ href_matches: "/*" },
			...never.map((p) => ({ not: { href_matches: `${p.replace(/\/$/, "")}*` } })),
			{ not: { selector_matches: "[rel~=nofollow], [target=_blank], [download], [data-no-prerender]" } }
		] },
		eagerness: "moderate"
	}] });
}
var errorBounceScript = `(function () {
  if (window.__tdsBounce) return;
  var KF = ${JSON.stringify(BOUNCE_KEYFRAMES)};
  var OPT = ${JSON.stringify(BOUNCE_OPTIONS)};
  var ERR = '[role="alert"], .form-alert, .tds-toast--error, .tds-alert--danger, [data-error]';
  function still() {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }
  function bounce(el) {
    if (!el || !el.animate || still()) return;
    if (el.closest && el.closest("[inert], .tds-theme-preview")) return;
    var running = el.getAnimations ? el.getAnimations() : [];
    for (var i = 0; i < running.length; i++) if (running[i].id === "tds-bounce") running[i].cancel();
    try { el.animate(KF, OPT).id = "tds-bounce"; } catch (e) { /* no Web Animations */ }
  }
  window.__tdsBounce = bounce;

  var last = null, lastAt = 0;
  function remember(el) { if (el) { last = el; lastAt = Date.now(); } }
  function blame() {
    if (last && last.isConnected && Date.now() - lastAt < 4000) bounce(last);
    last = null;
  }
  document.addEventListener("submit", function (e) { remember(e.submitter); }, true);
  document.addEventListener("click", function (e) {
    var t = e.target;
    remember(t && t.closest ? t.closest('button, [role="button"], input[type="submit"], input[type="button"]') : null);
  }, true);
  document.addEventListener("invalid", function (e) { bounce(e.target); blame(); }, true);

  var live = document.readyState !== "loading";
  if (!live) document.addEventListener("DOMContentLoaded", function () { live = true; });
  document.addEventListener("astro:before-swap", function () { live = false; });
  document.addEventListener("astro:after-swap", function () {
    requestAnimationFrame(function () { live = true; });
  });

  function errorIn(node) {
    if (node.nodeType !== 1) return null;
    if (node.matches(ERR)) return node;
    return node.firstElementChild ? node.querySelector(ERR) : null;
  }
  new MutationObserver(function (records) {
    if (!live) return;
    var hits = [];
    function add(el) {
      if (!el || el.getAttribute("data-bounce") === "off" || hits.indexOf(el) >= 0) return;
      if (!(el.textContent || "").trim() && !el.matches("[aria-invalid]")) return;
      hits.push(el);
    }
    for (var i = 0; i < records.length; i++) {
      var r = records[i];
      if (r.type === "attributes") {
        if (r.target.getAttribute("aria-invalid") === "true" && r.oldValue !== "true") add(r.target);
        continue;
      }
      var found = false;
      for (var j = 0; j < r.addedNodes.length; j++) {
        var n = r.addedNodes[j];
        var err = errorIn(n);
        if (err) { add(err); found = true; }
        if (n.nodeType === 1 && n.matches('[aria-invalid="true"]')) { add(n); found = true; }
      }
      if (!found) {
        var host = r.target.nodeType === 1 ? r.target : r.target.parentElement;
        var owner = host && host.closest ? host.closest(ERR) : null;
        if (owner && (r.type === "characterData" || r.addedNodes.length)) add(owner);
      }
    }
    if (!hits.length) return;
    for (var k = 0; k < hits.length; k++) {
      var nested = false;
      for (var m = 0; m < hits.length; m++) if (m !== k && hits[m].contains(hits[k])) nested = true;
      if (!nested) bounce(hits[k]);
    }
    blame();
  }).observe(document.documentElement, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["aria-invalid"],
    attributeOldValue: true,
  });
})();`;
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/chunk-JBEDYWJ3.js
var PROPERTY_ORIGINS = {
	journal: "https://blog.tracht-digital.de",
	tools: "https://tools.tracht-digital.de",
	shop: "https://shop.tracht-digital.de",
	main: "https://tracht-digital.de"
};
var LABELS = {
	journal: {
		de: "Journal",
		en: "Journal"
	},
	tools: {
		de: "Tools",
		en: "Tools"
	},
	shop: {
		de: "Shop",
		en: "Shop"
	},
	main: {
		de: "Startseite",
		en: "Home"
	}
};
var ORDER = [
	"journal",
	"tools",
	"shop",
	"main"
];
function propertyHome(key, lang) {
	return `${PROPERTY_ORIGINS[key]}${lang === "en" ? "/en/" : "/"}`;
}
function propertyContact(lang) {
	return `${propertyHome("main", lang)}#contact`;
}
function propertyNav(current, lang, homeHref) {
	return ORDER.map((key) => ({
		key,
		label: LABELS[key][lang],
		href: key === current ? homeHref : propertyHome(key, lang),
		current: key === current
	}));
}
[
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])"
].join(",");
//#endregion
//#region src/components/AppChrome.astro
createAstro("https://tools.tracht-digital.de");
var $$AppChrome = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$AppChrome;
	const { lang } = Astro.props;
	const de = lang === "de";
	const base = de ? "" : "/en";
	const path = Astro.url.pathname;
	let tools = [];
	try {
		tools = await enabledTools();
	} catch {
		tools = [];
	}
	const entries = tools.map((tool) => {
		const copy = toolCopyFor(lang, tool, site.name);
		return {
			slug: tool.slug,
			category: tool.category,
			name: copy.name,
			description: copy.description,
			href: `${base}/tools/${tool.slug}`
		};
	});
	const rank = (c) => {
		const i = categoryOrder.indexOf(c);
		return i === -1 ? categoryOrder.length : i;
	};
	const groups = [...new Set(entries.map((e) => e.category))].sort((a, b) => rank(a) - rank(b)).map((cat) => ({
		cat,
		label: categoryLabels[lang][cat] ?? cat,
		items: entries.filter((e) => e.category === cat)
	}));
	const others = propertyNav("tools", lang, `${base}/`).filter((p) => !p.current);
	const contact = propertyContact(lang);
	const t = de ? {
		tabs: "App-Navigation",
		catalog: "Katalog",
		discover: "Entdecken",
		more: "Mehr",
		discoverLead: "Finde das passende Werkzeug – oder stöbere nach Bereich.",
		searchLabel: "Tools durchsuchen",
		searchPh: "z. B. QR-Code, PDF, Rechnung",
		none: "Kein Tool passt dazu.",
		areas: "Bereiche",
		look: "Darstellung",
		light: "Hell",
		dark: "Dunkel",
		auto: "Auto",
		language: "Sprache",
		elsewhere: "Mehr von Tracht Digital",
		cta: "Unverbindlich anfragen",
		count: (n) => n === 1 ? "1 Tool" : `${n} Tools`
	} : {
		tabs: "App navigation",
		catalog: "Catalog",
		discover: "Discover",
		more: "More",
		discoverLead: "Find the right tool — or browse by area.",
		searchLabel: "Search the tools",
		searchPh: "e.g. QR code, PDF, invoice",
		none: "No tool matches that.",
		areas: "Areas",
		look: "Appearance",
		light: "Light",
		dark: "Dark",
		auto: "Auto",
		language: "Language",
		elsewhere: "More from Tracht Digital",
		cta: "Get in touch",
		count: (n) => n === 1 ? "1 tool" : `${n} tools`
	};
	return renderTemplate`${maybeRenderHead($$result)}<nav class="tds-tabbar" id="app-tabbar"${addAttribute(t.tabs, "aria-label")} data-astro-cid-xmtaa75r><a class="tds-tabbar__item"${addAttribute(`${base}/`, "href")}${addAttribute(`${base}/ ${base}/tools`, "data-tab-match")} data-astro-cid-xmtaa75r><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-astro-cid-xmtaa75r><rect x="3" y="3" width="7.5" height="7.5" data-astro-cid-xmtaa75r></rect><rect x="13.5" y="3" width="7.5" height="7.5" data-astro-cid-xmtaa75r></rect><rect x="3" y="13.5" width="7.5" height="7.5" data-astro-cid-xmtaa75r></rect><rect x="13.5" y="13.5" width="7.5" height="7.5" data-astro-cid-xmtaa75r></rect></svg><span data-astro-cid-xmtaa75r>${t.catalog}</span></a><button type="button" class="tds-tabbar__item" data-tab-page="discover" aria-controls="tabpage-discover" aria-expanded="false" data-astro-cid-xmtaa75r><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-astro-cid-xmtaa75r><circle cx="11" cy="11" r="7" data-astro-cid-xmtaa75r></circle><path d="m20 20-3.5-3.5" data-astro-cid-xmtaa75r></path></svg><span data-astro-cid-xmtaa75r>${t.discover}</span></button><button type="button" class="tds-tabbar__item" data-tab-page="more" aria-controls="tabpage-more" aria-expanded="false" data-astro-cid-xmtaa75r><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-astro-cid-xmtaa75r><path d="M4 7h10M18 7h2M4 17h4M12 17h8" data-astro-cid-xmtaa75r></path><circle cx="16" cy="7" r="2" data-astro-cid-xmtaa75r></circle><circle cx="10" cy="17" r="2" data-astro-cid-xmtaa75r></circle></svg><span data-astro-cid-xmtaa75r>${t.more}</span></button></nav><section class="tds-tabpage" id="tabpage-discover" data-tab-page-id="discover" aria-labelledby="tabpage-discover-title" hidden data-astro-cid-xmtaa75r><header class="tds-tabpage__head" data-astro-cid-xmtaa75r><h2 id="tabpage-discover-title" tabindex="-1" data-astro-cid-xmtaa75r>${t.discover}</h2><p data-astro-cid-xmtaa75r>${t.discoverLead}</p></header><div class="tds-tabpage__body" data-astro-cid-xmtaa75r><form class="tds-searchfield" role="search" data-astro-cid-xmtaa75r><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" data-astro-cid-xmtaa75r><circle cx="11" cy="11" r="7" data-astro-cid-xmtaa75r></circle><path d="m20 20-3.5-3.5" data-astro-cid-xmtaa75r></path></svg><label class="sr-only" for="discover-q" data-astro-cid-xmtaa75r>${t.searchLabel}</label><input id="discover-q" class="tds-searchfield__input" type="search" enterkeyhint="search" autocomplete="off"${addAttribute(t.searchPh, "placeholder")} data-autofocus data-astro-cid-xmtaa75r></form><p class="sr-only" role="status" aria-live="polite" id="discover-status" data-astro-cid-xmtaa75r></p><div class="tds-tabpage__section discover-results" id="discover-results" hidden data-astro-cid-xmtaa75r><ul class="discover-list" data-astro-cid-xmtaa75r>${entries.map((e) => renderTemplate`<li${addAttribute(`${e.name} ${e.description} ${categoryLabels[lang][e.category] ?? ""}`.toLowerCase(), "data-search")} data-astro-cid-xmtaa75r><a${addAttribute(e.href, "href")} class="discover-hit" data-astro-cid-xmtaa75r><strong data-astro-cid-xmtaa75r>${e.name}</strong><small data-astro-cid-xmtaa75r>${e.description}</small></a></li>`)}</ul><p class="discover-empty" id="discover-empty" hidden data-astro-cid-xmtaa75r>${t.none}</p></div><div id="discover-idle" data-astro-cid-xmtaa75r><div class="tds-tabpage__section" data-astro-cid-xmtaa75r><p class="tds-sheet-heading" data-astro-cid-xmtaa75r>${t.areas}</p><div class="tds-tilegrid" data-astro-cid-xmtaa75r>${groups.map((g) => renderTemplate`<button type="button" class="tds-tile tds-tile--button"${addAttribute(`area-${g.cat}`, "data-jump")} data-astro-cid-xmtaa75r><strong data-astro-cid-xmtaa75r>${g.label}</strong><small data-astro-cid-xmtaa75r>${t.count(g.items.length)}</small></button>`)}</div></div>${groups.map((g) => renderTemplate`<div class="tds-tabpage__section"${addAttribute(`area-${g.cat}`, "id")} data-astro-cid-xmtaa75r><p class="tds-sheet-heading" data-astro-cid-xmtaa75r>${g.label}</p><ul class="discover-list" data-astro-cid-xmtaa75r>${g.items.map((e) => renderTemplate`<li data-astro-cid-xmtaa75r><a${addAttribute(e.href, "href")} class="discover-hit"${addAttribute(path === e.href ? "page" : void 0, "aria-current")} data-astro-cid-xmtaa75r><strong data-astro-cid-xmtaa75r>${e.name}</strong><small data-astro-cid-xmtaa75r>${e.description}</small></a></li>`)}</ul></div>`)}</div></div></section><section class="tds-tabpage" id="tabpage-more" data-tab-page-id="more" aria-labelledby="tabpage-more-title" hidden data-astro-cid-xmtaa75r><header class="tds-tabpage__head" data-astro-cid-xmtaa75r><h2 id="tabpage-more-title" tabindex="-1" data-astro-cid-xmtaa75r>${t.more}</h2></header><div class="tds-tabpage__body" id="tabpage-more-body" data-astro-cid-xmtaa75r><div class="tds-tabpage__section" data-astro-cid-xmtaa75r><p class="tds-sheet-heading" data-astro-cid-xmtaa75r>${t.look}</p><div class="tds-segmented tds-segmented--icons" role="group"${addAttribute(t.look, "aria-label")} data-astro-cid-xmtaa75r><button type="button" class="tds-segmented__option" data-theme-choice="light" aria-pressed="false"${addAttribute(t.light, "aria-label")}${addAttribute(t.light, "title")} data-astro-cid-xmtaa75r><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true" data-astro-cid-xmtaa75r><circle cx="12" cy="12" r="4" data-astro-cid-xmtaa75r></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" data-astro-cid-xmtaa75r></path></svg></button><button type="button" class="tds-segmented__option" data-theme-choice="dark" aria-pressed="false"${addAttribute(t.dark, "aria-label")}${addAttribute(t.dark, "title")} data-astro-cid-xmtaa75r><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-astro-cid-xmtaa75r><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" data-astro-cid-xmtaa75r></path></svg></button><button type="button" class="tds-segmented__option" data-theme-choice="system" aria-pressed="false"${addAttribute(t.auto, "aria-label")}${addAttribute(t.auto, "title")} data-astro-cid-xmtaa75r><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true" data-astro-cid-xmtaa75r><circle cx="12" cy="12" r="8.5" data-astro-cid-xmtaa75r></circle><path d="M12 3.5a8.5 8.5 0 0 1 0 17Z" fill="currentColor" stroke="none" data-astro-cid-xmtaa75r></path></svg></button></div></div>${renderTemplate`<div class="tds-tabpage__section" data-astro-cid-xmtaa75r><p class="tds-sheet-heading" data-astro-cid-xmtaa75r>${t.language}</p><div class="tds-segmented" role="group"${addAttribute(t.language, "aria-label")} data-astro-cid-xmtaa75r><a class="tds-segmented__option"${addAttribute(localizedPath(path, "de"), "href")} hreflang="de" data-locale-link="de"${addAttribute(de ? "true" : void 0, "aria-current")} data-astro-cid-xmtaa75r>Deutsch</a><a class="tds-segmented__option"${addAttribute(localizedPath(path, "en"), "href")} hreflang="en" data-locale-link="en"${addAttribute(!de ? "true" : void 0, "aria-current")} data-astro-cid-xmtaa75r>English</a></div></div>`}<div class="tds-tabpage__section" data-astro-cid-xmtaa75r><p class="tds-sheet-heading" data-astro-cid-xmtaa75r>${t.elsewhere}</p><div class="tds-linkgroup" data-astro-cid-xmtaa75r>${others.map((p) => renderTemplate`<a${addAttribute(p.href, "href")} data-astro-cid-xmtaa75r>${p.label}</a>`)}</div><a${addAttribute(contact, "href")} class="btn btn-primary no-underline more-cta" data-track="app-contact" data-astro-cid-xmtaa75r>${t.cta}</a></div></div></section>${renderScript($$result, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/components/AppChrome.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/components/AppChrome.astro", void 0);
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
var trimEnd$1 = (value) => value.replace(/\/+$/, "");
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
			if (typeof config.apiBase === "string" && config.apiBase !== "") state.cached = trimEnd$1(config.apiBase);
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
	return trimEnd$1(/^https?:\/\//i.test(value) ? value : fallback);
}
var ACCOUNT_HINT_KEY = "tds_pub_account";
var ACCOUNT_LABEL_KEY = "tds_pub_account_label";
var trimEnd = (value) => value.replace(/\/+$/, "");
async function accountEndpoints(fallbacks = {}) {
	const base = await runtimeSetting("apiBase", fallbacks.apiBase ?? "https://api.tracht-digital.de");
	const login = await runtimeSetting("loginUrl", fallbacks.loginUrl ?? "https://auth.tracht-digital.de");
	const write = await runtimeAbsolute("authBase", fallbacks.authApi ?? "https://api.tracht-digital.de/auth");
	return {
		read: `${trimEnd(base)}/auth`,
		write,
		login: trimEnd(login)
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
var SIGNED_IN_COOKIE = "tds_signed_in";
function mayHaveSession() {
	if (hasAccountHint()) return true;
	try {
		return typeof document !== "undefined" && new RegExp(`(?:^|;\\s*)${SIGNED_IN_COOKIE}=1`).test(document.cookie);
	} catch {
		return false;
	}
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
	return `${trimEnd(login)}?next=${encodeURIComponent(next)}`;
}
function passwordHref(login, next = here()) {
	return `${trimEnd(login)}/passwort?next=${encodeURIComponent(next)}`;
}
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/chunk-5Z77KNKZ.js
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
		if (preference === "system") localStorage.removeItem(THEME_STORAGE_KEY);
		else localStorage.setItem(THEME_STORAGE_KEY, preference);
	} catch {}
	writePrefsCookie({ theme: preference }, { announce: options.announce });
	if (hasDocument()) document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
	if (options.announce !== false && typeof window !== "undefined") try {
		const detail = {
			preference,
			theme
		};
		window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail }));
	} catch {}
	return theme;
}
function onThemeChange(handler) {
	if (typeof window === "undefined") return () => {};
	const listener = (event) => {
		const detail = event.detail;
		if (detail) handler(detail);
	};
	window.addEventListener(THEME_CHANGE_EVENT, listener);
	return () => window.removeEventListener(THEME_CHANGE_EVENT, listener);
}
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/chunk-VTJDWZ6A.js
var ease = [
	.2,
	.8,
	.2,
	1
];
var cssEase = {
	out: `cubic-bezier(${ease.join(", ")})`,
	inOut: `cubic-bezier(${[
		.4,
		0,
		.2,
		1
	].join(", ")})`
};
var durations = {
	fast: 160,
	base: 200,
	slow: 320
};
var transitions = {
	fast: {
		duration: durations.fast / 1e3,
		ease
	},
	base: {
		duration: durations.base / 1e3,
		ease
	},
	slow: {
		duration: durations.slow / 1e3,
		ease
	}
};
durations.slow / 1e3;
transitions.base, transitions.fast;
transitions.base, transitions.fast;
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/components/index.js
function syncCloneState(original, copy, animated, scrolled) {
	if (original.scrollLeft || original.scrollTop) scrolled.push([
		copy,
		original.scrollLeft,
		original.scrollTop
	]);
	if (animated.has(original) && (copy instanceof HTMLElement || copy instanceof SVGElement)) {
		const cs = getComputedStyle(original);
		const style = copy.style;
		style.setProperty("transform", cs.transform);
		style.setProperty("translate", cs.translate);
		style.setProperty("rotate", cs.rotate);
		style.setProperty("scale", cs.scale);
		style.setProperty("opacity", cs.opacity);
	}
	const a = original.children;
	const b = copy.children;
	for (let i = 0; i < a.length && i < b.length; i++) syncCloneState(a[i], b[i], animated, scrolled);
}
function ThemeToggle({ labelToDark = "Auf Dunkel umschalten", labelToLight = "Auf Hell umschalten" } = {}) {
	const [theme, setTheme] = useState("light");
	const [mounted, setMounted] = useState(false);
	const [flipped, setFlipped] = useState(false);
	const buttonRef = useRef(null);
	useEffect(() => {
		const current = document.documentElement.getAttribute(THEME_ATTRIBUTE);
		setTheme(current === "dark" ? "dark" : "light");
		setMounted(true);
		return onThemeChange((detail) => setTheme(detail.theme));
	}, []);
	const previewRef = useRef(null);
	const frameRef = useRef(0);
	const removeTimerRef = useRef(0);
	const pointRef = useRef({
		x: 0,
		y: 0
	});
	const buildClone = (target) => {
		const page = document.createElement("div");
		page.className = "tds-theme-preview__page";
		page.setAttribute("data-theme", target);
		const animated = /* @__PURE__ */ new Set();
		const scrolled = [];
		for (const animation of document.getAnimations?.() ?? []) {
			const target2 = animation.effect?.target;
			if (target2) animated.add(target2);
		}
		for (const node of Array.from(document.body.children)) {
			if (node instanceof HTMLElement && node.classList.contains("tds-theme-preview")) continue;
			if (node.tagName === "SCRIPT" || node.tagName === "LINK") continue;
			if (node instanceof HTMLElement && node.dataset.themePreview === "skip") continue;
			const copy = node.cloneNode(true);
			syncCloneState(node, copy, animated, scrolled);
			page.appendChild(copy);
		}
		for (const stray of page.querySelectorAll("script, link, [name], [data-theme-preview=\"skip\"]")) {
			if (stray.tagName === "SCRIPT" || stray.tagName === "LINK" || stray.dataset?.themePreview === "skip") {
				stray.remove();
				continue;
			}
			stray.removeAttribute("name");
		}
		page.inert = true;
		const restoreScroll = () => {
			for (const [copy, left, top] of scrolled) copy.scrollTo?.({
				left,
				top,
				behavior: "instant"
			});
		};
		return {
			page,
			restoreScroll
		};
	};
	const alignClone = () => {
		const page = previewRef.current?.firstElementChild;
		if (page) page.style.top = `${-window.scrollY}px`;
	};
	const paintPreview = () => {
		frameRef.current = 0;
		const el = previewRef.current;
		if (!el) return;
		el.style.setProperty("--tds-theme-preview-x", `${pointRef.current.x}px`);
		el.style.setProperty("--tds-theme-preview-y", `${pointRef.current.y}px`);
	};
	const trackPointer = (event) => {
		pointRef.current = {
			x: event.clientX,
			y: event.clientY
		};
		if (!previewRef.current || frameRef.current) return;
		frameRef.current = requestAnimationFrame(paintPreview);
	};
	const discardPreview = () => {
		if (removeTimerRef.current) {
			clearTimeout(removeTimerRef.current);
			removeTimerRef.current = 0;
		}
		if (frameRef.current) {
			cancelAnimationFrame(frameRef.current);
			frameRef.current = 0;
		}
		previewRef.current?.remove();
		previewRef.current = null;
	};
	const closePreview = () => {
		if (frameRef.current) {
			cancelAnimationFrame(frameRef.current);
			frameRef.current = 0;
		}
		const el = previewRef.current;
		if (!el || removeTimerRef.current) return;
		el.removeAttribute("data-visible");
		const fade = parseFloat(getComputedStyle(el).transitionDuration) || .2;
		removeTimerRef.current = window.setTimeout(discardPreview, fade * 1e3 + 40);
	};
	const openPreview = (event) => {
		if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		let el = previewRef.current;
		if (el) {
			if (removeTimerRef.current) {
				clearTimeout(removeTimerRef.current);
				removeTimerRef.current = 0;
			}
		} else {
			el = document.createElement("div");
			el.className = "tds-theme-preview";
			el.setAttribute("aria-hidden", "true");
			const current = document.documentElement.getAttribute(THEME_ATTRIBUTE);
			const clone = buildClone(current === "dark" ? "light" : "dark");
			el.appendChild(clone.page);
			document.body.appendChild(el);
			clone.restoreScroll();
			previewRef.current = el;
		}
		pointRef.current = {
			x: event.clientX,
			y: event.clientY
		};
		paintPreview();
		alignClone();
		const target = el;
		requestAnimationFrame(() => {
			if (previewRef.current === target) target.setAttribute("data-visible", "true");
		});
	};
	useEffect(() => {
		const button = buttonRef.current;
		if (!button) return;
		const onEnter = (event) => openPreview(event);
		const onMove = (event) => trackPointer(event);
		button.addEventListener("pointerenter", onEnter);
		button.addEventListener("pointermove", onMove);
		button.addEventListener("pointerleave", closePreview);
		button.addEventListener("pointercancel", closePreview);
		button.addEventListener("blur", closePreview);
		const onScroll = () => {
			if (previewRef.current) alignClone();
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", onScroll);
			button.removeEventListener("pointerenter", onEnter);
			button.removeEventListener("pointermove", onMove);
			button.removeEventListener("pointerleave", closePreview);
			button.removeEventListener("pointercancel", closePreview);
			button.removeEventListener("blur", closePreview);
			discardPreview();
		};
	}, []);
	const flip = () => {
		const next = theme === "dark" ? "light" : "dark";
		setFlipped(true);
		closePreview();
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
				document.documentElement.animate([
					{ transform: "translateY(-100%)" },
					{
						transform: "translateY(1.5%)",
						offset: .78
					},
					{ transform: "translateY(0)" }
				], {
					duration: 560,
					easing: cssEase.out,
					pseudoElement: "::view-transition-new(root)"
				});
				document.documentElement.animate({ transform: ["translateY(0)", "translateY(10%)"] }, {
					duration: 560,
					easing: cssEase.inOut,
					pseudoElement: "::view-transition-old(root)"
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
			className: `${mounted && theme === "dark" ? "hidden" : "block"}${flipped ? " tds-theme-toggle__icon--turn" : ""}`,
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
			className: `${mounted && theme === "dark" ? "block" : "hidden"}${flipped ? " tds-theme-toggle__icon--turn" : ""}`,
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
	const variant = CATEGORICAL_CHIP_VARIANTS[hash(String(seed ?? label ?? "")) % CATEGORICAL_CHIP_VARIANTS.length];
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
			if (!mayHaveSession()) {
				setMe(null);
				setLoading(false);
				return;
			}
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
					children: [s.menuLabel, label ? ` \u2014 ${label}` : ""]
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
	const nav = propertyNav("tools", lang, `${base}/`);
	const contact = propertyContact(lang);
	const langHrefs = [{
		code: "de",
		href: localizedPath(path, "de"),
		label: "DE"
	}, {
		code: "en",
		href: localizedPath(path, "en"),
		label: "EN"
	}];
	return renderTemplate`${maybeRenderHead($$result)}<header class="brand-header tds-app-header" id="site-header"><div class="tds-shell tds-sitebar"><a${addAttribute(`${base}/`, "href")} class="tds-sitebar__brand brand-wordmark"${addAttribute(`${site.name} — ${s.navAllTools}`, "aria-label")}><span class="brand-logo" aria-hidden="true"></span><span class="accent-italic">Tools</span></a><span class="tds-sitebar__divider" aria-hidden="true"></span><nav class="tds-sitebar__nav" aria-label="Navigation">${nav.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} class="tds-sitebar__link"${addAttribute(item.current ? onCatalog ? "page" : "true" : void 0, "aria-current")}>${item.label}</a>`)}</nav><div class="tds-sitebar__desktop">${renderTemplate`<div class="tds-lang-toggle" role="group" aria-label="Sprache / Language">${langHrefs.map((l) => renderTemplate`<a${addAttribute(l.href, "href")}${addAttribute(l.code, "hreflang")}${addAttribute(l.code, "lang")}${addAttribute(l.code, "data-locale-link")}${addAttribute(l.code === lang ? "on" : "", "class")}${addAttribute(l.code === lang ? "true" : void 0, "aria-current")}>${l.label}</a>`)}</div>`}${renderComponent($$result, "ThemeToggle", ThemeToggle, {
		"client:idle": true,
		"client:component-hydration": "idle",
		"client:component-path": "@tracht-digital-solutions/tds-shared/components",
		"client:component-export": "ThemeToggle"
	})}<div class="tds-sitebar__wide"><a${addAttribute(contact, "href")} class="btn btn-primary no-underline" data-track="header-contact">${s.cta}</a></div></div><div class="tds-sitebar__actions">${renderComponent($$result, "AccountMenu", AccountMenu, {
		"client:idle": true,
		"lang": lang,
		"loggedOut": "login",
		"client:component-hydration": "idle",
		"client:component-path": "@tracht-digital-solutions/tds-shared/components",
		"client:component-export": "AccountMenu"
	})}</div></div></header><span class="sr-only" data-site-tagline>${s.tagline}</span>${renderScript($$result, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
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
			}],
			consent: true
		}
	];
	return renderTemplate`${maybeRenderHead($$result)}<footer class="mt-20 tds-tone-navy"><div class="tds-shell grid gap-9 py-12 md:grid-cols-[1.4fr_repeat(3,1fr)]"><div><p class="brand-wordmark mb-3 inline-flex items-center gap-2 text-lg" style="color: #fff;"><span class="brand-logo brand-logo--inverse" aria-hidden="true"></span><span><span class="sr-only">TD </span><span style="color: var(--color-accent-pink);">Tools</span></span></p><span aria-hidden="true" class="tds-brandbar tds-brandbar--sm tds-brandbar--on-dark mb-4"></span><p class="text-sm leading-relaxed" style="color: rgb(255 255 255 / 0.65); max-width: 34ch;">${s.footerBlurb}</p><p class="mt-5 text-[0.8125rem]" style="font-family: var(--font-mono); color: rgb(255 255 255 / 0.6);">Julian Tracht · 21493 Schwarzenbek bei Hamburg</p></div>${groups.map((g) => renderTemplate`<div><p class="eyebrow mb-4" style="color: rgb(255 255 255 / 0.6);">${g.head}</p><ul class="m-0 flex list-none flex-col gap-2.5 p-0">${g.items.map((it) => renderTemplate`<li><a${addAttribute(it.href, "href")} class="text-sm text-white/75 no-underline transition-colors hover:text-white">${it.label}</a></li>`)}${g.consent ? renderTemplate`<li>${renderComponent($$result, "ConsentLink", ConsentLink, {
		"client:idle": true,
		"lang": lang,
		"className": "text-sm text-white/75 no-underline hover:text-white",
		"client:component-hydration": "idle",
		"client:component-path": "@tracht-digital-solutions/tds-shared/consent",
		"client:component-export": "ConsentLink"
	})}</li>` : null}</ul></div>`)}</div><div class="tds-shell flex flex-wrap items-center justify-between gap-4 pt-4 pb-8 text-xs" style="border-top: 1px solid rgb(255 255 255 / 0.1); font-family: var(--font-mono); color: rgb(255 255 255 / 0.6);"><p>© ${year} Tracht Digital Solutions · ${s.footerTagline}</p>${adsEnabled && renderTemplate`<button type="button" id="tds-ad-consent-reset" class="btn btn-ghost" style="font-family: var(--font-mono); font-size: inherit;">${s.footerAdConsent}</button>`}</div>${adsEnabled && renderTemplate`<script>
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
	const hidden = noindex || await isExcluded(Astro.url.pathname);
	const ogImageAbs = ogImage.startsWith("http") ? ogImage : new URL(ogImage, origin).toString();
	const deAltUrl = new URL(localizedPath(Astro.url.pathname, "de"), origin).toString();
	const enAltUrl = new URL(localizedPath(Astro.url.pathname, "en"), origin).toString();
	const altOgLocale = lang === "de" ? ogLocale.en : ogLocale.de;
	const ads = await adsConfig();
	const adsActive = ads.enabled && !!ads.publisherId;
	const jsonLdText = jsonLd ? serializeJsonLd(jsonLd) : null;
	return renderTemplate`<html${addAttribute(lang, "lang")} data-surface="blog" data-flat class="tds-app"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="preload"${addAttribute(plus_jakarta_sans_latin_wght_normal_default, "href")} as="font" type="font/woff2" crossorigin><link rel="preload"${addAttribute(lato_latin_900_normal_default, "href")} as="font" type="font/woff2" crossorigin><!-- The cross-page transition switch, as early as it can be: Chrome decides the
         incoming page's opt-in at its first render, and the stylesheet linked at the
         end of this head often arrives later (tds-shared pageTransitionOptIn). --><style>${unescapeHTML(pageTransitionOptIn)}</style><script>${unescapeHTML(pageDirectionScript)}<\/script><meta name="description"${addAttribute(description, "content")}><meta name="theme-color" content="#fafaf7" media="(prefers-color-scheme: light)"><meta name="theme-color" content="#070a14" media="(prefers-color-scheme: dark)"><link rel="manifest" href="/manifest.webmanifest"><link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-title" content="TD Tools">${hidden && renderTemplate`<meta name="robots" content="noindex,nofollow">`}<link rel="icon" type="image/png" href="/favicon.png" sizes="any"><script>${unescapeHTML(themeBootstrapScript)}<\/script><script>${unescapeHTML(errorBounceScript)}<\/script><link rel="canonical"${addAttribute(url, "href")}>${!hidden && renderTemplate`${renderComponent($$result, "Fragment", Fragment$2, {}, { "default": ($$result) => renderTemplate`<link rel="alternate" hreflang="de"${addAttribute(deAltUrl, "href")}><link rel="alternate" hreflang="en"${addAttribute(enAltUrl, "href")}><link rel="alternate" hreflang="x-default"${addAttribute(deAltUrl, "href")}>` })}`}<link rel="alternate" type="application/rss+xml" title="Tracht Digital — Journal"${addAttribute(`${seoConfig.blogUrl}/rss.xml`, "href")}><link rel="preconnect" href="https://api.tracht-digital.de" crossorigin><link rel="preconnect" href="https://tracht-digital.de" crossorigin>${adsActive && renderTemplate`<link rel="preconnect" href="https://pagead2.googlesyndication.com" crossorigin>`}<meta name="generator"${addAttribute(Astro.generator, "content")}><title>${title}</title><meta property="og:type" content="website"><meta property="og:url"${addAttribute(url, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(ogImageAbs, "content")}><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt"${addAttribute(title, "content")}><meta property="og:locale"${addAttribute(ogLocale[lang], "content")}>${!hidden && renderTemplate`<meta property="og:locale:alternate"${addAttribute(altOgLocale, "content")}>`}<meta property="og:site_name"${addAttribute(site.name, "content")}><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(ogImageAbs, "content")}>${jsonLdText && renderTemplate`<script type="application/ld+json">${unescapeHTML(jsonLdText)}<\/script>`}<script type="speculationrules">${unescapeHTML(speculationRules(["/og/"]))}<\/script>${renderHead($$result)}</head><body><a href="#main" class="absolute -top-full left-0 z-50 px-6 py-3 bg-[var(--color-surface-navy)] text-white text-sm font-semibold focus:top-0 transition-all">${t(lang).skipToContent}</a>${renderComponent($$result, "Header", $$Header, { "lang": lang })}<main id="main">${renderSlot($$result, $$slots["default"])}</main>${renderComponent($$result, "Footer", $$Footer, { "lang": lang })}${renderComponent($$result, "AppChrome", $$AppChrome, { "lang": lang })}${renderScript($$result, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")}${renderScript($$result, "/home/runner/work/tds-tools-frontend/tds-tools-frontend/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts")}${renderComponent($$result, "ConsentBanner", ConsentBanner, {
		"client:idle": true,
		"lang": lang,
		"categories": adsActive ? ["analytics", "marketing"] : ["analytics"],
		"privacyUrl": links.datenschutz,
		"imprintUrl": links.impressum,
		"client:component-hydration": "idle",
		"client:component-path": "@tracht-digital-solutions/tds-shared/consent",
		"client:component-export": "ConsentBanner"
	})}${adsActive && renderTemplate`<script>(function(){${defineScriptVars({ adsClient: ads.publisherId })}
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
		sparkles: "M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8zM18 15l.9 2.3 2.3.9-2.3.9L18 21.4l-.9-2.3-2.3-.9 2.3-.9z",
		"id-card": "M2 5h20v14H2zM9 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6 16a3 3 0 0 1 6 0M15 10h4M15 14h3",
		"arrow-right": "M5 12h14M13 6l6 6-6 6"
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
	return renderTemplate`${maybeRenderHead($$result)}<aside class="service-note"><p class="service-note__text">${s.serviceNote}</p><a${addAttribute(links.contact, "href")} class="service-note__cta link-underline" data-track="service-note">${s.serviceNoteCta}</a></aside>`;
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
* The page itself as an entity: part of this property, published by the
* organisation, written by the person the Impressum names, dated.
*
* Ported from the marketing site, where the service and platform pages have
* carried it since 2026-09. A tool page used to declare the TOOL
* (`WebApplication`) and the breadcrumb but never the page, so nothing in the
* markup said when the text was last true or who stands behind it — the two
* things an answer engine weighs besides the content itself.
*
* Every value here must be visible on the page too: `dateModified` is the
* guide's "Stand" line, the author the byline beside it.
*/
function webPageNode(input) {
	return {
		"@type": "WebPage",
		"@id": `${input.url}#webpage`,
		url: input.url,
		name: input.name,
		description: input.description,
		inLanguage: input.lang === "de" ? "de-DE" : "en-GB",
		isPartOf: { "@id": WEBSITE_ID },
		publisher: { "@id": ORG_ID },
		author: { "@id": PERSON_ID },
		...input.dateModified ? { dateModified: input.dateModified } : {},
		...input.breadcrumbId ? { breadcrumb: { "@id": input.breadcrumbId } } : {}
	};
}
/**
* BreadcrumbList — emitted on every tool page. The page has always DRAWN a
* breadcrumb ("Alle Tools / QR-Code-Generator") and never declared one, so
* the hierarchy was visible to a reader and invisible to everything else.
*/
function breadcrumbSchema(items, id) {
	return {
		"@type": "BreadcrumbList",
		...id ? { "@id": id } : {},
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
export { itemListSchema as a, softwareApplicationSchema as c, $$ServiceNote as d, $$AdSlot as f, renderScript as g, runtimeSetting as h, howToSchema as i, webPageNode as l, $$Layout as m, breadcrumbSchema as n, organizationSchema as o, $$Icon as p, faqPageSchema as r, personSchema as s, asGraph as t, websiteSchema as u };
