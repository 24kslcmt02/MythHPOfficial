"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Send } from "lucide-react";
import styles from "./AIChatBot.module.css";

const PRESET_MESSAGES = [
  "チケットの買い方は？",
  "チェキ券はどう使うの？",
  "このアプリは無料？",
];

const FAQS = {
  "チケットの買い方は？": "アプリ内の「チケット」タブから、対象のイベントを選んで購入できます！事前決済で当日の入場もQRコードをかざすだけでスムーズです✨",
  "チェキ券はどう使うの？": "ライブ会場の物販や特典会エリアでスタッフに「チェキ券を使う」画面を見せてください。QRコードをスキャンするだけで完了します📸",
  "このアプリは無料？": "はい！ファンの方のアプリ利用（ダウンロード・会員登録）は完全無料です。チケットやチェキを購入する時だけ料金がかかります🙌",
  "default": "ご質問ありがとうございます！詳しい使い方や運営へのお問い合わせは、下の「イベンター・運営の方はこちら」メニューなどからご確認いただけます。一緒に推し活を楽しみましょう！🎉"
};

/**
 * @param {boolean} compact — true: card-style for FAQ section (no phone frame)
 */
export default function AIChatBot({ compact = false }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "こんにちは！My-th AIガイドです✨ 何かお手伝いできることはありますか？" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatAreaRef = useRef(null);

  const scrollToBottom = () => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTo({
        top: chatAreaRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text) => {
    const question = text.trim();
    if (!question) return;

    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const responseContent = FAQS[question] || FAQS["default"];
      setMessages((prev) => [...prev, { role: "assistant", content: responseContent }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSend(inputValue);
    }
  };

  const chatContent = (
    <>
      {/* Header */}
      <div className={`${styles.header} ${compact ? styles.headerCompact : ''}`}>
        <Image src="/images/logo.jpg" alt="My-th" width={compact ? 24 : 28} height={compact ? 24 : 28} className={styles.headerLogo} />
        <div className={styles.headerTitle}>
          <span className={styles.botName}>My-th AIガイド</span>
          <span className={styles.status}>🟢 オンライン</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className={`${styles.chatArea} ${compact ? styles.chatAreaCompact : ''}`} ref={chatAreaRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`${styles.messageWrapper} ${msg.role === "user" ? styles.wrapperUser : styles.wrapperAssistant}`}>
            {msg.role === "assistant" && (
              <div className={`${styles.avatar} ${compact ? styles.avatarCompact : ''}`}>
                <Image src="/images/character.png" alt="広報キャラクター" fill style={{objectFit: 'cover', objectPosition: 'top'}} unoptimized />
              </div>
            )}
            <div className={`${styles.messageBubble} ${msg.role === "user" ? styles.bubbleUser : styles.bubbleAssistant} ${compact ? styles.bubbleCompact : ''}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className={`${styles.messageWrapper} ${styles.wrapperAssistant}`}>
            <div className={`${styles.avatar} ${compact ? styles.avatarCompact : ''}`}>
              <Image src="/images/character.png" alt="広報キャラクター" fill style={{objectFit: 'cover', objectPosition: 'top'}} unoptimized />
            </div>
            <div className={`${styles.messageBubble} ${styles.bubbleAssistant} ${styles.typing} ${compact ? styles.bubbleCompact : ''}`}>
              <span>.</span><span>.</span><span>.</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Preset Questions */}
      {messages.length < 3 && !isTyping && (
        <div className={styles.presetContainer}>
          {PRESET_MESSAGES.map((preset, idx) => (
            <button key={idx} className={`${styles.presetBtn} ${compact ? styles.presetBtnCompact : ''}`} onClick={() => handleSend(preset)}>
              {preset}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className={`${styles.inputArea} ${compact ? styles.inputAreaCompact : ''}`}>
        <input
          type="text"
          className={styles.inputField}
          placeholder="質問を入力..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button 
          className={`${styles.sendBtn} ${inputValue.trim() ? styles.sendBtnActive : ''}`} 
          onClick={() => handleSend(inputValue)}
          disabled={!inputValue.trim()}
        >
          <Send size={compact ? 16 : 18} />
        </button>
      </div>
    </>
  );

  // Compact: card-style, no phone frame
  if (compact) {
    return (
      <div className={styles.compactCard}>
        {chatContent}
      </div>
    );
  }

  // Full: phone frame
  return (
    <div className={styles.phoneFrame}>
      <div className={styles.notch}></div>
      <div className={styles.screen}>
        {chatContent}
      </div>
      <div className={styles.homeIndicator}></div>
    </div>
  );
}
