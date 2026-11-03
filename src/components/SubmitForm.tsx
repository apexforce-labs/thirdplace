"use client";

import { useState } from "react";
import { stations } from "@/data/stations";

export function SubmitForm() {
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <p className="done" role="status">
        ありがとうございます。内容を確認してから地図に反映します（試作版のため、まだ送信はされていません）。
      </p>
    );
  }
  return (
    <form
      className="form"
      style={{ padding: 0 }}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <label>
        お店・施設の名前
        <input id="name" type="text" required placeholder="例：〇〇珈琲 渋谷店" />
      </label>
      <label>
        最寄り駅
        <select id="station" defaultValue="shibuya">
          {stations.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
        </select>
      </label>
      <fieldset>
        <legend>あてはまるもの</legend>
        {["電源がある", "無料Wi-Fiがある", "時間制限がない", "犬は店内OK", "犬はテラスのみOK", "犬用メニューがある", "駐車場がある"].map((t, i) => (
          <label key={t}><input id={`c-${i}`} type="checkbox" /> {t}</label>
        ))}
      </fieldset>
      <label>
        電源のある席の場所・数
        <input id="power" type="text" placeholder="例：窓際カウンター8席すべて" />
      </label>
      <label>
        ひとこと
        <textarea id="memo" rows={4} placeholder="混む時間帯、静かさ、おすすめの席など" />
        <span className="hint">他のサイトの口コミや写真の転載はご遠慮ください。ご自身で確認した情報のみ受け付けています。</span>
      </label>
      <div><button className="btn" type="submit">送信する</button></div>
    </form>
  );
}
