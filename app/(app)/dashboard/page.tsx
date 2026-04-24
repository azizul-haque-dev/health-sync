import type { Metadata } from "next";
import { Bell, CalendarDays, CalendarPlus2, CheckCircle2, FolderOpen, LogOut, Mail, MessageSquare, Search, Settings } from "lucide-react";

import { Logo } from "@/components/shared/logo";
import { getPatientDashboard } from "@/lib/services/dashboards";

export const metadata: Metadata = {
  title: "Patient Dashboard",
  description: "Patient appointments, records, and profile overview."
};

export default async function PatientDashboardPage() {
  const dashboard = await getPatientDashboard();

  return (
    <div className="flex min-h-screen">
      <aside className="fixed flex h-full w-64 flex-col border-r border-slate-200 bg-white">
        <div className="p-6">
          <Logo compact label="HealthSync" />
          <nav className="mt-8 space-y-2">
            {[
              { label: "Dashboard", icon: CalendarDays, active: true },
              { label: "My Appointments", icon: CalendarPlus2 },
              { label: "Medical Records", icon: FolderOpen },
              { label: "Messages", icon: Mail },
              { label: "Settings", icon: Settings }
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm ${
                  item.active
                    ? "bg-sky-100 font-semibold text-[var(--primary)]"
                    : "text-slate-600"
                }`}
              >
                <item.icon className="size-4" />
                {item.label}
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-auto border-t border-slate-200 p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="size-10 rounded-full bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuCoSCTpW-b2iRDU0dra3XPAbe2maMeVs8XR_w8VYLz8zkmDBWER_Zj7utvNfNJKmI1ure-R0to6yLIwLNp8ZZU3gZZcq8usfTfSB_ybS1LAcSTA-cswnVFe8CsGNiihLSp-Owts_Xcyf3dcHy8gMJaU_j9F-pQYSKQUNRmq2znBbiv02ovHck-TPtMR3TSLmGsUU8IeKffWf_9RAMdW1BZ-TCJQxgXep-wfhS-H3Ico9Jcds89TGT5420emt9SqGL5QH8QOYESRdZ4')] bg-cover bg-center" />
            <div>
              <p className="text-sm font-bold">Alex Johnson</p>
              <p className="text-xs text-slate-500">ID: #12345</p>
            </div>
          </div>
          <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
            <LogOut className="size-4" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="ml-64 flex-1">
        <header className="sticky top-0 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              className="w-full rounded-xl bg-slate-100 py-2 pl-10 pr-4 text-sm outline-none"
              placeholder="Search records, doctors..."
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative rounded-xl bg-slate-100 p-2 text-slate-600">
              <Bell className="size-4" />
              <span className="absolute right-2 top-2 size-2 rounded-full bg-red-500" />
            </button>
            <button className="rounded-xl bg-slate-100 p-2 text-slate-600">
              <MessageSquare className="size-4" />
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-6xl p-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="mb-2 text-3xl font-black text-slate-900">Welcome back, Alex</h1>
              <p className="text-slate-600">
                Manage your consultations and medical records in one place.
              </p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-2xl bg-[var(--primary)] px-6 py-3 font-bold text-white shadow-lg shadow-sky-200">
              <CalendarPlus2 className="size-5" />
              Book New Appointment
            </button>
          </div>

          <div className="mb-10 grid gap-6 md:grid-cols-3">
            {[
              {
                label: "Total Appointments",
                value: dashboard.totalAppointments,
                accent: "bg-blue-100 text-blue-600"
              },
              {
                label: "Upcoming Visits",
                value: dashboard.upcomingVisits,
                accent: "bg-sky-100 text-[var(--primary)]"
              },
              {
                label: "Completed Sessions",
                value: dashboard.completedSessions,
                accent: "bg-emerald-100 text-emerald-600"
              }
            ].map((stat) => (
              <article key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className={`mb-4 inline-flex rounded-xl p-2 ${stat.accent}`}>
                  <CalendarDays className="size-5" />
                </div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="mt-1 text-3xl font-black text-slate-900">{stat.value}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <section className="space-y-6 lg:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">My Upcoming Appointments</h2>
                <span className="text-sm font-bold text-[var(--primary)]">View Calendar</span>
              </div>
              {dashboard.appointments.map((appointment) => (
                <article
                  key={appointment.id}
                  className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row"
                >
                  <div className="flex min-w-[100px] flex-col items-center justify-center rounded-xl bg-slate-50 p-4">
                    <span className="text-xs font-bold uppercase text-slate-400">
                      {appointment.day}
                    </span>
                    <span className="text-2xl font-black text-slate-900">
                      {appointment.date}
                    </span>
                    <span className="text-xs text-slate-500">{appointment.weekday}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{appointment.doctor}</h3>
                        <p className="text-sm text-slate-500">
                          {appointment.specialty} • {appointment.type}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                        <CheckCircle2 className="size-3.5" />
                        {appointment.status}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
                      <span>{appointment.time}</span>
                      <span>{appointment.location}</span>
                    </div>
                  </div>
                </article>
              ))}
            </section>
            <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Account Snapshot</h2>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                Your patient profile is active, with secure access to medical
                records, upcoming visits, and billing summaries.
              </p>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
