import { createImageCatalog } from "@tracht-digital-solutions/tds-shared/site";
import raw from "./imageCatalog.json";

/** The generated editorial image catalogue, served from this origin (tds-shared helper). */
export const { imageInfo, imageHints, imageObject } = createImageCatalog(raw, {
  origin: "https://tools.tracht-digital.de",
  about: "webpage",
});
