import type { Metadata } from "next";
import { CarelaDashboard } from "@/components/dashboard/CarelaDashboard";

export const metadata: Metadata = {
  title: "Estudio de gestión",
  description: "Panel operativo de CARELA Beauty & Wellness.",
  alternates: {
    canonical: "/dashboard",
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default function DashboardPage() {
  return <CarelaDashboard />;
}
