import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Star } from "lucide-react";

import type { Doctor } from "@/lib/demo-data";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <article className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-md bg-white/90 px-2 py-1 text-xs font-bold text-orange-500 shadow-sm">
          <Star className="size-3 fill-current" />
          {doctor.rating.toFixed(1)}
        </span>
        <Image
          alt={doctor.name}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          src={doctor.image}
        />
      </div>
      <div className="space-y-4 p-5">
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--primary)]">
            {doctor.specialty}
          </p>
          <h3 className="text-lg font-bold text-slate-900">{doctor.name}</h3>
          <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
            <MapPin className="size-3.5" />
            {doctor.branch}
          </div>
        </div>
        <Link
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 transition hover:bg-[var(--primary)] hover:text-white"
          href={`/doctors/${doctor.slug}`}
        >
          View Availability
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}
