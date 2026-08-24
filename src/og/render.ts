/**
 * Build-time OG card renderer for the tools site.
 *
 * Satori turns a JSX-ish object tree into SVG; resvg-js rasterises it to PNG.
 * Two cards are produced at build time: `/og/default.png` (catalog, 404, any
 * page that does not override it) and `/og/tools/<slug>.png` (one per tool).
 *
 * **Why this file exists at all:** `Layout.astro` advertised
 * `og:image = /og-default.png` from the day the site launched, and that file
 * existed in no repo — not in `public/`, not in `dist/`. The tag was
 * well-formed, the build was green, and every share on LinkedIn, WhatsApp or
 * X rendered a blank card. There is no failure mode to notice here: the
 * symptom lives entirely in someone else's preview pane.
 *
 * The card is the JOURNAL's hero band, not the landingpage's paper card:
 * a flat navy ground, a coral eyebrow, the headline in white with one coral
 * word, the three-part brand accent beneath it. A share of a tools page
 * should look like the page it links to.
 *
 * 1200×630 — the LinkedIn / X card size:
 *
 *   ┌────────────────────────────────────────────────────────────┐
 *   │  MARKETING · TD TOOLS                                      │  navy
 *   │                                                            │
 *   │  QR-Code-Generator                                         │
 *   │  ▬▬▬▬ ▬▬ ▬                                                 │
 *   │                                                            │
 *   │  tools.tracht-digital.de        Schwarzenbek · Hamburg     │
 *   └────────────────────────────────────────────────────────────┘
 */
import fs from "node:fs";
import path from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { site } from "~/lib/site";

// Resolved from the project root: Astro bundles this module into dist/, where
// an `import.meta.url`-relative path no longer reaches src/og/fonts.
const FONT_DIR = path.join(process.cwd(), "src/og/fonts");
let latoBold: Buffer | null = null;

function loadFonts() {
  if (latoBold === null) {
    latoBold = fs.readFileSync(path.join(FONT_DIR, "Lato-Bold.ttf"));
  }
  return { lato: latoBold };
}

/* The brand values, resolved to literals because satori has no CSS custom
   properties. The bar segments are the `--on-dark` run of `.tds-brandbar`
   (cranberry · coral · gold) as it resolves in the light theme — the card is
   a fixed artifact and cannot follow a viewer's theme. */
const NAVY = "#050f68";
const WHITE = "#ffffff";
const CORAL = "#ff7a9c";
const CRANBERRY = "#a4153f";
const GOLD = "#b9791c";
const DIM = "rgba(255,255,255,0.62)";

const WIDTH = 1200;
const HEIGHT = 630;

type Node = Parameters<typeof satori>[0];

/** The three-part brand accent, laid out as three fixed-width blocks. */
function brandbar(): unknown {
  const seg = (width: number, color: string) => ({
    type: "div",
    props: { style: { width: `${width}px`, height: "8px", backgroundColor: color } },
  });
  return {
    type: "div",
    props: {
      style: { display: "flex", gap: "12px", marginTop: "34px" },
      children: [seg(84, CRANBERRY), seg(40, CORAL), seg(24, GOLD)],
    },
  };
}

function eyebrow(text: string): unknown {
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "20px",
        fontFamily: "Lato",
        fontSize: "20px",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: CORAL,
      },
      children: [
        { type: "div", props: { style: { width: "56px", height: "1px", backgroundColor: CORAL } } },
        { type: "div", props: { children: text } },
      ],
    },
  };
}

function footerRow(left: string, right: string): unknown {
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: "48px",
        fontFamily: "Lato",
        fontSize: "22px",
        color: DIM,
      },
      children: [
        { type: "span", props: { style: { color: WHITE }, children: left } },
        { type: "span", props: { children: right } },
      ],
    },
  };
}

/**
 * Headline size by length. A fixed 80px overflows the card at around 22
 * characters, and satori does not warn — it simply draws outside the
 * viewport, so the last word is silently missing from the shared image.
 * "WCAG-Kontrast-Prüfer" and "Bild-Komprimierung" both sit past that bound.
 */
function headlineSize(text: string): string {
  if (text.length <= 18) return "84px";
  if (text.length <= 26) return "68px";
  return "56px";
}

function card(opts: {
  eyebrow: string;
  headline: unknown[];
  headlineSize: string;
  footerLeft: string;
  footerRight: string;
}): Node {
  return {
    type: "div",
    props: {
      style: {
        width: `${WIDTH}px`,
        height: `${HEIGHT}px`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: NAVY,
        padding: "72px 80px",
        fontFamily: "Lato",
        color: WHITE,
      },
      children: [
        {
          type: "div",
          props: {
            style: { display: "flex", flexDirection: "column" },
            children: [
              eyebrow(opts.eyebrow),
              {
                type: "div",
                props: {
                  style: {
                    fontFamily: "Lato",
                    fontWeight: 700,
                    fontSize: opts.headlineSize,
                    lineHeight: 1.06,
                    letterSpacing: "-0.03em",
                    color: WHITE,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "16px",
                    marginTop: "36px",
                  },
                  children: opts.headline,
                },
              },
              brandbar(),
            ],
          },
        },
        footerRow(opts.footerLeft, opts.footerRight),
      ],
    },
  } as Node;
}

async function rasterise(tree: Node): Promise<Buffer> {
  const { lato } = loadFonts();
  const svg = await satori(tree, {
    width: WIDTH,
    height: HEIGHT,
    fonts: [{ name: "Lato", data: lato, weight: 700, style: "normal" }],
  });
  return new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } }).render().asPng();
}

/**
 * The catalog card's headline, per language, split into its two spans — the
 * second is the coral accent word.
 *
 * Exported so `marketing.test.ts` can assert the claim it makes. Recovering the
 * two spans from the source as string literals does NOT work: they are separate
 * literals, and a scanner that joins independent strings invents phrases nobody
 * wrote (it did, immediately — "…much of it free" + "tools straight in your
 * browser…"). Joining them here, where they are known to be one sentence, is
 * the only honest seam.
 */
export const DEFAULT_OG_HEADLINES: Record<"de" | "en", [string, string]> = {
  de: ["Digitale Werkzeuge", "für Unternehmen."],
  en: ["Digital tools", "for your business."],
};

/**
 * The catalog card — used by every page that does not override `ogImage`.
 *
 * It used to read "Kostenlose digitale Werkzeuge.", the site-wide free claim
 * that was removed everywhere else on 2026-08-18 once 8 of the 14 composed
 * tools became premium. The hero, the title and the meta description were all
 * corrected; the share card was missed, and `marketing.test.ts` did not scan
 * this file — so every share of the catalog page went on making a promise the
 * site itself no longer made. The per-tool cards below were always honest,
 * because their badge is derived from `isPremium`.
 */
export async function renderDefaultOgPng(lang: "de" | "en" = "de"): Promise<Buffer> {
  const headline = DEFAULT_OG_HEADLINES[lang];

  return rasterise(
    card({
      eyebrow: site.name,
      headline: [
        { type: "span", props: { children: headline[0] } },
        { type: "span", props: { style: { color: CORAL }, children: headline[1] } },
      ],
      headlineSize: "84px",
      footerLeft: "tools.tracht-digital.de",
      footerRight: "Schwarzenbek · Hamburg",
    }),
  );
}

export interface ToolCardInput {
  name: string;
  /** German category label, e.g. "Marketing". */
  category: string;
  slug: string;
  isPremium: boolean;
  lang: "de" | "en";
}

/** One card per tool — the tool's own name is what gets shared, not the brand. */
export async function renderToolOgPng(tool: ToolCardInput): Promise<Buffer> {
  const badge = tool.isPremium
    ? tool.lang === "de"
      ? "Premium-Werkzeug"
      : "Premium tool"
    : tool.lang === "de"
      ? "kostenlos · ohne Anmeldung"
      : "free · no sign-up";

  return rasterise(
    card({
      eyebrow: `${tool.category} · ${site.name}`,
      headline: [{ type: "span", props: { children: tool.name } }],
      headlineSize: headlineSize(tool.name),
      footerLeft: `tools.tracht-digital.de`,
      footerRight: badge,
    }),
  );
}
