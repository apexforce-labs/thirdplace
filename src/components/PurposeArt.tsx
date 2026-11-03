import type { PurposeSlug } from "@/lib/types";
import { CafeTable, Dog, INK, Person } from "./People";

const s = { stroke: INK, strokeWidth: 3, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

/** 目的カードの絵（Open Peeps の人物＋小物） */
export function PurposeArt({ slug }: { slug: PurposeSlug }) {
  return (
    <div className={`p-art p-art-${slug}`} aria-hidden>
      <span className="p-circle" />
      {slug === "work" && (
        <>
          <Person pose="ClosedLegWB" hair="Medium" face="Calm" fill="#ffc93c" className="pa-a" />
          <CafeTable className="pa-table" />
        </>
      )}
      {slug === "dog" && (
        <>
          <Person pose="WalkingBW" hair="ShortCurly" face="SmileBig" fill="#ffffff" className="pa-b" />
          <Dog className="pa-dog" fill="#ffc93c" />
        </>
      )}
      {slug === "kids" && (
        <>
          {/* 親子：大人と、手をつないだ小さな子ども。子どもは風船を持っている */}
          <Person pose="WalkingBW" hair="Long" face="SmileBig" fill="#ffffff" className="pa-parent" />
          <Person pose="PointingFingerBW" hair="Buns" face="Cute" fill="#ffc93c" className="pa-child" />
          <svg viewBox="0 0 60 150" className="pa-balloon">
            <path d="M30 8 C46 8 54 22 50 38 C46 54 36 62 30 64 C24 62 14 54 10 38 C6 22 14 8 30 8 Z" fill="#ff8fa3" {...s} />
            <path d="M22 18 q-6 8 -4 18" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M30 64 l-4 6 h8 z M30 70 C38 92 20 112 28 148" fill="none" {...s} strokeWidth="2.2" />
          </svg>
          <svg viewBox="0 0 120 110" className="pa-stroller">
            <path d="M14 30 h14 l12 44 h58" fill="none" {...s} />
            <path d="M34 34 a40 40 0 0 1 70 30 H44 z" fill="#3b5bdb" {...s} />
            <path d="M44 64 h60 l-6 14 H50 z" fill="#ffffff" {...s} />
            <circle cx="54" cy="94" r="10" fill="#ffffff" {...s} />
            <circle cx="96" cy="94" r="10" fill="#ffffff" {...s} />
          </svg>
        </>
      )}
      {slug === "party" && (
        <>
          {/* 誕生会：ガーランド、三角帽子をかぶった人、ろうそくの立ったケーキ */}
          <svg viewBox="0 0 300 70" className="pa-garland" preserveAspectRatio="none">
            <path d="M0 10 Q150 60 300 10" fill="none" {...s} strokeWidth="2.2" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => {
              const x = 18 + k * 37; const t = x / 300; const y = 10 + 4 * 25 * t * (1 - t) * 1.6;
              return <path key={k} d={`M${x - 12} ${y} h24 l-12 22 z`} fill={["#ffc93c", "#3b5bdb", "#ff8fa3", "#7fd1ae"][k % 4]} {...s} strokeWidth="2" />;
            })}
          </svg>
          <Person pose="RoboDanceBW" hair="Afro" face="SmileLol" fill="#ffc93c" className="pa-dancer" />
          <svg viewBox="0 0 60 70" className="pa-hat">
            <path d="M8 64 L30 8 L52 64 Z" fill="#3b5bdb" {...s} />
            <path d="M16 44 L44 44 M22 28 L38 28" stroke="#ffc93c" strokeWidth="4" />
            <circle cx="30" cy="8" r="6" fill="#ff8fa3" {...s} strokeWidth="2" />
          </svg>
          <svg viewBox="0 0 150 130" className="pa-cake">
            <path d="M14 126 h122" {...s} />
            <rect x="22" y="78" width="106" height="46" rx="6" fill="#ffffff" {...s} />
            <path d="M22 92 q13 12 26 0 t26 0 t27 0 t27 0" fill="none" stroke="#ff8fa3" strokeWidth="5" strokeLinecap="round" />
            <rect x="38" y="46" width="74" height="34" rx="6" fill="#ffe1e7" {...s} />
            <circle cx="56" cy="58" r="4" fill="#ff6b4a" {...s} strokeWidth="1.6" />
            <circle cx="94" cy="58" r="4" fill="#ff6b4a" {...s} strokeWidth="1.6" />
            {[60, 75, 90].map((x) => (
              <g key={x}>
                <rect x={x - 3} y="24" width="6" height="22" rx="2" fill="#3b5bdb" {...s} strokeWidth="1.8" />
                <path d={`M${x} 8 q6 8 0 14 q-6 -6 0 -14z`} fill="#ffc93c" {...s} strokeWidth="1.8" />
              </g>
            ))}
          </svg>
        </>
      )}
    </div>
  );
}
