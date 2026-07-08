export const imagePlaceholders = [
  "massage-room",
  "embroidered-towel",
  "beauty-detail",
  "waxing-prep",
  "boutique-ambience",
  "puerto-plata-detail",
] as const;

export type ImagePlaceholderKey = (typeof imagePlaceholders)[number];
