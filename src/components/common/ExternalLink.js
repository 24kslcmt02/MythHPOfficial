import { ExternalLink as ExternalLinkIcon } from "lucide-react";

/**
 * 外部サイト（アプリ側 user.my-th.jp など）へのリンク。
 * 別タブで開くことをアイコンで明示する（v0.2 要件定義 3.3）。
 */
export default function ExternalLink({ href, children, className, iconSize = 13, ...rest }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...rest}
    >
      {children}
      <ExternalLinkIcon size={iconSize} aria-hidden="true" style={{ flexShrink: 0 }} />
      <span className="srOnly">（新しいタブで開きます）</span>
    </a>
  );
}
