# OCR assets are served by this site

`texterkennung` (from `tds-tool-office`) runs tesseract.js, which by default fetches its worker, WebAssembly
core and language data from a third-party CDN. For a tool promising "the image never leaves your device", that
would contact someone else and drag a foreign host into the consent story. So the island pins
`/ocr/worker.min.js`, `/ocr` and `/ocr/lang`, and `scripts/sync-ocr.mjs` (a `prebuild` step) fills `public/ocr/`
from `node_modules`.

- **Language data is committed** under `public/ocr/lang/` (~2.7 MB, German and English, `tessdata_fast`).
  Everything else in `public/ocr/` is generated and gitignored. `npm run ocr:fetch-lang` re-fetches when a
  language is added.
- **All three `-lstm` core builds are copied** (plain, `simd`, `relaxedsimd`); tesseract.js picks one at runtime.
  It needs the **single-file** core (`tesseract-core-*.wasm.js`, wasm inlined), not loader + `.wasm`.
- **`tsconfig.json` excludes `public/ocr/`**; otherwise `astro check` parses the minified WASM wrappers and emits
  millions of diagnostics.
- **The resolver probes paths and avoids `require.resolve`.** A package with an `exports` map refuses
  `require.resolve("<pkg>/package.json")` (`ERR_PACKAGE_PATH_NOT_EXPORTED`), indistinguishable from "not
  installed".
- The step fails **soft** (a warning), so a missing optional dependency can't break the build.
- It adds about 14 MB to `dist/`, served static and gzipped.
- If these paths change in `tds-tool-office-pkg`, change the copy step in the same release; see that repo's
  `docs/agents/ocr-assets.md`.
