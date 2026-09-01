import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restablecer contraseña",
  description: "Acceso privado para restablecer la contraseña de CARELA.",
  alternates: {
    canonical: "/restablecer-contrasena",
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default function ResetPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
