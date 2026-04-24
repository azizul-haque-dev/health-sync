import type { Metadata } from "next";
import Link from "next/link";
import { CalendarPlus2, CheckCircle2, CreditCard, Download, LayoutDashboard, MapPin } from "lucide-react";

type Params = Promise<{ reference: string }>;

export const metadata: Metadata = {
  title: "Booking Confirmation Success",
  description: "Appointment confirmation and receipt summary."
};

export default async function BookingSuccessPage({
  params
}: {
  params: Params;
}) {
  const { reference } = await params;

  return (
    <main className="mx-auto flex max-w-[800px] flex-col items-center px-4 py-16">
      <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-emerald-100 text-[var(--success)]">
        <CheckCircle2 className="size-12" />
      </div>
      <h1 className="text-center text-4xl font-bold tracking-tight text-slate-900">
        Booking Confirmed!
      </h1>
      <p className="mt-2 text-lg font-medium text-emerald-600">Reference: #{reference}</p>
      <p className="mt-4 max-w-xl text-center text-slate-500">
        A confirmation email with your appointment details and receipt has been
        sent to your inbox.
      </p>

      <section className="panel mt-10 w-full overflow-hidden rounded-2xl">
        <div className="flex flex-col @container xl:flex-row">
          <div
            className="aspect-video w-full bg-cover bg-center xl:w-1/3 xl:aspect-square"
            style={{
              backgroundImage:
                "url(https://lh3.googleusercontent.com/aida-public/AB6AXuB623X2Gy778WuvpY1pSP-nS4lmENV94PRlO9iu8Lj0lRbcg1ZqjvkT3dwf8sU9r4fB0FNmZLEmqnine7dW-dyBgrtpz2OTR_daEe4HUuhulDlGAewoVI8wL2lUiUpu_kRbMq4XogT-9WQfsKGfdMzzLJrU1PqLO7kdLbLcX3yuef_BwbS_tktLq5U2ZpbLb9MNXFEYyJowvjstAKgd_93oM04Fu3pEGY2CvZzpQxqcIle5cUodtF5ehfymokpYfcOxqP6tLTcY2P0)"
            }}
          />
          <div className="grow p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Cardiology Consultation with Dr. Robert Chen
                </h2>
                <p className="mt-1 text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
                  Confirmed
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-3 text-slate-500">
              <p className="flex items-center gap-3">
                <CalendarPlus2 className="size-4 text-emerald-600" />
                Tuesday, Apr 28, 2026 at 6:30 PM
              </p>
              <p className="flex items-center gap-3">
                <MapPin className="size-4 text-emerald-600" />
                Central Medical Tower, Suite 400
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="panel mt-8 w-full rounded-2xl p-6">
        <h3 className="text-lg font-bold text-slate-900">Payment Summary</h3>
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Service Fee</span>
            <span className="font-medium text-slate-900">$120.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Tax</span>
            <span className="font-medium text-slate-900">$10.00</span>
          </div>
          <div className="flex justify-between border-t border-slate-100 pt-3">
            <span className="font-bold text-slate-900">Total Paid</span>
            <span className="font-bold text-emerald-600">$130.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Payment Method</span>
            <span className="inline-flex items-center gap-2 text-slate-900">
              <CreditCard className="size-4" />
              Visa ending in 4242
            </span>
          </div>
        </div>
      </section>

      <div className="mt-10 grid w-full gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-900">
            <CalendarPlus2 className="size-4" />
            Add to Calendar
          </button>
          <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-900">
            <Download className="size-4" />
            Download Receipt
          </button>
        </div>
        <Link
          className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-[var(--success)] px-4 text-lg font-bold text-[var(--success-foreground)] shadow-lg"
          href="/dashboard"
        >
          <LayoutDashboard className="size-5" />
          Go to My Dashboard
        </Link>
      </div>
    </main>
  );
}
