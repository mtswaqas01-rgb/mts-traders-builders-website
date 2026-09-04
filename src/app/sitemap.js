import { supabase } from "@/lib/supabase";
import { SITE_URL } from "@/lib/site";

const STATIC_ROUTES = ["", "/services", "/projects", "/properties", "/collaborations", "/about", "/contact"];

export default async function sitemap() {
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const [{ data: projects }, { data: properties }] = await Promise.all([
    supabase.from("projects").select("id, created_at"),
    supabase.from("properties").select("id, created_at"),
  ]);

  const projectEntries = (projects || []).map((p) => ({
    url: `${SITE_URL}/projects/${p.id}`,
    lastModified: p.created_at ? new Date(p.created_at) : new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const propertyEntries = (properties || []).map((p) => ({
    url: `${SITE_URL}/properties/${p.id}`,
    lastModified: p.created_at ? new Date(p.created_at) : new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticEntries, ...projectEntries, ...propertyEntries];
}
