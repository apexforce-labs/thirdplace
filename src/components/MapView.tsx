"use client";

import { useEffect, useRef, useState } from "react";
import type { Spot } from "@/lib/types";
import type { PurposeSlug } from "@/lib/types";
import { purposeBySlug, purposeScore } from "@/lib/purposes";
import { tier } from "./Score";

type Props = {
  center: { lat: number; lng: number; label: string };
  spots: Spot[];
  purpose: PurposeSlug;
  activeId?: string | null;
  onSelect?: (id: string | null) => void;
  zoom?: number;
  compact?: boolean;
};

// 無料・APIキー不要のOpenStreetMapベクタータイル
const STYLE_URL = "https://tiles.openfreemap.org/styles/positron";

export function MapView(props: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) return <RingMap {...props} />;
  return <LiveMap {...props} onFail={() => setFailed(true)} />;
}

/* ---------- 実地図（MapLibre） ---------- */
function LiveMap({ center, spots, purpose, activeId, onSelect, zoom = 15, onFail }: Props & { onFail: () => void }) {
  const box = useRef<HTMLDivElement>(null);
  const markers = useRef(new Map<string, HTMLElement>());

  useEffect(() => {
    let map: import("maplibre-gl").Map | undefined;
    let cancelled = false;
    let loaded = false;
    const timer = window.setTimeout(() => { if (!loaded) onFail(); }, 7000);

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
          cooperativeGestures: false,
        });
        map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-right");
        map.on("error", () => { if (!loaded) onFail(); });
        map.on("load", () => { loaded = true; });

        const st = document.createElement("div");
        st.className = "pin station";
        st.textContent = `${center.label}駅`;
        new maplibregl.Marker({ element: st }).setLngLat([center.lng, center.lat]).addTo(map);

        spots.forEach((s) => {
          const el = document.createElement("button");
          el.type = "button";
          const p = purposeBySlug(purpose)!;
          const n = purposeScore(p, s);
          el.className = `pin ${tier(n)}`;
          el.style.setProperty("--c", p.color);
          el.setAttribute("aria-label", `${s.name} ${p.scoreName}${n}`);
          el.textContent = String(n);
          el.addEventListener("mouseenter", () => onSelect?.(s.id));
          el.addEventListener("click", () => {
            onSelect?.(s.id);
            document.getElementById(`spot-${s.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
          });
          markers.current.set(s.id, el);
          new maplibregl.Marker({ element: el }).setLngLat([s.lng, s.lat]).addTo(map!);
        });
      } catch {
        onFail();
      }
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      markers.current.clear();
      map?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center.lat, center.lng, spots, purpose]);

  useEffect(() => {
    markers.current.forEach((el, id) => el.classList.toggle("active", id === activeId));
  }, [activeId]);

  return <div ref={box} className="map" />;
}

/* ---------- 予備の地図：駅を中心に徒歩圏の同心円を描く ---------- */
function RingMap({ center, spots, purpose, activeId, onSelect, compact }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 600, h: 500 });

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
  const maxM = Math.max(400, ...spots.map((s) => { const p = toM(s.lat, s.lng); return Math.hypot(p.x, p.y); })) * 1.12;
  const scale = (Math.min(size.w, size.h) / 2 - 24) / maxM;
  const cx = size.w / 2, cy = size.h / 2;
  const pp = purposeBySlug(purpose)!;
  const rings = [240, 480, 720].filter((m) => m <= maxM * 1.05); // 徒歩3・6・9分（80m/分）

  return (
    <div ref={box} className="map fallback-map">
      <svg className="ground" viewBox={`0 0 ${size.w} ${size.h}`} aria-hidden>
        <defs>
          <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.2" fill="var(--hair)" />
          </pattern>
        </defs>
        <rect width={size.w} height={size.h} fill="var(--map-block)" />
        <rect width={size.w} height={size.h} fill="url(#dots)" />
        {rings.map((m) => (
          <g key={m}>
            <circle cx={cx} cy={cy} r={m * scale} fill="none" stroke="var(--ink-3)" strokeOpacity=".55" strokeWidth="1.5" strokeDasharray="2 6" strokeLinecap="round" />
            <text x={cx + m * scale * 0.707 + 4} y={cy - m * scale * 0.707 - 4} fontSize="11" fill="var(--ink-3)" fontWeight="700">
              徒歩{m / 80}分
            </text>
          </g>
        ))}
      </svg>
      <div className="pin-wrap" style={{ left: cx, top: cy }}>
        <div className="pin station">{center.label}駅</div>
      </div>
      {spots.map((s) => {
        const p = toM(s.lat, s.lng);
        return (
          <div className="pin-wrap" key={s.id} style={{ left: cx + p.x * scale, top: cy + p.y * scale, zIndex: s.id === activeId ? 3 : 1 }}>
            <button
              type="button"
              className={`pin ${tier(purposeScore(pp, s))}${s.id === activeId ? " active" : ""}`}
              style={{ "--c": pp.color } as React.CSSProperties}
              aria-label={`${s.name} ${pp.scoreName}${purposeScore(pp, s)}`}
              onMouseEnter={() => onSelect?.(s.id)}
              onClick={() => {
                onSelect?.(s.id);
                document.getElementById(`spot-${s.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
            >
              {purposeScore(pp, s)}
            </button>
          </div>
        );
      })}
      {!compact && (
        <div className="map-legend panel" aria-hidden>
          <span>数字は{pp.scoreName}</span>
          <span><i style={{ background: pp.color }} />80点以上</span>
          <span><i style={{ background: pp.soft }} />60点以上</span>
        </div>
      )}
      {!compact && <span className="map-note">簡易表示（地図を読み込めないとき）</span>}
    </div>
  );
}
