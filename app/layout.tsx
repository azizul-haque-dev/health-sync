import type { Metadata } from "next";
import localFont from "next/font/local";

import "@/app/globals.css";

const uiFont = localFont({
  src: "../public/fonts/segoeui.ttf",
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "HealthSync | Professional Medical Booking",
    template: "%s | HealthSync"
  },
  description:
    "Production-ready healthcare appointment platform built with Next.js 16, Tailwind 4, MongoDB, Prisma, Better Auth, and Nodemailer.",
  openGraph: {
    title: "HealthSync",
    description:
      "Smart appointment booking, doctor discovery, secure checkout, and healthcare operations dashboards.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={uiFont.variable} lang="en">
      <body className="font-[var(--font-inter)]">{children}</body>
    </html>
  );
}
