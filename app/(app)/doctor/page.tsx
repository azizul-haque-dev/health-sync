import type { Metadata } from "next";
import Link from "next/link";
import { Bell, CalendarDays, Download, Search, Settings, Star, TrendingUp } from "lucide-react";

import { Logo } from "@/components/shared/logo";
import { getDoctorDashboard } from "@/lib/services/dashboards";

export const metadata: Metadata = {
  title: "Doctor Dashboard Overview",
  description: "Doctor booking performance and daily schedule overview."
};

export default async function DoctorDashboardPage() {
  const dashboard = await getDoctorDashboard();

  return (
    <div className="flex min-h-screen overflow-hidden">
      <aside className="w-64 border-r border-slate-200 bg-white">
        <div className="flex h-full flex-col justify-between p-6">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-full bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuCOcMPAgvTS3MUSyT_RWEv_pef4nEJcGe3edgWKD7aOjQmKzw4QgB9cB1uiNUXWE49-3XN1abVCXLTAWfcOroIrQkASmbhaE9IFQJC_h7GPG1pjzQbaeNc3ePIJBE_7nqJk8Dtvfk9WZVgZzddLXyN0LcGk8KPino7WpDMv2_bPz72vzXas-a1JuRh60KUwhYbkGFVM_kZNCBPUrVUhJzCgJFZ1HW_VSM7cj6t9GYtwbab1A70T66EHC12XvyKEm1RMlygK_Mx5fsc')] bg-cover bg-center ring-2 ring-sky-100" />
              <div>
                <h1 className="text-base font-bold text-slate-900">Dr. Smith</h1>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Cardiologist
                </p>
              </div>
            </div>
            <nav className="space-y-1">
              {[
                { href: "/doctor", label: "Dashboard", active: true },
                { href: "/doctor/availability", label: "Availability" },
                { href: "/doctor/appointments/session-1", label: "Bookings" },
                { href: "/admin/reports", label: "Reports" }
              ].map((item) => (
                <Link
                  key={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${
                    item.active
                      ? "bg-[var(--primary)] font-semibold text-white shadow-lg shadow-sky-200"
                      : "text-slate-600"
                  }`}
                  href={item.href}
                >
                  <CalendarDays className="size-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <button className="rounded-xl bg-[var(--primary)] px-4 py-3 text-sm font-bold text-white">
            Set Status: Available
          </button>
        </div>
      </aside>
      <main className="flex-1">
        <header className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
          <div className="flex items-center gap-3">
            <Logo compact label="MedSync Pro" />
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                className="w-64 rounded-xl bg-slate-100 py-2 pl-10 pr-3 text-sm outline-none"
                placeholder="Search patients, records..."
              />
            </div>
            <button className="rounded-xl bg-slate-100 p-2 text-slate-700">
              <Bell className="size-4" />
            </button>
            <button className="rounded-xl bg-slate-100 p-2 text-slate-700">
              <Settings className="size-4" />
            </button>
          </div>
        </header>
        <div className="mx-auto max-w-6xl p-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black text-slate-900">Doctor Dashboard</h2>
              <p className="text-slate-500">
                Welcome back, Dr. Smith. You have{" "}
                <span className="font-bold text-[var(--primary)]">
                  {dashboard.todayAppointments} appointments
                </span>{" "}
                today.
              </p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl bg-sky-100 px-4 py-2 text-sm font-bold text-[var(--primary)]">
              <Download className="size-4" />
              Export Daily Report
            </button>
          </div>
          <div className="mb-10 grid gap-6 md:grid-cols-3">
            {[
              {
                label: "Total Bookings (Weekly)",
                value: dashboard.weeklyBookings,
                icon: CalendarDays
              },
              {
                label: "Revenue (Weekly)",
                value: `$${dashboard.weeklyRevenue.toLocaleString()}`,
                icon: TrendingUp
              },
              { label: "Average Rating", value: `${dashboard.averageRating}/5`, icon: Star }
            ].map((stat) => (
              <article key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-3 flex items-start justify-between">
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
                    {stat.label}
                  </p>
                  <div className="rounded-xl bg-sky-50 p-2 text-[var(--primary)]">
                    <stat.icon className="size-4" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                <p className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-emerald-600">
                  <TrendingUp className="size-4" />
                  Positive weekly growth
                </p>
              </article>
            ))}
          </div>
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <h3 className="text-lg font-bold text-slate-900">Today's Schedule</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                ["09:00 AM", "Sophia Turner", "Follow-up Review"],
                ["10:30 AM", "Daniel Carter", "Cardiology Consultation"],
                ["01:00 PM", "Emma Ross", "Diagnostics Review"]
              ].map(([time, patient, type]) => (
                <div key={time} className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
                  <div>
                    <p className="font-bold text-slate-900">{patient}</p>
                    <p className="text-sm text-slate-500">{type}</p>
                  </div>
                  <div className="text-sm font-semibold text-slate-900">{time}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
