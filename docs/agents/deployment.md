# Deployment and host

## Workflows

- `ci.yml` is the PR gate; `_build.yml` runs type-check, `lint:primitives`, `test:run` and build.
- **Deploy: `release.yml` only, on manual dispatch** → orphan `release` branch + `DEPLOY_WEBHOOK_URL`.
- **There is no `dev.yml`.** The release tree is a Node application; deploying onto a host still configured for
  static serving takes the site down, so a deploy must never be a side effect of a push to `main`.
- **Caveat:** every `tds-tool-*` pack's auto-release (on each push to its `main`) runs
  `gh workflow run release.yml` against this repo, i.e. a **production deploy** of this site. A docs-only
  pack commit avoids it with `[skip ci]`. (`tds-ext-tools-pkg` dispatches the admin product's `dev.yml`
  instead, a build only.)

## Install

- `npm install --no-package-lock`; the lockfile is gitignored (a Windows lockfile doesn't resolve on Linux).
- tds-shared is a 0.x caret (minor-locked): every shared minor needs an explicit repin. Validate it from a fresh
  install; an incrementally grown `node_modules` can keep an older surface or cache implementation alive.
- For local pack work use `--install-links` (Tailwind won't `@source`-scan a symlink) and keep the published
  `^` ranges committed.

## `.htaccess`

**Only `Options -Indexes`.** Plesk's restricted `AllowOverride Options=…` omits `FollowSymLinks`, and a
disallowed option is fatal: Apache answers every request with 500 (`Option FollowSymLinks not allowed here`).
Per-directory rewriting works with the vhost's own grant, and the `_tds-cache` symlink satisfies
SymLinksIfOwnerMatch. If a cache hit ever answers 403, grant it at the **vhost** level in Plesk's *Additional
Apache directives*. `.htaccess` also compresses responses.

## Host environment

Set **`TDS_SITE_KEY`** in the Plesk Node application's environment (see
[architecture.md](architecture.md#site-key-tds_site_key)); CI only sets it for the build step.

## `/install`

The site ships the shared setup wizard at `/install` and a `tds-runtime.json` route; `/tds/*` handles site
pairing. The registry transfer (`/install` posting `dist/tools-catalog.json` with the site key or legacy token) is
described in `tds-ext-tools-pkg/docs/agents/site-integration.md`.
