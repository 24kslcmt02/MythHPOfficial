"use client";

import styles from "./AdminGhostCollage.module.css";
import AnalyticsMockup from "@/components/mockups/AnalyticsMockup";
import EventCreateMockup from "@/components/mockups/EventCreateMockup";
import TicketMockup from "@/components/mockups/TicketMockup";

/**
 * 運営者向けヒーローの背景コラージュ。
 * 画像ではなく自前のCSSモック（売上管理／イベント編集＋AI入力／チケット販売設定）を
 * ライブレンダリングで斜めに敷き、白ワッシュ越しに「どんな管理画面か」を透かせる。
 * 装飾専用: aria-hidden＋pointer-events:none。可読性はワッシュ側で担保する。
 */
export default function AdminGhostCollage() {
  return (
    <div className={styles.collage} aria-hidden="true">
      <div className={`${styles.layer} ${styles.layerAnalytics}`}>
        <AnalyticsMockup />
      </div>
      <div className={`${styles.layer} ${styles.layerEventCreate}`}>
        <EventCreateMockup />
      </div>
      <div className={`${styles.layer} ${styles.layerTicket}`}>
        <TicketMockup />
      </div>
      <div className={styles.wash} />
    </div>
  );
}
