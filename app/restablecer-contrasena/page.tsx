"use client";

import { Check, Eye, EyeOff, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    tone: "success" | "error";
    text: string;
  } | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    if (password.length < 8) {
      setMessage({
        tone: "error",
        text: "La contraseña debe tener al menos 8 caracteres.",
      });
      return;
    }
    if (password !== confirmation) {
      setMessage({ tone: "error", text: "Las contraseñas no coinciden." });
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage({
        tone: "error",
        text: "El enlace venció o no es válido. Solicita uno nuevo desde el inicio de sesión.",
      });
      setLoading(false);
      return;
    }

    await supabase.auth.signOut();
    setMessage({
      tone: "success",
      text: "Contraseña actualizada. Ya puedes iniciar sesión.",
    });
    setLoading(false);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080506] px-5 py-12 text-warm-cream">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(143,31,84,0.34),transparent_28%),radial-gradient(circle_at_88%_82%,rgba(217,168,78,0.16),transparent_26%)]" />
      <div className="relative w-full max-w-[520px] border border-champagne-gold/18 bg-[#120c0d]/92 p-7 shadow-[0_32px_100px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-10">
        <span className="flex size-12 items-center justify-center border border-champagne-gold/30 bg-champagne-gold/8 text-champagne-gold">
          <LockKeyhole size={20} />
        </span>
        <p className="mt-7 text-xs font-bold uppercase tracking-[0.25em] text-rose-pink">
          Acceso CARELA
        </p>
        <h1 className="mt-3 font-serif text-4xl text-champagne-gold">
          Crea una nueva contraseña
        </h1>
        <p className="mt-3 text-sm leading-7 text-muted-taupe">
          Usa una contraseña segura que solo tú conozcas.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-5">
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-warm-cream/70">
              Nueva contraseña
            </span>
            <span className="relative block">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={8}
                required
                autoComplete="new-password"
                className="h-14 w-full border border-champagne-gold/18 bg-background/70 px-4 pr-12 text-sm outline-none transition focus:border-champagne-gold"
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-0 top-0 flex size-14 items-center justify-center text-muted-taupe hover:text-champagne-gold"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </span>
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-warm-cream/70">
              Confirmar contraseña
            </span>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmation}
              onChange={(event) => setConfirmation(event.target.value)}
              minLength={8}
              required
              autoComplete="new-password"
              className="h-14 w-full border border-champagne-gold/18 bg-background/70 px-4 text-sm outline-none transition focus:border-champagne-gold"
            />
          </label>

          {message ? (
            <div
              role={message.tone === "error" ? "alert" : "status"}
              className={`border px-4 py-3 text-sm leading-6 ${
                message.tone === "success"
                  ? "border-emerald-500/28 bg-emerald-500/8 text-emerald-200"
                  : "border-rose-pink/28 bg-rose-pink/8 text-[#ef9bc2]"
              }`}
            >
              {message.text}
            </div>
          ) : null}

          {message?.tone === "success" ? (
            <Link
              href="/login"
              className="flex h-14 w-full items-center justify-center gap-2 bg-champagne-gold px-5 text-sm font-extrabold text-background"
            >
              <Check size={18} /> Volver a iniciar sesión
            </Link>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="flex h-14 w-full items-center justify-center bg-champagne-gold px-5 text-sm font-extrabold text-background transition hover:bg-soft-gold disabled:cursor-wait disabled:opacity-60"
            >
              {loading ? "Actualizando…" : "Guardar nueva contraseña"}
            </button>
          )}
        </form>
      </div>
    </main>
  );
}

