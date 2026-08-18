#!/usr/bin/env node
/**
 * Copy the OCR engine into `public/ocr/` so the Texterkennung tool
 * (`@tracht-digital-solutions/tds-tool-office`) is served entirely by this site.
 *
 * WHY THIS EXISTS. tesseract.js otherwise fetches its worker, its WebAssembly
 * core and its language data from a third-party CDN at first use. That would
 * make a tool whose whole promise is "the image never leaves your device"
 * contact somebody else the moment it is opened, and it would drag a foreign
 * host into the consent story of a German site. The island pins
 * `/ocr/worker.min.js`, `/ocr` and `/ocr/lang`; this script is the other half of
 * that contract. Break it and nothing errors — the tool simply starts phoning a
 * CDN again.
 *
 * TWO THINGS THAT LOOK LIKE DETAILS AND ARE NOT:
 *
 * 1. tesseract.js asks for the SINGLE-FILE core (`tesseract-core-*.wasm.js`,
 *    with the wasm inlined as base64), not the small loader plus a separate
 *    `.wasm`. Copying the wrong pair produces a 404 at first use and nothing at
 *    all at build time.
 * 2. It chooses between a plain, a `simd` and a `relaxedsimd` build at RUNTIME,
 *    all in the `-lstm` flavour for the default OEM. All three are copied.
 *    Shipping only the one your own machine picks works locally and fails on
 *    somebody else's.
 *
 * The language data is committed under `public/ocr/lang/` rather than downloaded
 * here, so a build never depends on an external host being up. `npm run
 * ocr:fetch-lang` re-fetches it when a language is added.
 */
import { existsSync, mkdirSync, copyFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const target = join(root, "public", "ocr");

/** The core builds tesseract.js may ask for with the default LSTM engine. */
const CORE_FILES = [
  "tesseract-core-lstm.wasm.js",
  "tesseract-core-simd-lstm.wasm.js",
  "tesseract-core-relaxedsimd-lstm.wasm.js",
];

/**
 * tesseract.js is a dependency of the tool PACK, not of this site. A normal
 * registry install hoists it next to everything else; a local `file:` install of
 * the pack (how it is developed) leaves it inside the pack's own node_modules
 * instead. Both places are probed.
 *
 * Deliberately probing PATHS rather than calling `require.resolve`: a package
 * with an `exports` map — which both tool packs have — refuses
 * `require.resolve("<pkg>/package.json")` with ERR_PACKAGE_PATH_NOT_EXPORTED.
 * That throw is indistinguishable here from "not installed", so the resolve
 * route reports a missing dependency for a package sitting right there, and the
 * only symptom is an OCR tool that 404s its engine at first use.
 */
function resolvePackageDir(name) {
  const candidates = [
    join(root, "node_modules", name),
    join(
      root,
      "node_modules",
      "@tracht-digital-solutions",
      "tds-tool-office",
      "node_modules",
      name,
    ),
  ];
  for (const dir of candidates) {
    if (existsSync(join(dir, "package.json"))) return dir;
  }
  // Last resort: let node resolve the package's entry point and walk back up to
  // its root. Works when neither layout above matches (a workspace, say).
  try {
    let dir = dirname(require.resolve(name));
    for (let i = 0; i < 5; i++) {
      if (existsSync(join(dir, "package.json"))) return dir;
      dir = dirname(dir);
    }
  } catch {
    // Genuinely not installed.
  }
  return null;
}

function main() {
  const workerDir = resolvePackageDir("tesseract.js");
  const coreDir = resolvePackageDir("tesseract.js-core");

  // A warning rather than a failure, to match sync-installer.mjs: a missing
  // optional dependency must not take the whole site build down. The OCR tool
  // then 404s its engine, which its own error message surfaces.
  if (!workerDir || !coreDir) {
    console.warn(
      "sync-ocr: tesseract.js / tesseract.js-core not installed - skipping (the OCR tool will not work)",
    );
    return;
  }

  mkdirSync(target, { recursive: true });

  const worker = join(workerDir, "dist", "worker.min.js");
  if (!existsSync(worker)) {
    console.warn(`sync-ocr: ${worker} is missing - skipping`);
    return;
  }
  copyFileSync(worker, join(target, "worker.min.js"));

  let cores = 0;
  for (const file of CORE_FILES) {
    const from = join(coreDir, file);
    if (!existsSync(from)) {
      console.warn(`sync-ocr: core build ${file} is missing`);
      continue;
    }
    copyFileSync(from, join(target, file));
    cores++;
  }

  const langDir = join(target, "lang");
  const langs = existsSync(langDir)
    ? readdirSync(langDir).filter((f) => f.endsWith(".traineddata.gz"))
    : [];
  if (langs.length === 0) {
    console.warn(
      "sync-ocr: no language data in public/ocr/lang - run `npm run ocr:fetch-lang` (the OCR tool will not work)",
    );
  }

  console.log(
    `sync-ocr: worker + ${cores} core build(s) + ${langs.length} language(s) -> public/ocr/`,
  );
}

main();
