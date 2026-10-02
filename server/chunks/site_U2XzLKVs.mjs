//#region node_modules/@tracht-digital-solutions/tds-shared/dist/site/index.js
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
function serializeJsonLd(data) {
	return JSON.stringify(data).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}
//#endregion
export { memoisedOr as a, guardSiteKey as i, createSiteKeyGuard as n, serializeJsonLd as o, escapeXml as r, createContentReader as t };
