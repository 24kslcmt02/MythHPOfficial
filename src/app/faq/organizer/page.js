import Link from "next/link";
import PageShell from "@/components/common/PageShell";
import FaqBrowser from "@/components/FaqBrowser";
import Notice from "@/components/common/Notice";
import { organizerFaq, organizerFaqCategories } from "@/content/faq/organizer";
import { publishedFaq, faqToJsonLd } from "@/lib/faq.mjs";
import styles from "@/components/common/page.module.css";

export const metadata = {
  title: "よくある質問（運営者向け）| My-th（マイス）",
  description:
    "My-th導入をご検討・ご利用中のイベンター・事務所さま向けのよくある質問。料金、イベント作成、当日の運用、売上の入金、中止時の対応についてご案内します。",
  alternates: { canonical: "/faq/organizer" },
};

const includeDrafts = process.env.NODE_ENV !== "production";

export default function OrganizerFaqPage() {
  const items = publishedFaq(organizerFaq, { includeDrafts });
  const jsonLd = faqToJsonLd(organizerFaq);

  return (
    <PageShell
      variant="operator"
      eyebrow="FAQ for Organizers"
      title="よくある質問（運営者向け）"
      lead="導入をご検討中の方、すでにMy-thをご利用中のイベンター・事務所さまからよくいただくご質問をまとめました。"
      breadcrumbs={[
        { label: "イベンター・運営の方へ", href: "/operator" },
        { label: "よくある質問" },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <FaqBrowser items={items} categories={organizerFaqCategories} />

      <div className={styles.block} style={{ marginTop: "var(--space-3xl)", maxWidth: 860 }}>
        <Notice>
          <p>
            導入のご相談は<Link href="/contact?type=organizer"> お問い合わせ </Link>
            より承ります。担当者が24時間以内にご連絡いたします。
          </p>
        </Notice>
      </div>
    </PageShell>
  );
}
