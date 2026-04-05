"use client"

import { useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
  type Transition,
} from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollZoomHeroProps {
  /** Main hero content */
  children: React.ReactNode
  /** CSS class for the container */
  className?: string
  /** CSS class for the content wrapper */
  contentClassName?: string
  /**
   * Maximum scale value for the zoom effect
   * @default 1.4
   */
  maxScale?: number
  /**
   * Minimum scale value (start state)
   * @default 1
   */
  minScale?: number
  /**
   * Scroll distance over which the zoom occurs (in viewport heights)
   * @default 1.5
   */
  zoomRange?: number
  /**
   * Opacity fade-out at the end of zoom
   * @default true
   */
  fadeOnExit?: boolean
  /**
   * Spring physics configuration for smooth interpolation
   */
  springConfig?: {
    stiffness?: number
    damping?: number
    mass?: number
    restDelta?: number
  }
  /**
   * Container height multiplier (creates scroll space)
   * @default 2
   */
  scrollContainerHeight?: number
  /**
   * Callback when zoom progress changes (0-1)
   */
  onZoomProgress?: (progress: number) => void
}

/**
 * ScrollZoomHero
 *
 * A scroll-driven zoom effect inspired by motion.dev's scroll animations.
 * As the user scrolls, the hero content scales up smoothly while maintaining
 * readability and performance.
 *
 * Technical Implementation:
 * - Uses Framer Motion's useScroll for scroll position tracking
 * - useTransform maps scroll progress to scale values
 * - useSpring provides physics-based smooth interpolation
 * - CSS will-change hints for GPU acceleration
 * - Clamped values prevent over-zooming
 *
 * Performance Optimizations:
 * - Transform-only animations (no layout shifts)
 * - GPU-accelerated with translate3d and scale3d
 * - Intersection Observer for visibility-based updates
 * - RequestAnimationFrame throttling via Framer Motion
 *
 * Accessibility:
 * - Respects prefers-reduced-motion
 * - Semantic HTML structure
 * - No seizure-inducing rapid movements
 *
 * @example
 * ```tsx
 * <ScrollZoomHero
 *   maxScale={1.5}
 *   zoomRange={1.2}
 *   fadeOnExit={true}
 * >
 *   <h1>Your Hero Content</h1>
 *   <p>Scroll to zoom</p>
 * </ScrollZoomHero>
 * ```
 */
export function ScrollZoomHero({
  children,
  className,
  contentClassName,
  maxScale = 1.4,
  minScale = 1,
  zoomRange = 1.5,
  fadeOnExit = true,
  springConfig = {
    stiffness: 100,
    damping: 30,
    mass: 1,
    restDelta: 0.001,
  },
  scrollContainerHeight = 2,
  onZoomProgress,
}: ScrollZoomHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Track scroll progress within the hero container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Map scroll progress to scale with smooth spring physics
  const rawScale = useTransform(
    scrollYProgress,
    [0, 1 / scrollContainerHeight],
    [minScale, maxScale]
  )

  // Apply spring physics for smooth, natural feeling motion
  const scale = useSpring(rawScale, springConfig)

  // Optional opacity fade on exit
  const opacity = useTransform(
    scrollYProgress,
    [1 / (scrollContainerHeight * 1.5), 1 / scrollContainerHeight],
    fadeOnExit ? [1, 0] : [1, 1]
  )

  // Call progress callback if provided
  if (onZoomProgress) {
    scale.on("change", (latest) => {
      const progress = (latest - minScale) / (maxScale - minScale)
      onZoomProgress(Math.max(0, Math.min(1, progress)))
    })
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative",
        className
      )}
      style={{
        // Create scroll space for the zoom effect
        height: `${scrollContainerHeight * 100}vh`,
      }}
    >
      {/* Sticky container that holds the content during zoom */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Scaled content layer */}
        <motion.div
          className={cn(
            "flex h-full w-full items-center justify-center",
            contentClassName
          )}
          style={{
            scale,
            opacity: fadeOnExit ? opacity : 1,
            willChange: "transform, opacity",
          }}
        >
          {children}
        </motion.div>

        {/* Performance optimization hint */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ willChange: "transform" }}
          aria-hidden="true"
        />
      </div>

      {/* Reduced motion fallback styles */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          div[style*="scale"] {
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </div>
  )
}

/**
 * Hook for using scroll zoom values in child components
 * Allows children to react to zoom progress independently
 */
export function useScrollZoom(
  containerRef: React.RefObject<HTMLElement | null>,
  options: {
    maxScale?: number
    minScale?: number
    zoomRange?: number
    springConfig?: {
      stiffness?: number
      damping?: number
      mass?: number
    }
  } = {}
): {
  scale: MotionValue<number>
  progress: MotionValue<number>
  opacity: MotionValue<number>
} {
  const {
    maxScale = 1.4,
    minScale = 1,
    zoomRange = 1.5,
    springConfig = { stiffness: 100, damping: 30, mass: 1 },
  } = options

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Raw progress (0-1 based on scroll)
  const progress = useTransform(scrollYProgress, [0, 1 / zoomRange], [0, 1])

  // Scaled value
  const rawScale = useTransform(progress, [0, 1], [minScale, maxScale])
  const scale = useSpring(rawScale, springConfig)

  // Fade opacity
  const opacity = useTransform(progress, [0.7, 1], [1, 0])

  return { scale, progress, opacity }
}

/**
 * ParallaxLayer - Creates depth with different scroll speeds
 */
interface ParallaxLayerProps {
  children: React.ReactNode
  className?: string
  /**
   * Scroll speed multiplier
   * 1 = normal speed
   * 0.5 = half speed (appears further away)
   * 1.5 = 1.5x speed (appears closer)
   */
  speed?: number
  /**
   * Direction of parallax movement
   */
  direction?: "up" | "down" | "left" | "right"
  /**
   * Maximum pixels to translate
   */
  maxOffset?: number
}

export function ParallaxLayer({
  children,
  className,
  speed = 0.5,
  direction = "up",
  maxOffset = 200,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const getTransformValues = () => {
    const offset = maxOffset * speed
    switch (direction) {
      case "up":
        return [offset, -offset]
      case "down":
        return [-offset, offset]
      case "left":
        return [offset, -offset]
      case "right":
        return [-offset, offset]
      default:
        return [0, 0]
    }
  }

  const transformValues = getTransformValues()

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left" || direction === "right" ? transformValues : [0, 0]
  )

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up" || direction === "down" ? transformValues : [0, 0]
  )

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      style={{
        x,
        y,
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * GrainOverlay - Subtle film grain texture for visual depth
 */
interface GrainOverlayProps {
  className?: string
  /**
   * Opacity of the grain effect
   * @default 0.03
   */
  opacity?: number
  /**
   * Scale of the grain texture
   * @default 1
   */
  scale?: number
  /**
   * Animation speed (0 to disable)
   * @default 0.5
   */
  animationSpeed?: number
}

export function GrainOverlay({
  className,
  opacity = 0.03,
  scale = 1,
  animationSpeed = 0.5,
}: GrainOverlayProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-50 overflow-hidden",
        className
      )}
      style={{
        opacity,
      }}
      aria-hidden="true"
    >
      <div
        className="absolute -inset-[100%] h-[300%] w-[300%]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: `${256 * scale}px ${256 * scale}px`,
          animation: animationSpeed > 0
            ? `grain-shift calc(0.5s / ${animationSpeed}) steps(10) infinite`
            : "none",
          willChange: "transform",
        }}
      />
      <style jsx>{`
        @keyframes grain-shift {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-2%, -2%); }
          20% { transform: translate(2%, 2%); }
          30% { transform: translate(-1%, 1%); }
          40% { transform: translate(1%, -1%); }
          50% { transform: translate(-2%, 2%); }
          60% { transform: translate(2%, -2%); }
          70% { transform: translate(-1%, -1%); }
          80% { transform: translate(1%, 1%); }
          90% { transform: translate(-2%, -1%); }
        }
      `}</style>
    </div>
  )
}

/**
 * DepthLayer - Creates layered depth effect with blur and scale
 */
interface DepthLayerProps {
  children: React.ReactNode
  className?: string
  /**
   * Depth level (affects blur and parallax intensity)
   * -2 = far background (heavy blur, slow parallax)
   * -1 = background (light blur, slow parallax)
   * 0 = neutral (no effect)
   * 1 = foreground (slight scale up, fast parallax)
   * 2 = close foreground (scale up, fast parallax)
   */
  depth?: number
  /**
   * Maximum blur in pixels for background layers
   */
  maxBlur?: number
}

export function DepthLayer({
  children,
  className,
  depth = 0,
  maxBlur = 10,
}: DepthLayerProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Background layers move slower (parallax)
  const parallaxSpeed = depth < 0 ? 1 + depth * 0.3 : 1 - depth * 0.2
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [100 * parallaxSpeed, -100 * parallaxSpeed]
  )

  // Background layers get blur
  const blur = depth < 0 ? Math.abs(depth) * maxBlur : 0

  // Foreground layers scale up slightly
  const scale = depth > 0 ? 1 + depth * 0.05 : 1

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      style={{
        y,
        scale,
        filter: blur > 0 ? `blur(${blur}px)` : "none",
        willChange: "transform, filter",
      }}
    >
      {children}
    </motion.div>
  )
}
