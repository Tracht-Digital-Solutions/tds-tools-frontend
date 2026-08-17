import type { ToolGuideSet } from "~/lib/guides";

const guide: ToolGuideSet = {
  de: {
    intro: [
      "PDF ist das Format, in dem Angebote, Rechnungen, Lieferscheine und Nachweise durch den Betrieb wandern. Genau deshalb fallen ständig kleine Handgriffe an: drei Scans zu einem Dokument zusammenfassen, aus einem zwanzigseitigen Vertrag die zwei relevanten Seiten herauslösen, eine quer eingezogene Seite geraderücken.",
      "Diese Werkzeuge erledigen genau das — zusammenführen, aufteilen und drehen. Beim Zusammenführen bestimmen Sie die Reihenfolge, beim Aufteilen geben Sie einen Seitenbereich wie 1-3,5 an, und das Drehen wirkt auf die gewählten Seiten. Das Ergebnis laden Sie unmittelbar als neue Datei herunter.",
      "Der übliche Weg für diese Aufgaben führt über einen der großen Online-Dienste — und damit über einen Upload. Bei einem Angebot mit Preisen, einer Rechnung mit Bankverbindung oder einer Personalakte ist das der Punkt, an dem es aufhört, eine reine Bequemlichkeitsfrage zu sein. Hier bleibt die Datei auf Ihrem Gerät.",
    ],
    useCases: [
      {
        title: "Scans zu einem Dokument bündeln",
        text: "Der Einzug liefert Seite für Seite eine eigene Datei. Zusammengeführt entsteht daraus ein Dokument, das sich versenden und ablegen lässt.",
      },
      {
        title: "Nur die relevanten Seiten weitergeben",
        text: "Aus einem umfangreichen Vertrag oder Prüfbericht den Auszug lösen, der den Empfänger tatsächlich etwas angeht.",
      },
      {
        title: "Quer eingezogene Seiten geraderücken",
        text: "Eine gedrehte Seite macht ein Dokument unlesbar und beim Ausdruck unbrauchbar. Drehen, speichern, fertig.",
      },
      {
        title: "Angebot und Anlagen als eine Datei",
        text: "Anschreiben, Leistungsverzeichnis und Datenblätter in der richtigen Reihenfolge zusammenlegen, statt fünf Anhänge zu verschicken.",
      },
      {
        title: "Unterlagen für die Buchhaltung",
        text: "Belege eines Vorgangs zu einer Datei zusammenfassen, bevor sie in die Ablage oder zur Steuerberatung gehen.",
      },
    ],
    steps: [
      {
        title: "Werkzeug wählen",
        description:
          "Entscheiden Sie zwischen Zusammenführen, Aufteilen und Drehen. Die Eingabefelder richten sich nach dieser Wahl.",
      },
      {
        title: "Dateien auswählen",
        description:
          "Zum Zusammenführen wählen Sie mindestens zwei PDFs; die Reihenfolge der Auswahl ist die Reihenfolge im Ergebnis. Für das Aufteilen und Drehen genügt eine Datei.",
      },
      {
        title: "Seitenbereich angeben",
        description:
          "Beim Aufteilen tragen Sie die gewünschten Seiten ein, etwa 1-3,5 für die ersten drei Seiten und die fünfte. Beim Drehen wählen Sie den Winkel für die betroffenen Seiten.",
      },
      {
        title: "Ausführen und herunterladen",
        description:
          "Das Ergebnis wird im Browser erzeugt und sofort als neue Datei angeboten. Die Ausgangsdateien bleiben unverändert.",
      },
    ],
    privacy:
      "Die PDFs werden nicht hochgeladen. Sie werden im Browser gelesen und dort neu geschrieben; keine Seite und keine Datei verlässt Ihr Gerät. Bei Dokumenten aus dem Geschäftsbetrieb ist das der eigentliche Grund, dieses Werkzeug einem der großen Online-Dienste vorzuziehen: Wer ein Angebot, eine Rechnung oder eine Personalakte auf einen fremden Server lädt, verarbeitet damit personenbezogene oder vertrauliche Daten außerhalb des eigenen Hauses — mit allem, was daran hängt.",
    faq: [
      {
        q: "Werden meine Dokumente hochgeladen?",
        a: "Nein. Die Verarbeitung läuft vollständig im Browser; es gibt keinen Server, der die Datei entgegennimmt. Das gilt für alle drei Funktionen gleichermaßen.",
      },
      {
        q: "Wie gebe ich einen Seitenbereich an?",
        a: "Einzelne Seiten trennen Sie mit Komma, zusammenhängende Bereiche mit Bindestrich. 1-3,5 bedeutet also die Seiten eins bis drei und zusätzlich die Seite fünf. Die Reihenfolge im Ergebnis entspricht der Reihenfolge im Original.",
      },
      {
        q: "Bleibt die Qualität erhalten?",
        a: "Ja. Die Seiten werden übernommen, nicht neu gerendert — Text bleibt Text, eingebettete Schriften und Auflösung bleiben unverändert. Es findet keine Kompression statt.",
      },
      {
        q: "Funktionieren passwortgeschützte PDFs?",
        a: "Verschlüsselte Dateien lassen sich nicht verarbeiten. Entfernen Sie den Schutz vorher im Programm, mit dem die Datei erstellt wurde, oder speichern Sie eine ungeschützte Fassung.",
      },
      {
        q: "Warum ist dieses Werkzeug kostenpflichtig?",
        a: "Die frei zugänglichen Werkzeuge auf dieser Seite finanzieren sich über Werbung. Die PDF-Werkzeuge kommen ohne Werbung aus und sind stattdessen einmalig freizuschalten — bei Dokumenten aus dem Geschäftsbetrieb ist eine werbefreie, rein lokale Verarbeitung der ehrlichere Handel.",
      },
    ],
    related: ["bild-komprimieren", "json-formatter"],
  },
  en: {
    intro: [
      "PDF is the format in which quotes, invoices, delivery notes and certificates travel through a business. That is exactly why small jobs come up constantly: combining three scans into one document, pulling the two relevant pages out of a twenty-page contract, straightening a page that went through the feeder sideways.",
      "These tools do precisely that — merge, split and rotate. Merging lets you set the order, splitting takes a page range such as 1-3,5, and rotating applies to the pages you choose. You download the result immediately as a new file.",
      "The usual route for these jobs runs through one of the large online services, and therefore through an upload. With a quote carrying prices, an invoice carrying bank details or a personnel file, that is the point where it stops being a question of convenience. Here the file stays on your device.",
    ],
    useCases: [
      {
        title: "Bundling scans into one document",
        text: "The feeder produces a separate file per page. Merged, they become a document you can send and file.",
      },
      {
        title: "Passing on only the relevant pages",
        text: "Pull the extract that actually concerns the recipient out of a lengthy contract or inspection report.",
      },
      {
        title: "Straightening sideways pages",
        text: "A rotated page makes a document unreadable and useless in print. Rotate, save, done.",
      },
      {
        title: "Quote and attachments as one file",
        text: "Put the cover letter, the specification and the data sheets in the right order instead of sending five attachments.",
      },
      {
        title: "Paperwork for the bookkeeping",
        text: "Combine the receipts for one matter into a single file before it goes into the archive or to the accountant.",
      },
    ],
    steps: [
      {
        title: "Choose a tool",
        description:
          "Decide between merging, splitting and rotating. The input fields follow that choice.",
      },
      {
        title: "Select the files",
        description:
          "For merging, choose at least two PDFs; the order you select them in is the order in the result. Splitting and rotating need a single file.",
      },
      {
        title: "Give the page range",
        description:
          "For splitting, enter the pages you want, such as 1-3,5 for the first three pages plus the fifth. For rotating, choose the angle for the affected pages.",
      },
      {
        title: "Run it and download",
        description:
          "The result is produced in the browser and offered straight away as a new file. Your source files are left untouched.",
      },
    ],
    privacy:
      "The PDFs are not uploaded. They are read in the browser and written out again there; no page and no file leaves your device. With documents from a business that is the real reason to prefer this tool to one of the large online services: uploading a quote, an invoice or a personnel file to somebody else's server means processing personal or confidential data outside your own house, with everything that entails.",
    faq: [
      {
        q: "Are my documents uploaded?",
        a: "No. Processing runs entirely in the browser; there is no server that receives the file. That holds for all three functions equally.",
      },
      {
        q: "How do I write a page range?",
        a: "Separate individual pages with commas and continuous ranges with a hyphen. So 1-3,5 means pages one to three plus page five. The order in the result follows the order in the original.",
      },
      {
        q: "Is quality preserved?",
        a: "Yes. Pages are carried over rather than re-rendered — text stays text, embedded fonts and resolution are unchanged. No compression takes place.",
      },
      {
        q: "Do password-protected PDFs work?",
        a: "Encrypted files cannot be processed. Remove the protection beforehand in the program the file was created with, or save an unprotected copy.",
      },
      {
        q: "Why does this tool cost money?",
        a: "The freely available tools on this site are funded by advertising. The PDF tools carry no advertising and are unlocked once instead — with documents from a business, ad-free and purely local processing is the more honest trade.",
      },
    ],
    related: ["bild-komprimieren", "json-formatter"],
  },
};

export default guide;
