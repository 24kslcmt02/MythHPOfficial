"use client";

import styles from "./CollectionMockup.module.css";
import { motion } from "framer-motion";

export default function CollectionMockup() {
  const collections = [
    { color: "#F5D623", member: "あいり", event: "定期公演 Vol.12", type: "ソロ", date: "2024.08.15", fav: true },
    { color: "#F472B6", member: "みさき", event: "夏フェス 2024", type: "2S", date: "2024.08.10", fav: true },
    { color: "#4AADE8", member: "ゆうな", event: "生誕祭", type: "ソロ", date: "2024.07.28", fav: false },
    { color: "#a78bfa", member: "さくら", event: "定期公演 Vol.11", type: "特典", date: "2024.07.15", fav: true },
    { color: "#f97316", member: "あいり", event: "ワンマンライブ", type: "3S", date: "2024.07.01", fav: false },
    { color: "#14b8a6", member: "みさき", event: "夏フェス前夜祭", type: "ソロ", date: "2024.06.28", fav: true },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35 } }
  };

  return (
    <div className={styles.phone}>
      <div className={styles.notch} />
      <div className={styles.screen}>
        {/* Header */}
        <div className={styles.appHeader}>
          <div className={styles.appLogo}>My-th</div>
          <div className={styles.headerTitle}>コレクション</div>
          <div className={styles.headerBadge}>PRO</div>
        </div>

        {/* Stats Bar */}
        <div className={styles.statsBar}>
          <div className={styles.statItem}>
            <span className={styles.statVal}>48</span>
            <span className={styles.statLbl}>コレクション</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statVal}>12</span>
            <span className={styles.statLbl}>イベント</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statVal}>5</span>
            <span className={styles.statLbl}>推しメン</span>
          </div>
        </div>

        {/* Filter Row */}
        <div className={styles.filterRow}>
          <div className={`${styles.filterChip} ${styles.filterActive}`}>すべて</div>
          <div className={styles.filterChip}>チェキ</div>
          <div className={styles.filterChip}>チケット</div>
          <div className={styles.filterChip}>特典</div>
        </div>

        {/* Collection Cards */}
        <motion.div
          className={styles.cardList}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
        >
          {collections.map((c, i) => (
            <motion.div key={i} className={styles.collectionCard} variants={itemVariants}>
              <div
                className={styles.cardThumb}
                style={{ background: `linear-gradient(135deg, ${c.color}30, ${c.color}15)` }}
              >
                <div className={styles.thumbCircle} style={{ background: `${c.color}40` }} />
                <span className={styles.thumbType}>{c.type}</span>
              </div>
              <div className={styles.cardInfo}>
                <div className={styles.cardMember}>{c.member}</div>
                <div className={styles.cardEvent}>{c.event}</div>
                <div className={styles.cardDate}>{c.date}</div>
              </div>
              {c.fav && (
                <div className={styles.cardFav}>
                  <svg width="7" height="7" viewBox="0 0 7 7" fill="#ef4444">
                    <path d="M3.5 6.5L0.6 3.5C-0.3 2.6-0.3 1.0 0.6 0.1C1.2-0.5 2.1-0.3 2.7 0.1L3.5 1.0L4.3 0.1C4.9-0.3 5.8-0.5 6.4 0.1C7.3 1.0 7.3 2.6 6.4 3.5L3.5 6.5Z"/>
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

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
            <span>コレクション</span>
          </div>
        </div>
      </div>
    </div>
  );
}
