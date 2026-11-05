import type { MetadataRoute } from "next";
import { stations } from "@/data/stations";
import { articles } from "@/data/articles";
import { listings } from "@/data/listings";
import { readyPurposes } from "@/lib/purposes";

export const dynamic = "force-static";
const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/` },
    { url: `${BASE}/about/` },
    { url: `${BASE}/privacy/` },
    { url: `${BASE}/contact/` },
    ...readyPurposes.map((p) => ({ url: `${BASE}/${p.slug}/` })),
    ...readyPurposes.flatMap((p) => stations.map((s) => ({ url: `${BASE}/${p.slug}/${s.slug}/` }))),
    ...listings.map((l) => ({ url: `${BASE}/place/${l.id}/`, lastModified: l.checkedAt })),
    ...articles.map((a) => ({ url: `${BASE}/articles/${a.slug}/`, lastModified: a.publishedAt })),
  ];
}
