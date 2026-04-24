import { unstable_cache } from "next/cache";

import { branches, doctorSlots, doctors, specialties } from "@/lib/demo-data";

export const getBranches = unstable_cache(async () => branches, ["branches"], {
  tags: ["branches"]
});

export const getSpecialties = unstable_cache(async () => specialties, ["specialties"], {
  tags: ["specialties"]
});

export const getFeaturedDoctors = unstable_cache(
  async () => doctors.filter((doctor) => doctor.featured),
  ["featured-doctors"],
  {
    tags: ["doctors"]
  }
);

export async function searchDoctors(input?: {
  branch?: string;
  specialty?: string;
  query?: string;
}) {
  const normalized = {
    branch: input?.branch?.toLowerCase() ?? "",
    specialty: input?.specialty?.toLowerCase() ?? "",
    query: input?.query?.toLowerCase() ?? ""
  };

  return doctors.filter((doctor) => {
    const branchMatch = normalized.branch
      ? doctor.branch.toLowerCase().includes(normalized.branch)
      : true;
    const specialtyMatch = normalized.specialty
      ? doctor.specialty.toLowerCase().includes(normalized.specialty)
      : true;
    const queryMatch = normalized.query
      ? [doctor.name, doctor.title, doctor.specialty, doctor.branch]
          .join(" ")
          .toLowerCase()
          .includes(normalized.query)
      : true;

    return branchMatch && specialtyMatch && queryMatch;
  });
}

export async function getDoctor(slug: string) {
  return doctors.find((doctor) => doctor.slug === slug) ?? null;
}

export async function getDoctorSlots(slug: string, date?: string) {
  return doctorSlots.filter(
    (slot) => slot.doctorSlug === slug && (!date || slot.date === date)
  );
}
