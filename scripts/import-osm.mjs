#!/usr/bin/env node
/**
 * OpenStreetMap（Overpass API）から、各駅の半径800m以内のカフェ・コワーキングを取り出し、
 * 調査候補リストとして data/osm/<駅>.json に保存する。
 *
 * OSMには電源の有無がほぼ載っていないため、ここで取れるのは「候補」まで。
 * 電源席の数などは現地調査・投稿で埋めてから src/data に取り込む。
 *
 * 使い方: npm run import:osm            （全駅）
 *        npm run import:osm -- shibuya  （1駅だけ）
 * データのライセンス: ODbL（© OpenStreetMap contributors の表記が必要）
 */
import { mkdir, writeFile } from "node:fs/promises";

const STATIONS = {
  shibuya: [35.658, 139.7016], shinjuku: [35.6896, 139.7006], ikebukuro: [35.7295, 139.7109],
  tokyo: [35.6812, 139.7671], shinagawa: [35.6285, 139.7388], ebisu: [35.6467, 139.7101],
  nakameguro: [35.644, 139.6988], kichijoji: [35.7031, 139.5798], akihabara: [35.6984, 139.7731],
  yokohama: [35.4658, 139.6223],
};
const RADIUS_M = 800;
const ENDPOINT = process.env.OVERPASS_URL ?? "https://overpass-api.de/api/interpreter";

const only = process.argv[2];
const targets = Object.entries(STATIONS).filter(([slug]) => !only || slug === only);

for (const [slug, [lat, lng]] of targets) {
  const q = `[out:json][timeout:60];
(
  nwr(around:${RADIUS_M},${lat},${lng})["amenity"="cafe"];
  nwr(around:${RADIUS_M},${lat},${lng})["office"="coworking"];
  nwr(around:${RADIUS_M},${lat},${lng})["amenity"="coworking_space"];
);
out center tags;`;
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded", "user-agent": "thirdplace-import/0.1" },
    body: "data=" + encodeURIComponent(q),
  });
  if (!res.ok) throw new Error(`${slug}: Overpass ${res.status}`);
  const json = await res.json();
  const items = json.elements
    .map((e) => {
      const t = e.tags ?? {};
      const p = e.center ?? { lat: e.lat, lon: e.lon };
      if (!t.name) return null;
      return {
        osm: `${e.type}/${e.id}`,
        name: t["name:ja"] ?? t.name,
        brand: t.brand ?? null,
        kind: t.amenity === "cafe" ? "cafe" : "coworking",
        lat: +p.lat.toFixed(6),
        lng: +p.lon.toFixed(6),
        wifiHint: t.internet_access ?? null, // wlan / yes / no
        wifiFee: t["internet_access:fee"] ?? null,
        powerHint: t["socket"] ?? t["power_supply"] ?? null, // ほとんど空
        openingHours: t.opening_hours ?? null,
        dogHint: t.dog ?? null,
      };
    })
    .filter(Boolean);
  await mkdir("data/osm", { recursive: true });
  await writeFile(`data/osm/${slug}.json`, JSON.stringify({ station: slug, fetchedAt: new Date().toISOString(), items }, null, 2));
  console.log(`${slug}: ${items.length}件`);
  await new Promise((r) => setTimeout(r, 5000)); // Overpassの負荷に配慮して間隔をあける
}
