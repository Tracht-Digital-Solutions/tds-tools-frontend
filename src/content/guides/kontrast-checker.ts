import type { ToolGuideSet } from "~/lib/guides";

const guide: ToolGuideSet = {
  de: {
    intro: [
      "Ob Text lesbar ist, entscheidet nicht der Geschmack, sondern der Unterschied zwischen Schrift- und Hintergrundhelligkeit. Die Web-Richtlinien für Barrierefreiheit drücken ihn als Verhältnis aus: 1:1 bedeutet identische Farben, 21:1 ist Schwarz auf Weiß. Ab 4,5:1 gilt normaler Text als ausreichend lesbar, große Schrift ab 3:1 — das ist die Stufe AA. Wer strenger sein will, zielt auf AAA mit 7:1.",
      "Dieses Werkzeug rechnet das Verhältnis für ein Farbpaar aus und sagt Ihnen unmittelbar, welche Stufen bestanden sind: AA und AAA, jeweils für normale und für große Schrift. Sie geben die beiden Farben als Hex-Wert ein oder wählen sie über die Farbfelder.",
      "Der praktische Nutzen liegt weniger in der Note als in der Korrektur: Fast jedes Corporate-Grau auf Weiß scheitert knapp, und fast immer reicht es, die Schrift eine Spur dunkler zu ziehen, statt die Gestaltung umzuwerfen. Wichtig ist außerdem, was oft vergessen wird — geprüft wird jede Kombination, die tatsächlich vorkommt: heller Text auf einem Farbbutton, Text auf einem Bild, der Hinweistext in einem Formularfeld.",
    ],
    useCases: [
      {
        title: "Neue Website vor dem Start prüfen",
        text: "Fließtext, Überschriften, Links und Buttons einmal durchgehen, bevor die Seite live geht — später ist jede Änderung teurer.",
      },
      {
        title: "Farben aus dem Logo übernehmen",
        text: "Eine Markenfarbe, die im Logo gut aussieht, ist als Schriftfarbe oft zu hell. Die Prüfung zeigt, ob eine dunklere Variante nötig ist.",
      },
      {
        title: "Buttons und Hinweise kontrollieren",
        text: "Weiße Schrift auf einem Aktionsbutton ist der häufigste stille Durchfaller — der Button fällt auf, der Text darauf ist trotzdem schwer lesbar.",
      },
      {
        title: "Öffentliche Aufträge vorbereiten",
        text: "Für Websites öffentlicher Stellen ist Barrierefreiheit in Deutschland verbindlich. Die Kontrastprüfung ist einer der ersten Punkte jeder Abnahme.",
      },
      {
        title: "Dunkles Design gegenprüfen",
        text: "Helle Schrift auf dunklem Grund verhält sich anders als umgekehrt. Beide Varianten einer Seite gehören getrennt geprüft.",
      },
    ],
    steps: [
      {
        title: "Textfarbe eintragen",
        description:
          "Geben Sie die Schriftfarbe als Hex-Wert ein oder wählen Sie sie über das Farbfeld. Kurzformen wie #fff werden ebenso verstanden wie die lange Schreibweise.",
      },
      {
        title: "Hintergrundfarbe eintragen",
        description:
          "Entscheidend ist die Farbe, die im fertigen Layout tatsächlich hinter dem Text liegt — also die Fläche der Karte oder des Buttons, nicht die Seitenfarbe dahinter.",
      },
      {
        title: "Ergebnis ablesen",
        description:
          "Das Verhältnis erscheint zusammen mit vier Bewertungen: AA und AAA, jeweils für normale und große Schrift. Groß bedeutet ab 18,66 Pixel fett oder ab 24 Pixel regulär.",
      },
      {
        title: "Nachjustieren",
        description:
          "Reicht es nicht, verändern Sie zuerst die Helligkeit der Schriftfarbe und lassen den Farbton stehen — so bleibt der Markeneindruck erhalten und der Text wird trotzdem lesbar.",
      },
    ],
    privacy:
      "Die Berechnung läuft vollständig in Ihrem Browser; es werden keine Farbwerte übertragen oder gespeichert. Das Werkzeug prüft ausschließlich das Kontrastverhältnis nach WCAG 2.1 — es ist damit ein Baustein der Barrierefreiheit, nicht deren Nachweis. Tastaturbedienbarkeit, sinnvolle Alternativtexte, Formularbeschriftungen und eine schlüssige Überschriftenstruktur gehören ebenso dazu.",
    faq: [
      {
        q: "Was ist der Unterschied zwischen AA und AAA?",
        a: "AA verlangt 4,5:1 für normalen und 3:1 für großen Text und ist die Stufe, auf die in der Praxis abgezielt wird. AAA verlangt 7:1 beziehungsweise 4,5:1. AAA ist für längere Fließtexte anspruchsvoll und wird meist nur dort verlangt, wo eine besonders breite Leserschaft erreicht werden muss.",
      },
      {
        q: "Ab wann gilt Schrift als groß?",
        a: "Ab 18,66 Pixel in Fettschrift oder ab 24 Pixel in normaler Stärke — das entspricht etwa 14 beziehungsweise 18 Punkt. Darunter gilt die strengere Anforderung für normalen Text.",
      },
      {
        q: "Gilt das auch für Logos und Bilder?",
        a: "Für reine Logos nicht, die sind ausgenommen. Text, der als Teil eines Bildes gesetzt ist, muss die Anforderung dagegen erfüllen — und Bedienelemente sowie Grafiken, die Information tragen, brauchen mindestens 3:1 gegenüber ihrer Umgebung.",
      },
      {
        q: "Mein Grau scheitert knapp. Was tun?",
        a: "Ziehen Sie die Helligkeit der Schriftfarbe herunter und lassen Sie den Farbton unverändert. In den meisten Fällen genügen wenige Prozent, um von 4,1:1 auf über 4,5:1 zu kommen, ohne dass sich der Gesamteindruck sichtbar ändert.",
      },
      {
        q: "Muss meine Website barrierefrei sein?",
        a: "Für öffentliche Stellen ist es in Deutschland verbindlich. Seit Juni 2025 gelten über das Barrierefreiheitsstärkungsgesetz zudem Anforderungen für viele privatwirtschaftliche Online-Angebote, etwa im Onlinehandel; Kleinstunternehmen sind teilweise ausgenommen. Unabhängig von der Pflicht gilt: Lesbarer Text nutzt allen, auch bei Sonnenlicht auf dem Telefon.",
      },
    ],
    related: ["json-formatter", "bild-komprimieren"],
  },
};

export default guide;
