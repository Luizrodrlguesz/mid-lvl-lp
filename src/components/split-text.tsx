"use client"

import { motion, type Variants } from "framer-motion"
import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"

type SplitTextProps = {
  text: string
  id?: string
  className?: string
  delay?: number
  startDelay?: number
  duration?: number
  ease?: string
  splitType?: "chars" | "words" | "lines" | "words, chars"
  from?: { opacity?: number; y?: number; x?: number; scale?: number }
  to?: { opacity?: number; y?: number; x?: number; scale?: number }
  threshold?: number
  rootMargin?: string
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
  textAlign?: CSSProperties["textAlign"]
  onLetterAnimationComplete?: () => void
  showCallback?: boolean
}

const easeMap: Record<string, [number, number, number, number]> = {
  "power3.out": [0.22, 1, 0.36, 1],
  "power2.out": [0.16, 1, 0.3, 1],
  "power1.out": [0.25, 1, 0.5, 1],
}

const motionTags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  p: motion.p,
  span: motion.span,
}

function getParts(text: string, splitType: SplitTextProps["splitType"]) {
  if (splitType === "words") {
    return text.split(/(\s+)/).filter(Boolean)
  }

  return Array.from(text)
}

export default function SplitText({
  text,
  id,
  className,
  delay = 50,
  startDelay = 0,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  tag = "p",
  textAlign = "center",
  onLetterAnimationComplete,
}: SplitTextProps) {
  const Tag = motionTags[tag]
  const parts = getParts(text, splitType)
  const transitionEase = easeMap[ease] ?? easeMap["power3.out"]

  const parent: Variants = {
    hidden: {},
    show: {
      transition: {
        delayChildren: startDelay,
        staggerChildren: delay / 1000,
      },
    },
  }

  const child: Variants = {
    hidden: from,
    show: {
      ...to,
      transition: {
        duration,
        ease: transitionEase,
      },
    },
  }

  return (
    <Tag
      id={id}
      className={cn("inline-block overflow-visible whitespace-normal", className)}
      style={{ textAlign, wordWrap: "break-word" }}
      aria-label={text}
      variants={parent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: threshold, margin: rootMargin }}
      onAnimationComplete={() => onLetterAnimationComplete?.()}
    >
      {parts.map((part, index) => {
        const isSpace = /^\s+$/.test(part)

        return (
          <motion.span
            key={`${part}-${index}`}
            aria-hidden
            className={cn(
              "inline-block overflow-visible will-change-transform",
              isSpace && "w-[0.28em]",
            )}
            variants={child}
          >
            {isSpace ? "\u00A0" : part}
          </motion.span>
        )
      })}
    </Tag>
  )
}
