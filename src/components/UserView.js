"use client";

import { useEffect, useRef } from "react";
import FeatureCard from "@/components/FeatureCard";
import StepFlow from "@/components/StepFlow";
import FAQ from "@/components/FAQ";
import AIChatBot from "@/components/AIChatBot";
import UserPassMockup from "@/components/mockups/UserPassMockup";
import styles from "../app/page.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import FlowingBackground from "@/components/FlowingBackground";

// ストアURL
const APP_STORE_URL = "https://apps.apple.com/jp/app/my-th/id6759365931";
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=jp.ms_capital.my_th";

const features = [
  {
    title: "デジタルチェキ券",
    description: <>紙チェキ券を廃止し、購入から使用まで<br className="brPc" />アプリで完結。<br className="brSp" />QRコードで偽造・紛失リスクゼロ。<br className="brPc" />限定チェキや抽選販売も対応。</>,
    accent: "primary",
    mockup: "cheki",
  },
  {
    title: "チケット購入",
    description: <>公式チケットをアプリで一括購入。<br className="brPc" />Bot対策で公平な販売を実現し、<br className="brSp" />お目当て特典も自動で受け取れます。</>,
    accent: "secondary",
    mockup: "ticket",
  },
  {
    title: "入場特典",
    description: <>会場受付でQR認証するだけ。<br className="brPc" />デジタル入場特典がその場で即時付与。<br className="brSp" />もう紙の特典券をなくす心配はありません。</>,
    accent: "pink",
    mockup: "pass",
  },
  {
    title: "デジタルアルバム",
    description: <>撮影したチェキや入場特典はアプリ内の<br className="brPc" />アルバム機能でいつでも見返すことができます。<br className="brSp" /><span className="noBreak">推し活</span>の思い出を<span className="noBreak">永久保存</span>。</>,
    accent: "cyan",
    mockup: "album",
  },
];

const steps = [
  { title: "アプリをDL", description: "iOS / Android対応" },
  { title: "会員登録", description: "メールアドレスで登録" },
  { title: "チケット・チェキ券購入", description: "事前決済で当日スムーズ" },
  { title: "会場で使う", description: "QRコードを見せるだけ" },
];

const faqItems = [
  { question: "利用料はかかりますか？", answer: "アプリのダウンロードおよび基本機能の利用は無料です。チケットやチェキ券の購入時にのみ、設定された料金と所定の手数料（※決済システムによる）が発生します。" },
  { question: "スマホを持っていないと使えませんか？", answer: "原則としてスマートフォンアプリ（iOS/Android）でのご利用を前提としております。フィーチャーフォンには対応しておりません。" },
  { question: "購入したチェキ券のキャンセルはできますか？", answer: "イベント主催者の規定によります。基本的にはお客様都合によるキャンセル・返金は致しかねますが、イベント中止時などは自動で返金処理を行います。" },
];

// スクリーンショット画像マッピング
const screenshotMap = {
  cheki: { src: "/images/screenshots/screenshot-collection.webp", alt: "チェキ券コレクション画面" },
  ticket: { src: "/images/screenshots/screenshot-tickets.webp", alt: "チケットコレクション画面" },
  pass: null, // 入場特典は既存モックを維持（該当スクリーンショットなし）
  album: { src: "/images/screenshots/screenshot-cheki-detail.webp", alt: "デジタルアルバム詳細画面" },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.6 }
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1, duration: 0.4 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

const characterVariants = {
  hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 1.2,
      duration: 1.0,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export default function UserView({ onViewModeChange }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.classList.add(styles.heroLoaded);
    }, 50);
    return () => {
      clearTimeout(timer);
      document.body.classList.remove(styles.heroLoaded);
    };
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Hero */}
      <section className={styles.hero}>
        <FlowingBackground variant="btoc" />
        <motion.div
          className={styles.stageBg}
          style={{ backgroundImage: 'url(/images/stage-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        />
        <div className={styles.stageOverlay} />

        <div className={`container ${styles.heroInner}`}>
          <motion.div className={styles.heroContent} variants={containerVariants}>
            <motion.p layoutId="hero-label" variants={itemVariants} className={styles.heroLabel}>MY-TH OS V1.0</motion.p>
            <motion.h1 layoutId="hero-title" variants={itemVariants} className={styles.heroTitle}>
              すべての
              <br className="brSp" />
              体験をつなぐ
              <br className="brSp" />
              <span className={`${styles.heroAccent} noBreak`}>アイドルOS</span>
            </motion.h1>
            <motion.p layoutId="hero-desc" variants={itemVariants} className={styles.heroDesc}>
              チケット・チェキ券・入場特典をMy-thで。<br />
              推し活をもっとスマートに、<br />
              もっと楽しく。
            </motion.p>
            <motion.div variants={itemVariants} className={styles.heroBtns}>
              <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className={styles.storeBadge}>
                <Image src="/images/badge-appstore.svg" alt="App Storeからダウンロード" width={150} height={50} unoptimized />
              </a>
              <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className={styles.storeBadge}>
                <Image src="/images/badge-googleplay.svg" alt="Google Playで手に入れよう" width={168} height={50} unoptimized />
              </a>
            </motion.div>

          </motion.div>

          <motion.div className={styles.heroVisualCenter} variants={characterVariants}>
            <div className={styles.characterWrap}>
              <Image
                src="/images/character.png"
                alt="My-th 広報キャラクター"
                width={700}
                height={900}
                priority
                unoptimized
                className={styles.characterImg}
              />
            </div>
          </motion.div>

          <motion.div className={styles.heroVisualRight} variants={itemVariants}>
            <div className={styles.smartphoneWrap}>
              <div className={styles.screenshotPhone}>
                <Image
                  src="/images/screenshots/screenshot-home.webp"
                  alt="My-th ホーム画面"
                  width={324}
                  height={702}
                  unoptimized
                  className={styles.screenshotImg}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <motion.section
        className={`section ${styles.about}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
      >
        <div className="container">
          <div className={styles.sectionHeaderWithMascot}>
            <div className="section-header">
              <span className="section-label">About</span>
              <h2>My-thとは</h2>
              <p>アイドル運営に必要な機能をひとつに統合した業界特化OSアプリ</p>
            </div>
            <motion.div
              className={styles.miniCharAbout}
              initial={{ opacity: 0, y: 20, rotate: -5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src="/images/character_mini.png" alt="" width={90} height={90} unoptimized className={styles.miniCharImg} />
            </motion.div>
          </div>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutCard}>
              <div className={styles.aboutIconWrap}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="10" cy="14" r="5" stroke="var(--color-primary)" strokeWidth="2" fill="none" />
                  <circle cx="18" cy="14" r="5" stroke="var(--color-secondary)" strokeWidth="2" fill="none" />
                  <path d="M14 10.5V17.5" stroke="var(--color-primary)" strokeWidth="1.5" opacity="0.5" />
                </svg>
              </div>
              <h3>オールインワン統合</h3>
              <p>チェキ券・チケット・物販・入場特典管理をMy-thに一元化</p>
            </div>
            <div className={styles.aboutCard}>
              <div className={styles.aboutIconWrap}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M14 4L17 11H24L18.5 15.5L20.5 23L14 18.5L7.5 23L9.5 15.5L4 11H11L14 4Z" stroke="var(--color-primary)" strokeWidth="1.5" fill="var(--color-primary-subtle)" strokeLinejoin="round" />
                  <circle cx="14" cy="14" r="3" fill="var(--color-primary)" opacity="0.3" />
                </svg>
              </div>
              <h3>スマートな体験</h3>
              <p>スマホひとつで購入から入場まで、<span className="noBreak">すべて</span>がシームレスに</p>
            </div>
            <div className={styles.aboutCard}>
              <div className={styles.aboutIconWrap}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="5" y="7" width="18" height="14" rx="3" stroke="var(--color-primary)" strokeWidth="1.5" fill="none" />
                  <rect x="8" y="10" width="5" height="5" rx="1" fill="var(--color-secondary)" opacity="0.3" />
                  <rect x="15" y="10" width="5" height="5" rx="1" fill="var(--color-primary)" opacity="0.3" />
                  <rect x="8" y="16" width="12" height="1.5" rx="0.75" fill="var(--color-primary)" opacity="0.2" />
                </svg>
              </div>
              <h3>データ資産化</h3>
              <p>チェキ券がデジタルアルバムに。<span className="noBreak">推し活</span>の思い出を<span className="noBreak">永久保存</span></p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section
        className={`section ${styles.features}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
      >
        <div className="container">
          <div className="section-header">
            <span className="section-label">Features</span>
            <h2>主な機能</h2>
            <p><span className="noBreak">推し活</span>に必要な<span className="noBreak">すべて</span>が、ここに</p>
          </div>
          <div className={styles.featureGrid}>
            {features.map((f, i) => {
              const screenshot = screenshotMap[f.mockup];
              return (
                <FeatureCard key={i} title={f.title} description={f.description} accent={f.accent}>
                  {screenshot ? (
                    <div className={styles.featureScreenshot}>
                      <Image
                        src={screenshot.src}
                        alt={screenshot.alt}
                        width={280}
                        height={607}
                        unoptimized
                        className={styles.screenshotImg}
                      />
                    </div>
                  ) : f.mockup === "pass" ? (
                    <UserPassMockup />
                  ) : null}
                </FeatureCard>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* How to Use */}
      <motion.section
        className={`section ${styles.howto}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
      >
        <div className="container">
          <div className="section-header">
            <span className="section-label">How to Use</span>
            <h2>使い方</h2>
            <p>かんたん4ステップで始められます</p>
          </div>
          <StepFlow steps={steps} />
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        className={`section ${styles.faq}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
      >
        <div className="container">
          <div className="section-header">
            <span className="section-label">FAQ</span>
            <h2>よくある質問</h2>
            <p>わからないことはAIガイドに気軽に聞いてみよう</p>
          </div>
          <div className={styles.faqChatWrap}>
            <AIChatBot compact />
          </div>
          <FAQ items={faqItems} />
        </div>
      </motion.section>

      {/* Download CTA */}
      <section className={styles.cta}>
        <div className={`container ${styles.ctaInner}`}>
          <motion.div
            className={styles.miniCharCta}
            initial={{ opacity: 0, x: 30, rotate: 5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src="/images/character_mini.png" alt="" width={120} height={120} unoptimized className={styles.miniCharImg} />
          </motion.div>
          <h2>My-thで、推し活をもっと自由に</h2>
          <p>今すぐダウンロードして、新しい体験を始めよう。</p>
          <div className={styles.ctaBtns}>
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className={styles.storeBadge}>
              <Image src="/images/badge-appstore.svg" alt="App Storeからダウンロード" width={150} height={50} unoptimized />
            </a>
            <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className={styles.storeBadge}>
              <Image src="/images/badge-googleplay.svg" alt="Google Playで手に入れよう" width={168} height={50} unoptimized />
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
