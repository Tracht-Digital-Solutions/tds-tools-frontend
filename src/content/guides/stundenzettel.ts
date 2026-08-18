import type { ToolGuideSet } from "~/lib/guides";

const guide: ToolGuideSet = {
  de: {
    intro: [
      "Arbeitszeiten müssen aufgezeichnet werden, und in vielen kleinen Betrieben passiert das bis heute auf einem Zettel im Fahrzeug oder in einer Tabelle, die jeden Monat neu zusammenkopiert wird. Beides funktioniert, solange niemand nachfragt — und beides ist mühsam in genau dem Moment, in dem jemand nachfragt.",
      "Dieses Werkzeug erzeugt einen Arbeitszeitnachweis für einen ganzen Monat als PDF. Sie tragen Beginn, Ende und Pause ein, die Tagesstunden und die Monatssumme werden gerechnet, und heraus kommt ein Blatt zum Ausdrucken und Unterschreiben — mit Namen, Betrieb, Monat und je einem Feld für beide Unterschriften.",
      "Damit das Ausfüllen nicht dreißigmal dasselbe ist, gibt es eine Vorbelegung: Sie geben die üblichen Zeiten einmal an, übernehmen sie für alle Werktage und ändern danach nur noch die Ausnahmen. Wochenenden bleiben leer, sind aber vorhanden — ein Samstagseinsatz muss schließlich irgendwo hin.",
    ],
    useCases: [
      {
        title: "Nachweis für Minijob und Teilzeit",
        text: "Gerade bei geringfügiger Beschäftigung wird die Aufzeichnung der täglichen Arbeitszeit erwartet, und ein sauberes Monatsblatt ist die einfachste Form davon.",
      },
      {
        title: "Stunden gegenüber dem Kunden belegen",
        text: "Bei Arbeiten nach Aufwand ist ein unterschriebener Monatsnachweis die Grundlage, auf die sich beide Seiten später berufen können.",
      },
      {
        title: "Übergabe an das Steuerbüro",
        text: "Ein PDF je Mitarbeiter und Monat lässt sich weiterreichen und ablegen, ohne dass jemand eine fremde Tabellendatei öffnen und interpretieren muss.",
      },
      {
        title: "Aushilfen und Saisonkräfte",
        text: "Wo Arbeitszeiten stark schwanken, ist ein Blatt mit allen Tagen des Monats übersichtlicher als eine Sammlung einzelner Notizen.",
      },
      {
        title: "Eigene Zeiten festhalten",
        text: "Auch wer allein arbeitet, hat am Jahresende eine belastbare Übersicht, wenn die Monate durchgehend auf demselben Blatt festgehalten wurden.",
      },
    ],
    steps: [
      {
        title: "Kopf ausfüllen",
        description: "Name, Betrieb und Monat stehen später oben auf dem Blatt. Der Monat bestimmt zugleich, wie viele Zeilen die Tabelle bekommt und welcher Wochentag auf welches Datum fällt — auch im Schaltjahr.",
      },
      {
        title: "Werktage vorbelegen",
        description: "Tragen Sie die üblichen Zeiten und die Pause ein und übernehmen Sie sie. Alle Montage bis Freitage des Monats werden damit gefüllt; Wochenenden bleiben bewusst leer, lassen sich aber einzeln ausfüllen.",
      },
      {
        title: "Abweichungen eintragen",
        description: "Ändern Sie danach nur noch die Tage, die anders liefen: Urlaub und Krankheit bleiben leer und zählen nicht mit, verkürzte Tage bekommen andere Zeiten, und in die Bemerkung passt ein kurzer Hinweis wie Urlaub oder Baustelle.",
      },
      {
        title: "Summe prüfen und erzeugen",
        description: "Unter der Tabelle stehen die Monatssumme und die Zahl der Arbeitstage. Stimmen beide, erzeugen Sie das PDF; die Unterschriftenfelder stehen am unteren Rand des Blattes bereit.",
      },
    ],
    privacy:
      "Alle Eingaben bleiben in Ihrem Browser, und das PDF entsteht ebenfalls dort; weder Namen noch Arbeitszeiten werden übertragen oder gespeichert. Arbeitszeitdaten sind Personaldaten, und ein Werkzeug, das sie zur Verarbeitung an einen Server schickt, wäre für diesen Zweck die falsche Wahl.",
    faq: [
      {
        q: "Ersetzt das Blatt eine Zeiterfassung?",
        a: "Es ist ein Nachweis, kein System: Es hält fest, was eingetragen wurde, und liefert eine unterschreibbare Fassung davon. Für laufende Erfassung mit Projektbezug ist eine richtige Zeiterfassung der bessere Weg.",
      },
      {
        q: "Wie werden Pausen behandelt?",
        a: "Die Pause wird in Minuten eingetragen und von der Spanne zwischen Beginn und Ende abgezogen. Die gesetzlichen Mindestpausen prüft das Werkzeug nicht — die Verantwortung dafür bleibt beim Betrieb.",
      },
      {
        q: "Was passiert bei einer Schicht über Mitternacht?",
        a: "Endet die Schicht vor ihrem Beginn, wird sie als über Mitternacht laufend gerechnet und ergibt korrekt positive Stunden. Ein negativer Tag käme sonst in die Monatssumme und würde dort unbemerkt bleiben.",
      },
      {
        q: "Bleiben meine Eingaben erhalten, wenn ich die Seite neu lade?",
        a: "Nein, die Angaben stehen nur im geöffneten Tab. Erzeugen Sie das PDF, bevor Sie die Seite verlassen — die fertige Datei ist die Fassung, die bleibt.",
      },
    ],
    related: ["etiketten-drucken", "pdf-werkzeuge"],
  },
  en: {
    intro: [
      "Working time has to be recorded, and in plenty of small businesses that still happens on a note in the van or in a spreadsheet copied together afresh each month. Both work as long as nobody asks — and both are painful at exactly the moment somebody does.",
      "This tool produces a record of working time for a whole month as a PDF. You enter the start, the end and the break, the daily hours and the monthly total are worked out, and out comes a sheet to print and sign — with the name, the employer, the month and a field for each of the two signatures.",
      "So that filling it in is not the same thing thirty times over, there is a prefill: you state the usual times once, apply them to every weekday, and then change only the exceptions. Weekends stay empty but are present — a Saturday call-out has to go somewhere after all.",
    ],
    useCases: [
      {
        title: "A record for part-time and casual work",
        text: "For marginal employment in particular the daily working time is expected to be recorded, and a clean monthly sheet is the simplest form of that.",
      },
      {
        title: "Evidencing hours to a client",
        text: "For work charged by time spent, a signed monthly record is the basis both sides can point to later on.",
      },
      {
        title: "Handing over to the accountant",
        text: "One PDF per person and month can be passed on and filed without anybody having to open and interpret somebody else's spreadsheet.",
      },
      {
        title: "Temporary and seasonal staff",
        text: "Where hours vary a lot, one sheet holding every day of the month is clearer than a collection of separate notes.",
      },
      {
        title: "Recording your own hours",
        text: "Even working alone, you end the year with a defensible overview if the months were recorded consistently on the same sheet.",
      },
    ],
    steps: [
      {
        title: "Fill in the header",
        description: "The name, the employer and the month appear at the top of the sheet later on. The month also decides how many rows the table gets and which weekday falls on which date — in a leap year too.",
      },
      {
        title: "Prefill the weekdays",
        description: "Enter the usual times and the break and apply them. Every Monday to Friday of the month is filled in; weekends are deliberately left empty but can be filled in individually.",
      },
      {
        title: "Enter the exceptions",
        description: "Then change only the days that went differently: holidays and sickness stay empty and do not count, shorter days get other times, and a brief note such as holiday or site work fits in the note column.",
      },
      {
        title: "Check the total and create",
        description: "Under the table sit the monthly total and the number of working days. When both look right, create the PDF; the signature fields are waiting at the bottom of the sheet.",
      },
    ],
    privacy:
      "Every entry stays in your browser and the PDF is produced there too; neither names nor working times are transmitted or stored. Working-time data is personnel data, and a tool that sent it to a server for processing would be the wrong choice for this job.",
    faq: [
      {
        q: "Does this replace a time-tracking system?",
        a: "It is a record, not a system: it holds what was entered and produces a signable version of it. For ongoing tracking tied to projects, proper time tracking is the better route.",
      },
      {
        q: "How are breaks handled?",
        a: "The break is entered in minutes and deducted from the span between start and end. The tool does not check statutory minimum breaks — that responsibility stays with the employer.",
      },
      {
        q: "What happens with a shift over midnight?",
        a: "If the shift ends before it starts, it is treated as running past midnight and correctly yields positive hours. A negative day would otherwise enter the monthly total and go unnoticed there.",
      },
      {
        q: "Are my entries kept if I reload the page?",
        a: "No, they live only in the open tab. Create the PDF before leaving the page — the finished file is the version that lasts.",
      },
    ],
    related: ["etiketten-drucken", "pdf-werkzeuge"],
  },
};

export default guide;
