import type { ToolGuideSet } from "~/lib/guides";

const guide: ToolGuideSet = {
  de: {
    intro: [
      "Etikettenbogen sind billig, das Beschriften ist es nicht. Wer einmal versucht hat, dreißig Adressen in einer Textverarbeitung so auf ein Raster zu bringen, dass sie nach dem Druck auch auf den Aufklebern landen, kennt das Ergebnis: zwei verschwendete Bogen und eine Tabelle, die beim nächsten Mal niemand mehr wiederfindet.",
      "Dieses Werkzeug erzeugt den Bogen als fertiges PDF. Sie wählen das Raster, fügen die Adressen ein — eine je Absatz — und bekommen eine Datei, die Sie ohne weitere Einstellung auf den Etikettenbogen drucken. Die gängigen Formate von 24 bis 40 Etiketten je A4-Seite sind hinterlegt, samt der Ränder und Abstände, die das jeweilige Raster braucht.",
      "Zwei Kleinigkeiten machen den Unterschied im Alltag. „Erstes benutztes Feld“ nimmt einen angebrochenen Bogen auf, sodass die ersten, schon abgezogenen Felder freibleiben. Und die Schnittlinien lassen sich zum Prüfen einblenden: einmal auf normalem Papier drucken, gegen den Etikettenbogen halten, und die Passgenauigkeit ist geklärt, bevor der teure Bogen durch den Drucker läuft.",
    ],
    useCases: [
      {
        title: "Serienbrief ohne Serienbrief",
        text: "Für eine Aussendung an dreißig Kunden braucht es keine Datenbankanbindung — die Adressen aus der Mail liegen ohnehin schon als Text vor.",
      },
      {
        title: "Absenderaufkleber auf Vorrat",
        text: "Ein Bogen mit der eigenen Anschrift auf allen Feldern ist in einer Minute erzeugt und spart über das Jahr das Beschriften jedes einzelnen Umschlags.",
      },
      {
        title: "Inventar und Lagerplätze beschriften",
        text: "Regalfächer, Werkzeugkisten und Ordnerrücken bekommen einheitliche Beschriftungen, statt der Handschrift von drei verschiedenen Kollegen.",
      },
      {
        title: "Versandvorbereitung im Handel",
        text: "Wer regelmäßig Pakete verschickt, klebt die Empfängeradresse lieber auf, als sie jedes Mal von Hand auf den Karton zu schreiben.",
      },
      {
        title: "Namensschilder für eine Veranstaltung",
        text: "Für einen Tag der offenen Tür oder eine Schulung reicht ein größeres Raster mit Name und Betrieb, gedruckt am Vorabend.",
      },
    ],
    steps: [
      {
        title: "Bogen auswählen",
        description: "Suchen Sie das Raster, das zu Ihrem Etikettenbogen passt. Entscheidend sind die Maße und die Anzahl je Seite, nicht die Marke — ein Bogen eines anderen Herstellers mit demselben Raster passt genauso.",
      },
      {
        title: "Adressen einfügen",
        description: "Eine Adresse je Absatz: Die Zeilen innerhalb eines Absatzes werden zu den Zeilen auf dem Etikett, eine Leerzeile beendet das Etikett. Unter dem Feld steht laufend mit, wie viele Etiketten erkannt wurden — das ist die schnellste Kontrolle.",
      },
      {
        title: "Angebrochenen Bogen berücksichtigen",
        description: "Wurden von einem Bogen schon Felder abgezogen, tragen Sie unter „Erstes benutztes Feld“ die Nummer des ersten freien Feldes ein. Gezählt wird zeilenweise von links oben, wie beim Lesen.",
      },
      {
        title: "Probedruck und Druck",
        description: "Schalten Sie für den ersten Versuch die Schnittlinien ein und drucken Sie auf normales Papier. Wichtig ist dabei, dass der Drucker das PDF in Originalgröße ausgibt und nicht „an Seite anpassen“ — sonst verschiebt sich das ganze Raster um wenige Millimeter.",
      },
    ],
    privacy:
      "Der Bogen entsteht vollständig in Ihrem Browser; die eingefügten Adressen werden weder übertragen noch gespeichert. Bei einer Empfängerliste ist das keine Formalie, sondern der Unterschied zwischen einer internen Arbeitsdatei und einer Kundenliste, die auf einem fremden Server gelandet ist.",
    faq: [
      {
        q: "Mein Etikettenbogen steht nicht in der Liste — was nun?",
        a: "Vergleichen Sie die Maße auf der Verpackung mit den angebotenen Rastern; viele Hersteller verwenden identische Geometrien unter eigenen Nummern. Passt keines exakt, ist das nächstkleinere Raster meist noch brauchbar, weil der Text mittig auf dem Feld sitzt.",
      },
      {
        q: "Warum sitzt der Druck ein paar Millimeter daneben?",
        a: "Fast immer liegt es an der Skalierung im Druckdialog. Die Einstellung muss „Originalgröße“ oder „100 %“ heißen; „An Seite anpassen“ verkleinert das Dokument minimal, und über eine A4-Seite summiert sich das zu einem sichtbaren Versatz.",
      },
      {
        q: "Kann ich eine lange Adresse unterbringen?",
        a: "Der Text wird innerhalb des Etiketts umgebrochen, damit er nicht in das Nachbarfeld läuft. Bei sehr langen Zeilen hilft eine kleinere Schriftgröße — der Regler geht bis auf 6 pt herunter.",
      },
      {
        q: "Lassen sich Barcodes oder Logos aufbringen?",
        a: "Das Werkzeug setzt Text. Für ein Etikett mit Code ist der QR-Code-Generator der passende Schritt davor; das erzeugte Bild lässt sich dann in einer Vorlage weiterverwenden.",
      },
    ],
    related: ["stundenzettel", "qr-code-generator"],
  },
  en: {
    intro: [
      "Label sheets are cheap; labelling them is not. Anyone who has tried to line up thirty addresses in a word processor so that they actually land on the stickers after printing knows the outcome: two wasted sheets and a table nobody can find again next time.",
      "This tool produces the sheet as a finished PDF. You choose the grid, paste the addresses — one per paragraph — and get a file you print onto the label sheet with no further settings. The common formats from 24 to 40 labels per A4 page are built in, along with the margins and gaps each grid needs.",
      "Two small things make the difference in daily use. “First slot to use” takes account of a partly used sheet, leaving the already-peeled slots empty. And the cutting guides can be shown for checking: print once on plain paper, hold it against the label sheet, and the alignment is settled before the expensive sheet goes through the printer.",
    ],
    useCases: [
      {
        title: "A mail merge without the mail merge",
        text: "A mailing to thirty customers needs no database connection — the addresses from the email are already sitting there as text.",
      },
      {
        title: "Return address labels in stock",
        text: "A sheet with your own address in every slot takes a minute to produce and saves writing on each envelope for the rest of the year.",
      },
      {
        title: "Labelling stock and storage places",
        text: "Shelves, tool boxes and file spines get consistent labels instead of the handwriting of three different colleagues.",
      },
      {
        title: "Preparing shipments in retail",
        text: "Anyone sending parcels regularly would rather stick the recipient's address on than write it onto the box by hand every time.",
      },
      {
        title: "Name badges for an event",
        text: "For an open day or a training session, a larger grid with a name and a company is enough, printed the evening before.",
      },
    ],
    steps: [
      {
        title: "Choose the sheet",
        description: "Find the grid that matches your label sheet. What counts is the measurements and the count per page, not the brand — a sheet from another manufacturer with the same grid fits just as well.",
      },
      {
        title: "Paste the addresses",
        description: "One address per paragraph: the lines inside a paragraph become the lines on the label, and a blank line ends it. The number of labels detected is shown under the field as you type — the quickest check there is.",
      },
      {
        title: "Account for a partly used sheet",
        description: "If slots have already been peeled off a sheet, enter the number of the first free slot under “First slot to use”. Counting runs row by row from the top left, the way you read.",
      },
      {
        title: "Test print, then print",
        description: "For the first attempt switch the cutting guides on and print onto plain paper. What matters is that the printer outputs the PDF at original size and not “fit to page” — otherwise the whole grid shifts by a few millimetres.",
      },
    ],
    privacy:
      "The sheet is produced entirely in your browser; the pasted addresses are neither transmitted nor stored. With a recipient list that is not a formality but the difference between an internal working file and a customer list that has ended up on somebody else's server.",
    faq: [
      {
        q: "My label sheet is not in the list — what now?",
        a: "Compare the measurements on the packaging with the grids offered; many manufacturers use identical geometries under their own numbers. If none fits exactly, the next smaller grid is usually still usable, because the text sits centred on the slot.",
      },
      {
        q: "Why is the print a few millimetres out?",
        a: "Almost always it is the scaling in the print dialogue. The setting must read “actual size” or “100 %”; “fit to page” shrinks the document slightly, and across an A4 page that adds up to a visible offset.",
      },
      {
        q: "Can I fit a long address?",
        a: "The text is wrapped inside the label so that it does not run into the neighbouring slot. For very long lines a smaller font size helps — the slider goes down to 6 pt.",
      },
      {
        q: "Can I add barcodes or logos?",
        a: "The tool sets text. For a label with a code, the QR code generator is the right step beforehand; the produced image can then be used in a template.",
      },
    ],
    related: ["stundenzettel", "qr-code-generator"],
  },
};

export default guide;
