import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Manrope } from "next/font/google";
import { SiteFrame } from "@/components/layout/SiteFrame";
import {
  brandName,
  siteUrl,
  socialImages,
  socialImageUrl,
} from "@/lib/seo";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-carela-heading",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-carela-body",
  subsets: ["latin"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-carela-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const homeTitle = `Masajes y belleza en Puerto Plata | ${brandName}`;
const homeDescription =
  "Masajes, cejas, pestañas y depilación con atención personalizada en Puerto Plata, República Dominicana. Reserva tu experiencia CARELA.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: brandName,
  creator: "Leidania Carela",
  publisher: brandName,
  category: "Belleza y bienestar",
  title: {
    default: homeTitle,
    template: `%s | ${brandName}`,
  },
  description: homeDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    type: "website",
    url: "/",
    locale: "es_DO",
    siteName: brandName,
    images: socialImages,
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: [socialImageUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-DO"
      className={`${cormorant.variable} ${manrope.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
