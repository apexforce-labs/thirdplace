import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { listingById, listings } from "@/data/listings";
import { stationBySlug } from "@/data/stations";
import { PlacePhotos } from "@/components/PlacePhotos";
import { GoogleMapEmbed } from "@/components/GoogleMapEmbed";
import { ScoreRadar } from "@/components/ScoreRadar";

export const dynamicParams = false;
export function generateStaticParams() {
  return listings.map((l) => ({ id: l.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const l = listingById((await params).id);
  if (!l) return {};
  const st = stationBySlug(l.station)!;
  return {
    title: `${l.name}（${st.name}）｜電源・Wi-Fi・営業時間`,
    description: `${l.name}の電源・Wi-Fi・営業時間・アクセス。${l.access}。`,
    alternates: { canonical: `/place/${l.id}/` },
  };
}

export default async function PlacePage({ params }: { params: Promise<{ id: string }> }) {
  const l = listingById((await params).id);
  if (!l) notFound();
  const st = stationBySlug(l.station)!;
  return (
    <div className="wrap place">
      <nav className="crumbs" aria-label="パンくず">
        <Link href="/">トップ</Link><span>/</span>
        <Link href={`/work/${st.slug}/`}>{st.name}駅</Link><span>/</span>
        <span>{l.name}</span>
      </nav>
      <header className="spot-head">
        <p className="eyebrow">{st.name}駅・{l.access}</p>
        <h1>{l.name}</h1>
        <p className="sub">
          <span>営業 {l.hours}</span>
          <span>公開情報の確認 {l.checkedAt.replaceAll("-", ".")}</span>
        </p>
      </header>

      <div className="spot-layout">
        <div>
          <PlacePhotos l={l} />
          <ScoreRadar scores={l.scores} />
          <section className="detail panel" aria-label="確認できた情報">
            <dl>
              <dt>住所</dt><dd>{l.address}</dd>
              <dt>アクセス</dt><dd>{l.access}</dd>
              <dt>営業時間</dt><dd>{l.hours}</dd>
              {l.facts.map((f) => (
                <FactRow key={f.label} label={f.label} value={f.value} n={f.src + 1} />
              ))}
            </dl>
          </section>
          <section className="note-box">
            <h2>編集部メモ</h2>
            <p>{l.note}</p>
          </section>
          <section className="sources" aria-labelledby="src-h">
            <h2 id="src-h">出典</h2>
            <ol>
              {l.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
                  {s.official && <span className="official">公式</span>}
                </li>
              ))}
            </ol>
            <p className="muted">営業時間や料金は変わることがあります。お出かけ前に公式情報を確認してください。</p>
          </section>
        </div>
        <aside>
          <GoogleMapEmbed name={l.name} address={l.address} />
          <div className="side-card panel">
            <b>行ってみた方へ</b>
            <span>電源の場所やWi-Fiの速さ、混み具合を教えてください。確認してスコアに反映します。</span>
            <Link href="/submit/" className="btn white">情報を送る</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

function FactRow({ label, value, n }: { label: string; value: string; n: number }) {
  return (
    <>
      <dt>{label}</dt>
      <dd>{value}<sup className="ref">[{n}]</sup></dd>
    </>
  );
}
