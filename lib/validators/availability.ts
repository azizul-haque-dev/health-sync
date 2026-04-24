import { z } from "zod";

export const availabilitySchema = z.object({
  workingDays: z.array(z.string()).min(1),
  startTime: z.string().min(1),
  endTime: z.string().min(1),
  slotDuration: z.coerce.number().int().min(10).max(60)
});
