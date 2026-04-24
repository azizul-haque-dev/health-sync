import { z } from "zod";

export const bookingCheckoutSchema = z.object({
  doctorSlug: z.string().min(1),
  slotLabel: z.string().min(1),
  appointmentDate: z.string().min(1),
  patientName: z.string().min(2),
  patientEmail: z.string().email(),
  patientPhone: z.string().min(8),
  notes: z.string().max(500).optional().or(z.literal("")),
  paymentMethod: z.enum(["card", "wallet"])
});

export type BookingCheckoutInput = z.infer<typeof bookingCheckoutSchema>;
