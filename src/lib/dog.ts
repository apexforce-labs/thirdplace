import type { Listing } from "@/data/listings";

type Dog = NonNullable<Listing["dog"]>;

/** 犬が入れる場所（一覧・表で使う短い言葉） */
export const DOG_WHERE: Record<Dog["where"], string> = { inside: "店内もOK", terrace: "テラスのみ", ask: "要相談" };

export const dogMenuText = (d: Dog) => (d.menu ? "あり" : "公式に記載なし");

export const dogParkingText = (d: Dog) =>
  d.parking === "own" ? "お店の駐車場あり" : d.parking === "none" ? "お店の駐車場なし" : "お店の駐車場は公式に記載なし";

/** 店のまわりの駐車場をGoogleマップで探すリンク（料金・空きは地図側で確認してもらう） */
export const nearbyParkingUrl = (l: Pick<Listing, "lat" | "lng">) =>
  `https://www.google.com/maps/search/${encodeURIComponent("駐車場")}/@${l.lat},${l.lng},17z`;
