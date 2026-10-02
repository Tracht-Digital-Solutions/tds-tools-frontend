import { contentCache } from "./cache";
import { assertKeyAccepted, siteKeyHeaders } from "./siteKey";

/**
 * One read against the API: site-key headers, a timeout, the key check, and a
 * THROW on any non-2xx — so the caller decides, in one place, what a failure
 * renders as.
 */
export async function readContentJson<T>(url: string | URL, timeoutMs = 10_000): Promise<T> {
  // A HANGING api host (not refusing, not erroring) would otherwise hold a
  // render open until the job timeout.
  const res = await fetch(url, { headers: siteKeyHeaders(), signal: AbortSignal.timeout(timeoutMs) });
  assertKeyAccepted(res, url);
  if (!res.ok) throw new Error(`HTTP ${res.status} from ${String(url)}`);
  return (await res.json()) as T;
}

/**
 * Memoise a SUCCESSFUL read for the render generation; answer `fallback` on a
 * failed one without remembering it.
 *
 * The loaders used to catch inside the memo. The memo only evicts a rejection,
 * so one timeout pinned the manifest defaults (and "ads off") for the whole
 * generation, and a rejected site key was counted on the first render only —
 * the middleware then stored every later fallback page as a good one.
 */
export async function memoisedOr<T>(key: string, load: () => Promise<T>, fallback: () => T, label: string): Promise<T> {
  try {
    return await contentCache.get(key, load);
  } catch (err) {
    console.warn(`[tds-tools] ${label} unavailable — using the fallback:`, err);
    return fallback();
  }
}
