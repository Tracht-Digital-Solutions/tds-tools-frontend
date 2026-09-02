import type { ToolGuideSet } from "~/lib/guides";

const guide: ToolGuideSet = {
  de: {
    intro: [
      "Bilder aus einer Handy- oder Systemkamera sind für das Web unnötig groß: vier bis zwölf Megabyte, mehrere tausend Pixel breit. Auf einer Website wird davon meist ein Ausschnitt von tausend Pixeln angezeigt — der Rest wird übertragen, bezahlt und dann verworfen. Auf dem Telefon im Mobilfunknetz entscheidet das darüber, ob eine Seite in einer oder in acht Sekunden steht.",
      "Dieses Werkzeug verkleinert Bilder auf eine Zielbreite und komprimiert sie mit einstellbarer Qualität. Es zeigt die neue Dateigröße im Vergleich zur alten und gibt das Ergebnis als JPEG oder WebP aus. WebP ist dabei in aller Regel die bessere Wahl: gleiche sichtbare Qualität bei spürbar kleinerer Datei, und alle aktuellen Browser verstehen es.",
      "Eine sinnvolle Faustregel für den Alltag: Zielbreite 1600 Pixel für großflächige Bilder, 800 für Bilder in Textbreite, Qualität um 80 Prozent. Damit landen die meisten Fotos zwischen 60 und 200 Kilobyte — statt bei acht Megabyte — ohne dass ein Unterschied auffällt.",
    ],
    useCases: [
      {
        title: "Bilder für die eigene Website",
        text: "Produktfotos, Referenzbilder und Teamfotos vor dem Hochladen verkleinern. Der schnellste Hebel für eine schnellere Seite.",
      },
      {
        title: "Anhänge, die durch das Postfach passen",
        text: "Viele Postfächer nehmen Anhänge nur bis zu einer bestimmten Größe an. Fünf komprimierte Fotos passen, wo zwei Originale scheitern.",
      },
      {
        title: "Fotos für Kleinanzeigen und Portale",
        text: "Verkaufsportale rechnen Bilder ohnehin herunter — oft schlechter als nötig. Wer selbst verkleinert, behält die Kontrolle über das Ergebnis.",
      },
      {
        title: "Dokumentation aus dem Betrieb",
        text: "Aufmaß-, Schadens- und Baufortschrittsfotos summieren sich schnell auf Gigabyte. Komprimiert bleiben sie lesbar und das Archiv handhabbar.",
      },
      {
        title: "Bilder für Newsletter",
        text: "Große Bilder in E-Mails werden von manchen Programmen gar nicht erst geladen und verlängern die Ladezeit auf dem Telefon deutlich.",
      },
    ],
    steps: [
      {
        title: "Bild auswählen",
        description:
          "Wählen Sie eine Datei im Format JPG, PNG oder WebP. Die Vorschau und die ursprüngliche Dateigröße erscheinen sofort.",
      },
      {
        title: "Zielbreite festlegen",
        description:
          "Geben Sie an, wie breit das Bild höchstens werden soll. Die Höhe wird im Seitenverhältnis mitgerechnet. Für die Anzeige im Web sind 1600 Pixel bei großen Bildern und 800 Pixel innerhalb von Text gute Werte.",
      },
      {
        title: "Qualität einstellen",
        description:
          "Zwischen 70 und 85 Prozent liegt der brauchbare Bereich; darunter werden Kanten und Flächen sichtbar unruhig. Die Wirkung sehen Sie unmittelbar an der neuen Dateigröße.",
      },
      {
        title: "Herunterladen",
        description:
          "Speichern Sie das Ergebnis als JPEG oder WebP. Bei Fotos ist WebP fast immer kleiner; für Grafiken mit harten Kanten oder Transparenz ist es ebenfalls die bessere Wahl.",
      },
    ],
    privacy:
      "Das Bild wird nicht hochgeladen. Es wird im Browser über ein Canvas-Element neu gezeichnet und dort komprimiert — die Datei verlässt Ihr Gerät zu keinem Zeitpunkt. Das ist der eigentliche Unterschied zu den verbreiteten Kompressionsdiensten: Dort landen Ihre Fotos auf einem fremden Server, was bei Baustellen-, Schadens- oder Personenaufnahmen nicht nur eine Geschmacksfrage ist, sondern eine datenschutzrechtliche.",
    faq: [
      {
        q: "Verliert das Bild sichtbar an Qualität?",
        a: "Bei 80 Prozent Qualität sehen die wenigsten Betrachter einen Unterschied zum Original, während die Datei um ein Vielfaches kleiner wird. Deutlich sichtbar wird die Kompression meist erst unterhalb von 60 Prozent, zuerst an weichen Farbverläufen wie einem Himmel.",
      },
      {
        q: "JPEG oder WebP?",
        a: "WebP, sofern das Zielsystem es annimmt: gleiche wahrgenommene Qualität bei etwa 25 bis 35 Prozent weniger Daten, dazu Transparenz. JPEG bleibt die sichere Wahl für ältere Programme und für Portale, die nur dieses Format akzeptieren.",
      },
      {
        q: "Werden meine Bilder auf einen Server geladen?",
        a: "Nein. Die gesamte Verarbeitung findet in Ihrem Browser statt; es gibt keine Gegenstelle, die die Datei entgegennehmen könnte. Sie können die Seite nach dem Laden vom Netz trennen und weiterarbeiten.",
      },
      {
        q: "Bleiben Aufnahmedatum und Ort erhalten?",
        a: "Nein. Beim Neuzeichnen im Browser gehen die EXIF-Daten verloren, also auch GPS-Koordinaten und Kameramodell. Für Bilder im Internet ist das ein Vorteil — wenn Sie die Angaben brauchen, bewahren Sie das Original auf.",
      },
      {
        q: "Kann ich mehrere Bilder auf einmal verarbeiten?",
        a: "Das Werkzeug arbeitet Bild für Bild. Wenn bei Ihnen regelmäßig ganze Ordner anfallen — etwa aus der Baustellendokumentation —, lässt sich das automatisieren, statt es von Hand zu wiederholen.",
      },
    ],
    related: ["pdf-werkzeuge", "qr-code-generator", "ki-kennzeichnung-bilder"],
  },
  en: {
    intro: [
      "Photos out of a phone or system camera are needlessly large for the web: four to twelve megabytes, several thousand pixels wide. A website usually displays a thousand-pixel crop of that — the rest is transferred, paid for and then discarded. On a phone over mobile data, that is the difference between a page appearing in one second and in eight.",
      "This tool scales images down to a target width and compresses them at an adjustable quality. It shows the new file size next to the old one and outputs the result as JPEG or WebP. WebP is usually the better choice: the same apparent quality at a noticeably smaller file, and every current browser understands it.",
      "A workable rule of thumb: a target width of 1600 pixels for full-width images, 800 for images inside text, and quality around 80 per cent. That puts most photos between 60 and 200 kilobytes — instead of eight megabytes — without any visible difference.",
    ],
    useCases: [
      {
        title: "Images for your own website",
        text: "Shrink product, reference and team photos before uploading. The single fastest lever for a faster site.",
      },
      {
        title: "Attachments that fit through a mailbox",
        text: "Many mailboxes only accept attachments up to a certain size. Five compressed photos fit where two originals fail.",
      },
      {
        title: "Photos for classifieds and portals",
        text: "Selling portals downscale images anyway — often worse than necessary. Doing it yourself keeps control of the result.",
      },
      {
        title: "Documentation from the field",
        text: "Measurement, damage and progress photos add up to gigabytes quickly. Compressed they stay legible and the archive stays manageable.",
      },
      {
        title: "Images for a newsletter",
        text: "Large images in email are not even loaded by some clients and noticeably lengthen the load on a phone.",
      },
    ],
    steps: [
      {
        title: "Choose an image",
        description:
          "Pick a file in JPG, PNG or WebP format. The preview and the original file size appear immediately.",
      },
      {
        title: "Set the target width",
        description:
          "State how wide the image should be at most. The height follows the aspect ratio. For display on the web, 1600 pixels for large images and 800 pixels within text are good values.",
      },
      {
        title: "Set the quality",
        description:
          "Between 70 and 85 per cent is the usable range; below that edges and flat areas become visibly restless. You can see the effect immediately in the new file size.",
      },
      {
        title: "Download",
        description:
          "Save the result as JPEG or WebP. For photographs WebP is almost always smaller; for graphics with hard edges or transparency it is the better choice too.",
      },
    ],
    privacy:
      "The image is not uploaded. It is redrawn and compressed in your browser through a canvas element — the file never leaves your device at any point. That is the real difference from the widespread compression services: there your photos land on somebody else's server, which for site, damage or personal photographs is not a matter of taste but of data protection law.",
    faq: [
      {
        q: "Does the image visibly lose quality?",
        a: "At 80 per cent quality very few viewers see any difference from the original, while the file becomes several times smaller. Compression usually only becomes clearly visible below 60 per cent, first in soft gradients such as a sky.",
      },
      {
        q: "JPEG or WebP?",
        a: "WebP, provided the target system accepts it: the same perceived quality at roughly 25 to 35 per cent fewer bytes, plus transparency. JPEG remains the safe choice for older software and for portals that only accept that format.",
      },
      {
        q: "Are my images uploaded to a server?",
        a: "No. All processing happens in your browser; there is no counterpart that could receive the file. You can disconnect from the network after the page loads and keep working.",
      },
      {
        q: "Are the capture date and location preserved?",
        a: "No. Redrawing in the browser discards the EXIF data, including GPS coordinates and camera model. For images destined for the internet that is an advantage — if you need the values, keep the original.",
      },
      {
        q: "Can I process several images at once?",
        a: "The tool works one image at a time. If whole folders regularly come up for you — from site documentation, say — that can be automated rather than repeated by hand.",
      },
    ],
    related: ["pdf-werkzeuge", "qr-code-generator", "ki-kennzeichnung-bilder"],
  },
};

export default guide;
