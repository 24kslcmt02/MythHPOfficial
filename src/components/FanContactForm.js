"use client";

import { useState } from "react";
import styles from "./FanContactForm.module.css";
import { motion } from "framer-motion";
import { Send, User, Mail, MessageSquare, Heart } from "lucide-react";

const CATEGORIES = [
  { value: "", label: "選択してください" },
  { value: "feedback", label: "ご意見・ご感想" },
  { value: "bug", label: "不具合・エラー報告" },
  { value: "howto", label: "アプリの使い方について" },
  { value: "other", label: "その他" },
];

export default function FanContactForm() {
  const [form, setForm] = useState({
    nickname: "",
    email: "",
    category: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.nickname.trim()) errs.nickname = "お名前を入力してください";
    if (!form.email.trim()) {
      errs.email = "メールアドレスを入力してください";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "正しいメールアドレスを入力してください";
    }
    if (!form.category) errs.category = "カテゴリを選択してください";
    if (!form.message.trim()) {
      errs.message = "メッセージを入力してください";
    } else if (form.message.trim().length < 5) {
      errs.message = "メッセージは5文字以上でお書きください";
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const categoryLabel = CATEGORIES.find((c) => c.value === form.category)?.label || "";
    const body = [
      `【お名前】${form.nickname}`,
      `【メールアドレス】${form.email}`,
      `【カテゴリ】${categoryLabel}`,
      `\n【メッセージ】\n${form.message}`,
    ].join("\n");

    const subject = encodeURIComponent(`[My-th] ${categoryLabel} — ${form.nickname}`);
    const mailBody = encodeURIComponent(body);
    const mailto = `mailto:info@my-th.jp?subject=${subject}&body=${mailBody}`;

    window.open(mailto, "_blank");
    setSubmitted(true);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
  };

  if (submitted) {
    return (
      <motion.div
        className={styles.successCard}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.successIcon}>💌</div>
        <h3>メーラーが開きました</h3>
        <p>
          メッセージありがとうございます！<br />
          お使いのメールアプリから送信してください。
        </p>
        <button
          className={styles.resetBtn}
          onClick={() => {
            setSubmitted(false);
            setForm({
              nickname: "",
              email: "",
              category: "",
              message: "",
            });
          }}
        >
          新しいメッセージを書く
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      className={styles.form}
      onSubmit={handleSubmit}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      <motion.div className={styles.field} variants={itemVariants}>
        <label className={styles.label}>
          <User size={14} className={styles.labelIcon} />
          お名前 <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          name="nickname"
          value={form.nickname}
          onChange={handleChange}
          placeholder="例：マイス太郎"
          className={`${styles.input} ${errors.nickname ? styles.inputError : ""}`}
        />
        {errors.nickname && <span className={styles.error}>{errors.nickname}</span>}
      </motion.div>

      <motion.div className={styles.field} variants={itemVariants}>
        <label className={styles.label}>
          <Mail size={14} className={styles.labelIcon} />
          メールアドレス <span className={styles.required}>*</span>
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="example@email.com"
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </motion.div>

      <motion.div className={styles.field} variants={itemVariants}>
        <label className={styles.label}>
          <MessageSquare size={14} className={styles.labelIcon} />
          カテゴリ <span className={styles.required}>*</span>
        </label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className={`${styles.select} ${errors.category ? styles.inputError : ""}`}
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
        {errors.category && <span className={styles.error}>{errors.category}</span>}
      </motion.div>

      <motion.div className={styles.field} variants={itemVariants}>
        <label className={styles.label}>
          <Heart size={14} className={styles.labelIcon} />
          メッセージ <span className={styles.required}>*</span>
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="ご意見・ご感想・ご要望などお気軽にどうぞ"
          className={`${styles.textarea} ${errors.message ? styles.inputError : ""}`}
          rows={5}
        />
        {errors.message && <span className={styles.error}>{errors.message}</span>}
      </motion.div>

      <motion.div className={styles.submitWrap} variants={itemVariants}>
        <button type="submit" className={styles.submitBtn}>
          <Send size={16} />
          メッセージを送る
        </button>
        <p className={styles.note}>
          ※ お使いのメールアプリが起動します。内容を確認の上、送信してください。
        </p>
      </motion.div>
    </motion.form>
  );
}
