import type { CSSProperties } from "react";
import Link from "next/link";
import { stations } from "@/data/stations";
import { spotsByStation } from "@/data/spots";
import { purposeScore, readyPurposes, relevant, type Purpose } from "@/lib/purposes";

const good = (p: Purpose, slug: string) => spotsByStation(slug).filter((s) => relevant(p, s) && purposeScore(p, s) >= 60).length;

/** 駅名標の形をした駅カード。only を渡すとその目的だけにリンクする */
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
                {p.name.replace("カフェ", "")} <span className="num">{good(p, s.slug)}</span>
              </Link>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}
