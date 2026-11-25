import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { listings, stationSlugsFor } from "@/data/listings";
import { readyPurposes } from "@/lib/purposes";

export const dynamic = "force-static";
const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thirdplace.apexforce.co";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/` },
    { url: `${BASE}/about/` },
    { url: `${BASE}/privacy/` },
    { url: `${BASE}/contact/` },
    ...readyPurposes.map((p) => ({ url: `${BASE}/${p.slug}/` })),
    ...readyPurposes.flatMap((p) => stationSlugsFor(p.slug).map((s) => ({ url: `${BASE}/${p.slug}/${s}/` }))),
    ...listings.map((l) => ({ url: `${BASE}/place/${l.id}/`, lastModified: l.checkedAt })),
    ...articles.map((a) => ({ url: `${BASE}/articles/${a.slug}/`, lastModified: a.publishedAt })),
  ];
}
