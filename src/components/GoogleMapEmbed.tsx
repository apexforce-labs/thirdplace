/**
 * Googleマップ。Maps Embed API（無料・回数無制限）で表示する。
 * APIキーは NEXT_PUBLIC_GMAPS_EMBED_KEY（Google Cloudで「Maps Embed API」だけに制限したキー）。
 * キーが未設定のときは「Googleマップで開く」リンクだけ出す。
 */
// 制限つきの公開キー（Maps Embed API のみ、thirdplace-tokyo.netlify.app からのみ有効）
const KEY = process.env.NEXT_PUBLIC_GMAPS_EMBED_KEY ?? "AIzaSyAQMoGo__sg6OGDWkXKGcSIrNqMgrgpNsQ";

export function GoogleMapEmbed({ name, address }: { name: string; address: string }) {
  const q = `${name} ${address}`;
  const open = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  return (
    <div className="gmap panel">
      {KEY && (
        <iframe
          title={`${name}の地図`}
          src={`https://www.google.com/maps/embed/v1/place?key=${KEY}&q=${encodeURIComponent(q)}&language=ja&region=JP`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      )}
      <a className="btn white" href={open} target="_blank" rel="noopener noreferrer">Googleマップで開く</a>
    </div>
  );
}
