import type { ToolGuideSet } from "~/lib/guides";

/**
 * The nineteenth guide, and the reason this file exists at all: until
 * 2026-10-02 `visitenkarten-designer` was the one composed tool without one,
 * so its page carried a heading, a lede and the tool — and emitted neither
 * `HowTo` nor `FAQPage` while the other eighteen did.
 *
 * The steps below match the island's own labels (`Inhalt`, `Aussehen`,
 * `Vorschau`, `Als PNG herunterladen`, `Zurücksetzen`) because they become
 * `HowTo` and a structured step that names a control the page does not show is
 * worse than no step. The print caveat is checked against `card.ts`:
 * `PRINT_SCALE = 300 / 25.4` on a 85 × 55 mm card, and `canvasSize` pads only
 * for the shadow — there is no bleed and there are no crop marks.
 */
const guide: ToolGuideSet = {
  updatedAt: "2026-10-02",
  de: {
    intro: [
      "Der Visitenkarten-Designer entwirft eine Visitenkarte im Browser: Sie tragen Name, Position, Firma und Kontaktdaten ein, wählen Farbe, Fläche, Ecken, Schatten und Aufteilung, und sehen das Ergebnis sofort in der Vorschau. Heraus kommt ein PNG im Format 85 × 55 mm mit 300 dpi — der Auflösung, die eine Druckerei für eine Karte dieser Größe erwartet.",
      "Gedacht ist das für den Fall, in dem eine Karte schnell gebraucht wird und niemand ein Layoutprogramm öffnen will: eine neue Mitarbeiterin, eine Messe in zwei Wochen, ein Betrieb ohne Hausgestaltung. Sie sehen beim Tippen, wie die Karte aussieht, statt eine Vorlage auszufüllen und auf die Korrektur zu warten.",
      "Eine Einschränkung vorweg, damit es keine Überraschung beim Druck gibt: Die Datei ist ein PNG in Endformat — ohne Anschnitt und ohne Schnittmarken. Online-Druckdienste, die PNG oder JPG annehmen, verarbeiten das direkt. Eine Druckerei, die eine PDF mit 3 mm Anschnitt verlangt, wird nachfragen. Wenn Sie eine randabfallende Fläche drucken wollen, ist das der Punkt, an dem ein Layoutprogramm beziehungsweise ein Gestalter die bessere Wahl ist.",
    ],
    useCases: [
      {
        title: "Neue Kollegin, Karte am selben Tag",
        text: "Name und Position ändern, Rest stehen lassen, herunterladen. Die Karte sieht aus wie die der anderen, weil Fläche, Ecken und Akzentfarbe dieselben bleiben.",
      },
      {
        title: "Messe oder Markt in zwei Wochen",
        text: "Eine Karte, die zum Stand passt, ohne Abstimmungsschleife. Für kleine Auflagen bei einem Online-Druckdienst reicht das PNG in Druckauflösung.",
      },
      {
        title: "Betrieb ohne festgelegtes Erscheinungsbild",
        text: "Die vier Flächen und drei Aufteilungen sind eine Vorauswahl, die zusammenpasst. Sie entscheiden zwischen vorgefertigten Kombinationen statt über Typografie.",
      },
      {
        title: "Entwurf, über den sich reden lässt",
        text: "Zwei oder drei Varianten herunterladen und im Betrieb herumzeigen, bevor Geld in Gestaltung oder Druck geht.",
      },
      {
        title: "Karte und QR-Code aus einer Hand",
        text: "Die Rückseite trägt oft einen QR-Code mit den Kontaktdaten als vCard. Den erzeugt der QR-Code-Generator auf dieser Seite, mit denselben Angaben.",
      },
    ],
    steps: [
      {
        title: "Inhalt eintragen",
        description:
          "Unter „Inhalt“ stehen Name, Position, Firma, Telefon, E-Mail und Webseite. Leere Felder werden nicht gedruckt, Sie können also weglassen, was auf die Karte nicht gehört.",
      },
      {
        title: "Aussehen festlegen",
        description:
          "Unter „Aussehen“ wählen Sie Akzentfarbe, Fläche (Papier, Sand, Navy, Anthrazit), Ecken, Schatten und Aufteilung (linksbündig, zentriert, mit Farbband). Reicht der Kontrast einer Akzentfarbe auf der gewählten Fläche nicht, hellt das Werkzeug sie auf und sagt es — die Karte bleibt lesbar, auch wenn die Farbe nicht genau die eingegebene ist.",
      },
      {
        title: "Vorschau prüfen",
        description:
          "Die Vorschau ist dieselbe Zeichnung wie der Druck, nur kleiner gerechnet. Lesen Sie sie einmal auf Armlänge: Was dort schwer zu entziffern ist, ist auf 85 mm Papier nicht besser.",
      },
      {
        title: "Als PNG herunterladen",
        description:
          "Der Download gibt 85 × 55 mm bei 300 dpi. Prüfen Sie beim Druckdienst, ob PNG angenommen wird und ob ein Anschnitt verlangt ist. „Zurücksetzen“ stellt den Ausgangsentwurf wieder her.",
      },
    ],
    privacy:
      "Die Karte wird vollständig in Ihrem Browser gezeichnet. Name, Telefonnummer und E-Mail-Adresse verlassen das Gerät nicht: Vorschau und Download sind derselbe Zeichenaufruf auf ein Canvas-Element, einmal in Bildschirm- und einmal in Druckauflösung, und es gibt keine Gegenstelle, an die etwas gesendet werden könnte. Das ist bei Kontaktdaten kein nebensächlicher Unterschied — bei vielen Online-Kartengestaltern entsteht die Druckdatei auf einem Server, und die Angaben liegen dort anschließend in einem Konto.",
    faq: [
      {
        q: "Kann ich das PNG direkt in den Druck geben?",
        a: "Bei Online-Druckdiensten, die PNG oder JPG annehmen, ja — die Datei hat mit 85 × 55 mm bei 300 dpi die übliche Auflösung für dieses Format. Eine Druckerei, die eine PDF mit 3 mm Anschnitt und Schnittmarken verlangt, bekommt das hier nicht; fragen Sie vorher nach, was angenommen wird.",
      },
      {
        q: "Warum ist meine Akzentfarbe heller als eingegeben?",
        a: "Weil sie auf der gewählten Fläche sonst nicht genug Kontrast hätte. Das Werkzeug hellt sie so weit auf, dass der Text lesbar bleibt, und weist darauf hin. Wollen Sie den Farbton genau treffen, wählen Sie eine hellere Fläche — auf Papier oder Sand bleibt mehr Spielraum als auf Navy oder Anthrazit.",
      },
      {
        q: "Kann ich mein Logo einsetzen?",
        a: "Nein, das Werkzeug arbeitet ohne Bilddateien. Es gestaltet mit Fläche, Akzentfarbe, Aufteilung und Schrift. Eine Karte mit Logo ist der Punkt, an dem eine Vorlage in einem Layoutprogramm oder eine Gestaltung sinnvoller ist als ein Generator.",
      },
      {
        q: "Wie bekomme ich die Rückseite?",
        a: "Der Designer entwirft eine Seite. Für die Rückseite laden Sie eine zweite Variante herunter — etwa nur mit Logo-Fläche und QR-Code — und geben beide Dateien als Vorder- und Rückseite in den Druck. Den QR-Code mit Ihren Kontaktdaten als vCard erzeugt der QR-Code-Generator.",
      },
      {
        q: "Bleiben meine Eingaben erhalten, wenn ich die Seite neu lade?",
        a: "Nein. Da nichts gespeichert und nichts gesendet wird, ist die Seite nach dem Neuladen wieder im Ausgangszustand. Laden Sie den Entwurf herunter, bevor Sie den Tab schließen.",
      },
    ],
    related: ["qr-code-generator", "bild-komprimieren"],
  },
  en: {
    intro: [
      "The business card designer lays out a card in the browser: you fill in name, role, company and contact details, choose the accent colour, surface, corners, shadow and layout, and see the result in the preview as you type. What comes out is a PNG at 85 × 55 mm and 300 dpi — the resolution a printer expects for a card this size.",
      "It is meant for the case where a card is needed quickly and nobody wants to open a layout application: a new colleague, a trade fair in two weeks, a business with no house style. You watch the card change as you type instead of filling in a template and waiting for a proof.",
      "One limitation up front, so the print shop is not a surprise: the file is a PNG at final size — no bleed and no crop marks. Online print services that accept PNG or JPG take it as it is. A printer that asks for a PDF with 3 mm bleed will come back to you. If you want a colour running off the edge, that is the point where a layout application, or a designer, is the better answer.",
    ],
    useCases: [
      {
        title: "New colleague, card the same day",
        text: "Change the name and the role, leave the rest, download. The card matches the others because the surface, corners and accent colour stay the same.",
      },
      {
        title: "A fair or market in two weeks",
        text: "A card that suits the stand, with no round of approvals. For a small run at an online print service, a PNG at print resolution is enough.",
      },
      {
        title: "A business with no settled house style",
        text: "The four surfaces and three layouts are a pre-selection that works together. You choose between finished combinations rather than deciding typography.",
      },
      {
        title: "A draft people can talk about",
        text: "Download two or three variants and show them around before any money goes into design or printing.",
      },
      {
        title: "Card and QR code from one place",
        text: "The back often carries a QR code with the contact details as a vCard. The QR code generator on this site makes that one, from the same details.",
      },
    ],
    steps: [
      {
        title: "Fill in the content",
        description:
          "Under “Content” are name, role, company, phone, email and website. Empty fields are not printed, so you can leave out whatever does not belong on the card.",
      },
      {
        title: "Decide how it looks",
        description:
          "Under “Look” you choose the accent colour, the surface (paper, sand, navy, charcoal), the corners, the shadow and the layout (left-aligned, centred, with a colour band). If an accent colour would not have enough contrast on the chosen surface, the tool lightens it and says so — the card stays readable even though the colour is not exactly the one you entered.",
      },
      {
        title: "Check the preview",
        description:
          "The preview is the same drawing as the print, computed smaller. Read it once at arm's length: anything hard to make out there will be no better on 85 mm of paper.",
      },
      {
        title: "Download as PNG",
        description:
          "The download gives 85 × 55 mm at 300 dpi. Check with the print service whether PNG is accepted and whether bleed is required. “Reset” restores the starting draft.",
      },
    ],
    privacy:
      "The card is drawn entirely in your browser. Your name, phone number and email address do not leave the device: the preview and the download are the same drawing call onto a canvas element, once at screen and once at print resolution, and there is no server to send anything to. With contact details that is not a minor difference — many online card designers produce the print file on a server, and the details then sit in an account there.",
    faq: [
      {
        q: "Can I send the PNG straight to print?",
        a: "At online print services that accept PNG or JPG, yes — at 85 × 55 mm and 300 dpi the file has the usual resolution for this format. A printer that requires a PDF with 3 mm bleed and crop marks will not get that here, so ask what is accepted before you order.",
      },
      {
        q: "Why is my accent colour lighter than the one I entered?",
        a: "Because it would not have enough contrast on the chosen surface. The tool lightens it just far enough for the text to stay readable, and tells you it did. To hit a colour exactly, pick a lighter surface — paper and sand leave more room than navy or charcoal.",
      },
      {
        q: "Can I use my logo?",
        a: "No, the tool works without image files. It designs with the surface, the accent colour, the layout and the type. A card with a logo is the point where a template in a layout application, or a designer, makes more sense than a generator.",
      },
      {
        q: "How do I get the back of the card?",
        a: "The designer lays out one side. For the back, download a second variant — say just a colour surface and a QR code — and send both files as front and back. The QR code with your contact details as a vCard comes from the QR code generator.",
      },
      {
        q: "Are my entries kept if I reload the page?",
        a: "No. Since nothing is stored and nothing is sent, the page is back to its starting state after a reload. Download the draft before you close the tab.",
      },
    ],
    related: ["qr-code-generator", "bild-komprimieren"],
  },
};

export default guide;
