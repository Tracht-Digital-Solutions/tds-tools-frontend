import type { ToolGuideSet } from "~/lib/guides";

const guide: ToolGuideSet = {
  de: {
    intro: [
      "PDF ist das Format, in dem Angebote, Rechnungen, Lieferscheine und Nachweise durch den Betrieb wandern. Genau deshalb fallen ständig kleine Handgriffe an: drei Scans zu einem Dokument zusammenfassen, aus einem zwanzigseitigen Vertrag die zwei relevanten Seiten herauslösen, eine quer eingezogene Seite geraderücken.",
      "Diese Werkzeuge erledigen genau das — zusammenführen, aufteilen und drehen. Beim Zusammenführen bestimmen Sie die Reihenfolge, beim Aufteilen geben Sie einen Seitenbereich wie 1-3,5 an, und das Drehen wirkt auf die gewählten Seiten. Das Ergebnis laden Sie unmittelbar als neue Datei herunter.",
      "Der übliche Weg für diese Aufgaben führt über einen der großen Online-Dienste — und damit über einen Upload. Bei einem Angebot mit Preisen, einer Rechnung mit Bankverbindung oder einer Personalakte ist das der Punkt, an dem es aufhört, eine reine Bequemlichkeitsfrage zu sein. Hier bleibt die Datei auf Ihrem Gerät.",
    ],
    useCases: [
      {
        title: "Scans zu einem Dokument bündeln",
        text: "Der Einzug liefert Seite für Seite eine eigene Datei. Zusammengeführt entsteht daraus ein Dokument, das sich versenden und ablegen lässt.",
      },
      {
        title: "Nur die relevanten Seiten weitergeben",
        text: "Aus einem umfangreichen Vertrag oder Prüfbericht den Auszug lösen, der den Empfänger tatsächlich etwas angeht.",
      },
      {
        title: "Quer eingezogene Seiten geraderücken",
        text: "Eine gedrehte Seite macht ein Dokument unlesbar und beim Ausdruck unbrauchbar. Drehen, speichern, fertig.",
      },
      {
        title: "Angebot und Anlagen als eine Datei",
        text: "Anschreiben, Leistungsverzeichnis und Datenblätter in der richtigen Reihenfolge zusammenlegen, statt fünf Anhänge zu verschicken.",
      },
      {
        title: "Unterlagen für die Buchhaltung",
        text: "Belege eines Vorgangs zu einer Datei zusammenfassen, bevor sie in die Ablage oder zur Steuerberatung gehen.",
      },
    ],
    steps: [
      {
        title: "Werkzeug wählen",
        description:
          "Entscheiden Sie zwischen Zusammenführen, Aufteilen und Drehen. Die Eingabefelder richten sich nach dieser Wahl.",
      },
      {
        title: "Dateien auswählen",
        description:
          "Zum Zusammenführen wählen Sie mindestens zwei PDFs; die Reihenfolge der Auswahl ist die Reihenfolge im Ergebnis. Für das Aufteilen und Drehen genügt eine Datei.",
      },
      {
        title: "Seitenbereich angeben",
        description:
          "Beim Aufteilen tragen Sie die gewünschten Seiten ein, etwa 1-3,5 für die ersten drei Seiten und die fünfte. Beim Drehen wählen Sie den Winkel für die betroffenen Seiten.",
      },
      {
        title: "Ausführen und herunterladen",
        description:
          "Das Ergebnis wird im Browser erzeugt und sofort als neue Datei angeboten. Die Ausgangsdateien bleiben unverändert.",
      },
    ],
    privacy:
      "Die PDFs werden nicht hochgeladen. Sie werden im Browser gelesen und dort neu geschrieben; keine Seite und keine Datei verlässt Ihr Gerät. Bei Dokumenten aus dem Geschäftsbetrieb ist das der eigentliche Grund, dieses Werkzeug einem der großen Online-Dienste vorzuziehen: Wer ein Angebot, eine Rechnung oder eine Personalakte auf einen fremden Server lädt, verarbeitet damit personenbezogene oder vertrauliche Daten außerhalb des eigenen Hauses — mit allem, was daran hängt.",
    faq: [
      {
        q: "Werden meine Dokumente hochgeladen?",
        a: "Nein. Die Verarbeitung läuft vollständig im Browser; es gibt keinen Server, der die Datei entgegennimmt. Das gilt für alle drei Funktionen gleichermaßen.",
      },
      {
        q: "Wie gebe ich einen Seitenbereich an?",
        a: "Einzelne Seiten trennen Sie mit Komma, zusammenhängende Bereiche mit Bindestrich. 1-3,5 bedeutet also die Seiten eins bis drei und zusätzlich die Seite fünf. Die Reihenfolge im Ergebnis entspricht der Reihenfolge im Original.",
      },
      {
        q: "Bleibt die Qualität erhalten?",
        a: "Ja. Die Seiten werden übernommen, nicht neu gerendert — Text bleibt Text, eingebettete Schriften und Auflösung bleiben unverändert. Es findet keine Kompression statt.",
      },
      {
        q: "Funktionieren passwortgeschützte PDFs?",
        a: "Verschlüsselte Dateien lassen sich nicht verarbeiten. Entfernen Sie den Schutz vorher im Programm, mit dem die Datei erstellt wurde, oder speichern Sie eine ungeschützte Fassung.",
      },
      {
        q: "Warum ist dieses Werkzeug kostenpflichtig?",
        a: "Die frei zugänglichen Werkzeuge auf dieser Seite finanzieren sich über Werbung. Die PDF-Werkzeuge kommen ohne Werbung aus und sind stattdessen einmalig freizuschalten — bei Dokumenten aus dem Geschäftsbetrieb ist eine werbefreie, rein lokale Verarbeitung der ehrlichere Handel.",
      },
    ],
    related: ["bild-komprimieren", "json-formatter"],
  },
};

export default guide;
