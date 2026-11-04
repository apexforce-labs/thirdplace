import Script from "next/script";
import type { Listing } from "@/data/listings";

/** 店の写真。自分たちで撮った写真を優先し、なければ公式Instagramの投稿を埋め込む */
export function PlacePhotos({ l }: { l: Listing }) {
  if (l.photos?.length) {
    return (
      <section className="place-photos" aria-label="お店の写真">
        <div className="photo-row">
          {l.photos.map((p) => <img key={p.src} src={p.src} alt={p.alt} loading="lazy" />)}
        </div>
        <p className="muted">写真：Third place 編集部</p>
      </section>
    );
  }
  if (l.instagram?.length) {
    return (
      <section className="place-photos" aria-label="お店の公式Instagram">
        <div className="ig-row">
          {l.instagram.map((url) => (
            <blockquote key={url} className="instagram-media" data-instgrm-permalink={url} data-instgrm-version="14">
              <a href={url} target="_blank" rel="noopener noreferrer">お店の公式Instagramで見る</a>
            </blockquote>
          ))}
        </div>
        <p className="muted">お店の公式Instagramの投稿を埋め込んで表示しています。</p>
        <Script src="https://www.instagram.com/embed.js" strategy="lazyOnload" />
      </section>
    );
  }
  return (
    <section className="place-photos empty" aria-label="お店の写真">
      <p>写真は現地調査のときに撮影して載せます。</p>
    </section>
  );
}
