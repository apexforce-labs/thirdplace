/*
  人物イラスト：Open Peeps（Pablo Stanley 作、CC0：商用・改変・クレジット不要）を
  react-peeps（MIT）経由で使う。https://www.openpeeps.com/
*/
import type { CSSProperties } from "react";
import Peep from "react-peeps";

export const INK = "#16204a";

type Pose = "CrossedLegs" | "ClosedLegWB" | "MediumBW" | "OneLegUpBW" | "WalkingBW" | "PointingFingerBW" | "RoboDanceBW" | "EasingBW" | "BlazerBW" | "CrossedArmsBW";
const SITTING = new Set(["CrossedLegs", "ClosedLegWB", "MediumBW", "OneLegUpBW"]);

export function Person({
  pose, hair = "ShortWavy", face = "Smile", accessory = "None", facialHair = "None", fill = "#ffc93c", flip = false, className, style,
}: {
  pose: Pose; hair?: string; face?: string; accessory?: string; facialHair?: string; fill?: string; flip?: boolean; className?: string; style?: CSSProperties;
}) {
  const vb = SITTING.has(pose) ? { x: "150", y: "0", width: "1450", height: "2150" } : { x: "50", y: "0", width: "1350", height: "2900" };
  return (
    <span className={`person ${className ?? ""}`} style={style} aria-hidden>
      <Peep
        style={{ width: "100%", height: "100%", transform: flip ? "scaleX(-1)" : undefined, display: "block" }}
        body={pose as never}
        hair={hair as never}
        face={face as never}
        accessory={accessory as never}
        facialHair={facialHair as never}
        strokeColor={INK}
        backgroundColor={fill}
        viewBox={vb}
      />
    </span>
  );
}

const s = { stroke: INK, strokeWidth: 3, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

/** 犬（Open Peeps に合わせた線） */
export function Dog({ className, style, fill = "#ffffff" }: { className?: string; style?: CSSProperties; fill?: string }) {
  return (
    <svg viewBox="0 0 160 120" className={className} style={style} aria-hidden>
      <path d="M30 70 C30 50 48 44 74 46 C96 48 108 52 112 62 C116 74 110 88 98 90 L42 90 C34 90 30 82 30 70 Z" fill={fill} {...s} />
      <path d="M44 88 v22 h10 v-18 M88 88 v22 h10 v-20" fill={fill} {...s} />
      <path d="M30 66 C18 60 14 48 20 40" fill="none" {...s} />
      <path d="M104 58 C102 36 112 22 128 22 C144 22 152 34 150 46 C148 58 138 64 124 64 Z" fill={fill} {...s} />
      <path d="M112 30 C104 20 104 8 116 10 C122 12 122 22 120 28 Z" fill={INK} {...s} />
      <circle cx="134" cy="38" r="3.2" fill={INK} />
      <path d="M146 48 a5 4 0 1 0 6 2" fill={INK} {...s} strokeWidth="2" />
      <path d="M134 54 q6 4 12 0" fill="none" {...s} strokeWidth="2.4" />
      <path d="M108 62 l18 6" stroke="#3b5bdb" strokeWidth="6" strokeLinecap="round" />
      <ellipse cx="60" cy="68" rx="12" ry="9" fill="#ffc93c" opacity=".9" />
    </svg>
  );
}

/** カフェのテーブルとノートPC・コーヒー */
export function CafeTable({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 260 200" className={className} style={style} aria-hidden>
      <path d="M96 52 h80 l-8 -46 h-64 z" fill="#ffffff" {...s} />
      <path d="M120 22 l-6 6 6 6 M152 22 l6 6 -6 6" fill="none" {...s} strokeWidth="2.6" />
      <path d="M84 54 h108" {...s} />
      <path d="M200 30 h24 v14 a12 12 0 0 1 -24 0z" fill="#ffffff" {...s} />
      <path d="M224 34 a7 7 0 0 1 0 12" fill="none" {...s} />
      <path d="M206 22 q-4 -6 0 -12 M216 22 q-4 -6 0 -12" fill="none" {...s} strokeWidth="2.2" opacity=".55" />
      <ellipse cx="150" cy="60" rx="110" ry="12" fill="#ffffff" {...s} />
      <path d="M150 72 V188 M110 192 h80" {...s} strokeWidth="4" />
    </svg>
  );
}

/** スツール */
export function Stool({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 120 140" className={className} style={style} aria-hidden>
      <ellipse cx="60" cy="14" rx="52" ry="10" fill="#ffc93c" {...s} />
      <path d="M26 22 L16 136 M94 22 L104 136 M24 90 h72" fill="none" {...s} />
    </svg>
  );
}
