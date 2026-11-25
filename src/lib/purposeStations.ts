import { stations } from "@/data/stations";
import { listingsByStation } from "@/data/listings";
import type { Purpose } from "./purposes";
import type { PurposeSlug } from "./types";

/** その目的のページを出す駅。作業は全駅、それ以外はお店が1店以上ある駅だけ（空のページを作らない） */
export const stationsFor = (p: Purpose) =>
  p.slug === "work" ? stations : stations.filter((s) => listingsByStation(s.slug, p.slug as PurposeSlug).length > 0);

/** 駅ページの見出し・タイトルに使う言葉 */
export const STATION_COPY: Record<PurposeSlug, { noun: string; title: (st: string, n: number) => string; desc: (st: string) => string; note: (n: number) => string }> = {
  work: {
    noun: "作業カフェ",
    title: (st, n) => `${st}駅の電源・Wi-Fiのある作業カフェ${n > 0 ? ` ${n}店` : ""}｜公式情報で確認`,
    desc: (st) => `${st}駅周辺で作業できるカフェを、電源・Wi-Fi・席数・営業時間を公式情報で確かめてまとめました。`,
    note: (n) => `${n}店。電源・Wi-Fi・席数・営業時間は各店の公式情報で確かめたものです。`,
  },
  dog: {
    noun: "犬と入れるカフェ",
    title: (st, n) => `${st}駅で犬と入れるカフェ${n > 0 ? ` ${n}店` : ""}｜店内・テラスを公式情報で確認`,
    desc: (st) => `${st}駅周辺で犬と一緒に入れるカフェを、店内OKかテラスのみか・犬の大きさ・営業時間を公式情報で確かめてまとめました。`,
    note: (n) => `${n}店。犬の同伴ルールと営業時間は各店の公式情報で確かめたものです。`,
  },
  kids: { noun: "カフェ", title: (st) => `${st}駅のカフェ`, desc: (st) => `${st}駅のカフェ`, note: (n) => `${n}店。` },
  party: { noun: "カフェ", title: (st) => `${st}駅のカフェ`, desc: (st) => `${st}駅のカフェ`, note: (n) => `${n}店。` },
};
