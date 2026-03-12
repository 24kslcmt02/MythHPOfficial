"use client";

import styles from "./TicketMockup.module.css";
import { motion } from "framer-motion";

export default function TicketMockup() {
  const salesData = [
    { event: "夏の定期公演 Vol.12", type: "一般", qty: 48, price: "¥3,500", total: "¥168,000", status: "販売中" },
    { event: "夏の定期公演 Vol.12", type: "VIP", qty: 12, price: "¥8,000", total: "¥96,000", status: "残りわずか" },
    { event: "握手会 in 渋谷", type: "一般", qty: 120, price: "¥2,000", total: "¥240,000", status: "完売" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -6 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.35 } }
  };

  return (
    <div className={styles.container}>
      {/* Mini Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <div className={styles.logoIcon} />
          <div className={styles.logoText} />
        </div>
        <nav className={styles.sidebarNav}>
          <div className={styles.navItem} />
          <div className={styles.navItem} />
          <div className={`${styles.navItem} ${styles.navActive}`}>
            <div className={styles.navDot} />
            <div className={styles.navLabel}>販売設定</div>
          </div>
          <div className={styles.navItem} />
          <div className={styles.navItem} />
        </nav>
      </div>

      {/* Main Content */}
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>チケット販売</div>
          <div className={styles.headerBadge}>リアルタイム</div>
        </div>

        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
        >
          {/* Sales Summary */}
          <div className={styles.statsRow}>
            <div className={`${styles.statCard} ${styles.statBlue}`}>
              <span className={styles.statIcon}>💰</span>
              <div>
                <div className={styles.statLabel}>総売上</div>
                <div className={styles.statValue}>¥504,000</div>
              </div>
            </div>
            <div className={`${styles.statCard} ${styles.statGreen}`}>
              <span className={styles.statIcon}>🎫</span>
              <div>
                <div className={styles.statLabel}>販売枚数</div>
                <div className={styles.statValue}>180枚</div>
              </div>
            </div>
            <div className={`${styles.statCard} ${styles.statPurple}`}>
              <span className={styles.statIcon}>📊</span>
              <div>
                <div className={styles.statLabel}>平均単価</div>
                <div className={styles.statValue}>¥2,800</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className={styles.tabs}>
            <div className={`${styles.tab} ${styles.tabActive}`}>販売一覧</div>
            <div className={styles.tab}>分析</div>
          </div>

          {/* Table */}
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <span>イベント</span>
              <span>種別</span>
              <span>販売数</span>
              <span>売上</span>
              <span>状態</span>
            </div>
            {salesData.map((row, i) => (
              <motion.div key={i} className={styles.tableRow} variants={itemVariants}>
                <span className={styles.eventName}>{row.event}</span>
                <span>{row.type}</span>
                <span className={styles.qty}>{row.qty}</span>
                <span className={styles.total}>{row.total}</span>
                <span className={`${styles.statusBadge} ${
                  row.status === "完売" ? styles.soldOut :
                  row.status === "残りわずか" ? styles.almostOut :
                  styles.onSale
                }`}>{row.status}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
