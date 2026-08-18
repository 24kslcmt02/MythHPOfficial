import Link from "next/link";
import PageShell from "@/components/common/PageShell";
import Notice from "@/components/common/Notice";
import { organizerCommissionRate } from "@/config/site";
import styles from "@/components/common/page.module.css";

export const metadata = {
  title: "機能一覧（運営者向け）| My-th（マイス）",
  description:
    "My-thの運営者向け機能の一覧です。チェキ券管理、チケット販売、入場特典、当日の入場受付、売上管理の機能をまとめています。",
  alternates: { canonical: "/operator/features" },
};

const FEATURE_GROUPS = [
  {
    title: "チェキ券の管理",
    items: [
      { name: "デジタルチェキ券の発行", desc: "紙のチェキ券をQRコードに置き換え、偽造・紛失のリスクをなくします。" },
      { name: "まとめ出し", desc: "複数枚のチェキ券をまとめて処理できます。" },
      { name: "有効期限の設定", desc: "チェキ券ごとに有効期限を設定できます。" },
      { name: "限定チェキの販売", desc: "数量を絞った限定チェキを販売できます。" },
      { name: "抽選販売", desc: "受付期間を設けて抽選で販売できます。" },
      { name: "オフライン環境での利用", desc: "通信環境が不安定な会場でも安定して運用できます。" },
    ],
  },
  {
    title: "チケット販売",
    items: [
      { name: "電子チケットの販売", desc: "アプリ内で完結する電子チケットを販売できます。" },
      { name: "Bot対策", desc: "自動プログラムによる大量購入を防ぎ、公平な販売機会を確保します。" },
      { name: "お目当て特典の自動配布", desc: "お目当ての指定に応じて特典を自動で配布します。" },
      { name: "先着・抽選の販売方式", desc: "イベントに合わせて販売方式を選べます。" },
    ],
  },
  {
    title: "入場特典・当日の受付",
    items: [
      { name: "デジタル入場特典", desc: "デザイン・印刷・郵送・配布の工程をすべてオンラインに置き換えます。" },
      { name: "QR自動照合", desc: "会場受付でのQR読み取りと同時に、特典を即時付与します。" },
      { name: "入場記録のデータ化", desc: "誰がいつ入場したかを記録として残せます。" },
    ],
  },
  {
    title: "売上・バックオフィス",
    items: [
      { name: "リアルタイムダッシュボード", desc: "日次・月次の売上推移をその場で確認できます。" },
      { name: "イベント別・メンバー別の集計", desc: "集計作業を自動化し、手作業による集計ミスと遅延をなくします。" },
      { name: "売上の自動集計・送金", desc: "売上を自動で集計し、お振込まで行います。" },
    ],
  },
];

export default function OperatorFeaturesPage() {
  return (
    <PageShell
      variant="operator"
      eyebrow="Features"
      title="機能一覧"
      lead="My-thが提供する運営者向け機能の一覧です。チェキ券・チケット・入場特典・売上管理をひとつの管理画面で扱えます。"
      breadcrumbs={[
        { label: "イベンター・運営の方へ", href: "/operator" },
        { label: "機能一覧" },
      ]}
    >
      <div className={styles.prose}>
        {FEATURE_GROUPS.map((group) => (
          <section className={styles.block} key={group.title}>
            <h2>{group.title}</h2>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>機能</th>
                    <th>内容</th>
                  </tr>
                </thead>
                <tbody>
                  {group.items.map((item) => (
                    <tr key={item.name}>
                      <td>{item.name}</td>
                      <td>{item.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}

        <section className={styles.block}>
          <h2>料金</h2>
          <p>
            初期費用・月額費用は無料です。チケット・チェキ券が売れたときの販売手数料
            {organizerCommissionRate}のみをご負担いただきます。
          </p>
          <Notice>
            <p>
              費用の詳細は<Link href="/fees#organizer"> 手数料について </Link>
              を、導入の流れやよくいただくご質問は
              <Link href="/faq/organizer"> 運営者向けのよくある質問 </Link>
              をご覧ください。
            </p>
          </Notice>
          <div className={styles.ctaRow}>
            <Link href="/contact?type=organizer" className="btn btn-primary">
              導入について相談する
            </Link>
            <Link href="/operator" className="btn btn-outline">
              サービス紹介を見る
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
