import type { ArticleIcon } from "@/lib/types";
import type { Listing } from "@/data/listings";

const fact = (l: Listing, label: string) => l.facts.find((f) => f.label === label)?.value;
/** 公式に「ある」と書かれているか（記載なし・紹介記事だけの情報は数えない） */
const officialYes = (v?: string) => !!v && !/記載なし|紹介記事/.test(v);
/** 席数。「全N席」があればそれ、なければ「禁煙64席・加熱式たばこ専用30席」のような内訳を合計する */
const seatsOf = (l: Listing) => {
  const v = fact(l, "席数");
  if (!v) return undefined;
  const all = v.match(/全\s*(\d+)\s*席/);
  if (all) return Number(all[1]);
  const parts = [...v.matchAll(/(\d+)\s*席/g)].map((m) => Number(m[1]));
  return parts.length ? parts.reduce((a, b) => a + b, 0) : undefined;
};

const ic = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
export function ArtIcon({ name }: { name: ArticleIcon | "store" }) {
  switch (name) {
    case "power":
      return <svg {...ic}><path d="M9 3v5M15 3v5" /><path d="M6 8h12v3a6 6 0 0 1-12 0z" /><path d="M12 17v4" /></svg>;
    case "wifi":
      return <svg {...ic}><path d="M2.5 9a14 14 0 0 1 19 0" /><path d="M5.5 12.5a9.5 9.5 0 0 1 13 0" /><path d="M8.7 16a5 5 0 0 1 6.6 0" /><circle cx="12" cy="19.3" r="1.2" fill="currentColor" /></svg>;
    case "clock":
      return <svg {...ic}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>;
    case "seat":
      return <svg {...ic}><path d="M7 4v8h10" /><path d="M5 12h14" /><path d="M7 12v8M17 12v8" /></svg>;
    case "smoke":
      return <svg {...ic}><rect x="2.5" y="13" width="15" height="4" rx="1" /><path d="M20 13v4M21.5 9c0-2-1.5-2.5-1.5-4" /></svg>;
    case "store":
      return <svg {...ic}><path d="M4 9.5 5.5 4h13L20 9.5" /><path d="M4 9.5a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0" /><path d="M5.5 11.5V20h13v-8.5" /><path d="M10 20v-4.5h4V20" /></svg>;
    default:
      return <svg {...ic}><circle cx="12" cy="12" r="9" /><path d="M12 11v6" /><circle cx="12" cy="7.5" r="1.1" fill="currentColor" /></svg>;
  }
}

/** 記事冒頭の「ひと目でわかる」ボックス。数字は掲載店の公式情報から自動で数える */
export function ArticleSummary({ items }: { items: Listing[] }) {
  if (items.length === 0) return null;
  const power = items.filter((l) => officialYes(fact(l, "電源"))).length;
  const wifi = items.filter((l) => officialYes(fact(l, "Wi-Fi"))).length;
  const withSeats = items.filter((l) => seatsOf(l) !== undefined);
  const biggest = withSeats.sort((a, b) => (seatsOf(b) ?? 0) - (seatsOf(a) ?? 0))[0];
  const tiles = [
    { icon: "store" as const, tone: "lav", label: "掲載店", value: `${items.length}`, unit: "店" },
    { icon: "power" as const, tone: "sand", label: "電源が公式に記載", value: `${power}`, unit: "店" },
    { icon: "wifi" as const, tone: "mint", label: "Wi-Fiあり", value: `${wifi}`, unit: "店" },
    ...(biggest ? [{ icon: "seat" as const, tone: "rose", label: "いちばん席が多い", value: `${seatsOf(biggest)}`, unit: "席", sub: biggest.name }] : []),
  ];
  return (
    <section className="art-summary" aria-label="ひと目でわかるまとめ">
      <p className="art-summary-title">ひと目でわかる</p>
      <ul>
        {tiles.map((t) => (
          <li key={t.label} className={`tone-${t.tone}`}>
            <span className="art-ic"><ArtIcon name={t.icon} /></span>
            <span className="art-tile-label">{t.label}</span>
            <span className="art-tile-value num">{t.value}<small>{t.unit}</small></span>
            {"sub" in t && t.sub && <span className="art-tile-sub">{t.sub}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}

const Mark = ({ ok, unknown }: { ok: boolean; unknown?: string }) =>
  ok ? <span className="mk mk-yes" role="img" aria-label="あり"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></span> : <span className="mk mk-no" aria-label={unknown ?? "記載なし"}>—</span>;

/** 掲載店の比較表（電源・Wi-Fi・席数） */
export function ArticleCompare({ items }: { items: Listing[] }) {
  if (items.length === 0) return null;
  return (
    <section className="art-compare" aria-label="お店の比較">
      <p className="art-summary-title">お店をくらべる</p>
      <div className="art-table-wrap">
        <table>
          <thead>
            <tr><th scope="col">お店</th><th scope="col">電源</th><th scope="col">Wi-Fi</th><th scope="col">席数</th></tr>
          </thead>
          <tbody>
            {items.map((l, i) => (
              <tr key={l.id}>
                <th scope="row"><a href={`#listing-${l.id}`}><span className="art-no num">{i + 1}</span>{l.name}</a></th>
                <td><Mark ok={officialYes(fact(l, "電源"))} /></td>
                <td><Mark ok={officialYes(fact(l, "Wi-Fi"))} /></td>
                <td className="num">{seatsOf(l) ?? <span className="mk mk-no" aria-label="記載なし">—</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="art-note">✓＝公式ページに記載あり　—＝公式ページに記載なし（店舗で確認）</p>
    </section>
  );
}

/** 見出し＋箇条書きを四角の枠で */
export function ArticleBox({ h, icon = "info", points, p }: { h?: string; icon?: ArticleIcon; points?: string[]; p?: string }) {
  return (
    <section className={`art-box ic-${icon}`}>
      {h && (
        <h2>
          <span className="art-ic"><ArtIcon name={icon} /></span>
          {h}
        </h2>
      )}
      {points && points.length > 0 && (
        <ul>{points.map((t, i) => <li key={i}>{t}</li>)}</ul>
      )}
      {p && <p>{p}</p>}
    </section>
  );
}
