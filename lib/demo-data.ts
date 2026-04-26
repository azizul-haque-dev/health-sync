import { getDoctor } from "./services/catalog";

export type Branch = {
  slug: string;
  name: string;
  city: string;
  address: string;
  phone: string;
};

export type Specialty = {
  slug: string;
  name: string;
  description: string;
};

export type Doctor = {
  slug: string;
  name: string;
  title: string;
  specialty: string;
  specialtySlug: string;
  branch: string;
  branchSlug: string;
  bio: string;
  avilabilityFrom: string;
  avilabilityTo: string;
  timeInterval: number;
  education: string;
  languages: string[];
  yearsExperience: number;
  patientsTreated: number;
  rating: number;
  reviewCount: number;
  consultationFee: number;
  image: string;
  featured?: boolean;
};

export type Slot = {
  id: string;
  doctorSlug: string;
  date: string;
  label: string;
  status: "available" | "booked" | "selected";
};

export const branches: Branch[] = [
  {
    slug: "central-medical-tower",
    name: "Central Medical Tower",
    city: "New York",
    address: "12th Avenue, Medical District, NY",
    phone: "+1 (212) 555-0112"
  },
  {
    slug: "north-bay-childrens-center",
    name: "North Bay Children's Center",
    city: "New York",
    address: "88 North Bay Road, NY",
    phone: "+1 (212) 555-0192"
  },
  {
    slug: "city-general-hospital",
    name: "City General Hospital",
    city: "New York",
    address: "4 Midtown Plaza, NY",
    phone: "+1 (212) 555-0181"
  }
];

export const specialties: Specialty[] = [
  {
    slug: "cardiology",
    name: "Cardiology",
    description:
      "Preventive cardiology, diagnostics, and long-term heart health."
  },
  {
    slug: "pediatrics",
    name: "Pediatrics",
    description: "Modern child health care with family-centered consultation."
  },
  {
    slug: "dermatology",
    name: "Dermatology",
    description: "Skin, hair, and cosmetic dermatology consultations."
  },
  {
    slug: "neurology",
    name: "Neurology",
    description: "Evidence-based brain, spine, and nerve care."
  }
];

export const doctors: Doctor[] = [
  {
    slug: "dr-robert-chen",
    name: "Dr. Robert Chen",
    title: "Senior Cardiologist",
    specialty: "Cardiology",
    specialtySlug: "cardiology",
    branch: "Central Medical Tower",
    branchSlug: "central-medical-tower",
    bio: "Board-certified cardiologist focused on preventive care, imaging, and long-term treatment plans.",
    education: "MBBS, MD, FACC (Johns Hopkins University)",
    languages: ["English", "Spanish", "French"],
    yearsExperience: 15,
    patientsTreated: 1200,
    avilabilityFrom: "6:00 PM",
    avilabilityTo: "9:40 PM",
    timeInterval: 30,
    rating: 4.9,
    reviewCount: 426,
    consultationFee: 120,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAK04dlCVKllloMhmxMpNyat32p3VQ8XttYPSs1yoUGHVsLJjRaA4MpLEp8QxwEYq_MjCmNc1xHcMlH_wG4pEZfxYc_epfC7nrlFLOdPGBiaY3BZYtXdmwM7oQgFjywkociBBPTc4a_iVvZq7K_8b-_XPZXXKcBKm9wj7ej71apxZeRLNcjRjRny1vjzGyFvH05WSORv1WKz3WPPrOtGqCycA8VKTvi94ngFLEp_qQ04AZcc3D5hJ93T0qFUpRQKty_-gDsJzqeiGw",
    featured: true
  },
  {
    slug: "dr-sarah-miller",
    name: "Dr. Sarah Miller",
    title: "Pediatric Specialist",
    specialty: "Pediatrics",
    specialtySlug: "pediatrics",
    branch: "North Bay Children's Center",
    branchSlug: "north-bay-childrens-center",
    bio: "Pediatric physician building warm, efficient care journeys for children and parents.",
    education: "MBBS, DCH (Boston Children's Hospital)",
    languages: ["English", "Arabic"],
    avilabilityFrom: "6:00 PM",
    avilabilityTo: "9:40 PM",
    yearsExperience: 12,
    patientsTreated: 980,
    timeInterval: 30,
    rating: 4.8,
    reviewCount: 298,
    consultationFee: 95,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ8RoixjR8pmjpxBl9mfDs5EX2JjhjgIy6A0D70-XWybiuP14LbxlhjmKn_ylkQoZSJ2twXiKzGBCNp6Gm1C_3zrCUDAK6yzm8YZlpOumA4VZer4k46b1Fq9nD9uCToNG8NHLza1zvsSHhyNl-K4CrzNpjCHuJsEmN-5xw7wWiZbUodpQZln9rf7r3k3T65tsBDbBnzhvAiFi1Kuvst4Mqc_swYlnIHgALE6r2HJTESHXBmku71sDcb9uQA56PmaamngpO1ut0pzU",
    featured: true
  },
  {
    slug: "dr-james-wilson",
    name: "Dr. James Wilson",
    title: "Dermatology Consultant",
    specialty: "Dermatology",
    specialtySlug: "dermatology",
    branch: "Wellness Park West",
    branchSlug: "central-medical-tower",
    bio: "Dermatologist specializing in medical and aesthetic treatment pathways with clear follow-up planning.",
    education: "MBBS, MD Dermatology (Mayo Clinic)",
    languages: ["English", "German"],
    avilabilityFrom: "6:00 PM",
    avilabilityTo: "9:40 PM",
    timeInterval: 30,
    yearsExperience: 10,
    patientsTreated: 850,
    rating: 5,
    reviewCount: 221,
    consultationFee: 110,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuATwlK5Fkh9NCC0t0CM0zJIg65yHBC8quVHpTGh6_XbgWf4ZEzvjx8jMo7ZBzKeu_n8Ft8_UG58kvSM4Dbu65etYxQaW0FjhkkCvXKdtgZyTALHl5on3fIgDexTR2k5YEBdrJgSYnp0xXsMPLXQw2fOwGi-MMKtLZN-w3_U99jHKRswCvkNl4c3PvNY4og-Xsy4DHtz6oImBpqpF-TuD8SMOhZChnt1gJF9zA9XFeHEuHnXO-iVx1CELRr2_HNyGAeqAwBNjkTAYqI",
    featured: true
  },
  {
    slug: "dr-elena-rodriguez",
    name: "Dr. Elena Rodriguez",
    title: "Neurology Consultant",
    specialty: "Neurology",
    specialtySlug: "neurology",
    branch: "City General Hospital",
    branchSlug: "city-general-hospital",
    bio: "Neurologist with a focus on accessible, evidence-backed treatment journeys and diagnostics.",
    education: "MBBS, DM Neurology (Cleveland Clinic)",
    languages: ["English", "Spanish"],
    avilabilityFrom: "6:00 PM",
    avilabilityTo: "9:40 PM",
    yearsExperience: 13,
    timeInterval: 30,
    patientsTreated: 1040,
    rating: 4.7,
    reviewCount: 187,
    consultationFee: 130,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC05eODuHmp2Bkb_O2XIdqBJoPfM0QtxVcM2ZQZR9JDlOK42lR5So6xlZyHtkE8GlHldh4Yp7yiAGyx90SzUjPPZT8vMu4CUw0_yLQqPGHIWeYus4ZNrDPsBfQPvs7QfYeRw6T2Ny0ZN-vhQ0YrorhEpbl_XVzAUDdh2vCFTt1pAvSdRqQYJWc447Xzjzg9Q2CyEuCVskWhUZRuEp0bQI7I6SAZqfjQOjf4IUv7pkb8Z0isxOvl_0wjIHRelC0-Co5gSdtD8-yepPU",
    featured: true
  }
];

export const patientAppointments = [
  {
    id: "apt-1",
    doctor: "Dr. Sarah Mitchell",
    specialty: "Cardiology Specialist",
    type: "Consultation",
    day: "Oct",
    date: "24",
    weekday: "Thursday",
    time: "09:30 AM",
    location: "St. Mary's Hospital, Room 402",
    status: "Confirmed"
  },
  {
    id: "apt-2",
    doctor: "Dr. James Wilson",
    specialty: "General Physician",
    type: "Annual Checkup",
    day: "Nov",
    date: "02",
    weekday: "Saturday",
    time: "02:00 PM",
    location: "Virtual Consultation",
    status: "Pending"
  }
];

export const reportBars = [
  { label: "Mon", value: 48 },
  { label: "Tue", value: 76 },
  { label: "Wed", value: 64 },
  { label: "Thu", value: 88 },
  { label: "Fri", value: 70 },
  { label: "Sat", value: 58 },
  { label: "Sun", value: 40 }
];
