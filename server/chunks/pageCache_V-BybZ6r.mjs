import { c as resolveCacheDirs, n as cacheEvents, r as contentCache, s as pageCache, t as alwaysPaths } from "./cache_CTk_g6Zd.mjs";
import { i as connection } from "./connection_C3l7lc1a.mjs";
//#region src/lib/pageCache.ts
/**
* The one page-cache instance this site uses.
*
* Both halves must share it — the middleware that stores renders and the
* control endpoint that triggers them read the same store, the same token and
* the same event map.
*/
var siteCache = pageCache({
	...resolveCacheDirs({ logger: (m) => console.warn(`[tds-tools] ${m}`) }),
	events: cacheEvents,
	alwaysPaths,
	tokenProvider: () => connection.cacheToken(),
	onInvalidate: () => contentCache.invalidate(),
	logger: (message) => console.warn(`[tds-tools] ${message}`)
});
//#endregion
export { siteCache as t };
