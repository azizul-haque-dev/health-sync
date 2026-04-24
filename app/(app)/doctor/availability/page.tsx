import type { Metadata } from "next";

import { SubmitButton } from "@/components/forms/submit-button";
import { saveAvailabilityAction } from "@/lib/actions/availability";

export const metadata: Metadata = {
  title: "Manage Doctor Availability",
  description: "Manage recurring availability, shift hours, and off-days."
};

const days = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday"
];

export default function DoctorAvailabilityPage() {
  return (
    <main className="mx-auto max-w-[1024px] px-6 py-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Availability Settings
          </h1>
          <p className="mt-2 text-slate-500">
            Define your working hours and generate appointment slots for patients.
          </p>
        </div>
      </div>
      <form action={saveAvailabilityAction} className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-slate-900">Regular Weekly Hours</h2>
            <p className="mb-6 text-sm text-slate-500">
              Select the days of the week you are available for bookings.
            </p>
            <div className="flex flex-wrap gap-3">
              {days.map((day, index) => (
                <label key={day} className="cursor-pointer">
                  <input
                    defaultChecked={index < 5}
                    name="workingDays"
                    type="checkbox"
                    value={day}
                  />
                  <span className="mt-2 inline-flex h-12 w-24 items-center justify-center rounded-xl border-2 border-slate-100 bg-slate-50 text-sm font-semibold text-slate-700">
                    {day}
                  </span>
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold text-slate-900">Shift Details</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <label className="block space-y-2">
                <span className="text-sm font-bold text-slate-700">Start Time</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                  defaultValue="09:00"
                  name="startTime"
                  type="time"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-bold text-slate-700">End Time</span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                  defaultValue="17:00"
                  name="endTime"
                  type="time"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-bold text-slate-700">Slot Duration</span>
                <select
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                  defaultValue="30"
                  name="slotDuration"
                >
                  <option value="15">15 Minutes</option>
                  <option value="30">30 Minutes</option>
                  <option value="45">45 Minutes</option>
                  <option value="60">60 Minutes</option>
                </select>
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Off-Days & Holidays</h2>
              <button
                className="rounded-xl bg-sky-100 px-4 py-2 text-sm font-bold text-[var(--primary)]"
                type="button"
              >
                Add Date Range
              </button>
            </div>
            <div className="space-y-3">
              {[
                "Vacation leave · Apr 30 - May 03",
                "Conference block · May 12 - May 14"
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4"
                >
                  <span className="text-sm text-slate-700">{item}</span>
                  <button className="text-sm font-bold text-red-500" type="button">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
        <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900">Slot Generation Rules</h3>
          <p className="mt-4 text-sm leading-7 text-slate-500">
            Weekly off-days are permanent. Active date ranges must align with the
            selected weekly pattern, and one slot can only hold one booking.
          </p>
          <SubmitButton
            className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl bg-[var(--primary)] px-4 text-sm font-bold text-white"
            label="Save Changes"
            pendingLabel="Saving..."
          />
        </aside>
      </form>
    </main>
  );
}
