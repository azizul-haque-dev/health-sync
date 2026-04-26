import { cn, doctorAvailabilityDates } from "@/lib/utils";
import Link from "next/link";
import React from "react";

function DoctorDateChoice({ date }: { date: string }) {
  const dateChoices = doctorAvailabilityDates();
  return (
    <div className="flex gap-3 overflow-x-auto pb-4">
      {dateChoices.map((choice) => (
        <Link
          scroll={false}
          key={choice.day}
          className={cn(
            "flex h-20 min-w-[70px] flex-col items-center justify-center rounded-xl border text-center",
            choice.fullDate === date
              ? "border-[var(--primary)] bg-sky-50 text-[var(--primary)]"
              : "border-slate-200 bg-white text-slate-700"
          )}
          href={`?date=${choice.fullDate}`}
        >
          <span className="text-xs font-bold uppercase">{choice.label}</span>
          <span className="text-lg font-bold">{choice.day}</span>
        </Link>
      ))}
    </div>
  );
}

export default DoctorDateChoice;
