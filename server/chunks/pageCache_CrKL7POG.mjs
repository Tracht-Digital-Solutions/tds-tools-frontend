import { n as cacheEvents, r as contentCache, t as alwaysPaths, v as pageCache, y as resolveCacheDirs } from "./cache_A9Uu_TgN.mjs";
import { i as connection } from "./connection_dnxqDzH_.mjs";
// src/lib/pageCache.ts
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
export { siteCache as t };
