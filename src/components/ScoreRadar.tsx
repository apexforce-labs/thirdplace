import { SCORE_AXES, type Listing } from "@/data/listings";

/*
  作業スコアのレーダーチャート（6項目・5段階）。
  測っていない項目は軸を点線にして「未計測」と書き、値を仮で埋めない。
  6項目すべて測れたときだけ面を塗る。
*/
const C = 150; // 中心
const R = 92; // 5の半径
const LABEL_R = 116;

function pt(i: number, r: number) {
  const a = (Math.PI / 180) * (-90 + i * 60);
  return [C + r * Math.cos(a), C + r * Math.sin(a)] as const;
}
const f = (n: number) => n.toFixed(1);

export function ScoreRadar({ scores }: { scores: Listing["scores"] }) {
  const vals = SCORE_AXES.map((a) => {
    const v = scores?.[a.key];
    return typeof v === "number" && v >= 1 && v <= 5 ? v : null;
  });
  const measured = vals.filter((v) => v !== null).length;
  const complete = measured === SCORE_AXES.length;
  const summary = SCORE_AXES.map((a, i) => `${a.label} ${vals[i] === null ? "未計測" : `5段階中${vals[i]}`}`).join("、");

  return (
    <figure className="score-radar panel">
      <figcaption>
        <b>作業スコア</b>
        {measured === 0 ? (
          <span className="pending-tag">調査待ち</span>
        ) : !complete ? (
          <span className="pending-tag">{SCORE_AXES.length - measured}項目 未計測</span>
        ) : null}
      </figcaption>
      <svg viewBox="-40 0 380 300" role="img" aria-label={`作業スコア：${summary}`}>
        {[1, 2, 3, 4, 5].map((lv) => (
          <polygon
            key={lv}
            className="sr-ring"
            points={SCORE_AXES.map((_, i) => pt(i, (R * lv) / 5).map(f).join(",")).join(" ")}
          />
        ))}
        {SCORE_AXES.map((a, i) => {
          const [x, y] = pt(i, R);
          return <line key={a.key} x1={C} y1={C} x2={f(x)} y2={f(y)} className={vals[i] === null ? "sr-axis is-empty" : "sr-axis"} />;
        })}
        {complete && (
          <polygon className="sr-area" points={vals.map((v, i) => pt(i, (R * (v as number)) / 5).map(f).join(",")).join(" ")} />
        )}
        {vals.map((v, i) => {
          if (v === null) return null;
          const [x, y] = pt(i, (R * v) / 5);
          return <circle key={i} cx={f(x)} cy={f(y)} r="4.5" className="sr-dot" />;
        })}
        {SCORE_AXES.map((a, i) => {
          const [x, y] = pt(i, LABEL_R);
          const anchor = i === 0 || i === 3 ? "middle" : i < 3 ? "start" : "end";
          const dy = i === 0 ? -6 : i === 3 ? 14 : 4;
          return (
            <text key={a.key} x={f(x)} y={f(y + dy)} textAnchor={anchor} className="sr-label">
              <tspan>{a.label}</tspan>
              <tspan x={f(x)} dy="15" className={vals[i] === null ? "sr-val is-empty" : "sr-val"}>
                {vals[i] === null ? "未計測" : `${vals[i]} / 5`}
              </tspan>
            </text>
          );
        })}
      </svg>
      {measured < SCORE_AXES.length && (
        <p>
          点線の項目はまだ現地で測っていません。Wi-Fiの速さ、電源のある席の数、静かさなどを測り次第、5段階で付けます。
        </p>
      )}
    </figure>
  );
}
