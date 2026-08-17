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
  en: {
    intro: [
      "Most passwords in a small business have grown rather than been chosen: the company name with a year, the town with an exclamation mark, a pattern that feels good on the keyboard. Attacks today do not guess character by character, though — they work through lists of leaked passwords and their obvious variations. There is only one defence against those lists: a password nobody chose, but chance produced.",
      "This generator produces exactly that kind of password. You set the length and the character sets — upper case, lower case, digits, symbols — and a meter estimates the strength of the result. Optionally, easily confused characters such as capital i, lower-case L, zero and capital O are left out: worth doing wherever a password will be read aloud or copied by hand.",
      "For perspective: length does more than symbols do. A twenty-character password of letters and digits is considerably harder to break than an eight-character one with three symbols — and you need to memorise neither of them if you use a password manager.",
    ],
    useCases: [
      {
        title: "Accounts for new staff",
        text: "A random first password that gets changed at first sign-in, instead of a scheme everyone recognises after the third time.",
      },
      {
        title: "Router, till, network printer",
        text: "Devices whose factory password is printed in the manual and findable online. Generate these without ambiguous characters — they get typed by hand.",
      },
      {
        title: "Guest Wi-Fi with its own password",
        text: "A long random password for the guest network, separate from the business one. Paired with a QR code, nobody has to enter it at all.",
      },
      {
        title: "Database and service accounts",
        text: "Credentials only software ever uses should be as long and as random as possible — they are never typed by a person anyway.",
      },
      {
        title: "Encrypted archives and backups",
        text: "A strong password on a backup is the last line of defence when a drive or a stick goes missing.",
      },
    ],
    steps: [
      {
        title: "Set the length",
        description:
          "Use the slider to choose the length. For accounts a human types, sixteen characters is a good starting point; for anything living in a password manager, considerably more is fine.",
      },
      {
        title: "Pick the character sets",
        description:
          "Enable upper case, lower case, digits and symbols as needed. Some systems forbid particular symbols — switch them off here rather than editing the result by hand afterwards.",
      },
      {
        title: "Exclude ambiguous characters",
        description:
          "If the password will be read aloud, copied down or printed, hide capital i, lower-case L, zero and capital O. It costs a little strength and saves the question of whether that was a one or an L.",
      },
      {
        title: "Generate, check, store",
        description:
          "Generate a password, watch the strength meter, and copy it straight into your password manager. Store it there before you close the page — the tool keeps nothing.",
      },
    ],
    privacy:
      "The password is created in your browser using the operating system's cryptographic random generator, and it does not leave your device. It is not transmitted, not logged and not cached anywhere; once you close the page it is gone. With a password generator that is the decisive point — a service that generates the password on its server knows it, and you have no way to check what it does with it.",
    faq: [
      {
        q: "How long should a password be?",
        a: "For accounts a person types, sixteen random characters is a sensible floor. For accounts only software uses, there is nothing against thirty or more. Length buys more security than exotic symbols do.",
      },
      {
        q: "Is the randomness here genuinely random?",
        a: "The tool uses the browser's crypto.getRandomValues interface, which is the operating system's cryptographically secure random generator. That is the same mechanism your encrypted connections are built on — not the simple randomness of Math.random.",
      },
      {
        q: "Should I change passwords regularly?",
        a: "By current guidance, not as a routine. A strong, unique password stays valid until there is a reason for concern — after a known breach, for instance. Forced rotation reliably produces weaker passwords with an incremented digit on the end.",
      },
      {
        q: "How am I supposed to remember these?",
        a: "You are not. Use a password manager and memorise exactly one strong master password. Everything else lives encrypted in the manager and is filled in for you at sign-in.",
      },
      {
        q: "Can I use this at work?",
        a: "Yes. It is free, needs no sign-up and runs locally, so there is no transmission that could breach a company policy. If you need to manage accounts for several people in a structured way, a password manager is the next step.",
      },
    ],
    related: ["qr-code-generator", "json-formatter"],
  },
};

export default guide;
