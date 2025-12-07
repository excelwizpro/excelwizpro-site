import { useState } from "react";

const DEFAULT_BACKEND =
  import.meta.env.VITE_BACKEND_URL ?? "https://excelwizpro-mtm8.onrender.com";

interface EngineResponse {
  ok: boolean;
  result?: any;
  context?: any;
  error?: string;
}

export function App() {
  const [backendUrl, setBackendUrl] = useState<string>(DEFAULT_BACKEND);
  const [query, setQuery] = useState<string>("");
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [engineResponse, setEngineResponse] = useState<EngineResponse | null>(
    null
  );

  async function runEngine() {
    if (!query.trim()) return;
    setRunning(true);
    setError(null);
    setEngineResponse(null);

    try {
      const res = await fetch(`${backendUrl.replace(/\/$/, "")}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          workbook: null
        })
      });

      const json = (await res.json()) as EngineResponse;
      setEngineResponse(json);
      if (!json.ok) {
        setError(json.error ?? "Engine returned an error");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? "Network error");
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-soft text-sm font-bold text-brand-dark">
              EW
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                ExcelWizPro <span className="text-[11px] text-slate-500">MTM‑8 Workspace</span>
              </p>
              <p className="text-xs text-slate-500">
                Natural‑language to semantic context, report plan and formulas.
              </p>
            </div>
          </div>
          <div className="hidden text-[11px] text-slate-500 sm:block">
            Backend: <span className="font-medium text-slate-700">Render · /run</span>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 px-4 py-4">
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-sm font-semibold text-slate-900">
            1 · Backend connection
          </h2>
          <p className="mb-2 text-xs text-slate-500">
            Point this UI at your deployed MTM‑8 backend. Default is your current Render URL.
          </p>
          <input
            value={backendUrl}
            onChange={(e) => setBackendUrl(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-900 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand-soft"
          />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-sm font-semibold text-slate-900">
            2 · Ask MTM‑8 a question
          </h2>
          <p className="mb-3 text-xs text-slate-500">
            This version sends only the natural‑language query to MTM‑8. Once workbook upload is wired,
            the engine will also receive workbook‑derived schemas and regions.
          </p>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Show total revenue by region for the last 6 months as a table and a KPI card."
            className="w-full min-h-[110px] rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand-soft"
          />

          {error && (
            <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {error}
            </div>
          )}

          <div className="mt-3 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={runEngine}
              disabled={running || !query.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {running ? (
                <>
                  <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Running MTM‑8…
                </>
              ) : (
                <>
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                  Run MTM‑8
                </>
              )}
            </button>
            <p className="text-[11px] text-slate-500">
              Tip: start simple. Then add compare, filter, rank or KPI instructions.
            </p>
          </div>
        </section>

        <section className="flex flex-1 flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-sm font-semibold text-slate-900">
            3 · Raw engine response
          </h2>
          <p className="mb-2 text-xs text-slate-500">
            For now we expose the raw JSON response (semanticContext, reportPlan, formulaPlan etc.).
            Later this panel will render tables, pivots, charts and KPI tiles directly.
          </p>

          <div className="relative flex-1 overflow-hidden rounded-xl border border-slate-200 bg-slate-950">
            <pre className="h-full max-h-[360px] overflow-auto bg-slate-950 p-3 text-[11px] leading-relaxed text-slate-100">
{`${
  engineResponse
    ? JSON.stringify(engineResponse, null, 2)
    : "// Run MTM‑8 to see the structured engine output here."
}`}
            </pre>
          </div>
        </section>
      </main>
    </div>
  );
}
