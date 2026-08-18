import { site } from "@/config/site";
import { news } from "@/content/news";

/** 公開ページの一覧（NFR-02） */
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

  return [
    ...ROUTES.map((route) => ({
      url: `${site.url}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...news.map((entry) => ({
      url: `${site.url}/news/${entry.slug}`,
      lastModified: new Date(entry.date),
      changeFrequency: "yearly",
      priority: 0.4,
    })),
  ];
}
