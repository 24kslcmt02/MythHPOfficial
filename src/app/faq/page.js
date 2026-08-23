import Link from "next/link";
import PageShell from "@/components/common/PageShell";
import FaqBrowser from "@/components/FaqBrowser";
import Notice from "@/components/common/Notice";
import { userFaq, userFaqCategories } from "@/content/faq/user";
import { publishedFaq, faqToJsonLd } from "@/lib/faq.mjs";
import { contactHref } from "@/config/routes";
import styles from "@/components/common/page.module.css";

export const metadata = {
  title: "よくある質問（購入者向け）| My-th（マイス）",
  description:
    "My-thアプリのチケット・チェキ券・入場特典に関するよくある質問。会員登録、支払い、機種変更、入場方法、払い戻しについてご案内します。",
  alternates: { canonical: "/faq" },
};

// 開発中は確認待ちの設問も表示して内容をレビューできるようにする
const includeDrafts = process.env.NODE_ENV !== "production";

export default function FaqPage() {
  const items = publishedFaq(userFaq, { includeDrafts });
  const jsonLd = faqToJsonLd(userFaq);

  return (
    <PageShell
      variant="user"
      eyebrow="FAQ"
      title="よくある質問"
      lead="チケット・チェキ券・入場特典のご利用についてお寄せいただくご質問をまとめました。運営者の方はこちらではなく運営者向けのページをご覧ください。"
      breadcrumbs={[{ label: "よくある質問" }]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <FaqBrowser items={items} categories={userFaqCategories} contactHref={contactHref("user")} />

      <div className={styles.block} style={{ marginTop: "var(--space-3xl)", maxWidth: 860 }}>
        <Notice>
          <p>
            ここで解決しない場合は<Link href={contactHref("user")}> お問い合わせ </Link>
            よりご連絡ください。運営者の方は
            <Link href="/faq/organizer"> 運営者向けのよくある質問 </Link>
            をご覧ください。
          </p>
        </Notice>
      </div>
    </PageShell>
  );
}
