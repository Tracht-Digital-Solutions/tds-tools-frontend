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
  en: {
    intro: [
      "JSON is the format programs use to send each other data today: interfaces answer in it, configuration files are written in it, and exports from inventory, shop or accounting systems often arrive in this shape. As long as everything works, you never see it. You see it precisely when something jams — and then usually as one endless line with no breaks in it.",
      "This tool turns that into readable text: it indents the structure, checks that it is valid, and on an error names the spot with a line and a column instead of merely claiming something is wrong somewhere. It also does the reverse — stripping every unnecessary space when the data needs to go back out compactly.",
      "In practice that means you can inspect an interface response yourself before passing it on, and check a rejected configuration file without guessing. The most common causes are a comma after the last entry, single instead of double quotes, and a bracket that was never closed.",
    ],
    useCases: [
      {
        title: "Making an API response readable",
        text: "An API response as a single line is useless to a human. Indented, you can see in seconds which fields are actually being delivered.",
      },
      {
        title: "Checking a rejected configuration",
        text: "When a program refuses a file, the validation shows the exact position of the syntax error rather than a generic complaint.",
      },
      {
        title: "Inspecting an export before importing it",
        text: "Before loading data into another system, check whether the structure and field names match what the target expects.",
      },
      {
        title: "Passing data on compactly",
        text: "Minified JSON saves space and transfer time — worth doing wherever the file is not read by people.",
      },
      {
        title: "Reporting an error usefully",
        text: "An indented excerpt with the failing position marked turns a vague fault report into one somebody can work with.",
      },
    ],
    steps: [
      {
        title: "Paste the JSON",
        description:
          "Drop the content into the input field — a whole file, an interface response, or just the excerpt you are asking about.",
      },
      {
        title: "Format or validate",
        description:
          "Formatting indents the structure and makes the nesting visible. If the content is invalid, the error message appears instead, with the position, line and column.",
      },
      {
        title: "Fix the failing spot",
        description:
          "Jump to the position named and check the usual suspects first: a comma after the last element, single quotes, a missing pair of brackets, or a line break in the middle of a string.",
      },
      {
        title: "Take the result",
        description:
          "Copy the indented output for onward use — or minify it first if it is going to be processed by a machine.",
      },
    ],
    privacy:
      "Processing happens entirely in your browser; the content you paste is not transmitted, not stored and not logged. With this tool that is more than a formality: JSON data regularly contains customer records, orders, access keys or prices. Pasting that into an arbitrary online form gives it away — here it never leaves your device.",
    faq: [
      {
        q: "Is my data uploaded?",
        a: "No. Formatting and validation run as JavaScript in your browser. There is no server that receives the content — you can disconnect from the network after the page loads and keep working.",
      },
      {
        q: "What does the error position mean?",
        a: "The position is the character count from the start of the text, and the line and column translate that into a spot you can find. The fault is almost always immediately before it: a character that was not expected there is usually the consequence of a forgotten comma or an open bracket further up.",
      },
      {
        q: "Why is my JSON invalid when it looks fine?",
        a: "The three most common causes are a comma after the last element of a list, single instead of double quotes, and comments. All three are legal in JavaScript and none of them are in JSON.",
      },
      {
        q: "Can I process very large files?",
        a: "Up to the low megabytes the tool handles it comfortably. Because everything runs in the browser, the limit is your device's memory — with very large exports the page slows down rather than showing an error.",
      },
      {
        q: "Does formatting change my data?",
        a: "No, only the presentation. Indentation and line breaks carry no meaning in JSON; values, order and structure are left untouched.",
      },
    ],
    related: ["kontrast-checker", "passwort-generator"],
  },
};

export default guide;
