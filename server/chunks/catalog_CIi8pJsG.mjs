import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { r as contentCache } from "./cache_CTk_g6Zd.mjs";
import { i as connection, t as apiBase } from "./connection_C3l7lc1a.mjs";
import { a as memoisedOr$1, n as createSiteKeyGuard, t as createContentReader } from "./site_TmeFq_K5.mjs";
//#region \0virtual:tools-catalog
var catalog = {
	"order": [
		"qr",
		"text",
		"dev",
		"media",
		"pdf",
		"office",
		"legal",
		"businesscard"
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
			"id": "businesscard-designer",
			"slug": "visitenkarten-designer",
			"name": "Visitenkarten-Designer",
			"category": "marketing",
			"description": "Gestalte eine Visitenkarte im Browser: Farbe, Ecken, Schatten und Aufteilung ändern und sofort sehen, wie sie aussieht. Download als PNG in Druckauflösung.",
			"icon": "id-card",
			"keywords": [
				"visitenkarte",
				"designer",
				"vorschau",
				"druck",
				"business card",
				"png"
			],
			"component": "@tracht-digital-solutions/tds-tool-businesscard/tools/CardDesigner.astro",
			"seo": {
				"title": "Visitenkarten-Designer — gestalten und als PNG herunterladen",
				"description": "Visitenkarte im Browser gestalten: Farben, Ecken, Schatten und Aufteilung anpassen, Vorschau in Echtzeit, PNG-Download in 300 dpi. Alles lokal, keine Anmeldung.",
				"jsonLdType": "WebApplication"
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
			"legal.ai-badge": "KI-Kennzeichnung für Bilder",
			"businesscard.title": "Visitenkarten-Designer"
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
			"legal.ai-badge": "AI Image Labelling",
			"businesscard.title": "Business Card Designer"
		}
	}
};
//#endregion
//#region src/lib/siteKey.ts
/**
* Request-time protection for paired API reads — tds-shared's guard, bound to
* this site's connection.
*
* The private key is loaded dynamically from the server-side connection file.
* `connection.ts` retains `TDS_SITE_KEY` only as a one-release host fallback;
* builds and GitHub workflows no longer receive it.
*
* Every public site used to keep a byte-identical copy of the guard (only this
* label differed). `assertKeyAccepted` counts a 401/403 on `globalThis` before
* it throws; `src/middleware.ts` refuses to store a render that grew the count.
*/
var guard = createSiteKeyGuard(connection, {
	label: "tds-tools",
	reconnectHint: "Bitte Tools in den Tools-Einstellungen neu verbinden."
});
var { currentSiteKey, siteKeyHeaders, assertKeyAccepted } = guard;
/** Key, 10s timeout, key check, throw on non-2xx. See tds-shared/site. */
var readContentJson = createContentReader(guard);
//#endregion
//#region src/lib/contentFetch.ts
/** Remembers successes only — see `memoisedOr` in tds-shared/site. */
function memoisedOr(key, load, fallback, label) {
	return memoisedOr$1(contentCache, key, load, fallback, (_message, err) => console.warn(`[tds-tools] ${label} unavailable — using the fallback:`, err));
}
//#endregion
//#region src/lib/catalog.ts
/**
* Build-time catalog resolution.
*
* The tool *defaults* (name, slug, category, premium/login defaults) come from
* the composed manifests (`virtual:tools-catalog`). The *admin overrides*
* (enabled / requires-login / premium / price + the AdSense config) come from
* the `tds-ext-tools` panel extension's public endpoint, fetched once at build
* time and baked into the static pages — exactly like `tds-blog` bakes its
* content + ads config. A failed/absent fetch (or demo mode) falls back to the
* manifest defaults with ads OFF, so the site always builds even when the panel
* backend is unreachable or not yet deployed.
*
* When an admin toggles a tool or the ads config, the extension fires a rebuild
* of this site (the `RebuildTrigger` pattern), so the baked catalog refreshes.
*
* ### The catalog only ever OVERRIDES — it never supplies the tool list
*
* `composed.tools` is the list; the backend can flip flags on it and nothing
* more. A tool with no matching row resolves to `enabled: true`. So no state of
* the backend — down, 500, empty, unparseable — can empty this site.
*
* ### Why there is no registry sync here any more
*
* This module used to POST the composed catalog to `/tools/registry` at build
* time, gated on `import.meta.env.TOOLS_REGISTRY_TOKEN`. That never ran once:
* no workflow exported the variable, and without a `PUBLIC_` prefix Vite never
* puts it on `import.meta.env` at all (there is no `envField` schema in
* `astro.config.mjs`), so the guard was unconditionally true. It failed soft by
* design, so nothing went red — and the admin panel's tool list stayed empty
* for the whole life of the platform while the panel told the operator the
* tools would "appear automatically".
*
* The sync lives host-side now: the build publishes the same payload as a
* static artefact (`src/pages/tools-catalog.json.ts` → `dist/tools-catalog.json`)
* and `/install/` posts it with the token entered in its form. That
* also keeps the token off the CI runner. See TOOLS-PLATFORM.md.
*/
var catalog_exports = /* @__PURE__ */ __exportAll({
	adsConfig: () => adsConfig,
	enabledTools: () => enabledTools,
	toolsData: () => toolsData
});
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
	_: "/opt/hostedtoolcache/node/22.23.3/x64/bin/npm"
}).PUBLIC_DEMO_MODE === "true";
/** Merge one manifest tool with its (optional) admin override row. */
function resolve(tool, row) {
	return {
		...tool,
		enabled: row?.enabled ?? true,
		requiresLogin: row?.requires_login ?? tool.requiresLoginDefault ?? false,
		isPremium: row?.is_premium ?? tool.premiumDefault ?? false,
		priceCents: row?.price_cents ?? tool.priceCentsDefault ?? 0
	};
}
/** Every tool with manifest defaults (no backend) — the safe fallback. */
function fallback() {
	return {
		tools: catalog.tools.map((t) => resolve(t, void 0)),
		ads: ADS_OFF
	};
}
/** Throws on any failure — `toolsData` decides what that renders as. */
async function load() {
	const data = await readContentJson(`${apiBase()}/tools/catalog`);
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
}
/**
* The resolved catalog.
*
* Memoised through `contentCache`, so the dozen tool pages of one render share
* a single request while a cache rebuild still reads through. It used to be a
* module-level promise, which was right for a static build — one process, one
* fetch, then exit — and would live as long as the server under SSR: switching
* a tool off in the panel would never reach a visitor, and nothing would log.
*/
function toolsData() {
	if (DEMO_MODE) return Promise.resolve(fallback());
	return memoisedOr("tools:catalog", load, fallback, "catalog API (manifest defaults, ads off)");
}
/** Enabled tools only (what the catalog + routes should surface). */
async function enabledTools() {
	return (await toolsData()).tools.filter((t) => t.enabled);
}
/** The AdSense config. */
async function adsConfig() {
	return (await toolsData()).ads;
}
//#endregion
export { readContentJson as a, memoisedOr as i, catalog_exports as n, enabledTools as r, adsConfig as t };
