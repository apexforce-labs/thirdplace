import type { Metadata, Viewport } from "next";
import { Fraunces, Shippori_Mincho_B1, Zen_Kaku_Gothic_New } from "next/font/google";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/Chrome";
import { BRAND } from "@/lib/brand";

const latin = Fraunces({ weight: ["700", "900"], style: ["normal", "italic"], subsets: ["latin"], variable: "--f-latin", display: "swap" });
const display = Shippori_Mincho_B1({ weight: ["700", "800"], subsets: ["latin"], variable: "--f-display", preload: false, display: "swap" });
const body = Zen_Kaku_Gothic_New({ weight: ["400", "500", "700"], subsets: ["latin"], variable: "--f-body", preload: false, display: "swap" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${BRAND.name}｜目的にあわせて行き先を提案する、東京のカフェ案内`, template: `%s｜${BRAND.name}` },
  description: "作業したい日、犬と出かける日。目的ごとに大事なポイントを確かめてスコアにした、東京のカフェ地図。",
  openGraph: { siteName: BRAND.name, locale: "ja_JP", type: "website" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#11151d" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${latin.variable} ${display.variable} ${body.variable}`}>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
