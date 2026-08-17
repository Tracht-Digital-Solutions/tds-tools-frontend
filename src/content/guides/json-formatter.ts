import type { ToolGuideSet } from "~/lib/guides";

const guide: ToolGuideSet = {
  de: {
    intro: [
      "JSON ist das Format, in dem sich Programme heute Daten schicken: Schnittstellen antworten damit, Konfigurationsdateien sind darin geschrieben, Exporte aus Warenwirtschaft, Shop oder Buchhaltung liegen oft in dieser Form vor. Solange alles funktioniert, sieht man es nie. Man sieht es genau dann, wenn etwas klemmt — und dann meist als eine einzige, endlos lange Zeile ohne Umbrüche.",
      "Dieses Werkzeug macht daraus lesbaren Text: Es rückt die Struktur ein, prüft sie auf Gültigkeit und nennt bei einem Fehler die Stelle mit Zeile und Spalte, statt nur zu behaupten, irgendwo stimme etwas nicht. Umgekehrt minimiert es auch — entfernt also alle überflüssigen Leerzeichen, wenn die Daten wieder kompakt weitergegeben werden sollen.",
      "Für den Alltag heißt das: Sie können eine Schnittstellenantwort selbst ansehen, bevor Sie sie weitergeben, und eine abgelehnte Konfigurationsdatei prüfen, ohne zu raten. Häufigste Ursachen sind ein Komma hinter dem letzten Eintrag, einfache statt doppelte Anführungszeichen und eine Klammer, die nicht geschlossen wurde.",
    ],
    useCases: [
      {
        title: "Schnittstellenantwort lesbar machen",
        text: "Eine API-Antwort als eine Zeile ist für Menschen unbrauchbar. Eingerückt sehen Sie in Sekunden, welche Felder tatsächlich geliefert werden.",
      },
      {
        title: "Abgelehnte Konfiguration prüfen",
        text: "Wenn ein Programm eine Datei nicht annimmt, zeigt die Prüfung die genaue Position des Syntaxfehlers statt einer allgemeinen Fehlermeldung.",
      },
      {
        title: "Export vor dem Import kontrollieren",
        text: "Vor dem Einspielen in ein anderes System einmal ansehen, ob Struktur und Feldnamen dem entsprechen, was das Zielsystem erwartet.",
      },
      {
        title: "Daten kompakt weitergeben",
        text: "Minimiertes JSON spart Platz und Übertragungszeit — sinnvoll überall dort, wo die Datei nicht von Menschen gelesen wird.",
      },
      {
        title: "Fehler nachvollziehbar melden",
        text: "Ein eingerückter Ausschnitt mit markierter Fehlerstelle macht aus einer vagen Störungsmeldung eine, mit der sich arbeiten lässt.",
      },
    ],
    steps: [
      {
        title: "JSON einfügen",
        description:
          "Fügen Sie den Inhalt in das Eingabefeld ein — eine ganze Datei, eine Schnittstellenantwort oder auch nur den Ausschnitt, um den es geht.",
      },
      {
        title: "Formatieren oder prüfen",
        description:
          "Das Formatieren rückt die Struktur ein und macht die Verschachtelung sichtbar. Ist der Inhalt ungültig, erscheint stattdessen die Fehlermeldung mit Position, Zeile und Spalte.",
      },
      {
        title: "Fehlerstelle beheben",
        description:
          "Springen Sie an die genannte Stelle und prüfen Sie zuerst die üblichen Verdächtigen: ein Komma nach dem letzten Element, einfache Anführungszeichen, ein fehlendes Klammerpaar oder ein Zeilenumbruch mitten in einer Zeichenkette.",
      },
      {
        title: "Ergebnis übernehmen",
        description:
          "Kopieren Sie das eingerückte Ergebnis zur Weiterverwendung — oder minimieren Sie es vorher, wenn es maschinell weiterverarbeitet wird.",
      },
    ],
    privacy:
      "Die Verarbeitung findet vollständig in Ihrem Browser statt; der eingefügte Inhalt wird nicht übertragen, nicht gespeichert und nicht protokolliert. Das ist bei diesem Werkzeug mehr als eine Formalie: In JSON-Daten stehen regelmäßig Kundendaten, Bestellungen, Zugangsschlüssel oder Preise. Wer solche Inhalte in ein beliebiges Online-Formular einfügt, gibt sie aus der Hand — hier verlassen sie das Gerät nicht.",
    faq: [
      {
        q: "Werden meine Daten hochgeladen?",
        a: "Nein. Das Formatieren und Prüfen läuft als JavaScript in Ihrem Browser. Es gibt keinen Server, der den Inhalt entgegennimmt — Sie können die Seite nach dem Laden vom Netz trennen und weiterarbeiten.",
      },
      {
        q: "Was bedeutet die Fehlermeldung mit Position?",
        a: "Die Position ist die Zeichenanzahl vom Anfang des Textes, Zeile und Spalte rechnen das in eine Stelle im Text um. Der Fehler liegt in aller Regel unmittelbar davor: Ein Zeichen, das an dieser Stelle nicht erwartet wurde, ist meist die Folge eines vergessenen Kommas oder einer offenen Klammer weiter oben.",
      },
      {
        q: "Warum ist mein JSON ungültig, obwohl es richtig aussieht?",
        a: "Die drei häufigsten Ursachen sind ein Komma hinter dem letzten Element einer Liste, einfache statt doppelter Anführungszeichen und Kommentare. Alle drei sind in JavaScript erlaubt, in JSON aber nicht.",
      },
      {
        q: "Kann ich sehr große Dateien verarbeiten?",
        a: "Bis in den Bereich einiger Megabyte arbeitet das Werkzeug problemlos. Weil alles im Browser läuft, ist die Grenze der Arbeitsspeicher Ihres Geräts — bei sehr großen Exporten wird die Seite langsam, statt eine Fehlermeldung zu zeigen.",
      },
      {
        q: "Verändert das Formatieren meine Daten?",
        a: "Nein, nur die Darstellung. Einrückungen und Zeilenumbrüche sind in JSON bedeutungslos; Werte, Reihenfolge und Struktur bleiben unangetastet.",
      },
    ],
    related: ["kontrast-checker", "passwort-generator"],
  },
};

export default guide;
