import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { stationBySlug, stations } from "@/data/stations";
import { purposeBySlug, readyPurposes } from "@/lib/purposes";
import type { PurposeSlug } from "@/lib/types";
import { ListingList } from "@/components/ListingList";
import { ListingMap } from "@/components/ListingMap";
import { listingsByStation, stationSlugsFor } from "@/data/listings";
import { articles } from "@/data/articles";

type Params = Promise<{ purpose: string; station: string }>;

export const dynamicParams = false;
export function generateStaticParams() {
  return readyPurposes.flatMap((p) => stationSlugsFor(p.slug).map((station) => ({ purpose: p.slug, station })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { purpose, station } = await params;
  const p = purposeBySlug(purpose); const st = stationBySlug(station);
  if (!p || !st) return {};
  const n = listingsByStation(st.slug, p.slug as PurposeSlug).length;
  if (p.slug === "dog") {
    return {
      title: `${st.name}駅で犬と入れるカフェ・ランチ ${n}店｜犬OKを公式サイトで確認`,
      description: `${st.name}駅の近くで犬連れOKのお店を、店内OKかテラスのみか、犬用メニューの有無まで公式サイトで確かめてまとめました。`,
      alternates: { canonical: `/${p.slug}/${st.slug}/` },
    };
  }
  return {
    title: `${st.name}駅の電源・Wi-Fiのある作業カフェ${n > 0 ? ` ${n}店` : ""}｜公式情報で確認`,
    description: `${st.name}駅周辺で作業できるカフェを、電源・Wi-Fi・席数・営業時間を公式情報で確かめてまとめました。`,
    alternates: { canonical: `/${p.slug}/${st.slug}/` },
  };
}

export default async function Page({ params }: { params: Params }) {
  const { purpose, station } = await params;
  const p = purposeBySlug(purpose); const st = stationBySlug(station);
  if (!p?.ready || !st || !stationSlugsFor(p.slug).includes(st.slug)) notFound();
  const items = listingsByStation(st.slug, p.slug as PurposeSlug);
  const related = articles.filter((a) => a.station === st.slug && (a.purpose ?? "work") === p.slug);
  return (
    <div className="wrap station-page">
      <nav className="crumbs" aria-label="パンくず">
        <Link href="/">トップ</Link><span>/</span><Link href={`/${p.slug}/`}>{p.name}</Link><span>/</span><span>{st.name}駅</span>
      </nav>
      <header className="station-head">
        <div className="title">
          <span className="dot" style={{ background: st.lineColor } as CSSProperties} aria-hidden />
          <h1>{st.name}駅で{p.verb}カフェ</h1>
        </div>
        <p className="blurb">{st.blurb}</p>
        <p className="muted">
          {p.slug === "dog"
            ? `${items.length}店。犬連れのルール（店内OK・テラスのみ・事前に相談）は各店の公式サイトで確かめたものです。`
            : `${items.length}店。電源・Wi-Fi・席数・営業時間は各店の公式情報で確かめたものです。`}
        </p>
      </header>
      <div className="station-layout">
        <ListingMap center={{ lat: st.lat, lng: st.lng, label: st.name }} points={items.map((l, i) => ({ id: l.id, name: l.name, lat: l.lat, lng: l.lng, n: i + 1 }))} />
        <ListingList items={items} />
      </div>
      {related.length > 0 && (
        <nav className="station-articles" aria-label={`${st.name}駅の読みもの`}>
          <h2>{st.name}駅の読みもの</h2>
          <ul>
            {related.map((a) => (
              <li key={a.slug}><Link href={`/articles/${a.slug}/`}>{a.title}</Link></li>
            ))}
          </ul>
        </nav>
      )}
      {stationSlugsFor(p.slug).length > 1 && (
      <nav className="other-stations" aria-label="ほかの駅">
        <h2>ほかの駅</h2>
        <ul>
          {stations.filter((s) => s.slug !== st.slug && stationSlugsFor(p.slug).includes(s.slug)).map((s) => (
            <li key={s.slug}><Link href={`/${p.slug}/${s.slug}/`}>{s.name}<span className="num">{listingsByStation(s.slug, p.slug as PurposeSlug).length}</span></Link></li>
          ))}
        </ul>
      </nav>
      )}
    </div>
  );
}
