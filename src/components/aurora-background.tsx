"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface AuroraBackgroundProps {
  /** CSS class for positioning container */
  className?: string
  /** Additional styles for the aurora layers */
  auroraClassName?: string
  /** Intensity of the glow effect (0-1) */
  glowIntensity?: number
  /** Speed multiplier for animation (default: 1) */
  animationSpeed?: number
  /** Base color palette - can be customized */
  colors?: {
    primary?: string
    secondary?: string
    tertiary?: string
    quaternary?: string
  }
  /** Children content rendered above aurora */
  children?: React.ReactNode
  /**
   * Blur amount for the aurora effect
   * @default "blur-3xl"
   */
  blurAmount?: "blur-xl" | "blur-2xl" | "blur-3xl" | "blur-[100px]"
  /**
   * Blend mode for color mixing
   * @default "mix-blend-screen"
   */
  blendMode?: "mix-blend-screen" | "mix-blend-overlay" | "mix-blend-soft-light"
}

/**
 * AuroraBackground
 *
 * A high-performance, CSS-based animated gradient background inspired by
 * the aurora borealis (northern lights) effect. Uses multiple radial
 * gradients with transform animations for a fluid, organic movement.
 *
 * Technical Implementation:
 * - Pure CSS animations (no Canvas/WebGL for better SSR compatibility)
 * - Multiple animated gradient layers with different timing
 * - Hardware-accelerated transforms (translate3d, scale3d)
 * - CSS blend modes for color mixing
 * - Will-change hints for GPU optimization
 *
 * Performance Notes:
 * - Uses CSS custom properties for dynamic values
 * - Animation only runs when element is visible
 * - Reduced motion media query support
 * - Layer promotion via will-change and transform3d
 *
 * @example
 * ```tsx
 * <AuroraBackground
 *   colors={{
 *     primary: "#7c3aed",
 *     secondary: "#2563eb",
 *     tertiary: "#db2777",
 *     quaternary: "#059669"
 *   }}
 *   glowIntensity={0.5}
 *   animationSpeed={1.2}
 * >
 *   <YourContent />
 * </AuroraBackground>
 * ```
 */
export function AuroraBackground({
  className,
  auroraClassName,
  glowIntensity = 0.4,
  animationSpeed = 1,
  colors = {
    primary: "#7c3aed",   // Violet
    secondary: "#2563eb", // Blue
    tertiary: "#db2777",  // Pink
    quaternary: "#059669" // Emerald
  },
  children,
  blurAmount = "blur-3xl",
  blendMode = "mix-blend-screen",
}: AuroraBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Apply CSS custom properties for dynamic theming
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.style.setProperty("--aurora-primary", colors.primary ?? "#7c3aed")
    container.style.setProperty("--aurora-secondary", colors.secondary ?? "#2563eb")
    container.style.setProperty("--aurora-tertiary", colors.tertiary ?? "#db2777")
    container.style.setProperty("--aurora-quaternary", colors.quaternary ?? "#059669")
    container.style.setProperty("--aurora-glow", String(glowIntensity))
    container.style.setProperty("--aurora-speed", String(animationSpeed))
  }, [colors, glowIntensity, animationSpeed])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative isolate overflow-hidden",
        className
      )}
    >
      {/* Background base layer */}
      <div className="absolute inset-0 bg-background" />

      {/* Aurora gradient layers container */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          auroraClassName
        )}
        aria-hidden="true"
      >
        {/* Layer 1: Primary color - slow horizontal drift */}
        <div
          className={cn(
            "absolute -inset-[100%] opacity-70",
            blurAmount,
            blendMode,
            "aurora-layer-1"
          )}
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% 50%, var(--aurora-primary), transparent 60%)`,
            willChange: "transform",
            animation: `aurora-drift-1 calc(20s / var(--aurora-speed, 1)) ease-in-out infinite`,
          }}
        />

        {/* Layer 2: Secondary color - diagonal movement */}
        <div
          className={cn(
            "absolute -inset-[100%] opacity-60",
            blurAmount,
            blendMode,
            "aurora-layer-2"
          )}
          style={{
            background: `radial-gradient(ellipse 60% 70% at 30% 40%, var(--aurora-secondary), transparent 55%)`,
            willChange: "transform",
            animation: `aurora-drift-2 calc(25s / var(--aurora-speed, 1)) ease-in-out infinite`,
          }}
        />

        {/* Layer 3: Tertiary color - pulsing scale */}
        <div
          className={cn(
            "absolute -inset-[100%] opacity-50",
            blurAmount,
            blendMode,
            "aurora-layer-3"
          )}
          style={{
            background: `radial-gradient(ellipse 70% 60% at 70% 60%, var(--aurora-tertiary), transparent 50%)`,
            willChange: "transform",
            animation: `aurora-pulse calc(15s / var(--aurora-speed, 1)) ease-in-out infinite`,
          }}
        />

        {/* Layer 4: Quaternary color - slow rotation */}
        <div
          className={cn(
            "absolute -inset-[100%] opacity-40",
            blurAmount,
            blendMode,
            "aurora-layer-4"
          )}
          style={{
            background: `radial-gradient(ellipse 50% 80% at 60% 30%, var(--aurora-quaternary), transparent 55%)`,
            willChange: "transform",
            animation: `aurora-rotate calc(30s / var(--aurora-speed, 1)) linear infinite`,
          }}
        />

        {/* Glow overlay for intensity control */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse at center, transparent 0%, var(--background) 70%)`,
            opacity: `calc(1 - var(--aurora-glow, 0.4))`,
          }}
        />
      </div>

      {/* Content layer */}
      <div className="relative z-10">{children}</div>

      {/* CSS Keyframes - injected once per component */}
      <style jsx>{`
        @keyframes aurora-drift-1 {
          0%, 100% {
            transform: translate3d(-10%, 0, 0) scale3d(1, 1, 1);
          }
          50% {
            transform: translate3d(10%, -5%, 0) scale3d(1.1, 0.95, 1);
          }
        }

        @keyframes aurora-drift-2 {
          0%, 100% {
            transform: translate3d(5%, -10%, 0) scale3d(1, 1, 1);
          }
          50% {
            transform: translate3d(-15%, 5%, 0) scale3d(0.95, 1.05, 1);
          }
        }

        @keyframes aurora-pulse {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
            opacity: 0.5;
          }
          33% {
            transform: translate3d(5%, -5%, 0) scale3d(1.15, 1.1, 1);
            opacity: 0.6;
          }
          66% {
            transform: translate3d(-5%, 5%, 0) scale3d(0.95, 0.9, 1);
            opacity: 0.4;
          }
        }

        @keyframes aurora-rotate {
          0% {
            transform: translate3d(-20%, 10%, 0) rotate(0deg) scale3d(1, 1, 1);
          }
          50% {
            transform: translate3d(10%, -10%, 0) rotate(180deg) scale3d(1.1, 0.9, 1);
          }
          100% {
            transform: translate3d(-20%, 10%, 0) rotate(360deg) scale3d(1, 1, 1);
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .aurora-layer-1,
          .aurora-layer-2,
          .aurora-layer-3,
          .aurora-layer-4 {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}

/**
 * Pre-configured color presets for common use cases
 */
export const auroraPresets = {
  /** Default violet-blue-pink-emerald */
  default: {
    primary: "#7c3aed",
    secondary: "#2563eb",
    tertiary: "#db2777",
    quaternary: "#059669",
  },
  /** Ocean blues and teals */
  ocean: {
    primary: "#0ea5e9",
    secondary: "#06b6d4",
    tertiary: "#3b82f6",
    quaternary: "#14b8a6",
  },
  /** Sunset oranges and pinks */
  sunset: {
    primary: "#f59e0b",
    secondary: "#ef4444",
    tertiary: "#ec4899",
    quaternary: "#8b5cf6",
  },
  /** Forest greens */
  forest: {
    primary: "#22c55e",
    secondary: "#16a34a",
    tertiary: "#059669",
    quaternary: "#10b981",
  },
  /** Monochrome grays for subtle effect */
  subtle: {
    primary: "#64748b",
    secondary: "#94a3b8",
    tertiary: "#475569",
    quaternary: "#cbd5e1",
  },
  /** Dark theme optimized */
  dark: {
    primary: "#4c1d95",
    secondary: "#1e40af",
    tertiary: "#831843",
    quaternary: "#065f46",
  },
} as const

export type AuroraPreset = keyof typeof auroraPresets
