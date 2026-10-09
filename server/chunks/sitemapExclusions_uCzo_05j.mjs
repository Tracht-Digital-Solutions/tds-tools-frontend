import { t as apiBase } from "./connection_C3l7lc1a.mjs";
import { a as readContentJson, i as memoisedOr } from "./catalog_CIi8pJsG.mjs";
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
		catalogHeading: "Alle Werkzeuge",
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
		toHome: "To the home page",
		cta: "Get in touch",
		skipToContent: "Skip to content",
		emptyCatalog: "No tools are available at the moment.",
		catalogHeading: "All tools",
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
	},
	"visitenkarten-designer": {
		name: "Business Card Designer",
		description: "Design a business card in the browser: accent colour, surface, corners, shadow and layout, with a live preview. PNG download at 85 × 55 mm, 300 dpi.",
		seoTitle: "Business Card Designer — design and download as PNG"
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
/** German labels for the tool categories (catalog section headings). */
var categoryLabels = categoryLabels$1.de;
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
//#region src/lib/sitemapExclusions.ts
/**
* Paths the panel has taken out of the index.
*
* The sitemap is built from the catalog (see `sitemap.ts`); this is the
* subtraction on top of it, maintained in the API because most of what an
* operator wants to hide has no row to hang a flag on. A disabled tool already
* disappears through `enabled`; this covers everything else, including whole
* subtrees via a trailing `*`.
*
* ### An exclusion takes the whole language group
*
* Both trees carry the same slugs here, so `/tools/x` and `/en/tools/x` are one
* page in two languages, and the sitemap emits reciprocal `hreflang` links for
* every URL. Dropping one side and keeping the other leaves an alternate
* pointing at a URL that is no longer offered — and one dangling alternate
* invalidates the entire set, the German side included. So a pattern matching
* either member excludes both. `isExcluded()` is what enforces that; nothing
* should compare a single path against the patterns directly.
*
* ### Fail-soft, in the safe direction
*
* Every failure answers "nothing excluded". The opposite default would empty
* the sitemap on an API hiccup, and since the API's own route is fail-soft too,
* neither end would go red.
*/
/** This site's id in the panel's site registry. */
var SITE_ID = "tools";
/** Trailing slash folded away, root kept — `trailingSlash: "ignore"` in the Astro config. */
function canonical(path) {
	const value = path.trim();
	if (value === "" || value === "/") return "/";
	return value.replace(/\/+$/, "") || "/";
}
/**
* One pattern against one path.
*
* Deliberately the same two rules the API validates and documents: an exact
* path, or a trailing `*` making it a raw prefix. Kept dumb on purpose — a
* glob library here would accept patterns the API rejects, and the disagreement
* would only ever show up as a page that quietly stayed in the sitemap.
*/
function matchesPattern(path, pattern) {
	const value = pattern.trim();
	if (value === "") return false;
	if (value.endsWith("*")) {
		const prefix = value.slice(0, -1);
		return prefix === "" || canonical(path).startsWith(prefix);
	}
	return canonical(value) === canonical(path);
}
/** Does any pattern hit any member of this hreflang group? */
function groupExcluded(paths, patterns) {
	return paths.some((path) => patterns.some((pattern) => matchesPattern(path, pattern)));
}
/**
* Every URL that shares one page's hreflang group.
*
* A pure prefix operation here, which is the whole reason the English tree was
* built with identical slugs. When `EN_ENABLED` is false there is no English
* tree and the group is the German path alone.
*/
function hreflangGroup(pathname) {
	const neutral = neutralPath(pathname);
	return ["de", "en"].map((lang) => localizedPath(neutral, lang));
}
async function load() {
	const url = new URL(`${apiBase()}/content/sitemap-exclusions`);
	url.searchParams.set("site", SITE_ID);
	const data = await readContentJson(url.toString());
	if (!Array.isArray(data.paths)) return [];
	return data.paths.filter((p) => typeof p === "string" && p.trim() !== "");
}
/**
* The patterns, memoised for the render generation.
*
* Through `contentCache` rather than a module-level promise: the latter would
* live as long as the server under SSR, so an exclusion added in the panel
* would never reach a visitor and nothing would log.
*/
function exclusionPatterns() {
	return memoisedOr("sitemap:exclusions", load, () => [], "sitemap exclusions (nothing excluded)");
}
/** Is this page excluded — counting its English or German twin as the same page? */
async function isExcluded(pathname) {
	const patterns = await exclusionPatterns();
	if (patterns.length === 0) return false;
	return groupExcluded(hreflangGroup(pathname), patterns);
}
//#endregion
export { localizedPath as a, seoConfig as c, links as d, site as f, toolCopyFor as h, isExcluded as i, categoryLabels as l, t as m, groupExcluded as n, neutralPath as o, categoryLabels$1 as p, hreflangGroup as r, ogLocale as s, exclusionPatterns as t, categoryOrder as u };
