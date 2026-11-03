import type { Scene, Spot } from "@/lib/types";
import { stations } from "./stations";

/**
 * 見本データ。店名はすべて架空で、実在の店舗とは関係ありません。
 * 本番では scripts/import-osm.mjs（OpenStreetMap）＋現地調査＋投稿のデータに置き換える。
 */
const NAMES = [
  "珈琲 灯台", "ノート・カフェ", "喫茶 ヘルツ", "STAND 220", "書斎カフェ 栞", "コーヒー 平行線",
  "Plug & Pour", "喫茶 余白", "ワークラウンジ 窓", "珈琲 方眼", "カフェ 青写真", "喫茶 二口",
  "Desk Coffee", "珈琲 ひだまり堂", "シェアデスク 港", "喫茶 定規", "カフェ 夜間飛行", "図書室カフェ 頁",
];
const NOTES = [
  "窓際のカウンター席すべてに電源あり。昼過ぎから夕方まで落ち着いている。",
  "奥の大テーブルに電源が4口。打ち合わせの声が聞こえる程度のにぎやかさ。",
  "ソファ席は電源なし。作業ならレジ横の壁沿いを選ぶ。",
  "平日は長居OK。土日の12〜15時のみ90分制。",
  "通話は外のテラス席でお願い、と店内に掲示あり。",
  "ドリンクのおかわり割引あり。Wi-Fiはレシートに記載のパスワードで接続。",
];

function rand(seed: number) {
  let t = seed + 0x6d2b79f5;
  return () => {
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function build(): Spot[] {
  const out: Spot[] = [];
  stations.forEach((st, si) => {
    const r = rand(si * 101 + 7);
    const count = si < 2 ? 9 : 6;
    for (let i = 0; i < count; i++) {
      const angle = r() * Math.PI * 2;
      const dist = 0.0015 + r() * 0.006; // 約150m〜750m
      const kindRoll = r();
      const kind: Spot["kind"] = kindRoll > 0.88 ? "coworking" : kindRoll > 0.8 ? "lounge" : "cafe";
      const total = 16 + Math.floor(r() * 60);
      const hasPower = r() > 0.12;
      const scenes: Scene[] = ["solo"];
      if (r() > 0.55) scenes.push("group");
      if (r() > 0.7) scenes.push("family");
      const limitRoll = r();
      const dogRoll = si === 7 || si === 6 ? 0.3 + r() * 0.7 : r(); // 吉祥寺・中目黒は犬連れの店を多めに
      const parkRoll = si === 9 || si === 7 ? 0.25 + r() * 0.75 : r();
      const wifi: Spot["wifi"] = r() > 0.18 ? "free" : r() > 0.5 ? "carrier" : "none";
      out.push({
        id: `${st.slug}-${String(i + 1).padStart(2, "0")}`,
        name: NAMES[(si * 5 + i * 7) % NAMES.length],
        kind,
        station: st.slug,
        lat: +(st.lat + Math.sin(angle) * dist).toFixed(5),
        lng: +(st.lng + Math.cos(angle) * dist * 1.2).toFixed(5),
        walkMin: Math.max(1, Math.round((dist * 111000) / 80)),
        power: hasPower ? { seats: Math.max(2, Math.floor(total * (0.15 + r() * 0.6))), totalSeats: total } : null,
        wifi,
        wifiMbps: wifi === "free" ? 8 + Math.floor(r() * 140) : wifi === "carrier" ? 5 + Math.floor(r() * 30) : null,
        comfort: (1 + Math.floor(r() * 5)) as Spot["comfort"],
        timeLimitMin: limitRoll > 0.7 ? 90 : limitRoll > 0.6 ? 120 : null,
        quiet: (1 + Math.floor(r() * 5)) as Spot["quiet"],
        meetingOk: r() > 0.5,
        priceFrom: kind === "coworking" ? 500 + Math.floor(r() * 4) * 100 : 380 + Math.floor(r() * 8) * 30,
        hours: r() > 0.5 ? "7:30–21:00" : r() > 0.5 ? "9:00–22:00" : "8:00–20:00",
        scenes,
        dog: {
          entry: dogRoll > 0.62 ? "inside" : dogRoll > 0.38 ? "terrace" : "none",
          menu: dogRoll > 0.38 && r() > 0.5,
          water: dogRoll > 0.38 && r() > 0.25,
        },
        parking: parkRoll > 0.75 ? { type: "own", spaces: 2 + Math.floor(r() * 10) } : parkRoll > 0.35 ? { type: "nearby", spaces: null } : { type: "none", spaces: null },
        note: NOTES[(si + i * 3) % NOTES.length],
        verifiedAt: `2026-10-${String(5 + Math.floor(r() * 24)).padStart(2, "0")}`,
        source: "sample",
      });
    }
  });
  return out;
}

export const spots: Spot[] = build();
export const spotById = (id: string) => spots.find((s) => s.id === id);
export const spotsByStation = (slug: string) => spots.filter((s) => s.station === slug);
