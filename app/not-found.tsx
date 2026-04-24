import Link from "next/link";

export default function NotFound() {
  return (
    <main className="app-shell flex min-h-screen items-center justify-center px-6">
      <div className="max-w-xl rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
          Not Found
        </p>
        <h1 className="mt-4 text-4xl font-black text-slate-900">
          The requested page could not be found.
        </h1>
        <p className="mt-4 text-slate-500">
          Head back to the homepage to continue browsing doctors and appointments.
        </p>
        <Link
          className="mt-8 inline-flex rounded-xl bg-[var(--primary)] px-6 py-3 font-bold text-white"
          href="/"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
