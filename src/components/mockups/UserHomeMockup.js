"use client";

import styles from "./UserHomeMockup.module.css";
import { motion } from "framer-motion";

export default function UserHomeMockup() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  const quickActions = [
    {
      label: "チケット",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="5" width="16" height="10" rx="2" fill="#4AADE8" opacity="0.15" stroke="#4AADE8" strokeWidth="1" />
          <path d="M2 9H18" stroke="#4AADE8" strokeWidth="0.6" opacity="0.5" />
          <rect x="4" y="11" width="5" height="1.5" rx="0.5" fill="#4AADE8" opacity="0.4" />
        </svg>
      ),
      count: "2枚",
      color: "#4AADE8",
    },
    {
      label: "チェキ",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="2" width="14" height="16" rx="2" fill="#F5D623" opacity="0.15" stroke="#F5D623" strokeWidth="1" />
          <circle cx="10" cy="8.5" r="3" fill="#F5D623" opacity="0.2" stroke="#F5D623" strokeWidth="0.8" />
          <rect x="6" y="14" width="8" height="1.5" rx="0.5" fill="#F5D623" opacity="0.4" />
        </svg>
      ),
      count: "5枚",
      color: "#F5D623",
    },
    {
      label: "入場パス",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="4" width="14" height="12" rx="2" fill="#10B981" opacity="0.15" stroke="#10B981" strokeWidth="1" />
          <path d="M7 8L9 10L13 6" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="5" y="12" width="10" height="1.5" rx="0.5" fill="#10B981" opacity="0.3" />
        </svg>
      ),
      count: "1件",
      color: "#10B981",
    },
    {
      label: "アルバム",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="3" width="7" height="7" rx="1.5" fill="#A78BFA" opacity="0.2" stroke="#A78BFA" strokeWidth="0.8" />
          <rect x="11" y="3" width="7" height="7" rx="1.5" fill="#A78BFA" opacity="0.2" stroke="#A78BFA" strokeWidth="0.8" />
          <rect x="2" y="12" width="7" height="5.5" rx="1.5" fill="#A78BFA" opacity="0.2" stroke="#A78BFA" strokeWidth="0.8" />
          <rect x="11" y="12" width="7" height="5.5" rx="1.5" fill="#A78BFA" opacity="0.2" stroke="#A78BFA" strokeWidth="0.8" />
        </svg>
      ),
      count: "12枚",
      color: "#A78BFA",
    },
  ];

  const upcomingEvents = [
    {
      title: "夏の定期公演 Vol.8",
      date: "7月20日(土) 17:00",
      venue: "渋谷 CLUB QUATTRO",
      ticketStatus: "入場パス発行済",
      statusColor: "#10B981",
    },
    {
      title: "特別握手会＆チェキ会",
      date: "7月28日(日) 13:00",
      venue: "池袋 SUNSHINE CITY",
      ticketStatus: "チケット確保済",
      statusColor: "#4AADE8",
    },
  ];

  return (
    <div className={styles.phoneFrame}>
      <div className={styles.notch} />
      <div className={styles.screen}>
        {/* Status Bar */}
        <div className={styles.statusBar}>
          <span className={styles.time}>10:24</span>
          <div className={styles.statusIcons}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 8h1.5v2H1zM3.5 6h1.5v4H3.5zM6 4h1.5v6H6zM8.5 2h1.5v8h-1.5z" fill="#333" opacity="0.5" /></svg>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="3" width="8" height="6" rx="1" stroke="#333" strokeWidth="0.8" opacity="0.5" /><rect x="9" y="5" width="2" height="2" rx="0.5" fill="#333" opacity="0.5" /><rect x="2" y="4" width="5" height="4" rx="0.5" fill="#10B981" opacity="0.7" /></svg>
          </div>
        </div>

        {/* Greeting */}
        <motion.div
          className={styles.greeting}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
        >
          <motion.div className={styles.greetRow} variants={itemVariants}>
            <div>
              <div className={styles.greetText}>おかえり 👋</div>
              <div className={styles.userName}>マイちゃんファン</div>
            </div>
            <div className={styles.userAvatar}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="8" r="4" fill="#4AADE8" opacity="0.2" stroke="#4AADE8" strokeWidth="0.8" />
                <path d="M3 20c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="#4AADE8" opacity="0.15" stroke="#4AADE8" strokeWidth="0.8" />
              </svg>
            </div>
          </motion.div>
          <motion.div className={styles.groupBadge} variants={itemVariants}>
            <span className={styles.groupDot} />推し：マイス マイ / (My☆th)
          </motion.div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className={styles.quickActions}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
        >
          {quickActions.map((action, idx) => (
            <motion.div key={idx} className={styles.actionItem} variants={itemVariants}>
              <div className={styles.actionIcon}>{action.icon}</div>
              <div className={styles.actionLabel}>{action.label}</div>
              <div className={styles.actionCount} style={{ color: action.color }}>{action.count}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          className={styles.eventsSection}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
        >
          <motion.div className={styles.sectionTitle} variants={itemVariants}>
            <span>直近のイベント</span>
            <span className={styles.seeAll}>すべて →</span>
          </motion.div>
          {upcomingEvents.map((event, idx) => (
            <motion.div key={idx} className={styles.eventCard} variants={itemVariants}>
              <div className={styles.eventDateBadge}>
                <div className={styles.eventMonth}>{event.date.split("月")[0]}月</div>
                <div className={styles.eventDay}>{event.date.split("月")[1].split("日")[0]}</div>
              </div>
              <div className={styles.eventInfo}>
                <div className={styles.eventTitle}>{event.title}</div>
                <div className={styles.eventVenue}>{event.venue}</div>
                <div className={styles.eventStatus} style={{ color: event.statusColor }}>
                  {event.ticketStatus}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Tab Bar */}
        <div className={styles.tabBar}>
          <div className={`${styles.tabItem} ${styles.tabActive}`}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 6.5L8 2L14 6.5V14H10V10H6V14H2V6.5Z" fill="#4AADE8" stroke="#4AADE8" strokeWidth="0.8" />
            </svg>
            <span>ホーム</span>
          </div>
          <div className={styles.tabItem}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="3.5" width="12" height="9" rx="1.5" stroke="#aaa" strokeWidth="0.8" fill="none" />
              <path d="M2 7H14" stroke="#aaa" strokeWidth="0.6" />
            </svg>
            <span>チケット</span>
          </div>
          <div className={styles.tabItem}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2.5" y="1.5" width="11" height="13" rx="1.5" stroke="#aaa" strokeWidth="0.8" fill="none" />
              <circle cx="8" cy="7" r="2.5" stroke="#aaa" strokeWidth="0.7" fill="none" />
              <rect x="5" y="11.5" width="6" height="1" rx="0.5" fill="#aaa" opacity="0.5" />
            </svg>
            <span>チェキ</span>
          </div>
          <div className={styles.tabItem}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1" stroke="#aaa" strokeWidth="0.7" fill="none" />
              <rect x="9" y="1.5" width="5.5" height="5.5" rx="1" stroke="#aaa" strokeWidth="0.7" fill="none" />
              <rect x="1.5" y="9" width="5.5" height="5.5" rx="1" stroke="#aaa" strokeWidth="0.7" fill="none" />
              <rect x="9" y="9" width="5.5" height="5.5" rx="1" stroke="#aaa" strokeWidth="0.7" fill="none" />
            </svg>
            <span>アルバム</span>
          </div>
        </div>
      </div>
      <div className={styles.homeIndicator} />
    </div>
  );
}
