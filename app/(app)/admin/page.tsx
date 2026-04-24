import type { Metadata } from "next";
import Link from "next/link";
import { Activity, Bell, CalendarDays, LineChart, Search, Users } from "lucide-react";

import { Logo } from "@/components/shared/logo";
import { getAdminDashboard } from "@/lib/services/dashboards";

export const metadata: Metadata = {
  title: "Admin Control Panel",
  description: "Admin oversight dashboard for the scheduling system."
};

export default async function AdminPage() {
  const dashboard = await getAdminDashboard();

  return (
    <div className="flex min-h-screen overflow-hidden">
      <aside className="flex w-64 flex-col justify-between border-r border-slate-200 bg-white p-4">
        <div className="space-y-8">
          <div className="flex items-center gap-3 px-2">
            <Logo compact label="Admin Panel" variant="admin" />
          </div>
          <nav className="space-y-1">
            {[
              { href: "/admin", label: "Dashboard", active: true },
              { href: "/admin/reports", label: "Reports" },
              { href: "/admin/session-analysis", label: "AI Analysis" }
            ].map((item) => (
              <Link
                key={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm ${
                  item.active
                    ? "bg-sky-100 font-semibold text-[var(--primary)]"
                    : "text-slate-600"
                }`}
                href={item.href}
              >
                <LineChart className="size-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
            System Status
          </p>
          <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
            <span className="size-2 rounded-full bg-emerald-500" />
            All Systems Operational
          </div>
        </div>
      </aside>
      <main className="flex-1">
        <header className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white/90 px-8 py-3 backdrop-blur">
          <div className="flex items-center gap-6">
            <h2 className="text-lg font-bold text-slate-900">Scheduling System</h2>
            <label className="flex h-10 w-64 items-center gap-2 rounded-xl bg-slate-100 px-3">
              <Search className="size-4 text-slate-400" />
              <input
                className="w-full bg-transparent text-sm outline-none"
                placeholder="Global system search..."
              />
            </label>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-xl bg-slate-100 p-2 text-slate-700">
              <Bell className="size-4" />
            </button>
            <div className="size-10 rounded-full bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuCRFXVYyLKOFcds8g5r6Zn9dowQ-s4flRkqzYwPnpDvZjzAnbn1Pa7sKfBkQHw0WU1O8CGGnALPB0S5375UrXqtzERr-rrfPCFbpTPM41WS--QFwV_2LiDaweTfvP3_xfUOlVUfTRSHAvIthkeGi3VO-xWmIHggLzj8kU5sRKc5VMNvgvgkZS-iE6Y1vuulB5e0z7S2xJvHARuhDa5DtTay7cv1Uv7DSc3oRNgqDGA0a7dVAZZHxfAUQzWAWX7mtOf42BzakZoIP5A')] bg-cover bg-center ring-2 ring-sky-100" />
          </div>
        </header>
        <div className="mx-auto max-w-7xl p-8">
          <div className="mb-8 grid gap-6 md:grid-cols-3">
            {[
              {
                label: "Total Users",
                value: dashboard.totalUsers,
                icon: Users,
                accent: "bg-blue-50 text-blue-600"
              },
              {
                label: "Active Doctors",
                value: dashboard.activeDoctors,
                icon: Activity,
                accent: "bg-emerald-50 text-emerald-600"
              },
              {
                label: "Total Bookings",
                value: dashboard.totalBookings,
                icon: CalendarDays,
                accent: "bg-[var(--primary)] text-white"
              }
            ].map((stat) => (
              <article
                key={stat.label}
                className={`rounded-2xl border p-6 shadow-sm ${
                  stat.label === "Total Bookings"
                    ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="mb-3 flex items-start justify-between">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em]">
                    {stat.label}
                  </p>
                  <div className={`rounded-xl p-2 ${stat.accent}`}>
                    <stat.icon className="size-4" />
                  </div>
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
