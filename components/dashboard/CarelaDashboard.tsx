"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Download,
  Edit3,
  Eye,
  EyeOff,
  ExternalLink,
  Images,
  LayoutDashboard,
  LogOut,
  Menu,
  MoreHorizontal,
  Plus,
  ReceiptText,
  Search,
  Settings,
  Trash2,
  TrendingUp,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { FinanceReportPreview } from "@/components/dashboard/FinanceReportPreview";
import { GalleryManager } from "@/components/dashboard/GalleryManager";
import type { FinanceReportData } from "@/lib/financeReport";

type ServiceKey = "masajes" | "cejas" | "pestanas" | "depilacion";
type Status = "confirmada" | "completada" | "pendiente" | "cancelada";
type View = "resumen" | "citas" | "clientes" | "finanzas" | "galeria";

type Client = {
  id: number;
  name: string;
  phone: string;
  email: string;
  service: ServiceKey;
  joined: string;
  visits: number;
  notes: string;
};

type Appointment = {
  id: number;
  clientId: number;
  date: string;
  time: string;
  service: ServiceKey;
  package: string;
  amount: number;
  status: Status;
  location: "Estudio" | "Domicilio";
};

type Expense = {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
  service: ServiceKey | "general";
};

const SERVICES: Record<
  ServiceKey,
  { label: string; color: string; packages: { name: string; price: number }[] }
> = {
  masajes: {
    label: "Masajes",
    color: "#d9a84e",
    packages: [
      { name: "Pausa Esencial", price: 2200 },
      { name: "Ritual CARELA", price: 3600 },
      { name: "Renovación Profunda", price: 4800 },
    ],
  },
  cejas: {
    label: "Cejas",
    color: "#d94b8c",
    packages: [
      { name: "Color Suave", price: 950 },
      { name: "Diseño CARELA", price: 1450 },
      { name: "Mirada Completa", price: 1950 },
    ],
  },
  pestanas: {
    label: "Pestañas",
    color: "#a9658a",
    packages: [
      { name: "Toque Natural", price: 1800 },
      { name: "Mirada CARELA", price: 2600 },
      { name: "Set Boutique", price: 3400 },
    ],
  },
  depilacion: {
    label: "Depilación",
    color: "#c77a38",
    packages: [
      { name: "Zona Esencial", price: 850 },
      { name: "Combo CARELA", price: 1850 },
      { name: "Suavidad Total", price: 3200 },
    ],
  },
};

const serviceKeys = Object.keys(SERVICES) as ServiceKey[];

const formatInputDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;

const getCurrentMonthRange = () => {
  const today = new Date();
  return {
    start: formatInputDate(new Date(today.getFullYear(), today.getMonth(), 1)),
    end: formatInputDate(new Date(today.getFullYear(), today.getMonth() + 1, 0)),
  };
};

const formatMoney = (value: number) =>
  new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
    maximumFractionDigits: 0,
  }).format(value);

const formatDate = (value: string, options?: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("es-DO", {
    day: "numeric",
    month: "short",
    year: options?.year,
    timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`));

const fieldClass =
  "h-11 w-full border border-[#d9a84e]/18 bg-[#0d090a] px-3 text-sm text-[#f7efe7] outline-none transition placeholder:text-[#7f6f69] focus:border-[#d9a84e]";

export function CarelaDashboard() {
  const [view, setView] = useState<View>("resumen");
  const [clients, setClients] = useState<Client[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [serviceFilter, setServiceFilter] = useState<ServiceKey | "todos">("todos");
  const [startDate, setStartDate] = useState(() => getCurrentMonthRange().start);
  const [endDate, setEndDate] = useState(() => getCurrentMonthRange().end);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [modal, setModal] = useState<
    | { type: "client"; item?: Client }
    | {
        type: "appointment";
        item?: Appointment;
        clientId?: number;
        service?: ServiceKey;
      }
    | { type: "expense"; item?: Expense }
    | null
  >(null);

  const dateAndServiceAppointments = useMemo(
    () =>
      appointments.filter(
        (item) =>
          item.date >= startDate &&
          item.date <= endDate &&
          (serviceFilter === "todos" || item.service === serviceFilter),
      ),
    [appointments, startDate, endDate, serviceFilter],
  );

  const completedAppointments = dateAndServiceAppointments.filter(
    (item) => item.status === "completada",
  );
  const filteredExpenses = expenses.filter(
    (item) =>
      item.date >= startDate &&
      item.date <= endDate &&
      (serviceFilter === "todos" || item.service === serviceFilter),
  );
  const income = completedAppointments.reduce((sum, item) => sum + item.amount, 0);
  const expenseTotal = filteredExpenses.reduce((sum, item) => sum + item.amount, 0);
  const profit = income - expenseTotal;

  const serviceIncome = serviceKeys.map((key) => ({
    key,
    name: SERVICES[key].label,
    value: completedAppointments
      .filter((item) => item.service === key)
      .reduce((sum, item) => sum + item.amount, 0),
    color: SERVICES[key].color,
  }));

  const dailyData = useMemo(() => {
    const map = new Map<string, { date: string; ingresos: number; gastos: number }>();
    dateAndServiceAppointments.forEach((item) => {
      if (item.status !== "completada") return;
      const row = map.get(item.date) ?? { date: item.date, ingresos: 0, gastos: 0 };
      row.ingresos += item.amount;
      map.set(item.date, row);
    });
    filteredExpenses.forEach((item) => {
      const row = map.get(item.date) ?? { date: item.date, ingresos: 0, gastos: 0 };
      row.gastos += item.amount;
      map.set(item.date, row);
    });
    return [...map.values()]
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((row) => ({ ...row, label: formatDate(row.date) }));
  }, [dateAndServiceAppointments, filteredExpenses]);

  const visibleClients = clients.filter((client) => {
    const query = search.toLowerCase();
    return (
      (serviceFilter === "todos" || client.service === serviceFilter) &&
      (client.name.toLowerCase().includes(query) ||
        client.phone.includes(query) ||
        client.email.toLowerCase().includes(query))
    );
  });

  const visibleAppointments = dateAndServiceAppointments
    .filter((item) => {
      const client = clients.find((entry) => entry.id === item.clientId);
      return !search || client?.name.toLowerCase().includes(search.toLowerCase());
    })
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));

  function saveClient(data: Omit<Client, "id" | "visits"> & { id?: number }) {
    if (data.id) {
      setClients((items) =>
        items.map((item) => (item.id === data.id ? { ...item, ...data } : item)),
      );
    } else {
      setClients((items) => [
        ...items,
        { ...data, id: Math.max(0, ...items.map((item) => item.id)) + 1, visits: 0 },
      ]);
    }
    setModal(null);
  }

  function saveAppointment(data: Omit<Appointment, "id"> & { id?: number }) {
    if (data.id) {
      setAppointments((items) =>
        items.map((item) => (item.id === data.id ? { ...item, ...data } : item)),
      );
    } else {
      setAppointments((items) => [
        ...items,
        { ...data, id: Math.max(0, ...items.map((item) => item.id)) + 1 },
      ]);
    }
    setModal(null);
  }

  function saveExpense(data: Omit<Expense, "id"> & { id?: number }) {
    if (data.id) {
      setExpenses((items) =>
        items.map((item) => (item.id === data.id ? { ...item, ...data } : item)),
      );
    } else {
      setExpenses((items) => [
        ...items,
        { ...data, id: Math.max(0, ...items.map((item) => item.id)) + 1 },
      ]);
    }
    setModal(null);
  }

  const navigation: { id: View; label: string; icon: typeof LayoutDashboard }[] = [
    { id: "resumen", label: "Resumen", icon: LayoutDashboard },
    { id: "citas", label: "Citas", icon: CalendarDays },
    { id: "clientes", label: "Clientes", icon: Users },
    { id: "finanzas", label: "Finanzas", icon: WalletCards },
    { id: "galeria", label: "Galería", icon: Images },
  ];

  return (
    <div className="min-h-screen bg-[#080506] text-[#f7efe7]">
      {sidebarOpen && (
        <button
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Cerrar navegación"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[272px] flex-col border-r border-[#d9a84e]/12 bg-[#100a0c] transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-24 items-center justify-between border-b border-[#d9a84e]/10 px-7">
          <Link href="/" className="leading-none">
            <span className="block font-serif text-2xl tracking-[0.18em] text-[#d9a84e]">
              CARELA
            </span>
            <span className="block font-script text-xl text-[#d94b8c]">
              Beauty & Wellness
            </span>
          </Link>
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4 py-7">
          <p className="px-3 text-[0.64rem] font-bold uppercase tracking-[0.28em] text-[#7f6f69]">
            Estudio de gestión
          </p>
          <nav className="mt-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = view === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setView(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`group flex h-12 w-full items-center gap-3 px-3 text-sm font-semibold transition ${
                    active
                      ? "bg-[#d9a84e] text-[#080506]"
                      : "text-[#b8a49b] hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                  {active && <span className="ml-auto size-1.5 bg-[#8f1f54]" />}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto border-t border-[#d9a84e]/10 p-4">
          <button
            onClick={() =>
              window.alert(
                "La configuración de cuenta estará disponible en una próxima fase.",
              )
            }
            className="flex h-11 w-full items-center gap-3 px-3 text-sm text-[#b8a49b] transition hover:text-white"
          >
            <Settings size={17} />
            Configuración
          </button>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="flex h-11 w-full items-center gap-3 px-3 text-sm text-[#b8a49b] transition hover:text-white"
            >
              <LogOut size={17} />
              Cerrar sesión
            </button>
          </form>
          <div className="mt-3 flex items-center gap-3 border border-[#d9a84e]/12 bg-black/20 p-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-[#8f1f54] font-serif text-lg">
              LC
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">Leidania Carela</p>
              <p className="truncate text-[0.68rem] text-[#7f6f69]">Propietaria</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-[272px]">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#d9a84e]/10 bg-[#080506]/90 px-4 backdrop-blur-xl sm:px-7 lg:px-10">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu size={22} />
            </button>
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-[#d94b8c]">
                Martes, 28 de julio
              </p>
              <p className="mt-1 hidden text-sm text-[#b8a49b] sm:block">
                Buenos días, Leidania.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() =>
                window.alert(
                  "Estás al día. No tienes notificaciones nuevas.",
                )
              }
              className="relative flex size-10 items-center justify-center border border-[#d9a84e]/14 text-[#b8a49b] hover:text-white"
              aria-label="Ver notificaciones"
            >
              <Bell size={17} />
              <span className="absolute right-2 top-2 size-1.5 rounded-full bg-[#d94b8c]" />
            </button>
            {view === "galeria" ? (
              <Link
                href="/galeria"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 items-center gap-2 bg-[#d9a84e] px-3 text-xs font-extrabold text-[#080506] transition hover:bg-[#f3d48a] sm:px-5"
              >
                <ExternalLink size={16} />
                <span className="hidden sm:inline">Ver galería pública</span>
                <span className="sm:hidden">Ver página</span>
              </Link>
            ) : (
              <button
                onClick={() => setModal({ type: "appointment" })}
                className="flex h-10 items-center gap-2 bg-[#d9a84e] px-3 text-xs font-extrabold text-[#080506] transition hover:bg-[#f3d48a] sm:px-5"
              >
                <Plus size={16} />
                <span className="hidden sm:inline">Nueva cita</span>
                <span className="sm:hidden">Cita</span>
              </button>
            )}
          </div>
        </header>

        <main className="px-4 py-7 sm:px-7 lg:px-10 lg:py-9">
          <div className="mx-auto max-w-[1540px]">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <p className="font-script text-2xl text-[#d94b8c]">
                  Tu negocio, en armonía
                </p>
                <h1 className="mt-1 font-serif text-4xl text-[#f7efe7] sm:text-5xl">
                  {navigation.find((item) => item.id === view)?.label}
                </h1>
              </div>

              {view !== "galeria" ? (
                <div className="flex flex-wrap items-end gap-3">
                  <label className="min-w-[150px] flex-1 sm:flex-none">
                    <span className="mb-1.5 block text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#7f6f69]">
                      Servicio
                    </span>
                    <span className="relative block">
                      <select
                        value={serviceFilter}
                        onChange={(event) =>
                          setServiceFilter(
                            event.target.value as ServiceKey | "todos",
                          )
                        }
                        className={`${fieldClass} appearance-none pr-9`}
                      >
                        <option value="todos">Todos los servicios</option>
                        {serviceKeys.map((key) => (
                          <option key={key} value={key}>
                            {SERVICES[key].label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute right-3 top-3 text-[#d9a84e]"
                        size={16}
                      />
                    </span>
                  </label>
                  <label>
                    <span className="mb-1.5 block text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#7f6f69]">
                      Desde
                    </span>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(event) => setStartDate(event.target.value)}
                      className={`${fieldClass} w-[145px] [color-scheme:dark]`}
                    />
                  </label>
                  <label>
                    <span className="mb-1.5 block text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#7f6f69]">
                      Hasta
                    </span>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(event) => setEndDate(event.target.value)}
                      className={`${fieldClass} w-[145px] [color-scheme:dark]`}
                    />
                  </label>
                </div>
              ) : null}
            </div>

            {view === "resumen" && (
              <Overview
                income={income}
                expenses={expenseTotal}
                profit={profit}
                appointmentCount={dateAndServiceAppointments.length}
                serviceIncome={serviceIncome}
                dailyData={dailyData}
                appointments={appointments}
                clients={clients}
                balanceVisible={balanceVisible}
                setBalanceVisible={setBalanceVisible}
                onNavigate={setView}
              />
            )}

            {view === "citas" && (
              <AppointmentsView
                appointments={visibleAppointments}
                clients={clients}
                search={search}
                setSearch={setSearch}
                onAdd={() => setModal({ type: "appointment" })}
                onEdit={(item) => setModal({ type: "appointment", item })}
                onDelete={(id) =>
                  window.confirm("¿Eliminar esta cita?") &&
                  setAppointments((items) => items.filter((item) => item.id !== id))
                }
                onStatus={(id, status) =>
                  setAppointments((items) =>
                    items.map((item) => (item.id === id ? { ...item, status } : item)),
                  )
                }
              />
            )}

            {view === "clientes" && (
              <ClientsView
                clients={visibleClients}
                search={search}
                setSearch={setSearch}
                onAdd={() => setModal({ type: "client" })}
                onEdit={(item) => setModal({ type: "client", item })}
                onBook={(client) =>
                  setModal({
                    type: "appointment",
                    clientId: client.id,
                    service: client.service,
                  })
                }
                onDelete={(id) =>
                  window.confirm("¿Eliminar esta clienta y su ficha?") &&
                  setClients((items) => items.filter((item) => item.id !== id))
                }
              />
            )}

            {view === "finanzas" && (
              <FinancesView
                income={income}
                expenses={expenseTotal}
                profit={profit}
                serviceIncome={serviceIncome}
                dailyData={dailyData}
                expenseRows={filteredExpenses}
                completedAppointments={completedAppointments}
                clients={clients}
                startDate={startDate}
                endDate={endDate}
                serviceFilter={serviceFilter}
                onAdd={() => setModal({ type: "expense" })}
                onEdit={(item) => setModal({ type: "expense", item })}
                onDelete={(id) =>
                  window.confirm("¿Eliminar este gasto?") &&
                  setExpenses((items) => items.filter((item) => item.id !== id))
                }
              />
            )}

            {view === "galeria" && <GalleryManager />}
          </div>
        </main>
      </div>

      {modal?.type === "client" && (
        <ClientModal
          item={modal.item}
          onClose={() => setModal(null)}
          onSave={saveClient}
        />
      )}
      {modal?.type === "appointment" && (
        <AppointmentModal
          item={modal.item}
          clients={clients}
          initialClientId={modal.clientId}
          initialService={modal.service}
          onClose={() => setModal(null)}
          onSave={saveAppointment}
        />
      )}
      {modal?.type === "expense" && (
        <ExpenseModal
          item={modal.item}
          onClose={() => setModal(null)}
          onSave={saveExpense}
        />
      )}
    </div>
  );
}

function Overview({
  income,
  expenses,
  profit,
  appointmentCount,
  serviceIncome,
  dailyData,
  appointments,
  clients,
  balanceVisible,
  setBalanceVisible,
  onNavigate,
}: {
  income: number;
  expenses: number;
  profit: number;
  appointmentCount: number;
  serviceIncome: { key: ServiceKey; name: string; value: number; color: string }[];
  dailyData: { label: string; ingresos: number; gastos: number }[];
  appointments: Appointment[];
  clients: Client[];
  balanceVisible: boolean;
  setBalanceVisible: (value: boolean) => void;
  onNavigate: (view: View) => void;
}) {
  const today = formatInputDate(new Date());
  const upcoming = appointments
    .filter((item) => item.date >= today && item.status !== "cancelada")
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))
    .slice(0, 4);
  return (
    <>
      <section className="mt-8 grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        <MetricCard
          label="Ingresos"
          value={balanceVisible ? formatMoney(income) : "••••••"}
          detail={income ? "Citas completadas en el período" : "Sin ingresos registrados"}
          icon={CircleDollarSign}
          positive
          action={() => setBalanceVisible(!balanceVisible)}
          actionIcon={balanceVisible ? Eye : EyeOff}
        />
        <MetricCard
          label="Gastos"
          value={balanceVisible ? formatMoney(expenses) : "••••••"}
          detail="Insumos y operación"
          icon={ReceiptText}
        />
        <MetricCard
          label="Beneficio neto"
          value={balanceVisible ? formatMoney(profit) : "••••••"}
          detail={`${income ? Math.round((profit / income) * 100) : 0}% de margen`}
          icon={TrendingUp}
          positive
        />
        <MetricCard
          label="Citas"
          value={String(appointmentCount)}
          detail={`${appointments.filter((item) => item.status === "confirmada").length} próximas confirmadas`}
          icon={CalendarDays}
        />
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_0.8fr]">
        <ChartCard
          eyebrow="Rendimiento"
          title="Movimiento del período"
          legend={
            <div className="flex gap-4 text-xs text-[#b8a49b]">
              <span className="flex items-center gap-2"><i className="size-2 bg-[#d9a84e]" /> Ingresos</span>
              <span className="flex items-center gap-2"><i className="size-2 bg-[#8f1f54]" /> Gastos</span>
            </div>
          }
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyData} margin={{ top: 12, right: 8, left: -18, bottom: 0 }}>
              <defs>
                <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d9a84e" stopOpacity={0.34} />
                  <stop offset="100%" stopColor="#d9a84e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#322629" vertical={false} strokeDasharray="3 6" />
              <XAxis dataKey="label" stroke="#7f6f69" tickLine={false} axisLine={false} fontSize={11} />
              <YAxis stroke="#7f6f69" tickLine={false} axisLine={false} fontSize={11} tickFormatter={(value) => `${value / 1000}k`} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="ingresos" stroke="#d9a84e" strokeWidth={2.5} fill="url(#incomeFill)" />
              <Area type="monotone" dataKey="gastos" stroke="#8f1f54" strokeWidth={2} fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard eyebrow="Ingresos" title="Por servicio">
          <div className="grid h-full grid-cols-[0.9fr_1fr] items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={serviceIncome} dataKey="value" innerRadius="58%" outerRadius="82%" paddingAngle={4} stroke="none">
                  {serviceIncome.map((entry) => <Cell key={entry.key} fill={entry.color} />)}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {serviceIncome.map((entry) => (
                <div key={entry.key} className="flex items-center justify-between gap-3 text-xs">
                  <span className="flex items-center gap-2 text-[#b8a49b]">
                    <i className="size-2" style={{ background: entry.color }} />
                    {entry.name}
                  </span>
                  <strong className="text-[#f7efe7]">{formatMoney(entry.value)}</strong>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </section>

      <section className="mt-5">
        <div className="border border-[#d9a84e]/12 bg-[#100a0c]">
          <div className="flex items-center justify-between border-b border-[#d9a84e]/10 px-5 py-4 sm:px-6">
            <div>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#d94b8c]">Agenda</p>
              <h2 className="mt-1 font-serif text-2xl">Próximas citas</h2>
            </div>
            <button onClick={() => onNavigate("citas")} className="text-xs font-bold text-[#d9a84e] hover:text-[#f3d48a]">
              Ver agenda completa
            </button>
          </div>
          <div className="divide-y divide-[#d9a84e]/8">
            {upcoming.map((item) => {
              const client = clients.find((entry) => entry.id === item.clientId);
              return (
                <div key={item.id} className="grid grid-cols-[52px_1fr_auto] items-center gap-3 px-5 py-4 sm:px-6">
                  <div className="border-r border-[#d9a84e]/15 pr-3 text-center">
                    <strong className="block font-serif text-xl text-[#d9a84e]">{item.time.slice(0, 2)}</strong>
                    <span className="text-[0.58rem] uppercase text-[#7f6f69]">{item.time.slice(3)}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{client?.name}</p>
                    <p className="mt-1 truncate text-xs text-[#7f6f69]">{item.package} · {item.location}</p>
                  </div>
                  <StatusBadge status={item.status} />
                </div>
              );
            })}
          </div>
        </div>

      </section>
    </>
  );
}

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  positive,
  action,
  actionIcon: ActionIcon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: typeof CircleDollarSign;
  positive?: boolean;
  action?: () => void;
  actionIcon?: typeof Eye;
}) {
  return (
    <article className="relative overflow-hidden border border-[#d9a84e]/12 bg-[#100a0c] p-5 sm:p-6">
      <div className="absolute right-0 top-0 size-28 bg-[radial-gradient(circle_at_top_right,rgba(217,168,78,0.10),transparent_66%)]" />
      <div className="flex items-start justify-between">
        <div className="flex size-10 items-center justify-center border border-[#d9a84e]/18 bg-black/20 text-[#d9a84e]"><Icon size={18} /></div>
        {action && ActionIcon && (
          <button onClick={action} className="text-[#7f6f69] hover:text-[#d9a84e]" aria-label="Mostrar u ocultar montos">
            <ActionIcon size={17} />
          </button>
        )}
      </div>
      <p className="mt-5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#7f6f69]">{label}</p>
      <p className="mt-2 font-serif text-3xl text-[#f7efe7]">{value}</p>
      <p className={`mt-3 flex items-center gap-1.5 text-[0.68rem] ${positive ? "text-[#d9a84e]" : "text-[#7f6f69]"}`}>
        {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
        {detail}
      </p>
    </article>
  );
}

function ChartCard({ eyebrow, title, legend, children }: { eyebrow: string; title: string; legend?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="border border-[#d9a84e]/12 bg-[#100a0c] p-5 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#d94b8c]">{eyebrow}</p>
          <h2 className="mt-1 font-serif text-2xl">{title}</h2>
        </div>
        {legend}
      </div>
      <div className="mt-5 h-[260px]">{children}</div>
    </div>
  );
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="border border-[#d9a84e]/25 bg-[#080506]/95 p-3 shadow-2xl">
      {label && <p className="mb-2 text-xs text-[#b8a49b]">{label}</p>}
      {payload.map((item) => (
        <p key={item.name} className="text-xs font-bold" style={{ color: item.color }}>
          {item.name}: {formatMoney(item.value)}
        </p>
      ))}
    </div>
  );
}

function Toolbar({ search, setSearch, buttonLabel, onAdd }: { search: string; setSearch: (value: string) => void; buttonLabel: string; onAdd: () => void }) {
  return (
    <div className="mt-8 flex flex-col gap-3 border border-[#d9a84e]/12 bg-[#100a0c] p-4 sm:flex-row sm:items-center sm:justify-between">
      <label className="relative block w-full max-w-md">
        <Search className="absolute left-3 top-3 text-[#7f6f69]" size={17} />
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por nombre, teléfono o correo…" className={`${fieldClass} pl-10`} />
      </label>
      <button onClick={onAdd} className="flex h-11 items-center justify-center gap-2 bg-[#d9a84e] px-5 text-xs font-extrabold text-[#080506] hover:bg-[#f3d48a]">
        <Plus size={16} /> {buttonLabel}
      </button>
    </div>
  );
}

function AppointmentsView({ appointments, clients, search, setSearch, onAdd, onEdit, onDelete, onStatus }: {
  appointments: Appointment[]; clients: Client[]; search: string; setSearch: (value: string) => void; onAdd: () => void; onEdit: (item: Appointment) => void; onDelete: (id: number) => void; onStatus: (id: number, status: Status) => void;
}) {
  return (
    <>
      <Toolbar search={search} setSearch={setSearch} buttonLabel="Reservar cita" onAdd={onAdd} />
      <div className="mt-4 space-y-3 md:hidden">
        {appointments.map((item) => {
          const client = clients.find((entry) => entry.id === item.clientId);
          return (
            <article
              key={item.id}
              className="border border-[#d9a84e]/14 bg-[#100a0c] p-4"
            >
              <div className="flex items-start justify-between gap-3 border-b border-[#d9a84e]/10 pb-4">
                <div>
                  <strong className="block font-serif text-xl text-[#f7efe7]">
                    {formatDate(item.date, { year: "numeric" })}
                  </strong>
                  <span className="mt-1 flex items-center gap-1.5 text-xs text-[#b8a49b]">
                    <Clock3 size={13} /> {item.time}
                  </span>
                </div>
                <select
                  value={item.status}
                  onChange={(event) =>
                    onStatus(item.id, event.target.value as Status)
                  }
                  aria-label={`Estado de la cita de ${client?.name ?? "clienta"}`}
                  className="h-10 border border-[#d9a84e]/16 bg-[#0d090a] px-3 text-xs text-[#f3d48a] outline-none"
                >
                  <option value="confirmada">Confirmada</option>
                  <option value="completada">Completada</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="cancelada">Cancelada</option>
                </select>
              </div>

              <div className="py-4">
                <p className="font-bold">{client?.name ?? "Clienta eliminada"}</p>
                <p className="mt-1 text-xs text-[#7f6f69]">{client?.phone}</p>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-[#d9a84e]">
                      {SERVICES[item.service].label}
                    </span>
                    <p className="mt-1 text-xs text-[#7f6f69]">{item.package}</p>
                  </div>
                  <strong className="shrink-0 text-right">
                    {formatMoney(item.amount)}
                  </strong>
                </div>
                <p className="mt-3 text-xs text-[#b8a49b]">
                  Modalidad: {item.location}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 border-t border-[#d9a84e]/10 pt-3">
                <MobileActionButton
                  label="Editar"
                  icon={Edit3}
                  onClick={() => onEdit(item)}
                />
                <MobileActionButton
                  label="Eliminar"
                  icon={Trash2}
                  danger
                  onClick={() => onDelete(item.id)}
                />
              </div>
            </article>
          );
        })}
        {!appointments.length && (
          <EmptyState label="No hay citas para estos filtros." />
        )}
      </div>
      <div className="mt-4 hidden overflow-x-auto border border-[#d9a84e]/12 bg-[#100a0c] md:block">
        <table className="w-full min-w-[940px] text-left">
          <thead className="border-b border-[#d9a84e]/12 bg-black/20 text-[0.62rem] uppercase tracking-[0.18em] text-[#7f6f69]">
            <tr><th className="px-5 py-4">Fecha y hora</th><th className="px-5 py-4">Clienta</th><th className="px-5 py-4">Servicio</th><th className="px-5 py-4">Modalidad</th><th className="px-5 py-4">Monto</th><th className="px-5 py-4">Estado</th><th className="px-5 py-4 text-right">Acciones</th></tr>
          </thead>
          <tbody className="divide-y divide-[#d9a84e]/8">
            {appointments.map((item) => {
              const client = clients.find((entry) => entry.id === item.clientId);
              return (
                <tr key={item.id} className="text-sm transition hover:bg-white/[0.02]">
                  <td className="px-5 py-4"><strong className="block">{formatDate(item.date, { year: "numeric" })}</strong><span className="mt-1 flex items-center gap-1 text-xs text-[#7f6f69]"><Clock3 size={12} /> {item.time}</span></td>
                  <td className="px-5 py-4"><strong>{client?.name ?? "Clienta eliminada"}</strong><p className="mt-1 text-xs text-[#7f6f69]">{client?.phone}</p></td>
                  <td className="px-5 py-4"><span className="text-[#d9a84e]">{SERVICES[item.service].label}</span><p className="mt-1 text-xs text-[#7f6f69]">{item.package}</p></td>
                  <td className="px-5 py-4 text-[#b8a49b]">{item.location}</td>
                  <td className="px-5 py-4 font-bold">{formatMoney(item.amount)}</td>
                  <td className="px-5 py-4">
                    <select value={item.status} onChange={(event) => onStatus(item.id, event.target.value as Status)} className="bg-transparent text-xs text-[#b8a49b] outline-none">
                      <option value="confirmada">Confirmada</option><option value="completada">Completada</option><option value="pendiente">Pendiente</option><option value="cancelada">Cancelada</option>
                    </select>
                  </td>
                  <td className="px-5 py-4"><div className="flex justify-end gap-1"><IconButton label="Editar cita" icon={Edit3} onClick={() => onEdit(item)} /><IconButton label="Eliminar cita" icon={Trash2} danger onClick={() => onDelete(item.id)} /></div></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!appointments.length && <EmptyState label="No hay citas para estos filtros." />}
      </div>
    </>
  );
}

function ClientsView({
  clients,
  search,
  setSearch,
  onAdd,
  onEdit,
  onBook,
  onDelete,
}: {
  clients: Client[];
  search: string;
  setSearch: (value: string) => void;
  onAdd: () => void;
  onEdit: (item: Client) => void;
  onBook: (item: Client) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <>
      <Toolbar search={search} setSearch={setSearch} buttonLabel="Nueva clienta" onAdd={onAdd} />
      <div className="mt-4 space-y-3 md:hidden">
        {clients.map((client) => (
          <article
            key={client.id}
            className="border border-[#d9a84e]/14 bg-[#100a0c] p-4"
          >
            <div className="flex items-start gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#8f1f54]/30 font-serif text-lg text-[#f3d48a]">
                {client.name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="truncate font-serif text-xl">{client.name}</h2>
                    <p className="mt-1 text-[0.65rem] text-[#7f6f69]">
                      CL-{String(client.id).padStart(3, "0")}
                    </p>
                  </div>
                  <ServicePill service={client.service} />
                </div>
                <a
                  href={`tel:${client.phone.replaceAll("-", "")}`}
                  className="mt-3 block text-sm text-[#b8a49b]"
                >
                  {client.phone}
                </a>
                {client.email && (
                  <a
                    href={`mailto:${client.email}`}
                    className="mt-1 block truncate text-xs text-[#7f6f69]"
                  >
                    {client.email}
                  </a>
                )}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 border-y border-[#d9a84e]/10 py-3 text-xs">
              <div>
                <span className="block text-[#7f6f69]">Clienta desde</span>
                <strong className="mt-1 block text-[#b8a49b]">
                  {formatDate(client.joined, { year: "numeric" })}
                </strong>
              </div>
              <div>
                <span className="block text-[#7f6f69]">Historial</span>
                <strong className="mt-1 block text-[#f3d48a]">
                  {client.visits} {client.visits === 1 ? "visita" : "visitas"}
                </strong>
              </div>
            </div>

            {client.notes && (
              <p className="mt-3 line-clamp-2 text-xs leading-5 text-[#7f6f69]">
                {client.notes}
              </p>
            )}

            <button
              type="button"
              onClick={() => onBook(client)}
              className="mt-4 flex h-11 w-full items-center justify-center gap-2 bg-[#d9a84e] px-4 text-xs font-extrabold text-[#080506]"
            >
              <CalendarDays size={15} />
              Reservar cita
            </button>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <MobileActionButton
                label="Editar"
                icon={Edit3}
                onClick={() => onEdit(client)}
              />
              <MobileActionButton
                label="Eliminar"
                icon={Trash2}
                danger
                onClick={() => onDelete(client.id)}
              />
            </div>
          </article>
        ))}
        {!clients.length && (
          <EmptyState label="No encontramos clientas con esos filtros." />
        )}
      </div>
      <div className="mt-4 hidden overflow-x-auto border border-[#d9a84e]/12 bg-[#100a0c] md:block">
        <table className="w-full min-w-[1040px] text-left">
          <thead className="border-b border-[#d9a84e]/12 bg-black/20 text-[0.62rem] uppercase tracking-[0.18em] text-[#7f6f69]">
            <tr>
              <th className="px-5 py-4">Clienta</th>
              <th className="px-5 py-4">Contacto</th>
              <th className="px-5 py-4">Servicio de interés</th>
              <th className="px-5 py-4">Desde</th>
              <th className="px-5 py-4">Visitas</th>
              <th className="px-5 py-4">Notas</th>
              <th className="px-5 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#d9a84e]/8">
            {clients.map((client) => (
              <tr key={client.id} className="group text-sm transition hover:bg-white/[0.02]">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#8f1f54]/30 font-serif text-base text-[#f3d48a]">
                      {client.name
                        .split(" ")
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div>
                      <strong className="block text-[#f7efe7]">{client.name}</strong>
                      <span className="mt-1 block text-[0.68rem] text-[#7f6f69]">
                        CL-{String(client.id).padStart(3, "0")}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="block text-[#b8a49b]">{client.phone}</span>
                  <span className="mt-1 block max-w-[190px] truncate text-xs text-[#7f6f69]">
                    {client.email || "Sin correo registrado"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <ServicePill service={client.service} />
                </td>
                <td className="px-5 py-4 text-[#b8a49b]">
                  {formatDate(client.joined, { year: "numeric" })}
                </td>
                <td className="px-5 py-4">
                  <strong className="font-serif text-xl text-[#f3d48a]">{client.visits}</strong>
                  <span className="ml-1.5 text-xs text-[#7f6f69]">
                    {client.visits === 1 ? "visita" : "visitas"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <p className="max-w-[220px] truncate text-xs text-[#7f6f69]" title={client.notes}>
                    {client.notes || "Sin notas"}
                  </p>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => onBook(client)}
                      className="mr-2 inline-flex h-9 items-center gap-2 border border-[#d9a84e]/25 px-3 text-[0.68rem] font-extrabold text-[#f3d48a] transition hover:border-[#d9a84e]/60 hover:bg-[#d9a84e]/8"
                      aria-label={`Reservar una cita para ${client.name}`}
                    >
                      <CalendarDays size={14} />
                      Reservar
                    </button>
                    <IconButton label="Editar clienta" icon={Edit3} onClick={() => onEdit(client)} />
                    <IconButton label="Eliminar clienta" icon={Trash2} danger onClick={() => onDelete(client.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!clients.length && <EmptyState label="No encontramos clientas con esos filtros." />}
      </div>
    </>
  );
}

function FinancesView({
  income,
  expenses,
  profit,
  serviceIncome,
  dailyData,
  expenseRows,
  completedAppointments,
  clients,
  startDate,
  endDate,
  serviceFilter,
  onAdd,
  onEdit,
  onDelete,
}: {
  income: number;
  expenses: number;
  profit: number;
  serviceIncome: { key: ServiceKey; name: string; value: number; color: string }[];
  dailyData: { label: string; ingresos: number; gastos: number }[];
  expenseRows: Expense[];
  completedAppointments: Appointment[];
  clients: Client[];
  startDate: string;
  endDate: string;
  serviceFilter: ServiceKey | "todos";
  onAdd: () => void;
  onEdit: (item: Expense) => void;
  onDelete: (id: number) => void;
}) {
  const [reportPreview, setReportPreview] = useState<FinanceReportData | null>(
    null,
  );

  function previewFinanceReport() {
    const reportServiceIncome =
      serviceFilter === "todos"
        ? serviceIncome
        : serviceIncome.filter((item) => item.key === serviceFilter);

    setReportPreview({
      startDate,
      endDate,
      serviceLabel:
        serviceFilter === "todos"
          ? "Todos los servicios"
          : SERVICES[serviceFilter].label,
      generatedAt: new Intl.DateTimeFormat("es-DO", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date()),
      income,
      expenses,
      profit,
      margin: income ? Math.round((profit / income) * 100) : 0,
      serviceIncome: reportServiceIncome.map(({ name, value, color }) => ({
        name,
        value,
        color,
      })),
      incomeRows: [...completedAppointments]
        .sort((a, b) => a.date.localeCompare(b.date))
        .map((item) => ({
          date: item.date,
          client:
            clients.find((client) => client.id === item.clientId)?.name ??
            "Clienta eliminada",
          service: SERVICES[item.service].label,
          packageName: item.package,
          location: item.location,
          amount: item.amount,
        })),
      expenseRows: [...expenseRows]
        .sort((a, b) => a.date.localeCompare(b.date))
        .map((item) => ({
          date: item.date,
          description: item.description,
          category: item.category,
          service:
            item.service === "general"
              ? "General"
              : SERVICES[item.service].label,
          amount: item.amount,
        })),
    });
  }

  return (
    <>
      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <MetricCard label="Ingresos realizados" value={formatMoney(income)} detail="Solo citas completadas" icon={CircleDollarSign} positive />
        <MetricCard label="Gastos registrados" value={formatMoney(expenses)} detail={`${expenseRows.length} ${expenseRows.length === 1 ? "movimiento" : "movimientos"}`} icon={ReceiptText} />
        <MetricCard label="Resultado neto" value={formatMoney(profit)} detail={`${income ? Math.round((profit / income) * 100) : 0}% de margen`} icon={TrendingUp} positive />
      </section>
      <section className="mt-5 grid gap-5 xl:grid-cols-2">
        <ChartCard eyebrow="Comparativa" title="Ingresos y gastos">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyData} margin={{ top: 10, right: 10, left: -18, bottom: 0 }}>
              <CartesianGrid stroke="#322629" vertical={false} strokeDasharray="3 6" />
              <XAxis dataKey="label" stroke="#7f6f69" tickLine={false} axisLine={false} fontSize={11} />
              <YAxis stroke="#7f6f69" tickLine={false} axisLine={false} fontSize={11} tickFormatter={(value) => `${value / 1000}k`} />
              <Tooltip content={<ChartTooltip />} />
              <Area dataKey="ingresos" type="monotone" stroke="#d9a84e" fill="#d9a84e" fillOpacity={0.12} strokeWidth={2.5} />
              <Area dataKey="gastos" type="monotone" stroke="#d94b8c" fill="#d94b8c" fillOpacity={0.08} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard eyebrow="Servicios" title="Ingreso por categoría">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={serviceIncome} layout="vertical" margin={{ top: 5, right: 15, left: 5, bottom: 0 }}>
              <CartesianGrid stroke="#322629" horizontal={false} strokeDasharray="3 6" />
              <XAxis type="number" stroke="#7f6f69" tickLine={false} axisLine={false} fontSize={11} tickFormatter={(value) => `${value / 1000}k`} />
              <YAxis type="category" dataKey="name" width={74} stroke="#b8a49b" tickLine={false} axisLine={false} fontSize={11} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="value" radius={[0, 3, 3, 0]} barSize={18}>
                {serviceIncome.map((entry) => <Cell key={entry.key} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>
      <div className="mt-5 border border-[#d9a84e]/12 bg-[#100a0c]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d9a84e]/10 px-5 py-4 sm:px-6">
          <div><p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#d94b8c]">Control</p><h2 className="mt-1 font-serif text-2xl">Registro de gastos</h2></div>
          <div className="flex gap-2">
            <button
              onClick={previewFinanceReport}
              className="flex h-10 items-center gap-2 border border-[#d9a84e]/18 px-4 text-xs font-bold text-[#b8a49b] hover:text-white"
            >
              <Download size={15} /> Descargar PDF
            </button>
            <button onClick={onAdd} className="flex h-10 items-center gap-2 bg-[#d9a84e] px-4 text-xs font-extrabold text-[#080506]"><Plus size={15} /> Registrar gasto</button>
          </div>
        </div>
        <div className="space-y-3 p-3 md:hidden">
          {expenseRows.map((item) => (
            <article
              key={item.id}
              className="border border-[#d9a84e]/12 bg-black/15 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-[#7f6f69]">
                    {formatDate(item.date, { year: "numeric" })}
                  </p>
                  <h3 className="mt-2 font-bold">{item.description}</h3>
                  <p className="mt-1 text-xs text-[#7f6f69]">{item.category}</p>
                </div>
                <strong className="shrink-0 text-[#d94b8c]">
                  -{formatMoney(item.amount)}
                </strong>
              </div>
              <div className="mt-4 border-y border-[#d9a84e]/10 py-3">
                {item.service === "general" ? (
                  <span className="text-xs text-[#7f6f69]">
                    General / Todo el negocio
                  </span>
                ) : (
                  <ServicePill service={item.service} />
                )}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <MobileActionButton
                  label="Editar"
                  icon={Edit3}
                  onClick={() => onEdit(item)}
                />
                <MobileActionButton
                  label="Eliminar"
                  icon={Trash2}
                  danger
                  onClick={() => onDelete(item.id)}
                />
              </div>
            </article>
          ))}
          {!expenseRows.length && (
            <EmptyState label="No hay gastos en este período." />
          )}
        </div>
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[760px] text-left">
            <thead className="border-b border-[#d9a84e]/10 bg-black/15 text-[0.62rem] uppercase tracking-[0.18em] text-[#7f6f69]"><tr><th className="px-5 py-4">Fecha</th><th className="px-5 py-4">Descripción</th><th className="px-5 py-4">Categoría</th><th className="px-5 py-4">Servicio</th><th className="px-5 py-4">Monto</th><th className="px-5 py-4 text-right">Acciones</th></tr></thead>
            <tbody className="divide-y divide-[#d9a84e]/8">
              {expenseRows.map((item) => (
                <tr key={item.id} className="text-sm hover:bg-white/[0.02]">
                  <td className="px-5 py-4 text-[#b8a49b]">{formatDate(item.date, { year: "numeric" })}</td>
                  <td className="px-5 py-4 font-bold">{item.description}</td>
                  <td className="px-5 py-4 text-[#b8a49b]">{item.category}</td>
                  <td className="px-5 py-4">{item.service === "general" ? <span className="text-[#7f6f69]">General</span> : <ServicePill service={item.service} />}</td>
                  <td className="px-5 py-4 font-bold text-[#d94b8c]">−{formatMoney(item.amount)}</td>
                  <td className="px-5 py-4"><div className="flex justify-end gap-1"><IconButton label="Editar gasto" icon={Edit3} onClick={() => onEdit(item)} /><IconButton label="Eliminar gasto" icon={Trash2} danger onClick={() => onDelete(item.id)} /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
          {!expenseRows.length && <EmptyState label="No hay gastos en este período." />}
        </div>
      </div>
      {reportPreview && (
        <FinanceReportPreview
          report={reportPreview}
          onClose={() => setReportPreview(null)}
        />
      )}
    </>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const styles: Record<Status, string> = { confirmada: "border-[#d9a84e]/30 bg-[#d9a84e]/10 text-[#f3d48a]", completada: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300", pendiente: "border-[#d94b8c]/30 bg-[#d94b8c]/10 text-[#ef9bc2]", cancelada: "border-white/10 bg-white/5 text-[#7f6f69]" };
  return <span className={`inline-flex border px-2 py-1 text-[0.58rem] font-bold uppercase tracking-[0.12em] ${styles[status]}`}>{status}</span>;
}

function ServicePill({ service }: { service: ServiceKey }) {
  return <span className="inline-flex items-center gap-2 text-xs font-bold" style={{ color: SERVICES[service].color }}><i className="size-1.5" style={{ background: SERVICES[service].color }} />{SERVICES[service].label}</span>;
}

function IconButton({ label, icon: Icon, onClick, danger }: { label: string; icon: typeof Edit3; onClick: () => void; danger?: boolean }) {
  return <button aria-label={label} title={label} onClick={onClick} className={`flex size-9 items-center justify-center transition ${danger ? "text-[#7f6f69] hover:bg-[#d94b8c]/10 hover:text-[#d94b8c]" : "text-[#7f6f69] hover:bg-[#d9a84e]/10 hover:text-[#d9a84e]"}`}><Icon size={15} /></button>;
}

function MobileActionButton({
  label,
  icon: Icon,
  onClick,
  danger,
}: {
  label: string;
  icon: typeof Edit3;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-11 items-center justify-center gap-2 border text-xs font-bold transition ${
        danger
          ? "border-[#d94b8c]/18 text-[#b8a49b] hover:bg-[#d94b8c]/10 hover:text-[#d94b8c]"
          : "border-[#d9a84e]/16 text-[#b8a49b] hover:bg-[#d9a84e]/10 hover:text-[#f3d48a]"
      }`}
    >
      <Icon size={15} />
      {label}
    </button>
  );
}

function EmptyState({ label }: { label: string }) {
  return <div className="flex min-h-40 flex-col items-center justify-center gap-3 p-8 text-center text-sm text-[#7f6f69]"><MoreHorizontal size={24} />{label}</div>;
}

function ModalShell({ title, eyebrow, onClose, children }: { title: string; eyebrow: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/78 p-4 backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="max-h-[92vh] w-full max-w-[620px] overflow-y-auto border border-[#d9a84e]/22 bg-[#120c0d] shadow-[0_40px_120px_rgba(0,0,0,0.65)]">
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#d9a84e]/12 bg-[#120c0d]/95 px-6 py-5 backdrop-blur">
          <div><p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#d94b8c]">{eyebrow}</p><h2 className="mt-1 font-serif text-3xl">{title}</h2></div>
          <button onClick={onClose} className="flex size-9 items-center justify-center text-[#7f6f69] hover:text-white"><X size={19} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function FormActions({ onClose, label }: { onClose: () => void; label: string }) {
  return <div className="flex justify-end gap-3 border-t border-[#d9a84e]/10 pt-5"><button type="button" onClick={onClose} className="h-11 border border-[#d9a84e]/16 px-5 text-xs font-bold text-[#b8a49b] hover:text-white">Cancelar</button><button type="submit" className="flex h-11 items-center gap-2 bg-[#d9a84e] px-5 text-xs font-extrabold text-[#080506] hover:bg-[#f3d48a]"><Check size={16} /> {label}</button></div>;
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return <label className={className}><span className="mb-2 block text-[0.62rem] font-bold uppercase tracking-[0.17em] text-[#b8a49b]">{label}</span>{children}</label>;
}

function ClientModal({ item, onClose, onSave }: { item?: Client; onClose: () => void; onSave: (data: Omit<Client, "id" | "visits"> & { id?: number }) => void }) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    onSave({ id: item?.id, name: String(form.get("name")), phone: String(form.get("phone")), email: String(form.get("email")), service: String(form.get("service")) as ServiceKey, joined: String(form.get("joined")), notes: String(form.get("notes")) });
  }
  return (
    <ModalShell eyebrow="Ficha de clienta" title={item ? "Editar clienta" : "Incorporar clienta"} onClose={onClose}>
      <form onSubmit={submit} className="grid gap-5 p-6 sm:grid-cols-2">
        <Field label="Nombre completo" className="sm:col-span-2"><input name="name" required defaultValue={item?.name} placeholder="Ej. María López" className={fieldClass} /></Field>
        <Field label="Teléfono"><input name="phone" required defaultValue={item?.phone} placeholder="809-555-0000" className={fieldClass} /></Field>
        <Field label="Correo electrónico"><input name="email" type="email" defaultValue={item?.email} placeholder="correo@email.com" className={fieldClass} /></Field>
        <Field label="Servicio de interés"><select name="service" defaultValue={item?.service ?? "masajes"} className={fieldClass}>{serviceKeys.map((key) => <option value={key} key={key}>{SERVICES[key].label}</option>)}</select></Field>
        <Field label="Fecha de ingreso"><input name="joined" type="date" required defaultValue={item?.joined ?? formatInputDate(new Date())} className={`${fieldClass} [color-scheme:dark]`} /></Field>
        <Field label="Notas y preferencias" className="sm:col-span-2"><textarea name="notes" defaultValue={item?.notes} rows={3} placeholder="Preferencias, sensibilidad, detalles importantes…" className={`${fieldClass} h-auto py-3`} /></Field>
        <div className="sm:col-span-2"><FormActions onClose={onClose} label={item ? "Guardar cambios" : "Crear clienta"} /></div>
      </form>
    </ModalShell>
  );
}

function AppointmentModal({
  item,
  clients,
  initialClientId,
  initialService,
  onClose,
  onSave,
}: {
  item?: Appointment;
  clients: Client[];
  initialClientId?: number;
  initialService?: ServiceKey;
  onClose: () => void;
  onSave: (data: Omit<Appointment, "id"> & { id?: number }) => void;
}) {
  const [service, setService] = useState<ServiceKey>(
    item?.service ?? initialService ?? "masajes",
  );
  const defaultPackage = item?.package ?? SERVICES[service].packages[0].name;
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const packageName = String(form.get("package"));
    const packageItem = SERVICES[service].packages.find((entry) => entry.name === packageName);
    onSave({ id: item?.id, clientId: Number(form.get("clientId")), date: String(form.get("date")), time: String(form.get("time")), service, package: packageName, amount: Number(form.get("amount")) || packageItem?.price || 0, status: String(form.get("status")) as Status, location: String(form.get("location")) as "Estudio" | "Domicilio" });
  }
  return (
    <ModalShell eyebrow="Agenda CARELA" title={item ? "Editar cita" : "Reservar una cita"} onClose={onClose}>
      <form onSubmit={submit} className="grid gap-5 p-6 sm:grid-cols-2">
        <Field label="Clienta" className="sm:col-span-2"><select name="clientId" defaultValue={item?.clientId ?? initialClientId ?? clients[0]?.id} required className={fieldClass}>{clients.map((client) => <option key={client.id} value={client.id}>{client.name} · {client.phone}</option>)}</select></Field>
        <Field label="Fecha"><input name="date" type="date" required defaultValue={item?.date ?? formatInputDate(new Date())} className={`${fieldClass} [color-scheme:dark]`} /></Field>
        <Field label="Hora"><input name="time" type="time" required defaultValue={item?.time ?? "10:00"} className={`${fieldClass} [color-scheme:dark]`} /></Field>
        <Field label="Servicio"><select name="service" value={service} onChange={(event) => setService(event.target.value as ServiceKey)} className={fieldClass}>{serviceKeys.map((key) => <option key={key} value={key}>{SERVICES[key].label}</option>)}</select></Field>
        <Field label="Paquete"><select key={service} name="package" defaultValue={defaultPackage} className={fieldClass}>{SERVICES[service].packages.map((entry) => <option key={entry.name} value={entry.name}>{entry.name} · {formatMoney(entry.price)}</option>)}</select></Field>
        <Field label="Precio final"><input name="amount" type="number" min="0" defaultValue={item?.amount ?? SERVICES[service].packages[0].price} className={fieldClass} /></Field>
        <Field label="Modalidad"><select name="location" defaultValue={item?.location ?? "Estudio"} className={fieldClass}><option>Estudio</option><option>Domicilio</option></select></Field>
        <Field label="Estado" className="sm:col-span-2"><select name="status" defaultValue={item?.status ?? "confirmada"} className={fieldClass}><option value="confirmada">Confirmada</option><option value="pendiente">Pendiente</option><option value="completada">Completada</option><option value="cancelada">Cancelada</option></select></Field>
        <div className="sm:col-span-2"><FormActions onClose={onClose} label={item ? "Guardar cambios" : "Confirmar cita"} /></div>
      </form>
    </ModalShell>
  );
}

function ExpenseModal({ item, onClose, onSave }: { item?: Expense; onClose: () => void; onSave: (data: Omit<Expense, "id"> & { id?: number }) => void }) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    onSave({ id: item?.id, date: String(form.get("date")), category: String(form.get("category")), description: String(form.get("description")), amount: Number(form.get("amount")), service: String(form.get("service")) as ServiceKey | "general" });
  }
  return (
    <ModalShell eyebrow="Control de gastos" title={item ? "Editar gasto" : "Registrar un gasto"} onClose={onClose}>
      <form onSubmit={submit} className="grid gap-5 p-6 sm:grid-cols-2">
        <Field label="Fecha"><input name="date" type="date" required defaultValue={item?.date ?? formatInputDate(new Date())} className={`${fieldClass} [color-scheme:dark]`} /></Field>
        <Field label="Categoría"><select name="category" defaultValue={item?.category ?? "Insumos"} className={fieldClass}><option>Insumos</option><option>Operación</option><option>Transporte</option><option>Marketing</option><option>Otro</option></select></Field>
        <Field label="Descripción" className="sm:col-span-2"><input name="description" required defaultValue={item?.description} placeholder="Ej. Aceites y aromas" className={fieldClass} /></Field>
        <Field label="Monto RD$"><input name="amount" type="number" min="1" required defaultValue={item?.amount} placeholder="0" className={fieldClass} /></Field>
        <Field label="Servicio relacionado"><select name="service" defaultValue={item?.service ?? "general"} className={fieldClass}><option value="general">General / Todo el negocio</option>{serviceKeys.map((key) => <option key={key} value={key}>{SERVICES[key].label}</option>)}</select></Field>
        <div className="sm:col-span-2"><FormActions onClose={onClose} label={item ? "Guardar cambios" : "Registrar gasto"} /></div>
      </form>
    </ModalShell>
  );
}
