import type { ToolCategory } from "@tracht-digital-solutions/tds-tools-contract";
import type { Lang } from "./seo";

/**
 * Everything the SITE says, in both languages.
 *
 * The split of responsibility is deliberate and worth keeping:
 *
 * - The **tool packs** own a tool's German name, description and SEO title
 *   (their manifests) and their own island labels (their `STRINGS` tables).
 * - **This file** owns the site chrome and the ENGLISH copy of each tool.
 * - **`content/guides`** owns the long-form guide in both languages.
 *
 * Why the English tool copy lives here rather than in the four pack manifests:
 * the packs publish independently, and this is the surface that actually
 * renders those strings into `<title>` and `<meta>` — the same reasoning that
 * already puts the description BUDGET test here rather than in the packs. A
 * pack shipping an over-long or duplicate English description would otherwise
 * fail nothing until it was live.
 *
 * German is the default everywhere: the audience is local businesses in
 * Northern Germany, and English is the addition, not the base.
 */

export interface SiteCopy {
  /** Used in the `<title>` of the catalog page. */
  tagline: string;
  /** Site-level meta description. Budget: 80 < n ≤ 160, brand + town inside. */
  description: string;
  heroEyebrow: string;
  heroHeadlineLead: string;
  heroHeadlineAccent: string;
  heroHeadlineTail: string;
  heroBody: string;
  navAllTools: string;
  navBlog: string;
  navHome: string;
  /** Accessible name of the mobile navigation toggle. */
  navMenu: string;
  toBlog: string;
  toHome: string;
  cta: string;
  skipToContent: string;
  emptyCatalog: string;
  toolCount: (n: number) => string;
  guideHeading: string;
  guideUseCases: string;
  guideSteps: string;
  guidePrivacy: string;
  guideFaq: string;
  relatedHeading: string;
  breadcrumbAll: string;
  footerBlurb: string;
  footerGroupBrand: string;
  footerGroupLegal: string;
  footerGroupServices: string;
  footerHome: string;
  footerBlog: string;
  footerPortal: string;
  footerContact: string;
  footerImprint: string;
  footerPrivacy: string;
  footerAdConsent: string;
  footerTagline: string;
  /** The one marketing line under the catalog and each tool. */
  serviceNote: string;
  serviceNoteCta: string;
  languageSwitch: string;
  languageOther: string;
  /** The premium block under the catalog. */
  premiumHeading: string;
  premiumBody: string;
  premiumLead: string;
}

export const copy = {
  de: {
    tagline: "Werkzeuge für Unternehmen, vieles kostenlos",
    /**
     * Order is deliberate: the concrete tool names come first (this site
     * ranks on tool queries), brand and town ride in the tail where they
     * still fit inside the ~160 characters a SERP renders.
     */
    description:
      "Werkzeuge direkt im Browser: QR-Codes, Passwörter, JSON, PDF und Texterkennung — vieles kostenlos und ohne Anmeldung. Von TDS aus Schwarzenbek bei Hamburg.",
    heroEyebrow: "Digitalisierung für Unternehmen",
    heroHeadlineLead: "Digitale",
    heroHeadlineAccent: "Werkzeuge",
    heroHeadlineTail: "— direkt im Browser.",
    heroBody:
      "QR-Codes, Passwörter, JSON, PDF-Werkzeuge und Texterkennung. Vieles kostenlos und ohne Anmeldung, alles ohne Installation. Von Tracht Digital Solutions aus Schwarzenbek bei Hamburg.",
    navAllTools: "Alle Tools",
    navBlog: "Blog",
    navHome: "Startseite",
    navMenu: "Menü",
    toBlog: "Zum Blog",
    toHome: "Zur Startseite",
    cta: "Unverbindlich anfragen",
    skipToContent: "Zum Inhalt springen",
    emptyCatalog: "Zurzeit sind keine Tools verfügbar.",
    toolCount: (n: number) => `${n} ${n === 1 ? "Werkzeug" : "Werkzeuge"}`,
    guideHeading: "Ratgeber",
    guideUseCases: "Typische Anwendungsfälle",
    guideSteps: "So gehen Sie vor",
    guidePrivacy: "Was mit Ihren Daten passiert",
    guideFaq: "Häufige Fragen",
    relatedHeading: "Passt dazu",
    breadcrumbAll: "Alle Tools",
    footerBlurb:
      "Digitale Werkzeuge direkt im Browser — ohne Installation, vieles davon kostenlos und ohne Anmeldung.",
    footerGroupBrand: "Tracht Digital",
    footerGroupLegal: "Rechtliches",
    footerGroupServices: "Leistungen",
    footerHome: "Startseite",
    footerBlog: "Blog",
    footerPortal: "Kundenportal",
    footerContact: "Kontakt",
    footerImprint: "Impressum",
    footerPrivacy: "Datenschutz",
    footerAdConsent: "Werbe-Einwilligung ändern",
    footerTagline: "Digitalisierung für Unternehmen",
    /**
     * The site's one piece of marketing copy, and it stays one sentence.
     * No free consultation is offered on any web property (the classifieds
     * ads do that, the website deliberately does not), and no customer is
     * ever named. `marketing.test.ts` pins both.
     */
    serviceNote:
      "Diese Werkzeuge lösen kleine Aufgaben. Wenn bei Ihnen ein ganzer Ablauf hakt, baue ich Websites, Webshops und individuelle Lösungen für kleine Betriebe.",
    serviceNoteCta: "Unverbindlich anfragen",
    languageSwitch: "Sprache",
    languageOther: "English",
    premiumHeading: "Freischaltbare Werkzeuge",
    premiumBody:
      "Die meisten Werkzeuge hier sind frei nutzbar. Ein paar aufwendigere schaltet man einmalig frei — danach laufen sie genauso im Browser wie alle anderen: ohne Upload, ohne Abo, ohne Konto beim Anbieter der Datei.",
    premiumLead: "Einmalig freischalten:",
  },
  en: {
    tagline: "Digital tools for business, much of it free",
    description:
      "Tools straight in your browser: QR codes, passwords, JSON, PDF and text recognition — much of it free, no sign-up. By TDS in Schwarzenbek near Hamburg.",
    heroEyebrow: "Digitalisation for businesses",
    heroHeadlineLead: "Digital",
    heroHeadlineAccent: "tools",
    heroHeadlineTail: "— right in your browser.",
    heroBody:
      "QR codes, passwords, JSON, PDF tools and text recognition. Much of it free and without sign-up, all of it without installing anything. By Tracht Digital Solutions in Schwarzenbek near Hamburg.",
    navAllTools: "All tools",
    navBlog: "Blog",
    navHome: "Main site",
    navMenu: "Menu",
    toBlog: "To the blog",
    toHome: "To the main site",
    cta: "Get in touch",
    skipToContent: "Skip to content",
    emptyCatalog: "No tools are available at the moment.",
    toolCount: (n: number) => `${n} ${n === 1 ? "tool" : "tools"}`,
    guideHeading: "Guide",
    guideUseCases: "Typical use cases",
    guideSteps: "How to use it",
    guidePrivacy: "What happens to your data",
    guideFaq: "Frequently asked questions",
    relatedHeading: "Related tools",
    breadcrumbAll: "All tools",
    footerBlurb:
      "Digital tools right in your browser — nothing to install, much of it free and without a sign-up.",
    footerGroupBrand: "Tracht Digital",
    footerGroupLegal: "Legal",
    footerGroupServices: "Services",
    footerHome: "Main site",
    footerBlog: "Blog",
    footerPortal: "Customer portal",
    footerContact: "Contact",
    footerImprint: "Imprint",
    footerPrivacy: "Privacy",
    footerAdConsent: "Change ad consent",
    footerTagline: "Digitalisation for businesses",
    serviceNote:
      "These tools solve small jobs. When a whole process is the problem, I build websites, online shops and custom solutions for small businesses.",
    serviceNoteCta: "Get in touch",
    languageSwitch: "Language",
    languageOther: "Deutsch",
    premiumHeading: "Tools you unlock",
    premiumBody:
      "Most tools here are free to use. A few of the heavier ones are unlocked once — after that they run in your browser exactly like the rest: no upload, no subscription, no account with whoever made the file.",
    premiumLead: "Unlock once:",
  },
} satisfies Record<Lang, SiteCopy>;

/** The string table for a language. */
export function t(lang: Lang): SiteCopy {
  return copy[lang];
}

/** Category section headings. */
export const categoryLabels: Record<Lang, Record<ToolCategory, string>> = {
  de: {
    content: "Inhalte",
    developer: "Entwickler",
    design: "Design",
    marketing: "Marketing",
    media: "Medien",
    security: "Sicherheit",
    business: "Business",
    compliance: "Recht & Pflichten",
    other: "Weitere",
  },
  en: {
    content: "Content",
    developer: "Developer",
    design: "Design",
    marketing: "Marketing",
    media: "Media",
    security: "Security",
    business: "Business",
    compliance: "Compliance",
    other: "Other",
  },
};

/**
 * English name / description / SEO title per tool slug.
 *
 * The German originals stay in the pack manifests; only the translation lives
 * here. A slug missing from this map falls back to the German manifest text
 * (see `toolCopyFor`), which is a visibly imperfect English page rather than
 * an empty one — and `i18n.test.ts` fails when a composed tool is missing,
 * so the fallback is a safety net, not a strategy.
 *
 * The descriptions carry the same 80–160 budget as the German ones and must
 * be distinct from each other; the titles carry the ≤ 60 budget and must not
 * lead with the brand.
 */
export interface ToolCopy {
  name: string;
  description: string;
  seoTitle: string;
}

export const toolCopyEn: Record<string, ToolCopy> = {
  "qr-code-generator": {
    name: "QR Code Generator",
    description:
      "Free QR code generator for URLs, text, Wi-Fi access and vCards. PNG and SVG download, everything local in your browser — no sign-up needed.",
    seoTitle: "QR Code Generator — free, no sign-up",
  },
  "passwort-generator": {
    name: "Password Generator",
    description:
      "Free password generator: secure random passwords with adjustable length and character sets. Runs entirely in your browser, nothing is transmitted.",
    seoTitle: "Password Generator — create secure passwords",
  },
  "utm-link-generator": {
    name: "UTM Link Builder",
    description:
      "Free UTM builder: create trackable marketing links with utm_source, utm_medium and utm_campaign. Built right in your browser, no sign-up.",
    seoTitle: "UTM Link Builder — campaign links with tracking",
  },
  "json-formatter": {
    name: "JSON Formatter & Validator",
    description:
      "Free JSON formatter: indent, validate and minify with precise error positions. Runs completely in your browser — your data is never uploaded.",
    seoTitle: "JSON Formatter & Validator — online, free",
  },
  "kontrast-checker": {
    name: "Colour Contrast Checker (WCAG)",
    description:
      "Free WCAG contrast checker: test the ratio between text and background against AA and AAA. For accessible, readable websites.",
    seoTitle: "Colour Contrast Checker (WCAG) — test accessibility",
  },
  "bild-komprimieren": {
    name: "Compress Image",
    description:
      "Free image compressor: shrink and compress JPG, PNG and WebP files with adjustable quality. Runs in your browser, nothing is uploaded.",
    seoTitle: "Compress Image — online and free",
  },
  "pdf-werkzeuge": {
    name: "PDF Tools",
    description:
      "PDF tools: merge several PDFs, split out a page range and rotate pages. Straight in your browser, with no upload of your documents.",
    seoTitle: "PDF Tools — merge, split, rotate",
  },

  // tds-tool-pdf
  "pdf-komprimieren": {
    name: "Compress PDF",
    description:
      "Shrink a PDF without an upload: the embedded images are recomputed in your browser while the text is left untouched. For attachments too big to send.",
    seoTitle: "Compress PDF — reduce the file size",
  },
  "pdf-wasserzeichen": {
    name: "PDF Watermark",
    description:
      "Put a watermark on a PDF: “Draft”, “Confidential” or a wording of your own, with an adjustable angle and opacity. Runs locally in your browser.",
    seoTitle: "Add a PDF watermark — text stamp",
  },
  "bilder-zu-pdf": {
    name: "Images to PDF",
    description:
      "Turn photographed receipts and scans into one clean PDF: set the order, choose a page size, done. No upload, straight in your browser.",
    seoTitle: "Images to PDF — combine JPG and PNG",
  },
  "pdf-zu-bildern": {
    name: "PDF to Images",
    description:
      "Convert PDF pages into images: choose the resolution and the format, single pages or all of them. The file never leaves your machine.",
    seoTitle: "PDF to Images — pages as PNG or JPG",
  },

  // tds-tool-office
  "etiketten-drucken": {
    name: "Print Labels",
    description:
      "Make your own label sheet: pick the grid, paste the addresses, print the PDF. Fits the common sheets and needs no installation at all.",
    seoTitle: "Print labels — address stickers as a PDF",
  },
  stundenzettel: {
    name: "Timesheet",
    description:
      "Create a monthly timesheet as a PDF: enter the hours, deduct the breaks, the totals are worked out. Ready to print and sign.",
    seoTitle: "Create a timesheet — record of working time",
  },
  texterkennung: {
    name: "Text Recognition (OCR)",
    description:
      "No more retyping: text recognition for photos and scanned images, German and English. It runs on your device and the picture stays there.",
    seoTitle: "Text recognition (OCR) — read text from an image",
  },

  // tds-tool-legal
  //
  // Die Werkzeuge erzeugen deutsche Rechtstexte, die englischen Seiten
  // beschreiben sie für ein Publikum, das in Deutschland veröffentlicht — die
  // Vorschriften werden deshalb beim Namen genannt und nicht übersetzt.
  "impressum-generator": {
    name: "German Imprint Generator",
    description:
      "Build a sample imprint under section 5 DDG: legal form, register, VAT ID and supervisory body appear as you tick them. Runs in your browser.",
    seoTitle: "Imprint generator — a sample under § 5 DDG",
  },
  "datenschutzerklaerung-generator": {
    name: "Privacy Policy Generator (GDPR)",
    description:
      "Assemble a sample GDPR privacy policy from blocks: hosting, contact form, cookies, analytics and newsletter. Nothing is uploaded anywhere.",
    seoTitle: "Privacy policy generator — a GDPR sample",
  },
  "barrierefreiheitserklaerung-generator": {
    name: "Accessibility Statement Generator",
    description:
      "Write an accessibility statement for the German BFSG or for BITV 2.0: compliance status, feedback route and enforcement, as a sample.",
    seoTitle: "Accessibility statement — BFSG and BITV 2.0",
  },
  "ki-kennzeichnung-bilder": {
    name: "AI Image Labelling",
    description:
      "Label AI images as required: burn a visible badge into the picture and embed a machine-readable note in the PNG or JPEG. All in your browser.",
    seoTitle: "Label AI images — badge and metadata",
  },
};

/**
 * The name / description / SEO title a tool page should render.
 *
 * German comes from the manifest (the pack owns it); English comes from the
 * table above, falling back to the German manifest text so a new tool renders
 * a complete page from the day it composes.
 */
export function toolCopyFor(
  lang: Lang,
  tool: { slug: string; name: string; description: string; seo?: { title?: string; description?: string } },
  siteName: string,
): ToolCopy {
  if (lang === "de") {
    return {
      name: tool.name,
      description: tool.seo?.description ?? tool.description,
      seoTitle: tool.seo?.title ?? `${tool.name} — ${siteName}`,
    };
  }
  const en = toolCopyEn[tool.slug];
  if (en) return en;
  return {
    name: tool.name,
    description: tool.seo?.description ?? tool.description,
    seoTitle: tool.seo?.title ?? `${tool.name} — ${siteName}`,
  };
}
