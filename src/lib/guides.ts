import type { Lang } from "./seo";

import qrCodeGenerator from "~/content/guides/qr-code-generator";
import passwortGenerator from "~/content/guides/passwort-generator";
import utmLinkGenerator from "~/content/guides/utm-link-generator";
import jsonFormatter from "~/content/guides/json-formatter";
import kontrastChecker from "~/content/guides/kontrast-checker";
import bildKomprimieren from "~/content/guides/bild-komprimieren";
import pdfWerkzeuge from "~/content/guides/pdf-werkzeuge";
import pdfKomprimieren from "~/content/guides/pdf-komprimieren";
import pdfWasserzeichen from "~/content/guides/pdf-wasserzeichen";
import bilderZuPdf from "~/content/guides/bilder-zu-pdf";
import pdfZuBildern from "~/content/guides/pdf-zu-bildern";
import etikettenDrucken from "~/content/guides/etiketten-drucken";
import stundenzettel from "~/content/guides/stundenzettel";
import texterkennung from "~/content/guides/texterkennung";
import impressumGenerator from "~/content/guides/impressum-generator";
import datenschutzerklaerungGenerator from "~/content/guides/datenschutzerklaerung-generator";
import barrierefreiheitserklaerungGenerator from "~/content/guides/barrierefreiheitserklaerung-generator";
import kiKennzeichnungBilder from "~/content/guides/ki-kennzeichnung-bilder";
import visitenkartenDesigner from "~/content/guides/visitenkarten-designer";

/**
 * The long-form guide rendered under each tool.
 *
 * **Why the tool pages carry prose at all.** A tool page used to be a
 * heading, a one-line lede and the tool itself — perhaps forty words. That is
 * thin content by any measure, and this site's entire ranking case rests on
 * tool queries, where the competition is a hundred identical
 * "free-online-converter" pages. What this site can say that they cannot is
 * *why the tool works the way it does* and *that nothing is uploaded* — so
 * every guide carries a `privacy` paragraph, and it is not boilerplate.
 *
 * The same object feeds the visible section AND the `HowTo` / `FAQPage`
 * JSON-LD. That is deliberate: Google drops a FAQ rich result when the
 * structured answer does not match the visible answer, and two hand-kept
 * copies of the same sentence diverge on the first edit.
 */
export interface ToolGuide {
  /** Opening paragraphs — what the tool is for, in the reader's terms. */
  intro: string[];
  /** Concrete situations. The headline is the situation, not the feature. */
  useCases: { title: string; text: string }[];
  /** The actual click path. Becomes `HowTo`, so it must match the UI. */
  steps: { title: string; description: string }[];
  /** What happens to the data. The differentiator, never boilerplate. */
  privacy: string;
  /** Becomes `FAQPage`. Answers are complete sentences, not fragments. */
  faq: { q: string; a: string }[];
  /** Slugs of related tools — the internal linking this site had none of. */
  related: string[];
}

/**
 * A tool's guide in every language it has been written in.
 *
 * German is required, English optional: the two ship in separate releases and
 * a missing translation must degrade to the German text rather than to an
 * empty page. `guides.test.ts` pins the pairing against `EN_ENABLED`.
 */
export type ToolGuideSet = Partial<Record<Lang, ToolGuide>> & {
  de: ToolGuide;
  /**
   * ISO date (`YYYY-MM-DD`) of the last change to this guide's content.
   *
   * Rendered as the "Stand" line under the guide and published as the page's
   * `dateModified`. Answer engines weigh freshness, and a reader deciding
   * whether a note about file formats or a legal duty is still true needs the
   * same thing. It sits on the SET rather than on each language: the date
   * belongs to the guide, and a translation that lands later does not make the
   * German text newer.
   *
   * Seeded from each file's real last commit date. Raise it by hand when the
   * copy changes — `guides.test.ts` checks the format, not the truth, so this
   * is the one value here that nothing can verify for you.
   */
  updatedAt: string;
};

export const guides: Record<string, ToolGuideSet> = {
  "qr-code-generator": qrCodeGenerator,
  "passwort-generator": passwortGenerator,
  "utm-link-generator": utmLinkGenerator,
  "json-formatter": jsonFormatter,
  "kontrast-checker": kontrastChecker,
  "bild-komprimieren": bildKomprimieren,
  "pdf-werkzeuge": pdfWerkzeuge,
  "pdf-komprimieren": pdfKomprimieren,
  "pdf-wasserzeichen": pdfWasserzeichen,
  "bilder-zu-pdf": bilderZuPdf,
  "pdf-zu-bildern": pdfZuBildern,
  "etiketten-drucken": etikettenDrucken,
  stundenzettel,
  texterkennung,
  "impressum-generator": impressumGenerator,
  "datenschutzerklaerung-generator": datenschutzerklaerungGenerator,
  "barrierefreiheitserklaerung-generator": barrierefreiheitserklaerungGenerator,
  "ki-kennzeichnung-bilder": kiKennzeichnungBilder,
  "visitenkarten-designer": visitenkartenDesigner,
};

/**
 * The guide for a tool, in the requested language, falling back to German.
 *
 * Returns `undefined` for an unknown slug rather than throwing: a tool pack
 * can add a tool before its guide is written, and a page without a guide is a
 * thin page, not a broken build. `guides.test.ts` is what stops that state
 * from lasting — it fails when a composed tool has no guide.
 */
export function guideFor(slug: string, lang: Lang = "de"): ToolGuide | undefined {
  const set = guides[slug];
  if (!set) return undefined;
  return set[lang] ?? set.de;
}

/**
 * When this tool's guide last changed, or `undefined` for a tool without one.
 *
 * Separate from {@link guideFor} because the date lives on the set, not on a
 * language. A page that has no date shows no "Stand" line and publishes no
 * `dateModified` — better than a date the page cannot stand behind.
 */
export function guideUpdatedAt(slug: string): string | undefined {
  return guides[slug]?.updatedAt;
}

/** Rough word count of a guide — used by the tests to pin the minimum depth. */
export function guideWordCount(guide: ToolGuide): number {
  const text = [
    ...guide.intro,
    ...guide.useCases.flatMap((u) => [u.title, u.text]),
    ...guide.steps.flatMap((s) => [s.title, s.description]),
    guide.privacy,
    ...guide.faq.flatMap((f) => [f.q, f.a]),
  ].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}
