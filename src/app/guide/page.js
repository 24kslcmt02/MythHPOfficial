import Link from "next/link";
import PageShell from "@/components/common/PageShell";
import Notice from "@/components/common/Notice";
import Pending from "@/components/common/Pending";
import styles from "@/components/common/page.module.css";

export const metadata = {
  title: "使い方ガイド | My-th（マイス）",
  description:
    "My-thアプリの使い方をご案内します。チケット・チェキ券の購入から当日の入場、QRコードの表示、入場特典の受け取りまでの流れを解説します。",
  alternates: { canonical: "/guide" },
};

const STEPS = [
  {
    title: "アプリをダウンロード",
    body: "App Store または Google Play から My-th をインストールします。iOS・Android のどちらにも対応しています。",
  },
  {
    title: "会員登録",
    body: "メールアドレスで会員登録を行います。登録後すぐにチケット・チェキ券をご購入いただけます。",
  },
  {
    title: "チケット・チェキ券を購入",
    body: "参加したいイベントを開き、必要な券種と枚数を選んで購入します。事前にお支払いを済ませておくと、当日の受付がスムーズです。",
  },
  {
    title: "会場で使う",
    body: "受付でアプリのQRコードを提示します。読み取りが完了すれば入場でき、入場特典もその場で受け取れます。",
  },
];

export default function GuidePage() {
  return (
    <PageShell
      eyebrow="Guide"
      title="使い方ガイド"
      lead="はじめてMy-thをご利用いただく方に向けて、購入から当日のご利用までの流れをご案内します。"
      breadcrumbs={[{ label: "使い方ガイド" }]}
    >
      <div className={styles.prose}>
        <section className={styles.block} id="flow">
          <h2>ご利用の流れ</h2>
          <ol className={styles.steps}>
            {STEPS.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.block} id="entry">
          <h2>当日の入場方法</h2>
          <p>
            受付でアプリのQRコードを提示してください。スタッフが読み取ることで入場が完了します。
            紙のチケットを印刷したり、持参したりする必要はありません。
          </p>
          <Notice>
            <p>
              会場によっては電波が届きにくいことがあります。
              受付にお並びいただく前にアプリを起動し、チケットを表示しておくとスムーズです。
            </p>
          </Notice>
        </section>

        <section className={styles.block} id="cheki">
          <h2>チェキ券・入場特典の使い方</h2>
          <h3>チェキ券</h3>
          <p>
            撮影の受付でアプリのチェキ券のQRコードを提示してください。
            スタッフが読み取ることで1枚分が使用済みになります。
            紙の券のようになくしたり、忘れたりする心配がありません。
          </p>
          <h3>入場特典</h3>
          <p>
            会場の受付でQR認証を行うと、その場でデジタル入場特典が付与されます。
            受け取った特典はアプリ内でいつでもご確認いただけます。
          </p>
          <h3>デジタルアルバム</h3>
          <p>
            使用したチェキや受け取った入場特典は、アプリ内のデジタルアルバムに保存されます。
            イベントごとに振り返ることができます。
          </p>
        </section>

        <section className={styles.block} id="trouble">
          <h2>QRコードが表示されない・読み取れないとき</h2>
          <ul className={styles.list}>
            <li>アプリを最新版に更新し、再起動してからお試しください。</li>
            <li>画面の明るさを上げると読み取りやすくなります。</li>
            <li>画面の保護フィルムが汚れている場合は、拭き取ってからお試しください。</li>
            <li>電波状況によって表示に時間がかかることがあります。入場前の余裕のあるタイミングでチケットを開いておくことをおすすめします。</li>
            <li>解決しない場合は、会場のスタッフにお声がけください。</li>
          </ul>
        </section>

        <section className={styles.block} id="device">
          <h2>機種変更・端末の紛失について</h2>
          <Pending
            label="機種変更時のチケットの引き継ぎ手順"
            hint="アプリの引継ぎ仕様を確認し、content/faq/user.js の device-change / device-lost と、このセクションの本文を確定してください"
          />
        </section>

        <section className={styles.block} id="more">
          <h2>さらに詳しく</h2>
          <ul className={styles.list}>
            <li>
              <Link href="/guide/environment">動作環境</Link> — ご利用いただける端末とOSについて
            </li>
            <li>
              <Link href="/fees">手数料について</Link> — ご購入時にかかる費用
            </li>
            <li>
              <Link href="/refund">払い戻し・公演中止時の対応</Link> — キャンセルと返金の考え方
            </li>
            <li>
              <Link href="/faq">よくある質問</Link> — その他のご質問はこちら
            </li>
          </ul>
        </section>
      </div>
    </PageShell>
  );
}
