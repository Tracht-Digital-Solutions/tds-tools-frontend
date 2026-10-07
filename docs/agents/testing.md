# Testing

`npm run test:run` runs vitest. `.astro` pages otherwise rely on `astro check` and the real build.

| Suite | Covers |
|---|---|
| `lib/surface.test.ts` | Markup and CSS read **as text**: no `var(--tds-panel-…)`, `data-surface="blog"`, presence of `data-flat`, absence of `data-frontend`, the imported surface layer, blog + main-site links in header and footer; one assertion reads the **installed** tds-shared `surfaces/blog.css` |
| `lib/catalog.test.ts` | Default → override merge; strict ads guard (`enabled === true` and a `publisherId`; loosening it fails three tests); a non-OK response with a body that would change the result is ignored |
| `ToolGate.test.tsx` | Fails closed on `/auth/me` and entitlement failures; login fallback origin and `next` |
| `lib/seo.test.ts`, `lib/site.test.ts`, `lib/i18n.test.ts` | Budgets, NAP parity with the landing page, `EN_ENABLED` ↔ `src/pages/en/`, icon paths, both languages |
| `lib/guides.test.ts`, `lib/guideOverrides.test.ts` | Guide depth and uniqueness; SEO-title fallback both ways |
| `lib/marketing.test.ts` | Positioning rules in both languages |
| `components/header.test.ts` | App shell, brand mark, account menu placement, language switch |
| `lib/siteKey.test.ts` | Structural half of the site-key guard |
| `lib/composedPacks.test.ts`, `lib/packRegistration.test.ts` | One shared pack list instead of one per test file |
| `lib/cardTilt.test.ts`, `lib/cache.test.ts`, `lib/robotsTxt.test.ts`, `lib/llmsTxt.test.ts`, `lib/geoAudit.test.ts` | Tilt conditions, cache events, robots, llms.txt, geo audit |

## Setup notes

- **`virtual:tools-catalog` is aliased to `test/fixtures/tools-catalog.ts`**, a realistic composition (free,
  login-required, premium with price).
- **`toolsData()` memoises**, so each test re-imports via `vi.resetModules()`.
- **`vitest.config.ts` restates the `~` alias**; vitest doesn't read `tsconfig` paths.
- After an OG renderer change, run `npm run og:smoke`.
