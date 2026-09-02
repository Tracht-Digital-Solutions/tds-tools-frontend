import type { ToolGuideSet } from "~/lib/guides";

const guide: ToolGuideSet = {
  de: {
    intro: [
      "Ein Bild, das eine Maschine erzeugt hat, sieht man ihm immer seltener an. Genau deshalb verlangt die KI-Verordnung der Europäischen Union eine Kennzeichnung — und sie verlangt sie zweimal: Wer ein System betreibt, das synthetische Inhalte erzeugt, muss die Ausgabe maschinenlesbar als künstlich erzeugt markieren; wer ein solches Bild veröffentlicht, muss das für die Betrachter offenlegen. Die Transparenzpflichten des Art. 50 greifen ab dem 2. August 2026.",
      "Dieses Werkzeug bedient beide Hälften. Es brennt eine Plakette mit einem Hinweis wie „KI-generiert“ in das Bild — Ecke, Größe, Deckkraft und Stil wählen Sie selbst — und es schreibt zusätzlich einen maschinenlesbaren Vermerk in die Datei: als Textabschnitt in ein PNG, als Kommentarsegment in ein JPEG. Beides passiert im Browser, ohne Upload und ohne Anmeldung.",
      "Zwei Dinge sagt das Werkzeug offen, statt sie zu verschweigen. WebP kann den maschinenlesbaren Vermerk nicht tragen; wählen Sie dieses Format, bekommen Sie nur die sichtbare Kennzeichnung, und die Insel weist darauf hin. Und das Bild wird beim Erzeugen neu gezeichnet, wodurch vorhandene Aufnahmedaten des Originals verloren gehen — bei einem Werkzeug, das Metadaten hinzufügt, ist das eine Nebenwirkung, die man kennen sollte.",
    ],
    useCases: [
      {
        title: "Produktbilder, die aus einem Bildgenerator stammen",
        text: "Wer Stimmungsbilder oder Freisteller aus einem KI-Werkzeug im Shop einsetzt, kennzeichnet sie sichtbar und legt den Vermerk zusätzlich in die Datei, wo Plattformen ihn auslesen können.",
      },
      {
        title: "Beiträge in sozialen Netzwerken",
        text: "Mehrere Plattformen werten Metadaten aus und setzen selbst einen Hinweis. Ein Bild, das den Vermerk schon mitbringt, wird eher richtig einsortiert als eines, das erst geraten werden muss.",
      },
      {
        title: "Redaktionelle Illustrationen auf der eigenen Seite",
        text: "Für den Blog eines Betriebs ist die Plakette die einfachste ehrliche Lösung: Sie steht im Bild und bleibt auch dann erhalten, wenn das Bild weiterverwendet wird.",
      },
      {
        title: "Bestand nachträglich kennzeichnen",
        text: "Ältere Bilder lassen sich einzeln durchlaufen. Die Einstellungen bleiben zwischen zwei Bildern erhalten, sodass eine Serie dieselbe Plakette an derselben Stelle bekommt.",
      },
      {
        title: "Bildunterschrift und Alternativtext vorbereiten",
        text: "Unter dem Werkzeug steht ein fertiger Satz zum Mitkopieren. Die Offenlegung im Text ergänzt die Plakette dort, wo das Bild ohne Beschriftung erscheint.",
      },
    ],
    steps: [
      {
        title: "Bild auswählen",
        description:
          "PNG, JPEG oder WebP aus dem eigenen Gerät. Die Datei wird gelesen, aber nicht übertragen; die Vorschau darunter zeigt das Ergebnis in verkleinerter Fassung, gerechnet mit denselben Maßen wie das spätere Bild.",
      },
      {
        title: "Text und Ecke festlegen",
        description:
          "Wählen Sie einen der Vorschläge oder schreiben Sie einen eigenen Hinweis. Die Ecke sollte dorthin zeigen, wo im Bild wenig passiert — eine Plakette über einem Gesicht liest sich schlecht und wird beim Zuschneiden zuerst geopfert.",
      },
      {
        title: "Größe, Deckkraft und Stil einstellen",
        description:
          "Die Größe ist ein Anteil der Bildbreite, damit die Plakette auf einem großen Foto genauso wirkt wie auf einem kleinen. Der Stil kehrt Fläche und Schrift um; wählen Sie den, der sich vom Bildhintergrund an dieser Stelle deutlich absetzt.",
      },
      {
        title: "Format wählen und Hinweis einbetten",
        description:
          "PNG bewahrt die Bildqualität und trägt den maschinenlesbaren Vermerk, JPEG ebenfalls und ist kleiner. WebP ist am kleinsten, kann den Vermerk aber nicht aufnehmen — das Ankreuzfeld bleibt dann wirkungslos, und der Hinweis darunter sagt es.",
      },
      {
        title: "Erzeugen und herunterladen",
        description:
          "Das fertige Bild erscheint unter dem Werkzeug, zusammen mit der Auskunft, ob der Vermerk in der Datei gelandet ist. Prüfen Sie das Ergebnis einmal in voller Größe, bevor Sie es veröffentlichen.",
      },
    ],
    privacy:
      "Ihr Bild verlässt das Gerät nicht. Es wird über eine Zeichenfläche im Browser gelesen, mit der Plakette versehen und dort auch wieder als Datei zusammengesetzt; einen Server, an den es gehen könnte, gibt es in diesem Werkzeug nicht. Das ist bei Bildern eine andere Größenordnung als bei einem Textschnipsel: Ein Foto trägt oft mehr Nebeninformation, als der Absender vermutet — Aufnahmeort, Gerät, Zeitpunkt. Und genau diese Aufnahmedaten verwirft der Zeichenvorgang, worauf das Werkzeug auch hinweist.",
    faq: [
      {
        q: "Ab wann muss ich KI-Bilder kennzeichnen?",
        a: "Die Transparenzpflichten des Art. 50 der KI-Verordnung gelten ab dem 2. August 2026. Unabhängig davon können sich Kennzeichnungspflichten schon heute aus dem Wettbewerbsrecht oder aus den Regeln einzelner Plattformen ergeben — eine Kennzeichnung vorher ist also kein vergebener Aufwand.",
      },
      {
        q: "Reicht die sichtbare Plakette allein?",
        a: "Für die Offenlegung gegenüber Betrachtern ist ein deutlich erkennbarer Hinweis der Kern. Die Verordnung verlangt daneben aber ausdrücklich eine maschinenlesbare Markierung der Ausgabe. Deshalb schreibt dieses Werkzeug zusätzlich einen Vermerk in die Datei, und deshalb sagt es auch, wenn das Format das nicht zulässt.",
      },
      {
        q: "Warum bekommt WebP keinen Vermerk in der Datei?",
        a: "Weil ein sauberer Weg dafür mehr Aufwand bedeutet, als dieses Werkzeug tragen soll: PNG hat einen Textabschnitt und JPEG ein Kommentarsegment, beides sind schlanke, überall gelesene Strukturen. Für WebP müsste ein XMP-Block in den Container geschrieben werden. Statt das halbfertig zu tun, sagt die Insel, dass der Vermerk fehlt.",
      },
      {
        q: "Bleiben die EXIF-Daten des Originals erhalten?",
        a: "Nein. Das Bild wird auf eine Zeichenfläche neu gezeichnet, und dabei gehen Aufnahmedaten wie Kamera, Zeitpunkt und Aufnahmeort verloren. Wenn Sie diese Angaben brauchen, bewahren Sie das Original auf. Für ein rein synthetisches Bild ist der Verlust ohne Bedeutung — es hatte nie welche.",
      },
      {
        q: "Kann jemand die Kennzeichnung wieder entfernen?",
        a: "Der Vermerk in der Datei lässt sich mit einem Metadatenwerkzeug löschen, und die Plakette lässt sich wegschneiden oder überdecken. Eine fälschungssichere Herkunft ist etwas anderes und braucht kryptografisch signierte Daten. Für die Offenlegung gegenüber Ihrem Publikum ist diese Kennzeichnung dennoch das, was verlangt ist.",
      },
    ],
    related: ["bild-komprimieren", "datenschutzerklaerung-generator"],
  },
  en: {
    intro: [
      "It gets harder every year to see that a picture was made by a machine. That is exactly why the European Union's AI Act requires labelling — and it requires it twice over: whoever runs a system that produces synthetic content must mark the output as artificially generated in a machine-readable form, and whoever publishes such a picture must disclose that to the people looking at it. The transparency duties in Article 50 apply from 2 August 2026.",
      "This tool covers both halves. It burns a badge carrying a note such as “AI-generated” into the picture — you choose the corner, the size, the opacity and the style — and it additionally writes a machine-readable note into the file: a text chunk in a PNG, a comment segment in a JPEG. Both happen in the browser, with no upload and no sign-up.",
      "Two things the tool states openly rather than glossing over. WebP cannot carry the machine-readable note; choose that format and you get the visible label only, and the island says so. And producing the image redraws it, which discards any capture data the original held — for a tool that adds metadata, that is a side effect worth knowing about.",
    ],
    useCases: [
      {
        title: "Product images that came out of an image generator",
        text: "Anyone using generated mood shots or cut-outs in a shop labels them visibly and puts the note into the file as well, where platforms can read it.",
      },
      {
        title: "Posts on social networks",
        text: "Several platforms read metadata and add a notice of their own. A picture that already carries the note is more likely to be classified correctly than one that has to be guessed at.",
      },
      {
        title: "Editorial illustrations on your own site",
        text: "For a company blog the badge is the simplest honest answer: it sits in the picture and survives even when the picture is reused elsewhere.",
      },
      {
        title: "Labelling an existing library",
        text: "Older pictures can be run through one at a time. The settings persist between images, so a series gets the same badge in the same place.",
      },
      {
        title: "Preparing a caption and alternative text",
        text: "A ready-made sentence sits underneath the tool for copying. Disclosure in the text complements the badge wherever the picture appears without a caption.",
      },
    ],
    steps: [
      {
        title: "Choose an image",
        description:
          "A PNG, JPEG or WebP from your own device. The file is read but never transmitted; the preview underneath shows the result at a reduced size, worked out with the same proportions as the final picture.",
      },
      {
        title: "Set the text and the corner",
        description:
          "Pick one of the suggestions or write a note of your own. The corner should sit where little is happening in the picture — a badge across a face reads badly and is the first thing sacrificed when the image is cropped.",
      },
      {
        title: "Adjust size, opacity and style",
        description:
          "The size is a share of the image width, so the badge carries the same weight on a large photograph as on a small one. The style swaps the panel and the lettering; pick whichever stands out clearly against the background at that spot.",
      },
      {
        title: "Choose a format and embed the note",
        description:
          "PNG keeps the image quality and carries the machine-readable note, JPEG does too and is smaller. WebP is the smallest but cannot take the note — the tick box then has no effect, and the line underneath says so.",
      },
      {
        title: "Produce it and download",
        description:
          "The finished picture appears below the tool, together with a statement of whether the note made it into the file. Look at the result once at full size before you publish it.",
      },
    ],
    privacy:
      "Your image never leaves the device. It is read onto a canvas in the browser, given the badge, and reassembled into a file right there; this tool has no server it could send anything to. With pictures that is a different order of magnitude from a snippet of text: a photograph often carries more incidental information than the sender assumes — where it was taken, on what, and when. And it is precisely that capture data the redraw discards, which the tool also points out.",
    faq: [
      {
        q: "From when do I have to label AI images?",
        a: "The transparency duties in Article 50 of the AI Act apply from 2 August 2026. Independently of that, labelling obligations can already follow today from competition law or from the rules of individual platforms — so labelling earlier is not wasted effort.",
      },
      {
        q: "Is the visible badge on its own enough?",
        a: "For disclosure to the people looking at the picture, a clearly recognisable notice is the core of it. Alongside that, however, the regulation expressly requires the output to be marked in a machine-readable form. That is why this tool also writes a note into the file, and why it says so when the format does not allow it.",
      },
      {
        q: "Why does WebP get no note in the file?",
        a: "Because doing it cleanly means more machinery than this tool should carry: PNG has a text chunk and JPEG a comment segment, both lean structures that everything reads. WebP would need an XMP block written into the container. Rather than do that half-way, the island says the note is missing.",
      },
      {
        q: "Is the original EXIF data kept?",
        a: "No. The image is redrawn onto a canvas, and capture data such as the camera, the time and the location is lost in the process. If you need those details, keep the original. For a purely synthetic picture the loss means nothing — it never had any.",
      },
      {
        q: "Can somebody remove the label again?",
        a: "The note in the file can be deleted with a metadata tool, and the badge can be cropped off or painted over. Tamper-proof provenance is a different thing and needs cryptographically signed data. For disclosure to your own audience, this labelling is nonetheless what is being asked for.",
      },
    ],
    related: ["bild-komprimieren", "datenschutzerklaerung-generator"],
  },
};

export default guide;
