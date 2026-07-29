import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acceso al estudio de gestión",
  description: "Acceso privado al sistema operativo de CARELA.",
  alternates: {
    canonical: "/login",
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
