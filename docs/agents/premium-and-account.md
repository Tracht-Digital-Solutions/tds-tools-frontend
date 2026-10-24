# Premium, account menu and language switch

## `ToolGate`

- Premium tools require login; entitlement is bound to `userId` and checked against the frontend API.
- **It fails closed.** A failed `/auth/me` is not authed; a failed entitlement probe is not entitled. It is a
  paywall, not DRM (premium bundles ship anyway), but it must never reveal the body without a real grant.
- **The login fallback is the central login** (`https://auth.tracht-digital.de`), the same default as
  `tds-core-frontend-pkg`. Production supplies `loginUrl` via `tds-runtime.json`. `ToolGate.test.tsx` pins the
  origin and the `next` parameter.

## Premium: monthly stages (since 2026-10-24)

Premium is a monthly subscription, sold in stages the admin manages in `tds-ext-tools-pkg`
(name, fixed monthly price, copy, tools). One-off purchases are no longer sold; earlier ones still
pass `/tools/entitlement`.

- **`lib/premium.ts`** reads `GET /tools/tiers` server-side (public route, **no site key**:
  `lib/publicFetch.ts`). The prices are rendered into the page; a stage change refreshes the cache.
  Fails soft to no stages ("Premium ist gerade nicht buchbar").
- **`PremiumSection.astro`** (replaces PremiumNote) renders for a visitor WITHOUT a premium account,
  because the cached page is the same for everyone: the premium tools in their own grid (cells come
  from `CatalogPage` through the slot, so filter and tilt reach them), the copy, every stage with its
  price and "Freischalten", and the account line.
- **`lib/premiumClient.ts`** asks `GET /tools/premium/status`. Premium account: the cells move into
  the catalog grid at their `data-order`, the offer hides, "Premium ist aktiv" shows, "Abo verwalten"
  (only with a subscription) opens `POST /tools/billing-portal`. Guest: "Freischalten" goes to
  `auth…/registrieren?next=…#premium`. Member: `POST /tools/subscribe`; 409 `has_subscription` →
  portal, never a second checkout. A failed status call leaves the offer as rendered.
- **`ToolGate`** books the cheapest stage with the tool (`unlock` from `ToolPage`), states its
  monthly price, offers "Konto anlegen" next to "Anmelden", and shows no button without a stage.
- JSON-LD follows the visible price: a premium tool's Offer is the stage's monthly price
  (`UnitPriceSpecification`, `MON`); without a stage, no Offer.
- Copy rules: `marketing.test.ts` and `addressForm.test.ts` (neutral German, no free consultation).

## Account menu

`AccountMenu` from `@tracht-digital-solutions/tds-shared/components`: avatar, name and dropdown, top right.

- **Signed out it shows a sign-in link** (`loggedOut="login"`), painted immediately rather than after the `/me`
  probe.
- **Mounted outside the `hidden … lg:flex` cluster**, so it remains below `lg`. Pinned by `header.test.ts`.
- **Utilities go on the wrapper `<div>`**, never on `<AccountMenu>` (unlayered vs `@layer utilities`).
- **Signing out reloads the page**, because `ToolGate` may already have revealed a premium body from the session.
- `ToolGate` and the menu both probe `/auth/me` without sharing a memo. Moving the gate to tds-shared's
  `fetchAccount` is the named next step; it changes a paywall, so it is a separate change.
- On this flat surface the menu panel keeps its shadow (8 % navy, 12 px blur) as its only separator; tds-shared's
  `design.test.ts` pins it.

## Language switch (`.tds-lang-toggle`, tds-shared ≥ 0.25.3)

- `aria-current="true"` on the active half carries the state; `.on` is only paint. Set both.
- **Both halves point at the equivalent page** (`localizedPath(path, …)`), never the other home page.
- It renders twice: the desktop bar and the mobile control row beside the theme toggle.
- `header.test.ts` asserts the class resolves in the **installed** tds-shared (a 0.x caret can resolve a version
  without it).
- Trade-off: the control is 26 px tall (24 px on phones), matching the blog; raising it means changing the shared
  primitive.
