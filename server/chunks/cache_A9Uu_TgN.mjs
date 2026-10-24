import { existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, rmSync, symlinkSync, unlinkSync, writeFileSync } from "fs";
import { dirname, isAbsolute, join, resolve, sep } from "path";
import { createHash, timingSafeEqual } from "crypto";
import { mkdir, readFile, readdir, rename, rm, stat, writeFile } from "fs/promises";
// node_modules/@tracht-digital-solutions/tds-shared/dist/cache/index.js
var CACHE_LINK_NAME = "_tds-cache";
var BUILD_MARKER_NAME = ".build-id";
var BUILD_GATE_PREFIX = ".build-";
var isBuildRecord = (name) => name.startsWith(".build-") || name === BUILD_MARKER_NAME;
var DEFAULT_ASSETS_DIR = "_astro";
function resolveCacheDirs(options = {}) {
	const { root = process.cwd(), publicDir = "client", assetsDir = DEFAULT_ASSETS_DIR, logger = (m) => console.warn(m) } = options;
	const fromEnv = (name) => {
		const value = (process.env[name] ?? "").trim();
		if (value === "") return null;
		return isAbsolute(value) ? value : resolve(root, value);
	};
	const base = join(root, "var", "page-cache");
	const dir = fromEnv("TDS_CACHE_DIR") ?? join(base, "pages");
	const metaDir = fromEnv("TDS_CACHE_META_DIR") ?? join(base, "meta");
	try {
		mkdirSync(dir, { recursive: true });
		mkdirSync(metaDir, { recursive: true });
	} catch (err) {
		logger(`[tds-cache] could not create the cache directories: ${String(err)}`);
		return {
			dir,
			metaDir
		};
	}
	discardCacheOfOtherBuild(join(root, publicDir), assetsDir, dir, metaDir, logger);
	linkIntoDocumentRoot(join(root, publicDir), dir, logger);
	return {
		dir,
		metaDir
	};
}
function discardCacheOfOtherBuild(documentRoot, assetsDir, dir, metaDir, logger) {
	const fingerprint = buildFingerprint(join(documentRoot, assetsDir));
	if (!fingerprint) return;
	const marker = join(metaDir, BUILD_MARKER_NAME);
	let previous = null;
	try {
		previous = readFileSync(marker, "utf8").trim();
	} catch {
		previous = null;
	}
	if (previous === fingerprint) {
		writeBuildGate(dir, fingerprint, logger);
		return;
	}
	emptyContents(dir, logger);
	emptyContents(metaDir, logger);
	logger(`[tds-cache] cache discarded: it was filled by build ${previous ?? "unknown"}, this is ${fingerprint}`);
	try {
		writeFileSync(marker, `${fingerprint}
`);
	} catch (err) {
		logger(`[tds-cache] could not record the build marker: ${String(err)}`);
	}
	writeBuildGate(dir, fingerprint, logger);
}
function writeBuildGate(dir, fingerprint, logger) {
	try {
		writeFileSync(join(dir, `${BUILD_GATE_PREFIX}${fingerprint}`), "");
	} catch (err) {
		logger(`[tds-cache] could not write the build gate: ${String(err)}`);
	}
}
function buildFingerprint(assetsPath) {
	let names;
	try {
		names = readdirSync(assetsPath);
	} catch {
		return null;
	}
	if (names.length === 0) return null;
	return createHash("sha256").update(names.sort().join("\n")).digest("hex").slice(0, 16);
}
function emptyContents(dir, logger) {
	let items;
	try {
		items = readdirSync(dir);
	} catch {
		return;
	}
	for (const name of items) try {
		rmSync(join(dir, name), {
			recursive: true,
			force: true
		});
	} catch (err) {
		logger(`[tds-cache] could not remove ${join(dir, name)}: ${String(err)}`);
	}
}
function linkIntoDocumentRoot(documentRoot, target, logger) {
	if (!existsSync(documentRoot)) return;
	const link = join(documentRoot, CACHE_LINK_NAME);
	try {
		let entry = null;
		try {
			entry = lstatSync(link);
		} catch {
			entry = null;
		}
		if (entry) {
			if (!entry.isSymbolicLink()) return;
			if (existsSync(link)) return;
			unlinkSync(link);
		}
		symlinkSync(target, link, process.platform === "win32" ? "junction" : "dir");
	} catch (err) {
		logger(`[tds-cache] could not link ${link} -> ${target}: ${String(err)}`);
	}
}
var pad = (n) => String(n).padStart(2, "0");
var localDay = (date) => `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
var utcDay = (date) => `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}`;
var dailyGateName = (build, day) => `${BUILD_GATE_PREFIX}${build}-${day}`;
function ensureDailyGate(dir, metaDir, now = /* @__PURE__ */ new Date(), logger = (m) => console.warn(m)) {
	let build;
	try {
		build = readFileSync(join(metaDir, BUILD_MARKER_NAME), "utf8").trim();
	} catch {
		return false;
	}
	if (!build) return false;
	const local = dailyGateName(build, localDay(now));
	const utc = dailyGateName(build, utcDay(now));
	const hasLocal = existsSync(join(dir, local));
	if (hasLocal && existsSync(join(dir, utc))) return false;
	let flushed = false;
	if (!hasLocal) {
		const keep = /* @__PURE__ */ new Set([local, utc]);
		for (const [root, isPages] of [[dir, true], [metaDir, false]]) {
			let names = [];
			try {
				names = readdirSync(root);
			} catch {
				continue;
			}
			for (const name of names) {
				const datedGate = isPages && name.startsWith(`.build-${build}-`) && !keep.has(name);
				if (isBuildRecord(name) && !datedGate) continue;
				try {
					rmSync(join(root, name), {
						recursive: true,
						force: true
					});
				} catch (err) {
					logger(`[tds-cache] could not remove ${join(root, name)}: ${String(err)}`);
				}
			}
		}
		flushed = true;
		logger(`[tds-cache] new day ${localDay(now)}: cache emptied`);
	}
	for (const name of [local, utc]) try {
		writeFileSync(join(dir, name), "");
	} catch (err) {
		logger(`[tds-cache] could not write the day gate: ${String(err)}`);
	}
	return flushed;
}
var FORBIDDEN = /* @__PURE__ */ new Set([
	"/",
	"\\",
	":",
	"*",
	"?",
	"\"",
	"<",
	">",
	"|"
]);
function isSafeSegment(segment) {
	if (segment === "" || segment === "." || segment === "..") return false;
	if (segment.startsWith(".")) return false;
	for (const ch of segment) {
		if (FORBIDDEN.has(ch)) return false;
		const code = ch.codePointAt(0) ?? 0;
		if (code < 32 || code === 127) return false;
	}
	return true;
}
function hasExtension(segment) {
	const dot = segment.lastIndexOf(".");
	if (dot <= 0 || dot === segment.length - 1) return false;
	const ext = segment.slice(dot + 1);
	for (const ch of ext) if (!(ch >= "0" && ch <= "9") && !(ch >= "a" && ch <= "z") && !(ch >= "A" && ch <= "Z")) return false;
	return true;
}
function cacheLocation(pathname) {
	let decoded;
	try {
		decoded = decodeURIComponent(pathname);
	} catch {
		return null;
	}
	const segments = decoded.split("/").filter((s) => s !== "");
	if (!segments.every(isSafeSegment)) return null;
	if (segments.length === 0) return {
		file: "index.html",
		meta: "index.json",
		path: "/"
	};
	const joined = segments.join("/");
	const last = segments[segments.length - 1];
	return {
		file: hasExtension(last) ? joined : joined + "/index.html",
		meta: joined + ".json",
		path: "/" + joined
	};
}
function isCacheableMethod(method) {
	const m = method.toUpperCase();
	return m === "GET" || m === "HEAD";
}
var PageCacheStore = class {
	/**
	* @param dir      Where the served files go. In production this is what the
	*                 document root's `_tds-cache` symlink points at, so the web
	*                 server can answer a hit without waking Node.
	* @param metaDir  Where the sidecars go. Defaults to `<dir>/.meta` for local
	*                 use; production passes a directory OUTSIDE the web tree,
	*                 so nothing but rendered public HTML is ever reachable.
	*/
	constructor(dir, metaDir) {
		this.dir = dir;
		this.metaDir = metaDir ?? join(dir, ".meta");
	}
	dir;
	metaDir;
	/** Absolute path of a page file inside the cache directory. */
	abs(relative) {
		return join(this.dir, ...relative.split("/"));
	}
	/** Absolute path of a metadata sidecar. */
	absMeta(relative) {
		return join(this.metaDir, ...relative.split("/"));
	}
	/**
	* Read an entry, or `null` when there is none.
	*
	* Missing metadata is treated as a miss rather than a partially usable
	* entry: without the content type we would have to guess, and guessing
	* `text/html` for a cached `rss.xml` serves a feed the browser renders as a
	* broken page.
	*/
	async read(pathname) {
		const loc = cacheLocation(pathname);
		if (!loc) return null;
		try {
			const [body, metaRaw] = await Promise.all([readFile(this.abs(loc.file)), readFile(this.absMeta(loc.meta), "utf8")]);
			const meta = JSON.parse(metaRaw);
			if (typeof meta?.contentType !== "string") return null;
			return {
				body,
				meta
			};
		} catch {
			return null;
		}
	}
	/**
	* Write an entry atomically: a temporary file next to the target, then a
	* `rename` over it.
	*
	* The atomicity is the load-bearing part of "rebuild = render then swap".
	* A plain `writeFile` over a live entry leaves a window in which a visitor
	* reads a half-written document, and a truncated HTML page renders as a
	* blank white screen rather than as an error anyone would notice.
	*/
	async write(pathname, body, contentType) {
		const loc = cacheLocation(pathname);
		if (!loc) return null;
		const meta = {
			path: loc.path,
			contentType,
			renderedAt: (/* @__PURE__ */ new Date()).toISOString(),
			etag: "\"" + createHash("sha256").update(body).digest("hex").slice(0, 32) + "\""
		};
		await this.swap(this.abs(loc.file), body);
		await this.swap(this.absMeta(loc.meta), Buffer.from(JSON.stringify(meta), "utf8"));
		return meta;
	}
	async swap(target, body) {
		await mkdir(dirname(target), { recursive: true });
		const tmp = `${target}.${process.pid}.${Math.random().toString(36).slice(2, 10)}.tmp`;
		await writeFile(tmp, body);
		try {
			await rename(tmp, target);
		} catch (err) {
			await rm(tmp, { force: true });
			throw err;
		}
	}
	/** Remove one entry. Missing is success — purging twice is not an error. */
	async remove(pathname) {
		const loc = cacheLocation(pathname);
		if (!loc) return;
		await Promise.all([rm(this.abs(loc.file), { force: true }), rm(this.absMeta(loc.meta), { force: true })]);
	}
	/**
	* Empty both directories — their CONTENTS, never the directories themselves.
	*
	* Both, not just the pages: metadata left behind would make {@link list}
	* report entries that no longer exist, and a status screen that lies about
	* an empty cache is worse than none.
	*
	* And contents rather than the directory, because in production the pages
	* directory is reached through a symlink the document root owns. `rm -r` on
	* a symlink removes the LINK, so a "clear the cache" click would silently
	* disconnect the web server from the store until the next app restart
	* recreated it — every page a miss, no error anywhere, and nothing in the
	* cache directory to suggest why.
	*/
	async clear() {
		const empty = async (dir) => {
			let items;
			try {
				items = await readdir(dir);
			} catch {
				return;
			}
			await Promise.all(items.filter((name) => !isBuildRecord(name)).map((name) => rm(join(dir, name), {
				recursive: true,
				force: true
			})));
		};
		await Promise.all([empty(this.dir), empty(this.metaDir)]);
	}
	/**
	* Every entry currently stored, newest first.
	*
	* Derived from the metadata tree rather than the HTML tree, because the
	* metadata file names carry the request path directly and the HTML tree
	* would require re-deriving `/preise` from `preise/index.html`.
	*/
	async list() {
		const metaRoot = this.metaDir;
		const found = [];
		const walk = async (dir) => {
			let items;
			try {
				items = await readdir(dir, { withFileTypes: true });
			} catch {
				return;
			}
			for (const item of items) {
				const full = join(dir, item.name);
				if (item.isDirectory()) {
					await walk(full);
					continue;
				}
				if (!item.name.endsWith(".json")) continue;
				try {
					const meta = JSON.parse(await readFile(full, "utf8"));
					const body = await stat(this.abs(cacheLocation(meta.path)?.file ?? ""));
					found.push({
						path: meta.path,
						renderedAt: meta.renderedAt,
						bytes: body.size
					});
				} catch {}
			}
		};
		await walk(metaRoot);
		found.sort((a, b) => a.renderedAt < b.renderedAt ? 1 : -1);
		return found;
	}
	/** Where this store keeps its files — for the status endpoint and logs. */
	get directory() {
		return this.dir.endsWith(sep) ? this.dir.slice(0, -1) : this.dir;
	}
};
function tokenMatches(expected, given) {
	if (!expected || !given) return false;
	const a = createHash("sha256").update(expected).digest();
	const b = createHash("sha256").update(given).digest();
	return timingSafeEqual(a, b);
}
async function resolveEvents(map, events) {
	const paths = /* @__PURE__ */ new Set();
	const unknown = /* @__PURE__ */ new Set();
	for (const event of events) {
		const resolver = map[event.type];
		if (!resolver) {
			unknown.add(event.type);
			continue;
		}
		let resolved;
		try {
			resolved = await resolver(event);
		} catch {
			continue;
		}
		for (const path of resolved) if (typeof path === "string" && path.startsWith("/")) paths.add(path);
	}
	return {
		paths: [...paths].sort(),
		unknown: [...unknown].sort()
	};
}
function forLanguages(event, build) {
	if (event.lang === "de") return build("de");
	if (event.lang === "en") return build("en");
	return [...build("de"), ...build("en")];
}
function isStorable(contentType) {
	const t = contentType.toLowerCase();
	return t.includes("text/html") || t.includes("application/xml") || t.includes("text/xml") || t.includes("application/rss+xml") || t.includes("application/json") || t.includes("application/pdf") || t.includes("image/png");
}
function json(body, status = 200) {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			"content-type": "application/json; charset=utf-8",
			"cache-control": "no-store"
		}
	});
}
function pageCache(options) {
	const { dir, metaDir, events, token = process.env.TDS_CACHE_TOKEN ?? "", tokenProvider, enabled = true, onInvalidate, alwaysPaths = [], dailyRefresh = true, cacheKey, rebuildUrl, concurrency = 4, logger = (m) => console.warn(m) } = options;
	const store = new PageCacheStore(dir, metaDir);
	const REFRESH = "x-tds-cache-refresh";
	const currentToken = () => {
		try {
			return (tokenProvider?.() ?? token).trim();
		} catch {
			return token.trim();
		}
	};
	async function control(action, request, url) {
		const activeToken = currentToken();
		if (!activeToken) return json({ error: "cache_token_not_configured" }, 503);
		if (!tokenMatches(activeToken, request.headers.get("x-tds-cache-token") ?? request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? null)) return json({ error: "unauthorized" }, 401);
		if (action === "status" && request.method === "GET") {
			const entries = await store.list();
			return json({
				directory: store.directory,
				count: entries.length,
				newest: entries[0]?.renderedAt ?? null,
				oldest: entries[entries.length - 1]?.renderedAt ?? null,
				bytes: entries.reduce((sum, e) => sum + e.bytes, 0),
				entries: entries.slice(0, 500)
			});
		}
		if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405);
		let payload;
		try {
			payload = await request.json();
		} catch {
			return json({ error: "invalid_json" }, 400);
		}
		const resolved = await resolveEvents(events, payload.events ?? []);
		const explicit = (payload.paths ?? []).filter((p) => typeof p === "string" && p.startsWith("/"));
		if (action === "purge") {
			if (payload.all) {
				await store.clear();
				onInvalidate?.();
				return json({ purged: "all" });
			}
			const paths2 = [.../* @__PURE__ */ new Set([...resolved.paths, ...explicit])];
			await Promise.all(paths2.map((p) => store.remove(p)));
			onInvalidate?.();
			return json({
				purged: paths2,
				unknownEvents: resolved.unknown
			});
		}
		if (action !== "rebuild") return json({ error: "not_found" }, 404);
		let paths;
		if (payload.all) {
			const cached = (await store.list()).map((e) => e.path);
			paths = [.../* @__PURE__ */ new Set([...cached, ...alwaysPaths])].sort();
		} else paths = [.../* @__PURE__ */ new Set([...resolved.paths, ...explicit])];
		onInvalidate?.();
		const rebuilt = [];
		const skipped = [];
		const failed = [];
		const queue = [...paths];
		const worker = async () => {
			for (;;) {
				const path = queue.shift();
				if (path === void 0) return;
				try {
					const target = rebuildUrl ? rebuildUrl(path, url.origin) : new URL(path, url.origin).toString();
					const res = await fetch(target, { headers: { [REFRESH]: activeToken } });
					await res.arrayBuffer();
					if (!res.ok) failed.push({
						path,
						status: res.status
					});
					else if (res.headers.get("x-tds-cache") === "BYPASS") skipped.push(path);
					else rebuilt.push(path);
				} catch (err) {
					failed.push({
						path,
						status: String(err)
					});
				}
			}
		};
		await Promise.all(Array.from({ length: Math.max(1, concurrency) }, worker));
		return json({
			rebuilt: rebuilt.sort(),
			skipped: skipped.sort(),
			failed,
			unknownEvents: resolved.unknown
		});
	}
	async function middleware(context, next) {
		const { request, url } = context;
		if (context.isPrerendered) return next();
		if (!enabled || !isCacheableMethod(request.method)) return next();
		if (dailyRefresh && metaDir && ensureDailyGate(dir, metaDir, /* @__PURE__ */ new Date(), logger)) onInvalidate?.();
		const key = cacheKey ? cacheKey(context) : url.pathname;
		if (key === null) {
			const uncacheable = await next();
			const out = new Response(uncacheable.body, uncacheable);
			out.headers.set("x-tds-cache", "BYPASS");
			return out;
		}
		const activeToken = currentToken();
		const refreshing = activeToken !== "" && tokenMatches(activeToken, request.headers.get(REFRESH));
		if (!refreshing) {
			const hit = await store.read(key);
			if (hit) {
				if (request.headers.get("if-none-match") === hit.meta.etag) return new Response(null, {
					status: 304,
					headers: {
						etag: hit.meta.etag,
						"x-tds-cache": "HIT"
					}
				});
				return new Response(request.method === "HEAD" ? null : new Uint8Array(hit.body), {
					status: 200,
					headers: {
						"content-type": hit.meta.contentType,
						etag: hit.meta.etag,
						"x-tds-cache": "HIT",
						"cache-control": "public, max-age=0, must-revalidate"
					}
				});
			}
		}
		const response = await next();
		const contentType = response.headers.get("content-type") ?? "";
		if (!(request.method === "GET" && response.status === 200 && isStorable(contentType) && !response.headers.has("set-cookie") && !(response.headers.get("cache-control") ?? "").includes("no-store"))) {
			const out = new Response(response.body, response);
			out.headers.set("x-tds-cache", "BYPASS");
			return out;
		}
		const body = Buffer.from(await response.arrayBuffer());
		let etag;
		try {
			etag = (await store.write(key, body, contentType))?.etag;
		} catch (err) {
			logger(`[tds-cache] could not store ${key}: ${String(err)}`);
		}
		const headers = new Headers(response.headers);
		headers.set("x-tds-cache", refreshing ? "REFRESH" : "MISS");
		headers.set("cache-control", "public, max-age=0, must-revalidate");
		if (etag) headers.set("etag", etag);
		return new Response(new Uint8Array(body), {
			status: 200,
			headers
		});
	}
	return {
		middleware,
		control: async (action, request, url) => {
			try {
				return await control(action, request, url);
			} catch (err) {
				logger(`[tds-cache] control request failed: ${String(err)}`);
				return json({ error: "internal" }, 500);
			}
		}
	};
}
function createGenerationCache() {
	let entries = /* @__PURE__ */ new Map();
	let generation = 0;
	return {
		get(key, load) {
			const existing = entries.get(key);
			if (existing) return existing;
			const bornIn = generation;
			const pending = load().catch((err) => {
				if (generation === bornIn && entries.get(key) === pending) entries.delete(key);
				throw err;
			});
			entries.set(key, pending);
			return pending;
		},
		invalidate() {
			generation += 1;
			entries = /* @__PURE__ */ new Map();
		},
		get generation() {
			return generation;
		}
	};
}
// node_modules/@tracht-digital-solutions/tds-shared/dist/site/index.js
var SiteKeyRejectedError = class extends Error {
	status;
	constructor(status, url, label = "tds-site", reconnectHint = "") {
		super(`[${label}] Der gekoppelte API-Zugang wurde abgelehnt (HTTP ${status}) von ${url}.` + (reconnectHint ? ` ${reconnectHint}` : ""));
		this.name = "SiteKeyRejectedError";
		this.status = status;
	}
};
var COUNTER = "__tdsSiteKeyRejectionCount__";
function siteKeyRejectionCount() {
	return globalThis[COUNTER] ?? 0;
}
function countRejection() {
	const store = globalThis;
	store[COUNTER] = (store[COUNTER] ?? 0) + 1;
}
function createSiteKeyGuard(source, options) {
	return {
		currentSiteKey: () => source.siteKey(),
		siteKeyHeaders: () => source.siteKeyHeaders(),
		assertKeyAccepted(res, url) {
			if (source.siteKey() === "") return;
			if (res.status !== 401 && res.status !== 403) return;
			countRejection();
			throw new SiteKeyRejectedError(res.status, String(url), options.label, options.reconnectHint);
		}
	};
}
async function guardSiteKey(next) {
	const before = siteKeyRejectionCount();
	const response = await next();
	if (siteKeyRejectionCount() === before) return response;
	const guarded = new Response(response.body, response);
	guarded.headers.set("cache-control", "no-store");
	return guarded;
}
var ContentHttpError = class extends Error {
	status;
	constructor(status, url) {
		super(`HTTP ${status} from ${String(url)}`);
		this.name = "ContentHttpError";
		this.status = status;
	}
};
function createContentReader(guard) {
	return async function readContentJson(url, timeoutMs = 1e4) {
		const res = await fetch(url, {
			headers: guard.siteKeyHeaders(),
			signal: AbortSignal.timeout(timeoutMs)
		});
		guard.assertKeyAccepted(res, url);
		if (!res.ok) throw new ContentHttpError(res.status, url);
		return await res.json();
	};
}
async function memoisedOr(cache, key, load, fallback, warn = (message, err) => console.warn(message, err)) {
	try {
		return await cache.get(key, load);
	} catch (err) {
		warn(`${key} unavailable \u2014 using the fallback:`, err);
		return typeof fallback === "function" ? fallback() : fallback;
	}
}
function escapeXml(value) {
	return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function renderSectionedSitemapIndex(entries) {
	return "<?xml version=\"1.0\" encoding=\"UTF-8\"?><sitemapindex xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">" + entries.map((e) => `<sitemap><loc>${escapeXml(e.loc)}</loc>${e.lastmod ? `<lastmod>${escapeXml(e.lastmod)}</lastmod>` : ""}</sitemap>`).join("") + "</sitemapindex>";
}
function newestDay(dates) {
	let newest;
	for (const raw of dates) {
		const day = (raw ?? "").slice(0, 10);
		if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) continue;
		if (!newest || day > newest) newest = day;
	}
	return newest;
}
function serializeJsonLd(data) {
	return JSON.stringify(data).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}
function renderSitemapUrl(url) {
	const alternates = url.alternates ? `<xhtml:link rel="alternate" hreflang="de-DE" href="${escapeXml(url.alternates.de)}"/><xhtml:link rel="alternate" hreflang="en-GB" href="${escapeXml(url.alternates.en)}"/><xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(url.alternates.de)}"/>` : "";
	const image = url.image ? `<image:image><image:loc>${escapeXml(url.image.loc)}</image:loc><image:title>${escapeXml(url.image.title)}</image:title></image:image>` : "";
	return `<url><loc>${escapeXml(url.loc)}</loc>` + alternates + image + (url.lastmod ? `<lastmod>${escapeXml(url.lastmod)}</lastmod>` : "") + (url.changefreq ? `<changefreq>${escapeXml(url.changefreq)}</changefreq>` : "") + (url.priority !== void 0 ? `<priority>${url.priority.toFixed(1)}</priority>` : "") + "</url>";
}
function renderUrlset(urls) {
	return "<?xml version=\"1.0\" encoding=\"UTF-8\"?><urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:xhtml=\"http://www.w3.org/1999/xhtml\" xmlns:image=\"http://www.google.com/schemas/sitemap-image/1.1\">" + urls.map(renderSitemapUrl).join("") + "</urlset>";
}
function defineSitemapSections(sections) {
	const sectionPath = (section) => `/sitemap-${section}.xml`;
	return {
		sections,
		isSection: (value) => sections.includes(value ?? ""),
		sectionPath,
		paths: [
			"/sitemap-index.xml",
			"/sitemap-0.xml",
			...sections.map(sectionPath)
		]
	};
}
function canonicalPath(path) {
	const value = path.trim();
	if (value === "" || value === "/") return "/";
	return value.replace(/\/+$/, "") || "/";
}
function matchesPattern(path, pattern) {
	const value = pattern.trim();
	if (value === "") return false;
	if (value.endsWith("*")) {
		const prefix = value.slice(0, -1);
		return prefix === "" || canonicalPath(path).startsWith(prefix);
	}
	return canonicalPath(value) === canonicalPath(path);
}
function groupExcluded(paths, patterns) {
	return paths.some((path) => patterns.some((pattern) => matchesPattern(path, pattern)));
}
function createSitemapExclusions(o) {
	const group = o.hreflangGroup ?? ((path) => [canonicalPath(path)]);
	const load = async () => {
		const url = new URL(`${o.contentBase()}/sitemap-exclusions`);
		url.searchParams.set("site", o.siteId);
		const data = await o.read(url.toString());
		if (!Array.isArray(data?.paths)) return [];
		return data.paths.filter((p) => typeof p === "string" && p.trim() !== "");
	};
	const exclusionPatterns = () => o.disabled ? Promise.resolve([]) : o.memo("sitemap:exclusions", load, [], "sitemap exclusions (nothing excluded)");
	const isExcluded = async (path) => {
		const patterns = await exclusionPatterns();
		return patterns.length > 0 && groupExcluded(group(path), patterns);
	};
	return {
		exclusionPatterns,
		isExcluded
	};
}
function createImageCatalog(raw, { origin, about = "webpage" }) {
	const assets = Object.values(raw);
	const imageInfo = (src) => {
		if (!src) return void 0;
		try {
			const url = new URL(src, origin);
			if (url.origin !== origin) return void 0;
			return assets.find((a) => a.src === url.pathname || a.variants.some((v) => v.src === url.pathname));
		} catch {
			return;
		}
	};
	const imageHints = (src, lang, sizes = "100vw") => {
		const image = imageInfo(src);
		if (!image) return void 0;
		return {
			alt: image.alt[lang],
			width: image.width,
			height: image.height,
			srcSet: image.variants.map((v) => `${v.src}?v=${v.hash} ${v.width}w`).join(", "),
			sizes,
			decoding: "async"
		};
	};
	const imageObject = (src, lang, pageUrl) => {
		const image = imageInfo(src);
		if (!image) return null;
		return {
			"@type": "ImageObject",
			"@id": pageUrl + "#editorial-image",
			contentUrl: origin + image.src,
			url: origin + image.src,
			caption: image.alt[lang],
			width: image.width,
			height: image.height,
			encodingFormat: "image/webp",
			digitalSourceType: image.digitalSourceType,
			creditText: "Tracht Digital Solutions",
			about: { "@id": about === "webpage" ? pageUrl + "#webpage" : pageUrl }
		};
	};
	return {
		imageInfo,
		imageHints,
		imageObject
	};
}
// src/lib/sitemapSections.ts
/**
* The sections of the sitemap (2026-10-06): the catalogue pages and the tool
* pages, one child sitemap each, listed by `/sitemap-index.xml` with each
* child's own newest date. A crawler re-reads only the section that moved, and
* Search Console reports coverage per section.
*
* No imports — `cache.ts` needs the paths without the catalog readers.
*/
var sections = defineSitemapSections(["pages", "tools"]);
var SITEMAP_SECTIONS = sections.sections;
var isSitemapSection = sections.isSection;
/** `/sitemap-tools.xml` etc. */
var sectionPath = sections.sectionPath;
/** Every sitemap document the page cache rebuilds: index, legacy `sitemap-0.xml`, each section. */
var SITEMAP_PATHS = sections.paths;
// src/lib/cache.ts
/**
* This site's half of the page cache: which pages a content change dates, and
* the memo that a rebuild throws away.
*
* The API sends *what changed* (`{type:"tool", id:"qr-code", lang:"de"}`); this
* file answers *which of my pages that is*. Unlike the blog, this site's two
* language trees DO mirror by prefix — same slugs at `/tools/x` and
* `/en/tools/x` — which is what lets the sitemap emit alternates for every
* page rather than only for articles.
*/
/**
* The one memo every content fetch on this site shares.
*
* It replaces the module-level promise `catalog.ts` used to keep. That was
* right while this site was a static build — one process, one fetch, then exit
* — and becomes *permanent* under SSR: switching a tool off in the panel would
* never reach a visitor, however often the cache was rebuilt, and nothing
* would log.
*/
var contentCache = createGenerationCache();
/** Language-tree prefix. German lives at the root. */
var prefix = (lang) => lang === "de" ? "" : "/en";
/**
* The catalog pages plus the sitemap — everything a tool appears on.
*
* Not `/tools-catalog.json`: it is PRERENDERED from the composed packages, a
* build-time constant, so a rebuild has nothing to re-render there and listing
* it only produced a failed entry on every tool event.
*/
function catalogPages(lang) {
	return [`${prefix(lang)}/`, ...SITEMAP_PATHS];
}
/**
* The route table, as the cache sees it.
*
* A tool event without an id means "the catalog changed" — a tool switched on
* or off, reordered, or made premium. That changes the listing but not any
* other tool's page, so only the catalog is rebuilt.
*/
var cacheEvents = {
	/** A tool's copy, guide or catalog flags changed. */
	tool: (event) => {
		const slug = event.id;
		return forLanguages(event, (lang) => {
			const pages = catalogPages(lang);
			return slug ? [`${prefix(lang)}/tools/${slug}`, ...pages] : pages;
		});
	},
	/** AdSense or another global switch changed — it appears on every page. */
	catalog: (event) => forLanguages(event, catalogPages),
	/**
	* The sitemap exclusion list changed.
	*
	* The widest event this site has, and it has to be. The list moves TWO
	* things: the sitemap, and the `robots` meta of every page that entered or
	* left it. Rebuilding only the sitemap would leave the excluded page itself
	* serving its old, indexable head out of cache — the omission visible in the
	* XML, the `noindex` nowhere, and nothing red.
	*
	* The tool pages come from the live catalog rather than `alwaysPaths`, where
	* a hand-kept copy would drift the first time a pack is added. The import is
	* dynamic on purpose: `catalog.ts` reads `contentCache` from this module, so
	* a static import would close the cycle at module-init time. A resolver runs
	* per request, long after both modules exist.
	*/
	sitemap: async (event) => {
		const { enabledTools } = await import("./catalog_CeEEGYwE.mjs").then((n) => n.n);
		let slugs = [];
		try {
			slugs = (await enabledTools()).map((tool) => tool.slug);
		} catch {}
		return forLanguages(event, (lang) => [...catalogPages(lang), ...slugs.map((slug) => `${prefix(lang)}/tools/${slug}`)]);
	},
	/** These belong to the sibling sites; saying so keeps a typo visible. */
	post: () => [],
	block: () => [],
	legal: () => []
};
/**
* Pages a "rebuild everything" must include even when nothing is cached yet.
*
* The individual tool pages are absent on purpose: the composed catalog is
* known to the build, not to this list, and enumerating it here would be a
* second copy that drifts the first time a pack is added. A rebuild covers
* whatever is already cached plus these entry points.
*/
var alwaysPaths = [
	"/",
	"/en/",
	...SITEMAP_PATHS
];
export { serializeJsonLd as _, isSitemapSection as a, createImageCatalog as c, groupExcluded as d, guardSiteKey as f, renderUrlset as g, renderSectionedSitemapIndex as h, SITEMAP_SECTIONS as i, createSiteKeyGuard as l, newestDay as m, cacheEvents as n, sectionPath as o, memoisedOr as p, contentCache as r, createContentReader as s, alwaysPaths as t, createSitemapExclusions as u, pageCache as v, resolveCacheDirs as y };
