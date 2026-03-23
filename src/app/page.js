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
    // Phase 2 (1.5s ~): ロゴが上に移動し、下部に選択ボタン(Entrance)が表示される
    const timer1 = setTimeout(() => {
      setLoadPhase("entrance");
    }, 1500);

    return () => clearTimeout(timer1);
  }, []);

  const handleEnter = (mode) => {
    setViewMode(mode);
    setLoadPhase("whiteout");
    setTimeout(() => {
      setLoadPhase("reveal");
    }, 800);
  };

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
               backgroundColor: "#ffffff",
               flexDirection: "column",
               gap: "2rem"
             }}
          >
            <AnimatePresence>
              {(loadPhase === "logo" || loadPhase === "entrance") && (
                <motion.div
                  key="logo-wrapper"
                  initial={{ opacity: 0, scale: 0.95, y: 0 }}
                  animate={{ opacity: 1, scale: 1, y: loadPhase === "entrance" ? -80 : 0 }}
                  exit={{ opacity: 0, scale: 1.2, filter: "brightness(2) blur(10px)" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                  <Image
                    src="/images/Mythlogo.svg"
                    alt="My-th Logo"
                    width={200}
                    height={200}
                    style={{ borderRadius: "40px", boxShadow: "0 20px 50px rgba(0,0,0,0.1)" }}
                    priority
                  />
                  
                  <AnimatePresence>
                    {loadPhase === "entrance" && (
                      <motion.div
                        key="entrance-buttons"
                        initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                        transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className={styles.entranceBtns}
                        style={{ position: "absolute", top: "100%", marginTop: "3rem" }}
                      >
                        <button className={styles.entranceBtnPrimary} onClick={() => handleEnter('user')}>
                          ホームページへ移動
                        </button>
                        <button className={styles.entranceBtnSecondary} onClick={() => handleEnter('operator')}>
                          運営・イベンター様<br />管理画面へ移動
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
