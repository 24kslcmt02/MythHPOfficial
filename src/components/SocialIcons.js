/**
 * 公式SNSのアイコン。lucide-react にブランドアイコンがないため自前のSVGで用意する。
 * config/site.js の social に URL が設定されているものだけを表示する。
 */
import { social } from "@/config/site";

const ICONS = {
  x: {
    label: "X（旧Twitter）",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  instagram: {
    label: "Instagram",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  youtube: {
    label: "YouTube",
    path: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  tiktok: {
    label: "TikTok",
    path: "M12.525.02h3.316a5.09 5.09 0 00.075.83 5.06 5.06 0 002.235 3.32 5.02 5.02 0 002.775.83v3.29a8.35 8.35 0 01-4.955-1.61v7.31a6.28 6.28 0 11-6.28-6.28c.32 0 .63.03.94.08v3.4a2.9 2.9 0 00-.94-.16 2.96 2.96 0 102.96 2.96V.02z",
  },
};

export default function SocialIcons({ className, linkClassName }) {
  const entries = Object.entries(social).filter(([, url]) => Boolean(url));
  if (entries.length === 0) return null;

  return (
    <ul className={className}>
      {entries.map(([key, url]) => {
        const icon = ICONS[key];
        if (!icon) return null;
        return (
          <li key={key}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
              aria-label={`My-th 公式 ${icon.label}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d={icon.path} />
              </svg>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
