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
    related: ["json-formatter", "bild-komprimieren", "barrierefreiheitserklaerung-generator"],
  },
  en: {
    intro: [
      "Whether text is readable is not decided by taste but by the difference in brightness between the type and its background. The web accessibility guidelines express that as a ratio: 1:1 means identical colours, 21:1 is black on white. From 4.5:1 normal text counts as sufficiently readable, large type from 3:1 — that is level AA. If you want to be stricter, aim for AAA at 7:1.",
      "This tool calculates the ratio for a pair of colours and tells you straight away which levels pass: AA and AAA, each for normal and for large text. Enter the two colours as hex values or pick them from the colour fields.",
      "The practical value lies less in the grade than in the correction: almost every corporate grey on white fails narrowly, and almost always it is enough to pull the type a shade darker rather than rework the design. What is often forgotten matters too — every combination that actually occurs needs checking: light text on a coloured button, text over an image, the hint text inside a form field.",
    ],
    useCases: [
      {
        title: "Checking a new website before launch",
        text: "Walk through body text, headings, links and buttons once before the site goes live — afterwards every change costs more.",
      },
      {
        title: "Reusing colours from the logo",
        text: "A brand colour that looks right in a logo is often too light as type. The check shows whether a darker variant is needed.",
      },
      {
        title: "Testing buttons and notices",
        text: "White type on an action button is the most common silent failure — the button stands out, the text on it is still hard to read.",
      },
      {
        title: "Preparing for public-sector work",
        text: "Accessibility is binding for public bodies' websites. A contrast check is one of the first items in any acceptance review.",
      },
      {
        title: "Verifying a dark design",
        text: "Light type on a dark ground behaves differently from the reverse. Both variants of a page deserve to be checked separately.",
      },
    ],
    steps: [
      {
        title: "Enter the text colour",
        description:
          "Give the type colour as a hex value or pick it from the colour field. Short forms such as #fff are understood as well as the long notation.",
      },
      {
        title: "Enter the background colour",
        description:
          "What matters is the colour that genuinely sits behind the text in the finished layout — the surface of the card or the button, not the page colour behind that.",
      },
      {
        title: "Read the result",
        description:
          "The ratio appears together with four verdicts: AA and AAA, each for normal and large text. Large means from 18.66 pixels bold or from 24 pixels regular.",
      },
      {
        title: "Adjust",
        description:
          "If it falls short, change the brightness of the type colour first and leave the hue alone — the brand impression survives and the text becomes readable anyway.",
      },
    ],
    privacy:
      "The calculation runs entirely in your browser; no colour values are transmitted or stored. The tool checks the contrast ratio under WCAG 2.1 and nothing else — it is one building block of accessibility, not a certificate of it. Keyboard operability, meaningful alternative texts, labelled form fields and a coherent heading structure all belong to it as well.",
    faq: [
      {
        q: "What is the difference between AA and AAA?",
        a: "AA requires 4.5:1 for normal and 3:1 for large text, and is the level aimed at in practice. AAA requires 7:1 and 4.5:1 respectively. AAA is demanding for longer body text and is usually only required where a particularly broad readership must be reached.",
      },
      {
        q: "When does type count as large?",
        a: "From 18.66 pixels in bold or from 24 pixels at normal weight — roughly 14 and 18 point. Below that the stricter requirement for normal text applies.",
      },
      {
        q: "Does this apply to logos and images?",
        a: "Not to logos as such, which are exempt. Text set as part of an image does have to meet the requirement — and interface controls and graphics that carry information need at least 3:1 against their surroundings.",
      },
      {
        q: "My grey fails narrowly. What now?",
        a: "Reduce the brightness of the type colour and leave the hue unchanged. In most cases a few per cent is enough to move from 4.1:1 to over 4.5:1 without the overall impression visibly changing.",
      },
      {
        q: "Does my website have to be accessible?",
        a: "For public bodies in Germany it is binding. Since June 2025 the Barrierefreiheitsstärkungsgesetz has also imposed requirements on many private online offerings, in online retail for instance; micro-enterprises are partly exempt. Regardless of obligation: readable text helps everyone, including in sunlight on a phone.",
      },
    ],
    related: ["json-formatter", "bild-komprimieren", "barrierefreiheitserklaerung-generator"],
  },
};

export default guide;
