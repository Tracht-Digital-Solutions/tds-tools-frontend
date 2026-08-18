import type { ToolGuideSet } from "~/lib/guides";

const guide: ToolGuideSet = {
  de: {
    intro: [
      "Ein abfotografierter Beleg ist für einen Computer ein Bild und sonst nichts. Der Betrag darauf ist nicht suchbar, die Adresse nicht kopierbar, die Rechnungsnummer nicht in ein Formular zu übernehmen — obwohl alles davon gut lesbar vor einem liegt. Texterkennung schließt diese Lücke: Sie liest die Buchstaben aus dem Bild heraus und gibt sie als Text zurück.",
      "Dieses Werkzeug erkennt deutschen und englischen Text und arbeitet dabei vollständig auf Ihrem Gerät. Auch die Spracherkennungsdaten kommen von dieser Website und nicht von einem fremden Anbieter — beim Öffnen des Werkzeugs entsteht also keine Verbindung nach außen, und das Bild selbst wird ohnehin nicht übertragen.",
      "Wie gut das Ergebnis wird, entscheidet fast ausschließlich die Vorlage. Ein gerade aufgenommener, scharfer Ausschnitt mit gutem Kontrast liefert Text, den man nur noch überfliegen muss. Ein schräges Foto bei Kunstlicht liefert Bruchstücke. Es lohnt sich deshalb mehr, die Aufnahme zu wiederholen, als am Ergebnis herumzubessern.",
    ],
    useCases: [
      {
        title: "Rechnungsangaben übernehmen",
        text: "Rechnungsnummer, Betrag und Steuersatz aus einem Beleg herauslesen, statt sie abzutippen — mit dem üblichen Zahlendreher, den niemand bemerkt.",
      },
      {
        title: "Visitenkarten erfassen",
        text: "Nach einer Messe liegen zwanzig Karten auf dem Tisch. Abfotografiert und erkannt sind die Kontaktdaten in wenigen Minuten in der Adressverwaltung.",
      },
      {
        title: "Alte Unterlagen durchsuchbar machen",
        text: "Ein Aktenordner ist erst dann wirklich digitalisiert, wenn sich der Inhalt suchen lässt — nicht schon dann, wenn ein Bild davon existiert.",
      },
      {
        title: "Zitate aus gedruckten Vorlagen",
        text: "Ein Absatz aus einem Prospekt, einer Norm oder einem Behördenschreiben landet als Text im Angebot, ohne ihn Wort für Wort zu übertragen.",
      },
      {
        title: "Typenschilder und Seriennummern",
        text: "Auf einem Foto vom Typenschild einer Maschine ist die Nummer lesbar, aber nicht kopierbar. Genau dafür ist die Erkennung eines kleinen Ausschnitts gedacht.",
      },
    ],
    steps: [
      {
        title: "Bild auswählen",
        description: "Wählen Sie ein Foto, einen Screenshot oder einen Bildscan. Direkt aus einem PDF wird hier nicht gelesen — wandeln Sie in dem Fall zuerst die betreffende Seite in ein Bild um, am besten mit 300 dpi.",
      },
      {
        title: "Sprache festlegen",
        description: "Wählen Sie die Sprache, in der der Text verfasst ist. Beide gleichzeitig ist möglich und sinnvoll bei gemischten Vorlagen, kostet aber etwas Genauigkeit und Zeit — bei rein deutschem Text bleiben Sie besser bei Deutsch.",
      },
      {
        title: "Erkennung starten",
        description: "Beim ersten Durchgang wird die Erkennung geladen, was je nach Verbindung einen Moment dauert; danach zeigt der Knopf den Fortschritt in Prozent. Für ein einzelnes Bild dauert die Erkennung selbst meist wenige Sekunden.",
      },
      {
        title: "Ergebnis nachsehen und übernehmen",
        description: "Der erkannte Text erscheint in einem bearbeitbaren Feld — Zahlen und Eigennamen sollten Sie kurz gegenlesen, denn dort sind Verwechslungen am wahrscheinlichsten. Danach kopieren Sie ihn oder speichern ihn als Textdatei.",
      },
    ],
    privacy:
      "Die Erkennung läuft vollständig auf Ihrem Gerät: Das Bild wird nicht hochgeladen, und die dafür nötige Software samt Sprachdaten wird von dieser Website ausgeliefert statt von einem fremden Anbieter. Beim Öffnen des Werkzeugs wird also keine dritte Seite aufgerufen — was gerade dann zählt, wenn auf der Vorlage Kundendaten oder Beträge stehen.",
    faq: [
      {
        q: "Warum ist die Erkennung stellenweise falsch?",
        a: "Meistens liegt es an der Vorlage: Unschärfe, Schatten, eine schräge Aufnahme oder eine gemusterte Unterlage kosten mehr Genauigkeit als jede Einstellung. Ein zweites, gerade und formatfüllend aufgenommenes Foto bringt fast immer mehr als Nacharbeit am Text.",
      },
      {
        q: "Kann ich eine Handschrift erkennen lassen?",
        a: "Nein. Die Erkennung ist auf gedruckte Schrift ausgelegt; bei Handschrift sind die Ergebnisse nicht brauchbar. Das gilt für praktisch alle Werkzeuge dieser Art, die ohne Server auskommen.",
      },
      {
        q: "Warum dauert der erste Start länger?",
        a: "Beim ersten Durchgang lädt der Browser die Erkennungssoftware und die Sprachdaten. Das sind einige Megabyte, die danach im Zwischenspeicher liegen — der zweite Lauf beginnt sofort.",
      },
      {
        q: "Bleibt das Layout der Vorlage erhalten?",
        a: "Nur grob. Zeilenumbrüche bleiben meist stehen, Spalten und Tabellen dagegen werden zu fortlaufendem Text. Für tabellarische Vorlagen ist deshalb etwas Nacharbeit einzuplanen.",
      },
    ],
    related: ["bild-komprimieren", "pdf-zu-bildern"],
  },
  en: {
    intro: [
      "A photographed receipt is an image to a computer and nothing else. The amount on it cannot be searched, the address cannot be copied, the invoice number cannot be carried into a form — even though all of it is sitting there perfectly legible. Text recognition closes that gap: it reads the letters out of the picture and hands them back as text.",
      "This tool recognises German and English text and does the whole job on your device. Even the recognition data is served by this website rather than by a third party — so opening the tool opens no outbound connection, and the picture itself is not transmitted in any case.",
      "How good the result is depends almost entirely on the input. A straight, sharp, well-contrasted shot yields text you only have to skim. A tilted photo under artificial light yields fragments. It is therefore worth more to retake the picture than to patch up the output.",
    ],
    useCases: [
      {
        title: "Carrying over invoice details",
        text: "Read the invoice number, the amount and the tax rate out of a receipt instead of retyping them — with the usual transposed digits nobody notices.",
      },
      {
        title: "Capturing business cards",
        text: "After a trade fair twenty cards sit on the desk. Photographed and recognised, the contact details are in the address book within minutes.",
      },
      {
        title: "Making old papers searchable",
        text: "A file of documents is only really digitised once its contents can be searched — not merely once a picture of it exists.",
      },
      {
        title: "Quoting from printed sources",
        text: "A paragraph from a brochure, a standard or an official letter lands in the quotation as text, without transcribing it word by word.",
      },
      {
        title: "Rating plates and serial numbers",
        text: "In a photo of a machine's rating plate the number is legible but not copyable. Recognising a small crop is exactly what this is for.",
      },
    ],
    steps: [
      {
        title: "Choose the image",
        description: "Pick a photo, a screenshot or a scanned image. PDFs are not read here — in that case convert the page in question to an image first, ideally at 300 dpi.",
      },
      {
        title: "Set the language",
        description: "Choose the language the text is written in. Both at once is possible and sensible for mixed material, but costs a little accuracy and time — for purely German text, stay with German.",
      },
      {
        title: "Start the recognition",
        description: "On the first run the engine is loaded, which takes a moment depending on your connection; after that the button shows the progress as a percentage. For a single image the recognition itself usually takes a few seconds.",
      },
      {
        title: "Review and take the result",
        description: "The recognised text appears in an editable field — numbers and proper names are worth a quick read, because that is where confusions are likeliest. Then copy it or save it as a text file.",
      },
    ],
    privacy:
      "Recognition runs entirely on your device: the image is not uploaded, and the software and language data needed for it are served by this website rather than by a third party. Opening the tool therefore contacts no other site — which counts most when the material shows customer details or amounts.",
    faq: [
      {
        q: "Why is the recognition wrong in places?",
        a: "Usually it is the input: blur, shadows, a tilted shot or a patterned surface cost more accuracy than any setting can win back. A second photo, straight and filling the frame, almost always beats reworking the text.",
      },
      {
        q: "Can it recognise handwriting?",
        a: "No. The recognition is built for printed type; with handwriting the results are not usable. That is true of practically every tool of this kind that works without a server.",
      },
      {
        q: "Why does the first start take longer?",
        a: "On the first run the browser loads the recognition software and the language data. That is a few megabytes, cached afterwards — the second run begins immediately.",
      },
      {
        q: "Is the layout of the original kept?",
        a: "Only roughly. Line breaks usually survive, while columns and tables become running text. For tabular material, plan for some rework.",
      },
    ],
    related: ["bild-komprimieren", "pdf-zu-bildern"],
  },
};

export default guide;
