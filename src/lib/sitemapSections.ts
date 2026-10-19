/**
 * The sections of the sitemap (2026-10-06): the catalogue pages and the tool
 * pages, one child sitemap each, listed by `/sitemap-index.xml` with each
 * child's own newest date. A crawler re-reads only the section that moved, and
 * Search Console reports coverage per section.
 *
 * No imports — `cache.ts` needs the paths without the catalog readers.
 */
import { defineSitemapSections } from "@tracht-digital-solutions/tds-shared/site";

const sections = defineSitemapSections(["pages", "tools"] as const);

export const SITEMAP_SECTIONS = sections.sections;
export type SitemapSection = (typeof SITEMAP_SECTIONS)[number];
export const isSitemapSection = sections.isSection;
/** `/sitemap-tools.xml` etc. */
export const sectionPath = sections.sectionPath;
/** Every sitemap document the page cache rebuilds: index, legacy `sitemap-0.xml`, each section. */
export const SITEMAP_PATHS = sections.paths;
