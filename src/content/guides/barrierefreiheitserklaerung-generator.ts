import type { ToolGuideSet } from "~/lib/guides";

const guide: ToolGuideSet = {
  de: {
    intro: [
      "Seit dem 28. Juni 2025 gilt das Barrierefreiheitsstärkungsgesetz. Es verpflichtet Unternehmen, die bestimmte Dienstleistungen an Verbraucher erbringen — Onlineshops, Buchungs- und Terminsysteme, Bankdienste, Personenbeförderung —, ihre digitalen Angebote barrierefrei zu gestalten und darüber öffentlich Auskunft zu geben. Öffentliche Stellen trifft dieselbe Auskunftspflicht schon länger, allerdings über einen anderen Weg: § 12b des Behindertengleichstellungsgesetzes und die Barrierefreie-Informationstechnik-Verordnung.",
      "Das sind zwei verschiedene Erklärungen, und sie sehen einander zum Verwechseln ähnlich. Der Unterschied steht am Ende: Eine öffentliche Stelle verweist auf die Schlichtungsstelle nach § 16 BGG, ein Unternehmen auf die Marktüberwachungsstelle der Länder. Vertauscht sind beide Texte falsch — und zwar an einer Stelle, die niemand liest, solange sich niemand beschwert. Dieser Generator fragt deshalb als Erstes, wer die Erklärung abgibt, und richtet den ganzen Text danach aus.",
      "Alles Weitere ist die ehrliche Bestandsaufnahme: Ist das Angebot vollständig, teilweise oder nicht mit dem angewandten Standard vereinbar? Welche Inhalte sind es nicht, und warum? Wie erreicht man Sie, wenn jemand an eine Hürde stößt, und wie schnell antworten Sie? Eine Erklärung, die überall „vollständig vereinbar“ behauptet, ist selten glaubwürdig und im Zweifel eine falsche Angabe.",
    ],
    useCases: [
      {
        title: "Onlineshop unter dem BFSG",
        text: "Ein Shop, der an Verbraucher verkauft, braucht die Erklärung seit Juni 2025. Der Text nennt das Gesetz, den angewandten Standard und den Weg zur Marktüberwachungsstelle.",
      },
      {
        title: "Buchungssystem einer Praxis oder Werkstatt",
        text: "Terminvergabe im Netz ist eine Dienstleistung im Sinne des Gesetzes. Wer sie anbietet, schuldet auch dann eine Erklärung, wenn die restliche Website nur informiert.",
      },
      {
        title: "Kommune oder Behörde nach BITV 2.0",
        text: "Für öffentliche Stellen gilt der andere Weg: § 12b BGG, die Verordnung und am Ende die Schlichtungsstelle. Die Auswahl ganz oben stellt den kompletten Text darauf um.",
      },
      {
        title: "Erklärung nach einer Überprüfung fortschreiben",
        text: "Die Erklärung ist kein einmaliges Dokument. Tragen Sie das neue Prüfdatum ein und kürzen Sie die Liste der Mängel um das, was inzwischen behoben ist.",
      },
      {
        title: "Bestandsaufnahme vor dem Umbau",
        text: "Das Feld für die nicht barrierefreien Inhalte zwingt dazu, konkret zu werden. Wer es ausfüllt, hat nebenbei die Liste dessen, was am Angebot als Nächstes zu tun ist.",
      },
    ],
    steps: [
      {
        title: "Regime wählen",
        description:
          "Unternehmen nach dem BFSG oder öffentliche Stelle nach BITV 2.0 und § 12b BGG. Diese Auswahl steuert nicht nur eine Überschrift, sondern die genannten Vorschriften und die Stelle, an die sich eine unzufriedene Person am Ende wenden kann.",
      },
      {
        title: "Angebot und Anbieter benennen",
        description:
          "Wer gibt die Erklärung ab, und wofür gilt sie? Benennen Sie das Angebot so, wie es die Nutzer kennen — „der Onlineshop shop.beispiel.de“ ist eine bessere Angabe als „unsere digitalen Angebote“.",
      },
      {
        title: "Stand der Vereinbarkeit festhalten",
        description:
          "Vollständig, teilweise oder nicht vereinbar, dazu der angewandte Standard. Unterhalb der vollständigen Vereinbarkeit verlangt der Generator eine Liste der nicht barrierefreien Inhalte — pauschale Sätze helfen niemandem, der auf eine Hürde gestoßen ist.",
      },
      {
        title: "Begründung und Prüfverfahren angeben",
        description:
          "Unverhältnismäßige Belastung, Ausnahme vom Anwendungsbereich oder laufende Umsetzung, und ob die Bewertung aus einer Selbstbewertung oder einer externen Prüfung stammt. Datum der Erstellung und der letzten Überprüfung gehören dazu.",
      },
      {
        title: "Rückmeldeweg festlegen und veröffentlichen",
        description:
          "Ein erreichbarer Kontaktweg und eine Frist, innerhalb derer Sie antworten. Anschließend den Text übernehmen und dauerhaft auffindbar veröffentlichen, üblicherweise aus der Fußzeile heraus verlinkt.",
      },
    ],
    privacy:
      "Der Text entsteht vollständig in Ihrem Browser; weder die Angaben zu Ihrem Betrieb noch die Liste Ihrer bekannten Mängel verlassen das Gerät. Gerade der zweite Punkt ist hier relevant: Was Sie in das Feld für die nicht barrierefreien Inhalte schreiben, ist eine ungeschönte Aufstellung dessen, was an Ihrem Angebot noch nicht funktioniert. Diese Aufstellung geht an keinen Server, und sie wird nirgends zwischengespeichert.",
    faq: [
      {
        q: "Gilt das BFSG auch für meinen kleinen Betrieb?",
        a: "Das Gesetz kennt eine Ausnahme für Kleinstunternehmen, die Dienstleistungen erbringen: weniger als zehn Beschäftigte und höchstens zwei Millionen Euro Jahresumsatz oder Jahresbilanzsumme. Für Produkte gilt diese Ausnahme nicht. Ob Ihr Angebot als Dienstleistung in den Anwendungsbereich fällt, sollten Sie im Einzelfall prüfen lassen.",
      },
      {
        q: "Worin unterscheiden sich BFSG und BITV 2.0?",
        a: "Im Adressaten und im Rechtsweg. Das BFSG richtet sich an Unternehmen, die Verbrauchern bestimmte Produkte und Dienstleistungen anbieten, und wird von der Marktüberwachung der Länder überwacht. Die BITV 2.0 samt § 12b BGG richtet sich an öffentliche Stellen, und dort führt der Weg zur Schlichtungsstelle nach § 16 BGG. Die inhaltlichen Anforderungen ähneln sich stark, beide verweisen auf die EN 301 549.",
      },
      {
        q: "Was schreibe ich in die Liste der nicht barrierefreien Inhalte?",
        a: "Konkret das, was Sie wissen: ein nicht getaggtes PDF, ein Video ohne Untertitel, ein Formular ohne verbundene Beschriftungen, eine Karte ohne Textalternative. Je genauer die Angabe, desto eher findet jemand den Weg zu der Fassung, die er nutzen kann — und desto glaubwürdiger ist die Erklärung insgesamt.",
      },
      {
        q: "Wie oft muss ich die Erklärung überprüfen?",
        a: "Sie soll den tatsächlichen Stand wiedergeben, also nach jeder wesentlichen Änderung am Angebot und ansonsten regelmäßig. Für öffentliche Stellen ist eine jährliche Überprüfung vorgesehen. Das Feld für das Datum der letzten Überprüfung ist deshalb kein Beiwerk: Es macht sichtbar, wie alt die Aussage ist.",
      },
      {
        q: "Reicht die Erklärung, oder muss ich die Seite auch umbauen?",
        a: "Die Erklärung ist die Auskunftspflicht, nicht die Erfüllung. Sie beschreibt den Stand und benennt einen Rückmeldeweg; barrierefrei wird das Angebot dadurch nicht. Wer sie ernst nimmt, hat mit der Liste der Mängel allerdings genau den Arbeitsplan, den der Umbau braucht.",
      },
    ],
    related: ["kontrast-checker", "impressum-generator"],
  },
  en: {
    intro: [
      "The German Accessibility Strengthening Act has applied since 28 June 2025. It obliges businesses providing certain services to consumers — online shops, booking and appointment systems, banking services, passenger transport — to make their digital offerings accessible and to say publicly where they stand. Public bodies have had the same duty for longer, but by a different route: section 12b of the Disability Equality Act and the Barrier-Free Information Technology Ordinance.",
      "Those are two different statements, and they look confusingly alike. The difference is at the end: a public body points to the conciliation body under section 16 BGG, a business points to the market surveillance authority of the federal states. Swap them and both texts are wrong — in a place nobody reads until somebody complains. This generator therefore asks first who is issuing the statement, and shapes the whole text around that answer.",
      "Everything after that is an honest inventory: is the service fully, partially or not compliant with the standard applied? Which content is not, and why? How can people reach you when they hit a barrier, and how quickly do you answer? A statement claiming full compliance everywhere is rarely credible and, in case of doubt, an incorrect statement.",
    ],
    useCases: [
      {
        title: "An online shop under the BFSG",
        text: "A shop selling to consumers has needed the statement since June 2025. The text names the act, the standard applied and the route to the market surveillance authority.",
      },
      {
        title: "The booking system of a practice or workshop",
        text: "Arranging appointments online is a service in the sense of the act. Anyone offering one owes a statement even where the rest of the website only informs.",
      },
      {
        title: "A municipality or authority under BITV 2.0",
        text: "Public bodies take the other route: section 12b BGG, the ordinance, and the conciliation body at the end. The choice at the top switches the entire text over.",
      },
      {
        title: "Updating the statement after a review",
        text: "The statement is not a one-off document. Enter the new review date and shorten the list of shortcomings by whatever has been fixed in the meantime.",
      },
      {
        title: "Taking stock before a rebuild",
        text: "The field for non-accessible content forces you to be specific. Filling it in leaves you with the list of what needs doing next to the service anyway.",
      },
    ],
    steps: [
      {
        title: "Choose the regime",
        description:
          "A business under the BFSG, or a public body under BITV 2.0 and section 12b BGG. That choice controls more than a heading: it decides which rules are cited and which body a dissatisfied person can turn to at the end.",
      },
      {
        title: "Name the service and the provider",
        description:
          "Who is issuing the statement, and what does it cover? Name the service the way its users know it — “the online shop shop.example.com” is a better statement than “our digital offerings”.",
      },
      {
        title: "Record the compliance status",
        description:
          "Fully, partially or not compliant, together with the standard applied. Below full compliance the generator asks for a list of the non-accessible content — blanket sentences help nobody who has just hit a barrier.",
      },
      {
        title: "State the reasoning and the assessment",
        description:
          "Disproportionate burden, an exemption from the scope, or work in progress, and whether the assessment comes from a self-assessment or an external review. The dates of preparation and of the last review belong here too.",
      },
      {
        title: "Set out the feedback route and publish",
        description:
          "A contact channel that works and a period within which you answer. Then take the text over and publish it so that it stays findable, usually linked from the footer.",
      },
    ],
    privacy:
      "The text is produced entirely in your browser; neither the details of your business nor the list of shortcomings you know about ever leave the device. The second point matters here in particular: what you write into the field for non-accessible content is an unvarnished account of what does not yet work about your service. That account goes to no server, and it is cached nowhere.",
    faq: [
      {
        q: "Does the BFSG apply to my small business?",
        a: "The act exempts microenterprises providing services: fewer than ten employees and at most two million euros of annual turnover or balance sheet total. That exemption does not apply to products. Whether your offering falls within the scope as a service is something to have checked for your particular case.",
      },
      {
        q: "What is the difference between the BFSG and BITV 2.0?",
        a: "The addressee and the route of redress. The BFSG addresses businesses offering certain products and services to consumers and is policed by the market surveillance authorities of the federal states. BITV 2.0 together with section 12b BGG addresses public bodies, where the route leads to the conciliation body under section 16 BGG. The substantive requirements are very similar; both refer to EN 301 549.",
      },
      {
        q: "What do I write into the list of non-accessible content?",
        a: "Specifically what you know: an untagged PDF, a video without subtitles, a form without associated labels, a map without a text alternative. The more precise the entry, the more likely someone finds their way to a version they can use — and the more credible the statement is as a whole.",
      },
      {
        q: "How often do I have to review the statement?",
        a: "It is meant to reflect the actual state, so after every substantial change to the service and otherwise at regular intervals. Public bodies are expected to review annually. The field for the date of the last review is therefore not decoration: it shows how old the claim is.",
      },
      {
        q: "Is the statement enough, or do I have to rebuild the site?",
        a: "The statement is the duty to inform, not the compliance itself. It describes the state of play and names a feedback route; it does not make the service accessible. Taken seriously, though, the list of shortcomings is exactly the work plan the rebuild needs.",
      },
    ],
    related: ["kontrast-checker", "impressum-generator"],
  },
};

export default guide;
