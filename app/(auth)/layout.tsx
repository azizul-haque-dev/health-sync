import { Logo } from "@/components/shared/logo";

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="app-shell min-h-screen px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <Logo />
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <section className="rounded-[2rem] bg-[var(--primary)] p-10 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/70">
              Secure Access
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight">
              Better Auth powered healthcare identity.
            </h1>
            <p className="mt-6 max-w-md text-white/80">
              Email-password login, Google OAuth, and server-first route groups ready
              for patient, doctor, and admin experiences.
            </p>
          </section>
          {children}
        </div>
      </div>
    </main>
  );
}
