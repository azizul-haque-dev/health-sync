import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Globe, GraduationCap, Heart, Home, Share2, Star } from "lucide-react";

import { getDoctor, getDoctorSlots } from "@/lib/services/catalog";
import { cn } from "@/lib/utils";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({
  params
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const doctor = await getDoctor(slug);

  return {
    title: doctor ? `${doctor.name} - Slot Booking` : "Doctor Profile",
    description: doctor?.bio ?? "Doctor profile and slot booking page."
  };
}

const dateChoices = [
  { label: "Mon", day: "21", active: false },
  { label: "Tue", day: "22", active: true },
  { label: "Wed", day: "23", active: false },
  { label: "Thu", day: "24", active: false },
  { label: "Fri", day: "25", active: false },
  { label: "Sat", day: "26", active: false }
];

export default async function DoctorProfilePage({
  params,
  searchParams
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { slug } = await params;
  const currentSearch = await searchParams;
  const selectedDate =
    typeof currentSearch.date === "string" ? currentSearch.date : "2026-04-28";
  const doctor = await getDoctor(slug);

  if (!doctor) {
    return <main className="mx-auto max-w-5xl px-6 py-20">Doctor not found.</main>;
  }

  const slots = await getDoctorSlots(slug, selectedDate);

  return (
    <main className="mx-auto flex max-w-[1100px] flex-col px-4 py-8 sm:px-10">
      <div className="flex flex-wrap gap-2 py-2 text-sm">
        <Link className="flex items-center gap-1 font-medium text-[var(--primary)]" href="/">
          <Home className="size-4" />
          Home
        </Link>
        <span className="text-slate-400">/</span>
        <Link className="font-medium text-[var(--primary)]" href={`/doctors?specialty=${doctor.specialty}`}>
          {doctor.specialty}
        </Link>
        <span className="text-slate-400">/</span>
        <span className="text-slate-500">{doctor.name}</span>
      </div>

      <section className="panel mt-6 overflow-hidden rounded-2xl">
        <div className="flex flex-col gap-8 p-6 md:flex-row md:p-8">
          <div
            className="h-40 w-40 shrink-0 rounded-2xl border-4 border-white bg-cover bg-center shadow-lg"
            style={{ backgroundImage: `url(${doctor.image})` }}
          />
          <div className="flex-1">
            <div className="flex flex-col justify-between gap-4 md:flex-row">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  {doctor.name}
                </h1>
                <p className="mt-1 text-lg font-semibold text-[var(--primary)]">
                  {doctor.title}
                </p>
                <p className="mt-2 flex items-center gap-2 text-slate-500">
                  <GraduationCap className="size-4" />
                  {doctor.education}
                </p>
                <p className="mt-2 flex items-center gap-2 text-slate-500">
                  <Globe className="size-4" />
                  Speaks {doctor.languages.join(", ")}
                </p>
              </div>
              <div className="flex gap-3">
                <button className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-800">
                  <Share2 className="size-4" />
                  Share
                </button>
                <button className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-800">
                  <Heart className="size-4" />
                  Save
                </button>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-2xl font-bold text-slate-900">{doctor.patientsTreated}+</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Patients Treated
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-2xl font-bold text-slate-900">{doctor.yearsExperience}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Years Experience
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-1">
                  <p className="text-2xl font-bold text-slate-900">{doctor.rating}</p>
                  <Star className="size-4 fill-yellow-400 text-yellow-400" />
                </div>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Patient Rating
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 pb-8">
          <h2 className="border-t border-slate-100 pt-6 text-lg font-bold text-slate-900">
            Professional Bio
          </h2>
          <p className="mt-3 max-w-4xl leading-8 text-slate-500">{doctor.bio}</p>
        </div>
      </section>

      <section className="mt-10 grid items-start gap-8 lg:grid-cols-3">
        <div className="panel rounded-2xl p-6 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <CalendarDays className="size-5 text-[var(--primary)]" />
              Appointment Scheduling
            </h2>
            <span className="text-sm font-medium text-slate-500">October 2026</span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-4">
            {dateChoices.map((choice) => (
              <Link
                key={choice.day}
                className={cn(
                  "flex h-20 min-w-[70px] flex-col items-center justify-center rounded-xl border text-center",
                  choice.active
                    ? "border-[var(--primary)] bg-sky-50 text-[var(--primary)]"
                    : "border-slate-200 bg-white text-slate-700"
                )}
                href={`?date=${selectedDate}`}
              >
                <span className="text-xs font-bold uppercase">{choice.label}</span>
                <span className="text-lg font-bold">{choice.day}</span>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
              <h3 className="font-bold text-slate-900">Available Time Slots (10-min intervals)</h3>
              <div className="flex gap-4 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="size-3 rounded-full bg-emerald-500" />
                  Available
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-3 rounded-full bg-slate-300" />
                  Booked
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-3 rounded-full bg-[var(--primary)]" />
                  Selected
                </span>
              </div>
            </div>
            <p className="mb-4 text-sm text-slate-500">Evening Shift: 6:00 PM - 10:00 PM</p>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
              {slots.map((slot) => (
                <Link
                  key={slot.id}
                  className={cn(
                    "rounded-xl border p-3 text-center text-sm font-bold",
                    slot.status === "available" &&
                      "border-emerald-200 bg-emerald-50 text-emerald-700",
                    slot.status === "booked" &&
                      "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400",
                    slot.status === "selected" &&
                      "border-[var(--primary)] bg-[var(--primary)] text-white shadow-md"
                  )}
                  href={`/checkout/${slug}?slot=${encodeURIComponent(slot.label)}&date=${selectedDate}`}
                >
                  {slot.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <aside className="panel rounded-2xl p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
            Booking Summary
          </p>
          <div className="mt-6 space-y-4 text-sm text-slate-500">
            <div>
              <p className="font-semibold text-slate-900">{doctor.name}</p>
              <p>{doctor.title}</p>
            </div>
            <div className="flex justify-between">
              <span>Consultation Fee</span>
              <span className="font-semibold text-slate-900">${doctor.consultationFee}</span>
            </div>
            <div className="flex justify-between">
              <span>Branch</span>
              <span className="text-right font-semibold text-slate-900">{doctor.branch}</span>
            </div>
          </div>
          <Link
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[var(--primary)] px-4 py-3 text-sm font-bold text-white"
            href={`/checkout/${slug}?slot=6:30%20PM&date=${selectedDate}`}
          >
            Continue to Checkout
          </Link>
        </aside>
      </section>
    </main>
  );
}
