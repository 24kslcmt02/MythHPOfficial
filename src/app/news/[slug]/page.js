import Link from "next/link";
import { isRoutePublished } from "@/config/routes";
import { notFound } from "next/navigation";
import PageShell from "@/components/common/PageShell";
import { findNews, news } from "@/content/news";
import { site } from "@/config/site";
import styles from "@/components/common/page.module.css";
import newsStyles from "../news.module.css";

export function generateStaticParams() {
  if (!isRoutePublished("/news")) return [];
  return news.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const entry = findNews(slug);
  if (!entry) return { title: "お知らせ | My-th（マイス）" };

  return {
    title: `${entry.title} | お知らせ | My-th（マイス）`,
    description: entry.summary,
    alternates: { canonical: `/news/${entry.slug}` },
    openGraph: {
      title: entry.title,
      description: entry.summary,
      type: "article",
      publishedTime: entry.date,
    },
  };
}

export default async function NewsDetailPage({ params }) {
  if (!isRoutePublished("/news")) notFound();

  const { slug } = await params;
  const entry = findNews(slug);
  if (!entry) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: entry.title,
    description: entry.summary,
    datePublished: entry.date,
    mainEntityOfPage: `${site.url}/news/${entry.slug}`,
    publisher: { "@type": "Organization", name: "My-th" },
  };

  return (
    <PageShell
      eyebrow={entry.category}
      title={entry.title}
      breadcrumbs={[{ label: "お知らせ", href: "/news" }, { label: entry.title }]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className={styles.prose}>
        <p className={newsStyles.detailDate}>
          <time dateTime={entry.date}>{entry.date.replace(/-/g, ".")}</time>
        </p>
        <div className={styles.block}>
          {entry.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <p style={{ marginTop: "var(--space-2xl)" }}>
          <Link href="/news">← お知らせ一覧へ戻る</Link>
        </p>
      </article>
    </PageShell>
  );
}
