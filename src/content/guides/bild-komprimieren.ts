import type { ToolGuideSet } from "~/lib/guides";

const guide: ToolGuideSet = {
  updatedAt: "2026-10-21",
  de: {
    intro: [
      "Bilder aus einer Handy- oder Systemkamera sind für das Web unnötig groß: vier bis zwölf Megabyte, mehrere tausend Pixel breit. Auf einer Website wird davon meist ein Ausschnitt von tausend Pixeln angezeigt — der Rest wird übertragen, bezahlt und dann verworfen. Auf dem Telefon im Mobilfunknetz entscheidet das darüber, ob eine Seite in einer oder in acht Sekunden steht.",
      "Dieses Werkzeug komprimiert Bilder und verkleinert JPG-Dateien, ohne sie irgendwo hochzuladen. Mehrere Fotos lassen sich auf einmal auswählen oder in das Feld ziehen; dazu kommen eine maximale Breite und Höhe in Pixeln und das Ausgabeformat JPG, WebP, PNG oder — in aktuellen Browsern — AVIF. Muss eine feste Grenze eingehalten werden, etwa höchstens 500 KB für ein Bewerbungsportal, genügt eine Zielgröße: Die Qualität wird dann automatisch gerade so weit gesenkt, bis die Datei passt.",
      "Für die Bildkomprimierung im Alltag gilt eine einfache Faustregel: Zielbreite 1600 Pixel für großflächige Bilder, 800 für Bilder in Textbreite, Qualität um 80 Prozent. Damit landen die meisten Fotos zwischen 60 und 300 Kilobyte — statt bei acht Megabyte — ohne dass ein Unterschied auffällt. Den größten Anteil daran hat übrigens das Verkleinern der Pixelmaße, nicht die Qualitätsstufe.",
    ],
    useCases: [
      {
        title: "Bilder für die eigene Website",
        text: "Produktfotos, Referenzbilder und Teamfotos vor dem Hochladen verkleinern. Der schnellste Hebel für eine schnellere Seite und bessere Werte bei den Core Web Vitals.",
      },
      {
        title: "Uploads mit Größenlimit",
        text: "Bewerbungsportale, Behördenformulare und Ticketsysteme nehmen oft nur Dateien bis 500 KB oder 1 MB an. Mit einer Zielgröße passt das Foto beim ersten Versuch.",
      },
      {
        title: "Anhänge, die durch das Postfach passen",
        text: "Viele Postfächer nehmen Anhänge nur bis zu einer bestimmten Größe an. Zehn komprimierte Fotos passen, wo zwei Originale scheitern — gesammelt als eine ZIP-Datei.",
      },
      {
        title: "Fotos für Kleinanzeigen und Portale",
        text: "Verkaufsportale rechnen Bilder ohnehin herunter — oft schlechter als nötig. Wer selbst verkleinert, behält die Kontrolle über Ausschnitt und Schärfe.",
      },
      {
        title: "Dokumentation aus dem Betrieb",
        text: "Aufmaß-, Schadens- und Baufortschrittsfotos summieren sich schnell auf Gigabyte. Stapelweise komprimiert bleiben sie lesbar und das Archiv handhabbar.",
      },
      {
        title: "Bilder für Newsletter",
        text: "Große Bilder in E-Mails werden von manchen Programmen gar nicht erst geladen und verlängern die Ladezeit auf dem Telefon deutlich.",
      },
    ],
    steps: [
      {
        title: "Bilder auswählen",
        description:
          "Eine oder mehrere Dateien im Format JPG, PNG, WebP, AVIF oder GIF auswählen, in das Feld ziehen oder einen Screenshot mit Strg+V einfügen. Jede Datei erscheint mit ihrer Größe und ihren Pixelmaßen.",
      },
      {
        title: "Voreinstellung wählen oder Maße festlegen",
        description:
          "Die Voreinstellungen Website, E-Mail, Social Media und Vorschaubild füllen Format, Qualität und Maße passend aus. Alternativ lassen sich maximale Breite und Höhe in Pixeln selbst festlegen; das Seitenverhältnis bleibt erhalten, kleinere Bilder werden nie vergrößert.",
      },
      {
        title: "Qualität oder Zielgröße einstellen",
        description:
          "Zwischen 70 und 85 Prozent Qualität liegt der brauchbare Bereich; darunter werden Kanten und Flächen sichtbar unruhig. Muss die Datei unter eine feste Grenze, kommt die Zielgröße in KB ins Feld — das Werkzeug senkt die Qualität und notfalls die Pixelmaße, bis sie passt.",
      },
      {
        title: "Komprimieren und vergleichen",
        description:
          "Ein Klick auf „Komprimieren“ verarbeitet alle Bilder nacheinander. Neben jeder Datei stehen alte und neue Größe samt Ersparnis; unter „Vorher und nachher vergleichen“ stehen beide Fassungen nebeneinander.",
      },
      {
        title: "Herunterladen",
        description:
          "Jedes Bild lässt sich einzeln speichern, alle zusammen als ZIP-Datei. Der ursprüngliche Dateiname bleibt erhalten und bekommt den Zusatz „-komprimiert“, damit nichts versehentlich überschrieben wird.",
      },
    ],
    privacy:
      "Die Bilder werden nicht hochgeladen. Der Browser zeichnet sie über ein Canvas-Element neu und komprimiert sie dort, und auch die ZIP-Datei entsteht auf dem eigenen Gerät — die Fotos verlassen es zu keinem Zeitpunkt. Das ist der eigentliche Unterschied zu den verbreiteten Kompressionsdiensten: Dort landen die Aufnahmen auf einem fremden Server, was bei Baustellen-, Schadens- oder Personenaufnahmen nicht nur eine Geschmacksfrage ist, sondern eine datenschutzrechtliche.",
    faq: [
      {
        q: "Wie verkleinere ich die Größe einer JPG-Datei?",
        a: "Bild auswählen, Format JPEG lassen, eine maximale Breite von etwa 1600 Pixeln und eine Qualität um 80 Prozent einstellen, dann auf „Komprimieren“ klicken. Ein typisches Handyfoto schrumpft so von vier bis acht Megabyte auf 200 bis 400 Kilobyte. Den größten Effekt hat das Verkleinern der Pixelmaße.",
      },
      {
        q: "Kann ich ein Bild auf eine bestimmte Größe in KB komprimieren?",
        a: "Ja. Unter „Zielgröße (KB)“ kommt die Grenze hinein, zum Beispiel 200 oder 500. Das Werkzeug sucht die höchste Qualität, mit der die Datei darunter bleibt, und verkleinert erst danach die Pixelmaße. Ist die Grenze selbst so nicht erreichbar, entsteht die kleinstmögliche Datei, zusammen mit einem Hinweis.",
      },
      {
        q: "Kann ich mehrere Bilder gleichzeitig komprimieren?",
        a: "Ja. Beliebig viele Dateien lassen sich auswählen oder als ganzer Stapel hineinziehen; alle werden mit denselben Einstellungen verarbeitet und lassen sich gesammelt als ZIP herunterladen. Fallen in einem Betrieb regelmäßig ganze Ordner an, lässt sich das auch dauerhaft automatisieren.",
      },
      {
        q: "Was ist der Unterschied zwischen Bild komprimieren und Bildgröße ändern?",
        a: "Die Bildgröße in Pixeln bestimmt, wie viele Bildpunkte gespeichert werden; die Komprimierung bestimmt, wie sparsam jeder davon gespeichert wird. Ein Foto von 4000 auf 1600 Pixel Breite zu verkleinern, spart schon rund vier Fünftel der Daten. Die Qualitätsstufe holt danach den Rest heraus.",
      },
      {
        q: "Verliert das Bild sichtbar an Qualität?",
        a: "Bei 80 Prozent Qualität sehen die wenigsten Betrachter einen Unterschied zum Original, während die Datei um ein Vielfaches kleiner wird. Deutlich sichtbar wird die Kompression meist erst unterhalb von 60 Prozent, zuerst an weichen Farbverläufen wie einem Himmel. Der Vorher-nachher-Vergleich zeigt es direkt.",
      },
      {
        q: "JPEG, WebP, PNG oder AVIF?",
        a: "Für Websites WebP oder AVIF: gleiche wahrgenommene Qualität bei deutlich weniger Daten, dazu Transparenz. JPEG bleibt die sichere Wahl für E-Mail, ältere Programme und Portale, die nur JPG annehmen. PNG ist verlustfrei und eignet sich für Grafiken, Logos und Screenshots — kleiner wird es nur über die Pixelmaße.",
      },
      {
        q: "Werden meine Bilder auf einen Server geladen?",
        a: "Nein. Die gesamte Verarbeitung findet im Browser statt; es gibt keine Gegenstelle, die die Dateien entgegennehmen könnte. Nach dem Laden funktioniert die Seite auch ohne Netz weiter.",
      },
      {
        q: "Bleiben Aufnahmedatum und Ort erhalten?",
        a: "Nein. Beim Neuzeichnen im Browser gehen die EXIF-Daten verloren, also auch GPS-Koordinaten und Kameramodell. Für Bilder im Internet ist das ein Vorteil — wer die Angaben braucht, bewahrt das Original auf.",
      },
    ],
    related: ["pdf-komprimieren", "bilder-zu-pdf", "pdf-werkzeuge", "ki-kennzeichnung-bilder"],
  },
  en: {
    intro: [
      "Photos out of a phone or system camera are needlessly large for the web: four to twelve megabytes, several thousand pixels wide. A website usually displays a thousand-pixel crop of that — the rest is transferred, paid for and then discarded. On a phone over mobile data, that is the difference between a page appearing in one second and in eight.",
      "This tool compresses images and reduces the file size of JPGs without uploading them anywhere. Pick several photos at once or drag them in, set a maximum width and height in pixels, and save the result as JPG, WebP, PNG or — in current browsers — AVIF. If you have to stay under a fixed limit, say 500 KB for an application portal, enter a target size: quality is then lowered automatically just far enough for the file to fit.",
      "A workable rule of thumb for everyday image compression: a target width of 1600 pixels for full-width images, 800 for images inside text, and quality around 80 per cent. That puts most photos between 60 and 300 kilobytes — instead of eight megabytes — without any visible difference. Most of that saving, incidentally, comes from reducing the pixel dimensions, not from the quality setting.",
    ],
    useCases: [
      {
        title: "Images for your own website",
        text: "Shrink product, reference and team photos before uploading. The single fastest lever for a faster site and better Core Web Vitals.",
      },
      {
        title: "Uploads with a size limit",
        text: "Application portals, government forms and ticket systems often accept files only up to 500 KB or 1 MB. With a target size the photo fits on the first try.",
      },
      {
        title: "Attachments that fit through a mailbox",
        text: "Many mailboxes only accept attachments up to a certain size. Ten compressed photos fit where two originals fail — bundled as one ZIP file.",
      },
      {
        title: "Photos for classifieds and portals",
        text: "Selling portals downscale images anyway — often worse than necessary. Doing it yourself keeps control of crop and sharpness.",
      },
      {
        title: "Documentation from the field",
        text: "Measurement, damage and progress photos add up to gigabytes quickly. Compressed in batches they stay legible and the archive stays manageable.",
      },
      {
        title: "Images for a newsletter",
        text: "Large images in email are not even loaded by some clients and noticeably lengthen the load on a phone.",
      },
    ],
    steps: [
      {
        title: "Choose images",
        description:
          "Pick one or more files in JPG, PNG, WebP, AVIF or GIF format, drag them into the box, or paste a screenshot with Ctrl+V. Each file appears with its size and pixel dimensions.",
      },
      {
        title: "Pick a preset or set the dimensions",
        description:
          "The Website, Email, Social media and Thumbnail presets fill in format, quality and dimensions. Or set a maximum width and height in pixels yourself; the aspect ratio is kept and smaller images are never enlarged.",
      },
      {
        title: "Set the quality or a target size",
        description:
          "Between 70 and 85 per cent quality is the usable range; below that edges and flat areas become visibly restless. If the file must stay under a fixed limit, enter the target size in KB — the tool lowers quality and, if needed, the pixel dimensions until it fits.",
      },
      {
        title: "Compress and compare",
        description:
          "One click on “Compress” processes every image in turn. Each file shows its old and new size with the saving; “Compare before and after” puts both versions side by side.",
      },
      {
        title: "Download",
        description:
          "Save each image on its own or all of them together as a ZIP file. The original file name is kept and gets the suffix “-compressed”, so nothing is overwritten by accident.",
      },
    ],
    privacy:
      "The images are not uploaded. They are redrawn and compressed in your browser through a canvas element, and the ZIP file is assembled on your device too — the photos never leave it at any point. That is the real difference from the widespread compression services: there your pictures land on somebody else's server, which for site, damage or personal photographs is not a matter of taste but of data protection law.",
    faq: [
      {
        q: "How do I reduce the file size of a JPG?",
        a: "Choose the image, leave the format on JPEG, set a maximum width of about 1600 pixels and quality around 80 per cent, then click “Compress”. A typical phone photo shrinks from four to eight megabytes to 200 to 400 kilobytes. Reducing the pixel dimensions has the largest effect.",
      },
      {
        q: "Can I compress an image to a specific size in KB?",
        a: "Yes. Enter the limit under “Target size (KB)”, for example 200 or 500. The tool searches for the highest quality that keeps the file below it and only then reduces the pixel dimensions. If even that cannot reach the limit, you get the smallest possible file and a notice.",
      },
      {
        q: "Can I compress several images at once?",
        a: "Yes. Select as many files as you like or drag in a whole batch; all of them are processed with the same settings and can be downloaded together as a ZIP. If whole folders come up regularly for you, that can also be automated for good.",
      },
      {
        q: "What is the difference between compressing an image and resizing it?",
        a: "The pixel size decides how many dots are stored; compression decides how economically each of them is stored. Reducing a photo from 4000 to 1600 pixels wide already saves about four fifths of the data. The quality setting then takes care of the rest.",
      },
      {
        q: "Does the image visibly lose quality?",
        a: "At 80 per cent quality very few viewers see any difference from the original, while the file becomes several times smaller. Compression usually only becomes clearly visible below 60 per cent, first in soft gradients such as a sky. The before-and-after view shows you directly.",
      },
      {
        q: "JPEG, WebP, PNG or AVIF?",
        a: "For websites WebP or AVIF: the same perceived quality at noticeably fewer bytes, plus transparency. JPEG remains the safe choice for email, older software and portals that only accept JPG. PNG is lossless and suits graphics, logos and screenshots — it only gets smaller through its pixel dimensions.",
      },
      {
        q: "Are my images uploaded to a server?",
        a: "No. All processing happens in your browser; there is no counterpart that could receive the files. You can disconnect from the network after the page loads and keep working.",
      },
      {
        q: "Are the capture date and location preserved?",
        a: "No. Redrawing in the browser discards the EXIF data, including GPS coordinates and camera model. For images destined for the internet that is an advantage — if you need the values, keep the original.",
      },
    ],
    related: ["pdf-komprimieren", "bilder-zu-pdf", "pdf-werkzeuge", "ki-kennzeichnung-bilder"],
  },
};

export default guide;
