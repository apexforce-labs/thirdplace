/*
  東京とカフェのポップなイラスト（すべて自作のSVG）。
  線は濃紺、塗りは固定色。ダークモードでも同じ色で見えるよう、
  背景つきの枠（.illo-frame）の中に置いて使う。
*/
const L = "#2a2c33"; // 線
const SW = 1.8;
const BLUE = "#7b9cc9";
const SKY = "#dde6f0";
const PALE = "#f2f4f7";
const YEL = "#e8c873";
const RED = "#d9775a";
const PINK = "#e9b8c8";
const GRN = "#9cc2a9";
const WHITE = "#ffffff";
const BROWN = "#9b7656";

const s = { stroke: L, strokeWidth: SW, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

/** ロゴマーク：湯気の立つコーヒーカップ（線画） */
export function CupMark({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden className="cup-mark">
      <path d="M24 8 q-4 5 0 10 M33 6 q-4 6 0 12 M42 8 q-4 5 0 10" fill="none" {...s} />
      <path d="M12 24 H48 V38 a16 16 0 0 1 -16 16 H28 a16 16 0 0 1 -16 -16 Z" fill="#2f5fae" {...s} />
      <path d="M48 28 h4 a7 7 0 0 1 0 14 h-5" fill="none" {...s} />
      <path d="M8 58 H52" {...s} />
    </svg>
  );
}

/** 目的カード用の小さなイラスト */
export function PurposeIllo({ slug }: { slug: "work" | "dog" | "kids" | "party" }) {
  const frame = (bg: string, children: React.ReactNode) => (
    <svg viewBox="0 0 200 120" className="illo-card" aria-hidden>
      <rect x="0" y="0" width="200" height="120" rx="16" fill={bg} />
      <path d="M0 96 H200 V104 a16 16 0 0 1 -16 16 H16 a16 16 0 0 1 -16 -16 Z" fill={WHITE} opacity=".7" />
      {children}
    </svg>
  );
  switch (slug) {
    case "work":
      return frame("#e3eaf3", <>
        <path d="M54 92 h76 l-10 -48 h-56 z" fill={WHITE} {...s} />
        <rect x="70" y="52" width="40" height="26" rx="3" fill={SKY} />
        <path d="M78 64 l-5 5 5 5 M102 64 l5 5 -5 5" fill="none" {...s} strokeWidth="2" />
        <path d="M44 94 h96" {...s} />
        <path d="M144 70 h22 v14 a11 11 0 0 1 -22 0z" fill={WHITE} {...s} />
        <path d="M166 74 a6 6 0 0 1 0 10" fill="none" {...s} />
        <path d="M150 62 q-4 -6 0 -12 M160 62 q-4 -6 0 -12" fill="none" {...s} strokeWidth="2" opacity=".6" />
        <rect x="20" y="58" width="22" height="30" rx="7" fill={YEL} {...s} />
        <path d="M27 66 v8 M35 66 v8" {...s} />
        <path d="M31 88 q0 8 14 6" fill="none" {...s} />
        <path d="M150 22 a24 24 0 0 1 30 0 M156 30 a14 14 0 0 1 18 0" fill="none" stroke={BLUE} strokeWidth="4" strokeLinecap="round" />
        <circle cx="165" cy="38" r="3.5" fill={BLUE} />
      </>);
    case "dog":
      return frame("#f3e7dc", <>
        <ellipse cx="88" cy="80" rx="34" ry="19" fill={YEL} {...s} />
        <circle cx="126" cy="58" r="20" fill={YEL} {...s} />
        <path d="M112 44 q-8 -18 8 -16 z" fill={BROWN} {...s} strokeWidth="2.2" />
        <path d="M138 44 q10 -16 -4 -18 z" fill={BROWN} {...s} strokeWidth="2.2" />
        <circle cx="130" cy="58" r="2.6" fill={L} />
        <circle cx="142" cy="64" r="3.4" fill={L} />
        <path d="M134 70 q4 4 8 0" fill="none" {...s} strokeWidth="2" />
        <path d="M56 72 q-14 -12 -6 -26" fill="none" {...s} />
        <path d="M70 96 v-4 M104 96 v-4" {...s} />
        <path d="M110 66 l12 4" stroke={RED} strokeWidth="4.5" strokeLinecap="round" />
        <path d="M150 88 h36 l-4 10 h-28 z" fill={RED} {...s} />
        <circle cx="160" cy="84" r="4" fill={BROWN} {...s} strokeWidth="1.8" />
        <circle cx="172" cy="84" r="4" fill={BROWN} {...s} strokeWidth="1.8" />
        <path d="M22 26 c4 -6 12 -2 8 4 l-8 8 -8 -8 c-4 -6 4 -10 8 -4z" fill={PINK} {...s} strokeWidth="2" />
      </>);
    case "kids":
      return frame("#e2efe7", <>
        <path d="M60 46 h20 l14 40 h50" fill="none" {...s} />
        <path d="M86 46 a40 40 0 0 1 64 30 H96 z" fill={GRN} {...s} />
        <path d="M118 46 v30" stroke={WHITE} strokeWidth="2.4" opacity=".7" />
        <circle cx="100" cy="98" r="8" fill={WHITE} {...s} />
        <circle cx="138" cy="98" r="8" fill={WHITE} {...s} />
        <path d="M40 20 q6 -12 14 0 q-2 14 -7 18 q-5 -4 -7 -18z" fill={RED} {...s} strokeWidth="2.2" />
        <path d="M47 38 q-4 20 8 34" fill="none" {...s} strokeWidth="1.8" />
        <path d="M164 22 l4 8 9 1 -7 6 2 9 -8 -5 -8 5 2 -9 -7 -6 9 -1z" fill={YEL} {...s} strokeWidth="2" />
      </>);
    case "party":
      return frame("#f4e4ea", <>
        <path d="M10 18 Q100 46 190 18" fill="none" {...s} strokeWidth="2" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const x = 22 + i * 26; const y = 18 + Math.sin((i / 6) * Math.PI) * 26 * 0.55;
          return <path key={i} d={`M${x - 8} ${y} h16 l-8 14z`} fill={[BLUE, YEL, GRN, RED][i % 4]} {...s} strokeWidth="2" />;
        })}
        <rect x="64" y="64" width="72" height="30" rx="5" fill={WHITE} {...s} />
        <rect x="74" y="48" width="52" height="18" rx="4" fill={PINK} {...s} />
        <path d="M64 76 q9 8 18 0 t18 0 t18 0 t18 0" fill="none" stroke={PINK} strokeWidth="4" strokeLinecap="round" />
        <path d="M90 48 v-10 M110 48 v-10" {...s} />
        <path d="M90 32 q3 3 0 6 q-3 -3 0 -6z M110 32 q3 3 0 6 q-3 -3 0 -6z" fill={YEL} {...s} strokeWidth="1.8" />
        <path d="M54 96 h92" {...s} />
      </>);
  }
}

/** フッター上の街並み */
const SKYLINE: [number, number, number][] = [
  // x, 幅, 高さ
  [0, 70, 34], [74, 46, 58], [124, 60, 40], [188, 38, 72], [230, 72, 30], [306, 50, 52], [360, 20, 84],
  [384, 66, 44], [454, 44, 64], [502, 80, 36], [586, 52, 56], [642, 40, 78], [686, 74, 42], [764, 50, 60],
  [818, 22, 88], [844, 64, 38], [912, 48, 66], [964, 76, 34], [1044, 52, 54], [1100, 40, 74], [1144, 56, 40],
];
export function SkylineStrip() {
  return (
    <svg viewBox="0 0 1200 96" preserveAspectRatio="xMidYMax slice" className="skyline" aria-hidden>
      {SKYLINE.map(([x, w, h], i) => (
        <g key={i}>
          <rect x={x} y={96 - h} width={w} height={h + 4} rx="4" fill="var(--bg)" stroke="var(--ink-3)" strokeWidth="1.4" />
          {Array.from({ length: Math.floor((h - 14) / 16) }).map((_, r) =>
            Array.from({ length: Math.max(1, Math.floor((w - 12) / 16)) }).map((_, c) => (
              <rect key={`${r}-${c}`} x={x + 8 + c * 16} y={96 - h + 10 + r * 16} width="7" height="7" rx="1.5"
                fill={(r + c + i) % 5 === 0 ? "#e2b450" : "var(--ink-3)"} opacity={(r + c + i) % 5 === 0 ? 0.7 : 0.18} />
            )),
          )}
        </g>
      ))}
    </svg>
  );
}
