"use client";

import { FileText, Printer, X } from "lucide-react";
import { useEffect } from "react";
import {
  FinanceReportData,
  formatReportDate,
  formatReportMoney,
  openFinanceReportPrintPreview,
} from "@/lib/financeReport";

export function FinanceReportPreview({
  report,
  onClose,
}: {
  report: FinanceReportData;
  onClose: () => void;
}) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  const maxServiceIncome = Math.max(
    1,
    ...report.serviceIncome.map((item) => item.value),
  );

  function openPrintPreview() {
    if (!openFinanceReportPrintPreview(report)) {
      window.alert(
        "El navegador bloqueó la vista de impresión. Permite ventanas emergentes e inténtalo nuevamente.",
      );
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="finance-report-title"
    >
      <button
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        aria-label="Cerrar vista previa"
      />
      <section className="relative z-10 flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden border border-[#d9a84e]/20 bg-[#100a0c] shadow-[0_35px_100px_rgba(0,0,0,0.7)]">
        <header className="relative flex items-center border-b border-[#d9a84e]/14 px-5 py-4 pr-16 sm:px-7 sm:pr-20">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center border border-[#d9a84e]/25 bg-[#d9a84e]/8 text-[#d9a84e]">
              <FileText size={18} />
            </span>
            <div>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#d94b8c]">
                Documento listo
              </p>
              <h2 id="finance-report-title" className="mt-1 font-serif text-2xl">
                Vista previa del reporte
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-4 flex size-10 items-center justify-center border border-white/10 text-[#b8a49b] transition hover:border-[#d9a84e]/30 hover:text-white sm:right-7"
            aria-label="Cerrar vista previa"
          >
            <X size={18} />
          </button>
        </header>

        <div className="overflow-y-auto bg-[#080506] p-3 sm:p-7">
          <article className="mx-auto w-full max-w-[900px] bg-[#fffdf9] text-[#241a1c] shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
            <header className="relative overflow-hidden border-b-4 border-[#d9a84e] bg-[#120c0d] px-6 py-7 text-[#f7efe7] sm:px-9 sm:py-9">
              <div className="absolute -right-14 -top-24 size-52 rounded-full bg-[#d94b8c]/15" />
              <p className="font-serif text-3xl tracking-[0.18em] text-[#d9a84e] sm:text-4xl">
                CARELA
              </p>
              <p className="-mt-1 font-script text-2xl text-[#d94b8c]">
                Beauty & Wellness
              </p>
              <p className="mt-7 text-[0.58rem] font-extrabold uppercase tracking-[0.26em] text-[#d94b8c]">
                Gestión financiera
              </p>
              <h3 className="mt-2 font-serif text-3xl sm:text-4xl">
                Reporte de ingresos y gastos
              </h3>
              <div className="mt-5 grid gap-4 text-xs text-[#b8a49b] sm:grid-cols-3">
                <div>
                  Período
                  <strong className="mt-1 block text-[#f7efe7]">
                    {formatReportDate(report.startDate)} -{" "}
                    {formatReportDate(report.endDate)}
                  </strong>
                </div>
                <div>
                  Servicio
                  <strong className="mt-1 block text-[#f7efe7]">
                    {report.serviceLabel}
                  </strong>
                </div>
                <div>
                  Generado
                  <strong className="mt-1 block text-[#f7efe7]">
                    {report.generatedAt}
                  </strong>
                </div>
              </div>
            </header>

            <div className="space-y-7 px-5 py-6 sm:px-9 sm:py-8">
              <section className="grid gap-3 sm:grid-cols-3">
                <ReportMetric
                  label="Ingresos realizados"
                  value={formatReportMoney(report.income)}
                  detail={`${report.incomeRows.length} ${
                    report.incomeRows.length === 1
                      ? "cita completada"
                      : "citas completadas"
                  }`}
                  tone="gold"
                />
                <ReportMetric
                  label="Gastos registrados"
                  value={formatReportMoney(report.expenses)}
                  detail={`${report.expenseRows.length} ${
                    report.expenseRows.length === 1
                      ? "movimiento"
                      : "movimientos"
                  }`}
                  tone="rose"
                />
                <ReportMetric
                  label="Resultado neto"
                  value={formatReportMoney(report.profit)}
                  detail={`${report.margin}% de margen`}
                  tone="gold"
                />
              </section>

              <aside className="border-l-4 border-[#d9a84e] bg-[#f7f1e9] px-4 py-3 text-xs leading-6 text-[#58494b]">
                <strong className="text-[#241a1c]">Criterio del reporte:</strong>{" "}
                solo se contabilizan como ingresos las citas completadas dentro
                del período y servicio seleccionados. Las citas confirmadas,
                pendientes o canceladas quedan excluidas.
              </aside>

              <ReportSection
                eyebrow="Desempeño"
                title="Ingresos por servicio"
                meta={`Total: ${formatReportMoney(report.income)}`}
              >
                <div className="grid gap-x-7 gap-y-4 sm:grid-cols-2">
                  {report.serviceIncome.map((item) => (
                    <div key={item.name}>
                      <div className="flex justify-between gap-3 text-xs">
                        <span className="text-[#58494b]">{item.name}</span>
                        <strong>{formatReportMoney(item.value)}</strong>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#eee6dc]">
                        <span
                          className="block h-full rounded-full"
                          style={{
                            width: `${(item.value / maxServiceIncome) * 100}%`,
                            background: item.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </ReportSection>

              <ReportSection
                eyebrow="Detalle de ingresos"
                title="Servicios completados"
                meta={`${report.incomeRows.length} ${
                  report.incomeRows.length === 1 ? "registro" : "registros"
                }`}
              >
                <div>
                  <div className="space-y-2 sm:hidden">
                    {report.incomeRows.map((item) => (
                      <article
                        key={`${item.date}-${item.client}-${item.packageName}-mobile`}
                        className="border border-[#eadfd4] bg-white p-3 text-xs"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <strong className="block">{item.client}</strong>
                            <span className="mt-1 block text-[#7f6f69]">
                              {formatReportDate(item.date)} · {item.location}
                            </span>
                          </div>
                          <strong className="shrink-0 text-[#8a651f]">
                            {formatReportMoney(item.amount)}
                          </strong>
                        </div>
                        <p className="mt-3 border-t border-[#eadfd4] pt-3">
                          {item.service}
                          <span className="ml-1 text-[#7f6f69]">
                            · {item.packageName}
                          </span>
                        </p>
                      </article>
                    ))}
                  </div>
                  <div className="hidden overflow-x-auto sm:block">
                  <table className="w-full min-w-[650px] text-left text-xs">
                    <thead className="bg-[#120c0d] text-[0.58rem] uppercase tracking-[0.15em] text-[#d9a84e]">
                      <tr>
                        <th className="px-3 py-3">Fecha</th>
                        <th className="px-3 py-3">Clienta</th>
                        <th className="px-3 py-3">Servicio</th>
                        <th className="px-3 py-3">Modalidad</th>
                        <th className="px-3 py-3 text-right">Monto</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#eadfd4]">
                      {report.incomeRows.map((item) => (
                        <tr key={`${item.date}-${item.client}-${item.packageName}`}>
                          <td className="px-3 py-3 text-[#7f6f69]">
                            {formatReportDate(item.date)}
                          </td>
                          <td className="px-3 py-3 font-bold">{item.client}</td>
                          <td className="px-3 py-3">
                            {item.service}
                            <span className="mt-1 block text-[#7f6f69]">
                              {item.packageName}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-[#7f6f69]">
                            {item.location}
                          </td>
                          <td className="px-3 py-3 text-right font-bold">
                            {formatReportMoney(item.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                  {!report.incomeRows.length && (
                    <ReportEmpty label="No hay servicios completados en este período." />
                  )}
                </div>
              </ReportSection>

              <ReportSection
                eyebrow="Detalle de gastos"
                title="Movimientos registrados"
                meta={`${report.expenseRows.length} ${
                  report.expenseRows.length === 1 ? "registro" : "registros"
                }`}
              >
                <div>
                  <div className="space-y-2 sm:hidden">
                    {report.expenseRows.map((item) => (
                      <article
                        key={`${item.date}-${item.description}-${item.amount}-mobile`}
                        className="border border-[#eadfd4] bg-white p-3 text-xs"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <strong className="block">{item.description}</strong>
                            <span className="mt-1 block text-[#7f6f69]">
                              {formatReportDate(item.date)} · {item.category}
                            </span>
                          </div>
                          <strong className="shrink-0 text-[#a22b63]">
                            -{formatReportMoney(item.amount)}
                          </strong>
                        </div>
                        <p className="mt-3 border-t border-[#eadfd4] pt-3 text-[#58494b]">
                          {item.service}
                        </p>
                      </article>
                    ))}
                  </div>
                  <div className="hidden overflow-x-auto sm:block">
                  <table className="w-full min-w-[650px] text-left text-xs">
                    <thead className="bg-[#120c0d] text-[0.58rem] uppercase tracking-[0.15em] text-[#d9a84e]">
                      <tr>
                        <th className="px-3 py-3">Fecha</th>
                        <th className="px-3 py-3">Descripción</th>
                        <th className="px-3 py-3">Categoría</th>
                        <th className="px-3 py-3">Servicio</th>
                        <th className="px-3 py-3 text-right">Monto</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#eadfd4]">
                      {report.expenseRows.map((item) => (
                        <tr key={`${item.date}-${item.description}-${item.amount}`}>
                          <td className="px-3 py-3 text-[#7f6f69]">
                            {formatReportDate(item.date)}
                          </td>
                          <td className="px-3 py-3 font-bold">
                            {item.description}
                          </td>
                          <td className="px-3 py-3 text-[#7f6f69]">
                            {item.category}
                          </td>
                          <td className="px-3 py-3">{item.service}</td>
                          <td className="px-3 py-3 text-right font-bold text-[#a22b63]">
                            -{formatReportMoney(item.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                  {!report.expenseRows.length && (
                    <ReportEmpty label="No hay gastos registrados en este período." />
                  )}
                </div>
              </ReportSection>
            </div>
          </article>
        </div>

        <footer className="flex flex-col-reverse gap-3 border-t border-[#d9a84e]/14 bg-[#100a0c] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <p className="text-xs leading-5 text-[#7f6f69]">
            Al continuar, el navegador abrirá su vista de impresión. Selecciona
            “Guardar como PDF”.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-11 border border-white/10 px-5 text-xs font-bold text-[#b8a49b] transition hover:text-white"
            >
              Volver
            </button>
            <button
              type="button"
              onClick={openPrintPreview}
              className="flex h-11 items-center gap-2 bg-[#d9a84e] px-5 text-xs font-extrabold text-[#080506] transition hover:bg-[#f3d48a]"
            >
              <Printer size={16} />
              Guardar como PDF
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}

function ReportMetric({
  label,
  value,
  detail,
  tone,
}: {
  label: string;
  value: string;
  detail: string;
  tone: "gold" | "rose";
}) {
  return (
    <article className="border border-[#e4d8cb] bg-white p-4">
      <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.16em] text-[#7f6f69]">
        {label}
      </p>
      <strong
        className={`mt-2 block font-serif text-2xl ${
          tone === "rose" ? "text-[#a22b63]" : "text-[#8a651f]"
        }`}
      >
        {value}
      </strong>
      <span className="mt-1 block text-xs text-[#8a7a73]">{detail}</span>
    </article>
  );
}

function ReportSection({
  eyebrow,
  title,
  meta,
  children,
}: {
  eyebrow: string;
  title: string;
  meta: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-4 flex items-end justify-between gap-4 border-b border-[#d8c9bb] pb-2">
        <div>
          <p className="text-[0.56rem] font-extrabold uppercase tracking-[0.18em] text-[#a22b63]">
            {eyebrow}
          </p>
          <h4 className="mt-1 font-serif text-xl">{title}</h4>
        </div>
        <p className="text-xs text-[#7f6f69]">{meta}</p>
      </div>
      {children}
    </section>
  );
}

function ReportEmpty({ label }: { label: string }) {
  return (
    <div className="border border-t-0 border-[#eadfd4] px-4 py-7 text-center text-xs text-[#7f6f69]">
      {label}
    </div>
  );
}
