import type { ToolGuideSet } from "~/lib/guides";

const guide: ToolGuideSet = {
  de: {
    intro: [
      "Ein QR-Code ist nichts weiter als eine Adresse in Bildform. Wer ihn mit der Handykamera erfasst, landet direkt auf Ihrer Website, im WLAN Ihres Betriebs oder mit Ihren Kontaktdaten im Adressbuch — ohne dass jemand etwas abtippen muss. Genau da liegt der praktische Nutzen: Jede Ziffer, die ein Kunde selbst eingeben soll, ist eine Gelegenheit, sich zu vertippen und aufzugeben.",
      "Dieser Generator erzeugt vier Arten von Codes: freie URLs und Texte, WLAN-Zugänge und Kontaktdaten als vCard. Sie können Vorder- und Hintergrundfarbe an Ihr Erscheinungsbild anpassen und das Ergebnis als PNG für den Druck oder als SVG für die skalierbare Weiterverarbeitung herunterladen.",
      "Wichtig zu wissen: Der Code enthält das Ziel unmittelbar — er ist keine Weiterleitung über einen fremden Dienst. Das bedeutet, dass er dauerhaft funktioniert, aber auch, dass sich das Ziel nachträglich nicht ändern lässt. Wenn Sie damit rechnen, die Adresse später zu wechseln, verweisen Sie besser auf eine eigene Seite, deren Inhalt Sie selbst anpassen können.",
    ],
    useCases: [
      {
        title: "Gäste-WLAN ohne Zettel",
        text: "Der WLAN-Code hinterlegt Netzname und Passwort. Gäste verbinden sich mit einem Scan, statt ein 20-stelliges Passwort von einem Aushang abzuschreiben.",
      },
      {
        title: "Speisekarte, Preisliste, Anleitung",
        text: "Ein Code am Tisch, am Regal oder auf der Maschine führt zur aktuellen Fassung — und Sie tauschen künftig die Seite aus statt des Aufstellers.",
      },
      {
        title: "Visitenkarte, die im Adressbuch landet",
        text: "Der vCard-Code überträgt Name, Firma, Telefon und E-Mail in einem Zug. Deutlich zuverlässiger, als eine Karte später abzutippen.",
      },
      {
        title: "Flyer und Anzeigen messbar machen",
        text: "Zeigt der Code auf einen Link mit UTM-Parametern, sehen Sie in Ihrer Statistik, wie viele Besucher tatsächlich aus dem Print gekommen sind.",
      },
      {
        title: "Formulare am Fahrzeug oder auf der Baustelle",
        text: "Ein Aufkleber mit Code führt direkt zum Schadens-, Abnahme- oder Kontaktformular, ohne dass jemand die Adresse kennt.",
      },
    ],
    steps: [
      {
        title: "Art des Codes wählen",
        description:
          "Entscheiden Sie zwischen URL beziehungsweise freiem Text, WLAN-Zugang und Kontaktdaten. Die Eingabefelder darunter richten sich nach dieser Auswahl.",
      },
      {
        title: "Inhalt eintragen",
        description:
          "Tragen Sie die Zieladresse ein — bei einer Website vollständig mit https://. Beim WLAN kommen Netzname und Passwort dazu, bei der vCard Name, Firma, Telefon und E-Mail.",
      },
      {
        title: "Farben anpassen",
        description:
          "Vorder- und Hintergrundfarbe lassen sich an Ihr Erscheinungsbild angleichen. Achten Sie auf deutlichen Unterschied zwischen beiden: Ein zu heller Code wird von vielen Kameras nicht erkannt.",
      },
      {
        title: "Prüfen und herunterladen",
        description:
          "Scannen Sie den Code einmal mit dem eigenen Telefon, bevor Sie ihn in den Druck geben. Danach als PNG für Papier oder als SVG für skalierbare Layouts speichern.",
      },
    ],
    privacy:
      "Der Code entsteht vollständig in Ihrem Browser. Weder die Zieladresse noch Ihr WLAN-Passwort oder Ihre Kontaktdaten werden an einen Server übertragen oder gespeichert — das Werkzeug hat gar keine Gegenstelle, an die es etwas senden könnte. Sie können die Seite nach dem Laden vom Netz nehmen und trotzdem weiterarbeiten. Bei einem WLAN-Passwort ist das kein akademischer Unterschied: Viele Online-Generatoren senden genau diese Eingabe zur Erzeugung an ihren Server.",
    faq: [
      {
        q: "Läuft der QR-Code irgendwann ab?",
        a: "Nein. Der Code enthält das Ziel direkt und ist nicht an einen Dienst gebunden, der ihn auflösen müsste. Er funktioniert, solange die Zieladresse erreichbar ist. Genau deshalb lässt sich das Ziel aber auch nicht nachträglich ändern.",
      },
      {
        q: "PNG oder SVG — was soll ich nehmen?",
        a: "PNG für alles, was in fester Größe gedruckt oder eingefügt wird. SVG, wenn der Code noch vergrößert wird, etwa für ein Plakat oder eine Fahrzeugbeschriftung: Ein SVG bleibt in jeder Größe scharf, ein PNG wird beim Hochskalieren unsauber.",
      },
      {
        q: "Wie groß muss ein gedruckter QR-Code sein?",
        a: "Als Faustregel gilt ein Zehntel des Leseabstands: Wer aus einem Meter Entfernung scannt, braucht etwa zehn Zentimeter Kantenlänge. Lassen Sie außerdem einen weißen Rand von der Breite mehrerer Module stehen — ohne diese Ruhezone finden viele Kameras den Code nicht.",
      },
      {
        q: "Warum wird mein Code nicht erkannt?",
        a: "Meist liegt es am Kontrast oder am fehlenden Rand. Der Vordergrund muss deutlich dunkler sein als der Hintergrund, invertierte Codes lesen viele Kameras nicht. Auch sehr lange Inhalte machen das Muster feiner und damit schwerer erkennbar — kürzen Sie die Adresse, wenn möglich.",
      },
      {
        q: "Kann ich damit Codes für Kunden erstellen?",
        a: "Ja, das Werkzeug ist kostenlos und ohne Anmeldung nutzbar, auch geschäftlich. Wenn Sie regelmäßig viele Codes brauchen oder sie aus eigenen Daten erzeugen wollen, lässt sich das automatisieren — sprechen Sie mich an.",
      },
    ],
    related: ["utm-link-generator", "bild-komprimieren"],
  },
};

export default guide;
