"use client";

import styles from "./DigitalPassMockup.module.css";
import { motion } from "framer-motion";

export default function DigitalPassMockup() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className={styles.container}>
      {/* Left: Admin Panel */}
      <div className={styles.adminPanel}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarLogo}>
            <div className={styles.logoIcon} />
            <div className={styles.logoText} />
          </div>
          <nav className={styles.sidebarNav}>
            <div className={styles.navItem} />
            <div className={styles.navItem} />
            <div className={styles.navItem} />
            <div className={`${styles.navItem} ${styles.navActive}`}>
              <div className={styles.navDot} />
              <div className={styles.navLabel}>入場特典</div>
            </div>
            <div className={styles.navItem} />
          </nav>
        </div>
        <div className={styles.adminMain}>
          <div className={styles.adminHeader}>
            <div className={styles.headerTitle}>特典管理</div>
          </div>
          <motion.div
            className={styles.adminContent}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
          >
            {/* Design Preview */}
            <motion.div className={styles.designCard} variants={itemVariants}>
              <div className={styles.designLabel}>特典デザイン</div>
              <div className={styles.designPreview}>
                <div className={styles.previewGradient}>
                  <div className={styles.previewLogo} />
                  <div className={styles.previewText}>限定チェキ券</div>
                  <div className={styles.previewSubtext}>2024 夏の定期公演</div>
                </div>
              </div>
            </motion.div>
            {/* Distribution Stats */}
            <motion.div className={styles.distStats} variants={itemVariants}>
              <div className={styles.distItem}>
                <span className={styles.distLabel}>配布済み</span>
                <span className={styles.distValue}>324</span>
              </div>
              <div className={styles.distItem}>
                <span className={styles.distLabel}>未使用</span>
                <span className={`${styles.distValue} ${styles.activeVal}`}>89</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Right: Phone Preview */}
      <motion.div
        className={styles.phoneFrame}
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-30px" }}
      >
        <div className={styles.phoneNotch} />
        <div className={styles.phoneScreen}>
          {/* User Pass View */}
          <div className={styles.passHeader}>
            <div className={styles.passLogo}>My-th</div>
          </div>
          <div className={styles.passCard}>
            <div className={styles.passGradient}>
              <div className={styles.passEventName}>夏の定期公演 Vol.12</div>
              <div className={styles.passType}>入場特典券</div>
              <div className={styles.passQr}>
                <div className={styles.qrBlock} />
              </div>
              <div className={styles.passBadge}>✓ 有効</div>
            </div>
          </div>
          <div className={styles.passInfo}>
            <div className={styles.passInfoRow}>
              <span>日時</span>
              <span>2024/08/15 18:00</span>
            </div>
            <div className={styles.passInfoRow}>
              <span>特典内容</span>
              <span>限定チェキ券</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
