import Link from "next/link";
import { Buddy, SkylineStrip } from "./Illustrations";
import { BRAND } from "@/lib/brand";

export function SiteHeader() {
  return (
    <>
      <header className="site-header">
        <div className="wrap">
          <Link href="/" className="logo" aria-label={`${BRAND.name} トップへ`}>
            <Buddy size={32} />
            <span className="wordmark">Third <em>place</em></span>
            <small>{BRAND.tagline}</small>
          </Link>
          <nav className="nav" aria-label="メイン">
            <Link href="/work/" className="hide-sm">カフェ作業</Link>
            <Link href="/dog/" className="hide-sm">犬と行く</Link>
            <Link href="/articles/" className="hide-sm">読みもの</Link>
            <Link href="/submit/" className="btn">お店を教える</Link>
          </nav>
        </div>
      </header>
      <div className="sample-band" role="note">
        <div className="wrap">
          <b>試作版</b>
          <span>スコア付きの店と地図は見本で、実在の店舗とは関係ありません。「実在のお店」欄だけが確認済みの情報です。</span>
        </div>
      </div>
    </>
  );
}

export function SiteFooter() {
  return (
    <>
    <SkylineStrip />
    <footer className="site-footer">
      <div className="wrap">
        <div className="links">
          <Link href="/about/">このサイトについて</Link>
          <Link href="/submit/">情報の追加・修正</Link>
          <Link href="/articles/">読みもの</Link>
        </div>
        <p>地図データ © OpenStreetMap contributors。人物イラスト：Open Peeps by Pablo Stanley（CC0）。店舗情報は運営による調査と利用者からの投稿をもとにしています。</p>
        <p>© 2026 {BRAND.name}</p>
      </div>
    </footer>
    </>
  );
}
