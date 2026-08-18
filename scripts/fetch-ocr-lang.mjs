#!/usr/bin/env node
/**
 * Fetch the tesseract language data into `public/ocr/lang/`, where it is
 * COMMITTED. It is deliberately not part of the build: a build that downloads
 * from a third-party host fails whenever that host does, and the failure mode
 * here would be a premium tool that silently stops recognising anything.
 *
 * Run this by hand when a language is added, then commit the result.
 *
 *   npm run ocr:fetch-lang
 *
 * `tessdata_fast` is the right trade for a browser: roughly a megabyte per
 * language against tens for the full models, at an accuracy difference nobody
 * reading a photographed invoice will notice.
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const BASE = "https://tessdata.projectnaptha.com/4.0.0_fast";
const LANGS = ["deu", "eng"];

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const target = join(root, "public", "ocr", "lang");

async function main() {
  mkdirSync(target, { recursive: true });
  for (const lang of LANGS) {
    const name = `${lang}.traineddata.gz`;
    const to = join(target, name);
    if (existsSync(to) && !process.argv.includes("--force")) {
      console.log(`ocr:fetch-lang: ${name} already present (pass --force to refetch)`);
      continue;
    }
    const res = await fetch(`${BASE}/${name}`);
    if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
    const bytes = new Uint8Array(await res.arrayBuffer());
    writeFileSync(to, bytes);
    console.log(`ocr:fetch-lang: ${name} (${(bytes.length / 1024 / 1024).toFixed(2)} MB)`);
  }
}

main().catch((error) => {
  console.error(`ocr:fetch-lang failed: ${error.message}`);
  process.exit(1);
});
