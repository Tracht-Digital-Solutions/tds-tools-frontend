import type { ToolGuideSet } from "~/lib/guides";

const guide: ToolGuideSet = {
  de: {
    intro: [
      "Ein PDF wird fast nie vom Text groß, sondern von den Bildern darin. Ein eingescannter Vertrag, ein Angebot mit Produktfotos, ein bebildertes Protokoll — der Text darin wiegt ein paar Kilobyte, die Fotos einige Megabyte. Genau dort setzt dieses Werkzeug an: Es sucht die eingebetteten Bilder, rechnet sie in der von Ihnen gewählten Qualität neu und schreibt sie an dieselbe Stelle zurück.",
      "Der Rest des Dokuments bleibt dabei unangetastet. Text bleibt Text und damit durchsuchbar und markierbar, Vektorgrafiken bleiben scharf, Verlinkungen und die Seitenreihenfolge bleiben, wie sie waren. Das ist der Unterschied zu Werkzeugen, die jede Seite in ein Bild verwandeln: Die Datei wird zwar auch kleiner, aber aus einem Dokument wird ein Stapel Fotos, in dem sich nichts mehr suchen lässt.",
      "Wie viel dabei herauskommt, hängt am Ausgangsmaterial. Ein Scan mit 300 dpi lässt sich meist auf ein Viertel eindampfen, ohne dass es am Bildschirm auffällt. Ein reines Textdokument dagegen enthält nichts, was sich neu rechnen ließe — dann sagt das Werkzeug genau das, statt eine Verbesserung zu behaupten, die es nicht gibt.",
    ],
    useCases: [
      {
        title: "Anhänge unter die Größengrenze bringen",
        text: "Viele Postfächer nehmen keine Anhänge über zehn oder zwanzig Megabyte an. Eine Angebotsmappe mit Fotos liegt schnell darüber und wird kommentarlos abgewiesen.",
      },
      {
        title: "Scans aus dem Multifunktionsgerät",
        text: "Kopierer scannen im Zweifel mit voller Auflösung in Farbe. Für ein Dokument, das ohnehin nur abgelegt und gelesen wird, ist das um ein Vielfaches mehr, als nötig wäre.",
      },
      {
        title: "Unterlagen für ein Portal hochladen",
        text: "Förderportale, Ausschreibungsplattformen und Versicherungen setzen oft harte Obergrenzen je Datei — und melden die Überschreitung erst nach dem Ausfüllen des ganzen Formulars.",
      },
      {
        title: "Archiv aufräumen",
        text: "Wenn Jahre an Belegen und Protokollen auf einem Laufwerk liegen, macht ein Faktor drei bei der Dateigröße im Backup und in der Synchronisierung einen spürbaren Unterschied.",
      },
      {
        title: "Dokumentation auf die Website stellen",
        text: "Ein Datenblatt, das der Besucher erst nach zehn Sekunden Ladezeit sieht, wird meist gar nicht erst geöffnet — besonders auf dem Mobilfunknetz einer Baustelle.",
      },
    ],
    steps: [
      {
        title: "PDF auswählen",
        description: "Wählen Sie die Datei aus, die kleiner werden soll. Sie wird ausschließlich in Ihrem Browser geöffnet und nirgendwohin übertragen; auch sehr große Dateien sind kein Problem, sie brauchen nur etwas länger.",
      },
      {
        title: "Bildqualität festlegen",
        description: "Der Regler steuert, wie stark die enthaltenen Bilder neu gerechnet werden. 65 Prozent ist ein guter Startwert für Dokumente, die am Bildschirm gelesen werden; für einen Ausdruck in guter Qualität sollten Sie eher bei 80 Prozent bleiben.",
      },
      {
        title: "Bildbreite begrenzen",
        description: "Ein Foto mit 4000 Pixeln Breite bringt in einem A4-Dokument nichts, das nie größer als 2000 Pixel gedruckt wird. Die Begrenzung ist deshalb oft der größere Hebel als die Qualität — probieren Sie 1600 Pixel, bevor Sie die Qualität weiter senken.",
      },
      {
        title: "Ergebnis prüfen",
        description: "Nach dem Herunterladen steht die Ersparnis in Prozent unter dem Knopf. Öffnen Sie die Datei einmal und sehen Sie sich die bildlastigste Seite an: Was dort gut aussieht, sieht im ganzen Dokument gut aus.",
      },
    ],
    privacy:
      "Die Datei wird vollständig in Ihrem Browser geöffnet, verarbeitet und wieder gespeichert. Nichts davon wird auf einen Server übertragen, und es entsteht auch keine Kopie im Netz — das ist bei Verträgen, Personalunterlagen und Angeboten der eigentliche Punkt, denn ein Dokument, das man zum Verkleinern hochlädt, hat man aus der Hand gegeben.",
    faq: [
      {
        q: "Leidet die Qualität des Textes?",
        a: "Nein. Angefasst werden ausschließlich die eingebetteten Bilder. Text bleibt Text, bleibt durchsuchbar, bleibt beim Zoomen scharf und lässt sich weiterhin markieren und kopieren.",
      },
      {
        q: "Warum wird meine Datei nicht kleiner?",
        a: "Dann enthält sie nichts, was sich neu rechnen ließe — entweder gar keine Bilder, oder nur solche in einem Format, das hier bewusst unangetastet bleibt, weil eine falsche Annahme über Farbraum oder Bittiefe die Seite still zerstören würde.",
      },
      {
        q: "Kann ich mehrere Dateien auf einmal verkleinern?",
        a: "Derzeit wird eine Datei pro Durchgang verarbeitet. Bei einem Stapel lohnt es sich, die Einstellung einmal an der größten Datei zu prüfen und sie dann für die übrigen zu übernehmen.",
      },
      {
        q: "Bleibt das Dokument nach dem Verkleinern gültig?",
        a: "Der Aufbau des Dokuments bleibt vollständig erhalten. Eine digitale Signatur ist davon allerdings ausgenommen: Jede Änderung an der Datei macht sie ungültig, das gilt für jedes Werkzeug gleichermaßen.",
      },
    ],
    related: ["pdf-werkzeuge", "bild-komprimieren"],
  },
  en: {
    intro: [
      "A PDF is almost never made large by its text, but by the images inside it. A scanned contract, a quotation with product photos, an illustrated report — the words weigh a few kilobytes, the pictures several megabytes. That is exactly where this tool works: it finds the embedded images, recomputes them at the quality you choose, and writes them back into the same place.",
      "The rest of the document is left alone. Text stays text and therefore stays searchable and selectable, vector graphics stay sharp, links and page order stay as they were. That is the difference from tools that turn every page into a picture: the file does get smaller, but a document becomes a stack of photos in which nothing can be found again.",
      "How much comes out of it depends on the material. A 300 dpi scan can usually be cut to a quarter without anything showing on screen. A pure text document, on the other hand, holds nothing that could be recomputed — and then the tool says so, rather than claiming an improvement that is not there.",
    ],
    useCases: [
      {
        title: "Getting an attachment under the limit",
        text: "Plenty of mailboxes refuse attachments over ten or twenty megabytes. A quotation pack with photos passes that quickly and is rejected without comment.",
      },
      {
        title: "Scans out of the office machine",
        text: "Copiers scan at full resolution in colour when in doubt. For a document that will only ever be filed and read, that is many times more than would be needed.",
      },
      {
        title: "Uploading papers to a portal",
        text: "Funding portals, tender platforms and insurers often set a hard per-file limit — and report the breach only after the whole form has been filled in.",
      },
      {
        title: "Tidying up an archive",
        text: "When years of receipts and reports sit on a drive, a factor of three in file size makes a noticeable difference to backups and to syncing.",
      },
      {
        title: "Putting documentation on a website",
        text: "A data sheet a visitor only sees after ten seconds of loading is usually not opened at all — especially on the mobile signal of a building site.",
      },
    ],
    steps: [
      {
        title: "Choose the PDF",
        description: "Pick the file that should get smaller. It is opened purely inside your browser and transferred nowhere; even very large files are fine, they simply take a little longer.",
      },
      {
        title: "Set the image quality",
        description: "The slider controls how hard the contained images are recomputed. 65 per cent is a good starting point for documents read on screen; for a good-quality print run, stay closer to 80 per cent.",
      },
      {
        title: "Limit the image width",
        description: "A photo 4000 pixels wide gains nothing in an A4 document that is never printed larger than 2000 pixels. The width limit is therefore often the bigger lever than the quality — try 1600 pixels before lowering the quality further.",
      },
      {
        title: "Check the result",
        description: "After the download the saving is shown as a percentage under the button. Open the file once and look at the most image-heavy page: what looks good there looks good throughout the document.",
      },
    ],
    privacy:
      "The file is opened, processed and saved again entirely inside your browser. None of it is transferred to a server and no copy comes into existence anywhere online — with contracts, personnel files and quotations that is the actual point, because a document you upload in order to shrink it is a document you have handed over.",
    faq: [
      {
        q: "Does the text lose quality?",
        a: "No. Only the embedded images are touched. Text stays text, stays searchable, stays sharp when zoomed, and can still be selected and copied.",
      },
      {
        q: "Why does my file not get smaller?",
        a: "Then it holds nothing that could be recomputed — either no images at all, or only images in a format deliberately left alone here, because a wrong assumption about colour space or bit depth would corrupt the page silently.",
      },
      {
        q: "Can I compress several files at once?",
        a: "One file is processed per run at the moment. With a batch it pays to test the setting once on the largest file and then apply it to the rest.",
      },
      {
        q: "Is the document still valid afterwards?",
        a: "The structure of the document is fully preserved. A digital signature is the exception: any change to the file invalidates it, and that is true of every tool alike.",
      },
    ],
    related: ["pdf-werkzeuge", "bild-komprimieren"],
  },
};

export default guide;
