"use client";

import { nav } from "@/lib/staticData";
import Link from "next/link";
import { MobileMenuProps } from "../layout/marketing-header";

function MobileMenu({
  isMobileMenuOpen,
  setIsMobileMenuOpen
}: MobileMenuProps) {
  return (
    <>
      {isMobileMenuOpen && (
        <div className="absolute left-0 top-full w-full border-b border-slate-200/80 bg-white/95 px-6 py-6 shadow-xl backdrop-blur-md md:hidden">
          <nav className="flex flex-col gap-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                className="text-base font-medium text-slate-700 transition hover:text-[var(--primary)]"
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-6">
              <Link
                className="flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                href="/sign-in"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                className="flex w-full items-center justify-center rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-sky-200 transition hover:opacity-90"
                href="/sign-up"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

export default MobileMenu;
