import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/operadores", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/organizadores", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/baixar", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/eventos", priority: 0.8, changeFrequency: "daily" as const },
    { url: "/sobre", priority: 0.5, changeFrequency: "yearly" as const },
    { url: "/termos", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/privacidade", priority: 0.3, changeFrequency: "yearly" as const },
  ];
  return routes.map((r) => ({
    url: `${SITE_URL}${r.url}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
