import { MetadataRoute } from "next";
import { getAllProperties } from "@/lib/data";
import settings from "@/data/settings.json";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || `https://${settings.domain}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                      lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/about`,           lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/properties`,      lastModified: now, changeFrequency: "daily",   priority: 0.95 },
    { url: `${BASE_URL}/neighborhoods`,   lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/testimonials`,    lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`,         lastModified: now, changeFrequency: "yearly",  priority: 0.7 },
    { url: `${BASE_URL}/terms`,           lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE_URL}/privacy`,         lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ];

  const all = await getAllProperties();
  const propertyPages: MetadataRoute.Sitemap = all
    .filter((p) => p.status !== "hidden")
    .map((p) => ({
      url: `${BASE_URL}/properties/${p.id}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: p.featured ? 0.85 : 0.7,
    }));

  return [...staticPages, ...propertyPages];
}
