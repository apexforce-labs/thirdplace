import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { spotById, spots } from "@/data/spots";
import { stationBySlug } from "@/data/stations";
import { KIND_LABEL, WIFI_LABEL } from "@/lib/filters";
import type { CSSProperties } from "react";
import { AxisBars, PurposeScore } from "@/components/Score";
import { readyPurposes } from "@/lib/purposes";
import { MapView } from "@/components/MapView";

export const dynamicParams = false;
export function generateStaticParams() {
  return spots.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const s = spotById((await params).id);
  if (!s) return {};
  const st = stationBySlug(s.station)!;
  return {
    title: `${s.name}（${st.name}）｜作業・犬連れ情報`,
    description: `${s.name}の電源席の数、Wi-Fi、時間制限、静かさ。${st.name}駅から徒歩${s.walkMin}分。`,
    alternates: { canonical: `/spot/${s.id}/` },
  };
}

export default async function SpotPage({ params }: { params: Promise<{ id: string }> }) {
  const s = spotById((await params).id);
  if (!s) notFound();
  const st = stationBySlug(s.station)!;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: s.name,
    geo: { "@type": "GeoCoordinates", latitude: s.lat, longitude: s.lng },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "電源", value: !!s.power },
      { "@type": "LocationFeatureSpecification", name: "無料Wi-Fi", value: s.wifi === "free" },
    ],
  };

  return (
    <div className="wrap">
      {s.source !== "sample" && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <nav className="crumbs" aria-label="パンくず">
        <Link href="/">トップ</Link><span>/</span>
        <Link href={`/work/${st.slug}/`}>{st.name}駅</Link><span>/</span>
        <span>{s.name}</span>
      </nav>
      <header className="spot-head">
        <p className="eyebrow">{KIND_LABEL[s.kind]}・{st.name}駅 徒歩{s.walkMin}分</p>
        <h1>
          {s.name} {s.source === "sample" && <span className="sample-tag" style={{ fontSize: 12, verticalAlign: "middle" }}>見本</span>}
        </h1>
        <p className="sub">
          <span>営業 {s.hours}</span>
          <span>最終確認 {s.verifiedAt.replaceAll("-", ".")}</span>
        </p>
      </header>

      <div className="spot-layout">
        <div>
          <div className="spot-purposes">
            {readyPurposes.map((p) => (
              <section key={p.slug} aria-label={p.scoreName}>
                <h2 style={{ "--c": p.color } as CSSProperties}><i aria-hidden />{p.name}</h2>
                <div className="score-panel panel">
                  <PurposeScore purpose={p.slug} spot={s} size="lg" />
                  <AxisBars purpose={p.slug} spot={s} />
                </div>
              </section>
            ))}
          </div>
          <section className="detail panel" aria-label="くわしい情報">
            <dl>
              <dt>Wi-Fi</dt><dd>{WIFI_LABEL[s.wifi]}{s.wifiMbps ? `・下り${s.wifiMbps}Mbps（実測）` : ""}</dd>
              <dt>電源</dt><dd>{s.power ? `${s.power.totalSeats}席中 ${s.power.seats}席にコンセント` : "なし"}</dd>
              <dt>時間制限</dt><dd>{s.timeLimitMin ? `${s.timeLimitMin}分` : "なし"}</dd>
              <dt>静かさ</dt>
              <dd><span className="dots" aria-hidden>{[1, 2, 3, 4, 5].map((n) => <i key={n} className={n <= s.quiet ? "on" : ""} />)}</span>{s.quiet}/5</dd>
              <dt>机・椅子</dt>
              <dd><span className="dots" aria-hidden>{[1, 2, 3, 4, 5].map((n) => <i key={n} className={n <= s.comfort ? "on" : ""} />)}</span>{s.comfort}/5</dd>
              <dt>通話・Web会議</dt><dd>{s.meetingOk ? "できる" : "控えてほしいとの掲示あり"}</dd>
              <dt>犬連れ</dt><dd>{({ inside: "店内OK", terrace: "テラス席のみOK", none: "不可" })[s.dog.entry]}{s.dog.entry !== "none" && `・犬用メニュー${s.dog.menu ? "あり" : "なし"}・お水${s.dog.water ? "あり" : "なし"}`}</dd>
              <dt>駐車場</dt><dd>{s.parking.type === "own" ? `専用 ${s.parking.spaces}台` : s.parking.type === "nearby" ? "近くにコインパーキングあり" : "なし"}</dd>
              <dt>1杯の目安</dt><dd>¥{s.priceFrom}〜</dd>
            </dl>
          </section>
          <section className="note-box">
            <h2>調べた人のメモ</h2>
            <p>{s.note}</p>
          </section>
        </div>

        <aside>
          <div className="side-map panel">
            <MapView center={{ lat: st.lat, lng: st.lng, label: st.name }} spots={[s]} purpose="work" activeId={s.id} zoom={16} compact />
          </div>
          <div className="side-card panel">
            <b>情報が違っていたら</b>
            <span>電源の場所が変わった、閉店したなど、気づいたことを教えてください。確認して更新します。</span>
            <Link href="/submit/" className="btn white">修正を送る</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
