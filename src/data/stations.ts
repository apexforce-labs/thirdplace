import type { Station } from "@/lib/types";

// 最初の10駅。座標は駅のおおよその中心。
export const stations: Station[] = [
  { slug: "shibuya", romaji: "Shibuya", lineColor: "#80C241", name: "渋谷", kana: "しぶや", lines: ["JR山手線", "東急東横線", "東京メトロ銀座線"], lat: 35.658, lng: 139.7016, blurb: "再開発で新しいビルが増えたエリア。駅の東西で雰囲気が大きく変わる。" },
  { slug: "shinjuku", romaji: "Shinjuku", lineColor: "#80C241", name: "新宿", kana: "しんじゅく", lines: ["JR山手線", "小田急線", "京王線"], lat: 35.6896, lng: 139.7006, blurb: "乗り換えの合間にも使える。出口が多いので、どの口から近いかで選ぶ。" },
  { slug: "ikebukuro", romaji: "Ikebukuro", lineColor: "#80C241", name: "池袋", kana: "いけぶくろ", lines: ["JR山手線", "東武東上線", "西武池袋線"], lat: 35.7295, lng: 139.7109, blurb: "東口と西口で街の性格が違う。大型の商業施設が多い。" },
  { slug: "tokyo", romaji: "Tokyo", lineColor: "#80C241", name: "東京", kana: "とうきょう", lines: ["JR山手線", "東海道新幹線", "東京メトロ丸ノ内線"], lat: 35.6812, lng: 139.7671, blurb: "出張の前後や新幹線の待ち時間に。八重洲側と丸の内側で探す。" },
  { slug: "shinagawa", romaji: "Shinagawa", lineColor: "#80C241", name: "品川", kana: "しながわ", lines: ["JR山手線", "京急本線", "東海道新幹線"], lat: 35.6285, lng: 139.7388, blurb: "港南口はオフィス街、高輪口はホテルが多いエリア。" },
  { slug: "ebisu", romaji: "Ebisu", lineColor: "#80C241", name: "恵比寿", kana: "えびす", lines: ["JR山手線", "東京メトロ日比谷線"], lat: 35.6467, lng: 139.7101, blurb: "落ち着いた小さな店が多いエリア。席数は事前に確認を。" },
  { slug: "nakameguro", romaji: "Naka-meguro", lineColor: "#DA0442", name: "中目黒", kana: "なかめぐろ", lines: ["東急東横線", "東京メトロ日比谷線"], lat: 35.644, lng: 139.6988, blurb: "目黒川沿いは週末に混みやすい。平日の日中が狙い目。" },
  { slug: "kichijoji", romaji: "Kichijoji", lineColor: "#F15A22", name: "吉祥寺", kana: "きちじょうじ", lines: ["JR中央線", "京王井の頭線"], lat: 35.7031, lng: 139.5798, blurb: "個人経営の店が多い街。公園帰りの犬連れも多い。" },
  { slug: "akihabara", romaji: "Akihabara", lineColor: "#80C241", name: "秋葉原", kana: "あきはばら", lines: ["JR山手線", "JR総武線", "つくばエクスプレス"], lat: 35.6984, lng: 139.7731, blurb: "電気街と昭和通り側で客層が変わる。夜遅くまで開く店も探せる。" },
  { slug: "yokohama", romaji: "Yokohama", lineColor: "#00B2E5", name: "横浜", kana: "よこはま", lines: ["JR東海道線", "東急東横線", "相鉄線"], lat: 35.4658, lng: 139.6223, blurb: "西口と東口で商業施設が分かれる。乗り換えついでに寄りやすい。" },
];

export const stationBySlug = (slug: string) => stations.find((s) => s.slug === slug);
