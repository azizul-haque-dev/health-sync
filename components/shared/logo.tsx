import Link from "next/link";
import { Activity, ShieldPlus } from "lucide-react";

import { cn } from "@/lib/utils";

type LogoProps = {
  href?: string;
  label?: string;
  compact?: boolean;
  variant?: "default" | "admin" | "success";
};

export function Logo({
  href = "/",
  label = "HealthSync",
  compact = false,
  variant = "default"
}: LogoProps) {
  const Icon = variant === "admin" ? Activity : ShieldPlus;

  return (
    <Link className="flex items-center gap-3" href={href}>
      <span
        className={cn(
          "flex items-center justify-center rounded-xl text-white shadow-lg",
          variant === "success" ? "bg-[var(--success)]" : "bg-[var(--primary)]",
          compact ? "size-9" : "size-10"
        )}
      >
        <Icon className={compact ? "size-4" : "size-5"} />
      </span>
      <span className="font-black tracking-tight text-slate-900">{label}</span>
    </Link>
  );
}
