import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CarelaDashboard } from "@/components/dashboard/CarelaDashboard";
import { carelaOwnerId } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

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

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (data?.claims?.sub !== carelaOwnerId) redirect("/login");

  return <CarelaDashboard />;
}
