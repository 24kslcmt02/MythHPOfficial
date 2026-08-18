import { Info, AlertTriangle } from "lucide-react";
import styles from "./page.module.css";

/**
 * 補足・注意書きのブロック。
 * @param {{ tone?: "info"|"warn" }} props
 */
export default function Notice({ tone = "info", children }) {
  const Icon = tone === "warn" ? AlertTriangle : Info;
  return (
    <div className={`${styles.notice} ${tone === "warn" ? styles.noticeWarn : ""}`}>
      <Icon size={18} className={styles.noticeIcon} aria-hidden="true" />
      <div>{children}</div>
    </div>
  );
}
