"use client";

import { type CSSProperties, useMemo, useState } from "react";
import Link from "next/link";
import type { PurposeSlug, Spot, Station } from "@/lib/types";
import { purposeBySlug, purposeScore, readyPurposes, relevant } from "@/lib/purposes";
import { MapView } from "./MapView";
import { SpotCard } from "./SpotCard";
import { BuddySays } from "./BuddySays";
import { suggest } from "@/lib/suggest";
import { BRAND } from "@/lib/brand";

export function StationExplorer({ station, spots, purpose }: { station: Station; spots: Spot[]; purpose: PurposeSlug }) {
  const p = purposeBySlug(purpose)!;
  const [on, setOn] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<string>("score");
  const [active, setActive] = useState<string | null>(null);

  const pick = useMemo(() => suggest(p, spots), [p, spots]);
  const base = useMemo(() => spots.filter((s) => relevant(p, s)), [spots, p]);
  const shown = useMemo(() => {
    const list = base.filter((s) => p.filters.every((f) => !on.has(f.key) || f.test(s)));
    const axis = p.axes.find((a) => a.key === sort);
    const cmp =
      sort === "walk" ? (a: Spot, b: Spot) => a.walkMin - b.walkMin
      : axis ? (a: Spot, b: Spot) => axis.score(b) - axis.score(a)
      : (a: Spot, b: Spot) => purposeScore(p, b) - purposeScore(p, a);
    return [...list].sort(cmp);
  }, [base, on, sort, p]);

  const toggle = (k: string) =>
    setOn((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k); else next.add(k);
      return next;
    });

  return (
    <div className="explorer">
      <div className="map-pane">
        <MapView center={{ lat: station.lat, lng: station.lng, label: station.name }} spots={shown} purpose={purpose} activeId={active} onSelect={setActive} />
      </div>
      <div className="list-pane">
        <nav className="purpose-tabs" aria-label="目的を切り替える">
          {readyPurposes.map((x) => (
            <Link
              key={x.slug}
              href={`/${x.slug}/${station.slug}/`}
              aria-current={x.slug === purpose ? "page" : undefined}
              style={{ "--c": x.color } as CSSProperties}
            >
              {x.name}
            </Link>
          ))}
        </nav>
        <div className="title">
          <span className="dot" style={{ background: station.lineColor }} aria-hidden />
          <h1>{station.name}駅で{p.verb}カフェ</h1>
        </div>
        <p className="blurb">{station.blurb}</p>
        {pick && (
          <div className="suggest">
            <BuddySays size={52} href={`/spot/${pick.spot.id}/`}>
              <small>AIの相棒のおすすめ</small>
              <span>
                {station.name}で{p.name}なら、まずは<b>「{pick.spot.name}」</b>。{pick.reason}
              </span>
            </BuddySays>
          </div>
        )}

        <div className="filters" role="group" aria-label="条件で絞り込む">
          {p.filters.map((f) => (
            <button
              key={f.key}
              type="button"
              id={`f-${f.key}`}
              className={`filter${f.color ? "" : " plain"}`}
              style={f.color ? ({ "--c": f.color } as CSSProperties) : undefined}
              aria-pressed={on.has(f.key)}
              onClick={() => toggle(f.key)}
            >
              <i aria-hidden />
              {f.label}
            </button>
          ))}
        </div>

        <div className="result-bar">
          <span aria-live="polite">
            <b className="num" style={{ color: "var(--ink)", fontSize: 15 }}>{shown.length}</b> 件 / 全{base.length}件
          </span>
          <label>
            <span className="visually-hidden">並び順</span>
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="score">{p.scoreName}順</option>
              {p.axes.map((a) => <option key={a.key} value={a.key}>{a.label}がよい順</option>)}
              <option value="walk">駅から近い順</option>
            </select>
          </label>
        </div>

        <div className="spot-list">
          {shown.map((s) => (
            <SpotCard key={s.id} spot={s} purpose={purpose} active={s.id === active} onHover={setActive} />
          ))}
          {shown.length === 0 && (
            <div className="empty">
              条件に合うお店がまだありません。条件を1つ外すか、<Link href="/submit/" style={{ color: "var(--pink)", fontWeight: 800 }}>知っているお店を教えてください</Link>。
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
