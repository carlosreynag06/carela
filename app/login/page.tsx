"use client";

import { ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { carelaOwnerEmail, carelaOwnerId } from "@/lib/supabase/config";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(carelaOwnerEmail);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error || !data.user) {
        setErrorMessage(
          "No pudimos iniciar sesión. Revisa el correo y la contraseña.",
        );
        setLoading(false);
        return;
      }

      if (data.user.id !== carelaOwnerId) {
        await supabase.auth.signOut();
        setErrorMessage("Esta cuenta no tiene acceso al estudio de gestión.");
        setLoading(false);
        return;
      }

      window.location.assign("/dashboard");
    } catch {
      setErrorMessage(
        "No pudimos conectar con el servicio de acceso. Inténtalo nuevamente.",
      );
      setLoading(false);
    }
  }

  async function handlePasswordReset() {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/auth/callback?next=/restablecer-contrasena`,
      });
      if (error) throw error;
      setSuccessMessage(
        "Revisa tu correo. Te enviamos un enlace seguro para cambiar la contraseña.",
      );
    } catch {
      setErrorMessage(
        "No pudimos enviar el enlace. Verifica el correo e inténtalo nuevamente.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080506] text-warm-cream">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(143,31,84,0.34),transparent_28%),radial-gradient(circle_at_88%_82%,rgba(217,168,78,0.16),transparent_26%)]" />
      <div className="absolute inset-y-0 left-0 hidden w-[46%] border-r border-champagne-gold/15 bg-[linear-gradient(145deg,rgba(217,168,78,0.08),transparent_58%)] lg:block" />

      <div className="relative mx-auto grid min-h-screen max-w-[1440px] lg:grid-cols-[0.92fr_1.08fr]">
        <section className="hidden flex-col justify-between p-14 lg:flex xl:p-20">
          <Link href="/" className="leading-none" aria-label="Volver a CARELA">
            <span className="block font-serif text-4xl tracking-[0.18em] text-champagne-gold">
              CARELA
            </span>
            <span className="block font-script text-3xl text-rose-pink">
              Beauty & Wellness
            </span>
          </Link>

          <div className="max-w-xl">
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-16 bg-champagne-gold" />
              <span className="size-2 rotate-45 border border-rose-pink" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-rose-pink">
              Estudio de gestión
            </p>
            <h1 className="mt-5 font-serif text-6xl leading-[0.96] text-champagne-gold xl:text-7xl">
              Gestion del Negocio
            </h1>
            <p className="mt-7 max-w-lg text-base leading-8 text-muted-taupe">
              Organiza citas, clientes e ingresos desde un espacio privado
              diseñado para la forma personal de trabajar de CARELA.
            </p>
          </div>

          <p className="text-xs uppercase tracking-[0.22em] text-muted-taupe/70">
            Beauty · Wellness · Confidence
          </p>
        </section>

        <section className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-10">
          <div className="w-full max-w-[520px]">
            <Link href="/" className="mb-12 block leading-none lg:hidden">
              <span className="block font-serif text-3xl tracking-[0.18em] text-champagne-gold">
                CARELA
              </span>
              <span className="block font-script text-2xl text-rose-pink">
                Beauty & Wellness
              </span>
            </Link>

            <div className="border border-champagne-gold/18 bg-[#120c0d]/88 p-7 shadow-[0_32px_100px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-10">
              <div className="flex size-12 items-center justify-center border border-champagne-gold/30 bg-champagne-gold/8 text-champagne-gold">
                <LockKeyhole size={20} />
              </div>
              <h2 className="mt-7 font-serif text-4xl text-warm-cream">
                Bienvenida, Leidania
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-taupe">
                Entra a tu estudio CARELA para gestionar el día.
              </p>

              <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-warm-cream/70">
                    Correo electrónico
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    required
                    className="h-14 w-full border border-champagne-gold/18 bg-background/70 px-4 text-sm text-warm-cream outline-none transition placeholder:text-muted-taupe/50 focus:border-champagne-gold"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-warm-cream/70">
                    Contraseña
                  </span>
                  <span className="relative block">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      autoComplete="current-password"
                      required
                      className="h-14 w-full border border-champagne-gold/18 bg-background/70 px-4 pr-12 text-sm text-warm-cream outline-none transition focus:border-champagne-gold"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-0 top-0 flex size-14 items-center justify-center text-muted-taupe transition hover:text-champagne-gold"
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </span>
                </label>

                <div className="flex justify-end text-xs">
                  <button
                    type="button"
                    onClick={handlePasswordReset}
                    disabled={loading || !email.trim()}
                    className="text-champagne-gold hover:text-soft-gold"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                {errorMessage ? (
                  <div
                    role="alert"
                    className="border border-rose-pink/28 bg-rose-pink/8 px-4 py-3 text-sm leading-6 text-[#ef9bc2]"
                  >
                    {errorMessage}
                  </div>
                ) : null}

                {successMessage ? (
                  <div
                    role="status"
                    className="border border-emerald-500/28 bg-emerald-500/8 px-4 py-3 text-sm leading-6 text-emerald-200"
                  >
                    {successMessage}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-14 w-full items-center justify-center gap-3 bg-champagne-gold px-5 text-sm font-extrabold text-background transition hover:bg-soft-gold disabled:opacity-70"
                >
                  {loading ? "Abriendo tu estudio…" : "Entrar al estudio"}
                  {!loading && <ArrowRight size={18} />}
                </button>
              </form>

              <div className="mt-6 flex items-start gap-3 border-t border-champagne-gold/12 pt-5 text-xs leading-5 text-muted-taupe">
                <ShieldCheck size={17} className="mt-0.5 shrink-0 text-rose-pink" />
                Acceso privado protegido con las credenciales de la propietaria.
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
