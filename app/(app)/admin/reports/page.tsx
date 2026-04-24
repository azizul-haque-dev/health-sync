import type { Metadata } from "next";
import { Download, FileText, Search, Settings, TrendingUp } from "lucide-react";

import { reportBars } from "@/lib/demo-data";

export const metadata: Metadata = {
  title: "System Analytics & Reports",
  description: "Operational reports, KPI cards, and analytics filters."
};

export default function AdminReportsPage() {
  return (
    <main className="flex min-h-screen">
      <aside className="hidden h-screen w-64 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="p-6">
          <h1 className="text-lg font-bold text-slate-900">HealthConnect</h1>
        </div>
      </aside>
      <div className="flex-1">
        <header className="sticky top-0 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-8 backdrop-blur">
          <div className="text-sm text-slate-500">Admin / Analytics & Reports</div>
          <div className="flex items-center gap-3">
            <label className="hidden items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 md:flex">
              <Search className="size-4 text-slate-400" />
              <input
                className="w-56 bg-transparent text-sm outline-none"
                placeholder="Search data points..."
              />
            </label>
            <button className="rounded-xl bg-slate-100 p-2 text-slate-700">
              <Settings className="size-4" />
            </button>
          </div>
        </header>
        <div className="mx-auto max-w-7xl space-y-8 p-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl font-black text-slate-900">
                System Analytics & Reports
              </h1>
              <p className="mt-1 text-slate-500">Last updated: Just now</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900">
                <Download className="size-4" />
                Export CSV
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white">
                <FileText className="size-4" />
                Download PDF
              </button>
            </div>
          </div>

          <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 lg:grid-cols-5">
            {["Date Range", "Specialty", "Doctor", "Branch"].map((label) => (
              <label key={label} className="space-y-1">
                <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  {label}
                </span>
                <select className="w-full rounded-xl bg-slate-50 px-3 py-2 text-sm outline-none">
                  <option>All {label}</option>
                </select>
              </label>
            ))}
            <div className="flex items-end">
              <button className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white">
                Apply Filters
              </button>
            </div>
          </section>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Appointments", "2,184"],
              ["Revenue", "$184,220"],
              ["Active Doctors", "85"],
              ["Patient Satisfaction", "96%"]
            ].map(([label, value]) => (
              <article key={label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 inline-flex rounded-xl bg-sky-100 p-2 text-[var(--primary)]">
                  <TrendingUp className="size-5" />
                </div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-2 text-3xl font-black text-slate-900">{value}</p>
              </article>
            ))}
          </div>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Weekly Booking Trend</h2>
            <div className="mt-8 flex h-64 items-end gap-4">
              {reportBars.map((bar) => (
                <div key={bar.label} className="flex flex-1 flex-col items-center gap-3">
                  <div
                    className="w-full rounded-t-2xl bg-[var(--primary)]/85"
                    style={{ height: `${bar.value}%` }}
                  />
                  <span className="text-xs font-semibold text-slate-500">{bar.label}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
