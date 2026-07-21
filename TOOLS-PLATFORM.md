# TDS Tools-Plattform — Handbuch (Installation, Betrieb, Erweiterung)

Praxis-Anleitung für die öffentliche Tools-Plattform `tools.tracht-digital.de`:
lokal entwickeln, veröffentlichen, ausrollen, im Admin-Panel konfigurieren und
**neue Tools einbauen**. Für die Architektur-Details siehe `CLAUDE.md` und die
`AGENTS.md` im jeweiligen Repo.

---

## Überblick

Die Tools-Plattform ist eine **eigene öffentliche Static-Site** (wie Landingpage
und Blog) — NICHT Teil des noindex-Panels. Sie wird **zur Build-Zeit** aus
Tool-Paketen zusammengesetzt.

| Repo | Typ | Rolle |
|---|---|---|
| `tds-tools-contract` | npm-SDK | `defineTool` / `defineToolPack` / `composeToolPacks` / `toolHost()` |
| `tds-tool-qr` `-textkit` `-devkit` `-media` | Tool-Pakete | je 1–n Tools (Manifest + `.astro`/`.tsx`) |
| `tds-tools` | Static-Site | die Website; komponiert die Pakete via `toolHost` |
| `tds-ext-tools` | Panel-Extension | Admin-Verwaltung + Backend (Katalog, AdSense, Stripe-Premium) |

**Datenfluss:** Tool-Liste fließt _Pakete → Website → Backend_ (Build-Zeit-Sync),
Konfiguration fließt zurück (`GET /tools/catalog`). Die **kostenlosen Tools +
AdSense laufen komplett statisch** und sind unabhängig vom Backend. Der
**dynamische Katalog + Premium** brauchen ein deploytes `tds-core-panel-api`.

---

## 0. Voraussetzungen (einmalig)

- **Node 22** und **npm**, **PHP 8.3** + **Composer** (nur fürs Backend).
- **GitHub PAT (classic)** mit `read:packages`, `write:packages`,
  `delete:packages`, `repo`, `workflow` — für die Org `Tracht-Digital-Solutions`
  **SSO-autorisiert**. Die `@tracht-digital-solutions/*`-Pakete liegen auf GitHub
  Packages, nicht auf npmjs.
- **In GitHub** ist der PAT als Repo-/Org-Secret **`PACKAGE_TOKEN`** hinterlegt
  (bereits erledigt). In allen neuen Repos speist `PACKAGE_TOKEN` die CI-Variable
  `NPM_TOKEN`.
- **Lokal** braucht `npm install` denselben Token. Entweder global in
  `~/.npmrc`:
  ```
  @tracht-digital-solutions:registry=https://npm.pkg.github.com
  //npm.pkg.github.com/:_authToken=DEIN_PAT
  ```
  …oder die Umgebungsvariable setzen, die die committete `.npmrc` referenziert:
  ```bash
  export NPM_TOKEN=DEIN_PAT      # PowerShell: $env:NPM_TOKEN="DEIN_PAT"
  ```

---

## 1. Lokal entwickeln

### Tool-Paket / Contract

```bash
cd tds-tool-qr           # oder tds-tools-contract, tds-tool-textkit, …
npm install --no-package-lock
npm run type-check
npm run build
# nur im Contract zusätzlich:
npm run test:run
```

### Die Website (`tds-tools`)

Normalfall (alle Pakete sind veröffentlicht — Token in `~/.npmrc`/`NPM_TOKEN`):

```bash
cd tds-tools
npm install --no-package-lock
npm run dev            # http://localhost:4321
npm run build          # → dist/ (das Deploy-Artefakt)
npm run preview
npm run type-check     # astro check — muss 0 Fehler sein (Korrektheits-Gate)
```

**Gegen NOCH-nicht-veröffentlichte lokale Änderungen** an Contract/Paketen
bauen (die Geschwister-Repos liegen daneben):

```bash
cd tds-tools
npm install ../tds-shared ../tds-tools-contract \
  ../tds-tool-qr ../tds-tool-textkit ../tds-tool-devkit ../tds-tool-media \
  qrcode pdf-lib --no-save --no-package-lock --install-links
npm run build
```

> `--install-links` kopiert die Pakete als echte Ordner rein — **wichtig**, weil
> Tailwinds `@source` einen Symlink NICHT scannt. Die veröffentlichten `^`-Ranges
> in `package.json` NICHT ändern/committen.

**Environment-Variablen der Website:**

| Variable | Zweck | Default |
|---|---|---|
| `CATALOG_API_URL` | Backend-Basis für den Katalog-Fetch (Build-Zeit) | `https://api.tracht-digital.de` |
| `PUBLIC_DEMO_MODE` | `true` → statischer Fallback-Katalog, Werbung aus | – |
| `PUBLIC_API_URL` | Panel-API für den Client-Gate (Entitlement/Checkout/`/me`) | `https://api.tracht-digital.de` |
| `PUBLIC_LOGIN_URL` | Login-Ziel des Premium-/Login-Gates | `https://app.tracht-digital.de/login` |
| `TOOLS_REGISTRY_TOKEN` | Token für den Build-Zeit-Registry-Sync (nur Release) | – |

### Das Backend (`tds-ext-tools`)

```bash
cd tds-ext-tools
composer install       # löst tds-panel-contract online über die VCS-URL auf
composer test          # phpunit (DB-Tests werden ohne TDS_TEST_DB_DSN übersprungen)
npm install --no-package-lock && npm run type-check && npm run build   # FE-Manifest
```

- **DB-Tests** laufen gegen echtes MariaDB/MySQL. Wegwerf-DB:
  ```bash
  docker run --rm -d --name tds-maria -e MARIADB_ROOT_PASSWORD=dev \
    -e MARIADB_DATABASE=tds_tools -p 3306:3306 mariadb:11
  export TDS_TEST_DB_DSN="mysql:host=127.0.0.1;dbname=tds_tools" \
         TDS_TEST_DB_USER=root TDS_TEST_DB_PASS=dev
  composer test
  ```
- **Offline / lokale Contract-Änderung:** temporäres Composer-`path`-Repo statt der
  VCS-URL nutzen — NIE committen (CI FATALt auf ein fehlendes `path`-Geschwister):
  ```bash
  node -e "const j=require('./composer.json');j.repositories=[{type:'path',url:'../tds-panel-contract',options:{symlink:false}},...j.repositories];require('fs').writeFileSync('composer.local.json',JSON.stringify(j,null,2))"
  COMPOSER=composer.local.json composer install
  rm composer.local.json composer.local.lock   # danach wieder aufräumen
  ```

---

## 2. Veröffentlichen (Release → GitHub Packages `@latest`)

Jedes SDK-/Paket-/Extension-Repo hat einen manuellen **Release**-Button
(`workflow_dispatch → Release …`). Er bumpt die Version, baut, publisht `@latest`
und pusht das Git-Tag (bei `tds-ext-tools` auch der Composer-Release-Ref).

**Reihenfolge einhalten** (Abhängigkeiten):

1. `tds-tools-contract`
2. dann `tds-tool-qr`, `-textkit`, `-devkit`, `-media` (parallel möglich)
3. dann `tds-ext-tools` (hängt nur an `tds-panel-contract`, unabhängig vom Contract)

Über die UI: Repo → **Actions** → **Release …** → *Run workflow* (Bump wählen).
Oder per CLI:

```bash
gh workflow run release.yml -R Tracht-Digital-Solutions/tds-tools-contract -f bump=patch
# warten bis fertig …
gh run watch $(gh run list -R Tracht-Digital-Solutions/tds-tools-contract \
  --workflow release.yml -L1 --json databaseId -q '.[0].databaseId') \
  -R Tracht-Digital-Solutions/tds-tools-contract --exit-status
```

- **Push auf `main`** (ohne Release-Button) publisht automatisch eine
  Prerelease unter dem `@dev`-Tag — nützlich zum Testen, wird aber von `^`-Ranges
  nicht gezogen.
- **`bump`:** patch = Fixes, minor = additive Features, major = Breaking.
  **Tool-Pakete + Extension bleiben in der `0.1.x`-Linie** (die Site/das Panel
  pinnen `^0.1.x`); der Contract ist stabil bei `1.x`.

---

## 3. Website bereitstellen (Deploy)

Zwei-Branch-Modell wie bei Landingpage/Blog:

- **`dev`-Branch** — automatisch bei jedem Push auf `main` gebaut (Demo-Config,
  `PUBLIC_DEMO_MODE=true`). **Nicht** deployt; Bau-Gate + Staging-Artefakt.
- **`release`-Branch** — nur über den manuellen **Release**-Button gebaut
  (Prod-Config). Der Prod-Host zieht `release`; danach wird `DEPLOY_WEBHOOK_URL`
  gepingt.

**Go-live der kostenlosen Tools (reicht ohne Backend):**

1. In `tds-tools` das Repo-Secret **`DEPLOY_WEBHOOK_URL`** setzen (die Plesk-Git-
   Webhook-URL mit Token).
2. **Actions → Release → Run workflow** drücken → baut `release`, pingt den Webhook.
3. `tools.tracht-digital.de` auf den `release`-Branch zeigen lassen (Plesk).

Ab hier sind alle **freien Tools + AdSense** live. AdSense bleibt aus, bis eine
Publisher-ID im Panel gesetzt ist (siehe unten).

---

## 4. Im Admin-Panel konfigurieren

Sobald `tds-core-panel-api` deployt ist, im Panel unter **Einstellungen →
Tools / AdSense** (Namespace `tools`, DB-first + Env-Fallback):

| Feld | Wirkung |
|---|---|
| AdSense aktivieren + **Publisher-ID** (`ca-pub-…`) + Slots | schaltet die Consent-gated Werbung frei |
| **Rebuild-Repo** (`Tracht-Digital-Solutions/tds-tools`) + Workflow (`dev.yml`) + **Rebuild-Token** | löst nach Katalog-Änderungen einen Rebuild der Website aus |
| **Registry-Sync-Token** | muss identisch als `TOOLS_REGISTRY_TOKEN` in `tds-tools` gesetzt sein (Build-Zeit-Sync der Tool-Liste) |
| **Stripe Secret Key** + **Webhook Secret** + Währung + Success/Cancel-URL | Premium-Bezahlung (Checkout) |

Weiter unter **Tools** (die Verwaltungsseite): je Tool _sichtbar / Login-Pflicht /
Premium / Preis_. Jede Änderung löst automatisch einen Rebuild aus.

**Zusätzlich nötig:**
- Stripe-Webhook in Stripe auf `https://api.tracht-digital.de/tools/stripe-webhook`
  zeigen lassen (Event `checkout.session.completed`).
- `CORS_ALLOWED_ORIGINS` der Panel-Backends muss `https://tools.tracht-digital.de`
  enthalten (die Site ruft `/auth/me`, `/tools/entitlement`, `/tools/checkout`
  cross-origin mit Cookie auf).
- `SETTINGS_ENCRYPTION_KEY` für `tds-core-panel-api` (verschlüsselt die Secrets).

> **Abhängigkeit:** Der Registry-Sync, die Admin-Verwaltung und Premium
> funktionieren erst mit deploytem `tds-core-panel-api`. Bis dahin nutzt die Site
> ihren statischen Fallback-Katalog (alle Tools sichtbar, keine Werbung/Premium).

---

## 5. Ein neues Tool hinzufügen (die „Erweiterung")

Ein neues Tool = ein neues `tds-tool-*`-Paket, das die Website komponiert. Am
schnellsten ein bestehendes Paket als Vorlage klonen (z. B. `tds-tool-textkit` für
rein clientseitige Tools ohne Extra-Dependency).

**a) Repo anlegen & umbenennen**

Alle Vorkommen des alten Namens ersetzen:
- `package.json`: `name` (`@tracht-digital-solutions/tds-tool-<neu>`), `description`,
  `repository`, ggf. `dependencies` (z. B. eine Lib fürs Tool).
- `.github/workflows/_build.yml`: `package-name:` (1×).
- `src/index.ts`: das Manifest (siehe b).

**b) Manifest schreiben** (`src/index.ts`) — ein Paket darf mehrere Tools liefern:

```ts
import { defineToolPack, defineTool } from "@tracht-digital-solutions/tds-tools-contract";

export default defineToolPack({
  id: "mein-pack",                 // kebab-case, eindeutig
  name: "Mein Pack",
  version: "0.1.0",
  tools: [
    defineTool({
      id: "mein-tool",             // global eindeutig
      slug: "mein-tool",           // URL: /tools/mein-tool, global eindeutig
      name: "Mein Tool",
      category: "developer",       // content|developer|design|marketing|media|security|business|other
      description: "Kurzbeschreibung fürs Katalog-Kärtchen + Meta-Description.",
      icon: "braces",
      keywords: ["…"],
      component: "@tracht-digital-solutions/tds-tool-mein/tools/MeinTool.astro",
      // Defaults (überschreibbar im Admin-Panel):
      // requiresLoginDefault: true,
      // premiumDefault: true, priceCentsDefault: 500,
      seo: { title: "…", description: "…" },
    }),
  ],
});
```

**c) Tool bauen:** `tools/MeinTool.astro` (Shell) rendert eine React-Insel
`islands/MeinTool.tsx` mit `client:load`. Rein clientseitig (kein Backend nötig).
Styling über tds-shared-Tokens + Tailwind-Utilities.

**d) In die Website einbauen** (`tds-tools`) — die einzige Kompositions-Entscheidung:

```js
// astro.config.mjs
import mein from "@tracht-digital-solutions/tds-tool-mein";
const packs = [qr, textkit, devkit, media, mein];   // hinzufügen
```
```jsonc
// package.json → dependencies
"@tracht-digital-solutions/tds-tool-mein": "^0.1.0",
```
```css
/* src/styles/global.css — NACH den @imports, damit Tailwind die Utility-Klassen
   der Insel scannt (sonst fehlen flex/grid/gap etc. im Build) */
@source "../../node_modules/@tracht-digital-solutions/tds-tool-mein/**/*.{astro,tsx}";
```

**e) Veröffentlichen & ausrollen:** neues Paket **Release** drücken → dann
`tds-tools` neu bauen (Push/Release oder Rebuild-Button im Panel). Das Tool
erscheint automatisch im Katalog; nach dem nächsten Build synct es sich (mit
`TOOLS_REGISTRY_TOKEN`) in die Admin-Verwaltung.

**Wichtige Regeln:**
- Tool-`id` UND `slug` sind **global eindeutig** über alle Pakete — `composeToolPacks`
  bricht den Build bei Kollision hart ab.
- `component` ist ein **Paket-Subpfad** (über `exports`), nie ein relativer Pfad.
- Version bleibt in der `0.1.x`-Linie.
- Nach jeder Änderung: `AGENTS.md`/`README.md` aktualisieren + Version bumpen.

---

## 6. Wie Premium & Login funktionieren (Betrieb)

- Ein Tool mit **Login-Pflicht** oder **Premium** rendert hinter dem
  `ToolGate` (Insel): Der Tool-Inhalt ist verborgen, bis der Gate die geteilte
  Session prüft (`/auth/me`, Cross-Subdomain-Cookie `.tracht-digital.de`) und —
  bei Premium — das Entitlement (`/tools/entitlement`).
- **Kauf:** eingeloggt + nicht freigeschaltet → „Freischalten" → `POST /tools/checkout`
  → Stripe-Checkout → nach Zahlung setzt der signierte Webhook
  (`checkout.session.completed`) das Entitlement (an die `app_user_id` gebunden).
- **Premium-Seiten blenden Werbung aus.** Freie Tools bleiben anonym nutzbar.
- Hinweis: Premium-Tools laufen clientseitig — der Gate ist ein
  Komfort-/Paywall-Mechanismus, kein DRM.

---

## 7. Panel-Extension hinzufügen (allgemein, zur Einordnung)

Das obige `tds-ext-tools` ist selbst eine **Panel-Extension**. Eine neue Panel-
Extension entsteht analog aus `tds-ext-template` (siehe dessen `README.md`):

1. Repo aus `tds-ext-template` klonen, umbenennen (id, Paketname, PHP-Namespace,
   Migration-Klassenpräfix).
2. Slots implementieren (nav / widgets / settings / routes / permissions / i18n)
   und den PHP-`Module` (Routen, Migrationen, Rechte).
3. Aktivieren: Manifest ins **Produkt** (`tds-admin-panel`/`tds-customer-panel`)
   `astro.config.mjs` `extensions[]` + `package.json` eintragen **und**
   `new DeinModule()` in `tds-core-panel-api`s `Modules::enabled()` + dort ein
   Composer-`path`-Repo ergänzen.
4. `PACKAGE_TOKEN` setzen, Release drücken, Produkt neu bauen.

Details: `tds-ext-template/README.md` + `tds-panel-contract/AGENTS.md`.

---

## Referenz

### Secrets (GitHub)
- **`PACKAGE_TOKEN`** — auf allen Plattform-Repos (Install aus Packages +
  Publish + Branch-Push). Speist die CI-Variable `NPM_TOKEN`.
- **`DEPLOY_WEBHOOK_URL`** — nur auf `tds-tools` (Deploy-Ping nach `release`).

### Wichtige Endpunkte (`tds-ext-tools`, über die Panel-API)
| Methode | Pfad | Auth |
|---|---|---|
| GET | `/tools/catalog` | öffentlich |
| POST | `/tools/registry` | Token (`registry_token`) |
| GET/PUT | `/admin/tools` · `/admin/tools/{id}` | `tools:manage` |
| POST | `/admin/tools/rebuild` | `tools:manage` |
| GET | `/tools/entitlement?tool=…` | Login |
| POST | `/tools/checkout` | Login |
| POST | `/tools/stripe-webhook` | Stripe-Signatur |

### Häufige Stolperfallen
- **`tds-tools` braucht `postcss.config.mjs`** — sonst läuft Tailwind gar nicht
  (der Build gelingt, aber die Seite ist unstyled).
- **`@source` je Tool-Paket** in `global.css`, NACH den `@imports`.
- **Fonts sind JS-Imports in `Layout.astro`**, keine CSS-`@import`s.
- **Lokal:** `--install-links` für unveröffentlichte Geschwister; committete
  `^`-Ranges nicht ändern.
- **CI-Auth:** `NPM_TOKEN` muss aus `PACKAGE_TOKEN` gespeist sein (die committete
  `.npmrc` referenziert `${NPM_TOKEN}`).
