/**
 * A read of a PUBLIC API route, deliberately without the site key.
 *
 * Two routes this site renders from are public and must not carry the key:
 *
 *  - `/tools/tiers` — prices are public, and a key paired before the route
 *    existed does not allow it; a refused key would also count as a rejection
 *    and keep the page out of the cache (`src/middleware.ts`).
 *  - `/content/blog/{slug}` — the blog CMS resolves WHICH blog from the key.
 *    This site's key is a tools key with no blog binding, so with it the CMS
 *    answers "no blog" for every article. Without a key it serves the default
 *    blog, which is the Ratgeber.
 */
export class PublicHttpError extends Error {
  constructor(public readonly status: number, url: string) {
    super(`HTTP ${status} for ${url}`);
  }
}

export async function readPublicJson<T>(url: string, timeoutMs = 8000): Promise<T> {
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!res.ok) throw new PublicHttpError(res.status, url);
  return (await res.json()) as T;
}
