import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = { title: "プライバシーポリシー", alternates: { canonical: "/privacy/" } };

export default function Privacy() {
  return (
    <div className="wrap">
      <article className="article">
        <h1>プライバシーポリシー</h1>
        <p className="lead">{BRAND.name}（以下「当サイト」）は、apexforce（以下「運営者」）が運営しています。当サイトで扱う情報と、その使い方を説明します。</p>

        <h2>1. アクセス解析（Googleアナリティクス）</h2>
        <p>当サイトは、利用状況を知ってサイトを良くするために、Google LLCのアクセス解析ツール「Googleアナリティクス（GA4）」を使っています。Googleアナリティクスは、Cookie などを使って、見たページ、滞在時間、おおよその地域、使っている端末やブラウザなどの情報を集めます。この情報で個人を特定することはありません。</p>
        <p>集めた情報は Google のプライバシーポリシーにもとづいて管理されます。詳しくは「<a href="https://policies.google.com/technologies/partner-sites?hl=ja" target="_blank" rel="noopener noreferrer">Google のサービスを使用するサイトやアプリから収集した情報の Google による使用</a>」をご覧ください。ブラウザの設定で Cookie を無効にするか、「<a href="https://tools.google.com/dlpage/gaoptout?hl=ja" target="_blank" rel="noopener noreferrer">Google アナリティクス オプトアウト アドオン</a>」を使うと、収集を止められます。</p>

        <h2>2. 情報の投稿・お問い合わせで受け取る情報</h2>
        <p><Link href="/submit/">情報を送る</Link>・<Link href="/contact/">お問い合わせ</Link>のフォームでは、入力していただいた内容（お店の名前、最寄り駅、設備の情報、ひとこと、お名前、メールアドレスなど）を受け取ります。お名前とメールアドレスは任意です。</p>
        <p>受け取った情報は、掲載内容の確認・修正、お問い合わせへの返信のためだけに使います。投稿されたお店の情報は、運営者が確認したうえで、事実の部分をサイトに反映することがあります。お名前やメールアドレスを公開することはありません。</p>
        <p>フォームの内容は、当サイトを配信している Netlify, Inc. のフォーム機能を通じて運営者に届きます。</p>

        <h2>3. 第三者への提供</h2>
        <p>法令にもとづく場合を除き、本人の同意なく個人情報を第三者に渡すことはありません。</p>

        <h2>4. 外部サービスの埋め込み</h2>
        <p>お店のページでは、Googleマップや、お店の公式Instagramの投稿を埋め込んで表示することがあります。これらを表示したとき、各サービスがその提供元のポリシーにもとづいて情報を集めることがあります。</p>

        <h2>5. 掲載情報について</h2>
        <p>掲載しているお店の情報は、確認した時点の公式情報をもとにしています。正確さには気をつけていますが、内容を保証するものではありません。お出かけ前に各店の公式情報をご確認ください。</p>

        <h2>6. お問い合わせ先・改定</h2>
        <p>このポリシーについてのお問い合わせは、<Link href="/contact/">お問い合わせ</Link>からお送りください。内容は必要に応じて改定し、このページでお知らせします。</p>
        <p className="muted">制定日：2026年11月5日</p>
      </article>
    </div>
  );
}
