import type { Spot } from "./types";

/**
 * 作業スコア（0〜100）。3つの軸の加重平均。
 *   Wi-Fi 35% ／ 電源 35% ／ 作業しやすさ 30%
 * 重みを変えるときはここだけ直す。
 */
export function wifiScore(s: Spot): number {
  if (s.wifi === "none" || s.wifiMbps === null) return 0;
  const base = Math.min(100, 30 + (s.wifiMbps / 80) * 70); // 80Mbpsで満点
  return Math.round(s.wifi === "carrier" ? base * 0.5 : base);
}

export function powerScore(s: Spot): number {
  if (!s.power) return 0;
  return Math.round(Math.min(100, 25 + (s.power.seats / s.power.totalSeats) * 110));
}

export function workScore(s: Spot): number {
  const base = ((s.quiet + s.comfort) / 10) * 80;
  return Math.round(base + (s.timeLimitMin === null ? 20 : s.timeLimitMin >= 120 ? 10 : 0));
}

export function totalScore(s: Spot): number {
  return Math.round(wifiScore(s) * 0.35 + powerScore(s) * 0.35 + workScore(s) * 0.3);
}

export function scoreLabel(n: number): string {
  if (n >= 80) return "かなりはかどる";
  if (n >= 65) return "はかどる";
  if (n >= 50) return "ふつう";
  return "短時間むき";
}

export const AXES = [
  { key: "wifi", label: "Wi-Fi", color: "var(--c-wifi)", fn: wifiScore },
  { key: "power", label: "電源", color: "var(--c-power)", fn: powerScore },
  { key: "work", label: "作業しやすさ", color: "var(--c-work)", fn: workScore },
] as const;
