"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"

import { cn } from "@/lib/utils"

const VIEW = 600
const CENTER = VIEW / 2
const RING_OUTER = 300
const RING_DASH = 258

const ORBITAL_IDLE_SRC = "/assets/thumb/astro-2.png"
const ORBITAL_HOVER_SPRITE_FRAMES = [

  "/assets/avatar/pxl-3.png",
  "/assets/avatar/pxl-4.png",
  "/assets/avatar/pxl-5.png",
] as const
const ORBITAL_SPRITE_FRAME_MS = 260
const ORBITAL_SPRITE_CROSSFADE_MS = 320

/* ── Badges das stacks em órbita ─────────────────────────────────────────── */

const ORBIT_STACK = [
  "React",
  "TypeScript",
  "Next.js",
  "Flutter",
  "Dart",
  "Laravel",
  "Tailwind",
  "Node.js",
  "React Native",
  "Nest.js",
  "Vite",
  "Git",
] as const

/** Ângulos das posições (graus; 0° = direita, sentido horário), como no hero de produção. */
const BADGE_ANGLES = [-138, -72, -14, 42, 96, 158] as const
const BADGE_RADIUS = 205
const LINE_FROM = 110
const LINE_TO = 180
const SWAP_MS = 2400

/** Troca uma posição aleatória por uma stack que não está visível. */
function swapOne(visible: readonly string[]) {
  const hidden = ORBIT_STACK.filter((name) => !visible.includes(name))
  if (!hidden.length) return visible
  const slot = Math.floor(Math.random() * visible.length)
  const next = [...visible]
  next[slot] = hidden[Math.floor(Math.random() * hidden.length)]
  return next
}

const polar = (angleDeg: number, radius: number) => {
  const a = (angleDeg * Math.PI) / 180
  return { x: CENTER + radius * Math.cos(a), y: CENTER + radius * Math.sin(a) }
}

/**
 * Badges em volta do astronauta, ligadas ao centro por linhas finas; a cada
 * SWAP_MS uma delas troca de stack com um desfoque. A troca só roda com o
 * componente na tela e fica parada com movimento reduzido.
 */
function OrbitBadges() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState<readonly string[]>(() => ORBIT_STACK.slice(0, BADGE_ANGLES.length))

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let timer = 0
    const observer = new IntersectionObserver(([entry]) => {
      window.clearInterval(timer)
      if (entry.isIntersecting) timer = window.setInterval(() => setVisible((current) => swapOne(current)), SWAP_MS)
    })
    observer.observe(el)
    return () => {
      observer.disconnect()
      window.clearInterval(timer)
    }
  }, [])

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0">
      <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="absolute inset-0 h-full w-full" fill="none">
        {BADGE_ANGLES.map((angle) => {
          const from = polar(angle, LINE_FROM)
          const to = polar(angle, LINE_TO)
          return (
            <line
              key={angle}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              className="stroke-foreground/15"
              strokeWidth={1}
            />
          )
        })}
      </svg>

      {BADGE_ANGLES.map((angle, slot) => {
        const { x, y } = polar(angle, BADGE_RADIUS)
        return (
          <div
            key={angle}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${(x / VIEW) * 100}%`, top: `${(y / VIEW) * 100}%` }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={visible[slot]}
                initial={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="block whitespace-nowrap rounded-full border border-foreground/10 bg-background/80 px-3 py-1.5 text-[11px] font-semibold text-foreground shadow-[0_8px_20px_-10px_rgba(0,0,0,0.5)]"
              >
                {visible[slot]}
              </motion.span>
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

type AboutOrbitalProps = {
  className?: string
  characterSrc?: string
  /** Badges das stacks em volta do astronauta, trocando uma por vez. */
  badges?: boolean
}

export function AboutOrbital({
  className,
  characterSrc = ORBITAL_IDLE_SRC,
  badges = false,
}: AboutOrbitalProps) {
  const [isCharacterHovered, setIsCharacterHovered] = useState(false)
  const [spriteFrame, setSpriteFrame] = useState(0)

  useEffect(() => {
    if (!isCharacterHovered) return

    const id = window.setInterval(() => {
      setSpriteFrame((frame) => (frame + 1) % ORBITAL_HOVER_SPRITE_FRAMES.length)
    }, ORBITAL_SPRITE_FRAME_MS)

    return () => window.clearInterval(id)
  }, [isCharacterHovered])

  return (
    <div
      className={cn(
        "relative mx-auto aspect-square w-full max-w-[560px] select-none",
        className,
      )}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.22),rgba(124,58,237,0.10)_45%,transparent_70%)] blur-[2px]" />

      {/*
        Anéis e cantos em SVGs separados: os anéis giram com animação CSS no próprio
        <svg> (camada da GPU), em vez de um loop de JavaScript a cada quadro.
      */}
      <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="absolute inset-0 h-full w-full" fill="none">
        <circle cx={CENTER} cy={CENTER} r={RING_OUTER} stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
        {[
          [-RING_OUTER, -RING_OUTER],
          [RING_OUTER, -RING_OUTER],
          [-RING_OUTER, RING_OUTER],
          [RING_OUTER, RING_OUTER],
        ].map(([dx, dy], index) => {
          const x = CENTER + dx
          const y = CENTER + dy
          const sx = dx < 0 ? 1 : -1
          const sy = dy < 0 ? 1 : -1
          return (
            <path
              key={index}
              d={`M ${x} ${y + 24 * sy} L ${x} ${y} L ${x + 24 * sx} ${y}`}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth={1.5}
            />
          )
        })}
      </svg>

      <svg
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        className="absolute inset-0 h-full w-full animate-[spin_60s_linear_infinite] motion-reduce:animate-none"
        fill="none"
      >
        <defs>
          <linearGradient id="about-orbit-stroke-dash" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0400ff" />
            <stop offset="1" stopColor="#07cce2" />
          </linearGradient>
        </defs>
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RING_DASH}
          stroke="url(#about-orbit-stroke-dash)"
          strokeWidth={1.6}
          strokeDasharray="2 9"
          opacity={0.7}
        />
      </svg>

      <svg
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        className="absolute inset-0 h-full w-full animate-[spin_24s_linear_infinite_reverse] motion-reduce:animate-none"
        fill="none"
      >
        <defs>
          <linearGradient id="about-orbit-stroke-arc" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0400ff" />
            <stop offset="1" stopColor="#07cce2" />
          </linearGradient>
        </defs>
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RING_OUTER}
          stroke="url(#about-orbit-stroke-arc)"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeDasharray="120 700"
        />
      </svg>

      <motion.div
        className="absolute inset-[14%] grid place-items-center"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Flutuação em CSS (transform na GPU), no lugar do loop infinito do motion. */}
        <div
          className="relative h-full w-full animate-[orbital-bob_6s_ease-in-out_infinite] motion-reduce:animate-none"
          onPointerEnter={() => {
            setSpriteFrame(0)
            setIsCharacterHovered(true)
          }}
          onPointerLeave={() => {
            setIsCharacterHovered(false)
            setSpriteFrame(0)
          }}
        >
          <div
            className="absolute inset-0 will-change-[opacity]"
            style={{
              opacity: isCharacterHovered ? 0 : 1,
              transition: `opacity ${ORBITAL_SPRITE_CROSSFADE_MS}ms ease-in-out`,
            }}
          >
            <Image
              src={characterSrc}
              alt=""
              fill
              sizes="(max-width: 1024px) 60vw, 480px"
              className="object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.55)]"
              draggable={false}
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0 will-change-[opacity]"
            style={{
              opacity: isCharacterHovered ? 1 : 0,
              transition: `opacity ${ORBITAL_SPRITE_CROSSFADE_MS}ms ease-in-out`,
            }}
          >
            {ORBITAL_HOVER_SPRITE_FRAMES.map((src, index) => (
              <Image
                key={src}
                src={src}
                alt=""
                fill
                sizes="(max-width: 1024px) 60vw, 480px"
                className={cn(
                  "object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.55)]",
                  index === spriteFrame ? "opacity-100" : "opacity-0",
                )}
                draggable={false}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {badges ? <OrbitBadges /> : null}

      <span className="absolute left-[6%] top-[10%] font-mono text-[10px] tracking-widest text-white/45">
        UI · 60FPS
      </span>
      <span className="absolute bottom-[8%] right-[6%] font-mono text-[10px] tracking-widest text-white/45">
        BUILD v2026
      </span>
    </div>
  )
}
