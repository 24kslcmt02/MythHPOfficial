"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import StepFlow from "@/components/StepFlow";
import { Layers, Smartphone, Images, ArrowRight } from "lucide-react";
import FAQ from "@/components/FAQ";
import AIChatBot from "@/components/AIChatBot";
import InquiryForm from "@/components/contact/InquiryForm";
import { userFaq } from "@/content/faq/user";
import { organizerCommissionRate } from "@/config/site";
import { feesHref } from "@/config/routes";
import { publishedFaq } from "@/lib/faq.mjs";
import UserPassMockup from "@/components/mockups/UserPassMockup";
import styles from "../app/page.module.css";
import Image from "next/image";
import CharacterImage from "@/components/common/CharacterImage";
import { motion } from "framer-motion";
import FlowingBackground from "@/components/FlowingBackground";
import { makeViewContainer, itemFadeUp, sectionFadeUp, slideIn, blurIn, EASE_OUT } from "@/components/motion";

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

// FAQの本文は /faq と同じデータ（content/faq/user.js）を参照し、内容の食い違いを防ぐ
const faqItems = publishedFaq(userFaq).slice(0, 5);

// スクリーンショット画像マッピング
const screenshotMap = {
  cheki: { src: "/images/screenshots/screenshot-collection.webp", alt: "チェキ券コレクション画面" },
  ticket: { src: "/images/screenshots/screenshot-tickets.webp", alt: "チケットコレクション画面" },
  pass: null, // 入場特典は既存モックを維持（該当スクリーンショットなし）
  album: { src: "/images/screenshots/screenshot-cheki-detail.webp", alt: "デジタルアルバム詳細画面" },
};

const containerVariants = makeViewContainer({ stagger: 0.2, delay: 0.6 });
const itemVariants = itemFadeUp;
const sectionVariants = sectionFadeUp;

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
      {/* Hero — 濃紺ステージ×実機UI主役 */}
      <section className={styles.hero}>
        <FlowingBackground variant="btoc" />
        <div className={`container ${styles.heroInner}`}>
          <motion.div className={styles.heroContent} variants={containerVariants}>
            <motion.p layoutId="hero-label" variants={itemVariants} className={styles.heroLabel}>MY-TH OS V1.0</motion.p>
            <motion.h1 layoutId="hero-title" variants={itemVariants} className={styles.heroTitle}>
              すべての
              <br className="brSp" />
              体験を
              <br className="brPc" />
              つなぐ
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

          <motion.div className={styles.heroVisual} variants={blurIn}>
            <div className={styles.heroPhone}>
              <Image
                src="/images/screenshots/screenshot-home.webp"
                alt="My-th ホーム画面"
                width={647}
                height={1403}
                sizes="(max-width: 767px) 78vw, 380px"
                priority
                className={styles.screenshotImg}
              />
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
          <div className={styles.aboutLayout}>
            <div className={styles.aboutHeader}>
              <div className="section-header section-header--left">
                <span className="section-label">About</span>
                <h2>My-thとは</h2>
                <p>アイドル運営に必要な機能をひとつに統合した業界特化OSアプリ</p>
              </div>
              <motion.div
                className={styles.miniCharAbout}
                initial={{ opacity: 0, y: 20, rotate: -5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6, ease: EASE_OUT }}
              >
                <CharacterImage variant="mini" size={90} sizes="90px" className={styles.miniCharImg} />
              </motion.div>
            </div>
            <ul className={styles.aboutList}>
              <li className={styles.aboutItem}>
                <span className={styles.aboutIcon}><Layers size={24} strokeWidth={1.8} aria-hidden="true" /></span>
                <div>
                  <h3>オールインワン統合</h3>
                  <p>チェキ券・チケット・物販・入場特典管理をMy-thに一元化</p>
                </div>
              </li>
              <li className={styles.aboutItem}>
                <span className={styles.aboutIcon}><Smartphone size={24} strokeWidth={1.8} aria-hidden="true" /></span>
                <div>
                  <h3>スマートな体験</h3>
                  <p>スマホひとつで購入から入場まで、<span className="noBreak">すべて</span>がシームレスに</p>
                </div>
              </li>
              <li className={styles.aboutItem}>
                <span className={styles.aboutIcon}><Images size={24} strokeWidth={1.8} aria-hidden="true" /></span>
                <div>
                  <h3>データ資産化</h3>
                  <p>チェキ券がデジタルアルバムに。<span className="noBreak">推し活</span>の思い出を<span className="noBreak">永久保存</span></p>
                </div>
              </li>
            </ul>
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
          <div className={styles.showcase}>
            {features.map((f, i) => {
              const screenshot = screenshotMap[f.mockup];
              return (
                <motion.div
                  key={f.title}
                  className={`${styles.showcaseRow} ${i % 2 === 1 ? styles.showcaseRowReverse : ""}`}
                  variants={slideIn(i % 2 === 1 ? 48 : -48)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                >
                  <div className={styles.showcaseVisual}>
                    {screenshot ? (
                      <div className={styles.showcasePhone}>
                        <Image
                          src={screenshot.src}
                          alt={screenshot.alt}
                          width={647}
                          height={1403}
                          sizes="(max-width: 767px) 70vw, 280px"
                          className={styles.screenshotImg}
                        />
                      </div>
                    ) : (
                      <div className={styles.showcaseMockPanel}>
                        <UserPassMockup />
                      </div>
                    )}
                  </div>
                  <div className={styles.showcaseText}>
                    <h3>{f.title}</h3>
                    <p>{f.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* 手数料のシンプルさ（ファン向け）。数値は site.js から差し込む */}
          <div className={styles.feeStrip}>
            <p className={styles.feeStripText}>
              チケット代金のほかに、システム利用料・発券手数料などが上乗せされない設計です。
              <span className={styles.feeStripNote}>
                ※販売手数料{organizerCommissionRate}の負担（主催者・購入者）はイベントごとに設定されます
              </span>
            </p>
            <Link href={feesHref("user")} className={styles.feeStripLink}>
              手数料について
              <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Subscription Promo */}
      <motion.section
        className={`section ${styles.promo}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
      >
        <div className="container">
          <div className={styles.promoTicket}>
            <div className={styles.promoCardContent}>
              <span className={styles.promoLabel}>COLLECTION PLAN</span>
              <h3>チェキ券の新しい楽しみ方</h3>
              <p>
                「My-th Collection」では、紙チェキだけでなく月額制の新しいコレクション機能を提供しています。<br className="brPc"/>
                デジタルアルバムをもっと特別に残したい方はこちらから。
              </p>
              <Link href="/subscription" className="btn btn-primary" style={{ marginTop: 'var(--space-md)' }}>
                コレクション機能について詳しく見る
              </Link>
            </div>
            <div className={styles.promoDivider} aria-hidden="true" />
            <div className={styles.promoCardVisual}>
              <CharacterImage variant="subscriptionKv" size={260} sizes="260px" className={styles.promoKv} />
            </div>
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
          <div className={styles.faqMoreWrap}>
            <Link href="/faq" className={styles.faqMoreLink}>
              よくある質問をすべて見る
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </Link>
          </div>

          {/* Contact (FAQ内統合) */}
          <div id="contact" className={styles.faqContactBlock}>
            <div className={styles.faqContactHeader}>
              <span className="section-label">Contact</span>
              <h3>ご意見・ご感想を<br className="brSp" />お聞かせください</h3>
              <p>
                My-thをもっと良くするため、皆さまの声をお待ちしています。<br className="brPc" />
                お気軽にメッセージをお寄せください。
              </p>
            </div>
            <InquiryForm defaultType="user" showTypeSwitch={false} />
          </div>
        </div>
      </motion.section>

      {/* Download CTA */}
      {/* id="app": 運営者ページの「ファン向けアプリはこちら」（/#app）の着地点 */}
      <section id="app" className={styles.cta}>
        <div className={`container ${styles.ctaInner}`}>
          <motion.div
            className={styles.miniCharCta}
            initial={{ opacity: 0, x: 30, rotate: 5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7, ease: EASE_OUT }}
          >
            <CharacterImage variant="mini" size={120} sizes="120px" className={styles.miniCharImg} />
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
          <Link href="/subscription" className={styles.ctaSubLink}>
            コレクション機能について詳しく見る
            <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </motion.div>
  );
}
