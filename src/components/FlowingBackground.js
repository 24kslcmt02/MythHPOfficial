"use client";

import styles from "./FlowingBackground.module.css";

/**
 * Ribbon-style flowing background with SVG gradient strokes.
 * Inspired by Stripe's aesthetic: 2-3 ribbon bundles of densely packed
 * ultra-fine parallel curves with gradient color transitions.
 *
 * Placed specifically within Hero sections — NOT as a full-page wallpaper.
 *
 * @param {"btoc"|"btob"} variant — color scheme variant
 */
export default function FlowingBackground({ variant = "btob" }) {
  const isB2C = variant === "btoc";

  // Gradient IDs to avoid collisions
  const id = isB2C ? "btoc" : "btob";

  /**
   * Generate a ribbon bundle: many closely-spaced parallel curves
   * following a main path shape, creating a cohesive flowing form.
   */
  function generateRibbon({
    lineCount,
    mainPath,       // function(offset) => SVG path d string
    gradientId,
    baseWidth = 0.15,
    spacingPx = 0.6,
  }) {
    const paths = [];
    const halfCount = lineCount / 2;

    for (let i = 0; i < lineCount; i++) {
      const offset = (i - halfCount) * spacingPx;
      // Vary stroke width: thicker at center, thinner at edges
      const distFromCenter = Math.abs(i - halfCount) / halfCount;
      const sw = baseWidth * (1 - distFromCenter * 0.6);
      // Vary opacity: more opaque at center
      const op = 0.35 * (1 - distFromCenter * 0.5);

      paths.push(
        <path
          key={`r-${gradientId}-${i}`}
          d={mainPath(offset)}
          stroke={`url(#${gradientId})`}
          strokeWidth={sw}
          strokeOpacity={op}
          fill="none"
          strokeLinecap="round"
        />
      );
    }
    return paths;
  }

  // ——— BtoB Ribbons: Right-top sweeping down-left ———
  const btobRibbon1 = (offset) =>
    `M 110,${-5 + offset} C 85,${10 + offset * 0.8} 55,${25 + offset * 0.6} 20,${50 + offset * 0.4} S -15,${70 + offset * 0.3} -20,${85 + offset * 0.2}`;

  const btobRibbon2 = (offset) =>
    `M 115,${15 + offset} C 90,${25 + offset * 0.7} 65,${40 + offset * 0.5} 40,${60 + offset * 0.3} S 10,${80 + offset * 0.2} -10,${95 + offset * 0.15}`;

  const btobRibbon3 = (offset) =>
    `M 105,${-15 + offset} C 80,${5 + offset * 0.9} 45,${15 + offset * 0.5} 25,${35 + offset * 0.4}`;

  // ——— BtoC Ribbons: Gentler, more playful curves ———
  const btocRibbon1 = (offset) =>
    `M 110,${10 + offset} C 80,${20 + offset * 0.7} 50,${35 + offset * 0.5} 15,${55 + offset * 0.3} S -10,${75 + offset * 0.2} -20,${90 + offset * 0.15}`;

  const btocRibbon2 = (offset) =>
    `M 105,${-10 + offset} C 75,${5 + offset * 0.8} 40,${20 + offset * 0.5} 20,${40 + offset * 0.3}`;

  return (
    <div className={styles.container} aria-hidden="true">
      <svg
        className={styles.svg}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* BtoB Gradients — blue → indigo → soft pink */}
          <linearGradient id={`${id}-grad1`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.6" />
            <stop offset="40%" stopColor="#818CF8" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#A78BFA" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#F0ABFC" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id={`${id}-grad2`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#C4B5FD" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FBCFE8" stopOpacity="0.15" />
          </linearGradient>

          <linearGradient id={`${id}-grad3`} x1="100%" y1="0%" x2="20%" y2="80%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {isB2C ? (
          <>
            {/* BtoC: 2 ribbon bundles, gentler and more restrained
                (stage-bg.jpg is the hero, ribbons are subtle accompaniment) */}
            {generateRibbon({
              lineCount: 35,
              mainPath: btocRibbon1,
              gradientId: `${id}-grad1`,
              baseWidth: 0.12,
              spacingPx: 0.5,
            })}
            {generateRibbon({
              lineCount: 20,
              mainPath: btocRibbon2,
              gradientId: `${id}-grad2`,
              baseWidth: 0.1,
              spacingPx: 0.45,
            })}
          </>
        ) : (
          <>
            {/* BtoB: 3 ribbon bundles, bolder presence
                (no stage photo, ribbons are the main visual element) */}
            {generateRibbon({
              lineCount: 40,
              mainPath: btobRibbon1,
              gradientId: `${id}-grad1`,
              baseWidth: 0.18,
              spacingPx: 0.55,
            })}
            {generateRibbon({
              lineCount: 30,
              mainPath: btobRibbon2,
              gradientId: `${id}-grad2`,
              baseWidth: 0.14,
              spacingPx: 0.5,
            })}
            {generateRibbon({
              lineCount: 18,
              mainPath: btobRibbon3,
              gradientId: `${id}-grad3`,
              baseWidth: 0.1,
              spacingPx: 0.4,
            })}
          </>
        )}
      </svg>
    </div>
  );
}
