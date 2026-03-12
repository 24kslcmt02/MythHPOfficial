"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserView from "@/components/UserView";
import OperatorView from "@/components/OperatorView";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const [viewMode, setViewMode] = useState("user");
  const [loadPhase, setLoadPhase] = useState("logo");

  useEffect(() => {
    // Phase 1 (0 -> 1.5s): ロゴ画像の表示
    // Phase 2 (1.5s -> 2.3s): ロゴが拡大・発光しながら消え、ホワイトアウトする
    const timer1 = setTimeout(() => {
      setLoadPhase("whiteout");
    }, 1500);

    // Phase 3 (2.3s ~): ホワイトアウトが明け、メインコンテンツ（ステージ背景・UI）が現れる
    const timer2 = setTimeout(() => {
      setLoadPhase("reveal");
    }, 2300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {loadPhase !== "reveal" && (
          <motion.div
             key="splash"
             className={styles.splashScreen}
             initial={{ backgroundColor: "rgba(255,255,255,1)" }}
             animate={{ backgroundColor: "rgba(255,255,255,1)" }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.8, ease: "easeInOut" }}
             style={{
               position: "fixed", inset: 0, zIndex: 9999,
               display: "flex", alignItems: "center", justifyContent: "center",
               backgroundColor: "#ffffff"
             }}
          >
            <AnimatePresence>
              {loadPhase === "logo" && (
                <motion.div
                  key="logo-wrapper"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2, filter: "brightness(2) blur(10px)" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <Image
                    src="/images/logo.jpg"
                    alt="My-th Logo"
                    width={200}
                    height={200}
                    style={{ borderRadius: "40px", boxShadow: "0 20px 50px rgba(0,0,0,0.1)" }}
                    priority
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loadPhase === "reveal" ? 1 : 0 }}
        transition={{ duration: 0.1 }}
      >
        <Header variant={viewMode} onViewModeChange={setViewMode} />
        <main style={{ minHeight: '100vh', overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            {loadPhase === "reveal" && viewMode === "user" && (
              <UserView key="user" onViewModeChange={setViewMode} />
            )}
            {loadPhase === "reveal" && viewMode === "operator" && (
              <OperatorView key="operator" onViewModeChange={setViewMode} />
            )}
          </AnimatePresence>
        </main>
        <Footer variant={viewMode} onViewModeChange={setViewMode} />
      </motion.div>
    </>
  );
}
