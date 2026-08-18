import styles from "./page.module.css";
import { contact } from "@/config/site";

/**
 * 情報が未確定のセクションに表示するプレースホルダ。
 *
 * 事実が確定していない内容をそのまま公開してしまわないための仕組み。
 * site.js の該当項目に値が入ると、各ページはこの表示から実データ表示へ自動的に切り替わる。
 *
 * @param {{ label: string, hint?: string }} props label 何の情報か / hint 開発者向けの確認事項
 */
export default function Pending({ label, hint }) {
  return (
    <div className={styles.pending}>
      <p>
        {label}は現在準備中です。お急ぎの場合は
        <a href={`mailto:${contact.email}`}> {contact.email} </a>
        までお問い合わせください。
      </p>
      {process.env.NODE_ENV !== "production" && hint && (
        <p className={styles.note}>【開発表示】確認事項: {hint}</p>
      )}
    </div>
  );
}
