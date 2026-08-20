import styles from "./EventCreateMockup.module.css";
import { Sparkles, ArrowRight, Link2 } from "lucide-react";

/**
 * イベント作成画面のCSSモック。
 * 「メモを貼り付ける → AIがイベント情報を下書き → カスタムURLを設定」の流れを表現する。
 * 表示内容はモックアップ用のダミーデータ（実在のイベントではない）。
 */
export default function EventCreateMockup() {
  return (
    <div className={styles.window}>
      <div className={styles.topbar}>
        <span className={styles.title}>イベント作成</span>
        <span className={styles.aiBadge}>
          <Sparkles size={12} strokeWidth={2.2} aria-hidden="true" />
          AI入力
        </span>
      </div>

      <div className={styles.body}>
        <div className={styles.memoPane}>
          <div className={styles.paneLabel}>X告知文・メモを貼り付け</div>
          <p className={styles.memoText}>
            9/23(水) 定期公演 Vol.3
            <br />
            開場17:30 / 開演18:00
            <br />
            前売 2,000円 先着
          </p>
        </div>

        <div className={styles.arrow} aria-hidden="true">
          <ArrowRight size={16} strokeWidth={2.2} />
        </div>

        <div className={styles.formPane}>
          <div className={styles.paneLabel}>AIが下書きを生成</div>
          <dl className={styles.fields}>
            <div className={styles.fieldRow}>
              <dt>イベント名</dt>
              <dd>定期公演 Vol.3</dd>
            </div>
            <div className={styles.fieldRow}>
              <dt>開催日</dt>
              <dd>2026.09.23（水）</dd>
            </div>
            <div className={styles.fieldRow}>
              <dt>開場 / 開演</dt>
              <dd>17:30 / 18:00</dd>
            </div>
            <div className={styles.fieldRow}>
              <dt>チケット</dt>
              <dd>前売 ¥2,000（先着）</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* AIが抽出した販売窓（実画面のプレビューマトリクスに準拠。当日券は自動追加される） */}
      <div className={styles.ticketRow}>
        <span className={styles.paneLabel}>チケット抽出</span>
        <span className={`${styles.ticketPill} ${styles.pillLottery}`}>抽選 先行抽選</span>
        <span className={`${styles.ticketPill} ${styles.pillFcfs}`}>先着 一般先着</span>
        <span className={`${styles.ticketPill} ${styles.pillDoor}`}>当日 当日券（自動追加）</span>
      </div>

      <div className={styles.urlBar}>
        <Link2 size={13} strokeWidth={2.2} aria-hidden="true" />
        <span className={styles.urlBase}>user.my-th.jp/tickets/event/</span>
        <span className={styles.urlSlug}>teiki-vol3</span>
        <span className={styles.urlNote}>カスタムURL</span>
      </div>
    </div>
  );
}
