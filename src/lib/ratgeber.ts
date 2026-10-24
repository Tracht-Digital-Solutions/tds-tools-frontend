/**
 * The Ratgeber article of a tool (`blog_slug`, chosen per tool in the panel).
 *
 * Every tool page points at the Ratgeber: with the blog CMS composed in the
 * API it SHOWS the assigned article (`/content/blog/{slug}`), without it — or
 * when the article is missing in this language — it links to the article on
 * the blog, and a tool without an assignment links to the Ratgeber itself.
 *
 * Read without the site key; see `publicFetch.ts` for why.
 */
import { apiBase } from "./connection";
import { memoisedOr } from "./contentFetch";
import { PublicHttpError, readPublicJson } from "./publicFetch";
import { links } from "./site";
import type { Lang } from "./seo";

export interface RatgeberArticle {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  url: string;
  readingMinutes: number | null;
}

const DEMO_MODE = import.meta.env.PUBLIC_DEMO_MODE === "true";
const SLUG = /^[a-z0-9](?:[a-z0-9-]{0,158}[a-z0-9])?$/;

/** The article on the blog: German at the root, English under `/en/`. */
export function ratgeberUrl(slug: string | null, lang: Lang): string {
  const root = lang === "en" ? `${links.blog}/en` : links.blog;
  return slug && SLUG.test(slug) ? `${root}/${slug}` : `${root}/`;
}

interface PostResponse {
  post?: { slug?: unknown; title?: unknown; excerpt?: unknown; body?: unknown; readingMinutes?: unknown };
}

/** Normalise one post; null when it lacks a title or a body. */
export function parseArticle(data: PostResponse, slug: string, lang: Lang): RatgeberArticle | null {
  const p = data.post;
  if (!p || typeof p.title !== "string" || p.title.trim() === "" || typeof p.body !== "string" || p.body.trim() === "") {
    return null;
  }
  return {
    slug,
    title: p.title.trim(),
    excerpt: typeof p.excerpt === "string" ? p.excerpt.trim() : "",
    body: p.body,
    url: ratgeberUrl(slug, lang),
    readingMinutes: typeof p.readingMinutes === "number" ? p.readingMinutes : null,
  };
}

/**
 * The article, or null: no slug, no blog CMS, not published in this language,
 * or the API unreachable. A 404 is an answer (remembered), anything else a
 * failure the cache does not keep.
 */
export function ratgeberArticle(slug: string | null, lang: Lang): Promise<RatgeberArticle | null> {
  if (DEMO_MODE || !slug || !SLUG.test(slug)) return Promise.resolve(null);
  return memoisedOr(
    `tools:ratgeber:${lang}:${slug}`,
    async () => {
      try {
        const data = await readPublicJson<PostResponse>(`${apiBase()}/content/blog/${slug}?lang=${lang}`);
        return parseArticle(data, slug, lang);
      } catch (err) {
        if (err instanceof PublicHttpError && err.status === 404) return null;
        throw err;
      }
    },
    () => null,
    `Ratgeber article "${slug}" (linked instead)`,
  );
}
