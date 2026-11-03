import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// 試作中は検索エンジンに載せない。公開時に NEXT_PUBLIC_ALLOW_INDEX=1 にする。
export default function robots(): MetadataRoute.Robots {
  const allow = process.env.NEXT_PUBLIC_ALLOW_INDEX === "1";
  return { rules: allow ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" } };
}
