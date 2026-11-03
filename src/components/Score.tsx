import type { CSSProperties } from "react";
import type { PurposeSlug, Spot } from "@/lib/types";
import { purposeBySlug, purposeLabel, purposeScore } from "@/lib/purposes";

export const tier = (n: number) => (n >= 80 ? "tier-hi" : n >= 60 ? "tier-mid" : n >= 40 ? "" : "tier-lo");

export function ScoreRing({ value, size, color, name }: { value: number; size?: "lg"; color?: string; name: string }) {
  return (
    <div
      className={`score ${size ?? ""}`}
      style={{ "--v": value, "--c": value >= 40 ? color : "var(--ink-3)" } as CSSProperties}
      aria-label={`${name} ${value}点（100点満点）`}
    >
      <b>{value}</b>
    </div>
  );
}

export function PurposeScore({ purpose, spot, size }: { purpose: PurposeSlug; spot: Spot; size?: "lg" }) {
  const p = purposeBySlug(purpose)!;
  const n = purposeScore(p, spot);
  return (
    <div className="score-wrap">
      <ScoreRing value={n} size={size} color={p.color} name={p.scoreName} />
      <span className="score-label">{purposeLabel(p, n)}</span>
    </div>
  );
}

export function AxisBars({ purpose, spot }: { purpose: PurposeSlug; spot: Spot }) {
  const p = purposeBySlug(purpose)!;
  return (
    <div className="axes">
      {p.axes.map((a) => {
        const v = a.score(spot);
        return (
          <div className="axis" key={a.key} style={{ "--c": a.color } as CSSProperties}>
            <span className="k"><i aria-hidden />{a.label}</span>
            <span className="bar" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={v} aria-label={`${a.label} ${v}点`}>
              <span style={{ width: `${Math.max(3, v)}%` }} />
            </span>
            <span className="v">{a.text(spot)}</span>
          </div>
        );
      })}
    </div>
  );
}
