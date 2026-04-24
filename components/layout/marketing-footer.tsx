import Link from "next/link";

import { Logo } from "@/components/shared/logo";

const footerGroups = [
  {
    title: "Platform",
    links: ["Find a Doctor", "Specialties", "Medical Branches", "Mobile App"]
  },
  {
    title: "Company",
    links: ["About Us", "Success Stories", "For Providers", "Contact"]
  },
  {
    title: "Support",
    links: ["Help Center", "Privacy Policy", "Terms of Service", "Trust & Safety"]
  }
];

export function MarketingFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white pt-16">
      <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-10">
        <div className="mb-16 grid gap-12 md:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-500">
              Redefining patient-doctor connections with seamless scheduling and
              top-tier clinical care.
            </p>
          </div>
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="mb-6 font-bold text-slate-900">{group.title}</h2>
              <div className="space-y-4 text-sm text-slate-500">
                {group.links.map((link) => (
                  <Link
                    key={link}
                    className="block transition hover:text-[var(--primary)]"
                    href="/"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 text-xs text-slate-400 md:flex-row">
          <p>© 2026 HealthSync Technologies Inc. All rights reserved.</p>
          <p>Server-rendered with Next.js 16, Tailwind 4, Prisma, Better Auth, and MongoDB.</p>
        </div>
      </div>
    </footer>
  );
}
