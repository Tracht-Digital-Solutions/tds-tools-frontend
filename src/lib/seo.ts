/**
 * SEO identity for the public tools site.
 *
 * This is the *who*, not the *what*: name, legal entity, NAP, coordinates,
 * service area and topical focus. The copy (tagline, descriptions, category
 * labels, sibling links) stays in `~/lib/site`; the JSON-LD renderers in
 * `~/lib/jsonld` read from here.
 *
 * **Every value is a verbatim copy of `tds-landingpage-frontend/src/lib/seo.ts`.**
 * That is the point: a local-business signal is only worth anything when the
 * name, address and phone are byte-identical everywhere they appear (the
 * Impressum, the landingpage's schema, the blog's, and this site's). A
 * paraphrased street or a differently formatted phone number reads as a
 * *different* business to a search engine, which is worse than emitting
 * nothing at all. `seo.test.ts` compares the two files so a change on one side
 * fails this build.
 *
 * What deliberately does NOT come along: `description` (this site describes
 * tools, not services — see `site.description`), `pricing`, and the founder's
 * `jobTitle` framing that only makes sense on the marketing site.
 */
export const seoConfig = {
  /** Brand name as it should appear in search results. */
  name: "Tracht Digital Solutions",
  shortName: "TDS",
  /** This property's origin. Mirrors `astro.config.mjs#site` and `site.origin`. */
  url: "https://tools.tracht-digital.de",
  /** The main site — the entity all three properties belong to. */
  mainUrl: "https://tracht-digital.de",
  /** Sister origin where the journal lives. */
  blogUrl: "https://blog.tracht-digital.de",
  /** Verified contact channel. Safe to publish in schema. */
  email: "kontakt@tracht-digital.de",
  /** Verified phone (WhatsApp). E.164-friendly formatting for schema. */
  telephone: "+49 178 8224022",
  /** Legal entity behind the brand. */
  legalName: "Julian Tracht",
  /** USt-IdNr. gemäß § 27a UStG — verified, matches the Impressum. */
  vatID: "DE450639725",
  founder: {
    name: "Julian Tracht",
    jobTitle: "Inhaber & Entwickler",
  },
  /** Verified business address (matches the Impressum). */
  address: {
    streetAddress: "Elbinger Straße 19",
    postalCode: "21493",
    addressLocality: "Schwarzenbek",
    addressRegion: "Schleswig-Holstein",
    addressCountry: "DE",
  },
  /** Approximate coordinates of the business address. */
  geo: { latitude: 53.504, longitude: 10.48 },
  /** Service area for the ProfessionalService node. */
  areaServed: ["Hamburg", "Schwarzenbek", "Norddeutschland", "Deutschland"],
  /** Topics for schema `knowsAbout` — the keyword set the brand targets. */
  knowsAbout: [
    "Digitalisierung für Unternehmen",
    "Prozessautomatisierung",
    "Webentwicklung",
    "Webshop",
    "Onlineshop für lokale Geschäfte",
    "Individualsoftware",
    "App-Entwicklung",
    "IT-Beratung",
  ],
  /** Public social URLs — surface in JSON-LD `sameAs`. */
  socials: {
    linkedin: "https://www.linkedin.com/in/julian-tracht/",
    github: "https://github.com/Tracht-Digital-Solutions",
  } as { linkedin?: string; github?: string },
  /**
   * Default OG card, generated at build time by `src/pages/og/default.png.ts`.
   *
   * It used to be `/og-default.png`, a path that existed in NO repo — not in
   * `public/`, not in the built `dist/`. So every share of this site on
   * LinkedIn, WhatsApp or X rendered with a blank card from the day the site
   * launched, and nothing anywhere reported it: the tag is well-formed, the
   * build is green, and the only symptom lives in someone else's preview
   * pane. `seo.test.ts` now pins the path against the route that emits it.
   */
  defaultOgImage: "/og/default.png",
} as const;

export type SeoConfig = typeof seoConfig;

/** The two languages this site publishes. */
export type Lang = "de" | "en";

/**
 * Whether the English tree under `/en/` is built.
 *
 * The hreflang block in `Layout.astro` is gated on this, because an
 * `hreflang="en"` pointing at a URL that 404s is worse than no alternate at
 * all: Search Console reports the whole set as invalid and drops the German
 * side's alternate with it. The flag exists so the SEO groundwork and the
 * English content can ship in separate releases without one of them being
 * a live defect in between.
 *
 * Flip to `true` in the same change that adds `src/pages/en/**`.
 */
export const EN_ENABLED = false;

/**
 * hreflang/OG locale pairs. `x-default` points at the German page: the
 * audience is local businesses in Northern Germany, so German is the
 * best guess for a visitor whose language we do not know.
 */
export const ogLocale: Record<Lang, string> = { de: "de_DE", en: "en_GB" };

/**
 * The EN counterpart of a German path (and back). The site mounts English
 * under `/en/…` with the SAME slugs, so an hreflang pair is a pure prefix
 * operation and the two URLs always point at each other.
 */
export function neutralPath(pathname: string): string {
  return pathname.replace(/^\/en(?=\/|$)/, "") || "/";
}

export function localizedPath(pathname: string, lang: Lang): string {
  const neutral = neutralPath(pathname);
  if (lang === "de") return neutral;
  return neutral === "/" ? "/en/" : `/en${neutral}`;
}
