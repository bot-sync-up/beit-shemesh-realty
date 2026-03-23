import { MetadataRoute } from "next";
import propertiesData from "@/data/properties.json";
import blogData from "@/data/blog.json";

type Property = { id: number; active: boolean };
type BlogPost = { slug: string; active: boolean };

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/properties`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/neighborhoods`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
  ];

  const propertyPages: MetadataRoute.Sitemap = (propertiesData as Property[])
    .filter((p) => p.active)
    .map((p) => ({
      url: `${BASE_URL}/properties/${p.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  const blogPages: MetadataRoute.Sitemap = (blogData as BlogPost[])
    .filter((b) => b.active)
    .map((b) => ({
      url: `${BASE_URL}/blog/${b.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticPages, ...propertyPages, ...blogPages];
}
