"use client"

import { motion, type Transition } from "framer-motion"
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
  type Ref,
} from "react"

import { cn } from "@/lib/utils"

type BlurTextProps = {
  text?: string
  delay?: number
  startDelay?: number
  className?: string
  animateBy?: "words" | "letters"
  direction?: "top" | "bottom"
  threshold?: number
  rootMargin?: string
  animationFrom?: Record<string, string | number>
  animationTo?: Array<Record<string, string | number>>
  easing?: Transition["ease"]
  onAnimationComplete?: () => void
  stepDuration?: number
  tag?: "p" | "span" | "div"
}

function buildKeyframes(
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>,
) {
  const keys = new Set<string>([
    ...Object.keys(from),
    ...steps.flatMap((step) => Object.keys(step)),
  ])

  const keyframes: Record<string, Array<string | number>> = {}
  keys.forEach((key) => {
    keyframes[key] = [from[key], ...steps.map((step) => step[key])]
  })

  return keyframes
}

type MotionTextTag = ComponentType<{
  ref?: Ref<HTMLElement>
  className?: string
  "aria-label"?: string
  children?: ReactNode
}>

const motionTags: Record<NonNullable<BlurTextProps["tag"]>, MotionTextTag> = {
  p: motion.p as unknown as MotionTextTag,
  span: motion.span as unknown as MotionTextTag,
  div: motion.div as unknown as MotionTextTag,
}

export default function BlurText({
  text = "",
  delay = 200,
  startDelay = 0,
  className,
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = [0.22, 1, 0.36, 1],
  onAnimationComplete,
  stepDuration = 0.35,
  tag = "p",
}: BlurTextProps) {
  const Tag = motionTags[tag]
  const elements = useMemo(
    () => (animateBy === "words" ? text.split(" ") : Array.from(text)),
    [animateBy, text],
  )
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setInView(true)
        observer.unobserve(element)
      },
      { threshold, rootMargin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  const defaultFrom = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50 }
        : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction],
  )

  const defaultTo = useMemo(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5,
      },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction],
  )

  const fromSnapshot = animationFrom ?? defaultFrom
  const toSnapshots = animationTo ?? defaultTo
  const stepCount = toSnapshots.length + 1
  const totalDuration = stepDuration * (stepCount - 1)
  const times = Array.from({ length: stepCount }, (_, index) =>
    stepCount === 1 ? 0 : index / (stepCount - 1),
  )
  const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots)

  return (
    <Tag
      ref={ref}
      className={cn("inline-flex flex-wrap overflow-visible", className)}
      aria-label={text}
    >
      {elements.map((segment, index) => {
        const isLast = index === elements.length - 1

        return (
          <motion.span
            key={`${segment}-${index}`}
            aria-hidden
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={{
              duration: totalDuration,
              times,
              delay: startDelay + (index * delay) / 1000,
              ease: easing,
            }}
            onAnimationComplete={isLast ? onAnimationComplete : undefined}
            className="inline-block overflow-visible bg-inherit bg-clip-text text-inherit will-change-[transform,filter,opacity]"
          >
            {segment}
            {animateBy === "words" && !isLast ? "\u00A0" : null}
          </motion.span>
        )
      })}
    </Tag>
  )
}
