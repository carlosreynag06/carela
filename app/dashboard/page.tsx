import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CarelaDashboard } from "@/components/dashboard/CarelaDashboard";
import type {
  AdminData,
  Appointment,
  Client,
  Expense,
} from "@/lib/admin/types";
import type { GalleryItem } from "@/data/gallery";
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

  const [clientsResult, appointmentsResult, expensesResult, galleryResult] =
    await Promise.all([
      supabase.from("clients").select("*").order("created_at", { ascending: false }),
      supabase
        .from("appointments")
        .select("*")
        .order("appointment_date", { ascending: true })
        .order("appointment_time", { ascending: true }),
      supabase
        .from("expenses")
        .select("*")
        .order("expense_date", { ascending: false }),
      supabase
        .from("gallery_items")
        .select("*")
        .order("is_pinned", { ascending: false })
        .order("created_at", { ascending: false }),
    ]);

  const firstError = [
    clientsResult.error,
    appointmentsResult.error,
    expensesResult.error,
    galleryResult.error,
  ].find(Boolean);

  const appointments: Appointment[] = (appointmentsResult.data ?? []).map(
    (row) => ({
      id: row.id,
      clientId: row.client_id,
      date: row.appointment_date,
      time: String(row.appointment_time).slice(0, 5),
      service: row.service,
      package: row.package_name,
      amount: Number(row.amount),
      status: row.status,
      location: row.location,
    }),
  );

  const clients: Client[] = (clientsResult.data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    service: row.service,
    joined: row.joined,
    notes: row.notes,
    visits: appointments.filter(
      (appointment) =>
        appointment.clientId === row.id && appointment.status === "completada",
    ).length,
  }));

  const expenses: Expense[] = (expensesResult.data ?? []).map((row) => ({
    id: row.id,
    date: row.expense_date,
    category: row.category,
    description: row.description,
    amount: Number(row.amount),
    service: row.service,
  }));

  const galleryItems: GalleryItem[] = (galleryResult.data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    service: row.service,
    imageUrl: supabase.storage.from("gallery").getPublicUrl(row.image_path).data
      .publicUrl,
    imagePath: row.image_path,
    isPinned: row.is_pinned,
    createdAt: row.created_at,
  }));

  const initialData: AdminData = { clients, appointments, expenses };

  return (
    <CarelaDashboard
      initialData={initialData}
      initialGalleryItems={galleryItems}
      initialError={firstError?.message}
    />
  );
}
