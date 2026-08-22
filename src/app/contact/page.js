import Link from "next/link";
import { notFound } from "next/navigation";
import { isRoutePublished } from "@/config/routes";
import { Mail, Phone, Clock } from "lucide-react";
import PageShell from "@/components/common/PageShell";
import InquiryForm from "@/components/contact/InquiryForm";
import Notice from "@/components/common/Notice";
import { contact } from "@/config/site";
import { CONTACT_TYPES } from "@/lib/contact-schema.mjs";
import styles from "@/components/common/page.module.css";

export const metadata = {
  title: "お問い合わせ | My-th（マイス）",
  description:
    "My-thへのお問い合わせ窓口です。ファン・購入者の方からのご質問、イベンター・運営の方からの導入相談を受け付けています。",
  alternates: { canonical: "/contact" },
};

/** /contact?type=organizer で運営者向けの入力欄を初期表示する */
export default async function ContactPage({ searchParams }) {
  if (!isRoutePublished("/contact")) notFound();

  const params = await searchParams;
  const requestedType = Array.isArray(params?.type) ? params.type[0] : params?.type;
  const defaultType = CONTACT_TYPES.includes(requestedType) ? requestedType : "user";

  return (
    <PageShell
      eyebrow="Contact"
      title="お問い合わせ"
      lead="ご質問・ご相談を承ります。お問い合わせの前に、よくある質問もあわせてご確認ください。"
      breadcrumbs={[{ label: "お問い合わせ" }]}
    >
      <div className={styles.prose}>
        <section className={styles.block}>
          <h2>お問い合わせの前に</h2>
          <p>
            ご利用方法やお支払い、払い戻しに関するご質問は、よくある質問で解決できる場合があります。
          </p>
          <div className={styles.cardGrid}>
            <Link href="/faq" className={styles.linkCard}>
              <span className={styles.linkCardTitle}>よくある質問（購入者）</span>
              <span className={styles.linkCardDesc}>
                会員登録・支払い・入場方法・機種変更・払い戻しについて
              </span>
            </Link>
            <Link href="/faq/organizer" className={styles.linkCard}>
              <span className={styles.linkCardTitle}>よくある質問（運営者）</span>
              <span className={styles.linkCardDesc}>
                料金・イベント作成・当日の運用・売上の入金について
              </span>
            </Link>
          </div>
        </section>

        <section className={styles.block}>
          <h2>お問い合わせ窓口</h2>
          <dl className={styles.defList}>
            <div className={styles.defRow}>
              <dt>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <Mail size={15} aria-hidden="true" />
                  メール
                </span>
              </dt>
              <dd>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                <br />
                下のフォームからもお送りいただけます。
              </dd>
            </div>

            {contact.tel && (
              <div className={styles.defRow}>
                <dt>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <Phone size={15} aria-hidden="true" />
                    電話
                  </span>
                </dt>
                <dd>
                  <a href={`tel:${contact.tel.replace(/[^0-9+]/g, "")}`}>{contact.tel}</a>
                  {contact.telHours && (
                    <>
                      <br />
                      {contact.telHours}
                    </>
                  )}
                </dd>
              </div>
            )}

            <div className={styles.defRow}>
              <dt>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <Clock size={15} aria-hidden="true" />
                  ご返信の目安
                </span>
              </dt>
              <dd>担当者より{contact.replyTarget}にご返信いたします。</dd>
            </div>
          </dl>

          {contact.emergency && (
            <Notice>
              <p>
                <strong>イベント当日の緊急のご連絡</strong>
                <br />
                {contact.emergency}
              </p>
            </Notice>
          )}

          <Notice tone="warn">
            <p>
              My-thを装った偽サイト・偽メールにご注意ください。当社からのご連絡は
              my-th.jp ドメインのメールアドレスからお送りします。
              詳しくは<Link href="/security#official-channels"> 安全への取り組み </Link>
              をご覧ください。
            </p>
          </Notice>
        </section>

        <section className={styles.block}>
          <h2>フォームからのお問い合わせ</h2>
          <p>お問い合わせの種別を選んでご記入ください。</p>
        </section>
      </div>

      <div style={{ marginTop: "var(--space-lg)" }}>
        <InquiryForm defaultType={defaultType} />
      </div>
    </PageShell>
  );
}
