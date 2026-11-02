import type { ToolGuideSet } from "~/lib/guides";

const guide: ToolGuideSet = {
  updatedAt: "2026-11-02",
  de: {
    intro: [
      "Bevor ein Termin vor Ort zugesagt wird, stellt sich oft eine einfache Frage: Wie weit ist es, und was kostet die Anfahrt? Wer dafür jedes Mal einen Routenplaner öffnet und die Kilometer mit dem Taschenrechner malnimmt, verliert Zeit an einer Aufgabe, die sich in einem Schritt erledigen lässt.",
      "Dieses Werkzeug rechnet die Strecke von Schwarzenbek bis zur eingegebenen Adresse aus. Es nennt die Kilometer, die Fahrzeit und die Kosten nach einem frei wählbaren Preis pro Kilometer, wahlweise für die einfache Fahrt oder für Hin- und Rückweg.",
      "Der Startpunkt ist fest die Stadt Schwarzenbek in Schleswig-Holstein. Gerechnet wird mit der schnellsten Autoroute aus OpenStreetMap-Daten, ohne Verkehrslage, Maut oder Fähren als eigene Kosten.",
    ],
    useCases: [
      {
        title: "Anfahrt im Angebot nennen",
        text: "Ein Angebot wird klarer, wenn die Anfahrt als eigene Zeile mit Kilometern dasteht. Die Zahlen lassen sich direkt übernehmen.",
      },
      {
        title: "Termin vor Ort einschätzen",
        text: "Die Fahrzeit zeigt vor der Zusage, wie viel vom Arbeitstag ein Besuch bindet.",
      },
      {
        title: "Einsatzgebiet prüfen",
        text: "Mit einigen Adressen wird schnell sichtbar, wo sich eine Fahrt noch lohnt.",
      },
      {
        title: "Fahrtkosten vergleichen",
        text: "Der Kilometerpreis lässt sich ändern, damit eigene Kalkulation und Pauschale nebeneinander geprüft werden können.",
      },
    ],
    steps: [
      {
        title: "Adresse eingeben",
        description: "Straße, Hausnummer, Postleitzahl, Ort eintragen. Gesucht wird in Deutschland, Österreich, der Schweiz.",
      },
      {
        title: "Kilometerpreis festlegen",
        description: "Vorbelegt sind 0,30 € pro Kilometer. Der Wert ist nur ein Startwert: Jeder Betrieb trägt seinen eigenen Satz ein.",
      },
      {
        title: "Fahrtart wählen",
        description: "Hin- und Rückfahrt ist voreingestellt. Ohne den Haken zählt nur die einfache Strecke.",
      },
      {
        title: "Ergebnis ablesen",
        description: "Das gefundene Ziel steht im Ergebnis. Es lohnt sich, die Adresse dort kurz zu prüfen, bevor die Summe in ein Angebot wandert.",
      },
    ],
    privacy:
      "Anders als die meisten Werkzeuge hier braucht dieses zwei fremde Dienste, denn ein Browser allein kennt weder Adressen noch Straßen. Beim Klick auf Berechnen geht die Adresse an OpenStreetMap Nominatim, die daraus ermittelten Koordinaten gehen an den OSRM-Routendienst. Vor dem Klick wird nichts übertragen, gespeichert wird auf dieser Seite nichts.",
    faq: [
      {
        q: "Warum steht manchmal, die Strecke sei geschätzt?",
        a: "Antwortet der Routendienst nicht, wird die Luftlinie mal 1,3 gerechnet. Das ist eine brauchbare Näherung, aber keine Route, deshalb ist das Ergebnis dann gekennzeichnet.",
      },
      {
        q: "Lässt sich der Startpunkt ändern?",
        a: "Nein, das Werkzeug rechnet immer ab Schwarzenbek. Für andere Startpunkte eignet sich ein allgemeiner Routenplaner besser.",
      },
      {
        q: "Woher kommen die 0,30 € pro Kilometer?",
        a: "Das ist ein gängiger Ausgangswert, keine Vorgabe. Der richtige Satz hängt von Fahrzeug, Kalkulation, Vereinbarung mit dem Kunden ab.",
      },
      {
        q: "Enthält die Summe Umsatzsteuer?",
        a: "Das Werkzeug multipliziert Kilometer mit dem eingetragenen Preis. Ob dieser netto oder brutto gemeint ist, entscheidet der eingetragene Wert.",
      },
    ],
    related: ["stundenzettel", "etiketten-drucken"],
  },
  en: {
    intro: [
      "Before an on-site appointment is agreed, a simple question often comes up: how far is it, and what does the trip cost? Opening a route planner each time and multiplying the kilometres by hand takes time for a job that fits into one step.",
      "This tool works out the route from Schwarzenbek to the address entered. It gives the kilometres, the driving time and the cost at a freely chosen price per kilometre, either one way or as a return trip.",
      "The starting point is always the town of Schwarzenbek in Schleswig-Holstein. It uses the fastest car route from OpenStreetMap data, without traffic and without tolls or ferries as separate costs.",
    ],
    useCases: [
      {
        title: "Stating travel in a quote",
        text: "A quote gets clearer when travel is its own line with kilometres. The figures can be copied straight over.",
      },
      {
        title: "Judging an on-site visit",
        text: "The driving time shows before agreeing how much of the working day a visit takes up.",
      },
      {
        title: "Checking a service area",
        text: "A few addresses quickly show where a trip still pays off.",
      },
      {
        title: "Comparing travel costs",
        text: "The price per kilometre can be changed, so an own calculation and a flat rate can be checked side by side.",
      },
    ],
    steps: [
      {
        title: "Enter the address",
        description: "Enter street, number, postcode and town. The search covers Germany, Austria and Switzerland.",
      },
      {
        title: "Set the price per kilometre",
        description: "It starts at €0.30 per kilometre. That is only a starting value: every business enters its own rate.",
      },
      {
        title: "Choose the trip",
        description: "Return trip is preselected. Without the tick only the one-way distance counts.",
      },
      {
        title: "Read the result",
        description: "The destination found is shown in the result. It is worth checking that address before the total goes into a quote.",
      },
    ],
    privacy:
      "Unlike most tools here, this one needs two outside services, because a browser alone knows neither addresses nor roads. On pressing the button the address goes to OpenStreetMap Nominatim and the resulting coordinates go to the OSRM route service. Nothing is sent before that, and this site stores nothing.",
    faq: [
      {
        q: "Why does it sometimes say the distance is estimated?",
        a: "If the route service does not respond, the straight line times 1.3 is used. That is a usable approximation but not a route, so the result is marked.",
      },
      {
        q: "Can the starting point be changed?",
        a: "No, the tool always calculates from Schwarzenbek. For other starting points a general route planner is the better choice.",
      },
      {
        q: "Where does €0.30 per kilometre come from?",
        a: "It is a common starting value, not a rule. The right rate depends on the vehicle, the calculation and the agreement with the client.",
      },
      {
        q: "Does the total include VAT?",
        a: "The tool multiplies kilometres by the price entered. Whether that price is net or gross is decided by the value entered.",
      },
    ],
    related: ["stundenzettel", "etiketten-drucken"],
  },
};

export default guide;
