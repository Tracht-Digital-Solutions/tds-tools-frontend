/**
 * Schema.org JSON-LD generators for the tools site.
 *
 * Ported from `tds-landingpage-frontend/src/lib/jsonld.ts` — same function
 * names and shapes, so what is true about the structured data of one property
 * stays true for the others. What is new here is the part the marketing site
 * has no use for: a `SoftwareApplication` node per tool, and `HowTo`/`FAQPage`
 * built from the per-tool guides.
 *
 * Every node is a plain object destined for `JSON.stringify` inside a
 * `<script type="application/ld+json">`. Nodes are joined with {@link asGraph}
 * rather than emitted as several script blocks: one `@graph` lets the nodes
 * reference each other by `@id` (every tool points at the same organization
 * node instead of restating the business), which is what makes the whole site
 * read as one entity.
 */
import { seoConfig, type Lang } from "./seo";

type WithContext<T extends Record<string, unknown> = Record<string, unknown>> =
  T & { "@context": "https://schema.org" };

/**
 * Stable node ids. They are anchored on the MAIN site's origin, not this
 * one — the organization behind these tools is the same entity the
 * landingpage describes, and a second `#organization` id on a second origin
 * would describe a second business.
 */
export const ORG_ID = `${seoConfig.mainUrl}/#organization`;
export const PERSON_ID = `${seoConfig.mainUrl}/#person`;
export const WEBSITE_ID = `${seoConfig.url}/#website`;

/** The founder, referenced by the organization node. */
export function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: seoConfig.founder.name,
    jobTitle: seoConfig.founder.jobTitle,
    worksFor: { "@id": ORG_ID },
    url: seoConfig.mainUrl,
    email: `mailto:${seoConfig.email}`,
    sameAs: Object.values(seoConfig.socials).filter(Boolean) as string[],
  };
}

/**
 * Organization (+ ProfessionalService traits). Search engines treat
 * ProfessionalService as a LocalBusiness subtype, which is what the business
 * actually is. Street, postal code, phone and VAT ID match the Impressum.
 */
export function organizationSchema() {
  const socials = Object.values(seoConfig.socials).filter(Boolean) as string[];

  const base: Record<string, unknown> = {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: seoConfig.name,
    alternateName: seoConfig.shortName,
    legalName: seoConfig.legalName,
    vatID: seoConfig.vatID,
    url: seoConfig.mainUrl,
    email: `mailto:${seoConfig.email}`,
    telephone: seoConfig.telephone,
    logo: `${seoConfig.url}/brand/td-logomark.webp`,
    founder: { "@id": PERSON_ID },
    areaServed: seoConfig.areaServed.map((a) => ({ "@type": "Place", name: a })),
    address: {
      "@type": "PostalAddress",
      streetAddress: seoConfig.address.streetAddress,
      postalCode: seoConfig.address.postalCode,
      addressLocality: seoConfig.address.addressLocality,
      addressRegion: seoConfig.address.addressRegion,
      addressCountry: seoConfig.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: seoConfig.geo.latitude,
      longitude: seoConfig.geo.longitude,
    },
    knowsAbout: [...seoConfig.knowsAbout],
  };

  if (socials.length > 0) base.sameAs = socials;

  return base;
}

/** WebSite node for this property, published by the shared organization. */
export function websiteSchema(description: string) {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: seoConfig.url,
    name: `${seoConfig.shortName} Tools`,
    description,
    publisher: { "@id": ORG_ID },
    inLanguage: ["de-DE", "en-GB"],
  };
}

/**
 * BreadcrumbList — emitted on every tool page. The page has always DRAWN a
 * breadcrumb ("Alle Tools / QR-Code-Generator") and never declared one, so
 * the hierarchy was visible to a reader and invisible to everything else.
 */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** The catalog itself, as an ordered list of tool pages. */
export function itemListSchema(items: { name: string; url: string }[]) {
  return {
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export interface SoftwareAppInput {
  name: string;
  url: string;
  description: string;
  /** `WebApplication` unless a tool's manifest overrides it. */
  type: string;
  lang: Lang;
  /** Free tools declare `isAccessibleForFree`; premium ones carry an Offer. */
  isFree: boolean;
  priceCents: number;
  /** Manifest keywords — a genuine relevance signal on an app node. */
  keywords?: readonly string[];
}

/**
 * One tool as a SoftwareApplication (via its `WebApplication` subtype).
 *
 * A free tool gets `isAccessibleForFree: true` and an Offer at price 0 —
 * both, deliberately: the boolean is what Google reads, and an `offers` node
 * is what several AI answer engines look for before they will state a price.
 * It used to emit `price: "0.00"` for everything including the premium PDF
 * tool's real price, which stated the wrong thing about the one tool that
 * charges money.
 */
export function softwareApplicationSchema(input: SoftwareAppInput) {
  const price = input.isFree ? 0 : input.priceCents / 100;

  return {
    "@type": input.type,
    "@id": `${input.url}#app`,
    name: input.name,
    url: input.url,
    description: input.description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript",
    inLanguage: input.lang === "de" ? "de-DE" : "en-GB",
    isAccessibleForFree: input.isFree,
    offers: {
      "@type": "Offer",
      price: price.toFixed(2),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
    provider: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    ...(input.keywords?.length ? { keywords: input.keywords.join(", ") } : {}),
  };
}

export interface FaqItem {
  q: string;
  a: string;
}

/**
 * FAQPage. The answer text must match the visible answer 1:1 or Google
 * strips the rich result — which is why the page and this node are rendered
 * from the same guide object rather than from two hand-kept copies.
 */
export function faqPageSchema(items: readonly FaqItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export interface HowToStepInput {
  title: string;
  description: string;
}

/** HowTo — the "so gehen Sie vor" steps of a tool guide. */
export function howToSchema(name: string, steps: readonly HowToStepInput[]) {
  return {
    "@type": "HowTo",
    name,
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.title,
      text: step.description,
    })),
  };
}

/**
 * Combine nodes into a single `@graph` — the canonical way to emit several
 * typed entities in one script block without repeating `@context`.
 */
export function asGraph(...nodes: object[]): WithContext {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
