import { r as contentCache } from "./cache_Co9YbPGn.mjs";
import { t as apiBase } from "./connection_jGVRvpuo.mjs";
import { n as siteKeyHeaders, t as assertKeyAccepted } from "./siteKey_qLmc5xZf.mjs";
//#region src/lib/i18n.ts
var copy = {
	de: {
		tagline: "Werkzeuge für Unternehmen, vieles kostenlos",
		/**
		* Order is deliberate: the concrete tool names come first (this site
		* ranks on tool queries), brand and town ride in the tail where they
		* still fit inside the ~160 characters a SERP renders.
		*/
		description: "Werkzeuge direkt im Browser: QR-Codes, Passwörter, JSON, PDF und Texterkennung — vieles kostenlos und ohne Anmeldung. Von TDS aus Schwarzenbek bei Hamburg.",
		heroEyebrow: "Digitalisierung für Unternehmen",
		heroHeadlineLead: "Digitale",
		heroHeadlineAccent: "Werkzeuge",
		heroHeadlineTail: "— direkt im Browser.",
		heroBody: "QR-Codes, Passwörter, JSON, PDF-Werkzeuge und Texterkennung. Vieles kostenlos und ohne Anmeldung, alles ohne Installation. Von Tracht Digital Solutions aus Schwarzenbek bei Hamburg.",
		navAllTools: "Alle Tools",
		navBlog: "Blog",
		navHome: "Startseite",
		navMenu: "Menü",
		toBlog: "Zum Blog",
		toHome: "Zur Startseite",
		cta: "Unverbindlich anfragen",
		skipToContent: "Zum Inhalt springen",
		emptyCatalog: "Zurzeit sind keine Tools verfügbar.",
		toolCount: (n) => `${n} ${n === 1 ? "Werkzeug" : "Werkzeuge"}`,
		guideHeading: "Ratgeber",
		guideUseCases: "Typische Anwendungsfälle",
		guideSteps: "So gehen Sie vor",
		guidePrivacy: "Was mit Ihren Daten passiert",
		guideFaq: "Häufige Fragen",
		relatedHeading: "Passt dazu",
		breadcrumbAll: "Alle Tools",
		footerBlurb: "Digitale Werkzeuge direkt im Browser — ohne Installation, vieles davon kostenlos und ohne Anmeldung.",
		footerGroupBrand: "Tracht Digital",
		footerGroupLegal: "Rechtliches",
		footerGroupServices: "Leistungen",
		footerHome: "Startseite",
		footerBlog: "Blog",
		footerPortal: "Kundenportal",
		footerContact: "Kontakt",
		footerImprint: "Impressum",
		footerPrivacy: "Datenschutz",
		footerAdConsent: "Werbe-Einwilligung ändern",
		footerTagline: "Digitalisierung für Unternehmen",
		/**
		* The site's one piece of marketing copy, and it stays one sentence.
		* No free consultation is offered on any web property (the classifieds
		* ads do that, the website deliberately does not), and no customer is
		* ever named. `marketing.test.ts` pins both.
		*/
		serviceNote: "Diese Werkzeuge lösen kleine Aufgaben. Wenn bei Ihnen ein ganzer Ablauf hakt, baue ich Websites, Webshops und individuelle Lösungen für kleine Betriebe.",
		serviceNoteCta: "Unverbindlich anfragen",
		languageSwitch: "Sprache",
		languageOther: "English",
		premiumHeading: "Freischaltbare Werkzeuge",
		premiumBody: "Die meisten Werkzeuge hier sind frei nutzbar. Ein paar aufwendigere schaltet man einmalig frei — danach laufen sie genauso im Browser wie alle anderen: ohne Upload, ohne Abo, ohne Konto beim Anbieter der Datei.",
		premiumLead: "Einmalig freischalten:"
	},
	en: {
		tagline: "Digital tools for business, much of it free",
		description: "Tools straight in your browser: QR codes, passwords, JSON, PDF and text recognition — much of it free, no sign-up. By TDS in Schwarzenbek near Hamburg.",
		heroEyebrow: "Digitalisation for businesses",
		heroHeadlineLead: "Digital",
		heroHeadlineAccent: "tools",
		heroHeadlineTail: "— right in your browser.",
		heroBody: "QR codes, passwords, JSON, PDF tools and text recognition. Much of it free and without sign-up, all of it without installing anything. By Tracht Digital Solutions in Schwarzenbek near Hamburg.",
		navAllTools: "All tools",
		navBlog: "Blog",
		navHome: "Main site",
		navMenu: "Menu",
		toBlog: "To the blog",
		toHome: "To the main site",
		cta: "Get in touch",
		skipToContent: "Skip to content",
		emptyCatalog: "No tools are available at the moment.",
		toolCount: (n) => `${n} ${n === 1 ? "tool" : "tools"}`,
		guideHeading: "Guide",
		guideUseCases: "Typical use cases",
		guideSteps: "How to use it",
		guidePrivacy: "What happens to your data",
		guideFaq: "Frequently asked questions",
		relatedHeading: "Related tools",
		breadcrumbAll: "All tools",
		footerBlurb: "Digital tools right in your browser — nothing to install, much of it free and without a sign-up.",
		footerGroupBrand: "Tracht Digital",
		footerGroupLegal: "Legal",
		footerGroupServices: "Services",
		footerHome: "Main site",
		footerBlog: "Blog",
		footerPortal: "Customer portal",
		footerContact: "Contact",
		footerImprint: "Imprint",
		footerPrivacy: "Privacy",
		footerAdConsent: "Change ad consent",
		footerTagline: "Digitalisation for businesses",
		serviceNote: "These tools solve small jobs. When a whole process is the problem, I build websites, online shops and custom solutions for small businesses.",
		serviceNoteCta: "Get in touch",
		languageSwitch: "Language",
		languageOther: "Deutsch",
		premiumHeading: "Tools you unlock",
		premiumBody: "Most tools here are free to use. A few of the heavier ones are unlocked once — after that they run in your browser exactly like the rest: no upload, no subscription, no account with whoever made the file.",
		premiumLead: "Unlock once:"
	}
};
/** The string table for a language. */
function t(lang) {
	return copy[lang];
}
/** Category section headings. */
var categoryLabels$1 = {
	de: {
		content: "Inhalte",
		developer: "Entwickler",
		design: "Design",
		marketing: "Marketing",
		media: "Medien",
		security: "Sicherheit",
		business: "Business",
		compliance: "Recht & Pflichten",
		other: "Weitere"
	},
	en: {
		content: "Content",
		developer: "Developer",
		design: "Design",
		marketing: "Marketing",
		media: "Media",
		security: "Security",
		business: "Business",
		compliance: "Compliance",
		other: "Other"
	}
};
var toolCopyEn = {
	"qr-code-generator": {
		name: "QR Code Generator",
		description: "Free QR code generator for URLs, text, Wi-Fi access and vCards. PNG and SVG download, everything local in your browser — no sign-up needed.",
		seoTitle: "QR Code Generator — free, no sign-up"
	},
	"passwort-generator": {
		name: "Password Generator",
		description: "Free password generator: secure random passwords with adjustable length and character sets. Runs entirely in your browser, nothing is transmitted.",
		seoTitle: "Password Generator — create secure passwords"
	},
	"utm-link-generator": {
		name: "UTM Link Builder",
		description: "Free UTM builder: create trackable marketing links with utm_source, utm_medium and utm_campaign. Built right in your browser, no sign-up.",
		seoTitle: "UTM Link Builder — campaign links with tracking"
	},
	"json-formatter": {
		name: "JSON Formatter & Validator",
		description: "Free JSON formatter: indent, validate and minify with precise error positions. Runs completely in your browser — your data is never uploaded.",
		seoTitle: "JSON Formatter & Validator — online, free"
	},
	"kontrast-checker": {
		name: "Colour Contrast Checker (WCAG)",
		description: "Free WCAG contrast checker: test the ratio between text and background against AA and AAA. For accessible, readable websites.",
		seoTitle: "Colour Contrast Checker (WCAG) — test accessibility"
	},
	"bild-komprimieren": {
		name: "Compress Image",
		description: "Free image compressor: shrink and compress JPG, PNG and WebP files with adjustable quality. Runs in your browser, nothing is uploaded.",
		seoTitle: "Compress Image — online and free"
	},
	"pdf-werkzeuge": {
		name: "PDF Tools",
		description: "PDF tools: merge several PDFs, split out a page range and rotate pages. Straight in your browser, with no upload of your documents.",
		seoTitle: "PDF Tools — merge, split, rotate"
	},
	"pdf-komprimieren": {
		name: "Compress PDF",
		description: "Shrink a PDF without an upload: the embedded images are recomputed in your browser while the text is left untouched. For attachments too big to send.",
		seoTitle: "Compress PDF — reduce the file size"
	},
	"pdf-wasserzeichen": {
		name: "PDF Watermark",
		description: "Put a watermark on a PDF: “Draft”, “Confidential” or a wording of your own, with an adjustable angle and opacity. Runs locally in your browser.",
		seoTitle: "Add a PDF watermark — text stamp"
	},
	"bilder-zu-pdf": {
		name: "Images to PDF",
		description: "Turn photographed receipts and scans into one clean PDF: set the order, choose a page size, done. No upload, straight in your browser.",
		seoTitle: "Images to PDF — combine JPG and PNG"
	},
	"pdf-zu-bildern": {
		name: "PDF to Images",
		description: "Convert PDF pages into images: choose the resolution and the format, single pages or all of them. The file never leaves your machine.",
		seoTitle: "PDF to Images — pages as PNG or JPG"
	},
	"etiketten-drucken": {
		name: "Print Labels",
		description: "Make your own label sheet: pick the grid, paste the addresses, print the PDF. Fits the common sheets and needs no installation at all.",
		seoTitle: "Print labels — address stickers as a PDF"
	},
	stundenzettel: {
		name: "Timesheet",
		description: "Create a monthly timesheet as a PDF: enter the hours, deduct the breaks, the totals are worked out. Ready to print and sign.",
		seoTitle: "Create a timesheet — record of working time"
	},
	texterkennung: {
		name: "Text Recognition (OCR)",
		description: "No more retyping: text recognition for photos and scanned images, German and English. It runs on your device and the picture stays there.",
		seoTitle: "Text recognition (OCR) — read text from an image"
	},
	"impressum-generator": {
		name: "German Imprint Generator",
		description: "Build a sample imprint under section 5 DDG: legal form, register, VAT ID and supervisory body appear as you tick them. Runs in your browser.",
		seoTitle: "Imprint generator — a sample under § 5 DDG"
	},
	"datenschutzerklaerung-generator": {
		name: "Privacy Policy Generator (GDPR)",
		description: "Assemble a sample GDPR privacy policy from blocks: hosting, contact form, cookies, analytics and newsletter. Nothing is uploaded anywhere.",
		seoTitle: "Privacy policy generator — a GDPR sample"
	},
	"barrierefreiheitserklaerung-generator": {
		name: "Accessibility Statement Generator",
		description: "Write an accessibility statement for the German BFSG or for BITV 2.0: compliance status, feedback route and enforcement, as a sample.",
		seoTitle: "Accessibility statement — BFSG and BITV 2.0"
	},
	"ki-kennzeichnung-bilder": {
		name: "AI Image Labelling",
		description: "Label AI images as required: burn a visible badge into the picture and embed a machine-readable note in the PNG or JPEG. All in your browser.",
		seoTitle: "Label AI images — badge and metadata"
	}
};
/**
* The name / description / SEO title a tool page should render.
*
* German comes from the manifest (the pack owns it); English comes from the
* table above, falling back to the German manifest text so a new tool renders
* a complete page from the day it composes.
*/
function toolCopyFor(lang, tool, siteName) {
	if (lang === "de") return {
		name: tool.name,
		description: tool.seo?.description ?? tool.description,
		seoTitle: tool.seo?.title ?? `${tool.name} — ${siteName}`
	};
	const en = toolCopyEn[tool.slug];
	if (en) return en;
	return {
		name: tool.name,
		description: tool.seo?.description ?? tool.description,
		seoTitle: tool.seo?.title ?? `${tool.name} — ${siteName}`
	};
}
//#endregion
//#region src/lib/site.ts
/** Site-wide constants + copy. Keep the NAP in sync with the Impressum + seo.ts
*  of the other TDS properties (SEO convention).
*
*  The German copy is DERIVED from `lib/i18n` rather than restated here: the
*  site publishes two languages now, and a second copy of the German strings
*  is how the two would drift. This module keeps the language-independent
*  identity (name, origin) and re-exports the German defaults that predate the
*  English tree, so nothing that already imported them had to change. */
var site = {
	/**
	* The site's name, as it is written everywhere it is written OUT — the SEO
	* title suffix, the OG eyebrow, the header's accessible name, the 404.
	*
	* "TD Tools", not "TDS Tools": the header and footer set only "Tools" in
	* type and let `.brand-logo` carry the "TD", the same construction the
	* journal uses. The rendered mark and the written name have to agree, or
	* the site is called one thing on the page and another in every search
	* result and share card.
	*/
	name: "TD Tools",
	origin: "https://tools.tracht-digital.de",
	tagline: copy.de.tagline,
	/**
	* Site-level meta description. Google renders roughly the first 155–160
	* characters and truncates the rest — `site.test.ts` fails the build past
	* that bound.
	*
	* This was 201 characters until 2026-08-16, so everything from "Von Tracht
	* Digital Solutions, 21493 Schwarzenbek bei Hamburg" onward was cut in the
	* SERP: the site lost its brand AND its local signal while keeping the
	* generic half. Exactly the defect the landingpage's seo.ts fixed in
	* 2026-07-29, repeated here because nothing measured it.
	*
	* Order is deliberate: the concrete tool names come first (this site ranks
	* on tool queries), and the brand + town ride in the tail where they still
	* fit inside the cut.
	*/
	description: copy.de.description
};
/**
* The sibling TDS properties this site links to.
*
* Declared once here rather than inline in the header/footer markup: the blog
* links back to this site from its own `nav.ts` (`TOOLS_URL`), and the two
* link sets are each other's counterpart — a public property that only ever
* gets linked TO is a dead end for a reader and an orphan for a crawler.
*
* Absolute URLs on purpose. These are separate hosts (`tracht-digital.de`,
* `blog.tracht-digital.de`), so a site-relative path would resolve against
* `tools.tracht-digital.de` and 404 into this site's own SPA-less 404 page.
*/
var links = {
	main: "https://tracht-digital.de",
	blog: "https://blog.tracht-digital.de",
	contact: "https://tracht-digital.de/#contact",
	portal: "https://app.tracht-digital.de",
	impressum: "https://tracht-digital.de/legal/impressum",
	datenschutz: "https://tracht-digital.de/legal/datenschutz"
};
categoryLabels$1.de;
/** Stable display order of the category sections in the catalog. */
var categoryOrder = [
	"marketing",
	"security",
	"developer",
	"design",
	"media",
	"content",
	"business",
	"compliance",
	"other"
];
//#endregion
//#region src/lib/seo.ts
/**
* SEO identity for the public tools site.
*
* This is the *who*, not the *what*: name, legal entity, NAP, coordinates,
* service area and topical focus. The copy (tagline, descriptions, category
* labels, sibling links) stays in `~/lib/site`; the JSON-LD renderers in
* `~/lib/jsonld` read from here.
*
* **Every value is a verbatim copy of `tds-landingpage-frontend/src/lib/seo.ts`.**
* That is the point: a local-business signal is only worth anything when the
* name, address and phone are byte-identical everywhere they appear (the
* Impressum, the landingpage's schema, the blog's, and this site's). A
* paraphrased street or a differently formatted phone number reads as a
* *different* business to a search engine, which is worse than emitting
* nothing at all. `seo.test.ts` compares the two files so a change on one side
* fails this build.
*
* What deliberately does NOT come along: `description` (this site describes
* tools, not services — see `site.description`), `pricing`, and the founder's
* `jobTitle` framing that only makes sense on the marketing site.
*/
var seoConfig = {
	/** Brand name as it should appear in search results. */
	name: "Tracht Digital Solutions",
	shortName: "TDS",
	/** This property's origin. Mirrors `astro.config.mjs#site` and `site.origin`. */
	url: "https://tools.tracht-digital.de",
	/** The main site — the entity all three properties belong to. */
	mainUrl: "https://tracht-digital.de",
	/** Sister origin where the journal lives. */
	blogUrl: "https://blog.tracht-digital.de",
	/** Verified contact channel. Safe to publish in schema. */
	email: "kontakt@tracht-digital.de",
	/** Verified phone (WhatsApp). E.164-friendly formatting for schema. */
	telephone: "+49 178 8224022",
	/** Legal entity behind the brand. */
	legalName: "Julian Tracht",
	/** USt-IdNr. gemäß § 27a UStG — verified, matches the Impressum. */
	vatID: "DE450639725",
	founder: {
		name: "Julian Tracht",
		jobTitle: "Inhaber & Entwickler"
	},
	/** Verified business address (matches the Impressum). */
	address: {
		streetAddress: "Elbinger Straße 19",
		postalCode: "21493",
		addressLocality: "Schwarzenbek",
		addressRegion: "Schleswig-Holstein",
		addressCountry: "DE"
	},
	/** Approximate coordinates of the business address. */
	geo: {
		latitude: 53.504,
		longitude: 10.48
	},
	/** Service area for the ProfessionalService node. */
	areaServed: [
		"Hamburg",
		"Schwarzenbek",
		"Norddeutschland",
		"Deutschland"
	],
	/** Topics for schema `knowsAbout` — the keyword set the brand targets. */
	knowsAbout: [
		"Digitalisierung für Unternehmen",
		"Prozessautomatisierung",
		"Webentwicklung",
		"Webshop",
		"Onlineshop für lokale Geschäfte",
		"Individualsoftware",
		"App-Entwicklung",
		"IT-Beratung"
	],
	/** Public social URLs — surface in JSON-LD `sameAs`. */
	socials: {
		linkedin: "https://www.linkedin.com/in/julian-tracht/",
		github: "https://github.com/Tracht-Digital-Solutions"
	},
	/**
	* Default OG card, generated at build time by `src/pages/og/default.png.ts`.
	*
	* It used to be `/og-default.png`, a path that existed in NO repo — not in
	* `public/`, not in the built `dist/`. So every share of this site on
	* LinkedIn, WhatsApp or X rendered with a blank card from the day the site
	* launched, and nothing anywhere reported it: the tag is well-formed, the
	* build is green, and the only symptom lives in someone else's preview
	* pane. `seo.test.ts` now pins the path against the route that emits it.
	*/
	defaultOgImage: "/og/default.png"
};
/**
* hreflang/OG locale pairs. `x-default` points at the German page: the
* audience is local businesses in Northern Germany, so German is the
* best guess for a visitor whose language we do not know.
*/
var ogLocale = {
	de: "de_DE",
	en: "en_GB"
};
/**
* The EN counterpart of a German path (and back). The site mounts English
* under `/en/…` with the SAME slugs, so an hreflang pair is a pure prefix
* operation and the two URLs always point at each other.
*/
function neutralPath(pathname) {
	return pathname.replace(/^\/en(?=\/|$)/, "") || "/";
}
function localizedPath(pathname, lang) {
	const neutral = neutralPath(pathname);
	if (lang === "de") return neutral;
	return neutral === "/" ? "/en/" : `/en${neutral}`;
}
//#endregion
//#region \0virtual:tools-catalog
var catalog = {
	"order": [
		"qr",
		"text",
		"dev",
		"media",
		"pdf",
		"office",
		"legal"
	],
	"tools": [
		{
			"id": "etiketten-drucken",
			"slug": "etiketten-drucken",
			"name": "Etiketten drucken",
			"category": "business",
			"description": "Adressaufkleber und Etiketten als druckfertiges PDF: gängige Bogenraster, eine Zeile je Etikett, wahlweise dieselbe Angabe auf allen Feldern.",
			"icon": "tags",
			"keywords": [
				"etiketten",
				"aufkleber",
				"adressen",
				"avery",
				"herma",
				"drucken"
			],
			"component": "@tracht-digital-solutions/tds-tool-office/tools/LabelSheet.astro",
			"premiumDefault": true,
			"priceCentsDefault": 500,
			"seo": {
				"title": "Etiketten drucken — Adressaufkleber als PDF",
				"description": "Etikettenbogen selbst erzeugen: Raster wählen, Adressen einfügen, PDF drucken. Passt auf gängige Bogen und läuft ohne Installation im Browser."
			}
		},
		{
			"id": "stundenzettel",
			"slug": "stundenzettel",
			"name": "Stundenzettel",
			"category": "business",
			"description": "Arbeitszeitnachweis für einen Monat als PDF: Tage, Kommen und Gehen, Pause, Tages- und Monatssumme, Feld für beide Unterschriften.",
			"icon": "clock",
			"keywords": [
				"stundenzettel",
				"arbeitszeit",
				"nachweis",
				"zeiterfassung",
				"monat"
			],
			"component": "@tracht-digital-solutions/tds-tool-office/tools/Timesheet.astro",
			"premiumDefault": true,
			"priceCentsDefault": 500,
			"seo": {
				"title": "Stundenzettel erstellen — Arbeitszeitnachweis",
				"description": "Monatlichen Stundenzettel als PDF erstellen: Zeiten eintragen, Pausen abziehen, Summen werden gerechnet. Zum Ausdrucken und Unterschreiben."
			}
		},
		{
			"id": "accessibility-statement-generator",
			"slug": "barrierefreiheitserklaerung-generator",
			"name": "Barrierefreiheitserklärung-Generator",
			"category": "compliance",
			"description": "Erzeugen Sie eine Muster-Barrierefreiheitserklärung — wahlweise nach dem BFSG für Unternehmen oder nach BITV 2.0 für öffentliche Stellen.",
			"icon": "accessibility",
			"keywords": [
				"barrierefreiheit",
				"bfsg",
				"bitv",
				"erklärung",
				"wcag"
			],
			"component": "@tracht-digital-solutions/tds-tool-legal/tools/AccessibilityStatementGenerator.astro",
			"seo": {
				"title": "Barrierefreiheitserklärung erstellen — BFSG",
				"description": "Barrierefreiheitserklärung für BFSG oder BITV 2.0: Stand der Vereinbarkeit, Rückmeldeweg und Durchsetzungsverfahren als Muster, lokal im Browser."
			}
		},
		{
			"id": "privacy-policy-generator",
			"slug": "datenschutzerklaerung-generator",
			"name": "Datenschutzerklärung-Generator",
			"category": "compliance",
			"description": "Setzen Sie eine Muster-Datenschutzerklärung nach DSGVO aus Bausteinen zusammen: Hosting, Kontaktformular, Cookies, Analyse und Newsletter.",
			"icon": "shield-check",
			"keywords": [
				"datenschutzerklärung",
				"dsgvo",
				"privacy",
				"muster",
				"generator"
			],
			"component": "@tracht-digital-solutions/tds-tool-legal/tools/PrivacyPolicyGenerator.astro",
			"seo": {
				"title": "Datenschutzerklärung erstellen — DSGVO-Muster",
				"description": "Datenschutzerklärung nach DSGVO als Muster erzeugen: Abschnitte für Hosting, Cookies, Webanalyse und Newsletter zuschalten. Alles lokal im Browser."
			}
		},
		{
			"id": "imprint-generator",
			"slug": "impressum-generator",
			"name": "Impressum-Generator",
			"category": "compliance",
			"description": "Stellen Sie ein Muster-Impressum nach § 5 DDG zusammen: Rechtsform, Register, USt-IdNr. und Aufsichtsbehörde je nach Ankreuzung.",
			"icon": "scroll-text",
			"keywords": [
				"impressum",
				"ddg",
				"anbieterkennzeichnung",
				"muster",
				"generator"
			],
			"component": "@tracht-digital-solutions/tds-tool-legal/tools/ImprintGenerator.astro",
			"seo": {
				"title": "Impressum-Generator — Muster nach § 5 DDG",
				"description": "Impressum-Generator für kleine Betriebe: Muster nach § 5 DDG und § 18 MStV, per Ankreuzung zusammengestellt. Ohne Anmeldung, direkt im Browser."
			}
		},
		{
			"id": "ai-image-badge",
			"slug": "ki-kennzeichnung-bilder",
			"name": "KI-Kennzeichnung für Bilder",
			"category": "compliance",
			"description": "Versehen Sie KI-Bilder mit einem sichtbaren Hinweis und einer maschinenlesbaren Notiz — Text, Ecke und Größe frei wählbar, ganz ohne Upload.",
			"icon": "sparkles",
			"keywords": [
				"ki",
				"kennzeichnung",
				"ai act",
				"badge",
				"wasserzeichen"
			],
			"component": "@tracht-digital-solutions/tds-tool-legal/tools/AiImageBadge.astro",
			"seo": {
				"title": "KI-Bilder kennzeichnen — Badge und Metadaten",
				"description": "Bilder als KI-erzeugt kennzeichnen: sichtbares Badge einbrennen und einen Hinweis in PNG oder JPEG einbetten. Läuft vollständig in Ihrem Browser."
			}
		},
		{
			"id": "texterkennung",
			"slug": "texterkennung",
			"name": "Texterkennung (OCR)",
			"category": "content",
			"description": "Text aus Fotos, Screenshots und eingescannten Bildern herauslesen, auf Deutsch oder Englisch — zum Kopieren und Weiterverarbeiten.",
			"icon": "scan-text",
			"keywords": [
				"ocr",
				"texterkennung",
				"scan",
				"foto",
				"abtippen",
				"erkennen"
			],
			"component": "@tracht-digital-solutions/tds-tool-office/tools/TextRecognition.astro",
			"premiumDefault": true,
			"priceCentsDefault": 500,
			"seo": {
				"title": "Texterkennung (OCR) — Text aus Bild auslesen",
				"description": "Abgetippt wird nichts mehr: Texterkennung für Fotos und Bildscans, deutsch und englisch. Die Erkennung läuft auf Ihrem Gerät, das Bild bleibt dort."
			}
		},
		{
			"id": "contrast-checker",
			"slug": "kontrast-checker",
			"name": "Farb-Kontrast-Checker (WCAG)",
			"category": "design",
			"description": "Prüfe das Kontrastverhältnis zwischen Text- und Hintergrundfarbe gegen die WCAG-AA/AAA-Kriterien für barrierefreie Websites.",
			"icon": "contrast",
			"keywords": [
				"kontrast",
				"wcag",
				"barrierefrei",
				"accessibility",
				"farbe"
			],
			"component": "@tracht-digital-solutions/tds-tool-devkit/tools/ContrastChecker.astro",
			"seo": {
				"title": "Farb-Kontrast-Checker (WCAG) — Barrierefreiheit prüfen",
				"description": "Kostenloser WCAG-Kontrast-Checker: prüft das Kontrastverhältnis von Text und Hintergrund gegen AA/AAA. Für barrierefreie Websites."
			}
		},
		{
			"id": "json-formatter",
			"slug": "json-formatter",
			"name": "JSON-Formatter & -Validator",
			"category": "developer",
			"description": "Formatiere, validiere und minimiere JSON. Zeigt Syntaxfehler mit Position an — alles lokal im Browser.",
			"icon": "braces",
			"keywords": [
				"json",
				"formatter",
				"validator",
				"beautify",
				"minify"
			],
			"component": "@tracht-digital-solutions/tds-tool-devkit/tools/JsonFormatter.astro",
			"seo": {
				"title": "JSON-Formatter & -Validator — online, kostenlos",
				"description": "Kostenloser JSON-Formatter: einrücken, validieren und minimieren mit Fehleranzeige. Läuft komplett im Browser, keine Anmeldung."
			}
		},
		{
			"id": "qr-code",
			"slug": "qr-code-generator",
			"name": "QR-Code-Generator",
			"category": "marketing",
			"description": "Erstelle QR-Codes für URLs, Text, WLAN-Zugänge oder Kontaktdaten — direkt im Browser, mit PNG- und SVG-Export.",
			"icon": "qr-code",
			"keywords": [
				"qr",
				"qr-code",
				"generator",
				"wlan",
				"vcard",
				"url"
			],
			"component": "@tracht-digital-solutions/tds-tool-qr/tools/QrCode.astro",
			"seo": {
				"title": "QR-Code-Generator — kostenlos, ohne Anmeldung",
				"description": "Kostenloser QR-Code-Generator für URL, Text, WLAN und vCard. PNG- und SVG-Download, alles lokal im Browser — keine Anmeldung nötig.",
				"jsonLdType": "WebApplication"
			}
		},
		{
			"id": "utm-builder",
			"slug": "utm-link-generator",
			"name": "UTM-Link-Generator",
			"category": "marketing",
			"description": "Baue nachverfolgbare Kampagnen-Links mit UTM-Parametern für Google Analytics & Co. — inklusive Slug-Vorschau und Kopierfunktion.",
			"icon": "link",
			"keywords": [
				"utm",
				"kampagne",
				"tracking",
				"analytics",
				"link",
				"slug"
			],
			"component": "@tracht-digital-solutions/tds-tool-textkit/tools/UtmBuilder.astro",
			"seo": {
				"title": "UTM-Link-Generator — Kampagnen-Links mit Tracking",
				"description": "Kostenloser UTM-Builder: erstelle nachverfolgbare Marketing-Links mit utm_source, utm_medium und utm_campaign. Direkt im Browser."
			}
		},
		{
			"id": "image-compress",
			"slug": "bild-komprimieren",
			"name": "Bild komprimieren",
			"category": "media",
			"description": "Verkleinere und komprimiere Bilder (JPG/PNG/WebP) direkt im Browser — mit einstellbarer Qualität und Zielbreite.",
			"icon": "image",
			"keywords": [
				"bild",
				"komprimieren",
				"resize",
				"verkleinern",
				"webp"
			],
			"component": "@tracht-digital-solutions/tds-tool-media/tools/ImageCompress.astro",
			"seo": {
				"title": "Bild komprimieren — online & kostenlos",
				"description": "Kostenloser Bild-Kompressor: Bilder verkleinern und komprimieren (JPG/PNG/WebP) mit einstellbarer Qualität. Läuft komplett im Browser."
			}
		},
		{
			"id": "bilder-zu-pdf",
			"slug": "bilder-zu-pdf",
			"name": "Bilder zu PDF",
			"category": "media",
			"description": "Mehrere Fotos oder Scans in ein einziges PDF zusammenfassen — mit Seitenformat, Ausrichtung, Rand und frei sortierbarer Reihenfolge.",
			"icon": "images",
			"keywords": [
				"bilder",
				"pdf",
				"scan",
				"jpg",
				"png",
				"zusammenfassen"
			],
			"component": "@tracht-digital-solutions/tds-tool-pdf/tools/ImagesToPdf.astro",
			"premiumDefault": true,
			"priceCentsDefault": 500,
			"seo": {
				"title": "Bilder zu PDF zusammenfügen — JPG und PNG",
				"description": "Aus abfotografierten Belegen und Scans ein sauberes PDF machen: Reihenfolge festlegen, Seitenformat wählen, fertig. Ohne Upload, direkt im Browser."
			}
		},
		{
			"id": "pdf-komprimieren",
			"slug": "pdf-komprimieren",
			"name": "PDF komprimieren",
			"category": "media",
			"description": "PDF-Dateien verkleinern, indem eingebettete Bilder neu berechnet werden. Seitenaufbau und Text bleiben erhalten, die Datei bleibt versandfähig.",
			"icon": "shrink",
			"keywords": [
				"pdf",
				"komprimieren",
				"verkleinern",
				"dateigröße",
				"optimieren"
			],
			"component": "@tracht-digital-solutions/tds-tool-pdf/tools/PdfCompress.astro",
			"premiumDefault": true,
			"priceCentsDefault": 500,
			"seo": {
				"title": "PDF komprimieren — Dateigröße verkleinern",
				"description": "PDF verkleinern ohne Upload: eingebettete Bilder werden im Browser neu berechnet, der Text bleibt unangetastet. Für Anhänge, die zu groß zum Versenden sind."
			}
		},
		{
			"id": "pdf-zu-bildern",
			"slug": "pdf-zu-bildern",
			"name": "PDF zu Bildern",
			"category": "media",
			"description": "Einzelne PDF-Seiten als PNG oder JPG herausrechnen, in wählbarer Auflösung — für Präsentationen, Vorschaubilder oder den Druck einer Seite.",
			"icon": "file-image",
			"keywords": [
				"pdf",
				"bild",
				"png",
				"jpg",
				"seite",
				"exportieren",
				"umwandeln"
			],
			"component": "@tracht-digital-solutions/tds-tool-pdf/tools/PdfToImages.astro",
			"premiumDefault": true,
			"priceCentsDefault": 500,
			"seo": {
				"title": "PDF zu Bildern — Seiten als PNG oder JPG",
				"description": "PDF-Seiten in Bilder umwandeln: Auflösung und Format wählen, einzelne Seiten oder alle. Die Datei verlässt dabei zu keinem Zeitpunkt Ihren Rechner."
			}
		},
		{
			"id": "pdf-wasserzeichen",
			"slug": "pdf-wasserzeichen",
			"name": "PDF-Wasserzeichen",
			"category": "media",
			"description": "Wasserzeichen und Stempel in ein PDF setzen: eigener Text oder ein Bild, frei in Größe, Winkel, Deckkraft, Farbe und Seitenauswahl.",
			"icon": "stamp",
			"keywords": [
				"pdf",
				"wasserzeichen",
				"stempel",
				"entwurf",
				"vertraulich",
				"kopie"
			],
			"component": "@tracht-digital-solutions/tds-tool-pdf/tools/PdfWatermark.astro",
			"premiumDefault": true,
			"priceCentsDefault": 500,
			"seo": {
				"title": "PDF-Wasserzeichen einfügen — Text oder Bild",
				"description": "Wasserzeichen ins PDF setzen: „Entwurf“, „Vertraulich“ oder das eigene Logo, mit einstellbarem Winkel und einstellbarer Deckkraft. Läuft lokal im Browser."
			}
		},
		{
			"id": "pdf-tools",
			"slug": "pdf-werkzeuge",
			"name": "PDF-Werkzeuge",
			"category": "media",
			"description": "PDFs zusammenführen, aufteilen und Seiten drehen — schnell und lokal im Browser, ohne Upload.",
			"icon": "file-text",
			"keywords": [
				"pdf",
				"merge",
				"split",
				"zusammenführen",
				"teilen",
				"drehen"
			],
			"component": "@tracht-digital-solutions/tds-tool-media/tools/PdfTools.astro",
			"premiumDefault": true,
			"priceCentsDefault": 500,
			"seo": {
				"title": "PDF-Werkzeuge — zusammenführen, teilen, drehen",
				"description": "PDF-Werkzeuge: mehrere PDFs zusammenführen, aufteilen und Seiten drehen. Direkt im Browser, kein Upload."
			}
		},
		{
			"id": "password-generator",
			"slug": "passwort-generator",
			"name": "Passwort-Generator",
			"category": "security",
			"description": "Erzeuge sichere, zufällige Passwörter mit einstellbarer Länge und Zeichenauswahl — lokal im Browser, nichts verlässt dein Gerät.",
			"icon": "key",
			"keywords": [
				"passwort",
				"password",
				"generator",
				"sicherheit",
				"zufällig"
			],
			"component": "@tracht-digital-solutions/tds-tool-textkit/tools/PasswordGenerator.astro",
			"seo": {
				"title": "Passwort-Generator — sichere Passwörter erstellen",
				"description": "Kostenloser Passwort-Generator: sichere Zufallspasswörter mit einstellbarer Länge und Zeichenauswahl. Läuft komplett lokal im Browser."
			}
		}
	],
	"i18n": {
		"de": {
			"qr.title": "QR-Code-Generator",
			"text.password": "Passwort-Generator",
			"text.utm": "UTM-Link-Generator",
			"dev.json": "JSON-Formatter",
			"dev.contrast": "Kontrast-Checker",
			"media.image": "Bild komprimieren",
			"media.pdf": "PDF-Werkzeuge",
			"pdf.compress": "PDF komprimieren",
			"pdf.watermark": "PDF-Wasserzeichen",
			"pdf.imagesToPdf": "Bilder zu PDF",
			"pdf.pdfToImages": "PDF zu Bildern",
			"office.labels": "Etiketten drucken",
			"office.timesheet": "Stundenzettel",
			"office.ocr": "Texterkennung (OCR)",
			"legal.imprint": "Impressum-Generator",
			"legal.privacy": "Datenschutzerklärung-Generator",
			"legal.accessibility": "Barrierefreiheitserklärung-Generator",
			"legal.ai-badge": "KI-Kennzeichnung für Bilder"
		},
		"en": {
			"qr.title": "QR Code Generator",
			"text.password": "Password Generator",
			"text.utm": "UTM Link Builder",
			"dev.json": "JSON Formatter",
			"dev.contrast": "Contrast Checker",
			"media.image": "Compress Image",
			"media.pdf": "PDF Tools",
			"pdf.compress": "Compress PDF",
			"pdf.watermark": "PDF Watermark",
			"pdf.imagesToPdf": "Images to PDF",
			"pdf.pdfToImages": "PDF to Images",
			"office.labels": "Print Labels",
			"office.timesheet": "Timesheet",
			"office.ocr": "Text Recognition (OCR)",
			"legal.imprint": "Imprint Generator",
			"legal.privacy": "Privacy Policy Generator",
			"legal.accessibility": "Accessibility Statement Generator",
			"legal.ai-badge": "AI Image Labelling"
		}
	}
};
//#endregion
//#region src/lib/catalog.ts
var ADS_OFF = {
	enabled: false,
	publisherId: "",
	slotCatalog: "",
	slotTool: ""
};
var DEMO_MODE = Object.assign({
	"ASSETS_PREFIX": void 0,
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"PUBLIC_DEMO_MODE": "false",
	"SITE": "https://tools.tracht-digital.de",
	"SSR": true
}, {
	CI: "true",
	_: "/opt/hostedtoolcache/node/22.23.2/x64/bin/npm"
}).PUBLIC_DEMO_MODE === "true";
function resolve(tool, row) {
	return {
		...tool,
		enabled: row?.enabled ?? true,
		requiresLogin: row?.requires_login ?? tool.requiresLoginDefault ?? false,
		isPremium: row?.is_premium ?? tool.premiumDefault ?? false,
		priceCents: row?.price_cents ?? tool.priceCentsDefault ?? 0
	};
}
function fallback() {
	return {
		tools: catalog.tools.map((t) => resolve(t, void 0)),
		ads: ADS_OFF
	};
}
async function load() {
	if (DEMO_MODE) return fallback();
	try {
		const url = `${apiBase()}/tools/catalog`;
		const res = await fetch(url, {
			headers: siteKeyHeaders(),
			signal: AbortSignal.timeout(1e4)
		});
		assertKeyAccepted(res, url);
		if (!res.ok) return fallback();
		const data = await res.json();
		const byId = new Map((data.tools ?? []).map((r) => [r.id, r]));
		const tools = catalog.tools.map((t) => resolve(t, byId.get(t.id)));
		const a = data.ads;
		return {
			tools,
			ads: a && a.enabled === true && typeof a.publisherId === "string" && a.publisherId ? {
				enabled: true,
				publisherId: a.publisherId,
				slotCatalog: typeof a.slotCatalog === "string" ? a.slotCatalog : "",
				slotTool: typeof a.slotTool === "string" ? a.slotTool : ""
			} : ADS_OFF
		};
	} catch (err) {
		console.warn("[tds-tools] catalog API unreachable — using manifest defaults, ads off:", err);
		return fallback();
	}
}
function toolsData() {
	return contentCache.get("tools:catalog", load);
}
async function enabledTools() {
	return (await toolsData()).tools.filter((t) => t.enabled);
}
async function adsConfig() {
	return (await toolsData()).ads;
}
//#endregion
export { ogLocale as a, links as c, t as d, toolCopyFor as f, neutralPath as i, site as l, enabledTools as n, seoConfig as o, localizedPath as r, categoryOrder as s, adsConfig as t, categoryLabels$1 as u };
