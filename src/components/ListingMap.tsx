"use client";

import { useEffect, useRef, useState } from "react";

type Point = { id: string; name: string; lat: number; lng: number; n: number };
type Props = { center: { lat: number; lng: number; label: string }; points: Point[]; zoom?: number };

// 無料・APIキー不要のOpenStreetMapベクタータイル
const STYLE_URL = "https://tiles.openfreemap.org/styles/positron";

/** 駅のまわりの掲載店を番号つきのピンで表示する。ピンを押すと一覧のカードへ移動 */
export function ListingMap({ center, points, zoom = 15 }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let map: import("maplibre-gl").Map | undefined;
    let cancelled = false;
    let loaded = false;
    const timer = window.setTimeout(() => { if (!loaded) setFailed(true); }, 7000);
    (async () => {
      try {
        const maplibregl = (await import("maplibre-gl")).default;
        if (cancelled || !box.current) return;
        map = new maplibregl.Map({
          container: box.current,
          style: STYLE_URL,
          center: [center.lng, center.lat],
          zoom,
          attributionControl: { compact: true },
        });
        map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-right");
        map.on("error", () => { if (!loaded) setFailed(true); });
        map.on("load", () => { loaded = true; });

        const st = document.createElement("div");
        st.className = "pin station";
        st.textContent = `${center.label}駅`;
        new maplibregl.Marker({ element: st }).setLngLat([center.lng, center.lat]).addTo(map);

        const bounds = new maplibregl.LngLatBounds([center.lng, center.lat], [center.lng, center.lat]);
        points.forEach((p) => {
          const el = document.createElement("button");
          el.type = "button";
          el.className = "pin listing-pin";
          el.textContent = String(p.n);
          el.setAttribute("aria-label", `${p.n}. ${p.name}`);
          el.addEventListener("click", () => {
            const card = document.getElementById(`listing-${p.id}`);
            card?.scrollIntoView({ behavior: "smooth", block: "center" });
            card?.focus({ preventScroll: true });
          });
          new maplibregl.Marker({ element: el }).setLngLat([p.lng, p.lat]).addTo(map!);
          bounds.extend([p.lng, p.lat]);
        });
        if (points.length > 0) map.fitBounds(bounds, { padding: 48, maxZoom: 16, duration: 0 });
      } catch {
        setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      map?.remove();
    };
  }, [center.lat, center.lng, center.label, points, zoom]);

  if (failed) return <RingMap center={center} points={points} />;
  return <div ref={box} className="map listing-map" aria-label={`${center.label}駅周辺の地図`} />;
}

/* ---------- 予備の地図：駅を中心に徒歩圏の同心円を描く（地図タイルを読み込めないとき） ---------- */
function RingMap({ center, points }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 600, h: 400 });
  useEffect(() => {
    if (!box.current) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(box.current);
    return () => ro.disconnect();
  }, []);
  const toM = (lat: number, lng: number) => ({
    x: (lng - center.lng) * Math.cos((center.lat * Math.PI) / 180) * 111320,
    y: -(lat - center.lat) * 110540,
  });
  const maxM = Math.max(400, ...points.map((p) => { const m = toM(p.lat, p.lng); return Math.hypot(m.x, m.y); })) * 1.12;
  const scale = (Math.min(size.w, size.h) / 2 - 24) / maxM;
  const cx = size.w / 2, cy = size.h / 2;
  const rings = [240, 480, 720, 960].filter((m) => m <= maxM * 1.05); // 徒歩3・6・9・12分（80m/分）
  return (
    <div ref={box} className="map listing-map fallback-map">
      <svg className="ground" viewBox={`0 0 ${size.w} ${size.h}`} aria-hidden>
        <rect width={size.w} height={size.h} fill="var(--map-block)" />
        {rings.map((m) => (
          <g key={m}>
            <circle cx={cx} cy={cy} r={m * scale} fill="none" stroke="var(--ink-3)" strokeOpacity=".55" strokeWidth="1.5" strokeDasharray="2 6" strokeLinecap="round" />
            <text x={cx + m * scale * 0.707 + 4} y={cy - m * scale * 0.707 - 4} fontSize="11" fill="var(--ink-3)" fontWeight="700">徒歩{m / 80}分</text>
          </g>
        ))}
      </svg>
      <div className="pin-wrap" style={{ left: cx, top: cy }}><div className="pin station">{center.label}駅</div></div>
      {points.map((p) => {
        const m = toM(p.lat, p.lng);
        return (
          <div className="pin-wrap" key={p.id} style={{ left: cx + m.x * scale, top: cy + m.y * scale }}>
            <button
              type="button"
              className="pin listing-pin"
              aria-label={`${p.n}. ${p.name}`}
              onClick={() => document.getElementById(`listing-${p.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" })}
            >
              {p.n}
            </button>
          </div>
        );
      })}
      <span className="map-note">簡易表示（位置はおおよそ）</span>
    </div>
  );
}
