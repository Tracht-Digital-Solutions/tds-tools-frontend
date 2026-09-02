import type { ToolGuideSet } from "~/lib/guides";

const guide: ToolGuideSet = {
  de: {
    intro: [
      "Ein Impressum ist keine Höflichkeit, sondern eine Auskunft: Wer betreibt diese Seite, und wo ist diese Person erreichbar, wenn etwas zu klären ist? § 5 des Digitale-Dienste-Gesetzes verlangt diese Angaben von jedem, der eine Website geschäftsmäßig betreibt — und „geschäftsmäßig“ beginnt deutlich früher, als die meisten annehmen. Eine Seite, auf der eine Leistung beschrieben und eine Telefonnummer genannt wird, ist bereits erfasst.",
      "Dieser Generator stellt ein Muster aus Ihren Angaben zusammen. Sie wählen die Rechtsform, tragen Anschrift und Kontakt ein und kreuzen an, was auf Ihren Betrieb zutrifft: Registereintrag, Umsatzsteuer-Identifikationsnummer, ein reglementierter Beruf mit Kammer, eine Aufsichtsbehörde, eine redaktionell verantwortliche Person nach dem Medienstaatsvertrag. Jede Ankreuzung fügt genau einen Abschnitt hinzu, jede zurückgenommene Ankreuzung entfernt ihn wieder.",
      "Zwei Dinge unterscheiden das Ergebnis von den Mustern, die seit Jahren unverändert im Netz stehen. Es verweist nicht auf die Online-Streitbeilegungsplattform der Europäischen Kommission — die wurde im Juli 2025 abgeschaltet, der Link führt seither ins Leere. Und es fragt nicht nach Ihrer Steuernummer: Ins Impressum gehört die Umsatzsteuer-Identifikationsnummer, nicht die Nummer, unter der Ihr Finanzamt Sie führt.",
    ],
    useCases: [
      {
        title: "Die erste eigene Website eines Handwerksbetriebs",
        text: "Ein Meisterbetrieb mit Handwerkskammer, Berufsbezeichnung und Verleihungsstaat braucht mehr Angaben als ein reiner Onlineshop. Die Ankreuzfelder führen durch genau diese Zusätze.",
      },
      {
        title: "Umzug von der GbR in die GmbH",
        text: "Mit der neuen Rechtsform kommen Registergericht, Registernummer und die Geschäftsführung ins Impressum. Der Generator belegt die Registerangabe passend zur gewählten Rechtsform vor.",
      },
      {
        title: "Ein Verein, der endlich online geht",
        text: "Vereinsregister statt Handelsregister, Vorstand statt Geschäftsführung: Die Beschriftung der Vertretung richtet sich nach der Rechtsform, damit der Text nicht wie ein ausgefülltes Formular klingt.",
      },
      {
        title: "Ein Blog auf der Firmenseite",
        text: "Wer regelmäßig redaktionelle Beiträge veröffentlicht, braucht zusätzlich eine verantwortliche Person mit Anschrift nach § 18 Abs. 2 Medienstaatsvertrag. Ein eigenes Ankreuzfeld ergänzt diesen Abschnitt.",
      },
      {
        title: "Ein altes Impressum überprüfen",
        text: "Stellen Sie Ihre Angaben neu zusammen und vergleichen Sie das Ergebnis mit dem, was auf Ihrer Seite steht. Vor allem der ODR-Verweis steht noch in erstaunlich vielen Impressen.",
      },
    ],
    steps: [
      {
        title: "Rechtsform wählen",
        description:
          "Die Auswahl steuert, wie die Vertretung beschriftet wird und ob ein Registereintrag vorbelegt ist. Eine GmbH hat eine Geschäftsführung und eine Handelsregisternummer, ein Verein einen Vorstand und eine Vereinsregisternummer.",
      },
      {
        title: "Anbieter und Kontakt eintragen",
        description:
          "Name oder Firma, vollständige Anschrift mit Straße, Postleitzahl und Ort sowie mindestens eine E-Mail-Adresse. Ein Postfach genügt nicht: Verlangt ist eine ladungsfähige Anschrift, unter der Post tatsächlich zugestellt werden kann.",
      },
      {
        title: "Zusätzliche Angaben ankreuzen",
        description:
          "Registereintrag, Umsatzsteuer-Identifikationsnummer, reglementierter Beruf, Aufsichtsbehörde, Berufshaftpflicht und redaktionelle Verantwortung. Zu jeder gesetzten Ankreuzung erscheinen die zugehörigen Felder direkt darunter.",
      },
      {
        title: "Streitbeilegung entscheiden",
        description:
          "Sie erklären entweder, dass Sie an einem Schlichtungsverfahren vor einer Verbraucherschlichtungsstelle nicht teilnehmen, oder Sie benennen die zuständige Stelle. Beides ist zulässig; die Angabe selbst ist es, die nicht fehlen darf.",
      },
      {
        title: "Prüfen und übernehmen",
        description:
          "Lesen Sie die Vorschau Zeile für Zeile gegen Ihren Registerauszug und Ihre Gewerbeanmeldung. Dann kopieren Sie den Text oder laden ihn als Datei herunter und fügen ihn in Ihr Redaktionssystem ein.",
      },
    ],
    privacy:
      "Ihre Firmendaten bleiben in Ihrem Browser. Der Text entsteht während der Eingabe im Gerät und wird an keinen Server übertragen, gespeichert oder ausgewertet — dieses Werkzeug hat gar keine Gegenstelle, an die es etwas senden könnte. Das ist bei einem Impressum kein akademischer Unterschied: Die Angaben, die Sie hier eintragen, umfassen die private Anschrift, wenn Sie von zu Hause aus arbeiten, und einige verbreitete Generatoren senden genau diese Eingaben zur Erzeugung an ihren Server.",
    faq: [
      {
        q: "Brauche ich ein Impressum, wenn ich nur eine kleine Seite ohne Shop habe?",
        a: "Sobald die Seite geschäftsmäßig betrieben wird, ja — und das beginnt nicht erst beim Verkauf. Eine Seite, die eine Leistung beschreibt und zur Kontaktaufnahme einlädt, ist bereits geschäftsmäßig. Rein private Seiten ohne jeden geschäftlichen Bezug sind ausgenommen, aber die Grenze ist enger, als sie klingt.",
      },
      {
        q: "Warum verweist der Text nicht auf die OS-Plattform der EU?",
        a: "Weil es sie nicht mehr gibt. Die Europäische Kommission hat die Plattform zur Online-Streitbeilegung am 20. Juli 2025 abgeschaltet. Ein Verweis darauf führt heute ins Leere und ist damit eher ein Risiko als eine Pflichterfüllung. Die Angabe zur Verbraucherschlichtungsstelle nach dem Verbraucherstreitbeilegungsgesetz bleibt davon unberührt und steht weiterhin im Text.",
      },
      {
        q: "Gehört meine Steuernummer ins Impressum?",
        a: "Nein. § 5 des Digitale-Dienste-Gesetzes verlangt die Umsatzsteuer-Identifikationsnummer, sofern eine vorhanden ist. Die Steuernummer des Finanzamts ist eine andere Angabe, sie ist nicht öffentlich und hat im Impressum nichts verloren. Deshalb bietet dieses Werkzeug dafür auch kein Feld an.",
      },
      {
        q: "Reicht ein Postfach als Anschrift?",
        a: "Nein. Verlangt ist eine ladungsfähige Anschrift, unter der Post tatsächlich zugestellt werden kann. Wer von zu Hause aus arbeitet, muss deshalb in aller Regel die Wohnanschrift angeben. Eine Geschäftsadresse bei einem Anbieter, der Post entgegennimmt und weiterleitet, kann eine Alternative sein — das sollten Sie im Einzelfall prüfen lassen.",
      },
      {
        q: "Ersetzt dieses Werkzeug die Prüfung durch eine Kanzlei?",
        a: "Nein. Es stellt ein Muster aus Ihren Angaben zusammen und macht sichtbar, welche Abschnitte üblicherweise dazugehören. Welche Pflichtangaben Ihr Betrieb tatsächlich schuldet, hängt an Rechtsform, Branche und Tätigkeit — und diese Umstände kennt das Werkzeug nicht. Lassen Sie den fertigen Text prüfen, bevor Sie ihn veröffentlichen.",
      },
    ],
    related: ["datenschutzerklaerung-generator", "barrierefreiheitserklaerung-generator"],
  },
  en: {
    intro: [
      "An imprint is not a courtesy, it is a piece of information: who runs this site, and where can that person be reached when something needs sorting out? Section 5 of the German Digital Services Act requires these details from anyone running a website in the course of business — and “in the course of business” starts a good deal earlier than most people assume. A page that describes a service and gives a phone number already qualifies.",
      "This generator assembles a sample from the details you enter. You pick the legal form, fill in the address and contact details, and tick what applies to your business: an entry in a register, a VAT identification number, a regulated profession with its chamber, a supervisory authority, a person with editorial responsibility under the German media treaty. Every tick adds exactly one section, and unticking it takes that section away again.",
      "Two things set the result apart from the samples that have sat unchanged on the web for years. It does not point at the European Commission's online dispute resolution platform — that was shut down in July 2025, and the link has led nowhere since. And it does not ask for your tax number: what belongs in an imprint is the VAT identification number, not the number your tax office files you under.",
    ],
    useCases: [
      {
        title: "A trade business putting up its first website",
        text: "A master craftsman with a chamber, a professional title and an awarding state needs more details than a plain online shop. The tick boxes walk through exactly those additions.",
      },
      {
        title: "Moving from a partnership to a limited company",
        text: "The new legal form brings the registering court, the register number and the managing directors into the imprint. The generator pre-selects the register entry to match the legal form you choose.",
      },
      {
        title: "An association finally going online",
        text: "An association register rather than a commercial one, a board rather than managing directors: the wording for the representation follows the legal form, so the text does not read like a filled-in form.",
      },
      {
        title: "A blog on the company site",
        text: "Anyone publishing editorial content regularly also needs a responsible person with an address under section 18 (2) of the German media treaty. A separate tick box adds that section.",
      },
      {
        title: "Checking an old imprint",
        text: "Assemble your details afresh and compare the result with what is on your site. The dead ODR reference in particular is still sitting in a surprising number of imprints.",
      },
    ],
    steps: [
      {
        title: "Choose the legal form",
        description:
          "The choice controls how the representation is labelled and whether a register entry is pre-selected. A limited company has managing directors and a commercial register number, an association has a board and an association register number.",
      },
      {
        title: "Enter the provider and contact details",
        description:
          "Name or company, a complete address with street, postcode and town, and at least an email address. A post office box is not enough: what is required is an address at which documents can actually be served.",
      },
      {
        title: "Tick the additional details",
        description:
          "Register entry, VAT identification number, regulated profession, supervisory authority, indemnity insurance and editorial responsibility. For every tick, the matching fields appear directly underneath.",
      },
      {
        title: "Decide on dispute resolution",
        description:
          "You either declare that you do not take part in proceedings before a consumer arbitration board, or you name the competent body. Both are permissible; it is the statement itself that must not be missing.",
      },
      {
        title: "Check it, then take it over",
        description:
          "Read the preview line by line against your register extract and your trade registration. Then copy the text or download it as a file and paste it into your content management system.",
      },
    ],
    privacy:
      "Your company details stay in your browser. The text is built on your device as you type and is never transmitted to a server, stored or analysed — this tool has no counterpart to send anything to. For an imprint that is not an academic distinction: the details you enter here include your private address if you work from home, and several widely used generators send exactly those inputs to their server to produce the text.",
    faq: [
      {
        q: "Do I need an imprint for a small site with no shop?",
        a: "As soon as the site is run in the course of business, yes — and that does not start with selling. A page that describes a service and invites people to get in touch is already commercial. Purely private pages with no business connection are exempt, but the boundary is narrower than it sounds.",
      },
      {
        q: "Why does the text not point at the EU ODR platform?",
        a: "Because it no longer exists. The European Commission shut down the online dispute resolution platform on 20 July 2025. A reference to it now leads nowhere and is a liability rather than compliance. The statement about a consumer arbitration board under the German dispute resolution act is unaffected and stays in the text.",
      },
      {
        q: "Does my tax number belong in the imprint?",
        a: "No. Section 5 of the German Digital Services Act asks for the VAT identification number, where one exists. The tax number issued by the tax office is a different thing, it is not public, and it has no place in an imprint. That is why this tool offers no field for it.",
      },
      {
        q: "Is a post office box enough as an address?",
        a: "No. What is required is an address at which documents can actually be served. Anyone working from home will therefore usually have to give their home address. A business address with a provider that receives and forwards post can be an alternative — have that checked for your particular case.",
      },
      {
        q: "Does this tool replace a review by a law firm?",
        a: "No. It assembles a sample from your details and shows which sections usually belong in one. Which mandatory details your business actually owes depends on its legal form, its sector and what it does — and the tool knows none of that. Have the finished text reviewed before you publish it.",
      },
    ],
    related: ["datenschutzerklaerung-generator", "barrierefreiheitserklaerung-generator"],
  },
};

export default guide;
