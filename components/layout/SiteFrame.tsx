"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { FloatingWhatsApp } from "@/components/brand/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export function SiteFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isBackOffice =
    pathname === "/login" || pathname.startsWith("/dashboard");

  if (isBackOffice) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <FloatingWhatsApp />
      <Footer />
    </>
  );
}
