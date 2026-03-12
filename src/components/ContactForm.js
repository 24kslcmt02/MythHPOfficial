"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";
import { motion } from "framer-motion";
import { Send, Building2, User, Mail, Phone, MessageSquare } from "lucide-react";

const INQUIRY_TYPES = [
  { value: "", label: "選択してください" },
  { value: "introduction", label: "導入のご相談" },
  { value: "document", label: "資料請求" },
  { value: "demo", label: "デモのご依頼" },
  { value: "other", label: "その他" },
];

export default function ContactForm() {
  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.companyName.trim()) errs.companyName = "団体名を入力してください";
    if (!form.contactName.trim()) errs.contactName = "ご担当者名を入力してください";
    if (!form.email.trim()) {
      errs.email = "メールアドレスを入力してください";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "正しいメールアドレスを入力してください";
    }
    if (!form.inquiryType) errs.inquiryType = "お問い合わせ種別を選択してください";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
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

    // Build mailto body
    const inquiryLabel = INQUIRY_TYPES.find((t) => t.value === form.inquiryType)?.label || "";
    const body = [
      `【団体名・事務所名】${form.companyName}`,
      `【ご担当者名】${form.contactName}`,
      `【メールアドレス】${form.email}`,
      form.phone ? `【電話番号】${form.phone}` : "",
      `【お問い合わせ種別】${inquiryLabel}`,
      form.message ? `\n【メッセージ】\n${form.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const subject = encodeURIComponent(`[My-th] ${inquiryLabel} — ${form.companyName}`);
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
        <div className={styles.successIcon}>✅</div>
        <h3>メーラーが開きました</h3>
        <p>
          お使いのメールアプリから送信してください。<br />
          内容を確認後、担当者が2営業日以内にご連絡いたします。
        </p>
        <button
          className={styles.resetBtn}
          onClick={() => {
            setSubmitted(false);
            setForm({
              companyName: "",
              contactName: "",
              email: "",
              phone: "",
              inquiryType: "",
              message: "",
            });
          }}
        >
          新しいお問い合わせ
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
      {/* Row 1: Company + Contact */}
      <div className={styles.row}>
        <motion.div className={styles.field} variants={itemVariants}>
          <label className={styles.label}>
            <Building2 size={14} className={styles.labelIcon} />
            団体名・事務所名 <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            placeholder="例：株式会社スターライト"
            className={`${styles.input} ${errors.companyName ? styles.inputError : ""}`}
          />
          {errors.companyName && <span className={styles.error}>{errors.companyName}</span>}
        </motion.div>

        <motion.div className={styles.field} variants={itemVariants}>
          <label className={styles.label}>
            <User size={14} className={styles.labelIcon} />
            ご担当者名 <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            name="contactName"
            value={form.contactName}
            onChange={handleChange}
            placeholder="例：田中 太郎"
            className={`${styles.input} ${errors.contactName ? styles.inputError : ""}`}
          />
          {errors.contactName && <span className={styles.error}>{errors.contactName}</span>}
        </motion.div>
      </div>

      {/* Row 2: Email + Phone */}
      <div className={styles.row}>
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
            placeholder="example@company.co.jp"
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </motion.div>

        <motion.div className={styles.field} variants={itemVariants}>
          <label className={styles.label}>
            <Phone size={14} className={styles.labelIcon} />
            電話番号
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="03-1234-5678"
            className={styles.input}
          />
        </motion.div>
      </div>

      {/* Row 3: Inquiry Type */}
      <motion.div className={styles.field} variants={itemVariants}>
        <label className={styles.label}>
          <MessageSquare size={14} className={styles.labelIcon} />
          お問い合わせ種別 <span className={styles.required}>*</span>
        </label>
        <select
          name="inquiryType"
          value={form.inquiryType}
          onChange={handleChange}
          className={`${styles.select} ${errors.inquiryType ? styles.inputError : ""}`}
        >
          {INQUIRY_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.inquiryType && <span className={styles.error}>{errors.inquiryType}</span>}
      </motion.div>

      {/* Row 4: Message */}
      <motion.div className={styles.field} variants={itemVariants}>
        <label className={styles.label}>
          メッセージ（任意）
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="ご質問やご要望があればお気軽にお書きください"
          className={styles.textarea}
          rows={4}
        />
      </motion.div>

      {/* Submit */}
      <motion.div className={styles.submitWrap} variants={itemVariants}>
        <button type="submit" className={styles.submitBtn}>
          <Send size={16} />
          お問い合わせを送信
        </button>
        <p className={styles.note}>
          ※ お使いのメールアプリが起動します。内容を確認の上、送信してください。
        </p>
      </motion.div>
    </motion.form>
  );
}
