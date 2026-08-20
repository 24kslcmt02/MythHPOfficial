import styles from './DashboardMockup.module.css';
import { motion } from 'framer-motion';
import { CalendarDays, CircleDollarSign, TrendingUp, Clock } from 'lucide-react';

export default function DashboardMockup() {
  // 実管理画面（アイドル運営管理）のメニュー構成に準拠
  const menuItems = ["ダッシュボード", "レポート", "イベント管理", "グループ管理", "販売設定"];

  // モックアップ用のダミーデータ（実在のイベント・数値ではない）
  const events = [
    { name: "定期公演 Vol.12", meta: "2026.09.01 18:30開演", status: "公開中", statusType: "live", bought: 128, entered: 112 },
    { name: "生誕祭スペシャル", meta: "2026.09.15 17:00開演", status: "準備中", statusType: "draft", bought: 64, entered: 0 },
    { name: "夏の対バンフェス", meta: "2026.08.10 12:00開演", status: "終了", statusType: "done", bought: 214, entered: 198 },
  ];

  // 実画面の売上管理と同じ4指標（総売上/今月/今週/今日）
  const stats = [
    { label: "総売上", value: "¥8,700,945", Icon: CircleDollarSign, tone: "blue" },
    { label: "今月の売上", value: "¥1,284,500", Icon: CalendarDays, tone: "green" },
    { label: "今週の売上", value: "¥248,300", Icon: TrendingUp, tone: "yellow" },
    { label: "今日の売上", value: "¥32,500", Icon: Clock, tone: "purple" },
  ];

  // 売上推移（折れ線）用のダミー系列
  const chartPoints = [6, 9, 7, 14, 10, 26, 12, 18, 15, 30, 22, 34];

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

  // 折れ線のSVGパス（viewBox 0 0 100 40）
  const maxV = Math.max(...chartPoints);
  const pts = chartPoints.map((v, i) => [
    (i / (chartPoints.length - 1)) * 100,
    38 - (v / maxV) * 34,
  ]);
  const linePath = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
  const areaPath = `${linePath} L100,40 L0,40 Z`;

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
            {stats.map(({ label, value, Icon, tone }) => (
              <motion.div key={label} className={styles.statCard} variants={itemVariants}>
                <div className={styles.statTop}>
                  <div className={styles.statLabel}>{label}</div>
                  <span className={`${styles.statChip} ${styles[`chip_${tone}`]}`}>
                    <Icon size={12} strokeWidth={2} aria-hidden="true" />
                  </span>
                </div>
                <div className={styles.statValue}>{value}</div>
              </motion.div>
            ))}
          </div>

          {/* Chart Section */}
          <motion.div className={styles.chartCard} variants={itemVariants}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>売上推移</div>
              <div className={styles.cardTabs}>
                <span className={styles.activeTab}>日別</span>
                <span>月別</span>
              </div>
            </div>
            <div className={styles.chartArea}>
              <div className={styles.yAxis}>
                <span>1.4M</span>
                <span>1M</span>
                <span>0.5M</span>
                <span>0</span>
              </div>
              <div className={styles.lineChart}>
                <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="dash-area" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-secondary)" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d={areaPath}
                    fill="url(#dash-area)"
                    stroke="none"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                  <motion.path
                    d={linePath}
                    fill="none"
                    stroke="var(--color-secondary)"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Bottom Lists - Events */}
          <motion.div className={styles.eventsCard} variants={itemVariants}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>出演イベントの動員</div>
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
                  <div className={styles.eventCounts}>
                    <span className={styles.eventCount}>
                      <em>{ev.bought}</em>購入
                    </span>
                    <span className={styles.eventCount}>
                      <em>{ev.entered}</em>入場
                    </span>
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
