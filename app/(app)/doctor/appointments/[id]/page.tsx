import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Appointment Detail - AI Summary",
  description: "AI-powered session analysis for doctor appointment detail."
};

export default function DoctorAppointmentDetailPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
            Appointment Detail
          </p>
          <h1 className="mt-4 text-3xl font-black text-slate-900">
            AI Summary for Sarah Mitchell
          </h1>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl bg-slate-50 p-5">
              <h2 className="font-bold text-slate-900">Chief Complaint</h2>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                Intermittent chest discomfort with mild shortness of breath over the
                past two weeks.
              </p>
            </article>
            <article className="rounded-2xl bg-slate-50 p-5">
              <h2 className="font-bold text-slate-900">Suggested Follow-up</h2>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                Schedule ECG review, lipid profile, and a two-week medication
                response check.
              </p>
            </article>
          </div>
          <article className="mt-6 rounded-2xl border border-slate-200 p-5">
            <h2 className="font-bold text-slate-900">Clinical Notes</h2>
            <p className="mt-3 text-sm leading-8 text-slate-500">
              Vitals stable during visit. Patient was advised on diet, activity
              pacing, and medication adherence. AI summary aligns with current care
              plan and flags cholesterol follow-up as the main priority.
            </p>
          </article>
        </section>
        <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Session Insights</h2>
          <div className="mt-6 space-y-4">
            {[
              "High adherence probability after education.",
              "No critical risk keywords detected.",
              "Recommended to send a reminder email in 48 hours."
            ].map((item) => (
              <div key={item} className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                {item}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
