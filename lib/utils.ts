import { clsx, type ClassValue } from "clsx";
import { time } from "console";
import { getDoctor } from "./services/catalog";
import { Doctor, Slot } from "./demo-data";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(value);
}

export function formatLongDate(date: string | Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(date));
}

export function formatTime(date: string | Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(date));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function timeToMinutes(timeStr: string): number {
  const [time, modifier] = timeStr.split(" ");
  console.log({ time, modifier });
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

function minutesToTime(totalMinutes: number): string {
  let hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const modifier = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  const minutesStr = mins < 10 ? `0${mins}` : mins;
  return `${hours}:${minutesStr} ${modifier}`;
}

// generate time slots
export function generateTimeSlots(doctor: Doctor, date: string): Slot[] {
  const startTime = timeToMinutes(doctor.avilabilityFrom);
  const endTime = timeToMinutes(doctor.avilabilityTo);
  const slotArray: string[] = [];

  // Loop to generate time strings based on the interval
  for (
    let current = startTime;
    current < endTime;
    current += doctor.timeInterval
  ) {
    slotArray.push(minutesToTime(current));
  }

  // Map the strings into the Slot object format
  return slotArray.map((slot, index) => {
    return {
      id: `${index + 1}`,
      doctorSlug: doctor.slug,
      date: date,
      label: slot, // Use the individual slot time, not the whole array
      status: "available"
    };
  });
}

const dateChoices = [
  { label: "Mon", day: "21", active: false },
  { label: "Tue", day: "22", active: true },
  { label: "Wed", day: "23", active: false },
  { label: "Thu", day: "24", active: false },
  { label: "Fri", day: "25", active: false },
  { label: "Sat", day: "26", active: false }
];
export function doctorAvailabilityDates(
  dayOff?: string, // e.g., "Sunday"
  leaveDays?: string[] // e.g., ["2026-04-28"]
): { label: string; day: string; fullDate: string }[] {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const current = new Date();
    current.setDate(today.getDate() + i);

    const fullDate = current.toISOString().split("T")[0];
    const dayName = current.toLocaleDateString("en-US", { weekday: "long" }); // "Monday"
    const label = current.toLocaleDateString("en-US", { weekday: "short" }); // "Mon"
    const dayNumber = current.getDate().toString();

    // 1. Skip if the day of the week is the doctor's day off
    if (dayOff) {
      if (dayName.toLowerCase() === dayOff.toLowerCase()) continue;
    }

    // 2. Skip if the specific date is in the leaveDays array
    if (leaveDays) {
      if (leaveDays.includes(fullDate)) continue;
    }

    dates.push({
      label: label,
      day: dayNumber,
      fullDate: fullDate
    });
  }

  return dates;
}
