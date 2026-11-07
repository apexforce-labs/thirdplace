import Link from "next/link";
import type { Listing } from "@/data/listings";

const KIND: Record<Listing["kind"], string> = { cafe: "カフェ", lounge: "ラウンジ", coworking: "コワーキング" };
const pickFact = (l: Listing, label: string) => l.facts.find((f) => f.label === label)?.value;

export function ListingList({ items }: { items: Listing[] }) {
  if (items.length === 0) {
    return (
      <p className="empty">
        この駅のお店はまだ調査中です。<Link href="/submit/">知っているお店を教えてください</Link>。
      </p>
    );
  }
  return (
    <ol className="listing-grid">
      {items.map((l, i) => {
        const power = pickFact(l, "電源");
        const wifi = pickFact(l, "Wi-Fi");
        return (
          <li key={l.id}>
            <Link href={`/place/${l.id}/`} className="listing-card" id={`listing-${l.id}`}>
              <span className="listing-no" aria-hidden>{i + 1}</span>
              <h3>{l.name}</h3>
              <p className="sub">{KIND[l.kind]}・{l.access}</p>
              <ul className="facts">
                <li><b>営業</b>{l.hours}</li>
                {power && <li><b>電源</b>{power}</li>}
                {wifi && <li><b>Wi-Fi</b>{wifi}</li>}
              </ul>
              <span className="pending-tag">スコア調査待ち</span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
