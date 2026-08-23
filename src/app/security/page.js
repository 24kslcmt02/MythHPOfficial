import Link from "next/link";
import { notFound } from "next/navigation";
import { isRoutePublished } from "@/config/routes";
import { ShieldCheck, Smartphone, Globe, MailWarning } from "lucide-react";
import PageShell from "@/components/common/PageShell";
import Notice from "@/components/common/Notice";
import ExternalLink from "@/components/common/ExternalLink";
import { officialChannels, contact, legalLinks } from "@/config/site";
import styles from "@/components/common/page.module.css";

export const metadata = {
  title: "安全への取り組み | My-th（マイス）",
  description:
    "My-thの不正転売対策、電子チケットによる本人確認、通信の暗号化、偽サイト・偽アプリへの注意喚起についてご案内します。",
  alternates: { canonical: "/security" },
};

const privacy = legalLinks.find((item) => item.key === "privacy");

export default function SecurityPage() {
  if (!isRoutePublished("/security")) notFound();

  return (
    <PageShell
      eyebrow="Safety & Security"
      title="安全への取り組み"
      lead="ファンの方が安心してイベントに参加できるよう、不正な転売の防止と、お客さまの情報を守る取り組みを行っています。"
      breadcrumbs={[{ label: "安全への取り組み" }]}
    >
      <div className={styles.prose}>
        <section className={styles.block} id="resale">
          <h2>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <ShieldCheck size={20} aria-hidden="true" />
              不正な転売への対応
            </span>
          </h2>
          <p>
            特定興行入場券の不正転売の禁止等による興行入場券の適正な流通の確保に関する法律
            （チケット不正転売禁止法）の趣旨に基づき、
            定価を超える価格での転売や、営利目的の反復的な転売を禁止しています。
          </p>
          <h3>My-thの仕組みによる対策</h3>
          <ul className={styles.list}>
            <li>
              <strong>電子チケット</strong> — チケット・チェキ券はアプリ内に発行され、
              紙の券のように第三者へ物理的に受け渡すことができません。
            </li>
            <li>
              <strong>Bot対策</strong> — 自動プログラムによる大量購入を防ぐ仕組みを標準で備え、
              先着・抽選のいずれの販売方式でも公平な購入機会を確保します。
            </li>
            <li>
              <strong>入場時のQR認証</strong> — 会場受付でのQR読み取りにより、
              購入されたチケットが正しく使用されているかを確認します。
            </li>
          </ul>
          <Notice tone="warn">
            <p>
              フリマアプリやオークションサイトなどで取引されたチケットは、
              入場をお断りする場合があります。正規の方法でのご購入をお願いいたします。
            </p>
          </Notice>
        </section>

        <section className={styles.block} id="data">
          <h2>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <Smartphone size={20} aria-hidden="true" />
              お客さまの情報の保護
            </span>
          </h2>
          <ul className={styles.list}>
            <li>
              <strong>通信の暗号化</strong> — 当サイトおよびMy-thアプリの通信は
              TLSにより暗号化しています。
            </li>
            <li>
              <strong>チケットのアカウント管理</strong> — ご購入いただいたチケットはアカウントに紐づいて管理されるため、
              端末を紛失した場合でも、他の方が勝手に使用することを防ぎます。
            </li>
          </ul>
          <p className={styles.note}>
            個人情報の取り扱いについては
            {privacy && <ExternalLink href={privacy.url}> プライバシーポリシー </ExternalLink>}
            をご覧ください。
          </p>
        </section>

        <section className={styles.block} id="official-channels">
          <h2>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <MailWarning size={20} aria-hidden="true" />
              偽サイト・偽アプリにご注意ください
            </span>
          </h2>
          <p>
            My-thを装った偽のサイトやアプリにより、ログイン情報やクレジットカード情報を
            盗み取ろうとする手口が確認されています。以下が当社の公式なチャネルです。
            これら以外は当社が提供するものではありません。
          </p>

          <h3>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Globe size={16} aria-hidden="true" />
              公式サイト
            </span>
          </h3>
          <ul className={styles.list}>
            {officialChannels.domains.map((domain) => (
              <li key={domain}>
                <code>{domain}</code>
              </li>
            ))}
          </ul>

          <h3>公式アプリ</h3>
          <ul className={styles.list}>
            {officialChannels.apps.map((app) => (
              <li key={app.store}>
                {app.store}で配信している「{app.name}」
                （
                <a href={app.url} target="_blank" rel="noopener noreferrer">
                  {app.store}で見る
                </a>
                ）
              </li>
            ))}
          </ul>

          <h3>当社からのメール</h3>
          <p>
            当社からのご連絡は {officialChannels.emailDomains.join("、")} ドメインのメールアドレスからお送りします。
            ログイン情報やクレジットカード情報をメールで直接お尋ねすることはありません。
          </p>

          <Notice tone="warn">
            <p>
              不審なサイト・メール・メッセージを受け取られた場合は、情報を入力せずに
              <a href={`mailto:${contact.email}`}> {contact.email} </a>
              または<Link href="/contact"> お問い合わせフォーム </Link>
              よりご連絡ください。
            </p>
          </Notice>
        </section>

        <section className={styles.block}>
          <h2>関連ページ</h2>
          <ul className={styles.list}>
            <li>
              <Link href="/news">お知らせ</Link> — 注意喚起を含む最新情報
            </li>
            <li>
              <Link href="/guide">使い方ガイド</Link>
            </li>
            <li>
              <Link href="/company">運営会社</Link>
            </li>
          </ul>
        </section>
      </div>
    </PageShell>
  );
}
