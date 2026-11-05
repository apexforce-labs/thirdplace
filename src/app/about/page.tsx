import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { listings } from "@/data/listings";

export const metadata: Metadata = { title: "このサイトについて", alternates: { canonical: "/about/" } };

export default function About() {
  return (
    <div className="wrap">
      <article className="article">
        <h1>このサイトについて</h1>
        <p className="lead">{BRAND.name}は、家でも職場でもない「第三の居場所」を探すための、東京のカフェ案内です。まずは「カフェで作業したい日」のために、駅ごとに作業できるお店をまとめています。犬と行けるお店など、目的は順次増やします。</p>
        <h2>載せている情報</h2>
        <p>現在{listings.length}店を掲載しています。住所・営業時間・席数・電源・Wi-Fiは、各店や運営会社の公式サイトで確かめたものだけを載せ、店ごとのページに出典を付けています。公式に書かれていない項目は「記載なし」としています。</p>
        <h2>スコアについて</h2>
        <p>Wi-Fiの速さや電源のある席の数、静かさなどは、運営が現地で確かめてから点数を付けます。それまでは「スコア調査待ち」と表示しています。</p>
        <h2>写真と口コミ</h2>
        <p>他のグルメサイトや地図サービスの口コミ・写真は転載していません。写真は運営が撮影したもの、またはお店の公式Instagramの埋め込みだけを使います。</p>
        <h2>載せないお店</h2>
        <p>会員登録や入会金が必要な有料ラウンジ・会員制のワークスペースは、気軽に立ち寄れないため載せていません。</p>
        <h2>情報の修正・追加</h2>
        <p>閉店や営業時間の変更、載っていないお店に気づいたら、<Link href="/submit/">情報を送る</Link>から教えてください。確認してから反映します。</p>
        <h2>運営者</h2>
        <p>apexforce（<a href="https://apexforce.co" target="_blank" rel="noopener noreferrer">https://apexforce.co</a>）。お問い合わせは<Link href="/contact/">お問い合わせ</Link>から。</p>
        <h2>広告について</h2>
        <p>一部のページに広告やPRを含むことがあります。その場合はページ内に明記します。</p>
      </article>
    </div>
  );
}
