import type { MetadataRoute } from "next";

const baseUrl = "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/doctors",
    "/dashboard",
    "/doctor",
    "/doctor/availability",
    "/admin",
    "/admin/reports",
    "/admin/session-analysis",
    "/sign-in",
    "/sign-up"
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "daily",
    priority: path === "" ? 1 : 0.7
  }));
}
