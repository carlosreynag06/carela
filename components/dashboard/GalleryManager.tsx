"use client";

import Image from "next/image";
import {
  Check,
  Edit3,
  ImageIcon,
  ImagePlus,
  Pin,
  PinOff,
  Plus,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import {
  galleryServiceInfo,
  galleryServiceOrder,
  initialGalleryItems,
  sortGalleryItems,
  type GalleryItem,
  type GalleryServiceKey,
} from "@/data/gallery";

type Draft = {
  title: string;
  service: GalleryServiceKey;
  imageUrl: string;
  isPinned: boolean;
};

const emptyDraft: Draft = {
  title: "",
  service: "masajes",
  imageUrl: "",
  isPinned: false,
};

const fieldClass =
  "h-12 w-full border border-[#d9a84e]/18 bg-[#0d090a] px-4 text-sm text-[#f7efe7] outline-none transition placeholder:text-[#7f6f69] focus:border-[#d9a84e] focus:ring-1 focus:ring-[#d9a84e]/20";

export function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>(initialGalleryItems);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [serviceFilter, setServiceFilter] = useState<GalleryServiceKey | "todos">(
    "todos",
  );
  const [search, setSearch] = useState("");
  const [fileName, setFileName] = useState("");
  const [notice, setNotice] = useState<
    { tone: "success" | "error"; message: string } | null
  >(null);
  const formRef = useRef<HTMLFormElement>(null);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    return sortGalleryItems(
      items.filter(
        (item) =>
          (serviceFilter === "todos" || item.service === serviceFilter) &&
          (!query || item.title.toLowerCase().includes(query)),
      ),
    );
  }, [items, search, serviceFilter]);

  const pinnedCount = items.filter((item) => item.isPinned).length;

  function resetForm() {
    setDraft(emptyDraft);
    setEditingId(null);
    setFileName("");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(null);

    if (!draft.title.trim()) {
      setNotice({ tone: "error", message: "Escribe un título para continuar." });
      return;
    }

    if (!draft.imageUrl) {
      setNotice({ tone: "error", message: "Selecciona una imagen para continuar." });
      return;
    }

    const existing = items.find((item) => item.id === editingId);
    const item: GalleryItem = {
      id: existing?.id ?? `gallery-${Date.now()}`,
      title: draft.title.trim(),
      service: draft.service,
      imageUrl: draft.imageUrl,
      isPinned: draft.isPinned,
      createdAt: existing?.createdAt ?? new Date().toISOString(),
    };

    setItems((current) =>
      existing
        ? current.map((entry) => (entry.id === existing.id ? item : entry))
        : [item, ...current],
    );
    setNotice({
      tone: "success",
      message: existing
        ? "Foto actualizada en esta demostración."
        : "Foto agregada a la galería de demostración.",
    });
    resetForm();
  }

  function handleImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setNotice({ tone: "error", message: "Selecciona un archivo de imagen." });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setDraft((current) => ({ ...current, imageUrl: String(reader.result) }));
      setFileName(file.name);
      setNotice(null);
    };
    reader.readAsDataURL(file);
  }

  function startEditing(item: GalleryItem) {
    setEditingId(item.id);
    setDraft({
      title: item.title,
      service: item.service,
      imageUrl: item.imageUrl,
      isPinned: item.isPinned,
    });
    setFileName("Imagen actual");
    setNotice(null);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function togglePinned(id: string) {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, isPinned: !item.isPinned } : item,
      ),
    );
  }

  function deleteItem(id: string) {
    if (!window.confirm("¿Eliminar esta foto de la demostración?")) return;
    setItems((current) => current.filter((item) => item.id !== id));
    if (editingId === id) resetForm();
  }

  return (
    <div className="mt-8 space-y-8">
      <section className="grid gap-4 sm:grid-cols-3">
        <GalleryMetric label="Fotos publicadas" value={items.length} icon={ImagePlus} />
        <GalleryMetric label="Servicios" value={galleryServiceOrder.length} icon={ImageIcon} />
        <GalleryMetric label="Anclados" value={pinnedCount} icon={Pin} />
      </section>

      <section className="grid overflow-hidden border border-[#d9a84e]/14 bg-[#100a0c] shadow-[0_22px_70px_rgba(0,0,0,0.28)] xl:grid-cols-[0.72fr_1.28fr]">
        <div className="relative border-b border-[#d9a84e]/12 bg-[linear-gradient(145deg,rgba(217,168,78,0.11),rgba(143,31,84,0.08),transparent_72%)] p-6 sm:p-8 xl:border-b-0 xl:border-r">
          <span className="flex size-12 items-center justify-center border border-[#d9a84e]/28 bg-[#d9a84e]/8 text-[#d9a84e]">
            <Plus size={20} />
          </span>
          <p className="mt-7 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-[#d94b8c]">
            Fotos públicas
          </p>
          <h2 className="mt-3 max-w-lg font-serif text-4xl leading-tight text-[#f7efe7]">
            {editingId ? "Editar foto" : "Agregar foto"}
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-7 text-[#b8a49b]">
            Organiza cada foto por servicio. Las fotos ancladas aparecerán antes
            que el contenido regular en su sección de la galería.
          </p>

          <div className="mt-8 border-l-2 border-[#d9a84e]/45 pl-4">
            <p className="text-xs font-bold text-[#f3d48a]">Demostración local</p>
            <p className="mt-1 text-xs leading-6 text-[#7f6f69]">
              Los cambios funcionan en el navegador y se reinician al actualizar.
              No hay almacenamiento ni Supabase conectado.
            </p>
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={submit}
          className="scroll-mt-24 grid gap-5 p-5 sm:grid-cols-2 sm:p-8"
        >
          <AdminField id="gallery-title" label="Título" className="sm:col-span-2">
            <input
              id="gallery-title"
              required
              value={draft.title}
              onChange={(event) =>
                setDraft((current) => ({ ...current, title: event.target.value }))
              }
              placeholder="Ej. Resultado natural de cejas"
              className={fieldClass}
            />
          </AdminField>

          <AdminField
            id="gallery-service"
            label="Servicio"
            className="sm:col-span-2"
          >
            <select
              id="gallery-service"
              value={draft.service}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  service: event.target.value as GalleryServiceKey,
                }))
              }
              className={fieldClass}
            >
              {galleryServiceOrder.map((service) => (
                <option key={service} value={service}>
                  {galleryServiceInfo[service].title}
                </option>
              ))}
            </select>
          </AdminField>

          <AdminField
            id="gallery-image-upload"
            label="Imagen"
            className="sm:col-span-2"
          >
            <label
              htmlFor="gallery-image-upload"
              className="group grid cursor-pointer gap-4 border border-dashed border-[#d9a84e]/28 bg-[#0d090a] p-4 transition hover:border-[#d9a84e]/62 sm:grid-cols-[7rem_1fr] sm:items-center"
            >
              <input
                id="gallery-image-upload"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleImage}
              />
              <span className="relative flex aspect-square items-center justify-center overflow-hidden bg-[#171012] text-[#d9a84e]">
                {draft.imageUrl ? (
                  <Image
                    src={draft.imageUrl}
                    alt="Vista previa de la imagen seleccionada"
                    fill
                    unoptimized={draft.imageUrl.startsWith("data:")}
                    className="object-cover"
                  />
                ) : (
                  <Upload size={24} />
                )}
              </span>
              <span>
                <span className="block text-sm font-bold text-[#f7efe7]">
                  {fileName || "Seleccionar una imagen"}
                </span>
                <span className="mt-2 block text-xs leading-6 text-[#7f6f69]">
                  Vista previa local para revisar el flujo. El archivo no se
                  sube a ningún servicio externo.
                </span>
              </span>
            </label>
          </AdminField>

          <div className="sm:col-span-2">
            <button
              type="button"
              role="switch"
              aria-checked={draft.isPinned}
              onClick={() =>
                setDraft((current) => ({
                  ...current,
                  isPinned: !current.isPinned,
                }))
              }
              className="flex w-full items-center justify-between gap-5 border border-[#d9a84e]/14 bg-[#0d090a] p-4 text-left transition hover:border-[#d9a84e]/36 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f3d48a]"
            >
              <span className="flex items-start gap-3">
                <Pin className="mt-0.5 shrink-0 text-[#d9a84e]" size={17} />
                <span>
                  <span className="block text-sm font-bold text-[#f7efe7]">
                    Anclar esta foto
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-[#7f6f69]">
                    Aparecerá antes del contenido regular del mismo servicio.
                  </span>
                </span>
              </span>
              <span
                className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                  draft.isPinned ? "bg-[#d9a84e]" : "bg-white/10"
                }`}
              >
                <span
                  className={`absolute top-1 size-5 rounded-full transition ${
                    draft.isPinned
                      ? "left-6 bg-[#080506]"
                      : "left-1 bg-[#7f6f69]"
                  }`}
                />
              </span>
            </button>
          </div>

          {notice ? (
            <div
              role="status"
              className={`sm:col-span-2 flex items-center gap-2 border px-4 py-3 text-xs font-semibold ${
                notice.tone === "success"
                  ? "border-emerald-500/24 bg-emerald-500/8 text-emerald-300"
                  : "border-[#d94b8c]/28 bg-[#d94b8c]/8 text-[#ef9bc2]"
              }`}
            >
              {notice.tone === "success" ? <Check size={15} /> : <X size={15} />}
              {notice.message}
            </div>
          ) : null}

          <div className="flex flex-col-reverse gap-3 border-t border-[#d9a84e]/10 pt-5 sm:col-span-2 sm:flex-row sm:justify-end">
            {editingId ? (
              <button
                type="button"
                onClick={resetForm}
                className="h-12 border border-[#d9a84e]/16 px-5 text-xs font-bold text-[#b8a49b] transition hover:text-white"
              >
                Cancelar edición
              </button>
            ) : null}
            <button
              type="submit"
              className="flex h-12 items-center justify-center gap-2 bg-[#d9a84e] px-6 text-xs font-extrabold text-[#080506] transition hover:bg-[#f3d48a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3d48a]"
            >
              {editingId ? <Check size={16} /> : <Plus size={16} />}
              {editingId ? "Guardar cambios" : "Agregar foto"}
            </button>
          </div>
        </form>
      </section>

      <section className="border border-[#d9a84e]/14 bg-[#100a0c]">
        <div className="border-b border-[#d9a84e]/12 p-5 sm:p-7">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-[#d94b8c]">
                Biblioteca de fotos
              </p>
              <h2 className="mt-2 font-serif text-3xl text-[#f7efe7] sm:text-4xl">
                Galería publicada
              </h2>
              <p className="mt-2 text-sm text-[#7f6f69]">
                {filteredItems.length} resultados en esta vista
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="relative sm:min-w-56">
                <span className="sr-only">Buscar por título</span>
                <Search
                  size={16}
                  className="pointer-events-none absolute left-3 top-3.5 text-[#7f6f69]"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar por título"
                  className={`${fieldClass} pl-10`}
                />
              </label>
              <label>
                <span className="sr-only">Filtrar por servicio</span>
                <select
                  aria-label="Filtrar por servicio"
                  value={serviceFilter}
                  onChange={(event) =>
                    setServiceFilter(
                      event.target.value as GalleryServiceKey | "todos",
                    )
                  }
                  className={fieldClass}
                >
                  <option value="todos">Todos los servicios</option>
                  {galleryServiceOrder.map((service) => (
                    <option key={service} value={service}>
                      {galleryServiceInfo[service].shortTitle}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>

        <div className="divide-y divide-[#d9a84e]/10">
          {filteredItems.length ? (
            filteredItems.map((item) => (
              <AdminGalleryRow
                key={item.id}
                item={item}
                onEdit={startEditing}
                onDelete={deleteItem}
                onTogglePinned={togglePinned}
              />
            ))
          ) : (
            <div className="flex min-h-48 flex-col items-center justify-center gap-3 p-8 text-center">
              <Search size={24} className="text-[#d9a84e]" />
              <p className="font-serif text-2xl text-[#f7efe7]">
                No encontramos fotos
              </p>
              <p className="text-sm text-[#7f6f69]">
                Prueba otro servicio o término de búsqueda.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function GalleryMetric({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: typeof ImageIcon;
}) {
  return (
    <article className="flex items-center justify-between border border-[#d9a84e]/12 bg-[#100a0c] p-5">
      <div>
        <p className="text-[0.62rem] font-bold uppercase tracking-[0.19em] text-[#7f6f69]">
          {label}
        </p>
        <p className="mt-2 font-serif text-4xl text-[#f7efe7]">{value}</p>
      </div>
      <span className="flex size-11 items-center justify-center border border-[#d9a84e]/20 bg-[#d9a84e]/8 text-[#d9a84e]">
        <Icon size={19} />
      </span>
    </article>
  );
}

function AdminField({
  id,
  label,
  children,
  className = "",
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#b8a49b]">
        {label}
      </label>
      {children}
    </div>
  );
}

function AdminGalleryRow({
  item,
  onEdit,
  onDelete,
  onTogglePinned,
}: {
  item: GalleryItem;
  onEdit: (item: GalleryItem) => void;
  onDelete: (id: string) => void;
  onTogglePinned: (id: string) => void;
}) {
  const formattedDate = new Intl.DateTimeFormat("es-DO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(item.createdAt));

  return (
    <article className="grid gap-4 p-4 transition hover:bg-white/[0.018] sm:p-5 lg:grid-cols-[8.5rem_minmax(0,1fr)_10rem_8rem_auto] lg:items-center lg:gap-5">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#171012]">
        <Image
          src={item.imageUrl}
          alt=""
          fill
          unoptimized={item.imageUrl.startsWith("data:")}
          sizes="136px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 border border-[#d9a84e]/18 px-2 py-1 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-[#d9a84e]">
            <ImageIcon size={11} />
            Imagen
          </span>
          {item.isPinned ? (
            <span className="inline-flex items-center gap-1.5 bg-[#d94b8c]/12 px-2 py-1 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-[#ef9bc2]">
              <Pin size={11} fill="currentColor" />
              Anclado
            </span>
          ) : null}
        </div>
        <h3 className="mt-2 truncate font-serif text-xl text-[#f7efe7]">
          {item.title}
        </h3>
        <p className="mt-1 text-xs text-[#7f6f69] lg:hidden">
          {galleryServiceInfo[item.service].shortTitle} · {formattedDate}
        </p>
      </div>

      <p className="hidden text-sm font-semibold text-[#b8a49b] lg:block">
        {galleryServiceInfo[item.service].shortTitle}
      </p>
      <p className="hidden text-xs text-[#7f6f69] lg:block">{formattedDate}</p>

      <div className="grid grid-cols-3 gap-2 lg:flex lg:justify-end">
        <RowAction
          label={item.isPinned ? "Desanclar" : "Anclar"}
          icon={item.isPinned ? PinOff : Pin}
          onClick={() => onTogglePinned(item.id)}
        />
        <RowAction label="Editar" icon={Edit3} onClick={() => onEdit(item)} />
        <RowAction
          label="Eliminar"
          icon={Trash2}
          onClick={() => onDelete(item.id)}
          danger
        />
      </div>
    </article>
  );
}

function RowAction({
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
      aria-label={label}
      title={label}
      className={`flex min-h-10 items-center justify-center gap-2 border px-3 text-[0.66rem] font-bold transition lg:size-10 lg:px-0 ${
        danger
          ? "border-[#d94b8c]/16 text-[#7f6f69] hover:bg-[#d94b8c]/10 hover:text-[#d94b8c]"
          : "border-[#d9a84e]/14 text-[#7f6f69] hover:bg-[#d9a84e]/10 hover:text-[#d9a84e]"
      }`}
    >
      <Icon size={15} />
      <span className="lg:sr-only">{label}</span>
    </button>
  );
}
