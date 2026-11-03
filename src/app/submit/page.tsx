import type { Metadata } from "next";
import { SubmitForm } from "@/components/SubmitForm";

export const metadata: Metadata = { title: "情報を送る", description: "作業できるカフェの情報や、掲載内容の修正を送ってください。" };

export default function Submit() {
  return (
    <div className="wrap">
      <div className="form">
        <h1>情報を送る</h1>
        <p style={{ color: "var(--ink-2)" }}>知っている作業カフェや、掲載内容の間違いを教えてください。確認してから地図に反映します。</p>
        <SubmitForm />
      </div>
    </div>
  );
}
