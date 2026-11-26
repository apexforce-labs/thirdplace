import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { purposeBySlug, readyPurposes } from "@/lib/purposes";
import { StationGrid } from "@/components/StationGrid";
import { PurposeIcon } from "@/components/Icons";

type Params = Promise<{ purpose: string }>;
export const dynamicParams = false;
export function generateStaticParams() {
  return readyPurposes.map((p) => ({ purpose: p.slug }));
}
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const p = purposeBySlug((await params).purpose);
  if (!p) return {};
  const description = p.slug === "dog"
    ? "犬と入れるカフェ・ランチを、店内OKかテラスのみか、犬用メニューの有無まで公式サイトで確かめて東京の駅ごとにまとめています。"
    : `${p.lead}電源やWi-Fiを公式情報で確かめたお店を、東京の駅ごとにまとめています。`;
  return { title: p.slug === "dog" ? "東京で犬と入れるカフェ・ランチ｜公式サイトで確認" : `東京で${p.name}ならここ`, description, alternates: { canonical: `/${p.slug}/` } };
}

export default async function PurposePage({ params }: { params: Params }) {
  const p = purposeBySlug((await params).purpose);
  if (!p?.ready) notFound();
  return (
    <section className="wrap section">
      <div className="purpose-hero" style={{ "--c": p.color, "--soft": p.soft } as CSSProperties}>
        <span className="ic"><PurposeIcon slug={p.slug} /></span>
        <div>
          <h1>{p.name}</h1>
          <p>
            {p.slug === "dog"
              ? "店内に入れるか、テラス席だけか、犬用メニューがあるか。お店の公式サイトに書かれている犬連れのルールだけを載せています。"
              : `${p.lead}まずは電源・Wi-Fi・席数・営業時間を公式情報で確かめたお店を載せています。`}
          </p>
        </div>
      </div>
      <div className="section-head" style={{ marginTop: 32 }}><h2>駅をえらぶ</h2></div>
      <StationGrid only={p} />
    </section>
  );
}
