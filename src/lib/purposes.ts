import type { PurposeSlug, Spot } from "./types";
import { powerScore, wifiScore, workScore } from "./score";

export type Axis = {
  key: string;
  label: string;
  color: string; // CSS変数
  score: (s: Spot) => number; // 0〜100
  text: (s: Spot) => string;
  weight: number;
};

export type Filter = { key: string; label: string; color?: string; test: (s: Spot) => boolean };

export type Purpose = {
  slug: PurposeSlug;
  name: string; // 「カフェ作業」
  verb: string; // 見出し用「作業がはかどる」
  scoreName: string; // 「作業スコア」
  color: string;
  soft: string;
  ready: boolean;
  lead: string;
  axes: Axis[];
  filters: Filter[];
  labels: [number, string][]; // しきい値と言葉（高い順）
};

/* ---------- 犬と行く ---------- */
export const dogEntryScore = (s: Spot) => (s.dog.entry === "inside" ? 100 : s.dog.entry === "terrace" ? 60 : 0);
export const dogMenuScore = (s: Spot) => (s.dog.entry === "none" ? 0 : (s.dog.menu ? 70 : 0) + (s.dog.water ? 30 : 0));
export const parkingScore = (s: Spot) => (s.parking.type === "own" ? 100 : s.parking.type === "nearby" ? 50 : 0);

export const PURPOSES: Purpose[] = [
  {
    slug: "work",
    name: "カフェ作業",
    verb: "作業がはかどる",
    scoreName: "作業スコア",
    color: "var(--p-work)",
    soft: "var(--p-work-soft)",
    ready: true,
    lead: "Wi-Fiの速さ、電源の数、作業のしやすさ。",
    axes: [
      { key: "wifi", label: "Wi-Fi", color: "var(--c-wifi)", weight: 0.35, score: wifiScore,
        text: (s) => (s.wifi === "none" ? "なし" : `${s.wifiMbps}Mbps${s.wifi === "carrier" ? "（キャリア）" : ""}`) },
      { key: "power", label: "電源", color: "var(--c-power)", weight: 0.35, score: powerScore,
        text: (s) => (s.power ? `${s.power.seats}/${s.power.totalSeats}席` : "なし") },
      { key: "work", label: "作業しやすさ", color: "var(--c-work)", weight: 0.3, score: workScore,
        text: (s) => (s.timeLimitMin ? `${s.timeLimitMin}分制` : "制限なし") },
    ],
    filters: [
      { key: "power", label: "電源あり", color: "var(--c-power)", test: (s) => !!s.power },
      { key: "wifi", label: "無料Wi-Fi", color: "var(--c-wifi)", test: (s) => s.wifi === "free" },
      { key: "fastwifi", label: "Wi-Fi 50Mbps以上", color: "var(--c-wifi)", test: (s) => s.wifi === "free" && (s.wifiMbps ?? 0) >= 50 },
      { key: "workeasy", label: "作業しやすい", color: "var(--c-work)", test: (s) => workScore(s) >= 70 },
      { key: "nolimit", label: "時間制限なし", test: (s) => s.timeLimitMin === null },
      { key: "meeting", label: "通話OK", test: (s) => s.meetingOk },
    ],
    labels: [[80, "かなりはかどる"], [65, "はかどる"], [50, "ふつう"], [0, "短時間むき"]],
  },
  {
    slug: "dog",
    name: "犬と行く",
    verb: "犬と楽しめる",
    scoreName: "わんこスコア",
    color: "var(--p-dog)",
    soft: "var(--p-dog-soft)",
    ready: true,
    lead: "店内に入れるか、犬用ごはんがあるか、車で行けるか。",
    axes: [
      { key: "entry", label: "犬の入店", color: "var(--c-dog)", weight: 0.5, score: dogEntryScore,
        text: (s) => ({ inside: "店内OK", terrace: "テラスのみ", none: "不可" })[s.dog.entry] },
      { key: "menu", label: "犬ごはん", color: "var(--c-food)", weight: 0.2, score: dogMenuScore,
        text: (s) => (s.dog.entry === "none" ? "—" : s.dog.menu ? "メニューあり" : s.dog.water ? "お水のみ" : "なし") },
      { key: "parking", label: "駐車場", color: "var(--c-park)", weight: 0.3, score: parkingScore,
        text: (s) => (s.parking.type === "own" ? `専用${s.parking.spaces}台` : s.parking.type === "nearby" ? "近くにあり" : "なし") },
    ],
    filters: [
      { key: "inside", label: "店内OK", color: "var(--c-dog)", test: (s) => s.dog.entry === "inside" },
      { key: "terrace", label: "テラスOK", color: "var(--c-dog)", test: (s) => s.dog.entry !== "none" },
      { key: "menu", label: "犬ごはんあり", color: "var(--c-food)", test: (s) => s.dog.entry !== "none" && s.dog.menu },
      { key: "parking", label: "専用駐車場", color: "var(--c-park)", test: (s) => s.parking.type === "own" },
      { key: "parkingnear", label: "近くに駐車場", color: "var(--c-park)", test: (s) => s.parking.type !== "none" },
    ],
    labels: [[80, "わんこ大歓迎"], [60, "いっしょに行ける"], [30, "条件つき"], [0, "犬連れは不可"]],
  },
  {
    slug: "kids", name: "子どもと行く", verb: "子連れで過ごせる", scoreName: "子連れスコア",
    color: "var(--p-kids)", soft: "var(--p-kids-soft)", ready: false,
    lead: "ベビーカーで入れるか、キッズメニュー、おむつ替え。", axes: [], filters: [], labels: [[0, ""]],
  },
  {
    slug: "party", name: "誕生会をひらく", verb: "お祝いができる", scoreName: "お祝いスコア",
    color: "var(--p-party)", soft: "var(--p-party-soft)", ready: false,
    lead: "貸切や個室、ケーキの持ち込み、サプライズ対応。", axes: [], filters: [], labels: [[0, ""]],
  },
];

export const readyPurposes = PURPOSES.filter((p) => p.ready);
export const purposeBySlug = (slug: string) => PURPOSES.find((p) => p.slug === slug);

export function purposeScore(p: Purpose, s: Spot): number {
  return Math.round(p.axes.reduce((sum, a) => sum + a.score(s) * a.weight, 0));
}

export function purposeLabel(p: Purpose, n: number): string {
  return p.labels.find(([t]) => n >= t)?.[1] ?? "";
}

/** その目的で載せる価値がある店か（犬不可の店は犬ページに出さない） */
export function relevant(p: Purpose, s: Spot): boolean {
  if (p.slug === "dog") return s.dog.entry !== "none";
  return true;
}
