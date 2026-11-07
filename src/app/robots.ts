import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// 試作中は検索エンジンに載せない。公開時に NEXT_PUBLIC_ALLOW_INDEX=1 にする。
export default function robots(): MetadataRoute.Robots {
  const allow = process.env.NEXT_PUBLIC_ALLOW_INDEX === "1";
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thirdplace.apexforce.co";
  return allow
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${base}/sitemap.xml`, host: base }
    : { rules: { userAgent: "*", disallow: "/" } };
}
