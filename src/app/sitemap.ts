import { absoluteUrl } from "@/utils/common";
import { type MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["contact", "faq", "terms"].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date().toISOString(),
  }));

  return [...routes];
}
