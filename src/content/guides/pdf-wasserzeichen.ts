import type { ToolGuideSet } from "~/lib/guides";

const guide: ToolGuideSet = {
  de: {
    intro: [
      "Ein Wasserzeichen sagt einem Dokument an, was es ist. „Entwurf“ quer über der Seite verhindert, dass eine Zwischenfassung als endgültige Rechnung durchgeht; „Kopie“ trennt das Zweitexemplar vom Original; ein Firmenname über einem Angebot macht sichtbar, von wem es stammt, auch wenn nur eine einzelne Seite ausgedruckt weitergereicht wird.",
      "Dieses Werkzeug setzt einen solchen Schriftzug in ein vorhandenes PDF — mit frei wählbarer Größe, Farbe, Deckkraft und Neigung, auf allen Seiten oder nur auf denen, die Sie angeben. Die vier Anordnungen decken die üblichen Fälle ab: diagonal über die Seite, waagerecht in der Mitte, dezent als Fußzeile oder gekachelt über die gesamte Fläche.",
      "Wichtig ist die Erwartung: Ein Wasserzeichen ist eine Kennzeichnung, kein Kopierschutz. Es macht den Status eines Dokuments auf einen Blick erkennbar und erschwert die unbemerkte Weiterverwendung einzelner Seiten. Wer es technisch entfernen will, kann das mit genügend Aufwand — dagegen hilft kein Werkzeug dieser Art, und Anbieter, die etwas anderes versprechen, überversprechen.",
    ],
    useCases: [
      {
        title: "Entwürfe eindeutig kennzeichnen",
        text: "Solange ein Angebot noch abgestimmt wird, gehört „Entwurf“ auf jede Seite. Es kostet nichts und verhindert die peinlichste Verwechslung im Schriftverkehr.",
      },
      {
        title: "Vertrauliche Unterlagen markieren",
        text: "Kalkulationen, Personalunterlagen und interne Auswertungen bekommen einen sichtbaren Hinweis, der auch auf einem herumliegenden Ausdruck noch zu lesen ist.",
      },
      {
        title: "Muster und Vorlagen versenden",
        text: "Wer ein Musterdokument herausgibt, will nicht, dass es ausgefüllt zurückkommt und als echter Vorgang verbucht wird. Ein Aufdruck über der Fläche macht das unmissverständlich.",
      },
      {
        title: "Herkunft eines Dokuments zeigen",
        text: "Bei Unterlagen, die durch mehrere Hände gehen, hält ein dezenter Firmenschriftzug in der Fußzeile fest, aus welchem Haus die Seite ursprünglich stammt.",
      },
      {
        title: "Fassungen auseinanderhalten",
        text: "Ein aufgedrucktes Datum oder eine Versionsnummer erspart die Rückfrage, welcher von drei Ausdrucken auf dem Tisch der aktuelle ist.",
      },
    ],
    steps: [
      {
        title: "PDF und Text wählen",
        description: "Laden Sie das Dokument und tragen Sie den Schriftzug ein. Kurz ist besser: Ein Wort bleibt bei jeder Größe lesbar, ein ganzer Satz zwingt Sie zu einer Schriftgröße, bei der das Wasserzeichen kaum noch auffällt.",
      },
      {
        title: "Anordnung festlegen",
        description: "Diagonal ist die klassische Wahl für einen Statusvermerk und lässt den Text darunter am besten lesbar. Gekachelt deckt die ganze Seite ab und eignet sich für Muster; die Fußzeile ist die zurückhaltendste Variante für eine Herkunftsangabe.",
      },
      {
        title: "Deckkraft und Farbe abstimmen",
        description: "Zwischen 15 und 25 Prozent liegt der Bereich, in dem der Aufdruck deutlich zu sehen ist, ohne den Text darunter zu stören. Prüfen Sie das Ergebnis am besten auf einer Seite mit viel Text, nicht auf dem Deckblatt.",
      },
      {
        title: "Seiten eingrenzen und speichern",
        description: "Bleibt das Feld leer, bekommt jede Seite den Aufdruck. Für eine Kennzeichnung nur auf dem Deckblatt genügt eine 1, für einen Bereich eine Angabe wie 1-3,5. Danach laden Sie das fertige Dokument herunter.",
      },
    ],
    privacy:
      "Das Dokument wird ausschließlich in Ihrem Browser geöffnet und dort mit dem Aufdruck versehen; weder die Datei noch der Text des Wasserzeichens verlässt Ihr Gerät. Gerade bei als vertraulich gekennzeichneten Unterlagen wäre alles andere widersinnig — ein Dokument zum Anbringen des Vermerks „Vertraulich“ auf einen fremden Server zu laden, hebt genau die Vertraulichkeit auf, um die es geht.",
    faq: [
      {
        q: "Lässt sich das Wasserzeichen wieder entfernen?",
        a: "Mit entsprechendem Aufwand ja — es ist eine Kennzeichnung und kein Kopierschutz. Für den Zweck, den Status eines Dokuments erkennbar zu machen, reicht das vollkommen; für echten Schutz bräuchte es Verschlüsselung und Rechteverwaltung.",
      },
      {
        q: "Kann ich ein Logo statt eines Textes einsetzen?",
        a: "Derzeit setzt das Werkzeug einen Textaufdruck. Für eine bildliche Kennzeichnung ist der übliche Weg, das Logo in die Vorlage aufzunehmen, aus der das PDF entsteht.",
      },
      {
        q: "Warum fehlen einzelne Sonderzeichen im Aufdruck?",
        a: "Die eingebaute Schrift deckt den westeuropäischen Zeichenvorrat ab. Typografische Anführungszeichen und Gedankenstriche werden automatisch ersetzt, alles darüber hinaus — etwa ein Emoji — wird weggelassen, statt den Export scheitern zu lassen.",
      },
      {
        q: "Bleibt der Text unter dem Wasserzeichen auswählbar?",
        a: "Ja. Der Aufdruck ist eine zusätzliche Ebene über dem Inhalt; Text bleibt Text und lässt sich weiterhin markieren, kopieren und durchsuchen.",
      },
    ],
    related: ["pdf-komprimieren", "pdf-werkzeuge"],
  },
  en: {
    intro: [
      "A watermark tells a document what it is. “Draft” across the page stops an interim version from passing as a final invoice; “Copy” separates the duplicate from the original; a company name over a quotation shows where it came from, even when a single page is printed and passed on.",
      "This tool puts such a wording into an existing PDF — with a size, colour, opacity and tilt of your choosing, on every page or only on the ones you name. The four placements cover the usual cases: diagonally across the page, horizontally in the centre, discreetly as a footer, or tiled over the whole surface.",
      "The expectation matters: a watermark is a marking, not a copy protection. It makes the status of a document visible at a glance and makes it harder to reuse single pages unnoticed. Anyone determined to strip it can, with enough effort — no tool of this kind changes that, and vendors who promise otherwise are overpromising.",
    ],
    useCases: [
      {
        title: "Marking drafts unmistakably",
        text: "While a quotation is still being agreed, “Draft” belongs on every page. It costs nothing and prevents the most embarrassing mix-up in correspondence.",
      },
      {
        title: "Flagging confidential papers",
        text: "Costings, personnel files and internal analyses get a visible note that is still legible on a printout left lying around.",
      },
      {
        title: "Sending out samples and templates",
        text: "Anyone handing out a sample document does not want it filled in and returned as a genuine case. A marking across the surface makes that unambiguous.",
      },
      {
        title: "Showing where a document came from",
        text: "For papers that pass through several hands, a discreet company wording in the footer records which office the page originally came from.",
      },
      {
        title: "Telling versions apart",
        text: "A printed date or version number saves the question of which of the three printouts on the desk is the current one.",
      },
    ],
    steps: [
      {
        title: "Choose the PDF and the wording",
        description: "Load the document and type the wording. Short is better: one word stays legible at any size, while a whole sentence forces a font size at which the watermark is barely noticeable.",
      },
      {
        title: "Pick the placement",
        description: "Diagonal is the classic choice for a status note and keeps the text underneath most readable. Tiled covers the whole page and suits samples; the footer is the most restrained variant for an origin note.",
      },
      {
        title: "Tune the opacity and colour",
        description: "Between 15 and 25 per cent is the range where the marking is clearly visible without disturbing the text under it. Check the result on a page full of text rather than on the cover sheet.",
      },
      {
        title: "Narrow the pages and save",
        description: "Left empty, the field marks every page. For the cover sheet alone a 1 is enough, for a range something like 1-3,5. Then download the finished document.",
      },
    ],
    privacy:
      "The document is opened and marked entirely inside your browser; neither the file nor the watermark wording leaves your device. With papers being marked confidential, anything else would be self-defeating — uploading a document to a stranger's server in order to stamp it “Confidential” removes exactly the confidentiality at stake.",
    faq: [
      {
        q: "Can the watermark be removed again?",
        a: "With enough effort, yes — it is a marking and not a copy protection. For the purpose of making a document's status recognisable that is entirely sufficient; real protection would need encryption and rights management.",
      },
      {
        q: "Can I use a logo instead of text?",
        a: "The tool applies a text marking at the moment. For a pictorial marking the usual route is to include the logo in the template the PDF is produced from.",
      },
      {
        q: "Why are some special characters missing?",
        a: "The built-in font covers the Western European character set. Typographic quotes and dashes are substituted automatically, and anything beyond that — an emoji, say — is dropped rather than being allowed to fail the export.",
      },
      {
        q: "Is the text under the watermark still selectable?",
        a: "Yes. The marking is an extra layer over the content; text stays text and can still be selected, copied and searched.",
      },
    ],
    related: ["pdf-komprimieren", "pdf-werkzeuge"],
  },
};

export default guide;
