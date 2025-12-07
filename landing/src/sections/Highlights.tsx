export function Highlights() {
  const items = [
    {
      title: "Workbook‑aware",
      body: "MTM‑8 inspects headers, types and structures to infer measures, dimensions and regions before touching your query."
    },
    {
      title: "Multi‑intent",
      body: "Compare, trend, filter, rank, forecast and KPI intents can coexist in a single natural‑language request."
    },
    {
      title: "Formula‑ready",
      body: "The engine ends in a formula plan, not a black box — so you can audit, copy and extend everything inside Excel."
    }
  ];

  return (
    <section className="mt-4 grid gap-4 border-t border-slate-800 pt-6 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-left"
        >
          <h3 className="text-sm font-semibold text-slate-50">
            {item.title}
          </h3>
          <p className="mt-2 text-xs text-slate-300">{item.body}</p>
        </div>
      ))}
    </section>
  );
}
