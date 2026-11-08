import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// 公開中。検索エンジンから隠したいときだけ NEXT_PUBLIC_ALLOW_INDEX=0 にする。
export default function robots(): MetadataRoute.Robots {
  const allow = process.env.NEXT_PUBLIC_ALLOW_INDEX !== "0";
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://thirdplace.apexforce.co";
  return allow
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${base}/sitemap.xml`, host: base }
    : { rules: { userAgent: "*", disallow: "/" } };
}
