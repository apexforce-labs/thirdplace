import type { CSSProperties } from "react";
import Link from "next/link";
import type { Spot } from "@/lib/types";
import { CafeTable, Dog, INK, Person, Stool } from "./People";

const N = "#16204a";
const ln = { stroke: N, strokeWidth: 2.4, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

/** パネルの背景：東京の街（東京タワー、スカイツリー、山手線、桜） */
function TokyoBackdrop() {
  const back: [number, number, number][] = [[0, 70, 150], [66, 54, 190], [116, 64, 130], [176, 40, 210], [212, 70, 160], [440, 60, 200], [496, 50, 140], [542, 70, 180]];
  const front: [number, number, number][] = [[20, 80, 110], [96, 56, 90], [470, 70, 120], [536, 70, 96]];
  return (
    <svg viewBox="0 0 600 440" preserveAspectRatio="xMidYMax slice" className="stage-city" aria-hidden>
      <defs>
        <linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b5bdb" />
          <stop offset="1" stopColor="#7d93f0" />
        </linearGradient>
      </defs>
      <rect width="600" height="440" fill="url(#dusk)" />
      <text x="318" y="236" textAnchor="middle" fontFamily="var(--font-latin), Georgia, serif" fontStyle="italic" fontWeight="900" fontSize="190" fill="#ffffff" opacity=".16">Tokyo</text>
      <circle cx="510" cy="92" r="30" fill="#ffc93c" {...ln} />
      {/* スカイツリー */}
      <path d="M150 380 L160 70 L170 380 Z" fill="#ffffff" {...ln} />
      <rect x="151" y="138" width="18" height="12" rx="4" fill="#ffffff" {...ln} />
      <rect x="153" y="186" width="14" height="8" rx="3" fill="#ffffff" {...ln} />
      <path d="M160 70 V44" {...ln} />
      {/* 奥のビル */}
      {back.map(([x, w, h], i) => (
        <g key={`b${i}`}>
          <rect x={x} y={380 - h} width={w} height={h} fill="#2f48c0" {...ln} />
          {Array.from({ length: Math.floor((h - 20) / 22) }).map((_, r) =>
            Array.from({ length: Math.floor((w - 10) / 16) }).map((_, c) => (
              <rect key={`${r}${c}`} x={x + 8 + c * 16} y={380 - h + 12 + r * 22} width="7" height="10" rx="1.5" fill={(r * 3 + c + i) % 5 === 0 ? "#ffc93c" : "#5d77e6"} />
            )),
          )}
        </g>
      ))}
      {/* 東京タワー */}
      <g>
        <path d="M340 380 L380 64 L420 380 Z" fill="#ff6b4a" {...ln} />
        <path d="M380 64 V34" {...ln} />
        <rect x="358" y="196" width="44" height="14" fill="#ffffff" {...ln} />
        <rect x="350" y="286" width="60" height="14" fill="#ffffff" {...ln} />
        <path d="M352 286 L404 210 M408 286 L356 210 M362 196 L392 130 M398 196 L368 130 M346 380 L398 300 M414 380 L362 300" stroke="#ffffff" strokeWidth="1.8" opacity=".85" />
        <path d="M366 380 a14 22 0 0 1 28 0" fill="url(#dusk)" {...ln} />
      </g>
      {/* 手前の低いビル */}
      {front.map(([x, w, h], i) => (
        <g key={`f${i}`}>
          <rect x={x} y={380 - h} width={w} height={h} fill="#e8ecff" {...ln} />
          {Array.from({ length: Math.floor((h - 16) / 20) }).map((_, r) => (
            <rect key={r} x={x + 8} y={380 - h + 10 + r * 20} width={w - 16} height="9" rx="2" fill={(r + i) % 2 ? "#ffc93c" : "#9fb0f5"} stroke={N} strokeWidth="1.4" />
          ))}
        </g>
      ))}
      {/* 山手線（高架） */}
      <g>
        <rect x="0" y="312" width="600" height="10" fill="#e8ecff" {...ln} />
        {[40, 140, 240, 340, 440, 540].map((x) => <path key={x} d={`M${x} 322 V380 M${x + 26} 322 V380`} {...ln} />)}
        <g>
          <path d="M150 312 V266 a14 14 0 0 1 14 -14 H560 a14 14 0 0 1 14 14 V312 Z" fill="#f4f6fa" {...ln} />
          <rect x="150" y="294" width="424" height="9" fill="#80c241" stroke={N} strokeWidth="1.6" />
          {Array.from({ length: 12 }).map((_, k) => (
            <rect key={k} x={166 + k * 34} y="264" width="22" height="20" rx="3" fill="#9fb0f5" stroke={N} strokeWidth="1.6" />
          ))}
          <path d="M290 252 v60 M430 252 v60" stroke={N} strokeWidth="1.6" />
        </g>
      </g>
      <rect x="0" y="380" width="600" height="60" fill="#c9d3fb" {...ln} />
      {/* 桜 */}
      <g>
        <path d="M0 40 C40 50 60 70 80 110 M40 54 C44 30 34 16 20 8" fill="none" stroke={N} strokeWidth="5" strokeLinecap="round" />
        {[[80, 112, 18], [56, 84, 20], [26, 70, 22], [8, 100, 18], [34, 36, 16], [14, 16, 14], [94, 134, 12]].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#ffc6d3" {...ln} strokeWidth="2" />
        ))}
        {[[470, 180], [430, 150], [496, 230], [250, 120], [300, 200], [210, 90]].map(([x, y], i) => (
          <path key={`p${i}`} d={`M${x} ${y} q6 -8 12 0 q-6 8 -12 0z`} fill="#ffc6d3" stroke={N} strokeWidth="1.4" />
        ))}
      </g>
    </svg>
  );
}

/** トップの舞台：青いパネルの上で、カフェで作業する人と犬と歩く人。スコアのカードが浮かぶ */
export function HeroStage({ pick, score }: { pick: Spot; score: number }) {
  return (
    <div className="stage" aria-label="カフェでノートPCを開く人と、犬と散歩する人のイラスト" role="img">
      <div className="stage-panel">
        <TokyoBackdrop />
      </div>

      <Stool className="stage-stool" />
      <Person pose="CrossedLegs" hair="LongCurly" face="Calm" fill="#ffc93c" className="stage-worker" />
      <CafeTable className="stage-table" />
      <Person pose="WalkingBW" hair="Bun" face="SmileBig" fill="#ffffff" flip className="stage-walker" />
      <Dog className="stage-dog" />
      <svg viewBox="0 0 200 120" className="stage-leash" aria-hidden>
        <path d="M10 20 C60 110 140 110 190 70" fill="none" stroke={INK} strokeWidth="2.4" strokeDasharray="1 0" />
      </svg>

      <Link href={`/spot/${pick.id}/`} className="float-card fc-score" style={{ "--r": "-5deg" } as CSSProperties}>
        <span className="fc-num">{score}</span>
        <span className="fc-body">
          <small>AIのおすすめ・渋谷で作業</small>
          <b>{pick.name}</b>
          <span className="fc-bars" aria-hidden>
            <i style={{ width: "92%", background: "#3b5bdb" }} />
            <i style={{ width: "74%", background: "#ffc93c" }} />
            <i style={{ width: "84%", background: "#5cc29a" }} />
          </span>
        </span>
      </Link>
      <span className="float-chip fc-wifi" style={{ "--r": "6deg" } as CSSProperties}>Wi-Fi {pick.wifiMbps}Mbps</span>
      <span className="float-chip fc-dog" style={{ "--r": "-4deg" } as CSSProperties}>犬も店内OK</span>
      <svg viewBox="0 0 40 40" className="spark sp1" aria-hidden><path d="M20 2 V14 M20 26 V38 M2 20 H14 M26 20 H38" stroke={INK} strokeWidth="3" strokeLinecap="round" /></svg>
      <svg viewBox="0 0 40 40" className="spark sp2" aria-hidden><path d="M20 4 L24 16 L36 20 L24 24 L20 36 L16 24 L4 20 L16 16 Z" fill="#ffc93c" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" /></svg>
    </div>
  );
}
