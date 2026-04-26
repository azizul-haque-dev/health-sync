import Link from "next/link";

function DesktopCta() {
  return (
    <div className="hidden items-center gap-3 md:flex">
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
  );
}

export default DesktopCta;
