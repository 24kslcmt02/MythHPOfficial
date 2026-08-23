import Link from "next/link";
import styles from "./page.module.css";
import { site } from "@/config/site";

/**
 * パンくずリスト。BreadcrumbList の構造化データも同時に出力する（NFR-03）。
 * @param {{ items: {label: string, href?: string}[] }} props
 */
export default function Breadcrumbs({ items }) {
  const trail = [{ label: "ホーム", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${site.url}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <nav className={styles.crumbs} aria-label="パンくずリスト">
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1;
          return (
            <span key={`${item.label}-${index}`} className={styles.crumbItem}>
              {isLast || !item.href ? (
                <span className={styles.crumbCurrent} aria-current="page">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link href={item.href}>{item.label}</Link>
                  <span className={styles.crumbSep} aria-hidden="true"> / </span>
                </>
              )}
            </span>
          );
        })}
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
