import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articleBySlug, articles } from "@/data/articles";
import { listingById } from "@/data/listings";
import { ListingList } from "@/components/ListingList";

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
  return (
    <div className="wrap">
      <article className="article">
        <nav className="crumbs" aria-label="パンくず">
          <Link href="/">トップ</Link><span>/</span><Link href="/articles/">読みもの</Link>
        </nav>
        <h1>{a.title}</h1>
        <p className="lead">{a.lead}</p>
        <p className="meta num"><span>{a.publishedAt.replaceAll("-", ".")}</span><span>{a.readMin}分で読めます</span></p>
        {a.body.map((b, i) => (
          <div key={i}>
            {b.h && <h2>{b.h}</h2>}
            {b.p && <p>{b.p}</p>}
            {b.listings && <ListingList items={b.listings.map((id) => listingById(id)).filter((l) => l !== undefined)} />}
          </div>
        ))}
        {a.station && (
          <p style={{ marginTop: 36 }}>
            <Link href={`/work/${a.station}/`} className="btn">地図で探す</Link>
          </p>
        )}
      </article>
    </div>
  );
}
