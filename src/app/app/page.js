import Link from "next/link";
import Image from "next/image";
import PageShell from "@/components/common/PageShell";
import Notice from "@/components/common/Notice";
import Pending from "@/components/common/Pending";
import { requirements, site, stores } from "@/config/site";
import shared from "@/components/common/page.module.css";
import styles from "./app.module.css";

/*
 * /app — ファン向けアプリのダウンロードページ。
 * ディレクトリ名が Next.js の app ディレクトリと重なるが、公開URL `my-th.jp/app` を優先した。
 * 運営者ページの「ファン向けアプリはこちら」、Footer「アプリをダウンロード」の着地点。
 * QRコード・SNS・印刷物から案内する固定URLとしても使う。
 */

export const metadata = {
  title: "アプリをダウンロード | My-th（マイス）",
  description:
    "My-th（マイス）アプリはApp Store・Google Playから無料でダウンロードできます。チケットの購入・入場・チェキ券の利用はすべてアプリから。",
  alternates: { canonical: "/app" },
};

const FEATURES = [
  { title: "チケットを買う", desc: "先着・抽選のチケット、チェキ券をアプリ内で購入。購入した券はアプリにまとまります。" },
  { title: "会場に入る", desc: "当日はアプリのチケットを提示して入場。紙のチケットを持ち歩く必要はありません。" },
  { title: "思い出を残す", desc: "撮影したチェキや入場特典はアプリ内のコレクションにまとまり、あとから見返せます。" },
];

function buildAppJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: site.name,
    description: site.description,
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "iOS, Android",
    offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
    installUrl: [stores.appStore, stores.googlePlay],
    url: `${site.url}/app`,
  };
}

export default function AppDownloadPage() {
  const hasOsInfo = Boolean(requirements.ios || requirements.android);

  return (
    <PageShell
      eyebrow="Download"
      title="My-thアプリをダウンロード"
      lead="チケットの購入・入場・チェキ券の利用は、すべてMy-thアプリから。無料でダウンロードできます。"
      breadcrumbs={[{ label: "アプリをダウンロード" }]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildAppJsonLd()) }}
      />

      <div className={shared.prose}>
        <section className={shared.block}>
          <h2>ダウンロード</h2>
          <div className={styles.storeRow}>
            <div className={styles.storeCard}>
              <h3>iPhone・iPad の方</h3>
              <p>App Store からダウンロード</p>
              <a href={stores.appStore} target="_blank" rel="noopener noreferrer" className={styles.badge}>
                <Image src="/images/badge-appstore.svg" alt="App Storeからダウンロード" width={168} height={56} unoptimized />
              </a>
            </div>
            <div className={styles.storeCard}>
              <h3>Android の方</h3>
              <p>Google Play からダウンロード</p>
              <a href={stores.googlePlay} target="_blank" rel="noopener noreferrer" className={styles.badge}>
                <Image src="/images/badge-googleplay.svg" alt="Google Playで手に入れよう" width={188} height={56} unoptimized />
              </a>
            </div>
          </div>
          <p className={shared.note}>
            アプリのダウンロードと会員登録は無料です。会員登録はアプリ内から、メールアドレスの認証のみで完了します。
          </p>
        </section>

        <section className={shared.block}>
          <h2>アプリでできること</h2>
          <ul className={styles.featureList}>
            {FEATURES.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                {item.desc}
              </li>
            ))}
          </ul>
        </section>

        <section className={shared.block}>
          <h2>対応OS</h2>
          {hasOsInfo ? (
            <ul className={shared.list}>
              {requirements.ios && <li>iOS / iPadOS: {requirements.ios}</li>}
              {requirements.android && <li>Android: {requirements.android}</li>}
            </ul>
          ) : (
            <Pending
              label="対応OSバージョンの詳細"
              hint="site.js の requirements.ios / requirements.android を設定してください"
            />
          )}
          <ul className={shared.list}>
            {requirements.notSupported.map((item) => (
              <li key={item}>{item}ではご利用いただけません</li>
            ))}
          </ul>
        </section>

        <section className={shared.block}>
          <h2>イベンター・運営者の方へ</h2>
          <Notice>
            <p>
              このページはファン（チケットをご購入になる方）向けです。
              イベントを主催・運営される方は、管理画面のご利用に会員登録申請が必要です。
              <Link href="/operator#signup"> 無料で会員登録 </Link>からお申し込みください。
            </p>
          </Notice>
        </section>

        <section className={shared.block}>
          <h2>困ったときは</h2>
          <ul className={shared.list}>
            <li>
              <Link href="/faq">よくある質問（購入者向け）</Link>
            </li>
            <li>
              <Link href="/#contact">お問い合わせ</Link>
            </li>
          </ul>
        </section>
      </div>
    </PageShell>
  );
}
