import type { CSSProperties } from "react";
import Link from "next/link";
import { stations } from "@/data/stations";
import { listings, listingById } from "@/data/listings";
import { articles } from "@/data/articles";
import { PURPOSES } from "@/lib/purposes";
import { PurposeIcon } from "@/components/Icons";
import { StationGrid } from "@/components/StationGrid";
import { CupMark } from "@/components/Illustrations";
import { HeroStage } from "@/components/HeroStage";
import { PurposeArt } from "@/components/PurposeArt";

export default function Home() {
  const pick = listingById("renoir-shibuya-miyashita-park") ?? listings[0];
  const pickStation = stations.find((s) => s.slug === pick.station)!;
  return (
    <>
      <section className="hero2">
        <div className="wrap hero2-grid">
          <div className="hero2-copy">
            <p className="hero2-eyebrow"><CupMark size={26} /> 東京の駅ごとの、作業できるカフェ案内</p>
            <h1>
              きょうは、
              <br />
              どこで<em>過ごそう</em>。
            </h1>
            <p className="hero2-lead">
              電源はある？ Wi-Fiは？ 何時まで？ 作業できるカフェを、各店の公式情報で確かめて東京の駅ごとにまとめました。犬と行けるお店も準備中です。
            </p>
            <div className="answers" role="list" aria-label="目的をえらぶ">
              {PURPOSES.map((p) => {
                const label = { work: "カフェで作業したい", dog: "犬とおでかけしたい", kids: "子どもと過ごしたい", party: "誕生会をひらきたい" }[p.slug];
                return p.ready ? (
                  <Link key={p.slug} role="listitem" href={`/${p.slug}/`} className={`answer${p.slug === "work" ? " primary" : ""}`}>
                    <PurposeIcon slug={p.slug} />
                    <span>{label}</span>
                  </Link>
                ) : (
                  <span key={p.slug} role="listitem" className="answer soon" aria-disabled="true">
                    <PurposeIcon slug={p.slug} />
                    <span>{label}</span>
                    <small>準備中</small>
                  </span>
                );
              })}
            </div>
          </div>
          <HeroStage pick={pick} station={`${pickStation.name}駅`} count={listings.length} />
        </div>
      </section>

      <section className="wrap section" id="purposes">
        <div className="section-head">
          <h2>目的からさがす</h2>
        </div>
        <div className="purposes">
          {PURPOSES.map((p) => {
            const style = { "--c": p.color, "--soft": p.soft } as CSSProperties;
            const inner = (
              <>
                {!p.ready && <span className="badge">準備中</span>}
                <PurposeArt slug={p.slug} />
                <h3>{p.name}</h3>
                <p>{p.lead}</p>
                <span className="axes-row">
                  {p.ready ? p.axes.map((a) => <span key={a.key}>{a.label}</span>) : <span>近日追加</span>}
                </span>
              </>
            );
            return p.ready ? (
              <Link key={p.slug} href={`/${p.slug}/`} className="purpose-card" style={style}>{inner}</Link>
            ) : (
              <div key={p.slug} className="purpose-card soon" style={style}>{inner}</div>
            );
          })}
        </div>
      </section>

      <section className="wrap section" id="stations">
        <div className="section-head">
          <h2>駅からさがす</h2>
          <span className="eyebrow">{stations.length}駅・{listings.length}店・数字は掲載店数</span>
        </div>
        <StationGrid />
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>読みもの</h2>
          <Link href="/articles/">すべて見る →</Link>
        </div>
        <div className="article-list">
          {articles.map((a) => (
            <Link key={a.slug} href={`/articles/${a.slug}/`} className="article-card">
              <h3>{a.title}</h3>
              <p>{a.lead}</p>
              <span className="meta"><span>{a.publishedAt.replaceAll("-", ".")}</span><span>{a.readMin}分で読めます</span></span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
