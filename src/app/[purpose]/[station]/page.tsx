import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { stationBySlug, stations } from "@/data/stations";
import { spotsByStation } from "@/data/spots";
import { purposeBySlug, readyPurposes, relevant } from "@/lib/purposes";
import type { PurposeSlug } from "@/lib/types";
import { StationExplorer } from "@/components/StationExplorer";

type Params = Promise<{ purpose: string; station: string }>;

export const dynamicParams = false;
export function generateStaticParams() {
  return readyPurposes.flatMap((p) => stations.map((s) => ({ purpose: p.slug, station: s.slug })));
}

const SEO: Record<string, (st: string, n: number) => { title: string; description: string }> = {
  work: (st, n) => ({ title: `${st}駅の電源・Wi-Fiカフェ ${n}選｜作業しやすさで比較`, description: `${st}駅周辺で作業できるカフェを、Wi-Fiの速さ・電源の数・作業のしやすさのスコアで比較。` }),
  dog: (st, n) => ({ title: `${st}駅の犬連れOKカフェ ${n}選｜店内OK・犬ごはん・駐車場`, description: `${st}駅周辺で犬と入れるカフェ。店内OKかテラスのみか、犬用メニュー、駐車場の有無で探せます。` }),
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { purpose, station } = await params;
  const p = purposeBySlug(purpose); const st = stationBySlug(station);
  if (!p || !st) return {};
  const n = spotsByStation(st.slug).filter((s) => relevant(p, s)).length;
  return { ...SEO[p.slug](st.name, n), alternates: { canonical: `/${p.slug}/${st.slug}/` } };
}

export default async function Page({ params }: { params: Params }) {
  const { purpose, station } = await params;
  const p = purposeBySlug(purpose); const st = stationBySlug(station);
  if (!p?.ready || !st) notFound();
  return <StationExplorer station={st} spots={spotsByStation(st.slug)} purpose={p.slug as PurposeSlug} />;
}
