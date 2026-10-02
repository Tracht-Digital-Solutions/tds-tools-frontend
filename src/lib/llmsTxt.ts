/**
 * `/llms.txt`, generated from the composed catalogue.
 *
 * This site had none. The marketing site and the journal both did, and this is
 * the property whose whole ranking case rests on tool queries — the search
 * where an answer engine is most likely to be asked "is there a free tool
 * that …" and least likely to have been told that this one exists.
 *
 * It is ONE small file, and deliberately not a second corpus: no
 * `llms-full.txt`, no Markdown copies of the guides, no keyword list. The
 * guides themselves are the content; this is the index to them, plus the one
 * fact that distinguishes the site from the hundredth
 * "free-online-converter" page — that nothing is uploaded.
 *
 * The renderer takes its corpus as an argument and touches no network, so the
 * contract test asserts the exact string. `src/pages/llms.txt.ts` resolves it.
 */

import type { ToolCategory } from "@tracht-digital-solutions/tds-tools-contract";
import { absolute } from "./sitemap";
import { localizedPath, seoConfig } from "./seo";
import { categoryLabels, categoryOrder, links, site } from "./site";

/** One tool, as this file names it. */
export interface LlmsTool {
  slug: string;
  category: ToolCategory;
  /** German name, after the panel override. */
  name: string;
  /** German description, after the panel override. */
  description: string;
  requiresLogin: boolean;
  isPremium: boolean;
}

export interface LlmsInput {
  /** The enabled tools, in catalogue order. */
  tools: readonly LlmsTool[];
}

/**
 * What it costs to use a tool, in words rather than a figure.
 *
 * No amounts on purpose: a premium price is a panel setting, this file is
 * rendered from a cached catalogue read, and a stale figure in a file written
 * for machines is a wrong price stated with authority. The tool page shows the
 * current one.
 */
function access(tool: LlmsTool): string {
  if (tool.isPremium) return "kostenpflichtig, Preis auf der Seite";
  if (tool.requiresLogin) return "kostenlos, Anmeldung nötig";
  return "kostenlos, ohne Anmeldung";
}

export function renderLlmsTxt(input: LlmsInput): string {
  const lines: string[] = [];
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

  // ── the one thing this site can say that its competitors cannot ─────────
  out("## Datenschutz");
  out();
  out("Die Werkzeuge rechnen im Browser. Eingaben, Dateien und Bilder werden nicht");
  out("auf einen Server geladen: es gibt keine Gegenstelle, an die etwas gesendet");
  out("werden könnte, und die meisten Werkzeuge arbeiten nach dem Laden der Seite");
  out("auch ohne Netzverbindung weiter. Wo ein Werkzeug davon abweicht, sagt sein");
  out("Ratgeber es im Abschnitt zum Datenschutz.");
  out();

  // ── the catalogue, grouped the way the catalogue page groups it ─────────
  out("## Werkzeuge");
  out();
  const byCategory = new Map<ToolCategory, LlmsTool[]>();
  for (const tool of input.tools) {
    const bucket = byCategory.get(tool.category);
    if (bucket) bucket.push(tool);
    else byCategory.set(tool.category, [tool]);
  }
  // `categoryOrder` first, then anything the contract added later — a new
  // category must not drop its tools out of this file silently.
  const categories = [
    ...categoryOrder.filter((category) => byCategory.has(category)),
    ...[...byCategory.keys()].filter((category) => !categoryOrder.includes(category)),
  ];
  for (const category of categories) {
    out(`### ${categoryLabels[category] ?? category}`);
    out();
    for (const tool of byCategory.get(category)!) {
      out(`- **${tool.name}** (${access(tool)}) — ${tool.description}`);
      // Both URLs on one line. With nineteen tools the three-line form spent
      // a fifth of the file on the word "English".
      out(
        `  ${absolute(localizedPath(`/tools/${tool.slug}`, "de"))}` +
          ` · EN ${absolute(localizedPath(`/tools/${tool.slug}`, "en"))}`,
      );
    }
    out();
  }

  out("## Maschinenlesbare Quellen");
  out();
  out(`- Sitemap: ${absolute("/sitemap-index.xml")}`);
  out(`- Journal-RSS: ${links.blog}/rss.xml`);
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
