import { site } from "@/config/site";
import { isRoutePublished } from "@/config/routes";
import { news } from "@/content/news";

/**
 * 全ページの一覧（NFR-02）。
 * 公開保留中のルート（src/config/routes.js の UNPUBLISHED_ROUTES）は出力時に除外される。
 */
const ROUTES = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/operator", priority: 0.9, changeFrequency: "weekly" },
  { path: "/operator/features", priority: 0.7, changeFrequency: "monthly" },
  { path: "/subscription", priority: 0.7, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.8, changeFrequency: "monthly" },
  { path: "/faq/organizer", priority: 0.7, changeFrequency: "monthly" },
  { path: "/guide", priority: 0.7, changeFrequency: "monthly" },
  { path: "/guide/environment", priority: 0.5, changeFrequency: "monthly" },
  { path: "/fees", priority: 0.7, changeFrequency: "monthly" },
  { path: "/refund", priority: 0.7, changeFrequency: "monthly" },
  { path: "/security", priority: 0.7, changeFrequency: "monthly" },
  { path: "/company", priority: 0.6, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/news", priority: 0.6, changeFrequency: "weekly" },
];

export default function sitemap() {
  const now = new Date();
  const publishedRoutes = ROUTES.filter((route) => isRoutePublished(route.path));
  const publishedNews = isRoutePublished("/news") ? news : [];

  return [
    ...publishedRoutes.map((route) => ({
      url: `${site.url}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...publishedNews.map((entry) => ({
      url: `${site.url}/news/${entry.slug}`,
      lastModified: new Date(entry.date),
      changeFrequency: "yearly",
      priority: 0.4,
    })),
  ];
}
