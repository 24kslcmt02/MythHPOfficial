"use client";

import styles from "./UserAlbumMockup.module.css";
import { motion } from "framer-motion";

export default function UserAlbumMockup() {
  const photos = [
    { color: "#F5D623", label: "ソロ", fav: true },
    { color: "#F472B6", label: "2S", fav: false },
    { color: "#4AADE8", label: "特典", fav: true },
    { color: "#a78bfa", label: "ソロ", fav: false },
    { color: "#f97316", label: "3S", fav: true },
    { color: "#14b8a6", label: "特典", fav: false },
    { color: "#e879f9", label: "ソロ", fav: false },
    { color: "#facc15", label: "2S", fav: true },
    { color: "#38bdf8", label: "ソロ", fav: false },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
  };

  return (
    <div className={styles.phone}>
      <div className={styles.notch} />
      <div className={styles.screen}>
        {/* Header */}
        <div className={styles.appHeader}>
          <div className={styles.appLogo}>My-th</div>
          <div className={styles.headerTitle}>アルバム</div>
          <div className={styles.headerCount}>32枚</div>
        </div>

        {/* Filter Row */}
        <div className={styles.filterRow}>
          <div className={`${styles.filterChip} ${styles.filterActive}`}>すべて</div>
          <div className={styles.filterChip}>チェキ</div>
          <div className={styles.filterChip}>入場特典</div>
          <div className={styles.filterChip}>❤️</div>
        </div>

        {/* Event Label */}
        <div className={styles.eventLabel}>
          <span className={styles.eventName}>夏の定期公演 Vol.12</span>
          <span className={styles.eventDate}>2024.08.15</span>
        </div>

        {/* Photo Grid */}
        <motion.div
          className={styles.photoGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
        >
          {photos.map((p, i) => (
            <motion.div key={i} className={styles.photoCell} variants={itemVariants}>
              <div className={styles.photoThumb} style={{
                background: `linear-gradient(135deg, ${p.color}40, ${p.color}20)`
              }}>
                <div className={styles.photoIcon} style={{ background: p.color, opacity: 0.25 }} />
                <div className={styles.photoType}>{p.label}</div>
              </div>
              {p.fav && (
                <div className={styles.favBadge}>
                  <svg width="6" height="6" viewBox="0 0 6 6" fill="#ef4444">
                    <path d="M3 5.5L0.5 3C-0.3 2.2-0.3 0.8 0.5 0.0C1.0-0.5 1.8-0.3 2.3 0.0L3 0.8L3.7 0.0C4.2-0.3 5.0-0.5 5.5 0.0C6.3 0.8 6.3 2.2 5.5 3L3 5.5Z"/>
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Row */}
        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <span className={styles.statVal}>24</span>
            <span className={styles.statLbl}>チェキ</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statVal}>8</span>
            <span className={styles.statLbl}>入場特典</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statVal}>6</span>
            <span className={styles.statLbl}>イベント</span>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className={styles.bottomNav}>
          <div className={styles.navItem}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 5.5L7 1.5L12 5.5V12H9V8.5H5V12H2V5.5Z" fill="#aaa" stroke="#aaa" strokeWidth="0.8"/></svg>
            <span>ホーム</span>
          </div>
          <div className={styles.navItem}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="3" width="10" height="8" rx="1.5" fill="none" stroke="#aaa" strokeWidth="0.8"/><path d="M2 6H12" stroke="#aaa" strokeWidth="0.8"/></svg>
            <span>チケット</span>
          </div>
          <div className={styles.navItem}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="1" width="10" height="12" rx="1.5" fill="none" stroke="#aaa" strokeWidth="0.8"/><circle cx="7" cy="6" r="2" fill="#aaa" opacity="0.3"/></svg>
            <span>チェキ</span>
          </div>
          <div className={`${styles.navItem} ${styles.navActive}`}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5" height="5" rx="0.5" fill="#4AADE8" opacity="0.5"/><rect x="8" y="1" width="5" height="5" rx="0.5" fill="#4AADE8" opacity="0.5"/><rect x="1" y="8" width="5" height="5" rx="0.5" fill="#4AADE8" opacity="0.5"/><rect x="8" y="8" width="5" height="5" rx="0.5" fill="#4AADE8" opacity="0.5"/></svg>
            <span>アルバム</span>
          </div>
        </div>
      </div>
    </div>
  );
}
