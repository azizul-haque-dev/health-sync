"use client";

import { useState } from "react";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Devider from "../auth/Devider";
import SignInWithGoogle from "../auth/SignInWithGoogle";

type AuthMode = "sign-in" | "sign-up";

export function AuthForm({ mode }: { mode: AuthMode }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setError(null);

    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const name = String(formData.get("name") ?? "");

    const result =
      mode === "sign-up"
        ? await authClient.signUp.email({
            email,
            password,
            name,
            callbackURL: "/dashboard"
          })
        : await authClient.signIn.email({
            email,
            password,
            callbackURL: "/dashboard"
          });

    if (result.error) {
      setError(result.error.message ?? "Unable to continue.");
      setPending(false);
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <section className="panel rounded-[2rem] p-8">
      <h2 className="text-3xl font-black tracking-tight text-slate-900">
        {mode === "sign-up" ? "Create your account" : "Welcome back"}
      </h2>
      <p className="mt-3 text-slate-500">
        {mode === "sign-up"
          ? "Create a patient account to book appointments and manage visits."
          : "Sign in to access your healthcare dashboard and bookings."}
      </p>
      <form
        action={async (formData) => {
          await handleSubmit(formData);
        }}
        className="mt-8 space-y-4"
      >
        {mode === "sign-up" ? (
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Full Name
            </span>
            <input
              className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none"
              name="name"
              placeholder="Alex Johnson"
              required
            />
          </label>
        ) : null}
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-700">Email</span>
          <input
            className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none"
            name="email"
            placeholder="alex@example.com"
            required
            type="email"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-700">Password</span>
          <input
            className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none"
            name="password"
            placeholder="••••••••"
            required
            type="password"
          />
        </label>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button
          className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[var(--primary)] px-4 text-sm font-bold text-white"
          disabled={pending}
          type="submit"
        >
          {pending
            ? "Please wait..."
            : mode === "sign-up"
              ? "Create account"
              : "Sign in"}
        </button>
        <Devider />
      </form>
      <SignInWithGoogle />
      <p className="mt-6 text-sm text-slate-500">
        {mode === "sign-up" ? "Already have an account?" : "Need an account?"}{" "}
        <Link
          className="font-bold text-[var(--primary)]"
          href={mode === "sign-up" ? "/sign-in" : "/sign-up"}
        >
          {mode === "sign-up" ? "Sign in" : "Create one"}
        </Link>
      </p>
    </section>
  );
}
