"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { sendAppointmentEmail } from "@/lib/mailer";
import { bookingCheckoutSchema } from "@/lib/validators/booking";

export async function createBookingAction(formData: FormData) {
  const parsed = bookingCheckoutSchema.safeParse({
    doctorSlug: formData.get("doctorSlug"),
    slotLabel: formData.get("slotLabel"),
    appointmentDate: formData.get("appointmentDate"),
    patientName: formData.get("patientName"),
    patientEmail: formData.get("patientEmail"),
    patientPhone: formData.get("patientPhone"),
    notes: formData.get("notes"),
    paymentMethod: formData.get("paymentMethod")
  });

  if (!parsed.success) {
    throw new Error("Invalid booking request.");
  }

  const reference = `SB-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  await sendAppointmentEmail({
    to: parsed.data.patientEmail,
    patientName: parsed.data.patientName,
    doctorName: parsed.data.doctorSlug.replaceAll("-", " "),
    appointmentDate: parsed.data.appointmentDate,
    slotLabel: parsed.data.slotLabel,
    reference
  });

  revalidateTag("bookings", "max");
  revalidatePath("/dashboard");

  redirect(`/booking/${reference}/success`);
}
