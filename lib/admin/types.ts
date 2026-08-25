export type ServiceKey = "masajes" | "cejas" | "pestanas" | "depilacion";

export type AppointmentStatus =
  | "confirmada"
  | "completada"
  | "pendiente"
  | "cancelada";

export type Client = {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: ServiceKey;
  joined: string;
  visits: number;
  notes: string;
};

export type Appointment = {
  id: string;
  clientId: string;
  date: string;
  time: string;
  service: ServiceKey;
  package: string;
  amount: number;
  status: AppointmentStatus;
  location: "Estudio" | "Domicilio";
};

export type Expense = {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  service: ServiceKey | "general";
};

export type AdminData = {
  clients: Client[];
  appointments: Appointment[];
  expenses: Expense[];
};

