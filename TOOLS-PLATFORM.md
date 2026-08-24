# TD Tools — Plattform-Handbuch (Installation, Betrieb, Erweiterung)

Praxis-Anleitung für die öffentliche Tools-Plattform `tools.tracht-digital.de`:
lokal entwickeln, veröffentlichen, ausrollen, im Admin-Frontend konfigurieren und
**neue Tools einbauen**. Für die Architektur-Details siehe `CLAUDE.md` und die
`AGENTS.md` im jeweiligen Repo.

---

## Überblick

Die Tools-Plattform ist eine **eigene öffentliche Static-Site** (wie Landingpage
und Blog) — NICHT Teil des noindex-Frontends. Sie wird **zur Build-Zeit** aus
Tool-Paketen zusammengesetzt.

| Repo | Typ | Rolle |
|---|---|---|
| `tds-tools-contract-pkg` | npm-SDK | `defineTool` / `defineToolPack` / `composeToolPacks` / `toolHost()` |
| `tds-tool-qr-pkg` `-textkit` `-devkit` `-media` `-pdf` `-office` | Tool-Pakete | je 1–n Tools (Manifest + `.astro`/`.tsx`); zusammen 14 Tools, davon 8 premium |
| `tds-tools-frontend` | Static-Site | die Website; komponiert die Pakete via `toolHost` |
| `tds-ext-tools-pkg` | Frontend-Extension | Admin-Verwaltung + Backend (Katalog, AdSense, Stripe-Premium) |

**Datenfluss:** Tool-Liste fließt _Pakete → Website → Backend_ (Build-Zeit-Sync),
Konfiguration fließt zurück (`GET /tools/catalog`). Die **kostenlosen Tools +
AdSense laufen komplett statisch** und sind unabhängig vom Backend. Der
**dynamische Katalog + Premium** brauchen ein deploytes `tds-core-frontend-api`.

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
cd tds-tool-qr-pkg           # oder tds-tools-contract-pkg, tds-tool-textkit-pkg, …
npm install --no-package-lock
npm run type-check
npm run build
# nur im Contract zusätzlich:
npm run test:run
```

### Die Website (`tds-tools-frontend`)

Normalfall (alle Pakete sind veröffentlicht — Token in `~/.npmrc`/`NPM_TOKEN`):

```bash
cd tds-tools-frontend
npm install --no-package-lock
npm run dev            # http://localhost:4321
npm run build          # → dist/ (das Deploy-Artefakt)
npm run preview
npm run type-check     # astro check — muss 0 Fehler sein (Korrektheits-Gate)
```

**Gegen NOCH-nicht-veröffentlichte lokale Änderungen** an Contract/Paketen
bauen (die Geschwister-Repos liegen daneben):

```bash
cd tds-tools-frontend
npm install ../tds-shared ../tds-tools-contract \
  ../tds-tool-qr ../tds-tool-textkit ../tds-tool-devkit ../tds-tool-media \
  ../tds-tool-pdf ../tds-tool-office \
  qrcode pdf-lib pdfjs-dist tesseract.js --no-save --no-package-lock --install-links
npm run build
```

> `--install-links` kopiert die Pakete als echte Ordner rein — **wichtig**, weil
> Tailwinds `@source` einen Symlink NICHT scannt. Die veröffentlichten `^`-Ranges
> in `package.json` NICHT ändern/committen.

**Environment-Variablen der Website.** Nur `PUBLIC_`-Präfixe wirken: Astro/Vite
legen ausschließlich diese auf `import.meta.env`, und dieses Repo deklariert kein
`envField`-Schema. `CATALOG_API_URL` und `TOOLS_REGISTRY_TOKEN` standen hier
jahrelang ohne Präfix — beide waren im Build immer `undefined`. Sie sind entfernt;
die Katalog-Basis ist jetzt eine Konstante in `src/lib/catalog.ts`.

| Variable | Zweck | Default |
|---|---|---|
| `PUBLIC_DEMO_MODE` | `true` → statischer Fallback-Katalog, Werbung aus | – |
| `PUBLIC_API_URL` | Frontend-API für den Client-Gate (Entitlement/Checkout/`/me`) | `https://api.tracht-digital.de` |
| `PUBLIC_LOGIN_URL` | Login-Ziel des Premium-/Login-Gates | `https://app.tracht-digital.de/login` |

### Das Backend (`tds-ext-tools-pkg`)

```bash
cd tds-ext-tools-pkg
composer install       # löst tds-frontend-contract-pkg online über die VCS-URL auf
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
  node -e "const j=require('./composer.json');j.repositories=[{type:'path',url:'../tds-frontend-contract',options:{symlink:false}},...j.repositories];require('fs').writeFileSync('composer.local.json',JSON.stringify(j,null,2))"
  COMPOSER=composer.local.json composer install
  rm composer.local.json composer.local.lock   # danach wieder aufräumen
  ```

---

## 2. Veröffentlichen (Auto-Release `@latest` bei jedem Push)

**Continuous Delivery:** Jeder Push auf `main` eines Paket-/SDK-/Extension-Repos
veröffentlicht automatisch eine neue **Patch-Version als `@latest`** (bumpt +
publisht + Git-Tag) und stößt danach einen **Rebuild+Deploy der abhängigen Seite**
an (Cross-Repo-`workflow_dispatch`):

- `tds-tools-contract-pkg` + `tds-tool-*` → Rebuild von **`tds-tools-frontend`**
- `tds-ext-tools-pkg` → Rebuild von **`tds-admin-frontend`**

Der Bump-Commit trägt `[skip ci]`, damit das automatische Zurückpushen keinen
zweiten Release auslöst (keine Endlosschleife). Bei `tds-ext-tools-pkg` wird zusätzlich
`composer.json` mitgebumpt (der Composer-Release-Ref = das Git-Tag).

**Minor/Major** über den manuellen Button: Repo → **Actions → „Release …" → Run
workflow** (Bump wählen). Oder per CLI:

```bash
gh workflow run release.yml -R Tracht-Digital-Solutions/tds-tools-contract-pkg -f bump=minor
```

- **Versionslinien:** Tool-Pakete + Extension bleiben in `0.1.x` (Site/Frontend pinnen
  `^0.1.x`); der Contract ist stabil bei `1.x`.
- **Reihenfolge** ist bei normalen Änderungen egal — der Cross-Repo-Dispatch baut die
  Seite nach jedem Package-Release neu. Nur bei einem **Breaking-Change des Contracts**
  erst den Contract, dann die Pakete releasen.
- **Doku-/Nicht-Release-Änderungen:** `[skip ci]` in die Commit-Message schreiben, dann
  läuft kein Auto-Release.

---

## 3. Website bereitstellen (Deploy bei jedem Push)

`tds-tools-frontend` deployt **bei jedem Push auf `main`** direkt auf den `release`-Branch
(Prod-Config `PUBLIC_DEMO_MODE=false`, Live-Katalog mit statischem Fallback) und
pingt danach `DEPLOY_WEBHOOK_URL`. Denselben Deploy lösen der manuelle Button und der
Cross-Repo-Dispatch aus einem Package-Release aus (Abschnitt 2). Einen separaten
`dev`-Branch gibt es nicht mehr.

> Laufen mehrere Package-Releases fast gleichzeitig, fasst GitHub die Site-Deploys per
> Concurrency zusammen (der letzte Build gewinnt und zieht alle neuen Versionen) —
> gewollt, kein Fehler.

**Go-live der kostenlosen Tools (reicht ohne Backend):**

1. In `tds-tools-frontend` das Repo-Secret **`DEPLOY_WEBHOOK_URL`** setzen (Plesk-Git-Webhook-URL).
2. `tools.tracht-digital.de` in Plesk auf den **`release`-Branch** zeigen lassen.
3. Fertig — ab jetzt geht jeder Push (bzw. jedes Package-Release) automatisch live.

Ab hier sind alle **freien Tools + AdSense** live. AdSense bleibt aus, bis eine
Publisher-ID im Frontend gesetzt ist (siehe unten).

**4. Optional, aber empfohlen: `https://tools.tracht-digital.de/install`.**
Jeder Build liefert einen Setup-Assistenten mit — eine Seite der Site, die
vollständig im Browser läuft (Quelle:
`@tracht-digital-solutions/tds-shared/install`). Auf dieser Domain ist PHP
abgeschaltet, deshalb schreibt der Assistent nichts selbst: er erzeugt die
`tds-runtime.json` zum Herunterladen und bestätigt danach, dass sie liegt.
Er meldet sich per Plattform-Admin-Login an, prüft `GET /tools/catalog` auf
echte Inhalte statt nur auf HTTP 200, fährt den CORS-Preflight für
`https://tools.tracht-digital.de`, schreibt `tds-runtime.json` (die Site liest
sie zur Laufzeit und zieht sie dem eingebackenen Wert vor) und richtet auf Wunsch
einen Same-Origin-Proxy unter `/api` ein, sodass `/auth/me`,
`/tools/entitlement` und `/tools/checkout` ganz ohne CORS auskommen.

Er übernimmt außerdem den **Registry-Sync** — und ist seit 2026-08-16 der einzige
Weg dafür. Der Sync gehörte in den Build, lief dort aber nie und konnte es nicht:
`src/lib/catalog.ts` synchronisierte nur bei gesetztem `TOOLS_REGISTRY_TOKEN`,
kein Workflow exportierte die Variable, und ohne `PUBLIC_`-Präfix hätte Vite sie
auch dann nicht durchgereicht. Der Katalog im Panel blieb leer, ohne dass etwas
rot wurde — der Sync ist bewusst fail-soft. Der tote Pfad ist aus `catalog.ts`
entfernt; die leere Tool-Verwaltung nennt jetzt beide Schritte statt "erscheinen
automatisch" zu versprechen. Im Assistenten wird das Token einmal
eingegeben, und der Katalog aus `dist/tools-catalog.json` geht an
`POST /tools/registry`. Es muss dem Wert unter *Einstellungen → Tools*
entsprechen.

Es gibt keine Sperre und keine Anmeldung mehr: die Seite schreibt nichts, und
ein Passwortformular auf einer öffentlichen Domain wäre eine Angriffsfläche ohne
Gegenwert. Der Registry-Sync selbst ist durch das Token geschützt, das die API
prüft.

---

## 4. Im Admin-Frontend konfigurieren

Sobald `tds-core-frontend-api` deployt ist, im Frontend unter **Einstellungen →
Tools / AdSense** (Namespace `tools`, DB-first + Env-Fallback):

| Feld | Wirkung |
|---|---|
| AdSense aktivieren + **Publisher-ID** (`ca-pub-…`) + Slots | schaltet die Consent-gated Werbung frei |
| **Rebuild-Repo** (`Tracht-Digital-Solutions/tds-tools-frontend`) + Workflow (`release.yml`) + **Rebuild-Token** | löst nach Katalog-Änderungen einen Rebuild der Website aus. **Nicht `dev.yml`** — dieser Workflow wurde am 2026-08-24 gelöscht, als der Deploy aufhörte, bei jedem Push zu laufen. Der Dispatch schlägt nie fehl, er lief nur ins Leere |
| **Seiten-Cache: Basis-URL + Token** | re-rendert einzelne Seiten, wenn Ratgeber-Texte gespeichert werden — Sekunden statt CI-Build. Ohne Token passiert nichts |
| **Registry-Sync-Token** | muss identisch im Setup-Assistenten der Website (`/install`) eingegeben werden — er überträgt die Tool-Liste. Ohne diesen Eintrag hier antwortet `POST /tools/registry` mit 503 |
| **Stripe Secret Key** + **Webhook Secret** + Währung + Success/Cancel-URL | Premium-Bezahlung (Checkout) |

Weiter unter **Tools** (die Verwaltungsseite): je Tool _sichtbar / Login-Pflicht /
Premium / Preis_. Jede Änderung löst automatisch einen Rebuild aus.

**Zusätzlich nötig:**
- Stripe-Webhook in Stripe auf `https://api.tracht-digital.de/tools/stripe-webhook`
  zeigen lassen (Event `checkout.session.completed`).
- `CORS_ALLOWED_ORIGINS` der Frontend-Backends muss `https://tools.tracht-digital.de`
  enthalten (die Site ruft `/auth/me`, `/tools/entitlement`, `/tools/checkout`
  cross-origin mit Cookie auf).
- `SETTINGS_ENCRYPTION_KEY` für `tds-core-frontend-api` (verschlüsselt die Secrets).

> **Abhängigkeit:** Der Registry-Sync, die Admin-Verwaltung und Premium
> funktionieren erst mit deploytem `tds-core-frontend-api`. Bis dahin nutzt die Site
> ihren statischen Fallback-Katalog (alle Tools sichtbar, keine Werbung/Premium).

---

## 5. Ein neues Tool hinzufügen (die „Erweiterung")

Ein neues Tool = ein neues `tds-tool-*`-Paket, das die Website komponiert. Am
schnellsten ein bestehendes Paket als Vorlage klonen (z. B. `tds-tool-textkit-pkg` für
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
      // Defaults (überschreibbar im Admin-Frontend):
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

**d) In die Website einbauen** (`tds-tools-frontend`) — die einzige Kompositions-Entscheidung:

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
`tds-tools-frontend` neu bauen (Push/Release oder Rebuild-Button im Frontend). Das Tool
erscheint damit auf der öffentlichen Website. **In die Admin-Verwaltung kommt es
erst durch den Registry-Sync** — einmal `/install` auf der Tools-Website fahren und
dort den Schritt *Tool-Katalog übertragen* ausführen. Der Build macht das nicht.

**Wichtige Regeln:**
- Tool-`id` UND `slug` sind **global eindeutig** über alle Pakete — `composeToolPacks`
  bricht den Build bei Kollision hart ab.
- `component` ist ein **Paket-Subpfad** (über `exports`), nie ein relativer Pfad.
- Version bleibt in der `0.1.x`-Linie.
- **Die `category` entscheidet, in welchem Abschnitt das Tool auf der Startseite
  landet** — sie ist Pflicht und stammt aus einer geschlossenen Union im Contract.
  Die Website rendert je Kategorie einen eigenen Abschnitt mit Überschrift und
  Werkzeug-Zähler; die Reihenfolge und die deutschen Labels stehen in
  `src/lib/site.ts` (`categoryOrder`, `categoryLabels`), leere Kategorien fallen
  raus. Eine **neue** Kategorie ist eine Drei-Zeilen-Änderung ohne Backend:
  Union in `tds-tools-contract-pkg/src/types.ts`, Label und Reihenfolge in
  `site.ts` (`site.test.ts` erzwingt, dass beide vollständig sind — eine Kategorie
  ohne Label rendert `undefined` als Überschrift, eine ohne Reihenfolge-Eintrag
  lässt ihren ganzen Abschnitt lautlos verschwinden). Die DB-Spalte
  `tools_config.category` ist nur eine denormalisierte Kopie fürs Admin-Frontend
  und nicht editierbar.
- **`icon` braucht einen Pfad in `src/components/Icon.astro`.** Fehlt er, rendert
  das Tool ein leeres Quadrat auf Kärtchen *und* Seitentitel — ohne Fehler, ohne
  Warnung (`paths[name] ?? …`). `site.test.ts` prüft das inzwischen für jedes
  komponierte Tool.
- Nach jeder Änderung: `AGENTS.md`/`README.md` aktualisieren + Version bumpen.

**f) Und drei Schritte, die diese Anleitung jahrelang verschwiegen hat.** Sie
stehen hier, weil je eine Testdatei ohne sie rot wird — die Schritte oben allein
ergeben also gar keinen grünen Build:

1. **Englische Fassung** in `src/lib/i18n.ts` → `toolCopyEn[slug]`
   (`name`, `description`, `seoTitle`). `i18n.test.ts` scheitert an einem
   komponierten Tool ohne Eintrag *und* an einem Eintrag ohne Tool.
2. **Ratgeber** unter `src/content/guides/<slug>.ts`, **deutsch UND englisch**,
   plus die Registrierung in `src/lib/guides.ts` (Schlüssel ist der **Slug**).
   `guides.test.ts` misst die Tiefe, nicht die Existenz: ≥ 300 Wörter, ≥ 2
   Intro-Absätze über 120 Zeichen, ≥ 4 Anwendungsfälle, ≥ 3 Schritte über 80
   Zeichen, ein Datenschutz-Absatz über 150 Zeichen, ≥ 3 FAQ mit `?` und
   Antworten über 80 Zeichen. Die englische Fassung braucht **strukturelle
   Parität** (gleiche Anzahl Schritte, FAQ und Anwendungsfälle, identisches
   `related`).
3. **Irgendein anderer Ratgeber muss auf den neuen Slug verlinken.**
   `guides.test.ts` verlangt, dass jeder Slug aus mindestens einem fremden
   `related` erreichbar ist — ein neues Tool, auf das niemand zeigt, lässt den
   Build fallen. Achtung: `related` steht in jeder Datei **zweimal** (`de` und
   `en`) und wird deep-equal verglichen, also immer beide ändern.

**Copy-Budgets, die gemessen und nicht begutachtet werden** — sie haben kein
sichtbares Fehlerbild, eine zu lange Description fehlt einfach im Suchergebnis:

| Feld | Grenze | Test |
|---|---|---|
| `description` bzw. `seo.description` (DE) | > 80 und ≤ 160, paarweise verschieden | `site.test.ts` |
| `toolCopyEn[].description` | > 80 und ≤ 160, verschieden, ≠ DE | `i18n.test.ts` |
| `seo.title` bzw. `${name} — TD Tools` | ≤ 60, verschieden, **nicht** markenführend | `seo.test.ts` |
| `toolCopyEn[].seoTitle` | ≤ 60, verschieden, nicht markenführend | `i18n.test.ts` |

**Was der Build nicht prüft und ein Browser sofort zeigt:** Schreiben Sie eine
Tailwind-Arbitrary-Value-Klasse (`rounded-[…]`) niemals als Beispiel in eine
Doku **innerhalb** eines Tool-Pakets. Die Site scannt das Paket nach
Utility-Klassen, extrahiert das Beispiel und erzeugt daraus eine ungültige
CSS-Regel — sichtbar nur als „Found 1 warning while optimizing generated CSS".

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

## 7. Frontend-Extension hinzufügen (allgemein, zur Einordnung)

Das obige `tds-ext-tools-pkg` ist selbst eine **Frontend-Extension**. Eine neue Frontend-
Extension entsteht analog aus `tds-ext-template-pkg` (siehe dessen `README.md`):

1. Repo aus `tds-ext-template-pkg` klonen, umbenennen (id, Paketname, PHP-Namespace,
   Migration-Klassenpräfix).
2. Slots implementieren (nav / widgets / settings / routes / permissions / i18n)
   und den PHP-`Module` (Routen, Migrationen, Rechte).
3. Aktivieren: Manifest ins **Produkt** (`tds-admin-frontend`/`tds-customer-frontend`)
   `astro.config.mjs` `extensions[]` + `package.json` eintragen **und**
   `new DeinModule()` in `tds-core-frontend-api`s `Modules::enabled()` + dort ein
   Composer-`path`-Repo ergänzen.
4. `PACKAGE_TOKEN` setzen, Release drücken, Produkt neu bauen.

Details: `tds-ext-template/README.md` + `tds-frontend-contract/AGENTS.md`.

---

## Referenz

### Secrets (GitHub)
- **`PACKAGE_TOKEN`** — auf allen Plattform-Repos (Install aus Packages +
  Publish + Branch-Push). Speist die CI-Variable `NPM_TOKEN`.
- **`DEPLOY_WEBHOOK_URL`** — nur auf `tds-tools-frontend` (Deploy-Ping nach `release`).

### Wichtige Endpunkte (`tds-ext-tools-pkg`, über die Frontend-API)
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
- **`tds-tools-frontend` braucht `postcss.config.mjs`** — sonst läuft Tailwind gar nicht
  (der Build gelingt, aber die Seite ist unstyled).
- **`@source` je Tool-Paket** in `global.css`, NACH den `@imports`.
- **Fonts sind JS-Imports in `Layout.astro`**, keine CSS-`@import`s.
- **Lokal:** `--install-links` für unveröffentlichte Geschwister; committete
  `^`-Ranges nicht ändern.
- **CI-Auth:** `NPM_TOKEN` muss aus `PACKAGE_TOKEN` gespeist sein (die committete
  `.npmrc` referenziert `${NPM_TOKEN}`).
