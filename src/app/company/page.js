import Link from "next/link";
import PageShell from "@/components/common/PageShell";
import Pending from "@/components/common/Pending";
import ExternalLink from "@/components/common/ExternalLink";
import { company, contact, legalLinks, organizerTermsUrl, site } from "@/config/site";
import styles from "@/components/common/page.module.css";

export const metadata = {
  title: "運営会社 | My-th（マイス）",
  description:
    "My-th（マイス）を運営する会社の概要です。商号・所在地・代表者・事業内容と、規約・ポリシーの掲載場所をご案内します。",
  alternates: { canonical: "/company" },
};

/** 値が未確定の行は表示しない（誤った情報を出さないため） */
function Row({ term, children }) {
  if (!children) return null;
  return (
    <div className={styles.defRow}>
      <dt>{term}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export default function CompanyPage() {
  const address = [company.postalCode, company.address].filter(Boolean).join(" ");
  const hasDetails = Boolean(
    company.address || company.representative || company.founded || company.capital || company.business
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    alternateName: company.nameEn,
    url: site.url,
    email: contact.email,
    ...(contact.tel ? { telephone: contact.tel } : {}),
    ...(company.address
      ? {
          address: {
            "@type": "PostalAddress",
            addressCountry: "JP",
            ...(company.postalCode ? { postalCode: company.postalCode } : {}),
            streetAddress: company.address,
          },
        }
      : {}),
  };

  return (
    <PageShell
      eyebrow="Company"
      title="運営会社"
      lead="My-th（マイス）は、以下の会社が運営しています。"
      breadcrumbs={[{ label: "運営会社" }]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className={styles.prose}>
        <section className={styles.block}>
          <h2>会社概要</h2>
          <dl className={styles.defList}>
            <Row term="商号">{company.name}</Row>
            <Row term="英文表記">{company.nameEn}</Row>
            <Row term="所在地">{address}</Row>
            <Row term="代表者">{company.representative}</Row>
            <Row term="設立">{company.founded}</Row>
            <Row term="資本金">{company.capital}</Row>
            <Row term="事業内容">
              {company.business && (
                <ul className={styles.list} style={{ marginTop: 0 }}>
                  {company.business.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              )}
            </Row>
            <Row term="お問い合わせ">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              {contact.tel && (
                <>
                  <br />
                  <a href={`tel:${contact.tel.replace(/[^0-9+]/g, "")}`}>{contact.tel}</a>
                  {contact.telHours && `（${contact.telHours}）`}
                </>
              )}
            </Row>
          </dl>

          {!hasDetails && (
            <Pending
              label="会社概要の詳細"
              hint="site.js の company（所在地・代表者・設立・資本金・事業内容）を設定してください"
            />
          )}
        </section>

        {company.history && (
          <section className={styles.block}>
            <h2>沿革</h2>
            <dl className={styles.defList}>
              {company.history.map((entry) => (
                <div className={styles.defRow} key={`${entry.date}-${entry.text}`}>
                  <dt>{entry.date}</dt>
                  <dd>{entry.text}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <section className={styles.block} id="legal">
          <h2>規約・ポリシー</h2>
          <p>
            利用規約・プライバシーポリシー・特定商取引法に基づく表記は、
            お客さまがご利用になるMy-thアプリのページに掲載しています。
            内容の一元管理のため、当サイトでは本文を掲載せず、正式なページへのご案内のみとしています。
          </p>
          <div className={styles.cardGrid}>
            {legalLinks.map((item) => (
              <ExternalLink key={item.key} href={item.url} className={styles.linkCard}>
                <span className={styles.linkCardTitle}>{item.label}</span>
                <span className={styles.linkCardDesc}>{item.description}</span>
              </ExternalLink>
            ))}
            {organizerTermsUrl && (
              <ExternalLink href={organizerTermsUrl} className={styles.linkCard}>
                <span className={styles.linkCardTitle}>運営者向け利用規約</span>
                <span className={styles.linkCardDesc}>
                  チケット・チェキ券を販売される事業者さま向けの条件
                </span>
              </ExternalLink>
            )}
          </div>
        </section>

        <section className={styles.block}>
          <h2>関連ページ</h2>
          <ul className={styles.list}>
            <li>
              <Link href="/contact">お問い合わせ</Link> — ご質問・導入のご相談はこちら
            </li>
            <li>
              <Link href="/security">安全への取り組み</Link> — 転売対策・セキュリティ・偽サイトへの注意
            </li>
            <li>
              <Link href="/news">お知らせ</Link> — サービスに関する最新情報
            </li>
          </ul>
        </section>
      </div>
    </PageShell>
  );
}
