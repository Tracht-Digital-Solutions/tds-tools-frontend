import type { ToolGuideSet } from "~/lib/guides";

const guide: ToolGuideSet = {
  de: {
    intro: [
      "Der Scanner steht im Büro, die Belege liegen im Fahrzeug — und abfotografiert ist ein Lieferschein in drei Sekunden. Was danach fehlt, ist die Form: Zwölf einzelne Handybilder sind kein Dokument, sie sind zwölf Anhänge in unklarer Reihenfolge, mit denen in der Buchhaltung niemand etwas anfangen kann.",
      "Dieses Werkzeug macht daraus ein PDF. Sie wählen die Bilder, bringen sie in die richtige Reihenfolge und legen fest, wie die Seiten aussehen sollen: A4, A5 oder Letter, hoch oder quer, mit Rand oder randlos. Jedes Bild wird eine Seite, und heraus kommt eine Datei, die sich verschicken, ablegen und ausdrucken lässt wie jedes andere Dokument.",
      "Für die Ausrichtung gibt es bewusst eine Automatik: Ein querformatiges Foto bekommt eine querformatige Seite, ein hochkant aufgenommenes eine hochkante. Damit passt der Stapel auch dann, wenn er gemischt ist — was er bei zwischendurch abfotografierten Belegen praktisch immer ist.",
    ],
    useCases: [
      {
        title: "Belege für die Buchhaltung bündeln",
        text: "Tankquittungen, Bewirtungsbelege und Parkscheine eines Monats werden ein Dokument statt dreißig Bilddateien mit nichtssagenden Namen.",
      },
      {
        title: "Baustellendokumentation abgeben",
        text: "Fotos vom Baufortschritt, in der richtigen Reihenfolge und mit ordentlichen Seiten, sind gegenüber dem Auftraggeber eine Dokumentation und kein Bilderordner.",
      },
      {
        title: "Unterschriebene Seiten zurückschicken",
        text: "Ein abfotografierter, unterschriebener Vertrag geht als PDF zurück — so, wie er losgeschickt wurde, und nicht als Foto im Anhang.",
      },
      {
        title: "Schadensmeldung bei der Versicherung",
        text: "Versicherungen verlangen fast immer ein Dokument je Vorgang. Mehrere Aufnahmen eines Schadens gehören dann in eine Datei, nicht in fünf Einzelbilder.",
      },
      {
        title: "Ersatz für den Scanner unterwegs",
        text: "Wer keinen Scanner zur Hand hat, kommt mit Handykamera und diesem Schritt zu einem brauchbaren Ergebnis — ohne eine App zu installieren, die Bilder in eine fremde Cloud lädt.",
      },
    ],
    steps: [
      {
        title: "Bilder auswählen",
        description: "Wählen Sie alle Aufnahmen auf einmal aus. JPG, PNG und WebP werden gelesen; die Bilder werden vor dem Einbetten einheitlich aufbereitet, sodass auch gemischte Formate im selben Dokument landen.",
      },
      {
        title: "Reihenfolge sortieren",
        description: "Ab zwei Bildern erscheint eine Liste mit Pfeilen zum Verschieben und einem Kreuz zum Entfernen. Die Reihenfolge in dieser Liste ist die Seitenreihenfolge im PDF — das ist meist der Schritt, der über brauchbar oder nicht entscheidet.",
      },
      {
        title: "Seitenformat und Rand wählen",
        description: "A4 mit zehn Millimetern Rand passt für alles, was ausgedruckt oder eingereicht wird. Wer das Bild formatfüllend braucht, wählt „So groß wie das Bild“; dann bestimmt die Aufnahme die Seitengröße und es gibt keinen Rand.",
      },
      {
        title: "Qualität abwägen und erzeugen",
        description: "Mit 80 Prozent bleibt ein abfotografierter Beleg gut lesbar und die Datei handlich. Erst wenn Kleingedrucktes wirklich entziffert werden muss, lohnt ein höherer Wert — der Zuwachs an Dateigröße ist erheblich.",
      },
    ],
    privacy:
      "Die Bilder werden im Browser gelesen, aufbereitet und zu einem PDF zusammengesetzt; keine Aufnahme wird übertragen oder gespeichert. Das ist bei genau diesem Werkzeug relevant, denn die typischen Vorlagen sind Belege, Verträge und Schadensfotos — also Unterlagen, die Adressen, Beträge und manchmal Unterschriften zeigen.",
    faq: [
      {
        q: "Werden die Bilder in der Auswahlreihenfolge eingefügt?",
        a: "Zunächst ja, und viele Dateisysteme sortieren dabei alphabetisch statt nach Aufnahmezeit. Deshalb gibt es die Liste zum Umsortieren — prüfen Sie sie einmal, bevor Sie das PDF erzeugen.",
      },
      {
        q: "Kann ich mehrere Bilder auf eine Seite legen?",
        a: "Nein, jedes Bild wird eine eigene Seite. Für eine Kontaktbogen-artige Übersicht ist ein Textprogramm der bessere Weg, weil dort auch Beschriftungen dazugehören.",
      },
      {
        q: "Was bedeutet „Seite füllen“ genau?",
        a: "Das Bild wird so vergrößert, dass es die ganze Seite bedeckt; was über den Rand hinausragt, fällt weg — gleichmäßig an beiden Seiten. Für Belege ist „Ganz sichtbar“ die sichere Wahl, weil dort nichts abgeschnitten werden darf.",
      },
      {
        q: "Lässt sich das entstandene PDF durchsuchen?",
        a: "Nein. Es enthält Bilder, keinen Text — das ist bei jedem aus Fotos erzeugten PDF so. Wenn Sie den Inhalt als Text brauchen, ist die Texterkennung der passende Schritt davor.",
      },
    ],
    related: ["pdf-zu-bildern", "bild-komprimieren"],
  },
  en: {
    intro: [
      "The scanner is in the office, the receipts are in the van — and a delivery note is photographed in three seconds. What is missing afterwards is the form: twelve separate phone pictures are not a document, they are twelve attachments in unclear order that nobody in bookkeeping can work with.",
      "This tool turns them into a PDF. You choose the images, put them in the right order, and decide how the pages should look: A4, A5 or Letter, portrait or landscape, with a margin or without. Each image becomes a page, and out comes a file that can be sent, filed and printed like any other document.",
      "Orientation is handled automatically on purpose: a landscape photo gets a landscape page, an upright one gets an upright page. That way a mixed stack still fits — and with receipts photographed as you go, a stack is mixed practically every time.",
    ],
    useCases: [
      {
        title: "Bundling receipts for bookkeeping",
        text: "A month of fuel receipts, hospitality slips and parking tickets becomes one document instead of thirty image files with meaningless names.",
      },
      {
        title: "Handing over site documentation",
        text: "Photos of the work in progress, in the right order and on proper pages, read to a client as documentation rather than as a folder of pictures.",
      },
      {
        title: "Returning signed pages",
        text: "A photographed, signed contract goes back as a PDF — the way it was sent out, not as a picture attached to an email.",
      },
      {
        title: "Reporting a claim to an insurer",
        text: "Insurers almost always ask for one document per case. Several shots of the same damage then belong in one file, not in five separate images.",
      },
      {
        title: "Standing in for a scanner on the road",
        text: "With no scanner at hand, a phone camera plus this step gives a usable result — without installing an app that uploads the pictures to somebody's cloud.",
      },
    ],
    steps: [
      {
        title: "Choose the images",
        description: "Select all the shots at once. JPG, PNG and WebP are read; the images are normalised before being embedded, so mixed formats still end up in the same document.",
      },
      {
        title: "Sort the order",
        description: "From two images on, a list appears with arrows to move an entry and a cross to remove it. The order in that list is the page order in the PDF — usually the step that decides between usable and not.",
      },
      {
        title: "Choose the page size and margin",
        description: "A4 with a ten millimetre margin suits anything that will be printed or submitted. If you need the image to fill the page, choose “Same size as the image”; the shot then sets the page size and there is no margin.",
      },
      {
        title: "Weigh the quality and create",
        description: "At 80 per cent a photographed receipt stays clearly legible and the file stays manageable. Only when small print really has to be deciphered is a higher value worth it — the growth in file size is considerable.",
      },
    ],
    privacy:
      "The images are read, prepared and assembled into a PDF inside the browser; no shot is transmitted or stored. That matters especially for this tool, because the typical inputs are receipts, contracts and damage photos — papers showing addresses, amounts and sometimes signatures.",
    faq: [
      {
        q: "Are the images added in the order I selected them?",
        a: "Initially yes, and many file pickers sort alphabetically rather than by capture time. That is what the reordering list is for — check it once before creating the PDF.",
      },
      {
        q: "Can I put several images on one page?",
        a: "No, each image becomes its own page. For a contact-sheet style overview a word processor is the better route, because captions belong there too.",
      },
      {
        q: "What exactly does “fill the page” do?",
        a: "The image is enlarged until it covers the whole page; whatever sticks out is cropped, evenly on both sides. For receipts “fully visible” is the safe choice, because nothing there may be cut off.",
      },
      {
        q: "Can the resulting PDF be searched?",
        a: "No. It contains images, not text — which is true of every PDF made from photos. If you need the content as text, text recognition is the right step beforehand.",
      },
    ],
    related: ["pdf-zu-bildern", "bild-komprimieren"],
  },
};

export default guide;
