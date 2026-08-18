import Link from "next/link";
import PageShell from "@/components/common/PageShell";
import { sortedNews } from "@/content/news";
import styles from "@/components/common/page.module.css";
import newsStyles from "./news.module.css";

export const metadata = {
  title: "お知らせ | My-th（マイス）",
  description:
    "My-thからのお知らせです。サービスのリリース情報、メンテナンス、障害情報、注意喚起を掲載しています。",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  const entries = sortedNews();

  return (
    <PageShell
      eyebrow="News"
      title="お知らせ"
      lead="サービスに関する最新情報をお届けします。"
      breadcrumbs={[{ label: "お知らせ" }]}
    >
      <div className={styles.prose}>
        {entries.length === 0 ? (
          <p>現在お知らせはありません。</p>
        ) : (
          <ul className={newsStyles.list}>
            {entries.map((entry) => (
              <li key={entry.slug}>
                <Link href={`/news/${entry.slug}`} className={newsStyles.item}>
                  <div className={newsStyles.meta}>
                    <time dateTime={entry.date}>{entry.date.replace(/-/g, ".")}</time>
                    <span className={newsStyles.category}>{entry.category}</span>
                  </div>
                  <h2 className={newsStyles.title}>{entry.title}</h2>
                  <p className={newsStyles.summary}>{entry.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </PageShell>
  );
}
