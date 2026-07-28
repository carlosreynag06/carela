import type { Metadata } from "next";
import { CarelaDashboard } from "@/components/dashboard/CarelaDashboard";

export const metadata: Metadata = {
  title: "Estudio de gestión | CARELA",
  description: "Panel operativo de CARELA Beauty & Wellness.",
};

export default function DashboardPage() {
  return <CarelaDashboard />;
}
