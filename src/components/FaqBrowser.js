"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, ChevronDown, Link2 } from "lucide-react";
import { groupByCategory, searchFaq, faqAnchorId, answerText, isPublished } from "@/lib/faq.mjs";
import styles from "./FaqBrowser.module.css";

const ALL = "すべて";

/**
 * FAQ一覧（FR-06）。カテゴリ絞り込み・全文検索・アンカーリンクに対応する。
 *
 * @param {object} props
 * @param {Array} props.items 表示する設問（公開判定済みのものを渡す）
 * @param {string[]} props.categories カテゴリの表示順
 */
export default function FaqBrowser({ items, categories }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [openIds, setOpenIds] = useState(() => new Set());

  // URLのアンカー（例: /faq#q-withdraw）で該当設問を開く
  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash.startsWith("q-")) return;
      const id = hash.slice(2);
      if (!items.some((item) => item.id === id)) return;
      setActiveCategory(ALL);
      setQuery("");
      setOpenIds((prev) => new Set(prev).add(id));
      window.requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [items]);

  const visibleCategories = useMemo(
    () => [ALL, ...categories.filter((category) => items.some((item) => item.category === category))],
    [categories, items]
  );

  const filtered = useMemo(() => {
    const byCategory =
      activeCategory === ALL ? items : items.filter((item) => item.category === activeCategory);
    return searchFaq(byCategory, query);
  }, [items, activeCategory, query]);

  const groups = useMemo(() => groupByCategory(filtered), [filtered]);

  const toggle = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <Search size={17} className={styles.searchIcon} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="キーワードで検索（例: 機種変更、払い戻し）"
            className={styles.searchInput}
            aria-label="よくある質問を検索"
          />
        </div>
        <div className={styles.chips} role="group" aria-label="カテゴリで絞り込む">
          {visibleCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={`${styles.chip} ${activeCategory === category ? styles.chipActive : ""}`}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <p className={styles.count} role="status">
        {filtered.length}件の質問{query.trim() !== "" && `（「${query.trim()}」の検索結果）`}
      </p>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>該当する質問が見つかりませんでした。</p>
          <p>
            キーワードを変えてお試しいただくか、
            <a href="/contact">お問い合わせ</a>よりご連絡ください。
          </p>
        </div>
      ) : (
        groups.map((group) => (
          <section key={group.category} className={styles.group}>
            <h2 className={styles.groupTitle}>{group.category}</h2>
            <div className={styles.items}>
              {group.items.map((item) => {
                const anchor = faqAnchorId(item);
                const isOpen = openIds.has(item.id);
                const panelId = `panel-${item.id}`;
                const pending = !isPublished(item);
                return (
                  <div
                    key={item.id}
                    id={anchor}
                    className={`${styles.item} ${isOpen ? styles.itemOpen : ""} ${pending ? styles.itemPending : ""}`}
                  >
                    <button
                      type="button"
                      className={styles.question}
                      onClick={() => toggle(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                    >
                      <span className={styles.questionText}>
                        {item.question}
                        {pending && <span className={styles.pendingBadge}>確認待ち</span>}
                      </span>
                      <ChevronDown
                        size={18}
                        aria-hidden="true"
                        className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
                      />
                    </button>
                    <div className={styles.answer} id={panelId} role="region" hidden={!isOpen}>
                      <div className={styles.answerInner}>
                        <p>{answerText(item)}</p>
                        {pending && item.note && (
                          <p className={styles.pendingNote}>【開発表示】{item.note}</p>
                        )}
                        <a href={`#${anchor}`} className={styles.permalink}>
                          <Link2 size={12} aria-hidden="true" />
                          この質問へのリンク
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
