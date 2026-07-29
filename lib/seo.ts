import type { Metadata } from "next";

export const brandName = "CARELA Beauty & Wellness";
export const siteUrl = "https://www.carelaspa.com";
export const socialImageUrl = `${siteUrl}/og-carela-v5.jpg`;
export const fallbackSocialImageUrl = `${siteUrl}/og-carela-v5.png`;

export const socialImages = [
  {
    url: socialImageUrl,
    width: 1200,
    height: 630,
    type: "image/jpeg",
    alt: "CARELA Beauty & Wellness en Puerto Plata",
  },
  {
    url: fallbackSocialImageUrl,
    width: 1200,
    height: 630,
    type: "image/png",
    alt: "CARELA Beauty & Wellness en Puerto Plata",
  },
];

type PageMetadataOptions = {
  title: string;
  description: string;
  path: `/${string}` | "/";
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataOptions): Metadata {
  const socialTitle = `${title} | ${brandName}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: socialTitle,
      description,
      type: "website",
      url: path,
      locale: "es_DO",
      siteName: brandName,
      images: socialImages,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImageUrl],
    },
  };
}
