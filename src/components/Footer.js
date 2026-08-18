"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ExternalLink as ExternalLinkIcon } from "lucide-react";
import SocialIcons from "./SocialIcons";
import styles from "./Footer.module.css";
import {
  company,
  legalLinks,
  organizerTermsUrl,
  cookiePolicyUrl,
  payments,
  stores,
} from "@/config/site";

/**
 * サイト共通フッター（v0.2 要件定義 FR-01 / 3.3）
 *
 * ▼ 設計原則
 * 利用規約・プライバシーポリシー・特定商取引法に基づく表記の正本は
 * ユーザーが利用するアプリ側（user.my-th.jp）に一本化されている。
 * このフッターは「正本への遷移導線」であり、HP 側に本文は持たない。
 */
export default function Footer({ variant = "user", onViewModeChange }) {
  const router = useRouter();

  // トップページ（SPA）ではビュー切替、それ以外のページではルート遷移
  const goToView = (mode) => {
    if (onViewModeChange) {
      onViewModeChange(mode);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push(mode === "operator" ? "/operator" : "/");
    }
  };

  const externalLegal = [
    ...legalLinks,
    ...(organizerTermsUrl
      ? [{ key: "organizer-terms", label: "運営者向け利用規約", url: organizerTermsUrl }]
      : []),
    ...(cookiePolicyUrl
      ? [{ key: "cookie", label: "Cookie・外部送信ポリシー", url: cookiePolicyUrl }]
      : []),
  ];

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.brandLogo}>
              <Image
                src="/images/Mythlogo.svg"
                alt="My-th"
                width={32}
                height={32}
                className={styles.logoImg}
              />
              <span className={styles.logoText}>My-th</span>
            </div>
            <p className={styles.tagline}>すべての体験をつなぐ アイドルOS</p>
            <div className={styles.storeLinks}>
              <a href={stores.appStore} target="_blank" rel="noopener noreferrer">
                App Store
              </a>
              <a href={stores.googlePlay} target="_blank" rel="noopener noreferrer">
                Google Play
              </a>
            </div>
          </div>

          <nav className={styles.links} aria-label="フッターナビゲーション">
            <div className={styles.linkGroup}>
              <h2 className={styles.groupTitle}>サービス</h2>
              <button type="button" className={styles.linkBtn} onClick={() => goToView("user")}>
                ファンの方へ
              </button>
              <button type="button" className={styles.linkBtn} onClick={() => goToView("operator")}>
                イベンター・運営の方へ
              </button>
              <Link href="/subscription">コレクション機能</Link>
              <Link href="/operator/features">機能一覧（運営者向け）</Link>
            </div>

            <div className={styles.linkGroup}>
              <h2 className={styles.groupTitle}>サポート</h2>
              <Link href="/faq">よくある質問（購入者）</Link>
              <Link href="/faq/organizer">よくある質問（運営者）</Link>
              <Link href="/guide">使い方ガイド</Link>
              <Link href="/fees">手数料について</Link>
              <Link href="/refund">払い戻し・公演中止時の対応</Link>
              <Link href="/contact">お問い合わせ</Link>
              <Link href="/faq#q-withdraw">退会について</Link>
            </div>

            <div className={styles.linkGroup}>
              <h2 className={styles.groupTitle}>安心・安全</h2>
              <Link href="/security">安全への取り組み</Link>
              <Link href="/guide/environment">動作環境</Link>
              <Link href="/news">お知らせ</Link>
              <Link href="/security#official-channels">偽サイト・偽アプリにご注意</Link>
            </div>

            <div className={styles.linkGroup}>
              <h2 className={styles.groupTitle}>会社情報・規約</h2>
              <Link href="/company">運営会社</Link>
              {externalLegal.map((item) => (
                <a
                  key={item.key}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.externalLink}
                >
                  {item.label}
                  <ExternalLinkIcon size={12} aria-hidden="true" />
                  <span className="srOnly">（My-thアプリのページが新しいタブで開きます）</span>
                </a>
              ))}
              <p className={styles.groupNote}>
                規約・ポリシーはMy-thアプリのページに掲載しています
              </p>
            </div>
          </nav>
        </div>

        <div className={styles.bottom}>
          {payments && (
            <div className={styles.payments}>
              <span className={styles.paymentsLabel}>対応決済</span>
              <span className={styles.paymentsList}>
                {[...(payments.cards ?? []), ...(payments.convenience ?? []), ...(payments.others ?? [])].join(" / ")}
              </span>
            </div>
          )}
          <SocialIcons className={styles.social} linkClassName={styles.socialLink} />
          <p className={styles.copyright}>
            &copy; 2026 {company.nameEn} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
