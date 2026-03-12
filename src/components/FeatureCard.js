"use client";

import styles from "./FeatureCard.module.css";
import { motion } from "framer-motion";

export default function FeatureCard({ children, title, description, accent = "secondary" }) {
  return (
    <motion.div
      className={`${styles.card} ${styles[accent]}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children && (
        <div className={styles.mockArea}>
          <div className={styles.mockContent}>
            {children}
          </div>
        </div>
      )}
      <div className={styles.textArea}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </motion.div>
  );
}
