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
};

export default guide;
