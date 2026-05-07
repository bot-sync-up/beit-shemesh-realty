import properties from "@/data/properties.json";
import neighborhoods from "@/data/neighborhoods.json";
import testimonials from "@/data/testimonials.json";
import settings from "@/data/settings.json";

export type PropertyType = "למכירה" | "להשכרה" | "נמכר";
export type PropertyCategory = "דירה" | "דירת גן" | "פנטהאוז" | "בית פרטי" | "מסחרי" | "קרקע";

export type Property = {
  id: number;
  title: string;
  type: PropertyType;
  category: PropertyCategory;
  status: "active" | "sold" | "hidden";
  price: number;
  priceLabel: string;
  rooms: number;
  area: number;
  floor: number;
  totalFloors: number;
  neighborhood: string;
  address: string;
  lat: number;
  lng: number;
  shortDescription: string;
  description: string;
  features: string[];
  images: string[];
  featured: boolean;
};

export type Neighborhood = {
  id: number;
  name: string;
  slug: string;
  character: string;
  description: string;
  avgPriceSale: string;
  avgPriceRent: string;
  highlights: string[];
  imageColor: string;
};

export type Testimonial = {
  id: number;
  name: string;
  role: string;
  area: string;
  date: string;
  rating: number;
  text: string;
};

export type Settings = typeof settings;

export const allProperties = properties as Property[];
export const allNeighborhoods = neighborhoods as Neighborhood[];
export const allTestimonials = testimonials as Testimonial[];
export const siteSettings = settings as Settings;

export function getActiveProperties(): Property[] {
  return allProperties.filter((p) => p.status !== "hidden");
}

export function getFeaturedProperties(): Property[] {
  return allProperties.filter((p) => p.featured && p.status === "active");
}

export function getPropertyById(id: number): Property | undefined {
  return allProperties.find((p) => p.id === id);
}

export function getNeighborhoodBySlug(slug: string): Neighborhood | undefined {
  return allNeighborhoods.find((n) => n.slug === slug);
}
