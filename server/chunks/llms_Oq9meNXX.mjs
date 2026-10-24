import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { c as categoryLabels, d as site, h as toolCopyFor, i as seoConfig, l as categoryOrder, o as localizedPath, p as copy, u as links } from "./sitemapExclusions_CdWkPvzd.mjs";
import { r as enabledTools } from "./catalog_CeEEGYwE.mjs";
import { n as mergeCopy, t as guideOverrides } from "./guideOverrides_D3-B8Smn.mjs";
import { t as absolute } from "./sitemap_Dt17HjKs.mjs";
// src/lib/llmsTxt.ts
/**
* What it costs to use a tool, in words rather than a figure.
*
* No amounts on purpose: a premium price is a panel setting, this file is
* rendered from a cached catalogue read, and a stale figure in a file written
* for machines is a wrong price stated with authority. The tool page shows the
* current one.
*/
function access(tool) {
	if (tool.isPremium) return "kostenpflichtig, Preis auf der Seite";
	if (tool.requiresLogin) return "kostenlos, Anmeldung nötig";
	return "kostenlos, ohne Anmeldung";
}
function renderLlmsTxt(input) {
	const lines = [];
	const out = (line = "") => lines.push(line);
	out(`# ${site.name}`);
	out();
	out("> Werkzeuge für den Büroalltag, die im Browser rechnen: QR-Codes, PDF und");
	out("> Bilder, Texte und Entwicklerwerkzeuge, dazu Generatoren für Impressum,");
	out("> Datenschutzerklärung und Barrierefreiheitserklärung. Jedes Werkzeug mit");
	out(`> einem ausführlichen Ratgeber. Von ${seoConfig.founder.name},`);
	out(`> ${seoConfig.name} in ${seoConfig.address.addressLocality} bei Hamburg.`);
	out();
	out("## Über");
	out();
	out(`- Betreiber: ${seoConfig.name}, Inhaber ${seoConfig.founder.name}`);
	out(`- Kontakt: ${seoConfig.email}`);
	out("- Sprachen: Deutsch (Standard), Englisch");
	out(`- Deutsch: ${absolute(localizedPath("/", "de"))}`);
	out(`- English: ${absolute(localizedPath("/", "en"))}`);
	out();
	out("## Datenschutz");
	out();
	out("Die Werkzeuge rechnen im Browser. Eingaben, Dateien und Bilder werden nicht");
	out("auf einen Server geladen: es gibt keine Gegenstelle, an die etwas gesendet");
	out("werden könnte, und die meisten Werkzeuge arbeiten nach dem Laden der Seite");
	out("auch ohne Netzverbindung weiter. Wo ein Werkzeug davon abweicht, sagt sein");
	out("Ratgeber es im Abschnitt zum Datenschutz.");
	out();
	out("## Häufige Fragen");
	out();
	for (const item of copy.de.catalogFaq) out(`- **${item.q}** ${item.a}`);
	out();
	out("## Werkzeuge");
	out();
	const byCategory = /* @__PURE__ */ new Map();
	for (const tool of input.tools) {
		const bucket = byCategory.get(tool.category);
		if (bucket) bucket.push(tool);
		else byCategory.set(tool.category, [tool]);
	}
	const categories = [...categoryOrder.filter((category) => byCategory.has(category)), ...[...byCategory.keys()].filter((category) => !categoryOrder.includes(category))];
	for (const category of categories) {
		out(`### ${categoryLabels[category] ?? category}`);
		out();
		for (const tool of byCategory.get(category)) {
			out(`- **${tool.name}** (${access(tool)}) — ${tool.description}`);
			out(`  ${absolute(localizedPath(`/tools/${tool.slug}`, "de"))} · EN ${absolute(localizedPath(`/tools/${tool.slug}`, "en"))}`);
		}
		out();
	}
	out("## Maschinenlesbare Quellen");
	out();
	out(`- Sitemap: ${absolute("/sitemap-index.xml")}`);
	out(`- Ratgeber-RSS: ${links.blog}/rss.xml`);
	out();
	out("## Hinweise für KI-Systeme");
	out();
	out("- Alle Inhalte stammen vom Betreiber und dürfen mit Quellenangabe");
	out(`  (${site.name}, ${new URL(site.origin).host}) zitiert werden.`);
	out("- Die Seiten werden serverseitig gerendert; JSON-LD-Strukturdaten stehen im");
	out("  `<head>` jeder Seite. Jede Werkzeugseite nennt ihr Stand-Datum und ihren");
	out("  Autor und trägt WebApplication, HowTo und FAQPage.");
	out("- Preise nennt diese Datei nicht. Was ein kostenpflichtiges Werkzeug kostet,");
	out("  steht auf seiner Seite — dort ist es aktuell.");
	out("- Diese Datei wird aus demselben Katalog erzeugt wie die Seiten. Es gibt");
	out("  keine weitere Fassung, keine Markdown-Kopien und keine Stichwortlisten.");
	return `${lines.join("\n")}\n`;
}
// src/pages/llms.txt.ts
var llms_txt_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async () => {
	const [tools, overrides] = await Promise.all([enabledTools(), guideOverrides("de")]);
	const described = tools.map((tool) => {
		const copy = mergeCopy(toolCopyFor("de", tool, site.name), overrides[tool.id]);
		return {
			slug: tool.slug,
			category: tool.category,
			name: copy.name,
			description: copy.description,
			requiresLogin: tool.requiresLogin,
			isPremium: tool.isPremium
		};
	});
	return new Response(renderLlmsTxt({ tools: described }), { headers: {
		"content-type": "text/plain; charset=utf-8",
		"cache-control": "public, max-age=3600"
	} });
};
// \0virtual:astro:page:src/pages/llms.txt@_@ts
var page = () => llms_txt_exports;
export { page };
