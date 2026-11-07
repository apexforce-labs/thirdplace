import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/SubmitForm";

export const metadata: Metadata = { title: "お問い合わせ", alternates: { canonical: "/contact/" } };

export default function Contact() {
  return (
    <div className="wrap">
      <div className="form">
        <h1>お問い合わせ</h1>
        <p style={{ color: "var(--ink-2)" }}>
          サイトへのご意見、掲載についてのご相談はこちらから。お店の情報の追加や修正は<Link href="/submit/">情報を送る</Link>のほうが早く反映できます。
        </p>
        <ContactForm />
      </div>
    </div>
  );
}
