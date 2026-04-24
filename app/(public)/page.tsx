import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, SearchCheck, ShieldCheck, Stethoscope, TimerReset } from "lucide-react";

import { HeroSearch } from "@/components/sections/hero-search";
import { DoctorCard } from "@/components/shared/doctor-card";
import { getFeaturedDoctors } from "@/lib/services/catalog";

export const revalidate = 3600;

export default async function HomePage() {
  const featuredDoctors = await getFeaturedDoctors();

  return (
    <main>
      <section className="overflow-hidden px-6 pb-24 pt-16 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-[var(--primary)]">
              <ShieldCheck className="size-4" />
              Trusted by 10k+ Patients
            </div>
            <div className="space-y-5">
              <h1 className="max-w-2xl text-5xl font-black leading-[1.05] tracking-tight text-slate-900 lg:text-6xl">
                Healthcare Simplified.
                <span className="text-[var(--primary)]"> Book Appointments</span> in Seconds.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-600">
                Connect with top-rated specialists at your preferred branch. Quick,
                secure, and hassle-free scheduling for your peace of mind.
              </p>
            </div>
            <HeroSearch />
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 -z-10 scale-110 rounded-full bg-sky-100 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl">
              <Image
                alt="Smiling doctor in a modern clinic"
                className="aspect-[4/5] h-full w-full object-cover"
                height={1000}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsd-UGv4yYdb1Pn9vWjCPOZ5DC8Kd-F3RlUFn7UKcS09ULH-NIZUaUqEs_Q2JTTUkZ1fqdiuEowEKZmeKjdyDz6fOmzqctRfhi_XZeKW6CDoCNqyM0SojbIdDTNlT2ghAdHeLVIZ6bbmSmjWOsSy2Y-V2Z-GNY30qfoYXvvTBGKqECYM2jYFC5LR8V-kwjNO-HDT6sFg9xiaF48c5981NFrCKnAUr8tCkxEpdVOvzKot51S02TOWx0SNaAGZ3qlYQ206j6FA_xrik"
                width={800}
              />
            </div>
            <div className="absolute bottom-10 -left-8 flex max-w-[240px] items-center gap-4 rounded-2xl bg-white p-4 shadow-xl">
              <div className="flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="size-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  Appointment
                </p>
                <p className="text-sm font-bold">Successfully Booked!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24" id="how-it-works">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-black text-slate-900">
              How it works for Patients
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-500">
              Booking your healthcare consultation has never been easier. Follow
              these three simple steps.
            </p>
          </div>
          <div className="grid gap-12 md:grid-cols-3">
            {[
              {
                icon: SearchCheck,
                title: "Find a Specialist",
                copy: "Search for doctors by name, specialty, or branch location near you."
              },
              {
                icon: TimerReset,
                title: "Pick a Time",
                copy: "View real-time availability and select a slot that fits your schedule."
              },
              {
                icon: Stethoscope,
                title: "Instant Confirmation",
                copy: "Receive immediate confirmation via email with all your appointment details."
              }
            ].map((item) => (
              <article key={item.title} className="text-center">
                <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-[1.5rem] bg-sky-100 text-[var(--primary)]">
                  <item.icon className="size-9" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm leading-7 text-slate-500">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-black text-slate-900">Featured Specialists</h2>
              <p className="mt-2 text-slate-500">
                Book an appointment with our highly-rated doctors.
              </p>
            </div>
            <Link
              className="inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)]"
              href="/doctors"
            >
              View all doctors
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featuredDoctors.map((doctor) => (
              <DoctorCard key={doctor.slug} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="relative overflow-hidden rounded-[2rem] bg-[var(--primary)] p-12 lg:p-20">
            <div className="absolute right-0 top-0 h-full w-1/2 translate-x-1/3 skew-x-[-18deg] bg-white/10" />
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl font-black tracking-tight text-white lg:text-5xl">
                Are you a healthcare provider?
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/80">
                Join our network of medical professionals and grow your practice
                with smart scheduling, patient operations, and role-based
                reporting.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  className="rounded-xl bg-white px-8 py-4 font-bold text-[var(--primary)] shadow-xl"
                  href="/admin"
                >
                  Join as Provider
                </Link>
                <Link
                  className="rounded-xl border-2 border-white/30 px-8 py-4 font-bold text-white"
                  href="/admin/reports"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
