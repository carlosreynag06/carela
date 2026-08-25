create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name text not null check (char_length(trim(name)) between 2 and 120),
  phone text not null check (char_length(trim(phone)) between 7 and 30),
  email text not null default '' check (char_length(email) <= 254),
  service text not null check (service in ('masajes', 'cejas', 'pestanas', 'depilacion')),
  joined date not null default current_date,
  notes text not null default '' check (char_length(notes) <= 2000),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint clients_carela_owner check (owner_id = 'd288f91f-365f-450a-89bc-a182c7c42afc'::uuid)
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  appointment_date date not null,
  appointment_time time not null,
  service text not null check (service in ('masajes', 'cejas', 'pestanas', 'depilacion')),
  package_name text not null check (char_length(trim(package_name)) between 1 and 120),
  amount numeric(12, 2) not null check (amount >= 0),
  status text not null default 'confirmada' check (status in ('confirmada', 'completada', 'pendiente', 'cancelada')),
  location text not null default 'Estudio' check (location in ('Estudio', 'Domicilio')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint appointments_carela_owner check (owner_id = 'd288f91f-365f-450a-89bc-a182c7c42afc'::uuid)
);

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  expense_date date not null,
  category text not null check (char_length(trim(category)) between 1 and 80),
  description text not null check (char_length(trim(description)) between 1 and 240),
  amount numeric(12, 2) not null check (amount > 0),
  service text not null default 'general' check (service in ('masajes', 'cejas', 'pestanas', 'depilacion', 'general')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint expenses_carela_owner check (owner_id = 'd288f91f-365f-450a-89bc-a182c7c42afc'::uuid)
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null check (char_length(trim(title)) between 2 and 140),
  service text not null check (service in ('masajes', 'cejas', 'pestanas', 'depilacion')),
  image_path text not null unique check (char_length(trim(image_path)) between 3 and 500),
  is_pinned boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint gallery_items_carela_owner check (owner_id = 'd288f91f-365f-450a-89bc-a182c7c42afc'::uuid)
);

create index if not exists clients_owner_id_idx on public.clients(owner_id);
create index if not exists clients_service_idx on public.clients(service);
create index if not exists appointments_owner_id_idx on public.appointments(owner_id);
create index if not exists appointments_client_id_idx on public.appointments(client_id);
create index if not exists appointments_date_service_idx on public.appointments(appointment_date, service);
create index if not exists appointments_status_idx on public.appointments(status);
create index if not exists expenses_owner_id_idx on public.expenses(owner_id);
create index if not exists expenses_date_service_idx on public.expenses(expense_date, service);
create index if not exists gallery_items_owner_id_idx on public.gallery_items(owner_id);
create index if not exists gallery_items_service_order_idx on public.gallery_items(service, is_pinned desc, created_at desc);

drop trigger if exists clients_set_updated_at on public.clients;
create trigger clients_set_updated_at before update on public.clients
for each row execute function public.set_updated_at();

drop trigger if exists appointments_set_updated_at on public.appointments;
create trigger appointments_set_updated_at before update on public.appointments
for each row execute function public.set_updated_at();

drop trigger if exists expenses_set_updated_at on public.expenses;
create trigger expenses_set_updated_at before update on public.expenses
for each row execute function public.set_updated_at();

drop trigger if exists gallery_items_set_updated_at on public.gallery_items;
create trigger gallery_items_set_updated_at before update on public.gallery_items
for each row execute function public.set_updated_at();

alter table public.clients enable row level security;
alter table public.appointments enable row level security;
alter table public.expenses enable row level security;
alter table public.gallery_items enable row level security;

revoke all on table public.clients from anon, authenticated;
revoke all on table public.appointments from anon, authenticated;
revoke all on table public.expenses from anon, authenticated;
revoke all on table public.gallery_items from anon, authenticated;

grant select, insert, update, delete on table public.clients to authenticated;
grant select, insert, update, delete on table public.appointments to authenticated;
grant select, insert, update, delete on table public.expenses to authenticated;
grant select, insert, update, delete on table public.gallery_items to authenticated;
grant select on table public.gallery_items to anon;

drop policy if exists "Owner can read clients" on public.clients;
create policy "Owner can read clients" on public.clients for select to authenticated
using ((select auth.uid()) = owner_id and owner_id = 'd288f91f-365f-450a-89bc-a182c7c42afc'::uuid);
drop policy if exists "Owner can create clients" on public.clients;
create policy "Owner can create clients" on public.clients for insert to authenticated
with check ((select auth.uid()) = owner_id and owner_id = 'd288f91f-365f-450a-89bc-a182c7c42afc'::uuid);
drop policy if exists "Owner can update clients" on public.clients;
create policy "Owner can update clients" on public.clients for update to authenticated
using ((select auth.uid()) = owner_id and owner_id = 'd288f91f-365f-450a-89bc-a182c7c42afc'::uuid)
with check ((select auth.uid()) = owner_id and owner_id = 'd288f91f-365f-450a-89bc-a182c7c42afc'::uuid);
drop policy if exists "Owner can delete clients" on public.clients;
create policy "Owner can delete clients" on public.clients for delete to authenticated
using ((select auth.uid()) = owner_id and owner_id = 'd288f91f-365f-450a-89bc-a182c7c42afc'::uuid);

drop policy if exists "Owner can read appointments" on public.appointments;
create policy "Owner can read appointments" on public.appointments for select to authenticated
using ((select auth.uid()) = owner_id and owner_id = 'd288f91f-365f-450a-89bc-a182c7c42afc'::uuid);
drop policy if exists "Owner can create appointments" on public.appointments;
create policy "Owner can create appointments" on public.appointments for insert to authenticated
with check (
  (select auth.uid()) = owner_id
  and owner_id = 'd288f91f-365f-450a-89bc-a182c7c42afc'::uuid
  and exists (
    select 1 from public.clients
    where clients.id = appointments.client_id
      and clients.owner_id = appointments.owner_id
  )
);
drop policy if exists "Owner can update appointments" on public.appointments;
create policy "Owner can update appointments" on public.appointments for update to authenticated
using ((select auth.uid()) = owner_id and owner_id = 'd288f91f-365f-450a-89bc-a182c7c42afc'::uuid)
with check (
  (select auth.uid()) = owner_id
  and owner_id = 'd288f91f-365f-450a-89bc-a182c7c42afc'::uuid
  and exists (
    select 1 from public.clients
    where clients.id = appointments.client_id
      and clients.owner_id = appointments.owner_id
  )
);
drop policy if exists "Owner can delete appointments" on public.appointments;
create policy "Owner can delete appointments" on public.appointments for delete to authenticated
using ((select auth.uid()) = owner_id and owner_id = 'd288f91f-365f-450a-89bc-a182c7c42afc'::uuid);

drop policy if exists "Owner can read expenses" on public.expenses;
create policy "Owner can read expenses" on public.expenses for select to authenticated
using ((select auth.uid()) = owner_id and owner_id = 'd288f91f-365f-450a-89bc-a182c7c42afc'::uuid);
drop policy if exists "Owner can create expenses" on public.expenses;
create policy "Owner can create expenses" on public.expenses for insert to authenticated
with check ((select auth.uid()) = owner_id and owner_id = 'd288f91f-365f-450a-89bc-a182c7c42afc'::uuid);
drop policy if exists "Owner can update expenses" on public.expenses;
create policy "Owner can update expenses" on public.expenses for update to authenticated
using ((select auth.uid()) = owner_id and owner_id = 'd288f91f-365f-450a-89bc-a182c7c42afc'::uuid)
with check ((select auth.uid()) = owner_id and owner_id = 'd288f91f-365f-450a-89bc-a182c7c42afc'::uuid);
drop policy if exists "Owner can delete expenses" on public.expenses;
create policy "Owner can delete expenses" on public.expenses for delete to authenticated
using ((select auth.uid()) = owner_id and owner_id = 'd288f91f-365f-450a-89bc-a182c7c42afc'::uuid);

drop policy if exists "Gallery is publicly readable" on public.gallery_items;
create policy "Gallery is publicly readable" on public.gallery_items for select to anon, authenticated
using (true);
drop policy if exists "Owner can create gallery items" on public.gallery_items;
create policy "Owner can create gallery items" on public.gallery_items for insert to authenticated
with check ((select auth.uid()) = owner_id and owner_id = 'd288f91f-365f-450a-89bc-a182c7c42afc'::uuid);
drop policy if exists "Owner can update gallery items" on public.gallery_items;
create policy "Owner can update gallery items" on public.gallery_items for update to authenticated
using ((select auth.uid()) = owner_id and owner_id = 'd288f91f-365f-450a-89bc-a182c7c42afc'::uuid)
with check ((select auth.uid()) = owner_id and owner_id = 'd288f91f-365f-450a-89bc-a182c7c42afc'::uuid);
drop policy if exists "Owner can delete gallery items" on public.gallery_items;
create policy "Owner can delete gallery items" on public.gallery_items for delete to authenticated
using ((select auth.uid()) = owner_id and owner_id = 'd288f91f-365f-450a-89bc-a182c7c42afc'::uuid);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'gallery',
  'gallery',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Owner can inspect gallery objects" on storage.objects;
create policy "Owner can inspect gallery objects" on storage.objects for select to authenticated
using (
  bucket_id = 'gallery'
  and owner_id = (select auth.uid()::text)
  and (select auth.uid()) = 'd288f91f-365f-450a-89bc-a182c7c42afc'::uuid
);
drop policy if exists "Owner can upload gallery objects" on storage.objects;
create policy "Owner can upload gallery objects" on storage.objects for insert to authenticated
with check (
  bucket_id = 'gallery'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
  and (select auth.uid()) = 'd288f91f-365f-450a-89bc-a182c7c42afc'::uuid
);
drop policy if exists "Owner can update gallery objects" on storage.objects;
create policy "Owner can update gallery objects" on storage.objects for update to authenticated
using (
  bucket_id = 'gallery'
  and owner_id = (select auth.uid()::text)
  and (select auth.uid()) = 'd288f91f-365f-450a-89bc-a182c7c42afc'::uuid
)
with check (
  bucket_id = 'gallery'
  and owner_id = (select auth.uid()::text)
  and (select auth.uid()) = 'd288f91f-365f-450a-89bc-a182c7c42afc'::uuid
);
drop policy if exists "Owner can delete gallery objects" on storage.objects;
create policy "Owner can delete gallery objects" on storage.objects for delete to authenticated
using (
  bucket_id = 'gallery'
  and owner_id = (select auth.uid()::text)
  and (select auth.uid()) = 'd288f91f-365f-450a-89bc-a182c7c42afc'::uuid
);
