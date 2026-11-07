"use client";

import { type FormEvent, type ReactNode, useState } from "react";
import Link from "next/link";
import { stations } from "@/data/stations";

/**
 * フォームは Netlify Forms で受け取る。
 * 静的書き出しでは Netlify がフォームを見つけられないため、同じ項目を public/__forms.html に置いている。
 * 項目を変えたら、そちらも合わせて直すこと。
 */
async function send(e: FormEvent<HTMLFormElement>) {
  const data = new FormData(e.currentTarget);
  const body = new URLSearchParams();
  data.forEach((v, k) => body.append(k, String(v)));
  const res = await fetch("/__forms.html", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  if (!res.ok) throw new Error(String(res.status));
}

function NetlifyForm({ name, done, children }: { name: string; done: ReactNode; children: ReactNode }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  if (state === "sent") return <p className="done" role="status">{done}</p>;
  return (
    <form
      name={name}
      className="form"
      style={{ padding: 0 }}
      onSubmit={async (e) => {
        e.preventDefault();
        setState("sending");
        try {
          await send(e);
          setState("sent");
        } catch {
          setState("error");
        }
      }}
    >
      <input type="hidden" name="form-name" value={name} />
      <p hidden>
        <label>この欄は空のままにしてください <input name="bot-field" /></label>
      </p>
      {children}
      {state === "error" && <p className="form-error" role="alert">送信できませんでした。時間をおいて、もう一度お試しください。</p>}
      <p className="hint">送っていただいた内容の扱いは<Link href="/privacy/">プライバシーポリシー</Link>をご覧ください。</p>
      <div><button className="btn" type="submit" disabled={state === "sending"}>{state === "sending" ? "送信中…" : "送信する"}</button></div>
    </form>
  );
}

export const SUBMIT_CHECKS = ["電源がある", "無料Wi-Fiがある", "時間制限がない", "閉店している", "営業時間が変わった"];

export function SubmitForm() {
  return (
    <NetlifyForm name="submit-spot" done="ありがとうございます。内容を確認してから反映します。">
      <label>
        お店・施設の名前
        <input name="shop" type="text" required placeholder="例：〇〇珈琲 渋谷店" />
      </label>
      <label>
        最寄り駅
        <select name="station" defaultValue="渋谷">
          {stations.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
          <option value="その他">その他</option>
        </select>
      </label>
      <fieldset>
        <legend>あてはまるもの</legend>
        {SUBMIT_CHECKS.map((t) => (
          <label key={t}><input type="checkbox" name="checks" value={t} /> {t}</label>
        ))}
      </fieldset>
      <label>
        電源のある席の場所・数
        <input name="power" type="text" placeholder="例：窓際カウンター8席すべて" />
      </label>
      <label>
        ひとこと
        <textarea name="memo" rows={4} placeholder="混む時間帯、静かさ、おすすめの席、間違いの内容など" />
        <span className="hint">他のサイトの口コミや写真の転載はご遠慮ください。ご自身で確認した情報のみ受け付けています。</span>
      </label>
      <label>
        メールアドレス（任意・返信が必要なとき）
        <input name="email" type="email" autoComplete="email" />
      </label>
    </NetlifyForm>
  );
}

export function ContactForm() {
  return (
    <NetlifyForm name="contact" done="お問い合わせを受け付けました。返信が必要な内容には、いただいたメールアドレスにお送りします。">
      <label>
        お名前（任意）
        <input name="name" type="text" autoComplete="name" />
      </label>
      <label>
        メールアドレス
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label>
        内容
        <textarea name="message" rows={6} required />
      </label>
    </NetlifyForm>
  );
}
