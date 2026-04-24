import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, ChevronRight, CreditCard, Info, MapPin, ShieldCheck, Wallet } from "lucide-react";

import { SubmitButton } from "@/components/forms/submit-button";
import { createBookingAction } from "@/lib/actions/booking";
import { getDoctor } from "@/lib/services/catalog";
import { currency, formatLongDate } from "@/lib/utils";

type Params = Promise<{ bookingId: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export const metadata: Metadata = {
  title: "Appointment Checkout",
  description: "Securely finalize your appointment booking."
};

export default async function CheckoutPage({
  params,
  searchParams
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { bookingId } = await params;
  const currentSearch = await searchParams;
  const slot =
    typeof currentSearch.slot === "string" ? currentSearch.slot : "10:00 AM";
  const date =
    typeof currentSearch.date === "string" ? currentSearch.date : "2026-04-28";
  const doctor = await getDoctor(bookingId);

  if (!doctor) {
    return <main className="mx-auto max-w-5xl px-6 py-20">Booking target not found.</main>;
  }

  return (
    <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-10 lg:px-20">
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <Link href="/doctors">Search</Link>
        <ChevronRight className="size-4" />
        <Link href={`/doctors/${doctor.slug}`}>Appointment Selection</Link>
        <ChevronRight className="size-4" />
        <span className="font-semibold text-slate-900">Secure Payment</span>
      </div>
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tight text-slate-900">
          Finalize Your Appointment
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Complete your booking securely. Your appointment details are held for 10
          minutes.
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <section className="panel overflow-hidden rounded-2xl">
            <div className="border-b border-slate-100 bg-slate-50/80 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
                Appointment Summary
              </p>
            </div>
            <div className="space-y-6 p-6">
              <div className="flex items-center gap-4">
                <div
                  className="size-16 rounded-xl border border-slate-100 bg-cover bg-center"
                  style={{ backgroundImage: `url(${doctor.image})` }}
                />
                <div>
                  <p className="text-lg font-bold text-slate-900">{doctor.name}</p>
                  <p className="text-sm text-slate-500">{doctor.title}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs font-medium text-[var(--primary)]">
                    <ShieldCheck className="size-3.5" />
                    Certified Specialist
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="rounded-lg bg-sky-100 p-2 text-[var(--primary)]">
                    <MapPin className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{doctor.branch}</p>
                    <p className="text-xs text-slate-500">12th Avenue, Medical District, NY</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="rounded-lg bg-sky-100 p-2 text-[var(--primary)]">
                    <CalendarDays className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{formatLongDate(date)}</p>
                    <p className="text-xs text-slate-500">{slot} (10 min session)</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3 border-t border-slate-100 pt-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Consultation Fee</span>
                  <span className="font-medium text-slate-900">
                    {currency(doctor.consultationFee)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Service Fee</span>
                  <span className="font-medium text-slate-900">{currency(5)}</span>
                </div>
                <div className="flex justify-between border-t border-dashed border-slate-200 pt-3">
                  <span className="font-bold text-slate-900">Total Payable</span>
                  <span className="text-2xl font-black text-[var(--primary)]">
                    {currency(doctor.consultationFee + 5)}
                  </span>
                </div>
              </div>
            </div>
          </section>
          <div className="flex items-center gap-2 rounded-xl border border-sky-200 bg-sky-50 p-4 text-xs text-slate-700">
            <Info className="size-4 text-[var(--primary)]" />
            Free cancellation up to 24 hours before your appointment.
          </div>
        </div>
        <section className="panel rounded-2xl p-6 md:p-8 lg:col-span-7">
          <h2 className="mb-6 text-xl font-bold text-slate-900">Payment Information</h2>
          <form action={createBookingAction} className="space-y-4">
            <input name="doctorSlug" type="hidden" value={doctor.slug} />
            <input name="slotLabel" type="hidden" value={slot} />
            <input name="appointmentDate" type="hidden" value={date} />

            <div className="mb-8 grid grid-cols-2 gap-4">
              <label className="cursor-pointer">
                <input defaultChecked name="paymentMethod" type="radio" value="card" />
                <div className="mt-2 flex flex-col items-center justify-center rounded-2xl border-2 border-slate-100 p-4">
                  <CreditCard className="mb-1 size-8 text-[var(--primary)]" />
                  <span className="text-sm font-semibold">Card</span>
                </div>
              </label>
              <label className="cursor-pointer">
                <input name="paymentMethod" type="radio" value="wallet" />
                <div className="mt-2 flex flex-col items-center justify-center rounded-2xl border-2 border-slate-100 p-4">
                  <Wallet className="mb-1 size-8 text-slate-400" />
                  <span className="text-sm font-semibold">Digital Wallet</span>
                </div>
              </label>
            </div>

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-slate-700">Patient Name</span>
              <input
                className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none"
                name="patientName"
                placeholder="Johnathan Doe"
                required
              />
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-slate-700">Email</span>
                <input
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none"
                  name="patientEmail"
                  placeholder="john@example.com"
                  required
                  type="email"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-slate-700">Phone</span>
                <input
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none"
                  name="patientPhone"
                  placeholder="+1 555 000 000"
                  required
                />
              </label>
            </div>
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-slate-700">Notes</span>
              <textarea
                className="min-h-28 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
                name="notes"
                placeholder="Optional patient note"
              />
            </label>
            <SubmitButton
              className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[var(--primary)] px-4 text-sm font-bold text-white shadow-lg shadow-sky-200"
              label={`Pay ${currency(doctor.consultationFee + 5)}`}
              pendingLabel="Confirming appointment..."
            />
          </form>
        </section>
      </div>
    </main>
  );
}
