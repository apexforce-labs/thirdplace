import Link from "next/link";
import type { PurposeSlug, Spot } from "@/lib/types";
import { KIND_LABEL } from "@/lib/filters";
import { AxisBars, PurposeScore } from "./Score";

export function SpotCard({
  spot, purpose, active, onHover,
}: { spot: Spot; purpose: PurposeSlug; active?: boolean; onHover?: (id: string | null) => void }) {
  const chips: string[] = [];
  if (purpose === "work") {
    if (spot.quiet >= 4) chips.push("静か");
    if (spot.meetingOk) chips.push("通話OK");
  } else if (purpose === "dog") {
    if (spot.dog.water) chips.push("お水あり");
    if (spot.wifi === "free" && spot.power) chips.push("作業もできる");
  }
  return (
    <Link
      href={`/spot/${spot.id}/`}
      className={`spot-card${active ? " active" : ""}`}
      id={`spot-${spot.id}`}
      onMouseEnter={onHover ? () => onHover(spot.id) : undefined}
      onMouseLeave={onHover ? () => onHover(null) : undefined}
      onFocus={onHover ? () => onHover(spot.id) : undefined}
    >
      <div className="left"><PurposeScore purpose={purpose} spot={spot} /></div>
      <div style={{ minWidth: 0 }}>
        <h3>
          {spot.name}
          {spot.source === "sample" && <span className="sample-tag">見本</span>}
        </h3>
        <p className="sub">{KIND_LABEL[spot.kind]}・徒歩{spot.walkMin}分・¥{spot.priceFrom}〜・{spot.hours}</p>
        <AxisBars purpose={purpose} spot={spot} />
        {chips.length > 0 && <div className="chips">{chips.map((c) => <span className="chip" key={c}>{c}</span>)}</div>}
      </div>
    </Link>
  );
}
