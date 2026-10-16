import type {ToolCategory} from '@tracht-digital-solutions/tds-tools-contract';

/** Illustrative subjects, never screenshots or promises about tool results. */
export const categoryArtwork: Record<ToolCategory, string> = {
  content:'content', developer:'developer', design:'design', marketing:'marketing',
  media:'media', security:'security', business:'business', compliance:'compliance', other:'hero',
};
export const editorialSrc = (id: string, width = 960): string => `/images/editorial/${id}-2026-${width}.webp`;
export const editorialSrcset = (id: string): string => [480,960,1440].map(w => `${editorialSrc(id,w)} ${w}w`).join(', ');
