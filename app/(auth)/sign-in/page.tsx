import type { Metadata } from "next";

import { AuthForm } from "@/components/forms/auth-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Access your HealthSync account."
};

export default function SignInPage() {
  return <AuthForm mode="sign-in" />;
}
