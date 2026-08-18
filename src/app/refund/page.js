import Link from "next/link";
import PageShell from "@/components/common/PageShell";
import Notice from "@/components/common/Notice";
import Pending from "@/components/common/Pending";
import ExternalLink from "@/components/common/ExternalLink";
import { fees, legalLinks } from "@/config/site";
import styles from "@/components/common/page.module.css";

export const metadata = {
  title: "払い戻し・公演中止時の対応 | My-th（マイス）",
  description:
    "My-thでご購入いただいたチケット・チェキ券のキャンセルと払い戻しの取り扱い、イベントが中止・延期になった場合の対応についてご案内します。",
  alternates: { canonical: "/refund" },
};

const terms = legalLinks.find((item) => item.key === "terms");
const tokushoho = legalLinks.find((item) => item.key === "tokushoho");

export default function RefundPage() {
  return (
    <PageShell
      eyebrow="Refund"
      title="払い戻し・公演中止時の対応"
      lead="ご購入後のキャンセルと払い戻しの考え方、イベントが中止・延期となった場合の対応をご案内します。"
      breadcrumbs={[{ label: "払い戻し・公演中止時の対応" }]}
    >
      <div className={styles.prose}>
        <Notice>
          <p>
            このページはご案内です。払い戻しに関する正式な定めは、
            {terms && <ExternalLink href={terms.url}> 利用規約 </ExternalLink>}
            および
            {tokushoho && <ExternalLink href={tokushoho.url}> 特定商取引法に基づく表記 </ExternalLink>}
            に記載しています。
          </p>
        </Notice>

        <section className={styles.block} id="self">
          <h2>お客様都合によるキャンセル</h2>
          <p>
            ご購入後の、お客様のご都合によるキャンセル・返金は原則としてお受けしておりません。
            券種・枚数・お目当ての選択に誤りがないか、ご購入前に必ずご確認ください。
          </p>
          <p>
            なお、取り扱いはイベント主催者の規定によります。
            主催者が個別に定めている場合は、そちらの案内が優先されます。
          </p>
        </section>

        <section className={styles.block} id="cancelled">
          <h2>イベントが中止になった場合</h2>
          <p>
            イベントが中止となった場合は、自動で返金処理を行います。
            お客様によるお手続きは必要ありません。
          </p>
          <ol className={styles.steps}>
            <li>
              <h3>主催者が中止を決定</h3>
              <p>主催者よりイベント中止のご連絡が行われます。</p>
            </li>
            <li>
              <h3>返金処理を実施</h3>
              <p>対象となるご購入分について、当社にて返金処理を行います。</p>
            </li>
            <li>
              <h3>ご返金</h3>
              <p>ご利用いただいた決済方法に応じて返金されます。</p>
            </li>
          </ol>
        </section>

        <section className={styles.block} id="postponed">
          <h2>延期・内容変更になった場合</h2>
          <p>
            公演の延期、出演者や開催時間の変更があった場合の取り扱いは、主催者の判断によります。
            主催者からのご案内をご確認ください。
            ご不明な点はお問い合わせください。
          </p>
        </section>

        <section className={styles.block} id="fee">
          <h2>手数料の取り扱いと返金時期</h2>
          {fees?.refund ? (
            <>
              <p>{fees.refund.feePolicy}</p>
              <p>{fees.refund.timing}</p>
            </>
          ) : (
            <Pending
              label="払い戻し時の手数料の取り扱いと返金時期"
              hint="site.js の fees.refund（feePolicy / timing）を設定してください。大手3社はいずれも「手数料は返金対象外」と明示しています"
            />
          )}
        </section>

        <section className={styles.block} id="organizer">
          <h2>運営者の方へ</h2>
          <p>
            イベントを中止・変更される場合の手続きと、購入者の方への返金対応については
            <Link href="/faq/organizer#q-cancel-flow"> 運営者向けのよくある質問 </Link>
            をご覧ください。
          </p>
        </section>

        <section className={styles.block}>
          <h2>関連ページ</h2>
          <ul className={styles.list}>
            <li>
              <Link href="/fees">手数料について</Link>
            </li>
            <li>
              <Link href="/faq#q-cancel">よくある質問 — キャンセル・払い戻し</Link>
            </li>
            <li>
              <Link href="/contact">お問い合わせ</Link>
            </li>
          </ul>
        </section>
      </div>
    </PageShell>
  );
}
