import { i as connection } from "./connection_jGVRvpuo.mjs";
//#region src/lib/siteKey.ts
/**
* Request-time protection for paired API reads.
*
* The private key is loaded dynamically from the server-side connection file.
* `connection.ts` retains `TDS_SITE_KEY` only as a one-release host fallback;
* builds and GitHub workflows no longer receive it.
*/
function currentSiteKey() {
	return connection.siteKey();
}
var SiteKeyRejectedError = class extends Error {
	status;
	constructor(status, url) {
		super(`[tds-tools] Der gekoppelte API-Zugang wurde abgelehnt (HTTP ${status}) von ${url}. Bitte Tools in den Tools-Einstellungen neu verbinden.`);
		this.name = "SiteKeyRejectedError";
		this.status = status;
	}
};
var BUCKET = "__tdsSiteKeyRejections__";
var siteKeyRejections = globalThis[BUCKET] ??= [];
var COUNTER = "__tdsSiteKeyRejectionCount__";
function siteKeyRejectionCount() {
	return globalThis[COUNTER] ?? 0;
}
function siteKeyHeaders() {
	return connection.siteKeyHeaders();
}
function assertKeyAccepted(res, url) {
	if (currentSiteKey() === "") return;
	if (res.status !== 401 && res.status !== 403) return;
	const where = String(url);
	if (!siteKeyRejections.includes(where)) siteKeyRejections.push(where);
	const store = globalThis;
	store[COUNTER] = (store[COUNTER] ?? 0) + 1;
	throw new SiteKeyRejectedError(res.status, where);
}
//#endregion
export { siteKeyHeaders as n, siteKeyRejectionCount as r, assertKeyAccepted as t };
