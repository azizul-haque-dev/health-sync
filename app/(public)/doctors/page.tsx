import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Building2, ChevronRight, MapPin, Search, Star } from "lucide-react";

import { getBranches, getSpecialties, searchDoctors } from "@/lib/services/catalog";

export const metadata: Metadata = {
  title: "Doctor Search Results",
  description: "Search doctors by branch, specialty, and availability."
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function DoctorsPage({
  searchParams
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const branch = typeof params.branch === "string" ? params.branch : "";
  const specialty = typeof params.specialty === "string" ? params.specialty : "";
  const query = typeof params.query === "string" ? params.query : "";

  const [results, branches, specialties] = await Promise.all([
    searchDoctors({ branch, specialty, query }),
    getBranches(),
    getSpecialties()
  ]);

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-6">
      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
        <Link href="/">Home</Link>
        <ChevronRight className="size-4" />
        <span>Search</span>
        <ChevronRight className="size-4" />
        <span className="font-semibold text-slate-900">Doctors</span>
      </nav>
      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="w-full lg:w-72">
          <form className="panel sticky top-24 rounded-2xl p-5">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold">Filters</h2>
              <Link className="text-xs font-medium text-[var(--primary)]" href="/doctors">
                Clear all
              </Link>
            </div>
            <div className="space-y-6">
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  Search
                </span>
                <span className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-3">
                  <Search className="size-4 text-slate-400" />
                  <input
                    className="w-full bg-transparent text-sm outline-none"
                    defaultValue={query}
                    name="query"
                    placeholder="Name or condition"
                  />
                </span>
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  Specialty
                </span>
                <select
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none"
                  defaultValue={specialty}
                  name="specialty"
                >
                  <option value="">All Specialties</option>
                  {specialties.map((item) => (
                    <option key={item.slug} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  Branch
                </span>
                <select
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none"
                  defaultValue={branch}
                  name="branch"
                >
                  <option value="">All Locations</option>
                  {branches.map((item) => (
                    <option key={item.slug} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
              <button
                className="w-full rounded-xl bg-[var(--primary)] px-4 py-3 text-sm font-bold text-white"
                type="submit"
              >
                Apply Filters
              </button>
            </div>
          </form>
        </aside>
        <section className="flex-1">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-slate-900">
                {results.length} Doctors found
              </h1>
              <p className="flex items-center gap-1 text-slate-500">
                <MapPin className="size-4" />
                Available specialists across your selected locations
              </p>
            </div>
          </div>
          <div className="mb-8 flex flex-wrap gap-2">
            {[specialty, branch, query].filter(Boolean).map((item) => (
              <span
                key={item}
                className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-[var(--primary)]"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {results.map((doctor) => (
              <article
                key={doctor.slug}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <Image
                    alt={doctor.name}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    fill
                    sizes="(max-width: 1280px) 50vw, 33vw"
                    src={doctor.image}
                  />
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md bg-white/90 px-2 py-1 text-[10px] font-bold text-[var(--primary)] shadow-sm">
                    <Star className="size-3 fill-current" />
                    {doctor.rating}
                  </span>
                </div>
                <div className="space-y-5 p-5">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">{doctor.name}</h2>
                    <p className="text-sm font-semibold text-[var(--primary)]">{doctor.title}</p>
                  </div>
                  <div className="space-y-2 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <Building2 className="size-4" />
                      {doctor.branch}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4" />
                      Available: Next Monday
                    </div>
                  </div>
                  <Link
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-3 text-sm font-bold text-white"
                    href={`/doctors/${doctor.slug}`}
                  >
                    View Availability
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
