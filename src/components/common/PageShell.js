import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "./Breadcrumbs";
import styles from "./page.module.css";

/**
 * サブページ共通のレイアウト。
 * Header / パンくず / ヒーロー / 本文 / Footer をまとめる。
 *
 * @param {object} props
 * @param {"user"|"operator"} [props.variant] Header・Footer の表示モード
 * @param {string} props.eyebrow 見出しの上に置く英字ラベル
 * @param {string} props.title ページタイトル（h1）
 * @param {React.ReactNode} [props.lead] リード文
 * @param {{label: string, href?: string}[]} props.breadcrumbs
 */
export default function PageShell({
  variant = "user",
  eyebrow,
  title,
  lead,
  breadcrumbs = [],
  children,
}) {
  return (
    <>
      <Header variant={variant} />
      <main>
        <div className={styles.hero}>
          <div className="container">
            <div className={styles.heroInner}>
              <Breadcrumbs items={breadcrumbs} />
              {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
              <h1>{title}</h1>
              {lead && <p className={styles.lead}>{lead}</p>}
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <div className="container">{children}</div>
        </div>
      </main>
      <Footer variant={variant} />
    </>
  );
}
