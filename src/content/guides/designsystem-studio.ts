import type { ToolGuideSet } from "~/lib/guides";

const guide: ToolGuideSet = {
  updatedAt: "2026-10-21",
  de: {
    intro: [
      "Ein Designsystem ist die Sammlung von Regeln, nach denen eine Website aussieht: welche Farben, welche Schriften, welche Abstände, wie ein Button aussieht und wie er reagiert, wenn man mit der Maus darüberfährt. Wer diese Regeln einmal festlegt, statt jede Seite einzeln zu gestalten, bekommt einen einheitlichen Auftritt und spart bei jeder Erweiterung Zeit.",
      "Das Designsystem-Studio beginnt bei einer einzigen Komponente, zum Beispiel einem Button — Farbe, Ecken, Schrift, Schatten, Hover- und Fokuszustand — und das Studio leitet daraus nach festen Regeln alles Weitere ab: Farbrollen für Text, Flächen und Rahmen, eine Schriftgrößen-Skala, Abstände, Karten, Formularfelder, Navigation und Footer, jeweils mit hellem und dunklem Farbschema. Es gibt dabei keinen Zufall und keine künstliche Intelligenz: Dieselben Eingaben ergeben immer dasselbe Ergebnis.",
      "Danach lässt sich global oder pro Komponente anpassen, Kontrast und Fokuszustand werden nach WCAG geprüft, und das Ergebnis geht als reines CSS, als CSS-Variablen, SCSS, JSON-Design-Tokens, für Tailwind CSS oder Bootstrap hinaus. Alternativ beginnt die Arbeit mit vorhandenem CSS, einer eigenen HTML-Komponente oder dem Stil einer öffentlichen Website.",
    ],
    useCases: [
      {
        title: "Einen einheitlichen Look für eine neue Website festlegen",
        text: "Statt Farben und Abstände auf jeder Seite neu zu wählen, entsteht aus einem Button ein vollständiges Regelwerk, das alle Seiten gemeinsam nutzen.",
      },
      {
        title: "Ein vorhandenes Stylesheet aufräumen",
        text: "Eine gewachsene CSS-Datei einlesen, die erkannten Farben und Radien als Design-Tokens übernehmen und nicht zuordenbare Regeln unverändert behalten.",
      },
      {
        title: "Einen Dunkelmodus ergänzen",
        text: "Aus denselben Farbrollen leitet das Studio ein dunkles Theme ab, prüft dessen Kontraste und erzeugt die passenden Regeln für die Systemeinstellung.",
      },
      {
        title: "Den Stil einer Seite als Ausgangspunkt nehmen",
        text: "Eine öffentliche HTTPS-Seite auswerten und ihren Stil originalgetreu oder als eigenständige Neuinterpretation in mehreren Varianten vergleichen.",
      },
      {
        title: "Ein Theme für Tailwind oder Bootstrap erzeugen",
        text: "Die Design-Tokens als Tailwind-Theme oder als Bootstrap-Variablen ausgeben, damit ein bestehendes Projekt die neuen Farben und Rundungen übernimmt.",
      },
    ],
    steps: [
      {
        title: "Einstieg wählen",
        description:
          "Zur Wahl stehen: eine neue Komponente gestalten, vorhandenes CSS beziehungsweise eine HTML-Komponente importieren oder eine Website per HTTPS-Adresse analysieren.",
      },
      {
        title: "Komponente gestalten",
        description:
          "Der einfache Modus stellt Farben, Ecken, Schrift, Abstände, Schatten und den Hover-Effekt ein. Der Expertenmodus öffnet einzelne Rahmenseiten, Ecken, Transparenzen und Animationen.",
      },
      {
        title: "Designsystem erzeugen und anpassen",
        description:
          "Ein Klick leitet das ganze System ab. Danach folgen Stilrichtung, globale Werte, einzelne Komponenten und eigene Themes — eigene Anpassungen bleiben dabei erhalten.",
      },
      {
        title: "Vorschau und Barrierefreiheit prüfen",
        description:
          "Das Ergebnis erscheint als Komponenten-Übersicht, Verwaltungsoberfläche und Landingpage auf Desktop, Tablet und Smartphone; die Kontrast-Vorschläge lassen sich bei Bedarf übernehmen.",
      },
      {
        title: "Exportieren",
        description:
          "Das Designsystem im gewünschten Format herunterladen. Das Paket enthält ausschließlich HTML und CSS beziehungsweise CSS-nahe Konfiguration, keinen JavaScript-Code.",
      },
    ],
    privacy:
      "Gestaltung, Vorschau, Import und Barrierefreiheits-Prüfung laufen im Browser; ohne Premium wird nichts gespeichert, auch nicht im Browser-Speicher. Für eine Website-Analyse lädt unser Server genau die angegebene Seite und ihre Stylesheets, entfernt Skripte und gibt nur das an den Browser weiter — Texte, Bilder und Logos der Seite werden nicht übernommen. Beim Export erzeugt der Server die Datei aus dem aktuellen Entwurf und speichert ihn nicht.",
    faq: [
      {
        q: "Brauche ich CSS-Kenntnisse?",
        a: "Nein. Der einfache Modus nennt jede Einstellung in Alltagssprache, die CSS-Eigenschaft steht klein daneben. Wer CSS beherrscht, findet im Expertenmodus und im Code-Editor alle Details und kann eigene Regeln ergänzen.",
      },
      {
        q: "Was passiert mit meinen eigenen CSS-Regeln, wenn ich neu generiere?",
        a: "Eigene Anpassungen bleiben erhalten. Eigene Regeln stehen am Ende des Stylesheets außerhalb der Kaskadenebenen und haben damit immer Vorrang. Das Studio zeigt an, welche erzeugten Werte sie überschreiben.",
      },
      {
        q: "Ist das exportierte Designsystem barrierefrei?",
        a: "Das Studio prüft Kontraste, Fokuszustände, Klickflächen und Bewegung nach WCAG 2.2 und schlägt Korrekturen vor. Ob die fertige Website barrierefrei ist, hängt außerdem von Inhalten, HTML-Struktur und Umsetzung ab; diese Punkte listet der Prüfbericht als manuell zu prüfen.",
      },
      {
        q: "Was ist im kostenlosen Umfang enthalten?",
        a: "Gestalten, Generieren, alle Varianten und Themes, die Vorschau und die Barrierefreiheits-Prüfung sind ohne Anmeldung nutzbar, ebenso die kostenlosen Exportformate. Premium schaltet das dauerhafte Speichern von Projekten und die übrigen Formate frei.",
      },
      {
        q: "Werden bei der Website-Analyse auch Unterseiten gelesen?",
        a: "Nein. Analysiert wird ausschließlich die eingegebene HTTPS-Adresse mit ihren Stylesheets. Leitet die Seite weiter, nennt das Studio das Ziel, lädt es aber erst, wenn es selbst eingegeben wird.",
      },
    ],
    related: ["kontrast-checker", "visitenkarten-designer", "json-formatter"],
  },
  en: {
    intro: [
      "A design system is the set of rules a website looks by: which colours, which typefaces, which spacing, what a button looks like and how it reacts when the pointer moves over it. Setting those rules once instead of styling every page by hand gives a consistent appearance and saves time with every extension.",
      "The Design System Studio starts with a single component. You design a button, for example — colour, corners, type, shadow, hover and focus state — and the studio derives everything else from it by fixed rules: colour roles for text, surfaces and borders, a type scale, spacing, cards, form fields, navigation and footer, each with a light and a dark colour scheme. There is no randomness and no artificial intelligence: the same input always gives the same result.",
      "Afterwards you adjust globally or per component, check contrast and focus states against WCAG and export the result as plain CSS, CSS variables, SCSS, JSON design tokens, for Tailwind CSS or Bootstrap. Alternatively, start from existing CSS, your own HTML component or the style of a public website.",
    ],
    useCases: [
      {
        title: "Defining one consistent look for a new website",
        text: "Instead of picking colours and spacing on every page again, one button grows into a complete rule set that every page shares.",
      },
      {
        title: "Tidying up an existing stylesheet",
        text: "Read in a grown CSS file, adopt the recognised colours and radii as design tokens and keep rules that cannot be mapped unchanged.",
      },
      {
        title: "Adding a dark mode",
        text: "From the same colour roles the studio derives a dark theme, checks its contrast and writes the rules that follow the system setting.",
      },
      {
        title: "Using a page's style as a starting point",
        text: "Analyse a public HTTPS page and compare its style faithfully or as an independent re-interpretation in several variants.",
      },
      {
        title: "Producing a theme for Tailwind or Bootstrap",
        text: "Output the design tokens as a Tailwind theme or as Bootstrap variables, so an existing project picks up the new colours and radii.",
      },
    ],
    steps: [
      {
        title: "Choose how to start",
        description:
          "Choose whether to design a new component, import existing CSS or an HTML component, or analyse a website by its HTTPS address.",
      },
      {
        title: "Design the component",
        description:
          "In simple mode set colours, corners, type, spacing, shadow and the hover effect. Expert mode opens individual border sides, corners, transparency and animation.",
      },
      {
        title: "Generate and adjust the design system",
        description:
          "One click derives the whole system. Then choose a style direction, change global values or single components and add your own themes — your adjustments are kept.",
      },
      {
        title: "Check the preview and accessibility",
        description:
          "Look at the result as a component overview, an admin panel and a landing page on desktop, tablet and phone, and apply the contrast suggestions where needed.",
      },
      {
        title: "Export",
        description:
          "Download the design system in the format you need. The package contains HTML and CSS or CSS-adjacent configuration only, no JavaScript code.",
      },
    ],
    privacy:
      "Designing, previewing, importing and the accessibility check run in your browser; without Premium nothing is stored, not even in browser storage. For a website analysis our server loads exactly the given page and its stylesheets, removes scripts and passes only that to your browser — the page's text, images and logos are not adopted. For an export the server builds the file from your current draft and does not keep it.",
    faq: [
      {
        q: "Do I need to know CSS?",
        a: "No. Simple mode names every setting in plain words, with the CSS property shown small beside it. Anyone fluent in CSS finds every detail in expert mode and the code editor and can add their own rules.",
      },
      {
        q: "What happens to my own CSS rules when I regenerate?",
        a: "They are kept. Your rules sit at the end of the stylesheet outside every cascade layer and therefore always win. The studio shows which generated values they override.",
      },
      {
        q: "Is the exported design system accessible?",
        a: "The studio checks contrast, focus states, target sizes and motion against WCAG 2.2 and suggests fixes. Whether the finished website is accessible also depends on content, HTML structure and implementation; the report lists those items as manual checks.",
      },
      {
        q: "What is included without paying?",
        a: "Designing, generating, every variant and theme, the preview and the accessibility check work without signing in, as do the free export formats. Premium unlocks saving projects permanently and the remaining formats.",
      },
      {
        q: "Does the website analysis read subpages too?",
        a: "No. Only the HTTPS address you enter is analysed, with its stylesheets. If the page redirects, the studio names the target but only loads it once you enter it yourself.",
      },
    ],
    related: ["kontrast-checker", "visitenkarten-designer", "json-formatter"],
  },
};

export default guide;
