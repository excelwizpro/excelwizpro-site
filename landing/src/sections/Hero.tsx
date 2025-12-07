import { motion } from "framer-motion";

export function Hero() {
  return (
    <header className="flex flex-1 flex-col items-center justify-center gap-10 py-8 text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs text-slate-300">
        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        MTM‑8 Engine · Multi‑intent · Workbook‑aware
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-4"
      >
        <h1 className="bg-gradient-to-br from-slate-50 via-sky-200 to-emerald-200 bg-clip-text text-4xl font-semibold leading-tight text-transparent sm:text-5xl md:text-6xl">
          Natural‑language analytics
          <br className="hidden sm:block" />
          that actually understands Excel.
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base">
          ExcelWizPro MTM‑8 reads your workbook structure, detects measures,
          dimensions and time windows, then compiles your question directly
          into tables, pivots, charts and KPI formulas.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex flex-col items-center justify-center gap-3 sm:flex-row"
      >
        <a
          href="/app/"
          className="inline-flex items-center justify-center rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-brand-dark"
        >
          Launch MTM‑8 workspace
        </a>
        <span className="text-xs text-slate-400">
          Backend: MTM‑8 on Render · Frontend: static, instant‑load.
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="mt-6 w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-4 text-left text-xs text-slate-200 shadow-xl shadow-sky-500/20"
      >
        <p className="mb-2 font-semibold text-slate-100">
          Example conversation with MTM‑8:
        </p>
        <div className="space-y-1">
          <p className="font-mono text-[11px] text-emerald-300">
            Q: total revenue by region for the last 6 months, table + KPI card
          </p>
          <p className="font-mono text-[11px] text-sky-300">
            → detects: intent=aggregate+trend · measures=[Revenue] · dimensions=[Region]
          </p>
          <p className="font-mono text-[11px] text-sky-300">
            → builds: reportPlan (table+KPI) · formulaPlan (SUMIFS, dynamic ranges)
          </p>
        </div>
      </motion.div>
    </header>
  );
}
