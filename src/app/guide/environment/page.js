import Link from "next/link";
import PageShell from "@/components/common/PageShell";
import Pending from "@/components/common/Pending";
import Notice from "@/components/common/Notice";
import { requirements, stores } from "@/config/site";
import styles from "@/components/common/page.module.css";

export const metadata = {
  title: "動作環境 | My-th（マイス）",
  description:
    "My-thアプリをご利用いただける端末・OSのバージョンについてご案内します。",
  alternates: { canonical: "/guide/environment" },
};

export default function EnvironmentPage() {
  const hasOsInfo = Boolean(requirements.ios || requirements.android);

  return (
    <PageShell
      eyebrow="Requirements"
      title="動作環境"
      lead="My-thアプリをご利用いただける端末とOSのバージョンをご案内します。"
      breadcrumbs={[{ label: "使い方ガイド", href: "/guide" }, { label: "動作環境" }]}
    >
      <div className={styles.prose}>
        <section className={styles.block}>
          <h2>対応OS</h2>
          {hasOsInfo ? (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>プラットフォーム</th>
                    <th>対応バージョン</th>
                    <th>入手先</th>
                  </tr>
                </thead>
                <tbody>
                  {requirements.ios && (
                    <tr>
                      <td>iOS / iPadOS</td>
                      <td>{requirements.ios}</td>
                      <td>
                        <a href={stores.appStore} target="_blank" rel="noopener noreferrer">
                          App Store
                        </a>
                      </td>
                    </tr>
                  )}
                  {requirements.android && (
                    <tr>
                      <td>Android</td>
                      <td>{requirements.android}</td>
                      <td>
                        <a href={stores.googlePlay} target="_blank" rel="noopener noreferrer">
                          Google Play
                        </a>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <Pending
              label="対応OSバージョンの詳細"
              hint="site.js の requirements.ios / requirements.android を設定してください"
            />
          )}
          <p className={styles.note}>
            アプリは最新版へのアップデートをお願いいたします。
            古いバージョンをご利用の場合、一部の機能が正しく動作しないことがあります。
          </p>
        </section>

        <section className={styles.block}>
          <h2>ご利用いただけない環境</h2>
          <ul className={styles.list}>
            {requirements.notSupported.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.block}>
          <h2>会場でご利用いただく際のご注意</h2>
          <Notice>
            <p>
              会場によっては電波が届きにくいことがあります。受付前にアプリを起動し、
              チケットを表示しておくとスムーズです。
              端末のバッテリー残量にもご注意ください。
            </p>
          </Notice>
        </section>

        <section className={styles.block}>
          <h2>関連ページ</h2>
          <ul className={styles.list}>
            <li>
              <Link href="/guide">使い方ガイド</Link>
            </li>
            <li>
              <Link href="/faq">よくある質問</Link>
            </li>
          </ul>
        </section>
      </div>
    </PageShell>
  );
}
