"use client";

import styles from "./AnalyticsMockup.module.css";
import { motion } from "framer-motion";

export default function AnalyticsMockup() {
  const stats = [
    { label: "総売上", value: "¥2,847,200", icon: "clock", color: "blue" },
    { label: "今月の売上", value: "¥486,300", icon: "calendar", color: "green" },
    { label: "今週の売上", value: "¥124,800", icon: "trend", color: "orange" },
    { label: "今日の売上", value: "¥32,500", icon: "dot", color: "purple" },
  ];

  const chartData = [35, 55, 42, 68, 52, 78, 45, 85, 62, 72, 58, 90];

  const tableRows = [
    { date: "03/12", product: "夏の定期公演チケット", group: "Star☆Light", type: "チケット", qty: 3, unit: "¥3,500", subtotal: "¥10,500", status: "確定" },
    { date: "03/12", product: "ソロチェキ券（桜井）", group: "Star☆Light", type: "チェキ", qty: 5, unit: "¥2,000", subtotal: "¥10,000", status: "確定" },
    { date: "03/11", product: "VIP入場券", group: "Star☆Light", type: "チケット", qty: 2, unit: "¥8,000", subtotal: "¥16,000", status: "処理中" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } }
  };

  const barVariants = {
    hidden: { height: 0 },
    visible: h => ({
      height: `${h}%`,
      transition: { duration: 0.6, ease: "easeOut" }
    })
  };

  return (
    <div className={styles.container}>
      {/* Sidebar — faithfully reproducing 添付B */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logoIcon} />
          <div className={styles.logoArea}>
            <div className={styles.logoTitle}>My-th Admin</div>
            <div className={styles.logoSub}>Artist Management</div>
          </div>
        </div>
        <nav className={styles.sidebarNav}>
          <div className={styles.navItem}>
            <div className={styles.navIconPlaceholder} />
            <span>ダッシュボード</span>
          </div>
          <div className={`${styles.navItem} ${styles.navActive}`}>
            <div className={styles.navIconPlaceholder} />
            <span>レポート</span>
            <div className={styles.navChevron}>▾</div>
          </div>
          <div className={styles.navSub}>
            <div className={`${styles.navSubItem} ${styles.subActive}`}>• 売上</div>
            <div className={styles.navSubItem}>• 動員</div>
          </div>
          <div className={styles.navItem}>
            <div className={styles.navIconPlaceholder} />
            <span>イベント管理</span>
          </div>
          <div className={styles.navItem}>
            <div className={styles.navIconPlaceholder} />
            <span>販売設定</span>
          </div>
          <div className={styles.navItem}>
            <div className={styles.navIconPlaceholder} />
            <span>グループ管理</span>
          </div>
        </nav>
      </div>

      {/* Main Content — 添付B layout */}
      <div className={styles.main}>
        <div className={styles.header}>
          <div>
            <div className={styles.headerTitle}>売上管理</div>
            <div className={styles.headerSub}>売上の確認・分析</div>
          </div>
          <div className={styles.headerBtn}>CSV出力</div>
        </div>

        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
        >
          {/* Stats Cards — 添付Bの4色カード配置を忠実に再現 */}
          <div className={styles.statsGrid}>
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className={`${styles.statCard} ${styles[stat.color]}`}
                variants={itemVariants}
              >
                <div className={styles.statTop}>
                  <span className={styles.statLabel}>{stat.label}</span>
                  <div className={`${styles.statDot} ${styles[`dot${stat.color}`]}`} />
                </div>
                <div className={styles.statValue}>{stat.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Tabs — チケット / 特典券 / 分析 */}
          <div className={styles.tabs}>
            <div className={`${styles.tab} ${styles.tabActive}`}>チケット</div>
            <div className={styles.tab}>特典券</div>
            <div className={styles.tab}>分析</div>
          </div>

          {/* Chart Inline */}
          <div className={styles.chartRow}>
            <div className={styles.chartBars}>
              {chartData.map((h, i) => (
                <motion.div
                  key={i}
                  className={styles.chartBar}
                  custom={h}
                  variants={barVariants}
                />
              ))}
            </div>
          </div>

          {/* Table */}
          <div className={styles.table}>
            <div className={styles.tableHead}>
              <span>日付</span>
              <span>商品名</span>
              <span>グループ</span>
              <span>種別</span>
              <span>数量</span>
              <span>小計</span>
              <span>状態</span>
            </div>
            {tableRows.map((row, i) => (
              <motion.div key={i} className={styles.tableRow} variants={itemVariants}>
                <span>{row.date}</span>
                <span className={styles.productName}>{row.product}</span>
                <span>{row.group}</span>
                <span>{row.type}</span>
                <span>{row.qty}</span>
                <span className={styles.subtotal}>{row.subtotal}</span>
                <span className={`${styles.badge} ${row.status === "確定" ? styles.confirmed : styles.processing}`}>
                  {row.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
