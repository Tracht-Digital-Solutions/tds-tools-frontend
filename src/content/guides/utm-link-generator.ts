import type { ToolGuideSet } from "~/lib/guides";

const guide: ToolGuideSet = {
  de: {
    intro: [
      "Wer Werbung schaltet, einen Newsletter verschickt oder einen Flyer verteilt, sieht in der Website-Statistik hinterher meist nur eines: Es kamen Besucher. Woher genau, bleibt offen — und damit auch die Frage, welche Maßnahme sich gelohnt hat. UTM-Parameter lösen das, indem sie die Herkunft an den Link selbst hängen. Ihre Statistik liest sie aus und ordnet den Besuch der richtigen Quelle zu.",
      "Ein solcher Link sieht aus wie Ihre normale Adresse, ergänzt um Angaben wie utm_source, utm_medium und utm_campaign. Dieses Werkzeug baut ihn korrekt zusammen: Es kodiert Sonderzeichen, wandelt Ihre Eingaben in saubere Kleinschreibung ohne Leerzeichen um und zeigt den fertigen Link zum Kopieren an.",
      "Der Nutzen steht und fällt mit der Einheitlichkeit. Newsletter, newsletter und Newsletter-Mai sind für die Auswertung drei verschiedene Quellen, und niemand merkt es, bis der Bericht in fünf Zeilen zerfällt, die alle dasselbe meinen. Legen Sie sich einmal eine Schreibweise fest und halten Sie sich daran.",
    ],
    useCases: [
      {
        title: "Newsletter auswerten",
        text: "Ein eigener Link je Aussendung zeigt, welches Thema tatsächlich Klicks gebracht hat — und nicht nur, wer die Mail geöffnet hat.",
      },
      {
        title: "Bezahlte Anzeigen trennen",
        text: "Getrennte Kennzeichnung je Plattform und Anzeige macht sichtbar, welches Motiv Besucher bringt und welches nur Budget verbraucht.",
      },
      {
        title: "Print messbar machen",
        text: "Der Link hinter einem QR-Code auf Flyer, Plakat oder Fahrzeug macht aus Druckwerbung eine Maßnahme mit nachvollziehbarem Ergebnis.",
      },
      {
        title: "Einträge in Verzeichnissen",
        text: "Branchenbücher, Kleinanzeigen und Kartendienste bekommen jeweils eigene Links — so sehen Sie, welcher Eintrag seinen Preis wert ist.",
      },
      {
        title: "Social-Media-Profile",
        text: "Der Link im Profil bekommt eine eigene Kennzeichnung, getrennt von Links in einzelnen Beiträgen.",
      },
    ],
    steps: [
      {
        title: "Zieladresse eintragen",
        description:
          "Beginnen Sie mit der Seite, auf der die Besucher landen sollen — vollständig mit https:// und möglichst genau die passende Unterseite, nicht pauschal die Startseite.",
      },
      {
        title: "Quelle und Medium angeben",
        description:
          "Die Quelle ist, wo der Link steht: newsletter, instagram, flyer. Das Medium ist die Art: email, social, print, cpc. Beide Felder sind das Minimum, damit eine Auswertung überhaupt etwas trennen kann.",
      },
      {
        title: "Kampagne benennen",
        description:
          "Die Kampagne fasst eine Maßnahme zusammen, etwa fruehjahr-2026 oder tag-der-offenen-tuer. Verwenden Sie denselben Namen über alle Kanäle einer Aktion, sonst lässt sie sich später nicht als Ganzes auswerten.",
      },
      {
        title: "Link kopieren und einsetzen",
        description:
          "Kopieren Sie den fertigen Link und verwenden Sie ihn überall dort, wo diese Quelle verlinkt. Prüfen Sie ihn einmal im Browser: Die Seite muss normal laden, die Parameter stehen sichtbar in der Adresszeile.",
      },
    ],
    privacy:
      "Der Link wird ausschließlich in Ihrem Browser zusammengesetzt; weder Zieladresse noch Kampagnenname werden übertragen oder gespeichert. Ein Hinweis zur Sache selbst: UTM-Parameter sind für Ihre Besucher sichtbar, sie stehen in der Adresszeile. Schreiben Sie deshalb nichts hinein, was nicht öffentlich sein soll — interne Kürzel, Budgetzahlen oder Kundennamen haben dort nichts verloren.",
    faq: [
      {
        q: "Welche Parameter brauche ich wirklich?",
        a: "utm_source und utm_medium sind das Minimum, utm_campaign kommt dazu, sobald Sie mehrere Aktionen unterscheiden wollen. utm_term und utm_content sind Feinheiten für Suchanzeigen und A/B-Tests und können in den meisten Fällen leer bleiben.",
      },
      {
        q: "Schadet ein UTM-Link meinem SEO?",
        a: "Für Links, die auf Ihre eigene Seite zeigen und in Werbung, Newslettern oder auf Druckerzeugnissen stehen, ist das unkritisch. Verwenden Sie UTM-Parameter aber nicht für die interne Verlinkung innerhalb Ihrer Website — dort erzeugen sie mehrere Adressen für dieselbe Seite und stören die Auswertung.",
      },
      {
        q: "Warum werden meine Eingaben kleingeschrieben?",
        a: "Weil Auswertungswerkzeuge Groß- und Kleinschreibung unterscheiden. Newsletter und newsletter erscheinen als zwei getrennte Quellen im Bericht. Das Werkzeug vereinheitlicht deshalb automatisch und ersetzt Leerzeichen durch Bindestriche.",
      },
      {
        q: "Funktioniert das auch ohne Google Analytics?",
        a: "Ja. UTM-Parameter sind eine reine Konvention in der Adresse, kein Google-Produkt. Matomo, Plausible, Fathom und praktisch jede Server-Logauswertung verstehen sie ebenfalls.",
      },
      {
        q: "Kann ich den Link kürzen?",
        a: "Ja, ein Kurzlink-Dienst oder eine eigene Weiterleitung behält die Parameter beim Weiterleiten bei. Für gedruckte Werbung ist das sinnvoll — dort steht ohnehin meist ein QR-Code, und dann spielt die Länge des Links keine Rolle mehr.",
      },
    ],
    related: ["qr-code-generator", "kontrast-checker"],
  },
  en: {
    intro: [
      "If you run ads, send a newsletter or hand out flyers, your website statistics afterwards usually tell you one thing: visitors arrived. Exactly where from stays open — and with it the question of which effort paid off. UTM parameters solve that by attaching the origin to the link itself. Your analytics reads them and files the visit under the right source.",
      "Such a link looks like your normal address, extended with values like utm_source, utm_medium and utm_campaign. This tool assembles it correctly: it encodes special characters, turns your input into clean lower case without spaces, and shows the finished link ready to copy.",
      "The value of all this stands or falls with consistency. Newsletter, newsletter and Newsletter-May are three different sources to a report, and nobody notices until it splits into five rows that all mean the same thing. Decide on one spelling and stick to it.",
    ],
    useCases: [
      {
        title: "Measuring a newsletter",
        text: "A separate link per send shows which subject actually produced clicks — not merely who opened the mail.",
      },
      {
        title: "Separating paid ads",
        text: "Distinct tagging per platform and creative makes it visible which one brings visitors and which one only spends budget.",
      },
      {
        title: "Making print measurable",
        text: "The link behind a QR code on a flyer, poster or vehicle turns printed advertising into something with a traceable result.",
      },
      {
        title: "Directory listings",
        text: "Trade directories, classifieds and map services each get their own link — so you can see which listing is worth its price.",
      },
      {
        title: "Social media profiles",
        text: "The link in a profile gets its own tagging, kept separate from links inside individual posts.",
      },
    ],
    steps: [
      {
        title: "Enter the destination",
        description:
          "Start with the page visitors should land on — complete with https://, and ideally the precise sub-page rather than the home page by default.",
      },
      {
        title: "Give a source and a medium",
        description:
          "The source is where the link sits: newsletter, instagram, flyer. The medium is the kind: email, social, print, cpc. Both are the minimum for a report to separate anything at all.",
      },
      {
        title: "Name the campaign",
        description:
          "The campaign groups one effort together, such as spring-2026 or open-day. Use the same name across every channel of one activity, or it cannot be evaluated as a whole later.",
      },
      {
        title: "Copy the link and use it",
        description:
          "Copy the finished link and use it everywhere that source links to you. Try it once in a browser: the page must load normally, with the parameters visible in the address bar.",
      },
    ],
    privacy:
      "The link is assembled entirely in your browser; neither the destination nor the campaign name is transmitted or stored. A note about the thing itself: UTM parameters are visible to your visitors, sitting in plain view in the address bar. So do not put anything in them that should not be public — internal codes, budget figures or client names have no place there.",
    faq: [
      {
        q: "Which parameters do I actually need?",
        a: "utm_source and utm_medium are the minimum; utm_campaign joins them as soon as you want to tell several activities apart. utm_term and utm_content are refinements for search ads and A/B tests and can stay empty in most cases.",
      },
      {
        q: "Do UTM links hurt my SEO?",
        a: "For links pointing at your own site from ads, newsletters or printed material this is not a concern. Do not use UTM parameters for internal links within your website, though — there they create several addresses for one page and muddle the reporting.",
      },
      {
        q: "Why is my input converted to lower case?",
        a: "Because analytics tools distinguish upper and lower case. Newsletter and newsletter appear as two separate sources in the report. The tool therefore normalises automatically and replaces spaces with hyphens.",
      },
      {
        q: "Does this work without Google Analytics?",
        a: "Yes. UTM parameters are a convention in the address, not a Google product. Matomo, Plausible, Fathom and practically any server log analysis understand them too.",
      },
      {
        q: "Can I shorten the link?",
        a: "Yes — a link shortener or a redirect of your own preserves the parameters when forwarding. For printed advertising that makes sense; there a QR code usually carries the link anyway, at which point its length stops mattering.",
      },
    ],
    related: ["qr-code-generator", "kontrast-checker"],
  },
};

export default guide;
