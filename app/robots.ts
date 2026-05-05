import { MetadataRoute } from "next";
import settings from "@/data/settings.json";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || `https://${settings.domain}`;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
