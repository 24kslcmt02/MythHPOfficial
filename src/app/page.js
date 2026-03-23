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

  return (
    <>
      <Header variant={viewMode} onViewModeChange={setViewMode} />
      <main style={{ minHeight: '100vh', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          {viewMode === "user" && (
            <UserView key="user" onViewModeChange={setViewMode} />
          )}
          {viewMode === "operator" && (
            <OperatorView key="operator" onViewModeChange={setViewMode} />
          )}
        </AnimatePresence>
      </main>
      <Footer variant={viewMode} onViewModeChange={setViewMode} />
    </>
  );
}
