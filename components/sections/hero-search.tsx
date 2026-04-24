import { CalendarDays, MapPin, Search, Stethoscope } from "lucide-react";

import { getBranches, getSpecialties } from "@/lib/services/catalog";

export async function HeroSearch() {
  const [branches, specialties] = await Promise.all([
    getBranches(),
    getSpecialties()
  ]);

  return (
    <form
      action="/doctors"
      className="rounded-[1.5rem] border border-slate-100 bg-white p-6 shadow-2xl shadow-slate-200"
    >
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {/* Branch */}
        <label className="flex flex-col gap-1 border-slate-200 px-4 py-2 border">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
            Branch
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="size-4 text-[var(--primary)]" />
            <select
              className="w-full border-none bg-transparent p-0 text-sm font-medium text-slate-700 outline-none"
              defaultValue=""
              name="branch"
            >
              <option value="">Select Location</option>
              {branches.map((branch) => (
                <option key={branch.slug} value={branch.name}>
                  {branch.name}
                </option>
              ))}
            </select>
          </span>
        </label>

        {/* Specialty */}
        <label className="flex flex-col gap-1 border-slate-200 px-4 py-2 border">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
            Specialty
          </span>
          <span className="flex items-center gap-2">
            <Stethoscope className="size-4 text-[var(--primary)]" />
            <select
              className="w-full border-none bg-transparent p-0 text-sm font-medium text-slate-700 outline-none"
              defaultValue=""
              name="specialty"
            >
              <option value="">Choose Specialty</option>
              {specialties.map((specialty) => (
                <option key={specialty.slug} value={specialty.name}>
                  {specialty.name}
                </option>
              ))}
            </select>
          </span>
        </label>

        {/* Date */}
        <label className="flex flex-col gap-1 border-slate-200 px-4 py-2 border">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
            Date
          </span>
          <span className="flex items-center gap-2">
            <CalendarDays className="size-4 text-[var(--primary)]" />
            <select
              className="w-full border-none bg-transparent p-0 text-sm font-medium text-slate-700 outline-none"
              defaultValue=""
              name="date"
            >
              <option value="">Select Date</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="this-week">This Week</option>
            </select>
          </span>
        </label>

        {/* Button */}
        <div className="flex items-end">
          <button
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-8 py-4 text-sm font-bold text-white transition hover:opacity-90"
            type="submit"
          >
            <Search className="size-4" />
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
