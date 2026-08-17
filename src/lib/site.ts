import type { ToolCategory } from "@tracht-digital-solutions/tds-tools-contract";

/** Site-wide constants + copy. Keep the NAP in sync with the Impressum + seo.ts
 *  of the other TDS properties (SEO convention). */
export const site = {
  name: "TDS Tools",
  origin: "https://tools.tracht-digital.de",
  tagline: "Kostenlose digitale Werkzeuge für Unternehmen",
  /**
   * Site-level meta description. Google renders roughly the first 155–160
   * characters and truncates the rest — `site.test.ts` fails the build past
   * that bound.
   *
   * This was 201 characters until 2026-08-16, so everything from "Von Tracht
   * Digital Solutions, 21493 Schwarzenbek bei Hamburg" onward was cut in the
   * SERP: the site lost its brand AND its local signal while keeping the
   * generic half. Exactly the defect the landingpage's seo.ts fixed in
   * 2026-07-29, repeated here because nothing measured it.
   *
   * Order is deliberate: the concrete tool names come first (this site ranks
   * on tool queries), and the brand + town ride in the tail where they still
   * fit inside the cut.
   */
  description:
    "Kostenlose Online-Tools ohne Anmeldung: QR-Codes, Passwörter, UTM-Links, JSON und Bildkomprimierung — im Browser, von TDS aus Schwarzenbek bei Hamburg.",
} as const;

/** German labels for the tool categories (catalog section headings). */
export const categoryLabels: Record<ToolCategory, string> = {
  content: "Inhalte",
  developer: "Entwickler",
  design: "Design",
  marketing: "Marketing",
  media: "Medien",
  security: "Sicherheit",
  business: "Business",
  other: "Weitere",
};

/**
 * "1 Werkzeug" / "n Werkzeuge" for a category heading.
 *
 * A helper rather than an inline ternary in the template because German
 * pluralisation is the kind of thing that reads as correct in a diff and wrong
 * on the page — and because the catalog genuinely produces categories of one
 * (five of the six sections hold one or two tools).
 */
export const toolCountLabel = (n: number): string =>
  `${n} ${n === 1 ? "Werkzeug" : "Werkzeuge"}`;

/** Stable display order of the category sections in the catalog. */
export const categoryOrder: ToolCategory[] = [
  "marketing",
  "security",
  "developer",
  "design",
  "media",
  "content",
  "business",
  "other",
];
