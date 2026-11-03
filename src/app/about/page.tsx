import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = { title: "このサイトについて" };

export default function About() {
  return (
    <div className="wrap">
      <article className="article">
        <h1>このサイトについて</h1>
        <p className="lead">{BRAND.name}は、家でも職場でもない「第三の居場所」を、目的に合わせて提案するAIの相棒です。作業したい日も、犬とおでかけする日も、東京の駅ごとにぴったりのお店を見つけます。いずれはみんなのお気に入りを持ち寄って、おすすめし合える場にしていきます。</p>
        <h2>載せている情報</h2>
        <p>目的ごとに大事な項目を決めて、すべての店で同じ項目をそろえて調べています。カフェ作業ならWi-Fiの速さ・電源の数・作業のしやすさ、犬と行くなら店内に入れるか・犬用ごはん・駐車場です。子連れや誕生会など、目的は順次増やします。</p>
        <h2>情報の集め方</h2>
        <p>地図と店舗の位置はOpenStreetMapのデータを使っています。電源や席の情報は、運営が現地で確認したものと、利用者から送っていただいたものです。他のグルメサイトや地図サービスの口コミ・写真は転載していません。</p>
        <h2>広告について</h2>
        <p>一部のページにはコワーキングスペースなどの広告やPRを含むことがあります。広告を含む場合は、そのページに明記します。</p>
      </article>
    </div>
  );
}
