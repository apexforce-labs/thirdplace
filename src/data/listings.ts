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
  /** 自分たちで撮った写真（public/photos/ 以下）。他人の写真は入れない */
  photos?: { src: string; alt: string }[];
  /** お店の公式Instagramの投稿URL（埋め込み表示。画像はこちらに保存しない） */
  instagram?: string[];
  checkedAt: string; // 公開情報を確認した日 YYYY-MM-DD
};

const RENOIR_WIFI = { label: "Renoir Miyama Wi-Fi（公式）", url: "https://ginza-renoir.co.jp/wifi_en", official: true };
const renoirWifi = { label: "Wi-Fi", value: "無料Wi-Fi（Renoir Miyama Wi-Fi、1日3時間まで）のほか Wi2・au Wi-Fi SPOT・BBモバイルポイント", src: 0 };
const renoirPower = { label: "電源", value: "電源サービスあり（席の場所は店舗で確認）", src: 0 };
const RENOIR_NOTE = "ゆったりした椅子で長居しやすい老舗の喫茶店チェーン。分煙の店なので、禁煙席を選ぶのがおすすめ。";
const renoirSrc = (name: string, url: string) => [{ label: `${name} 公式 店舗ページ`, url, official: true }, RENOIR_WIFI];

export const listings: Listing[] = [
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
  {
    id: "caferenoir-shibuya-higashiguchi-ekimae",
    name: "Cafeルノアール 渋谷東口駅前店",
    kind: "cafe",
    station: "shibuya",
    purposes: ["work"],
    lat: 35.6573, lng: 139.704,
    address: "東京都渋谷区渋谷3-19-1 渋谷オミビル B1F",
    access: "JR渋谷駅 東口から徒歩4分、地下鉄渋谷駅 C2出口から徒歩2分（渋谷ストリーム横）",
    hours: "月〜土 7:30–22:00、日祝 9:00–22:00",
    facts: [
      renoirPower,
      renoirWifi,
      { label: "席数", value: "禁煙36席・加熱式たばこ専用20席（分煙）", src: 0 },
      { label: "予約", value: "席の予約はできない", src: 0 },
      { label: "貸会議室", value: "あり（マイ・スペース、5室）", src: 0 },
    ],
    sources: renoirSrc("Cafeルノアール", "https://www.ginza-renoir.co.jp/shopsearch/shops/tokyo/caferenoir-shibuya-higashiguchi-ekimae.html"),
    note: RENOIR_NOTE,
    checkedAt: "2026-11-04",
  },
  {
    id: "renoir-shibuya-centergai",
    name: "喫茶室ルノアール 渋谷センター街店",
    kind: "cafe",
    station: "shibuya",
    purposes: ["work"],
    lat: 35.6603, lng: 139.6989,
    address: "東京都渋谷区宇田川町25-3 プリンスビル 2F",
    access: "JR渋谷駅 ハチ公口から徒歩1分（センター街の中ほど右手）",
    hours: "毎日 8:00–22:00",
    facts: [
      renoirPower,
      renoirWifi,
      { label: "席数", value: "禁煙24席・加熱式たばこ専用40席（分煙）", src: 0 },
      { label: "予約", value: "席の予約はできない", src: 0 },
    ],
    sources: renoirSrc("喫茶室ルノアール", "https://www.ginza-renoir.co.jp/shopsearch/shops/tokyo/shibuya-ku/shibuya-centergai.html"),
    note: "センター街の中にあり駅から近い。禁煙席は24席と少なめなので、混む時間は避けたい。",
    checkedAt: "2026-11-04",
  },
  {
    id: "renoir-shibuya-miyashita-park",
    name: "喫茶室ルノアール 渋谷宮下公園店",
    kind: "cafe",
    station: "shibuya",
    purposes: ["work"],
    lat: 35.6609, lng: 139.7027,
    address: "東京都渋谷区渋谷1-16-14 渋谷地下鉄ビル 2F",
    access: "JR渋谷駅 東口から徒歩5分（宮下公園前）",
    hours: "毎日 8:00–22:00",
    facts: [
      renoirPower,
      renoirWifi,
      { label: "席数", value: "禁煙64席・加熱式たばこ専用30席（分煙）", src: 0 },
      { label: "予約", value: "席の予約はできない", src: 0 },
    ],
    sources: renoirSrc("喫茶室ルノアール", "https://www.ginza-renoir.co.jp/shopsearch/shops/tokyo/shibuya-ku/shibuya-miyashita-park.html"),
    note: "禁煙席が64席と多めで、渋谷の中では席を見つけやすい。公式ページ内でビル名の表記が2通り（渋谷地下鉄ビル／渋谷メトロプラザ）あるので、地図で場所を確認して向かうと安心。",
    checkedAt: "2026-11-04",
  },
  {
    id: "renoir-shibuya-minamiguchi",
    name: "喫茶室ルノアール 渋谷南口店",
    kind: "cafe",
    station: "shibuya",
    purposes: ["work"],
    lat: 35.6555, lng: 139.699,
    address: "東京都渋谷区桜丘町15-15 NKG東京第2ビル 2F",
    access: "JR渋谷駅から徒歩約6分（桜丘町、さくら坂の一本先の坂の上手前左側）",
    hours: "月〜土 7:30–22:00、日祝 8:00–21:00",
    facts: [
      renoirPower,
      renoirWifi,
      { label: "席数", value: "禁煙54席・加熱式たばこ専用38席（分煙）", src: 0 },
      { label: "予約", value: "席の予約はできない", src: 0 },
    ],
    sources: renoirSrc("喫茶室ルノアール", "https://www.ginza-renoir.co.jp/shopsearch/shops/tokyo/shibuya-ku/shibuya-minamiguchi.html"),
    note: RENOIR_NOTE,
    checkedAt: "2026-11-04",
  },
  {
    id: "renoir-shibuya-hands-mae",
    name: "喫茶室ルノアール 渋谷ハンズ前店",
    kind: "cafe",
    station: "shibuya",
    purposes: ["work"],
    lat: 35.6617, lng: 139.6981,
    address: "東京都渋谷区宇田川町36-2 ノア渋谷 2F",
    access: "JR渋谷駅 ハチ公口から徒歩5分（井の頭通り、渋谷ハンズ隣）",
    hours: "月〜土 8:00–22:00、日祝 9:00–22:00",
    facts: [
      renoirPower,
      renoirWifi,
      { label: "席数", value: "禁煙44席・加熱式たばこ専用31席（分煙）", src: 0 },
      { label: "予約", value: "席の予約はできない", src: 0 },
      { label: "個室ブース", value: "マイブース（禁煙・2席）あり。店頭で予約", src: 0 },
    ],
    sources: renoirSrc("喫茶室ルノアール", "https://www.ginza-renoir.co.jp/shopsearch/shops/tokyo/shibuya-ku/shibuya-tokyu-hands.html"),
    note: RENOIR_NOTE,
    checkedAt: "2026-11-04",
  },
  {
    id: "renoir-shinjuku-chuohigashiguchi",
    name: "喫茶室ルノアール 新宿中央東口店",
    kind: "cafe",
    station: "shinjuku",
    purposes: ["work"],
    lat: 35.6914, lng: 139.7022,
    address: "東京都新宿区新宿3-28-13 中島ビル B1F",
    access: "JR新宿駅 東口から徒歩4分、新宿三丁目駅 A5出口から徒歩2分",
    hours: "毎日 8:00–22:00",
    facts: [
      renoirPower,
      renoirWifi,
      { label: "席数", value: "禁煙45席・加熱式たばこ専用26席（分煙）", src: 0 },
      { label: "予約", value: "席の予約はできない", src: 0 },
    ],
    sources: renoirSrc("喫茶室ルノアール", "https://www.ginza-renoir.co.jp/shopsearch/shops/tokyo/shinjuku-ku/shinjuku-chuohigashiguchi.html"),
    note: RENOIR_NOTE,
    checkedAt: "2026-11-04",
  },
  {
    id: "caferenoir-shinjuku-keio-mall",
    name: "Cafeルノアール 新宿京王モール店",
    kind: "cafe",
    station: "shinjuku",
    purposes: ["work"],
    lat: 35.6893, lng: 139.6995,
    address: "東京都新宿区西新宿1 南口地下街1 京王モール 第A-5区画",
    access: "JR新宿駅 西口地下広場から京王モール内すぐ、京王線新宿駅から徒歩0分",
    hours: "毎日 7:00–22:00",
    facts: [
      renoirPower,
      renoirWifi,
      { label: "席数", value: "全席禁煙・40席", src: 0 },
      { label: "予約", value: "席の予約はできない", src: 0 },
    ],
    sources: renoirSrc("Cafeルノアール", "https://www.ginza-renoir.co.jp/shopsearch/shops/tokyo/shinjuku-ku/caferenoir-shinjuku-keio-mall.html"),
    note: "駅の地下街の中にあり、雨の日でも濡れずに行ける。全席禁煙。",
    checkedAt: "2026-11-04",
  },
  {
    id: "renoir-shinjuku-nishiguchi-estec",
    name: "喫茶室ルノアール 新宿西口エステックビル店",
    kind: "cafe",
    station: "shinjuku",
    purposes: ["work"],
    lat: 35.6905, lng: 139.6955,
    address: "東京都新宿区西新宿1-24-1 エステック情報ビル B1F",
    access: "JR新宿駅 西口から徒歩7分（新宿中央公園方面の地下道沿い、新宿郵便局向かい）",
    hours: "月〜金 7:00–22:00、土 8:00–22:00、日祝 8:00–21:00",
    facts: [
      renoirPower,
      renoirWifi,
      { label: "席数", value: "禁煙72席・加熱式たばこ専用38席（分煙）", src: 0 },
      { label: "予約", value: "席の予約はできない", src: 0 },
    ],
    sources: renoirSrc("喫茶室ルノアール", "https://www.ginza-renoir.co.jp/shopsearch/shops/tokyo/shinjuku-ku/shinjuku-nishiguchi-estec-boldg.html"),
    note: "禁煙席が72席と広く、平日は朝7時から開いている。西口のオフィス街で作業したい人向け。",
    checkedAt: "2026-11-04",
  },
];

export const listingById = (id: string) => listings.find((l) => l.id === id);
export const listingsByStation = (slug: string, purpose?: PurposeSlug) =>
  listings.filter((l) => l.station === slug && (!purpose || l.purposes.includes(purpose)));
