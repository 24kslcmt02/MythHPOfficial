import Link from "next/link";
import { notFound } from "next/navigation";
import { isRoutePublished } from "@/config/routes";
import PageShell from "@/components/common/PageShell";
import Pending from "@/components/common/Pending";
import Notice from "@/components/common/Notice";
import ExternalLink from "@/components/common/ExternalLink";
import {
  fees,
  payout,
  subscriptionPrice,
  organizerCommissionRate,
  legalLinks,
} from "@/config/site";
import styles from "@/components/common/page.module.css";

export const metadata = {
  title: "手数料について | My-th（マイス）",
  description:
    "My-thのご利用にかかる費用をご案内します。購入者の方の手数料、運営者の方の販売手数料についてまとめています。",
  alternates: { canonical: "/fees" },
};

const tokushoho = legalLinks.find((item) => item.key === "tokushoho");

export default function FeesPage() {
  if (!isRoutePublished("/fees")) notFound();

  return (
    <PageShell
      eyebrow="Fees"
      title="手数料について"
      lead="My-thのご利用にかかる費用をご案内します。金額はすべて税込表記です。"
      breadcrumbs={[{ label: "手数料について" }]}
    >
      <div className={styles.prose}>
        <section className={styles.block} id="buyer">
          <h2>購入者の方</h2>
          <p>
            アプリのダウンロードおよび基本機能のご利用は無料です。
            費用が発生するのは、チケット・チェキ券をご購入いただくときのみです。
          </p>
          <p>
            My-thには、他のプレイガイドにあるようなシステム利用料や発券手数料といった別建ての加算はありません。
            かかるのは販売手数料{organizerCommissionRate}のみで、主催者の設定により購入者負担となる場合と、
            主催者負担で購入者には加算されない場合があります。
          </p>

          {fees?.buyer ? (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>対象</th>
                    <th>システム利用料</th>
                    <th>決済手数料</th>
                  </tr>
                </thead>
                <tbody>
                  {fees.buyer.map((row) => (
                    <tr key={row.target}>
                      <td>{row.target}</td>
                      <td>{row.systemFee}</td>
                      <td>{row.paymentFee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Pending
              label="購入時の手数料の内訳"
              hint="site.js の fees.buyer を設定してください（競合は「5%＋165円/枚」等の実額を明示しています）"
            />
          )}

          <Notice>
            <p>
              手数料を含めた最終的なお支払い金額は、ご購入前の確認画面に表示されます。
              お支払い方法ごとの詳細な条件は
              {tokushoho && (
                <>
                  <ExternalLink href={tokushoho.url}> 特定商取引法に基づく表記 </ExternalLink>
                </>
              )}
              をご確認ください。
            </p>
          </Notice>
        </section>

        <section className={styles.block} id="subscription">
          <h2>コレクション機能（月額サービス）</h2>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>プラン</th>
                  <th>料金</th>
                  <th>内容</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>コレクション機能</td>
                  <td>
                    月額 {subscriptionPrice.amount.toLocaleString()}円（{subscriptionPrice.tax}）
                  </td>
                  <td>チェキ券・ピクチャーチケットを枚数制限なく登録して振り返れます</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={styles.note}>
            詳しくは<Link href="/subscription"> コレクション機能のご案内 </Link>をご覧ください。
          </p>
        </section>

        <section className={styles.block} id="organizer">
          <h2>運営者（イベンター・事務所）の方</h2>
          <p>
            初期費用・月額費用はいずれも無料です。チケット・チェキ券が売れたときの販売手数料のみをご負担いただきます。
            売上が発生しなければ費用もかかりません。
          </p>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>項目</th>
                  <th>費用</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>初期費用</td>
                  <td>無料</td>
                </tr>
                <tr>
                  <td>月額費用</td>
                  <td>無料</td>
                </tr>
                <tr>
                  <td>チケット販売手数料</td>
                  <td>{organizerCommissionRate}</td>
                </tr>
                <tr>
                  <td>チェキ販売手数料</td>
                  <td>{organizerCommissionRate}</td>
                </tr>
                {fees?.organizer?.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!fees?.transferFee && (
            <Pending
              label="振込手数料"
              hint="site.js の fees.transferFee / payout.transferFee を設定してください"
            />
          )}

          {payout?.rules && (
            <>
              <h3>売上金のお振込</h3>
              <p>{payout.basis}を基点として、開催日ごとにお振込します。</p>
              <ul className={styles.list}>
                {payout.rules.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>
              <p className={styles.note}>金融機関の休業日にあたる場合は前後することがあります。</p>
            </>
          )}
        </section>

        <section className={styles.block}>
          <h2>手数料の改定について</h2>
          <p>
            手数料を改定する場合は、事前に<Link href="/news"> お知らせ </Link>
            にて告知いたします。
          </p>
        </section>

        <section className={styles.block}>
          <h2>関連ページ</h2>
          <ul className={styles.list}>
            <li>
              <Link href="/refund">払い戻し・公演中止時の対応</Link>
            </li>
            <li>
              <Link href="/faq">よくある質問（購入者）</Link>
            </li>
            <li>
              <Link href="/faq/organizer">よくある質問（運営者）</Link>
            </li>
          </ul>
        </section>
      </div>
    </PageShell>
  );
}
