import styles from './DashboardMockup.module.css';
import { motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';

export default function DashboardMockup() {
  const menuItems = ["ダッシュボード", "イベント", "チェキ券", "チケット", "売上管理"];

  // モックアップ用のダミーデータ（実在のイベント・数値ではない）
  const events = [
    { name: "定期公演 Vol.12", meta: "2026.09.01 · チケット販売中", status: "公開中", statusType: "live" },
    { name: "生誕祭スペシャル", meta: "2026.09.15 · チェキ券準備中", status: "準備中", statusType: "draft" },
    { name: "夏の対バンフェス", meta: "2026.08.10 · 集計完了", status: "終了", statusType: "done" },
  ];

  const stats = [
    { label: "今月の売上", value: "¥1,284,500", trend: "+12.4%", trendUp: true },
    { label: "動員数", value: "1,420人", trend: "+5.2%", trendUp: true },
    { label: "イベント", value: "8件", trend: "0%", trendUp: true },
    { label: "登録ユーザー", value: "4,285人", trend: "+18.1%", trendUp: true }
  ];

  const chartHeights = [40, 60, 45, 80, 50, 90, 70]; // Dummy heights for a bar chart

  // Framer Motion variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const barVariants = {
    hidden: { height: 0 },
    visible: height => ({
      height: `${height}%`,
      transition: { duration: 0.8, ease: "easeOut" }
    })
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar Mockup */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarLogo}>My-th</div>
        <div className={styles.sidebarMenu}>
          {menuItems.map((label, i) => (
            <div key={label} className={`${styles.menuItem} ${i === 0 ? styles.active : ""}`}>
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Mockup */}
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.breadcrumb}>ダッシュボード</div>
          <div className={styles.userAvatar}>M</div>
        </div>

        <motion.div 
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Top Stats */}
          <div className={styles.statsGrid}>
            {stats.map((stat, i) => (
              <motion.div key={i} className={styles.statCard} variants={itemVariants}>
                <div className={styles.statLabel}>{stat.label}</div>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={`${styles.statTrend} ${stat.trendUp ? styles.trendUp : styles.trendDown}`}>
                  {stat.trend}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chart Section */}
          <motion.div className={styles.chartCard} variants={itemVariants}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>売上レポート</div>
              <div className={styles.cardTabs}>
                <span className={styles.activeTab}>月次</span>
                <span>日次</span>
              </div>
            </div>
            <div className={styles.chartArea}>
              <div className={styles.yAxis}>
                <span>3M</span>
                <span>2M</span>
                <span>1M</span>
                <span>0</span>
              </div>
              <div className={styles.bars}>
                {chartHeights.map((h, i) => (
                  <motion.div 
                    key={i} 
                    className={styles.bar}
                    custom={h}
                    variants={barVariants}
                  ></motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bottom Lists - Events */}
          <motion.div className={styles.eventsCard} variants={itemVariants}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>最近のイベント</div>
            </div>
            <div className={styles.eventList}>
              {events.map((ev) => (
                <div key={ev.name} className={styles.eventRow}>
                  <div className={styles.eventIcon}>
                    <CalendarDays size={16} strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <div className={styles.eventDetails}>
                    <div className={styles.eventName}>{ev.name}</div>
                    <div className={styles.eventMeta}>{ev.meta}</div>
                  </div>
                  <div className={`${styles.eventStatus} ${styles[`status_${ev.statusType}`]}`}>
                    {ev.status}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
