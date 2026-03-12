"use client";

import { useEffect, useRef } from "react";
import FeatureCard from "@/components/FeatureCard";
import StepFlow from "@/components/StepFlow";
import FAQ from "@/components/FAQ";
import AIChatBot from "@/components/AIChatBot";
import UserHomeMockup from "@/components/mockups/UserHomeMockup";
import UserChekiMockup from "@/components/mockups/UserChekiMockup";
import UserTicketMockup from "@/components/mockups/UserTicketMockup";
import UserPassMockup from "@/components/mockups/UserPassMockup";
import UserAlbumMockup from "@/components/mockups/UserAlbumMockup";
import styles from "../app/page.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import FlowingBackground from "@/components/FlowingBackground";

const features = [
  {
    title: "デジタルチェキ券",
    description: "紙チェキ券を廃止し、購入から使用までアプリで完結。QRコードで偽造・紛失リスクゼロ。限定チェキや抽選販売も対応。",
    accent: "primary",
    mockup: "cheki",
  },
  {
    title: "チケット購入",
    description: "公式チケットをアプリで一括購入。Bot対策で公平な販売を実現し、お目当て特典も自動で受け取れます。",
    accent: "secondary",
    mockup: "ticket",
  },
  {
    title: "入場特典",
    description: "会場受付でQR認証するだけ。デジタル入場特典がその場で即時付与。もう紙の特典券をなくす心配はありません。",
    accent: "pink",
    mockup: "pass",
  },
  {
    title: "デジタルアルバム",
    description: "撮影したチェキや入場特典はアプリ内のアルバム機能でいつでも見返すことができます。推し活の思い出を永久保存。",
    accent: "cyan",
    mockup: "album",
  },
];

const steps = [
  { title: "アプリをDL", description: "iOS / Android対応" },
  { title: "会員登録", description: "SNSアカウントで10秒登録" },
  { title: "チケット・チェキ券購入", description: "事前決済で当日スムーズ" },
  { title: "会場で使う", description: "QRコードを見せるだけ" },
];

const faqItems = [
  { question: "利用料はかかりますか？", answer: "アプリのダウンロードおよび基本機能の利用は無料です。チケットやチェキ券の購入時にのみ、設定された料金と所定の手数料（※決済システムによる）が発生します。" },
  { question: "スマホを持っていないと使えませんか？", answer: "原則としてスマートフォンアプリ（iOS/Android）でのご利用を前提としております。フィーチャーフォンには対応しておりません。" },
  { question: "購入したチェキ券のキャンセルはできますか？", answer: "イベント主催者の規定によります。基本的にはお客様都合によるキャンセル・返金は致しかねますが、イベント中止時などは自動で返金処理を行います。" },
];

const mockupMap = {
  cheki: UserChekiMockup,
  ticket: UserTicketMockup,
  pass: UserPassMockup,
  album: UserAlbumMockup,
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
              すべての体験
              <br />
              をつなぐ
              <br />
              <span className={styles.heroAccent}>アイドルOS</span>
            </motion.h1>
            <motion.p layoutId="hero-desc" variants={itemVariants} className={styles.heroDesc}>
              チェキ券・チケット・入場特典をアプリひとつで。
              <br />
              推し活をもっとスマートに、もっと楽しく。
            </motion.p>
            <motion.div variants={itemVariants} className={styles.heroBtns}>
              <a href="#download-ios" className="btn btn-primary">
                App Store
              </a>
              <a href="#download-android" className="btn btn-secondary">
                Google Play
              </a>
            </motion.div>
            <motion.button
              variants={itemVariants}
              onClick={() => {
                onViewModeChange('operator');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={styles.heroSwitch}
              style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', textAlign: 'left' }}
            >
              イベンター・運営の方はこちら →
            </motion.button>
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
              <UserHomeMockup />
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
                  <circle cx="10" cy="14" r="5" stroke="var(--color-primary)" strokeWidth="2" fill="none"/>
                  <circle cx="18" cy="14" r="5" stroke="var(--color-secondary)" strokeWidth="2" fill="none"/>
                  <path d="M14 10.5V17.5" stroke="var(--color-primary)" strokeWidth="1.5" opacity="0.5"/>
                </svg>
              </div>
              <h3>オールインワン統合</h3>
              <p>チェキ券・チケット・物販・入場特典管理をMy-thに一元化</p>
            </div>
            <div className={styles.aboutCard}>
              <div className={styles.aboutIconWrap}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M14 4L17 11H24L18.5 15.5L20.5 23L14 18.5L7.5 23L9.5 15.5L4 11H11L14 4Z" stroke="var(--color-primary)" strokeWidth="1.5" fill="var(--color-primary-subtle)" strokeLinejoin="round"/>
                  <circle cx="14" cy="14" r="3" fill="var(--color-primary)" opacity="0.3"/>
                </svg>
              </div>
              <h3>スマートな体験</h3>
              <p>スマホひとつで購入から入場まで、すべてがシームレスに</p>
            </div>
            <div className={styles.aboutCard}>
              <div className={styles.aboutIconWrap}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="5" y="7" width="18" height="14" rx="3" stroke="var(--color-primary)" strokeWidth="1.5" fill="none"/>
                  <rect x="8" y="10" width="5" height="5" rx="1" fill="var(--color-secondary)" opacity="0.3"/>
                  <rect x="15" y="10" width="5" height="5" rx="1" fill="var(--color-primary)" opacity="0.3"/>
                  <rect x="8" y="16" width="12" height="1.5" rx="0.75" fill="var(--color-primary)" opacity="0.2"/>
                </svg>
              </div>
              <h3>データ資産化</h3>
              <p>チェキ券がデジタルアルバムに。推し活の思い出を永久保存</p>
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
            <p>推し活に必要なすべてが、ここに</p>
          </div>
          <div className={styles.featureGrid}>
            {features.map((f, i) => {
              const MockComponent = mockupMap[f.mockup];
              return (
                <FeatureCard key={i} title={f.title} description={f.description} accent={f.accent}>
                  {MockComponent && <MockComponent />}
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
            <a href="#app-store" className="btn btn-primary">App Store</a>
            <a href="#google-play" className="btn btn-secondary">Google Play</a>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
