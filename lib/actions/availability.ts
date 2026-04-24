"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { availabilitySchema } from "@/lib/validators/availability";

export async function saveAvailabilityAction(formData: FormData) {
  const parsed = availabilitySchema.safeParse({
    workingDays: formData.getAll("workingDays"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
    slotDuration: formData.get("slotDuration")
  });

  if (!parsed.success) {
    throw new Error("Availability settings are invalid.");
  }

  revalidateTag("doctor-dashboard", "max");
  revalidatePath("/doctor/availability");
}
