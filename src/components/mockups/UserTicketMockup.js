"use client";

import styles from "./UserTicketMockup.module.css";
import { motion } from "framer-motion";

export default function UserTicketMockup() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } }
  };

  return (
    <div className={styles.phone}>
      <div className={styles.notch} />
      <div className={styles.screen}>
        {/* App Header */}
        <div className={styles.appHeader}>
          <div className={styles.backBtn}>←</div>
          <div className={styles.headerTitle}>チケット購入</div>
          <div className={styles.cartIcon}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1H2.5L4 8.5H9.5L11 3H3.5" stroke="#333" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="5" cy="10.5" r="0.8" fill="#333"/>
              <circle cx="9" cy="10.5" r="0.8" fill="#333"/>
            </svg>
          </div>
        </div>

        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
        >
          {/* Event Card */}
          <motion.div className={styles.eventCard} variants={itemVariants}>
            <div className={styles.eventBanner}>
              <div className={styles.bannerGradient}>
                <div className={styles.eventDate}>2024.08.15 (木)</div>
                <div className={styles.eventName}>夏の定期公演 Vol.12</div>
                <div className={styles.eventVenue}>📍 渋谷CLUB QUATTRO</div>
              </div>
            </div>
            <div className={styles.eventMeta}>
              <span className={styles.metaTag}>OPEN 17:30</span>
              <span className={styles.metaTag}>START 18:00</span>
            </div>
          </motion.div>

          {/* Ticket Types */}
          <motion.div className={styles.sectionLabel} variants={itemVariants}>チケット種別</motion.div>

          <motion.div className={styles.ticketOption} variants={itemVariants}>
            <div className={`${styles.optionRadio} ${styles.selected}`} />
            <div className={styles.optionInfo}>
              <div className={styles.optionName}>一般チケット</div>
              <div className={styles.optionDesc}>スタンディング・入場順整理番号制</div>
            </div>
            <div className={styles.optionPrice}>¥3,500</div>
          </motion.div>

          <motion.div className={styles.ticketOption} variants={itemVariants}>
            <div className={styles.optionRadio} />
            <div className={styles.optionInfo}>
              <div className={styles.optionName}>VIPチケット</div>
              <div className={styles.optionDesc}>最前列確約・特典チェキ1枚付</div>
            </div>
            <div className={styles.optionPrice}>¥8,000</div>
          </motion.div>

          {/* Quantity */}
          <motion.div className={styles.qtyRow} variants={itemVariants}>
            <span className={styles.qtyLabel}>数量</span>
            <div className={styles.qtyControl}>
              <button className={styles.qtyBtn}>−</button>
              <span className={styles.qtyValue}>1</span>
              <button className={styles.qtyBtn}>+</button>
            </div>
          </motion.div>

          {/* Security Badge */}
          <motion.div className={styles.securityBadge} variants={itemVariants}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 0.5L9 2.5V5C9 7.5 7 9 5 9.5C3 9 1 7.5 1 5V2.5L5 0.5Z" fill="#dcfce7" stroke="#16a34a" strokeWidth="0.5"/>
              <path d="M3.5 5L4.5 6L6.5 4" stroke="#16a34a" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Bot対策・本人認証済み</span>
          </motion.div>

          {/* Purchase Button */}
          <motion.div className={styles.purchaseBtn} variants={itemVariants}>
            購入手続きへ ¥3,500
          </motion.div>
        </motion.div>

        {/* Bottom Navigation */}
        <div className={styles.bottomNav}>
          <div className={styles.navItem}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 5.5L7 1.5L12 5.5V12H9V8.5H5V12H2V5.5Z" fill="#aaa" stroke="#aaa" strokeWidth="0.8"/></svg>
            <span>ホーム</span>
          </div>
          <div className={`${styles.navItem} ${styles.navActive}`}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="3" width="10" height="8" rx="1.5" fill="none" stroke="#4AADE8" strokeWidth="0.8"/><path d="M2 6H12" stroke="#4AADE8" strokeWidth="0.8"/></svg>
            <span>チケット</span>
          </div>
          <div className={styles.navItem}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="1" width="10" height="12" rx="1.5" fill="none" stroke="#aaa" strokeWidth="0.8"/><circle cx="7" cy="6" r="2" fill="#aaa" opacity="0.3"/></svg>
            <span>チェキ</span>
          </div>
          <div className={styles.navItem}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5" height="5" rx="0.5" fill="#aaa" opacity="0.5"/><rect x="8" y="1" width="5" height="5" rx="0.5" fill="#aaa" opacity="0.5"/><rect x="1" y="8" width="5" height="5" rx="0.5" fill="#aaa" opacity="0.5"/><rect x="8" y="8" width="5" height="5" rx="0.5" fill="#aaa" opacity="0.5"/></svg>
            <span>アルバム</span>
          </div>
        </div>
      </div>
    </div>
  );
}
