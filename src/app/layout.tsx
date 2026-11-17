import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/Chrome";
import { BRAND } from "@/lib/brand";

// Webフォントはブラウザで Google Fonts から読み込む（ビルド時に取りに行くと、
// Google Fonts の応答しだいでビルドが落ちることがあるため）
const FONTS_CSS =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700;1,900&family=Shippori+Mincho+B1:wght@700;800&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thirdplace.apexforce.co";
// GA4 測定ID（例: G-XXXXXXXXXX）と、Search Console の確認コード。未設定なら何も出力しない
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-K3XLTN167W";
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION || "k_1_g5rvHpklxTjgnVf6uTAUCRs2sLnIfrzbelse5bc";

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
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONTS_CSS} />
      </head>
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
