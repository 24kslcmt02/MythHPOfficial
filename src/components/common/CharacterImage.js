import Image from "next/image";
import { characterAssets } from "@/config/characterAssets";

/**
 * キャラ画像の共通ラッパー。variant で characterAssets の素材を選ぶ。
 * next/image の最適化を有効にするため、呼び出し側は表示幅に応じた
 * sizes を渡すこと（原寸PNGをそのまま配信しない）。
 *
 * @param {{
 *   variant: keyof typeof characterAssets,
 *   size?: number,          // 正方形表示のショートハンド（width/height両方に適用）
 *   width?: number,
 *   height?: number,
 *   alt?: string,           // 省略時は characterAssets 側の alt
 * }} props 残りは next/image にそのまま渡す（fill / sizes / priority / className / style 等）
 */
export default function CharacterImage({ variant, size, width, height, alt, ...imageProps }) {
  const asset = characterAssets[variant];
  if (!asset) return null;

  const resolvedAlt = alt ?? asset.alt;
  if (imageProps.fill) {
    return <Image src={asset.src} alt={resolvedAlt} {...imageProps} />;
  }
  return (
    <Image
      src={asset.src}
      alt={resolvedAlt}
      width={width ?? size ?? asset.width}
      height={height ?? size ?? asset.height}
      {...imageProps}
    />
  );
}
