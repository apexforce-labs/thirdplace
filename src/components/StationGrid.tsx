import type { CSSProperties } from "react";
import Link from "next/link";
import { stations } from "@/data/stations";
import { listingsByStation } from "@/data/listings";
import { readyPurposes, type Purpose } from "@/lib/purposes";
import type { PurposeSlug } from "@/lib/types";

/** 駅名標の形をした駅カード。数字はその駅の掲載店数。only を渡すとその目的だけにリンクする */
export function StationGrid({ only }: { only?: Purpose }) {
  const list = only ? [only] : readyPurposes;
  return (
    <div className="station-grid">
      {stations.map((s) => (
        <div key={s.slug} className="eki" style={{ "--line": s.lineColor } as CSSProperties}>
          <Link href={`/${list[0].slug}/${s.slug}/`} className="plate">
            <span className="kana">{s.kana}</span>
            <span className="kanji">{s.name}</span>
            <span className="romaji">{s.romaji}</span>
          </Link>
          <span className="band">
            {list.map((p) => (
              <Link key={p.slug} href={`/${p.slug}/${s.slug}/`}>
                {p.name.replace("カフェ", "")} <span className="num">{listingsByStation(s.slug, p.slug as PurposeSlug).length}</span>
              </Link>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}
