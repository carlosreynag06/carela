import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
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

const siteUrl = "https://www.carelaspa.com";
const socialImageUrl = `${siteUrl}/og-carela-v4.jpg`;
const fallbackSocialImageUrl = `${siteUrl}/og-carela.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "CARELA Beauty & Wellness",
  description:
    "Belleza y bienestar personalizado con Leidania Carela en Puerto Plata.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "CARELA Beauty & Wellness",
    description:
      "Eleva tu belleza y tu bienestar con una experiencia personalizada en Puerto Plata.",
    type: "website",
    url: siteUrl,
    locale: "es_DO",
    siteName: "CARELA Beauty & Wellness",
    images: [
      {
        url: socialImageUrl,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "CARELA Beauty & Wellness en Puerto Plata",
      },
      {
        url: fallbackSocialImageUrl,
        width: 1731,
        height: 909,
        type: "image/png",
        alt: "CARELA Beauty & Wellness - Eleva tu belleza y tu bienestar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CARELA Beauty & Wellness",
    description:
      "Eleva tu belleza y tu bienestar con una experiencia personalizada en Puerto Plata.",
    images: [socialImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${manrope.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
