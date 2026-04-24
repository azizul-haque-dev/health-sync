import { unstable_cache } from "next/cache";

import { patientAppointments, reportBars } from "@/lib/demo-data";

export const getPatientDashboard = unstable_cache(
  async () => ({
    totalAppointments: 12,
    upcomingVisits: 2,
    completedSessions: 10,
    appointments: patientAppointments
  }),
  ["patient-dashboard"],
  {
    tags: ["bookings"]
  }
);

export const getDoctorDashboard = unstable_cache(
  async () => ({
    weeklyBookings: 124,
    weeklyRevenue: 4200,
    averageRating: 4.9,
    todayAppointments: 8
  }),
  ["doctor-dashboard"],
  {
    tags: ["doctor-dashboard"]
  }
);

export const getAdminDashboard = unstable_cache(
  async () => ({
    totalUsers: 1240,
    activeDoctors: 85,
    totalBookings: 4562,
    weeklyTrend: reportBars
  }),
  ["admin-dashboard"],
  {
    tags: ["admin"]
  }
);
