import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-Powered Session Analysis",
  description: "Operational AI analysis view for healthcare sessions."
};

export default function SessionAnalysisPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
            AI-Powered Session Analysis
          </p>
          <h1 className="mt-4 text-3xl font-black text-slate-900">
            Consultation Intelligence Overview
          </h1>
          <div className="mt-8 space-y-4">
            {[
              "Detected strong patient sentiment confidence and complete transcript coverage.",
              "Suggested follow-up category: medication adherence and routine diagnostics.",
              "Escalation risk remains low based on current symptom annotations."
            ].map((item) => (
              <article key={item} className="rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">
                {item}
              </article>
            ))}
          </div>
        </section>
        <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Suggested Actions</h2>
          <div className="mt-6 space-y-3">
            {[
              "Send summary to patient",
              "Notify doctor for follow-up checklist",
              "Attach AI notes to appointment record"
            ].map((item) => (
              <div key={item} className="rounded-xl border border-slate-200 p-4 text-sm text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
