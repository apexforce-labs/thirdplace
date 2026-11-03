import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/data/articles";

export const metadata: Metadata = { title: "読みもの", description: "作業できるカフェの選び方、駅ごとのまとめ。" };

export default function Articles() {
  return (
    <section className="wrap section">
      <div className="section-head"><h2>読みもの</h2></div>
      <div className="article-list">
        {articles.map((a) => (
          <Link key={a.slug} href={`/articles/${a.slug}/`} className="article-card">
            <h3>{a.title}</h3>
            <p>{a.lead}</p>
            <span className="meta num"><span>{a.publishedAt.replaceAll("-", ".")}</span><span>{a.readMin}分で読めます</span></span>
          </Link>
        ))}
      </div>
    </section>
  );
}
