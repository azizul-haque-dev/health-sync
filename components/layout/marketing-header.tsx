import Link from "next/link";

import { Logo } from "@/components/shared/logo";

const nav = [
  { href: "/doctors", label: "Find a Doctor" },
  { href: "/doctors?specialty=Cardiology", label: "Specialties" },
  { href: "/#how-it-works", label: "How it Works" },
  { href: "/admin", label: "For Providers" }
];

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              className="text-sm font-medium text-slate-700 transition hover:text-[var(--primary)]"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            className="px-4 py-2 text-sm font-semibold text-slate-700 transition hover:text-[var(--primary)]"
            href="/sign-in"
          >
            Sign In
          </Link>
          <Link
            className="rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-sky-200 transition hover:opacity-90"
            href="/sign-up"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
