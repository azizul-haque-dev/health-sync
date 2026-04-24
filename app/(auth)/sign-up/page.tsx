import type { Metadata } from "next";

import { AuthForm } from "@/components/forms/auth-form";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your HealthSync patient account."
};

export default function SignUpPage() {
  return <AuthForm mode="sign-up" />;
}
