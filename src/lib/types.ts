export type Scene = "solo" | "family" | "group";
export type PurposeSlug = "work" | "dog" | "kids" | "party";

export type Station = {
  slug: string;
  name: string; // 駅名（「駅」なし）
  kana: string;
  lines: string[];
  lat: number;
  lng: number;
  blurb: string;
  romaji: string;
  lineColor: string; // 駅名標の帯の色
};

export type Spot = {
  id: string;
  name: string;
  kind: "cafe" | "coworking" | "library" | "lounge";
  station: string; // Station.slug
  lat: number;
  lng: number;
  walkMin: number;
  power: { seats: number; totalSeats: number } | null; // 電源のある席数
  wifi: "free" | "carrier" | "none";
  wifiMbps: number | null; // 実測の下り速度（Mbps）
  comfort: 1 | 2 | 3 | 4 | 5; // 机の広さ・椅子・照明など作業のしやすさ
  timeLimitMin: number | null; // null = 制限なし
  quiet: 1 | 2 | 3 | 4 | 5; // 静かさ
  meetingOk: boolean; // 通話・打ち合わせ可
  priceFrom: number; // 1杯の目安（円）
  hours: string;
  scenes: Scene[];
  dog: {
    entry: "none" | "terrace" | "inside"; // 犬の入店：不可／テラス席のみ／店内OK
    menu: boolean; // 犬用ごはん・おやつがある
    water: boolean; // 水入れを出してくれる
  };
  parking: { type: "none" | "nearby" | "own"; spaces: number | null }; // 専用駐車場／近くに提携・コインP／なし
  note: string;
  verifiedAt: string; // 最終確認日 YYYY-MM-DD
  source: "sample" | "osm" | "survey" | "user";
};

export type Article = {
  slug: string;
  title: string;
  lead: string;
  station?: string;
  publishedAt: string;
  readMin: number;
  /** 本文。h＋points（箇条書き）を四角の枠で表示する。p は短い補足だけに使う */
  body: { h?: string; icon?: ArticleIcon; p?: string; points?: string[]; listings?: string[] }[];
};

export type ArticleIcon = "power" | "wifi" | "clock" | "seat" | "smoke" | "info";
