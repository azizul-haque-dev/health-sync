import nodemailer from "nodemailer";

import { env } from "@/lib/env";

export function getMailer() {
  if (!env.GMAIL_APP_USER || !env.GMAIL_APP_PASSWORD) {
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.GMAIL_APP_USER,
      pass: env.GMAIL_APP_PASSWORD
    }
  });
}

export async function sendAppointmentEmail(input: {
  to: string;
  patientName: string;
  doctorName: string;
  appointmentDate: string;
  slotLabel: string;
  reference: string;
}) {
  const transporter = getMailer();

  if (!transporter) {
    return;
  }

  await transporter.sendMail({
    from: env.GMAIL_APP_USER,
    to: input.to,
    subject: `Appointment confirmed - ${input.reference}`,
    text: [
      `Hello ${input.patientName},`,
      `Your appointment with ${input.doctorName} is confirmed.`,
      `Date: ${input.appointmentDate}`,
      `Time: ${input.slotLabel}`,
      `Reference: ${input.reference}`
    ].join("\n")
  });
}
