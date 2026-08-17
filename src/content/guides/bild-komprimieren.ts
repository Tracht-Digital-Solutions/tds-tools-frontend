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
    related: ["pdf-werkzeuge", "qr-code-generator"],
  },
};

export default guide;
