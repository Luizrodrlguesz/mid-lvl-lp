// components/portfolio-hero-avatar.tsx
"use client"

import Image from "next/image"
import {
  motion,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion"
import { useEffect, useId, useMemo, useState } from "react"

import { cn } from "@/lib/utils"

/** Espaço de coordenadas do SVG. */
const BOX = 1200
const CENTER = BOX / 2

/** Avatar menor que antes para abrir espaço pro frame HUD. */
const AVATAR_DIAMETER_RATIO = 0.6

// ─── Skills em órbita (ângulo em graus, 0° = direita, sentido horário) ───
type Skill = { label: string; angleDeg: number }
const SKILLS: readonly Skill[] = [
  { label: "React", angleDeg: -128 },
  { label: "TypeScript", angleDeg: -64 },
  { label: "Next.js", angleDeg: 4 },
  { label: "Laravel", angleDeg: 66 },
  { label: "Tailwind", angleDeg: 146 },
] as const

// raios no espaço BOX
const R_FACE = (BOX * AVATAR_DIAMETER_RATIO) / 2 // 360
const R_RING = R_FACE + 30 // anel de gradiente justo ao avatar
const R_TICK_IN = R_FACE + 44 // início do tracinho conector
const R_TICK_OUT = R_FACE + 92 // fim do tracinho conector
const R_CHIP = R_FACE + 118 // posição dos chips
const R_OUTER = BOX * 0.485 // anel externo discreto
const BRACKET_HALF = BOX * 0.475 // meia-largura das cantoneiras

function polar(angleDeg: number, radius: number) {
  const a = (angleDeg * Math.PI) / 180
  return { x: CENTER + radius * Math.cos(a), y: CENTER + radius * Math.sin(a) }
}

const chipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: 0.25 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

type PortfolioHeroAvatarProps = {
  imageAlt?: string
  imageClassName?: string
  className?: string
}

const AVATAR_IDLE_SRC = "/assets/avatar/pxl-2.png"
const AVATAR_HOVER_SPRITE_FRAMES = [
  "/assets/avatar/pxl-1.png",
  "/assets/avatar/pxl-3.png",
  "/assets/avatar/pxl-4.png",
  "/assets/avatar/pxl-5.png",
] as const
const SPRITE_FRAME_MS = 300
const IDLE_SPRITE_CROSSFADE_MS = 420

export function PortfolioHeroAvatar({
  imageAlt = "Luiz Rodrigues",
  imageClassName,
  className,
}: PortfolioHeroAvatarProps) {
  const [isAvatarHovered, setIsAvatarHovered] = useState(false)
  const [spriteFrame, setSpriteFrame] = useState(0)

  useEffect(() => {
    if (!isAvatarHovered) return
    const id = window.setInterval(() => {
      setSpriteFrame((i) => (i + 1) % AVATAR_HOVER_SPRITE_FRAMES.length)
    }, SPRITE_FRAME_MS)
    return () => window.clearInterval(id)
  }, [isAvatarHovered])

  const uid = useId().replace(/:/g, "")
  const gradId = `hero-avatar-ring-${uid}`
  const filterId = `hero-avatar-glow-${uid}`

  // ─── Anel de gradiente animado (mantido do seu código) ───
  const strokeMain = 9
  const strokeTrail = 4
  const circumference = 2 * Math.PI * R_RING
  const arcMain = circumference * 0.29
  const arcTrail = circumference * 0.14

  const dashOffset = useMotionValue(0)
  const smoothOffset = useSpring(dashOffset, { stiffness: 72, damping: 24 })

  useEffect(() => {
    let raf = 0
    const tick = () => {
      dashOffset.set((dashOffset.get() + 0.7) % circumference)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [circumference, dashOffset])

  // ─── Posições dos chips (memo) ───
  const chips = useMemo(
    () =>
      SKILLS.map((s) => {
        const chip = polar(s.angleDeg, R_CHIP)
        const tickIn = polar(s.angleDeg, R_TICK_IN)
        const tickOut = polar(s.angleDeg, R_TICK_OUT)
        return {
          ...s,
          left: (chip.x / BOX) * 100,
          top: (chip.y / BOX) * 100,
          tickIn,
          tickOut,
        }
      }),
    [],
  )

  const corners = useMemo(
    () =>
      [
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
      ].map(([sx, sy]) => ({
        x: CENTER + sx * BRACKET_HALF,
        y: CENTER + sy * BRACKET_HALF,
        sx,
        sy,
      })),
    [],
  )

  return (
    <div
      className={cn(
        "relative mx-auto aspect-square w-full max-w-[640px] justify-self-center [container-type:size]",
        className,
      )}
    >
      <div className="relative size-full max-h-[640px] max-w-[640px]">
        {/* ── Camada HUD: anel externo, brackets, ticks ─────────────── */}
        <svg
          className="pointer-events-none absolute inset-0 size-full"
          viewBox={`0 0 ${BOX} ${BOX}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="55%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <filter
              id={filterId}
              x="-22%"
              y="-22%"
              width="144%"
              height="144%"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur stdDeviation={3} result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* anel externo discreto */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={R_OUTER}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth={2}
          />
          {/* anel pontilhado que gira devagar */}
          <motion.circle
            cx={CENTER}
            cy={CENTER}
            r={R_OUTER - 26}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={2.4}
            strokeDasharray="2 16"
            opacity={0.55}
            style={{ transformOrigin: "50% 50%" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 90, ease: "linear", repeat: Infinity }}
          />

          {/* cantoneiras */}
          {corners.map((c, i) => (
            <path
              key={i}
              d={`M ${c.x} ${c.y + 34 * -c.sy} L ${c.x} ${c.y} L ${c.x + 34 * -c.sx} ${c.y}`}
              stroke="rgba(255,255,255,0.28)"
              strokeWidth={2.5}
              fill="none"
              strokeLinecap="round"
            />
          ))}

          {/* tracinhos conectores anel → chip */}
          {chips.map((c) => (
            <g key={c.label}>
              <line
                x1={c.tickIn.x}
                y1={c.tickIn.y}
                x2={c.tickOut.x}
                y2={c.tickOut.y}
                stroke="rgba(255,255,255,0.22)"
                strokeWidth={1.6}
              />
              <circle cx={c.tickOut.x} cy={c.tickOut.y} r={4} fill="#6366f1" />
            </g>
          ))}

          {/* ── Anel de gradiente animado (justo ao avatar) ── */}
          <motion.circle
            cx={CENTER}
            cy={CENTER}
            r={R_RING}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={strokeMain}
            strokeLinecap="round"
            strokeDasharray={`${arcMain} ${circumference - arcMain}`}
            style={{ strokeDashoffset: smoothOffset }}
            filter={`url(#${filterId})`}
            opacity={0.96}
          />
          <motion.circle
            cx={CENTER}
            cy={CENTER}
            r={R_RING}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={strokeTrail}
            strokeLinecap="round"
            strokeDasharray={`${arcTrail} ${circumference - arcTrail}`}
            style={{ strokeDashoffset: smoothOffset }}
            opacity={0.5}
          />
        </svg>

        {/* ── Chips de skill ───────────────────────────────────────── */}
        {chips.map((c, i) => (
          <motion.span
            key={c.label}
            custom={i}
            variants={chipVariants}
            initial="hidden"
            animate="show"
            className={cn(
              "absolute z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full",
              "border border-white/12 bg-[#0b0f1c]/75 px-3 py-1.5 font-mono text-[0.72rem] font-semibold tracking-wide text-white",
              "shadow-[0_6px_18px_rgba(0,0,0,0.4)] backdrop-blur-md",
            )}
            style={{ left: `${c.left}%`, top: `${c.top}%` }}
          >
            <motion.span
              className="block"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4 + i, ease: "easeInOut", repeat: Infinity }}
            >
              {c.label}
            </motion.span>
          </motion.span>
        ))}

        {/* telemetria */}
        <span className="absolute left-[3%] top-[6%] z-20 font-mono text-[10px] tracking-[0.22em] text-white/40">
          UI · 60FPS
        </span>
        <span className="absolute bottom-[5%] right-[3%] z-20 font-mono text-[10px] tracking-[0.22em] text-white/40">
          BUILD v2026
        </span>

        {/* ── Avatar central (seu sprite idle ↔ hover, intacto) ────── */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div
            className={cn(
              "flex aspect-square items-center justify-center overflow-hidden rounded-full",
              "border border-white/18 bg-white/10",
              "shadow-[0_0_0_1px_rgba(105,125,205,0.5),0_0_36px_rgba(105,125,255,0.5),0_0_56px_-14px_rgba(124,58,237,0.15)]",
              "backdrop-blur-xl",
            )}
            style={{
              width: `${AVATAR_DIAMETER_RATIO * 100}%`,
              height: `${AVATAR_DIAMETER_RATIO * 100}%`,
            }}
            onPointerEnter={() => {
              setSpriteFrame(0)
              setIsAvatarHovered(true)
            }}
            onPointerLeave={() => {
              setIsAvatarHovered(false)
              setSpriteFrame(0)
            }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/18 via-transparent to-blue-500/22" />
            <div
              className="relative z-10 size-full min-h-0 min-w-0"
              role="img"
              aria-label={imageAlt}
            >
              <div
                className="absolute inset-0 will-change-[opacity]"
                style={{
                  opacity: isAvatarHovered ? 0 : 1,
                  transition: `opacity ${IDLE_SPRITE_CROSSFADE_MS}ms ease-in-out`,
                }}
              >
                <Image
                  src={AVATAR_IDLE_SRC}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 80vw, 400px"
                  className={cn("object-cover select-none", imageClassName)}
                  priority
                  aria-hidden
                  draggable={false}
                />
              </div>
              <div
                className="pointer-events-none absolute inset-0 will-change-[opacity]"
                style={{
                  opacity: isAvatarHovered ? 1 : 0,
                  transition: `opacity ${IDLE_SPRITE_CROSSFADE_MS}ms ease-in-out`,
                }}
              >
                {AVATAR_HOVER_SPRITE_FRAMES.map((src, i) => (
                  <Image
                    key={src}
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 80vw, 400px"
                    className={cn(
                      "object-cover select-none",
                      i === spriteFrame ? "opacity-100" : "opacity-0",
                      imageClassName,
                    )}
                    priority={i === 0}
                    aria-hidden
                    draggable={false}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}