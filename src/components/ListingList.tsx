import Link from "next/link";
import type { Listing } from "@/data/listings";

const KIND: Record<Listing["kind"], string> = { cafe: "カフェ", lounge: "ラウンジ", coworking: "コワーキング" };

export function ListingList({ items, stationName }: { items: Listing[]; stationName: string }) {
  if (items.length === 0) return null;
  return (
    <section className="listing-sec wrap" aria-labelledby="listing-h">
      <div className="listing-head">
        <h2 id="listing-h">{stationName}駅の実在のお店</h2>
        <p>公式サイトや紹介記事で確認できた事実だけを載せています。スコアは現地で測ってから付けます。</p>
      </div>
      <ul className="listing-grid">
        {items.map((l) => (
          <li key={l.id}>
            <Link href={`/place/${l.id}/`} className="listing-card">
              <span className="pending-tag">スコア調査待ち</span>
              <h3>{l.name}</h3>
              <p className="sub">{KIND[l.kind]}・{l.access}</p>
              <ul className="facts">
                {l.facts.slice(0, 2).map((f) => <li key={f.label}><b>{f.label}</b>{f.value}</li>)}
              </ul>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
