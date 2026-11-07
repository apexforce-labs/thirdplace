import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Fraunces, Shippori_Mincho_B1, Zen_Kaku_Gothic_New } from "next/font/google";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/Chrome";
import { BRAND } from "@/lib/brand";

const latin = Fraunces({ weight: ["700", "900"], style: ["normal", "italic"], subsets: ["latin"], variable: "--f-latin", display: "swap" });
const display = Shippori_Mincho_B1({ weight: ["700", "800"], subsets: ["latin"], variable: "--f-display", preload: false, display: "swap" });
const body = Zen_Kaku_Gothic_New({ weight: ["400", "500", "700"], subsets: ["latin"], variable: "--f-body", preload: false, display: "swap" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thirdplace.apexforce.co";
// GA4 測定ID（例: G-XXXXXXXXXX）と、Search Console の確認コード。未設定なら何も出力しない
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-K3XLTN167W";
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${BRAND.name}｜電源・Wi-Fiを確かめた、東京の作業カフェ案内`, template: `%s｜${BRAND.name}` },
  description: "電源・Wi-Fi・席数・営業時間を公式情報で確かめた、東京の駅ごとの作業カフェ案内。",
  alternates: { canonical: "/" },
  openGraph: { siteName: BRAND.name, locale: "ja_JP", type: "website" },
  ...(GSC_VERIFICATION ? { verification: { google: GSC_VERIFICATION } } : {}),
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
        {GA_ID ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
