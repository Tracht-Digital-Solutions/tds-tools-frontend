# Premium, account menu and language switch

## `ToolGate`

- Premium tools require login; entitlement is bound to `userId` and checked against the frontend API.
- **It fails closed.** A failed `/auth/me` is not authed; a failed entitlement probe is not entitled. It is a
  paywall, not DRM (premium bundles ship anyway), but it must never reveal the body without a real grant.
- **The login fallback is the central login** (`https://auth.tracht-digital.de`), the same default as
  `tds-core-frontend-pkg`. Production supplies `loginUrl` via `tds-runtime.json`. `ToolGate.test.tsx` pins the
  origin and the `next` parameter.

## `PremiumNote.astro`

The only place the paid tier is explained (what unlocking gets you; a one-off, not a subscription).

- It derives its list from the catalog, so a tool switched to free disappears on the next render; it renders
  **nothing** when no tool is premium.
- A plain block on the page ground, not a card (visitors came for a free tool; a boxed advert reads as bait).
- It links every premium tool by name (internal linking from the crawled catalog).
- Its copy is scanned by `marketing.test.ts`.

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
