import type { ToolCategory } from "@tracht-digital-solutions/tds-tools-contract";

/** Site-wide constants + copy. Keep the NAP in sync with the Impressum + seo.ts
 *  of the other TDS properties (SEO convention). */
export const site = {
  name: "TDS Tools",
  origin: "https://tools.tracht-digital.de",
  tagline: "Kostenlose digitale Werkzeuge für Unternehmen",
  description:
    "Kostenlose Online-Tools für die Digitalisierung: QR-Codes, Passwörter, JSON, Kontrast-Checker und mehr — direkt im Browser, ohne Anmeldung. Von Tracht Digital Solutions, 21493 Schwarzenbek bei Hamburg.",
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
