export type FinanceReportIncomeRow = {
  date: string;
  client: string;
  service: string;
  packageName: string;
  location: string;
  amount: number;
};

export type FinanceReportExpenseRow = {
  date: string;
  description: string;
  category: string;
  service: string;
  amount: number;
};

export type FinanceReportData = {
  startDate: string;
  endDate: string;
  serviceLabel: string;
  generatedAt: string;
  income: number;
  expenses: number;
  profit: number;
  margin: number;
  serviceIncome: {
    name: string;
    value: number;
    color: string;
  }[];
  incomeRows: FinanceReportIncomeRow[];
  expenseRows: FinanceReportExpenseRow[];
};

export const formatReportMoney = (value: number) =>
  new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
    maximumFractionDigits: 0,
  }).format(value);

export const formatReportDate = (value: string) =>
  new Intl.DateTimeFormat("es-DO", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`));

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const incomeTableRows = (report: FinanceReportData) =>
  report.incomeRows.length
    ? report.incomeRows
        .map(
          (item) => `
            <tr>
              <td>${escapeHtml(formatReportDate(item.date))}</td>
              <td><strong>${escapeHtml(item.client)}</strong></td>
              <td>${escapeHtml(item.service)}<small>${escapeHtml(item.packageName)}</small></td>
              <td>${escapeHtml(item.location)}</td>
              <td class="number">${escapeHtml(formatReportMoney(item.amount))}</td>
            </tr>`,
        )
        .join("")
    : `<tr><td class="empty" colspan="5">No hay servicios completados en este período.</td></tr>`;

const expenseTableRows = (report: FinanceReportData) =>
  report.expenseRows.length
    ? report.expenseRows
        .map(
          (item) => `
            <tr>
              <td>${escapeHtml(formatReportDate(item.date))}</td>
              <td><strong>${escapeHtml(item.description)}</strong></td>
              <td>${escapeHtml(item.category)}</td>
              <td>${escapeHtml(item.service)}</td>
              <td class="number expense">-${escapeHtml(formatReportMoney(item.amount))}</td>
            </tr>`,
        )
        .join("")
    : `<tr><td class="empty" colspan="5">No hay gastos registrados en este período.</td></tr>`;

const serviceRows = (report: FinanceReportData) => {
  const maxValue = Math.max(1, ...report.serviceIncome.map((item) => item.value));

  return report.serviceIncome
    .map(
      (item) => `
        <div class="service-row">
          <div class="service-heading">
            <span>${escapeHtml(item.name)}</span>
            <strong>${escapeHtml(formatReportMoney(item.value))}</strong>
          </div>
          <div class="service-track">
            <span style="width:${Math.max(0, (item.value / maxValue) * 100)}%;background:${escapeHtml(item.color)}"></span>
          </div>
        </div>`,
    )
    .join("");
};

export function renderFinanceReportHtml(report: FinanceReportData) {
  const fileName = `CARELA-reporte-${report.startDate}-${report.endDate}`;

  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(fileName)}</title>
    <style>
      @page { size: A4; margin: 12mm 12mm 16mm; }
      * { box-sizing: border-box; }
      html { background: #e8e1d9; }
      body {
        margin: 0;
        background: #fffdf9;
        color: #241a1c;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 10px;
        line-height: 1.45;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .report { max-width: 210mm; margin: 0 auto; background: #fffdf9; }
      .hero {
        position: relative;
        overflow: hidden;
        padding: 25px 28px 22px;
        background: #120c0d;
        color: #f7efe7;
        border-bottom: 4px solid #d9a84e;
      }
      .hero::after {
        content: "";
        position: absolute;
        width: 180px;
        height: 180px;
        right: -55px;
        top: -90px;
        border-radius: 50%;
        background: rgba(217, 75, 140, 0.18);
      }
      .brand { color: #d9a84e; font-family: Georgia, "Times New Roman", serif; font-size: 28px; letter-spacing: 5px; }
      .brand-subtitle { margin-top: -2px; color: #d94b8c; font-family: Georgia, serif; font-size: 13px; font-style: italic; }
      .report-label { margin-top: 25px; color: #d94b8c; font-size: 8px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; }
      h1 { margin: 5px 0 0; font-family: Georgia, "Times New Roman", serif; font-size: 28px; font-weight: 400; }
      .hero-meta { display: flex; gap: 28px; margin-top: 16px; color: #b8a49b; }
      .hero-meta strong { display: block; margin-top: 2px; color: #f7efe7; font-size: 10px; }
      .content { padding: 22px 28px 32px; }
      .summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
      .metric { min-height: 76px; padding: 14px; border: 1px solid #e4d8cb; background: #ffffff; }
      .metric span { color: #7f6f69; font-size: 8px; font-weight: 700; letter-spacing: 1.1px; text-transform: uppercase; }
      .metric strong { display: block; margin-top: 8px; font-family: Georgia, serif; font-size: 21px; font-weight: 500; }
      .metric.income strong, .metric.profit strong { color: #8a651f; }
      .metric.expenses strong { color: #a22b63; }
      .metric small { display: block; margin-top: 5px; color: #8a7a73; }
      .method {
        margin-top: 12px;
        padding: 12px 14px;
        border-left: 3px solid #d9a84e;
        background: #f7f1e9;
        color: #58494b;
      }
      .method strong { color: #241a1c; }
      .section { margin-top: 24px; break-inside: avoid; }
      .section-heading { display: flex; align-items: end; justify-content: space-between; gap: 16px; padding-bottom: 7px; border-bottom: 1px solid #d8c9bb; }
      .eyebrow { color: #a22b63; font-size: 7px; font-weight: 700; letter-spacing: 1.6px; text-transform: uppercase; }
      h2 { margin: 2px 0 0; font-family: Georgia, serif; font-size: 17px; font-weight: 500; }
      .section-heading p { margin: 0; color: #7f6f69; }
      .service-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px 20px; margin-top: 14px; }
      .service-heading { display: flex; justify-content: space-between; gap: 10px; margin-bottom: 5px; }
      .service-heading span { color: #58494b; }
      .service-track { height: 5px; overflow: hidden; border-radius: 99px; background: #eee6dc; }
      .service-track span { display: block; height: 100%; border-radius: inherit; }
      table { width: 100%; margin-top: 10px; border-collapse: collapse; }
      thead { display: table-header-group; }
      th { padding: 8px 7px; background: #120c0d; color: #d9a84e; font-size: 7px; letter-spacing: 1px; text-align: left; text-transform: uppercase; }
      td { padding: 8px 7px; border-bottom: 1px solid #eadfd4; vertical-align: top; }
      tr { break-inside: avoid; }
      tbody tr:nth-child(even) { background: #fbf7f2; }
      td small { display: block; margin-top: 2px; color: #7f6f69; }
      .number { white-space: nowrap; text-align: right; font-weight: 700; }
      .expense { color: #a22b63; }
      .empty { padding: 18px; color: #7f6f69; text-align: center; }
      .report-footer {
        position: fixed;
        right: 12mm;
        bottom: 5mm;
        left: 12mm;
        display: flex;
        justify-content: space-between;
        padding-top: 4px;
        border-top: 1px solid #dfd3c7;
        color: #8a7a73;
        font-size: 7px;
      }
      .page-number::after { content: counter(page); }
      @media screen {
        body { padding: 24px; }
        .report { box-shadow: 0 24px 80px rgba(56, 34, 39, 0.18); }
        .report-footer { position: static; margin: 10px 28px 0; padding-bottom: 10px; }
      }
      @media print {
        html, body { background: #fffdf9; }
        body { padding: 0; }
      }
    </style>
  </head>
  <body>
    <main class="report">
      <header class="hero">
        <div class="brand">CARELA</div>
        <div class="brand-subtitle">Beauty &amp; Wellness</div>
        <div class="report-label">Gestión financiera</div>
        <h1>Reporte de ingresos y gastos</h1>
        <div class="hero-meta">
          <div>Período<strong>${escapeHtml(formatReportDate(report.startDate))} - ${escapeHtml(formatReportDate(report.endDate))}</strong></div>
          <div>Servicio<strong>${escapeHtml(report.serviceLabel)}</strong></div>
          <div>Generado<strong>${escapeHtml(report.generatedAt)}</strong></div>
        </div>
      </header>

      <div class="content">
        <section class="summary">
          <div class="metric income"><span>Ingresos realizados</span><strong>${escapeHtml(formatReportMoney(report.income))}</strong><small>${report.incomeRows.length} ${report.incomeRows.length === 1 ? "cita completada" : "citas completadas"}</small></div>
          <div class="metric expenses"><span>Gastos registrados</span><strong>${escapeHtml(formatReportMoney(report.expenses))}</strong><small>${report.expenseRows.length} ${report.expenseRows.length === 1 ? "movimiento" : "movimientos"}</small></div>
          <div class="metric profit"><span>Resultado neto</span><strong>${escapeHtml(formatReportMoney(report.profit))}</strong><small>${report.margin}% de margen</small></div>
        </section>

        <aside class="method">
          <strong>Criterio del reporte:</strong> los ingresos incluyen únicamente servicios con estado
          “Completada” dentro del período y servicio seleccionados. Las citas confirmadas, pendientes
          o canceladas no se contabilizan. Los gastos generales solo se incluyen al consultar todos
          los servicios.
        </aside>

        <section class="section">
          <div class="section-heading">
            <div><div class="eyebrow">Desempeño</div><h2>Ingresos por servicio</h2></div>
            <p>Total: ${escapeHtml(formatReportMoney(report.income))}</p>
          </div>
          <div class="service-grid">${serviceRows(report)}</div>
        </section>

        <section class="section">
          <div class="section-heading">
            <div><div class="eyebrow">Detalle de ingresos</div><h2>Servicios completados</h2></div>
            <p>${report.incomeRows.length} ${report.incomeRows.length === 1 ? "registro" : "registros"}</p>
          </div>
          <table>
            <thead><tr><th>Fecha</th><th>Clienta</th><th>Servicio</th><th>Modalidad</th><th class="number">Monto</th></tr></thead>
            <tbody>${incomeTableRows(report)}</tbody>
          </table>
        </section>

        <section class="section">
          <div class="section-heading">
            <div><div class="eyebrow">Detalle de gastos</div><h2>Movimientos registrados</h2></div>
            <p>${report.expenseRows.length} ${report.expenseRows.length === 1 ? "registro" : "registros"}</p>
          </div>
          <table>
            <thead><tr><th>Fecha</th><th>Descripción</th><th>Categoría</th><th>Servicio</th><th class="number">Monto</th></tr></thead>
            <tbody>${expenseTableRows(report)}</tbody>
          </table>
        </section>
      </div>

      <footer class="report-footer">
        <span>CARELA Beauty &amp; Wellness - Uso interno</span>
        <span>Página <span class="page-number"></span></span>
      </footer>
    </main>
    <script>
      window.addEventListener("load", function () {
        window.setTimeout(function () {
          window.focus();
          window.print();
        }, 350);
      });
    </script>
  </body>
</html>`;
}

export function openFinanceReportPrintPreview(report: FinanceReportData) {
  const reportWindow = window.open("", "_blank", "width=1100,height=820");

  if (!reportWindow) {
    return false;
  }

  reportWindow.opener = null;
  reportWindow.document.open();
  reportWindow.document.write(renderFinanceReportHtml(report));
  reportWindow.document.close();
  return true;
}
