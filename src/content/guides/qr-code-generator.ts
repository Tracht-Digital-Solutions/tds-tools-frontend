import type { ToolGuideSet } from "~/lib/guides";

const guide: ToolGuideSet = {
  de: {
    intro: [
      "Ein QR-Code ist nichts weiter als eine Adresse in Bildform. Wer ihn mit der Handykamera erfasst, landet direkt auf Ihrer Website, im WLAN Ihres Betriebs oder mit Ihren Kontaktdaten im Adressbuch — ohne dass jemand etwas abtippen muss. Genau da liegt der praktische Nutzen: Jede Ziffer, die ein Kunde selbst eingeben soll, ist eine Gelegenheit, sich zu vertippen und aufzugeben.",
      "Dieser Generator erzeugt vier Arten von Codes: freie URLs und Texte, WLAN-Zugänge und Kontaktdaten als vCard. Sie können Vorder- und Hintergrundfarbe an Ihr Erscheinungsbild anpassen und das Ergebnis als PNG für den Druck oder als SVG für die skalierbare Weiterverarbeitung herunterladen.",
      "Wichtig zu wissen: Der Code enthält das Ziel unmittelbar — er ist keine Weiterleitung über einen fremden Dienst. Das bedeutet, dass er dauerhaft funktioniert, aber auch, dass sich das Ziel nachträglich nicht ändern lässt. Wenn Sie damit rechnen, die Adresse später zu wechseln, verweisen Sie besser auf eine eigene Seite, deren Inhalt Sie selbst anpassen können.",
    ],
    useCases: [
      {
        title: "Gäste-WLAN ohne Zettel",
        text: "Der WLAN-Code hinterlegt Netzname und Passwort. Gäste verbinden sich mit einem Scan, statt ein 20-stelliges Passwort von einem Aushang abzuschreiben.",
      },
      {
        title: "Speisekarte, Preisliste, Anleitung",
        text: "Ein Code am Tisch, am Regal oder auf der Maschine führt zur aktuellen Fassung — und Sie tauschen künftig die Seite aus statt des Aufstellers.",
      },
      {
        title: "Visitenkarte, die im Adressbuch landet",
        text: "Der vCard-Code überträgt Name, Firma, Telefon und E-Mail in einem Zug. Deutlich zuverlässiger, als eine Karte später abzutippen.",
      },
      {
        title: "Flyer und Anzeigen messbar machen",
        text: "Zeigt der Code auf einen Link mit UTM-Parametern, sehen Sie in Ihrer Statistik, wie viele Besucher tatsächlich aus dem Print gekommen sind.",
      },
      {
        title: "Formulare am Fahrzeug oder auf der Baustelle",
        text: "Ein Aufkleber mit Code führt direkt zum Schadens-, Abnahme- oder Kontaktformular, ohne dass jemand die Adresse kennt.",
      },
    ],
    steps: [
      {
        title: "Art des Codes wählen",
        description:
          "Entscheiden Sie zwischen URL beziehungsweise freiem Text, WLAN-Zugang und Kontaktdaten. Die Eingabefelder darunter richten sich nach dieser Auswahl.",
      },
      {
        title: "Inhalt eintragen",
        description:
          "Tragen Sie die Zieladresse ein — bei einer Website vollständig mit https://. Beim WLAN kommen Netzname und Passwort dazu, bei der vCard Name, Firma, Telefon und E-Mail.",
      },
      {
        title: "Farben anpassen",
        description:
          "Vorder- und Hintergrundfarbe lassen sich an Ihr Erscheinungsbild angleichen. Achten Sie auf deutlichen Unterschied zwischen beiden: Ein zu heller Code wird von vielen Kameras nicht erkannt.",
      },
      {
        title: "Prüfen und herunterladen",
        description:
          "Scannen Sie den Code einmal mit dem eigenen Telefon, bevor Sie ihn in den Druck geben. Danach als PNG für Papier oder als SVG für skalierbare Layouts speichern.",
      },
    ],
    privacy:
      "Der Code entsteht vollständig in Ihrem Browser. Weder die Zieladresse noch Ihr WLAN-Passwort oder Ihre Kontaktdaten werden an einen Server übertragen oder gespeichert — das Werkzeug hat gar keine Gegenstelle, an die es etwas senden könnte. Sie können die Seite nach dem Laden vom Netz nehmen und trotzdem weiterarbeiten. Bei einem WLAN-Passwort ist das kein akademischer Unterschied: Viele Online-Generatoren senden genau diese Eingabe zur Erzeugung an ihren Server.",
    faq: [
      {
        q: "Läuft der QR-Code irgendwann ab?",
        a: "Nein. Der Code enthält das Ziel direkt und ist nicht an einen Dienst gebunden, der ihn auflösen müsste. Er funktioniert, solange die Zieladresse erreichbar ist. Genau deshalb lässt sich das Ziel aber auch nicht nachträglich ändern.",
      },
      {
        q: "PNG oder SVG — was soll ich nehmen?",
        a: "PNG für alles, was in fester Größe gedruckt oder eingefügt wird. SVG, wenn der Code noch vergrößert wird, etwa für ein Plakat oder eine Fahrzeugbeschriftung: Ein SVG bleibt in jeder Größe scharf, ein PNG wird beim Hochskalieren unsauber.",
      },
      {
        q: "Wie groß muss ein gedruckter QR-Code sein?",
        a: "Als Faustregel gilt ein Zehntel des Leseabstands: Wer aus einem Meter Entfernung scannt, braucht etwa zehn Zentimeter Kantenlänge. Lassen Sie außerdem einen weißen Rand von der Breite mehrerer Module stehen — ohne diese Ruhezone finden viele Kameras den Code nicht.",
      },
      {
        q: "Warum wird mein Code nicht erkannt?",
        a: "Meist liegt es am Kontrast oder am fehlenden Rand. Der Vordergrund muss deutlich dunkler sein als der Hintergrund, invertierte Codes lesen viele Kameras nicht. Auch sehr lange Inhalte machen das Muster feiner und damit schwerer erkennbar — kürzen Sie die Adresse, wenn möglich.",
      },
      {
        q: "Kann ich damit Codes für Kunden erstellen?",
        a: "Ja, das Werkzeug ist kostenlos und ohne Anmeldung nutzbar, auch geschäftlich. Wenn Sie regelmäßig viele Codes brauchen oder sie aus eigenen Daten erzeugen wollen, lässt sich das automatisieren — sprechen Sie mich an.",
      },
    ],
    related: ["utm-link-generator", "bild-komprimieren"],
  },
  en: {
    intro: [
      "A QR code is nothing more than an address in the shape of a picture. Point a phone camera at it and the person lands directly on your website, on your business Wi-Fi, or with your contact details in their address book — without anyone having to type. That is where the practical value sits: every character a customer is asked to enter themselves is an opportunity to mistype it and give up.",
      "This generator produces four kinds of code: plain URLs and text, Wi-Fi credentials, and contact details as a vCard. You can match the foreground and background colours to your own look, and download the result as a PNG for print or an SVG for scalable use.",
      "One thing worth knowing: the code contains its destination directly — it is not a redirect through someone else's service. That means it keeps working indefinitely, but it also means the destination cannot be changed afterwards. If you expect the address to move, point the code at a page of your own whose content you can edit instead.",
    ],
    useCases: [
      {
        title: "Guest Wi-Fi without a printed note",
        text: "The Wi-Fi code carries the network name and password. Guests connect with one scan instead of copying a 20-character password off a sign.",
      },
      {
        title: "Menu, price list, instructions",
        text: "A code on the table, the shelf or the machine leads to the current version — and from then on you replace the page, not the stand.",
      },
      {
        title: "A business card that lands in the address book",
        text: "The vCard code transfers name, company, phone and email in one go. Considerably more reliable than typing a card up later.",
      },
      {
        title: "Making print measurable",
        text: "Point the code at a link carrying UTM parameters and your analytics will show how many visitors genuinely came from the printed piece.",
      },
      {
        title: "Forms on a vehicle or a building site",
        text: "A sticker with a code leads straight to the damage, handover or contact form, without anyone needing to know the address.",
      },
    ],
    steps: [
      {
        title: "Choose the kind of code",
        description:
          "Decide between a URL or free text, Wi-Fi access, and contact details. The input fields below change to match that choice.",
      },
      {
        title: "Enter the content",
        description:
          "Fill in the destination — for a website, complete with https://. Wi-Fi adds the network name and password; a vCard adds name, company, phone and email.",
      },
      {
        title: "Adjust the colours",
        description:
          "Foreground and background can be matched to your own look. Keep a clear difference between the two: a code that is too light will not be recognised by many cameras.",
      },
      {
        title: "Test it, then download",
        description:
          "Scan the code once with your own phone before sending it to print. Then save it as a PNG for paper, or as an SVG for layouts that scale.",
      },
    ],
    privacy:
      "The code is created entirely in your browser. Neither the destination address nor your Wi-Fi password or contact details are sent to a server or stored anywhere — the tool has no counterpart to send anything to. You can disconnect from the network after the page has loaded and carry on working. With a Wi-Fi password that is not an academic distinction: many online generators send exactly that input to their server to produce the image.",
    faq: [
      {
        q: "Does the QR code expire?",
        a: "No. The code contains its destination directly and is not tied to a service that has to resolve it. It works for as long as the destination is reachable. That is also precisely why the destination cannot be changed afterwards.",
      },
      {
        q: "PNG or SVG — which should I use?",
        a: "PNG for anything printed or placed at a fixed size. SVG when the code will be enlarged, for a poster or vehicle lettering: an SVG stays sharp at any size, while a PNG becomes ragged when scaled up.",
      },
      {
        q: "How big does a printed QR code need to be?",
        a: "A rule of thumb is one tenth of the reading distance: scanning from one metre away needs roughly ten centimetres of edge length. Also leave a white margin several modules wide — without that quiet zone many cameras will not find the code at all.",
      },
      {
        q: "Why is my code not being recognised?",
        a: "Usually it is the contrast or the missing margin. The foreground has to be clearly darker than the background; many cameras will not read an inverted code. Very long content also makes the pattern finer and harder to read — shorten the address where you can.",
      },
      {
        q: "Can I create codes for clients with this?",
        a: "Yes, the tool is free and needs no sign-up, commercial use included. If you regularly need many codes, or want to generate them from your own data, that can be automated — get in touch.",
      },
    ],
    related: ["utm-link-generator", "bild-komprimieren"],
  },
};

export default guide;
