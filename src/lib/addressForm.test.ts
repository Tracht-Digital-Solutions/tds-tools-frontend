import { readFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * The tools site addresses no one directly — decided 2026-10-21
 * (tds-tools-frontend#6), the same rule the landingpage follows since
 * 2026-10-12. Before, the pack descriptions said "du" and the guides said
 * "Sie", and both stood side by side in `/llms.txt`.
 *
 * Read as TEXT over every German copy source, comments removed — the same
 * walk as the landingpage's `addressForm.test.ts`. English copy is not
 * checked: "you" carries no register.
 *
 * Out of reach here, and listed so nobody mistakes a green run for a finished
 * switch: guide texts saved in the panel (they override these defaults until
 * cleared), the tool packs' own island strings (each `tds-tool-*-pkg`), and
 * the legal generators' OUTPUT, which is a legal text and stays formal.
 */
const FORMAL = /\b(Sie|Ihnen|Ihr|Ihre|Ihren|Ihrem|Ihrer|Ihres)\b/;
const INFORMAL = /(?<![\w-])(du|Du|dein\w*|Dein\w*|dir|Dir|dich|Dich)(?![\w-])/;
const LITERAL = /"(?:[^"\\\n]|\\.)*"|`(?:[^`\\]|\\.)*`/g;
const SOURCES = ["src/lib", "src/components", "src/layouts", "src/pages", "src/content"];

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

function filesUnder(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(resolve(process.cwd(), dir))) {
    const path = `${dir}/${entry}`;
    if (statSync(resolve(process.cwd(), path)).isDirectory()) out.push(...filesUnder(path));
    else if (/\.(astro|ts|tsx)$/.test(entry) && !/\.test\.tsx?$/.test(entry)) out.push(path);
  }
  return out;
}

/** Comments quote what a line replaced — "So gehen Sie vor" — and are not copy. */
function withoutComments(source: string): string {
  return source
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/^\s*\/\/.*$/gm, "");
}

const copyFiles = () => SOURCES.flatMap(filesUnder);

describe("the visitor is not addressed directly", () => {
  it("never formally", () => {
    const offenders: string[] = [];
    for (const file of copyFiles()) {
      for (const line of withoutComments(read(file)).split("\n")) {
        const hit = line.match(FORMAL);
        if (hit) offenders.push(`${file}: "${hit[0]}" — ${line.trim().slice(0, 120)}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("never with du in any copy string", () => {
    const offenders: string[] = [];
    for (const file of copyFiles()) {
      for (const literal of withoutComments(read(file)).match(LITERAL) ?? []) {
        // `${dir * …}` inside a template literal is code, not copy.
        const hit = literal.replace(/\$\{[^}]*\}/g, "").match(INFORMAL);
        if (hit) offenders.push(`${file}: "${hit[0]}" — ${literal.slice(0, 120)}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("still finds both forms where the patterns should match", () => {
    // Proof that the patterns and the file walk match anything at all — a
    // typo in either would otherwise turn the rules above into a silent pass.
    expect(copyFiles()).toContain("src/content/guides/qr-code-generator.ts");
    expect("Bitte geben Sie Ihre Adresse ein.").toMatch(FORMAL);
    expect('"Was kennst du davon?"'.match(LITERAL)?.[0]).toMatch(INFORMAL);
    expect('"--dir"').not.toMatch(INFORMAL);
  });
});
