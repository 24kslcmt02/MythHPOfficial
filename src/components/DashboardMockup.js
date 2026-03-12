import styles from './DashboardMockup.module.css';
import { motion } from 'framer-motion';

export default function DashboardMockup() {
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
        <div className={styles.sidebarLogo}></div>
        <div className={styles.sidebarMenu}>
          <div className={`${styles.menuItem} ${styles.active}`}></div>
          <div className={styles.menuItem}></div>
          <div className={styles.menuItem}></div>
          <div className={styles.menuItem}></div>
          <div className={styles.menuItem}></div>
        </div>
      </div>

      {/* Main Content Mockup */}
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.breadcrumb}>ダッシュボード</div>
          <div className={styles.userAvatar}></div>
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
              {[1, 2, 3].map(i => (
                <div key={i} className={styles.eventRow}>
                  <div className={styles.eventIcon}></div>
                  <div className={styles.eventDetails}>
                    <div className={styles.eventName}></div>
                    <div className={styles.eventMeta}></div>
                  </div>
                  <div className={styles.eventStatus}></div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
