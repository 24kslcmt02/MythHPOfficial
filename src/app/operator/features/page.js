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
    title: "イベントページの作成",
    items: [
      { name: "イベントページ作成・チケット販売", desc: "管理画面からイベント情報とチケットを登録して公開します。" },
      { name: "AI入力", desc: "メモを貼り付けるだけでAIがイベント情報を下書きします。" },
      { name: "カスタムURL", desc: "user.my-th.jp/tickets/event/ に続く部分を自由に設定し、届けやすいURLにできます。" },
      { name: "開場・開演時間の設定", desc: "開催日に加えて、開場時間と開演時間を個別に設定できます。" },
      { name: "サムネイルの自動調整", desc: "縦横どちらの画像でも自動で調整されます。" },
      { name: "出演者の登録", desc: "My-th登録済みのグループはもちろん、未登録のグループもフリー入力で追加できます。" },
      { name: "下書き・公開予約・複製", desc: "非公開のまま作成しておく、公開日時を予約する、過去イベントを複製する、に対応しています。" },
    ],
  },
  {
    title: "チケット販売",
    items: [
      { name: "電子チケットの販売", desc: "アプリ内で完結する電子チケットを販売できます。購入自体はWebブラウザからも可能です。" },
      { name: "先着・抽選の販売方式", desc: "先着販売と抽選販売の両方に対応。抽選結果は設定日の正午12時に購入者へメールで通知されます。" },
      { name: "整理番号付き販売", desc: "ご購入順に整理番号を付与して販売できます。" },
      { name: "チケットごとの販売期間", desc: "チケットごとに販売開始・終了日時を設定できます。当日券の販売にも対応。" },
      { name: "購入枚数の上限設定", desc: "1人あたりの購入枚数・抽選申込口数の上限をチケットごとに設定できます。" },
      { name: "0円チケット", desc: "無料のチケットも発行できます。" },
      { name: "同行者への分配", desc: "購入者がアプリ内で同行者にチケットを送れます。" },
      { name: "Bot対策", desc: "自動プログラムによる大量購入を防ぎ、公平な販売機会を確保します。" },
    ],
  },
  {
    title: "チェキ券の管理",
    items: [
      { name: "デジタルチェキ券の発行", desc: "紙のチェキ券をQRコードに置き換え、偽造・紛失のリスクをなくします。" },
      { name: "まとめ出し", desc: "複数枚のチェキ券をまとめて処理できます。" },
      { name: "有効期限の設定", desc: "チェキ券ごとに有効期限を設定できます。" },
      { name: "限定チェキの販売", desc: "数量を絞った限定チェキを販売できます。" },
      { name: "抽選販売", desc: "受付期間を設けて抽選で販売できます。" },
    ],
  },
  {
    title: "入場特典・当日の受付",
    items: [
      { name: "入場特典券のデジタル配布", desc: "入場特典を「入場特典券」として購入者のアプリに配布します。内容は自由で、印刷・郵送・手渡しは不要です（My-th登録済みグループのみ）。" },
      { name: "スタッフアプリでの受付", desc: "スタッフのスマートフォン・タブレット（iOS / Android）で入場受付と特典券の使用処理を行えます。専用機材は不要です。" },
      { name: "手動での入場処理", desc: "QRコードのほか、整理番号などの情報から手動で入場処理を行えます。" },
      { name: "入場記録のデータ化", desc: "誰がいつ入場したかを記録として残せます。" },
    ],
  },
  {
    title: "売上・バックオフィス",
    items: [
      { name: "リアルタイムダッシュボード", desc: "販売状況と売上をその場で確認できます。" },
      { name: "動員状況の共有", desc: "My-th登録済みのグループは、出演イベントの動員状況を自グループ分に限って自身の管理画面でリアルタイムに確認できます。" },
      { name: "イベント別・メンバー別の集計", desc: "集計作業を自動化し、手作業による集計ミスと遅延をなくします。" },
      { name: "売上の自動集計・送金", desc: "売上を自動で集計し、開催日ごとにお振込します。" },
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
            {organizerCommissionRate}のみで、システム利用料や発券手数料のような別建ての費用はありません。
            販売手数料を主催者負担にするか購入者負担にするかは、イベントごとにお選びいただけます。
          </p>
          <Notice>
            <p>
              入場受付には通信環境が必要です。電波が届きにくい会場では、会場のWi-Fiや
              モバイルルーターのご用意をおすすめします。
            </p>
          </Notice>
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
