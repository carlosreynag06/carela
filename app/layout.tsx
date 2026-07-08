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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "CARELA Beauty & Wellness",
  description:
    "Belleza y bienestar personalizado con Leidania Carela en Puerto Plata.",
  openGraph: {
    title: "CARELA Beauty & Wellness",
    description:
      "Eleva tu belleza y tu bienestar con una experiencia personalizada en Puerto Plata.",
    type: "website",
    locale: "es_DO",
    siteName: "CARELA Beauty & Wellness",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1731,
        height: 909,
        alt: "CARELA Beauty & Wellness - Eleva tu Belleza y tu Bienestar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CARELA Beauty & Wellness",
    description:
      "Eleva tu belleza y tu bienestar con una experiencia personalizada en Puerto Plata.",
    images: ["/opengraph-image.png"],
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
