import type { MetadataRoute } from "next";
import { stations } from "@/data/stations";
import { spots } from "@/data/spots";
import { articles } from "@/data/articles";
import { listings } from "@/data/listings";
import { readyPurposes } from "@/lib/purposes";

export const dynamic = "force-static";
const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/` },
    ...readyPurposes.map((p) => ({ url: `${BASE}/${p.slug}/` })),
    ...readyPurposes.flatMap((p) => stations.map((s) => ({ url: `${BASE}/${p.slug}/${s.slug}/` }))),
    ...spots.filter((s) => s.source !== "sample").map((s) => ({ url: `${BASE}/spot/${s.id}/`, lastModified: s.verifiedAt })),
    ...listings.map((l) => ({ url: `${BASE}/place/${l.id}/`, lastModified: l.checkedAt })),
    ...articles.map((a) => ({ url: `${BASE}/articles/${a.slug}/`, lastModified: a.publishedAt })),
  ];
}
