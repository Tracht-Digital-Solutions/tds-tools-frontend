import type { ToolGuideSet } from "~/lib/guides";

const guide: ToolGuideSet = {
  de: {
    intro: [
      "Manchmal ist ein PDF das falsche Format. In eine Präsentation lässt es sich nicht einfügen, in einem Social-Media-Beitrag zeigt es niemand an, und für eine Vorschau auf der eigenen Website braucht es ohnehin ein Bild. Dann hilft der umgekehrte Weg: die gewünschte Seite als PNG oder JPG herausrechnen und wie jedes andere Bild weiterverwenden.",
      "Dieses Werkzeug rendert die Seiten so, wie ein Betrachter sie anzeigen würde — mit Schriften, Vektorgrafiken und Layout, nicht als Ausschnitt eines Screenshots. Die Auflösung bestimmen Sie: 96 dpi für den Bildschirm, 150 dpi als guter Mittelweg, 300 dpi, wenn das Ergebnis gedruckt wird.",
      "Die erzeugten Seiten erscheinen als Vorschau, mit Größe und Abmessung je Bild und einem eigenen Knopf zum Herunterladen. So laden Sie gezielt die eine Seite, die Sie brauchen, statt einen Ordner voller Dateien zu sortieren, von denen Sie neun wieder löschen.",
    ],
    useCases: [
      {
        title: "Seite in eine Präsentation übernehmen",
        text: "Eine Auswertung oder ein Plan aus einem PDF landet als Bild auf der Folie, ohne den Umweg über einen unscharf zugeschnittenen Bildschirmausschnitt.",
      },
      {
        title: "Vorschaubild für die Website",
        text: "Ein Datenblatt oder eine Speisekarte bekommt eine Vorschau, die Besucher sehen, bevor sie entscheiden, ob sie das ganze Dokument öffnen wollen.",
      },
      {
        title: "Einzelne Seite weitergeben",
        text: "Wenn nur eine Seite gebraucht wird, ist ein Bild oft der einfachere Weg als ein neues PDF — der Empfänger sieht es sofort, ohne etwas zu öffnen.",
      },
      {
        title: "Plan auf die Baustelle schicken",
        text: "Ein Bild lässt sich am Telefon in jedem Messenger anzeigen und heranziehen, während ein PDF-Anhang je nach Gerät erst eine App verlangt.",
      },
      {
        title: "Vorlage für die Texterkennung",
        text: "Ein gescanntes PDF ist für eine Texterkennung erst nutzbar, wenn die Seite als Bild vorliegt — dieser Schritt liefert genau das, in der passenden Auflösung.",
      },
    ],
    steps: [
      {
        title: "PDF auswählen",
        description: "Wählen Sie die Datei aus. Sie wird im Browser gelesen; die Anzeige-Engine dafür wird erst beim ersten Umwandeln geladen, damit das bloße Öffnen der Seite nicht schon ein Megabyte kostet.",
      },
      {
        title: "Seiten eingrenzen",
        description: "Leer lassen wandelt das ganze Dokument um. Bei einem längeren PDF lohnt sich eine Angabe wie 1 oder 2-4 — pro Durchgang werden höchstens fünfzig Seiten gerendert, weil ein ganzes Buch bei 300 dpi den Arbeitsspeicher des Geräts sprengen würde.",
      },
      {
        title: "Auflösung und Format wählen",
        description: "PNG ist die richtige Wahl für Text, Linien und Pläne, weil es scharfe Kanten sauber wiedergibt. JPG lohnt sich bei fotolastigen Seiten und liefert dort deutlich kleinere Dateien; die Qualität stellen Sie dann selbst ein.",
      },
      {
        title: "Vorschau prüfen und laden",
        description: "Unter jeder Seite stehen Abmessung und Dateigröße. Laden Sie einzelne Seiten über den Knopf daneben oder alle auf einmal — der Browser fragt je nach Einstellung einmal nach, ob er mehrere Dateien speichern darf.",
      },
    ],
    privacy:
      "Das Dokument wird ausschließlich lokal im Browser gelesen und gerendert; weder die Datei noch die erzeugten Bilder werden übertragen. Auch die Anzeige-Engine liegt auf dieser Website und nicht bei einem fremden Anbieter, sodass beim Umwandeln keine Verbindung nach außen entsteht.",
    faq: [
      {
        q: "Warum wird nur eine begrenzte Seitenzahl umgewandelt?",
        a: "Jede gerenderte Seite liegt als Bild im Arbeitsspeicher, und bei 300 dpi sind das mehrere Megabyte pro Seite. Die Grenze von fünfzig Seiten je Durchgang verhindert, dass der Browser-Tab mitten in der Arbeit abstürzt.",
      },
      {
        q: "Welche Auflösung brauche ich zum Drucken?",
        a: "300 dpi ist der übliche Wert für einen sauberen Ausdruck. Für die Anzeige am Bildschirm oder im Web sind 96 bis 150 dpi völlig ausreichend und ergeben deutlich handlichere Dateien.",
      },
      {
        q: "Warum ist der Hintergrund weiß und nicht durchsichtig?",
        a: "Eine PDF-Seite hat keinen eigenen Hintergrund. Ohne eine gesetzte weiße Fläche würden durchsichtige Bereiche in einem JPG schwarz erscheinen, deshalb wird vor dem Rendern grundsätzlich weiß gefüllt.",
      },
      {
        q: "Bleibt der Text im Bild auswählbar?",
        a: "Nein. Ein Bild besteht aus Bildpunkten, egal wie hoch die Auflösung ist. Wer den Inhalt weiterverwenden will, braucht danach eine Texterkennung.",
      },
    ],
    related: ["bilder-zu-pdf", "texterkennung"],
  },
  en: {
    intro: [
      "Sometimes a PDF is the wrong format. It cannot be dropped into a presentation, nobody's social feed will display it, and a preview on your own website needs a picture anyway. Then the reverse route helps: render the page you want as a PNG or JPG and use it like any other image.",
      "This tool renders the pages the way a viewer would show them — with fonts, vector graphics and layout, not as a crop of a screenshot. You choose the resolution: 96 dpi for the screen, 150 dpi as a good middle ground, 300 dpi when the result will be printed.",
      "The rendered pages appear as previews, each with its size and dimensions and its own download button. That way you take the one page you need instead of sorting through a folder of files, nine of which you delete again.",
    ],
    useCases: [
      {
        title: "Putting a page into a presentation",
        text: "An analysis or a plan out of a PDF lands on the slide as an image, without the detour through a blurry cropped screen capture.",
      },
      {
        title: "A preview picture for a website",
        text: "A data sheet or a menu gets a preview that visitors see before deciding whether to open the whole document.",
      },
      {
        title: "Passing on a single page",
        text: "When only one page is needed, an image is often simpler than a new PDF — the recipient sees it immediately, without opening anything.",
      },
      {
        title: "Sending a plan to the site",
        text: "An image can be displayed and zoomed in any messenger on a phone, while a PDF attachment demands an app first depending on the device.",
      },
      {
        title: "Preparing input for text recognition",
        text: "A scanned PDF only becomes usable for text recognition once the page exists as an image — this step delivers exactly that, at a suitable resolution.",
      },
    ],
    steps: [
      {
        title: "Choose the PDF",
        description: "Pick the file. It is read inside the browser; the rendering engine for it is only loaded on the first conversion, so merely opening the page does not already cost a megabyte.",
      },
      {
        title: "Narrow the pages",
        description: "Left empty, the whole document is converted. For a longer PDF an entry like 1 or 2-4 pays off — at most fifty pages are rendered per run, because a whole book at 300 dpi would exhaust the device's memory.",
      },
      {
        title: "Choose resolution and format",
        description: "PNG is the right choice for text, lines and plans, because it reproduces sharp edges cleanly. JPG pays off on photo-heavy pages and gives markedly smaller files there; you then set the quality yourself.",
      },
      {
        title: "Check the preview and download",
        description: "Dimensions and file size are shown under each page. Take individual pages with the button beside them, or all at once — depending on its settings the browser will ask once whether it may save several files.",
      },
    ],
    privacy:
      "The document is read and rendered purely locally in the browser; neither the file nor the produced images are transmitted. The rendering engine is served by this site rather than by a third party, so converting a document opens no outbound connection at all.",
    faq: [
      {
        q: "Why is the number of pages limited?",
        a: "Every rendered page sits in memory as an image, and at 300 dpi that is several megabytes per page. The limit of fifty pages per run stops the browser tab from crashing halfway through the job.",
      },
      {
        q: "Which resolution do I need for printing?",
        a: "300 dpi is the usual value for a clean print. For display on screen or on the web, 96 to 150 dpi is entirely sufficient and gives far more manageable files.",
      },
      {
        q: "Why is the background white rather than transparent?",
        a: "A PDF page has no background of its own. Without a white fill, transparent areas would come out black in a JPG, so the canvas is always filled with white before rendering.",
      },
      {
        q: "Is the text in the image still selectable?",
        a: "No. An image is made of pixels, however high the resolution. If you want to reuse the content, text recognition is the step that follows.",
      },
    ],
    related: ["bilder-zu-pdf", "texterkennung"],
  },
};

export default guide;
