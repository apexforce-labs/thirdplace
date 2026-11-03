import type { Spot } from "./types";

export const KIND_LABEL: Record<Spot["kind"], string> = {
  cafe: "カフェ",
  coworking: "コワーキング",
  library: "図書館",
  lounge: "ラウンジ",
};

export const WIFI_LABEL: Record<Spot["wifi"], string> = {
  free: "店舗の無料Wi-Fi",
  carrier: "キャリアWi-Fiのみ",
  none: "なし",
};

export const powerRatio = (s: Spot) => (s.power ? s.power.seats / s.power.totalSeats : 0);
