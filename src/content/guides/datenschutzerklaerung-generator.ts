import type { ToolGuideSet } from "~/lib/guides";

const guide: ToolGuideSet = {
  de: {
    intro: [
      "Eine Datenschutzerklärung beantwortet eine einzige Frage, und zwar für jede Verarbeitung einzeln: Was passiert mit meinen Daten, und mit welchem Recht? Genau daran scheitern die meisten frei verfügbaren Muster. Sie zählen auf, welche Dienste eine Website einsetzt, nennen aber weder den Zweck noch die Rechtsgrundlage — und damit erfüllen sie Art. 13 der Datenschutz-Grundverordnung nicht, obwohl der Text vollständig aussieht.",
      "Dieser Generator arbeitet mit Bausteinen. Sie tragen den Verantwortlichen ein und kreuzen an, was auf Ihre Website zutrifft: externes Hosting, Server-Logdateien, Kontaktformular, Cookies, Webanalyse, Newsletter, Kartendienst, Schriftarten, Videos, soziale Netzwerke, Zahlungsdienstleister, Buchungssystem, Chat, Bewerbungen, Übermittlung in ein Drittland. Zu jedem gesetzten Haken erscheint ein Abschnitt mit Zweck und Rechtsgrundlage; ein entfernter Haken nimmt ihn wieder heraus.",
      "Der Unterschied zwischen Einwilligung und berechtigtem Interesse ist dabei fest verdrahtet und nicht Geschmackssache. Webanalyse, eingebundene Karten, Videos und von außen geladene Schriftarten werden hier auf Art. 6 Abs. 1 lit. a DSGVO in Verbindung mit § 25 Abs. 1 TDDDG gestützt, also auf eine Einwilligung. Ein Muster, das an diesen Stellen ein berechtigtes Interesse behauptet, schreibt eine falsche Angabe auf Ihre Seite — und sie steht dort schwarz auf weiß.",
    ],
    useCases: [
      {
        title: "Website ohne Analyse und ohne Werbung",
        text: "Der häufigste Fall bei kleinen Betrieben: Hosting, Server-Logdateien, ein Kontaktformular, sonst nichts. Nehmen Sie die Haken bei allem heraus, was Sie nicht einsetzen — der Text wird dadurch kürzer und richtiger.",
      },
      {
        title: "Onlineshop mit Zahlungsdienstleister",
        text: "Bestellungen laufen über Art. 6 Abs. 1 lit. b DSGVO, die Zahlungsabwicklung über eigenverantwortliche Dienstleister, und die handels- und steuerrechtlichen Aufbewahrungsfristen bleiben unberührt.",
      },
      {
        title: "Seite mit Karte und eingebetteten Videos",
        text: "Beide Dienste bauen beim Laden eine Verbindung zu einem fremden Server auf und übertragen dabei die IP-Adresse. Die zugehörigen Abschnitte sagen genau das und stützen sich auf eine Einwilligung.",
      },
      {
        title: "Betrieb, der offene Stellen ausschreibt",
        text: "Bewerbungsunterlagen sind eine eigene Verarbeitung nach § 26 Abs. 1 BDSG mit eigener Löschfrist. Der Baustein nennt beides, statt Bewerbungen unter „Kontaktaufnahme“ verschwinden zu lassen.",
      },
      {
        title: "Die eigene Erklärung gegenlesen",
        text: "Stellen Sie den Text neu zusammen und vergleichen Sie ihn Abschnitt für Abschnitt mit dem, was auf Ihrer Seite steht. Auffällig sind meist Dienste, die längst abgeschaltet sind, und fehlende Rechtsgrundlagen.",
      },
    ],
    steps: [
      {
        title: "Verantwortlichen eintragen",
        description:
          "Name, vollständige Anschrift und eine Kontaktmöglichkeit. Wenn Sie eine datenschutzbeauftragte Person benannt haben, kommt deren Kontakt dazu; ohne Benennung bleibt der Abschnitt weg, statt eine Stelle zu erfinden, die es nicht gibt.",
      },
      {
        title: "Betrieb der Website ankreuzen",
        description:
          "Externes Hosting und Server-Logdateien treffen auf nahezu jede Website zu. Wo Sie den Anbieter und den Serverstandort kennen, tragen Sie beides ein — die Angabe macht aus einer allgemeinen Formel eine überprüfbare Aussage.",
      },
      {
        title: "Kontaktwege und Auswertung wählen",
        description:
          "Kontaktformular, E-Mail, Telefon; danach technisch notwendige Cookies, einwilligungspflichtige Cookies mit dem eingesetzten Einwilligungswerkzeug und gegebenenfalls die Webanalyse mit dem Namen des Werkzeugs.",
      },
      {
        title: "Eingebundene Dienste benennen",
        description:
          "Kartendienst, Schriftarten, Videos und Content Delivery Network. Bei den Schriftarten entscheidet die Auswahl zwischen lokaler Auslieferung und Google Fonts über den ganzen Absatz — die beiden Fälle sind datenschutzrechtlich nicht dasselbe.",
      },
      {
        title: "Prüfen, kopieren, einbinden",
        description:
          "Lesen Sie die Vorschau gegen das, was Ihre Seite tatsächlich lädt. Dann kopieren Sie den Text oder laden ihn als Datei herunter und verlinken ihn von jeder Seite aus — üblicherweise aus der Fußzeile.",
      },
    ],
    privacy:
      "Alles, was Sie eintragen, bleibt auf Ihrem Gerät: die Anschrift Ihres Betriebs, die Namen Ihrer Dienstleister, der Kontakt Ihrer datenschutzbeauftragten Person. Der Text entsteht im Browser, es gibt keine Übertragung an einen Server und nichts wird gespeichert. Bei einem Werkzeug für Datenschutztexte wäre alles andere auch schwer zu erklären — die Liste der eingesetzten Dienste ist ein recht genaues Abbild der technischen Ausstattung eines Betriebs.",
    faq: [
      {
        q: "Warum stützt der Text die Webanalyse nicht auf ein berechtigtes Interesse?",
        a: "Weil das Speichern und Auslesen von Informationen auf dem Endgerät nach § 25 Abs. 1 TDDDG eine Einwilligung verlangt, sobald es nicht technisch notwendig ist. Für die Reichweitenmessung gilt das praktisch immer. Ein Muster, das hier ein berechtigtes Interesse behauptet, ist bequemer und falsch.",
      },
      {
        q: "Muss ich jeden eingesetzten Dienst namentlich nennen?",
        a: "Die Verordnung verlangt, dass Betroffene die Verarbeitung nachvollziehen können, und dazu gehört in aller Regel, wer die Daten erhält. Der Name des Hosters, des Analysewerkzeugs oder des Zahlungsdienstleisters gehört deshalb hinein. Wo der Generator ein Feld dafür anbietet, ist die Angabe nicht schmückendes Beiwerk.",
      },
      {
        q: "Was ist der Unterschied zwischen technisch notwendigen und anderen Cookies?",
        a: "Technisch notwendig ist, was die Seite braucht, um zu funktionieren — eine Sitzung, ein Warenkorb, der Schutz eines Formulars. Alles andere, insbesondere Reichweitenmessung und Werbung, darf erst nach einer Einwilligung gesetzt werden. Die Abschnitte im erzeugten Text sind entsprechend getrennt und nennen unterschiedliche Rechtsgrundlagen.",
      },
      {
        q: "Brauche ich eine datenschutzbeauftragte Person?",
        a: "Nicht jeder Betrieb. Eine Benennungspflicht besteht unter anderem, wenn die Kerntätigkeit in umfangreicher Verarbeitung besonderer Datenkategorien oder in umfangreicher regelmäßiger Beobachtung besteht. Kreuzen Sie das Feld nur an, wenn Sie tatsächlich jemanden benannt haben — eine erfundene Stelle im Text ist schlechter als keine.",
      },
      {
        q: "Ersetzt dieses Werkzeug eine anwaltliche Prüfung?",
        a: "Nein. Es setzt ein Muster aus Bausteinen zusammen und zeigt, welche Angaben zu welcher Verarbeitung gehören. Ob die Auswahl zu Ihrem Betrieb passt und ob Sie alle Verarbeitungen erfasst haben, kann es nicht wissen. Lassen Sie den Text prüfen, bevor Sie ihn veröffentlichen.",
      },
    ],
    related: ["impressum-generator", "ki-kennzeichnung-bilder"],
  },
  en: {
    intro: [
      "A privacy policy answers a single question, separately for every operation: what happens to my data, and on what legal basis? That is exactly where most freely available samples fail. They list the services a website uses but name neither the purpose nor the legal basis — and so they do not satisfy Article 13 of the General Data Protection Regulation, even though the text looks complete.",
      "This generator works with blocks. You enter the controller and tick what applies to your website: external hosting, server log files, a contact form, cookies, web analytics, a newsletter, a map service, web fonts, videos, social networks, payment providers, a booking system, chat, job applications, transfers to a third country. Each tick produces a section stating the purpose and the legal basis; removing a tick takes it out again.",
      "The distinction between consent and legitimate interest is hard-wired here rather than a matter of taste. Web analytics, embedded maps, videos and externally loaded fonts are placed on Article 6 (1) (a) GDPR together with section 25 (1) TDDDG — that is, on consent. A sample that claims a legitimate interest at those points puts an incorrect statement on your site, and there it sits in black and white.",
    ],
    useCases: [
      {
        title: "A site with no analytics and no advertising",
        text: "The commonest case for a small business: hosting, server log files, a contact form, nothing else. Untick everything you do not use — the text gets shorter and more accurate at the same time.",
      },
      {
        title: "An online shop with a payment provider",
        text: "Orders run on Article 6 (1) (b) GDPR, payments through providers acting on their own responsibility, and the retention periods under commercial and tax law remain unaffected.",
      },
      {
        title: "A page with a map and embedded videos",
        text: "Both services open a connection to a third-party server when they load, transmitting the IP address. The matching sections say precisely that and rest on consent.",
      },
      {
        title: "A business advertising vacancies",
        text: "Application documents are processing in their own right under section 26 (1) BDSG, with their own deletion period. The block names both, instead of letting applications disappear under “getting in touch”.",
      },
      {
        title: "Proof-reading your existing policy",
        text: "Assemble the text afresh and compare it section by section with what is on your site. What usually stands out are services switched off long ago, and missing legal bases.",
      },
    ],
    steps: [
      {
        title: "Enter the controller",
        description:
          "Name, complete address and a way to get in touch. If you have appointed a data protection officer, their contact details are added; without an appointment the section stays out, rather than inventing a role that does not exist.",
      },
      {
        title: "Tick how the website is run",
        description:
          "External hosting and server log files apply to almost every website. Where you know the provider and the location of the servers, enter both — that turns a general formula into a statement someone can check.",
      },
      {
        title: "Choose contact channels and analysis",
        description:
          "Contact form, email, telephone; then technically necessary cookies, cookies requiring consent along with the consent tool in use, and web analytics with the name of the tool where applicable.",
      },
      {
        title: "Name the embedded services",
        description:
          "Map service, web fonts, videos and content delivery network. For fonts the choice between local delivery and Google Fonts decides the whole paragraph — in data protection terms the two are not the same case.",
      },
      {
        title: "Check it, copy it, link it",
        description:
          "Read the preview against what your site actually loads. Then copy the text or download it as a file and link to it from every page, usually from the footer.",
      },
    ],
    privacy:
      "Everything you enter stays on your device: the address of your business, the names of your service providers, the contact details of your data protection officer. The text is built in the browser, nothing is transmitted to a server and nothing is stored. For a tool that writes data protection texts, anything else would be hard to explain — the list of services in use is a fairly precise picture of a company's technical setup.",
    faq: [
      {
        q: "Why does the text not place web analytics on a legitimate interest?",
        a: "Because storing and reading information on a terminal device requires consent under section 25 (1) TDDDG as soon as it is not technically necessary. For audience measurement that is practically always the case. A sample that claims a legitimate interest here is more convenient and wrong.",
      },
      {
        q: "Do I have to name every service I use?",
        a: "The regulation requires that data subjects can follow what happens to their data, and that generally includes who receives it. The name of the host, the analytics tool or the payment provider therefore belongs in the text. Where the generator offers a field for it, filling it in is not decoration.",
      },
      {
        q: "What is the difference between necessary cookies and the rest?",
        a: "Technically necessary means what the site needs in order to work — a session, a shopping basket, protecting a form. Everything else, audience measurement and advertising in particular, may only be set after consent. The sections in the generated text are separated accordingly and cite different legal bases.",
      },
      {
        q: "Do I need a data protection officer?",
        a: "Not every business does. An appointment is required where, among other things, the core activity involves large-scale processing of special categories of data or large-scale regular monitoring. Only tick the box if you have actually appointed someone — an invented role in the text is worse than none.",
      },
      {
        q: "Does this tool replace a legal review?",
        a: "No. It assembles a sample from blocks and shows which statements belong to which processing. Whether that selection fits your business, and whether you have captured every operation, is something it cannot know. Have the text reviewed before you publish it.",
      },
    ],
    related: ["impressum-generator", "ki-kennzeichnung-bilder"],
  },
};

export default guide;
