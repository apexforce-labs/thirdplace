import type { Spot } from "./types";
import { type Purpose, purposeScore, relevant } from "./purposes";

/** 相棒が「ここがおすすめ」と言うときの理由文。スコアの高い軸から順に2つ選ぶ */
const REASONS: Record<string, (s: Spot) => string | null> = {
  wifi: (s) => (s.wifi === "free" && s.wifiMbps ? `Wi-Fiが${s.wifiMbps}Mbpsと速くて` : null),
  power: (s) => (s.power ? `電源のある席が${s.power.seats}席もあって` : null),
  work: (s) => (s.timeLimitMin === null ? (s.quiet >= 4 ? "静かで時間制限もなくて" : "時間制限がなくて") : null),
  entry: (s) => (s.dog.entry === "inside" ? "店内までいっしょに入れて" : s.dog.entry === "terrace" ? "テラス席なら犬もOKで" : null),
  menu: (s) => (s.dog.menu ? "犬用のごはんもあって" : null),
  parking: (s) => (s.parking.type === "own" ? `専用駐車場が${s.parking.spaces}台あって` : s.parking.type === "nearby" ? "近くに駐車場もあって" : null),
};

const ENDING: Record<string, string> = {
  work: "長く作業したい日にぴったり。",
  dog: "お散歩ついでに寄りやすいよ。",
};

export function suggest(p: Purpose, spots: Spot[]) {
  const pick = spots.filter((s) => relevant(p, s)).sort((a, b) => purposeScore(p, b) - purposeScore(p, a))[0];
  if (!pick) return null;
  const parts = [...p.axes]
    .sort((a, b) => b.score(pick) - a.score(pick))
    .map((a) => REASONS[a.key]?.(pick))
    .filter(Boolean)
    .slice(0, 2) as string[];
  return { spot: pick, score: purposeScore(p, pick), reason: parts.join("、") + "、" + (ENDING[p.slug] ?? "") };
}
