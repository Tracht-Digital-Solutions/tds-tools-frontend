import type { ToolGuideSet } from "~/lib/guides";

const guide: ToolGuideSet = {
  de: {
    intro: [
      "Die meisten Passwörter in kleinen Betrieben sind gewachsen, nicht gewählt: der Firmenname mit einer Jahreszahl, der Ort mit einem Ausrufezeichen, ein Muster, das sich auf der Tastatur gut anfühlt. Angriffe raten heute aber nicht Zeichen für Zeichen, sondern probieren Listen aus geleakten Passwörtern und ihre naheliegenden Abwandlungen durch. Gegen diese Listen hilft nur eines: ein Passwort, das niemand gewählt hat, sondern der Zufall.",
      "Dieser Generator erzeugt genau solche Passwörter. Länge und Zeichenauswahl — Großbuchstaben, Kleinbuchstaben, Ziffern, Sonderzeichen — stellen Sie selbst ein, und eine Anzeige schätzt die Stärke des Ergebnisses ein. Auf Wunsch bleiben leicht verwechselbare Zeichen wie große i, kleine L, Null und großes O außen vor: sinnvoll überall dort, wo ein Passwort auch einmal vorgelesen oder abgeschrieben werden muss.",
      "Zur Einordnung: Länge wirkt stärker als Sonderzeichen. Ein zwanzig Zeichen langes Passwort aus Buchstaben und Ziffern ist erheblich schwerer zu brechen als ein achtstelliges mit drei Sonderzeichen — und Sie müssen sich ohnehin keines von beiden merken, wenn Sie einen Passwortmanager verwenden.",
    ],
    useCases: [
      {
        title: "Zugänge für neue Mitarbeitende",
        text: "Ein zufälliges Erstpasswort, das beim ersten Anmelden geändert wird, statt eines Schemas, das nach dem dritten Mal jeder kennt.",
      },
      {
        title: "Router, Kasse, Netzwerkdrucker",
        text: "Geräte, deren Werkspasswort im Handbuch steht und im Internet auffindbar ist. Hier ohne verwechselbare Zeichen erzeugen — es wird abgetippt.",
      },
      {
        title: "Gäste-WLAN mit eigenem Passwort",
        text: "Ein langes Zufallspasswort für das Gastnetz, getrennt vom Betriebsnetz. Zusammen mit einem QR-Code muss es niemand eingeben.",
      },
      {
        title: "Datenbank- und Dienstzugänge",
        text: "Zugangsdaten, die nur Software benutzt, sollten maximal lang und zufällig sein — sie werden ohnehin nie von Hand eingegeben.",
      },
      {
        title: "Verschlüsselte Archive und Sicherungen",
        text: "Ein starkes Passwort für Backups ist die letzte Verteidigungslinie, wenn eine Festplatte oder ein Stick verloren geht.",
      },
    ],
    steps: [
      {
        title: "Länge festlegen",
        description:
          "Stellen Sie die gewünschte Länge über den Schieberegler ein. Für Zugänge, die ein Mensch tippt, sind sechzehn Zeichen ein guter Ausgangspunkt; für alles, was in einem Passwortmanager liegt, dürfen es deutlich mehr sein.",
      },
      {
        title: "Zeichenarten auswählen",
        description:
          "Aktivieren Sie Großbuchstaben, Kleinbuchstaben, Ziffern und Sonderzeichen nach Bedarf. Manche Systeme verbieten bestimmte Sonderzeichen — dann schalten Sie sie hier ab, statt das Ergebnis hinterher von Hand zu verändern.",
      },
      {
        title: "Verwechselbare Zeichen ausschließen",
        description:
          "Wenn das Passwort vorgelesen, abgeschrieben oder ausgedruckt wird, blenden Sie große i, kleine L, Null und großes O aus. Das kostet etwas Stärke und erspart die Rückfrage, ob das nun eine Eins oder ein L war.",
      },
      {
        title: "Erzeugen, prüfen, übernehmen",
        description:
          "Lassen Sie sich ein neues Passwort erzeugen, achten Sie auf die Stärkeanzeige und kopieren Sie es direkt in Ihren Passwortmanager. Legen Sie es dort ab, bevor Sie die Seite schließen — das Werkzeug speichert nichts.",
      },
    ],
    privacy:
      "Das Passwort entsteht in Ihrem Browser über den kryptografischen Zufallsgenerator des Systems und verlässt Ihr Gerät nicht. Es wird nicht übertragen, nicht protokolliert und nirgends zwischengespeichert; nach dem Schließen der Seite ist es weg. Bei einem Passwortgenerator ist das der entscheidende Punkt — ein Dienst, der das Passwort auf seinem Server erzeugt, kennt es, und Sie können nicht überprüfen, was er damit tut.",
    faq: [
      {
        q: "Wie lang sollte ein Passwort sein?",
        a: "Für Zugänge, die ein Mensch eingibt, sind sechzehn zufällige Zeichen eine gute Untergrenze. Für Zugänge, die nur Software verwendet, spricht nichts gegen dreißig oder mehr. Länge bringt mehr Sicherheit als exotische Sonderzeichen.",
      },
      {
        q: "Ist der Zufall hier wirklich zufällig?",
        a: "Das Werkzeug nutzt die Schnittstelle crypto.getRandomValues des Browsers, also den kryptografisch sicheren Zufallsgenerator des Betriebssystems. Das ist derselbe Mechanismus, auf dem auch die Verschlüsselung Ihrer Verbindungen aufbaut — kein simpler Zufall wie bei Math.random.",
      },
      {
        q: "Muss ich Passwörter regelmäßig wechseln?",
        a: "Nach heutiger Empfehlung des BSI nicht mehr routinemäßig. Ein starkes, einzigartiges Passwort bleibt so lange gültig, bis es Anlass zur Sorge gibt — etwa nach einem bekannt gewordenen Datenleck. Erzwungene Wechsel führen erfahrungsgemäß zu schwächeren Passwörtern mit hochgezählter Endziffer.",
      },
      {
        q: "Wie merke ich mir solche Passwörter?",
        a: "Gar nicht. Nutzen Sie einen Passwortmanager und merken Sie sich genau ein starkes Hauptpasswort. Alles andere liegt verschlüsselt im Manager und wird beim Anmelden eingesetzt.",
      },
      {
        q: "Kann ich das Werkzeug im Betrieb einsetzen?",
        a: "Ja, es ist kostenlos, ohne Anmeldung nutzbar und läuft lokal — es gibt keine Übertragung, die eine betriebliche Richtlinie verletzen könnte. Wenn Sie Zugänge für mehrere Personen strukturiert verwalten wollen, ist ein Passwortmanager der nächste Schritt.",
      },
    ],
    related: ["qr-code-generator", "json-formatter"],
  },
};

export default guide;
