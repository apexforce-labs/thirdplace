import Link from "next/link";
import type { Listing } from "@/data/listings";
import { DOG_WHERE, dogMenuText, dogParkingText } from "@/lib/dog";

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
        const dog = pickFact(l, "犬の同伴");
        const isWork = l.purposes.includes("work");
        return (
          <li key={l.id}>
            <Link href={`/place/${l.id}/`} className="listing-card" id={`listing-${l.id}`}>
              <span className="listing-no" aria-hidden>{i + 1}</span>
              <h3>{l.name}</h3>
              <p className="sub">{KIND[l.kind]}・{l.access}</p>
              <ul className="facts">
                <li><b>営業</b>{l.hours}</li>
                {l.dog ? (
                  <>
                    <li><b>犬</b>{DOG_WHERE[l.dog.where]}（{l.dog.whereNote}）</li>
                    <li><b>犬ごはん</b>{dogMenuText(l.dog)}</li>
                    <li><b>駐車場</b>{dogParkingText(l.dog)}</li>
                  </>
                ) : (
                  dog && <li><b>犬</b>{dog}</li>
                )}
                {isWork && power && <li><b>電源</b>{power}</li>}
                {isWork && wifi && <li><b>Wi-Fi</b>{wifi}</li>}
              </ul>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
