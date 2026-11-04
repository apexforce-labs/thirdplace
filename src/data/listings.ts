import type { PurposeSlug } from "@/lib/types";

/**
 * 実在のお店（公開情報で確認したもの）。
 * スコアは現地で実測するまで付けない。ここに載せるのは出典で確認できた事実だけ。
 * fact.src は sources の何番目で確認したか（0始まり）。
 */
export type Listing = {
  id: string;
  name: string;
  kind: "cafe" | "lounge" | "coworking";
  station: string; // Station.slug
  purposes: PurposeSlug[];
  lat: number;
  lng: number;
  address: string;
  access: string;
  hours: string;
  facts: { label: string; value: string; src: number }[];
  sources: { label: string; url: string; official: boolean }[];
  note: string;
  checkedAt: string; // 公開情報を確認した日 YYYY-MM-DD
};

export const listings: Listing[] = [
  {
    id: "share-lounge-shibuya-scramble",
    name: "SHARE LOUNGE（TSUTAYA BOOKSTORE 渋谷スクランブルスクエア）",
    kind: "lounge",
    station: "shibuya",
    purposes: ["work"],
    lat: 35.65838, lng: 139.70225,
    address: "東京都渋谷区渋谷2-24-12 渋谷スクランブルスクエア 11F",
    access: "渋谷駅直結",
    hours: "10:00–23:00（施設案内の記載。祝日は異なる場合あり）",
    facts: [
      { label: "電源・Wi-Fi", value: "あり（SHARE LOUNGE全店で電源と高速Wi-Fiを用意）", src: 0 },
      { label: "料金", value: "時間制。料金は店舗とプランで異なる", src: 0 },
      { label: "ドリンク・軽食", value: "利用料に含まれる（内容は店舗ごとに異なる）", src: 0 },
      { label: "予約", value: "アプリで日時・席の種類を選んで予約できる。予約なしでも利用可", src: 0 },
    ],
    sources: [
      { label: "SHARE LOUNGE 公式サイト", url: "https://www.sharelounge.jp/", official: true },
      { label: "店舗情報（hamoni）", url: "https://hamoni.jp/shop/sIouJ2uibU7v29aJDgjd", official: false },
    ],
    note: "カフェではなく時間制のラウンジ。長時間の作業や、席を確保してから出かけたい日に向く。",
    checkedAt: "2026-11-04",
  },
  {
    id: "share-lounge-shibuya-sakura-stage",
    name: "SHARE LOUNGE（TSUTAYA BOOKSTORE 渋谷サクラステージ）",
    kind: "lounge",
    station: "shibuya",
    purposes: ["work"],
    lat: 35.65580, lng: 139.70040,
    address: "東京都渋谷区桜丘町1-4 渋谷サクラステージ SHIBUYAサイド 4F",
    access: "渋谷駅 新南改札・西口から徒歩すぐ",
    hours: "8:00–23:00（不定休）",
    facts: [
      { label: "席数", value: "180席", src: 0 },
      { label: "Wi-Fi", value: "ビジネス向けの高速Wi-Fiあり", src: 0 },
      { label: "電源", value: "あり（SHARE LOUNGE全店共通）", src: 1 },
      { label: "料金", value: "時間制。最短60分から", src: 0 },
      { label: "食事", value: "同じフロアの飲食店からモバイルオーダーして、ラウンジ内で食べられる", src: 0 },
    ],
    sources: [
      { label: "CCC プレスリリース（2024年7月）", url: "https://ccc.co.jp/pdf/news/20240725_cx_TBSshibuyasakurastage.pdf", official: true },
      { label: "SHARE LOUNGE 公式サイト", url: "https://www.sharelounge.jp/", official: true },
    ],
    note: "180席と広く、開店が朝8時と早い。渋谷駅の南側で待ち合わせや打ち合わせの前後に使いやすい。",
    checkedAt: "2026-11-04",
  },
  {
    id: "share-lounge-shibuya-tsutaya",
    name: "SHARE LOUNGE（SHIBUYA TSUTAYA 4F）",
    kind: "lounge",
    station: "shibuya",
    purposes: ["work"],
    lat: 35.65980, lng: 139.70060,
    address: "東京都渋谷区宇田川町21-6 SHIBUYA TSUTAYA 4F",
    access: "渋谷駅 A7出口から徒歩1分",
    hours: "8:00–23:00（最終入店 22:15）",
    facts: [
      { label: "電源・Wi-Fi", value: "あり（SHARE LOUNGE全店共通）", src: 1 },
      { label: "使い方", value: "ワークスペース・カフェ・バーとして使える。予約なしで入れる", src: 0 },
      { label: "料金", value: "時間制。料金は店舗とプランで異なる", src: 1 },
    ],
    sources: [
      { label: "SHIBUYA TSUTAYA 施設案内（レッツエンジョイ東京）", url: "https://www.enjoytokyo.jp/spot/s_13006033/", official: false },
      { label: "SHARE LOUNGE 公式サイト", url: "https://www.sharelounge.jp/", official: true },
    ],
    note: "スクランブル交差点の目の前。同じ建物の2Fにはスクランブル交差点を見下ろせるスターバックスもある。",
    checkedAt: "2026-11-04",
  },
  {
    id: "blue-bottle-shibuya",
    name: "ブルーボトルコーヒー 渋谷カフェ",
    kind: "cafe",
    station: "shibuya",
    purposes: ["work"],
    lat: 35.66410, lng: 139.70180,
    address: "東京都渋谷区神南1-7-3 渋谷区立北谷公園内",
    access: "渋谷駅から徒歩7〜10分",
    hours: "8:00–20:00（2022年の紹介記事の記載）",
    facts: [
      { label: "電源", value: "カウンター席にあり（紹介記事の記載）", src: 1 },
      { label: "Wi-Fi", value: "公園のWi-Fiが使える（紹介記事の記載）", src: 1 },
      { label: "雰囲気", value: "公園の中にあり、緑に囲まれている", src: 0 },
    ],
    sources: [
      { label: "Time Out Tokyo（2022年12月）", url: "https://www.timeout.jp/tokyo/ja/レストラン/blue-bottle-coffee-shibuya-cafe", official: false },
      { label: "VELTRA Yokka（2026年）", url: "https://www.veltra.com/jp/yokka/article/tokyo-cafe-nomado/", official: false },
    ],
    note: "電源はカウンターの一部のみの可能性が高い。長時間の作業より、短い作業や気分転換に。",
    checkedAt: "2026-11-04",
  },
  {
    id: "renoir-shinjuku-nishiguchi-1chome",
    name: "喫茶室ルノアール 新宿西口1丁目店",
    kind: "cafe",
    station: "shinjuku",
    purposes: ["work"],
    lat: 35.6915, lng: 139.6975,
    address: "東京都新宿区西新宿1-4-1 プリンスビル B1F",
    access: "JR新宿駅 西口から徒歩約5分",
    hours: "月〜土 7:30–22:00、日祝 8:00–22:00",
    facts: [
      { label: "電源", value: "電源サービスあり", src: 0 },
      { label: "Wi-Fi", value: "無料Wi-Fi（Renoir Miyama Wi-Fi、1日3時間まで）のほか Wi2・au Wi-Fi SPOT・BBモバイルポイント", src: 0 },
      { label: "席数", value: "禁煙52席・加熱式たばこ専用34席（分煙）", src: 0 },
      { label: "予約", value: "席の予約はできない", src: 0 },
    ],
    sources: [
      { label: "喫茶室ルノアール 公式 店舗ページ", url: "https://www.ginza-renoir.co.jp/shopsearch/shops/tokyo/shinjuku-ku/shinjuku-nishiguchi-1chome.html", official: true },
      { label: "Renoir Miyama Wi-Fi（公式）", url: "https://ginza-renoir.co.jp/wifi_en", official: true },
    ],
    note: "ゆったりした椅子で長居しやすい老舗の喫茶店チェーン。分煙の店なので、禁煙席を選ぶのがおすすめ。",
    checkedAt: "2026-11-04",
  },
  {
    id: "renoir-shinjuku-minamiguchi-koshukaido",
    name: "喫茶室ルノアール 新宿南口甲州街道店",
    kind: "cafe",
    station: "shinjuku",
    purposes: ["work"],
    lat: 35.688, lng: 139.6975,
    address: "東京都新宿区西新宿1-19-5 新宿幸容ビル B1F",
    access: "JR新宿駅 南口から徒歩5分（甲州街道沿い）",
    hours: "毎日 7:30–22:00",
    facts: [
      { label: "電源", value: "電源サービスあり", src: 0 },
      { label: "Wi-Fi", value: "無料Wi-Fi（Renoir Miyama Wi-Fi、1日3時間まで）のほか Wi2・au Wi-Fi SPOT・BBモバイルポイント", src: 0 },
      { label: "席数", value: "禁煙43席・加熱式たばこ専用18席（分煙）", src: 0 },
      { label: "予約", value: "席の予約はできない", src: 0 },
      { label: "貸会議室", value: "あり（マイ・スペース、3室）", src: 0 },
    ],
    sources: [
      { label: "喫茶室ルノアール 公式 店舗ページ", url: "https://www.ginza-renoir.co.jp/shopsearch/shops/tokyo/shinjuku-ku/shinjuku-minamiguchi-kosyukaido.html", official: true },
      { label: "Renoir Miyama Wi-Fi（公式）", url: "https://ginza-renoir.co.jp/wifi_en", official: true },
    ],
    note: "ゆったりした椅子で長居しやすい老舗の喫茶店チェーン。分煙の店なので、禁煙席を選ぶのがおすすめ。",
    checkedAt: "2026-11-04",
  },
  {
    id: "renoir-ikebukuro-nishiguchi",
    name: "喫茶室ルノアール 池袋西口店",
    kind: "cafe",
    station: "ikebukuro",
    purposes: ["work"],
    lat: 35.7305, lng: 139.7085,
    address: "東京都豊島区西池袋1-17-7 池袋ルミエールビル 2F",
    access: "池袋駅 西口から徒歩約1分（JR・東武東上線）",
    hours: "毎日 7:30–22:00",
    facts: [
      { label: "電源", value: "電源サービスあり", src: 0 },
      { label: "Wi-Fi", value: "無料Wi-Fi（Renoir Miyama Wi-Fi、1日3時間まで）のほか Wi2・au Wi-Fi SPOT・BBモバイルポイント", src: 0 },
      { label: "席数", value: "禁煙40席・加熱式たばこ専用28席（分煙）", src: 0 },
      { label: "予約", value: "席の予約はできない", src: 0 },
    ],
    sources: [
      { label: "喫茶室ルノアール 公式 店舗ページ", url: "https://www.ginza-renoir.co.jp/shopsearch/shops/tokyo/toshima-ku/ikebukuro-nishiguchi.html", official: true },
      { label: "Renoir Miyama Wi-Fi（公式）", url: "https://ginza-renoir.co.jp/wifi_en", official: true },
    ],
    note: "ゆったりした椅子で長居しやすい老舗の喫茶店チェーン。分煙の店なので、禁煙席を選ぶのがおすすめ。",
    checkedAt: "2026-11-04",
  },
];

export const listingById = (id: string) => listings.find((l) => l.id === id);
export const listingsByStation = (slug: string, purpose?: PurposeSlug) =>
  listings.filter((l) => l.station === slug && (!purpose || l.purposes.includes(purpose)));
