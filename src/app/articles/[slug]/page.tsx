import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articleBySlug, articles } from "@/data/articles";
import { listingById } from "@/data/listings";
import { ListingList } from "@/components/ListingList";
import { ArticleBox, ArticleCompare, ArticleSummary } from "@/components/ArticleParts";
import { PurposeArt } from "@/components/PurposeArt";
import { stationBySlug } from "@/data/stations";

export const dynamicParams = false;
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = articleBySlug((await params).slug);
  return a ? { title: a.title, description: a.lead, alternates: { canonical: `/articles/${a.slug}/` } } : {};
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const a = articleBySlug((await params).slug);
  if (!a) notFound();
  const station = a.station ? stationBySlug(a.station) : undefined;
  const shopIds = [...new Set(a.body.flatMap((b) => b.listings ?? []))];
  const shops = shopIds.map((id) => listingById(id)).filter((l) => l !== undefined);
  return (
    <div className="wrap">
      <article className="article">
        <nav className="crumbs" aria-label="パンくず">
          <Link href="/">トップ</Link><span>/</span><Link href="/articles/">読みもの</Link>
        </nav>
        <h1>{a.title}</h1>
        {station && (
          <div className="art-hero">
            <PurposeArt slug="work" />
            <span className="art-hero-chip">{station.name}駅</span>
          </div>
        )}
        <p className="lead">{a.lead}</p>
        <p className="meta num"><span>{a.publishedAt.replaceAll("-", ".")}</span><span>{a.readMin}分で読めます</span></p>
        {shops.length > 0 && (
          <>
            <ArticleSummary items={shops} />
            <ArticleCompare items={shops} />
          </>
        )}
        {a.body.map((b, i) => {
          if (b.listings) {
            return (
              <div key={i}>
                {b.h && <h2>{b.h}</h2>}
                <ListingList items={b.listings.map((id) => listingById(id)).filter((l) => l !== undefined)} />
              </div>
            );
          }
          if (!b.h) return <p key={i} className="art-foot">{b.p}</p>;
          return <ArticleBox key={i} h={b.h} icon={b.icon} points={b.points} p={b.p} />;
        })}
        {a.station && (
          <p style={{ marginTop: 36 }}>
            <Link href={`/work/${a.station}/`} className="btn">地図で探す</Link>
          </p>
        )}
      </article>
    </div>
  );
}
